import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 👈 Importamos nuestro router bíblico

// 🎨 IMPORTANTE: Importamos los estilos y componentes de Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 🔌 IMPORTANTE: Importamos los iconos para los botones
import '@mdi/font/css/materialdesignicons.css'

// Creamos la configuración de Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
  },
})

const app = createApp(App)

app.use(router) // 👈 Le decimos a Vue que use el router
app.use(vuetify) // 👈 ¡NUEVO! Le decimos a Vue que use Vuetify para ordenar el diseño

app.mount('#app')
