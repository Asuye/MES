import { TrendingUp, Package, AlertTriangle, CheckCircle } from 'lucide-react'

const stats = [
  { label: '进行中批次', value: '12', trend: '+2 今日', icon: Package, color: 'bg-blue-500' },
  { label: '已完成批次', value: '156', trend: '+8 本周', icon: CheckCircle, color: 'bg-green-500' },
  { label: '待处理告警', value: '3', trend: '需要关注', icon: AlertTriangle, color: 'bg-yellow-500' },
  { label: '设备运行率', value: '96.5%', trend: '+1.2% 环比', icon: TrendingUp, color: 'bg-purple-500' },
]

const recentBatches = [
  { id: 'BATCH-2024-001', product: '布洛芬片', status: '生产中', progress: 65 },
  { id: 'BATCH-2024-002', product: '阿莫西林胶囊', status: '待审核', progress: 100 },
  { id: 'BATCH-2024-003', product: '维C银翘片', status: '已放行', progress: 100 },
  { id: 'BATCH-2024-004', product: '复方氨酚烷胺', status: '待配料', progress: 10 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">近期批次</h3>
          <div className="space-y-4">
            {recentBatches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{batch.product}</p>
                  <p className="text-sm text-gray-600">{batch.id}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    batch.status === '生产中' ? 'bg-blue-100 text-blue-800' :
                    batch.status === '待审核' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {batch.status}
                  </span>
                  <div className="mt-2 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all"
                      style={{ width: `${batch.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">生产概览</h3>
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
          </div>
        </div>
      </div>
    </div>
  )
}
