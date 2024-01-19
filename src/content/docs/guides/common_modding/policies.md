---
title: 政策(Policies)
---

政策文件目录在 `Stellaris/common/policies` 里面，而原版文件则为` 00_policies.txt` 。政策一般用于设置一个政策标识（即 `policy_flags` ），用于各种地方的判定（事件触发，事件选项，科技，战争等）亦或者提供加成。

其只需要本地化，汉化条目应该为 `policy_<ID>` 。

以原版的战争哲学（无限制战争/解放战争/防御战争）作为例子：

> 重复内容我将删除，只研究一个选项的代码（政策可以写任意数目的选项，但应该至少多于一个）

:::note[提示]

政策的 `option` 至少要为2

:::

```pdx
war_philosophy = {      # ID，你的政策的名称
    potential = {       # 限制语句，没有它则不会出现在UI
        OR = {
            is_country_type = default
            is_country_type = fallen_empire
            is_country_type = awakened_fallen_empire
        }
    }

    allow = {           # 什么情况下允许修改
        is_at_war = no  # Not allowed to change policies in this group while at war
    }

    option = {           #第一个选项
        name = "unrestricted_wars"  # 名称，用于本地化。选项的本地化项目不需要加 `policy_` 的前缀

        policy_flags = {            # 所设置的政策标识。一般使用 `has_policy_flags = <flag_ID>` 进行判断
            unrestricted_wars
        }

        valid = {       # 可用，不符合这些条件则不能选择
            NOR = {
                has_ethic = "ethic_pacifist"
                has_ethic = "ethic_fanatic_pacifist"
                has_valid_civic = "civic_inwards_perfection"
            }
        }

        #modifier = {}  # 修正语句，在此写上修正

        AI_weight = {   # 对于AI的权重判定
            modifier = {
                factor = 10
                OR = {
                    has_valid_ai_personality = no
                    is_ai = no
                }
                NOT = {
                    has_ethic = "ethic_pacifist"
                    has_ethic = "ethic_fanatic_pacifist"
                }
            }
            modifier = {
                factor = 10
                has_valid_ai_personality = yes
                is_ai = yes
                OR = {
                    has_ai_personality_behaviour = conqueror
                    has_ai_personality_behaviour = subjugator
                    has_ai_personality_behaviour = purger
                }
            }
            modifier = {
                factor = 0
                OR = {
                    has_ethic = "ethic_pacifist"
                    has_ethic = "ethic_fanatic_pacifist"
                }
            }
        }
    }
    # 多余内容已经删除
}
```
