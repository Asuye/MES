import { useState, useEffect } from 'react'
import { Thermometer, Droplets, Wind, BarChart3, Plus, Edit, Trash2, Eye, AlertCircle, CheckCircle, Clock, Gauge } from 'lucide-react'

interface EnvironmentRecord {
  id: string
  location: string
  temperature: number
  humidity: number
  pressure: number
  airQuality: string
  status: '正常' | '警告' | '异常'
  timestamp: string
  note: string
  sensorId: string
}

interface Sensor {
  id: string
  name: string
  location: string
  type: string
  status: '在线' | '离线' | '故障'
  lastMaintenance: string
  lastReading: string
  parameters: {
    name: string
    value: string
    unit: string
  }[]
}

const initialEnvironmentRecords: EnvironmentRecord[] = [
  {
    id: 'ENV-2024-001',
    location: '生产车间A区',
    temperature: 25.5,
    humidity: 45,
    pressure: 1013.2,
    airQuality: '良好',
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    note: '正常环境',
    sensorId: 'SENSOR-001',
  },
  {
    id: 'ENV-2024-002',
    location: '生产车间B区',
    temperature: 26.2,
    humidity: 48,
    pressure: 1012.8,
    airQuality: '良好',
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    note: '正常环境',
    sensorId: 'SENSOR-002',
  },
  {
    id: 'ENV-2024-003',
    location: '生产车间C区',
    temperature: 28.5,
    humidity: 55,
    pressure: 1012.5,
    airQuality: '中等',
    status: '警告',
    timestamp: new Date().toLocaleString('zh-CN'),
    note: '温度略高',
    sensorId: 'SENSOR-003',
  },
  {
    id: 'ENV-2024-004',
    location: '包装车间',
    temperature: 24.8,
    humidity: 42,
    pressure: 1013.5,
    airQuality: '良好',
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    note: '正常环境',
    sensorId: 'SENSOR-004',
  },
  {
    id: 'ENV-2024-005',
    location: '仓库',
    temperature: 22.0,
    humidity: 38,
    pressure: 1014.0,
    airQuality: '良好',
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    note: '正常环境',
    sensorId: 'SENSOR-005',
  },
  {
    id: 'ENV-2024-006',
    location: 'QC实验室',
    temperature: 23.5,
    humidity: 40,
    pressure: 1013.8,
    airQuality: '良好',
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    note: '正常环境',
    sensorId: 'SENSOR-006',
  },
]

const initialSensors: Sensor[] = [
  {
    id: 'SENSOR-001',
    name: '温湿度传感器',
    location: '生产车间A区',
    type: '温湿度',
    status: '在线',
    lastMaintenance: '2024-01-10',
    lastReading: new Date().toLocaleString('zh-CN'),
    parameters: [
      { name: '温度', value: '25.5', unit: '°C' },
      { name: '湿度', value: '45', unit: '%' },
    ],
  },
  {
    id: 'SENSOR-002',
    name: '温湿度传感器',
    location: '生产车间B区',
    type: '温湿度',
    status: '在线',
    lastMaintenance: '2024-01-05',
    lastReading: new Date().toLocaleString('zh-CN'),
    parameters: [
      { name: '温度', value: '26.2', unit: '°C' },
      { name: '湿度', value: '48', unit: '%' },
    ],
  },
  {
    id: 'SENSOR-003',
    name: '温湿度传感器',
    location: '生产车间C区',
    type: '温湿度',
    status: '在线',
    lastMaintenance: '2024-01-01',
    lastReading: new Date().toLocaleString('zh-CN'),
    parameters: [
      { name: '温度', value: '28.5', unit: '°C' },
      { name: '湿度', value: '55', unit: '%' },
    ],
  },
  {
    id: 'SENSOR-004',
    name: '温湿度传感器',
    location: '包装车间',
    type: '温湿度',
    status: '在线',
    lastMaintenance: '2023-12-20',
    lastReading: new Date().toLocaleString('zh-CN'),
    parameters: [
      { name: '温度', value: '24.8', unit: '°C' },
      { name: '湿度', value: '42', unit: '%' },
    ],
  },
  {
    id: 'SENSOR-005',
    name: '温湿度传感器',
    location: '仓库',
    type: '温湿度',
    status: '在线',
    lastMaintenance: '2023-12-15',
    lastReading: new Date().toLocaleString('zh-CN'),
    parameters: [
      { name: '温度', value: '22.0', unit: '°C' },
      { name: '湿度', value: '38', unit: '%' },
    ],
  },
  {
    id: 'SENSOR-006',
    name: '温湿度传感器',
    location: 'QC实验室',
    type: '温湿度',
    status: '在线',
    lastMaintenance: '2023-12-10',
    lastReading: new Date().toLocaleString('zh-CN'),
    parameters: [
      { name: '温度', value: '23.5', unit: '°C' },
      { name: '湿度', value: '40', unit: '%' },
    ],
  },
]

