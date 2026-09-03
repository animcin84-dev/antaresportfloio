let activeLenis = null

export function registerSmoothScroll(lenis) {
  activeLenis = lenis
}

export function unregisterSmoothScroll(lenis) {
  if (activeLenis === lenis) activeLenis = null
}

export function scrollToPosition(target, options = {}) {
  if (activeLenis) {
    activeLenis.scrollTo(target, {
      duration: options.duration ?? 0.7,
      force: true,
      lock: false,
    })
    return
  }

  window.scrollTo({
    top: target,
    behavior: options.behavior ?? 'smooth',
  })
}
