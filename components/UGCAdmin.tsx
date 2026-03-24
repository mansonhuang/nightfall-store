'use client'

import { useState, useEffect } from 'react'
import { Eye, Trash2, Check, X, Filter, Download, BarChart, User, Image as ImageIcon } from 'lucide-react'

interface UGCItem {
  id: number
  username: string
  avatar: string
  image: string
  caption: string
  likes: number
  comments: number
  timestamp: string
  tags: string[]
  status?: 'pending' | 'approved' | 'rejected'
}

export default function UGCAdmin() {
  const [items, setItems] = useState<UGCItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    today: 0
  })

  // 加载UGC数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/ugc?limit=100')
        const data = await response.json()
        
        if (data.success) {
          // 添加模拟状态（实际项目中应该从数据库获取）
          const itemsWithStatus = data.data.map((item: UGCItem, index: number) => ({
            ...item,
            status: index % 3 === 0 ? 'pending' : index % 3 === 1 ? 'approved' : 'rejected'
          }))
          
          setItems(itemsWithStatus)
          
          // 计算统计
          const today = new Date().toISOString().split('T')[0]
          const todayItems = itemsWithStatus.filter((item: any) => 
            item.timestamp.includes('刚刚') || item.timestamp.includes('小时前')
          )
          
          setStats({
            total: itemsWithStatus.length,
            pending: itemsWithStatus.filter((item: any) => item.status === 'pending').length,
            approved: itemsWithStatus.filter((item: any) => item.status === 'approved').length,
            rejected: itemsWithStatus.filter((item: any) => item.status === 'rejected').length,
            today: todayItems.length
          })
        }
      } catch (error) {
        console.error('加载管理数据失败:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const handleApprove = async (id: number) => {
    try {
      // 这里应该调用API更新状态
      setItems(items.map(item => 
        item.id === id ? { ...item, status: 'approved' } : item
      ))
      
      // 更新统计
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        approved: prev.approved + 1
      }))
    } catch (error) {
      console.error('审核失败:', error)
    }
  }

  const handleReject = async (id: number) => {
    try {
      // 这里应该调用API更新状态
      setItems(items.map(item => 
        item.id === id ? { ...item, status: 'rejected' } : item
      ))
      
      // 更新统计
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        rejected: prev.rejected + 1
      }))
    } catch (error) {
      console.error('拒绝失败:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条内容吗？此操作不可撤销。')) return
    
    try {
      // 这里应该调用API删除
      setItems(items.filter(item => item.id !== id))
      
      // 更新统计
      const item = items.find(item => item.id === id)
      if (item) {
        setStats(prev => ({
          ...prev,
          total: prev.total - 1,
          [item.status || 'pending']: prev[item.status as keyof typeof stats] - 1
        }))
      }
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const handleBulkAction = (action: 'approve' | 'reject' | 'delete') => {
    if (selectedItems.length === 0) {
      alert('请先选择要操作的内容')
      return
    }

    if (action === 'delete' && !confirm(`确定要删除选中的 ${selectedItems.length} 条内容吗？`)) {
      return
    }

    selectedItems.forEach(id => {
      if (action === 'approve') handleApprove(id)
      else if (action === 'reject') handleReject(id)
      else if (action === 'delete') handleDelete(id)
    })
    
    setSelectedItems([])
  }

  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.status === filter
  )

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map(item => item.id))
    }
  }

  const exportData = () => {
    const data = filteredItems.map(item => ({
      用户名: item.username,
      内容: item.caption,
      点赞数: item.likes,
      评论数: item.comments,
      标签: item.tags.join(', '),
      时间: item.timestamp,
      状态: item.status === 'pending' ? '待审核' : item.status === 'approved' ? '已通过' : '已拒绝'
    }))
    
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `ugc-export-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">UGC内容管理</h1>
        <p className="text-stone-600">管理用户生成的内容，确保社区质量</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">总内容</p>
              <p className="text-2xl font-bold text-stone-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">今日新增</p>
              <p className="text-2xl font-bold text-stone-900">{stats.today}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Eye size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">待审核</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Filter size={24} className="text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">已通过</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">已拒绝</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <X size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 工具栏 */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow border border-stone-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
            >
              全部 ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
            >
              待审核 ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg ${filter === 'approved' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
            >
              已通过 ({stats.approved})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg ${filter === 'rejected' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
            >
              已拒绝 ({stats.rejected})
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              <Download size={16} />
              导出数据
            </button>
          </div>
        </div>

        {/* 批量操作 */}
        {selectedItems.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                  {selectedItems.length}
                </div>
                <span className="text-blue-700 font-medium">已选择 {selectedItems.length} 项</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm"
                >
                  批量通过
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                >
                  批量拒绝
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 text-sm"
                >
                  批量删除
                </button>
                <button
                  onClick={() => setSelectedItems([])}
                  className="px-3 py-1.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 text-sm"
                >
                  取消选择
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 内容列表 */}
      <div className="bg-white rounded-xl shadow border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900"></div>
            <p className="mt-4 text-stone-600">加载内容中...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
              <ImageIcon size={24} className="text-stone-400" />
            </div>
            <h3 className="text-lg font-medium text-stone-900 mb-2">没有找到内容</h3>
            <p className="text-stone-600">尝试切换筛选条件</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-stone-300"
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-stone-700">内容</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-stone-700">用户</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-stone-700">互动</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-stone-700">状态</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-stone-700">时间</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-stone-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="rounded border-stone-300"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-stone-900 line-clamp-2">{item.caption}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="text-xs bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 2 && (
                              <span className="text-xs text-stone-500">+{item.tags.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                          {item.avatar}
                        </div>
                        <span className="text-sm text-stone-900">{item.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-stone-600">❤️ {item.likes}</span>
                          <span className="text-stone-600">💬 {item.comments}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        item.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status === 'pending' ? '待审核' :
                         item.status === 'approved' ? '已通过' : '已拒绝'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-stone-600">{item.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(item.id)}
                          disabled={item.status === 'approved'}
                          className={`p-1.5 rounded-lg ${
                            item.status === 'approved' 
                              ? 'bg-green-100 text-green-600 cursor-not-allowed' 
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="通过审核"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          disabled={item.status === 'rejected'}
                          className={`p-1.5 rounded-lg ${
                            item.status === 'rejected' 
                              ? 'bg-red-100 text-red-600 cursor-not-allowed' 
                              : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="拒绝内容"
                        >
                          <X size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-stone-50 text-stone-600 hover:bg-stone-100"
                          title="删除内容"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => window.open(item.image, '_blank')}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                          title="查看原图"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 分页和统计 */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-600">
        <div>
          显示 {filteredItems.length} 条内容，共 {stats.total} 条
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>待审核: {stats.pending}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>已通过: {stats.approved}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>已拒绝: {stats.rejected}</span>
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="mt-8 p-6 bg-stone-50 rounded-xl border border-stone-200">
        <h3 className="text-lg font-medium text-stone-900 mb-3">管理指南</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-stone-700 mb-2">审核标准</h4>
            <ul className="space-y-1 text-stone-600">
              <li>✓ 图片清晰，内容与宠物相关</li>
              <li>✓ 描述积极正面，无攻击性语言</li>
              <li>✓ 符合社区准则和品牌价值观</li>
              <li>✗ 模糊、重复或无关内容</li>
              <li>✗ 包含联系方式或广告</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-stone-700 mb-2">操作说明</h4>
            <ul className="space-y-1 text-stone-600">
              <li><strong>通过</strong>: 内容符合标准，将在网站展示</li>
              <li><strong>拒绝</strong>: 内容不符合标准，但保留记录</li>
              <li><strong>删除</strong>: 彻底移除违规内容</li>
              <li><strong>批量操作</strong>: 可同时处理多个内容</li>
              <li><strong>导出</strong>: 下载CSV格式的数据报表</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}