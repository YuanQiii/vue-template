import type { Router, RouteRecordRaw } from 'vue-router'

import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useUserStoreWithOut } from '@/store/modules/user'

import { PageNotFoundRoute } from '@/router/routes/basic'

import { PageEnum } from '@/enums/pageEnum'

import { WHITE_NAME_LIST } from '@/router'

const LOGIN_PATH = PageEnum.BASE_LOGIN

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken

    //  白名单，已经登录进入登录页面，直接执行登录后的逻辑，不跳转到登录页面
    if (WHITE_NAME_LIST.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.afterLoginAction()
          //  登录未过期，重定向到根路由
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/')
            return
          }
        } catch {}
      }
      //   登录过期，直接跳转到登录页面
      next()
      return
    }

    // token不存在
    if (!token) {
      //   路由不需要权限
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // 前往的页面需要登录，先跳转到登录页面，redirect参数存储前往的页面，登录后跳转redirect参数页面
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      }
      //  在redirect参数后面拼接前往的页面的路由参数
      if (to.path) {
        redirectData.query = {
          redirect: to.path,
          ...to.query,
        }
      }
      next(redirectData)
      return
    }

    // 更新用户信息
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    // 已经生成路由
    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    // 生成路由
    const routes = await permissionStore.buildRoutesAction()
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })
    router.addRoute(PageNotFoundRoute as unknown as RouteRecordRaw)

    permissionStore.setDynamicAddedRoute(true)

    // 动态添加路由后，to匹配的为404页面，应当重定向到fullPath，否则会加载404页面内容
    const redirectPath = (from.query.redirect || to.path) as string
    // 登录后重定向的路由参数
    const redirect = decodeURIComponent(redirectPath)
    next({ path: redirect || to.fullPath, replace: true, query: to.query })
  })
}
