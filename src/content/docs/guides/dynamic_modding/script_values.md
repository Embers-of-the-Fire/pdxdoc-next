---
title: 脚本变量(Script Values)
---

:::warning[性能]

请注意，脚本变量的检测十分频繁，如果内置过多的数值计算或判断，会导致严重的卡顿现象！只有当你无法通过其他方法实现你的功能时才考虑使用本功能！

:::

脚本变量提供了动态获取数值的能力，例如[函数化条件判断(Scripted Triggers)](dynamic_modding/scripted_triggers.md)的 `ai_weight` 版本，并具有动态高级脚本数学计算的功能。

使这些脚本变量功能丰富且强大的核心是它们能够用一个键代表一个值，而这个值的运算规则是可以**自定义**的。（当然这也是一些卡顿发生的来源之一）

官方文档参见 `Stellaris/common/script_values/00_script_values.txt` 。

## 如何使用

想要使用脚本变量，你需要先在 `common/script_values` 文件夹中创建一个文件，如下是一个范例：

```pdx
example_value = {
    base = 10   # 默认为0
    add = 100
    multiply = value:some_other_script_value    # 调用另一个脚本变量
    round = yes
    # 它们也可以用于 `modifier = { ... }` 字段，这使您只能在对应的condition为 `yes` 时应用它们
    modifier = {
        # 注意： `weight` 和 `factor` 将覆盖基值 - 使用 `set` 、 `mult` 或 `multiply`
        max = owner.max_example_variable                     # 使用 `set_variable` 设置的变量
        owner = { is_variable_set = max_example_variable }    # 只有这个trigger为 `yes` 时才会生效上述 `max` 的设置
    }
    complex_trigger_modifier = {     # 这使您可以获得一个无法在一行内完成的trigger的值，通过使用` {}` 块
        trigger = count_owned_planet
        trigger_scope = owner         # 用于获取不同作用域上trigger的结果。默认值为 `this`
        parameters = {                 # 将任何必要的进一步信息在此处书写，就像您通常在trigger的语句块中所做的那样
            limit = { num_pops > 10 }
        }
        mode = add                     # 允许所有数值运算
        mult = 5                     # 将结果乘以这个数值。在这个例子中，这意味着每颗人口超过10的行星该值增加5
    }
}
```

### 有效的数值运算

#### 数字式（通过数字修改）<!-- {docsify-ignore} -->

| 语句名称                       | 效果                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| `set` / `weight`               | 使用该值**覆盖**当前运算结果。二者效果相同。                                               |
| `add`                          | 加上一个数值。                                                                             |
| `subtract`                     | 减去一个数值。                                                                             |
| `factor` / `mult` / `multiply` | 乘上一个数值。 `multiply` 是最符合当下驴的命名特色的运算，而另外两个仍然因为历史原因继续保留 |
| `divide`                       | 除去一个数值                                                                               |
| `round_to`                     | 四舍五入到最近的该值的倍数。例如 10.7 `round_to` 5 将会得到 10                             |
| `max`                          | 如果当前数值超过这个数值，那么取这个数值                                                   |
| `min`                          | 如果当前数值低于这个数值，那么取这个数值                                                   |
| `pow`                          | 乘方。**使用时注意，数值过大可能导致溢出**                                                 |

#### 简单处理（不需要数值，只需要 `yes` ）<!-- {docsify-ignore} -->

| 语句名称      | 效果                 |
| ------------- | -------------------- |
| `round`       | 四舍五入到最近的整数 |
| `ceiling`     | 向上取整             |
| `floor`       | 向下取整             |
| `abs`         | 取绝对值             |
| `square`      | 取平方               |
| `square_root` | 取正平方根           |

注意：除 `weight` 和 `factor` 外的所有数学运算都可以内联使用

对于适用于数学运算的右值，参见 `Stellaris/events/00_how_to_use_variables_in_script.txt` 。

## 参数传递

`script_values` 使用与 `scripted_triggers` 和 `scripted_effects` 相同的元系统。这意味着我们可以按照 `scripted_effects/99_advanced_documentation.txt` 中描述的方式或参考[函数化效果](dynamic_modding/scripted_effect.md)和[函数化条件判断](dynamic_modding/scripted_triggers.md)中提到的一样，以向其中输入参数。

但是，与上述两个功能不同的是，在调用 `scripted_values` 时，我们不需要使用` {}` 块，而使用另一种语法来调用，例如这样：

```pdx
value:my_script_value|PARAM1|value1|PARAM2|value2|
```

然后，我们可以在脚本变量中使用` $PARAM1$` 和` $PARAM2` 作为入参，运行时二者会分别被 `value1` 和 `value2` 替代。
