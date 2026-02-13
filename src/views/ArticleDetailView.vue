<template>
  <div class="h-screen flex flex-col">

    <!-- Loading State -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <p class="text-gray-500">Artikel wird geladen...</p>
    </div>

    <template v-else>
      <!-- Top Bar -->
      <div class="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-gray-200 bg-white">
        <button
            @click="goBack"
            class="flex items-center gap-2 px-3 sm:px-5 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ArrowLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          <span class="text-sm sm:text-base text-gray-700">Zurück</span>
        </button>

        <h2 class="text-base sm:text-lg font-quicksand font-semibold text-gray-800 truncate max-w-[50%] text-center">
          {{ article.title }}
        </h2>

        <div class="text-xl sm:text-2xl">{{ article.emoji }}</div>
      </div>

      <!-- Fortschrittsanzeige -->
      <div class="flex items-center justify-center gap-2 py-2 sm:py-3 bg-white border-b border-gray-100">
        <button
            v-for="(screen, index) in screens"
            :key="index"
            @click="scrollToScreen(index)"
            :class="[
            'w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300',
            currentScreen === index
              ? 'bg-gray-700 scale-125'
              : 'bg-gray-300 hover:bg-gray-400'
          ]"
        ></button>
      </div>

      <!-- Horizontaler Scroll Container -->
      <div
          ref="scrollContainer"
          @scroll="onScroll"
          class="flex-1 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style="-webkit-overflow-scrolling: touch;"
      >

        <!-- Screen 1: Facts & Infos -->
        <div class="w-full flex-shrink-0 snap-center overflow-y-auto">
          <div class="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-10">

            <div class="text-center mb-6 sm:mb-8">
              <div class="text-5xl sm:text-6xl mb-4">{{ article.emoji }}</div>
              <h1 class="text-2xl sm:text-4xl font-quicksand font-bold text-gray-800 mb-3 sm:mb-4">
                {{ article.title }}
              </h1>
              <p class="text-sm sm:text-base text-gray-500">{{ article.readTime }}</p>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 mb-4 sm:mb-6">
              <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-gray-800 mb-3 sm:mb-4">Überblick</h3>
              <p class="text-sm sm:text-base text-gray-600 leading-relaxed">{{ article.overview }}</p>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 mb-4 sm:mb-6">
              <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-gray-800 mb-3 sm:mb-4">Wichtige Fakten</h3>
              <div class="space-y-3 sm:space-y-4">
                <div
                    v-for="(fact, index) in article.facts"
                    :key="index"
                    class="flex items-start gap-3"
                >
                  <div class="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span class="text-xs sm:text-sm font-semibold text-gray-600">{{ index + 1 }}</span>
                  </div>
                  <p class="text-sm sm:text-base text-gray-600 leading-relaxed">{{ fact }}</p>
                </div>
              </div>
            </div>

            <div class="flex justify-center mt-6 sm:mt-8">
              <button
                  @click="scrollToScreen(1)"
                  class="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors"
              >
                <span class="text-sm sm:text-base text-gray-600">Literatur & Vorschläge</span>
                <ChevronRightIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <!-- Screen 2: Literatur & Vorschläge -->
        <div class="w-full flex-shrink-0 snap-center overflow-y-auto">
          <div class="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-10">

            <div class="text-center mb-6 sm:mb-8">
              <BookOpenIcon class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h2 class="text-2xl sm:text-3xl font-quicksand font-bold text-gray-800">Literatur & Vorschläge</h2>
            </div>

            <div class="space-y-3 sm:space-y-4">
              <div
                  v-for="(book, index) in article.literature"
                  :key="index"
                  class="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-md transition-all"
              >
                <div class="flex items-start gap-3 sm:gap-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpenIcon class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 class="text-base sm:text-lg font-semibold text-gray-800 mb-1">{{ book.title }}</h4>
                    <p class="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{{ book.author }}</p>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ book.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-center mt-6 sm:mt-8">
              <button
                  @click="scrollToScreen(2)"
                  class="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors"
              >
                <span class="text-sm sm:text-base text-gray-600">Videos & Filme</span>
                <ChevronRightIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <!-- Screen 3: Videos & Filme -->
        <div class="w-full flex-shrink-0 snap-center overflow-y-auto">
          <div class="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-10">

            <div class="text-center mb-6 sm:mb-8">
              <PlayCircleIcon class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h2 class="text-2xl sm:text-3xl font-quicksand font-bold text-gray-800">Videos & Filme</h2>
            </div>

            <div class="space-y-3 sm:space-y-4">
              <div
                  v-for="(video, index) in article.videos"
                  :key="index"
                  class="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-md transition-all"
              >
                <div class="flex items-start gap-3 sm:gap-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PlayCircleIcon class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 class="text-base sm:text-lg font-semibold text-gray-800 mb-1">{{ video.title }}</h4>
                    <p class="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{{ video.duration }}</p>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ video.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-center mt-6 sm:mt-8">
              <button
                  @click="scrollToScreen(3)"
                  class="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors"
              >
                <span class="text-sm sm:text-base text-gray-600">Fazit</span>
                <ChevronRightIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <!-- Screen 4: Fazit -->
        <div class="w-full flex-shrink-0 snap-center overflow-y-auto">
          <div class="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-10">

            <div class="text-center mb-6 sm:mb-8">
              <CheckCircleIcon class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h2 class="text-2xl sm:text-3xl font-quicksand font-bold text-gray-800">Fazit</h2>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 mb-4 sm:mb-6">
              <p class="text-sm sm:text-base text-gray-600 leading-relaxed">{{ article.conclusion }}</p>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 mb-4 sm:mb-6">
              <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-gray-800 mb-3 sm:mb-4">Wichtigste Erkenntnisse</h3>
              <div class="space-y-2 sm:space-y-3">
                <div
                    v-for="(takeaway, index) in article.takeaways"
                    :key="index"
                    class="flex items-start gap-3"
                >
                  <CheckCircleIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p class="text-sm sm:text-base text-gray-600">{{ takeaway }}</p>
                </div>
              </div>
            </div>

            <div class="flex justify-center mt-6 sm:mt-8">
              <button
                  @click="goBack"
                  class="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <ArrowLeftIcon class="w-4 h-4 sm:w-5 sm:h-5" />
                <span class="text-sm sm:text-base">Zurück zur Bibliothek</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft as ArrowLeftIcon,
  ChevronRight as ChevronRightIcon,
  BookOpen as BookOpenIcon,
  PlayCircle as PlayCircleIcon,
  CheckCircle as CheckCircleIcon
} from 'lucide-vue-next'
import { getArticleById } from '../services/api.js'

const route = useRoute()
const router = useRouter()
const scrollContainer = ref(null)
const currentScreen = ref(0)
const loading = ref(true)
const article = ref({})

const screens = ['Facts', 'Literatur', 'Videos', 'Fazit']

onMounted(async () => {
  const id = Number(route.params.id)
  article.value = await getArticleById(id)
  loading.value = false
})

function onScroll() {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const screenWidth = container.clientWidth
  const scrollLeft = container.scrollLeft
  currentScreen.value = Math.round(scrollLeft / screenWidth)
}

function scrollToScreen(index) {
  if (!scrollContainer.value) return
  const screenWidth = scrollContainer.value.clientWidth
  scrollContainer.value.scrollTo({
    left: screenWidth * index,
    behavior: 'smooth'
  })
}

function goBack() {
  router.back()
}
</script>