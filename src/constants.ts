const MAIN_CONTAINER = document.querySelector<HTMLDivElement>(".toh-container")!
const PEG_CONTAINER = document.querySelector<HTMLDivElement>(".pegs")!
const DISK_CONTAINER = document.querySelector<HTMLDivElement>(".disks")!

const SELECT = document.querySelector<HTMLSelectElement>("#number")!
const RANGE = document.querySelector<HTMLInputElement>("#speed")!
const PLAY_ALL = document.querySelector<HTMLButtonElement>("#play")!
const NEXT = document.querySelector<HTMLButtonElement>("#next")!
const RESTART = document.querySelector<HTMLButtonElement>("#restart")!
const STEPS_COUNT_DIV = document.querySelector<HTMLDivElement>(".steps-count")!

export default {
  EXTRA_PEG_HEIGHT: 50,
  MAIN_CONTAINER,
  PEG_CONTAINER,
  DISK_CONTAINER,
  STEPS_COUNT_DIV,
  SETTINGS: {
    SELECT,
    RANGE,
    PLAY_ALL,
    NEXT,
    RESTART,
  },
}
