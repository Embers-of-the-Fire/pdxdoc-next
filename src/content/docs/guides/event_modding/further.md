---
title: Event 高级功能
sidebar:
    order: 5
---

有了之前的基础知识，各位应该已经能够自己实现一些简单的功能，进阶篇将会对 Event 当中最常用的两类语句进行解析并结合实例进行讲解：标识(Flag)，事件对象(Event Target)。

## 标识(Flag)

统一通过 `set_<scope>_flag = <Flag_Key>` 语句对作用域内的对象加上一个标识(Flag)，该标识除非对象消失或者是被对应 Scope 的 `remove_<scope>_flag = <Flag_Key>` 语句清除，否则将一直依附于对象之上。如若我们只期望能够加上短时间内的 Flag 以供我们判断，我们可以通过 `set_timed_<Scope>_flag = { flag = <Flag_Key> <Time> = <int> }` 来设置一个带有时间的 Flag，该语句应该无需多解释，` <Scope>` 指定范围，` <Flag_Key>` 指定 Flag 名称，` <Time>` 指定时间单位(days，months，years)，` <int>` 指定时间量（整数）。以下两个例子展示了如何向国家添加 flag：

```pdx
country_event = {
    id = test_event.0
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        set_country_flag = this_is_a_flag
    }
}

country_event = {
    id = test_event.1
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        set_timed_country_flag = {
            flag = this_is_a_flag
            days = 30
        }
    }
}
```

既然有添加的手段，那么也有移除的手段，以下展示了如何移除一个 Flag。

```pdx
country_event = {
    id = test_event.1
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        remove_country_flag = this_is_a_flag
    }
}
```

如果移除一个不存在的 flag 将会忽视该语句，但是我仍然建议在移除之前先判断是否存在该 flag，判断 Scope 中是否存在某个 Flag 可以通过 `has_<scope>_flag = <Flag_Key>` 语句进行判定。

```pdx
country_event = {
    id = test_event.1
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        if = {
            limit = {
                has_country_flag = this_is_a_flag
            }
            remove_country_flag = this_is_a_flag
        }
    }
}
```

注意：所有 Flag 操作均需要在对应的 Scope 进行操作！接下来将展示 Flag 的几个实际用途：

示例：仅仅给第一个完成科技“灵能理论”的国家添加标记。

首先我们需要的是“完成科技”，因此寻找 `on_tech_increased` 触发器，填写 Event id。

```pdx
on_tech_increased = {
    events = {
        count_pop.0
    }
}
```

`last_increased_tech` 判断最后一个增加的科技是否为“灵能理论”， `trigger` 中的 `has_global_flag` 与 `immediate` 中的 `set_global_flag` 一同构成“唯一 Event”，这是最常见的唯一 Event 构建方式（ `fire_only_once` 是在触发 Event 之后便**丢弃**该 Event，**不论其启动与否**，而大多数情况下我们期望的是仅仅执行一次 Effect 而非仅仅触发一次）。此时我们已经给这个国家添加了一个 Flag，如若以后我们需要找到第一个完成“灵能理论”的国家，只需要判断这个国家是否拥有 `Research_Psionic_Theory` 即可寻找到该国家。 注意这里设置的 Flag 的 Scope 是 global，也就是全局，该 Scope 可以在任意 Scope 当中进行 set，remove 以及判定是否存在。

```pdx
namespace = count_pop

country_event = {
    id = count_pop.0
    is_triggered_only = yes
    hide_window = yes

    trigger = {
        NOT = {
            has_global_flag = first_research_psionic_theory
        }
        last_increased_tech = tech_psionic_theory
    }

    immediate = {
        set_global_flag = first_research_psionic_theory
        set_country_flag = research_psionic_theory
    }
}
```

然后，设置一个每年触发的全局 Event，检索是否存在第一个完成“灵能理论”的国家（注意要是第一个完成“灵能理论”的国家而非拥有“灵能理论”的国家），如若检索到存在则触发该 Event。

首先我们写上 Scope 是全局的每年检测的 Action 触发器：

