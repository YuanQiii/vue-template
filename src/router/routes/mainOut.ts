/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '@/router/types'

// 主要框架外的页面
export const MainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    // component: () => import('@/views/demo/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
]

export const mainOutRouteNames = MainOutRoutes.map((item) => item.name)
