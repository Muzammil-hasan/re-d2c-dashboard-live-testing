import { guardian_sans, montserrat } from "~/lib/fonts"
import Providers from "~/lib/providers"
import { cn } from "~/lib/utils"

import "bootstrap/dist/css/bootstrap.css"
import "~/styles/globals.scss"

export const metadata = {
  metadataBase: new URL("https://www.royalenfield.com/in/en/home/"),
  title: "Bikes in India | New Bike Model 2023 | Royal Enfield India",
  description:
    "Official site of Royal Enfield bikes in India. Check out new bike models of 2023, book a test ride, locate a dealer, browse motorcycle parts, accessories &amp; apparel.",
  openGraph: {
    type: "website",
    site_name: "",
    title: "Bikes in India | New Bike Model 2023 | Royal Enfield India",
    url: "https://www.royalenfield.com/in/en/home/",
    description:
      "Official site of Royal Enfield bikes in India. Check out new bike models of 2023, book a test ride, locate a dealer, browse motorcycle parts, accessories &amp; apparel.",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.royalenfield.com/in/en/home/",
    title: "Bikes in India | New Bike Model 2023 | Royal Enfield India",
    description:
      "Official site of Royal Enfield bikes in India. Check out new bike models of 2023, book a test ride, locate a dealer, browse motorcycle parts, accessories &amp; apparel.",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(guardian_sans.variable, montserrat.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
