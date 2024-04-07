export function getRandomValueFromArray(arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomEntryFromObject<T extends [string, any]>(obj: object) {
  const entries = Object.entries(obj);

  return entries[Math.floor(Math.random() * entries.length)] as T;
}
