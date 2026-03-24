'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UGCAdmin from '@/components/UGCAdmin'
import { Lock, Home, ArrowLeft, Shield } from 'lucide-react'

// 简单的密码保护（生产环境应该使用真正的认证）
const ADMIN_PASSWORD = 'nightfall2026'

export default function UGCAdminPage() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // 检查本地存储的认证状态
  useEffect(() => {
    const savedAuth = localStorage.getItem('ugc_admin_auth')
    if (savedAuth === 'true') {
      setAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      localStorage.setItem('ugc_admin_auth', 'true')
    } else {
      setError('密码错误')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem('ugc_admin_auth')
    setPassword('')
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                <Lock size={32} className="text-stone-600" />
              </div>
              <h1 className="text-2xl font-bold text-stone-900 mb-2">UGC内容管理</h1>
              <p className="text-stone-600">请输入管理密码访问内容管理系统</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                  管理密码
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                  placeholder="请输入密码"
                  required
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-800 transition-colors font-medium"
              >
                进入管理系统
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-stone-200">
              <button
                onClick={() => router.push('/')}
                className="w-full flex items-center justify-center gap-2 text-stone-600 hover:text-stone-900"
              >
                <ArrowLeft size={16} />
                返回网站首页
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-stone-500">
                <Shield size={12} className="inline mr-1" />
                此区域仅限授权人员访问
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* 管理头部 */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900"
              >
                <Home size={20} />
                <span className="hidden md:inline">返回首页</span>
              </button>
              <div className="h-6 w-px bg-stone-300 hidden md:block"></div>
              <div>
                <h1 className="text-xl font-bold text-stone-900">UGC内容管理系统</h1>
                <p className="text-sm text-stone-600">管理用户生成的内容，确保社区质量</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full">
                <Shield size={14} />
                <span className="text-sm font-medium">管理员模式</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 text-sm"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <UGCAdmin />
      </main>

      {/* 页脚 */}
      <footer className="mt-12 border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-600">
            <div>
              <p>© 2026 Nightfall. UGC内容管理系统 v1.0</p>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push('/admin/ugc/help')}
                className="hover:text-stone-900"
              >
                帮助文档
              </button>
              <button
                onClick={() => router.push('/admin/ugc/settings')}
                className="hover:text-stone-900"
              >
                系统设置
              </button>
              <a
                href="mailto:support@nightfall.pet"
                className="hover:text-stone-900"
              >
                技术支持
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-stone-500">
            <p>最后访问: {new Date().toLocaleString('zh-CN')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}