---
title: 政府(Goverments)
---

## 政体(authorities)

```pdx
auth_machine_intelligence = {   # ID，一般以“auth”开头
    machine_empire = yes        # 是否是机械帝国
    has_heir = no               # 是否有继承人，默认无
    # uses_mandates = yes       # 是否使用承诺，默认无，在Stellaris\common\mandates目录
    # has_agendas = yes         # 是否使用议程，默认无，在Stellaris\common\agendas目录
    # max_election_candidates = 4   # 最大候选人槽位，默认无限
    # election_term_years = 40  # 选举年限，多少年举行一次，默认0
    # election_term_variance = 10   # 选举年限的上下浮动区间，如本例，实际应该为40±10年，默认0
    # can_have_emergency_elections = yes    # 能否重新选举
    # emergency_election_cost = 250 # 重新选举的影响力花费
    election_type = none    # 选举类型，目前有“无”、“民主”、“寡头”三个类型
    has_factions = no       # 是否有派系
    can_reform = no         # 是否可以改革政府，例如改变公民性或者政体等，默认允许
    localization_postfix = machine_intelligence     # 用于本地化的前缀

    valid_for_released_vassal = no  # 能否放出这样政体的附庸

    playable = {            # 什么条件下可以被玩家使用，一般用于dlc的判断
        host_has_dlc = "Synthetic Dawn Story Pack"
    }
    possible = {            # 在什么条件下可用
        ethics = {
            value = ethic_gestalt_consciousness
        }
    }
    random_weight = {       # 随机刷出权重，一般仅用dlc的判断
        modifier = {
            factor = 0
            NOT = { host_has_dlc = "Synthetic Dawn Story Pack" }
        }
    }

    traits = {              # 必须拥有什么特质
        trait = trait_machine_unit
    }

    country_modifier = {    # 这个政体对整个帝国的修正
        colony_start_num_pops_add = 1
        station_gatherers_produces_mult = 0.1
    }

    tags = {                # 本地化key
        AUTH_MACHINE_INTELLIGENCE_IMMORTAL_LEADERS
        AUTH_MACHINE_NATIVE_POPS
        AUTH_MACHINE_FOREIGN_POP_SURVIVAL
        AUTH_MACHINE_TECH_ADDITIONS
        AUTH_MACHINE_TECH_RESTRICTIONS
        AUTH_MACHINE_ASCENSION_RESTRICTIONS
    }
}
```

和大多数项目一样，政体需要本地化和贴图。需要注意的是贴图的格式，原版贴图在 `Stellaris\gfx\interface\icons\governments\authorities` 目录下，<font color="red"><b>需要两个版本</b></font>，一个是**44\*44**，一个是**35\*35**大小。

## 公民性(civics)

```pdx
civic_beacon_of_liberty = {     # ID应该以“civic”开头
    # pickable_at_start = yes   # 是否可以在开局被选择，默认是
    # playable = {}             # 满足什么条件才可以被玩家使用（通过UI）
    # can_build_ruler_ship = no # 意义不明，原版没见使用，默认否
    # modification = yes        # 能否被替换，默认否
    # traits = { trait = xxx }  # 需要什么种族特质，当被选择之后自动添加该特质
    # description = xxx         # 描述，会覆盖自动生成的文本
    # has_secondary_species = { # 是否有第二种族
    #     title = civic_machine_assimilator_secondary_species   # 对于第二种族的描述
    #     traits = {
    #         trait = trait_cybernetic      # 第二种族需要的种族特质
    #     }
    # }
    potential = {   # 对于“限制”的逻辑判断
        ethics = { NOT = { value = ethic_gestalt_consciousness } }
        authority = { NOT = { value = auth_corporate } }
    }
    possible = {    # 对于“可用”的逻辑判断
        authority = {
            value = auth_democratic
        }
        ethics = {
            OR = {
                text = civic_tooltip_egalitarian
                value = ethic_egalitarian
                value = ethic_fanatic_egalitarian
            }
            NOR = {
                text = civic_tooltip_not_xenophobe
                value = ethic_xenophobe
                value = ethic_fanatic_xenophobe
            }
        }
    }
    random_weight = { base = 5 }    # AI随机刷出率，支持逻辑判断
    modifier = {                    # 国家修正器
        country_unity_produces_mult = 0.15
    }
}
```

与政体类似，也需要本地化和贴图文件（原版贴图目录 `Stellaris\gfx\interface\icons\governments\civics` ）。

## 起源(origin)

在 2.6 新加入的起源系统，使得公民性更加倾向于加 buff 而非增加功能，将更多的功能应用于起源，**由于起源是由公民性派生而来，因此与公民性处于同一目录下**，不过两者属性有些许不同，我们通过解析文件来看看起源结构：

```pdx
origin_life_seeded = {
    is_origin = yes     # 声明是否为起源
    icon = "gfx/interface/icons/origins/origins_life_seeded.dds"    # 起源图标
    picture = GFX_origin_life_seeded    # 起源大图，需要注册后使用

    starting_colony = pc_gaia           # 设定开局殖民地类型
    habitability_preference = pc_gaia   # 设置偏好星球（优先度高于civic）
    preferred_planet_class_neighbor = no

    # has_secondary_species = {         # 同公民性，是否拥有第二物种
    #     title = x
    # }

    playable = {        # 同civic
        host_has_dlc = "Apocalypse"
    }

    possible = {        # 同civic
        authority = { NOT = { value = auth_machine_intelligence } }
    }

    description = "civic_tooltip_life_seeded_effects"   # 起源效果描述本地化key

    random_weight = {   # ai随机使用该起源权重
        base = 5
    }
    # advanced_start = no   # 是否为高级开局
    # traits = {}           # 使用该起源所需的物种特质
    # non_colonizable_planet_class_neighbor = yes       # 是否保证周围有最小宜居星球
    # initializers = {}     # 初始化星系列表，其中填写的均是预设星系
                            # 在common/solar_system_initializers文件夹中声明，涉及预设星系的编写
    # flags = {}            # 设定游戏开始的country_flag（在event中使用）
}
```

## 政府形式(governments)

```pdx
# Theocratic Oligarchy
gov_theocratic_oligarchy = {            # ID 应该以“gov”开头
    ruler_title = RT_CHIEF_PRECENTOR    # 统治者的名称（默认、男性）
    ruler_title_female = RT_CHIEF_PRECENTOR_FEMALE  # 统治者的名称（女性）
    # heir_title = HT_CROWN_PRINCE      # 继承人的名称（默认、男性）
    # heir_title_female = HT_CROWN_PRINCESS         # 继承人的名称（女性）
    # use_regnal_names = yes / no       # 是否使用区域名称，应该与帝制政府有关，意义不明
    # dynastic_last_names = yes / no    # 是否使用王朝的姓，应该与帝制政府有关，具体意义不明
    # should_force_rename = yes / no    # 是否强制命名，应该用于强制生成本地化帝国名称，但具体意义不明
    election_candidates = {             # 领袖参与选举的权重的逻辑判断
        modifier = {
            add = 100
            leader_class = ruler
        }
        modifier = {
            add = 10
            leader_class = governor
        }
    }

    possible = {    #对于“可用”的逻辑判断
        has_authority = auth_oligarchic
        OR = {
            has_ethic = ethic_spiritualist
            has_ethic = ethic_fanatic_spiritualist
        }
    }

    weight = {      #这个政府形式被赋予这个国家的权重（满足条件的情况下）
        base = 5
    }
}
```

政府形式一般不需要图标，仅需要本地化文本。
