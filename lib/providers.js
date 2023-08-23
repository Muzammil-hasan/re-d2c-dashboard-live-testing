"use client"

import { Fragment, useState } from "react"
import { usePathname } from "next/navigation"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"

import { cn } from "~/lib/utils"
import { NProgressBar } from "~/components/ui/nprogress-bar"
import { Toaster } from "~/components/ui/toaster"
import { Header, LoginHeader } from "~/components/layout/header"
import Sidebar from "~/components/layout/sidebar"

function LayoutProvider({ children }) {
  const pathname = usePathname()
  const isCollapsed = pathname.includes("/review/")

  // For Sidebar toggle
  const [isToggled, setIsToggled] = useState(false)
  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  if (pathname.includes("/login")) {
    return (
      <Fragment>
        <LoginHeader />
        <main>{children}</main>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Header isToggled={isToggled} handleToggle={handleToggle} />
      <main
        className={cn(
          "custom-container",
          isCollapsed && "show-mini-sidebar",
          isToggled ? "mobile-sidebar-active" : "mobile-sidebar-hide"
        )}
      >
        {children}
      </main>
      <Sidebar
        className={cn(
          isCollapsed && "mini-sidebar",
          isToggled ? "mobile-sidebar-active" : "mobile-sidebar-hide"
        )}
      />
      <Toaster />
    </Fragment>
  )
}

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider basePath={`/d2c/admin/api/auth`}>
      <QueryClientProvider client={queryClient}>
        <LayoutProvider>{children}</LayoutProvider>
        <NProgressBar />
      </QueryClientProvider>
    </SessionProvider>
  )
}
