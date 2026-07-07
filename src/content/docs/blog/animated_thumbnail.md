---
title: Mod 动态封面制作教程
date: 2026-07-07
lastUpdated: 2026-07-07
authors:
    - 小松岗
excerpt: Mod 在创意工坊中的简单动态封面的制作教程
tags: ["教程", "模组", "相关工具", "MOD 动态封面"]
featured: true
---

该教程只用来做简单的动态封面图，不考虑图片质量，美学等问题。

以下是最终展示图：

![thumbnail.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_thumbnail.png)
![thumbnail.png](../../../assets/blog/animated_thumbnail.assets/thumbnail_finished.png)

## 工具准备

- [x] **应用程序：Adobe Photoshop** (简称ps)

:::note
以下教程用ps版本：Adobe Photoshop 2023
:::

## 素材准备

### 封面图

我们需要一张 **352*352**（像素）的图像作为封面图。

:::tip
创意工坊封面图超过 1MiB 大小无法显示，因此不建议使用大图。
:::

![example.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_example.png)

### 帧序列图

这里我直接给一个获取帧序列图的方法：拿网络上的免费素材，比如：

1. 浏览器输入网址 <https://www.aigei.com/> ，进入
![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image.png)
2. 直接搜索，关键词（边框 序列帧 特效）等等，顺带勾选上游戏，下载类型中的免费
![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image1.png)
3. 挑选喜欢的，第一次制作我推荐使用简单的：（这两个看着都可以用）
![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image2.png)
![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image3.png)
4. 直接下载，查看
![QQ_1783365436107.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image4.png)

## 绘制动图

### 确定帧序列图

（关于帧序列图的选择，一般都是选择一个循环即可，教程中选择的是 1-25）

![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image5.png)

1. PS 右下角图层卡：
   点击，拖动即可调整顺序，按 1-25 调整
   ![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image7.png)

2. 调整大小，对齐位置
   ![QQ_1783366623072.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783366623072.png)
   如果不能调整大小，比如
   ![QQ_1783366830403.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783366830403.png)
   此时选中所有图层，右键转换为图层即可
   ![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image8.png)

### 根据背景图调整帧序列图

3. 教程实例中帧序列图 `W:440 H:520 X:-45 Y:-84`，就这样第一张序列帧。
   大小位置确定后其它的直接同样处理即可（不再需要手动对齐，直接红色框中的输入框输入对应值即可）
   ~~（下图W和X不正确）~~
   ![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image9.png)

4. 裁剪，去掉无用像素和画布
   ![QQ_1783368651557.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783368651557.png)
   裁剪完成后，点击移动工具方便后续操作
   ![QQ_1783368729725.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783368729725.png)

5. 重新看回图层，对着背景图使用快捷键 <kbd>CTRL</kbd>+<kbd>J</kbd>,会出现一张背景拷贝图。
   然后按住 <kbd>CTRL</kbd> 的同时选择一张帧序列图，此时共选中两张图，
   使用快捷键 <kbd>CTRL</kbd>+<kbd>E</kbd>

   此时我们得到合并图（帧序列图+背景图）：（图层变少是因为我删除了偶数位的帧序列图方便演示）
   ![QQ_1783369440744.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783369440744.png)
   需要注意 <kbd>CTRL</kbd>+<kbd>E</kbd> 时应保持图层可见
   ![QQ_1783369582571.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783369582571.png)
   继续，直到全部完成
   ![QQ_1783369703869.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783369703869.png)

6. 全选图层，点击窗口，点击时间轴
   ![QQ_1783368881430.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783368881430.png)
   创建时间轴
   ![QQ_1783368948457.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783368948457.png)
   创建成功
   ![QQ_1783369795790.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783369795790.png)

7. 调整位置，拖动成下图
   ![QQ_1783369857383.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783369857383.png)

8. 然后按图所示转换为帧动画
   ![img.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_img20.png)
   ![QQ_1783370144822.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783370144822.png)

9. 选择无延迟，可全选批量调整
   ![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image11.png)
   至此，导出前的工作已完成，可以点击播放键查看效果
   ![QQ_1783370337364.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783370337364.png)

## 导出

10. ![image.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_image12.png)
    直接使用 `GIF128` 预设即可。
    ![QQ_1783370544133.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783370544133.png)
    然后右下角 <kbd>存储</kbd>。
    教程导出的图片：`example999.gif`

11. 将导出的 gif 图片放进 mod 目录，修改文件名和后缀为 `thumbnail.png`
    ![QQ_1783370810099.png](../../../assets/blog/animated_thumbnail.assets/QQ_1783370810099.png)
    得到
    ![thumbnail.png](../../../assets/blog/animated_thumbnail.assets/thumbnail_finished.png)

12. 上传工坊查看效果
    ![img.png](../../../assets/blog/animated_thumbnail.assets/animated_thumbnail_img21.png)

## 部分问题解答

- 上传工坊后不显示图片：
  - 图片必须命名 `thumbnail.png`
  - 图片大小不能超过 1MiB

- PS 找不到某个功能：
  - 右上角放大镜搜索
  - 百度

- 没有 PS:
  - Modder 群群文件中有 PS 应用程序

- PS 不能调整图层大小：
  - 根据情况尝试选中目标右键转化为图层

- 使用 PS 时，时间轴调错后重新打开时间轴还是旧的样子：
  - 先转换为视频时间轴再删除时间轴，然后新建时间轴
