import { ref } from "vue";
import { TApps } from "@app/types/apps.type";

export default function useApps() {
    const apps = ref<TApps[]>([
        {id: 1, label: 'Online Courses', icon: 'school', link: '/course'},
        {id: 2, label: 'App 2' , icon: '', link: '/dashboard'},
        {id: 3, label: 'App 3' , icon: '', link: '/dashboard'},
        {id: 4, label: 'App 4' , icon: '', link: '/dashboard'},
        {id: 5, label: 'App 5' , icon: '', link: '/dashboard'},
        {id: 6, label: 'App 6', icon: '', link: '/dashboard'},
        {id: 7, label: 'App 7', icon: '', link: '/dashboard'},
        {id: 8, label: 'App 8', icon: '', link: '/dashboard'},
        {id: 9, label: 'App 9', icon: '', link: '/dashboard'},
        {id: 10, label: 'App 10', icon: '', link: '/dashboard'},
        {id: 11, label: 'App 11', icon: '', link: '/dashboard'},
        {id: 12, label: 'App 12', icon: '', link: '/dashboard'},
        {id: 13, label: 'App 13', icon: '', link: '/dashboard'},
        {id: 14, label: 'App 14', icon: '', link: '/dashboard'},
        {id: 15, label: 'App 15', icon: '', link: '/dashboard'},
        {id: 16, label: 'App 16', icon: '', link: '/dashboard'}
    ])

    return {
        apps
    }
}