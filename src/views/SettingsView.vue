<template>
  <!--
    SettingsView.vue – Einstellungen: Farbschema, Helligkeit, Dunkelmodus.

    Quellen:
    - Tailwind CSS Forms Styling: https://tailwindcss.com/docs/appearance
    - Vue 3 v-model: https://vuejs.org/guide/components/v-model.html
    - Tailwind CSS backdrop-blur: https://tailwindcss.com/docs/backdrop-blur
  -->
  <div class="min-h-screen">

    <!-- Top Bar -->
    <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
      <div class="flex items-center gap-3 sm:gap-4">
        <router-link
            to="/"
            class="p-2 sm:p-3 glass rounded-full
                 hover:bg-white/25 transition-all"
        >
          <ArrowLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 text-violet-700" />
        </router-link>
        <h1 class="text-2xl sm:text-3xl font-quicksand font-semibold text-violet-800">
          Einstellungen
        </h1>
      </div>
      <div class="text-xl sm:text-2xl font-quicksand font-semibold text-violet-800">
        WeMood
      </div>
    </div>

    <!-- Inhalt -->
    <div class="px-4 sm:px-8 py-4 sm:py-6 max-w-5xl mx-auto">
      <div class="glass-strong
                  rounded-2xl sm:rounded-3xl p-6 sm:p-8">

        <!-- Überschrift -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 rounded-full
                      flex items-center justify-center">
            <PaletteIcon class="w-5 h-5 sm:w-6 sm:h-6 text-violet-700" />
          </div>
          <h2 class="text-xl sm:text-2xl font-semibold text-violet-800">Erscheinungsbild</h2>
        </div>

        <!-- Farbschema -->
        <div class="mb-6">
          <label class="text-base sm:text-lg text-violet-800 mb-3 block font-medium">Farbschema</label>
          <div class="grid grid-cols-2 gap-3">
            <button
                v-for="scheme in colorSchemes"
                :key="scheme.value"
                @click="colorScheme = scheme.value"
                :class="[
                'p-3 sm:p-4 border-2 rounded-xl sm:rounded-2xl transition-all',
                colorScheme === scheme.value
                  ? 'border-violet-600 bg-white/18'
                  : 'border-white/40 glass-subtle hover:bg-white/25'
              ]"
            >
              <div class="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl mb-2" :class="scheme.gradient" />
              <p class="text-sm sm:text-base text-violet-700">{{ scheme.label }}</p>
            </button>
          </div>
        </div>

        <!-- Helligkeit -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <label class="text-base sm:text-lg text-violet-800 flex items-center gap-2 font-medium">
              <SunIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              Helligkeit
            </label>
            <span class="text-sm sm:text-base text-violet-600">{{ brightness }}%</span>
          </div>
          <input
              type="range" min="0" max="100"
              v-model.number="brightness"
              class="w-full h-2 bg-white/15 rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                   [&::-webkit-slider-thumb]:sm:w-6 [&::-webkit-slider-thumb]:sm:h-6
                   [&::-webkit-slider-thumb]:bg-violet-600 [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        <!-- Dunkelmodus -->
        <div class="flex items-center justify-between p-3 sm:p-4
                    glass-subtle rounded-xl sm:rounded-2xl">
          <div class="flex items-center gap-3">
            <MoonIcon class="w-4 h-4 sm:w-5 sm:h-5 text-violet-700" />
            <span class="text-base sm:text-lg text-violet-800">Dunkelmodus</span>
          </div>
          <button
              @click="darkMode = !darkMode"
              :class="[
              'w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-all relative',
              darkMode ? 'bg-violet-600' : 'bg-violet-300'
            ]"
          >
            <div
                :class="[
                'w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full transition-all absolute top-1',
                darkMode ? 'right-1' : 'left-1'
              ]"
            />
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
} from 'lucide-vue-next'

const brightness = ref(80)
const darkMode = ref(false)
const colorScheme = ref('orange-lavender')

const colorSchemes = [
  { value: 'orange-lavender', label: 'Orange-Lavender', gradient: 'bg-gradient-to-r from-orange-400 to-purple-400' },
  { value: 'blue-pink', label: 'Blau-Rosa', gradient: 'bg-gradient-to-r from-blue-400 to-pink-400' },
  { value: 'green-teal', label: 'Grün-Türkis', gradient: 'bg-gradient-to-r from-green-400 to-teal-400' },
  { value: 'sunset', label: 'Sonnenuntergang', gradient: 'bg-gradient-to-r from-orange-500 to-red-400' },
]
</script>