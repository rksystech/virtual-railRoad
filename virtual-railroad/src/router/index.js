import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import NewUser from '@/components/NewUser'
import NonProfitDirectory from '@/components/NonProfitDirectory'
import NewUserSignup from '@/components/NewUserSignup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new-user',
      name: 'newuser',
      component: NewUser
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/non-profit-directory',
      name: 'nonprofitdirectory',
      component: NonProfitDirectory
    },
    {
      path: '/new-user-signup-2',
      name: 'newusersignup',
      component: NewUserSignup
    }
  ]
})
