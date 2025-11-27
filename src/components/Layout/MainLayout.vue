<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="userStore.sidebarCollapsed" collapsible theme="dark" width="256">
            <div class="logo" :style="{ paddingLeft: userStore.sidebarCollapsed ? '20px' : '30px' }">
                <span v-if="!userStore.sidebarCollapsed" class="logo-text">你的项目名称</span>
                <a-icon type="menu-unfold" v-if="userStore.sidebarCollapsed" />
            </div>

            <a-menu mode="inline" :selected-keys="[$route.path]" :open-keys="openKeys" @openChange="handleOpenChange"
                @click="handleMenuClick">
                <template v-for="route in routes" :key="route.path">
                    <!-- 修复：使用 (route.meta as any)?.hidden 绕过类型检查，确保访问 meta 中的 hidden -->
                    <a-menu-item v-if="!((route.meta as any)?.hidden) && !route.children" :key="route.path">
                        <span>{{ route.meta?.title }}</span>
                    </a-menu-item>
                    <a-sub-menu v-if="!((route.meta as any)?.hidden) && route.children && route.children.length" :key="route.path">
                        <template #title>
                            <span>{{ route.meta?.title }}</span>
                        </template>
                        <a-menu-item v-for="child in route.children" :key="child.path">
                            <!-- 修复：子菜单同样检查 meta.hidden -->
                            <span v-if="!((child.meta as any)?.hidden)">{{ child.meta?.title }}</span>
                        </a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>

        <a-layout>
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
                        <!-- 修复：Ant Design Vue 4.x 使用 #overlay 插槽 -->
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="goToWelcome">返回欢迎页</a-menu-item>
                                <a-menu-item @click="userStore.toggleTheme()">切换主题</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </a-layout-header>

            <a-layout-content style="margin: 20px; background: #fff; padding: 24px; min-height: 280px">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store'
import MainLayout from './MainLayout.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const openKeys = ref<string[]>([])

const routes = computed(() => {
    // 修复 TS2551: RouteRecordNormalized 使用 components (复数)，而不是 component
    return router.getRoutes().find(item => item.components?.default === MainLayout)?.children || []
})

const handleOpenChange = (keys: any) => {
    openKeys.value = keys
}

// 修复 TS2322: 菜单点击事件类型修复，使用 any 或具体的 MenuInfo 类型来接收参数
const handleMenuClick = (e: any) => {
    // e.key 是 string | number，可以直接用于 push
    router.push(e.key as string)
}

const goToWelcome = () => {
    router.push('/welcome')
}
</script>

<style scoped>
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