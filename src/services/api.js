/**
 * WeMood API Service
 * Powered by Supabase — database queries via Supabase client.
 *
 * All data lives in Supabase PostgreSQL tables.
 * The Supabase client automatically attaches the logged-in user's
 * JWT so Row Level Security (RLS) policies protect the data.
 *
 * Tables needed in Supabase (set up once in the dashboard or via SQL):
 *   - articles        (id, title, description, emoji, read_time, content jsonb)
 *   - bookmarks       (id, user_id, article_id, created_at)
 *   - mood_logs       (id, user_id, emotion, note, created_at)
 */

import { supabase } from '../lib/supabase.js'

// ── Error helper ──────────────────────────────────────────────────────
function throwIfError(error) {
  if (error) throw new Error(error.message || 'Datenbankfehler')
}

// ── Articles ──────────────────────────────────────────────────────────

/**
 * Search articles by keyword and optional emotion filters.
 * Uses Supabase full-text search on the title + description columns.
 */
export async function searchArticles(query, emotions = []) {
  let q = supabase
    .from('articles')
    .select('id, title, description, emoji, confidence')
    .textSearch('search_vector', query, { type: 'websearch' })

  if (emotions.length) {
    q = q.contains('emotions', emotions)
  }

  const { data, error } = await q.limit(20)
  throwIfError(error)
  return data || []
}

/**
 * Get a single article by ID — full content including facts, videos, etc.
 */
export async function getArticleById(id) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  throwIfError(error)
  return data
}

/**
 * Get all articles for the library with optional pagination.
 */
export async function getAllArticles({ page = 1, limit = 20, emotion = null } = {}) {
  const from = (page - 1) * limit
  const to   = from + limit - 1

  let q = supabase
    .from('articles')
    .select('id, title, description, emoji, read_time')
    .range(from, to)

  if (emotion) {
    q = q.contains('emotions', [emotion])
  }

  const { data, error } = await q
  throwIfError(error)
  return data || []
}

// ── Bookmarks ─────────────────────────────────────────────────────────

/**
 * Save an article to the current user's bookmarks.
 */
export async function bookmarkArticle(articleId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ article_id: articleId })
    .select()
    .single()

  // Ignore "already exists" duplicate errors (unique constraint violation)
  if (error && error.code !== '23505') throwIfError(error)
  return data
}

/**
 * Remove a bookmark.
 */
export async function removeBookmark(articleId) {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('article_id', articleId)

  throwIfError(error)
}

/**
 * Get all bookmarked articles for the current user,
 * joined with the article details.
 */
export async function getBookmarks() {
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      id,
      article_id,
      created_at,
      articles ( id, title, emoji, read_time, description )
    `)
    .order('created_at', { ascending: false })

  throwIfError(error)
  return (data || []).map(b => ({
    bookmarkId: b.id,
    articleId:  b.article_id,
    createdAt:  b.created_at,
    ...b.articles
  }))
}

// ── Mood logs ─────────────────────────────────────────────────────────

/**
 * Log a mood entry for the current user.
 */
export async function logMood({ emotion, note = null }) {
  const { data, error } = await supabase
    .from('mood_logs')
    .insert({ emotion, note })
    .select()
    .single()

  throwIfError(error)
  return data
}

/**
 * Get the current user's mood history.
 */
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