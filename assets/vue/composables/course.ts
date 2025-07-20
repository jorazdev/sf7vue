import { reactive, ref } from "vue";
import { TCourse } from "@app/types/course.type";
import useAxios from "./axios";

export default function useCourse(){

    const { post, get } = useAxios()

    const showPopup = ref<boolean>(false)
    const courseForm = ref<TCourse>({
        id: 0,
        title: ''
    })
    const action = ref('Add')
    const courses = ref<TCourse[]>([])

    let courseSelected = ref<number>(0)

    const onSelected = (c: TCourse) => {
        courseSelected.value = c.id
        courseForm.value = {...c}
        showPopup.value = false
    }

    const onSave = async () => {
        const res = await post('/api/course/update', {
            ...courseForm.value
        })
        if(courseForm.value.id == 0){
            courses.value.push({
                id: res.data.result.update.id,
                title: res.data.result.update.title
            })
        }else {
            const course = courses.value.find(course => course.id === courseForm.value.id)
            if(course){
                course.title = courseForm.value.title
            }
        }
        showPopup.value = false
    }

    const onAll = async () => {
        const res = await get('/api/course/all')
        courses.value = [...res.data.result.courses]
    }

    const onDelete = () => {
        courses.value = courses.value.filter(c => c.id != courseForm.value.id)
        showPopup.value = false
    }

    const onActionCourse = (c: TCourse) => {
        if(c){
            action.value = "Edit"
            courseForm.value = {...c}
        }else{
            action.value = "Add"
            courseForm.value.title = ''
            courseForm.value.id = 0
        }
        showPopup.value = true
    }

    return {
        showPopup,
        action,
        courses,
        courseSelected,
        courseForm,
        onAll,
        onSelected,
        onSave,
        onDelete,
        onActionCourse
    }
}