/**
 * WeMood API Service — Supabase
 *
 * Column name note: Supabase returns snake_case (read_time, article_id).
 * This file maps everything to camelCase so the views don't need to change.
 */

import { supabase } from '../lib/supabase.js'

// ── Error helper ──────────────────────────────────────────────────────
function throwIfError(error) {
  if (error) throw new Error(error.message || 'Datenbankfehler')
}

// Map a raw DB article row → camelCase shape the views expect
function mapArticle(row) {
  if (!row) return null
  return {
    id:          row.id,
    title:       row.title,
    description: row.description,
    emoji:       row.emoji,
    readTime:    row.read_time,
    confidence:  row.confidence ?? 0,
    emotions:    row.emotions ?? [],
    overview:    row.overview,
    facts:       row.facts ?? [],
    literature:  row.literature ?? [],
    videos:      row.videos ?? [],
    conclusion:  row.conclusion,
    takeaways:   row.takeaways ?? []
  }
}

// ── Articles ──────────────────────────────────────────────────────────

/**
 * Search articles by keyword + optional emotion filters.
 * Uses a simple ilike search — works without any special Supabase setup.
 */
export async function searchArticles(query, emotions = []) {
  const term = query?.trim() || ''

  let q = supabase
    .from('articles')
    .select('id, title, description, emoji, read_time, confidence, emotions')

  // Simple keyword search across title + description
  if (term) {
    q = q.or(`title.ilike.%${term}%,description.ilike.%${term}%,overview.ilike.%${term}%`)
  }

  if (emotions.length) {
    q = q.overlaps('emotions', emotions)
  }

  const { data, error } = await q.limit(20)
  throwIfError(error)
  return (data || []).map(mapArticle)
}

/**
 * Get a single article by ID — full content.
 */
export async function getArticleById(id) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  throwIfError(error)
  return mapArticle(data)
}

/**
 * Get all articles for the library.
 */
export async function getAllArticles({ page = 1, limit = 20, emotion = null } = {}) {
  const from = (page - 1) * limit
  const to   = from + limit - 1

  let q = supabase
    .from('articles')
    .select('id, title, description, emoji, read_time, emotions')
    .order('id')
    .range(from, to)

  if (emotion) {
    q = q.overlaps('emotions', [emotion])
  }

  const { data, error } = await q
  throwIfError(error)
  return (data || []).map(mapArticle)
}

// ── Bookmarks ─────────────────────────────────────────────────────────

export async function bookmarkArticle(articleId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ article_id: articleId })
    .select()
    .single()

  if (error && error.code !== '23505') throwIfError(error)
  return data
}

export async function removeBookmark(articleId) {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('article_id', articleId)

  throwIfError(error)
}

export async function getBookmarks() {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('id, article_id, created_at, articles(id, title, emoji, read_time, description)')
    .order('created_at', { ascending: false })

  throwIfError(error)
  return (data || []).map(b => ({
    bookmarkId: b.id,
    articleId:  b.article_id,
    createdAt:  b.created_at,
    ...mapArticle(b.articles)
  }))
}

// ── Mood logs ─────────────────────────────────────────────────────────

export async function logMood({ emotion, note = null }) {
  const { data, error } = await supabase
    .from('mood_logs')
    .insert({ emotion, note })
    .select()
    .single()

  throwIfError(error)
  return data
}

export async function getMoodHistory({ from = null, to = null, limit = 50 } = {}) {
  let q = supabase
    .from('mood_logs')
    .select('id, emotion, note, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (from) q = q.gte('created_at', from)
  if (to)   q = q.lte('created_at', to)

  const { data, error } = await q
  throwIfError(error)
  return data || []
}