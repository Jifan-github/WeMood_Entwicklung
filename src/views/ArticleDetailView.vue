<template>
  <div class="min-h-screen px-4 sm:px-6 py-6 sm:py-10">

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <p class="text-gray-500">Artikel wird geladen...</p>
    </div>

    <template v-else>

      <!-- Home Button oben mittig -->
      <div class="flex justify-center mb-6 sm:mb-8">
        <button
            @click="goBack"
            class="flex items-center gap-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
        >
          <div class="bg-gray-100 border border-gray-200 rounded-full p-1.5 sm:p-2">
            <ChevronUpIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </div>
          <span class="text-base sm:text-lg text-gray-700">Zurück</span>
        </button>
      </div>

      <!-- Fortschrittsanzeige -->
      <div class="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button
            v-for="(screen, index) in screens"
            :key="index"
            @click="scrollToScreen(index)"
            class="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full transition-all duration-300"
            :class="currentScreen === index
            ? 'bg-white border border-gray-300 text-gray-800'
            : 'text-gray-400 hover:text-gray-600'"
        >
          <div
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="currentScreen === index ? 'bg-gray-700' : 'bg-gray-300'"
          ></div>
          <span class="text-xs sm:text-sm">{{ screen }}</span>
        </button>
      </div>

      <!-- Horizontaler Scroll Container mit Karten -->
      <div class="max-w-5xl mx-auto">
        <div
            ref="scrollContainer"
            @scroll="onScroll"
            class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6"
            style="-webkit-overflow-scrolling: touch; scrollbar-width: none;"
        >

          <!-- Karte 1: Überblick -->
          <div class="w-full flex-shrink-0 snap-center">
            <div class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-10">

              <div class="text-center mb-6 sm:mb-8">
                <div class="text-4xl sm:text-5xl mb-3">{{ article.emoji }}</div>
                <h2 class="text-2xl sm:text-3xl font-quicksand font-semibold text-gray-800 mb-2">
                  {{ article.title }}
                </h2>
                <p class="text-sm text-gray-400">{{ article.readTime }}</p>
              </div>

              <div class="mb-6 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-gray-800 mb-3">Überblick</h3>
                <p class="text-sm sm:text-base text-gray-600 leading-relaxed">{{ article.overview }}</p>
              </div>

              <div class="mb-6 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-gray-800 mb-3">Wichtige Fakten</h3>
                <div class="space-y-3">
                  <div
                      v-for="(fact, index) in article.facts"
                      :key="index"
                      class="flex items-start gap-3"
                  >
                    <div class="w-7 h-7 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="text-xs font-semibold text-gray-600">{{ index + 1 }}</span>
                    </div>
                    <p class="text-sm sm:text-base text-gray-600 leading-relaxed">{{ fact }}</p>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button
                    @click="scrollToScreen(1)"
                    class="flex items-center gap-2 px-5 py-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span class="text-sm text-gray-600">Literatur & Vorschläge</span>
                  <ChevronRightIcon class="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <!-- Karte 2: Literatur & Vorschläge -->
          <div class="w-full flex-shrink-0 snap-center">
            <div class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-10">

              <div class="text-center mb-6 sm:mb-8">
                <BookOpenIcon class="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h2 class="text-2xl sm:text-3xl font-quicksand font-semibold text-gray-800">
                  Literatur & Vorschläge
                </h2>
              </div>

              <div class="space-y-4 mb-6 sm:mb-8">
                <div
                    v-for="(book, index) in article.literature"
                    :key="index"
                    class="bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpenIcon class="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 class="text-sm sm:text-base font-semibold text-gray-800 mb-0.5">{{ book.title }}</h4>
                      <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ book.author }}</p>
                      <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ book.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button
                    @click="scrollToScreen(2)"
                    class="flex items-center gap-2 px-5 py-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span class="text-sm text-gray-600">Videos & Filme</span>
                  <ChevronRightIcon class="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <!-- Karte 3: Videos & Filme -->
          <div class="w-full flex-shrink-0 snap-center">
            <div class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-10">

              <div class="text-center mb-6 sm:mb-8">
                <PlayCircleIcon class="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h2 class="text-2xl sm:text-3xl font-quicksand font-semibold text-gray-800">
                  Videos & Filme
                </h2>
              </div>

              <div class="space-y-4 mb-6 sm:mb-8">
                <div
                    v-for="(video, index) in article.videos"
                    :key="index"
                    class="bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PlayCircleIcon class="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 class="text-sm sm:text-base font-semibold text-gray-800 mb-0.5">{{ video.title }}</h4>
                      <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ video.duration }}</p>
                      <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ video.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button
                    @click="scrollToScreen(3)"
                    class="flex items-center gap-2 px-5 py-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span class="text-sm text-gray-600">Fazit</span>
                  <ChevronRightIcon class="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <!-- Karte 4: Fazit -->
          <div class="w-full flex-shrink-0 snap-center">
            <div class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-10">

              <div class="text-center mb-6 sm:mb-8">
                <CheckCircleIcon class="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h2 class="text-2xl sm:text-3xl font-quicksand font-semibold text-gray-800">
                  Fazit
                </h2>
              </div>

              <div class="mb-6 sm:mb-8">
                <p class="text-sm sm:text-base text-gray-600 leading-relaxed">{{ article.conclusion }}</p>
              </div>

              <div class="mb-6 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-gray-800 mb-3">Wichtigste Erkenntnisse</h3>
                <div class="space-y-3">
                  <div
                      v-for="(takeaway, index) in article.takeaways"
                      :key="index"
                      class="flex items-start gap-3"
                  >
                    <CheckCircleIcon class="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p class="text-sm sm:text-base text-gray-600">{{ takeaway }}</p>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button
                    @click="goBack"
                    class="flex items-center gap-2 px-5 py-2.5 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeftIcon class="w-4 h-4" />
                  <span class="text-sm">Zurück</span>
                </button>
              </div>
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
  ChevronUp as ChevronUpIcon,
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

const screens = ['Überblick', 'Literatur', 'Videos', 'Fazit']

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

<style scoped>
/* Scrollbar verstecken */
div::-webkit-scrollbar {
  display: none;
}
</style>