export default {
  services: {
    permission: 'iads.services.manage',
    activated: true,//
    path: '/qad/services/index',
    name: 'qad.admin.services.index',//
    page: () => import('@imagina/qad/_layouts/admin/services/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
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
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.admin.categories',
    icon: 'fas fa-store',
    authenticated: true
  },
  ads: {
    permission: 'iads.ads.manage',
    activated: true,//
    path: '/qad/ads/index',
    name: 'qad.admin.ads.index',//
    page: () => import('@imagina/qad/_layouts/admin/ads/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.admin.ads',
    icon: 'fas fa-store',
    authenticated: true,
    subHeader : {
      refresh : true
    }
  },
  adsEdit:{
    activated: true,
    path: '/qad/ads/edit/:id',
    name: 'qad.admin.ads.edit',
    page: () => import('@imagina/qad/_layouts/admin/ads/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.admin.ads',
    icon: 'fas fa-store',
    authenticated: true,
  },

}
