---
title: 局势(Situation)
---

局势为蠢驴在 3.6 版本，主要用于设计需要追踪和影响正在进行的故事的系统，
其功能较之前所列举的 Common 条目更为复杂，但不同于联邦相关内容（Federation）的复杂，
该条目仅仅只涉及两个主要文件夹，即 `common/situations` 以及 `events`。


:::note

局势系统的编写需要有一定的[事件](../../event_modding/event_overview)基础。
建议阅读相关基础介绍后再阅读本篇文章。

:::

## 基本概念

- 目标(Target)：任何局势都需要有一个用于承载功能实现的目标。
  典型参考为一个星球(Planet)或一个国家(Country)。
- 进度(Stages)：局势需要有用来控制故事进程的进度条(Progress Bar)，
  从 0 到 100 被分割成不同的阶段。
- 措施(Approahes)：局势需要用措施来控制故事走向。

## 局势机制

局势需要月度触发的随机事件与固定时间，且需要一个或两个用于结束局势的触发器。

局势系统的复杂性与多样属性可以构建较大的空间，其可以从 0 开始推进到 100，
也可以从 100 开始衰退到 0，亦可以从 50 开始进行左右摇摆的选择。

局势当中所有涉及到 `scope` 的地方，`this/root = situation`，
并且可以通过 `owner` 跳转到 `country`，`target` 跳转到目标。
当局势没有设置目标时，UI 将会自动显示当前国家，
但是 `target = { }` 在条目中将失效。

局势的目标可以指定除星球与国家以外的目标，
但这可能会使 `triggered_target_modifier` 失效，
因此需要斟酌目标的选择。

局势的目标也可以指向其他国家，这将对模拟复杂的情景环境起到非常重要的作用
（以《Overlord》DLC 新增的雇佣兵飞地举例，其依靠局势给予玩家各种随机事件以及奖励）。

局势可以最多有两个结局，一个是进度达到 0（`on_fail`），
一个是进度走完（`on_progress_complete`）。

局势进度条被划分为一个或多个阶段，每个阶段都可以有与之相关的不同修正。

:::caution[性能]

局势的性能消耗十分大，因此各位需要谨慎处理其中的内容，
尽量在编写过程中考虑到优化问题。

:::

## 属性解析

