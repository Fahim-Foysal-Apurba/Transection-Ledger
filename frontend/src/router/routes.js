const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/accounts' },
      { path: 'accounts', component: () => import('pages/AccountsPage.vue') },
      { path: 'transactions', component: () => import('pages/TransactionsPage.vue') }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

