---
title: 雇佣领袖（仅供参考）
date: 2025-10-08
authors:
    - 咖啡今天仍然在电鱼
excerpt: 领袖雇佣的参考事件
tags: ["教程"]
---

```pdx
country_event = {
    id = cns_psibac.6
    title = cns_psibac.6.title
    desc = cns_psibac.6.desc
    show_sound = par_event_beholder
    location = event_target:beholder_planet
    is_triggered_only = yes

    event_window_type = leader_recruit
    picture_event_data = {
        portrait = event_target:clam_psibac_leader
        room = ethic_spaceship_room
    }
    picture = GFX_leader_recruitment_bg_legendary_beholder

    trigger = {
        always = yes
    }

    immediate = {
        create_country = {
            name = "NAME_clam_psibac_country"
            type = faction
            auto_delete = yes
            flag = {
                icon = {
                    category = "special"
                    file = "unknown.dds"
                }
                background = {
                    category = "backgrounds"
                    file = "00_solid.dds"
                }
                colors = {
                    "red"
                    "red"
                    "null"
                    "null"
                }
            }
            effect = {
                save_event_target_as = clam_psibac_country
            }
        }
        event_target:clam_psibac_country = {
            create_species = {
                name = "NAME_clam_psibac"
                class = PARAGON
                portrait = root.species
                traits = random
                allow_negative_traits = no
                effect = {
                    save_event_target_as = clam_psibac_species
                }
            }
            event_target:clam_psibac_species = {
                change_species_characteristics = {
                    portrait = root.leader
                    can_be_modified = no
                    can_change_leader = yes
                }
            }
            create_leader = {
                class = scientist
                species = event_target:clam_psibac_species # 物种
                tier = leader_tier_legendary
                name = "NAME_The_clam_psibac" # 领袖名
                skill = 5
                gender = indeterminable
                event_leader = yes
                background_ethic = ethic_gestalt_consciousness
                skip_background_generation = yes

                # loc 开场白
                custom_catch_phrase = clam_psibac_catch_phrase
                # loc 背景故事
                custom_description = clam_psibac_backstory

                immortal = yes # 不朽
                hide_age = yes

                randomize_traits = no
                can_manually_change_location = no
                can_assign_to_council = no
                
                traits = {
                    trait = leader_trait_living_sea_of_psibac
                    # 命定特质还没写，总之是要加经验获得和研究能力。
                    trait = leader_trait_bio_psychic_gene
                    trait = leader_trait_superbrain_acceleration
                    trait = leader_trait_spark_of_genius
                    trait = subclass_scientist_councilor
                }
                
                set_age = 0
                
                effect = {
                    # 先生成
                    save_global_event_target_as = clam_psibac_leader

                    # 传奇领袖标记，哪怕不是传奇也会成为传奇
                    set_leader_flag = legendary_leader
                    # 挂个名
                    set_leader_flag = clam_psibac
                    # 免疫负面特质
                    set_leader_flag = immune_to_negative_traits
                    # 不会在部分事件探索中死亡，意外死亡不触发葬礼事件
                    set_leader_flag = leader_death_events_blocked

                    # 下两个是核心内容

                    # 定在这个自动被删掉的国家里。
                    set_owner = root
                    # 后删除，该事件完成后国家也会消失，但 event target 被保留。
                    exile_leader_as = clam_psibac_leader
                }
            }
        }
    }

    option = { # HIRE
        name = HIRE
        tag = hire_leader

        # "§Y$XXX$§!作为一名§H领袖§!加入你的帝国"
        custom_tooltip = paragon_clam_psibac_joins
        #sound = par_beholder_hire

        hidden_effect = {
            clone_leader = {
                target = event_target:clam_psibac_leader 
            }
            last_created_leader = {
                save_global_event_target_as = clam_psibac_leader
                set_leader_flag = legendary_leader
                set_leader_flag = clam_psibac

                # 上面三个是标准的，后面两个是额外追加的免疫负面特质和抗拒死亡

                set_leader_flag = immune_to_negative_traits
                set_leader_flag = leader_death_events_blocked
                leader_event = { id = cns_psibac.8 days = 180 }
            }
            create_message = {
                type = MESSAGE_RECRUITED_LEADER
                localization =  MESSAGE_RECRUITED_LEADER_DESC
                days = @toast_message_days
                target = event_target:clam_psibac_leader
                variable = {
                    type = name
                    localization = LEADER
                    scope = event_target:clam_psibac_leader
                }
                variable = {
                    key = "border"
                    value = "GFX_border_legendary"
                }
            }
            hidden_effect = {
                root = {
                    random_owned_planet = {
                        set_planet_flag = psibac_hatcher_planet
                    }
                }
            }
        }
    }

    option = { # DISMISS
        name = REFUSE
        tag = dismiss_leader
        #sound = par_beholder_dismiss

        hidden_effect = { } # 藏不了一点
        event_target:clam_psibac_leader = {
            kill_leader = { show_notification = no }
        }
    }

    # 选项慢慢填，做好差异.
    
    option = {
        name = cns_psibac.6.a # 直接投降：你是什么东西？
        response_text = cns_psibac.6.a.response
        is_dialog_only = yes
        trigger = {
            has_country_flag = psi_bacterias_method4
        }
    }
    option = {
        name = cns_psibac.6.b # 宣誓顺从：你为什么愿意加入我们？
        response_text = cns_psibac.6.b.response
        is_dialog_only = yes
        trigger = {
            has_country_flag = psi_bacterias_method3
        }
    }
    option = {
        name = cns_psibac.6.c # 通用：你能为我们做什么？
        response_text = cns_psibac.6.c.response
        is_dialog_only = yes
    }
    option = {
        name = cns_psibac.6.d # 通用：你能为我们做什么？
        response_text = cns_psibac.6.d.response
        is_dialog_only = yes
    }

    after = {
        # 打扫收尾,清除 flag 什么的，你也可以不收尾，无所谓。
    }
}
```
