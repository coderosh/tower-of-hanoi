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
  while (!stopped && (await animatedSteps.next())) {}
})

NEXT.addEventListener("click", async () => {
  disableButtons(true, true)
  if (await animatedSteps.next()) {
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
  await reset()
  noOfDisks = +SELECT.value
  main()
}

async function reset() {
  time.time = 0
  await sleep(0)
  time.reset()
}

function disableButtons(playAllButton?: boolean, nextButton?: boolean) {
  if (typeof playAllButton === "boolean") PLAY_ALL.disabled = playAllButton
  if (typeof nextButton === "boolean") NEXT.disabled = nextButton
}
