<template>
  <div class="min-h-screen flex flex-col">

    <!-- Top Bar -->
    <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
      <div class="w-10 sm:w-12" />
      <div class="text-xl sm:text-2xl font-quicksand font-semibold text-gray-800">WeMood</div>
      <div class="w-10 sm:w-12" />
    </div>

    <div class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-sm text-center">

        <!-- Verified successfully -->
        <div v-if="status === 'success'">
          <div class="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon class="w-8 h-8 text-green-500" />
          </div>
          <h1 class="text-2xl sm:text-3xl font-quicksand font-bold text-gray-800 mb-3">
            E-Mail bestätigt!
          </h1>
          <p class="text-gray-500 mb-8">Dein Konto ist jetzt aktiv. Du kannst dich jetzt anmelden.</p>
          <router-link
            to="/login"
            class="inline-block px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-2xl font-medium transition-colors"
          >
            Zur Anmeldung
          </router-link>
        </div>

        <!-- Checking / loading -->
        <div v-else-if="status === 'loading'">
          <div class="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <LoaderIcon class="w-8 h-8 text-gray-400 animate-spin" />
          </div>
          <h1 class="text-2xl font-quicksand font-bold text-gray-800 mb-2">Wird bestätigt…</h1>
          <p class="text-gray-500">Einen Moment bitte.</p>
        </div>

        <!-- Check your email (after registration) -->
        <div v-else-if="status === 'pending'">
          <div class="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <MailIcon class="w-8 h-8 text-blue-400" />
          </div>
          <h1 class="text-2xl sm:text-3xl font-quicksand font-bold text-gray-800 mb-3">
            Schau in dein Postfach
          </h1>
          <p class="text-gray-500 mb-2">
            Wir haben eine Bestätigungs-E-Mail an
            <span class="font-semibold text-gray-700">{{ pendingEmail }}</span>
            gesendet.
          </p>
          <p class="text-sm text-gray-400 mb-8">Klicke auf den Link in der E-Mail um dein Konto zu aktivieren.</p>

          <!-- Resend -->
          <button
            @click="handleResend"
            :disabled="resendCooldown > 0"
            class="text-sm text-gray-500 hover:text-gray-700 disabled:text-gray-300 transition-colors"
          >
            {{ resendCooldown > 0 ? `Erneut senden in ${resendCooldown}s` : 'E-Mail erneut senden' }}
          </button>

          <Transition name="fade">
            <p v-if="resendSuccess" class="text-xs text-green-600 mt-2">E-Mail wurde erneut gesendet ✓</p>
          </Transition>
        </div>

        <!-- Error -->
        <div v-else>
          <div class="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircleIcon class="w-8 h-8 text-red-400" />
          </div>
          <h1 class="text-2xl sm:text-3xl font-quicksand font-bold text-gray-800 mb-3">
            Link ungültig
          </h1>
          <p class="text-gray-500 mb-8">Der Bestätigungslink ist abgelaufen oder ungültig. Bitte registriere dich erneut.</p>
          <router-link
            to="/register"
            class="inline-block px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-2xl font-medium transition-colors"
          >
            Neu registrieren
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  CheckCircle as CheckCircleIcon,
  Loader as LoaderIcon,
  Mail as MailIcon,
  AlertCircle as AlertCircleIcon
} from 'lucide-vue-next'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../composables/useAuth.js'

const route  = useRoute()
const router = useRouter()
const { resendVerification } = useAuth()

// Read the pending email passed via router query (set by RegisterView)
const pendingEmail = route.query.email || ''

// 'loading' | 'pending' | 'success' | 'error'
const status       = ref(pendingEmail ? 'pending' : 'loading')
const resendCooldown = ref(0)
const resendSuccess  = ref(false)
let cooldownTimer    = null

onMounted(async () => {
  // If Supabase redirected back here with a token in the URL hash,
  // the SDK handles it automatically via detectSessionInUrl.
  // We just need to check if we now have a valid session.
  if (!pendingEmail) {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (session) {
      status.value = 'success'
      // Redirect to home after a short delay
      setTimeout(() => router.push('/'), 2500)
    } else {
      status.value = 'error'
    }
  }
})

async function handleResend() {
  if (!pendingEmail || resendCooldown.value > 0) return
  const ok = await resendVerification(pendingEmail)
  if (ok) {
    resendSuccess.value = true
    resendCooldown.value = 60
    cooldownTimer = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(cooldownTimer)
        resendSuccess.value = false
      }
    }, 1000)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>