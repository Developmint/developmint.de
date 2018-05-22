export const deterministicRotate = (arr) => {
  if (arr.length <= 1) {
    return arr
  }
  const rotations = (new Date()).getMinutes() % arr.length

  if (arr.length === 2) {
    return rotations ? arr : arr.reverse()
  }

  return arr.slice(rotations, arr.length).concat(arr.slice(0, rotations))
}
