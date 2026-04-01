import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    console.log('handleLogin called')
    setIsAuthenticated(true)
  }

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? children : <Navigate to="/login" />
  }

  console.log('App render, isAuthenticated:', isAuthenticated)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="production/planning" element={<Planning />} />
          <Route path="production/batch" element={<Batch />} />
          <Route path="production/ebr" element={<EBR />} />
          <Route path="production/weighing" element={<Weighing />} />
          <Route path="production/process" element={<Process />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="environment" element={<Environment />} />
          <Route path="traceability" element={<Traceability />} />
          <Route path="quality/compliance" element={<Compliance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="system" element={<System />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
