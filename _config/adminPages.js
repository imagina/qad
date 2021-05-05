export default {
  ads: {
    permission: 'iad.ads.manage',
    activated: true,
    path: '/ad/ads/index',
    name: 'qad.ads.index',
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
    name: 'qad.ads.create',
    page: () => import('@imagina/qad/_pages/admin/ads/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminAdsCreate',
    icon: 'fas fa-bullhorn',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qad.ads'],
      recomendations: {
        name: 'addForm'
      }
    }
  },
  adsUpdate: {
    permission: 'iad.ads.edit',
    activated: true,
    path: '/ad/ads/update/:id',
    name: 'qad.ads.edit',
    page: () => import('@imagina/qad/_pages/admin/ads/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminAdsUpdate',
    icon: 'fas fa-bullhorn',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qad.ads'],
      recomendations: {
        name: 'addForm'
      }
    }
  },
  categories: {
    permission: 'iad.categories.manage',
    activated: true,
    path: '/ad/categories/index',
    name: 'qad.categories.index',
    crud: import('@imagina/qad/_crud/categories'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminCategories',
    icon: 'fas fa-layer-group',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qad.ads']
    }
  },
  ups: {
    permission: 'iad.ups.manage',
    activated: true,
    path: '/ad/ups/index',
    name: 'qad.ups.index',
    crud: import('@imagina/qad/_crud/ups'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminUps',
    icon: 'fas fa-arrow-alt-circle-up',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qad.ads']
    }
  },
  adUps: {
    permission: 'iad.ups.manage',
    activated: true,
    path: '/ad/ad-ups/index',
    name: 'qad.adUps.index',
    crud: import('@imagina/qad/_crud/adUps'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qad.sidebar.adminAdUps',
    icon: 'fas fa-chart-line',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qad.ads']
    }
  }
}
