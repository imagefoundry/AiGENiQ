import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Article, ArticleInsert, ArticleUpdate } from '../types/article'
import '../styles/insights.css'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin'

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ─── Blank article form state ─────────────────────────────────────────────

interface FormState {
  title: string
  slug: string
  standfirst: string
  content: string
  author: string
  author_initials: string
  published_at: string
  read_time: string
  type: 'article' | 'video'
  video_duration: string
  video_url: string
  timestamps: string
  youtube_channel_url: string
  video_takeaways: string
  video_who_for: string
  hero_image: string
  inline_image_1: string
  inline_image_2: string
  featured: boolean
  published: boolean
}

function blankForm(): FormState {
  return {
    title: '',
    slug: '',
    standfirst: '',
    content: '',
    author: 'Anshul Kapoor',
    author_initials: 'AK',
    published_at: new Date().toISOString().split('T')[0],
    read_time: '',
    type: 'article',
    video_duration: '',
    video_url: '',
    timestamps: '',
    youtube_channel_url: '',
    video_takeaways: '',
    video_who_for: '',
    hero_image: '',
    inline_image_1: '',
    inline_image_2: '',
    featured: false,
    published: false,
  }
}

function articleToForm(a: Article): FormState {
  return {
    title: a.title,
    slug: a.slug,
    standfirst: a.standfirst ?? '',
    content: a.content ?? '',
    author: a.author,
    author_initials: a.author_initials,
    published_at: a.published_at ?? new Date().toISOString().split('T')[0],
    read_time: a.read_time ? String(a.read_time) : '',
    type: a.type,
    video_duration: a.video_duration ?? '',
    video_url: a.video_url ?? '',
    timestamps: a.timestamps ?? '',
    youtube_channel_url: a.youtube_channel_url ?? '',
    video_takeaways: a.video_takeaways ?? '',
    video_who_for: a.video_who_for ?? '',
    hero_image: a.hero_image ?? '',
    inline_image_1: a.inline_image_1 ?? '',
    inline_image_2: a.inline_image_2 ?? '',
    featured: a.featured,
    published: a.published,
  }
}

// ─── Article Modal ────────────────────────────────────────────────────────

interface ModalProps {
  initial: FormState
  title: string
  saving: boolean
  error: string
  onSave: (form: FormState) => void
  onClose: () => void
}

