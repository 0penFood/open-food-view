
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
        path: '/details/:id',
        component: () => import('pages/DetailsPage.vue'),
        props: true,
      },
    ]
  },
  {
    path: '/registration/professional/restaurant',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignUpPage.vue') }
    ]
  },
  {
    path: '/registration/professional/delivery',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignUpPage.vue') }
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