```pdx
on_yearly_pulse = {
    events = {
        count_pop.1
    }
}
```

然后是检测任意国家是否存在 Flag， `any_country` 用以遍历当前所有国家，如若存在任意一个国家满足 `has_country_flag` ，则返回真值。（也可以检测全局 flag）

```pdx
event = {
    id = count_pop.1
    is_triggered_only = yes
    hide_window = yes

    trigger = {
        # has_global_flag = first_research_psionic_theory
        any_country = {
            has_country_flag = research_psionic_theory
        }
    }
}
```

设定上一步 `event id=count_pop.1` 的效果为：让第一个完成“灵能理论”的国家触发另一个 `country_event id=count_pop.2` 。该 `event id=count_pop.2` 的效果为：迁移随机一个星球上一半的人口到首都。

先补充完 `event id=count_pop.1` ，通过 `every_country` 遍历国家，再通过我们之前设置的 `country_flag` 筛选国家，然后让筛选出的国家执行接下来的事件：

```diff
event = {
    id = count_pop.1
    is_triggered_only = yes
    hide_window = yes

    trigger = {
        # has_global_flag = first_research_psionic_theory
        any_country = {
            has_country_flag = research_psionic_theory
        }
    }

+   immediate = {
+       every_country = {
+           limit = {
+               has_country_flag = research_psionic_theory
+           }
+           country_event = {
+               id = count_pop.2
+           }
+       }
+   }
}
```

然后写出 `event id=count_pop.2` 的框架：

```pdx
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    hide_window = yes

    immediate = {

    }
}
```

然后几居室碎料机选择一个殖民星球并将 Scope 转到 planet：

```diff
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    hide_window = yes

    immediate = {
+       random_owned_planet = {
+
+       }
    }
}
```

我们完成这个功能的思路是：获取一半的人口，转移到首都。那么如何决定转移人口的数量呢，单纯的在 `every_owned_pop` 中是无法实现的，即使我们能够通过 `limit` 筛选一部分 pop，但是仍然无法精确指定一半的人，因此我们需要通过采用 `while` 循环来进行操作。首先需要明确 while 的用法。循环，顾名思义，循环执行某一段命令，以下示例是通过 `count` 来限制循环次数，这里为 5，因此将执行 `random_owned_pop = { kill_pop = yes }` 五次，也就是随机杀死星球上五个人口，**_注意，这个 count 可以承接变量的值_**，这将是关键。

```diff
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        random_owned_planet = {
+           while = {
+               count = 5
+               random_owned_pop = {
+                   kill_pop = yes
+               }
+           }
        }
    }
}
```

当然，我们也可以通过 limit 来限制循环次数，最多 100 次（曾经测试过两次，一次 100 一次 200，结合其他人的说法，应该是 100 次）。以下这个例子展示了 limit 的用法，需要满足 limit 内的条件才能继续循环，这里写的条件为是星球上人口数量大于 0 结合整体语句效果就是：随机杀死一颗星球上的全部人口（不超过 100，如若超过则杀死 100 人这里有可以优化的地方，但是在这里简单处理，无需考虑 100 人以上的情况）

```diff
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        random_owned_planet = {
            while = {
-               count = 5
-               random_owned_pop = {
-                   kill_pop = yes
-               }
+               limit = {
+                   count_owned_pop = {
+                       count > 0
+                   }
+               }
+               random_owned_pop = {
+                   kill_pop = yes
+               }
            }
        }
    }
}
```

这里我们需要采用第一种 count 的方式来限制循环次数（这里如果要用 limit 完全可以直接采用 `every_owned_pop` 操作）。我们上边已经提到了 count 的值可以承接变量(Variable)，此时我们需要用到 Flag 以及变量(Variable)的组合了（这里稍微涉及了一些简单变量操作），首先我们将需要统计的范围内所有人口加上 Flag：

```pdx
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        random_owned_planet = {
            every_owned_pop = {
                set_pop_flag = count_people
            }
        }
    }
}
```

