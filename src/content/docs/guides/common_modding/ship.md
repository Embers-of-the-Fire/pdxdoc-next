---
title: 舰船(Ship)
---

## 概览

-   `component_sets` 为武器配件组的定义文件，作为一个可被玩家使用的武器，这是必须的。
-   `component_slot_templates` 是定义一个槽位，比如原版的 X,H 槽等,一般情况下不做改动。
-   `component_tags` 指拥有的属性，例如能量，动能等，一般情况下不做改动。
-   `component_templates` 是武器的配置，具体的定义了一个武器的各种数据。
-   `ship_behaviors` 是指舰船在交战的时候的动作，比如线列，蜂群，炮击电脑等。
-   `ship_sizes` 是定义一个船的所属类型。
-   `section_templates` 舰船区段，这个是为了确定一个某种类型的船的区段能装有什么样的槽位，比如在一个战列舰上装 3L 槽。
-   `global_ship_designs` 是指一个特定的舰船装配，一般用于事件船只。

## 舰船部件(Component Templates)

```pdx
weapon_component_template = {       # 声明这是什么配件，目前这个是武器部件，utility_component_template是防御组件（盾等），strike_craft_component_template是舰载机类
    key = "LARGE_RED_LASER_IMBA"    # ID,这个武器配件在游戏内的独一无二的识别key
    size = large                    # 属于哪一个槽位，比如S,M,L,P,H等
    type = instant                  # 属于什么类型的武器，instant为直射武器，point_defence是点防御，missile是导弹，planet_killer是巨像等
    icon = "GFX_ship_part_laser_1"  # 图标，原版的在Stellaris\gfx\interface\icons\ship_parts里面，需要用interface进行注册
    icon_frame = 1
    power = 250000000               # 正数指生成多少部件能源（不是能量币！）负数指消耗
    prerequisites = {               # 所属科技
        "tech_lasers_1_imba"
    }
    component_set = "RED_LASER_IMAB"        # 所属的组件集
    projectile_gfx = "infrared_laser_l"     # 发射时候的武器效果
    tags = {        # 属于什么类型的武器，比如能量系，动能系等，主要影响加成科技
        weapon_type_energy
        weapon_type_kinetic
        weapon_type_explosive
        weapon_type_strike_craft
    }
    ai_tags = {     # 这个武器的AI
        weapon_role_anti_armor
    }
    upgrades_to = "LARGE_BLUE_LASER"        # 下一个升级
    damage = {      # 伤害浮动
        min = 0
        max = -1474836480
    }
    windup = {      # 注意，(windup.min + windup.max) / 20 + total_fire_time / 10 = 实际开火时间，单位为天
        min = 0
        max = 0
    }
    total_fire_time = 0.1
    range = 400                     # 范围
    accuracy = 1                    # 命中，1=100%
    tracking = 1                    # 追踪，1=100%
    hull_damage = 0.5               # 船体伤害系数 1=正常，2 = +100%，0.5 = -50%，下面的护盾与护甲都一样
    shield_damage = 0.5             # 护盾伤害系数
    armor_damage = 0.5              # 护甲伤害系数
    shield_penetration = 0.75       # 护盾穿透系数，1 = +100%，下面的护甲穿透也一样适用
    armor_penetration = 0.75        # 护甲穿透系数
    resources = {                   # 资源，cost花费，produces生产，upkeep维护费
        category = ship_components  # 所属的经济分类
        cost = {
            alloys = @l_t1_cost
        }
        produces = {
            energy = 0
            minerals = 0
            food = 0
        }
        upkeep = {
            energy = @l_t1_upkeep_energy
            alloys = @l_t1_upkeep_alloys
        }
    }
    hostile_aura = {        # 此为敌对光环，friendly_aura为友军光环
        name = "aura_shield_dampener_ev"
        radius = 2000 #半径
        apply_on = ships
        stack_info = {
            id = hostile_shield_dampener_ev     # ID应该唯一
            priority = 1
        }
        modifier = {        # 所受到的修正
            ship_shield_reduction = 10
            ship_armor_reduction = 10
            ship_hull_mult = -10
        }
        damage_per_day = {  # 每日在这个光环内受到的伤害
            shield_damage = 100     # 造成的是100点的护盾伤害
            accuracy = 0.5          # 指的是准确度50%
        }
        graphics = {
            area_effect = {
                entity = "circle_area_entity"
                dynamic_scale = yes
            }
            ship_effect = {
                entity = "ship_aura_negative_entity"
                dynamic_scale = no
            }
        }
    }
    ai_weight = {       # AI权重相关
        weight = 0
    }
}
```

