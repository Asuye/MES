import { ProductionBatch, QualityInspection, Equipment, Material, Report, User, SystemLog, Product, Recipe, WorkOrder } from '../types';

// 模拟 API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 生产管理服务
export const productionService = {
  // 获取生产批次列表
  async getBatches(): Promise<ProductionBatch[]> {
    await delay(300);
    return [
      {
        id: '1',
        name: 'BATCH-2024-001',
        product: '阿司匹林片',
        status: 'completed',
        startDate: '2024-01-15 08:00:00',
        endDate: '2024-01-15 16:00:00',
        quantity: 10000,
        targetQuantity: 10000,
        recipeId: 'REC-001',
        equipmentId: 'EQ-001',
        operator: 'operator',
      },
      {
        id: '2',
        name: 'BATCH-2024-002',
        product: '布洛芬片',
        status: 'running',
        startDate: '2024-01-16 09:30:00',
        endDate: '',
        quantity: 5000,
        targetQuantity: 8000,
        recipeId: 'REC-002',
        equipmentId: 'EQ-002',
        operator: 'operator',
      },
      {
        id: '3',
        name: 'BATCH-2024-003',
        product: '对乙酰氨基酚片',
        status: 'pending',
        startDate: '2024-01-17 08:00:00',
        endDate: '',
        quantity: 0,
        targetQuantity: 12000,
        recipeId: 'REC-003',
        equipmentId: 'EQ-001',
        operator: 'operator',
      },
    ];
  },

  // 开始生产批次
  async startBatch(batchId: string): Promise<ProductionBatch> {
    await delay(500);
    return {
      id: batchId,
      name: `BATCH-2024-00${batchId}`,
      product: '布洛芬片',
      status: 'running',
      startDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      endDate: '',
      quantity: 0,
      targetQuantity: 8000,
      recipeId: 'REC-002',
      equipmentId: 'EQ-002',
      operator: 'operator',
    };
  },

  // 完成生产批次
  async completeBatch(batchId: string, quantity: number): Promise<ProductionBatch> {
    await delay(500);
    return {
      id: batchId,
      name: `BATCH-2024-00${batchId}`,
      product: '布洛芬片',
      status: 'completed',
      startDate: '2024-01-16 09:30:00',
      endDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      quantity,
      targetQuantity: 8000,
      recipeId: 'REC-002',
      equipmentId: 'EQ-002',
      operator: 'operator',
    };
  },
};

// 质量管理服务
export const qualityService = {
  // 获取质量检验列表
  async getInspections(): Promise<QualityInspection[]> {
    await delay(300);
    return [
      {
        id: '1',
        batchId: 'BATCH-2024-001',
        product: '阿司匹林片',
        inspector: '质量员',
        date: '2024-01-15 16:30:00',
        status: 'pass',
        testResults: [
          { name: '含量', value: '99.8%', standard: '95.0%-105.0%', pass: true },
          { name: '崩解时限', value: '15分钟', standard: '≤30分钟', pass: true },
          { name: '溶出度', value: '98.5%', standard: '≥80.0%', pass: true },
        ],
        comments: '检验合格，符合质量标准',
      },
      {
        id: '2',
        batchId: 'BATCH-2024-002',
        product: '布洛芬片',
        inspector: '质量员',
        date: '2024-01-16 14:00:00',
        status: 'pending',
        testResults: [
          { name: '含量', value: '98.2%', standard: '95.0%-105.0%', pass: true },
          { name: '崩解时限', value: '22分钟', standard: '≤30分钟', pass: true },
          { name: '溶出度', value: '', standard: '≥80.0%', pass: false },
        ],
        comments: '正在检验中',
      },
      {
        id: '3',
        batchId: 'BATCH-2023-12-001',
        product: '对乙酰氨基酚片',
        inspector: '质量员',
        date: '2023-12-30 10:00:00',
        status: 'fail',
        testResults: [
          { name: '含量', value: '94.5%', standard: '95.0%-105.0%', pass: false },
          { name: '崩解时限', value: '25分钟', standard: '≤30分钟', pass: true },
          { name: '溶出度', value: '85.2%', standard: '≥80.0%', pass: true },
        ],
        comments: '含量低于标准值，需要重新生产',
      },
    ];
  },

  // 创建质量检验
  async createInspection(inspection: Omit<QualityInspection, 'id' | 'date' | 'status'>): Promise<QualityInspection> {
    await delay(500);
    return {
      ...inspection,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: 'pending',
    };
  },

  // 更新检验结果
  async updateInspection(id: string, results: import('../types').TestResult[], status: QualityInspection['status']): Promise<QualityInspection> {
    await delay(500);
    return {
      id,
      batchId: 'BATCH-2024-002',
      product: '布洛芬片',
      inspector: '质量员',
      date: '2024-01-16 14:00:00',
      status,
      testResults: results,
      comments: status === 'pass' ? '检验合格' : '检验不合格',
    };
  },
};

