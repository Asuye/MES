/**
 * This is a user authentication API route.
 * Handle user registration, login, token management, etc.
 */
import { Router, type Request, type Response } from 'express'

const router = Router()

// 模拟用户数据
const users = [
  { id: 1, username: 'admin', password: 'admin123', name: '系统管理员', role: '系统管理员' },
  { id: 2, username: 'prod_manager', password: 'prod123', name: '生产管理员', role: '生产管理员' },
  { id: 3, username: 'operator', password: 'op123', name: '生产操作员', role: '生产操作员' },
]

/**
 * User Login
 * POST /api/auth/register
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, name, role } = req.body
    
    if (!username || !password || !name || !role) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    // 检查用户是否已存在
    const existingUser = users.find(user => user.username === username)
    if (existingUser) {
      res.status(400).json({ success: false, error: '用户已存在' })
      return
    }
    
    // 创建新用户
    const newUser = {
      id: users.length + 1,
      username,
      password,
      name,
      role
    }
    
    users.push(newUser)
    
    res.status(201).json({
      success: true,
      data: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * User Login
 * POST /api/auth/login
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      res.status(400).json({ success: false, error: '用户名和密码不能为空' })
      return
    }
    
    // 验证用户
    const user = users.find(user => user.username === username && user.password === password)
    if (!user) {
      res.status(401).json({ success: false, error: '用户名或密码错误' })
      return
    }
    
    // 生成模拟 token
    const token = `token-${Date.now()}-${user.id}`
    
    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        }
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * User Logout
 * POST /api/auth/logout
 */
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  try {
    // 这里可以添加 token 失效逻辑
    res.status(200).json({ success: true, message: '登出成功' })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

/**
 * Electronic Signature Verification
 * POST /api/auth/signature
 */
router.post('/signature', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, purpose } = req.body
    
    if (!username || !password || !purpose) {
      res.status(400).json({ success: false, error: '缺少必要参数' })
      return
    }
    
    // 验证用户
    const user = users.find(user => user.username === username && user.password === password)
    if (!user) {
      res.status(401).json({ success: false, error: '用户名或密码错误' })
      return
    }
    
    // 生成模拟签名数据
    const signatureData = {
      userId: user.id,
      username: user.username,
      timestamp: new Date().toISOString(),
      purpose,
      signature: `signature-${Date.now()}-${user.id}`
    }
    
    res.status(200).json({
      success: true,
      data: signatureData
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器内部错误' })
  }
})

export default router
