/**
 * Equipment management API routes
 */
import { Router, type Request, type Response } from 'express'

const router = Router()

// 模拟设备数据
const equipment = [
  { id: 1, equipmentCode: 'EQ-001', equipmentName: '混合机', equipmentType: '生产设备', status: '运行中', lastMaintenance: '2024-03-15', nextMaintenance: '2024-06-15', createdAt: '2023-01-10' },
  { id: 2, equipmentCode: 'EQ-002', equipmentName: '制粒机', equipmentType: '生产设备', status: '待机', lastMaintenance: '2024-02-20', nextMaintenance: '2024-05-20', createdAt: '2023-01-15' },
  { id: 3, equipmentCode: 'EQ-003', equipmentName: '干燥机', equipmentType: '生产设备', status: '故障', lastMaintenance: '2024-01-10', nextMaintenance: '2024-04-10', createdAt: '2023-01-20' },
  { id: 4, equipmentCode: 'EQ-004', equipmentName: '压片机', equipmentType: '生产设备', status: '运行中', lastMaintenance: '2024-03-05', nextMaintenance: '2024-06-05', createdAt: '2023-01-25' },
]

// 模拟维护记录数据
const maintenanceRecords = [
  { id: 1, equipmentId: 1, maintenanceType: '例行维护', maintenanceDate: '2024-03-15', maintenancePerson: 1, description: '更换密封件', status: '已完成' },
  { id: 2, equipmentId: 2, maintenanceType: '例行维护', maintenanceDate: '2024-02-20', maintenancePerson: 1, description: '润滑保养', status: '已完成' },
  { id: 3, equipmentId: 3, maintenanceType: '故障维修', maintenanceDate: '2024-04-01', maintenancePerson: 1, description: '更换加热元件', status: '处理中' },
]

// 模拟环境数据
const environmentData = [
  { id: 1, area: '洁净区 A', temperature: 22.5, humidity: 45, pressureDifference: 10, particleCount: 1000, recordTime: '2024-04-01 08:00' },
  { id: 2, area: '洁净区 B', temperature: 23.0, humidity: 50, pressureDifference: 8, particleCount: 1200, recordTime: '2024-04-01 08:30' },
  { id: 3, area: '洁净区 C', temperature: 25.0, humidity: 60, pressureDifference: 5, particleCount: 2000, recordTime: '2024-04-01 09:00' },
  { id: 4, area: '洁净区 A', temperature: 22.6, humidity: 46, pressureDifference: 9, particleCount: 950, recordTime: '2024-04-01 09:30' },
]

/**
 * Get equipment list
 * GET /api/equipment
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: equipment
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get equipment details
 * GET /api/equipment/:id
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const eq = equipment.find(e => e.id === id)
    
    if (!eq) {
      res.status(404).json({ success: false, error: '设备不存在' })
      return
    }
    
    res.status(200).json({
      success: true,
      data: eq
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Create maintenance record
 * POST /api/equipment/maintenance
 */
router.post('/maintenance', async (req: Request, res: Response): Promise<void> => {
  try {
    const { equipmentId, maintenanceType, maintenancePerson, description } = req.body
    
    if (!equipmentId || !maintenanceType || !maintenancePerson || !description) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    const newRecord = {
      id: maintenanceRecords.length + 1,
      equipmentId,
      maintenanceType,
      maintenanceDate: new Date().toISOString(),
      maintenancePerson,
      description,
      status: '处理中'
    }
    
    maintenanceRecords.push(newRecord)
    
    // 更新设备的最后维护时间
    const eqIndex = equipment.findIndex(e => e.id === equipmentId)
    if (eqIndex !== -1) {
      equipment[eqIndex].lastMaintenance = new Date().toISOString().split('T')[0]
    }
    
    res.status(201).json({
      success: true,
      data: newRecord
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get maintenance records
 * GET /api/equipment/maintenance
 */
router.get('/maintenance/records', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: maintenanceRecords
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get environment data
 * GET /api/equipment/environment/data
 */
router.get('/environment/data', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: environmentData
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get environment alerts
 * GET /api/equipment/environment/alerts
 */
router.get('/environment/alerts', async (req: Request, res: Response): Promise<void> => {
  try {
    // 模拟环境报警数据
    const alerts = environmentData.filter(data => 
      data.temperature > 24 || data.humidity > 55 || data.particleCount > 1500
    ).map(data => ({
      id: data.id,
      area: data.area,
      message: `温度: ${data.temperature}°C, 湿度: ${data.humidity}%, 粒子数: ${data.particleCount}`,
      level: data.temperature > 24 ? 'warning' : data.humidity > 55 ? 'warning' : 'error',
      timestamp: data.recordTime
    }))
    
    res.status(200).json({
      success: true,
      data: alerts
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

export default router