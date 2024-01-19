---
title: 议程(Archaeology)
---

## 小型文物活动(artifact_actions)

目录在 `Stellaris\common\artifact_actions` ，主要是一些小型文物的消耗选项，比如卖掉换能量币，或者加一些 buff 什么的<s>，其实本质上就是一个触发效果的工具人</s>。

```pdx
artifact_arcane_deciphering = {     # ID，不应该重复
    resources = {                   # 经济系统
        category = artifact_actions
        cost = {
            minor_artifacts = 5     # 消耗5个小型文物
        }
    }

    ai_weight = {                   # AI权重相关
        weight = 100
        modifier = {
            factor = 0
            has_resource = { type = minor_artifacts amount < 105 }
        }
    }

    potential = {   # 限制语句，如果不满足条件则无法出现在UI内
        has_technology = tech_arcane_deciphering
    }

    allow = {               # 允许，不满足就是灰色
        custom_tooltip = {  # 当不满足这个语句内的条件时，将会显示fail_text的内的本地化内容
            fail_text = "requires_arcane_deciphering_no_cooldown"   # 文本
            NOT = { has_modifier = arcane_deciphering_cooldown }
        }
    }

    effect = {      # 效果，可以是执行事件，也可以是直接执行某个效果
        custom_tooltip = artifact_arcane_deciphering_effect
        hidden_effect = {
            if = {
                limit = {
                    is_ai = no
                    NOT = { has_country_flag = arcana_achievement }
                }
                set_country_flag = arcana_achievement
            }
            add_modifier = {
                modifier = "arcane_deciphering_cooldown"
                days = 720
            }
            owner = {
                country_event = { id = ancrel.10000 }
            }
        }
    }
}
```

## 考古遗址(archaeological_site_types)

目录在 `Stellaris\common\archaeological_site_types` ，里面都是一些考古的坟。

:::note[提示]

遗址与事件相互绑定！

:::

```pdx
site_type_name = {                  # 坟头的ID
    # picture = <sprite key>        # 图片，跟事件类似，需要注册路径
    # desc = <triggered event desc> # 这个坟头的描述
    max_instances = <int>           # 决定最大生成数目。只有在使用 `create_archemical_site = random` 时，才可以检查该类型星系的最大实例数
    # weight = <scriptable value>   # 权重为随机权重，仅在使用 `create_archemical_site = random` 时使用。脚本值类型由` <int>` 或` <mean_time_to_happen>` 定义。
    stages = <int>                  # 有多少个阶段，一般最大为6
    potential = <trigger>           # 潜在的，不满足条件不出现在UI.范围为：this=舰队，from=坟头
    allow = <trigger>               # 是否允许，范围同上
    visible = <trigger>             # 检查具有 this=国家 的范围是否可以看到 from=坟头
    stage = {                       # 有关于阶段的定义，取决于你写代码的顺序。
    # difficulty = <interval int>   # 难度，应该为正整数
    #     icon = <string>           # 此阶段的小图标
    #     event = <string>          # 会触发什么事件
    # }
    on_roll_failed = <effect>       # 掷骰失败时的随机效果，范围 this=舰队 ， from=坟头 ，这些效果一般写在 `scripted_effects`
    on_create = <effect>            # 当这个坟头被创造时，触发的效果，范围同上
    on_visible = <effect>           # 当做个坟头被看见，触发的效果，范围同上
}
```

## 遗珍(relics)

目录在 `Stellaris\common\relics` 。

```pdx
r_ev_fleet_maintenance = {  # ID,这个遗珍的唯一ID
    activation_duration = @triumph_duration     # 冷却时间
    portrait = "GFX_relic_ev_fleet_maintenance" # 图标，动态，需要定义
    sound = "relic_activation_the_rubricator"   # 点击的声音
    resources = {           # 经济系统
        category = relics
        # Activation cost
        cost = {
            influence = @activation_cost
        }
    }
    ai_weight = {           # AI权重
        weight = 10
    }
    triggered_country_modifier = {  # 选择性的国家修正，满足条件的时候才生效
        potential = {
            NOT = {
                is_country_type = default_ev
            }
        }
        country_base_engineering_research_produces_add = 500
    }
    country_modifier = {    # 国家修正
        ship_homeless_ev_influence_upkeep_mult = -0.25
    }
    score = 4000            # 获得这个遗珍计算多少分，用于游戏内比分
    active_effect = {       # 启动的时候的效果
        if = {
            limit = {
                is_country_type = default_ev
            }
            change_variable = {
                which = ev_maintenance_value
                value = 10
            }
            add_modifier = {
                modifier = "relic_ev_fleet_maintenance_1"
                days = @triumph_duration_short
            }
        }
        else_if = {
            limit = {
                NOT = {
                    is_country_type = default_ev
                }
            }
            add_modifier = {
                modifier = "relic_ev_fleet_maintenance_2"
                days = 2400
            }
        }
        custom_tooltip = relic_triumph_cooldown
        hidden_effect = {
            add_modifier = {
                modifier = "relic_activation_cooldown"
                days = @triumph_duration
            }
        }
    }
    possible = {            # 检测是否能被启动
        custom_tooltip = {
            fail_text = "requires_relic_no_cooldown"
            NOT = {
                has_modifier = relic_activation_cooldown
            }
        }
    }
}
```
