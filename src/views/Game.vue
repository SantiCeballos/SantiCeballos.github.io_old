<script setup>
import GameBoard from "../components/game/GameBoard.vue";
import LevelSelector from "../components/game/LevelSelector.vue";
import Tooltip from "../components/game/InstructionsTooltip.vue";
</script>

<template>
  <div class="game">
    <h2>Jugador: {{ playerName }}</h2>
    <p v-if="playing">Puntos: {{ score }}</p>
    <LevelSelector :difficulty="difficulty" @updateDifficulty="updateLevel" />
    <Tooltip position="right">
      <template #icon>
        <button class="info-icon">ℹ️</button>
      </template>
      <template #content>
        <p>Instrucciones del juego:</p>
        <ul>
          <li>Selecciona la dificultad.</li>
          <li>Haz clic en "Play" para comenzar.</li>
          <li>Haz clic en los topos tan pronto como aparezcan.</li>
          <li>Ganas puntos según la dificultad seleccionada.</li>
        </ul>
      </template>
    </Tooltip>
    <button v-if="!playing" @click="startPlaying">Play</button>
    <button v-else @click="stopPlaying">Stop</button>
    <GameBoard
      v-if="playing"
      :difficulty="difficulty"
      :score="score"
      :moles="moles"
      @updateScore="updateScore"
    />
    <p>Mejor puntuación: {{ highScore }}</p>
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
      highScore: 0,
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
    stopPlaying() {
      clearInterval(this.moleInterval);
      this.playing = false;
      this.moles = Array(9).fill(false);
      this.score = 0;
    },
    updateLevel(difficulty) {
      console.log(difficulty);
      this.difficulty = difficulty;
      this.stopPlaying();
    },
    updateScore(score) {
      this.score = score;
      this.highScore =
        this.score > this.highScore ? this.score : this.highScore;
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

.info-icon {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0.5em;
}
</style>
