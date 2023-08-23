import { Toaster as ReactHotToaster } from "react-hot-toast"

const Toaster = () => {
  return (
    <ReactHotToaster
      position="top-right"
      toastOptions={{
        style: {
          fontSize: "0.875rem",
          fontFamily: "var(--font-secondary)",
          letterSpacing: "0.05rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          border: "0.5px solid gray",
          backgroundColor: "var(--secondary-background)",
          color: "var(--foreground)",
          borderRadius: "0.25rem",
        },
      }}
    />
  )
}

export { Toaster }
