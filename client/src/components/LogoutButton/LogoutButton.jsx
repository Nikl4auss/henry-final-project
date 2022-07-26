import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { REDIRECT_URI } from '../../utils/config'
import styles from './LogoutButton.module.css'

function LogoutButton() {

  const { logout } = useAuth0()
	
  return (
    <button type='button' className={styles.logoutButton} onClick={() => logout({ returnTo: REDIRECT_URI })}>LogOut</button>
  )
}

export default LogoutButton