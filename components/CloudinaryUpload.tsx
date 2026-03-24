'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface CloudinaryUploadProps {
  onUploadComplete: (url: string) => void
  onUploadError?: (error: string) => void
}

export default function CloudinaryUpload({ onUploadComplete, onUploadError }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Cloudinary配置（在生产环境中应该从环境变量读取）
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'nightfall_ugc'

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      setError('仅支持 JPG、PNG、WebP、GIF 格式')
      return
    }

    // 验证文件大小 (5MB限制)
    if (file.size > 5 * 1024 * 1024) {
      setError('图片大小不能超过 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      // 创建预览
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)

      // 准备上传数据
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      formData.append('folder', 'nightfall/ugc')
      formData.append('tags', 'user_generated,pet_lifestyle')

      // 上传到Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (data.secure_url) {
        onUploadComplete(data.secure_url)
        // 清理预览URL
        URL.revokeObjectURL(preview)
      } else {
        throw new Error(data.error?.message || '上传失败')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '上传失败，请重试'
      setError(errorMessage)
      onUploadError?.(errorMessage)
      
      // 清理预览
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl('')
      }
    } finally {
      setUploading(false)
      // 重置文件输入
      event.target.value = ''
    }
  }, [cloudName, uploadPreset, onUploadComplete, onUploadError, previewUrl])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    // 创建临时input元素来触发handleFileSelect
    const tempInput = document.createElement('input')
    tempInput.type = 'file'
    tempInput.accept = 'image/jpeg,image/png,image/webp,image/gif'
    
    // 创建DataTransfer来设置文件
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    tempInput.files = dataTransfer.files
    
    // 创建模拟事件
    const event = new Event('change', { bubbles: true }) as unknown as React.ChangeEvent<HTMLInputElement>
    Object.defineProperty(event, 'target', { value: tempInput })
    
    await handleFileSelect(event)
  }, [handleFileSelect])

  const clearPreview = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
    }
    setError('')
  }, [previewUrl])

  return (
    <div className="space-y-4">
      {/* 上传区域 */}
      <div
        className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
          uploading ? 'border-amber-500 bg-amber-50' :
          error ? 'border-red-300 bg-red-50' :
          'border-stone-300 hover:border-stone-400 bg-white'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="cloudinary-upload"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <div className="p-8 text-center">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="预览"
                className="mx-auto max-h-64 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={clearPreview}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-100"
              >
                <X size={16} className="text-stone-600" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                {uploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-600"></div>
                ) : (
                  <Upload size={24} className="text-stone-600" />
                )}
              </div>
              <p className="text-stone-700 font-medium mb-2">
                {uploading ? '上传中...' : '点击或拖放图片到这里'}
              </p>
              <p className="text-sm text-stone-500">
                支持 JPG、PNG、WebP、GIF 格式，最大 5MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* 上传提示 */}
      {!error && !uploading && (
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
          <p className="text-sm text-stone-600">
            <strong>提示：</strong>上传的图片将自动优化，并存储在安全的云存储中
          </p>
        </div>
      )}

      {/* Cloudinary品牌标识（可选） */}
      <div className="text-center">
        <p className="text-xs text-stone-400">
          由 Cloudinary 提供图片存储服务
        </p>
      </div>
    </div>
  )
}