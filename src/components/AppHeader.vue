<template>
  <!--
    AppHeader.vue
    Einheitlicher Header mit Logo, Notfall-Button und Einstellungen.

    Quellen:
    - Vue Router <router-link>: https://router.vuejs.org/guide/
    - Lucide Icons für Vue: https://lucide.dev/guide/packages/lucide-vue-next
    - Tailwind CSS Flexbox: https://tailwindcss.com/docs/flex
  -->
  <header class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
    <!-- Logo -->
    <router-link to="/" class="text-xl sm:text-2xl text-gray-800 font-quicksand font-semibold">
      WeMood
    </router-link>

    <!-- Rechte Seite -->
    <div class="flex items-center gap-2 sm:gap-4">
      <!-- Notfall-Hilfe -->
      <button
          @click="$emit('openEmergency')"
          class="px-3 sm:px-6 py-2 bg-red-500 text-white text-sm sm:text-base rounded-full
               hover:bg-red-600 transition-colors"
      >
        Notfall-Hilfe
      </button>

      <!-- Einstellungen -->
      <router-link
          to="/settings"
          class="p-2 sm:p-3 bg-white/60 backdrop-blur-sm rounded-full
               hover:bg-white/80 transition-colors"
      >
        <SettingsIcon class="w-5 h-5 text-gray-700" />
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { Settings as SettingsIcon } from 'lucide-vue-next'

defineEmits(['openEmergency'])
</script>