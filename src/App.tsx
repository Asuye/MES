import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import System from './pages/System';
import Production from './pages/Production';
import Quality from './pages/Quality';
import Equipment from './pages/Equipment';
import Material from './pages/Material';
import Report from './pages/Report';
import Login from './pages/Login';
import Product from './pages/Product';
import Recipe from './pages/Recipe';
import WorkOrder from './pages/WorkOrder';
import { Settings, Package, Shield, Wrench, Package as MaterialIcon, BarChart3, LogOut, Menu, X, Box, FileText, ListChecks } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: '生产管理', path: '/production', icon: Package },
    { name: '质量管理', path: '/quality', icon: Shield },
    { name: '设备管理', path: '/equipment', icon: Wrench },
    { name: '物料管理', path: '/material', icon: MaterialIcon },
    { name: '产品管理', path: '/product', icon: Box },
    { name: '配方管理', path: '/recipe', icon: FileText },
    { name: '工作订单', path: '/workorder', icon: ListChecks },
    { name: '报表分析', path: '/report', icon: BarChart3 },
    { name: '系统管理', path: '/system', icon: Settings },
  ];

  return (
    <>
      {/* 移动端菜单按钮 */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-md shadow-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 侧边栏 */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* 侧边栏头部 */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">MES 系统</h1>
            <p className="text-xs text-gray-500">GMP 合规固体制剂车间</p>
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-4 py-2 rounded-md text-sm font-medium
                    ${location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 侧边栏底部 */}
          <div className="p-4 border-t">
            <button className="flex items-center w-full px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              <LogOut size={18} className="mr-3" />
              退出登录
            </button>
          </div>
        </div>
      </div>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const TopBar: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {document.title}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <span className="sr-only">通知</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                A
              </div>
              <span className="text-sm font-medium text-gray-700">管理员</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="md:ml-64 min-h-screen bg-gray-50">
      <TopBar />
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <Sidebar />
              <MainContent>
                <Production />
              </MainContent>
            </>
          }
        />
        <Route
          path="/production"
          element={
            <>
              <Sidebar />
              <MainContent>
                <Production />
              </MainContent>
            </>
          }
        />
        <Route
          path="/quality"
          element={
            <>
              <Sidebar />
              <MainContent>
                <Quality />
              </MainContent>
            </>
          }
        />
        <Route
          path="/equipment"
          element={
            <>
              <Sidebar />
              <MainContent>
                <Equipment />
              </MainContent>
            </>
          }
        />
        <Route
          path="/material"
          element={
            <>
              <Sidebar />
              <MainContent>
                <Material />
              </MainContent>
            </>
          }
        />
        <Route
          path="/report"
          element={
            <>
              <Sidebar />
              <MainContent>
                <Report />
              </MainContent>
            </>
          }
        />
        <Route
          path="/system"
          element={
            <>
              <Sidebar />
              <MainContent>
                <System />
              </MainContent>
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <Sidebar />
              <MainContent>
                <Product />
              </MainContent>
            </>
          }
        />
        <Route
          path="/recipe"
          element={
            <>
              <Sidebar />
              <MainContent>
                <Recipe />
              </MainContent>
            </>
          }
        />
        <Route
          path="/workorder"
          element={
            <>
              <Sidebar />
              <MainContent>
                <WorkOrder />
              </MainContent>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
