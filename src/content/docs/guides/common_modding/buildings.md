---
title: 建筑(Buildings)
---

建筑的一般范围是**某个星球**，提供的任何职业都属于该星球的星球修正，而稳定度、幸福度、贸易值、舒适度、犯罪值等都属于星球修正，而能在 `Stellaris\common\strategic_resources` 里面所找到的，都属于资源类型，更容易支持各种修正的添加。

官方的例子文件在： `Stellaris\common\buildings\00_example.txt`

```pdx
building_research_lab_1 = {     # ID应该以“building”开头
    base_buildtime = 360        # 基础建造时间，单位为天
    # capital = yes             # 是否是首都建筑
    # can_build = no            # 是否可修建
    # can_demolish = no         # 是否可被拆除
    # can_be_ruined = no        # 能否被废弃
    # can_be_disabled = no      # 能否被停止运作
    # icon = xxx                # 图标文件名称，默认情况下和ID一样。贴图目录在gfx\interface\icons\buildings
    category = research         # 分类，可以让玩家更好的找到该建筑
    potential = {               # 限制，没有满足这些条件则该建筑在可建造列表之中不可见，优先度高于allow语句
        NOT = { has_modifier = resort_colony }
        NOT = { has_modifier = slave_colony }
        NOT = { is_planet_class = pc_habitat }
    }
    allow = {                   # 允许，满足下列条件，则该建筑可以被允许建造
        has_upgraded_capital = yes
    }
    # abort_trigger = {}        # 当该触发器满足条件时，建造将被取消
    # ruined_trigger = {}       # 当该触发器满足条件时，建筑将被废弃
    # destroy_trigger = {}      # 当该触发器满足条件时，建筑将被摧毁
    # convert_to = {}           # 可被转化的目标` [建筑ID](如果判断为不可用)` 例如智械帝国征服了蜂群帝国之后，改变星球首府建筑
    # planet_modifier = { }     # 星球范围内的修正
    # country_modifier = {}     # 国家范围内的修正。
    triggered_planet_modifier = {   # 条件触发的修正器，不满足条件则无法获得修正
        potential = {           # 条件，需要全部满足
            exists = owner      # 是否存在建筑所有者
            owner = { is_regular_empire = yes } # 建筑所有者是常规帝国
        }
        modifier = {            # 修正
            job_researcher_add = 2  # job_<职业ID>_per_pop = xxx 每1/xxx人口提供一个职业
        }
    }
    triggered_planet_modifier = {   # 条件触发的修正器
        potential = {
            exists = owner
            owner = { is_hive_empire = yes }    # 是蜂群帝国
        }
        modifier = {
            job_brain_drone_add = 2
        }
    }
    triggered_planet_modifier = {
        potential = {
            exists = owner
            owner = { is_machine_empire = yes } # 是智械帝国
        }
        modifier = {
            job_calculator_add = 2
        }
    }
    resources = {           # 资源相关
        category = planet_buildings # 类型
        cost = {            # 一次性花费
            minerals = 400
        }
        upkeep = {          # 维持，为每月多少
            energy = 4
        }
    }
    upgrades = {            # 升级到什么建筑
        "building_research_lab_2"
}
    prerequisites = {       # 需要的前置科技
        "tech_basic_science_lab_1"
    }
    triggered_desc = {      # 条件触发的文本，满足条件才对玩家显示建筑的文本
        trigger = {
            exists = owner
            owner = { is_regular_empire = yes }
        }
        text = job_researcher_effect_desc   # 具体的文本
    }
    triggered_desc = {      # 条件触发的文本
        trigger = {
            exists = owner
            owner = { is_hive_empire = yes }
        }
        text = job_brain_drone_effect_desc
    }
    triggered_desc = {      # 条件触发的文本
        trigger = {
            exists = owner
            owner = { is_machine_empire = yes }
        }
        text = job_calculator_effect_desc
    }
    ai_weight = {           # AI的建造权重
        weight = 2
        modifier = {
            factor = 0
            num_buildings = { type = building_research_lab_1 value >= 2 }
        }
        # There are already unworked jobs
        # Blocks buildings unworkable by remaining pops (slaves/robots etc)
        # Will be improved... at some point
        modifier = {
            factor = 0
            free_jobs > 0
        }
    }
}
```

建筑需要本地化（包括有触发器的文本），贴图（一般是**98\*98的8.8.8.8.ARGB**的*dds文件*，目录在 `Stellaris\gfx\interface\icons\buildings` ）。
