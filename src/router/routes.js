
const routes = [
  {
    path: '/',
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
        component: () => import('pages/ProfilePage.vue')
      },
      {
        path: '/partner',
        component: () => import('pages/PartnerPage.vue')
      },
      {
        path: '/history',
        component: () => import('pages/HistoryPage.vue')
      },
      {
        path: '/traking',
        component: () => import('pages/TrakingPage.vue')
      },
      {
        path: '/signup/delivery',
        component: () => import('pages/SignUpDeliveryPage.vue')
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
