import { useState, useEffect } from 'react'
import { Activity, Plus, Edit, Trash2, Eye, AlertCircle, CheckCircle, Clock, Thermometer, Droplets, Gauge, BarChart3 } from 'lucide-react'

interface ProcessParameter {
  id: string
  name: string
  value: number
  unit: string
  min: number
  max: number
  status: '正常' | '警告' | '异常'
  timestamp: string
  batchNo: string
  product: string
  equipmentId: string
  equipmentName: string
}

interface EquipmentStatus {
  id: string
  name: string
  status: '运行中' | '待机' | '故障' | '维护'
  parameters: {
    name: string
    value: number
    unit: string
  }[]
  lastUpdated: string
}

const initialParameters: ProcessParameter[] = [
  {
    id: 'PARAM-001',
    name: '温度',
    value: 25.5,
    unit: '°C',
    min: 20,
    max: 30,
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    equipmentId: 'EQ-001',
    equipmentName: '混合机',
  },
  {
    id: 'PARAM-002',
    name: '湿度',
    value: 45,
    unit: '%',
    min: 40,
    max: 60,
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    equipmentId: 'EQ-001',
    equipmentName: '混合机',
  },
  {
    id: 'PARAM-003',
    name: '压力',
    value: 1.2,
    unit: 'bar',
    min: 1.0,
    max: 1.5,
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    equipmentId: 'EQ-002',
    equipmentName: '压片机',
  },
  {
    id: 'PARAM-004',
    name: '转速',
    value: 500,
    unit: 'rpm',
    min: 400,
    max: 600,
    status: '正常',
    timestamp: new Date().toLocaleString('zh-CN'),
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    equipmentId: 'EQ-001',
    equipmentName: '混合机',
  },
  {
    id: 'PARAM-005',
    name: '温度',
    value: 35.2,
    unit: '°C',
    min: 20,
    max: 30,
    status: '异常',
    timestamp: new Date().toLocaleString('zh-CN'),
    batchNo: 'BATCH-2024-002',
    product: '阿莫西林胶囊',
    equipmentId: 'EQ-003',
    equipmentName: '干燥机',
  },
  {
    id: 'PARAM-006',
    name: '湿度',
    value: 65,
    unit: '%',
    min: 40,
    max: 60,
    status: '警告',
    timestamp: new Date().toLocaleString('zh-CN'),
    batchNo: 'BATCH-2024-002',
    product: '阿莫西林胶囊',
    equipmentId: 'EQ-003',
    equipmentName: '干燥机',
  },
]

const initialEquipmentStatus: EquipmentStatus[] = [
  {
    id: 'EQ-001',
    name: '混合机',
    status: '运行中',
    parameters: [
      { name: '温度', value: 25.5, unit: '°C' },
      { name: '湿度', value: 45, unit: '%' },
      { name: '转速', value: 500, unit: 'rpm' },
    ],
    lastUpdated: new Date().toLocaleString('zh-CN'),
  },
  {
    id: 'EQ-002',
    name: '压片机',
    status: '运行中',
    parameters: [
      { name: '压力', value: 1.2, unit: 'bar' },
      { name: '转速', value: 300, unit: 'rpm' },
    ],
    lastUpdated: new Date().toLocaleString('zh-CN'),
  },
  {
    id: 'EQ-003',
    name: '干燥机',
    status: '运行中',
    parameters: [
      { name: '温度', value: 35.2, unit: '°C' },
      { name: '湿度', value: 65, unit: '%' },
    ],
    lastUpdated: new Date().toLocaleString('zh-CN'),
  },
  {
    id: 'EQ-004',
    name: '包装机',
    status: '待机',
    parameters: [],
    lastUpdated: new Date().toLocaleString('zh-CN'),
  },
  {
    id: 'EQ-005',
    name: '制粒机',
    status: '维护',
    parameters: [],
    lastUpdated: new Date().toLocaleString('zh-CN'),
  },
]

