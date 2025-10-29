---
title: 在银河界面生成粒子效果
date: 2025-10-04
authors:
    - _OAO_
excerpt: 一种可以在银河界面生成粒子效果的方式，不支持 mesh 网格渲染。
tags: ["教程", "模组", "相关工具", "模型"]
---

```pdx
# common/message_types/tc_message_types.txt

message_type = {
    key = "TC_TEST_MESSAGE"

    icon = "GFX_tc_message_infusion"
    icon_frame = 1

    name = TC_TEST_MESSAGE
    ping = tc_ping_target
    sound = "notification"
}
```

```pdx
# events/tc_test.txt

planet_event = {
    id = tc_test.5
    is_triggered_only = yes
    hide_window = yes

    trigger = {}

    immediate = {
        create_message = {
            type = TC_TEST_MESSAGE
            target = this
            recipient = owner
            localization = TEST
            days = 30
        }
    }
}
```

```pdx
# gfx/pingmap/tc_pingmap.txt

tc_ping_target = {
    system_entity = "t_mega_aura_beam_hit_entity"
    galaxy_entity = "tc_mega_aura_beam_hit_entity"

    system_normal_zoom = 1000
    galaxy_normal_zoom = 1000
    duration = 10
}
```
