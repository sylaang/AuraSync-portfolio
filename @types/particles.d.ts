declare module 'particles.js' {
    export function particlesJS(tagId: string, params: any): void;
  }
  
  interface Window {
    particlesJS: (tagId: string, params: any) => void;
  }