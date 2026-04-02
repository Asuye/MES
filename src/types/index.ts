// 生产批次类型
export interface ProductionBatch {
  id: string;
  name: string;
  product: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startDate: string;
  endDate: string;
  quantity: number;
  targetQuantity: number;
  recipeId: string;
  equipmentId: string;
  operator: string;
}

// 质量检验类型
export interface QualityInspection {
  id: string;
  batchId: string;
  product: string;
  inspector: string;
  date: string;
  status: 'pass' | 'fail' | 'pending';
  testResults: TestResult[];
  comments: string;
}

export interface TestResult {
  name: string;
  value: string;
  standard: string;
  pass: boolean;
}

// 设备类型
export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'maintenance' | 'idle' | 'fault';
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
}

// 物料类型
export interface Material {
  id: string;
  name: string;
  code: string;
  type: string;
  stock: number;
  unit: string;
  minStock: number;
  status: 'normal' | 'low' | 'out';
  supplier: string;
  leadTime: number;
}

// 报表类型
export interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  generatedBy: string;
  status: 'generated' | 'pending';
  fileUrl: string;
  parameters: Record<string, any>;
}

// 用户类型
export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'operator' | 'quality' | 'maintenance';
  status: 'active' | 'inactive';
  email: string;
  lastLogin: string;
}

// 系统日志类型
export interface SystemLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ip: string;
  details: string;
}

// 产品类型
export interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  unit: string;
  recipeId: string;
}

// 配方类型
export interface Recipe {
  id: string;
  name: string;
  productId: string;
  ingredients: Ingredient[];
  instructions: string[];
  cycleTime: number;
}

export interface Ingredient {
  materialId: string;
  quantity: number;
  unit: string;
}

// 工作订单类型
export interface WorkOrder {
  id: string;
  orderNumber: string;
  productId: string;
  quantity: number;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  dueDate: string;
  startDate: string;
  endDate: string;
}
