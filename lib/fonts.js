import { Montserrat } from "next/font/google"
import localFont from "next/font/local"

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const guardian_sans = localFont({
  display: "swap",
  variable: "--font-guardian-sans",
  src: [
    {
      path: "../public/fonts/GuardianSansHairline.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/GuardianSansThin.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/GuardianSansLight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GuardianSansRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GuardianSansMedium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GuardianSansSemibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/GuardianSansBold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/GuardianSansBlack.woff",
      weight: "800",
      style: "normal",
    },
  ],
})
