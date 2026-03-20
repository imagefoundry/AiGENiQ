import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import type { Article } from '../types/article'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/insights.css'

type FilterType = 'all' | 'article' | 'video'

const CARDS_PER_PAGE = 6

function getYouTubeThumbnail(url: string | null): string | null {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]{11})/,
  ]
  for (const re of patterns) {
    const match = url.match(re)
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
  }
  return null
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function InsightsLanding() {
  useScrollReveal()

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [paginated, setPaginated] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (!error && data) {
        setArticles(data as Article[])
      }
      setLoading(false)
    }

    fetchArticles()
  }, [])

  // When showing 'all', feature one card separately. For type filters, show everything.
  const featured = filter === 'all' ? (articles.find(a => a.featured) ?? articles[0]) : null

  const filteredGrid =
    filter === 'all'
      ? articles.filter(a => a.id !== featured?.id)
      : articles.filter(a => a.type === filter)

  const showFeatured = filter === 'all' && Boolean(featured)

  const totalPages = Math.ceil(filteredGrid.length / CARDS_PER_PAGE)
  const pagedItems = paginated
    ? filteredGrid.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE)
    : filteredGrid.slice(0, CARDS_PER_PAGE)

  function handleFilterChange(f: FilterType) {
    setFilter(f)
    setPaginated(false)
    setCurrentPage(1)
  }

  function handleLoadMore() {
    setPaginated(true)
    setCurrentPage(2)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <main id="main-content">
        {/* Page Header */}
        <div className="ins-page-header">
          <p className="ins-eyebrow">AiGENiQ</p>
          <h1 data-reveal>Insights</h1>
          <p className="ins-subheading" data-reveal data-delay="1">
            AI without the noise. Practical thinking, honest takes, and the kind of
            detail that rarely makes it into a sales pitch.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="ins-filter-bar">
          {(['all', 'article', 'video'] as FilterType[]).map(f => (
            <button
              key={f}
              className={`ins-filter-tab${filter === f ? ' active' : ''}`}
              onClick={() => handleFilterChange(f)}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'All' : f === 'article' ? 'Articles' : 'Videos'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="ins-content">
          {loading ? (
            <div className="ins-loading" role="status" aria-live="polite">
              Loading…
            </div>
          ) : articles.length === 0 ? (
            <div className="ins-empty">
              No articles published yet — check back soon.
            </div>
          ) : (
            <>
              {/* Featured */}
              {showFeatured && featured && (
                <>
                  <p className="ins-section-label">Latest</p>
                  <Link
                    to={`/insights/${featured.slug}`}
                    className="ins-card-featured"
                  >
                    <div className="ins-featured-body">
                      <div className="ins-card-top">
                        <span className={`ins-pill ins-pill-${featured.type}`}>
                          {featured.type}
                        </span>
                        <div className="ins-card-meta">
                          {featured.published_at && (
                            <span>{formatDate(featured.published_at)}</span>
                          )}
                          {featured.read_time && (
                            <span>{featured.read_time} min read</span>
                          )}
                          {featured.video_duration && (
                            <span>{featured.video_duration}</span>
                          )}
                        </div>
                      </div>
                      <h2>{featured.title}</h2>
                      {featured.standfirst && <p>{featured.standfirst}</p>}
                      <span className="ins-arrow-link">
                        {featured.type === 'video' ? 'Watch this one' : 'Read this one'}{' '}
                        <span className="ins-arrow" aria-hidden="true">→</span>
                      </span>
                    </div>
                    {featured.hero_image ? (
                      <img
                        src={featured.hero_image}
                        alt=""
                        className="ins-featured-visual"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    ) : (
                      <div className="ins-featured-visual" aria-hidden="true">
                        Article image / infographic
                      </div>
                    )}
                  </Link>
                </>
              )}

              {/* Grid */}
              {filteredGrid.length > 0 && (
                <>
                  <div className="ins-section-divider">
                    <span className="ins-divider-label">More</span>
                    <div className="ins-divider-line" />
                  </div>

                  <div className="ins-cards-grid">
                    {pagedItems.map((article) => (
                      <Link
                        key={article.id}
                        to={`/insights/${article.slug}`}
                        className="ins-card-item"
                      >
                        {article.type === 'video' && (
                          <div
                            className="ins-video-thumb"
                            role="img"
                            aria-label={article.title ?? 'Video thumbnail'}
                            style={(() => {
                              const thumb = getYouTubeThumbnail(article.video_url) ?? article.hero_image
                              return thumb
                                ? { backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                                : undefined
                            })()}
                          >
                            <div className="ins-play-btn" />
                            {article.video_duration && (
                              <span className="ins-video-duration">
                                {article.video_duration}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="ins-card-top">
                          <span className={`ins-pill ins-pill-${article.type}`}>
                            {article.type}
                          </span>
                          <div className="ins-card-meta">
                            {article.published_at && (
                              <span>{formatDate(article.published_at)}</span>
                            )}
                            {article.read_time && (
                              <span>{article.read_time} min read</span>
                            )}
                          </div>
                        </div>
                        <h3>{article.title}</h3>
                        {article.standfirst && <p>{article.standfirst}</p>}
                        <span className="ins-arrow-link" style={{ fontSize: '13px' }}>
                          {article.type === 'video' ? 'Watch this one' : 'Read this one'}{' '}
                          <span className="ins-arrow" aria-hidden="true">→</span>
                        </span>
                      </Link>
                    ))}
                  </div>

                  {filteredGrid.length > CARDS_PER_PAGE && (
                    <div className="ins-load-more-wrap">
                      {!paginated ? (
                        <button type="button" className="ins-btn-load-more" onClick={handleLoadMore}>
                          Load more
                        </button>
                      ) : (
                        <div className="ins-pagination">
                          <button
                            className="ins-page-btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            ←
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                              key={page}
                              className={`ins-page-btn${currentPage === page ? ' active' : ''}`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            className="ins-page-btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            →
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {filteredGrid.length === 0 && !showFeatured && (
                <div className="ins-empty">
                  No {filter === 'video' ? 'videos' : 'articles'} published yet.
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
