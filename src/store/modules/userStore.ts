import { defineStore } from 'pinia'

// 定义并导出 userStore（参数1：store唯一标识，参数2：配置对象）
export const useUserStore = defineStore('user', {
  // 存储状态（类似 Vue2 的 data）
  state: () => ({
    // 无登录场景：默认访客信息
    userInfo: {
      username: '访客',  // 用户名（固定为访客，后续登录后可替换为真实用户名）
      avatar: 'user',    // 头像图标（Ant Design Vue 图标类型）
      role: 'guest'      // 角色（访客角色，后续可扩展为 admin/user 等）
    },
    // 侧边栏折叠状态（和主布局联动）
    sidebarCollapsed: false,
    // 主题偏好（后续可扩展深色/浅色模式）
    theme: 'light'
  }),

  // 计算属性（类似 Vue 的 computed，依赖 state 派生状态）
  getters: {
    // 获取用户角色文本
    roleText: (state) => {
      return state.role === 'guest' ? '访客' : '管理员'
    }
  },

  // 方法（类似 Vue 的 methods，用于修改状态）
  actions: {
    // 切换侧边栏折叠状态（供主布局调用）
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    // 设置侧边栏折叠状态（手动控制）
    setSidebarCollapsed(collapsed: boolean) {
      this.sidebarCollapsed = collapsed
    },

    // 切换主题（后续可扩展）
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      // 这里可以添加主题切换的副作用（如修改全局样式变量）
    },

    // 后续扩展登录功能时，可新增登录方法：
    // login(userData: { username: string; avatar: string }) {
    //   this.userInfo = userData
    //   this.role = 'admin'  // 登录后切换为管理员角色
    // },

    // 后续扩展退出登录功能时，可新增退出方法：
    // logout() {
    //   this.userInfo = { username: '访客', avatar: 'user', role: 'guest' }
    //   this.sidebarCollapsed = false
    // }
  },
  persist: true
})