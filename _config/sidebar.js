const pages = config('pages') // Get Pages from config

//Marketplace
export default [
   {
      title: 'qad.sidebar.adminAd',
      icon: 'fas fa-map-marked-alt',
      children: [
        pages.qad.admin.categories.index,
         pages.qad.admin.services.index,
      ]
   }
]
