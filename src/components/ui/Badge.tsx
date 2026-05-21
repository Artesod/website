import { Icon } from '@iconify/react'

interface BadgeProps {
  label: string
  icon?: string
  className?: string
}

export function Badge({ label, icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 px-4 py-2
        bg-surface border border-border rounded-full
        text-text-secondary text-sm font-medium
        hover:border-blue-accent hover:text-text-primary
        transition-colors duration-200 cursor-default
        ${className}
      `}
    >
      {icon && <Icon icon={icon} className="w-5 h-5" />}
      {label}
    </span>
  )
}