// 设备管理服务
export const equipmentService = {
  // 获取设备列表
  async getEquipment(): Promise<Equipment[]> {
    await delay(300);
    return [
      {
        id: '1',
        name: '压片机',
        type: '生产设备',
        status: 'running',
        lastMaintenance: '2024-01-10',
        nextMaintenance: '2024-02-10',
        location: '生产车间A区',
        model: 'PT-1000',
        manufacturer: '制药设备有限公司',
        serialNumber: 'PT-2023-001',
      },
      {
        id: '2',
        name: '包装机',
        type: '生产设备',
        status: 'idle',
        lastMaintenance: '2024-01-05',
        nextMaintenance: '2024-02-05',
        location: '生产车间B区',
        model: 'PK-2000',
        manufacturer: '包装设备有限公司',
        serialNumber: 'PK-2023-001',
      },
      {
        id: '3',
        name: '混合机',
        type: '生产设备',
        status: 'maintenance',
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-02-15',
        location: '生产车间A区',
        model: 'MX-3000',
        manufacturer: '制药设备有限公司',
        serialNumber: 'MX-2023-001',
      },
      {
        id: '4',
        name: '检测仪器',
        type: '检测设备',
        status: 'fault',
        lastMaintenance: '2024-01-01',
        nextMaintenance: '2024-02-01',
        location: '质量检验室',
        model: 'DT-4000',
        manufacturer: '检测设备有限公司',
        serialNumber: 'DT-2023-001',
      },
    ];
  },

  // 更新设备状态
  async updateStatus(id: string, status: Equipment['status']): Promise<Equipment> {
    await delay(300);
    return {
      id,
      name: '压片机',
      type: '生产设备',
      status,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      location: '生产车间A区',
      model: 'PT-1000',
      manufacturer: '制药设备有限公司',
      serialNumber: 'PT-2023-001',
    };
  },

  // 记录设备维护
  async recordMaintenance(id: string, date: string): Promise<Equipment> {
    await delay(500);
    return {
      id,
      name: '压片机',
      type: '生产设备',
      status: 'maintenance',
      lastMaintenance: date,
      nextMaintenance: new Date(Date.parse(date) + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      location: '生产车间A区',
      model: 'PT-1000',
      manufacturer: '制药设备有限公司',
      serialNumber: 'PT-2023-001',
    };
  },
};

// 物料管理服务
export const materialService = {
  // 获取物料列表
  async getMaterials(): Promise<Material[]> {
    await delay(300);
    return [
      {
        id: '1',
        name: '阿司匹林原料',
        code: 'MAT-001',
        type: '原料',
        stock: 1000,
        unit: 'kg',
        minStock: 500,
        status: 'normal',
        supplier: '原料供应商A',
        leadTime: 7,
      },
      {
        id: '2',
        name: '布洛芬原料',
        code: 'MAT-002',
        type: '原料',
        stock: 300,
        unit: 'kg',
        minStock: 400,
        status: 'low',
        supplier: '原料供应商B',
        leadTime: 5,
      },
      {
        id: '3',
        name: '对乙酰氨基酚原料',
        code: 'MAT-003',
        type: '原料',
        stock: 0,
        unit: 'kg',
        minStock: 300,
        status: 'out',
        supplier: '原料供应商C',
        leadTime: 10,
      },
      {
        id: '4',
        name: '包装材料',
        code: 'MAT-004',
        type: '辅料',
        stock: 5000,
        unit: '个',
        minStock: 1000,
        status: 'normal',
        supplier: '包装材料供应商',
        leadTime: 3,
      },
    ];
  },

  // 更新物料库存
  async updateStock(id: string, quantity: number): Promise<Material> {
    await delay(300);
    return {
      id,
      name: '布洛芬原料',
      code: 'MAT-002',
      type: '原料',
      stock: quantity,
      unit: 'kg',
      minStock: 400,
      status: quantity >= 400 ? 'normal' : quantity > 0 ? 'low' : 'out',
      supplier: '原料供应商B',
      leadTime: 5,
    };
  },

  // 创建采购订单
  async createPurchaseOrder(materialId: string, quantity: number): Promise<{ id: string; materialId: string; quantity: number; status: 'pending' | 'ordered' | 'received' }> {
    await delay(500);
    return {
      id: Math.random().toString(36).substr(2, 9),
      materialId,
      quantity,
      status: 'pending',
    };
  },
};

// 报表管理服务
export const reportService = {
  // 获取报表列表
  async getReports(): Promise<Report[]> {
    await delay(300);
    return [
      {
        id: '1',
        name: '生产日报',
        type: '生产报表',
        date: '2024-01-16',
        generatedBy: 'admin',
        status: 'generated',
        fileUrl: '/reports/production-2024-01-16.pdf',
        parameters: { date: '2024-01-16' },
      },
      {
        id: '2',
        name: '质量月报',
        type: '质量报表',
        date: '2024-01-31',
        generatedBy: 'quality',
        status: 'pending',
        fileUrl: '',
        parameters: { month: '2024-01' },
      },
      {
        id: '3',
        name: '设备维护报告',
        type: '设备报表',
        date: '2024-01-15',
        generatedBy: 'maintenance',
        status: 'generated',
        fileUrl: '/reports/equipment-2024-01-15.pdf',
        parameters: { date: '2024-01-15' },
      },
    ];
  },

  // 生成报表
  async generateReport(type: string, parameters: Record<string, any>): Promise<Report> {
    await delay(2000);
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `${type}报表`,
      type,
      date: new Date().toISOString().slice(0, 10),
      generatedBy: 'admin',
      status: 'generated',
      fileUrl: `/reports/${type}-${new Date().toISOString().slice(0, 10)}.pdf`,
      parameters,
    };
  },
};

