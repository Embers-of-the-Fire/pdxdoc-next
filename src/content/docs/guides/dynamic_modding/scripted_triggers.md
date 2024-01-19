---
title: 函数化条件判断(Scripted Triggers)
---

## 什么是 "Conditions"

在正式开始之前，我们先来看一看在群星的 modding 中频繁出现的一个概念："Conditions"，中文意为“先决条件“。

引用 Stellaris - Paradox Wiki 的话，"Conditions are statements to be evaluated for a yes or no."，即"Conditions"是可以被求值为 `yes` 或 `no` 的一个语句。也就是说，任何一个 Condition，其都可以被表示为一个布尔值的结果。

那么，正如绪论所说，既然他是一个语句，就大概率存在一个与之适配的函数化的语言工具，这就是 `scripted_triggers` 。

## 如何使用

`scripted_triggers` 是一个对于一系列Condition语句的函数化功能，可以作为Condition的替代品。在群星中，它的定义位于 `common/scripted_triggers/your-scripted-trigger.txt` 。

就像 `scripted_effects` 一样，一个 `scripted_trigger` 同样由一系列**支持递归**的子Condition组成，如下是一个简单的示例：

```pdx
example_scripted_trigger = {
    has_ethic = ethic_materialist
    has_ethic = ethic_fanatic_materialist
}
```

同其他预设Condition一样，一个最简单的、没有任何参数的scripted trigger可以这么调用：

```pdx
# 在判断环境下
example_scripted_trigger = yes  # or no.
```

## 传递参数

Scripted trigger同样支持传递参数，使用方法与scripted effect一样：

```pdx
# 定义
example_scripted_trigger = {
    has_ethic = ethic_$ETHIC$
    has_ethic = ethic_fanatic_$ETHIC$
}
```

并用如下方式调用

```pdx
# 使用
example_scripted_trigger = { ETHIC = materialist }
```

请注意，这个时候我们没有办法直接像 `trigger = no` 的形式调用，但是我们可以用 `NOT = { trigger = yes }` 间接实现。
