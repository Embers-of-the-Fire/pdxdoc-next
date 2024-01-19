---
title: 种族和领袖特质(Traits)
---

## 种族特质修改

种族特质文件在 `Stellaris\common\traits` 文件夹下：

```pdx
trait_enigmatic_intelligence_failed = { # ID应该以“trait”开头
    cost = 0                # 花费
    initial = no            # 能否在初始界面被选择
    randomized = no         # 是否可以随机生成该特质
    modification = no       # 是否能够被修改
    improves_leaders = yes  # 是否影响到领袖特质生成
    advanced_trait = yes    # 是否是高级特质
    opposites = { "trait_intelligent"}  # 与什么特质互斥
    allowed_archetypes = { BIOLOGICAL } # 允许的种族类别（有机，机械等）
    # prerequisites = { tech_xxx }      # 需要的前置科技
    # icon = "<文件相对路径>" # 用于定义图标，默认情况下是gfx/interface/icons/traits/< ID >.dds
    # custom_tooltip = TRAIT_WOMEN_WEAR_EFFECT  # 显示的文本，注意：将会覆盖自动生成的修正器文本
    # slave_cost = {energy = 100}       # 进入奴隶市场被售卖后所得
    # potential_crossbreeding_chance = 1.0      # 生育优先度，越高的数值代表越有可能是有该特质物种增长
    modifier = {            # 人口的修正
        planet_jobs_engineering_research_produces_mult = -0.6
        planet_jobs_physics_research_produces_mult = -0.6
        planet_jobs_society_research_produces_mult = -0.6
    }
}
```

种族特质（领袖特质亦同）所需要的图标应该是**29\*29 像素的 8 8 8 8 ARGB**的*dds 文件*。错误的深度会导致贴图色差。同上，种族特质需要本地化和在本地化文件里面的后缀为\_desc 项目的说明文本，而` §L` 的颜色效果是原版游戏之中最常用的，其次，对于一些特殊的特质，应该也需要对于 `custom_tooltip` 的本地化文本，注意如果手动加入 `custom_tooltip` ，**则会覆盖自动生成的文本效果（主要是修正的外部表现）**。

## 领袖特质修改

类似于种族特质修改，原版文件在 `Stellaris\common\traits` 文件夹下：

```pdx
leader_trait_unyielding = {     # ID应该以“leader”开头
    cost = 1                    # 花费，领袖特质里面默认为1
    modification = no           # 是否可修改，领袖特质里面默认不可
    icon = "gfx/interface/icons/traits/leader_traits/leader_trait_unyielding.dds"   # 图标同上
    modifier = {                # 修正器，对于这个领袖所在的区域生效（国家/舰队/陆军/星球等）
        ship_hull_mult = 0.1
        ship_weapon_damage = 0.05
        ship_disengage_chance_mult = -0.33
    }
    # self_modifier = {}                # 对于自身的修正，比如自身经验获取和招募花费等
    # prerequisites = { tech_xxx }      # 需要的前置科技
    # custom_tooltip = TRAIT_WOMEN_WEAR_EFFECT  # 显示的文本，注意：将会覆盖自动生成的修正器文本
    # initial = no                      # 能否在初始界面被选择
    # randomized = no                   # 是否可以随机生成该特质
    # requires_traits = {trait_psionic} # 拥有哪个特质的人口可以生成带有这个特质的领袖
    leader_trait = { admiral }          # 属于哪个范围的特质，一般和leader_class一样
    leader_class = { admiral }          # 属于哪个类型的特质，一般和leader_trait一样
    opposites = { "leader_trait_nervous" "leader_trait_trickster" } # 和什么是互斥的
}
```

需要的事项基本与种族特质一样（本地化，贴图等）。
