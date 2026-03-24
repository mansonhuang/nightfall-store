'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Upload, X, Image as ImageIcon, User } from 'lucide-react'

// 模拟UGC数据
const initialUGCItems = [
  {
    id: 1,
    username: '猫奴小张',
    avatar: '🐱',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    caption: '我家喵星人超爱Nightfall的睡衣！睡得特别香～',
    likes: 42,
    comments: 8,
    timestamp: '2小时前',
    tags: ['#猫咪', '#睡衣', '#舒适']
  },
  {
    id: 2,
    username: '汪星人守护者',
    avatar: '🐶',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80',
    caption: '狗狗第一次穿睡衣，居然不抗拒！材质真的很柔软',
    likes: 56,
    comments: 12,
    timestamp: '5小时前',
    tags: ['#狗狗', '#第一次', '#柔软']
  },
  {
    id: 3,
    username: '多宠家庭',
    avatar: '🏠',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
    caption: '家里猫狗都安排了Nightfall，晚上一起睡觉太温馨了',
    likes: 89,
    comments: 15,
    timestamp: '1天前',
    tags: ['#多宠', '#温馨', '#夜晚']
  }
]

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
}

export default function UGCGallery() {
  const [items, setItems] = useState<UGCItem[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newImage, setNewImage] = useState<string>('')
  const [caption, setCaption] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [username, setUsername] = useState('')
  const [likedItems, setLikedItems] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const availableTags = ['#猫咪', '#狗狗', '#睡衣', '#舒适', '#夜晚', '#温馨', '#宠物生活', '#开箱']

  // 加载UGC数据
  useEffect(() => {
    const fetchUGC = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/ugc?limit=20')
        const data = await response.json()
        if (data.success) {
          setItems(data.data)
        }
      } catch (error) {
        console.error('加载UGC数据失败:', error)
        // 降级到模拟数据
        setItems(initialUGCItems)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUGC()
  }, [])

  const handleLike = async (id: number) => {
    const wasLiked = likedItems.includes(id)
    const action = wasLiked ? 'unlike' : 'like'
    
    try {
      const response = await fetch('/api/ugc', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      })
      
      const data = await response.json()
      if (data.success) {
        // 更新本地状态
        setItems(items.map(item => 
          item.id === id ? data.data : item
        ))
        
        // 更新点赞状态
        if (wasLiked) {
          setLikedItems(likedItems.filter(itemId => itemId !== id))
        } else {
          setLikedItems([...likedItems, id])
        }
      }
    } catch (error) {
      console.error('点赞操作失败:', error)
      // 降级到前端处理
      setItems(items.map(item => {
        if (item.id === id) {
          if (wasLiked) {
            setLikedItems(likedItems.filter(itemId => itemId !== id))
            return { ...item, likes: Math.max(0, item.likes - 1) }
          } else {
            setLikedItems([...likedItems, id])
            return { ...item, likes: item.likes + 1 }
          }
        }
        return item
      }))
    }
  }

  const handleUpload = async () => {
    if (!newImage || !caption.trim()) {
      alert('请添加图片和描述')
      return
    }

    setUploading(true)
    
    try {
      const response = await fetch('/api/ugc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          image: newImage,
          caption,
          tags: selectedTags
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        // 添加到列表顶部
        setItems([data.data, ...items])
        setNewImage('')
        setCaption('')
        setSelectedTags([])
        setUsername('')
        setShowUploadModal(false)
        alert(data.message)
      } else {
        alert(data.error || '上传失败')
      }
    } catch (error) {
      console.error('上传失败:', error)
      // 降级到前端处理
      const newItem: UGCItem = {
        id: items.length + 1,
        username: username || '匿名用户',
        avatar: username ? '👤' : '😊',
        image: newImage,
        caption,
        likes: 0,
        comments: 0,
        timestamp: '刚刚',
        tags: selectedTags
      }
      setItems([newItem, ...items])
      setNewImage('')
      setCaption('')
      setSelectedTags([])
      setUsername('')
      setShowUploadModal(false)
      alert('分享成功！感谢你的参与～')
    } finally {
      setUploading(false)
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // 模拟图片上传（实际项目中应该使用真实的图片上传）
  const handleImageSelect = () => {
    // 这里可以替换为真实的图片上传逻辑
    const sampleImages = [
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&q=80',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&q=80',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80'
    ]
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
    setNewImage(randomImage)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 标题和上传按钮 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">宠物家长分享</h2>
          <p className="text-stone-600">看看其他宠物家长和Nightfall的故事</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-800 transition-all hover:scale-105"
        >
          <Upload size={18} />
          分享你的故事
        </button>
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div>
          <span className="ml-4 text-stone-600">加载社区分享中...</span>
        </div>
      )}

      {/* 空状态 */}
      {!loading && items.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
            <ImageIcon size={48} className="text-stone-400" />
          </div>
          <h3 className="text-xl font-serif text-stone-900 mb-3">还没有分享</h3>
          <p className="text-stone-600 mb-8">成为第一个分享你的宠物故事的人吧！</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-stone-800 transition-all"
          >
            立即分享
          </button>
        </div>
      )}

      {/* UGC网格 */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* 用户信息 */}
            <div className="p-4 flex items-center gap-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-xl">
                {item.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium text-stone-900">{item.username}</p>
                <p className="text-xs text-stone-500">{item.timestamp}</p>
              </div>
            </div>

            {/* 图片 */}
            <div className="aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 互动区域 */}
            <div className="p-4">
              {/* 按钮 */}
              <div className="flex gap-4 mb-3">
                <button
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-2 ${likedItems.includes(item.id) ? 'text-red-500' : 'text-stone-600 hover:text-red-500'}`}
                >
                  <Heart size={20} fill={likedItems.includes(item.id) ? 'currentColor' : 'none'} />
                  <span>{item.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-stone-600 hover:text-stone-900">
                  <MessageCircle size={20} />
                  <span>{item.comments}</span>
                </button>
              </div>

              {/* 描述 */}
              <p className="text-stone-800 mb-3">{item.caption}</p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* 上传模态框 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-stone-900">分享你的故事</h3>
                <button onClick={() => setShowUploadModal(false)} className="text-stone-500 hover:text-stone-900">
                  <X size={24} />
                </button>
              </div>

              {/* 图片上传区域 */}
              <div 
                className="aspect-square rounded-xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center mb-6 cursor-pointer hover:border-stone-400 transition-colors"
                onClick={handleImageSelect}
              >
                {newImage ? (
                  <img src={newImage} alt="预览" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <ImageIcon size={48} className="text-stone-400 mb-3" />
                    <p className="text-stone-600">点击选择图片</p>
                    <p className="text-sm text-stone-500 mt-1">支持 JPG、PNG 格式</p>
                  </>
                )}
              </div>

              {/* 用户名 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700 mb-2">你的名字（可选）</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="例如：猫奴小明"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>

              {/* 描述 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">分享你的故事</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="说说你和宠物的故事，或者对产品的感受..."
                  rows={3}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 resize-none"
                />
              </div>

              {/* 标签选择 */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-stone-700 mb-3">添加标签（可选）</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${selectedTags.includes(tag) ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 提交按钮 */}
              <button
                onClick={handleUpload}
                disabled={!newImage || !caption.trim() || uploading}
                className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    上传中...
                  </>
                ) : (
                  '分享到社区'
                )}
              </button>

              <p className="text-xs text-stone-500 text-center mt-4">
                分享即表示你同意我们的社区准则
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 社区准则 */}
      <div className="mt-16 p-6 bg-stone-50 rounded-2xl">
        <h3 className="text-xl font-serif text-stone-900 mb-4">社区准则</h3>
        <ul className="space-y-2 text-stone-600">
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center mt-0.5 flex-shrink-0">✓</div>
            <span>请分享真实、正面的宠物故事和照片</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center mt-0.5 flex-shrink-0">✓</div>
            <span>尊重所有宠物和宠物家长，保持友善交流</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center mt-0.5 flex-shrink-0">✓</div>
            <span>不得上传侵犯他人权益或不当内容</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center mt-0.5 flex-shrink-0">✓</div>
            <span>Nightfall保留管理社区内容的权利</span>
          </li>
        </ul>
      </div>
    </div>
  )
}