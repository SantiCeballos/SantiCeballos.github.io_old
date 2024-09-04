import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GameBoard from "../../src/components/game/GameBoard.vue";

describe("GameBoard.vue", () => {
  it("renders the correct number of cells", () => {
    const wrapper = mount(GameBoard, {
      props: {
        moles: [false, false, true, false, false, false, false, false, false],
      },
    });

    const cells = wrapper.findAll(".cell");
    expect(cells.length).toBe(9);
  });

  it("displays a mole when the corresponding value in moles array is true", () => {
    const wrapper = mount(GameBoard, {
      props: {
        moles: [true, false, false, false, false, false, false, false, false],
      },
    });

    const moleCell = wrapper.find(".cell span");
    expect(moleCell.exists()).toBe(true);
    expect(moleCell.text()).toBe("🐹");
  });

  it("updates score and hides mole when a mole is clicked", async () => {
    const wrapper = mount(GameBoard, {
      props: {
        moles: [true, false, false, false, false, false, false, false, false],
        difficulty: "medium",
        score: 0,
      },
    });

    const moleCell = wrapper.find(".cell");
    await moleCell.trigger("click");

    expect(wrapper.vm.localScore).toBe(20);
    expect(wrapper.emitted().updateScore).toBeTruthy();
    expect(wrapper.emitted().updateScore[0]).toEqual([20]);

    const moleAfterClick = wrapper.find(".cell span");
    expect(moleAfterClick.exists()).toBe(false);
  });

  it("calls navigator.vibrate when a mole is hit", async () => {
    global.navigator.vibrate = vi.fn();

    const wrapper = mount(GameBoard, {
      props: {
        moles: [true, false, false, false, false, false, false, false, false],
        difficulty: "high",
        score: 0,
      },
    });

    const moleCell = wrapper.find(".cell");
    await moleCell.trigger("click");

    expect(global.navigator.vibrate).toHaveBeenCalledWith(200);
  });

  it("increments score correctly based on difficulty", async () => {
    const wrapper = mount(GameBoard, {
      props: {
        moles: [true, false, false, false, false, false, false, false, false],
        difficulty: "high",
        score: 0,
      },
    });

    const moleCell = wrapper.find(".cell");
    await moleCell.trigger("click");

    expect(wrapper.vm.localScore).toBe(30);
  });
});
