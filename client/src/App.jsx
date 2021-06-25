import Home from './pages/Home'
import Checkout from './pages/Checkout'
import useAuthStore from './hooks/globalStores/useAuthStore'

function App() {
  const { isAuth } = useAuthStore()

  const renderApp = () => {
    if (!isAuth) return <Home />
    return <Checkout />
  }

  return <div className="App">{renderApp()}</div>
}

export default App
