import pages from 'src/setup/pages'

//Marketplace
export default [
  {
    title: 'iad.cms.sidebar.adminGroup',
    icon: 'fal fa-rectangle-ad',
    children: [
      pages.qad.ads,
      pages.qad.categories,
      pages.qad.ups,
      pages.qad.adUps,
    ]
  }
]