此时我们并不知道我们给多少人口加上了 Flag，我们仅仅只是知道了这些人都有了这个 Flag，现在我们需要通过变量来获取人口数量，首先先写一个 while 循环，因为我们不清楚需要循环多少次，因此采取 limit 限制，限制条件为任意一个人口拥有名为 `Count_People` 的 Flag，在执行区域我们随机清除一个拥有 Flag 的人口的 Flag，然后再使用 `change_variable` 使得变量+1（蠢驴变量不需要手动初始化即可直接使用，默认初始化为 0），这样我们就能够每次清除一个 Flag 都使得变量+1，从而得到总人口数量。

```diff
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        random_owned_planet = {
            every_owned_pop = {
                set_pop_flag = count_people
            }
+           while = {
+               limit = {
+                   any_owned_pop= {
+                       has_pop_flag = count_people
+                   }
+               }
+               remove_pop_flag = count_people
+           }
+           change_variable = {
+               which = total_pop
+               value = 1
+           }
        }
    }
}
```

此时我们需要转移一半的人口，则需要对变量进行除法操作，divide_variable 提供了这一功能，which 填写被除数，value 填写除数，前者必须是一个变量名称，后者即可以是一个变量名称，也可以是一个数字，这里我们需要分半因此填写 2。

```diff
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        random_owned_planet = {
            every_owned_pop = {
                set_pop_flag = count_people
            }
            while = {
                limit = {
                    any_owned_pop= {
                        has_pop_flag = count_people
                    }
                }
                remove_pop_flag = count_people
            }
            change_variable = {
                which = total_pop
                value = 1
            }
        }
+       divide_variable = {
+           which = total_pop
+           value = 2
+       }
    }
}
```

现在我们的变量已经是总人口数量的一半了，再创建一个 while 循环，采用 count 进行次数限制，上文已经提过了，count 可承接一个变量的值（自动取整），因此我们只需要把变量名称填写上去就好了，此时需要转移人口，每次转移一个，因此采用 `random_owned_people` 转移到 pop，再采用 `resettle_pop` 进行人口转移。pop 选择需要转移的 Scope 为 pop；planet 选择需要转移的 Scope 为 planet。显然这里需要转移的 pop 就是当前随机选中的 pop，因此写上 `pop = this` ，需要转移的 planet 是首都，这里可以直接写上 `planet = capital_scope` 进行处理（以下示例我将变量操作进行了行数缩减，内容并在了一行，各位自行尝试之时还是建议将其完全展开，增强其可读性）

```diff
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    title = count_pop.2.name
    desc = count_pop.2.desc

    immediate = {
        random_owned_planet = {
            every_owned_pop = {
                set_pop_flag = count_people
            }
            while = {
                limit = {
                    any_owned_pop= {
                        has_pop_flag = count_people
                    }
                }
                random_owned_pop = {
                    limit = {
                        has_pop_flag = count_people
                    }
                    remove_pop_flag = count_people
                }
                change_variable = {
                    which = total_pop
                    value = 1
                }
            }
            divide_variable = {
                which = total_pop
                value = 2
            }
+           while = {
+               count = total_pop
+               random_owned_pop = {
+                   resettle_pop = {
+                       pop = THIS
+                       planet = capital_scope
+                   }
+               }
+           }
+       }
    }
}
```

此时这个功能就完成了。

然后我们需要将变量显示到文本框中出来，这里将应用支架命令(Bracket Commands)。

有时候我们不需要知道我们转移了多少人口，但有时候我们想要知道转移了多少人口，或者我们需要统计人口总数，蠢驴在本地化之时提供了一种显示当前 Scope 内 Variable 的方式：支架命令(Bracket Commands)，支架命令的调用格式为：` [.]` ，其中 Scope 表示需要执行命令的 scope；Commands 表示需要执行何种命令，其有三种类型：

1. 变量显示类：形式为：` [<Scope>.<Variable>]` ，Scope 表示需要显示的变量的 Scope，Variable 表示 Scope 内 variable 的名称。

