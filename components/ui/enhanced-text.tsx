import * as React from "react"
import { cn } from "@/lib/utils"

interface EnhancedTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "heading" | "body" | "caption" | "muted"
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

const EnhancedText = React.forwardRef<HTMLElement, EnhancedTextProps>(
  ({ className, variant = "body", as: Component = "p", ...props }, ref) => {
    const baseClasses = "transition-colors"

    const variantClasses = {
      heading: "text-gray-900 dark:text-slate-50 font-semibold",
      body: "text-gray-700 dark:text-slate-200",
      caption: "text-gray-600 dark:text-slate-300 text-sm",
      muted: "text-gray-500 dark:text-slate-400 text-sm",
    }

    return <Component ref={ref as any} className={cn(baseClasses, variantClasses[variant], className)} {...props} />
  },
)
EnhancedText.displayName = "EnhancedText"

export { EnhancedText }
