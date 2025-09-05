# 数据管理方案

## 概述

LEAD项目现在采用JSON文件 + localStorage缓存的混合数据管理方案，提供更好的数据管理体验。

## 数据架构

### 1. JSON数据文件
- **位置**: `src/assets/data/members.json`
- **用途**: 主要数据源，便于版本控制和团队协作
- **优势**: 
  - 易于编辑和维护
  - 支持版本控制
  - 团队协作友好
  - 可以轻松备份和恢复

### 2. localStorage缓存
- **用途**: 本地缓存，提高性能
- **优势**:
  - 离线访问
  - 快速加载
  - 用户数据持久化

## 数据加载流程

1. **优先从JSON文件加载**: 应用启动时首先尝试从 `assets/data/members.json` 加载数据
2. **缓存到localStorage**: 成功加载JSON数据后，自动缓存到localStorage
3. **降级到localStorage**: 如果JSON文件加载失败，则使用localStorage中的缓存数据
4. **默认数据**: 如果两者都失败，则使用内置的默认数据

## 数据管理方法

### 更新会员数据
1. 直接编辑 `src/assets/data/members.json` 文件
2. 重新构建应用: `npm run build`
3. 或者使用服务中的 `reloadFromJson()` 方法手动刷新

### 清除缓存
```typescript
// 在组件中注入MemberService
constructor(private memberService: MemberService) {}

// 清除缓存并重新加载
this.memberService.clearCacheAndReload();
```

### 手动刷新数据
```typescript
// 重新从JSON文件加载数据
this.memberService.reloadFromJson().subscribe(success => {
  if (success) {
    console.log('数据刷新成功');
  } else {
    console.log('数据刷新失败');
  }
});
```

## JSON数据格式

```json
{
  "members": [
    {
      "id": "1",
      "name": "张明",
      "position": "大区干事",
      "department": "D128大区",
      "email": "zhangming@toastmasters.org",
      "joinDate": "2024-01-15",
      "bio": "会员简介...",
      "skills": ["技能1", "技能2"],
      "milestones": [
        {
          "id": "m1",
          "title": "里程碑标题",
          "description": "里程碑描述",
          "completedDate": "2024-03-15",
          "status": "completed",
          "category": "training",
          "priority": "high",
          "tags": ["标签1", "标签2"]
        }
      ],
      "currentGoals": ["目标1", "目标2"],
      "performance": {
        "rating": 4.5,
        "lastReviewDate": "2024-12-01",
        "notes": "绩效评价"
      },
      "leadershipLevel": "intermediate",
      "participationRate": 92,
      "assignmentCompletionRate": 88,
      "bottleneckResolutionRate": 85
    }
  ],
  "lastUpdated": "2024-12-20"
}
```

## 最佳实践

1. **定期备份**: 定期备份 `members.json` 文件
2. **版本控制**: 将JSON文件纳入Git版本控制
3. **数据验证**: 编辑JSON文件时注意数据格式的正确性
4. **测试**: 修改数据后及时测试应用功能

## 故障排除

### 数据不更新
1. 检查JSON文件格式是否正确
2. 清除浏览器缓存和localStorage
3. 使用 `clearCacheAndReload()` 方法强制刷新

### JSON文件加载失败
1. 检查文件路径是否正确
2. 确认文件存在于 `src/assets/data/` 目录
3. 检查文件权限

## 未来扩展

可以考虑的进一步改进：
1. **API集成**: 连接到后端API获取数据
2. **实时同步**: 实现数据的实时同步
3. **数据验证**: 添加JSON Schema验证
4. **导入导出**: 支持Excel/CSV格式的数据导入导出