2. 预设指令类：形式为：` [<Scope>.<Pre-Commands>]` ，Scope 表示需要进行执行 Pre-Commands 的 Scope，Pre-Commands 表示需要对目标 Scope 进行何种命令用以获取其何种属性。Pre-Commands 可以参考官方 Wiki 的文件检索(Text Retrieval)指令，其中使用最为频繁的是 `GetName` 指令，作用是获取当前 Scope 的名称。

3. 自定义指令类：形式为：` [<Scope>.<Loc-Name>]` ，Scope 表示需要执行 Loc-Name 的 Scope，Loc-Name 为之定义指令，可在 `common/scripted_loc` 文件夹下定义。

关于以上内容的 2 ，3 点将会在之后的章节中进行详细叙述，现在仅仅需要掌握第一点即可，现在我们来改造一下我们上方已经完成的 Event，将最后一个 `Event id = Count_Pop.2` ，改造成一个可见 Event，并且在文本当中显示出迁移的人口数量。我们此时需要改变设置 Variable 的 Scope，从之前的直接在 Planet 当中设置 Variable 变成在 root（此处 root 为 Country）中设置 Variable，以方便我们采用支架命令进行显示。

而且我们需要注意的是，之前我们所写的 Event 逻辑其实是有问题的，如果这个 Event 需要不断的启动，我们的变量在使用完之后并为归 0，将会导致下一次进行人口统计的失误，因此我们需要将变量手动置为 0。

```diff
country_event = {
    id = count_pop.2
    is_triggered_only = yes
    title = count_pop.2.name
    desc = count_pop.2.desc

    immediate = {
        random_owned_planet = {
            every_owned_pop = {
                set_pop_flag = count_people
            }
            while = {
                limit = {
                    any_owned_pop= {
                        has_pop_flag = count_people
                    }
                }
                random_owned_pop = {
                    limit = {
                        has_pop_flag = count_people
                    }
                    remove_pop_flag = count_people
                }
                root = {
                    change_variable = {
                        which = total_pop
                        value = 1
                    }
                }
            }
            root = {
                divide_variable = {
                    which = total_pop
                    value = 2
                }
                while = {
                    count = total_pop
                    prev = {
                        random_owned_pop = {
                            resettle_pop = {
                                pop = THIS
                                planet = capital_scope
                            }
                        }
                    }
                }
            }
        }
    }

+   after = {
+       set_variable = {
+           which = total_pop
+           value = 0
+       }
+   }
}
```

这里写入 `after` 和写入 `immediate` 最后的执行顺序并没有什么区别，仅仅是为了区分一下，使 `immediate` 的内容仅仅用来实现主要功能，after 进行执行功能完毕后的某些对象的重置处理，使得可读性更高。

以上还要注意的一点是，我每次改变 Variable 之前都嵌套了一个 root，这是因为 Variable 也是有 Scope 的，因此我们需要统一在一个 Scope 中进行操作，在之前的事例当中，我们的 Variable 全部在一个随机的 planet 当中，此时变量是依附于该 Scope，因此可以进行计算，但我们无法取到该 Scope 进行其上的变量显示，因此我们每次操作变量之时都将 Scope 统一转移到 country 当中操作。在下面的 while 循环中我们也切换到了 country 以便取到 Variable 的值，但执行的语句需要在我们随机取到的 planet 之上，因此再嵌套了一个 prev 用以返回到上一个 Scope。

现在我们来看看本地化（此处我没有写 option，因为没必要）：

```yaml
count_pop.2.name:0 "迁移人口"
count_pop.2.desc:0 "[this.total_pop]"
```

this 代表当前 event 的 this 作用域，这里显然是 `country` ， `total_pop` 表示将会检索该作用域中同名的 Variable 并将其显示出来，注意这里的作用域一定要是 Variable 的所在 Scope，不然将会显示为空（如果变量为 0 也会显示为空，可以采用 `scripted_loc` 进行补偿显示）。

## 事件对象(Event Target)

