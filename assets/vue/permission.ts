import router from './router'
//import store from './store'
import axios from "axios";
import * as jwtDecode from 'jwt-decode';


const whiteList = ['/login']

const userToken = {}


router.beforeEach(async(to, from, next) => {
     const token = localStorage.getItem('token')
    if (token) {
        const jwtPayload = JSON.parse(window.atob(token.split('.')[1]))
        if (Date.now() >= jwtPayload.exp * 1000) {
            localStorage.removeItem('token')
            window.location.href = '/';
        }

        //Object.assign(userToken, jwtDecode(localStorage.getItem('token')))
       // store.commit('user/setUser', userToken)
        
        
        if (to.path === '/') {
            // if is logged in, redirect to the home page
            next({ path: '/dashboard' })
        } else {
            try {
                axios.interceptors.response.use(undefined, (err) => {
                    return new Promise(() => {
                        console.log(err.response.status)
                        if (err.response.status === 401) {
                            window.location.href = '/';
                            // this.$router.push({path: "/login"})
                        }
                        throw err;
                    });
                });
                next()
            } catch (error) {
                localStorage.removeItem('token')
                next(`${to.path}`)
            }
        }
    }
    else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            if (to.matched.some(record => record.meta.requiresAuth)) {
                // other pages that do not have permission to access are redirected to the login page.
                next({name: 'signin'})
            } else {
                if(from.path.match('/dashboard/')){
                    window.location.href = '/';
                }else {
                    next();
                }
            }
        }
    }
})