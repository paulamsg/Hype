import fs from 'fs'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!

const GENRE_QUERIES: Record<string, string> = {
  'Rock':         'rock concert live music',
  'Pop':          'pop concert stage lights',
  'Electrónica':  'electronic dj festival music',
  'Flamenco':     'flamenco dance spain',
  'Jazz':         'jazz musician saxophone',
  'Clásica':      'orchestra classical concert',
  'Hip-Hop':      'hip hop rap concert',
  'Indie':        'indie band concert music',
  'Musical':      'musical theater broadway stage',
  'Drama':        'theater stage drama performance',
  'Danza':        'ballet dance stage performance',
  'Ópera':        'opera singer theater stage',
  'Improvisación':'comedy improv theater stage',
  'Pintura':      'painting art canvas museum',
  'Fotografía':   'photography exhibition gallery',
  'Escultura':    'sculpture art museum',
  'Exposición':   'art exhibition gallery museum',
  'Instalación':  'contemporary art installation',
  'Fútbol':       'football soccer stadium match',
  'Baloncesto':   'basketball court sport',
  'Atletismo':    'running athletics track sport',
  'Natación':     'swimming pool sport athlete',
  'Tenis':        'tennis court sport player',
  'Animación':    'children family outdoor festival',
  'Circo':        'circus acrobat performance show',
  'Cuentacuentos':'storytelling children books',
  'Magia':        'magic show magician performance',
  'Títeres':      'puppet theater children show',
  'Monólogo':     'standup comedy microphone show',
  'Stand-up':     'standup comedian microphone laughing',
  'Sketch':       'comedy theater funny performance',
  'Comedia':      'comedy show laughing performance',
}

const CATEGORY_FALLBACK: Record<string, string[]> = {
  'Música':   ['https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800'],
  'Arte':     ['https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800'],
  'Teatro':   ['https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800'],
  'Familia':  ['https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800'],
  'Deportes': ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800'],
  'Comedia':  ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800'],
}

async function fetchImagesForGenre(query: string): Promise<string[]> {
  const allUrls: string[] = []
  const seenIds = new Set<string>()

  for (let page = 1; page <= 4; page++) {
    try {
      const res = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, per_page: 30, page, orientation: 'landscape' },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      })
      const results: any[] = res.data.results ?? []
      for (const photo of results) {
        if (!seenIds.has(photo.id)) {
          seenIds.add(photo.id)
          allUrls.push(`${photo.urls.raw}&w=800&h=500&fit=crop&auto=format`)
        }
      }
      if (results.length < 30) break
      if (page < 4) await new Promise(r => setTimeout(r, 1500))
    } catch (e: any) {
      if (e.response?.status === 429) {
        console.log(`  ⏳ Rate limit hit, stopping at page ${page} (${allUrls.length} imgs so far)`)
      } else {
        console.error(`  Error page ${page} for "${query}":`, e.message)
      }
      break
    }
  }

  return allUrls
}

async function main() {
  const data: any[] = JSON.parse(fs.readFileSync('src/data/events_mock.json', 'utf8'))

  const countByGenre: Record<string, number> = {}
  data.forEach(e => { countByGenre[e.genre] = (countByGenre[e.genre] || 0) + 1 })

  const genreImages: Record<string, string[]> = {}

  for (const genre of Object.keys(GENRE_QUERIES)) {
    const needed = countByGenre[genre] ?? 0
    process.stdout.write(`Fetching "${genre}" (${needed} eventos)... `)
    const urls = await fetchImagesForGenre(GENRE_QUERIES[genre])
    genreImages[genre] = urls
    const repeats = urls.length > 0 ? Math.ceil(needed / urls.length) : '∞'
    console.log(`${urls.length} imgs, max repetición: ${repeats}x ${urls.length >= needed ? '✅' : '⚠️'}`)
    await new Promise(r => setTimeout(r, 1500))
  }

  const genreCounters: Record<string, number> = {}
  const updated = data.map((e: any) => {
    const idx = genreCounters[e.genre] ?? 0
    genreCounters[e.genre] = idx + 1
    const pool = genreImages[e.genre]
    const fallback = CATEGORY_FALLBACK[e.category]?.[0] ?? CATEGORY_FALLBACK['Música'][0]
    const image = pool?.length ? pool[idx % pool.length] : fallback
    return { ...e, image }
  })

  const uniqueImages = new Set(updated.map((e: any) => e.image)).size
  const totalImages = updated.length
  console.log(`\n✅ ${uniqueImages} imágenes únicas entre ${totalImages} eventos`)

  fs.writeFileSync('src/data/events_mock.json', JSON.stringify(updated, null, 2) + '\n')
  console.log('Ejecuta ahora: npx ts-node prisma/seedMockEvents.ts')
}

main().catch(console.error)
