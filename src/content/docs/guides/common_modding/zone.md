---
title: 区划特化(Zone)
---

区划特化（Zone）的文件目录在 `Stellaris/common/zone`，其不仅需要本地化文件，还需要注册贴图文件。（详见贴图部分教程）

下面我们以原版的档案馆作为例子：

```pdx
# id，你的 zone 在程序里面的名称
zone_research_unity = {
    # 区划特化的图标
    icon = GFX_job_bureaucrat
    # 该特化的基础建造时间，引用 `@zone_buildtime = 360`
    base_buildtime = @zone_buildtime
    # 限制语句。不符合此条件时无法在 UI 内被显示
    potential = { # planet scope
        hidden_trigger = { exists = owner }
        # 转到国家域
        owner = {
            # 非生体荒野
            is_wilderness_empire = no
        }
    }

    # 允许的判断，比 `potential` 的优先级要低，当不满足时显示为黑白图
    unlock = { # planet scope
        hidden_trigger = { exists = owner }
        owner = {
            is_wilderness_empire = no
        }
    }

    # 建造该区划特化所需资源
    resources = {
        category = planet_zones
        cost = {
            # 引用 `@zone_cost = 1000`
            minerals = @zone_cost
        }
    }

    # 该区划特化内的建筑槽位可以建的建筑 sets
    included_building_sets = {
        research      # 研究
        unity         # 凝聚力
        automation    # 自动化建築
        origin        # 起源建築（如远古克隆仓）
    }

    # 内联代码，详见教程的内联代码部分
    inline_script = {
        # 引用 jobs 下的 `zone_researchers_add.txt`
        script = jobs/zone_researchers_add
        AMOUNT = @scaling_district_researchers_4_jobs
        LARGE_AMOUNT = @scaling_district_researchers_2_jobs
    }

    inline_script = {
        # 引用 jobs 下的 `zone_unity_jobs_add.txt`
        script = jobs/zone_unity_jobs_add
        AMOUNT = @scaling_district_unity_4_jobs
    }

    # 修正
    planet_modifier = {
        zone_building_slots_add = 3
    }

    # 引用 zones 下的 `shared_city_non_urban_zone_modifiers.txt`，减少住房
    inline_script = {
        script = zones/shared_city_non_urban_zone_modifiers
    }

    # 添加一段带条件判断的描述
    triggered_desc = {
        trigger = {
            always = yes
        }
        text = zone_research_unity_triggered_desc
    }
}
```

从上面的例子，我们可以看得出，区划特化包括以下几个模块：

- 区划特化的名称
- 区划特化所需资源（时间和资源）
- 特化建筑（给多少建筑槽，允许建造哪些建筑）
- 特化效果（减少住房增加岗位等）

## 添加自己的第一个区划特化

在学习到了一个区划特化有怎么样的组成之后，现在让我们开始真正的动工，写下你的 mod 里面第？个内容——你的第一个区划特化。

值得注意的是，Stellaris 里面不论是什么项目的 ID，都应该是唯一且确定的。
除非你是修改原版的区划特化，不然一定要确认原版是否已经使用了这个 ID。
比如这次我们起一个 `zone_test` 名称的，那么现在应该看起来是这样的：

```pdx
zone_test = {
    # 此处可以自用你喜欢的图标
    icon = GFX_job_bureaucrat
    base_buildtime = @zone_buildtime
    potential = {
        always = yes
    }
    unlock = {
        always = yes
    }
    resources = {
        category = planet_zones
        cost = {
            minerals = @zone_cost
        }
    }
    # 此处决定了建筑上限
    max_buildings = 1
}
```


:::danger[兼容性警告]

建议不要乱改原版的码，兼容性非常麻烦

:::

但是我们会发现，在游戏中并没有找到这个区划特化，这是为什么呢？
就像只有采矿能建矿物提取和矿物研究支援区划特化一样，城市能建的区划特化也是有限制的，
我们需要把我们的区划特化加入城市区划能用的区划特化里去。
（其实正经做法是在区划下面的 `zoneslots` 里面新开一项加入该区划，或是在被用的 `zoneslots` 里面加，
这里改的内联其实就是被 `cityslot` 引用的内联，而 `cityslot` 里的区划特化则在城市区划内可以特化。）

复制粘贴 `common\inline_scripts\zones` 和里面的 `allowed_zones_urban`，
在 `zone_trade_wilderness` 的下面加上 `zone_test`，这样再打开游戏，第一步就算是成功了。
不过目前这个区划特化里还什么都不能建，也不提供岗位，下一步就是增加这些了。
当然，我们要做的这么强的区划特化一定有所限制，让我们加上 `potential` 和 `unlock` 的限制。

```pdx
zone_test = {
    icon = GFX_job_bureaucrat
    base_buildtime = @zone_buildtime
    potential = {
        owner = {
            is_ai = no #AI 无法使用
        }
    }
    unlock = {
        owner = {
            # 要求外星材料实验室科技
            has_technology = tech_basic_science_lab_2
        }
    }
    resources = {
        category = planet_zones
        cost = {
            minerals = @zone_cost
        }
    }
    max_buildings = 1
    included_building_sets = {
        research
    }
    triggered_district_planet_modifier = {
        # 此处直接将内联脚本复制粘贴出来（仅供参考）（并且将原 -200 改成 -300）
        planet_housing_add = -300
    }
    inline_script = {
        script = jobs/zone_researchers_add
        # 内联脚本中的参数这里直接定义成 100
        AMOUNT = 100
    }
}
```

若是还想再精细一些，你可以

## 本地化

你已经学会了，只需要 `zone_test` 和 `zone_test_desc` 就行。你还可以加入一段只有在极端唯物情况下才能看见的本地化

```pdx
    triggered_desc = {
        trigger = {
            owner = {
                has_ethic = ethic_fanatic_materialist
            }
        }
        text = zone_test_triggered_desc
    }
```

来描述该区划特化的效果。
