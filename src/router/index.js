import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage'
import TypeListPage from '../pages/TypeListPage'
import DetailPage from '../pages/DetailPage'
import NotFound from '../pages/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/home', name: 'homepage', component: HomePage },
    { path: '/list/:typeId?/:typeName?', name: 'listpage', component: TypeListPage, props:true },
    { path: '/detail/:filmId?', name:'detailpage', component: DetailPage, props:true, meta: {showFootter:true} },
    { path: '/', redirect:'/home' },
    { path:"*",component:NotFound }
  ]
})
