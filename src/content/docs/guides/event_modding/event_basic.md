---
title: Event 基础
sidebar:
    order: 2
---

我们先来看最基础的 Event 格式：

```pdx
namespace = test_event

country_event = {
    id = test_event.1
}
```

没错，这便是一个最基础的 Event，没有任何修饰，那么来解析下各部分用途：

-   `namespace` ：如果你学习过编程，那么这个你一定不会陌生，当然，如果没有了解也没关系。通过在文件开头声明 `namespace` 以开拓一个名称空间用以载入该名称空间下的 Event，多个文件可以写同一个名称空间，但同一文件不能够写多个名称空间，也就是说，一个文件必须**有且仅有一个**namespace，namespace 的名称可以使用下划线` _` 。
-   `country_event` ：指定声明的 Event 类型，每个类型都有自己的默认作用域（Scope），目前有以下几种 Event 类型，关于作用域的问题，之后将会提到。这里我们采取最为普遍的 `country_event` 来进行示例（ `country_event` 也是应用最多的 Event 类型），下表给出了所有能够进行声明的 Event 种类以及对应的基础范围（Scope）。

| **Event Type**      | **Scpoe**   |
| ------------------- | ----------- |
| `event`             | global      |
| `country_event`     | country     |
| `planet_event`      | planet      |
| `fleet_event`       | fleet       |
| `ship_event`        | ship        |
| `pop_event`         | pop         |
| `pop_faction_event` | pop_faction |

-   `id` ：故名思意，给 Event 一个标识，不过需要注意的是，id 必须要是` [namespace].[int]` 形式（貌似有其他格式，但是这样写一定不会出错）。

以上该事件仅仅是存在而已，并没有任何实际用途，我们稍微的给它增加一点点的修饰，让它成为一个有着标题(Title)，描述(Description)，图片(Picture)，位置(Location)，事件音频(Show Sound) ，选项(Option)的 Event：

```pdx
namespace = test_event

country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    is_triggered_only = yes
    # mean_time_to_happen = {
    #     months = 3
    #     modifier = {
    #         factor = 2
    #         has_civic = civic_agrarian_idyll
    #     }
    # }

    option = {
        name = test_event.1.aa
    }
}
```

-   `title` ：指定 Event 标题(Title)的本地化 Key
-   `desc` ：指定 Event 描述(Description)的本地化 Key
-   `picture` ：指定 Event 图片(Picture)的注册 Key
-   `location` ：指定事件导航向的位置，承接基础范围(Scope)或者事件对象(Target)，通过右上角的摄像头按钮进行导航
-   `show_sound` ： 启动事件之时触发的音频
-   `option` ：生成一个选项(Option)，当 Event 不存在 option 之时将会在启动该 Event 之时自动创建一个空 option，option 可以重复设置（过多会导致屏幕无法全部显示）。
-   `name` ：事件选项的本地化 key
-   `is_triggered_only` / `mean_time_to_happen` ：两种不同的触发方式，在之后会详细讲解。

好了，你只需要本地化完标题(Title)，描述(Description)以及选项(Option)，一个最普通不过的 Event 就写好了，现在这个 Event 没有任何其他效果，我们需要给它添加一些效果以及限制，这便将涉及到了 Event 最核心的三要素：触发器(Trigger)，条件(Condition)，影响(Effect)。

## 触发器(Trigger)

顾名思义，事件需要某个触发器触发才能驱动，也就是你开车时你得点火车才能发动一样，蠢驴内置了两种触发模式。

:::caution[兼容]

这两种触发模式无法在一个事件中同时存在！

:::

### Mean Time To Happen/MTTH

MTTH，平均发生时间，设置该触发模式之后，Event 将会在一个宏观的时间内按照设定的时间触发，比如下图设定的便是每 50 天触发一次 Event：

