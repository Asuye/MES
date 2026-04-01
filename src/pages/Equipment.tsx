import { useState } from 'react'
import { Factory, Plus, Edit, Trash2, Eye, CheckCircle, AlertCircle, Clock, Shield, Activity, Settings } from 'lucide-react'

interface Equipment {
  id: string
  name: string
  type: string
  model: string
  manufacturer: string
  status: '运行中' | '待机' | '故障' | '维护'
  lastMaintenance: string
  nextMaintenance: string
  location: string
  responsible: string
  note: string
  maintenanceHistory: MaintenanceRecord[]
  parameters: EquipmentParameter[]
}

interface MaintenanceRecord {
  id: string
  date: string
  type: string
  description: string
  technician: string
  status: '已完成' | '计划中' | '进行中'
}

interface EquipmentParameter {
  name: string
  value: string
  unit: string
  lastUpdated: string
}

const initialEquipment: Equipment[] = [
  {
    id: 'EQ-001',
    name: '混合机',
    type: '混合设备',
    model: 'HM-2000',
    manufacturer: '上海药机',
    status: '运行中',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10',
    location: '生产车间A区',
    responsible: '张三',
    note: '正常运行',
    maintenanceHistory: [
      {
        id: 'MAINT-001',
        date: '2024-01-10',
        type: '定期维护',
        description: '设备全面检查和润滑',
        technician: '李四',
        status: '已完成',
      },
    ],
    parameters: [
      { name: '温度', value: '25.5', unit: '°C', lastUpdated: '2024-01-15 10:30' },
      { name: '转速', value: '500', unit: 'rpm', lastUpdated: '2024-01-15 10:30' },
    ],
  },
  {
    id: 'EQ-002',
    name: '压片机',
    type: '压片设备',
    model: 'YP-35',
    manufacturer: '北京国药',
    status: '运行中',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-04-05',
    location: '生产车间B区',
    responsible: '李四',
    note: '正常运行',
    maintenanceHistory: [
      {
        id: 'MAINT-002',
        date: '2024-01-05',
        type: '定期维护',
        description: '设备全面检查和清洁',
        technician: '王五',
        status: '已完成',
      },
    ],
    parameters: [
      { name: '压力', value: '1.2', unit: 'bar', lastUpdated: '2024-01-15 10:30' },
      { name: '转速', value: '300', unit: 'rpm', lastUpdated: '2024-01-15 10:30' },
    ],
  },
  {
    id: 'EQ-003',
    name: '干燥机',
    type: '干燥设备',
    model: 'GZ-100',
    manufacturer: '江苏天力',
    status: '故障',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-01-16',
    location: '生产车间C区',
    responsible: '王五',
    note: '温度传感器故障',
    maintenanceHistory: [
      {
        id: 'MAINT-003',
        date: '2024-01-01',
        type: '定期维护',
        description: '设备全面检查',
        technician: '赵六',
        status: '已完成',
      },
      {
        id: 'MAINT-004',
        date: '2024-01-15',
        type: '故障维修',
        description: '更换温度传感器',
        technician: '赵六',
        status: '进行中',
      },
    ],
    parameters: [
      { name: '温度', value: '35.2', unit: '°C', lastUpdated: '2024-01-15 09:00' },
      { name: '湿度', value: '65', unit: '%', lastUpdated: '2024-01-15 09:00' },
    ],
  },
  {
    id: 'EQ-004',
    name: '包装机',
    type: '包装设备',
    model: 'BZ-500',
    manufacturer: '浙江江南',
    status: '待机',
    lastMaintenance: '2023-12-20',
    nextMaintenance: '2024-03-20',
    location: '包装车间',
    responsible: '赵六',
    note: '待生产',
    maintenanceHistory: [
      {
        id: 'MAINT-005',
        date: '2023-12-20',
        type: '定期维护',
        description: '设备全面检查和润滑',
        technician: '张三',
        status: '已完成',
      },
    ],
    parameters: [],
  },
  {
    id: 'EQ-005',
    name: '制粒机',
    type: '制粒设备',
    model: 'ZL-300',
    manufacturer: '上海药机',
    status: '维护',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-01-17',
    location: '生产车间A区',
    responsible: '张三',
    note: '定期维护',
    maintenanceHistory: [
      {
        id: 'MAINT-006',
        date: '2024-01-12',
        type: '定期维护',
        description: '设备全面检查和零部件更换',
        technician: '李四',
        status: '进行中',
      },
    ],
    parameters: [],
  },
]

