'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Star, Home as HomeIcon, Globe, ChevronRight } from 'lucide-react'
import { siteDesignSystem } from '@/lib/ugc-config'

// 使用网站的语言系统
const useSiteLanguage = () => {
  const [language, setLanguage] = useState('zh')
  
  useEffect(() => {
    // 从localStorage获取网站语言设置
    const savedLang = localStorage.getItem('nightfall_lang')
    if (savedLang === 'en' || savedLang === 'zh') {
      setLanguage(savedLang)
    }
    
    // 监听网站语言变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nightfall_lang' && (e.newValue === 'en' || e.newValue === 'zh')) {
        setLanguage(e.newValue)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  return language
}

// UGC翻译 - 与网站翻译系统完全集成
const ugcTranslations = {
  en: {
    // 标题区域 - 与网站标题风格一致
    title: 'Pet Parents Sharing',
    subtitle: 'See stories from other pet parents and Nightfall',
    
    // 统计卡片 - 与网站统计风格一致
    stats: {
      total: 'Total Shares',
      today: 'Today',
      trending: 'Trending'
    },
    
    // 社区准则 - 与网站价值观风格一致
    communityGuidelines: 'Community Guidelines',
    guideline1: 'Respect all pets and pet parents',
    guideline2: 'Keep conversations friendly',
    guideline3: 'No inappropriate content',
    
    // 交互文本 - 与网站按钮文本一致
    viewAll: 'View All Sharing',
    like: 'Like',
    comment: 'Comment',
    share: 'Share'
  },
  zh: {
    title: '宠物家长的真实分享',
    subtitle: '看看其他宠物家长如何与他们的毛孩子享受Nightfall带来的温暖时光',
    
    stats: {
      total: '总分享数',
      today: '今日新增',
      trending: '热门趋势'
    },
    
    communityGuidelines: '社区准则',
    guideline1: '尊重所有宠物和宠物家长',
    guideline2: '保持友善交流',
    guideline3: '禁止不当内容',
    
    viewAll: '查看全部分享',
    like: '点赞',
    comment: '评论',
    share: '分享'
  }
}

// UGC数据 - 与网站品牌故事一致
const ugcData = [
  {
    id: 1,
    username: '猫奴小张',
    avatar: '🐱',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    caption: '每晚都要穿睡衣才肯睡觉，Nightfall的材质真的很亲肤～',
    likes: 42,
    comments: 8,
    timestamp: '2小时前',
    tags: ['#猫咪', '#睡衣', '#舒适'],
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
    tags: ['#狗狗', '#第一次', '#柔软'],
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
    tags: ['#多宠', '#温馨', '#夜晚'],
    featured: true
  }
]

export default function UGCIntegrated() {
  const language = useSiteLanguage()
  const t = ugcTranslations[language as 'zh' | 'en']
  const { colors, spacing, typography, animations, ugcDesign } = siteDesignSystem
  
  const [items] = useState(ugcData)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    // 使用网站section的class - 确保完全一致
    <section className={`${spacing.section} ${spacing.container} ${ugcDesign.background} ${animations.section}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* 标题区域 - 与网站标题区域完全一致 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 text-stone-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100/80 to-stone-100/80 flex items-center justify-center backdrop-blur-sm border border-stone-200/50">
              <Heart size={28} strokeWidth={1.5} className="text-stone-700" />
            </div>
            <span className="text-sm tracking-[0.2em] uppercase font-medium">Community Love</span>
          </div>
          <h2 className={`${typography.title} text-stone-900 mb-6 leading-tight`}>
            {t.title}
          </h2>
          <p className={`${typography.subtitle} max-w-2xl mx-auto leading-relaxed`}>
            {t.subtitle}
          </p>
        </div>

        {/* 统计卡片 - 与网站卡片设计完全一致 */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid} mb-12`}>
          <div className={`${ugcDesign.background} ${ugcDesign.borderRadius} ${spacing.card} ${ugcDesign.shadow} ${animations.card}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">{t.stats.total}</h3>
              <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center">
                <HomeIcon size={20} className="text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900">{items.length}</p>
            <p className="text-sm text-stone-500 mt-2">持续增长的温暖社区</p>
          </div>
          
          <div className={`${ugcDesign.background} ${ugcDesign.borderRadius} ${spacing.card} ${ugcDesign.shadow} ${animations.card}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">{t.stats.today}</h3>
              <div className="w-10 h-10 rounded-full bg-stone-100/50 flex items-center justify-center">
                <Star size={20} className="text-stone-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900">{items.filter(i => i.timestamp.includes('小时')).length}</p>
            <p className="text-sm text-stone-500 mt-2">今日新增分享</p>
          </div>
          
          <div className={`${ugcDesign.background} ${ugcDesign.borderRadius} ${spacing.card} ${ugcDesign.shadow} ${animations.card}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">{t.stats.trending}</h3>
              <div className="w-10 h-10 rounded-full bg-stone-100/50 flex items-center justify-center">
                <Heart size={20} className="text-stone-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900">{Math.max(...items.map(i => i.likes))}</p>
            <p className="text-sm text-stone-500 mt-2">最高点赞记录</p>
          </div>
        </div>

        {/* UGC网格 - 与网站产品网格完全一致 */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${spacing.grid} mb-12`}>
          {items.map((item) => (
            <div key={item.id} className="group">
              <div className={`bg-white ${ugcDesign.borderRadius} overflow-hidden border border-stone-200/70 hover:border-stone-300 ${animations.card}`}>
                <div className={spacing.card}>
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
                  </div>
                  
                  <p className={`${typography.body} mb-4`}>{item.caption}</p>
                  
                  {/* 标签 - 与网站标签风格一致 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* 互动按钮 - 与网站按钮风格一致 */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <button className="flex items-center gap-2 text-stone-600 hover:text-red-500 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                        <Heart size={16} />
                      </div>
                      <span className="text-sm font-medium">{item.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-stone-600 hover:text-blue-500 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                        <MessageCircle size={16} />
                      </div>
                      <span className="text-sm font-medium">{item.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 社区准则 - 与网站价值观区域完全一致 */}
        <div className={`${ugcDesign.gradient} ${ugcDesign.borderRadius} p-8 md:p-12 border border-amber-100/50 backdrop-blur-sm`}>
          <div className="text-center mb-10">
            <h3 className="text-3xl font-serif text-stone-900 mb-4">{t.communityGuidelines}</h3>
            <p className="text-stone-600 max-w-2xl mx-auto">
              我们相信温暖的社区需要共同的准则来维护
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-stone-200/50">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-5">
                <Heart size={24} className="text-amber-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-3">{t.guideline1}</h4>
              <p className="text-stone-600 leading-relaxed">
                每一只宠物都值得被爱和尊重，每一位宠物家长都值得被理解
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-stone-200/50">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-5">
                <MessageCircle size={24} className="text-stone-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-3">{t.guideline2}</h4>
              <p className="text-stone-600 leading-relaxed">
                保持积极和支持性的对话，让这里成为温暖的分享空间
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-stone-200/50">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-5">
                <Heart size={24} className="text-stone-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-3">{t.guideline3}</h4>
              <p className="text-stone-600 leading-relaxed">
                维护社区的安全和友好，禁止任何不当内容
              </p>
            </div>
          </div>
        </div>

        {/* 查看全部按钮 - 与网站CTA按钮完全一致 */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 border-2 border-stone-900 text-stone-900 px-8 py-4 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300 group">
            <span>{t.viewAll}</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}