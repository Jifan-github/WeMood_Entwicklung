<template>
  <!--
    ArticleDetailView.vue – Detailansicht eines Artikels mit horizontalem Scroll.
    4 Karten: Überblick, Literatur, Videos, Fazit.
    Verwendet Apple Liquid Glass Utilities aus style.css.

    Quellen:
    - CSS Scroll Snap: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap
    - Tailwind CSS scroll-snap: https://tailwindcss.com/docs/scroll-snap-type
    - Vue 3 Template Refs: https://vuejs.org/guide/essentials/template-refs.html
    - Vue Router useRoute/useRouter: https://router.vuejs.org/guide/advanced/composition-api.html
    - Apple HIG Materials: https://developer.apple.com/design/human-interface-guidelines/materials
    - CSS backdrop-filter: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
  -->
  <div class="min-h-screen px-4 sm:px-6 py-6 sm:py-10">

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <p class="text-violet-500">Artikel wird geladen...</p>
    </div>

    <template v-else>

      <!-- Zurück Navigation (freistehende Glass-Elemente) -->
      <div class="flex justify-center mb-6 sm:mb-8">
        <button @click="goBack" class="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer">
          <div class="glass rounded-full p-3 sm:p-4 group-hover:bg-white/20 transition-all">
            <ChevronUpIcon class="w-6 h-6 sm:w-8 sm:h-8 text-violet-500" />
          </div>
          <span class="text-lg sm:text-xl text-violet-700 glass px-6 sm:px-8 py-2 sm:py-3 rounded-full
                       group-hover:bg-white/20 transition-all">
            Zurück
          </span>
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
            ? 'glass text-violet-800'
            : 'text-violet-400 hover:text-violet-600'"
        >
          <div
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="currentScreen === index ? 'bg-violet-600' : 'bg-violet-300'"
          />
          <span class="text-xs sm:text-sm">{{ screen }}</span>
        </button>
      </div>

      <!-- Horizontaler Scroll Container -->
      <div class="max-w-5xl mx-auto">
        <div
            ref="scrollContainer"
            @scroll="onScroll"
            class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6
                 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >

          <!-- Karte 1: Überblick -->
          <div class="w-full flex-shrink-0 snap-center">
            <div class="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-10">
              <div class="text-center mb-6 sm:mb-8">
                <div class="text-4xl sm:text-5xl mb-3">{{ article.emoji }}</div>
                <h2 class="text-2xl sm:text-3xl font-quicksand font-semibold text-violet-800 mb-2">
                  {{ article.title }}
                </h2>
                <p class="text-sm text-violet-400">{{ article.readTime }}</p>
              </div>

              <div class="mb-6 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-violet-800 mb-3">Überblick</h3>
                <p class="text-sm sm:text-base text-violet-600 leading-relaxed">{{ article.overview }}</p>
              </div>

              <div class="mb-6 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-violet-800 mb-3">Wichtige Fakten</h3>
                <div class="space-y-3">
                  <div v-for="(fact, i) in article.facts" :key="i" class="flex items-start gap-3">
                    <div class="w-7 h-7 glass-subtle rounded-full
                                flex items-center justify-center shrink-0 mt-0.5">
                      <span class="text-xs font-semibold text-violet-600">{{ i + 1 }}</span>
                    </div>
                    <p class="text-sm sm:text-base text-violet-600 leading-relaxed">{{ fact }}</p>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button @click="scrollToScreen(1)" class="nav-btn">
                  <span class="text-sm text-violet-600">Literatur & Vorschläge</span>
                  <ChevronRightIcon class="w-4 h-4 text-violet-500" />
                </button>
              </div>
            </div>
          </div>

          <!-- Karte 2: Literatur -->
          <div class="w-full flex-shrink-0 snap-center">
            <div class="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-10">
              <div class="text-center mb-6 sm:mb-8">
                <BookOpenIcon class="w-10 h-10 text-violet-400 mx-auto mb-3" />
                <h2 class="text-2xl sm:text-3xl font-quicksand font-semibold text-violet-800">
                  Literatur & Vorschläge
                </h2>
              </div>

              <div class="space-y-4 mb-6 sm:mb-8">
                <div
                    v-for="(book, i) in article.literature" :key="i"
                    class="glass-subtle rounded-xl sm:rounded-2xl p-4 sm:p-5"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 glass-subtle rounded-xl
                                flex items-center justify-center shrink-0">
                      <BookOpenIcon class="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <h4 class="text-sm sm:text-base font-semibold text-violet-800 mb-0.5">{{ book.title }}</h4>
                      <p class="text-xs sm:text-sm text-violet-500 mb-1">{{ book.author }}</p>
                      <p class="text-xs sm:text-sm text-violet-600 leading-relaxed">{{ book.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button @click="scrollToScreen(2)" class="nav-btn">
                  <span class="text-sm text-violet-600">Videos & Filme</span>
                  <ChevronRightIcon class="w-4 h-4 text-violet-500" />
                </button>
              </div>
            </div>
          </div>

          <!-- Karte 3: Videos -->
          <div class="w-full flex-shrink-0 snap-center">
            <div class="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-10">
              <div class="text-center mb-6 sm:mb-8">
                <PlayCircleIcon class="w-10 h-10 text-violet-400 mx-auto mb-3" />
                <h2 class="text-2xl sm:text-3xl font-quicksand font-semibold text-violet-800">
                  Videos & Filme
                </h2>
              </div>

              <div class="space-y-4 mb-6 sm:mb-8">
                <div
                    v-for="(video, i) in article.videos" :key="i"
                    class="glass-subtle rounded-xl sm:rounded-2xl p-4 sm:p-5"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 glass-subtle rounded-xl
                                flex items-center justify-center shrink-0">
                      <PlayCircleIcon class="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <h4 class="text-sm sm:text-base font-semibold text-violet-800 mb-0.5">{{ video.title }}</h4>
                      <p class="text-xs sm:text-sm text-violet-500 mb-1">{{ video.duration }}</p>
                      <p class="text-xs sm:text-sm text-violet-600 leading-relaxed">{{ video.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button @click="scrollToScreen(3)" class="nav-btn">
                  <span class="text-sm text-violet-600">Fazit</span>
                  <ChevronRightIcon class="w-4 h-4 text-violet-500" />
                </button>
              </div>
            </div>
          </div>

          <!-- Karte 4: Fazit -->
          <div class="w-full flex-shrink-0 snap-center">
            <div class="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-10">
              <div class="text-center mb-6 sm:mb-8">
                <CheckCircleIcon class="w-10 h-10 text-violet-400 mx-auto mb-3" />
                <h2 class="text-2xl sm:text-3xl font-quicksand font-semibold text-violet-800">Fazit</h2>
              </div>

              <div class="mb-6 sm:mb-8">
                <p class="text-sm sm:text-base text-violet-600 leading-relaxed">{{ article.conclusion }}</p>
              </div>

              <div class="mb-6 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-quicksand font-semibold text-violet-800 mb-3">
                  Wichtigste Erkenntnisse
                </h3>
                <div class="space-y-3">
                  <div v-for="(t, i) in article.takeaways" :key="i" class="flex items-start gap-3">
                    <CheckCircleIcon class="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <p class="text-sm sm:text-base text-violet-600">{{ t }}</p>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button
                    @click="goBack"
                    class="flex items-center gap-2 px-5 py-2.5 bg-violet-600/90 text-white
                         rounded-full hover:bg-violet-600 transition-colors"
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
  CheckCircle as CheckCircleIcon,
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
  article.value = await getArticleById(Number(route.params.id))
  loading.value = false
})

function onScroll() {
  if (!scrollContainer.value) return
  const { clientWidth, scrollLeft } = scrollContainer.value
  currentScreen.value = Math.round(scrollLeft / clientWidth)
}

function scrollToScreen(index) {
  scrollContainer.value?.scrollTo({
    left: scrollContainer.value.clientWidth * index,
    behavior: 'smooth',
  })
}

function goBack() {
  router.back()
}
</script>

<style scoped>
/*
  Navigations-Button Styling (wiederverwendbar in den Karten).

  Quellen:
  - Tailwind @reference fuer @apply in Vue SFC (Tailwind CSS v4):
    https://tailwindcss.com/docs/functions-and-directives#reference-directive
  - Tailwind @apply Direktive:
    https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply
*/
@reference "../style.css";

.nav-btn {
  @apply flex items-center gap-2 px-5 py-2.5
  glass rounded-full
  hover:bg-white/30 transition-all;
}
</style>