'use client'

// 构建: build-1774362568-a167ea4f
// 时间: 2026-03-24T22:29:28+08:00
// 强制全新构建

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Upload, X, Image as ImageIcon, User, Globe, ChevronRight, Star, Home as HomeIcon } from 'lucide-react'

// 多语言支持 - 与网站翻译系统一致
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
    loading: 'Loading...',
    stats: {
      total: 'Total Shares',
      today: 'Today',
      trending: 'Trending'
    }
  },
  zh: {
    title: '宠物家长的真实分享',
    subtitle: '看看其他宠物家长如何与他们的毛孩子享受Nightfall带来的温暖时光',
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
    loading: '加载中...',
    stats: {
      total: '总分享数',
      today: '今日新增',
      trending: '热门趋势'
    }
  }
}

// 模拟UGC数据 - 使用与网站一致的品牌故事
const initialUGCItems = [
  {
    id: 1,
    username: '猫奴小张',
    avatar: '🐱',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    caption: '每晚都要穿睡衣才肯睡觉，Nightfall的材质真的很亲肤～',
    likes: 42,
    comments: 8,
    timestamp: '2小时前',
    tags: ['#猫咪', '#睡衣', '#舒适', '#Nightfall'],
    featured: true
  },
  {
    id: 2,
    username: '汪星人守护者',
    avatar: '🐶',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80',
    caption: '狗狗第一次穿睡衣，居然不抗拒！柔软材质让牠睡得更安稳',
    likes: 56,
    comments: 12,
    timestamp: '5小时前',
    tags: ['#狗狗', '#第一次', '#柔软', '#陪伴'],
    featured: true
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
    tags: ['#多宠', '#温馨', '#夜晚', '#家庭'],
    featured: true
  },
  {
    id: 4,
    username: '猫咪爱好者',
    avatar: '😴',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&q=80',
    caption: '穿上睡衣后午睡更香了，猫咪超喜欢这种柔软的感觉！',
    likes: 38,
    comments: 6,
    timestamp: '1天前',
    tags: ['#午睡', '#舒适', '#日常', '#宠物生活']
  },
  {
    id: 5,
    username: '宠物家长',
    avatar: '🎁',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&q=80',
    caption: '给狗狗的生日礼物，超喜欢！Nightfall的质量真的很好',
    likes: 45,
    comments: 9,
    timestamp: '2天前',
    tags: ['#生日', '#礼物', '#惊喜', '#品质']
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
    tags: ['#夜晚', '#陪伴', '#温暖', '#工作伴侣']
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
  featured?: boolean
}

export default function UGCGalleryUnified() {
  const [items, setItems] = useState<UGCItem[]>(initialUGCItems)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'recent'>('all')

  const t = translations[language]

  // 检测网站语言
  useEffect(() => {
    const detectLanguage = () => {
      const savedLang = localStorage.getItem('nightfall_lang')
      if (savedLang === 'en' || savedLang === 'zh') {
        setLanguage(savedLang as 'zh' | 'en')
      } else {
        setLanguage('zh')
      }
    }

    detectLanguage()
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nightfall_lang' && (e.newValue === 'en' || e.newValue === 'zh')) {
        setLanguage(e.newValue as 'zh' | 'en')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // 过滤项目
  const filteredItems = items.filter(item => {
    if (activeFilter === 'featured') return item.featured
    if (activeFilter === 'recent') return item.timestamp.includes('小时') || item.timestamp.includes('刚刚')
    return true
  })

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
      tags: ['#新分享', '#Nightfall']
    }
    
    setItems([newItem, ...items])
    setCaption('')
    setUploading(false)
  }

  const loadMore = () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    setTimeout(() => {
      const newItems = [
        ...items,
        {
          id: items.length + 1,
          username: '更多分享',
          avatar: '🐾',
          image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
          caption: 'Nightfall让每个夜晚都变得温暖舒适',
          likes: 25,
          comments: 3,
          timestamp: '3天前',
          tags: ['#温暖', '#舒适', '#夜晚']
        }
      ]
      
      setItems(newItems)
      setLoading(false)
      if (newItems.length >= 12) setHasMore(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 与网站一致的标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 text-stone-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100/80 to-stone-100/80 flex items-center justify-center backdrop-blur-sm border border-stone-200/50">
              <Heart size={28} strokeWidth={1.5} className="text-stone-700" />
            </div>
            <span className="text-sm tracking-[0.2em] uppercase font-medium">Community Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
            {t.title}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 统计卡片 - 与网站设计一致 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">{t.stats.total}</h3>
              <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center">
                <HomeIcon size={20} className="text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900">{items.length}</p>
            <p className="text-sm text-stone-500 mt-2">持续增长的温暖社区</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">{t.stats.today}</h3>
              <div className="w-10 h-10 rounded-full bg-stone-100/50 flex items-center justify-center">
                <Star size={20} className="text-stone-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900">{items.filter(i => i.timestamp.includes('小时') || i.timestamp.includes('刚刚')).length}</p>
            <p className="text-sm text-stone-500 mt-2">今日新增分享</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">{t.stats.trending}</h3>
              <div className="w-10 h-10 rounded-full bg-stone-100/50 flex items-center justify-center">
                <Heart size={20} className="text-stone-600" fill="currentColor" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900">{Math.max(...items.map(i => i.likes))}</p>
            <p className="text-sm text-stone-500 mt-2">最高点赞记录</p>
          </div>
        </div>

        {/* 过滤标签 - 与网站导航一致 */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === 'all' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'}`}
          >
            全部
          </button>
          <button
            onClick={() => setActiveFilter('featured')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === 'featured' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'}`}
          >
            精选推荐
          </button>
          <button
            onClick={() => setActiveFilter('recent')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === 'recent' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'}`}
          >
            最新动态
          </button>
        </div>

        {/* UGC网格 - 与网站产品网格一致 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:border-stone-300 transition-all duration-300 hover:shadow-lg">
                {/* 用户信息头部 - 与网站卡片一致 */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center text-2xl">
                      {item.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-stone-900">{item.username}</h4>
                      <p className="text-sm text-stone-500">{item.timestamp}</p>
                    </div>
                    {item.featured && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                        精选
                      </span>
                    )}
                  </div>
                  
                  {/* 图片 - 与网站图片风格一致 */}
                  <div 
                    className="aspect-[4/3] rounded-xl overflow-hidden mb-4 cursor-pointer bg-stone-100 relative"
                    onClick={() => setSelectedImage(item.image)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* 描述 - 与网站文案风格一致 */}
                  <p className="text-stone-700 mb-4 leading-relaxed">{item.caption}</p>
                  
                  {/* 标签 - 与网站标签一致 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* 互动按钮 - 与网站按钮一致 */}
                  <div className="flex items-center justify-between pt-4 border-t                  {/* 互动按钮 - 与网站按钮一致 */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <button 
                      onClick={() => handleLike(item.id)}
                      className="flex items-center gap-2 text-stone-600 hover:text-red-500 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                        <Heart size={16} fill={item.likes > 0 ? "currentColor" : "none"} />
                      </div>
                      <span className="text-sm font-medium">{item.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-stone-600 hover:text-blue-500 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <MessageCircle size={16} />
                      </div>
                      <span className="text-sm font-medium">{item.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-stone-600 hover:text-green-500 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-green-50 transition-colors">
                        <Upload size={16} />
                      </div>
                      <span className="text-sm font-medium">{t.share}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多 - 与网站按钮一致 */}
        {hasMore && (
          <div className="text-center mb-16">
            <button
              onClick={loadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-stone-900 text-stone-900 font-medium rounded-full hover:bg-stone-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                  {t.loading}
                </>
              ) : (
                <>
                  {t.viewAll}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}

        {/* 社区准则 - 与网站价值观部分一致 */}
        <div className="bg-gradient-to-r from-amber-50/50 to-stone-50/50 rounded-2xl p-8 md:p-12 border border-amber-100/50 backdrop-blur-sm">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-serif text-stone-900 mb-4">{t.communityGuidelines}</h3>
            <p className="text-stone-600 max-w-2xl mx-auto">
              我们相信温暖的社区需要共同的准则来维护
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-stone-200/50 hover:border-amber-200 transition-colors">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-5">
                <Heart size={24} className="text-amber-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-3">{t.guideline1}</h4>
              <p className="text-stone-600 leading-relaxed">
                每一只宠物都值得被爱和尊重，每一位宠物家长都值得被理解
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-stone-200/50 hover:border-stone-300 transition-colors">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-5">
                <MessageCircle size={24} className="text-stone-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-3">{t.guideline2}</h4>
              <p className="text-stone-600 leading-relaxed">
                保持积极和支持性的对话，让这里成为温暖的分享空间
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-stone-200/50 hover:border-stone-300 transition-colors">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-5">
                <X size={24} className="text-stone-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-3">{t.guideline3}</h4>
              <p className="text-stone-600 leading-relaxed">
                维护社区的安全和友好，禁止任何不当内容
              </p>
            </div>
          </div>
        </div>

        {/* 语言切换 - 与网站语言切换一致 */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-stone-200">
            <Globe size={16} className="text-stone-500" />
            <button 
              onClick={() => setLanguage('zh')}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${language === 'zh' ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-600 hover:text-stone-900'}`}
            >
              中文
            </button>
            <div className="w-px h-4 bg-stone-200" />
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${language === 'en' ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-600 hover:text-stone-900'}`}
            >
              English
            </button>
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