import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/components/Layout/MainLayout.vue"; // 主布局
import Welcome from "@/views/Welcome/Welcome.vue"; // 新增：欢迎页
import NotFound from "@/views/NotFound/404.vue";

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/welcome", // 默认重定向到欢迎页（原重定向到登录页）
  },
  // 欢迎页（无需布局，独立页面）
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
    meta: {
      title: "欢迎页 - 你的项目名称", // 页面标题
      requiresAuth: false, // 无需权限（可删掉该字段，因已无登录逻辑）
    },
  },
  // 主布局路由（所有系统内页面都在这里）
  {
    path: "/",
    component: MainLayout,
    meta: {
      title: "系统首页",
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/Index.vue"), // 懒加载
        meta: {
          title: "控制台",
          icon: "dashboard", // 侧边栏图标
        },
      },
    ],
  },
  // 404页面（必须放在最后）
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "页面未找到",
    },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫：验证登录状态（进入需要权限的页面时触发）
/* router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.meta.requiresAuth; // 是否需要登录

  if (requiresAuth) {
    // 检查是否有登录状态（这里假设用token判断，后续Pinia中存储）
    if (userStore.token) {
      next(); // 已登录，放行
    } else {
      next("/login"); // 未登录，跳转到登录页
    }
  } else {
    next(); // 不需要登录，直接放行
  }
}); */
// 路由守卫：仅保留设置页面标题的逻辑（移除登录校验）
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
