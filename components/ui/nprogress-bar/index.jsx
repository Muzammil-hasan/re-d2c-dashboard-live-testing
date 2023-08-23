import { AppProgressBar } from "next-nprogress-bar"

const NProgressBar = () => (
  <AppProgressBar
    height="4px"
    color="var(--accent)"
    options={{ showSpinner: false }}
    shallowRouting
  />
)

export { NProgressBar }
