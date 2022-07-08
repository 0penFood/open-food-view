
const routes = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/login',
        component: () => import('pages/loginPage.vue')
      },
      {
        path: '/signup',
        component: () => import('pages/SignUpPage.vue')
      },
      {
        path: '/profile',
        component: () => import('pages/ProfilPage.vue')
      },
      {
        path: '/cart',
        component: () => import('pages/CartPage.vue')
      },
      {
        path: '/traking',
        component: () => import('pages/TrakingPage.vue')
      },
      {
        path: '/history',
        component: () => import('pages/HistoryPage.vue')
      },
      {
        path: '/details/:id',
        component: () => import('pages/DetailsPage.vue'),
        props: true,
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
