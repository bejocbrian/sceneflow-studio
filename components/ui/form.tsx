import * as React from "react"

import { cn } from "@/lib/utils"

const Form = {
  Provider: ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
  },
  Field: ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
  },
  Control: ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
  },
  Label: ({ children, className, ...props }: React.HTMLAttributes<HTMLLabelElement>) => {
    return (
      <label
        className={cn(
          "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      >
        {children}
      </label>
    )
  },
  Item: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    )
  },
  Message: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    return (
      <p className={cn("text-destructive text-[0.8rem] font-medium", className)} {...props}>
        {children}
      </p>
    )
  },
}

export { Form }