事件对象分为两种，一种为局部事件对象，由 `save_event_target_as = <TargetKey>` 进行声明，另一种为全局事件对象，由 `save_global_event_target_as = <TargetKey>` 进行声明，该语句作用为存储当前 Scope，以便之后的调用。

### 局部事件对象(Event Target)

以下示例展示了如何将一个首都星球的 Scope 存储到名为 `this_is_capital` 的局部事件对象当中：

```pdx
namespace = test_event

country_event = {
    id = test_event.0
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        capital_scope = {
            save_event_target_as = this_is_capital
        }
    }
}
```

接下来我们们可以在该 Event 中任何需要用到首都的地方均可以通过调用该 Target 来代替，现在我们假设需要实现如下功能：

-   让玩家自行选择为自己某一个领袖添加一个特质

该功能涉及以下问题：

-   列举所有领袖
-   添加特质

我们先确定如何列举所有的领袖，蠢驴并没有给出这个接口，因此我们只能通过一个选项列举一个领袖的方式进行穷举，我们无法动态的给予选项数量，而且考虑到我们的界面无法显示过多的选项，我们决定采用八个选项显示八个不同领袖的名称（你也可以自行设定个数），然后通过一个刷新按钮进行名称的刷新以求能够遍历取到我们所需要的领袖。首先，我们进行基础架构：

```pdx
namespace = test_event

country_event = {
    id = test_event.0
    is_triggered_only = yes
    title = test_event.0.name
    desc = test_event.0.desc

    immediate = {

    }
    option = {
        name = test_event.0.aa
    }
    option = {
        name = test_event.0.bb
    }
    option = {
        name = test_event.0.cc
    }
    option = {
        name = test_event.0.dd
    }
    option = {
        name = test_event.0.ee
    }
    option = {
        name = test_event.0.ff
    }
    option = {
        name = test_event.0.gg
    }
    option = {
        name = test_event.0.hh
    }
    option = { # 刷新
        name = test_event.0.00
    }
    option = { # 退出
        name = test_event.0.01
    }
}
```

然后我们需要进行领袖的选择，由于我们无法定向选择某个领袖，因此我们需要用到 `random_owned_leader` 进行随机选取，每次随机选取我们就存储一个 Target，此时我们需要八个选项，因此我们需要八个不同的 Target 来存储不同的 leader：

```diff
country_event = {
    id = test_event.0
    is_triggered_only = yes
    title = test_event.0.name
    desc = test_event.0.desc

    immediate = {
+       random_owned_leader = {
+           save_event_target_as = select_leader_1
+       }
+       ...
    }

    option = {
        name = test_event.0.aa
    }
    ...
    option = { # 刷新
        name = test_event.0.00
    }
    option = { # 退出
        name = test_event.0.01
    }
}
```

我们此时可以想到一个问题，容易重复选取到同一个对象，因此我们需要将已经选取的对象进行筛选，利用我们上边提到的 Flag 的知识，我们可以很容易想到，每选取一个领袖就为该领袖上一个 Flag，筛选没有该 Flag 的领袖存储 Target 即可，不过此时记得在事件完成之后完成清除 flag 以免影响下一次事件触发的判定：

```diff
country_event = {
    id = test_event.0
    is_triggered_only = yes
    title = test_event.0.name
    desc = test_event.0.desc

    immediate = {
        random_owned_leader = {
+           limit = {
+               NOT = {
+                   has_leader_flag = screening_flag
+               }
+           }
            save_event_target_as = select_leader_1
+           set_leader_flag = screening_flag
        }
        ...
    }

    option = {
        name = test_event.0.aa
    }
    ...
    # 刷新
    option = {
        name = test_event.0.00
+       trigger = {
+           exists = event_target:select_leader_8
+       }
    }
    # 退出
    option = {
        name = test_event.0.01
    }

+   after = {
+       every_owned_leader = {
+           limit = {
+               has_leader_flag = screening_flag
+           }
+           remove_leader_flag = screening_flag
+       }
+   }
}
```

