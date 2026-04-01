import React from 'react';

const Reports: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">报表中心</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">生产报表</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>批次生产报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>生产计划执行报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>设备运行报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>物料使用报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">质量报表</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>偏差报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>环境监测报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>审计追踪报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>质量检验报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">系统报表</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>用户操作报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>系统日志报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
                <span>API调用报表</span>
                <span className="text-blue-600">生成</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">报表设置</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="report-format" className="block text-sm font-medium text-gray-700 mb-1">报表格式</label>
              <select
                id="report-format"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div>
              <label htmlFor="report-period" className="block text-sm font-medium text-gray-700 mb-1">报表周期</label>
              <select
                id="report-period"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="daily">日报</option>
                <option value="weekly">周报</option>
                <option value="monthly">月报</option>
                <option value="quarterly">季报</option>
                <option value="annual">年报</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">保存设置</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;