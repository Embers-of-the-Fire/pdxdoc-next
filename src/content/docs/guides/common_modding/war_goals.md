---
title: 战争目标(War Goals)
---

原版文件在 `Stellaris\common\war_goals` 目录下，下面举一个例子（如果看得懂英文且基础不错，可直接看蠢驴的示范文件 `wg_example.txt` ）：

```pdx
wg_example = {      # 战争目标的ID
    casus_belli = cb_example    # 这个战争目标所需要的战争借口
    set_defender_wargoal = wg_example       # 此语句用来强制设定防御方的战争目标，例如被洁癖宣战时的防御战争借口一定为“消除威胁”，倘若没有此语句，那么防御方可以选择防御目标（前提是满足条件）
    defender_default = yes      # 此语句为“yes”的效果：防御方超过选择宣战借口时限时强制选择的战争目标，默认“no”
                                # 如果多个战争目标都被满足，那么就会按照文本顺序选择第一个满足的
    # threat_multiplier = 1.0   # 当占领星系或者星球时产生的威胁度，默认为1.0，防御目标此值应设置的很小，除非你想变成战狂或者你是抖M
    # hide_if_no_cb = no        # 当战争借口不满足时，是否隐藏？默认为“no”
    # cede_claims = yes/occupied_only/no    # 直译是“放弃对和平的要求？”效果不明，原版似乎存在感不高

    # surrender_acceptance = 0  # 此语句会影响到AI有多大可能由于此战争目标而投降。当数值越大则越有可能，一般设置为负数，通常战争目标多为-25，全面战争多为-1000
    war_exhaustion = 1.0        # 此语句决定了默认的战争损耗程度（即厌战度增长），默认1.0
    # show_claims_in_description = yes      # 原版没被使用过，效果不明。默认“no”

    potential = {   # 设置可见的条件，满足其才可见。“from”范围为被指定为战争目标的国家（即你的敌人）
                    # 默认范围（this）则为拥有此战争目标的国家。默认无需条件即可见
    }
    possible = {    # 设置可用的条件，满足其才可见。“from”范围为被指定为战争目标的国家（即你的敌人）
                    # 默认范围（this）则为拥有此战争目标的国家。默认无需条件即可用

    }
    # on_status_quo = {}    # 如果战争以“维持现状”结束后，生效的语句
    # on_accept = {}        # 如果战争以“胜利”结束后，生效的语句
}
```

此外，战争目标不仅需要本地化，还需要在 `Stellaris\interface` 注册贴图文件，此贴图文件需要**ARGB 8 8 8 8**，目录在 `gfx/interface/icons/diplomacy/diplomacy_war.dds`
