import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 导入路由实例
import { createPinia } from 'pinia'  // Pinia（后续状态管理用）
// Ant Design Vue 按需引入（之前配置的，无需修改）
import { message, Modal } from 'ant-design-vue'
import '@/assets/styles/global.less'

const app = createApp(App)
const pinia = createPinia()

// 注册路由、Pinia
app.use(router)
app.use(pinia)

// 全局注册Ant Design Vue的非UI组件
app.config.globalProperties.$message = message
app.config.globalProperties.$modal = Modal

app.mount('#app')