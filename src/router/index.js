import { createRouter, createWebHistory } from 'vue-router'
import Recommend from 'views/recommend/recommend.vue'
import Rank from 'views/rank/rank.vue'
import Search from 'views/search/search.vue'
import Singer from 'views/singer/singer.vue'
import NotFound from 'components/NotFound/index.vue'
import SingerDetail from 'views/singer/SingerDetail.vue'

const routesInfo = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer,
    children: [
      {
        path: ':id',
        name: 'SingerDetail',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: {
      path: '/404',
      name: '404',
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routesInfo,
})

export { router }