import { onMounted, ref } from "vue"
import { TDashboard } from "@/vue/types/dashboard.type"
import { useRouter } from "vue-router"
export default function useDashboard() {
    const router = useRouter()
    const dashboards = ref<TDashboard[]>([
        {
            name: 'home',
            label: 'Home '
        },
        {
            name: 'overview',
            label: 'Overview'
        },
        {
            name: 'customers',
            label: 'Customers'
        },
        {
            name: 'products',
            label: 'Products'
        },
        {
            name: 'settings',
            label: 'Settings'
        }
    ])
    const dashboard = ref<TDashboard>(dashboards.value[0])

    onMounted(() => {
        dashboard.value = dashboards.value.find(dash => dash.name == localStorage.getItem('route'))
    })

    const onDashboard = (dash: TDashboard) => {
        dashboard.value = dash
        localStorage.setItem('route', dash.name)
        router.push(dash.name)
    }

    return {
        dashboards,
        dashboard,
        onDashboard
    }
}