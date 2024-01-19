---
title: 职业(Pop Jobs)
---

职业的一般范围是**某个星球**。

```pdx
clerk = {               # ID
    category = worker   # 阶级
    condition_string = WORKER_JOB_TRIGGER   # 用于检测这个工作是否可用的一系列逻辑。在 `Stellaris\common\scripted_triggers` 里面
    possible_precalc = can_fill_worker_job  # 能胜任什么工作，game_rule里面改
    building_icon = building_residence      # 这个工作的背景建筑图标，图标位置同建筑
    clothes_texture_index = 2       # 外表，仅影响外观

    planet_modifier = { # 星球修正，同建筑
        planet_amenities_add = 2
        trade_value_add = 2
    }
    # resources = {  }  # 同建筑，可以添加生产/消耗等
    # country_modifier = {}         # 同建筑，国家范围内的修正。
    # pop_modifier = {} # 对于承担该职业的pop的修正
    triggered_planet_modifier = {   # 条件触发的星球修正，同建筑
        potential = {
            OR = {
                has_trait = trait_robot_domestic_protocols
                has_trait = trait_charismatic
            }
        }
        modifier = {
            planet_amenities_add = 0.4
        }
    }
    triggered_planet_modifier = {   # 条件触发的星球修正
        potential = {
            has_trait = trait_repugnant
        }
        modifier = {
            planet_amenities_add = -0.4
        }
    }
    triggered_planet_modifier = {   # 条件触发的星球修正
        potential = {
            OR = {
                has_trait = trait_thrifty
                has_trait = trait_nuumismatic_administration
            }
        }
        modifier = {
            trade_value_add = 0.5
        }
    }
    weight = {      # pop意图工作的权重，拥有高权重的pop会导致低权重的pop被替换
        weight = @clerk_job_weight      # `@` 指引用数值
        modifier = {
            factor = 0.25
            is_enslaved = yes
            can_take_servant_job = no
        }
        modifier = {
            factor = 2
            OR = {
                is_non_sapient_robot = yes
                is_shackled_robot = yes
            }
            can_take_servant_job = no
        }
        modifier = {
            factor = 1.5
            OR = {
                has_trait = trait_thrifty
                has_trait = trait_nuumismatic_administration
            }
        }
        modifier = {
            factor = 0.1
            can_take_servant_job = yes
        }
    }
}
```

**职业需要本地化**，一般包括：

```yaml
l_simp_chinese:
    job_<职业ID>:0 "占位符"
    job_<职业ID>_plural:0 "表达占位符的复数形式"
    job_<职业ID>_desc:0 "表达占位符的描述"
    job_<职业ID>_effect_desc:0 "显示在建筑里面的占位符的效果，例如消耗什么生成什么"
    mod_job_<职业ID>_add:0 "$job_<职业ID>$职业"
    mod_job_<职业ID>_per_pop:0 "每$VALUE$个人口有§G+1§!个$job_<职业ID>$职业"
    mod_job_<职业ID>_per_pop_short:0 "每$VALUE$个£pop£有§G+1§!个£mod_job_<职业ID>_add"
```
**也需要图标**，一般包括：

-   `job_<职业ID>` 的图标，原版在 `Stellaris\gfx\interface\icons\jobs` 里面
-   `mod_job_<职业ID>_add` 的图标，原版在 `Stellaris\gfx\interface\icons\modifiers` 里面
