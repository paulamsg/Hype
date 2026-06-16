import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const HERO_VIDEOS = [
  '/videos/11999024_1920_1080_25fps.mp4',
  //'/videos/12504903_2560_1440_30fps.mp4',
  //'/videos/13082773-hd_1920_1080_60fps.mp4',
  //'/videos/15878108_1920_1080_25fps.mp4',
]

const FEED_ITEMS = [
  {
    av: 'av1',
    letter: 'L',
    name: 'Laura García',
    action: 'quiere ir a este evento',
    title: 'Festival Indie Madrid',
    meta: 'Sáb 14 Jun · 18 €',
    bg: 'linear-gradient(135deg,#1a2f6e,#0057FF)',
    actions: true,
  },
  {
    av: 'av2',
    letter: 'M',
    name: 'Marc Ribas',
    action: 'ha compartido en "La Peña"',
    title: 'Maratón de Valencia',
    meta: 'Dom 15 Jun · 25 €',
    bg: 'linear-gradient(135deg,#0a2a1e,#0a7a40)',
    actions: true,
  },
  {
    av: 'av3',
    letter: 'S',
    name: 'Sofía Morales',
    action: 'ya fue a · hace 2 días',
    title: 'Exposición MACBA',
    meta: 'Vie 13 Jun · Gratis',
    bg: 'linear-gradient(135deg,#2a0a1a,#7000FF)',
    actions: false,
  },
]

const GROUP_EVENTS = [
  {
    title: 'Festival Indie Madrid',
    meta: 'Sáb 14 Jun · Madrid · 18 €',
    by: 'Propuesto por Laura',
    bg: 'linear-gradient(135deg,#1a2f6e,#0057FF)',
  },
  {
    title: 'Maratón de Valencia',
    meta: 'Dom 15 Jun · Valencia · 25 €',
    by: 'Propuesto por Marc',
    bg: 'linear-gradient(135deg,#0a2a1e,#0a7a40)',
  },
]

const PROFILE_CARDS = [
  'linear-gradient(135deg,#1a2f6e,#0057FF)',
  'linear-gradient(135deg,#2a0a1a,#7000FF)',
  'linear-gradient(135deg,#0a2a1e,#0a7a40)',
  'linear-gradient(135deg,#2a1a0a,#FF6500)',
  'linear-gradient(135deg,#1a0a30,#4B00B5)',
  'linear-gradient(135deg,#0a1a2a,#003FBD)',
]

const PROFILE_DATES = ['14 Jun', '20 Jun', '22 Jun', '28 Jun', '4 Jul', '5 Jul']

