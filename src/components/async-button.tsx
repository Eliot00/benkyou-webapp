import { createSignal, Show, type ParentProps } from "solid-js"
import { Button } from "~/components/ui/button"

type LoadingButtonProps = ParentProps<{
  onClick: () => Promise<void>
}>

export function LoadingButton(props: LoadingButtonProps) {
  const [loading, setLoading] = createSignal(false)

  return (
    <Button
      onClick={async () => {
        setLoading(true)
        await props.onClick()
        setLoading(false)
      }}
      disabled={loading()}
    >
      <Show when={loading()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="mr-2 h-4 w-4 animate-spin"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6V3m4.25 4.75L18.4 5.6M18 12h3m-4.75 4.25l2.15 2.15M12 18v3m-4.25-4.75L5.6 18.4M6 12H3m4.75-4.25L5.6 5.6"
          />
        </svg>
      </Show>
      {props.children}
    </Button>
  )
}
