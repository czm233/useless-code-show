import { useNavigate } from 'react-router-dom'
import projects from '../data/projects.json'

/** 项目卡片组件 */
function ProjectCard({
  project,
}: {
  project: (typeof projects)[number]
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/project/${project.id}`)
  }

  // 生成渐变色预览样式
  const gradientStyle = {
    background: `linear-gradient(135deg, ${project.preview.colors[0]}, ${project.preview.colors[1]})`,
  }

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/10 hover:border-gray-700"
    >
      {/* 预览区域 */}
      <div
        className="h-48 w-full flex items-center justify-center"
        style={gradientStyle}
      >
        <span className="text-white/80 text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          &rarr;
        </span>
      </div>

      {/* 内容区域 */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** 主页画廊 */
export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* 顶部标题区 */}
      <header className="pt-16 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          Useless Code Show
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          无用代码展览馆 — 收集互联网上最没用的代码作品
        </p>
      </header>

      {/* 画廊网格 */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      {/* 底部 */}
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-gray-900">
        <p>Made with &hearts; and useless code</p>
      </footer>
    </div>
  )
}
