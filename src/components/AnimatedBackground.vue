<template>
  <!--
    AnimatedBackground.vue
    Animierter Hintergrund passend zum Figma-Mockup:
    - Kräftiger Lila → Pink → Orange Farbverlauf (cycled)
    - Zentrale, deutlich sichtbare Blobs mit Morph-Animation

    Quellen:
    - CSS @keyframes: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
    - CSS radial-gradient(): https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient
    - CSS linear-gradient(): https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient
    - CSS filter blur(): https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur
    - CSS border-radius organische Formen: https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
    - CSS transform: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
    - Animated Gradients Technik: https://css-tricks.com/animating-gradients/
    - Vue 3 v-for + :style: https://vuejs.org/guide/essentials/list.html
    - Tailwind CSS Farbreferenz: https://tailwindcss.com/docs/colors
  -->
  <div class="fixed inset-0 -z-10 overflow-hidden">

    <!-- Animierter Farbverlauf -->
    <div class="absolute inset-0 gradient-cycle" />

    <!-- Sichtbare Blobs (zentral, deutlich) -->
    <div
        v-for="blob in blobs"
        :key="blob.id"
        class="absolute"
        :style="blob.style"
    />
  </div>
</template>

<script setup>
/**
 * Blob-Konfiguration passend zum Figma-Mockup.
 * Zentral platziert, moderate Blur (60px), höhere Opacity (0.45).
 *
 * Farben: Violet (#7C3AED, #A78BFA), Pink (#EC4899, #F472B6),
 *         Orange (#F59E0B, #FBBF24), Indigo (#818CF8)
 *
 * Quelle Farbwerte: https://tailwindcss.com/docs/colors
 */
const blobs = [
  {
    id: 1,
    style: {
      width: '500px', height: '500px',
      background: 'linear-gradient(135deg, #A78BFA, #7C3AED, #6D28D9)',
      top: '15%', left: '20%',
      filter: 'blur(60px)', opacity: 0.45,
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      animation: 'morphBlob1 10s ease-in-out infinite, moveBlob1 18s ease-in-out infinite',
    },
  },
  {
    id: 2,
    style: {
      width: '450px', height: '450px',
      background: 'linear-gradient(135deg, #F472B6, #EC4899, #DB2777)',
      top: '30%', right: '15%',
      filter: 'blur(60px)', opacity: 0.4,
      borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
      animation: 'morphBlob2 12s ease-in-out infinite, moveBlob2 20s ease-in-out infinite',
    },
  },
  {
    id: 3,
    style: {
      width: '420px', height: '420px',
      background: 'linear-gradient(135deg, #FBBF24, #F59E0B, #D97706)',
      bottom: '20%', left: '30%',
      filter: 'blur(60px)', opacity: 0.35,
      borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%',
      animation: 'morphBlob3 14s ease-in-out infinite, moveBlob3 22s ease-in-out infinite',
    },
  },
  {
    id: 4,
    style: {
      width: '380px', height: '380px',
      background: 'linear-gradient(135deg, #C4B5FD, #A78BFA, #8B5CF6)',
      top: '10%', right: '30%',
      filter: 'blur(60px)', opacity: 0.4,
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      animation: 'morphBlob1 16s ease-in-out infinite, moveBlob4 15s ease-in-out infinite, pulse 7s ease-in-out infinite',
    },
  },
]
</script>

<style scoped>
/*
  ── GRADIENT ──
  Kräftiger Lila → Pink → Orange Verlauf wie im Mockup.
  Quelle: https://css-tricks.com/animating-gradients/
*/
.gradient-cycle {
  background: linear-gradient(
      135deg,
      #7C3AED 0%,     /* violet-600 */
      #A78BFA 15%,     /* violet-400 */
      #C084FC 30%,     /* purple-400 */
      #E879F9 45%,     /* fuchsia-400 */
      #F0ABFC 55%,     /* fuchsia-300 */
      #C084FC 70%,     /* purple-400 */
      #818CF8 85%,     /* indigo-400 */
      #7C3AED 100%     /* violet-600 */
  );
  background-size: 400% 400%;
  animation: gradientFlow 20s ease infinite;
}

@keyframes gradientFlow {
  0%   { background-position: 0% 50%; }
  25%  { background-position: 50% 100%; }
  50%  { background-position: 100% 50%; }
  75%  { background-position: 50% 0%; }
  100% { background-position: 0% 50%; }
}

/*
  ── BLOB MORPH ──
  Quelle: https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
*/
@keyframes morphBlob1 {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%      { border-radius: 70% 30% 40% 60% / 40% 70% 60% 30%; }
  75%      { border-radius: 40% 70% 60% 30% / 70% 40% 30% 60%; }
}
@keyframes morphBlob2 {
  0%, 100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
  33%      { border-radius: 60% 40% 30% 70% / 40% 60% 50% 60%; }
  66%      { border-radius: 50% 50% 70% 30% / 60% 40% 60% 40%; }
}
@keyframes morphBlob3 {
  0%, 100% { border-radius: 70% 30% 50% 50% / 60% 40% 60% 40%; }
  50%      { border-radius: 30% 70% 40% 60% / 50% 60% 40% 60%; }
}

/*
  ── BLOB MOVEMENT ──
  Quelle: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
*/
@keyframes moveBlob1 {
  0%, 100% { transform: translate(0, 0); }
  33%      { transform: translate(30px, -25px); }
  66%      { transform: translate(-20px, 30px); }
}
@keyframes moveBlob2 {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-40px, 35px); }
}
@keyframes moveBlob3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(35px, -30px) scale(1.1); }
}
@keyframes moveBlob4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50%      { transform: translate(-25px, -25px) rotate(180deg); }
}

/*
  ── PULSE ──
  Quelle: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale
*/
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50%      { transform: scale(1.15); opacity: 0.55; }
}
</style>