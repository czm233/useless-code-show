import { useParams, useNavigate } from 'react-router-dom'
import projects from '../data/projects.json'

/** 子项目详情页 - 使用 iframe 嵌入子项目 */
export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // 根据 id 查找项目数据
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-400 mb-6">项目未找到</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  // 计算 iframe 的资源路径
  // 开发和生产环境都通过 vite base URL 访问
  const iframeSrc = `${import.meta.env.BASE_URL}projects/${project.path}/index.html`

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white">
      {/* 顶部导航栏 */}
      <header className="flex-shrink-0 px-6 py-3 border-b border-gray-800 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xl">&larr;</span>
          <span>返回画廊</span>
        </button>
        <div className="h-5 w-px bg-gray-700" />
        <h1 className="text-lg font-semibold">{project.title}</h1>
        <div className="flex gap-2 ml-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-800 text-gray-400 border border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* iframe 嵌入区域 - 占满剩余空间 */}
      <div className="flex-1 relative">
        <iframe
          src={iframeSrc}
          title={project.title}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; fullscreen"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  )
}
