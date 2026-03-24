'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Moon, Heart, Home as HomeIcon, ArrowRight, Globe, Menu, X, ChevronDown, Check, Star } from 'lucide-react'
import UGCGallery from '@/components/UGCGallery'

const translations: Record<string, any> = {
  en: {
    nav: { story: 'Story', products: 'Products', about: 'About' },
    hero: { subtitle: 'We live with cats. We live with dogs.', title: 'Everyday Companionship,\nTaken Seriously', description: 'A pet lifestyle brand focused on companionship.', cta: 'Explore Collection' },
    story: { label: 'Brand Story', content: ['For a long time, we thought we were the ones giving.', 'But we realized: sometimes they need us even more.', 'They stay beside us through exhaustion, loneliness, sleepless nights.'] },
    products: { label: 'Collection', sleepwear: { title: 'Classic Pet Sleepwear', description: 'Soft, skin-friendly nighttime solution.', price: '$32 - $48' }, homewear: { title: 'Home Sharing', description: 'Shared space for humans and pets.', price: 'Coming Soon' }, notify: 'Notify on Launch', comingSoon: 'First collection launching soon' },
    values: { warmth: { title: 'Warmth', desc: 'No fast fashion. Only warm designs.' }, companionship: { title: 'Companionship', desc: 'Every quiet night deserves seriousness.' }, daily: { title: 'Daily', desc: 'Restrained aesthetics. Cherish every day.' } },
    footer: { tagline: 'A pet lifestyle brand focused on companionship', nav: 'Navigation', contact: 'Contact', contactText: 'Questions? Reach out at', copyright: '© 2026 Nightfall. All rights reserved.', motto: 'Not wasting a single day with them.' }
  },
  zh: {
    nav: { story: '品牌故事', products: '产品系列', about: '关于' },
    hero: { subtitle: 'We live with cats. We live with dogs.', title: '被认真对待的\n日常陪伴', description: '一个不分物种、只讲陪伴的宠物生活方式品牌。', cta: '探索系列' },
    story: { label: 'Brand Story', content: ['很长一段时间，我们以为是我们它们在给予。', '但我们意识到：有时它们更需要我们。', '它们陪伴我们度过疲惫、孤独、失眠的夜晚。'] },
    products: { label: '产品系列', sleepwear: { title: '经典宠物睡衣', description: '柔软亲肤，夜晚的陪伴解决方案', price: '$32 - $48' }, homewear: { title: '居家共享系列', description: '人宠共用的情绪空间', price: '即将推出' }, notify: '订阅上新提醒', comingSoon: '首批产品即将上线' },
    values: { warmth: { title: '温暖', desc: '不追求热点，只做温暖的设计' }, companionship: { title: '陪伴', desc: '每一个安静的夜晚都值得被认真对待' }, daily: { title: '日常', desc: '克制的美学，珍惜在一起的每一天' } },
    footer: { tagline: '一个不分物种、只讲陪伴的宠物生活方式品牌', nav: '导航', contact: '联系', contactText: '有任何问题或建议，欢迎联系', copyright: '© 2026 Nightfall. All rights reserved.', motto: '不浪费和它们在一起的每一天' }
  },
  ja: { nav: { story: 'ストーリー', products: 'コレクション', about: '私たちについて' }, hero: { subtitle: '私たちは猫と犬と共に', title: '何気ない日常を、\n真剣に考える', description: '絆に焦点を当てたペットライフスタイルブランド。', cta: 'コレクションを見る' }, story: { label: 'Brand Story', content: ['長い間、私たちが与えていると思っていました。', 'しかし、彼らの方が私たちを必要としています。', '疲れた夜も、孤独な夜も、そばにいてくれます。'] }, products: { label: 'コレクション', sleepwear: { title: 'クラシックペットパジャマ', description: '柔らかく肌に優しい', price: '$32 - $48' }, homewear: { title: 'ホームシェアリング', description: '人とペットの共有スペース', price: '近日公開' }, notify: '発売通知を受け取る', comingSoon: '最初のコレクションは近日発売' }, values: { warmth: { title: '温かさ', desc: 'ファストファッションでもトレンドでもない' }, companionship: { title: '絆', desc: '静かな夜すべてが、真剣に扱われる価値がある' }, daily: { title: '日常', desc: '抑制された美しさ' } }, footer: { tagline: '絆に焦点を当てたペットライフスタイルブランド', nav: 'ナビゲーション', contact: 'お問い合わせ', contactText: 'ご質問は、こちらまで', copyright: '© 2026 Nightfall. All rights reserved.', motto: '彼らと過ごす每一天を無駄にしない。' } },
  ko: { nav: { story: '스토리', products: '컬렉션', about: '소개' }, hero: { subtitle: '우리는 고양이와 강아지와', title: '일상적인 동반자,\n진지하게', description: '동반자에 초점을 맞춘 펫 라이프스타일 브랜드.', cta: '컬렉션 보기' }, story: { label: 'Brand Story', content: ['오랫동안 우리가 주는 것이라고 생각했습니다.', '하지만 그들이 우리를 더 필요로 합니다.', '지친 밤도, 외로운 밤도, 곁에 있어줍니다.'] }, products: { label: '컬렉션', sleepwear: { title: '클래식 펫 잠옷', description: '부드럽고 피부 친화적', price: '$32 - $48' }, homewear: { title: '홈 쉐어링', description: '사람과 반려동물의 공유 공간', price: '곧 출시' }, notify: '출시 알림 받기', comingSoon: '첫 번째 컬렉션 곧 출시' }, values: { warmth: { title: '따뜻함', desc: '빠른 패션도, 트렌드도 없습니다' }, companionship: { title: '동반자', desc: '조용한 밤 모두 진지하게' }, daily: { title: '일상', desc: '절제된 미학' } }, footer: { tagline: '동반자에 초점을 맞춘 펫 라이프스타일 브랜드', nav: '탐색', contact: '연락처', contactText: '질문이나 제안', copyright: '© 2026 Nightfall. All rights reserved.', motto: '그들과 함께하는 매일을 낭비하지 않습니다.' } },
  fr: { nav: { story: 'Histoire', products: 'Collection', about: 'À propos' }, hero: { subtitle: 'Nous vivons avec chats et chiens', title: 'La Compagnie Quotidienne,\nPrise au Sérieux', description: 'Une marque de lifestyle pour animaux.', cta: 'Explorer la Collection' }, story: { label: 'Brand Story', content: ['Pendant longtemps, nous pensions donner.', 'Mais ils ont encore plus besoin de nous.', 'Ils restent à nos côtés dans les nuits difficiles.'] }, products: { label: 'Collection', sleepwear: { title: 'Pyjama pour Animaux', description: 'Doux et respectueux de la peau', price: '$32 - $48' }, homewear: { title: 'Partage Domestique', description: 'Espace partagé', price: 'Bientôt' }, notify: 'Être Averti', comingSoon: 'Première collection bientôt' }, values: { warmth: { title: 'Chaleur', desc: 'Pas de fast fashion. Designs chaleureux.' }, companionship: { title: 'Compagnie', desc: 'Chaque nuit calme mérite sérieux.' }, daily: { title: 'Quotidien', desc: 'Esthétique sobre.' } }, footer: { tagline: 'Marque de lifestyle pour animaux', nav: 'Navigation', contact: 'Contact', contactText: 'Questions ?', copyright: '© 2026 Nightfall. Tous droits réservés.', motto: 'Ne pas gaspiller un jour avec eux.' } },
  de: { nav: { story: 'Geschichte', products: 'Kollektion', about: 'Über Uns' }, hero: { subtitle: 'Wir leben mit Katzen und Hunden', title: 'Alltägliche Begleitung,\nErnst Genommen', description: 'Eine Haustier-Lifestyle-Marke.', cta: 'Kollektion Entdecken' }, story: { label: 'Brand Story', content: ['Lange dachten wir, wir geben.', 'Aber sie brauchen uns mehr.', 'Sie bleiben in schweren Nächten an unserer Seite.'] }, products: { label: 'Kollektion', sleepwear: { title: 'Haustier-Nachtwäsche', description: 'Weich und hautfreundlich', price: '$32 - $48' }, homewear: { title: 'Wohnbereich', description: 'Gemeinsamer Raum', price: 'Demnächst' }, notify: 'Benachrichtigen', comingSoon: 'Erste Kollektion demnächst' }, values: { warmth: { title: 'Wärme', desc: 'Keine Fast Fashion. Warme Designs.' }, companionship: { title: 'Begleitung', desc: 'Jede ruhige Nacht verdient Ernst.' }, daily: { title: 'Alltag', desc: 'Zurückhaltende Ästhetik.' } }, footer: { tagline: 'Haustier-Lifestyle-Marke', nav: 'Navigation', contact: 'Kontakt', contactText: 'Fragen?', copyright: '© 2026 Nightfall. Alle Rechte vorbehalten.', motto: 'Keinen Tag verschwenden.' } }
}

const languages = [{ code: 'en', native: 'English', flag: '🇺🇸' }, { code: 'zh', native: '中文', flag: '🇨🇳' }, { code: 'ja', native: '日本語', flag: '🇯🇵' }, { code: 'ko', native: '한국어', flag: '🇰🇷' }, { code: 'fr', native: 'Français', flag: '🇫🇷' }, { code: 'de', native: 'Deutsch', flag: '🇩🇪' }]

// 高清图片资源 - 来自 Unsplash（免费商用）
const images = {
  // Hero 背景图 - 温暖的居家宠物场景
  hero: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&q=80',
  // 产品图 - 猫咪
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
  // 产品图 - 狗狗
  dog: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80',
  // 故事配图 - 陪伴场景
  story: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=1200&q=80',
  // 价值图 - 温暖居家
  warmth: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&q=80',
  // 价值图 - 夜晚陪伴
  companionship: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&q=80',
  // 价值图 - 日常生活
  daily: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80',
  // 页脚背景
  footer: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=1920&q=80'
}

// Nightfall Logo - Updated version with sleeping cat on crescent moon
function NightfallLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoMoon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#D2691E" stopOpacity="0.9"/>
        </linearGradient>
        <linearGradient id="logoCat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A0522D"/>
          <stop offset="100%" stopColor="#CD853F"/>
        </linearGradient>
      </defs>
      
      {/* Crescent Moon */}
      <path d="M40 40 
               C30 30, 20 35, 15 45 
               C10 55, 15 65, 25 70 
               C35 75, 45 70, 50 60 
               C55 50, 50 45, 40 40Z" 
            fill="url(#logoMoon)" 
            stroke="#5D4037" 
            strokeWidth="2"/>
      
      {/* Sleeping cat */}
      <g transform="translate(30, 30)">
        {/* Body */}
        <ellipse cx="35" cy="25" rx="20" ry="12" fill="url(#logoCat)" stroke="#5D4037" strokeWidth="1.5"/>
        
        {/* Head */}
        <ellipse cx="35" cy="10" rx="12" ry="10" fill="url(#logoCat)" stroke="#5D4037" strokeWidth="1.5"/>
        
        {/* Ears */}
        <path d="M28 5 L30 0 L32 5" fill="#5D4037"/>
        <path d="M42 5 L44 0 L46 5" fill="#5D4037"/>
        
        {/* Closed eyes (sleeping) */}
        <path d="M30 8 Q33 10 36 8" stroke="#5D4037" strokeWidth="1.5" fill="none"/>
        <path d="M40 8 Q43 10 46 8" stroke="#5D4037" strokeWidth="1.5" fill="none"/>
        
        {/* Nose */}
        <circle cx="35" cy="12" r="1.5" fill="#FF6B6B"/>
        
        {/* Whiskers */}
        <path d="M25 12 L20 10" stroke="#5D4037" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M25 14 L20 14" stroke="#5D4037" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M25 16 L20 18" stroke="#5D4037" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M45 12 L50 10" stroke="#5D4037" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M45 14 L50 14" stroke="#5D4037" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M45 16 L50 18" stroke="#5D4037" strokeWidth="0.8" strokeLinecap="round"/>
        
        {/* Tail */}
        <path d="M50 25 
                 C55 20, 60 18, 55 30 
                 C50 42, 45 40, 47 35" 
              fill="url(#logoCat)" 
              stroke="#5D4037" 
              strokeWidth="1.5"/>
      </g>
      
      {/* Brand Name */}
      <text x="70" y="70" fontFamily="'Georgia', serif" fontSize="24" fontWeight="600" fill="#5D4037" letterSpacing="1">
        NIGHTFALL
      </text>
    </svg>
  )
}

export default function Home() {
  const [lang, setLang] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const saved = localStorage.getItem('nightfall_lang')
    setLang(saved && translations[saved] ? saved : 'en')

    // 预加载图片
    const loadImages = () => {
      const imageUrls = Object.values(images)
      let loaded = 0
      imageUrls.forEach(url => {
        const img = new Image()
        img.src = url
        img.onload = () => {
          loaded++
          if (loaded === imageUrls.length) {
            setImagesLoaded(true)
          }
        }
      })
    }
    loadImages()

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['hero', 'story', 'products', 'values']
      const newVisible = new Set(visibleSections)
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.8) {
          newVisible.add(id)
        }
      })
      setVisibleSections(newVisible)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLangChange = (code: string) => {
    setLang(code)
    localStorage.setItem('nightfall_lang', code)
    setShowLangDropdown(false)
  }

  const currentLang = languages.find(l => l.code === lang)

  return (
    <main className="min-h-screen bg-[#f5f5f4] relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-100/60 to-stone-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-stone-100/80 via-amber-50/40 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-gradient-to-t from-stone-200/50 via-stone-100/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #44403c 1px, transparent 0)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#f5f5f4]/95 backdrop-blur-xl shadow-lg shadow-stone-900/5 border-b border-stone-200/50' : 'bg-transparent'}`}>
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-stone-800 hover:text-stone-900 transition-colors">
                <NightfallLogo className="h-8 md:h-10" />
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <div className="flex gap-8 text-stone-600">
                  {['story', 'products', 'about'].map((item) => (
                    <Link key={item} href={`#${item}`} className="text-sm hover:text-stone-900 transition-all duration-300 relative group capitalize">
                      {t.nav[item as keyof typeof t.nav]}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>
                <div className="h-5 w-px bg-stone-300" />
                <div className="relative">
                  <button onClick={() => setShowLangDropdown(!showLangDropdown)} className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-full hover:bg-stone-200/50 transition-all">
                    <Globe size={16} /><span className="font-medium">{currentLang?.flag} {currentLang?.native}</span>
                    <ChevronDown size={14} className={`transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showLangDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-stone-200 py-2 z-50">
                      {languages.map((l) => (
                        <button key={l.code} onClick={() => handleLangChange(l.code)} className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-stone-50">
                          <span className="flex items-center gap-3"><span className="text-lg">{l.flag}</span><span className={lang === l.code ? 'font-medium text-stone-900' : 'text-stone-600'}>{l.native}</span></span>
                          {lang === l.code && <Check size={16} className="text-stone-900" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button className="md:hidden text-stone-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section with Background Image */}
        <section id="hero" className={`relative h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100' : 'opacity-0'}`}>
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={images.hero}
              alt="Pets companionship"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <p className="text-stone-200 text-xs tracking-[0.25em] uppercase mb-8 animate-fade-in">{t.hero.subtitle}</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-10 leading-[1.05] whitespace-pre-line tracking-tight drop-shadow-2xl">{t.hero.title}</h1>
            <p className="text-lg text-stone-200/90 mb-12 max-w-2xl mx-auto leading-relaxed">{t.hero.description}</p>
            <Link href="#products" className="inline-flex items-center gap-3 bg-white/95 text-stone-900 px-12 py-5 rounded-full hover:bg-white transition-all duration-500 group shadow-2xl hover:scale-105">
              {t.hero.cta}<ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className={`py-32 px-6 transition-all duration-1000 ${visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-8 text-stone-500">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center">
                    <Moon size={20} strokeWidth={1.5} className="text-stone-700" />
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase">{t.story.label}</span>
                </div>
                <div className="space-y-6 text-stone-700 leading-relaxed">
                  {t.story.content.map((p: string, i: number) => (
                    <p key={i} className={`text-lg ${i === 0 ? 'text-xl text-stone-800 font-medium' : ''} ${i === 2 ? 'pl-6 border-l-2 border-amber-300 italic' : ''}`}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/10">
                  <img
                    src={images.story}
                    alt="Dog and owner companionship"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-100/60 to-stone-200/40 rounded-full blur-2xl" />
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-bl from-stone-100/60 to-amber-200/40 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className={`py-32 px-6 bg-white/80 backdrop-blur-sm border-y border-white/30 transition-all duration-1000 ${visibleSections.has('products') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-20 text-stone-500">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center">
                <HomeIcon size={20} strokeWidth={1.5} className="text-stone-700" />
              </div>
              <span className="text-xs tracking-[0.2em] uppercase">{t.products.label}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-16">
              {/* Product 1 - Cat */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-3xl mb-8 overflow-hidden relative shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={images.cat}
                    alt="Cat in cozy sleepwear"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm">Soft & Comfortable</p>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-3">{t.products.sleepwear.title}</h3>
                <p className="text-stone-500 mb-4">{t.products.sleepwear.description}</p>
                <p className="text-stone-900 font-medium text-lg">{t.products.sleepwear.price}</p>
              </div>

              {/* Product 2 - Dog */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-3xl mb-8 overflow-hidden relative shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={images.dog}
                    alt="Dog in cozy sleepwear"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm">Perfect for Rest</p>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-3">{t.products.homewear.title}</h3>
                <p className="text-stone-500 mb-4">{t.products.homewear.description}</p>
                <p className="text-stone-500 italic text-lg">{t.products.homewear.price}</p>
              </div>
            </div>
            <div className="text-center mt-20">
              <p className="text-stone-500 text-sm mb-8">{t.products.comingSoon}</p>
              <button className="border-2 border-stone-900 px-12 py-5 rounded-full hover:bg-stone-900 hover:text-stone-50 transition-all duration-500">{t.products.notify}</button>
            </div>
          </div>
        </section>

        {/* Values Section with Images */}
        <section id="values" className={`py-32 px-6 transition-all duration-1000 ${visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Heart, ...t.values.warmth, image: images.warmth },
                { icon: Moon, ...t.values.companionship, image: images.companionship },
                { icon: HomeIcon, ...t.values.daily, image: images.daily }
              ].map((v, i) => (
                <div key={i} className="group text-center">
                  <div className="aspect-square rounded-2xl mb-6 overflow-hidden relative">
                    <img
                      src={v.image}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <div className="w-16 h-16 mx-auto -mt-12 mb-4 rounded-full bg-white/95 backdrop-blur flex items-center justify-center border-4 border-white shadow-xl relative z-10">
                    <v.icon size={28} strokeWidth={1.5} className="text-stone-700" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-4">{v.title}</h3>
                  <p className="text-stone-600">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UGC Community Section */}
        <section id="community" className={`py-32 px-6 bg-white/80 backdrop-blur-sm transition-all duration-1000 ${visibleSections.has('community') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 text-stone-500">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center">
                  <Heart size={24} strokeWidth={1.5} className="text-stone-700" />
                </div>
                <span className="text-sm tracking-[0.2em] uppercase">Community Love</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">宠物家长的真实分享</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                看看其他宠物家长如何与他们的毛孩子享受Nightfall带来的温暖时光
              </p>
            </div>
            
            {/* UGC Gallery Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&q=80',
                  username: '猫咪小管家',
                  caption: '每晚都要穿睡衣才肯睡觉'
                },
                {
                  image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&q=80',
                  username: '金毛爸爸',
                  caption: '材质真的很舒服，狗狗不抗拒'
                },
                {
                  image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
                  username: '多宠家庭',
                  caption: '家里所有宠物都爱上了Nightfall'
                }
              ].map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-stone-900">{item.username}</p>
                    <p className="text-sm text-stone-500">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => {
                  // 这里可以添加跳转到完整UGC页面的逻辑
                  const communitySection = document.getElementById('ugc-full');
                  if (communitySection) {
                    communitySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 border-2 border-stone-900 text-stone-900 px-8 py-4 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300"
              >
                <span>查看更多分享</span>
                <ArrowRight size={18} />
              </button>
              <p className="text-sm text-stone-500 mt-4">
                已有 <span className="font-medium text-stone-900">128</span> 位宠物家长分享了他们的故事
              </p>
            </div>
          </div>
        </section>

        {/* Full UGC Gallery - 这里可以放置完整的UGC组件 */}
        <div id="ugc-full" className="min-h-screen">
          {/* 完整的UGC画廊组件可以在这里渲染 */}
          {/* 暂时注释掉，需要时取消注释 */}
          <UGCGallery />
        </div>

        {/* Footer */}
        <footer id="about" className="py-20 px-6 bg-stone-900 text-stone-400 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={images.footer} alt="Night sky" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-stone-900/60" />
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-3 gap-16 mb-16">
              <div><NightfallLogo className="h-10 text-stone-50 mb-6" /><p className="text-sm">{t.footer.tagline}</p></div>
              <div><h5 className="text-stone-50 mb-6 text-sm uppercase tracking-wider">{t.footer.nav}</h5><ul className="space-y-4 text-sm">{['story', 'products', 'about'].map(item => <li key={item}><Link href={`#${item}`} className="hover:text-stone-50 capitalize">{t.nav[item as keyof typeof t.nav]}</Link></li>)}</ul></div>
              <div><h5 className="text-stone-50 mb-6 text-sm uppercase tracking-wider">{t.footer.contact}</h5><p className="text-sm">{t.footer.contactText}<br /><a href="mailto:hello@nightfall.pet" className="text-stone-300">hello@nightfall.pet</a></p></div>
            </div>
            <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-stone-500">{t.footer.copyright}</p>
              <p className="text-stone-600 italic">{t.footer.motto}</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
