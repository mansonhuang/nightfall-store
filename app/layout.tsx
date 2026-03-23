import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nightfall | 被认真对待的日常陪伴',
  description: '一个不分物种、只讲陪伴的宠物生活方式品牌。不浪费和它们在一起的每一天。',
  keywords: ['宠物睡衣', '宠物用品', '宠物生活方式', 'cat', 'dog', 'pet sleepwear'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
