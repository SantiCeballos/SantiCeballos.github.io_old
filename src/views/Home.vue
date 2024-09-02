<template>
  <div class="home">
    <input v-model="playerName" type="text" placeholder="Introduce tu nombre" />
    <button @click="startGame" :disabled="!isValidName">Iniciar Juego</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",
    };
  },
  computed: {
    isValidName() {
      return this.playerName.trim().length > 0;
    },
  },
  methods: {
    startGame() {
      if (this.isValidName) {
        this.$router.push({ name: "Game", query: { player: this.playerName } });
      }
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  button,
  input {
    width: 18em;
    padding: 1em;
  }

  button:disabled {
    cursor: not-allowed;
  }
}
</style>
