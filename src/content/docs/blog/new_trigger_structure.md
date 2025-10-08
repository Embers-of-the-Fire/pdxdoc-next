---
title: 如何安装新的触发器结构
date: 2023-07-03
authors:
    - Eddy
excerpt: 新触发器结构的安装和使用
tags: ["教程", "模组", "触发器"]
---

经过本人长时间的测试，对游戏事件触发器产生的消耗有了进一步的认识。
基于游戏触发器的消耗，以及更多 mod 环境下触发器产生的问题，本人提出以下模组的触发器结构，该结构已经被我应用在 40 多个多类型且具备高度频繁的触发器的模组内。
实测在一起运行时，已取得良好效果。因此希望各位如有意愿可按照本文介绍，将您的模组接入到我们的触发器结构当中。

## 触发器结构的准入门槛

首先，我们的触发器结构仅包括月，年，2 年，5 年，10 年，科研完成的触发器，包括 `no_scope` 域与 `country` 域，因此如您有相关触发器，均可选择接入。

触发器列表：

| `no_scope`           | `country`                    |
| :------------------- | :--------------------------- |
| `on_monthly_pulse`   | `on_monthly_pulse_country`   |
| `on_yearly_pulse`    | `on_yearly_pulse_country`    |
| `on_bi_yearly_pulse` | `on_bi_yearly_pulse_country` |
| `on_five_year_pulse` | `on_five_year_pulse_country` |
| `on_decade_pulse`    | `on_decade_pulse_country`    |
| `on_tech_increased`  | /                            |

## 触发器结构的接入步骤

接入本触发器，需要进行以下步骤：

1. 将以上列出的触发器前缀均加入 VOP （请务必大写），例如 `on_monthly_pulse` ➡️ `VOP_on_monthly_pulse`；
2. 新增一个触发器 txt，如 `xxx_on_actions_FRAMEWORK.txt` （**文件命名请务必不同，事件 id 务必相同**）。<br />
   并按需（**你用几个写几个，没用到的不要写**）在其中添加以下代码：

     <details>

     <summary>VOP 全局</summary>

    ```pdx
    ###     VOP 全局

    # No scope, like on_game_start
    on_monthly_pulse = {
        events = {
            VOP_evt_FRAMEWORK.1
        }
    }

    # No scope, like on_game_start
    on_yearly_pulse = {
        events = {
            VOP_evt_FRAMEWORK.2
        }
    }

    # No scope, like on_game_start
    on_bi_yearly_pulse = {
        events = {
            VOP_evt_FRAMEWORK.3
        }
    }

    # No scope, like on_game_start
    on_five_year_pulse = {
        events = {
            VOP_evt_FRAMEWORK.4
        }
    }

    # No scope, like on_game_start
    on_decade_pulse = {
        events = {
            VOP_evt_FRAMEWORK.5
        }
    }
    ```

     </details>

     <details>

     <summary>VOP 国家</summary>

    ```pdx
    ###     VOP 国家

    # this = country
    on_monthly_pulse_country = {
        events = {
            VOP_evt_FRAMEWORK.8
        }
    }

    ###     VOP 国家
    # this = country
    on_yearly_pulse_country = {
        events = {
            VOP_evt_FRAMEWORK.9
        }
    }

    ###     VOP 国家
    # this = country
    on_bi_yearly_pulse_country = {
        events = {
            VOP_evt_FRAMEWORK.10
        }
    }

    ###     VOP 国家
    # this = country
    on_five_year_pulse_country = {
        events = {
            VOP_evt_FRAMEWORK.11
        }
    }

    ###     VOP 国家
    # this = country
    on_decade_pulse_country = {
        events = {
            VOP_evt_FRAMEWORK.12
        }
    }
    ```

     </details>

3. 2.3 新增一个唯一触发器 txt，如 `xxx_on_actions_FRAMEWORK_unique.txt` （**如果用到了，请保持唯一，否则会多次触发，且 id 务必相同**）。<br />
   插入以下代码：

    ```pdx
    ###     VOP 唯一

    # This = Country
    on_tech_increased = {
        events = {
            VOP_evt_FRAMEWORK.15
        }
    }
    ```

