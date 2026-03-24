import { NextRequest, NextResponse } from 'next/server'

// 模拟数据库
let ugcItems = [
  {
    id: 1,
    username: '猫奴小张',
    avatar: '🐱',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    caption: '我家喵星人超爱Nightfall的睡衣！睡得特别香～',
    likes: 42,
    comments: 8,
    timestamp: '2小时前',
    tags: ['#猫咪', '#睡衣', '#舒适']
  },
  {
    id: 2,
    username: '汪星人守护者',
    avatar: '🐶',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80',
    caption: '狗狗第一次穿睡衣，居然不抗拒！材质真的很柔软',
    likes: 56,
    comments: 12,
    timestamp: '5小时前',
    tags: ['#狗狗', '#第一次', '#柔软']
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
    tags: ['#多宠', '#温馨', '#夜晚']
  }
]

export async function GET(request: NextRequest) {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')
  
  const items = ugcItems.slice(offset, offset + limit)
  
  return NextResponse.json({
    success: true,
    data: items,
    pagination: {
      total: ugcItems.length,
      limit,
      offset,
      hasMore: offset + limit < ugcItems.length
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证必要字段
    if (!body.image || !body.caption) {
      return NextResponse.json(
        { success: false, error: '图片和描述是必填项' },
        { status: 400 }
      )
    }
    
    // 创建新项目
    const newItem = {
      id: ugcItems.length + 1,
      username: body.username || '匿名用户',
      avatar: body.username ? '👤' : '😊',
      image: body.image,
      caption: body.caption,
      likes: 0,
      comments: 0,
      timestamp: '刚刚',
      tags: body.tags || []
    }
    
    // 添加到"数据库"
    ugcItems.unshift(newItem)
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      data: newItem,
      message: '分享成功！感谢你的参与～'
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, action } = body
    
    if (!id || !action) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      )
    }
    
    const itemIndex = ugcItems.findIndex(item => item.id === id)
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: '内容不存在' },
        { status: 404 }
      )
    }
    
    // 处理点赞/取消点赞
    if (action === 'like') {
      ugcItems[itemIndex].likes += 1
    } else if (action === 'unlike') {
      ugcItems[itemIndex].likes = Math.max(0, ugcItems[itemIndex].likes - 1)
    }
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return NextResponse.json({
      success: true,
      data: ugcItems[itemIndex],
      message: action === 'like' ? '点赞成功' : '取消点赞成功'
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    )
  }
}