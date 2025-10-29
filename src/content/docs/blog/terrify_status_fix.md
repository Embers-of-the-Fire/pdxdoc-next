---
title: 恐惧状态兼容
date: 2025-09-30
authors:
    - 古明地瓜
excerpt: 兼容恐惧状态。
tags: ["教程", "模组"]
---

## 兼容用恐惧状态相关的修正

```pdx
immune_to_terrify = {
    icon = mod_ship_experience_gain_mult
    percentage = yes
    good = yes
    category = ship
    localize_with_value_key = yes
}
immune_chance_terrify = {
    icon = mod_ship_experience_gain_mult
    percentage = yes
    neutral = yes
    category = ship
}
terrify_duration_mult = {
    icon = mod_ship_experience_gain_mult
    percentage = yes
    neutral = yes
    category = ship
}
terrify_duration_add = {
    icon = mod_ship_experience_gain_mult
    percentage = no
    neutral = yes
    category = ship
}
```

## 本地化

```yaml
l_simp_chinese:
  mod_immune_to_terrify: "不会受到['concept_terrify',恐惧状态]影响"
  mod_immune_chance_terrify: "受到['concept_terrify',恐惧状态]影响的概率"
  mod_terrify_duration_mult: "['concept_terrify',恐惧状态]持续时间"
  mod_terrify_duration_add: "['concept_terrify',恐惧状态]持续时间"
```

## 需要覆盖的 SV

```pdx
immune_chance_terrify = {
    base = 1
    add = modifier:immune_chance_terrify
    min = 0
}
ship_terrify_chance = {
    base = 0
    modifier = { add = 25 ship_size_multiplier < 2 }
    modifier = { add = 20 ship_size_multiplier >= 2 ship_size_multiplier < 4 }
    modifier = { add = 10 ship_size_multiplier >= 4 ship_size_multiplier < 8 }
    modifier = { add = 3 ship_size_multiplier >= 8 ship_size_multiplier < 16 }
    modifier = { add = 1 ship_size_multiplier >= 16 }
    modifier = {
        factor = 0
        OR = {
            has_ship_flag = immune_to_terrify
            check_modifier_value = {
                modifier = immune_to_terrify
                value > 0
            }
        }
    }
        mult = value:immune_chance_terrify
}
terrify_duration_factor = {
    base = 1
    add = modifier:terrify_duration_mult
    min = 0
}
ship_terrify_duration = {
    base = 0
    modifier = { add = 10 ship_size_multiplier < 2 }
    modifier = { add = 8 ship_size_multiplier >= 2 ship_size_multiplier < 4 }
    modifier = { add = 6 ship_size_multiplier >= 4 ship_size_multiplier < 8 }
    modifier = { add = 5 ship_size_multiplier >= 8 }
    add = modifier:terrify_duration_add
    mult = value:terrify_duration_factor
}
```
