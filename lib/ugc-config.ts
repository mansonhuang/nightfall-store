// UGC系统配置 - 与网站设计系统完全集成

// 颜色系统 - 与网站完全一致
export const colors = {
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917'
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  }
}

// 间距系统 - 与网站完全一致
export const spacing = {
  section: 'py-32', // 与网站section间距一致
  container: 'px-6', // 与网站容器间距一致
  card: 'p-6', // 与网站卡片间距一致
  title: 'mb-6', // 与网站标题间距一致
  grid: 'gap-8' // 与网站网格间距一致
}

// 字体系统 - 与网站完全一致
export const typography = {
  title: 'text-4xl md:text-5xl font-serif',
  subtitle: 'text-lg text-stone-600',
  body: 'text-stone-700 leading-relaxed',
  small: 'text-sm text-stone-500'
}

// 动画系统 - 与网站完全一致
export const animations = {
  section: 'transition-all duration-1000',
  card: 'transition-all duration-300 hover:shadow-lg',
  image: 'transition-transform duration-500 group-hover:scale-105'
}

// UGC设计规范
export const ugcDesign = {
  // 背景 - 与网站section背景一致
  background: 'bg-white/80 backdrop-blur-sm',
  
  // 边框 - 与网站边框一致
  border: 'border border-stone-200/50',
  
  // 圆角 - 与网站卡片一致
  borderRadius: 'rounded-2xl',
  
  // 阴影 - 与网站卡片一致
  shadow: 'shadow-sm hover:shadow-md',
  
  // 渐变 - 与网站渐变一致
  gradient: 'bg-gradient-to-r from-amber-50/50 to-stone-50/50'
}

// 导出完整配置
export const siteDesignSystem = {
  colors,
  spacing,
  typography,
  animations,
  ugcDesign
}