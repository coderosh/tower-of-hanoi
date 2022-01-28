import constants from "./constants"

let _time = getRangeValue()

export default {
  get time() {
    return _time
  },
  set time(val) {
    _time = val
  },
  reset() {
    _time = getRangeValue()
  },
}

function getRangeValue() {
  return 1.01 - +constants.SETTINGS.RANGE.value / 1000
}
