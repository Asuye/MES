import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { Product } from '../types';
import Table from '../components/Table';
import Button from '../components/Button';
import Input from '../components/Input';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    code: '',
    description: '',
    unit: '',
    recipeId: '',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError('获取产品列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      await productService.createProduct(newProduct);
      setIsModalOpen(false);
      setNewProduct({
        name: '',
        code: '',
        description: '',
        unit: '',
        recipeId: '',
      });
      fetchProducts();
    } catch (err) {
      setError('创建产品失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: '产品名称' },
    { key: 'code', label: '产品代码' },
    { key: 'description', label: '产品描述' },
    { key: 'unit', label: '单位' },
    { key: 'recipeId', label: '配方ID' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">产品管理</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          创建产品
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <Table
        columns={columns}
        data={products}
        loading={loading}
        onRefresh={fetchProducts}
      />

      {/* 创建产品模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">创建产品</h2>
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
              <Input
                label="产品名称"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <Input
                label="产品代码"
                value={newProduct.code}
                onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                required
              />
              <Input
                label="产品描述"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                multiline
                rows={3}
              />
              <Input
                label="单位"
                value={newProduct.unit}
                onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                required
              />
              <Input
                label="配方ID"
                value={newProduct.recipeId}
                onChange={(e) => setNewProduct({ ...newProduct, recipeId: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                取消
              </Button>
              <Button
                onClick={handleCreateProduct}
                loading={loading}
              >
                创建
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;