// 系统管理服务
export const systemService = {
  // 获取用户列表
  async getUsers(): Promise<User[]> {
    await delay(300);
    return [
      {
        id: '1',
        username: 'admin',
        name: '管理员',
        role: 'admin',
        status: 'active',
        email: 'admin@example.com',
        lastLogin: '2024-01-16 10:00:00',
      },
      {
        id: '2',
        username: 'operator',
        name: '操作员',
        role: 'operator',
        status: 'active',
        email: 'operator@example.com',
        lastLogin: '2024-01-16 09:30:00',
      },
      {
        id: '3',
        username: 'quality',
        name: '质量员',
        role: 'quality',
        status: 'active',
        email: 'quality@example.com',
        lastLogin: '2024-01-16 09:00:00',
      },
      {
        id: '4',
        username: 'maintenance',
        name: '维护员',
        role: 'maintenance',
        status: 'inactive',
        email: 'maintenance@example.com',
        lastLogin: '2024-01-15 16:00:00',
      },
    ];
  },

  // 获取系统日志
  async getLogs(): Promise<SystemLog[]> {
    await delay(300);
    return [
      {
        id: '1',
        timestamp: '2024-01-16 10:00:00',
        user: 'admin',
        action: '登录系统',
        ip: '192.168.1.100',
        details: '管理员登录系统',
      },
      {
        id: '2',
        timestamp: '2024-01-16 09:30:00',
        user: 'operator',
        action: '开始生产批次 BATCH-2024-002',
        ip: '192.168.1.101',
        details: '操作员开始生产布洛芬片',
      },
      {
        id: '3',
        timestamp: '2024-01-16 09:00:00',
        user: 'quality',
        action: '审核质量检验记录 QC-2024-001',
        ip: '192.168.1.102',
        details: '质量员审核阿司匹林片检验记录',
      },
    ];
  },

  // 更新系统设置
  async updateSettings(settings: Record<string, any>): Promise<Record<string, any>> {
    await delay(500);
    return {
      systemName: settings.systemName || 'GMP 合规 MES 系统',
      version: '1.0.0',
      database: settings.database || { host: 'localhost:5432', name: 'mes_db' },
      notifications: settings.notifications || { email: true, sms: false },
      updatedAt: new Date().toISOString(),
    };
  },
};

