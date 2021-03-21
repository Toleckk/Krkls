import React from 'react'

export const mapSelections = (
  effect: string,
  fn: (e: string, i: number) => React.ReactNode,
): React.ReactNode[] =>
  splitEffectBySelection(effect).map((e, i) =>
    isSelected(e) ? fn(extractContentFromSelection(e), i) : e,
  )

export const splitEffectBySelection = (effect: string): string[] =>
  effect.split(/[{}]/).filter((e, i, list) => (i !== 0 && i !== list.length - 1) || !!e)

export const extractContentFromSelection = (str: string): string => {
  const content = str.match(/^\|(.*)\|$/)?.[1]

  return content ?? str
}

export const isSelected = (str: string): boolean => /^\|.+\|$/.test(str)
