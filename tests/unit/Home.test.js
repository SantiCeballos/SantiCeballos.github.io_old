import { shallowMount } from '@vue/test-utils';
import Home from '../../src/views/Home.vue';

describe('Home.vue', () => {
  it('disables start button if name is invalid', () => {
    const wrapper = shallowMount(Home);
    const button = wrapper.find('button');
    expect(button.attributes().disabled).toBeDefined();
  });

  it('enables start button if name is valid', async () => {
    const wrapper = shallowMount(Home);
    const input = wrapper.find('input');
    await input.setValue('Santi');
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeUndefined();
  });
});
