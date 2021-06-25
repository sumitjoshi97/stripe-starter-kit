import { useState } from 'react'
import axios from 'axios'

import useAuthStore from './globalStores/useAuthStore'

const authInputState = {
  name: '',
  password: '',
}
const authTypes = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
}

const useAuth = () => {
  const { addUser } = useAuthStore()

  const [authInput, setAuthInput] = useState(authInputState)
  const [authType, setAuthType] = useState(authTypes.LOGIN)

  const handleAuthInput = e => {
    const { name, value } = e.target
    setAuthInput({ ...authInput, [name]: value })
  }

  const setAuthTypeToLogin = () => {
    setAuthType(authTypes.LOGIN)
  }

  const setAuthTypeToSignup = () => {
    setAuthType(authTypes.SIGNUP)
  }

  const handleUserAuth = () => {
    const subURL = authType === authTypes.LOGIN ? 'login-user' : 'signup-user'
    console.log(process.env.REACT_APP_SERVER_URI)

    axios
      .post(`${process.env.REACT_APP_SERVER_URI}/${subURL}/`, {
        name: authInput.name,
        password: authInput.password,
      })
      .then(res => {
        addUser(res.data.username)
      })
      .catch(err => console.log(err))
  }

  return {
    authTypes,
    authType,
    authInput,
    handleAuthInput,
    setAuthTypeToLogin,
    setAuthTypeToSignup,
    handleUserAuth,
  }
}

export default useAuth