export default function Environment() {
  const [environmentRecords, setEnvironmentRecords] = useState<EnvironmentRecord[]>(initialEnvironmentRecords)
  const [sensors, setSensors] = useState<Sensor[]>(initialSensors)
  const [selectedRecord, setSelectedRecord] = useState<EnvironmentRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<EnvironmentRecord, 'id' | 'status' | 'timestamp'>>({ 
    location: '',
    temperature: 0,
    humidity: 0,
    pressure: 0,
    airQuality: '良好',
    note: '',
    sensorId: '',
  })

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironmentRecords(prev => prev.map(record => {
        // 温度小幅波动
        const newTemperature = record.temperature + (Math.random() - 0.5) * 0.3
        const newHumidity = record.humidity + (Math.random() - 0.5) * 2
        const newPressure = record.pressure + (Math.random() - 0.5) * 0.5
        
        // 计算状态
        const newStatus = calculateStatus(newTemperature, newHumidity)
        
        return {
          ...record,
          temperature: parseFloat(newTemperature.toFixed(1)),
          humidity: parseFloat(newHumidity.toFixed(1)),
          pressure: parseFloat(newPressure.toFixed(1)),
          status: newStatus,
          timestamp: new Date().toLocaleString('zh-CN'),
        }
      }))
      
      // 更新传感器数据
      setSensors(prev => prev.map(sensor => {
        const record = environmentRecords.find(r => r.sensorId === sensor.id)
        if (record) {
          return {
            ...sensor,
            parameters: [
              { name: '温度', value: record.temperature.toFixed(1), unit: '°C' },
              { name: '湿度', value: record.humidity.toFixed(1), unit: '%' },
            ],
            lastReading: record.timestamp,
          }
        }
        return sensor
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [environmentRecords])

  const calculateStatus = (temperature: number, humidity: number): '正常' | '警告' | '异常' => {
    if (temperature >= 20 && temperature <= 28 && humidity >= 40 && humidity <= 60) {
      return '正常'
    } else if (temperature >= 18 && temperature <= 30 && humidity >= 35 && humidity <= 65) {
      return '警告'
    } else {
      return '异常'
    }
  }

  const handleCreateRecord = () => {
    setSelectedRecord(null)
    setFormData({
      location: '',
      temperature: 25,
      humidity: 45,
      pressure: 1013,
      airQuality: '良好',
      note: '',
      sensorId: '',
    })
    setIsModalOpen(true)
  }

  const handleEditRecord = (record: EnvironmentRecord) => {
    setSelectedRecord(record)
    setFormData({
      location: record.location,
      temperature: record.temperature,
      humidity: record.humidity,
      pressure: record.pressure,
      airQuality: record.airQuality,
      note: record.note,
      sensorId: record.sensorId,
    })
    setIsModalOpen(true)
  }

  const handleViewRecord = (record: EnvironmentRecord) => {
    setSelectedRecord(record)
    setIsDetailModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedRecord) {
      // 编辑现有记录
      const updatedRecord = {
        ...selectedRecord,
        ...formData,
        status: calculateStatus(formData.temperature, formData.humidity),
        timestamp: new Date().toLocaleString('zh-CN'),
      }
      setEnvironmentRecords(environmentRecords.map(record => 
        record.id === selectedRecord.id ? updatedRecord : record
      ))
    } else {
      // 创建新记录
      const newRecord: EnvironmentRecord = {
        ...formData,
        id: `ENV-2024-${String(environmentRecords.length + 1).padStart(3, '0')}`,
        status: calculateStatus(formData.temperature, formData.humidity),
        timestamp: new Date().toLocaleString('zh-CN'),
      }
      setEnvironmentRecords([...environmentRecords, newRecord])
    }
    
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">环境监测</h2>
        <button 
          onClick={handleCreateRecord}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          新增监测记录
        </button>
      </div>
      
      {/* 传感器状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sensors.map((sensor) => (
          <div key={sensor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{sensor.location}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                sensor.status === '在线' ? 'bg-green-100 text-green-800' :
                sensor.status === '离线' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {sensor.status}
              </span>
            </div>
            <div className="space-y-2">
              {sensor.parameters.map((param, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{param.name}</span>
                  <span className="font-medium">{param.value} {param.unit}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500">
              最后更新: {sensor.lastReading}
            </div>
          </div>
        ))}
      </div>
      
      {/* 环境监测记录 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">记录编号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">位置</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">温度 (°C)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">湿度 (%)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">气压 (hPa)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">空气质量</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">传感器</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {environmentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{record.temperature}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{record.humidity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{record.pressure}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.airQuality}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${ 
                      record.status === '正常' ? 'bg-green-100 text-green-800' :
                      record.status === '警告' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.status === '正常' ? <CheckCircle className="w-3 h-3" /> :
                       record.status === '警告' ? <AlertCircle className="w-3 h-3" /> :
                       <AlertCircle className="w-3 h-3" />}
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.sensorId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button 
                      onClick={() => handleViewRecord(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditRecord(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 创建/编辑记录模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedRecord ? '编辑环境记录' : '新增环境记录'}
              </h3>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    位置 *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    传感器编号 *
                  </label>
                  <input
                    type="text"
                    value={formData.sensorId}
                    onChange={(e) => setFormData({ ...formData, sensorId: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    温度 (°C) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    湿度 (%) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.humidity}
                    onChange={(e) => setFormData({ ...formData, humidity: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    气压 (hPa) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.pressure}
                    onChange={(e) => setFormData({ ...formData, pressure: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    空气质量 *
                  </label>
                  <select
                    value={formData.airQuality}
                    onChange={(e) => setFormData({ ...formData, airQuality: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="良好">良好</option>
                    <option value="中等">中等</option>
                    <option value="较差">较差</option>
                    <option value="差">差</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备注
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedRecord ? '保存修改' : '创建记录'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 记录详情模态框 */}
      {isDetailModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">环境记录详情</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">基本信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">记录编号</span>
                      <span className="font-medium">{selectedRecord.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">位置</span>
                      <span className="font-medium">{selectedRecord.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">传感器编号</span>
                      <span className="font-medium">{selectedRecord.sensorId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                        selectedRecord.status === '正常' ? 'bg-green-100 text-green-800' :
                        selectedRecord.status === '警告' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">时间</span>
                      <span className="font-medium">{selectedRecord.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">环境参数</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">温度</span>
                      <span className="font-medium">{selectedRecord.temperature} °C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">湿度</span>
                      <span className="font-medium">{selectedRecord.humidity} %</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">气压</span>
                      <span className="font-medium">{selectedRecord.pressure} hPa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">空气质量</span>
                      <span className="font-medium">{selectedRecord.airQuality}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedRecord.note && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">备注</h4>
                  <p className="text-gray-700">{selectedRecord.note}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">参数趋势</h4>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                    <p>参数趋势图表</p>
                    <p className="text-sm">实时数据可视化</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
