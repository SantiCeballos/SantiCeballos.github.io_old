<!-- src/components/Tooltip.vue -->
<template>
  <div
    class="tooltip-container"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @click="toggleTooltip"
  >
    <slot name="icon"></slot>
    <div v-if="isVisible" class="tooltip-content" :class="position">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { isVNode } from "vue";

export default {
  name: "Tooltip",
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    position: {
      type: String,
      default: "top",
    },
  },
  methods: {
    showTooltip() {
      this.isVisible = true;
    },
    hideTooltip() {
      this.isVisible = false;
    },
    toggleTooltip() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style scoped>
.tooltip-container {
  position: relative;
  /* top: 1em;
  left: 1em; */
  display: inline-block;
  width: fit-content;
  margin: 0 auto;
  max-width: 100vw;
}

.tooltip-content {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 0.5em;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 100;
  visibility: visible;
  text-align: left;
}

.tooltip-content.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
}

.tooltip-content.right {
  top: 50%;
  left: 100%;
  transform: translateY(-10%);
  margin-left: 8px;
}

.tooltip-content.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
}

.tooltip-content.left {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  margin-right: 8px;
}
</style>
