/**
 * useAuth — WeMood Authentication Composable
 * Powered by Supabase Auth
 *
 * Supabase handles:
 *  - JWT access + refresh tokens (stored securely in localStorage by the SDK)
 *  - Email verification (sends the email automatically on register)
 *  - Password hashing (bcrypt, handled server-side)
 *  - Session restore on page reload
 *
 * This file is the only place in the app that touches Supabase Auth.
 * All other files use api.js for data.
 */

import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase.js'

// ── Shared reactive state (singleton across all components) ───────────
const currentUser = ref(null)
const authError   = ref(null)
const authLoading = ref(false)

// ── Internal helpers ──────────────────────────────────────────────────
function buildUserObject(supabaseUser) {
  if (!supabaseUser) return null
  const meta = supabaseUser.user_metadata || {}
  return {
    id:            supabaseUser.id,
    email:         supabaseUser.email,
    name:          meta.name || supabaseUser.email.split('@')[0],
    avatar:        (meta.name || supabaseUser.email).charAt(0).toUpperCase(),
    createdAt:     supabaseUser.created_at,
    emailVerified: !!supabaseUser.email_confirmed_at
  }
}

function parseSupabaseError(error) {
  if (!error) return 'Ein unbekannter Fehler ist aufgetreten.'
  // Map common Supabase error messages to German
  const msg = error.message || ''
  if (msg.includes('already registered') || msg.includes('User already registered'))
    return 'Diese E-Mail-Adresse ist bereits registriert.'
  if (msg.includes('Invalid login credentials'))
    return 'E-Mail oder Passwort ist falsch.'
  if (msg.includes('Email not confirmed'))
    return 'Bitte bestätige zuerst deine E-Mail-Adresse. Schau in deinen Posteingang.'
  if (msg.includes('Password should be at least'))
    return 'Das Passwort muss mindestens 6 Zeichen lang sein.'
  if (msg.includes('Unable to validate email address'))
    return 'Bitte gib eine gültige E-Mail-Adresse ein.'
  if (msg.includes('over_email_send_rate_limit') || msg.includes('rate limit'))
    return 'Zu viele Versuche. Bitte warte kurz und versuche es erneut.'
  return msg || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
}

// ── Composable ────────────────────────────────────────────────────────
export function useAuth() {
  const isLoggedIn = computed(() => currentUser.value !== null)

  /**
   * Called once in App.vue on mount.
   * Restores session from Supabase's localStorage cache,
   * then listens for auth state changes (login, logout, token refresh).
   */
  async function initAuth() {
    // Get current session (Supabase restores it from localStorage automatically)
    const { data: { session } } = await supabase.auth.getSession()
    currentUser.value = buildUserObject(session?.user ?? null)

    // Keep reactive state in sync with Supabase's internal state
    supabase.auth.onAuthStateChange((_event, session) => {
      currentUser.value = buildUserObject(session?.user ?? null)
    })
  }

  /**
   * Register a new account.
   * Supabase automatically sends a verification email.
   * The user must click the link before they can log in
   * (controlled by "Confirm email" setting in Supabase dashboard).
   */
  async function register({ name, email, password }) {
    authLoading.value = true
    authError.value   = null

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name.trim() },           // stored in user_metadata
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      })

      if (error) {
        authError.value = parseSupabaseError(error)
        return false
      }

      // If email confirmation is required, data.user exists but session is null
      // We return 'verify' so the UI can show "check your email" screen
      if (data.user && !data.session) {
        return 'verify'
      }

      return true
    } catch (e) {
      authError.value = 'Netzwerkfehler. Bitte überprüfe deine Verbindung.'
      return false
    } finally {
      authLoading.value = false
    }
  }

  /**
   * Log in with email + password.
   */
  async function login({ email, password }) {
    authLoading.value = true
    authError.value   = null

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        authError.value = parseSupabaseError(error)
        return false
      }

      return true
    } catch {
      authError.value = 'Netzwerkfehler. Bitte überprüfe deine Verbindung.'
      return false
    } finally {
      authLoading.value = false
    }
  }

  /**
   * Log out — clears session from Supabase and localStorage.
   */
  async function logout() {
    await supabase.auth.signOut()
    // onAuthStateChange above will set currentUser to null automatically
  }

  /**
   * Update the user's display name.
   */
  async function updateProfile({ name }) {
    authLoading.value = true
    authError.value   = null

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { name: name.trim() }
      })

      if (error) {
        authError.value = parseSupabaseError(error)
        return false
      }

      currentUser.value = buildUserObject(data.user)
      return true
    } catch {
      authError.value = 'Netzwerkfehler. Bitte überprüfe deine Verbindung.'
      return false
    } finally {
      authLoading.value = false
    }
  }

  /**
   * Resend the verification email.
   */
  async function resendVerification(email) {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: `${window.location.origin}/verify-email` }
      })
      if (error) {
        authError.value = parseSupabaseError(error)
        return false
      }
      return true
    } catch {
      return false
    }
  }

  function clearError() { authError.value = null }

  return {
    currentUser,
    isLoggedIn,
    authLoading,
    authError,
    initAuth,
    register,
    login,
    logout,
    updateProfile,
    resendVerification,
    clearError
  }
}

// Export supabase client so api.js can use it for data queries
export { supabase }