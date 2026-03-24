#!/bin/bash

echo "🚀 启动Nightfall Store（支持远程访问）"
echo "======================================"

cd /root/.openclaw/workspace/nightfall-store

# 停止现有进程
pkill -f "next dev" 2>/dev/null

# 设置环境变量，允许远程访问
export HOST=0.0.0.0
export NEXT_PUBLIC_API_URL=http://$(hostname -I | awk '{print $1}'):3001

echo "🌐 绑定地址: 0.0.0.0:3001"
echo "🔗 内网访问: http://10.0.0.15:3001"
echo "🌍 公网访问: http://101.43.89.27:3001"
echo "🔑 管理后台: http://101.43.89.27:3001/admin/ugc (密码: nightfall2026)"
echo ""

# 启动服务
npm run dev -- -H 0.0.0.0