interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  href?: string
  children: React.ReactNode
}

export function Button({ variant = 'primary', href, children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 cursor-pointer'
  const variants = {
    primary: 'bg-gradient-accent text-white hover:opacity-90 hover:scale-105',
    outline: 'border border-blue-accent text-blue-light hover:bg-blue-accent/10 hover:scale-105',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
