---
title: 法令(Edicts)
---

## 法令的组成与修改

法令存在于 `Stellaris\common\edicts` 里，主要生效于整个国家，多余的话不多说，下面是一个实例，用于了解法令的基础结构。

```pdx
farming_subsidies = {       # ID
    length = @EdictDuration # 时长，单位为天。@指引用数值
    resources = {           # 消耗的资源
        category = edicts   # 消耗的类型为法令
        cost = {
            influence = @Edict2Cost  # 具体消耗的资源
        }
    }

    # 是否是凝聚力雄心。如果为真则消耗为解锁下一个传统所需要的凝聚力值，且不必填写resources语句
    # 如果你这两个都填写了，会出现很奇怪的效果
    # is_ambition = yes

    # 当什么情况下显示科技解锁它
    show_tech_unlock_if = { NOT = { has_authority = auth_machine_intelligence } }

    modifier = {           # 修正器，为国家范围
        country_food_produces_mult = 0.20
    }

    prerequisites = { "tech_eco_simulation" } # 一般填写需要的前置科技
    # allow = {}    # allow语句决定这个法令是不是可用，如果为否则显示不可点击
    # effect = {}   # 该语句为启用这个法令后的效果。几乎可以添加所有的效果（如果你保证这不会炸了CPU的话）
    potential = {   # 限制，满足这里的条件则可以被使用，如果为否则无法被看见，哪怕allow语句满足也不行。
        NOT = { has_authority = auth_machine_intelligence }
    }

    ai_weight = {   # AI使用这个法令的权重
        weight = 1
    }
}
```

法令相对简单，_不需要图标，只需要本地化文本_。不过最关键的是设置*解锁其的科技或者其他条件或者判断这个法令是否可用*的逻辑语句，保持基础的逻辑自治。<s>除非你想让唯物主义可以设置圣地朝圣。</s>

:::caution[兼容提示]

在 2.7 版本，法令内容有了稍许改变，下面展示了 2.7 版本之后的一个凝聚力法令的写法：

:::

```pdx
test_edict = {
    length = 100
    icon = GFX_edict_type_policy # 指定图标，未指定则默认为该图标
    edict_cap_usage = 1          # 法令点消耗数
    is_ambition = yes            # 凝聚力法令
    unity_cost_mult = 0.1        # 凝聚力消耗，修正传统点数花费
    modifier = {                 # 国家修正
    }
}
```

一般来说 length 为 0 的法令，edict_cap_usage 应该为 0(当然，这取决于你)。
