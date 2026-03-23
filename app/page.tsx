'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Moon, Heart, Home as HomeIcon, ArrowRight, Globe, Menu, X } from 'lucide-react'

// 多语言内容
const translations = {
  en: {
    nav: { story: 'Story', products: 'Products', about: 'About' },
    hero: {
      subtitle: 'We live with cats. We live with dogs.',
      title: 'Everyday Companionship,\nTaken Seriously',
      description: 'A pet lifestyle brand that transcends species, focused solely on companionship. Not wasting a single day with them.',
      cta: 'Explore Collection'
    },
    story: {
      label: 'Brand Story',
      content: [
        'For a long time, we thought we were the ones giving — food, shelter, care, and safety.',
        'But somewhere along the way, we realized something quietly important.',
        'Sometimes, we think we need our pets. But more often, they need us even more.',
        'They stay beside us through exhaustion, loneliness, sleepless nights, and moments we don\'t know how to explain. They don\'t rush us. They don\'t ask questions. They simply stay.',
        'An animal\'s life is short. Short enough that every ordinary day matters. We didn\'t want to waste those days — especially the quiet ones. The evenings. The moments of doing nothing together.',
        'Sleepwear is the clothing closest to human skin. It\'s what we wear when we finally let our guard down. We believe our companions deserve the same softness, comfort, and sense of being chosen.',
        'Not for photos. Not for trends. But for warmth. For closeness. For being there.'
      ]
    },
    products: {
      label: 'Collection',
      sleepwear: {
        title: 'Classic Pet Sleepwear',
        description: 'Soft, skin-friendly. A nighttime companionship solution.',
        price: '$32 - $48'
      },
      homewear: {
        title: 'Home Sharing Collection',
        description: 'Shared emotional space for humans and pets.',
        price: 'Coming Soon'
      },
      notify: 'Notify on Launch',
      comingSoon: 'First collection launching soon'
    },
    values: {
      warmth: { title: 'Warmth', desc: 'No fast fashion, no trends. Only genuinely warm designs.' },
      companionship: { title: 'Companionship', desc: 'Every quiet night deserves to be taken seriously.' },
      daily: { title: 'Daily', desc: 'Restrained aesthetics. Cherishing every day together.' }
    },
    footer: {
      tagline: 'A pet lifestyle brand focused on companionship',
      nav: 'Navigation',
      contact: 'Contact',
      contactText: 'Questions or suggestions? Reach out at',
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
    story: {
      label: 'Brand Story',
      content: [
        '很长一段时间里，我们以为是我们它们在给予——食物、住所、照顾和安全。',
        '但在某个不经意的时刻，我们意识到一件安静而重要的事。',
        '有时，我们以为我们需要宠物。但更多时候，它们更需要我们。',
        '它们陪伴我们度过疲惫、孤独、失眠的夜晚，和那些不知如何言说的时刻。它们不催促，不追问，只是静静地待在我们身边。',
        '动物的生命很短，短到每一个平凡的日子都值得珍惜。我们不想浪费那些时光——尤其是那些安静的夜晚，一起无所事事的时刻。',
        '睡衣是离皮肤最近的衣物，是我们卸下防备时的选择。我们相信，我们的伴侣也值得同样的柔软、舒适和被选择的感觉。',
        '不是为了拍照，不是为了潮流，而是为了温暖，为了亲密，为了陪伴。'
      ]
    },
    products: {
      label: '产品系列',
      sleepwear: {
        title: '经典宠物睡衣',
        description: '柔软亲肤，夜晚的陪伴解决方案',
        price: '$32 - $48'
      },
      homewear: {
        title: '居家共享系列',
        description: '人宠共用的情绪空间',
        price: '即将推出'
      },
      notify: '订阅上新提醒',
      comingSoon: '首批产品即将上线'
    },
    values: {
      warmth: { title: '温暖', desc: '不追求热点与爆款，只做真正温暖的设计' },
      companionship: { title: '陪伴', desc: '不分物种，每一个安静的夜晚都值得被认真对待' },
      daily: { title: '日常', desc: '克制的美学，珍惜在一起的每一天' }
    },
    footer: {
      tagline: '一个不分物种、只讲陪伴的宠物生活方式品牌',
      nav: '导航',
      contact: '联系',
      contactText: '有任何问题或建议，欢迎联系',
      copyright: '© 2026 Nightfall. All rights reserved.',
      motto: '不浪费和它们在一起的每一天'
    }
  }
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLangTip, setShowLangTip] = useState(true)
  const t = translations[lang]

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Language Tip Banner */}
      {showLangTip && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-stone-900 text-stone-50 px-6 py-3 text-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <p className="opacity-90">
              {lang === 'en' ? '🌐 Language switch available' : '🌐 右上角可切换语言'}
            </p>
            <button
              onClick={() => setShowLangTip(false)}
              className="text-stone-400 hover:text-stone-50 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed w-full bg-stone-50/80 backdrop-blur-md z-50 border-b border-stone-200/50 transition-all duration-300 ${showLangTip ? 'top-10' : 'top-0'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-serif font-medium text-stone-800 tracking-tight">
              Nightfall
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-8 text-stone-600">
                <Link href="#story" className="text-sm hover:text-stone-900 transition-colors duration-300">
                  {t.nav.story}
                </Link>
                <Link href="#products" className="text-sm hover:text-stone-900 transition-colors duration-300">
                  {t.nav.products}
                </Link>
                <Link href="#about" className="text-sm hover:text-stone-900 transition-colors duration-300">
                  {t.nav.about}
                </Link>
              </div>
              <div className="h-4 w-px bg-stone-300" />
              <button
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-all px-3 py-1.5 rounded-full hover:bg-stone-200/50"
                title={lang === 'en' ? 'Switch to Chinese' : 'Switch to English'}
              >
                <Globe size={16} />
                <span className="font-medium">{lang === 'en' ? '中文' : 'EN'}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-stone-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-50 border-t border-stone-200/50 py-4">
            <div className="flex flex-col gap-4 px-6">
              <Link href="#story" className="text-stone-600" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.story}
              </Link>
              <Link href="#products" className="text-stone-600" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.products}
              </Link>
              <Link href="#about" className="text-stone-600" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.about}
              </Link>
              <button
                onClick={() => { setLang(lang === 'en' ? 'zh' : 'en'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-all px-3 py-2 rounded-full hover:bg-stone-200/50"
              >
                <Globe size={16} />
                <span className="font-medium">{lang === 'en' ? '切换到中文' : 'Switch to English'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-stone-500 text-xs tracking-[0.2em] uppercase mb-6 animate-fade-in">
            {t.hero.subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 mb-8 leading-[1.1] whitespace-pre-line">
            {t.hero.title}
          </h1>
          <p className="text-lg text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
          <Link
            href="#products"
            className="inline-flex items-center gap-3 bg-stone-900 text-stone-50 px-10 py-4 rounded-full hover:bg-stone-800 transition-all duration-300 group"
          >
            {t.hero.cta}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Brand Story */}
      <section id="story" className="py-24 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-12 text-stone-500">
            <Moon size={20} strokeWidth={1.5} />
            <span className="text-xs tracking-[0.2em] uppercase">{t.story.label}</span>
          </div>
          
          <div className="space-y-8 text-stone-700 leading-relaxed">
            {t.story.content.map((paragraph, index) => (
              <p
                key={index}
                className={`text-lg ${
                  index === 2 ? 'pl-6 border-l-2 border-stone-300 italic text-stone-600' : ''
                } ${index === 0 ? 'text-xl text-stone-800' : ''}`}
              >
                {paragraph}
              </p>
            ))}
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
            {/* Product 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-stone-100 rounded-sm mb-6 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-50">🌙</span>
                </div>
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2">{t.products.sleepwear.title}</h3>
              <p className="text-stone-500 mb-3 text-sm">{t.products.sleepwear.description}</p>
              <p className="text-stone-900 font-medium">{t.products.sleepwear.price}</p>
            </div>

            {/* Product 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-stone-100 rounded-sm mb-6 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-50">🏠</span>
                </div>
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2">{t.products.homewear.title}</h3>
              <p className="text-stone-500 mb-3 text-sm">{t.products.homewear.description}</p>
              <p className="text-stone-500 font-medium italic">{t.products.homewear.price}</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-stone-500 text-sm mb-6">{t.products.comingSoon}</p>
            <button className="inline-flex items-center gap-2 border border-stone-900 text-stone-900 px-10 py-4 rounded-full hover:bg-stone-900 hover:text-stone-50 transition-all duration-300">
              {t.products.notify}
            </button>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-stone-200/50">
                <Heart size={24} strokeWidth={1.5} className="text-stone-700" />
              </div>
              <h3 className="font-serif text-xl text-stone-900">{t.values.warmth.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.values.warmth.desc}</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-stone-200/50">
                <Moon size={24} strokeWidth={1.5} className="text-stone-700" />
              </div>
              <h3 className="font-serif text-xl text-stone-900">{t.values.companionship.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.values.companionship.desc}</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-stone-200/50">
                <HomeIcon size={24} strokeWidth={1.5} className="text-stone-700" />
              </div>
              <h3 className="font-serif text-xl text-stone-900">{t.values.daily.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.values.daily.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-16 px-6 bg-stone-900 text-stone-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="font-serif text-2xl text-stone-50 mb-4">Nightfall</h4>
              <p className="text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>
            <div>
              <h5 className="text-stone-50 mb-4 text-sm tracking-wider uppercase">{t.footer.nav}</h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="#story" className="hover:text-stone-50 transition-colors">{t.nav.story}</Link></li>
                <li><Link href="#products" className="hover:text-stone-50 transition-colors">{t.nav.products}</Link></li>
                <li><Link href="#about" className="hover:text-stone-50 transition-colors">{t.nav.about}</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-stone-50 mb-4 text-sm tracking-wider uppercase">{t.footer.contact}</h5>
              <p className="text-sm leading-relaxed">
                {t.footer.contactText}<br />
                <a href="mailto:hello@nightfall.pet" className="text-stone-300 hover:text-stone-50 transition-colors">
                  hello@nightfall.pet
                </a>
              </p>
            </div>
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
