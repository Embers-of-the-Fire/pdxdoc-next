---
title: 作用域(Scope)
sidebar:
    order: 4
---

终于还是来到了作用域(Scope)，我们如果要写出精彩的功能，就当然不会满足于在一个固定 Scope 进行 Effect 操作，我们需要在一个默认作用域当中去影响其他作用域并实现我们的一些功能，此时我们就需要作用域的转换了，在这一节，你将认识到何为 Scope 以及如何完成 Scope 的转换。

## 系统作用域(System Scopes)

系统作用域包括四个命令： `This` ， `From` ， `Root` ， `Prev` ，不区分大小写，你可以随意写成什么样的形式，可以是 this，也可以是 THIS，当然还可以是 ThIs，不过你需要养成自己的编写习惯并能够同一格式，不然你自己写的文件里各种形式群魔乱舞，美观以及可读性都将会下降（点名批评蠢驴）。

-   `This` ： `This` 表示当前作用域，一般来说没有什么用途，不过填写某些作用域型参数之时可能会用到。
-   `Prev` ： `Prev` 表示上一个作用域，可以用来回溯以前的作用域，最多可以回溯四层： `PrevPrevPrevPrev` 。

```pdx
country_event = {
    id = test_event.0
    hide_window = yes
    is_triggered_only = yes

    immediate = {
        random_system = {
            every_system = {
                limit = {
                    distance = {
                        source = prev
                        max_jumps = 5
                    }
                }
            }
        }
    }
}
```

如上示例： `random_system` 随机选取一个 System 范围，将 Scope 转换到 System，在其中执行无承接 Scope 的 Effect（就是指没有规定要在某个 Scope 中才能执行的 Effect，作用域是任意(Any)） `every_system` ，遍历每个星系并将 Scope 转换到 System，此时我们用 `limit` 限定其范围， `distance` 表示距离 `source` （范围参数，指定一个 Scope）最多 5 跳的范围内，而这个 `source` 后面的 Prev 也就是代表回溯的上一个 Scope，也就是 `random_system` 所储存的一个 System（这里需要区分 every 和 random 的，前者是通过范围限定取得一个 Scope 集合，其中存在多个相同 Scope 的元素，后者则是取一个 Scope 元素）。我们可以将更多的 Effect 语句直接写入 `every_system` 当中（**和 `limit` 并列**），此时的 Scope 就已经转换到了随机获取的一个随机星系的 5 跳范围内的所有星系。

-   `Root` ：表示一个 Event 最初始的默认 Scope。

```pdx
country_event = {
    id = test_event.0
    hide_window = yes
    is_triggered_only = yes

    immediate = {
        every_war = {
            every_war_participant = {
                limit = {
                    NOT = {
                        is_same_value = root
                    }
                }
            }
        }
    }
}
```

如上的示例， `every_war` 是遍历当前发生的所有战争，并且将 Scope 转换到 War，之后的语句需要是能够在 War 中执行的语句。 `every_war_participand` 是遍历当前所有参战的国家，其承接的 Scope 需求是 War，而 `every_war` 已经将 Scope 转换为 War，因此 `every_war_participand` 合法，该语句会将 Scope 转换到了 Country，此时通过 `limit` 来限制遍历获取的 Country 集合， `is_same_vale` 表示判断获取的 Country 是不是和 Root 相同，由于该 Event 的默认 Scope 为 Country 且锁定了该 Country，因此 Root 代表的就是改 Event 的发起国家，因此 `every_war_participant` 获取的是除了发起该 Event 的国家之外的所有正在参与战争的国家。

-   `From` ：代表触发该 Event 的上级 Scope。

```pdx
country_event = {
    id = test_event.0
    hide_window = yes
    is_triggered_only = yes

    immediate = {
        every_owned_planet = {
            planet_event = {
                id = test_event.1
            }
        }
    }
}

planet_event = {
    id = test_event.1
    hide_window = yes
    is_triggered_only = yes

    immediate = {
        from = {

        }
    }
}
```

如上示例，第二个 Event 中 From 指定的是该 Event 发起者的默认 Scope，也就是第一个 Event 的 Country。使用 From 需要了解该 Event 被谁调用了，此时就需要上文提到的查看引用来找到谁引用了这个 Event 用以确定 From 可能的值。此时你可能会想到如果该事件是被 Action 触发怎么办，此时需要参考蠢驴的 Action 注释，存在 From 之时将会给出注释标明当用该 Action 之时的 From 代表的 Scope，如下展示了采用 Action 触发之时 Event 中的 From 解释：

```pdx
# Action
on_entering_battle = {
    events = {
        test_event.0
    }
}
```

```pdx
# Event
country_event = {
    id = test_event.0
    hide_window = yes
    is_triggered_only = yes

    immediate = {
        from = {

        }
        fromfrom = {

        }
        fromfromfrom = {

        }
    }
}
```

查找蠢驴注释能够知道这个事件中：

-   `This` ：进入战斗的舰队的所有者（事件发起者）
-   `From` ：进入战斗的第二支舰队的所有者
-   `FromFrom` ：舰队（事件发起者的舰队）
-   `FromFromFrom` ：第二支舰队

## 链式作用域(Chaining Scopes)

蠢驴的作用域不仅仅能够用系统作用域进行切换，还支持点操作符进行切换，从而形成一个链式作用域。

