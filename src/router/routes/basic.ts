import type { AppRouteRecordRaw } from '@/router/types'

import { PageEnum } from '@/enums/pageEnum'

// 登录页面路由
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: 'login',
    // title: t('routes.basic.login'),
  },
}

// 404页面路由
export const PageNotFoundRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: () => import('@/layouts/default/index.vue'),
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: () => import('@/views/sys/exception/Exception.vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
}

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}
