export default {
  services: {
    permission: 'iads.services.manage',
    activated: true,//
    path: '/qad/services/index',
    name: 'qad.admin.services.index',//
    page: () => import('@imagina/qad/_layouts/admin/services/index'),
    layout: () => import('src/layouts/admin'),
    title: 'qad.sidebar.admin.services',
    icon: 'fas fa-store',
    authenticated: true
  },
  categories: {
    permission: 'iads.categories.manage',
    activated: true,//
    path: '/qad/categories/index',
    name: 'qad.admin.categories.index',//
    page: () => import('@imagina/qad/_layouts/admin/categories/index'),
    layout: () => import('src/layouts/admin'),
    title: 'qad.sidebar.admin.categories',
    icon: 'fas fa-store',
    authenticated: true
  },

}
