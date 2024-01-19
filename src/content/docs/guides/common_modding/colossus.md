---
title: 巨像(Colossus)
---

巨像武器是群星中最为典型的 event 武器之一，通过开火时触发事件以达到某些目的，不是理论上，而是任何 event 能做到的东西，巨像都能做到。因为其中用到了 event 的相关知识，所以如果你还没有学习 event 的内容，建议先去后面几章学习一下再翻回头看本节内容。

想要写出一个能用的巨像，你需要写以下几个内容：[ `technology` ](common_modding/technology.md)、[ `component_templates` ](common_modding/ship.md#舰船部件component_templates)，[ `component_sets` ](common_modding/ship.md#组件集合component_sets)， `on_actions` ， `scripted_triggers` ， `events` ，如果有独特 ai 态度变化需求的话，还需要写 `opinion_modifiers` ，最后是必不可少的本地化 [ `localisation` ](localisation.md)。

> 下面内容将以地爆天星(World Cracker)为例。

## 舰船组件部分

原版中，这部分写在 `common/component_templates/00_weapons_planet_killer.txt` 里。

```pdx
weapon_component_template = {
    key = "PLANET_KILLER_CRACKER"   # 武器的KEY，这个KEY后面还会用到
    size = planet_killer
    type = planet_killer
    use_ship_kill_target = no       # 这个需要写，但暂时不清楚作用
    prerequisites = { "tech_pk_cracker" }

    icon = GFX_ship_part_world_cracker
    icon_frame = 1

    size_restriction = { colossus }
    component_set = "PLANET_KILLER_CRACKER"

    planet_destruction_gfx = "shatter_planet_gfx"   # 毁灭星球时的特效

    ai_weight = {
        factor = 2
    }
}
```

一个武器的 type 也可以同时是 `instant` 和 `planet_killer` ，以实现作为巨像武器的同时作为常规武器进行输出。

如你所见，巨像所需的特殊语句并没有多少，同时地爆天星的代码中并没有写 `windup` 、 `cost` 、 `energy` 等数据，因为所有原版武器的数据都在 `weapon_component.csv` 中写着，我们也**并不需要去管这个**，下面是来自舟 mod 的“冬痕”代码，这是 mod 中更为常见的组件写法。

:::caution[工具建议]

不建议使用原版所用的 csv 格式进行武器编码，因为原版提供的 ogg 与 csv 文件均在读取、保存与编码上容易出现错误，同时并没有那么优秀的快速查阅能力。

:::

```pdx
weapon_component_template = {       # FROSTNOVA
    key = "PLANET_KILLER_ARK_FROSTNOVA"
    size = planet_killer
    type = planet_killer
    use_ship_kill_target = no

    power = -7500
    windup = {min = 90 max = 90 }   # 在巨像类武器中，这个数值被定义为开火准备时间，单位天
    total_fire_time = 30            # 在巨像类武器中，这个数值被定义为开火时间，单位为天
    accuracy = 1 #
    damage = {min = 0 max = 0 }
    range = 0
    resources = {
        category = ship_components
        cost = {
            originiums = 50
        }
    }

    prerequisites = { "tech_pk_ark_frostnova" }

    icon = GFX_ship_part_ark_pk_frostnova
    icon_frame = 1

    size_restriction = { colossus }
    component_set = "PLANET_KILLER_ARK_FROSTNOVA"

    planet_destruction_gfx = "neutron_planet_gfx"
}
```

其他语句已经在之前的舰船组件章节详细说明，组件集合（component_sets）和解锁所需的科技（technology）也不再赘述。

## 触发器(on_actions)

原版的代码在 `common/on_actions/01_planet_destruction.txt` 中。

语句要求为 `on_destroy_planet_with_KEY` ，这里的 KEY 即为之前在组件中定义的 KEY。

```pdx
# Scope:
# this/root = planet that have been fired upon
# from = fleet that fired
# on_destroy_planet_with_PLANET_DESTRUCTION_COMPONENT = {
#    events = {
#        planet_destruction.1
#    }
# }

# Note: The _queued on_actions also fire when the command is made even if there is nothing else in the queue
# Similarly, the _unqueued on_actions fire even if you cancel the order while the weapon is on the wind-up to fire
# They use the same scopes as the standard events

on_destroy_planet_with_PLANET_KILLER_CRACKER = {
    events = {
        crisis.5015             # Menace Objective - Destroy World/Empire
        planet_destruction.110
        planet_destruction.600  # frag holy world
        planet_destruction.100  # goes last because it can kill a country, making some trigger checks impossible
    }
}

on_destroy_planet_with_PLANET_KILLER_CRACKER_queued = {
}

on_destroy_planet_with_PLANET_KILLER_CRACKER_unqueued = {
}
```

在此解释一下最上面的一坨英文是什么意思。最上面的是事件发生的 scope， `THIS` 或 `ROOT` 是 `planet` ， `FROM` 是**执行开火**的**舰队**，可以用于 scope 转换；下面是一个小例子，再下面的两个 note 解释了后面蠢驴空着的两个 on_action 是什么。 `XXX_queued` 指巨像准备开始行动时触发，此时并没有充能完毕也没有开火； `XXX_unqueued` 指的是即使在巨像 windup 时你取消了行动，里面的 events 也会被触发，因为最主要的那个 on_action 只有在巨像充能并开火后才会触发。

接着说主要的 on_actions 中的内容。 `crisis.5015` 是灾飞后炸球得分的事件； `planet_destruction.110` 是最重要的 event，也是后面需要我们自己写的事件； `planet_destruction.600` 是当你炸了圣地时圣卫想要扬了你的事件； `planet_destruction.100` 似乎是一个检测事件，防止炸球毁灭国家而导致的一系列 bug 而存在。第一、三、四个事件在写新的巨像时建议一并带上。

## 脚本触发器(scripted_triggers)

原版内容位于 `common/scripted_triggers/01_scripted_triggers_planet_killers.txt` 中。

这部分的作用是限制巨像的开火条件，即“什么可以打”，“什么不能打”，这个文件是整个巨像系统中最麻烦的，没有之一，很容易写得心态爆炸，也很容易写成逻辑屎山。

所以建议不熟悉这些时不要管什么意思<s>，抄就完了，能跑起来就是胜利</s>。

Scope： `THIS: planet` &emsp;&emsp; `FROM:fleet`

```pdx
can_destroy_planet_with_PLANET_KILLER_CRACKER = {   # 同样需要用巨像武器的KEY命名
    # 只有星球和巨构可以被当作目标
    custom_tooltip = {                  # 限制条件1，满足下列条件，可以开火
        fail_text = is_not_a_standard_planet_or_megastructure   # 不满足条件时，显示什么
        is_a_planet_megastructure = yes # 条件1，是星球或巨构
    }

    # 双重否定表肯定，即满足以上三个条件之一时不能开火
    custom_tooltip = {          # 限制条件2，满足下列条件，可以开火
        fail_text = is_shielded # 如果不满足条件，显示什么信息
        NOR = {                 # 或非门，满足其中条件之一时输出“假”
            is_planet_class = pc_shielded           # 被屏蔽的星球
            is_planet_class = pc_ringworld_shielded # 被屏蔽的环世界
            is_planet_class = pc_habitat_shielded   # 被屏蔽的居住站
        }
    }

    # 这里蠢驴注释掉了！！！！！因为没什么用
    # custom_tooltip = {
        # fail_text = is_not_hostile
        OR = {      # 或门，下列条件其中之一为真时输出“真”
            custom_tooltip = {      # 条件3，满足下列条件，可以开火
                text = is_not_hostile_cracker   # 如果不满足条件，显示什么信息
                # ！！！！！第一次来这里不要看下面这一坨，先抄得能跑起来再说！！！！！
                # 关于下面的space_owner和owner：
                # 我们都知道对于一个星系有这几种情况：【1】无主，没有空间站【2】属于自己，有自己的空间站【3】属于和你不在战争中的ai，有ai的空间站【4】属于和你在战争中的ai，有敌对ai的空间站。
                # 在我们游玩中可以知道，【1】【2】【4】星系中的球我们是可以随便爆破的，而【3】星系中的球我们不能随意爆破，于是就有了 `space_owner` 和 `owner` 。
                # `space_owner` 的作用是检测星系的所有情况（即哨站的所有者），如果巨像的目标星球为【1】星系中的星球，这个检测并不生效，因为没人管你。
                # 如果这个星系有主人，开始判断 `exists = space_owner` ，如果该星系中的球属于你指定的 `space_owner` ，可以开火，如果不属于（即【3】星系），不能开火。
                # 而owner用来检测星球的所有情况，道理同上，因此殖民地、星系、土著需要分开判断。
                OR = {
                    # 当星球所有者是上面那些时，可以开火
                    AND = {     # 与门，其中所有条件为真时，输出“真”
                        exists = space_owner    # 检测该scope的目标是否存在
                        space_owner = {         # 该scope（country）都是谁
                            OR = { #或门
                                is_at_war_with = from.owner             # 和你处于战争状态
                                is_country_type = swarm                 # 虫灾
                                is_country_type = extradimensional      # 恶魔1
                                is_country_type = extradimensional_2    # 恶魔2
                                is_country_type = extradimensional_3    # 恶魔3
                                is_country_type = ai_empire             # 肃正
                            }
                        }
                    }

                    # colony 关于殖民地的条件
                    AND = {
                        exists = owner  # 检测该scope的目标是否存在
                        owner = {       # 该scope（country）都是谁
                            OR = {
                                is_at_war_with = from.owner
                                is_country_type = swarm
                                is_country_type = extradimensional
                                is_country_type = extradimensional_2
                                is_country_type = extradimensional_3
                                is_country_type = ai_empire
                            }
                        }
                    }

                    # primitive 土著
                    AND = {
                        exists = space_owner
                        exists = owner
                        owner = {
                            is_primitive = yes
                        }
                        space_owner = {
                            OR = {
                                is_at_war_with = from.owner
                                is_country_type = swarm
                                is_country_type = extradimensional
                                is_country_type = extradimensional_2
                                is_country_type = extradimensional_3
                                is_country_type = ai_empire
                            }
                        }
                    }
                }
            }
            custom_tooltip = {  # 测试火力目标
                text = not_barren_molten_frozen_toxic_test_fire
                NOT = { exists = owner }
                OR = {
                    NOT = { exists = space_owner }
                    AND = {
                        exists = space_owner
                        space_owner = { is_same_value = from.owner }
                    }
                }
                OR = {            # 可以以下列星球类型作为火力测试目标，**穷举**
                    is_planet_class = pc_barren             #荒芜星球
                    is_planet_class = pc_barren_cold         #另一种荒芜星球
                    is_planet_class = pc_frozen              #冰封星球
                    is_planet_class = pc_molten              #熔融星球
                    is_planet_class = pc_toxic               #剧毒星球
                    is_planet_class = pc_desert              #沙漠星球
                    is_planet_class = pc_tropical            #热带星球
                    is_planet_class = pc_arid                #干旱星球
                    is_planet_class = pc_continental         #大陆星球
                    is_planet_class = pc_ocean               #海洋星球
                    is_planet_class = pc_tundra              #苔原星球
                    is_planet_class = pc_arctic              #极地星球
                    is_planet_class = pc_alpine              #高山星球
                    is_planet_class = pc_savannah            #草原星球
                    is_planet_class = pc_gaia                #盖亚星球
                    is_planet_class = pc_relic               #遗落星球
                    is_planet_class = pc_nuked               #死寂星球
                    is_planet_class = pc_ringworld_habitable #环世界
                    is_planet_class = pc_habitat             #居住站
                }
            }
        }
    #}
}
```

## 事件(events)

原版内容在 `events/planet_destruction_events.txt` 中。

这是巨像的核心，在你开火后会发生什么事件，由于篇幅过长，而且和普通 events 写法并没有什么差别（也就是说直接抄就行），因此我不在这里放代码了，只说几个需要注意的点。

1. 这就是个无比纯正的 event，今天把球炸成理想城明天全银河暴毙也可以。
2. 最好加一个第一次炸球的弹窗(不加也无所谓)，详见 `planet_destruction.101`
3. 40-48 行为触发摧毁观测站的事件，当你爆了土著的球，也没必要接着观测了。
4. 注意适配天灾的一些计数和事件（炸掉肃正的四个常规节点之一、炸掉肃正的核心、炸掉虫群入侵的星球需要计数等），比如 50-107 行都是这些内容。
5. 110-113 行是获得成就，显然一个 modder 是不需要关注成就的。
6. 当你需要拥有独特的 ai 态度变化（爆破了我们的星球-1000）时，相关事件代码在 110-254 行，相应的态度变化去 `common/opinion_modifiers` 看，抄就对了！
7. 256-272 行是给敌对国家增加厌战度
8. 星球类型转换一定要考虑到所有情况，星球会变成什么？环世界会变成什么？居住站会变成什么？否则就会出现更多巨构中炸掉奥尔德森盘后只留下一个很小的碎球这种哭笑不得的事情（虽然这也没办法，毕竟想要变成破碎盘的话需要改掉香草代码，没有必要的话这是万万不可的）。

## 本地化

这里没什么好说的，vsc 哪里出黄线写哪里的本地化就行，另外 `scripted_triggers` 中的 `fail_text` 也是可以自定义文本的，直接改掉后面的文字就可，有需求可以去创建，同样需要对应的本地化。

## 评价(opinion_modifiers)

蠢驴对各种行为影响帝国彼此评价的方式是调用 `opinion_modifiers` ，原版文件中普遍使用在 event 中直接给对应帝国添加 modifier，部分 mod 则直接创建有 trigger 的 opinion modifier。
一个 opinion_modifier 应该由以下部分组成：

-   `trigger` （可选）：内部应为 condition，用于控制该 modifier 的自动触发
-   `opnion` ：该 modifier 的具体评价影响，正值为加，负值为减。内部代码模块必须有 `base` ，以控制其基础的评价影响。FROM 指向评价会发生改变的帝国
-   `accumulative` ：只能赋予 yes 或 no，用于控制该 modifier 可否累加
-   `unique` ：只能赋予 yes 或 no，用于控制该 modifier 可否重新施加
-   `monthly` ：只能赋予 yes 或 no，用于控制该 modifier 的衰减是否为每月
-   `months` ：只能赋予整数值。wiki 没有写明用途，原版文件中亦仅在“与盟友交战中”的 modifier 中使用，赋值为 12
-   `min` / `max` :只能赋予整数值，用于控制该 modifier 能增加/减少的评价的极限
-   `decay` ：用于控制 modifier 的衰减速度。 `FROM` 指向评价会发生改变的帝国
