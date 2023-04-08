import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store, key } from './store'

import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { ProjectCardCompact, ProjectsPanel, RedactorPanel, HeaderPanel, TaskCard, GroupItem, TestProjectCardCompact } from '@/components'

const app = createApp(App)
    .use(vuetify)
    .use(store, key)
    .use(router)

app.component('ProjectCardCompact', ProjectCardCompact)
app.component('ProjectsPanel', ProjectsPanel)
app.component('RedactorPanel', RedactorPanel)
app.component('HeaderPanel', HeaderPanel)
app.component('TaskCard', TaskCard)
app.component('GroupItem', GroupItem)
app.component('TestProjectCardCompact', TestProjectCardCompact)
app.mount('#app')
