import { useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  Package, 
  FileText, 
  Scale, 
  Activity, 
  Factory, 
  Thermometer, 
  Search, 
  Shield, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState, ReactNode } from 'react'

interface HomeProps {
  children: ReactNode
  onLogout: () => void
}

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: '仪表盘' },
  { path: '/production/planning', icon: Calendar, label: '生产计划' },
  { path: '/production/batch', icon: Package, label: '批次管理' },
  { path: '/production/ebr', icon: FileText, label: '电子批记录' },
  { path: '/production/weighing', icon: Scale, label: '称量配料' },
  { path: '/production/process', icon: Activity, label: '工艺监控' },
  { path: '/equipment', icon: Factory, label: '设备管理' },
  { path: '/environment', icon: Thermometer, label: '环境监测' },
  { path: '/traceability', icon: Search, label: '追溯查询' },
  { path: '/quality/compliance', icon: Shield, label: '质量合规' },
  { path: '/reports', icon: BarChart3, label: '报表中心' },
  { path: '/system', icon: Settings, label: '系统管理' },
]

export default function Home({ children, onLogout }: HomeProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {sidebarOpen && (
          <div className="w-64 bg-slate-900 text-white flex-shrink-0">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold">MES 系统</h2>
              <p className="text-sm text-slate-400">GMP 合规管理</p>
            </div>
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {menuItems.find(item => item.path === location.pathname)?.label || '仪表盘'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">管理员</div>
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
