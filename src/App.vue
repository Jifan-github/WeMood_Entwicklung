<template>
  <!--
    App.vue – Wurzel-Komponente der WeMood-Anwendung.
    Beinhaltet den globalen animierten Hintergrund und das Routing.

    Quellen:
    - Vue 3 Single File Components: https://vuejs.org/guide/scaling-up/sfc.html
    - Vue Router <router-view>: https://router.vuejs.org/guide/
  -->
  <div class="min-h-screen relative">
    <!-- Globaler animierter Hintergrund -->
    <AnimatedBackground />

    <!-- Seiten-Inhalt über dem Hintergrund -->
    <router-view @open-emergency="openEmergency" />

    <!-- Notfall-Modal -->
    <EmergencyModal ref="emergencyModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import EmergencyModal from './components/EmergencyModal.vue'

const emergencyModal = ref(null)

function openEmergency() {
  emergencyModal.value?.open()
}
</script>