<template>
  <div class="min-h-screen px-4 md:px-8 py-6 sm:py-8">

    <!-- Home Button mit Pfeil nach oben -->
    <div class="flex justify-center mb-6 sm:mb-8">
      <router-link
          to="/"
          class="flex items-center gap-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
      >
        <div class="bg-gray-100 border border-gray-200 rounded-full p-1.5 sm:p-2">
          <ChevronUpIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </div>
        <span class="text-base sm:text-lg text-gray-700">Home</span>
      </router-link>
    </div>

    <!-- Suchleiste -->
    <div class="max-w-3xl mx-auto mb-8 sm:mb-10">
      <div class="relative">
        <SearchIcon class="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Durchsuche die Bibliothek..."
            class="w-full bg-white border border-gray-300 rounded-full pl-14 sm:pl-16 pr-6 sm:pr-8 py-3 sm:py-4 text-base sm:text-lg placeholder:text-gray-400 text-gray-800 outline-none transition-all focus:border-gray-500 focus:shadow-md"
        />
      </div>
    </div>

    <!-- Titel -->
    <div class="text-center mb-8 sm:mb-12">
      <div class="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <SparklesIcon class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-quicksand font-semibold text-gray-800">
          Deine Reise beginnt hier
        </h1>
        <SparklesIcon class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
      </div>
      <p class="text-base sm:text-lg text-gray-500">Entdecke Inhalte für dein Wohlbefinden</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500">Artikel werden geladen...</p>
    </div>

    <!-- Grid Layout -->
    <div v-else class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-12">
        <router-link
            v-for="(item, index) in filteredItems"
            :key="item.id"
            :to="'/article/' + item.id"
            class="transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
            :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <div class="group bg-white border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full">

            <!-- Bild/Emoji Bereich -->
            <div class="relative h-40 sm:h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
              <div class="text-5xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
                {{ item.emoji }}
              </div>

              <!-- Artikel Icon -->
              <div class="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 sm:p-2.5 bg-gray-700 rounded-full text-white">
                <FileTextIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <!-- Lesezeit Badge -->
              <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700">
                {{ item.readTime }}
              </div>
            </div>

            <!-- Inhalt -->
            <div class="p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl mb-1 sm:mb-2 font-quicksand font-semibold text-gray-800">
                {{ item.title }}
              </h3>
              <p class="text-gray-500 mb-3 sm:mb-4 text-xs sm:text-sm">{{ item.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs sm:text-sm text-gray-500 font-medium">Artikel</span>
                <span class="text-gray-500 group-hover:translate-x-2 transition-transform text-xs sm:text-sm">
                  Entdecken →
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ChevronUp as ChevronUpIcon,
  Search as SearchIcon,
  Sparkles as SparklesIcon,
  FileText as FileTextIcon
} from 'lucide-vue-next'
import { getAllArticles } from '../services/api.js'

const searchQuery = ref('')
const articles = ref([])
const loading = ref(true)

onMounted(async () => {
  articles.value = await getAllArticles()
  loading.value = false
})

const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) return articles.value
  const query = searchQuery.value.toLowerCase()
  return articles.value.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  )
})
</script>