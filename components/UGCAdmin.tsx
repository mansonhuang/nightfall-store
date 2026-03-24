// 简化版UGCAdmin - 紧急修复
'use client'

import { useState, useEffect } from 'react'

export default function UGCAdmin() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const handleLogin = () => {
    if (password === 'nightfall2026') {
      setIsAuthenticated(true)
      localStorage.setItem('ugc_admin_auth', 'true')
    }
  }
  
  useEffect(() => {
    if (localStorage.getItem('ugc_admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              UGC管理后台
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              请输入管理密码
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="管理密码"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                登录
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              提示：这是一个简化版管理后台，完整功能将在后续更新
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">UGC管理后台</h1>
          <p className="text-gray-600">简化版本 - 功能开发中</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">总UGC数</h3>
            <p className="text-3xl font-bold text-blue-600">156</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">待审核</h3>
            <p className="text-3xl font-bold text-yellow-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">已通过</h3>
            <p className="text-3xl font-bold text-green-600">142</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">已拒绝</h3>
            <p className="text-3xl font-bold text-red-600">6</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">UGC列表</h2>
            <div className="text-center py-12 text-gray-500">
              <p>完整管理功能正在开发中...</p>
              <p className="text-sm mt-2">当前显示模拟数据</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              localStorage.removeItem('ugc_admin_auth')
              setIsAuthenticated(false)
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  )
}
