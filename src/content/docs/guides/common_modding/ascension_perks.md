---
title: 飞升(Ascension Perks)
---
    
飞升的文件目录在 `Stellaris/common/ascension_perks` ，而在原版之中，` 00_ascension_perks.txt` 则是原版的飞升文件。而飞升不仅需要本地化文件，还需要在 `gfx/interface` 定义贴图文件目录，一般为名称为 `GFX_<ID>` ，其图片文件应该在 `gfx\interface\icons\ascension_perks` ，而 dds 文件则应该为**52\*60**的图片，其阿尔法通道的图片样式应该为**正六边形状**（因为飞升图标为正六边形）。

下面我们以原版的巨像飞升作为例子：

```pdx
ap_colossus = {     # ID,你的飞升在程序里面的名称
    potential = {   # 限制语句，没有符合此条件，则无法在UI内被显示
        host_has_dlc = "Apocalypse"             # 对于启用的dlc判断，一般我们不需要做这个判断。
        NOT = {
            has_ascension_perk = ap_colossus    # 一般对于一个飞升而言，我们都希望不要在点击之后还能看见它
        }
    }

    on_enabled = {  # 指在启动时触发的语句，可以是效果effect也可以是事件event
        custom_tooltip = enable_colossus_project    # 所显示的启动效果文本，需要本地化文件
        custom_tooltip = describe_colossus_project
        hidden_effect = {
            country_event = { id = apoc.100 }
        }
    }

    possible = {    # 允许的判断，比potential的优先级要低。当不满足时显示为黑白图
        has_technology = tech_titans    # 需要科技---泰坦
        custom_tooltip = {              # 不满足条件所显示的语句
            fail_text = "requires_ascension_perks_3"    # 语句文本
            num_ascension_perks > 2     # 实际的判断语句
        }
    }
    # modifier = {  # 所提供的修正，` @` 为引用数值
    #        description = ap_engineered_evolution_modifier_desc    # 此修正效果显示的语句
    #        description_parameters = { # 用于实现自动生成修正效果文本的语句，不常见。
    #            POINTS = @ap_engineered_evolution_POINTS
    #            COST_MULT = @ap_engineered_evolution_COST_MULT
    #        }
    #        BIOLOGICAL_species_trait_points_add = @ap_engineered_evolution_POINTS
    #        modify_species_cost_mult = @ap_engineered_evolution_COST_MULT
    # }
    ai_weight = {   # 对于AI的点击的权重判定
        factor = 10
        modifier = {
            factor = 10
            OR = {
                has_valid_civic = civic_fanatic_purifiers
                has_valid_civic = civic_machine_terminator
            }
        }
        modifier = {
            factor = 0.1
            is_xenophile = yes
        }
        modifier = {
            factor = 0.25
            is_ethics_aligned = { ARG1 = pacifist }
        }
        modifier = {
            factor = 2
            is_xenophobe = yes
        }
        modifier = {
            factor = 2
            is_militarist = yes
        }
    }
}
```
