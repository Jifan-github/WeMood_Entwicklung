<template>
  <div class="min-h-screen">

    <!-- Top Bar -->
    <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
      <div class="flex items-center gap-3 sm:gap-4">
        <router-link
            to="/"
            class="p-2 sm:p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          <ArrowLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </router-link>
        <h1 class="text-2xl sm:text-3xl font-quicksand font-semibold text-gray-800">
          Einstellungen
        </h1>
      </div>
      <div class="text-xl sm:text-2xl font-quicksand font-semibold text-gray-800">
        WeMood
      </div>
    </div>

    <!-- Inhalt -->
    <div class="px-4 sm:px-8 py-4 sm:py-6 max-w-5xl mx-auto space-y-4">

      <!-- Konto -->
      <div class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Konto</h2>
        </div>

        <!-- Logged in -->
        <router-link
          v-if="isLoggedIn"
          to="/account"
          class="flex items-center justify-between group p-3 sm:p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
              <span class="text-base font-bold text-white font-quicksand">{{ currentUser?.avatar }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-800">{{ currentUser?.name }}</p>
              <p class="text-xs text-gray-400">{{ currentUser?.email }}</p>
            </div>
          </div>
          <ChevronRightIcon class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </router-link>

        <!-- Guest -->
        <div v-else class="flex flex-col sm:flex-row gap-3">
          <router-link
            to="/login"
            class="flex-1 py-3 text-center bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-2xl transition-colors"
          >
            Anmelden
          </router-link>
          <router-link
            to="/register"
            class="flex-1 py-3 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-2xl transition-colors"
          >
            Registrieren
          </router-link>
        </div>
      </div>

      <!-- Erscheinungsbild -->
      <div class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8">

        <!-- Überschrift -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <PaletteIcon class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Erscheinungsbild</h2>
        </div>

        <!-- Farbschema -->
        <div class="mb-6">
          <label class="text-base sm:text-lg text-gray-800 mb-3 block font-medium">Farbschema</label>
          <div class="grid grid-cols-2 gap-3">
            <button
                v-for="scheme in colorSchemes"
                :key="scheme.value"
                @click="colorScheme = scheme.value"
                :class="[
                'p-3 sm:p-4 border-2 rounded-xl sm:rounded-2xl transition-all',
                colorScheme === scheme.value
                  ? 'border-gray-700 bg-gray-100'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              ]"
            >
              <div
                  class="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl mb-2"
                  :class="scheme.gradient"
              ></div>
              <p class="text-sm sm:text-base text-gray-700">{{ scheme.label }}</p>
            </button>
          </div>
        </div>

        <!-- Helligkeit -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <label class="text-base sm:text-lg text-gray-800 flex items-center gap-2 font-medium">
              <SunIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              Helligkeit
            </label>
            <span class="text-sm sm:text-base text-gray-600">{{ brightness }}%</span>
          </div>
          <input
              type="range"
              min="0"
              max="100"
              v-model.number="brightness"
              class="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:sm:w-6 [&::-webkit-slider-thumb]:sm:h-6 [&::-webkit-slider-thumb]:bg-gray-700 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        <!-- Dunkelmodus -->
        <div class="flex items-center justify-between p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl">
          <div class="flex items-center gap-3">
            <MoonIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            <span class="text-base sm:text-lg text-gray-800">Dunkelmodus</span>
          </div>
          <button
              @click="darkMode = !darkMode"
              :class="[
              'w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-all relative',
              darkMode ? 'bg-gray-700' : 'bg-gray-300'
            ]"
          >
            <div
                :class="[
                'w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full transition-all absolute top-1',
                darkMode ? 'right-1' : 'left-1'
              ]"
            ></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  ArrowLeft as ArrowLeftIcon,
  Palette as PaletteIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  User as UserIcon,
  ChevronRight as ChevronRightIcon
} from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.js'

const { currentUser, isLoggedIn } = useAuth()

const brightness = ref(80)
const darkMode = ref(false)
const colorScheme = ref('orange-lavender')

const colorSchemes = [
  { value: 'orange-lavender', label: 'Orange-Lavender', gradient: 'bg-gradient-to-r from-orange-400 to-purple-400' },
  { value: 'blue-pink', label: 'Blau-Rosa', gradient: 'bg-gradient-to-r from-blue-400 to-pink-400' },
  { value: 'green-teal', label: 'Grün-Türkis', gradient: 'bg-gradient-to-r from-green-400 to-teal-400' },
  { value: 'sunset', label: 'Sonnenuntergang', gradient: 'bg-gradient-to-r from-orange-500 to-red-400' }
]
</script>