// 产品管理服务
export const productService = {
  // 获取产品列表
  async getProducts(): Promise<Product[]> {
    await delay(300);
    return [
      {
        id: '1',
        name: '阿司匹林片',
        code: 'PROD-001',
        description: '解热镇痛药',
        unit: '片',
        recipeId: 'REC-001',
      },
      {
        id: '2',
        name: '布洛芬片',
        code: 'PROD-002',
        description: '非甾体抗炎药',
        unit: '片',
        recipeId: 'REC-002',
      },
      {
        id: '3',
        name: '对乙酰氨基酚片',
        code: 'PROD-003',
        description: '解热镇痛药',
        unit: '片',
        recipeId: 'REC-003',
      },
    ];
  },

  // 创建产品
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    await delay(500);
    return {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
  },
};

// 配方管理服务
export const recipeService = {
  // 获取配方列表
  async getRecipes(): Promise<Recipe[]> {
    await delay(300);
    return [
      {
        id: 'REC-001',
        name: '阿司匹林片配方',
        productId: '1',
        ingredients: [
          { materialId: '1', quantity: 100, unit: 'kg' },
          { materialId: '4', quantity: 5000, unit: '个' },
        ],
        instructions: [
          '混合原料',
          '压片',
          '包装',
        ],
        cycleTime: 8,
      },
      {
        id: 'REC-002',
        name: '布洛芬片配方',
        productId: '2',
        ingredients: [
          { materialId: '2', quantity: 80, unit: 'kg' },
          { materialId: '4', quantity: 4000, unit: '个' },
        ],
        instructions: [
          '混合原料',
          '压片',
          '包装',
        ],
        cycleTime: 6,
      },
      {
        id: 'REC-003',
        name: '对乙酰氨基酚片配方',
        productId: '3',
        ingredients: [
          { materialId: '3', quantity: 120, unit: 'kg' },
          { materialId: '4', quantity: 6000, unit: '个' },
        ],
        instructions: [
          '混合原料',
          '压片',
          '包装',
        ],
        cycleTime: 10,
      },
    ];
  },
};

// 工作订单服务
export const workOrderService = {
  // 获取工作订单列表
  async getWorkOrders(): Promise<WorkOrder[]> {
    await delay(300);
    return [
      {
        id: '1',
        orderNumber: 'WO-2024-001',
        productId: '1',
        quantity: 10000,
        priority: 'high',
        status: 'completed',
        dueDate: '2024-01-15',
        startDate: '2024-01-15',
        endDate: '2024-01-15',
      },
      {
        id: '2',
        orderNumber: 'WO-2024-002',
        productId: '2',
        quantity: 8000,
        priority: 'medium',
        status: 'in_progress',
        dueDate: '2024-01-16',
        startDate: '2024-01-16',
        endDate: '',
      },
      {
        id: '3',
        orderNumber: 'WO-2024-003',
        productId: '3',
        quantity: 12000,
        priority: 'low',
        status: 'pending',
        dueDate: '2024-01-17',
        startDate: '',
        endDate: '',
      },
    ];
  },

  // 创建工作订单
  async createWorkOrder(order: Omit<WorkOrder, 'id' | 'orderNumber' | 'status' | 'startDate' | 'endDate'>): Promise<WorkOrder> {
    await delay(500);
    return {
      ...order,
      id: Math.random().toString(36).substr(2, 9),
      orderNumber: `WO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: 'pending',
      startDate: '',
      endDate: '',
    };
  },
};
