import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Planning from './pages/production/Planning'
import Batch from './pages/production/Batch'
import EBR from './pages/production/EBR'
import Weighing from './pages/production/Weighing'
import Process from './pages/production/Process'
import Equipment from './pages/Equipment'
import Environment from './pages/Environment'
import Traceability from './pages/Traceability'
import Compliance from './pages/quality/Compliance'
import Reports from './pages/Reports'
import System from './pages/System'

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = sessionStorage.getItem('isAuthenticated')
    return saved === 'true'
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('isAuthenticated', 'true')
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleLogin = () => {
    console.log('handleLogin called, setting authenticated to true')
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('isAuthenticated')
    navigate('/login', { replace: true })
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      </Routes>
    )
  }

  return (
    <Home onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/production/planning" element={<Planning />} />
        <Route path="/production/batch" element={<Batch />} />
        <Route path="/production/ebr" element={<EBR />} />
        <Route path="/production/weighing" element={<Weighing />} />
        <Route path="/production/process" element={<Process />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/traceability" element={<Traceability />} />
        <Route path="/quality/compliance" element={<Compliance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/system" element={<System />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Home>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
