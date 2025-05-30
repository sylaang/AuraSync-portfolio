"use client"

import { domAnimation, LazyMotion, m } from "framer-motion"

export const LazyMotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

export { m as motion }