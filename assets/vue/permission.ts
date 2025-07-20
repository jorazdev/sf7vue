import router from './router'
import axios from "axios";
const whiteList = ['/login']

// Fonction utilitaire pour gérer la redirection vers la dernière route
const redirectToLastRoute = (next) => {
    const lastRoute = localStorage.getItem('lastRoute') || '/apps'
    next({ path: lastRoute });
}

router.beforeEach(async(to, from, next) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        try {
            const jwtPayload = JSON.parse(window.atob(token.split('.')[1]));
            if (Date.now() >= jwtPayload.exp * 1000) {
                localStorage.removeItem('token');
                window.location.href = '/';
                return;
            }

            // Centralisation de la logique de redirection
            if (to.path === '/') {
                redirectToLastRoute(next);
                return;
            }

            // Mettre à jour la dernière route visitée
            //localStorage.setItem('lastRoute', to.path);
            //console.log(to.path)
            axios.interceptors.response.use(undefined, (err) => {
                return new Promise(() => {
                    if (err.response?.status === 401) {
                        window.location.href = '/';
                    }
                    throw err;
                });
            });
            next();
        } catch (error) {
            localStorage.removeItem('token');
            next(to.path);
        }
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else if (to.matched.some(record => record.meta.requiresAuth)) {
            next({ name: 'signin' });
        } else {
            if (from.path.includes('/dashboard/')) {
                window.location.href = '/';
            } else {
                next();
            }
        }
    }
});