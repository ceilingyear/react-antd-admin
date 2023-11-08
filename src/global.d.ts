interface Dict<T> {
  [key: string]: T | undefined
}
declare global {
  const t: TFunction<"translation", undefined>
}

export {}
