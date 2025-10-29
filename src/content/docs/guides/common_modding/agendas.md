---
title: 议程(Agendas)
---

## 认识议程的组成

先仿照 stellaris 文件夹的内容，创建一个 `common` 文件夹，
之后里面再复制 `common` 文件夹里的 `council_agendas` 文件夹，
然后选一个顺眼的文件改名为 `test_agendas.txt` 之后删除里面的内容和其他 txt。

让我们先学习一下原版是怎么添加议程的：（有部分删改，请勿复制）

```pdx
# 数值定义,调用的方式就是 = @xxx
@base_tradition_agenda_cost = 7000

#agenda_progressive_growth是这个议程的名字
agenda_progressive_growth = {
    # 该议程的消耗，这里调用了上面定义的 `@base_ethic_agenda_cost`，也可以直接写数字
    agenda_cost = @base_ethic_agenda_cost
    # 限制语句，没有符合此条件，则无法在 UI 内被显示
    potential = {
        is_gestalt = no  #非格式塔
    }
    #允许的判断，比 `potential` 的优先级要低。当不满足时可能显示为黑白图等
    allow = {
        custom_tooltip = {
            # 如果不允许显示的文本
            fail_text = "requires_materialist"
            # 如果是唯物则允许
            is_materialist = yes
        }
    }

    # 当议程起始时的修正，指对于这个帝国的修正（buff 或者 debuff）
    modifier = {
        #机械人口组装速度 +10%
        planet_pop_assembly_mult = 0.1
        #唯物主义思潮吸引力 +10%
        pop_ethic_materialist_attraction_mult = 0.1
    }
    # 当议程启动时的修正，调用 `static_modifiers` 中
    finish_modifier = agenda_progressive_growth_finish
    #当议程启动时触发的 effect
    effect = {
        if = {
            limit = {
                # 如果不是个体智屑
                is_individual_machine = no
                NOT = {
                    # 没有科技（此处为机器人劳工）
                    has_technology = tech_robotic_workers
                }
            }
            # 增加科技进度
            add_tech_progress = {
                #增加的是什么科技
                #增加的进度（多少%）
                tech = tech_robotic_workers
                progress = @agenda_award_tech_progress
            }
        }
    }
}
```

从上面的例子，我们可以看得出，议程包括以下几个模块：

- 议程的名称
- 刷出的权重（包括 potential 和 allow）
- 起始和启动时的修正和效果（国家的 buff 或者 debuff 以及 effect）

## 添加自己的第一个议程

在学习到了一个议程有怎么样的组成之后，现在让我们开始真正的动工，写下你的 mod 里面第一个内容——你的第一个议程。

值得注意的是，Stellaris 里面不论是什么项目的 ID，都应该是**唯一且确定**的，除非你是修改原版的议程，不然一定要确认原版是否已经使用了这个 ID，比如这次我们起一个 `agenda_test` 名称的，那么现在应该看起来是这样的：

```pdx
agenda_test = {
}
```

现在看起来空空如也，一点也不好看，那么我们仿照上面的例子，添加议程花费和 `potential` 等。

```pdx
agenda_test = {
    agenda_cost = 7000
    potential = {
        always = yes
    }
    allow = {
        always = yes
    }
}
```

在添加了权重之后，自然是各位第四天灾喜闻乐见的 buff 环节，众所周知科技是第一生产力，那么这次我们就写一个**科学研究速度\***+50%\*的议程吧。

```pdx
@base_test_cost = 5000

agenda_test = {
    agenda_cost = @base_test_cost
    potential = {
        always = yes
    }
    allow = {
        always = yes
    }
    modifier = {
        all_technology_research_speed = 0.50  # 帝国科研速度 +50%
    }
    finish_modifier = agenda_test_finish
}
```

好，到此我们保存我们的 mod 文件，效果应该如上图所示。之后我们需要打开一次 stellaris 来验证是否真正的在游戏里面被添加了这个 `agenda_test` 议程。启动游戏，加载我们的“test” MOD！之后随意开一局是**寡头政体**的国家。

