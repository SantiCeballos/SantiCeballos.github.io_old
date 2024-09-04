import { mount } from '@vue/test-utils';
import LevelSelector from '../../src/components/game/LevelSelector.vue';

describe('LevelSelector.vue', () => {
  it('renders with the correct initial difficulty', () => {
    const wrapper = mount(LevelSelector, {
      props: {
        difficulty: 'medium',
      },
    });

    const mediumInput = wrapper.find('input[value="medium"]');
    expect(mediumInput.element.checked).toBe(true);
  });

  it('defaults to "low" difficulty if no prop is provided', () => {
    const wrapper = mount(LevelSelector);

    const lowInput = wrapper.find('input[value="low"]');
    expect(lowInput.element.checked).toBe(true);
  });

  it('updates localDifficulty and emits "updateDifficulty" when selection changes', async () => {
    const wrapper = mount(LevelSelector, {
      props: {
        difficulty: 'low',
      },
    });

    const highInput = wrapper.find('input[value="high"]');
    await highInput.setValue();

    expect(wrapper.vm.localDifficulty).toBe('high');
    expect(wrapper.emitted().updateDifficulty).toBeTruthy();
    expect(wrapper.emitted().updateDifficulty[0]).toEqual(['high']);
  });
});