```pdx
country_event = {
    id = test_event.0
    hide_window = yes
    is_triggered_only = yes

    immediate = {
        capital_scope.solar_system.star = {

        }
    }
}
```

如上所示，在我们读取链式作用域之时，我们可以将“.”读作“的”，上述链式作用域 `capital_scope.solar_system.star` ， 可以读作：首都星球的星系的主恒星。
注意：系统作用域(System Scopes)也可以参与链式作用域的一部分，比如 `owner.prev` ，但注意，链式作用域仅仅只是指向一个作用域，且**最多嵌套 5 层**。

## 触发器作用域(Triggers and Scopes)、效果作用域(Effect and Scopes)

一切 Trigger 以及 Effect 均存在 Scope，需要符合相同的 Scope 才能正确执行 Effect，上文我们已经了解到了如何转换作用域，那么各位可以自行写一些包含多个作用域的 Event 来测试一下自己的水平。

## 作用域种类(Scope Types)、作用域列表(List of Types)

每个作用域都是特定类型的对象，类型决定了在何时使用它们，作用域能够被 `is_scope_type = <scope>` 检测，下面是适用于游戏的作用域类型表。

### 作用域类型表

| **Scope Type**               | **Scopes of this type**                                                 |
| ---------------------------- | ----------------------------------------------------------------------- |
| `country`                    | owner, controller, space_owner, overlord, subject, last_created_country |
| `sector`                     | sector                                                                  |
| `galactic_object AKA system` | solar_system, star                                                      |
| `megastructure`              | megastructure                                                           |
| `ambient_object`             | ambient_object, last_created_ambient_object                             |
| `planet`                     | planet, capital_scope, orbit                                            |
| `deposit`                    | deposit                                                                 |
| `tile`                       | ?                                                                       |
| `archeaological_site`        | archeaological_site                                                     |
| `army`                       | last_created_army                                                       |
| `pop`                        | pop, last_created_pop                                                   |
| `species`                    | species, owner_species, last_created_species                            |
| `leader`                     | leader, ruler, last_created_leader                                      |
| `pop_faction`                | pop_faction                                                             |
| `ship`                       | starbase, last_created_ship                                             |
| `fleet`                      | fleet, last_created_fleet                                               |
| `design`                     | design, last_created_design                                             |
| `federation/alliance`        | federation/alliance                                                     |
| `war`                        | -                                                                       |

### 作用域表

| **Scope name**                | **Scope type**      | **Can be scoped from `xxx = { owner = {…} }` **               | **Can scope to `owner = { xxx = {…} }` ** |
| ----------------------------- | ------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| `owner`                       | country             | fleet, ship, planet, pop, leader, army, megastructure, sector, starbase | capital_scope, ruler                     |
| `controller`                  | country             | fleet, ship, planet, pop, leader, army, megastructure, sector, starbase | capital_scope, ruler                     |
| `space_owner`                 | country             | solar_system                                                 | capital_scope, ruler                     |
| `last_created_country`        | country             | any                                                          | capital_scope, ruler                     |
| `sector`                      | sector              | planet                                                       | leader, owner                            |
| `solar_system`                | galactic_object     | planet, star, ship                                           | star, starbase, space_owner              |
| `star`                        | galactic_object?    | solar_system                                                 | solar_system, starbase                   |
| `megastructure`               | megastructure       | -                                                            | planet, owner                            |
| `ambient_object`              | ambient_object      | -                                                            | solar_system                             |
| `last_created_ambient_object` | ambient_object      | any                                                          | solar_system                             |
| `planet`                      | planet              | pop, deposit, leader, army, archeaological_site, planet (moon) | solar_system, owner, controller          |
| `capital_scope`               | planet              | country                                                      | solar_system, owner, controller          |
| `orbit`                       | planet              | fleet, ship                                                  | solar_system, owner, controller          |
| `deposit`                     | deposit             | -                                                            | planet                                   |
| `archeaological_site`         | archeaological_site | planet                                                       | planet, leader                           |
| `army`                        | army                | ship                                                         | ship, leader, owner, pop                 |
| `last_created_army`           | army                | any                                                          | owner, pop                               |
| `pop``                        | pop                 | leader                                                       | owner, planet                            |
| `last_created_pop`            | pop                 | any                                                          | owner, planet                            |
| `species`                     | species             | pop, leader, country                                         | -                                        |
| `owner_species`               | species             | country                                                      | -                                        |
| `last_created_species`        | species             | any                                                          | -                                        |
| `leader`                      | leader              | fleet, sector, army                                          | species, owner                           |
| `ruler`                       | leader              | country                                                      | species, owner                           |
| `last_created_leader`         | leader              | any                                                          | species, owner                           |
| `pop_faction`                 | pop_faction         | -                                                            | owner                                    |
| `starbase`                    | ship                | star, solar_system                                           | orbit, owner                             |
| `last_created_ship`           | ship                | any                                                          | orbit, leader, owner                     |
| `fleet`                       | fleet               | ship                                                         | orbit, leader, owner                     |
| `last_created_fleet`          | fleet               | any                                                          | orbit, leader, owner                     |
| `design`                      | design              | -                                                            | owner                                    |
| `last_created_design`         | design              | any                                                          | orbit, leader, owner                     |
| `federation/alliance`         | federation/alliance | country                                                      | -                                        |
| `war`                         | war                 | -                                                            | -                                        |
