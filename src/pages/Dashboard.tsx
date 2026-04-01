import { TrendingUp, Package, AlertTriangle, CheckCircle, Clock, BarChart3, Activity, Factory } from 'lucide-react'
import { useState, useEffect } from 'react'

const stats = [
  { label: '进行中批次', value: '12', trend: '+2 今日', icon: Package, color: 'bg-blue-500' },
  { label: '已完成批次', value: '156', trend: '+8 本周', icon: CheckCircle, color: 'bg-green-500' },
  { label: '待处理告警', value: '3', trend: '需要关注', icon: AlertTriangle, color: 'bg-yellow-500' },
  { label: '设备运行率', value: '96.5%', trend: '+1.2% 环比', icon: TrendingUp, color: 'bg-purple-500' },
]

const recentBatches = [
  { id: 'BATCH-2024-001', product: '布洛芬片', status: '生产中', progress: 65, operator: '张三', startTime: '2024-01-15 08:00' },
  { id: 'BATCH-2024-002', product: '阿莫西林胶囊', status: '待审核', progress: 100, operator: '李四', startTime: '2024-01-14 10:30' },
  { id: 'BATCH-2024-003', product: '维C银翘片', status: '已放行', progress: 100, operator: '王五', startTime: '2024-01-13 09:00' },
  { id: 'BATCH-2024-004', product: '复方氨酚烷胺', status: '待配料', progress: 10, operator: '赵六', startTime: '2024-01-15 14:00' },
]

const equipmentStatus = [
  { id: 'EQ-001', name: '混合机', status: '运行中', temperature: '45°C', uptime: '98%' },
  { id: 'EQ-002', name: '压片机', status: '运行中', temperature: '42°C', uptime: '99%' },
  { id: 'EQ-003', name: '胶囊填充机', status: '维护中', temperature: '38°C', uptime: '85%' },
  { id: 'EQ-004', name: '干燥机', status: '待机', temperature: '35°C', uptime: '90%' },
]

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('today')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">仪表盘</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {currentTime.toLocaleString('zh-CN')}
          </div>
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="today">今日</option>
            <option value="week">本周</option>
            <option value="month">本月</option>
            <option value="year">本年</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.label === '待处理告警' ? 'text-yellow-600' : 'text-green-600'
                  }`}>{stat.trend}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              近期批次
            </h3>
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{batch.product}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        batch.status === '生产中' ? 'bg-blue-100 text-blue-800' :
                        batch.status === '待审核' ? 'bg-yellow-100 text-yellow-800' :
                        batch.status === '已放行' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {batch.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                      <span>批次号: {batch.id}</span>
                      <span>操作员: {batch.operator}</span>
                      <span>开始时间: {batch.startTime}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${batch.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{batch.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Factory className="w-5 h-5 text-green-600" />
              设备状态
            </h3>
            <div className="space-y-4">
              {equipmentStatus.map((eq) => (
                <div key={eq.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{eq.name}</p>
                      <p className="text-sm text-gray-600">{eq.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      eq.status === '运行中' ? 'bg-green-100 text-green-800' :
                      eq.status === '维护中' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {eq.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">温度</span>
                      <span className="font-medium">{eq.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">运行率</span>
                      <span className="font-medium">{eq.uptime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            生产概览
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">设备利用率</span>
                <span className="font-medium text-gray-900">87%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: '87%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">批次完成率</span>
                <span className="font-medium text-gray-900">92%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">质量合规率</span>
                <span className="font-medium text-gray-900">99%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600" style={{ width: '99%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">物料利用率</span>
                <span className="font-medium text-gray-900">95%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-600" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-600" />
            系统告警
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">压片机温度异常</p>
                  <p className="text-sm text-red-700">温度: 52°C (阈值: 50°C)</p>
                  <p className="text-xs text-red-500 mt-1">10分钟前</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-900">胶囊填充机需要维护</p>
                  <p className="text-sm text-yellow-700">运行时间: 1200小时</p>
                  <p className="text-xs text-yellow-500 mt-1">2小时前</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900">批次BATCH-2024-002待审核</p>
                  <p className="text-sm text-blue-700">完成时间: 2024-01-14 16:30</p>
                  <p className="text-xs text-blue-500 mt-1">12小时前</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