## 组件集合(Component Sets)

```pdx
# 以下为组件集
component_set = {                   # 通用开头，不要更改
    key = "RED_LASER_IMAB"          # 组件集的 ID
    icon = "GFX_ship_part_laser_1"  # 图标
    icon_frame = 1
}

# 以下为槽位定义
point_defence_turret = {        # 槽位 ID，不能重复
    size = point_defence        # 所属的大类
    component = weapon          # 这是武器还是防御部件？
    entities = {                # 实体
        weapon_type_kinetic = "small_kinetic_gun_entity"
        weapon_type_energy = "turret_point_defence_entity"
    }
}
```

## 舰船类型(Ship Sizes)

```pdx
corvette = {    # 舰船类型 ID
    formation_priority = @corvette_formation_priority   # 间距，没什么卵用
    max_speed = @speed_very_fast    # 最大速度，为舰船本身基础速度
    acceleration = 0.35             # 加速度
    rotation_speed = 0.1            # 转动速度
    collision_radius = @corvette_collision_radius
    max_hitpoints = @corvette_hp    # 生命值，为舰船本身生命值（结构值）
    modifier = {                    # 自带修正
        ship_evasion_add = @corvette_evasion
        ship_piracy_suppression_add = 10
    }
    size_multiplier = 1     # 所占用舰队容量，等于1 就是指占据 1 舰队容量
    fleet_slot_size = 1     # 所占舰队的舰队组成比的大小
    section_slots = { "mid" = { locator = "part1" } }   # 拥有的区段，名称随意
    num_target_locators = 2 # 最多的点位
    is_space_station = no   # 是否是空间站
    icon_frame = 2          # 图标
    base_buildtime = @corvette_build_time   # 建造的基础时间
    can_have_federation_design = yes        # 是否能成为联邦舰船
    enable_default_design = yes             # 是否是生成一个默认设计
    default_behavior = swarm                # 初始作战 AI 的类型
    prerequisites = { "tech_corvettes" }    # 所需科技
    combat_disengage_chance = 1.00          # 紧急跃迁能跳出的概率修正
    class = shipclass_military              # 属于哪个大类的船只
    construction_type = starbase_shipyard   # 建造方式，是通过工程船还是船坞等方式建造
    required_component_set = "power_core"   # 右侧的部件设定，下同（有些船只可能没有这些）
    required_component_set = "ftl_components"
    required_component_set = "thruster_components"
    required_component_set = "sensor_components"
    required_component_set = "combat_computers"
    resources = {           # 资源
        category = ships    # 资源类型
        upkeep = {
            energy = @corvette_upkeep_energy
            alloys = @corvette_upkeep_alloys
        }
    }
    min_upgrade_cost = {    # 最小升级花费,貌似没啥用
        alloys = 1
    }
}
```

## 舰船区段(Section Templates)

```pdx
ship_section_template = {
    key = "BATTLESHIP_BOW_L1M1S2"   # ID,不能重复
    ship_size = battleship          # 所属类别
    fits_on_slot = bow              # 是哪个区段？
    should_draw_components = yes
    entity = "battleship_bow_L1M1S2_entity" # 区段模型
    icon = "GFX_ship_part_core_bow"         # 图标
    icon_frame = 1
    component_slot = {                  # 武器位
        name = "LARGE_GUN_01"           # 名称，单个区段内不能相同，否则只有一个能生效
        template = "large_turret"       # 槽位所述
        locatorname = "large_gun_01"    # 位点名称，就是模型的武器发射位置
    }
    component_slot = {
        name = "MEDIUM_GUN_01"
        template = "medium_turret"
        locatorname = "medium_gun_01"
    }
    component_slot = {
        name = "SMALL_GUN_01"
        template = "small_turret"
        locatorname = "small_gun_01"
    }
    component_slot = {
        name = "SMALL_GUN_02"
        template = "small_turret"
        locatorname = "small_gun_02"
    }
    large_utility_slots = 3         # 防御槽位的简略写法，这里指的是3个L槽防御位
    resources = {
        category = ship_sections
        cost = {
            alloys = @section_cost
        }
    }
}
```