export default function Process() {
  const [parameters, setParameters] = useState<ProcessParameter[]>(initialParameters)
  const [equipmentStatus, setEquipmentStatus] = useState<EquipmentStatus[]>(initialEquipmentStatus)
  const [selectedParameter, setSelectedParameter] = useState<ProcessParameter | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<ProcessParameter, 'id' | 'status' | 'timestamp'>>({ 
    name: '',
    value: 0,
    unit: '',
    min: 0,
    max: 0,
    batchNo: '',
    product: '',
    equipmentId: '',
    equipmentName: '',
  })

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setParameters(prev => prev.map(param => {
        if (param.status === '正常') {
          // 正常参数小幅波动
          const newValue = param.value + (Math.random() - 0.5) * 0.5
          const newStatus = newValue >= param.min && newValue <= param.max ? '正常' : 
                          (newValue < param.min - 2 || newValue > param.max + 2 ? '异常' : '警告')
          return {
            ...param,
            value: parseFloat(newValue.toFixed(1)),
            status: newStatus,
            timestamp: new Date().toLocaleString('zh-CN'),
          }
        }
        return param
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCreateParameter = () => {
    setSelectedParameter(null)
    setFormData({
      name: '',
      value: 0,
      unit: '',
      min: 0,
      max: 0,
      batchNo: '',
      product: '',
      equipmentId: '',
      equipmentName: '',
    })
    setIsModalOpen(true)
  }

  const handleEditParameter = (param: ProcessParameter) => {
    setSelectedParameter(param)
    setFormData({
      name: param.name,
      value: param.value,
      unit: param.unit,
      min: param.min,
      max: param.max,
      batchNo: param.batchNo,
      product: param.product,
      equipmentId: param.equipmentId,
      equipmentName: param.equipmentName,
    })
    setIsModalOpen(true)
  }

  const handleViewParameter = (param: ProcessParameter) => {
    setSelectedParameter(param)
    setIsDetailModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const calculateStatus = (value: number, min: number, max: number): '正常' | '警告' | '异常' => {
      if (value >= min && value <= max) return '正常'
      return (value < min - 2 || value > max + 2) ? '异常' : '警告'
    }
    
    if (selectedParameter) {
      // 编辑现有参数
      const updatedParam = {
        ...selectedParameter,
        ...formData,
        status: calculateStatus(formData.value, formData.min, formData.max),
        timestamp: new Date().toLocaleString('zh-CN'),
      }
      setParameters(parameters.map(param => 
        param.id === selectedParameter.id ? updatedParam : param
      ))
    } else {
      // 创建新参数
      const newParam: ProcessParameter = {
        ...formData,
        id: `PARAM-${String(parameters.length + 1).padStart(3, '0')}`,
        status: calculateStatus(formData.value, formData.min, formData.max),
        timestamp: new Date().toLocaleString('zh-CN'),
      }
      setParameters([...parameters, newParam])
    }
    
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">工艺监控</h2>
        <button 
          onClick={handleCreateParameter}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          新增参数监控
        </button>
      </div>
      
      {/* 设备状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {equipmentStatus.map((equipment) => (
          <div key={equipment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{equipment.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                equipment.status === '运行中' ? 'bg-green-100 text-green-800' :
                equipment.status === '待机' ? 'bg-blue-100 text-blue-800' :
                equipment.status === '故障' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {equipment.status}
              </span>
            </div>
            <div className="space-y-2">
              {equipment.parameters.map((param, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{param.name}</span>
                  <span className="font-medium">{param.value} {param.unit}</span>
                </div>
              ))}
              {equipment.parameters.length === 0 && (
                <div className="text-sm text-gray-500">无运行参数</div>
              )}
            </div>
            <div className="mt-3 text-xs text-gray-500">
              最后更新: {equipment.lastUpdated}
            </div>
          </div>
        ))}
      </div>
      
      {/* 工艺参数监控 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">参数编号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">参数名称</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">当前值</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">范围</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">批次</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">设备</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parameters.map((param) => (
                <tr key={param.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{param.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{param.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{param.value} {param.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{param.min} - {param.max} {param.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${ 
                      param.status === '正常' ? 'bg-green-100 text-green-800' :
                      param.status === '警告' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {param.status === '正常' ? <CheckCircle className="w-3 h-3" /> :
                       param.status === '警告' ? <AlertCircle className="w-3 h-3" /> :
                       <AlertCircle className="w-3 h-3" />}
                      {param.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{param.batchNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{param.equipmentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{param.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button 
                      onClick={() => handleViewParameter(param)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditParameter(param)}
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
      
      {/* 创建/编辑参数模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedParameter ? '编辑工艺参数' : '新增工艺参数'}
              </h3>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    参数名称 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    单位 *
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    当前值 *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最小值 *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.min}
                    onChange={(e) => setFormData({ ...formData, min: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大值 *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.max}
                    onChange={(e) => setFormData({ ...formData, max: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    批次号 *
                  </label>
                  <input
                    type="text"
                    value={formData.batchNo}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    产品名称 *
                  </label>
                  <input
                    type="text"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    设备名称 *
                  </label>
                  <input
                    type="text"
                    value={formData.equipmentName}
                    onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    设备编号 *
                  </label>
                  <input
                    type="text"
                    value={formData.equipmentId}
                    onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
                    required
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
                  {selectedParameter ? '保存修改' : '创建参数'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 参数详情模态框 */}
      {isDetailModalOpen && selectedParameter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">工艺参数详情</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">基本信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">参数编号</span>
                      <span className="font-medium">{selectedParameter.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">参数名称</span>
                      <span className="font-medium">{selectedParameter.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">单位</span>
                      <span className="font-medium">{selectedParameter.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">当前值</span>
                      <span className="font-medium">{selectedParameter.value} {selectedParameter.unit}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">参数范围</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">最小值</span>
                      <span className="font-medium">{selectedParameter.min} {selectedParameter.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最大值</span>
                      <span className="font-medium">{selectedParameter.max} {selectedParameter.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                        selectedParameter.status === '正常' ? 'bg-green-100 text-green-800' :
                        selectedParameter.status === '警告' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedParameter.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">更新时间</span>
                      <span className="font-medium">{selectedParameter.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">生产信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">批次号</span>
                      <span className="font-medium">{selectedParameter.batchNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">产品名称</span>
                      <span className="font-medium">{selectedParameter.product}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">设备信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">设备编号</span>
                      <span className="font-medium">{selectedParameter.equipmentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">设备名称</span>
                      <span className="font-medium">{selectedParameter.equipmentName}</span>
                    </div>
                  </div>
                </div>
              </div>
              
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
