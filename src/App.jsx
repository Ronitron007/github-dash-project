import { useState } from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import UserRepos from './routes/UserRepos'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div
      style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#fff' }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:username" element={<UserRepos />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