export default function Equipment() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(initialEquipment)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<Equipment, 'id' | 'maintenanceHistory' | 'parameters'>>({ 
    name: '',
    type: '',
    model: '',
    manufacturer: '',
    status: '运行中',
    lastMaintenance: '',
    nextMaintenance: '',
    location: '',
    responsible: '',
    note: '',
  })

  const handleCreateEquipment = () => {
    setSelectedEquipment(null)
    setFormData({
      name: '',
      type: '',
      model: '',
      manufacturer: '',
      status: '运行中',
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: '',
      responsible: '',
      note: '',
    })
    setIsModalOpen(true)
  }

  const handleEditEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setFormData({
      name: equipment.name,
      type: equipment.type,
      model: equipment.model,
      manufacturer: equipment.manufacturer,
      status: equipment.status,
      lastMaintenance: equipment.lastMaintenance,
      nextMaintenance: equipment.nextMaintenance,
      location: equipment.location,
      responsible: equipment.responsible,
      note: equipment.note,
    })
    setIsModalOpen(true)
  }

  const handleViewEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setIsDetailModalOpen(true)
  }

  const handleDeleteEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedEquipment) {
      // 编辑现有设备
      const updatedEquipment = {
        ...selectedEquipment,
        ...formData,
      }
      setEquipmentList(equipmentList.map(equipment => 
        equipment.id === selectedEquipment.id ? updatedEquipment : equipment
      ))
    } else {
      // 创建新设备
      const newEquipment: Equipment = {
        ...formData,
        id: `EQ-${String(equipmentList.length + 1).padStart(3, '0')}`,
        maintenanceHistory: [],
        parameters: [],
      }
      setEquipmentList([...equipmentList, newEquipment])
    }
    
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (selectedEquipment) {
      setEquipmentList(equipmentList.filter(equipment => equipment.id !== selectedEquipment.id))
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">设备管理</h2>
        <button 
          onClick={handleCreateEquipment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          新增设备
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">设备编号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">设备名称</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">类型</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">型号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">位置</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">负责人</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">下次维护</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipmentList.map((equipment) => (
                <tr key={equipment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{equipment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{equipment.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{equipment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{equipment.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${ 
                      equipment.status === '运行中' ? 'bg-green-100 text-green-800' :
                      equipment.status === '待机' ? 'bg-blue-100 text-blue-800' :
                      equipment.status === '故障' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {equipment.status === '运行中' ? <CheckCircle className="w-3 h-3" /> :
                       equipment.status === '待机' ? <Clock className="w-3 h-3" /> :
                       equipment.status === '故障' ? <AlertCircle className="w-3 h-3" /> :
                       <Settings className="w-3 h-3" />}
                      {equipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{equipment.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{equipment.responsible}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{equipment.nextMaintenance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button 
                      onClick={() => handleViewEquipment(equipment)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditEquipment(equipment)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEquipment(equipment)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 创建/编辑设备模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedEquipment ? '编辑设备' : '新增设备'}
              </h3>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    设备名称 *
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
                    设备类型 *
                  </label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    型号 *
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    制造商 *
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    状态 *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as '运行中' | '待机' | '故障' | '维护' })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="运行中">运行中</option>
                    <option value="待机">待机</option>
                    <option value="故障">故障</option>
                    <option value="维护">维护</option>
                  </select>
                </div>
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
                    负责人 *
                  </label>
                  <input
                    type="text"
                    value={formData.responsible}
                    onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    上次维护 *
                  </label>
                  <input
                    type="date"
                    value={formData.lastMaintenance}
                    onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    下次维护 *
                  </label>
                  <input
                    type="date"
                    value={formData.nextMaintenance}
                    onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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
                  {selectedEquipment ? '保存修改' : '创建设备'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 设备详情模态框 */}
      {isDetailModalOpen && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">设备详情</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">基本信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">设备编号</span>
                      <span className="font-medium">{selectedEquipment.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">设备名称</span>
                      <span className="font-medium">{selectedEquipment.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">设备类型</span>
                      <span className="font-medium">{selectedEquipment.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">型号</span>
                      <span className="font-medium">{selectedEquipment.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">制造商</span>
                      <span className="font-medium">{selectedEquipment.manufacturer}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">状态信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">当前状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                        selectedEquipment.status === '运行中' ? 'bg-green-100 text-green-800' :
                        selectedEquipment.status === '待机' ? 'bg-blue-100 text-blue-800' :
                        selectedEquipment.status === '故障' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedEquipment.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">位置</span>
                      <span className="font-medium">{selectedEquipment.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">负责人</span>
                      <span className="font-medium">{selectedEquipment.responsible}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">上次维护</span>
                      <span className="font-medium">{selectedEquipment.lastMaintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">下次维护</span>
                      <span className="font-medium">{selectedEquipment.nextMaintenance}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedEquipment.note && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">备注</h4>
                  <p className="text-gray-700">{selectedEquipment.note}</p>
                </div>
              )}
              
              {selectedEquipment.parameters.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">运行参数</h4>
                  <div className="space-y-2">
                    {selectedEquipment.parameters.map((param, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{param.name}</span>
                        <div className="text-right">
                          <div className="font-medium">{param.value} {param.unit}</div>
                          <div className="text-xs text-gray-500">{param.lastUpdated}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedEquipment.maintenanceHistory.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">维护历史</h4>
                  <div className="space-y-4">
                    {selectedEquipment.maintenanceHistory.map((record) => (
                      <div key={record.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{record.type}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                            record.status === '已完成' ? 'bg-green-100 text-green-800' :
                            record.status === '进行中' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">日期:</span> {record.date}
                          </div>
                          <div>
                            <span className="text-gray-600">技术员:</span> {record.technician}
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">描述:</span> {record.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
      
      {/* 删除确认模态框 */}
      {isDeleteModalOpen && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">删除设备</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                确定要删除设备 <span className="font-medium">{selectedEquipment.id} - {selectedEquipment.name}</span> 吗？
              </p>
              <p className="text-sm text-gray-500 mb-6">
                此操作无法撤销，删除后将无法恢复。
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
