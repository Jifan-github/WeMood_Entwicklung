<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
    <div class="w-full max-w-4xl">

      <!-- Zurück Button -->
      <router-link
          to="/"
          class="mb-6 sm:mb-8 inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ArrowLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        <span class="text-sm sm:text-base text-gray-700">Zurück</span>
      </router-link>

      <!-- Loading -->
      <div v-if="loading" class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-12">
        <div class="flex flex-col items-center gap-3 py-8">
          <LoaderIcon class="w-8 h-8 text-gray-400 animate-spin" />
          <p class="text-gray-400 text-sm">Analyse wird durchgeführt…</p>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-12 text-center">
        <div class="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircleIcon class="w-7 h-7 text-red-400" />
        </div>
        <p class="text-gray-600 font-medium mb-2">Suche fehlgeschlagen</p>
        <p class="text-gray-400 text-sm mb-6">{{ error }}</p>
        <button @click="doSearch" class="px-6 py-2.5 bg-gray-800 text-white rounded-full text-sm hover:bg-gray-900 transition-colors">
          Erneut suchen
        </button>
      </div>

      <!-- Results -->
      <div v-else class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-12">

        <div class="mb-8 sm:mb-10 text-center">
          <h2 class="text-2xl sm:text-3xl mb-4 sm:mb-6 font-quicksand font-semibold text-gray-800">
            Deine Analyse
          </h2>
          <p class="text-base sm:text-xl text-gray-600 leading-relaxed">
            Basierend auf deiner Suche nach
            <span class="font-semibold text-gray-800">„{{ searchQueryText }}"</span>
            haben wir folgende Themen erkannt:
          </p>
        </div>

        <!-- No results -->
        <div v-if="searchResults.length === 0" class="text-center py-8">
          <p class="text-gray-400 mb-2">Keine Artikel gefunden.</p>
          <p class="text-sm text-gray-400">Versuche einen anderen Suchbegriff.</p>
        </div>

        <!-- Result cards -->
        <div v-else class="space-y-4 sm:space-y-6">
          <h3 class="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4">Relevante Themen für dich:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <router-link
                v-for="result in searchResults"
                :key="result.id"
                :to="'/article/' + result.id"
                class="group bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-gray-100 transition-all text-left"
            >
              <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gray-200 flex items-center justify-center text-2xl sm:text-3xl">
                  {{ result.emoji }}
                </div>
                <div>
                  <h4 class="text-xl sm:text-2xl font-quicksand font-semibold text-gray-800">
                    {{ result.title }}
                  </h4>
                  <span v-if="result.confidence" class="text-xs sm:text-sm text-gray-400">
                    {{ result.confidence }}% Übereinstimmung
                  </span>
                </div>
              </div>
              <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
                {{ result.description }}
              </p>
              <div class="mt-3 sm:mt-4 text-gray-500 group-hover:translate-x-2 transition-transform text-sm">
                Mehr erfahren →
              </div>
            </router-link>
          </div>
        </div>

        <div class="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
          <router-link
              to="/library"
              class="block w-full py-3 sm:py-4 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors text-gray-700 text-base sm:text-lg text-center"
          >
            Zur Bibliothek für weitere Ressourcen
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowLeft as ArrowLeftIcon,
  Loader as LoaderIcon,
  AlertCircle as AlertCircleIcon
} from 'lucide-vue-next'
import { searchArticles } from '../services/api.js'

const route           = useRoute()
const searchResults   = ref([])
const loading         = ref(true)
const error           = ref(null)
const searchQueryText = ref('')

async function doSearch() {
  loading.value = true
  error.value   = null
  try {
    const emotions = route.query.emotions ? route.query.emotions.split(',').filter(Boolean) : []
    searchResults.value = await searchArticles(searchQueryText.value, emotions)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  searchQueryText.value = route.query.q || ''
  doSearch()
})
</script>