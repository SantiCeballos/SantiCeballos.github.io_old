import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import Game from '../../src/views/Game.vue';

const routes = [{ path: '/', component: Game }];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('Game.vue', () => {
  it('renders correctly with initial state', async () => {
    router.push({ path: '/', query: { player: 'Santi' } });
    await router.isReady();

    const wrapper = mount(Game, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('h2').text()).toBe('Jugador: Santi');
    expect(wrapper.findComponent({ name: 'LevelSelector' }).exists()).toBe(
      true,
    );
    expect(wrapper.find({ ref: 'playButton' }).text()).toBe('Play');
  });

  it('starts the game when "Play" is clicked', async () => {
    const wrapper = mount(Game, {
      global: {
        plugins: [router],
      },
    });

    const playButton = wrapper.find({ ref: 'playButton' });
    await playButton.trigger('click');

    expect(wrapper.vm.playing).toBe(true);
    expect(wrapper.find({ ref: 'stopButton' }).text()).toBe('Stop');
    expect(wrapper.findComponent({ name: 'GameBoard' }).exists()).toBe(true);
  });

  it('updates difficulty and stops the game when difficulty changes', async () => {
    const wrapper = mount(Game, {
      global: {
        plugins: [router],
      },
    });

    const playButton = wrapper.find('button');
    await playButton.trigger('click');

    wrapper.vm.updateLevel('medium');
    expect(wrapper.vm.difficulty).toBe('medium');
    expect(wrapper.vm.playing).toBe(false);
    expect(wrapper.vm.score).toBe(0);
  });

  it('updates the score and high score correctly', async () => {
    const wrapper = mount(Game, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.vm.updateScore(30);
    expect(wrapper.vm.score).toBe(30);
    expect(wrapper.vm.highScore).toBe(30);

    await wrapper.vm.updateScore(20);
    expect(wrapper.vm.highScore).toBe(30);
  });
});
