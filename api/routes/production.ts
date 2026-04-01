/**
 * Production management API routes
 */
import { Router, type Request, type Response } from 'express'

const router = Router()

// 模拟生产计划数据
const productionPlans = [
  { id: 1, planName: '2024年Q1生产计划', product: '阿司匹林片', quantity: 10000, startDate: '2024-01-01', endDate: '2024-01-31', status: '已完成', createdBy: 1, createdAt: '2023-12-20' },
  { id: 2, planName: '2024年Q2生产计划', product: '布洛芬胶囊', quantity: 15000, startDate: '2024-04-01', endDate: '2024-06-30', status: '进行中', createdBy: 2, createdAt: '2024-03-15' },
  { id: 3, planName: '2024年Q3生产计划', product: '对乙酰氨基酚片', quantity: 12000, startDate: '2024-07-01', endDate: '2024-09-30', status: '待开始', createdBy: 2, createdAt: '2024-05-20' },
]

// 模拟批次数据
const batches = [
  { id: 1, batchNumber: 'BT-2024-001', planId: 2, product: '阿司匹林片', quantity: 1000, status: '进行中', startTime: '2024-04-01 08:00', endTime: null, createdBy: 2, createdAt: '2024-03-30' },
  { id: 2, batchNumber: 'BT-2024-002', planId: 2, product: '布洛芬胶囊', quantity: 1500, status: '待开始', startTime: null, endTime: null, createdBy: 2, createdAt: '2024-04-01' },
  { id: 3, batchNumber: 'BT-2024-003', planId: 1, product: '对乙酰氨基酚片', quantity: 1200, status: '已完成', startTime: '2024-03-15 09:00', endTime: '2024-03-15 16:00', createdBy: 2, createdAt: '2024-03-10' },
]

// 模拟电子批记录数据
const ebrs = [
  { id: 1, batchId: 1, content: { steps: ['配料', '混合', '制粒', '干燥', '压片', '包装'] }, status: '待审核', version: '1.0', createdBy: 3, createdAt: '2024-04-01 10:00' },
  { id: 2, batchId: 3, content: { steps: ['配料', '混合', '制粒', '干燥', '压片', '包装'] }, status: '已批准', version: '1.0', createdBy: 3, createdAt: '2024-03-15 16:30' },
]

// 模拟称量记录数据
const weighingRecords = [
  { id: 1, batchId: 1, materialCode: 'MAT-001', materialName: '阿司匹林', targetWeight: 10.0, actualWeight: 10.05, deviation: 0.05, operatorId: 3, operationTime: '2024-04-01 08:30', status: '合格' },
  { id: 2, batchId: 1, materialCode: 'MAT-002', materialName: '淀粉', targetWeight: 5.0, actualWeight: 5.10, deviation: 0.10, operatorId: 3, operationTime: '2024-04-01 08:45', status: '偏差' },
]

// 模拟工艺记录数据
const processRecords = [
  { id: 1, batchId: 1, processStep: '混合', equipmentId: 1, parameterName: '转速', targetValue: '100 rpm', actualValue: '102 rpm', unit: 'rpm', recordTime: '2024-04-01 09:30', operatorId: 3 },
  { id: 2, batchId: 1, processStep: '制粒', equipmentId: 2, parameterName: '温度', targetValue: '60 °C', actualValue: '65 °C', unit: '°C', recordTime: '2024-04-01 10:45', operatorId: 3 },
]

/**
 * Get production plans
 * GET /api/production/plans
 */
