'use client'

export default function UGCGallery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 text-stone-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100/80 to-stone-100/80 flex items-center justify-center backdrop-blur-sm border border-stone-200/50">
              <span className="text-2xl">❤️</span>
            </div>
            <span className="text-sm tracking-[0.2em] uppercase font-medium">Community Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
            宠物家长的真实分享
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            看看其他宠物家长如何与他们的毛孩子享受Nightfall带来的温暖时光
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/50 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">总分享数</h3>
            <p className="text-3xl font-bold text-stone-900">128</p>
            <p className="text-sm text-stone-500 mt-2">持续增长的温暖社区</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/50 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">今日新增</h3>
            <p className="text-3xl font-bold text-stone-900">12</p>
            <p className="text-sm text-stone-500 mt-2">今日新增分享</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/50 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">热门趋势</h3>
            <p className="text-3xl font-bold text-stone-900">89</p>
            <p className="text-sm text-stone-500 mt-2">最高点赞记录</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50/50 to-stone-50/50 rounded-2xl p-8 md:p-12 border border-amber-100/50">
          <div className="text-center">
            <h3 className="text-3xl font-serif text-stone-900 mb-4">社区准则</h3>
            <p className="text-stone-600 max-w-2xl mx-auto">
              我们相信温暖的社区需要共同的准则来维护
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}