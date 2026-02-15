<template>
  <!--
    HomeView.vue – Startseite mit Suchleiste, Emotions-Filter und Bibliothek-Link.
    Verwendet Apple-Style Glass-Morphism über dem animierten Hintergrund.

    Quellen:
    - Apple HIG Materials: https://developer.apple.com/design/human-interface-guidelines/materials
    - CSS backdrop-filter: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
    - Tailwind CSS backdrop-blur: https://tailwindcss.com/docs/backdrop-blur
    - Vue 3 Composition API: https://vuejs.org/api/composition-api-setup.html
    - Vue Router Navigation: https://router.vuejs.org/guide/essentials/navigation.html
    - Lucide Vue Next: https://lucide.dev/guide/packages/lucide-vue-next
  -->
  <div class="min-h-screen flex flex-col">

    <AppHeader @open-emergency="$emit('openEmergency')" />

    <!-- Zentrum -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
      <div class="w-full max-w-3xl">

        <!-- Logo (Orange/Amber, dünn wie im Mockup) -->
        <div class="text-center mb-8 sm:mb-12">
          <h1 class="text-5xl sm:text-7xl md:text-8xl font-quicksand font-light text-amber-400">
            WeMood
          </h1>
        </div>

        <!-- Suchleiste -->
        <form @submit.prevent="handleSearch" class="mb-6 sm:mb-8">
          <div class="relative">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Suche nach Themen..."
                class="w-full glass rounded-full px-6 sm:px-8 py-3 sm:py-5 pr-28 sm:pr-32
                     text-base sm:text-lg placeholder:text-violet-400/50 text-violet-800
                     outline-none transition-all
                     focus:bg-white/30 focus:shadow-lg"
            />
            <button
                type="submit"
                class="absolute right-2 top-1/2 -translate-y-1/2
                     px-4 sm:px-8 py-2 sm:py-3 bg-violet-600/90 rounded-full
                     hover:bg-violet-600 transition-colors
                     flex items-center gap-2 text-white text-sm sm:text-base"
            >
              <SearchIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              <span class="hidden sm:inline">Suchen</span>
            </button>
          </div>
        </form>

        <!-- Emotion Filter -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-16">
          <button
              v-for="emotion in emotions"
              :key="emotion.value"
              @click="toggleEmotion(emotion.value)"
              :class="[
              'px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all text-sm sm:text-base',
              selectedEmotions.includes(emotion.value)
                ? 'bg-violet-600 border-violet-600 text-white shadow-md'
                : 'glass-subtle rounded-full text-violet-700 hover:bg-white/25'
            ]"
          >
            {{ emotion.label }}
          </button>
        </div>

        <!-- Bibliothek Navigation (freistehend ohne Container) -->
        <router-link to="/library" class="flex flex-col items-center gap-1 group">
          <span class="text-xl sm:text-2xl font-quicksand text-violet-600 glass-text
                       group-hover:opacity-100 transition-opacity">
            Bibliothek
          </span>
          <ChevronDownIcon class="w-10 h-10 sm:w-12 sm:h-12 text-violet-500 glass-icon
                                  stroke-[1.2] group-hover:opacity-100" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search as SearchIcon, ChevronDown as ChevronDownIcon } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'

const router = useRouter()
defineEmits(['openEmergency'])

const searchQuery = ref('')
const selectedEmotions = ref([])

const emotions = [
  { label: 'Fear', value: 'fear' },
  { label: 'Sadness', value: 'sadness' },
  { label: 'Happiness', value: 'happiness' },
  { label: 'Stress', value: 'stress' },
  { label: 'Energy', value: 'energy' },
  { label: 'Calm', value: 'calm' },
]

function toggleEmotion(val) {
  const idx = selectedEmotions.value.indexOf(val)
  idx >= 0 ? selectedEmotions.value.splice(idx, 1) : selectedEmotions.value.push(val)
}

function handleSearch() {
  router.push({
    name: 'search',
    query: { q: searchQuery.value || 'mental health', emotions: selectedEmotions.value.join(',') },
  })
}
</script>