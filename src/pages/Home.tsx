import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">固体制剂车间 MES 系统</h1>
        <p className="text-xl text-gray-600 mb-8">用于片剂/胶囊生产的 GMP 合规制造执行系统</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            登录系统
          </a>
          <a href="/dashboard" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
            查看仪表盘
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;