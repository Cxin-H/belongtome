<template>
    <div class="welcome-container">
      <a-card class="welcome-card" bordered="false">
        <div class="welcome-header">
          <a-avatar size="large" icon="logo" style="background: #1890ff" />
          <h1 class="project-name">Vue3 + Ant Design Vue 项目</h1>
          <p class="project-desc">高效开发 · 企业级应用解决方案</p>
        </div>
        <div class="welcome-content">
          <p>基于 Vite 构建，集成 Ant Design Vue 组件库和 Vue Router 路由</p>
          <div class="feature-list">
            <a-tag color="blue" style="margin: 8px">组件丰富</a-tag>
            <a-tag color="green" style="margin: 8px">路由完善</a-tag>
            <a-tag color="orange" style="margin: 8px">布局灵活</a-tag>
            <a-tag color="purple" style="margin: 8px">易于扩展</a-tag>
          </div>
        </div>
        <div class="welcome-footer">
          <a-button type="primary" size="large" @click="goToDashboard">
            <a-icon type="arrow-right" style="margin-right: 8px" />
            进入系统
          </a-button>
        </div>
      </a-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // 点击按钮跳转到控制台（主布局）
  const goToDashboard = () => {
    router.push('/dashboard')
  }
  </script>
  
  <style scoped>
  .welcome-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    padding: 24px;
  }
  .welcome-card {
    width: 100%;
    max-width: 600px;
    padding: 48px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  .welcome-header {
    text-align: center;
    margin-bottom: 32px;
  }
  .project-name {
    margin: 16px 0 8px;
    color: #1f2937;
    font-size: 24px;
    font-weight: 600;
  }
  .project-desc {
    color: #6b7280;
    font-size: 16px;
  }
  .welcome-content {
    text-align: center;
    margin-bottom: 48px;
    color: #4b5563;
    font-size: 14px;
    line-height: 1.8;
  }
  .feature-list {
    margin-top: 16px;
  }
  .welcome-footer {
    text-align: center;
  }
  </style>