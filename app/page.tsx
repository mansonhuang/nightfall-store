import Link from 'next/link'
import { Moon, Heart, Home as HomeIcon, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-nightfall-50/90 backdrop-blur-sm z-50 border-b border-nightfall-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-bold text-nightfall-800">
            Nightfall
          </Link>
          <div className="flex gap-8 text-nightfall-700">
            <Link href="#story" className="hover:text-nightfall-900 transition">品牌故事</Link>
            <Link href="#products" className="hover:text-nightfall-900 transition">产品</Link>
            <Link href="#about" className="hover:text-nightfall-900 transition">关于</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-nightfall-100 to-nightfall-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-nightfall-600 text-sm tracking-widest uppercase mb-4">
            We live with cats. We live with dogs.
          </p>
          <h1 className="text-5xl md:text-6xl font-serif text-nightfall-900 mb-6 leading-tight">
            被认真对待的<br/>日常陪伴
          </h1>
          <p className="text-lg text-nightfall-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            一个不分物种、只讲陪伴的宠物生活方式品牌。<br/>
            不浪费和它们在一起的每一天。
          </p>
          <Link 
            href="#products" 
            className="inline-flex items-center gap-2 bg-nightfall-800 text-nightfall-50 px-8 py-3 rounded-full hover:bg-nightfall-900 transition"
          >
            探索产品
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Brand Story */}
      <section id="story" className="py-20 px-6 bg-nightfall-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8 text-nightfall-700">
            <Moon size={24} />
            <span className="text-sm tracking-widest uppercase">Brand Story</span>
          </div>
          
          <div className="prose prose-lg text-nightfall-800 leading-relaxed space-y-6">
            <p className="text-xl">
              很长一段时间里，我们以为是我们它们在给予——食物、住所、照顾和安全。
            </p>
            <p>
              但在某个不经意的时刻，我们意识到一件安静而重要的事：
            </p>
            <p className="pl-6 border-l-2 border-nightfall-300">
              有时，我们以为我们需要宠物。<br/>
              但更多时候，它们更需要我们。
            </p>
            <p>
              它们陪伴我们度过疲惫、孤独、失眠的夜晚，和那些不知如何言说的时刻。<br/>
              它们不催促，不追问，只是静静地待在我们身边。
            </p>
            <p>
              动物的生命很短，短到每一个平凡的日子都值得珍惜。<br/>
              我们不想浪费那些时光——尤其是那些安静的夜晚，一起无所事事的时刻。
            </p>
            <p className="text-nightfall-600 italic">
              睡衣是离皮肤最近的衣物，是我们卸下防备时的选择。<br/>
              我们相信，我们的伴侣也值得同样的柔软、舒适和被选择的感觉。<br/>
              不是为了拍照，不是为了潮流，而是为了温暖，为了亲密，为了陪伴。
            </p>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section id="products" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12 text-nightfall-700">
            <HomeIcon size={24} />
            <span className="text-sm tracking-widest uppercase">Products</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Card 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-square bg-nightfall-100 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-nightfall-400">
                  <span className="text-6xl">🌙</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-nightfall-900 mb-2">经典宠物睡衣系列</h3>
              <p className="text-nightfall-600 mb-3">柔软亲肤，夜晚的陪伴解决方案</p>
              <p className="text-nightfall-800 font-medium">$32 - $48</p>
            </div>

            {/* Product Card 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-square bg-nightfall-100 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-nightfall-400">
                  <span className="text-6xl">🏠</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-nightfall-900 mb-2">居家共享系列</h3>
              <p className="text-nightfall-600 mb-3">人宠共用的情绪空间（即将推出）</p>
              <p className="text-nightfall-800 font-medium">Coming Soon</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-nightfall-600 text-sm mb-4">首批产品即将上线</p>
            <button className="inline-flex items-center gap-2 border-2 border-nightfall-800 text-nightfall-800 px-8 py-3 rounded-full hover:bg-nightfall-800 hover:text-nightfall-50 transition">
              订阅上新提醒
            </button>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-20 px-6 bg-nightfall-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Heart className="w-12 h-12 mx-auto mb-4 text-nightfall-700" />
              <h3 className="font-serif text-lg text-nightfall-900 mb-2">温暖</h3>
              <p className="text-nightfall-600 text-sm">
                不追求热点与爆款，只做真正温暖的设计
              </p>
            </div>
            <div className="p-6">
              <Moon className="w-12 h-12 mx-auto mb-4 text-nightfall-700" />
              <h3 className="font-serif text-lg text-nightfall-900 mb-2">陪伴</h3>
              <p className="text-nightfall-600 text-sm">
                不分物种，每一个安静的夜晚都值得被认真对待
              </p>
            </div>
            <div className="p-6">
              <HomeIcon className="w-12 h-12 mx-auto mb-4 text-nightfall-700" />
              <h3 className="font-serif text-lg text-nightfall-900 mb-2">日常</h3>
              <p className="text-nightfall-600 text-sm">
                克制的美学，珍惜在一起的每一天
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 px-6 bg-nightfall-900 text-nightfall-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-serif text-xl text-nightfall-50 mb-4">Nightfall</h4>
              <p className="text-sm leading-relaxed">
                一个不分物种、只讲陪伴的宠物生活方式品牌
              </p>
            </div>
            <div>
              <h5 className="text-nightfall-50 mb-3">导航</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#story" className="hover:text-nightfall-50 transition">品牌故事</Link></li>
                <li><Link href="#products" className="hover:text-nightfall-50 transition">产品系列</Link></li>
                <li><Link href="#about" className="hover:text-nightfall-50 transition">关于我们</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-nightfall-50 mb-3">联系</h5>
              <p className="text-sm leading-relaxed">
                有任何问题或建议，欢迎联系我们<br/>
                hello@nightfall.pet
              </p>
            </div>
          </div>
          <div className="border-t border-nightfall-700 pt-8 text-center text-sm">
            <p>&copy; 2026 Nightfall. All rights reserved.</p>
            <p className="mt-2 text-nightfall-400">不浪费和它们在一起的每一天</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