以此将全部 `random_owned_leader` 加上判断以及效果，此时我们会考虑可能没有那么多领袖，导致存储了一个空的 Target，因此我们最好再加上一个判断；而且我们也不期望在领袖不足之时弹出过多选项，因此我们也在 option 上加上判断（刷新按钮当然得出现满选项才能使用，因此判断和最后一个承接领袖的 trigger 一样）：

```diff
country_event = {
    id = test_event.0
    is_triggered_only = yes
    title = test_event.0.name
    desc = test_event.0.desc

    immediate = {
        random_owned_leader = {
            limit = {
                NOT = {
                    has_leader_flag = screening_flag
                }
            }
-           save_event_target_as = select_leader_1
-           set_leader_flag = screening_flag
+           if = {
+               limit = {
+                   exists = this
+               }
+               save_event_target_as = select_leader_1
+               set_leader_flag = screening_flag
+           }
        }
        ...
    }

    option = {
        name = test_event.0.aa
+       trigger = {
+           exists = event_target:select_leader_1
+       }
    }
    ...
    # 刷新
    option = {
        name = test_event.0.00
        trigger = {
            exists = event_target:select_leader_8
        }
    }
    # 退出
    option = {
        name = test_event.0.01
    }

    after = {
        every_owned_leader = {
            limit = {
                has_leader_flag = screening_flag
            }
            remove_leader_flag = screening_flag
        }
    }
}
```

该判断语句为 `exists = this` 以及 `exists = event_target:<TargetKey>` ，后者表示调用之前存储的 Target，语句表示是否存在当前 Scope，虽然存储一个空 Target 会直接删除该 Target，但我期望各位能够有一个良好的习惯，不对空对象进行操作，以免遇到不必要的麻烦。此时我们已经取到了八个不同的领袖，此时我们需要将其依附于不同选项，开始调用这八个 Target 并添加一个特质，在刷新选项添加重启该事件的效果来随机重排选择的领袖：

```diff
country_event = {
    id = test_event.0
    is_triggered_only = yes
    title = test_event.0.name
    desc = test_event.0.desc

    immediate = {
        random_owned_leader = {
            limit = {
                NOT = {
                    has_leader_flag = screening_flag
                }
            }
            if = {
                limit = {
                    exists = this
                }
                save_event_target_as = select_leader_1
                set_leader_flag = screening_flag
            }
        }
    }

    option = {
        name = test_event.0.aa
        trigger = {
            exists = event_target:select_leader_1
        }
+       hidden_effect = {
+           event_target:select_leader_1 = {
+
+           }
+       }
    }
    option = {
        name = test_event.0.00
        trigger = {
            exists = event_target:select_leader_8
        }
+       hidden_effect = {
+           country_event = {
+               id = test_event.0
+           }
+       }
    }

    option = {
        name = test_event.0.01
    }

    after = {
        every_owned_leader = {
            limit = {
                has_leader_flag = screening_flag
            }
            remove_leader_flag = screening_flag
        }
    }
}
```

最后进行本地化，我们需要让玩家知道我们所获取的 Target 到底是谁，因此我们需要显示出 Target 的名称，此时我们需要采用支架命令：

```yaml
test_event.0.aa:0 "[select_leader_1.GetName]"
test_event.0.bb:0 "[select_leader_2.GetName]"
test_event.0.cc:0 "[select_leader_3.GetName]"
test_event.0.dd:0 "[select_leader_4.GetName]"
test_event.0.ee:0 "[select_leader_5.GetName]"
test_event.0.ff:0 "[select_leader_6.GetName]"
test_event.0.gg:0 "[select_leader_7.GetName]"
test_event.0.hh:0 "[select_leader_8.GetName]"
test_event.0.00:0 "刷新"
test_event.0.01:0 "返回"
```

我们可以通过` [Target.GetName]` 获取 Target 的 `Name` 属性，即显示出其名称。

### 全局事件对象(Global Event Target)

全局事件对象的声明以及使用与局部事件对象并无太大区别（声明的语句有些许不同，但使用均是 `event_target:<TargetKey> = { <Effect> }` ），但与局部事件对象不同的是，只要这个 Target 被声明，将可以在任何地方进行调用，而不仅仅局限于当前的 Event