好，到此我们保存我们的 mod 文件，效果应该如上图所示。之后我们需要打开一次 stellaris 来验证是否真正的在游戏里面被添加了这个议程。启动游戏，加载我们的 MOD！之后随意开一局国家。当你发现你的议程只有起始效果而没有启动效果的时候，那就说明你写对了。这是为什么呢？
因为我们在这里引用了一个修正（`agenda_test_finish`），这个修正需要在 `common` 文件夹下的 `static_modifiers` 文件夹里被定义，让我们新建一个文本文档取名为类似 `00_static_modifiers_test.txt`，然后给这个修正定义：

```pdx
agenda_test_finish = {
    # 帝国科研速度 +100%
    all_technology_research_speed = 1.00
}
```

当你发现你的议程是像下图那样显示的时候，那么恭喜你，你的 mod 被成功读取且还能正常显示了。

![img](../../../../assets/guides/common_modding/agendas.assets/clip_image002.png)

不过对于这样强力的议程来说，我们一般不想要任何帝国都能刷到这个议程，这个时候就要对刷出这个议程的权重做出调整和某些限制，比如就拿这个议程而言，我们想要唯物（物质）主义才能获得，而其他思潮无法刷到，那么应该这样：

```pdx
@base_test_cost = 5000

agenda_test = {
    agenda_cost = @base_test_cost
    potential = {
        always = yes
    }
    allow = {
        is_materialist = yes
    }
    modifier = {
        all_technology_research_speed = 0.50  # 帝国科研速度 +50%
    }
    finish_modifier = agenda_test_finish
}

```

当做好这些修改再进入游戏里面，你就会发现如果不选择唯物或者极端唯物，那么永远刷不出来这个议程——而带上了唯物之后，就会刷的出来（效果和之前一样）。这样便实现了我们所需要的判断，即拥有唯物主义或者极端唯物主义可以刷出这个议程，没有则无法刷出。同样的，如果没有实现这样的效果，请确保括号以及其他操作的正确。

## 图标和本地化

但是我们的议程仍然没有图标，怎么加入一个图标呢？
我们需要在 `gfx/interface/icons/agenda_icons/` 文件夹下，使用一个 dds 格式的文件，
命名最好和你的议程键值相同如 `agenda_test.dds`
然后在从原版的 `interface` 文件夹中复制 `council_agendas` 并改名成如 `01_council_agendas`

```pdx
spriteTypes = {
    spriteType = {
        name = "GFX_council_agenda_icon_agenda_test"
        texturefile = "gfx/interface/icons/agenda_icons/agenda_test.dds"
    }
}
```

然后是本地化

```yaml
l_simp_chinese:
    # 这里的 `council_agenda_` 和 `_name` 中间的键名必须同你的议程名一致
    council_agenda_agenda_test_name:0 "我的议程"
    # 这里的 `council_agenda_` 和 `_desc` 中间的键名也必须同你的议程名一致
    council_agenda_agenda_test_desc:0 "前进！不择手段地前进！"
```

我们可以看见蠢驴很贴心的给我们的名称上了橙色，但是堂堂第四天灾的议程怎么能和普通的一样？

![img](../../../../assets/guides/common_modding/agendas.assets/clip_image002-16883651596481.png)

所以再次打开刚刚的本地化文件改成：

```yaml
l_simp_chinese:
    council_agenda_agenda_test_name:0 "§M我的议程§!"
    council_agenda_agenda_test_desc:0 "§R前进！不择手段地前进！§!"
```

这样一来，打开游戏，就会显示出下图的效果，这样就显得与众不同了。当然根据上述所学的代码，还可以搞出一些很生动的本地化效果，不过现阶段就先讲述到此。

![img](../../../../assets/guides/common_modding/agendas.assets/clip_image002-16883652023973.png)