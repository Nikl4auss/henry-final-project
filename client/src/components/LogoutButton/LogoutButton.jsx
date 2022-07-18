import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styles from './LogoutButton.module.css'

function LogoutButton() {

  const { logout } = useAuth0()
	
  return (
    <button type='button' className={styles.logoutButton} onClick={() => logout({ returnTo: 'http://localhost:3000/home' })}>LogOut</button>
  )
}

export default LogoutButton