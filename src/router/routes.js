
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
        path: 'signup',
        component: () => import('pages/SignUpPage.vue')
      },
      {
        path: 'login',
        component: () => import('pages/loginPage.vue')
      },
      {
        path: 'profile',
        component: () => import('pages/ProfilePage.vue')
      },
      {
        path: 'partner',
        component: () => import('pages/PartnerPage.vue')
      },
      {
        path: 'orders',
        component: () => import('pages/OrdersPage.vue')
      },
      {
        path: 'traking',
        component: () => import('pages/TrakingPage.vue')
      },
      {
        path: 'history',
        component: () => import('pages/HistoryPage.vue')
      },
      {
        path: 'signup/restaurants',
        component: () => import('pages/RegistrationRestaurantPage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/loginPage.vue') }
    ]
  },
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'restaurants', component: () => import('pages/MenuRestau.vue') }
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
