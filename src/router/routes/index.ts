import type { AppRouteModule } from '@/router/types'

import { PageNotFoundRoute, LoginRoute } from '@/router/routes/basic'
import { MainOutRoutes } from './mainOut'

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
// 引入所有路由模块文件
const modules = import.meta.glob('./modules/**/*.ts', { eager: true, import: 'default' })
const routeModuleList: AppRouteModule[] = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// 异步路由集合
export const asyncRoutes = [PageNotFoundRoute, ...routeModuleList, ...MainOutRoutes]

// 没有权限的基本路由
export const basicRoutes = [LoginRoute]