:::note[提示]

局部事件对象在单个 Event 当中的存在时间为事件开始到事件结束，但是如若该 Event 启动了其他 Event，此时第一个 Event 存储的 Target 将可以继承到下一个 Event：

:::

```pdx
country_event = {
    id = test_event.0
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        save_global_event_target_as = test_target
        country_event = {
            id = test_event.1
        }
    }
}

country_event = {
    id = test_event.1
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        event_target:test_target = {

        }
    }
}
```

此时的 test_target 将会从 `Event id = test.0` 继承到下一个 `Event id = event_test.1` ，因此第二个 `Event id = event_test.1` 中的 `event_target:test_target = { }` 合法且有效。

全局事件对象声明之后，除非该对象消失或者被手动清除，否则将一直存在，我们需要通过通过一个特定的清除语句进行操作：

```pdx
country_event = {
    id = test_event.0
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        save_global_event_target_as = test_target
    }
}

country_event = {
    id = test_event.1
    is_triggered_only = yes
    hide_window = yes

    immediate = {
        # 清除全局对象
        clear_global_event_target = test_target
    }
}
```

第一个 `Event id = test.0` 进行全局事件对象的声明( `test_target` )，第二个 `Event id = test.1` 进行 `test_target` 的定向清除( `clear_global_event_target = <GlobalTargetKey>` )，此时我们需要注意一个相近的语句：

```pdx
clear_global_event_targets = yes
```

该语句的作用是清除当前存储的所有全局事件对象。

:::warning[兼容]

请慎重使用该语句，很多全局事件对象承载着很多关键 Event 的效果实现，一旦该语句生效，该档可以宣告结束，将会出现一堆不可预知的 bug（指定对象缺失），堪称隐性炸档利器。

:::

## 脚本效果(Scripted Effect)

在学习事件过程中你肯定见过一种情况，一个你觉得需要写几十行代码的功能，别人一行语句就解决了，然后你尝试也这样去做，然后失败了，这其中涉及到的就是脚本效果(Scripted Effect)。蠢驴给出了减少重复代码编写的方式，即将需要重复使用的代码进行封装到 `common/scripted_effects` 文件夹下的文件当中，然后外部直接使用封装 Key 实现调用，具体我们看以下示例：

> 以下示例来自工坊 id 2047260446，Arknights Near Future

```pdx
civic_pharmaceutical_enterprises_start_buildings = {
    if = {
        limit = { owner = { is_regular_empire = yes } }

        if = {
            limit = { owner = { has_civic = civic_pharmaceutical_enterprises } }
            remove_building = building_commercial_zone
            add_building = building_ark_hospital
        }
    }
}
```

上述示例展示了如何将一段 Effect 进行封装，只需要在我们需要封装的 Effect 合集外面套一层封装 Key(自定义)即可，封装之后的 Effect 合集也算作 Effect，因此我们可以在任何可以使用 Effect 的地方调用该 Scripted Effect：

```pdx
planet_event = {
    id = ark_game_start.1
    hide_window = yes
    is_triggered_only = yes

    immediate = {
        if = {
            limit = { has_planet_flag = planet_terra }  # 前提:是泰拉星球
            generate_terra_deposits_and_blockers = yes  # 初始地块
            civic_pharmaceutical_enterprises_start_buildings = yes  # 初始建筑
            generate_terra_start_districts = yes        # 初始区划
        }
    }
}
```

如上示例，我们可以很轻易地调用该 Scripted Effect，仅需要` <Key> = yes` 即可调用该 Effect 集合，该段效果与将 Effect 集合直接写入调用区域完全相同，如下示例与上述示例效果完全相同：