```pdx
country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    mean_time_to_happen = {
        days = 50
        # months = 50
        # years = 50
    }

    option = {
        name = test_event.1.aa
    }
    option = {
        name = test_event.1.bb
    }
}
```

同时还支持月数(Months)以及年数(Years)，但注意，这是指宏观表现上来讲的平均发生时间，也就是假设开始年份是 2200 年，胜利年份是 2500 年，你设置的 Event 在这个时间段内的平均发生次数符合 MTTH 的设置，因此这是一种带有随机性质的触发模式，比如你设置了 50 天触发，但是它实际触发时间是未知的，可能过去 20 天左右就触发了，也可能过去 70 天还没触发，这些都是可能的，以下摘自官方 Wiki 对 MTTH 的解释：

> A additional condition very often used on event that triggered by regular polling, is the mean_time_to_happen (MTTH). This will delay the execution of the event by a random amount of ingame days. On average the activation will be delayed as given, but the exact number can vary considerably. Counting starts the moment all other trigger conditions are met and it is not clear how exact the internal implementation of this delay works, however it seems likely the MTTH is regularly polled just like all other triggers.

MTTH 还能像权重(Weight)一样添加修正(Modifier)，用来修正 MTTH 所指定的时间：

```pdx
mean_time_to_happen = {
    years = 100
    modifier = {
        factor = 0.1
        has_civic = civic_agrarian_idyll
    }
}
```

和权重系统相似， `years` 指定基础发生年份，Modifer 中的 `factor` 指定乘算修正，当存在公民性 `civic_ararian_idyll` 之时将会使得发生年份修正到 10 年。

:::note[提示]

同一个时间写不同表达形式也会有很大影响。例如 `years = 5` 与 `days = 1800` ，在时间观念上来说是相同的，然而却是存在区别的。对于检索频率来说 `years` 检索次数更少，不过带来的是更大的误差，而采用 `days` 则是检索触发的频率将十分高，但是误差也会相对小一些，MTTH 过多会导致**运行速度明显下降**，我不推荐各位使用，应当谨慎。

:::

### Is Triggered Only

`is_triggered_only` 是使用更为广泛的触发模式，在执行性能上明显强于 MTTH 这种触发模式，Event 写入该语句之后将只会受到其他触发器的触发，也就是说，必须由其他的方式来触发该 Event，自身并不能自主开启触发，其他触发器包括：影响(Effect)，行动(Action)。

```pdx
country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    is_triggered_only = yes

    option = {
        name = test_event.1.aa
    }
    option = {
        name = test_event.1.bb
    }
}
```

影响(Effect)将会在后边详细说明，我们先来看看行动(Action)。

各位写 Event 时有一种情况各位应该都遇到过：借鉴其他 Mod 或者原文件的 Event 之时，你写的 Event 和别人的明明一模一样，然后发现别人的 Event 能够触发而自己的不行。这就涉及到了 Action，这是写在 `common` 目录下 `on_actions` 文件夹中 `on_actions` 文件里的预设触发器。

这些触发器都是以 `on\_` 为前缀，每一个触发器都会在满足不同情况之时进行一次触发，触发对象就是 events 里面 id 对应的 Event，比如我想要一个事件 `country_event id = test_event.1` 固定每个月触发一遍，我们可以在 Event 里边写上 `is_triggered_only = yes` ，仿照原文件格式在 common 中新建一个 on_actions 文件夹，并在其中创建一个名称随意（注意不要与原文件重名）的.txt 文件，写入以下内容：

```pdx
on_monthly_pulse_country = {
    events = {
        test_event.1
    }
}
```

这样你的事件就可以每月都进行一次出发了。注意上述操作细节，在 `on_actions` 里面还有如下预设触发器：

```pdx
on_monthly_pulse = {
    events = {

    }
}
```

