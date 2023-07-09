import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store, key } from './store'

import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import {  CardCompact, ProjectsPanel, RedactorPanel, HeaderPanel, TaskCard, GroupItem, ProjectGroups } from '@/components'

const app = createApp(App)
    .use(vuetify)
    .use(store, key)
    .use(router)

app.component('CardCompact', CardCompact)
app.component('ProjectsPanel', ProjectsPanel)
app.component('RedactorPanel', RedactorPanel)
app.component('HeaderPanel', HeaderPanel)
app.component('TaskCard', TaskCard)
app.component('GroupItem', GroupItem)
app.component('ProjectGroups', ProjectGroups)
app.mount('#app')
