<template>
  <div class="min-h-screen bg-gray-100">
    <router-view @open-emergency="openEmergency" />
    <EmergencyModal ref="emergencyModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EmergencyModal from './components/EmergencyModal.vue'
import { useAuth } from './composables/useAuth.js'

const emergencyModal = ref(null)
const { initAuth } = useAuth()

function openEmergency() {
  emergencyModal.value?.open()
}

// Restore session on every page load/refresh
onMounted(() => {
  initAuth()
})
</script>