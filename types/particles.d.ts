declare global {
  interface Window {
    particlesJS: (tagId: string, config: any) => void
  }
}

export {}
