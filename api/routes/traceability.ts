/**
 * Traceability management API routes
 */
import { Router, type Request, type Response } from 'express'

const router = Router()

// 模拟追溯数据
const traceabilityData = {
  'BT-2024-001': {
    batchNumber: 'BT-2024-001',
    product: '阿司匹林片',
    quantity: 1000,
    startTime: '2024-04-01 08:00',
    endTime: '2024-04-01 16:00',
    materials: [
      { materialCode: 'MAT-001', materialName: '阿司匹林', supplier: 'XX化工', batch: 'MAT-BT-2024-001' },
      { materialCode: 'MAT-002', materialName: '淀粉', supplier: 'XX食品', batch: 'MAT-BT-2024-002' },
      { materialCode: 'MAT-003', materialName: '硬脂酸镁', supplier: 'XX医药', batch: 'MAT-BT-2024-003' },
    ],
    equipment: [
      { equipmentCode: 'EQ-001', equipmentName: '混合机', operationTime: '2024-04-01 08:30-09:30' },
      { equipmentCode: 'EQ-002', equipmentName: '制粒机', operationTime: '2024-04-01 09:45-11:15' },
      { equipmentCode: 'EQ-003', equipmentName: '干燥机', operationTime: '2024-04-01 11:30-13:00' },
      { equipmentCode: 'EQ-004', equipmentName: '压片机', operationTime: '2024-04-01 13:15-14:45' },
    ],
    qualityTests: [
      { testName: '含量测定', result: '合格', testTime: '2024-04-01 14:00' },
      { testName: '崩解时限', result: '合格', testTime: '2024-04-01 14:30' },
      { testName: '重量差异', result: '合格', testTime: '2024-04-01 15:00' },
    ],
    operators: [
      { id: 3, name: '生产操作员', role: '生产操作员' },
      { id: 2, name: '生产管理员', role: '生产管理员' },
    ],
  },
  'BT-2024-002': {
    batchNumber: 'BT-2024-002',
    product: '布洛芬胶囊',
    quantity: 1500,
    startTime: '2024-04-02 08:00',
    endTime: '2024-04-02 16:30',
    materials: [
      { materialCode: 'MAT-004', materialName: '布洛芬', supplier: 'XX化工', batch: 'MAT-BT-2024-004' },
      { materialCode: 'MAT-005', materialName: '微晶纤维素', supplier: 'XX食品', batch: 'MAT-BT-2024-005' },
    ],
    equipment: [
      { equipmentCode: 'EQ-001', equipmentName: '混合机', operationTime: '2024-04-02 08:30-09:30' },
      { equipmentCode: 'EQ-002', equipmentName: '制粒机', operationTime: '2024-04-02 09:45-11:15' },
      { equipmentCode: 'EQ-003', equipmentName: '干燥机', operationTime: '2024-04-02 11:30-13:00' },
      { equipmentCode: 'EQ-005', equipmentName: '胶囊填充机', operationTime: '2024-04-02 13:15-15:45' },
    ],
    qualityTests: [
      { testName: '含量测定', result: '合格', testTime: '2024-04-02 15:00' },
      { testName: '崩解时限', result: '合格', testTime: '2024-04-02 15:30' },
      { testName: '装量差异', result: '合格', testTime: '2024-04-02 16:00' },
    ],
    operators: [
      { id: 3, name: '生产操作员', role: '生产操作员' },
      { id: 2, name: '生产管理员', role: '生产管理员' },
    ],
  },
}

// 模拟物料追溯数据
const materialTraceabilityData = {
  'MAT-001': {
    materialCode: 'MAT-001',
    materialName: '阿司匹林',
    supplier: 'XX化工',
    batch: 'MAT-BT-2024-001',
    manufactureDate: '2024-01-15',
    expiryDate: '2026-01-14',
    incomingInspection: {
      date: '2024-01-20',
      result: '合格',
      inspector: '王五',
    },
    usageRecords: [
      { batchNumber: 'BT-2024-001', quantity: 10.0, usageDate: '2024-04-01' },
      { batchNumber: 'BT-2024-003', quantity: 8.5, usageDate: '2024-04-05' },
    ],
  },
  'MAT-002': {
    materialCode: 'MAT-002',
    materialName: '淀粉',
    supplier: 'XX食品',
    batch: 'MAT-BT-2024-002',
    manufactureDate: '2024-02-10',
    expiryDate: '2026-02-09',
    incomingInspection: {
      date: '2024-02-15',
      result: '合格',
      inspector: '王五',
    },
    usageRecords: [
      { batchNumber: 'BT-2024-001', quantity: 5.0, usageDate: '2024-04-01' },
      { batchNumber: 'BT-2024-002', quantity: 7.5, usageDate: '2024-04-02' },
    ],
  },
}

/**
 * Get batch traceability
 * GET /api/traceability/batch/:id
 */
router.get('/batch/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const batchId = req.params.id
    const traceData = traceabilityData[batchId as keyof typeof traceabilityData]
    
    if (!traceData) {
      res.status(404).json({ success: false, error: '批次不存在' })
      return
    }
    
    res.status(200).json({
      success: true,
      data: traceData
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Get material traceability
 * GET /api/traceability/material/:id
 */
router.get('/material/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const materialId = req.params.id
    const traceData = materialTraceabilityData[materialId as keyof typeof materialTraceabilityData]
    
    if (!traceData) {
      res.status(404).json({ success: false, error: '物料不存在' })
      return
    }
    
    res.status(200).json({
      success: true,
      data: traceData
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Search traceability
 * GET /api/traceability/search
 */
router.get('/search', async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, type } = req.query
    
    if (!query || !type) {
      res.status(400).json({ success: false, error: '缺少查询参数' })
      return
    }
    
    let results: any[] = []
    
    if (type === 'batch') {
      // 搜索批次
      results = Object.values(traceabilityData).filter(item => 
        item.batchNumber.includes(query as string) ||
        item.product.includes(query as string)
      )
    } else if (type === 'material') {
      // 搜索物料
      results = Object.values(materialTraceabilityData).filter(item => 
        item.materialCode.includes(query as string) ||
        item.materialName.includes(query as string)
      )
    }
    
    res.status(200).json({
      success: true,
      data: results
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

export default router