router.get('/plans', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: productionPlans
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Create production plan
 * POST /api/production/plans
 */
router.post('/plans', async (req: Request, res: Response): Promise<void> => {
  try {
    const { planName, product, quantity, startDate, endDate, createdBy } = req.body
    
    if (!planName || !product || !quantity || !startDate || !endDate || !createdBy) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    const newPlan = {
      id: productionPlans.length + 1,
      planName,
      product,
      quantity,
      startDate,
      endDate,
      status: '待开始',
      createdBy,
      createdAt: new Date().toISOString()
    }
    
    productionPlans.push(newPlan)
    
    res.status(201).json({
      success: true,
      data: newPlan
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get batches
 * GET /api/production/batches
 */
router.get('/batches', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: batches
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Create batch
 * POST /api/production/batches
 */
router.post('/batches', async (req: Request, res: Response): Promise<void> => {
  try {
    const { planId, product, quantity, createdBy } = req.body
    
    if (!planId || !product || !quantity || !createdBy) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    const batchNumber = `BT-${new Date().getFullYear()}-${String(batches.length + 1).padStart(3, '0')}`
    
    const newBatch = {
      id: batches.length + 1,
      batchNumber,
      planId,
      product,
      quantity,
      status: '待开始',
      startTime: null,
      endTime: null,
      createdBy,
      createdAt: new Date().toISOString()
    }
    
    batches.push(newBatch)
    
    res.status(201).json({
      success: true,
      data: newBatch
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get batch details
 * GET /api/production/batches/:id
 */
router.get('/batches/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const batch = batches.find(b => b.id === id)
    
    if (!batch) {
      res.status(404).json({ success: false, error: '批次不存在' })
      return
    }
    
    res.status(200).json({
      success: true,
      data: batch
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Update batch status
 * PUT /api/production/batches/:id
 */
router.put('/batches/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const { status } = req.body
    
    if (!status) {
      res.status(400).json({ success: false, error: '缺少状态参数' })
      return
    }
    
    const batchIndex = batches.findIndex(b => b.id === id)
    if (batchIndex === -1) {
      res.status(404).json({ success: false, error: '批次不存在' })
      return
    }
    
    const batch = batches[batchIndex]
    batch.status = status
    
    if (status === '进行中' && !batch.startTime) {
      batch.startTime = new Date().toISOString()
    } else if (status === '已完成' && !batch.endTime) {
      batch.endTime = new Date().toISOString()
    }
    
    res.status(200).json({
      success: true,
      data: batch
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get electronic batch records
 * GET /api/production/ebr
 */
router.get('/ebr', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: ebrs
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get weighing records
 * GET /api/production/weighing/records
 */
router.get('/weighing/records', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: weighingRecords
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Create weighing record
 * POST /api/production/weighing/records
 */
router.post('/weighing/records', async (req: Request, res: Response): Promise<void> => {
  try {
    const { batchId, materialCode, materialName, targetWeight, actualWeight, operatorId } = req.body
    
    if (!batchId || !materialCode || !materialName || !targetWeight || !actualWeight || !operatorId) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    const deviation = actualWeight - targetWeight
    const status = Math.abs(deviation) <= 0.05 ? '合格' : '偏差'
    
    const newRecord = {
      id: weighingRecords.length + 1,
      batchId,
      materialCode,
      materialName,
      targetWeight,
      actualWeight,
      deviation,
      operatorId,
      operationTime: new Date().toISOString(),
      status
    }
    
    weighingRecords.push(newRecord)
    
    res.status(201).json({
      success: true,
      data: newRecord
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get process records
 * GET /api/production/process/records
 */
router.get('/process/records', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: processRecords
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Create process record
 * POST /api/production/process/records
 */
router.post('/process/records', async (req: Request, res: Response): Promise<void> => {
  try {
    const { batchId, processStep, equipmentId, parameterName, targetValue, actualValue, unit, operatorId } = req.body
    
    if (!batchId || !processStep || !equipmentId || !parameterName || !targetValue || !actualValue || !unit || !operatorId) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    const newRecord = {
      id: processRecords.length + 1,
      batchId,
      processStep,
      equipmentId,
      parameterName,
      targetValue,
      actualValue,
      unit,
      recordTime: new Date().toISOString(),
      operatorId
    }
    
    processRecords.push(newRecord)
    
    res.status(201).json({
      success: true,
      data: newRecord
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

export default router