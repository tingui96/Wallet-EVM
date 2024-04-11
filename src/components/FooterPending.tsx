import { ReactNode } from 'react'
import './Footer.css'

type Props = {
  children: ReactNode
}

export const FooterPending: React.FC<Props> = ({children}) => {
    return (
      <footer className='fixed bottom-4 right-4'>
        <div className='grid justify-center justify-items-center border-1 p-3 gap-3 rounded-3xl bg-foreground-50'>
            {children}
        </div>
      </footer>
    )
  }