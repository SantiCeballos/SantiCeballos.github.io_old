<template>
  <div class="grid">
    <div
      v-for="(mole, index) in moles"
      :key="index"
      class="cell"
      @click="hitMole(index)"
    >
      <span v-if="mole">🐹</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameBoard",
  props: {
    moles: Array,
    difficulty: String,
    score: Number,
  },
  data() {
    return {
      localScore: this.score || 0,
    };
  },
  methods: {
    hitMole(index) {
      if (this.moles[index]) {
        this.localScore +=
          this.difficulty === "low"
            ? 10
            : this.difficulty === "medium"
            ? 20
            : 30;
        this.moles[index] = false;
        if (vibrate in navigator) {
          navigator.vibrate(200);
        }
        // navigator.vibrate(200);
        this.$emit("updateScore", this.localScore);
        // this.highScore =
        //   this.localScore > this.highScore ? this.localScore : this.highScore;
      }
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.cell {
  width: 100px;
  height: 100px;
  background-color: #f7eed3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
}
.cell span {
  font-size: 2rem;
}
</style>
