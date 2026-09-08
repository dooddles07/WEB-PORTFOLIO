import type Lenis from 'lenis'

/*
 * App owns the single Lenis instance. The scroll-expand intro has to pause it
 * while it holds the page: Lenis drives scrollY from its own rAF loop, so
 * without this it keeps scrolling against the intro's preventDefault and the
 * two fight over position.
 */
export const lenisRef: { current: Lenis | null } = { current: null }
