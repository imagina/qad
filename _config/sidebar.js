const pages = config('pages') // Get Pages from config

//Marketplace
export default [
   {
      title: 'qad.sidebar.admin.menu.manageAds',
      icon: 'fas fa-map-marked-alt',
      children: [
        pages.qad.categories,
         pages.qad.services,
         pages.qad.ads,
      ]
   }
]
