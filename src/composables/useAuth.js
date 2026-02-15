/**
 * useAuth — WeMood Authentication Composable
 *
 * Currently uses localStorage as a mock backend.
 * To connect a real API, replace the functions marked with TODO.
 *
 * Shared reactive state across all components via module-level refs.
 */

import { ref, computed } from 'vue'

// ── Shared state (module-level = singleton across all components) ──
const currentUser = ref(JSON.parse(localStorage.getItem('wemood_user') || 'null'))
const authError = ref(null)
const authLoading = ref(false)

// ── Helpers ──────────────────────────────────────────────────────────
function getUsers() {
  return JSON.parse(localStorage.getItem('wemood_users') || '[]')
}

function saveUsers(users) {
  localStorage.setItem('wemood_users', JSON.stringify(users))
}

function setCurrentUser(user) {
  currentUser.value = user
  if (user) {
    localStorage.setItem('wemood_user', JSON.stringify(user))
  } else {
    localStorage.removeItem('wemood_user')
  }
}

function hashPassword(password) {
  // Simple deterministic hash for mock purposes — NOT secure for production
  // TODO: Replace with bcrypt/proper hashing on the backend
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    hash = ((hash << 5) - hash) + password.charCodeAt(i)
    hash |= 0
  }
  return hash.toString(36)
}

// ── Composable ───────────────────────────────────────────────────────
export function useAuth() {
  const isLoggedIn = computed(() => currentUser.value !== null)

  /**
   * Register a new account.
   * TODO: Replace body with: await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({name, email, password}) })
   */
  async function register({ name, email, password }) {
    authLoading.value = true
    authError.value = null

    // Simulate network delay
    await new Promise(r => setTimeout(r, 600))

    try {
      const users = getUsers()

      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        authError.value = 'Diese E-Mail-Adresse ist bereits registriert.'
        return false
      }

      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
        avatar: name.trim().charAt(0).toUpperCase()
      }

      users.push(newUser)
      saveUsers(users)

      // Log in immediately after registration
      const { passwordHash, ...safeUser } = newUser
      setCurrentUser(safeUser)
      return true
    } finally {
      authLoading.value = false
    }
  }

  /**
   * Log in with email + password.
   * TODO: Replace body with: await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({email, password}) })
   */
  async function login({ email, password }) {
    authLoading.value = true
    authError.value = null

    await new Promise(r => setTimeout(r, 600))

    try {
      const users = getUsers()
      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() &&
             u.passwordHash === hashPassword(password)
      )

      if (!user) {
        authError.value = 'E-Mail oder Passwort ist falsch.'
        return false
      }

      const { passwordHash, ...safeUser } = user
      setCurrentUser(safeUser)
      return true
    } finally {
      authLoading.value = false
    }
  }

  /**
   * Log out.
   * TODO: Also call: await fetch('/api/auth/logout', { method: 'POST' })
   */
  function logout() {
    setCurrentUser(null)
  }

  /**
   * Update display name.
   * TODO: Replace with: await fetch('/api/auth/me', { method: 'PATCH', body: JSON.stringify({name}) })
   */
  async function updateProfile({ name }) {
    authLoading.value = true
    authError.value = null

    await new Promise(r => setTimeout(r, 400))

    try {
      const users = getUsers()
      const idx = users.findIndex(u => u.id === currentUser.value.id)
      if (idx === -1) return false

      users[idx].name = name.trim()
      users[idx].avatar = name.trim().charAt(0).toUpperCase()
      saveUsers(users)

      const { passwordHash, ...safeUser } = users[idx]
      setCurrentUser(safeUser)
      return true
    } finally {
      authLoading.value = false
    }
  }

  function clearError() {
    authError.value = null
  }

  return {
    currentUser,
    isLoggedIn,
    authLoading,
    authError,
    register,
    login,
    logout,
    updateProfile,
    clearError
  }
}