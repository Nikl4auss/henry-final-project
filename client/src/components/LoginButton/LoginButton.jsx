import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import styles from './LoginButton.module.css'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()
  return (
    <button type='button' className={styles.loginButton} onClick={() => loginWithRedirect()}>
      <FaUserPlus />
    </button>
  )
}

export default LoginButton