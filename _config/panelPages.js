export default {
  ads: {
    permission: 'iad.ads.manage',
    activated: true,
    path: '/ads',
    name: 'qad.ads.index',
    crud: import('modules/qad/_crud/ads'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master'),
    title: 'iad.cms.sidebar.panelAds',
icon: 'fal fa-rectangle-ad',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  adsCreate: {
    permission: 'iad.ads.create',
    activated: true,
    path: '/ads/create',
    name: 'qad.ads.create',
    page: () => import('modules/qad/_pages/admin/ads/form'),
    layout: () => import('layouts/master'),
    title: 'iad.cms.sidebar.adminAdsCreate',
    icon: 'fal fa-rectangle-ad',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb : ['qad.ads'],
      recommendations: {
        name: 'addForm'
      }
    }
  },
  adsUpdate: {
    permission: 'iad.ads.edit',
    activated: true,
    path: '/ads/update/:id',
    name: 'qad.ads.edit',
    page: () => import('modules/qad/_pages/admin/ads/form'),
    layout: () => import('layouts/master'),
    title: 'iad.cms.sidebar.adminAdsUpdate',
    icon: 'fal fa-rectangle-ad',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb : ['qad.ads'],
      recommendations: {
        name: 'addForm'
      }
    }
  }
}