```pdx
planet_event = {
    id = ark_game_start.1
    hide_window = yes
    is_triggered_only = yes

    immediate = {
        if = {
            limit = { has_planet_flag = planet_terra }  # 前提:是泰拉星球
            generate_terra_deposits_and_blockers = yes  # 初始地块
            # civic_pharmaceutical_enterprises_start_buildings = yes # 初始建筑
            if = {
                limit = { owner = { is_regular_empire = yes } }
                if = {
                    limit = { owner = { has_civic = civic_pharmaceutical_enterprises } }
                    remove_building = building_commercial_zone
                    add_building = building_ark_hospital
                }
            }
            generate_terra_start_districts = yes    # 初始区划
        }
    }
}
```

需要注意的是，Scripted Effect 没有固定的默认 Scope，其 this 作用域和调用之时所在的 Scope 相同，也就是说你在 country 调用 Scripted Effect，那么你所调用的 Scripted Effect 的 this 作用域就是 country。

Scripted Effect 可以有效的减少重复代码的书写，以便在需要改动之时仅需改动我们所封装的 Effect 集合即可达到修改所有调用区域所实现的 Effect，是大型 mod 的必备操作形式。

关于 Scripted Effect 的进阶用法将在之后的章节进行讲解。

## 脚本条件(Scripted Trigger)

与 Scripted Effect 一样，Scripted Trigger 也是对某一段代码的封装，不过其承载的是 Condition 而非 Effect，也就是说 Scripted Trigger 是一个 Condition 的集合封装，其声明在 `common/scripted_triggers` 下的文件当中，其调用以及声明皆与 Scripted Effect 一样，可以在任何需要承接 Condition 的地方进行调用，其 this 作用域也遵循与 Scripted Effect 一样的规律。

> 以下示例来自工坊 id 2047260446，Arknights Near Future

```pdx
buildings_no_d32_steels = {
    exists = owner
    owner = {
        is_ai = yes
        has_monthly_income = {
            resource = d32_steels
            value < 0
        }
        has_resource = { type = d32_steels amount = 0 }
    }
}   # 用于拆除需要D32钢但缺少D32钢的建筑物
```

调用（使用于 `destroy_trigger` ）：

```pdx
building_military_enterprises = {
    base_buildtime = @b2_time
    base_cap_amount = 1
    category = manufacturing
    potential = { ... }

    destroy_trigger = {
        exists = owner
        OR = {
            ...
            buildings_no_d32_steels = yes
        }
    }

    allow = { ... }
    planet_modifier = { ... }
    triggered_planet_modifier = { ... }
    triggered_planet_modifier = { ... }
    resources = { ... }
    prerequisites = { ... }
    triggered_desc = { ... }
    ai_weight = { ... }
}
```

关于 Scripted Trigger 的进阶用法将在之后的章节进行讲解。

## 脚本变量(Scripted Variables)

十分简单的用法，在 `common/scripted_variables` 下定义，直接看香草文件：

```pdx
# Add global variables here that will be available in all script files.
# @something = 42
# They can be overridden in each normal script file.

@discovery_weight = 3
```

在此定义一个全局常量（说是变量，但完全没法变啊！），采用 `@<VariableKey> = <int>` 进行定义一个 Scripted Variable，之后可以在需要填入数字的地方调用其即可，调用方式为 `@<VariableKey>` ，并可在任何通常的文件中重新赋值(在重新定义的文件当中生效)。

并无太大用途，在 Technology 这类需要大量调用数值的文件中可以省去部分时间，这种@声明的变量也可以在其他文件的开始部分进行声明，不过在其他文件中声明就是局部变量，只能够在本文件当中调用：

```pdx
@tier6cost1 = 30000
@tier6cost2 = 40000
@tier6cost3 = 50000

@tier7cost1 = 100000
@tier7cost2 = 125000
@tier7cost3 = 150000

@tier8cost1 = 250000
@tier8cost2 = 500000
@tier8cost3 = 750000

@tier9cost1 = 1000000
@tier9cost2 = 2000000
@tier9cost3 = 3000000

@tier10cost1 = 5000000
@tier10cost2 = 7500000
@tier10cost3 = 10000000
```

如上示例是在 `common/technology` 下文件开头中声明的，因此其作用范围是该文件，其他文件无法引用其中数值。
