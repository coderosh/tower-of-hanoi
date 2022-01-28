import time from "./time"
import constants from "./constants"
import type { Peg, Step } from "./types"
import { calcDistance, sleep, toh } from "./utils"

class Animator {
  static async animate(
    el: HTMLDivElement,
    position: { bottom?: number; left?: number }
  ) {
    el.style.setProperty("--time", `${time.time}s`)

    const keys = Object.keys(position) as ["left" | "bottom"]

    for (const key of keys) {
      el.style.setProperty(`--${key}`, `${position[key]}px`)
    }

    if (time.time !== 0) await sleep()
  }

  static async animateStep(
    step: Step,
    disks: HTMLDivElement[],
    pegs: [Peg, Peg, Peg]
  ) {
    let { n, from, to } = step
    n = n - 1

    const fromPeg = pegs[from]
    const toPeg = pegs[to]

    let bottom = fromPeg.el.getBoundingClientRect().height + 20
    await Animator.animate(disks[n], { bottom })

    const left = calcDistance(constants.PEG_CONTAINER, toPeg.el)
    await Animator.animate(disks[n], { left })

    bottom = toPeg.disks.length * disks[n].getBoundingClientRect().height
    await Animator.animate(disks[n], { bottom })

    fromPeg.disks.pop()
    toPeg.disks.push(disks[n])
    return true
  }

  static anim(
    n: number,
    disks: HTMLDivElement[],
    pegs: [Peg, Peg, Peg],
    curStep = 0
  ) {
    const steps = toh(n)

    let stepCount = curStep
    return {
      async next() {
        const step = steps[stepCount++]
        if (!step) return null

        await Animator.animateStep(step, disks, pegs)

        return steps[stepCount]
      },
      get curStep() {
        return stepCount
      },
    }
  }
}

export default Animator