const Landing = () => {
  const { isAuthenticated } = useAuth()
  const navRef = useRef<HTMLElement>(null)
  const discoverVideoRef = useRef<HTMLVideoElement>(null)
  const navigate = useNavigate()
  const [heroVideo] = useState(() => HERO_VIDEOS[Math.floor(Math.random() * HERO_VIDEOS.length)])
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (discoverVideoRef.current) discoverVideoRef.current.playbackRate = 3
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        navRef.current.style.boxShadow = window.scrollY > 20 ? '0 1px 30px rgba(0,0,0,0.4)' : 'none'
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (isAuthenticated) return <Navigate to="/descubre" replace />

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCTA = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/registro')
  }

  return (
    <div className="landing">
      {/* ── NAV ── */}
      <nav ref={navRef} className="main-nav">
        <Link to="/" className="nav-logo">
          hype
        </Link>
        <ul className="nav-center" role="list">
          <li>
            <a href="#discover" onClick={scrollTo('discover')}>
              Descubrir
            </a>
          </li>
          <li>
            <a href="#friends" onClick={scrollTo('friends')}>
              Amigos
            </a>
          </li>
          <li>
            <a href="#groups" onClick={scrollTo('groups')}>
              Grupos
            </a>
          </li>
          <li>
            <a href="#profile" onClick={scrollTo('profile')}>
              Perfil
            </a>
          </li>
        </ul>
        <div className="nav-right">
          <Link to="/login" className="nav-login">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="nav-cta">
            Registrarse
          </Link>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section id="hero" className="hero" aria-label="Presentación">
          <video className="hero-bg" src={heroVideo} autoPlay loop muted playsInline aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-inner">
            <header className="hero-copy">
              <p className="hero-eyebrow">
                <span aria-hidden="true" />
                Ya disponible
              </p>
              <h1 className="hero-title">
                Descubre eventos.
                <br />
                <em>Vívelos</em> con amigos.
              </h1>
              <p className="hero-sub">Busca, guarda, comparte y decide con tus amigos qué plan hacéis.</p>
              <div className="hero-actions">
                <Link to="/registro" className="btn-primary">
                  Encuentra tu próximo plan →
                </Link>
              </div>
            </header>
          </div>
          <ul className="hero-stats" role="list">
            <li>
              <p className="hero-stat-num">
                1.060<span>+</span>
              </p>
              <p className="hero-stat-label">Eventos disponibles</p>
            </li>
            <li>
              <p className="hero-stat-num">52</p>
              <p className="hero-stat-label">Ciudades para elegir</p>
            </li>
            <li>
              <p className="hero-stat-num">6</p>
              <p className="hero-stat-label">Categorías de ocio</p>
            </li>
            <li>
              <p className="hero-stat-num">
                <span>100%</span>
              </p>
              <p className="hero-stat-label">Gratuita</p>
            </li>
          </ul>
        </section>

        {/* ── PROBLEMA + SOLUCIÓN ── */}
        <section id="problem" className="sec-combined" aria-label="El problema y la solución">
          <div className="container">
            <p className="section-eyebrow">El problema</p>
            <h2 className="sec-title">
              Organizar planes
              <br />
              con amigos es un caos.
            </h2>
            <p className="sec-sub">
              Chats interminables, indecisiones, eventos que se pierden en el ruido. Hay mejores formas de vivir el
              ocio.
            </p>
            <ul className="pain-grid" role="list">
              {[
                {
                  num: '01',
                  title: 'Demasiadas fuentes, ninguna completa',
                  body: 'Ticketmaster, Instagram, carteles, grupos de WhatsApp... nadie tiene todos los planes en un único sitio.',
                },
                {
                  num: '02',
                  title: 'Decidir en grupo es agotador',
                  body: 'El grupo de WhatsApp acaba en silencio. Nadie confirma, nadie decide, y el evento pasa de largo.',
                },
                {
                  num: '03',
                  title: 'No sabes qué hacen tus amigos',
                  body: '¿A qué conciertos van? ¿Qué planes les interesan? Solo te enteras si alguien lo menciona por casualidad.',
                },
              ].map(({ num, title, body }) => (
                <li key={num}>
                  <article className="pain-card">
                    <p className="pain-num" aria-hidden="true">
                      {num}
                    </p>
                    <h3 className="pain-title">{title}</h3>
                    <p className="pain-body">{body}</p>
                  </article>
                </li>
              ))}
            </ul>

            <div className="combined-divider">
              <p className="section-eyebrow">La solución</p>
              <h2 className="sec-title">
                hype.
                <br />
                <span className="sol-highlight">Todo resuelto.</span>
              </h2>
            </div>
            <ul className="sol-pillars-light" role="list">
              {[
                {
                  icon: '🔍',
                  cls: 'pi-blue',
                  title: 'Descubre',
                  body: 'Más de 1.000 eventos en las 52 capitales de provincia. Filtros por categoría, precio y fecha.',
                },
                {
                  icon: '📲',
                  cls: 'pi-lime',
                  title: 'Comparte',
                  body: 'Un feed social donde ves los planes de tus amigos. Comparte eventos, reacciona, coordina.',
                },
                {
                  icon: '🙌',
                  cls: 'pi-purple',
                  title: 'Organiza',
                  body: 'Crea grupos privados, propón eventos y vota colectivamente. Fin a los chats interminables.',
                },
              ].map(({ icon, cls, title, body }) => (
                <li key={title}>
                  <article className="sol-pillar-light">
                    <div className={`sol-pillar-icon ${cls}`} aria-hidden="true">
                      {icon}
                    </div>
                    <h3 className="sol-pillar-title-light">{title}</h3>
                    <p className="sol-pillar-body-light">{body}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── DESCUBRIR ── */}
        <section id="discover" className="sec-discover" aria-label="Descubrimiento">
          <div className="container">
            <div className="discover-layout">
              <div className="discover-copy">
                <p className="section-eyebrow">Descubrimiento</p>
                <h2 className="sec-title">Encuentra el plan perfecto en segundos.</h2>
                <p className="sec-sub">
                  Música, teatro, deportes, arte, familia, comedia. Filtra por ciudad, precio y fecha hasta encontrar
                  exactamente lo que buscas.
                </p>
                <ul className="feature-list" role="list">
                  <li>
                    <strong>52 ciudades</strong>todas las capitales de provincia de España cubiertas.
                  </li>
                  <li>
                    <strong>Filtros en tiempo real</strong>categoría, precio y fecha se combinan sin recargar la página.
                  </li>
                  <li>
                    <strong>Un clic para guardar, otro para compartir</strong>organiza tus planes y avisa a tus amigos sin salir de la app.
                  </li>
                </ul>
              </div>
              <video
                ref={discoverVideoRef}
                className="section-screenshot discover-video"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
              >
                <source src="/videos/descubrimiento_video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* ── AMIGOS ── */}
        <section id="friends" className="sec-friends" aria-label="Red social">
          <div className="container">
            <div className="friends-layout">
              <div className="feed-gallery" aria-hidden="true">
                <img src="/feed/ir_juntis.png" alt="" className="feed-gallery__img" />
                <img src="/feed/quiere_ir.png" alt="" className="feed-gallery__img" />
                <img src="/feed/quiere_ir2.png" alt="" className="feed-gallery__img" />
              </div>
              <div className="discover-copy">
                <p className="section-eyebrow">Red social</p>
                <h2 className="sec-title">El ocio es mejor cuando lo vives con alguien.</h2>
                <p className="sec-sub">
                  Ve qué eventos interesan a tus amigos, comparte los tuyos y decide juntos a cuáles ir. Sin salir de la
                  aplicación.
                </p>
                <ul className="feature-list" role="list">
                  <li>
                    <strong>Feed social</strong>ve los eventos que gustan, comparten o planean tus amigos.
                  </li>
                  <li>
                    <strong>Ir juntos</strong>con un botón avisas a un amigo de que queréis asistir al mismo evento.
                  </li>
                  <li>
                    <strong>Seguimiento mutuo</strong>sistema de seguimiento para ver únicamente lo que importa.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── GRUPOS ── */}
        <section id="groups" className="sec-groups" aria-label="Grupos privados">
          <div className="container">
            <div className="groups-layout">
              <div className="discover-copy">
                <p className="section-eyebrow">Grupos privados</p>
                <h2 className="sec-title">Tu grupo, vuestros planes.</h2>
                <p className="sec-sub">
                  Crea un espacio privado con tus amigos. Propón eventos, vota y llegad a un acuerdo sin WhatsApp de por
                  medio.
                </p>
                <ul className="feature-list" role="list">
                  <li>
                    <strong>Votación colectiva</strong>cada miembro indica si va, si le interesa o si no puede. El
                    consenso es instantáneo.
                  </li>
                  <li>
                    <strong>Completamente privado</strong>solo los miembros del grupo ven los eventos compartidos.
                  </li>
                  <li>
                    <strong>Notificaciones relevantes</strong>sabes en tiempo real cuándo alguien vota o propone un
                    nuevo plan.
                  </li>
                </ul>
              </div>
              <img
                src="/groups.png"
                alt="Pantalla de grupos de hype"
                className="section-screenshot"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        {/* ── PERFIL ── */}
        <section id="profile" className="sec-profile" aria-label="Tu perfil">
          <div className="container">
            <div className="profile-layout">
              <div className="discover-copy">
                <p className="section-eyebrow">Tu perfil</p>
                <h2 className="sec-title">Tu historial de planes, siempre a mano.</h2>
                <p className="sec-sub">
                  Guarda los eventos que te interesan, registra los que ya viviste y revive esos momentos con las fotos
                  que subiste.
                </p>
                <ul className="feature-list" role="list">
                  <li>
                    <strong>4 carpetas</strong>voy a ir, me interesa, asistidos y archivo. Tu agenda de eventos
                    organizada.
                  </li>
                  <li>
                    <strong>Fotos de eventos</strong>sube tus fotos vinculadas al evento. Revive el momento cuando
                    quieras.
                  </li>
                  <li>
                    <strong>Estadísticas</strong>cuántos eventos has asistido, cuántas fotos has subido, a quién sigues.
                  </li>
                </ul>
              </div>
              <div className="profile-gallery" aria-hidden="true">
                <img src="/Profile/photos.png" alt="" className="profile-gallery__img" />
                <img src="/Profile/asistidos.png" alt="" className="profile-gallery__img" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="cta" className="sec-cta" aria-label="Únete a hype">
          <div className="cta-inner">
            <p className="cta-eyebrow">
              <span aria-hidden="true" />
              Ya disponible
            </p>
            <h2 className="cta-title">
              El ocio empieza
              <br />
              en <em>hype</em>
            </h2>
            <p className="cta-sub">
              Crea tu cuenta y empieza a descubrir eventos, conectar con amigos y organizar planes. Gratis.
            </p>
            <div className="cta-btn-wrap">
              <Link to="/registro" className="btn-primary">
                Crear cuenta →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" className="nav-logo">
                hype
                <span className="nav-dot" aria-hidden="true" />
              </Link>
              <p className="footer-brand-desc">
                La red social para descubrir, compartir y organizar planes con amigos. Más de 1.000 eventos en las 52
                capitales de España.
              </p>
            </div>
            <nav aria-label="Producto">
              <span className="footer-col-label">Producto</span>
              <ul role="list">
                {['Descubrir eventos', 'Amigos y feed', 'Grupos privados', 'Mi perfil'].map((l) => (
                  <li key={l}>
                    <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Empresa">
              <span className="footer-col-label">Empresa</span>
              <ul role="list">
                {['Sobre hype', 'Blog', 'Prensa', 'Contacto'].map((l) => (
                  <li key={l}>
                    <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <nav aria-label="Legal">
                <span className="footer-col-label">Legal</span>
                <ul role="list">
                  {['Privacidad', 'Términos de uso', 'Cookies'].map((l) => (
                    <li key={l}>
                      <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Redes sociales" style={{ marginTop: '24px' }}>
                <span className="footer-col-label">Síguenos</span>
                <ul role="list">
                  {['Instagram', 'TikTok', 'X (Twitter)'].map((l) => (
                    <li key={l}>
                      <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">
              © 2026 hype ·{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>
                ESAT Valencia
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
