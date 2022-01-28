import time from "./time"
import constants from "./constants"
import type { Peg, Step } from "./types"

function toh(noOfDisks: number) {
  const steps: Step[] = []
  function recurse(n: number, from: number, to: number, aux: number) {
    if (n === 0) return
    recurse(n - 1, from, aux, to)
    steps.push({ n, from, to, aux })
    recurse(n - 1, aux, to, from)
  }
  recurse(noOfDisks, 0, 2, 1)
  return steps
}

function calcDistance(container: HTMLDivElement, peg: HTMLDivElement) {
  const { left: left1 } = container.getBoundingClientRect()
  const { left: left2, width } = peg.getBoundingClientRect()

  return left2 - left1 + width / 2
}

const debounce = (func: (...args: any) => any, timeout = 500) => {
  let timer: number

  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), timeout)
  }
}

function sleep(t = time.time) {
  return new Promise((resolve) => setTimeout(resolve, t * 1000))
}

// https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
let rand = Math.random()
function randomColor(s = 80, l = 70) {
  rand = (rand + 1.618033988749895) % 1
  return `hsl(${rand * 360}, ${s}%, ${l}%)`
}

function setPegHeight(
  disk: HTMLDivElement,
  noOfDisks: number,
  pegs: [Peg, Peg, Peg]
) {
  const diskRect = disk.getBoundingClientRect()
  for (const peg of pegs) {
    peg.el.style.setProperty(
      "--height",
      `${diskRect.height * noOfDisks + constants.EXTRA_PEG_HEIGHT}px`
    )
  }
}

function createDisks(noOfDisks: number, pegs: [Peg, Peg, Peg]) {
  return new Array(noOfDisks).fill(null).map((_, i) => {
    const disk = document.createElement("div")
    constants.DISK_CONTAINER.append(disk)
    pegs[0].disks.push(disk)
    disk.innerHTML = (i + 1).toString()

    disk.setAttribute("data-disk", `${i}`)
    disk.classList.add("disk")
    disk.style.setProperty("--color", randomColor())

    let width = constants.PEG_CONTAINER.getBoundingClientRect().width / 10
    if (width > 50) width = 50

    disk.style.setProperty("--width", `${width * (i + 2) * 0.4}px`)
    disk.style.setProperty(
      "--left",
      `${calcDistance(constants.PEG_CONTAINER, pegs[0].el)}px`
    )
    disk.style.setProperty(
      "--bottom",
      `${disk.getBoundingClientRect().height * (noOfDisks - i - 1)}px`
    )
    disk.style.setProperty("--time", "0s")
    return disk
  })
}

const createPegs: () => [Peg, Peg, Peg] = () => [
  { el: document.querySelector(`[data-peg="0"]`)!, disks: [] },
  { el: document.querySelector(`[data-peg="1"]`)!, disks: [] },
  { el: document.querySelector(`[data-peg="2"]`)!, disks: [] },
]

export {
  toh,
  calcDistance,
  debounce,
  sleep,
  randomColor,
  setPegHeight,
  createDisks,
  createPegs,
}
