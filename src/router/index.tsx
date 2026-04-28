import { createHashRouter } from 'react-router-dom'
import Gallery from '../pages/Gallery'
import ProjectPage from '../pages/ProjectPage'

const router = createHashRouter([
  {
    path: '/',
    element: <Gallery />,
  },
  {
    path: '/project/:id',
    element: <ProjectPage />,
  },
])

export default router
