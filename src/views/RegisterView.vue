<template>
  <div class="min-h-screen flex flex-col">

    <!-- Top Bar -->
    <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
      <router-link to="/login" class="p-2 sm:p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
        <ArrowLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </router-link>
      <div class="text-xl sm:text-2xl font-quicksand font-semibold text-gray-800">WeMood</div>
      <div class="w-10 sm:w-12" />
    </div>

    <!-- Form -->
    <div class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-sm">

        <!-- Heading -->
        <div class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl font-quicksand font-bold text-gray-800 mb-2">
            Konto erstellen
          </h1>
          <p class="text-gray-500 text-sm sm:text-base">Kostenlos · Keine Werbung</p>
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

          <!-- Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Anzeigename</label>
            <input
              v-model="name"
              type="text"
              placeholder="z. B. Alex"
              autocomplete="name"
              @keyup.enter="handleRegister"
              :class="[
                'w-full bg-gray-50 border rounded-2xl px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all',
                fieldError.name ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-gray-400 focus:bg-white'
              ]"
            />
            <p v-if="fieldError.name" class="text-xs text-red-500 mt-1 ml-1">{{ fieldError.name }}</p>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">E-Mail</label>
            <input
              v-model="email"
              type="email"
              placeholder="deine@email.de"
              autocomplete="email"
              @keyup.enter="handleRegister"
              :class="[
                'w-full bg-gray-50 border rounded-2xl px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all',
                fieldError.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-gray-400 focus:bg-white'
              ]"
            />
            <p v-if="fieldError.email" class="text-xs text-red-500 mt-1 ml-1">{{ fieldError.email }}</p>
          </div>

          <!-- Password -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Passwort</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Mindestens 8 Zeichen"
                autocomplete="new-password"
                @keyup.enter="handleRegister"
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

            <!-- Password strength bar -->
            <div class="mt-2 flex gap-1">
              <div
                v-for="i in 4" :key="i"
                class="h-1 flex-1 rounded-full transition-all duration-300"
                :class="passwordStrength >= i ? strengthColor : 'bg-gray-100'"
              />
            </div>
            <p v-if="password" class="text-xs mt-1 ml-1 transition-colors" :class="strengthTextColor">
              {{ strengthLabel }}
            </p>
            <p v-if="fieldError.password" class="text-xs text-red-500 mt-1 ml-1">{{ fieldError.password }}</p>
          </div>

          <!-- Confirm Password -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Passwort bestätigen</label>
            <input
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Passwort wiederholen"
              autocomplete="new-password"
              @keyup.enter="handleRegister"
              :class="[
                'w-full bg-gray-50 border rounded-2xl px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none transition-all',
                fieldError.confirmPassword ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-gray-400 focus:bg-white'
              ]"
            />
            <p v-if="fieldError.confirmPassword" class="text-xs text-red-500 mt-1 ml-1">{{ fieldError.confirmPassword }}</p>
          </div>

          <!-- Submit -->
          <button
            @click="handleRegister"
            :disabled="authLoading"
            class="w-full py-3 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
          >
            <LoaderIcon v-if="authLoading" class="w-4 h-4 animate-spin" />
            <span>{{ authLoading ? 'Wird erstellt…' : 'Konto erstellen' }}</span>
          </button>
        </div>

        <!-- Login link -->
        <p class="text-center text-sm text-gray-500 mt-5">
          Bereits ein Konto?
          <router-link to="/login" class="text-gray-800 font-semibold hover:underline ml-1">
            Anmelden
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft as ArrowLeftIcon, Eye as EyeIcon, EyeOff as EyeOffIcon, AlertCircle as AlertCircleIcon, Loader as LoaderIcon } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { register, authLoading, authError, clearError } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const fieldError = ref({ name: '', email: '', password: '', confirmPassword: '' })

// Password strength
const passwordStrength = computed(() => {
  const p = password.value
  if (!p) return 0
  let score = 0
  if (p.length >= 8) score++
  if (p.length >= 12) score++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++
  if (/[0-9]/.test(p) || /[^A-Za-z0-9]/.test(p)) score++
  return score
})

const strengthColor = computed(() => {
  if (passwordStrength.value <= 1) return 'bg-red-400'
  if (passwordStrength.value === 2) return 'bg-orange-400'
  if (passwordStrength.value === 3) return 'bg-yellow-400'
  return 'bg-green-400'
})

const strengthTextColor = computed(() => {
  if (passwordStrength.value <= 1) return 'text-red-500'
  if (passwordStrength.value === 2) return 'text-orange-500'
  if (passwordStrength.value === 3) return 'text-yellow-600'
  return 'text-green-600'
})

const strengthLabel = computed(() => {
  if (passwordStrength.value <= 1) return 'Schwach'
  if (passwordStrength.value === 2) return 'Ausreichend'
  if (passwordStrength.value === 3) return 'Gut'
  return 'Stark'
})

function validate() {
  fieldError.value = { name: '', email: '', password: '', confirmPassword: '' }
  let valid = true

  if (!name.value.trim()) {
    fieldError.value.name = 'Bitte gib deinen Namen ein.'
    valid = false
  }

  if (!email.value.trim()) {
    fieldError.value.email = 'Bitte gib deine E-Mail ein.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    fieldError.value.email = 'Bitte gib eine gültige E-Mail ein.'
    valid = false
  }

  if (!password.value) {
    fieldError.value.password = 'Bitte wähle ein Passwort.'
    valid = false
  } else if (password.value.length < 8) {
    fieldError.value.password = 'Das Passwort muss mindestens 8 Zeichen lang sein.'
    valid = false
  }

  if (!confirmPassword.value) {
    fieldError.value.confirmPassword = 'Bitte bestätige dein Passwort.'
    valid = false
  } else if (password.value !== confirmPassword.value) {
    fieldError.value.confirmPassword = 'Die Passwörter stimmen nicht überein.'
    valid = false
  }

  return valid
}

async function handleRegister() {
  clearError()
  if (!validate()) return

  const success = await register({ name: name.value, email: email.value, password: password.value })
  if (success) router.push('/')
}
</script>

<style scoped>
.error-fade-enter-active, .error-fade-leave-active { transition: all 0.25s ease; }
.error-fade-enter-from, .error-fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>