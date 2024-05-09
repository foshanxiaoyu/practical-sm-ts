import { cn } from '@lib/utils'
import{  ReactNode }  from 'react'

// type Props = {}

const MaxWidthWrapper = ({className,children}: {className?:string,children:ReactNode}) => {
  return (
    <div className={cn(' h-full mx-auto w-full max-w-xs px-2.5 md:px-20',
    className)} >
        {children}
    </div>
  )
}

export default MaxWidthWrapper