import { useState, useMemo } from 'react'
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

/** 空状态组件 */
function EmptyState({ keyword }: { keyword: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      {/* 搜索无结果图标 */}
      <svg
        className="w-16 h-16 mb-4 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <p className="text-lg mb-1">没有找到匹配的项目</p>
      {keyword && (
        <p className="text-sm text-gray-600">
          未找到与 "{keyword}" 相关的结果
        </p>
      )}
    </div>
  )
}

/** 主页画廊 */
export default function Gallery() {
  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState('')
  // 当前选中的标签，null 表示"全部"
  const [activeTag, setActiveTag] = useState<string | null>(null)

  // 从所有项目中提取去重后的标签列表
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet)
  }, [])

  // 根据标签和搜索词过滤项目
  const filteredProjects = useMemo(() => {
    let result = projects

    // 先按标签过滤
    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag))
    }

    // 再按搜索词过滤（匹配 title 和 description）
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword)
      )
    }

    return result
  }, [activeTag, searchKeyword])

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

      {/* 搜索和标签过滤区域 */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        {/* 搜索框 */}
        <div className="relative mb-5">
          {/* 搜索图标 */}
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索项目..."
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors"
          />
          {/* 清除按钮：有输入内容时显示 */}
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="清除搜索"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* 标签过滤按钮 */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* "全部"标签按钮 */}
          <button
            onClick={() => setActiveTag(null)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTag === null
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            全部
          </button>
          {/* 各标签按钮 */}
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setActiveTag(activeTag === tag ? null : tag)
              }
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 画廊网格 */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState keyword={searchKeyword} />
        )}
      </main>

      {/* 底部 */}
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-gray-900">
        <p>Made with &hearts; and useless code</p>
      </footer>
    </div>
  )
}
