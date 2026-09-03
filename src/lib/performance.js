import { useEffect, useMemo, useState } from 'react'

export function canUseWebGL() {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGL2RenderingContext && canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true })
    )
  } catch {
    return false
  }
}

export function getQualityTier() {
  if (typeof window === 'undefined') return 'medium'

  const forced = new URLSearchParams(window.location.search).get('quality')
  if (forced === 'low' || forced === 'medium' || forced === 'high') return forced

  const mobile = window.matchMedia('(max-width: 820px)').matches
  const dpr = window.devicePixelRatio || 1
  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4

  if (mobile || cores <= 4 || memory <= 4) return 'low'
  if (cores >= 8 && memory >= 8 && dpr <= 2.5) return 'high'
  return 'medium'
}

export function useQualityTier() {
  return useMemo(() => getQualityTier(), [])
}

export function useViewportActivity(ref, rootMargin = '15%') {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return active
}