该预设触发器与上述预设触发器仅仅差了一个` _country` ，但如果我们将上述事件 `country_event id = TestEvent.0` 放入其中，VSC 立刻会报错，如果你仍然要进行测试，结果将是触发失败。这就涉及到了 Event 的默认作用域，在上面我给出了各种 Event Types 的默认作用域，而同样的，Action 也同样拥有作用域(Scope)，只能够触发相同 Scpoe 的 Event，例如上述图片的 `on_monthly_pulse` 是无作用域的，因此其中 Event 的 Event Type 为 `event` ，而在我们的示例中 `on_monthly_pulse_country` 的默认作用域是 `country` ，正好对应了我们需要触发的事件 `country_event id = TestEvent.0` ，因此可以正常触发。通常来说蠢驴会在每一个触发器上方标注 Scope，如若没有标注则是没有作用域，应该采用 `event` 类型。

Action 还支持随机触发，以下这个例子可以看到在每个月触发 events 的同时还会触发下面的 `random_events` ，有 1/100 的概率触发 `test_event.2` ，99/100 的概率什么也不发生。

```pdx
on_monthly_pulse_country = {
    random_events = {
        99 = 0
        1 = test_event.1
    }
}
```

Action 之所以应用广泛，是由于种类繁多，能够满足一些特定情况触发 Event，比如建筑建造完毕，科技研究完成等等，而且由于不是时刻都在检测，因此效率也是比 MTTH 更高。 值得一提的是，尽管蠢驴内置了十分多的 Action，但真正能够用到的还是少数，有相当一部分 Action 原版都没有引用，大部分是由于版本更替而无用的 Action，各位在写 Event 的之时也可以体验一下更多的 Action。

## 条件(Condition)

有了触发器，我们就可以在一定情况下按照我们想要的方式触发 Event 了，不过这个时候我们发现，我们的 Event 应该需要一些限制，我们不期望每次触发都能够启动 Event，得在我们期望的场合进行触发并启动，那么这就用到了条件(Condition)，Condition 是用来限制我们 Event 启动的一种判断条件，在 Event 里面，我们可以采取 trigger 来装载 Condition，用以判断触发 Event 后是否需要启动它,下图的 Condition 十分简单，仅仅一句 `is_ai = no` ，用来判定该 Event 的执行者是否是 AI 帝国，如果是 AI 帝国则返回假，如果不是 AI 帝国则返回真，保证 Event 触发后能够启动的标准是 Condition 返回值为真，Condition 一般情况下不仅仅是一条语句，通常是以一个条件组的形式进行判定，这将涉及到简易逻辑门，可以参考我在灰机 Wiki 上尚未完成的“条件表”(鸽了好久没写了)，也可以查找官方 Wiki。

```pdx
country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    trigger = {
        is_ai = no
    }

    is_triggered_only = yes
    # mean_time_to_happen = {
    #     months = 3
    #     modifier = {
    #         factor = 2
    #         has_civic = civic_agrarian_idyll
    #     }
    # }

    option = {
        name = test_event.1.aa
    }
}
```

:::note[提示]

在官方 Wiki 有这样一段话：<br />
Testing has shown that a simple MTTH will be called with a 50% chance during the period of time specified for each item in that scope e.g. each country for a country event. It will then check the triggers, and if they are true, the event will be triggered. However, if modifiers to the MTTH are introduced, the game will check the conditions every day for each scope - meaning that these are considerably more expensive in terms of performance.<br />
这段话表明，在采用 MTTH 之时如若加上了 Conditions，那么会使得性能大幅下降，请各位在写 Event 之时能够注意。

:::

## 影响(Effect)

终于到了 event 的灵魂所在 Effect，虽然 Effect 不是 Event 独有的，但是由于其独到的 Trigger，我们能够写出十分精彩的代码并且实现更多功能。我们现在已经能够触发 Event，并且能够按照我们给出的 Conditions 进行启动，那么现在这个 Event 也仅仅是一个纯文本的 Event，我们期望它能够帮我们做一点事情，比如在事件启动后立刻给国家添加一个修正，其实现代码步骤如下：

