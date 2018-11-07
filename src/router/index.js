import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage'
import TypeListPage from '../pages/TypeListPage'
import DetailPage from '../pages/DetailPage'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/home', name: 'homepage', component: HomePage },
    { path: '/list', name: 'listpage', component: TypeListPage, props:true },
    { path: '/detail/:filmId', component: DetailPage, props:true },
    { path: '/', redirect:'/home' }
  ]
})
