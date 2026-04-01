/**
 * Quality compliance API routes
 */
import { Router, type Request, type Response } from 'express'

const router = Router()

// 模拟偏差记录数据
const deviations = [
  { id: 1, batchNumber: 'BT-2024-001', deviationType: '物料偏差', description: '物料称量超出允许范围', severity: '轻微', status: '已关闭', reportedBy: 3, reportedAt: '2024-04-01 10:00', closedAt: '2024-04-01 11:00', closedBy: 2 },
  { id: 2, batchNumber: 'BT-2024-002', deviationType: '设备偏差', description: '制粒机温度异常', severity: '中度', status: '处理中', reportedBy: 3, reportedAt: '2024-04-02 14:30', closedAt: null, closedBy: null },
  { id: 3, batchNumber: 'BT-2024-003', deviationType: '环境偏差', description: '洁净区湿度超标', severity: '严重', status: '待处理', reportedBy: 3, reportedAt: '2024-04-03 09:15', closedAt: null, closedBy: null },
]

// 模拟审计追踪数据
const auditTrails = [
  { id: 1, userId: 3, user: '生产操作员', action: '创建批次', entityType: '批次', entityId: '1', oldValue: null, newValue: { batchNumber: 'BT-2024-001', product: '阿司匹林片' }, actionTime: '2024-04-01 08:00', ipAddress: '192.168.1.100' },
  { id: 2, userId: 3, user: '生产操作员', action: '记录称量', entityType: '称量记录', entityId: '1', oldValue: null, newValue: { materialCode: 'MAT-001', actualWeight: 10.05 }, actionTime: '2024-04-01 08:30', ipAddress: '192.168.1.100' },
  { id: 3, userId: 2, user: '生产管理员', action: '批准批记录', entityType: '批记录', entityId: '1', oldValue: { status: '待审核' }, newValue: { status: '已批准' }, actionTime: '2024-04-01 16:00', ipAddress: '192.168.1.101' },
  { id: 4, userId: 1, user: '系统管理员', action: '添加用户', entityType: '用户', entityId: '4', oldValue: null, newValue: { username: 'operator', name: '生产操作员' }, actionTime: '2024-03-20 10:00', ipAddress: '192.168.1.102' },
]

/**
 * Create deviation record
 * POST /api/quality/deviations
 */
router.post('/deviations', async (req: Request, res: Response): Promise<void> => {
  try {
    const { batchNumber, deviationType, description, severity, reportedBy } = req.body
    
    if (!batchNumber || !deviationType || !description || !severity || !reportedBy) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    const newDeviation = {
      id: deviations.length + 1,
      batchNumber,
      deviationType,
      description,
      severity,
      status: '待处理',
      reportedBy,
      reportedAt: new Date().toISOString(),
      closedAt: null,
      closedBy: null
    }
    
    deviations.push(newDeviation)
    
    res.status(201).json({
      success: true,
      data: newDeviation
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get deviation records
 * GET /api/quality/deviations
 */
router.get('/deviations', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: deviations
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Update deviation status
 * PUT /api/quality/deviations/:id
 */
router.put('/deviations/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const { status, closedBy } = req.body
    
    if (!status) {
      res.status(400).json({ success: false, error: '缺少状态参数' })
      return
    }
    
    const deviationIndex = deviations.findIndex(d => d.id === id)
    if (deviationIndex === -1) {
      res.status(404).json({ success: false, error: '偏差记录不存在' })
      return
    }
    
    const deviation = deviations[deviationIndex]
    deviation.status = status
    
    if (status === '已关闭' && closedBy) {
      deviation.closedAt = new Date().toISOString()
      deviation.closedBy = closedBy
    }
    
    res.status(200).json({
      success: true,
      data: deviation
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get audit trails
 * GET /api/quality/audit
 */
router.get('/audit', async (req: Request, res: Response): Promise<void> => {
  try {
    const { entityType, entityId, startDate, endDate } = req.query
    
    let filteredTrails = auditTrails
    
    if (entityType) {
      filteredTrails = filteredTrails.filter(trail => trail.entityType === entityType)
    }
    
    if (entityId) {
      filteredTrails = filteredTrails.filter(trail => trail.entityId === entityId)
    }
    
    if (startDate) {
      filteredTrails = filteredTrails.filter(trail => new Date(trail.actionTime) >= new Date(startDate as string))
    }
    
    if (endDate) {
      filteredTrails = filteredTrails.filter(trail => new Date(trail.actionTime) <= new Date(endDate as string))
    }
    
    res.status(200).json({
      success: true,
      data: filteredTrails
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Create audit trail
 * POST /api/quality/audit
 */
router.post('/audit', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, user, action, entityType, entityId, oldValue, newValue, ipAddress } = req.body
    
    if (!userId || !user || !action || !entityType || !entityId) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    const newTrail = {
      id: auditTrails.length + 1,
      userId,
      user,
      action,
      entityType,
      entityId,
      oldValue,
      newValue,
      actionTime: new Date().toISOString(),
      ipAddress: ipAddress || '127.0.0.1'
    }
    
    auditTrails.push(newTrail)
    
    res.status(201).json({
      success: true,
      data: newTrail
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

export default router