先创建一个静态修正(Static Modifer)，其位置在 common 的 `static_modifers` 文件夹下，创建一个.txt 文件并写入：

```pdx
test_modifier = {
    pop_growth_speed = 1
}
```

普通静态修可以单由一个 Key 加上 Modifiers 组成，其中 `test_modifer` 代表 Static Modifer 的 Key， `pop_growth_speed = 1` 则是 Modifer（其实 Static Modifer 可以指定图标(Icon)，如果是加到星球上的 Static Modifer，还可以为其添加图标框(Icon Form)）。

当我们正确创建好静态修正之后，就可以着手开始向国家添加这个修正了，普通 Event 给予了我们三个可以执行 Effect 的地方：即刻执行(Immediate)，选项(Option)，结束后执行(After)。

### 即刻执行(Immediate)

在 Event 启动之时立刻执行的 Effect，添加修正的方法很简单，直接采用 `add_modifier` （ `add_modifer` 语句能够指定一个参数用来限定修正存在的时间，如果省略则默认是无限时间，见图二）语句并指定修正名称便可，如若 Static Modifer 写入正确的话，VSC 将会有自动提示，如若未正确写入 Static Modifer，VSC 将会报错。由于该 Event 的默认作用域是 county，因此执行完这条语句之后将会给国家添加一个名为 `test_modifier` 的修正（未本地化的情况下）

```diff
namespace = test_event

country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    trigger = {
        is_ai = no
    }

+   immediate = {
+       add_modifier = {
+           modifier = test_modifier
+       }
+   }

    is_triggered_only = yes

    option = {
        name = test_event.1.aa
    }
}
```

可以规定添加修正的时间，以下展示了添加时间为 360 天的修正 Effect：

```diff
country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    trigger = {
        is_ai = no
    }

    immediate = {
        add_modifier = {
            modifier = test_modifier
+           days = 360
+           # months = 12
+           # years = 1
        }
    }

    is_triggered_only = yes

    option = {
        name = test_event.1.aa
    }
}
```

### 选项(Option)

有时候你想要的并不是瞬间执行，而是想要能够通过不同选项选触发不同的效果，幸运的是，option 可以执行 Effect，因此我们只需要稍微改动一下就好了，显而易见的是当点击第二个选项的时候才会添加修正。

```diff
namespace = test_event

country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    trigger = {
        is_ai = no
    }

    is_triggered_only = yes

    option = {
        name = test_event.1.aa
+       add_modifier = {
+           modifier = test_modifier
+       }
    }
}
```

当然，这里有个瑕疵，如果你把鼠标放到第二个选项上，会自动显示出一行文本提示你点击后将会发生什么，比如该处将会提示添加一个修正到国家，我们有时候不期望有这样的文本，此时我们可以稍微改动一下，在 `add_modifier` 外面再套一层 `hidden_effect` ，这样就能够将 Effect 隐藏了：

```diff
namespace = test_event

country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    trigger = {
        is_ai = no
    }

    is_triggered_only = yes

    option = {
        name = test_event.1.aa
+       hidden_effect = {
            add_modifier = {
                modifier = test_modifier
            }
+       }
    }
}
```

### 结束后执行(After)

我们有时候并不想在事件启动之时触发 Effect，而是在点击 option 之后进行一些 Effect，after 便可以满足我们，除了执行顺序不同之外，after 与 immediate 执行 Effect 没有什么区别。

```diff
namespace = test_event

country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    trigger = {
        is_ai = no
    }

    is_triggered_only = yes

    option = {
        name = test_event.1.aa
    }

+   after = {
+       add_modifier = {
+           modifier = test_modifier
+       }
+   }
}
```

