-- MES 系统数据库表结构

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 生产计划表
CREATE TABLE IF NOT EXISTS production_plans (
    id SERIAL PRIMARY KEY,
    plan_name VARCHAR(100) NOT NULL,
    product VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 批次表
CREATE TABLE IF NOT EXISTS batches (
    id SERIAL PRIMARY KEY,
    batch_number VARCHAR(50) UNIQUE NOT NULL,
    plan_id INTEGER REFERENCES production_plans(id),
    product VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 电子批记录表
CREATE TABLE IF NOT EXISTS ebrs (
    id SERIAL PRIMARY KEY,
    batch_id INTEGER REFERENCES batches(id),
    content JSONB NOT NULL,
    status VARCHAR(50) NOT NULL,
    version VARCHAR(20) NOT NULL,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 称量记录表
CREATE TABLE IF NOT EXISTS weighing_records (
    id SERIAL PRIMARY KEY,
    batch_id INTEGER REFERENCES batches(id),
    material_code VARCHAR(50) NOT NULL,
    material_name VARCHAR(100) NOT NULL,
    target_weight DECIMAL(10,2) NOT NULL,
    actual_weight DECIMAL(10,2) NOT NULL,
    deviation DECIMAL(10,2) NOT NULL,
    operator_id INTEGER REFERENCES users(id),
    operation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL
);

-- 工艺记录表
CREATE TABLE IF NOT EXISTS process_records (
    id SERIAL PRIMARY KEY,
    batch_id INTEGER REFERENCES batches(id),
    process_step VARCHAR(100) NOT NULL,
    equipment_id INTEGER NOT NULL,
    parameter_name VARCHAR(100) NOT NULL,
    target_value VARCHAR(50) NOT NULL,
    actual_value VARCHAR(50) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    record_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    operator_id INTEGER REFERENCES users(id)
);

-- 设备表
CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    equipment_code VARCHAR(50) UNIQUE NOT NULL,
    equipment_name VARCHAR(100) NOT NULL,
    equipment_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    last_maintenance DATE,
    next_maintenance DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 维护记录表
CREATE TABLE IF NOT EXISTS maintenance_records (
    id SERIAL PRIMARY KEY,
    equipment_id INTEGER REFERENCES equipment(id),
    maintenance_type VARCHAR(50) NOT NULL,
    maintenance_date DATE NOT NULL,
    maintenance_person INTEGER REFERENCES users(id),
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL
);

-- 环境数据表
CREATE TABLE IF NOT EXISTS environment_data (
    id SERIAL PRIMARY KEY,
    area VARCHAR(100) NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    humidity DECIMAL(5,2) NOT NULL,
    pressure_difference INTEGER NOT NULL,
    particle_count INTEGER NOT NULL,
    record_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 物料表
CREATE TABLE IF NOT EXISTS materials (
    id SERIAL PRIMARY KEY,
    material_code VARCHAR(50) UNIQUE NOT NULL,
    material_name VARCHAR(100) NOT NULL,
    supplier VARCHAR(100) NOT NULL,
    batch VARCHAR(50) NOT NULL,
    manufacture_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    incoming_inspection_result VARCHAR(50) NOT NULL,
    incoming_inspection_date DATE NOT NULL,
    inspector VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 物料使用记录表
CREATE TABLE IF NOT EXISTS material_usage_records (
    id SERIAL PRIMARY KEY,
    material_id INTEGER REFERENCES materials(id),
    batch_number VARCHAR(50) REFERENCES batches(batch_number),
    quantity DECIMAL(10,2) NOT NULL,
    usage_date DATE NOT NULL
);

-- 偏差记录表
CREATE TABLE IF NOT EXISTS deviations (
    id SERIAL PRIMARY KEY,
    batch_number VARCHAR(50) REFERENCES batches(batch_number),
    deviation_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    reported_by INTEGER REFERENCES users(id),
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP,
    closed_by INTEGER REFERENCES users(id)
);

-- 审计追踪表
CREATE TABLE IF NOT EXISTS audit_trails (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    user VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) NOT NULL
);

-- 插入测试数据
INSERT INTO users (username, password, name, role) VALUES
('admin', 'admin123', '系统管理员', '系统管理员'),
('prod_manager', 'prod123', '生产管理员', '生产管理员'),
('operator', 'op123', '生产操作员', '生产操作员');

INSERT INTO equipment (equipment_code, equipment_name, equipment_type, status, last_maintenance, next_maintenance) VALUES
('EQ-001', '混合机', '生产设备', '运行中', '2024-03-15', '2024-06-15'),
('EQ-002', '制粒机', '生产设备', '待机', '2024-02-20', '2024-05-20'),
('EQ-003', '干燥机', '生产设备', '故障', '2024-01-10', '2024-04-10'),
('EQ-004', '压片机', '生产设备', '运行中', '2024-03-05', '2024-06-05');

INSERT INTO production_plans (plan_name, product, quantity, start_date, end_date, status, created_by) VALUES
('2024年Q1生产计划', '阿司匹林片', 10000, '2024-01-01', '2024-01-31', '已完成', 1),
('2024年Q2生产计划', '布洛芬胶囊', 15000, '2024-04-01', '2024-06-30', '进行中', 2),
('2024年Q3生产计划', '对乙酰氨基酚片', 12000, '2024-07-01', '2024-09-30', '待开始', 2);

INSERT INTO batches (batch_number, plan_id, product, quantity, status, start_time, end_time, created_by) VALUES
('BT-2024-001', 2, '阿司匹林片', 1000, '进行中', '2024-04-01 08:00:00', NULL, 2),
('BT-2024-002', 2, '布洛芬胶囊', 1500, '待开始', NULL, NULL, 2),
('BT-2024-003', 1, '对乙酰氨基酚片', 1200, '已完成', '2024-03-15 09:00:00', '2024-03-15 16:00:00', 2);

INSERT INTO ebrs (batch_id, content, status, version, created_by) VALUES
(1, '{"steps": ["配料", "混合", "制粒", "干燥", "压片", "包装"]}', '待审核', '1.0', 3),
(3, '{"steps": ["配料", "混合", "制粒", "干燥", "压片", "包装"]}', '已批准', '1.0', 3);

INSERT INTO weighing_records (batch_id, material_code, material_name, target_weight, actual_weight, deviation, operator_id, operation_time, status) VALUES
(1, 'MAT-001', '阿司匹林', 10.0, 10.05, 0.05, 3, '2024-04-01 08:30:00', '合格'),
(1, 'MAT-002', '淀粉', 5.0, 5.10, 0.10, 3, '2024-04-01 08:45:00', '偏差');

INSERT INTO process_records (batch_id, process_step, equipment_id, parameter_name, target_value, actual_value, unit, record_time, operator_id) VALUES
(1, '混合', 1, '转速', '100 rpm', '102 rpm', 'rpm', '2024-04-01 09:30:00', 3),
(1, '制粒', 2, '温度', '60 °C', '65 °C', '°C', '2024-04-01 10:45:00', 3);

INSERT INTO environment_data (area, temperature, humidity, pressure_difference, particle_count, record_time) VALUES
('洁净区 A', 22.5, 45, 10, 1000, '2024-04-01 08:00:00'),
('洁净区 B', 23.0, 50, 8, 1200, '2024-04-01 08:30:00'),
('洁净区 C', 25.0, 60, 5, 2000, '2024-04-01 09:00:00'),
('洁净区 A', 22.6, 46, 9, 950, '2024-04-01 09:30:00');

INSERT INTO materials (material_code, material_name, supplier, batch, manufacture_date, expiry_date, incoming_inspection_result, incoming_inspection_date, inspector) VALUES
('MAT-001', '阿司匹林', 'XX化工', 'MAT-BT-2024-001', '2024-01-15', '2026-01-14', '合格', '2024-01-20', '王五'),
('MAT-002', '淀粉', 'XX食品', 'MAT-BT-2024-002', '2024-02-10', '2026-02-09', '合格', '2024-02-15', '王五');

INSERT INTO material_usage_records (material_id, batch_number, quantity, usage_date) VALUES
(1, 'BT-2024-001', 10.0, '2024-04-01'),
(1, 'BT-2024-003', 8.5, '2024-04-05'),
(2, 'BT-2024-001', 5.0, '2024-04-01'),
(2, 'BT-2024-002', 7.5, '2024-04-02');

INSERT INTO deviations (batch_number, deviation_type, description, severity, status, reported_by, reported_at, closed_at, closed_by) VALUES
('BT-2024-001', '物料偏差', '物料称量超出允许范围', '轻微', '已关闭', 3, '2024-04-01 10:00:00', '2024-04-01 11:00:00', 2),
('BT-2024-002', '设备偏差', '制粒机温度异常', '中度', '处理中', 3, '2024-04-02 14:30:00', NULL, NULL),
('BT-2024-003', '环境偏差', '洁净区湿度超标', '严重', '待处理', 3, '2024-04-03 09:15:00', NULL, NULL);

INSERT INTO audit_trails (user_id, user, action, entity_type, entity_id, old_value, new_value, action_time, ip_address) VALUES
(3, '生产操作员', '创建批次', '批次', '1', NULL, '{"batchNumber": "BT-2024-001", "product": "阿司匹林片"}', '2024-04-01 08:00:00', '192.168.1.100'),
(3, '生产操作员', '记录称量', '称量记录', '1', NULL, '{"materialCode": "MAT-001", "actualWeight": 10.05}', '2024-04-01 08:30:00', '192.168.1.100'),
(2, '生产管理员', '批准批记录', '批记录', '1', '{"status": "待审核"}', '{"status": "已批准"}', '2024-04-01 16:00:00', '192.168.1.101'),
(1, '系统管理员', '添加用户', '用户', '4', NULL, '{"username": "operator", "name": "生产操作员"}', '2024-03-20 10:00:00', '192.168.1.102');
