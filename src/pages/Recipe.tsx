import React, { useState, useEffect } from 'react';
import { recipeService } from '../services/api';
import { Recipe } from '../types';
import Table from '../components/Table';
import Button from '../components/Button';

const RecipePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await recipeService.getRecipes();
      setRecipes(data);
    } catch (err) {
      setError('获取配方列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'id', label: '配方ID' },
    { key: 'name', label: '配方名称' },
    { key: 'productId', label: '产品ID' },
    { key: 'cycleTime', label: '周期时间(小时)' },
    {
      key: 'actions',
      label: '操作',
      render: (recipe: Recipe) => (
        <Button
          size="sm"
          onClick={() => handleViewRecipe(recipe)}
        >
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">配方管理</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <Table
        columns={columns}
        data={recipes}
        loading={loading}
        onRefresh={fetchRecipes}
      />

      {/* 配方详情模态框 */}
      {isModalOpen && selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">配方详情</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">基本信息</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">配方ID</p>
                    <p className="font-medium">{selectedRecipe.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">配方名称</p>
                    <p className="font-medium">{selectedRecipe.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">产品ID</p>
                    <p className="font-medium">{selectedRecipe.productId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">周期时间</p>
                    <p className="font-medium">{selectedRecipe.cycleTime} 小时</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">成分列表</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          物料ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          数量
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          单位
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {ingredient.materialId}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {ingredient.quantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {ingredient.unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">操作说明</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePage;