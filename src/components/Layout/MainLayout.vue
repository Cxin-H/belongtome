<template>
    <!-- 根布局容器：必须有 <a-layout> 包裹整个布局 -->
    <a-layout style="min-height: 100vh">
        <!-- 侧边栏：你的原有代码不变 -->
        <a-layout-sider v-model:collapsed="userStore.sidebarCollapsed" collapsible theme="dark" width="256">
            <!-- 侧边栏标题（之前漏掉了，补充上，否则侧边栏顶部为空） -->
            <div class="logo" :style="{ paddingLeft: userStore.sidebarCollapsed ? '20px' : '30px' }">
                <span v-if="!userStore.sidebarCollapsed" class="logo-text">你的项目名称</span>
                <a-icon type="menu-unfold" v-if="userStore.sidebarCollapsed" />
            </div>

            <!-- 侧边栏菜单（原有代码不变，用于渲染路由菜单） -->
            <a-menu mode="inline" :selected-keys="[$route.path]" :open-keys="openKeys" @open-change="handleOpenChange"
                @click="handleMenuClick">
                <template v-for="route in routes" :key="route.path">
                    <a-menu-item v-if="!route.hidden && !route.children" :key="route.path">
                        <!-- <a-icon :type="route.meta.icon as string" /> -->
                        <span>{{ route.meta.title }}</span>
                    </a-menu-item>
                    <a-sub-menu v-if="!route.hidden && route.children && route.children.length" :key="route.path">
                        <template #title>
                            <!-- <a-icon :type="route.meta.icon as string" /> -->
                            <span>{{ route.meta.title }}</span>
                        </template>
                        <a-menu-item v-for="child in route.children" :key="child.path" v-if="!child.hidden">
                            <span>{{ child.meta.title }}</span>
                        </a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>

        <!-- 主内容区域：补全 <a-layout> 容器，包含顶部导航和内容区 -->
        <a-layout>
            <!-- 顶部导航（你的原有代码不变） -->
            <a-layout-header style="background: #fff; padding: 0 20px; border-bottom: 1px solid #e8e8e8">
                <div class="header-left">
                    <a-icon type="menu-fold" @click="userStore.toggleSidebar()"
                        style="font-size: 18px; cursor: pointer" />
                    <a-breadcrumb style="margin-left: 20px">
                        <a-breadcrumb-item href="/welcome">首页</a-breadcrumb-item>
                        <a-breadcrumb-item>{{ $route.meta.title }}</a-breadcrumb-item>
                    </a-breadcrumb>
                </div>
                <div class="header-right">
                    <a-dropdown>
                        <span class="user-info">
                            <a-avatar :icon="userStore.userInfo.avatar" />
                            <span style="margin-left: 8px">{{ userStore.userInfo.username }}</span>
                            <a-icon type="down" style="margin-left: 4px" />
                        </span>
                        <template #menu>
                            <a-menu>
                                <a-menu-item @click="goToWelcome">返回欢迎页</a-menu-item>
                                <a-menu-item @click="userStore.toggleTheme()">切换主题</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </a-layout-header>

            <!-- 核心：子路由出口！仪表盘内容会渲染在这里 -->
            <a-layout-content style="margin: 20px; background: #fff; padding: 24px; min-height: 280px">
                <router-view /> <!-- 必须添加这行，子路由页面的渲染出口 -->
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store'
// 导入 MainLayout 本身（用于匹配路由）
import MainLayout from './MainLayout.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 菜单展开的keys
const openKeys = ref<string[]>([])

// 获取主布局的子路由（用于渲染侧边栏菜单）
const routes = computed(() => {
    // 这里必须导入 MainLayout 才能匹配到父路由
    return router.getRoutes().find(item => item.component === MainLayout)?.children || []
})

// 菜单展开/收起回调
const handleOpenChange = (keys: string[]) => {
    openKeys.value = keys
}

// 菜单点击回调（跳转到对应路由）
const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key)
}

// 返回欢迎页
const goToWelcome = () => {
    router.push('/welcome')
}
</script>

<style scoped>
/* 补充侧边栏标题样式 */
.logo {
    height: 64px;
    line-height: 64px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
}

.logo-text {
    margin-left: 8px;
}

.header-left {
    display: flex;
    align-items: center;
    float: left;
}

.header-right {
    display: flex;
    align-items: center;
    float: right;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}
</style>