<template>
  <div class="min-h-screen">

    <!-- Top Bar -->
    <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
      <div class="flex items-center gap-3 sm:gap-4">
        <router-link to="/settings" class="p-2 sm:p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
          <ArrowLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </router-link>
        <h1 class="text-2xl sm:text-3xl font-quicksand font-semibold text-gray-800">Konto</h1>
      </div>
      <div class="text-xl sm:text-2xl font-quicksand font-semibold text-gray-800">WeMood</div>
    </div>

    <div class="px-4 sm:px-8 py-4 sm:py-6 max-w-xl mx-auto space-y-4">

      <!-- Avatar + name card -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 sm:w-16 sm:h-16 bg-gray-800 rounded-2xl flex items-center justify-center shrink-0">
            <span class="text-2xl sm:text-3xl font-quicksand font-bold text-white">
              {{ currentUser?.avatar || '?' }}
            </span>
          </div>
          <div>
            <p class="text-lg sm:text-xl font-semibold text-gray-800">{{ currentUser?.name }}</p>
            <p class="text-sm text-gray-400">{{ currentUser?.email }}</p>
          </div>
        </div>

        <!-- Edit name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Anzeigename ändern</label>
          <div class="flex gap-2">
            <input
              v-model="newName"
              type="text"
              :placeholder="currentUser?.name"
              @keyup.enter="handleUpdateName"
              class="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-all"
            />
            <button
              @click="handleUpdateName"
              :disabled="authLoading || !newName.trim() || newName.trim() === currentUser?.name"
              class="px-4 py-2.5 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-2xl transition-all flex items-center gap-1.5"
            >
              <LoaderIcon v-if="authLoading" class="w-3.5 h-3.5 animate-spin" />
              <span>{{ authLoading ? '…' : 'Speichern' }}</span>
            </button>
          </div>

          <!-- Success message -->
          <Transition name="error-fade">
            <p v-if="saveSuccess" class="text-xs text-green-600 mt-2 ml-1 flex items-center gap-1">
              <CheckCircleIcon class="w-3.5 h-3.5" />
              Name erfolgreich gespeichert
            </p>
          </Transition>
        </div>
      </div>

      <!-- Account info -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
        <h2 class="text-base font-semibold text-gray-700 mb-4">Kontoinformationen</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-2 border-b border-gray-50">
            <span class="text-sm text-gray-500">E-Mail</span>
            <span class="text-sm font-medium text-gray-800">{{ currentUser?.email }}</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-gray-50">
            <span class="text-sm text-gray-500">Konto erstellt</span>
            <span class="text-sm font-medium text-gray-800">{{ formattedDate }}</span>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-gray-500">Konto-ID</span>
            <span class="text-xs font-mono text-gray-400">{{ currentUser?.id?.slice(0, 8) }}…</span>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
        <button
          @click="handleLogout"
          class="w-full flex items-center justify-between group"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <LogOutIcon class="w-4 h-4 text-red-500" />
            </div>
            <span class="text-base font-medium text-gray-800">Abmelden</span>
          </div>
          <ChevronRightIcon class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft as ArrowLeftIcon,
  LogOut as LogOutIcon,
  ChevronRight as ChevronRightIcon,
  Loader as LoaderIcon,
  CheckCircle as CheckCircleIcon
} from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { currentUser, logout, updateProfile, authLoading } = useAuth()

const newName = ref('')
const saveSuccess = ref(false)

const formattedDate = computed(() => {
  if (!currentUser.value?.createdAt) return '—'
  return new Date(currentUser.value.createdAt).toLocaleDateString('de-DE', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
})

async function handleUpdateName() {
  if (!newName.value.trim() || newName.value.trim() === currentUser.value?.name) return
  const success = await updateProfile({ name: newName.value })
  if (success) {
    newName.value = ''
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 2500)
  }
}

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<style scoped>
.error-fade-enter-active, .error-fade-leave-active { transition: all 0.25s ease; }
.error-fade-enter-from, .error-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>