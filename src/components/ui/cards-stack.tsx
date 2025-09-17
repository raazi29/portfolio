"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CardStickyProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  incrementY?: number
  incrementZ?: number
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 10,
      incrementZ = 10,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const y = index * incrementY

    return (
      <div
        ref={ref}
        style={{
          position: "sticky",
          top: `${y}px`,
          zIndex: 100 - index,
          ...style,
        }}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }
