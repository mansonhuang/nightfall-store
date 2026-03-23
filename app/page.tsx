'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Moon, Heart, Home as HomeIcon, ArrowRight, Globe, Menu, X, ChevronDown, Check } from 'lucide-react'

// 简化的多语言内容（完整版后续补充）
const translations: Record<string, any> = {
  en: {
    nav: { story: 'Story', products: 'Products', about: 'About' },
    hero: {
      subtitle: 'We live with cats. We live with dogs.',
      title: 'Everyday Companionship,\nTaken Seriously',
      description: 'A pet lifestyle brand focused on companionship. Not wasting a single day with them.',
      cta: 'Explore Collection'
    },
    story: { label: 'Brand Story' },
    products: {
      label: 'Collection',
      sleepwear: { title: 'Classic Pet Sleepwear', description: 'Soft, skin-friendly nighttime solution.', price: '$32 - $48' },
      homewear: { title: 'Home Sharing Collection', description: 'Shared space for humans and pets.', price: 'Coming Soon' },
      notify: 'Notify on Launch',
      comingSoon: 'First collection launching soon'
    },
    values: {
      warmth: { title: 'Warmth', desc: 'No fast fashion. Only genuinely warm designs.' },
      companionship: { title: 'Companionship', desc: 'Every quiet night deserves to be taken seriously.' },
      daily: { title: 'Daily', desc: 'Restrained aesthetics. Cherishing every day together.' }
    },
    footer: {
      tagline: 'A pet lifestyle brand focused on companionship',
      nav: 'Navigation', contact: 'Contact',
      contactText: 'Questions? Reach out at',
      copyright: '© 2026 Nightfall. All rights reserved.',
      motto: 'Not wasting a single day with them.'
    }
  },
  zh: {
    nav: { story: '品牌故事', products: '产品系列', about: '关于' },
    hero: {
      subtitle: 'We live with cats. We live with dogs.',
      title: '被认真对待的\n日常陪伴',
      description: '一个不分物种、只讲陪伴的宠物生活方式品牌。不浪费和它们在一起的每一天。',
      cta: '探索系列'
    },
    story: { label: 'Brand Story' },
    products: {
      label: '产品系列',
      sleepwear: { title: '经典宠物睡衣', description: '柔软亲肤，夜晚的陪伴解决方案', price: '$32 - $48' },
      homewear: { title: '居家共享系列', description: '人宠共用的情绪空间', price: '即将推出' },
      notify: '订阅上新提醒',
      comingSoon: '首批产品即将上线'
    },
    values: {
      warmth: { title: '温暖', desc: '不追求热点与爆款，只做真正温暖的设计' },
      companionship: { title: '陪伴', desc: '每一个安静的夜晚都值得被认真对待' },
      daily: { title: '日常', desc: '克制的美学，珍惜在一起的每一天' }
    },
    footer: {
      tagline: '一个不分物种、只讲陪伴的宠物生活方式品牌',
      nav: '导航', contact: '联系',
      contactText: '有任何问题或建议，欢迎联系',
      copyright: '© 2026 Nightfall. All rights reserved.',
      motto: '不浪费和它们在一起的每一天'
    }
  },
  ja: {
    nav: { story: 'ストーリー', products: 'コレクション', about: '私たちについて' },
    hero: {
      subtitle: '私たちは猫と犬と共に暮らす',
      title: '何気ない日常を、\n真剣に考える',
      description: '絆に焦点を当てたペットライフスタイルブランド。彼らと過ごす每一天を無駄にしない。',
      cta: 'コレクションを見る'
    },
    story: { label: 'Brand Story' },
    products: {
      label: 'コレクション',
      sleepwear: { title: 'クラシックペットパジャマ', description: '柔らかく肌に優しい夜のソリューション', price: '$32 - $48' },
      homewear: { title: 'ホームシェアリング', description: '人とペットのための共有スペース', price: '近日公開' },
      notify: '発売通知を受け取る',
      comingSoon: '最初のコレクションは近日発売'
    },
    values: {
      warmth: { title: '温かさ', desc: 'ファストファッションでもトレンドでもない' },
      companionship: { title: '絆', desc: '静かな夜すべてが、真剣に扱われる価値がある' },
      daily: { title: '日常', desc: '抑制された美しさ。一緒に過ごす每一天を大切に' }
    },
    footer: {
      tagline: '絆に焦点を当てたペットライフスタイルブランド',
      nav: 'ナビゲーション', contact: 'お問い合わせ',
      contactText: 'ご質問は、こちらまで',
      copyright: '© 2026 Nightfall. All rights reserved.',
      motto: '彼らと過ごす每一天を無駄にしない。'
    }
  },
  ko: {
    nav: { story: '스토리', products: '컬렉션', about: '소개' },
    hero: {
      subtitle: '우리는 고양이와 강아지와 삽니다',
      title: '일상적인 동반자,\n진지하게',
      description: '동반자에 초점을 맞춘 펫 라이프스타일 브랜드. 그들과 함께하는 매일을 낭비하지 않습니다.',
      cta: '컬렉션 보기'
    },
    story: { label: 'Brand Story' },
    products: {
      label: '컬렉션',
      sleepwear: { title: '클래식 펫 잠옷', description: '부드럽고 피부 친화적', price: '$32 - $48' },
      homewear: { title: '홈 쉐어링', description: '사람과 반려동물을 위한 공유 공간', price: '곧 출시' },
      notify: '출시 알림 받기',
      comingSoon: '첫 번째 컬렉션 곧 출시'
    },
    values: {
      warmth: { title: '따뜻함', desc: '빠른 패션도, 트렌드도 없습니다' },
      companionship: { title: '동반자', desc: '조용한 밤 모두 진지하게 받아들여질 가치가 있습니다' },
      daily: { title: '일상', desc: '절제된 미학. 함께 보내는 매일을 소중히' }
    },
    footer: {
      tagline: '동반자에 초점을 맞춘 펫 라이프스타일 브랜드',
      nav: '탐색', contact: '연락처',
      contactText: '질문이나 제안이 있으시면',
      copyright: '© 2026 Nightfall. All rights reserved.',
      motto: '그들과 함께하는 매일을 낭비하지 않습니다.'
    }
  },
  fr: {
    nav: { story: 'Histoire', products: 'Collection', about: 'À propos' },
    hero: {
      subtitle: 'Nous vivons avec des chats et des chiens',
      title: 'La Compagnie Quotidienne,\nPrise au Sérieux',
      description: 'Une marque de lifestyle pour animaux centrée sur la compagnie.',
      cta: 'Explorer la Collection'
    },
    story: { label: 'Brand Story' },
    products: {
      label: 'Collection',
      sleepwear: { title: 'Pyjama pour Animaux', description: 'Doux et respectueux de la peau', price: '$32 - $48' },
      homewear: { title: 'Partage Domestique', description: 'Espace partagé humains-animaux', price: 'Bientôt' },
      notify: 'Être Averti',
      comingSoon: 'Première collection bientôt'
    },
    values: {
      warmth: { title: 'Chaleur', desc: 'Pas de fast fashion. Des designs chaleureux.' },
      companionship: { title: 'Compagnie', desc: 'Chaque nuit calme mérite d\'être prise au sérieux.' },
      daily: { title: 'Quotidien', desc: 'Esthétique sobre. Chérir chaque jour.' }
    },
    footer: {
      tagline: 'Marque de lifestyle pour animaux',
      nav: 'Navigation', contact: 'Contact',
      contactText: 'Questions ? Écrivez-nous à',
      copyright: '© 2026 Nightfall. Tous droits réservés.',
      motto: 'Ne pas gaspiller un jour avec eux.'
    }
  },
  de: {
    nav: { story: 'Geschichte', products: 'Kollektion', about: 'Über Uns' },
    hero: {
      subtitle: 'Wir leben mit Katzen und Hunden',
      title: 'Alltägliche Begleitung,\nErnst Genommen',
      description: 'Eine Haustier-Lifestyle-Marke mit Fokus auf Begleitung.',
      cta: 'Kollektion Entdecken'
    },
    story: { label: 'Brand Story' },
    products: {
      label: 'Kollektion',
      sleepwear: { title: 'Haustier-Nachtwäsche', description: 'Weich und hautfreundlich', price: '$32 - $48' },
      homewear: { title: 'Wohnbereich', description: 'Gemeinsamer Raum für Menschen und Tiere', price: 'Demnächst' },
      notify: 'Benachrichtigen',
      comingSoon: 'Erste Kollektion demnächst'
    },
    values: {
      warmth: { title: 'Wärme', desc: 'Keine Fast Fashion. Nur warme Designs.' },
      companionship: { title: 'Begleitung', desc: 'Jede ruhige Nacht verdient Ernst.' },
      daily: { title: 'Alltag', desc: 'Zurückhaltende Ästhetik. Jeden Tag schätzen.' }
    },
    footer: {
      tagline: 'Haustier-Lifestyle-Marke',
      nav: 'Navigation', contact: 'Kontakt',
      contactText: 'Fragen? Schreiben Sie uns an',
      copyright: '© 2026 Nightfall. Alle Rechte vorbehalten.',
      motto: 'Keinen Tag mit ihnen verschwenden.'
    }
  }
}

// 语言配置
const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' }
]

type LangCode = string

// 检测浏览器语言
function getBrowserLanguage(): LangCode {
  if (typeof window === 'undefined') return 'en'
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.includes('zh')) return 'zh'
  if (browserLang.includes('ja')) return 'ja'
  if (browserLang.includes('ko')) return 'ko'
  if (browserLang.includes('fr')) return 'fr'
  if (browserLang.includes('de')) return 'de'
  return 'en'
}

export default function Home() {
  const [lang, setLang] = useState<LangCode>('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLangTip, setShowLangTip] = useState(true)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const t = translations[lang]

  // 首次访问时检测浏览器语言
  useEffect(() => {
    const savedLang = localStorage.getItem('nightfall_lang')
    if (savedLang && translations[savedLang]) {
      setLang(savedLang)
    } else {
      setLang(getBrowserLanguage())
    }
  }, [])

  const handleLangChange = (newLang: LangCode) => {
    setLang(newLang)
    localStorage.setItem('nightfall_lang', newLang)
    setShowLangDropdown(false)
  }

  const currentLang = languages.find(l => l.code === lang)

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Language Tip Banner */}
      {showLangTip && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-stone-900 text-stone-50 px-6 py-3 text-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <p className="opacity-90">
              🌐 {lang === 'en' ? 'Language available: EN, 中文，日本語，한국어，Français, Deutsch' :
                 lang === 'zh' ? '支持语言：英语、中文、日语、韩语、法语、德语' :
                 lang === 'ja' ? '利用可能言語：英語、中国語、日本語、韓国語、フランス語、ドイツ語' :
                 lang === 'ko' ? '지원 언어: 영어, 중국어, 일본어, 한국어, 프랑스어, 독일어' :
                 lang === 'fr' ? 'Langues: Anglais, Chinois, Japonais, Coréen, Français, Allemand' :
                 'Sprachen: Englisch, Chinesisch, Japanisch, Koreanisch, Französisch, Deutsch'}
            </p>
            <button onClick={() => setShowLangTip(false)} className="text-stone-400 hover:text-stone-50">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed w-full bg-stone-50/80 backdrop-blur-md z-50 border-b border-stone-200/50 transition-all ${showLangTip ? 'top-10' : 'top-0'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-medium text-stone-800">Nightfall</Link>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-stone-600">
              <Link href="#story" className="text-sm hover:text-stone-900 transition-colors">{t.nav.story}</Link>
              <Link href="#products" className="text-sm hover:text-stone-900 transition-colors">{t.nav.products}</Link>
              <Link href="#about" className="text-sm hover:text-stone-900 transition-colors">{t.nav.about}</Link>
            </div>
            <div className="h-5 w-px bg-stone-300" />
            
            {/* Language Dropdown */}
            <div className="relative">
              <button onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-full hover:bg-stone-200/50">
                <Globe size={16} />
                <span className="font-medium">{currentLang?.flag} {currentLang?.native}</span>
                <ChevronDown size={14} className={`transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-stone-200 py-2 z-50">
                  {languages.map((language) => (
                    <button key={language.code} onClick={() => handleLangChange(language.code)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-stone-100">
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{language.flag}</span>
                        <span className={lang === language.code ? 'font-medium' : 'text-stone-600'}>{language.native}</span>
                      </span>
                      {lang === language.code && <Check size={16} className="text-stone-900" />}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-50 border-t border-stone-200/50 py-4">
            <div className="flex flex-col gap-4 px-6">
              <Link href="#story" className="text-stone-600" onClick={() => setMobileMenuOpen(false)}>{t.nav.story}</Link>
              <Link href="#products" className="text-stone-600" onClick={() => setMobileMenuOpen(false)}>{t.nav.products}</Link>
              <Link href="#about" className="text-stone-600" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</Link>
              <div className="pt-4 border-t border-stone-200">
                <p className="text-xs text-stone-500 mb-3 uppercase">Language</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <button key={language.code} onClick={() => handleLangChange(language.code)}
                      className={`px-3 py-1.5 rounded-full text-sm ${lang === language.code ? 'bg-stone-900 text-stone-50' : 'bg-stone-200/50'}`}>
                      {language.flag} {language.native}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-stone-500 text-xs tracking-[0.2em] uppercase mb-6">{t.hero.subtitle}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 mb-8 leading-[1.1] whitespace-pre-line">{t.hero.title}</h1>
          <p className="text-lg text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">{t.hero.description}</p>
          <Link href="#products" className="inline-flex items-center gap-3 bg-stone-900 text-stone-50 px-10 py-4 rounded-full hover:bg-stone-800 transition-all group">
            {t.hero.cta}<ArrowRight size={18} className="group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-24 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-12 text-stone-500">
            <Moon size={20} strokeWidth={1.5} />
            <span className="text-xs tracking-[0.2em] uppercase">{t.story.label}</span>
          </div>
          <div className="space-y-6 text-stone-700 leading-relaxed">
            <p className="text-xl text-stone-800">For a long time, we thought we were the ones giving.</p>
            <p>But we realized something quietly important: sometimes they need us even more.</p>
            <p className="pl-6 border-l-2 border-stone-300 italic">They stay beside us through exhaustion, loneliness, and sleepless nights. They don't rush. They don't ask. They simply stay.</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-16 text-stone-500">
            <HomeIcon size={20} strokeWidth={1.5} />
            <span className="text-xs tracking-[0.2em] uppercase">{t.products.label}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group">
              <div className="aspect-[4/5] bg-stone-100 rounded-sm mb-6 flex items-center justify-center"><span className="text-6xl opacity-50">🌙</span></div>
              <h3 className="text-xl font-serif text-stone-900 mb-2">{t.products.sleepwear.title}</h3>
              <p className="text-stone-500 text-sm mb-3">{t.products.sleepwear.description}</p>
              <p className="text-stone-900 font-medium">{t.products.sleepwear.price}</p>
            </div>
            <div className="group">
              <div className="aspect-[4/5] bg-stone-100 rounded-sm mb-6 flex items-center justify-center"><span className="text-6xl opacity-50">🏠</span></div>
              <h3 className="text-xl font-serif text-stone-900 mb-2">{t.products.homewear.title}</h3>
              <p className="text-stone-500 text-sm mb-3">{t.products.homewear.description}</p>
              <p className="text-stone-500 italic">{t.products.homewear.price}</p>
            </div>
          </div>
          <div className="text-center mt-16">
            <p className="text-stone-500 text-sm mb-6">{t.products.comingSoon}</p>
            <button className="border border-stone-900 px-10 py-4 rounded-full hover:bg-stone-900 hover:text-stone-50 transition-all">{t.products.notify}</button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-200/50 flex items-center justify-center"><Heart size={24} strokeWidth={1.5} className="text-stone-700" /></div>
            <h3 className="font-serif text-xl text-stone-900">{t.values.warmth.title}</h3>
            <p className="text-stone-600 text-sm">{t.values.warmth.desc}</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-200/50 flex items-center justify-center"><Moon size={24} strokeWidth={1.5} className="text-stone-700" /></div>
            <h3 className="font-serif text-xl text-stone-900">{t.values.companionship.title}</h3>
            <p className="text-stone-600 text-sm">{t.values.companionship.desc}</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-200/50 flex items-center justify-center"><HomeIcon size={24} strokeWidth={1.5} className="text-stone-700" /></div>
            <h3 className="font-serif text-xl text-stone-900">{t.values.daily.title}</h3>
            <p className="text-stone-600 text-sm">{t.values.daily.desc}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-16 px-6 bg-stone-900 text-stone-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div><h4 className="font-serif text-2xl text-stone-50 mb-4">Nightfall</h4><p className="text-sm">{t.footer.tagline}</p></div>
            <div><h5 className="text-stone-50 mb-4 text-sm uppercase">{t.footer.nav}</h5><ul className="space-y-3 text-sm"><li><Link href="#story" className="hover:text-stone-50">{t.nav.story}</Link></li><li><Link href="#products" className="hover:text-stone-50">{t.nav.products}</Link></li><li><Link href="#about" className="hover:text-stone-50">{t.nav.about}</Link></li></ul></div>
            <div><h5 className="text-stone-50 mb-4 text-sm uppercase">{t.footer.contact}</h5><p className="text-sm">{t.footer.contactText}<br /><a href="mailto:hello@nightfall.pet" className="text-stone-300">hello@nightfall.pet</a></p></div>
          </div>
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-stone-500">{t.footer.copyright}</p>
            <p className="text-stone-600 italic">{t.footer.motto}</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
