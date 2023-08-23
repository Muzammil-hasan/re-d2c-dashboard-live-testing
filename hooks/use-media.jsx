import { useCallback, useEffect, useState } from "react"

const useMediaQuery = (width) => {
  // State variables
  const [targetReached, setTargetReached] = useState(false)

  // functions
  const updateTarget = useCallback((e) => {
    if (e.matches) setTargetReached(true)
    else setTargetReached(false)
  }, [])

  // useEffects
  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addEventListener("change", updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true)

    return () => media.removeEventListener("change", updateTarget)
  }, [])

  return targetReached
}

export default useMediaQuery
