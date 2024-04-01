import { Spinner } from '@nextui-org/react'
import './Footer.css'

export const FooterPending: React.FC = () => {
    return (
      <footer className='fixed bottom-4 right-4'>
        <div className='grid justify-center justify-items-center border-1 p-3 gap-3 rounded-3xl bg-foreground-50'>
            <p className='text text-sm font-bold'>Transferencia</p>
            <p className='text text-sm font-bold'>Pendiente</p><Spinner size='sm'/>
        </div>
      </footer>
    )
  }