启动游戏，测试 Event 是否能够正常触发，启动，实现效果。
上文 Trigger 部分的 `is_triggered_only` 分支提到了 Effect 是可以作为触发器触发 Event 的，因此我们可以继续改装一下我们的 Event，使之能够在选完某个选项之后触发另一个 Event `country_event id = TestEvent.1` ：

```diff
country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    immediate = {
        add_modifier = {
            modifier = test_modifier
        }
    }

    trigger = {
        is_ai = no
    }

    is_triggered_only = yes

    option = {
        name = test_event.1.aa
    }

    after = {
+       country_event = {
+           id = test_event.2
+           days = 30
+           random = 30
+       }
    }
}
```

这个触发器看上去是非常简单的，如果去掉 `days` 以及 `random` ，和我们一开始最最基础的 event 格式是一模一样，意思想必各位都能够猜的到了， `country_event` 是要触发的 Event Type， `id` 则是要触发的 Event 的 id， `days` 指的是延迟多久发生（注意，在这里只能够使用 `days` ，不能够使用 `months` 以及 `years` ），random` 则是在基础时间上再增加了一个随机时间，使得触发时间不再固定。

值得一提的是在 Action 中并没有“每三个月触发一次”这样的触发器，因此我们可以通过自己触发自己来达到这个目的：

```pdx
country_event = {
    id = test_event.1
    title = test_event.1.name
    desc = test_event.1.desc
    picture = GFX_evt_analyzing_artifacts
    location = root
    show_sound = select_click

    immediate = {
        add_modifier = {
            modifier = test_modifier
        }
    }

    trigger = {
        is_ai = no
    }

    is_triggered_only = yes

    option = {
        name = test_event.1.aa
    }

    after = {
        country_event = {
            id = test_event.1
            days = 30
        }
    }
}
```

Effect 的数量与 Conditions 数量相当，因此我们应当多看，多用，多学才能够实现更多有意思的功能。

## 附加属性

除了上述最常用的属性之外，Event 当中还有一些常用属性可以用来丰富自身，下面列出了大部分常用的基础属性可以帮助调整事件：

```pdx
country_event = {
    id = test_event.1
    # hide_window = yes         # 是否隐藏界面
    # is_triggered_only = yes
    is_advisor_event = yes
    title = test_event.1.name
    desc = test_event.1.desc
    location = root
    show_sound = select_click
    diplomatic = yes        # 是否启用外交界面
    diplomatic_title = TEST # 外交界面标题本地化Key，不写默认为“传入通讯”
    picture_event_data = {  # 外交界面图片声明，本质为图层的组合
        room = default_room # 房间图层，在 `gfx\portraits\city_sets` 放入，直接使用名称即可
                            # 可使用基础Scope(Country)，也可承接Target
        portrait = ai_crisis_1      # 肖像图层，可承接Target(Leader)
        city_level = root   # 城市图层，可使用基础Scope(Planet,Country,Species)，可承接Target
        graphical_culture = root    # 城市显示的图像文化，可承接基础Scope(Country)，可承接Target
    }
    fire_only_once = yes    # 只启动一次，通常用于mtth，事件启动一次之后就被扔掉(写入之后无法被控制台触发)
    mean_time_to_happen = {
        days = 100
        # scaled_modifier = {   # 依据calc给出的参数缩减mtth规定的时间
        #   div = 2         # 修正calc的参数
        #   scope = this    # 定义calc调用的Scope
        #   calc = planets_in_country   # 选择需要调用的游戏动态参数
        # }                             # 比如你国家有10个球，则被div除了2之后就是5，因此规定时间变为100/5 = 20 天
        modifier = {
            add = -20
            has_civic = civic_agrarian_idyll
        }
    }

    trigger = {
        is_ai = no
    }

    immediate = {

    }

    option = {
        name = test_event.1.aa
    }
    option = {
        name = test_event.1.bb
        is_dialog_only = yes    # 是否为对话选项，点了之后不会退出事件，而是显示一行文本在描述中
        response_text = test_event.1.bb.response    # 配合上述属性，定义回复文本的本地化Key
        default_hide_option = yes   # 默认退出选项，如果是按Esc退出的事件，默认选择的选项
                                    # 不定义则默认为第一个声明的选项
    }

    after = {

    }
}
```

## 其他属性

关于事件还有其他可能用到的但不经常用的属性：

```pdx
country_event = {
    id = test_event.1
    is_triggered_only = yes
    title = test_event.1.name
    desc = test_event.1.desc

    option = {
        name = test_event.1.aa
    }
}

