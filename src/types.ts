export interface Step {
  n: number
  from: number
  to: number
  aux: number
}

export interface Peg {
  el: HTMLDivElement
  disks: HTMLDivElement[]
}
