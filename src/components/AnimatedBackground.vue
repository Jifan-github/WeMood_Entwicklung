<template>
  <!--
    AnimatedBackground.vue
    Animierter Hintergrund mit Farbverlauf und schwebenden Formen.
    Der Gradient cycled durch die definierten Farben,
    die Formen bewegen sich sanft im Hintergrund.

    Quellen:
    - Tailwind CSS Animations: https://tailwindcss.com/docs/animation
    - CSS @keyframes: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
    - Vue 3 Composition API: https://vuejs.org/guide/extras/composition-api-faq.html
  -->
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <!-- Animierter Farbverlauf als Basis -->
    <div class="absolute inset-0 gradient-cycle opacity-60" />

    <!-- Schwebende Formen -->
    <div
        v-for="shape in shapes"
        :key="shape.id"
        class="absolute rounded-full opacity-20 blur-3xl"
        :class="shape.color"
        :style="shape.style"
    />
  </div>
</template>

<script setup>
/**
 * Generiert die schwebenden Hintergrund-Formen mit
 * zufälligen Positionen und Animationsverzögerungen.
 *
 * Quelle: CSS blur + opacity Technik für Glasmorphismus-Effekte
 * https://css-tricks.com/glassmorphism-css-snippet/
 */
const shapes = [
  {
    id: 1,
    color: 'bg-purple-400',
    style: {
      width: '300px', height: '300px',
      top: '10%', left: '5%',
      animation: 'float 20s ease-in-out infinite',
    },
  },
  {
    id: 2,
    color: 'bg-orange-300',
    style: {
      width: '250px', height: '250px',
      top: '60%', right: '10%',
      animation: 'float 25s ease-in-out infinite 2s',
    },
  },
  {
    id: 3,
    color: 'bg-pink-300',
    style: {
      width: '200px', height: '200px',
      bottom: '20%', left: '30%',
      animation: 'float 18s ease-in-out infinite 4s',
    },
  },
  {
    id: 4,
    color: 'bg-blue-300',
    style: {
      width: '280px', height: '280px',
      top: '30%', right: '25%',
      animation: 'float 22s ease-in-out infinite 1s',
    },
  },
  {
    id: 5,
    color: 'bg-teal-300',
    style: {
      width: '180px', height: '180px',
      top: '5%', right: '40%',
      animation: 'float 16s ease-in-out infinite 3s',
    },
  },
]
</script>

<style scoped>
/*
  Gradient-Cycle Animation:
  Der Hintergrund wechselt sanft zwischen verschiedenen Farbverläufen.

  Quelle: CSS animated gradients via background-size trick
  https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient
  https://css-tricks.com/animating-gradients/
*/
.gradient-cycle {
  background: linear-gradient(
      135deg,
      #fde68a,   /* amber-200 */
      #c4b5fd,   /* violet-300 */
      #fbcfe8,   /* pink-200 */
      #a5f3fc,   /* cyan-200 */
      #fde68a    /* zurück zu amber-200 für nahtlosen Loop */
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  25%  { background-position: 100% 0%; }
  50%  { background-position: 100% 100%; }
  75%  { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}

/*
  Float Animation:
  Formen bewegen sich sanft in einer organischen Bahn.

  Quelle: CSS transform translate für performante Animationen
  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
*/
@keyframes float {
  0%   { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(30px, -40px) scale(1.05); }
  50%  { transform: translate(-20px, 20px) scale(0.95); }
  75%  { transform: translate(15px, 35px) scale(1.02); }
  100% { transform: translate(0, 0) scale(1); }
}
</style>