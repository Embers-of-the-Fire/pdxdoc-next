---
title: 灵能抑制/增幅通用
date: 2025-09-30
authors:
    - 古明地瓜
excerpt: 通用的灵能抑制/增幅用代码。
tags: ["教程", "模组"]
---

## 灵能抑制/增幅通用修正

```pdx
is_psionic_inhibitor = {
    icon = mod_ship_psionic_aura_speed_mult
    percentage = no
    neutral = yes
    category = ship
    localize_with_value_key = yes
}
is_psionic_burster = {
    icon = mod_ship_psionic_aura_fire_rate_mult
    percentage = no
    neutral = yes
    category = ship
    localize_with_value_key = yes
}
```

## 修正的本地化

```yaml
l_simp_chinese:
  mod_is_psionic_inhibitor: "具备['concept_psionic_inhibitor']"
  mod_is_psionic_burster: "具备['concept_psionic_burster']"
  # concept_psionic_inhibitor与concept_psionic_burster这两个概念如下：
  concept_psionic_inhibitor: "灵能抑制器"
  concept_psionic_inhibitor_desc: "更先进的灵能抑制器能够有效的抑制大多数的灵能活动模式，从而逐渐阻断星系内的灵能光环等灵能活动影响，抑制灵能光环的扩散，甚至让灵能物种缓慢的失去灵能能力。\n\n面对某些§M危害性的灵能活动§!，其完全不会被腐化，同时表现出显著的抑制效应。"
  concept_psionic_burster: "灵能增幅器"
  concept_psionic_burster_desc: "灵能增幅器能够有效的增强大多数的灵能活动模式，从而逐渐增强星系内的灵能光环等灵能活动影响，加强灵能光环的扩散，甚至让无灵能物种缓慢的获得灵能能力。\n\n面对某些§P灵能抑制效应§!，其仍然可以生效。"
```

## 必须覆盖的 `scripted_trigger`

```pdx
check_aura_suppressors = {
    optimize_memory
    NOT = {
        any_ship_in_system = {
            check_modifier_value = {
                modifier = "is_psionic_burster"
                value != 0
            }
        }
    }
    OR = {
        any_system_colony = {
            OR = {
                has_active_building = building_psionic_suppressor
                has_active_building = building_ancient_ward_2
            }
        }
        has_megastructure = shroud_seal
        check_variable_arithmetic = {
            which = value:count_neighbor_shroud_seals
            value > 0
        }

        any_ship_in_system = {
            check_modifier_value = {
                modifier = "is_psionic_inhibitor"
                value != 0
            }
        }
        tc_check_aura_suppressors = yes
    }
}
```

## 如果需要能提供灵能光环抑制，需要覆盖common/inline_scripts/shroud/psionic_aura_monthly_decrease.txt为以下内容

```pdx
# Natural decrease - final value must be <= 0
monthly_decrease = {
    base = 0
    modifier = {
        subtract = 75
        system_has_psionic_inhibition_station = yes
        system_has_psionic_burster_station = no
        desc = mod_is_psionic_inhibitor
    }
    modifier = {
        subtract = 50
        neighbor_system_has_psionic_inhibition_station = yes
        system_has_psionic_burster_station = no
        desc = neighbor_has_psionic_inhibitor
    }
    modifier = {
        subtract = 50
        NOR = {
            can_system_generate_psionic_aura = {
                OWNER = root.aura_owner
            }
            is_close_to_psionic_aura_generator_system = {
                OWNER = root.aura_owner
            }
        }
        desc = DISCONNECTED_FROM_AURA_COLONY
    }
    modifier = {
        subtract = @aura_clashing_loser_decrease
        any_neighbor_system = {
            has_star_flag = aura_clash_winning_against_@root
        }
        desc = BLANK_STRING
    }
}
```

### 用到的scripted_trigger

```pdx
system_has_psionic_inhibition_station = {
    optimize_memory
    any_ship_in_system = {
        check_modifier_value = {
            modifier = is_psionic_inhibitor
            value > 0
        }
    }
}
neighbor_system_has_psionic_inhibition_station = {
    optimize_memory
    any_neighbor_system = {
        check_modifier_value = {
            modifier = is_psionic_inhibitor
            value > 0
        }
    }
}
system_has_psionic_burster_station = {
    optimize_memory
    any_ship_in_system = {
        check_modifier_value = {
            modifier = is_psionic_burster
            value > 0
        }
    }
}
neighbor_system_has_psionic_burster_station = {
    optimize_memory
    any_neighbor_system = {
        check_modifier_value = {
            modifier = is_psionic_burster
            value > 0
        }
    }
}
```