```pdx
test_situation = {
    # 以本局势为例，需要的本地化 key 为：
    # test_situation: 当局势存在之时显示，可以使用支架命令，
    # 如 [Target.GetName] 等
    # test_situation_type: 当局势不存在之时所展示的名称
    #（使用 start_situation 之时展示的局势名称，此时无法使用支架命令）
    # test_situation_desc: 局势描述，可以使用支架命令
    # test_situation_monthly_change_tooltip: 描述玩家可以通过怎样的操作影响局势进程。
    desc = { 
        # triggered_desc，当需要动态变化局势描述之时采用的结构，
        # 满足 trigger 的条件以显示对应的描述
        text = x
        trigger = { }
        # 可以声明多个以满足不同情况
    }
    picture = GFX_evt_alien_nature # 声明局势图片
    # picture = {
        # triggered_picture, 类似事件一样，局势可以通过满足不同 trigger 显示不同图片
        # picture = GFX_evt_alien_nature
        # trigger = {
        # }
        # 可以声明多个以满足不同情况
    # }

    # 控制局势应用在UI上的颜色，属性有 positive/negative/neutral 三种。
    # 通俗来说三种对应局势的：好，坏，有好有坏
    category = positive

    complete_icon = GFX_icon             # 定义进度条右方的图标
    complete_icon_frame = GFX_icon_frame # 定义进度条右方图标的外框
    fail_icon = GFX_icon                 # 定义进度条左方的图标
    fail_icon_frame = GFX_icon_frame     # 定义进度条左方图标的外框

    # 当局势被创造之时触发的效果
    on_start = { }

    # 当完成局势之时触发的效果
    on_progress_complete = {
        # 蠢驴建议最后加上 destroy_situation = this 以结束局势
        # （虽然不加也会自己删）
        destroy_situation = this
    }

    # 当局势归 0 之时触发的效果
    on_fail = {
        destroy_situation = this
    }

    # 当局势满足 trigger 之时将中断局势并触发 on_abort
    abort_trigger = { }
    # 当局势满足 abort_trigger 之时触发的效果
    on_abort = { }

    # 给予正在经历局势的国家的修正
    modifier = {}
    # 有条件的修正，当满足 potential 之时才会激活修正
    triggered_modifier = {
        potential = { }
        modifier = { }
    }
    # 只有当 target 为 planet 之时该修正才会生效！
    # 给予目标（Target）的修正
    target_modifier = { }
    # 同 triggered_modifier，作用范围为目标（Target）
    triggered_target_modifier = {
        potential = { }
        modifier = { }
    }

    # 局势将从何值开始进行
    start_value = 20

    # 局势进度类型 monodirectional/bidirectional（单向/双向 默认为单向）
    progress_direction = bidirectional
    # 效果为 category，只有局势进度类型为双向（bidirectional）之时才生效，
    complete_category = positive # 只影响右方
    fail_category = negative     # 只影响左方

    stages = {
        # 本地化 key，可以定义额外的本地化 samplet_stage_desc 以显示提示
        samplet_stage = {   
            icon = GFX_situation_stage_1                      # 图标
            icon_background = GFX_situation_stage_frame_green # 背景
            end = 40            # 该阶段结束所需的进度
            on_first_enter = {} # 当第一次进入阶段之时所触发的效果

            # 显示在阶段的提示当中（ on_first_enter 不会显示，因为这将透露修正）
            custom_tooltip = x 

            # 以下条目效果同上
            modifier = {} 
            triggered_modifier = { 
                potential = { }
                modifier = { }
            }
            target_modifier = { }
            triggered_target_modifier = { 
                potential = { }
                modifier = { }
            }
        }
    }

    # 每个月刷新一次进度
    monthly_progress = {
        base = 1     # 默认的月进度
        modifier = { # 满足何种条件以添加进度，值支持使用 script_values
            add = 2
            desc = federation_acceptance_reduce_fleet # 描述月进度的来源
            owner = {
                has_technology = tech_alloys_1
            }
        }
        modifier = {
            desc = federation_acceptance_reduce_fleet
            owner = {
                has_technology = tech_alloys_2
            }
        }
    }

    approach = {
        # 本地化 key，可以定义额外的本地化 approach_a_desc 以显示提示
        name = approach_a
        icon = GFX_situation_approach_shrug
        icon_background = GFX_situation_approach_bg_red
        allow = { }     # 满足条件才可以使用该措施
        potential = { } # 满足条件才会显示该措施    
        on_select = { } # 当选择该措施之时触发的效果
        default = yes   # 如果为 yes，局势开始之时将默认该措施设置为当前采用的措施

        # 如果不满足 allow 以及 potential ，该措施将会失效
        # 但当该局势通过语句 set_situation_locked = yes 锁定之时，其将仍然生效
        # 这意味着如果要动态切换措施，需要先用 set_situation_locked = yes
        # 锁定，选择措施之后再解锁即可。

        # 以下修正只有选择该措施之时才会激活，其他同上
        triggered_modifier = { 
            potential = { }
            modifier = { }
        }
        target_modifier = { }
        triggered_target_modifier = { 
            potential = { }
            modifier = { }
        }

        resources = { # 措施激活之时的资源开销
            category = situations
            cost = { }
            upkeep = { }
            produces = { }
        }
        ai_weight = { } # ai选择该措施的权重         
    }

    # 局势自带一个月检测的 action，其触发的事件类型只能为 situation_event
    # 从技术层面来说，该 action 名为 test_situation，
    # 所以不要让你的 situation 名称与预设的 on_action（如 on_monthly_pulse）重名！
    # 这也意味着局势系统性能消耗很大，请谨慎考虑内容。
    on_monthly = { 
        events = {
        }
        random_events = {
        }
    }
    # 事件影响 situation 之时可能会导致生成的提示有误，
    # 因此在选项当中应该采取 tooltip = {} 来将生成的提示正确显示。
}
```
