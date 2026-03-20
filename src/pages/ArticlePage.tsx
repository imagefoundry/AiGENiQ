import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import type { Article } from '../types/article'
import { useCalendar } from '../contexts/CalendarContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/insights.css'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function extractHeadings(html: string): Array<{ id: string; text: string }> {
  const matches = [...html.matchAll(/<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi)]
  return matches.map(m => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, ''),
  }))
}

function getYouTubeEmbedUrl(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]+)/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}


export default function ArticlePage() {
  useScrollReveal()
  const { openCalendar } = useCalendar()

  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return

    async function fetchArticle() {
      setLoading(true)
      setNotFound(false)

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error || !data) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setArticle(data as Article)

      const { data: relatedData } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .neq('slug', slug)
        .order('published_at', { ascending: false })
        .limit(3)

      if (relatedData) setRelated(relatedData as Article[])
      setLoading(false)
    }

    fetchArticle()
  }, [slug])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const headings = article?.content ? extractHeadings(article.content) : []

  function renderLines(text: string) {
    const lines = text.split('\n').filter(l => l.trim())
    if (lines.length > 1) {
      return (
        <ul className="vid-bullet-list">
          {lines.map((line, i) => <li key={i}>{line.trim()}</li>)}
        </ul>
      )
    }
    return <p className="vid-section-text">{text}</p>
  }

  function renderContent(html: string) {
    let out = html
    if (article?.inline_image_1) {
      out = out.replace(
        /\{\{image1\}\}/g,
        `<img src="${article.inline_image_1}" alt="Article illustration" class="art-inline-img" loading="lazy" width="800" height="450" />`
      )
    }
    if (article?.inline_image_2) {
      out = out.replace(
        /\{\{image2\}\}/g,
        `<img src="${article.inline_image_2}" alt="Article illustration" class="art-inline-img" loading="lazy" width="800" height="450" />`
      )
    }
    return out
  }

  const embedUrl = article?.video_url ? getYouTubeEmbedUrl(article.video_url) : null

  // ─── Video Layout ────────────────────────────────────────────────────────
  function renderVideoPage(article: Article) {
    return (
      <>
        {/* Breadcrumb */}
        <div className="art-breadcrumb-bar">
          <nav className="art-breadcrumb" aria-label="Breadcrumb">
            <Link to="/insights">Insights</Link>
            <span className="art-breadcrumb-sep" aria-hidden="true">/</span>
            <span>{article.title}</span>
          </nav>
        </div>

        {/* Video Header */}
        <div className="vid-header">
          <span className="ins-pill ins-pill-video" style={{ marginBottom: 18, display: 'inline-block' }}>
            Video
          </span>
          <h1>{article.title}</h1>
          {article.standfirst && <p className="vid-standfirst">{article.standfirst}</p>}
          <div className="art-meta">
            <div className="art-meta-author">
              <div className="art-avatar" aria-hidden="true">{article.author_initials}</div>
              <span>{article.author}</span>
            </div>
            {article.published_at && (
              <>
                <span className="art-meta-divider" aria-hidden="true">|</span>
                <span>{formatDate(article.published_at)}</span>
              </>
            )}
            {article.video_duration && (
              <>
                <span className="art-meta-divider" aria-hidden="true">|</span>
                <span>{article.video_duration} watch</span>
              </>
            )}
          </div>
        </div>

        {/* Video Embed */}
        <div className="vid-section">
          <div className="vid-container">
            <div className="vid-embed-wrap">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={article.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="vid-placeholder" aria-hidden="true">
                  <div className="vid-play-circle" />
                  <span className="vid-placeholder-label">Video URL not set</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Below Video */}
        <div className="vid-below">
          <div className="vid-description">
            {article.content && (
              <>
                <p className="vid-eyebrow">About this video</p>
                <p className="vid-section-text">{article.content}</p>
              </>
            )}

            {article.video_takeaways && (
              <>
                <h2>What you'll come away with</h2>
                {renderLines(article.video_takeaways)}
              </>
            )}

            {article.video_who_for && (
              <>
                <h2>Who this is for</h2>
                {renderLines(article.video_who_for)}
              </>
            )}

            {/* CTA Strip */}
            <div className="vid-cta-strip">
              <div className="vid-cta-strip-body">
                <p>Want to talk through how AI fits your business?</p>
                <h3>A 25-minute call is the fastest way to get clarity.</h3>
              </div>
              <a href="https://calendly.com/anshul-aigeniq/25-minute-discovery-call" onClick={(e) => { e.preventDefault(); openCalendar() }}>Book a Clarity Call →</a>
            </div>

            {/* Soft closer */}
            <div className="art-soft-closer">
              <p>
                If watching this has made you think about your own business — what's taking
                too long, what could work better — you know where to find us.
              </p>
              <p className="art-closer-sig">— {article.author}, AiGENiQ</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="art-sidebar" aria-label="Video sidebar">
            <div className="art-sidebar-block">
              <p className="art-sidebar-label">In this video</p>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.65 }}>
                {article.video_duration && <>{article.video_duration}. </>}
                {article.standfirst}
              </p>
            </div>

            {article.youtube_channel_url && (
              <div className="vid-yt-block">
                <div className="vid-yt-icon" aria-hidden="true" />
                <p>More videos like this on the AiGENiQ YouTube channel.</p>
                <a href={article.youtube_channel_url} target="_blank" rel="noopener noreferrer">
                  Subscribe on YouTube
                </a>
              </div>
            )}

            <div className="art-cta-sidebar">
              <p>If this is making you think about your own business, a 25-minute call is the fastest way to get clarity.</p>
              <a href="https://calendly.com/anshul-aigeniq/25-minute-discovery-call" onClick={(e) => { e.preventDefault(); openCalendar() }}>Book a Clarity Call</a>
            </div>
          </aside>
        </div>

        {/* Read Next — 3 columns for video */}
        {related.length > 0 && (
          <div className="art-read-next">
            <p className="art-read-next-label">Keep reading</p>
            <div className="art-read-next-grid art-read-next-grid--3">
              {related.map(r => (
                <Link key={r.id} to={`/insights/${r.slug}`} className="art-read-next-card">
                  <div className="ins-card-top">
                    <span className={`ins-pill ins-pill-${r.type}`}>{r.type}</span>
                    <div className="ins-card-meta">
                      {r.read_time && <span>{r.read_time} min read</span>}
                      {r.video_duration && <span>{r.video_duration}</span>}
                    </div>
                  </div>
                  <h3>{r.title}</h3>
                  {r.standfirst && <p>{r.standfirst}</p>}
                  <span className="ins-arrow-link" style={{ fontSize: '13px' }}>
                    {r.type === 'video' ? 'Watch this one' : 'Read this one'}{' '}
                    <span className="ins-arrow" aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  // ─── Article Layout ──────────────────────────────────────────────────────
  function renderArticlePage(article: Article) {
    return (
      <>
        {/* Breadcrumb */}
        <div className="art-breadcrumb-bar">
          <nav className="art-breadcrumb" aria-label="Breadcrumb">
            <Link to="/insights">Insights</Link>
            <span className="art-breadcrumb-sep" aria-hidden="true">/</span>
            <span>{article.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <div className="art-header">
          <div className="art-header-body">
            <span className={`ins-pill ins-pill-${article.type}`} style={{ marginBottom: 18, display: 'inline-block' }}>
              {article.type}
            </span>
            <h1>{article.title}</h1>
            {article.standfirst && <p className="art-standfirst">{article.standfirst}</p>}
            <div className="art-meta">
              <div className="art-meta-author">
                <div className="art-avatar" aria-hidden="true">{article.author_initials}</div>
                <span>{article.author}</span>
              </div>
              {article.published_at && (
                <>
                  <span className="art-meta-divider" aria-hidden="true">|</span>
                  <span>{formatDate(article.published_at)}</span>
                </>
              )}
              {article.read_time && (
                <>
                  <span className="art-meta-divider" aria-hidden="true">|</span>
                  <span>{article.read_time} min read</span>
                </>
              )}
            </div>
          </div>

          {article.hero_image ? (
            <img src={article.hero_image} alt={article.title ?? 'Article hero image'} className="art-hero-img" width="1200" height="630" loading="eager" decoding="async" />
          ) : (
            <div className="art-hero-img" aria-hidden="true">Hero image / infographic</div>
          )}
        </div>

        {/* Article Body + Sidebar */}
        <div className="art-layout">
          <article>
            {article.content ? (
              <div
                className="art-body-content"
                dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
              />
            ) : (
              <p style={{ color: 'var(--gray-text)', fontStyle: 'italic' }}>Content coming soon.</p>
            )}
            <div className="art-soft-closer">
              <p>
                If any of this is making you think about your own business — what's worth
                fixing, what's worth automating, or just where to start — you know where to find us.
              </p>
              <p className="art-closer-sig">— {article.author}, AiGENiQ</p>
            </div>
          </article>

          <aside className="art-sidebar" aria-label="Article sidebar">
            {headings.length > 0 && (
              <div className="art-sidebar-block">
                <p className="art-sidebar-label">In this article</p>
                <ul className="art-toc-list">
                  {headings.map(h => (
                    <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>
                  ))}
                </ul>
              </div>
            )}
            <div className="art-cta-sidebar">
              <p>If this is making you think about your own business, a 25-minute call is the fastest way to get clarity.</p>
              <a href="https://calendly.com/anshul-aigeniq/25-minute-discovery-call" onClick={(e) => { e.preventDefault(); openCalendar() }}>Book a Clarity Call</a>
            </div>
          </aside>
        </div>

        {/* Read Next — 2 columns for articles */}
        {related.length > 0 && (
          <div className="art-read-next">
            <p className="art-read-next-label">Read next</p>
            <div className="art-read-next-grid">
              {related.slice(0, 2).map(r => (
                <Link key={r.id} to={`/insights/${r.slug}`} className="art-read-next-card">
                  <div className="ins-card-top">
                    <span className={`ins-pill ins-pill-${r.type}`}>{r.type}</span>
                    <div className="ins-card-meta">
                      {r.read_time && <span>{r.read_time} min read</span>}
                    </div>
                  </div>
                  <h3>{r.title}</h3>
                  {r.standfirst && <p>{r.standfirst}</p>}
                  <span className="ins-arrow-link" style={{ fontSize: '13px' }}>
                    {r.type === 'video' ? 'Watch this one' : 'Read this one'}{' '}
                    <span className="ins-arrow" aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <main id="main-content">
        {loading ? (
          <div className="art-loading" role="status" aria-live="polite">Loading…</div>
        ) : notFound ? (
          <div className="art-not-found">
            <h2>Article not found</h2>
            <p>This article doesn't exist or has been unpublished.{' '}
              <Link to="/insights">Back to Insights →</Link>
            </p>
          </div>
        ) : article ? (
          article.type === 'video' ? renderVideoPage(article) : renderArticlePage(article)
        ) : null}
      </main>

      <Footer />
    </>
  )
}
