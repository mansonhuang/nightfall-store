'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Upload, X, Image as ImageIcon, User, Globe } from 'lucide-react'

// 多语言支持
const translations = {
  en: {
    title: 'Pet Parents Sharing',
    subtitle: 'See stories from other pet parents and Nightfall',
    uploadTitle: 'Share Your Moment',
    uploadPlaceholder: 'Share your story with Nightfall...',
    uploadButton: 'Upload Photo',
    communityGuidelines: 'Community Guidelines',
    guideline1: 'Respect all pets and pet parents',
    guideline2: 'Keep conversations friendly',
    guideline3: 'No inappropriate content',
    like: 'Like',
    comment: 'Comment',
    share: 'Share',
    viewAll: 'View All Sharing',
    noMore: 'No more content',
    loading: 'Loading...'
  },
  zh: {
    title: '宠物家长分享',
    subtitle: '看看其他宠物家长和Nightfall的故事',
    uploadTitle: '分享你的时刻',
    uploadPlaceholder: '分享你和Nightfall的故事...',
    uploadButton: '上传照片',
    communityGuidelines: '社区准则',
    guideline1: '尊重所有宠物和宠物家长',
    guideline2: '保持友善交流',
    guideline3: '禁止不当内容',
    like: '点赞',
    comment: '评论',
    share: '分享',
    viewAll: '查看全部分享',
    noMore: '没有更多内容了',
    loading: '加载中...'
  }
}

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
  },
  {
    id: 4,
    username: '猫咪爱好者',
    avatar: '😴',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&q=80',
    caption: '穿上睡衣后午睡更香了，猫咪超喜欢！',
    likes: 38,
    comments: 6,
    timestamp: '1天前',
    tags: ['#午睡', '#舒适', '#日常']
  },
  {
    id: 5,
    username: '宠物家长',
    avatar: '🎁',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&q=80',
    caption: '给狗狗的生日礼物，超喜欢！质量真的很好',
    likes: 45,
    comments: 9,
    timestamp: '2天前',
    tags: ['#生日', '#礼物', '#惊喜']
  },
  {
    id: 6,
    username: '夜猫子',
    avatar: '🌙',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
    caption: '晚上加班，猫咪穿着睡衣陪我，太暖心了',
    likes: 52,
    comments: 11,
    timestamp: '2天前',
    tags: ['#夜晚', '#陪伴', '#温暖']
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
  const [items, setItems] = useState<UGCItem[]>(initialUGCItems)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const t = translations[language]

  // 检测网站语言
  useEffect(() => {
    const detectLanguage = () => {
      const savedLang = localStorage.getItem('nightfall_lang')
      if (savedLang === 'en' || savedLang === 'zh') {
        setLanguage(savedLang as 'zh' | 'en')
      } else {
        // 默认中文
        setLanguage('zh')
      }
    }

    detectLanguage()
    
    // 监听语言变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nightfall_lang' && (e.newValue === 'en' || e.newValue === 'zh')) {
        setLanguage(e.newValue as 'zh' | 'en')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLike = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ))
  }

  const handleUpload = async () => {
    if (!caption.trim() || uploading) return

    setUploading(true)
    
    // 模拟上传延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newItem: UGCItem = {
      id: items.length + 1,
      username: '新用户',
      avatar: '👤',
      image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&q=80',
      caption: caption,
      likes: 0,
      comments: 0,
      timestamp: '刚刚',
      tags: ['#新分享']
    }
    
    setItems([newItem, ...items])
    setCaption('')
    setUploading(false)
  }

  const loadMore = () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    // 模拟加载更多
    setTimeout(() => {
      const newItems = [
        ...items,
        {
          id: items.length + 1,
          username: '更多用户',
          avatar: '🐾',
          image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
          caption: '更多精彩分享...',
          likes: 25,
          comments: 3,
          timestamp: '3天前',
          tags: ['#更多']
        }
      ]
      
      setItems(newItems)
      setLoading(false)
      if (newItems.length >= 10) setHasMore(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50 pt-4 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 语言切换 */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <Globe size={16} className="text-stone-500" />
            <button 
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${language === 'zh' ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-600 hover:text-stone-900'}`}
            >
              中文
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${language === 'en' ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-600 hover:text-stone-900'}`}
            >
              English
            </button>
          </div>
        </div>

        {/* 标题区域 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 text-stone-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center">
              <Heart size={28} strokeWidth={1.5} className="text-stone-700" />
            </div>
            <span className="text-sm tracking-[0.2em] uppercase">Community Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">{t.title}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 上传区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <h3 className="text-xl font-semibold text-stone-900 mb-4">{t.uploadTitle}</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={t.uploadPlaceholder}
                className="w-full h-32 p-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {['#宠物日常', '#Nightfall', '#温馨时刻', '#宠物睡衣'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setCaption(prev => prev + ` ${tag}`)}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleUpload}
                disabled={uploading || !caption.trim()}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.loading}
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    {t.uploadButton}
                  </>
                )}
              </button>
              <button className="px-6 py-3 border-2 border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                <ImageIcon size={18} />
                {t.uploadButton}
              </button>
            </div>
          </div>
        </div>

        {/* UGC网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* 用户信息 */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center text-2xl">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">{item.username}</h4>
                    <p className="text-sm text-stone-500">{item.timestamp}</p>
                  </div>
                </div>
                
                {/* 图片 */}
                <div 
                  className="aspect-square rounded-xl overflow-hidden mb-4 cursor-pointer bg-stone-100"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <img 
                    src={item.image} 
                    alt={item.caption}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* 描述 */}
                <p className="text-stone-700 mb-4">{item.caption}</p>
                
                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* 互动按钮 */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <button 
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-2 text-stone-600 hover:text-red-500 transition-colors"
                  >
                    <Heart size={20} fill={item.likes > 0 ? "currentColor" : "none"} />
                    <span>{item.likes} {t.like}</span>
                  </button>
                  <button className="flex items-center gap-2 text-stone-600 hover:text-blue-500 transition-colors">
                    <MessageCircle size={20} />
                    <span>{item.comments} {t.comment}</span>
                  </button>
                  <button className="flex items-center gap-2 text-stone-600 hover:text-green-500 transition-colors">
                    <Upload size={20} />
                    <span>{t.share}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多 */}
        {hasMore && (
          <div className="text-center mb-12">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 border-2 border-stone-300 text-stone-700 font-medium rounded-full hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t.loading : t.viewAll}
            </button>
          </div>
        )}

        {/* 社区准则 */}
        <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-2xl p-8 border border-amber-100">
          <h3 className="text-2xl font-serif text-stone-900 mb-6">{t.communityGuidelines}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Heart size={24} className="text-amber-600" />
              </div>
              <h4 className="font-semibold text-stone-900 mb-2">{t.guideline1}</h4>
              <p className="text-stone-600 text-sm">We believe every pet deserves love and respect</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                <MessageCircle size={24} className="text-stone-600" />
              </div>
              <h4 className="font-semibold text-stone-900 mb-2">{t.guideline2}</h4>
              <p className="text-stone-600 text-sm">Positive and supportive conversations only</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <X size={24} className="text-red-600" />
              </div>
              <h4 className="font-semibold text-stone-900 mb-2">{t.guideline3}</h4>
              <p className="text-stone-600 text-sm">Keep the community safe and welcoming</p>
            </div>
          </div>
        </div>

        {/* 图片预览模态框 */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img 
                src={selectedImage} 
                alt="Preview"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}