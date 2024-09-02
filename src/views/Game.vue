<template>
  <div class="game asd">
    <h2>Jugador: {{ playerName }}</h2>
    <p>Puntos: {{ score }}</p>
    <div>
      <label>
        <input type="radio" v-model="difficulty" value="low" /> Bajo
      </label>
      <label>
        <input type="radio" v-model="difficulty" value="medium" /> Medio
      </label>
      <label>
        <input type="radio" v-model="difficulty" value="high" /> Alto
      </label>
    </div>
    <button v-if="!playing" @click="startPlaying">Play</button>
    <button v-else @click="stopPlaying">Stop</button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: this.$route.query.player,
      difficulty: "low",
      score: 0,
      moles: Array(9).fill(false),
      currentMoleIndex: null,
      moleInterval: null,
      playing: false,
    };
  },
  methods: {
    startPlaying() {
      this.playing = true;
      const difficultySettings = {
        low: 1000,
        medium: 750,
        high: 500,
      };
      const pointSettings = {
        low: 10,
        medium: 20,
        high: 30,
      };
      this.moleInterval = setInterval(() => {
        if (this.currentMoleIndex !== null) {
          this.moles[this.currentMoleIndex] = false;
        }

        this.currentMoleIndex = Math.floor(Math.random() * 9);
        this.moles[this.currentMoleIndex] = true;
      }, difficultySettings[this.difficulty]);
    },
    hitMole(index) {
      if (this.moles[index]) {
        this.score +=
          this.difficulty === "low"
            ? 10
            : this.difficulty === "medium"
            ? 20
            : 30;
        this.moles[index] = false;
        navigator.vibrate(200);
      }
    },
    stopPlaying() {
      clearInterval(this.moleInterval);
      this.playing = false;
      this.moles = Array(9).fill(false);
      this.score = 0;
    },
  },
  beforeUnmount() {
    clearInterval(this.moleInterval);
  },
};
</script>

<style scoped>
.game {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
}

.game-header {
  display: flex;
  justify-content: center;
  gap: 3em;
}
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