4. 前往 `common/events` 文件夹内，新建一个事件 txt，txt 命名**务必保持不同，务必不同，务必不同**，**事件 id 与事件声明必须相同**，
   如 `xxxx_evts_FRAMEWORK_events.txt`。<br />
   按需插入以下以下代码（**请注意，如果你只是用到了月触发，请不要写入其他的触发，只写入自己用到的**）：

     <details>

     <summary>VOP 全局</summary>

    ```pdx
    #       VOP_on_monthly_pulse
    event = {
        id = VOP_evt_FRAMEWORK.1
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_monthly_pulse } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_monthly_pulse days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_monthly_pulse }
            set_update_modifiers_batch = end
        }
    }

    #       VOP_on_yearly_pulse
    event = {
        id = VOP_evt_FRAMEWORK.2
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_yearly_pulse } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_yearly_pulse days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_yearly_pulse }
            set_update_modifiers_batch = end
        }
    }

    #       VOP_on_bi_yearly_pulse
    event = {
        id = VOP_evt_FRAMEWORK.3
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_bi_yearly_pulse } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_bi_yearly_pulse days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_bi_yearly_pulse }
            set_update_modifiers_batch = end
        }
    }

    #       VOP_on_five_year_pulse
    event = {
        id = VOP_evt_FRAMEWORK.4
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_five_year_pulse } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_five_year_pulse days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_five_year_pulse }
            set_update_modifiers_batch = end
        }
    }

    #       VOP_on_decade_pulse
    event = {
        id = VOP_evt_FRAMEWORK.5
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_decade_pulse } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_decade_pulse days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_decade_pulse }
            set_update_modifiers_batch = end
        }
    }
    ```

    </details>

    <details>

    <summary>VOP 国家</summary>

    ```pdx
    #       VOP_on_monthly_pulse_country
    country_event = {
        id = VOP_evt_FRAMEWORK.8
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_monthly_pulse_country } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_monthly_pulse_country days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_monthly_pulse_country }
            set_update_modifiers_batch = end
        }
    }

    #       VOP_on_yearly_pulse_country
    country_event = {
        id = VOP_evt_FRAMEWORK.9
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_yearly_pulse_country } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_yearly_pulse_country days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_yearly_pulse_country }
            set_update_modifiers_batch = end
        }
    }

    #       VOP_on_bi_yearly_pulse_country
    country_event = {
        id = VOP_evt_FRAMEWORK.10
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_bi_yearly_pulse_country } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_bi_yearly_pulse_country days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_bi_yearly_pulse_country }
            set_update_modifiers_batch = end
        }
    }

    #       VOP_on_five_year_pulse_country
    country_event = {
        id = VOP_evt_FRAMEWORK.11
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_five_year_pulse_country } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_five_year_pulse_country days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_five_year_pulse_country }
            set_update_modifiers_batch = end
        }
    }

    #       VOP_on_decade_pulse_country
    country_event = {
        id = VOP_evt_FRAMEWORK.12
        hide_window = yes
        is_triggered_only = yes
        trigger = { NOT = { has_global_flag = VOP_CD_on_decade_pulse_country } }
        immediate = {
            set_timed_global_flag = { flag = VOP_CD_on_decade_pulse_country days = 1 }
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_decade_pulse_country }
            set_update_modifiers_batch = end
        }
    }
    ```

    </details>

    <details>

    <summary>VOP 唯一</summary>

    ```pdx
    #       VOP_on_tech_increased
    country_event = {
        id = VOP_evt_FRAMEWORK.15
        hide_window = yes
        trigger = { exists = this }
        immediate = {
            set_update_modifiers_batch = begin
            fire_on_action = { on_action = VOP_on_tech_increased }
            set_update_modifiers_batch = end
        }
    }
    ```

     </details>

## 触发器结构的接入注意事项

- 触发器仅有 `on_tech_increased` 触发器文件必须保持唯一。
- 事件框架请按需使用，文件命名务必不可与其他 mod 相同，id 务必保持相同。
- 触发器结构请务必保持文件命名不同，id 务必相同，按需使用，不使用的不要输入。
- 接入到本触发器结构内的事件不能存在，任何调动途径的批处理代码，例如 `set_updated_modifier_batch = begin , set_updated_modifier_batch = end`
