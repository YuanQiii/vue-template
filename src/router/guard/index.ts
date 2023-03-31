import type { Router, RouteRecordRaw } from 'vue-router'

import { createPermissionGuard } from './permissionGuard'

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
}
