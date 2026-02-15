<template>
  <div class="min-h-screen flex flex-col">

    <!-- Top Bar -->
    <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
      <router-link to="/" class="p-2 sm:p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
        <ArrowLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </router-link>
      <div class="text-xl sm:text-2xl font-quicksand font-semibold text-gray-800">WeMood</div>
      <div class="w-10 sm:w-12" /> <!-- spacer -->
    </div>

    <!-- Form -->
    <div class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-sm">

        <!-- Heading -->
        <div class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl font-quicksand font-bold text-gray-800 mb-2">
            Willkommen zurück
          </h1>
          <p class="text-gray-500 text-sm sm:text-base">Melde dich an, um fortzufahren</p>
        </div>

        <!-- Card -->
        <div class="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">

          <!-- Error -->
          <Transition name="error-fade">
            <div v-if="authError" class="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-2xl px-4 py-3 mb-5 text-sm">
              <AlertCircleIcon class="w-4 h-4 shrink-0" />
              {{ authError }}
            </div>
          </Transition>

          <!-- Email -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">E-Mail</label>
            <input
              v-model="email"
              type="email"
              placeholder="deine@email.de"
              autocomplete="email"
              @keyup.enter="handleLogin"
              :class="[
                'w-full bg-gray-50 border rounded-2xl px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all',
                fieldError.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-gray-400 focus:bg-white'
              ]"
            />
            <p v-if="fieldError.email" class="text-xs text-red-500 mt-1 ml-1">{{ fieldError.email }}</p>
          </div>

          <!-- Password -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Passwort</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                @keyup.enter="handleLogin"
                :class="[
                  'w-full bg-gray-50 border rounded-2xl px-4 py-3 pr-11 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all',
                  fieldError.password ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-gray-400 focus:bg-white'
                ]"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <EyeOffIcon v-if="showPassword" class="w-4 h-4" />
                <EyeIcon v-else class="w-4 h-4" />
              </button>
            </div>
            <p v-if="fieldError.password" class="text-xs text-red-500 mt-1 ml-1">{{ fieldError.password }}</p>
          </div>

          <!-- Submit -->
          <button
            @click="handleLogin"
            :disabled="authLoading"
            class="w-full py-3 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
          >
            <LoaderIcon v-if="authLoading" class="w-4 h-4 animate-spin" />
            <span>{{ authLoading ? 'Wird angemeldet…' : 'Anmelden' }}</span>
          </button>
        </div>

        <!-- Register link -->
        <p class="text-center text-sm text-gray-500 mt-5">
          Noch kein Konto?
          <router-link to="/register" class="text-gray-800 font-semibold hover:underline ml-1">
            Jetzt registrieren
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft as ArrowLeftIcon, Eye as EyeIcon, EyeOff as EyeOffIcon, AlertCircle as AlertCircleIcon, Loader as LoaderIcon } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { login, authLoading, authError, clearError } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const fieldError = ref({ email: '', password: '' })

function validate() {
  fieldError.value = { email: '', password: '' }
  let valid = true

  if (!email.value.trim()) {
    fieldError.value.email = 'Bitte gib deine E-Mail ein.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    fieldError.value.email = 'Bitte gib eine gültige E-Mail ein.'
    valid = false
  }

  if (!password.value) {
    fieldError.value.password = 'Bitte gib dein Passwort ein.'
    valid = false
  }

  return valid
}

async function handleLogin() {
  clearError()
  if (!validate()) return

  const success = await login({ email: email.value, password: password.value })
  if (success) router.push('/')
}
</script>

<style scoped>
.error-fade-enter-active, .error-fade-leave-active { transition: all 0.25s ease; }
.error-fade-enter-from, .error-fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>