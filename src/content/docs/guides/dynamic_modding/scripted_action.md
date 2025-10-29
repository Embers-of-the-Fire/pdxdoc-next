---
title: 函数化行动(Scripted Action)
---

```pdx
scripted_action = {
    # 定义行动目标和范围
    scope = planet/fleet/self

    # the resulting scopes and behaviors are:
    # For scope = fleet:
    #    scope: 目标舰队 (不能触发自己)
    #    from: 触发舰队
    #    在fleet_action_range指定的范围内开始（否则会提前移动）
    # For scope = self:
    #    scope: 触发舰队
    #    from: 触发舰队
    #    立即触发
    # For scope = planet:
    #    scope: 目标行星
    #    from: 触发舰队
    #    在目标行星轨道上启动（否则提前移动）

    possible = {
        # 评估是否有可能采取行动。需要在脚本的作用域之后
        # 如果没有指定，动作总是被认为是可能的
    }

    finished = {
        # 评估操作是否完成。需要在脚本的作用域之后
        # 如果没有指定，动作总是被认为已完成
    }

    # trigger. scope: 触发舰队. 评估按钮是否可点击
    button_clickable = {}
    # trigger. scope: 触发舰队. 评估脚本操作按钮是否可见（也用于上下文菜单选项）
    button_visible = {}

    # 执行的 action 名称
    name = on_action_name
    # 取消时执行的 action 名称
    on_cancel = on_cancel_action_name

    # 下拉菜单中选项标签的 loc 键
    context_menu_name = menu_loc_key
    # 按钮提示
    tooltip = tooltip_loc_key
    # 按钮图标
    icon = "GFX_icon_1"

    # 按钮被点击时播放的声音片段（或目标，如果需要）
    on_click_sound = "sound_clip_1"
    # 执行字段 `name` 指定的 on_action 时播放的声音剪辑 （？）
    on_execution_sound = "sound_clip_2"

    # loc 键的活动字符串显示在舰队的UI。 `NAME` loc 参数给出目标的本地化名称
    activity_key = activity_loc_key
    # loc键的活动字符串显示在舰队的UI。 `PROGRESS` loc 参数给出当前进度百分比
    progress_activity_key = progress_loc_key

    # 开始执行脚本操作所需的进度（帧数）。默认值 = 0.0
    # `progress` 从 1.0 开始计数，所以 `required_progress` 的最小值是 2.0，使动作不是即时的
    required_progress = 2.0

    # 动作再次触发前的冷却天数。默认值 = 0
    cooldown = 10
    # 启用操作所需的资源。将在行动完成后从控制国扣除。默认 = {} （无成本）
    cost = { energy = 5000 }

    # 仅在 `scope = fleet` 时使用。允许执行行动的目标舰队的最大距离
    # 如果太远，舰队将追逐目标舰队，直到它在期望的范围内
    # default = 1.0
    fleet_action_range = 10.0

    # 如果是，等待舰队中的船只静止，然后开始脚本操作
    # default = yes
    # For AI: always no
    wait = no

    # 关于 AI 使用特定脚本顺序的信息
    ai = {
        # 整数值，代表 AI 在选择此动作时给予的优先级
        # 如果是 0 或更低，AI 将忽略它
        # default: -1
        # 默认情况下 AI 不会使用这个动作
        weight = 1

        # 如果是，AI 将能够在战争中使用。
        # default = yes
        war = yes
        # 仅适用于 `scope = fleet`。如果是，目标舰队将从敌方舰队中撤出（见下文）
        # default: yes
        enemy = yes


        # 根据脚本操作范围，目标候选人将是：
        # scope = self # 自触发舰队
        # scope = planet # 当AI决定舰队的下一个任务时，舰队当前系统中的行星
        # scope = fleet AND enemy = yes # 敌方舰队
        # scope = fleet AND enemy = no # f己方舰队

        # 为了让 AI 决定使用脚本操作，所有常规条件都适用：possible, trigger, cost, cooldown
        # AI 将在可能的情况下优先使用脚本操作而不是常规命令
    }

    # 脚本操作按钮的快捷键
    # 像 `CTRL+R` 这样的常规组合也是可以接受的
    # 如果同一个快捷键同时用于同一舰队的多个可能动作，
    # 快捷方式只适用于其中一个
    # 同样的，如果相同的快捷方式已经用于任何其他已经存在的按钮，也如此
    shortcut = "R"

    # 对于英雄船（由 `ship_size` 决定）的 UI
    # 如果为 0，脚本操作按钮将位于常规永久行动栏上
    # 如果 > 0 ，脚本操作按钮将位于自定义行动栏，按槽号排序
    # Default: 0
    slot = 1

    # 在执行行动时触发舰队中所有船只的特定动画状态
    # 这覆盖了自己的武器投射诱导动画，以及常规的动画状态
    # 如果 `scope = self` 则忽略，因为在这种情况下行动是即时的（没有进度）
    progress_anim_state = "moving"

    # 在行动完成/执行的那一刻，触发舰队中所有执行行动的船只的特定非循环动画状态
    # 这覆盖了自己的武器投射诱导动画，以及常规的动画状态
    finish_anim_state = "rage"
}
```