country_event = {
    id = test_event.2
    base = test_event.1
}
```

如上示例， `base` 可以以其他事件为基准复制其一些基本属性，包括 `title` ， `desc` ， `option` 以及 `is_triggered_only` ， `show_sound` 等属性，不过并不复制 `immediate` ， `after` ， `trigger` 中的内容，包括下方将要提到的 `abort_trigger` 及 `abort_effect` 属性。

其中我们可以重写复制的一些属性，不过仅只有三个条目可以重写，示例如下：

```diff
country_event = {
    id = test_event.1
    is_triggered_only = yes
    title = test_event.1.name
    desc = test_event.1.desc
+   show_sound = select_click

    option = {
        name = test_event.1.aa
    }
+   abort_effect = {
+
+   }
}

country_event = {
    id = test_event.2
    base = test_event.1
+   show_sound_clear = yes
+   show_sound = select_colony_ship
+   desc_clear = yes
+   desc = test_event.2.desc
+   option_clear = yes
+   option = {
+       name = test_event.2.aa
+   }
}
```

可以重写的条目为 `desc` ， `show_sound` ， `option` 。当我们需要重写某一条目之时我们只需要写上 `xx_clear` 即可清除复制的基础事件的对应属性，此时即可重写该属性，按照一般的声明写法即可。
有时候我们可能需要防止某些事件一直悬浮在玩家窗口，尤其是要防止玩家挂着事件不点击之时，我们就需要用到事件的另两个属性， `abort_effect` 与 `abort_trigger` ：

```pdx
country_event = {
    id = test_event.1
    is_triggered_only = yes
    title = test_event.1.name
    desc = test_event.1.desc
    immediate = {
        set_country_flag = test_flag
    }
    abort_trigger = {
        has_country_flag = test_flag
    }
    abort_effect = {
        add_resource = {
            minerals = -100
        }
    }
    option = {
        name = test_event.1.aa
        add_resource = {
            minerals = -100
        }
    }
}
```

我们直接看事件下半部分即可， `abort_trigger` 的作用是在满足条件之时终止该事件，对于弹窗事件来说如果在窗口开启期间满足 `abort_trigger` 的话，在第二天该事件会被关闭，注意，这里必须是需要经过一天进行判定，关闭事件之后将会执行 `abort_effect` 内的效果。现在我们来看一下上方事件的逻辑：
首先 `immediate` 先加上了一个 country flag 作为标记，理论上如果 `abort_trigger` 会立刻被满足而导致事件瞬间关闭，但是由于 `abort_trigger` 的延迟性质，如果此刻处于暂停阶段的话，该事件仍然会存在并且可以正常点击，不过只需要取消暂停过一天时间，该事件将立刻关闭并执行 `abort_effect` 的内容。

最后还有一个基本上用不到的属性， `major` ：

```pdx
country_event = {
    id = test_event.1
    is_triggered_only = yes
    title = test_event.1.name
    desc = test_event.1.desc
    major = yes
    major_trigger = {

    }
    option = {
        name = test_event.1.aa
    }
}
```

`major` 属性声明为 `yes` 之后，该事件触发之时将会给予所有满足 `major_trigger` 的国家发送该事件，起到一个通知的作用，不过真的很少用到。需要注意的是由于所有满足条件的国家都会触发，因此我们需要注意 option 的执行效果是会给予所有国家的，因此需要特别注意。
