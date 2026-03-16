export interface Article {
  id: string
  title: string
  slug: string
  standfirst: string | null
  content: string | null
  author: string
  author_initials: string
  published_at: string | null
  read_time: number | null
  type: 'article' | 'video'
  video_duration: string | null
  video_url: string | null
  timestamps: string | null
  youtube_channel_url: string | null
  video_takeaways: string | null
  video_who_for: string | null
  hero_image: string | null
  inline_image_1: string | null
  inline_image_2: string | null
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>
export type ArticleUpdate = Partial<ArticleInsert>
