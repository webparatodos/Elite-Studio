'use client'

import { Component, type ReactNode } from 'react'

/** WebGL context creation/compile failures throw during render — catch them so the hero
 * degrades to the static CSS gradient behind it instead of taking down the page. */
export class HeroCanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
