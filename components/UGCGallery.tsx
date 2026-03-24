'use client'

export default function UGCGallery() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #fafaf9, white)', paddingTop: '2rem', paddingBottom: '5rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#78716c' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: 'linear-gradient(to bottom right, rgba(253, 230, 138, 0.8), rgba(245, 245, 244, 0.8))', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', border: '1px solid rgba(231, 229, 228, 0.5)' }}>
              <span style={{ fontSize: '1.5rem' }}>❤️</span>
            </div>
            <span style={{ fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500' }}>Community Love</span>
          </div>
          <h2 style={{ fontSize: '2.25rem', fontFamily: 'serif', color: '#1c1917', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            宠物家长的真实分享
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#78716c', maxWidth: '42rem', margin: '0 auto', lineHeight: '1.75' }}>
            看看其他宠物家长如何与他们的毛孩子享受Nightfall带来的温暖时光
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(231, 229, 228, 0.5)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1c1917', marginBottom: '1rem' }}>总分享数</h3>
            <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1c1917' }}>128</p>
            <p style={{ fontSize: '0.875rem', color: '#78716c', marginTop: '0.5rem' }}>持续增长的温暖社区</p>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(231, 229, 228, 0.5)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1c1917', marginBottom: '1rem' }}>今日新增</h3>
            <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1c1917' }}>12</p>
            <p style={{ fontSize: '0.875rem', color: '#78716c', marginTop: '0.5rem' }}>今日新增分享</p>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(231, 229, 228, 0.5)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1c1917', marginBottom: '1rem' }}>热门趋势</h3>
            <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1c1917' }}>89</p>
            <p style={{ fontSize: '0.875rem', color: '#78716c', marginTop: '0.5rem' }}>最高点赞记录</p>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(to right, rgba(255, 251, 235, 0.5), rgba(250, 250, 249, 0.5))', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(253, 230, 138, 0.5)' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.875rem', fontFamily: 'serif', color: '#1c1917', marginBottom: '1rem' }}>社区准则</h3>
            <p style={{ color: '#78716c', maxWidth: '42rem', margin: '0 auto' }}>
              我们相信温暖的社区需要共同的准则来维护
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}