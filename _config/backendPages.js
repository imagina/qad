export default {
  ads: {
    permission: 'iad.ads.manage',
    activated: true,
    path: '/ad/ads/index',
    name: 'qad.admin.ads.index',
    crud: import('@imagina/qad/_crud/ads'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminAds',
    icon: 'fas fa-bullhorn',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  adsCreate: {
    permission: 'iad.ads.create',
    activated: true,
    path: '/ad/ads/create',
    name: 'qad.admin.ads.create',
    page: () => import('@imagina/qad/_pages/admin/ads/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminAdsCreate',
    icon: 'fas fa-bullhorn',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb : ['qad.ads']
    }
  },
  adsUpdate: {
    permission: 'iad.ads.edit',
    activated: true,
    path: '/ad/ads/update/:id',
    name: 'qad.admin.ads.edit',
    page: () => import('@imagina/qad/_pages/admin/ads/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminAdsUpdate',
    icon: 'fas fa-bullhorn',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb : ['qad.ads']
    }
  },
  categories: {
    permission: 'iad.categories.manage',
    activated: true,
    path: '/ad/categories/index',
    name: 'qad.admin.categories.index',
    crud: import('@imagina/qad/_crud/categories'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminCategories',
    icon: 'fas fa-layer-group',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  }
}
