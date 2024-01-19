---
title: 内联代码(Inline Scripts)
---

内联代码能够让 modder 在一个文件中写入一个代码块，然后将该代码块包含到其他代码中，就好像它将直接复制黏贴到其他代码中一样（可以理解为跨文件的 C 宏替换），从而可以防止大量的复制粘贴并降低代码的耦合度。当脚本块内部的某些内容需要更新时，它尤其有用，因为更新 `inline_script` 将自动更新使用该 `inline_script` 的所有脚本、

这与 `scripted_triggers` 和 `scripted_effects` 的工作方式非常相似，但内联脚本可以用于模块化或不是 Effect 或 Condition 的东西（例如，请参阅香草的策展人对话框）。

官方文档参见 `Stellaris/common/inline_scripts/00_README.txt` 。

## 如何使用

想要创建一个新的内联代码块，需要在 `common/inline_scripts` 文件夹中创建一个 `txt` 文件，其中包含要内联到其他脚本中的代码。请注意，每个文件只能有一个内联代码块，并且在使用该内联代码块时将使用文件名。我们可以通过将内联脚本放在子文件夹中来组织它们。

我们先来看一个示例：

```pdx
# 文件路径：common/inline_scripts/my_test_folder/test_inline_script.txt
resources = {
    category = edicts
    upkeep = {
        unity = 10
        multiplier = value:edict_size_effect
    }
}
```

随后我们可以使用 `inline_script = <file_name_without_extension>` 来调用这个内联代码。例如：

```pdx
modifier = {
    starbase_upgrade_speed_mult = 0.50
    country_starbase_capacity_add = 2
}
inline_script = "my_test_folder/test_inline_script"
```

这相当于如下代码：

```pdx
modifier = {
    starbase_upgrade_speed_mult = 0.50
    country_starbase_capacity_add = 2
}
resources = {
    category = edicts
    upkeep = {
        unity = 10
        multiplier = value:edict_size_effect
    }
}
```

## 参数传递

参数同样可以用于调控内联代码，例如：

```pdx
# 文件路径：common/inline_scripts/test_basic_policy
$KEY$ = {
    option = {
        name = "$KEY$_a"
        on_enabled = {
            add_modifier = { modifier = $MODIFIER_A$ days = 360 }
        }
    }
    option = {
        name = "$KEY$_b"
        on_enabled = {
            add_modifier = { modifier = $MODIFIER_B$ days = 360 }
        }
    }
}
```

然后我们可以这么使用：

```pdx
inline_script = {
    script = test_basic_policy
    KEY = test_1
    MODIFIER_A = evermore_science
    MODIFIER_B = fumongus_authoritarian
}
```

等效于如下代码：

```pdx
test_1 = {
    option = {
        name = "test_1_a"
        on_enabled = {
            add_modifier = { modifier = evermore_science days = 360 }
        }
    }
    option = {
        name = "test_1_b"
        on_enabled = {
            add_modifier = { modifier = fumongus_authoritarian days = 360 }
        }
    }
}
```

同时，内联代码的参数可以接受字符串，也就是说我们可以通过字符串传递代码给内联代码块，例如：

定义：

```pdx
# 文件路径：common/inline_scripts/just_an_example
resources = {
    category = edicts
    upkeep = {
        unity = 10
        multiplier = value:edict_size_effect
    }
}
modifier = { $MODIFIER$ }
```

使用：

```pdx
inline_script = {
    script = just_an_example
    MODIFIER = "num_tech_alternatives_add = 1 scientist_skill_levels = 2"   # 就像这样
}
```

等效于：

```pdx
resources = {
    category = edicts
    upkeep = {
        unity = 10
        multiplier = value:edict_size_effect
    }
}
modifier = {
    num_tech_alternatives_add = 1
    scientist_skill_levels = 2
}
```

:::note[提示]

对 `inline_scripts` 的支持并没有在任何地方添加，所以如果您收到一个错误，例如"inline_script is an unexpected token"或者"inline_script is encountered before init"，那么很可能您无法在那里使用 `inline_scripts` 。您也不能在一个列表中使用内联脚本，例如 `examples = { abc test2 test3 object }` 。

:::
