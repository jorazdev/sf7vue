import { Component } from "vue"

export type TComponent = {
    title: string
	component: Component | null
}

export type TAuth = {
    componentSelected: TComponent|null
    components: TComponent[]
}