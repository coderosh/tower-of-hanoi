import "./style.css"
import time from "./time"
import Animator from "./anim"
import constants from "./constants"
import { createDisks, createPegs, debounce, setPegHeight, sleep } from "./utils"

let noOfDisks = 1
let stopped = false
let animatedSteps: ReturnType<typeof Animator["anim"]>
const { RANGE, SELECT, PLAY_ALL, NEXT, RESTART } = constants.SETTINGS

RANGE.addEventListener("input", time.reset)
SELECT.addEventListener("change", restart)
RESTART.addEventListener("click", restart)
window.addEventListener("resize", debounce(restart))

PLAY_ALL.addEventListener("click", async () => {
  stopped = false
  disableButtons(true, true)
  while (!stopped && (await playNextAnimation())) {}
})

NEXT.addEventListener("click", async () => {
  disableButtons(true, true)
  if (await playNextAnimation()) {
    disableButtons(false, false)
  } else if (!stopped) {
    disableButtons(true, true)
  }
})

function main() {
  const pegs = createPegs()
  constants.DISK_CONTAINER.innerHTML = ""

  const disks = createDisks(noOfDisks, pegs)
  setPegHeight(disks[0], noOfDisks, pegs)

  animatedSteps = Animator.anim(noOfDisks, disks, pegs)
}

main()

async function restart() {
  disableButtons(false, false)
  stopped = true

  time.time = 0
  await sleep(0)
  time.reset()
  constants.STEPS_COUNT_DIV.innerHTML = "0"

  noOfDisks = +SELECT.value
  main()
}

function disableButtons(playAllButton?: boolean, nextButton?: boolean) {
  if (typeof playAllButton === "boolean") PLAY_ALL.disabled = playAllButton
  if (typeof nextButton === "boolean") NEXT.disabled = nextButton
}

async function playNextAnimation() {
  const val = await animatedSteps.next()
  constants.STEPS_COUNT_DIV.innerHTML = `${animatedSteps.curStep}`
  return val
}
