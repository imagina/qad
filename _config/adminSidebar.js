const pages = config('pages') // Get Pages from config

//Marketplace
export default [
  {
    title: 'qad.sidebar.adminGroup',
    icon: 'fas fa-bullhorn',
    children: [
      pages.qad.ads,
      pages.qad.categories,
      pages.qad.ups,
      pages.qad.adUps,
    ]
  }
]
