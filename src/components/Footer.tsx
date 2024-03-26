import React from 'react'
import './Footer.css'
import { useAccount } from '../store/useAccount'

export const Footer: React.FC = () => {
  const {account} = useAccount()
  return (
    <footer className='footer'>
      <h6>publicKey: {account?.publicKey}</h6>
      <h5>Saved: {account?.saved}</h5>
      <h5>{account?.hasPass?.value}</h5>
    </footer>
  )
}