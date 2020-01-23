/**
 * Clamps a number between a minimum and maximum value.
 * @param n number to clamp
 * @param lo lower bound of clamp
 * @param hi upper bound of clamp
 */
export function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(n, lo));
}

/**
 * A true mathematical modulus that works for negatives.
 * @param m number to be modded
 * @param n number to mod by
 */
export function mod(m: number, n: number) {
  return (m + n) % n;
}

/**
 * Returns a random int up to but excluding the input parameter.
 * @param max exclusive upper bound of random selection
 */
export function randomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Returns a shuffled copy of the given list.
 * @param list list to be shuffled
 */
export function shuffle(list: Iterable<unknown> | ArrayLike<unknown>) {
  let randomList = Array.from(list);
  for (let i = randomList.length - 1; i > 0; i--) {
    let j = randomInt(i + 1);
    [randomList[i], randomList[j]] = [randomList[j], randomList[i]];
  }
  return randomList;
}

/**
 * Filters an array in place.
 * @param array the array to filter
 * @param func how to filter
 * @param destruct defaults to a no-op
 */
export function inPlaceFilter<T>(
  array: T[],
  func: (arg0: T) => boolean,
  destruct: (arg0: T) => void = n => {}
) {
  for (var i = 0; i < array.length; i++) {
    if (!func(array[i])) {
      destruct(array[i]);
      array.splice(i, 1);
      i--;
    }
  }
}
