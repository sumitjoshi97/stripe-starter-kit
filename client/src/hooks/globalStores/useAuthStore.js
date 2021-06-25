import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const useAuthStore = () => {
  const authContext = useContext(AuthContext)
  return authContext
}

export default useAuthStore
