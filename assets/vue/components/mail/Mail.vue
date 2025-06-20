
<script setup lang="ts">
import { Mail } from '../../data/mail'
import { computed } from 'vue'
import { ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import { TAccount } from './mail.type'
import Panel from './Panel.vue'


type TLinkProp = {
    title: string,
    label: string,
    icon: string,
    variant: string,
}

interface IMailProps {
  accounts: TAccount[]
  mails: Mail[]
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

const props = withDefaults(defineProps<IMailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [265, 440, 655],
})

const isCollapsed = ref(props.defaultCollapsed)
const selectedMail = ref<string | undefined>(props.mails[0].id)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const filteredMailList = computed(() => {
  let output: Mail[] = []
  const searchValue = debouncedSearch.value?.trim()
  if (!searchValue) {
    output = props.mails
  }

  else {
    output = props.mails.filter((item) => {
      return item.name.includes(debouncedSearch.value)
        || item.email.includes(debouncedSearch.value)
        || item.name.includes(debouncedSearch.value)
        || item.subject.includes(debouncedSearch.value)
        || item.text.includes(debouncedSearch.value)
    })
  }

  return output
})

const unreadMailList = computed(() => filteredMailList.value.filter(item => !item.read))

const selectedMailData = computed(() => props.mails.find(item => item.id === selectedMail.value))

const links: TLinkProp[] = [
  {
    title: 'Inbox',
    label: '128',
    icon: 'lucide:inbox',
    variant: 'default',
  },
  {
    title: 'Drafts',
    label: '9',
    icon: 'lucide:file',
    variant: 'ghost',
  },
  {
    title: 'Sent',
    label: '',
    icon: 'lucide:send',
    variant: 'ghost',
  },
  {
    title: 'Junk',
    label: '23',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
  {
    title: 'Trash',
    label: '',
    icon: 'lucide:trash',
    variant: 'ghost',
  },
  {
    title: 'Archive',
    label: '',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
]

const links2: TLinkProp[] = [
  {
    title: 'Social',
    label: '972',
    icon: 'lucide:user-2',
    variant: 'ghost',
  },
  {
    title: 'Updates',
    label: '342',
    icon: 'lucide:alert-circle',
    variant: 'ghost',
  },
  {
    title: 'Forums',
    label: '128',
    icon: 'lucide:message-square',
    variant: 'ghost',
  },
  {
    title: 'Shopping',
    label: '8',
    icon: 'lucide:shopping-cart',
    variant: 'ghost',
  },
  {
    title: 'Promotions',
    label: '21',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
]

const onCollapse = () => {
  isCollapsed.value = true
}

const onExpand = () => {
  isCollapsed.value = false
}

</script>
<template>
    <div class="flex w-full h-full p-5 items-center justify-center">
       <Panel class="w-[265px] rounded-tl-lg rounded-bl-lg">
            <template #header>
                <h1>Header 1</h1>
            </template>
            <h1>Main 1</h1>
       </Panel>
       <Panel class="w-[440px]">
            <template #header>
                <h1>Header 2</h1>
            </template>
            <h1>Main 2</h1>
       </Panel>
       <Panel class="flex-1 rounded-tr-lg rounded-br-lg">
            <template #header>
                <h1>Header 3</h1>
            </template>
            <h1>Main 3</h1>
       </Panel>
    </div>
</template>