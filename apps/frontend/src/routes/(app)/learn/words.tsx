import type { RouteSectionProps } from '@solidjs/router'

export default function WordsLayout(props: RouteSectionProps) {
  return (
    <div class="h-full w-full flex items-center justify-center">
      {props.children}
    </div>
  )
}
