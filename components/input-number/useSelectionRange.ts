import { useRef, useLayoutEffect } from 'react'
import isNumber from 'lodash/isNumber'

export default function useSelectionRange({
  inputElement,
  inputValue,
  forceUpdate,
}: {
  inputElement: HTMLInputElement
  inputValue: string
  forceUpdate: number
}) {
  const refSelectionPosition = useRef<number>()

  useLayoutEffect(() => {
    const position = refSelectionPosition.current
    if (inputElement && inputValue && isNumber(position)) {
      const start = Math.max(0, inputValue.length - position)
      inputElement.setSelectionRange(start, start)
    }
  }, [inputValue, forceUpdate])

  return (event: any) => {
    const { selectionEnd: end, value } = event.target as HTMLInputElement
    if (isNumber(end)) {
      refSelectionPosition.current = value.length - end
    }
  }
}
