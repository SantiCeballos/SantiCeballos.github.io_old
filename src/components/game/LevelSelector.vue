<template>
  <div class="level-selector">
    <label>
      <input type="radio" v-model="localDifficulty" value="low" /> Bajo
    </label>
    <label>
      <input type="radio" v-model="localDifficulty" value="medium" /> Medio
    </label>
    <label>
      <input type="radio" v-model="localDifficulty" value="high" /> Alto
    </label>
  </div>
</template>

<script>
export default {
  name: "LevelSelector",
  props: {
    difficulty: String,
  },
  data() {
    return {
      localDifficulty: this.difficulty || "low",
    };
  },
  watch: {
    localDifficulty(newDifficulty, oldDifficulty) {
      this.$emit("updateDifficulty", this.localDifficulty);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos del selector de nivel */
</style>