function ArticleModal({ initial, title, saving, error, onSave, onClose }: ModalProps) {
  const [form, setForm] = useState<FormState>(initial)
  const [uploading, setUploading] = useState(false)

  function field(key: keyof FormState, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function uploadImage(file: File, fieldKey: keyof FormState) {
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(path, file, { upsert: true })
    if (!uploadError && data) {
      const { data: urlData } = supabase.storage
        .from('article-images')
        .getPublicUrl(data.path)
      field(fieldKey, urlData.publicUrl)
    }
    setUploading(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    await uploadImage(file, 'hero_image')
  }

  async function handleInlineImage1Upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    await uploadImage(file, 'inline_image_1')
  }

  async function handleInlineImage2Upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    await uploadImage(file, 'inline_image_2')
  }

  // Auto-generate slug from title if slug is still empty
  function handleTitleChange(value: string) {
    setForm(prev => ({
      ...prev,
      title: value,
      slug: prev.slug === '' || prev.slug === slugify(prev.title) ? slugify(value) : prev.slug,
    }))
  }

  const isVideo = form.type === 'video'

  return (
    <div className="admin-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="admin-modal" role="dialog" aria-modal aria-labelledby="modal-title">
        <div className="admin-modal-header">
          <h2 className="admin-modal-title" id="modal-title">{title}</h2>
          <button className="admin-modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {error && <p className="admin-error">{error}</p>}

        {/* Title */}
        <div className="admin-form-group-light">
          <label className="admin-form-label" htmlFor="f-title">Title *</label>
          <input
            id="f-title"
            className="admin-form-input-light"
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder={isVideo ? 'Video title' : 'Article title'}
            required
          />
        </div>

        {/* Slug */}
        <div className="admin-form-group-light">
          <label className="admin-form-label" htmlFor="f-slug">Slug *</label>
          <input
            id="f-slug"
            className="admin-form-input-light"
            value={form.slug}
            onChange={e => field('slug', e.target.value)}
            placeholder="url-friendly-slug"
            required
          />
        </div>

        {/* Standfirst */}
        <div className="admin-form-group-light">
          <label className="admin-form-label" htmlFor="f-standfirst">Standfirst</label>
          <input
            id="f-standfirst"
            className="admin-form-input-light"
            value={form.standfirst}
            onChange={e => field('standfirst', e.target.value)}
            placeholder="One-sentence summary shown in cards and under the title"
          />
        </div>

        {/* ── VIDEO-ONLY FIELDS ── */}
        {isVideo && (
          <>
            <div className="admin-form-group-light">
              <label className="admin-form-label" htmlFor="f-video-url">YouTube URL *</label>
              <input
                id="f-video-url"
                className="admin-form-input-light"
                value={form.video_url}
                onChange={e => field('video_url', e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="admin-hint">Paste the full YouTube URL — the video will be embedded on the page.</p>
            </div>

            <div className="admin-form-group-light">
              <label className="admin-form-label" htmlFor="f-yt-channel">YouTube Channel URL</label>
              <input
                id="f-yt-channel"
                className="admin-form-input-light"
                value={form.youtube_channel_url}
                onChange={e => field('youtube_channel_url', e.target.value)}
                placeholder="https://www.youtube.com/@YourChannel"
              />
              <p className="admin-hint">Used for the "Subscribe on YouTube" button in the sidebar.</p>
            </div>
          </>
        )}

        {/* ── ARTICLE-ONLY FIELDS ── */}
        {!isVideo && (
          <>
            <div className="admin-form-group-light">
              <label className="admin-form-label">Hero image</label>
              {form.hero_image && (
                <img
                  src={form.hero_image}
                  alt="Hero preview"
                  style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 2, marginBottom: 8 }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="admin-form-input-light"
                onChange={handleImageUpload}
                disabled={uploading}
                style={{ padding: '6px 10px' }}
              />
              {uploading && <p className="admin-hint">Uploading…</p>}
              {form.hero_image && (
                <p className="admin-hint" style={{ wordBreak: 'break-all' }}>{form.hero_image}</p>
              )}
            </div>

            <div className="admin-form-group-light">
              <label className="admin-form-label">Inline image 1 — use <code>{'{{image1}}'}</code> in content</label>
              {form.inline_image_1 && (
                <img src={form.inline_image_1} alt="Inline 1 preview"
                  style={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 2, marginBottom: 8 }} />
              )}
              <input type="file" accept="image/*" className="admin-form-input-light"
                onChange={handleInlineImage1Upload} disabled={uploading} style={{ padding: '6px 10px' }} />
              {form.inline_image_1 && (
                <p className="admin-hint" style={{ wordBreak: 'break-all' }}>{form.inline_image_1}</p>
              )}
            </div>

            <div className="admin-form-group-light">
              <label className="admin-form-label">Inline image 2 — use <code>{'{{image2}}'}</code> in content</label>
              {form.inline_image_2 && (
                <img src={form.inline_image_2} alt="Inline 2 preview"
                  style={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 2, marginBottom: 8 }} />
              )}
              <input type="file" accept="image/*" className="admin-form-input-light"
                onChange={handleInlineImage2Upload} disabled={uploading} style={{ padding: '6px 10px' }} />
              {form.inline_image_2 && (
                <p className="admin-hint" style={{ wordBreak: 'break-all' }}>{form.inline_image_2}</p>
              )}
            </div>
          </>
        )}

        {/* Content — Article OR 3-section Video */}
        {isVideo ? (
          <>
            <div className="admin-form-group-light">
              <label className="admin-form-label" htmlFor="f-about">About this video</label>
              <textarea
                id="f-about"
                className="admin-form-textarea"
                value={form.content}
                onChange={e => field('content', e.target.value)}
                placeholder="What this video is about and why it matters…"
                style={{ minHeight: 120 }}
              />
            </div>
            <div className="admin-form-group-light">
              <label className="admin-form-label" htmlFor="f-takeaways">What you'll come away with</label>
              <textarea
                id="f-takeaways"
                className="admin-form-textarea"
                value={form.video_takeaways}
                onChange={e => field('video_takeaways', e.target.value)}
                placeholder="Key insights or outcomes the viewer will get…"
                style={{ minHeight: 120 }}
              />
            </div>
            <div className="admin-form-group-light">
              <label className="admin-form-label" htmlFor="f-whofor">Who this is for</label>
              <textarea
                id="f-whofor"
                className="admin-form-textarea"
                value={form.video_who_for}
                onChange={e => field('video_who_for', e.target.value)}
                placeholder="Business owners, operations teams, anyone looking to…"
                style={{ minHeight: 100 }}
              />
            </div>
          </>
        ) : (
          <div className="admin-form-group-light">
            <label className="admin-form-label" htmlFor="f-content">Content (HTML)</label>
            <textarea
              id="f-content"
              className="admin-form-textarea"
              value={form.content}
              onChange={e => field('content', e.target.value)}
              placeholder={"<h2 id='section-one'>Section heading</h2>\n<p>Paragraph text…</p>\n<blockquote><p>Pull quote text.</p></blockquote>"}
              style={{ minHeight: 280 }}
            />
            <p className="admin-hint">
              Write HTML. Use <code>&lt;h2 id="..."&gt;</code> for headings (generates ToC),{' '}
              <code>&lt;blockquote&gt;</code> for pull quotes, <code>&lt;ul&gt;</code> for lists.
            </p>
          </div>
        )}

        {/* Author + Initials */}
        <div className="admin-form-row">
          <div className="admin-form-group-light">
            <label className="admin-form-label" htmlFor="f-author">Author</label>
            <input
              id="f-author"
              className="admin-form-input-light"
              value={form.author}
              onChange={e => field('author', e.target.value)}
            />
          </div>
          <div className="admin-form-group-light">
            <label className="admin-form-label" htmlFor="f-initials">Author initials</label>
            <input
              id="f-initials"
              className="admin-form-input-light"
              value={form.author_initials}
              onChange={e => field('author_initials', e.target.value)}
              maxLength={3}
              placeholder="AK"
            />
          </div>
        </div>

        {/* Date + Duration / Read time */}
        <div className="admin-form-row">
          <div className="admin-form-group-light">
            <label className="admin-form-label" htmlFor="f-date">Published date</label>
            <input
              id="f-date"
              type="date"
              className="admin-form-input-light"
              value={form.published_at}
              onChange={e => field('published_at', e.target.value)}
            />
          </div>
          <div className="admin-form-group-light">
            <label className="admin-form-label" htmlFor="f-duration">
              {isVideo ? 'Video duration (e.g. 18 min)' : 'Read time (mins)'}
            </label>
            {isVideo ? (
              <input
                id="f-duration"
                className="admin-form-input-light"
                value={form.video_duration}
                onChange={e => field('video_duration', e.target.value)}
                placeholder="18 min"
              />
            ) : (
              <input
                id="f-duration"
                type="number"
                min="1"
                className="admin-form-input-light"
                value={form.read_time}
                onChange={e => field('read_time', e.target.value)}
                placeholder="5"
              />
            )}
          </div>
        </div>

        {/* Toggles */}
        <div className="admin-toggle-row">
          <input
            type="checkbox"
            id="f-featured"
            checked={form.featured}
            onChange={e => field('featured', e.target.checked)}
          />
          <label className="admin-toggle-label" htmlFor="f-featured">
            Featured (shown prominently on Insights landing)
          </label>
        </div>

        <div className="admin-toggle-row">
          <input
            type="checkbox"
            id="f-published"
            checked={form.published}
            onChange={e => field('published', e.target.checked)}
          />
          <label className="admin-toggle-label" htmlFor="f-published">
            Published (visible to the public)
          </label>
        </div>

        <div className="admin-form-footer">
          <button className="admin-btn admin-btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => onSave(form)}
            disabled={saving}
          >
            {saving ? 'Saving…' : isVideo ? 'Save video' : 'Save article'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Login Screen ─────────────────────────────────────────────────────────

interface LoginProps {
  onLogin: () => void
}

function LoginScreen({ onLogin }: LoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError('Incorrect password.')
      setPassword('')
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <span className="admin-login-logo">AiGENiQ<span>.</span></span>
        <h2>Admin</h2>
        <p className="admin-login-sub">Enter the admin password to continue.</p>

        {error && <p className="admin-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-pw">Password</label>
            <input
              id="admin-pw"
              type="password"
              className="admin-form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%' }}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [activeTab, setActiveTab] = useState<'article' | 'video'>('article')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Article | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [toast, setToast] = useState('')

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }, [])

  async function fetchArticles() {
    setLoading(true)
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setArticles(data as Article[])
    setLoading(false)
  }

  useEffect(() => {
    if (authed) fetchArticles()
  }, [authed])

  function openEdit(article: Article) {
    setEditTarget(article)
    setFormError('')
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditTarget(null)
    setFormError('')
  }

  async function handleSave(form: FormState) {
    if (!form.title.trim() || !form.slug.trim()) {
      setFormError('Title and slug are required.')
      return
    }

    setSaving(true)
    setFormError('')

    const payload: ArticleInsert = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      standfirst: form.standfirst.trim() || null,
      content: form.content.trim() || null,
      author: form.author.trim() || 'Anshul Kapoor',
      author_initials: form.author_initials.trim() || 'AK',
      published_at: form.published_at || null,
      read_time: form.read_time ? parseInt(form.read_time, 10) : null,
      type: form.type,
      video_duration: form.video_duration.trim() || null,
      video_url: form.video_url.trim() || null,
      timestamps: form.timestamps.trim() || null,
      youtube_channel_url: form.youtube_channel_url.trim() || null,
      video_takeaways: form.video_takeaways.trim() || null,
      video_who_for: form.video_who_for.trim() || null,
      hero_image: form.hero_image.trim() || null,
      inline_image_1: form.inline_image_1.trim() || null,
      inline_image_2: form.inline_image_2.trim() || null,
      featured: form.featured,
      published: form.published,
    }

    let error

    if (editTarget) {
      const update: ArticleUpdate = payload
      ;({ error } = await supabase
        .from('articles')
        .update(update)
        .eq('id', editTarget.id))
    } else {
      ;({ error } = await supabase.from('articles').insert(payload))
    }

    setSaving(false)

    if (error) {
      setFormError(error.message)
      return
    }

    closeModal()
    showToast(editTarget ? 'Article updated.' : 'Article created.')
    fetchArticles()
  }

  async function handleTogglePublish(article: Article) {
    await supabase
      .from('articles')
      .update({ published: !article.published } as ArticleUpdate)
      .eq('id', article.id)
    showToast(`Article ${article.published ? 'unpublished' : 'published'}.`)
    fetchArticles()
  }

  async function handleDuplicate(article: Article) {
    const newSlug = `${article.slug}-copy-${Date.now().toString(36)}`
    const payload: ArticleInsert = {
      title: `${article.title} (Copy)`,
      slug: newSlug,
      standfirst: article.standfirst,
      content: article.content,
      author: article.author,
      author_initials: article.author_initials,
      published_at: article.published_at,
      read_time: article.read_time,
      type: article.type,
      video_duration: article.video_duration,
      video_url: article.video_url,
      timestamps: article.timestamps,
      youtube_channel_url: article.youtube_channel_url,
      video_takeaways: article.video_takeaways,
      video_who_for: article.video_who_for,
      hero_image: article.hero_image,
      inline_image_1: article.inline_image_1,
      inline_image_2: article.inline_image_2,
      featured: false,
      published: false,
    }
    const { data, error } = await supabase.from('articles').insert(payload).select().single()
    if (!error && data) {
      showToast('Article duplicated.')
      fetchArticles()
      openEdit(data as Article)
    }
  }

  async function handleDelete(article: Article) {
    if (!window.confirm(`Delete "${article.title}"? This cannot be undone.`)) return
    await supabase.from('articles').delete().eq('id', article.id)
    showToast('Article deleted.')
    fetchArticles()
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <Link to="/" className="admin-header-logo">
          AiGENiQ<span>.</span>&nbsp;
          <span style={{ color: '#555', fontWeight: 400, fontSize: 14 }}>Admin</span>
        </Link>
        <div className="admin-header-right">
          <Link
            to="/insights"
            className="admin-btn admin-btn-ghost"
            style={{ textDecoration: 'none', fontSize: 13 }}
          >
            ← View Insights
          </Link>
          <button
            className="admin-btn admin-btn-ghost"
            onClick={() => setAuthed(false)}
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#111',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: 4,
            border: '1px solid #333',
            zIndex: 2000,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          {toast}
        </div>
      )}

      {/* Content */}
      <div className="admin-container">
        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab${activeTab === 'article' ? ' active' : ''}`}
            onClick={() => setActiveTab('article')}
          >
            Articles
          </button>
          <button
            className={`admin-tab${activeTab === 'video' ? ' active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            Videos
          </button>
        </div>

        <div className="admin-articles-header">
          <h1 className="admin-articles-title">
            {activeTab === 'article' ? 'Articles' : 'Videos'}
          </h1>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => {
              setEditTarget(null)
              setFormError('')
              setModalOpen(true)
            }}
          >
            + New {activeTab === 'article' ? 'article' : 'video'}
          </button>
        </div>

        {loading ? (
          <div className="admin-empty" role="status">Loading…</div>
        ) : articles.filter(a => a.type === activeTab).length === 0 ? (
          <div className="admin-empty">
            No {activeTab === 'article' ? 'articles' : 'videos'} yet.{' '}
            <button
              className="admin-btn admin-btn-primary"
              onClick={() => { setEditTarget(null); setFormError(''); setModalOpen(true) }}
              style={{ marginLeft: 8 }}
            >
              Create your first one
            </button>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.filter(a => a.type === activeTab).map(article => (
                  <tr key={article.id}>
                    <td>
                      <strong>{article.title}</strong>
                      {article.featured && (
                        <span
                          className="admin-type-badge"
                          style={{ marginLeft: 8, background: 'rgba(167,244,50,0.15)', color: '#3a6000' }}
                        >
                          featured
                        </span>
                      )}
                    </td>
                    <td style={{ color: 'var(--gray-text)', fontSize: 12 }}>
                      {article.slug}
                    </td>
                    <td style={{ color: 'var(--gray-text)' }}>
                      {article.published_at ? formatDate(article.published_at) : '—'}
                    </td>
                    <td>
                      <span
                        className={`admin-status-badge ${
                          article.published ? 'admin-status-published' : 'admin-status-draft'
                        }`}
                      >
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="admin-btn admin-btn-ghost admin-btn-sm"
                          onClick={() => openEdit(article)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-ghost admin-btn-sm"
                          onClick={() => handleDuplicate(article)}
                        >
                          Duplicate
                        </button>
                        <button
                          className="admin-btn admin-btn-ghost admin-btn-sm"
                          onClick={() => handleTogglePublish(article)}
                        >
                          {article.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={() => handleDelete(article)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ArticleModal
          initial={editTarget ? articleToForm(editTarget) : { ...blankForm(), type: activeTab }}
          title={editTarget ? `Edit ${activeTab}` : `New ${activeTab}`}
          saving={saving}
          error={formError}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
