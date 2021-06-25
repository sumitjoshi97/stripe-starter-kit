import { createContext, useState } from 'react'

const LOCAL_STORAGE_BUCKET = 'user'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('')

  const addUser = user => {
    if (!localStorage.getItem(LOCAL_STORAGE_BUCKET)) {
      const newUser = {
        name: user,
      }

      localStorage.setItem(LOCAL_STORAGE_BUCKET, JSON.stringify(newUser))
    }
    setUser(user)
  }

  const removeUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_BUCKET)
    setUser('')
  }

  return (
    <AuthContext.Provider value={{ user, addUser, removeUser, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
