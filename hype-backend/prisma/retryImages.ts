/**
 * Retry script for genres that failed in fetchImages.ts due to rate limits.
 * Run 1 hour after fetchImages.ts completed: npx ts-node prisma/retryImages.ts
 */
import fs from 'fs'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!

const FAILED_GENRE_QUERIES: Record<string, string> = {
  'Clásica':      'classical music orchestra symphony',
  'Hip-Hop':      'hip hop urban street music',
  'Indie':        'indie alternative live music band',
  'Musical':      'musical theater show stage curtain',
  'Drama':        'theater acting stage performance',
  'Danza':        'dance movement choreography stage',
  'Ópera':        'opera house grand theater stage',
  'Improvisación':'improv comedy actors audience',
  'Magia':        'magic illusion show performer',
  'Títeres':      'puppet show marionette theater',
  'Monólogo':     'comedian microphone spotlight stage',
  'Stand-up':     'comedy night microphone performer',
  'Sketch':       'comedy actors funny performance',
  'Comedia':      'comedy show audience laughing',
}

async function fetchImagesForGenre(query: string, needed: number): Promise<string[]> {
  const allUrls: string[] = []
  const seenIds = new Set<string>()
  const pagesNeeded = Math.ceil(needed / 30)

  for (let page = 1; page <= pagesNeeded; page++) {
    try {
      const res = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, per_page: 30, page, orientation: 'landscape' },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      })
      const remaining = res.headers['x-ratelimit-remaining']
      if (remaining !== undefined) process.stdout.write(` [${remaining} req left]`)
      const results: any[] = res.data.results ?? []
      for (const photo of results) {
        if (!seenIds.has(photo.id)) {
          seenIds.add(photo.id)
          allUrls.push(`${photo.urls.raw}&w=800&h=500&fit=crop&auto=format`)
        }
      }
      if (results.length < 30) break
      if (page < pagesNeeded) await new Promise(r => setTimeout(r, 1500))
    } catch (e: any) {
      if (e.response?.status === 403 || e.response?.status === 429) {
        console.log(`\n  ⏳ Rate limit hit at page ${page} (${allUrls.length} imgs collected)`)
      } else {
        console.error(`\n  Error page ${page}:`, e.message)
      }
      break
    }
  }

  return allUrls
}

async function main() {
  const data: any[] = JSON.parse(fs.readFileSync('src/data/events_mock.json', 'utf8'))

  const countByGenre: Record<string, number> = {}
  const currentImages: Record<string, Set<string>> = {}
  data.forEach(e => {
    countByGenre[e.genre] = (countByGenre[e.genre] || 0) + 1
    if (!currentImages[e.genre]) currentImages[e.genre] = new Set()
    currentImages[e.genre].add(e.image)
  })

  const genresNeedingRetry = Object.keys(FAILED_GENRE_QUERIES).filter(
    g => (currentImages[g]?.size ?? 0) <= 1
  )
  console.log(`Géneros a reintentar: ${genresNeedingRetry.join(', ')}\n`)

  const newImages: Record<string, string[]> = {}

  for (const genre of genresNeedingRetry) {
    const needed = countByGenre[genre] ?? 0
    const pages = Math.ceil(needed / 30)
    process.stdout.write(`Fetching "${genre}" (${needed} eventos, ${pages} páginas)...`)
    const urls = await fetchImagesForGenre(FAILED_GENRE_QUERIES[genre], needed)
    newImages[genre] = urls
    const repeats = urls.length > 0 ? Math.ceil(needed / urls.length) : '∞'
    console.log(` ${urls.length} imgs, max repetición: ${repeats}x ${urls.length > 0 ? '✅' : '❌'}`)
    await new Promise(r => setTimeout(r, 2000))
  }

  const genreCounters: Record<string, number> = {}
  const updated = data.map((e: any) => {
    if (!newImages[e.genre]) return e
    const idx = genreCounters[e.genre] ?? 0
    genreCounters[e.genre] = idx + 1
    const pool = newImages[e.genre]
    if (!pool?.length) return e
    return { ...e, image: pool[idx % pool.length] }
  })

  const uniqueImages = new Set(updated.map((e: any) => e.image)).size
  console.log(`\n✅ ${uniqueImages} imágenes únicas entre ${updated.length} eventos`)

  fs.writeFileSync('src/data/events_mock.json', JSON.stringify(updated, null, 2) + '\n')
  console.log('Ejecuta ahora: npx ts-node prisma/seedMockEvents.ts')
}

main().catch(console.error)
