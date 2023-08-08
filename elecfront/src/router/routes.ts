import { RouteRecordRaw } from 'vue-router'
import prueba from 'pages/prueba.vue'
import Registroreclamo from 'pages/Registroreclamo.vue'
import consulta from 'pages/consulta.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {path:'/reclamoalumbrado',component:prueba},
  {path:'/registroreclamo',component:Registroreclamo},
  {path:'/consulta/:cedula',component:consulta},
  {path:'/consulta',component:consulta},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
