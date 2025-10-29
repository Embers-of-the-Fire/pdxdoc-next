---
title: 基于 4.1 版本的领袖框修复（原版向）
date: 2025-10-04
authors:
    - 咖啡今天仍然在电鱼
excerpt: 原版框架下的领袖框修复（4.1版本）
tags: ["教程", "模组"]
---

## 添加本地化

> 看了一下原本的本地化也删了，可以不做覆盖了

```yaml
l_simp_chinese:
  LEADER_TIER_FRAME: "[Root.LeaderTierNumberExpand]"
```


## Scripted Loc

```pdx
defined_text = {
    name = LeaderTierNumberExpand
    random = no
    text = {
        trigger = {
            OR = {
                has_leader_flag = renowned_leader
                is_leader_tier = leader_tier_renowned
                check_variable = {
                    which = leader_tier_graphical_mlr
                    value = 2
                }
            }
        }
        localization_key = 2
    }
    text = {
        trigger = {
            OR = {
                has_leader_flag = legendary_leader
                is_leader_tier = leader_tier_legendary
                check_variable = {
                    which = leader_tier_graphical_mlr
                    value = 3
                }
            }
        }
        localization_key = 3
    }
    default = 1
}
```
