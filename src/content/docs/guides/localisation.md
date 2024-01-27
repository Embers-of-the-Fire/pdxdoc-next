---
title: 本地化(localisation)
---

## 什么是本地化

本地化（Localisation/Localization）与翻译（Translation）相比，除了要完成基本的翻译以外，还要使翻译后的词语/语句符合当地的语言习惯。不过对于模组作者来说，如果不考虑发布多语言的 Mod，则可以不考虑翻译的问题。

在群星游戏中，本地化是用于将代码中的一些`Key`转换为对应语言的文件。

## 认识本地化文件

对于任意的本地化文件，它必须满足以下几个条件：

- 文件名以 `l_<语言>.yml` 结尾，对于简体中文，则是 `l_simp_chinese.yml`，文件名的前缀不限，可以是任意，当有前缀时，文件名应以 `_l_<语言>.yml` 结尾，如 `my_localisation_l_simp_chinese.yml`
- 文件的开头为 `l_<语言>:`，对于简体中文，则是 `l_simp_chinese:`
- 文件的编码格式为 `UTF8 With BOM`
- 文件存放于 `localisation/<语言>` 目录下，对于简体中文，则是 `localisation/simp_chinese`

> 由于本教程面向中文 Modder，因此以下均以**简体中文**语言为例。

我们打开一个原版的本地化文件 `localisation/simp_chinese/technology_l_simp_chinese.yml`，这个文件包含了原版部分科技的本地化：

```yaml
l_simp_chinese:
    ####################################
    #Categories
    ####################################
    materials: "材料科学"
    materials_desc: "创造并处理材料，以提高其实用性和耐用性。"
    propulsion: "推进力学"
    propulsion_desc: "一项关于推进技术和弹道技术的研究"
    voidcraft: "宇航技术"
    voidcraft_desc: "太空是终极边界，掌握它就掌握了未来。"
    robotics: "机器人学"
    robotics_desc: "全方位机械化"
    industry: "工业技术"
    industry_desc: "创造与生产。"
    field_manipulation: "力场操控"
    field_manipulation_desc: "迫使基本力遵从我们的意志。"
```

对于每一个本地化文件，其开头必须为 `l_simp_chinese:`，本地化的格式如下：

```yaml
<需要本地化的项目>: "本地化文本"
# 这个符号后紧跟着的是注释
```

一般将 `<需要本地化的项目>` 称为**键**（`Key`）。

> 你可能会在原版的本地化文件中看到类似于如下的本地化：
>
> ```yaml
> DLC_MEGACORP:0 "寰宇企业"
> ```
>
> 这个条目在 `:` 后多了一个数字 `0`，该数字对本地化无影响，推测是 P 社用于标记该条目被修改次数用的，在 3.9 版本更新后，几乎所有的 `:0` 均被修改为了 `:`。

## 一些注意事项

- `\t` 用于表示四个空格的缩进
- `\n` 用于表示换行
- 如果你需要在本地化中书写英文双引号 `"`，则需要使用 `\"` 替代
- 我们强烈建议将你的本地化文件命名为 `<你的Mod名称或缩写>_l_simp_chinese.yml` 以得到更清晰的文件结构

## 本地化文件的覆盖

通常来说，拥有相同名称的本地化文件会互相覆盖，靠后读取的文件将会覆盖靠前读取的文件，但**完全不推荐**使用此种方式去覆盖/重写原版的本地化。

推荐的做法为：在 `localisation` 文件夹中新建 `replace` 文件夹，并在其中放置本地化文件，这些文件仅包含被覆盖的条目。

例如，将飞升天赋**合成进化**更改为**机械飞升**：在 `localisation/replace` 文件夹下新建 `my_replace_l_simp_chinese.yml`，在其中输入以下内容

```yaml
l_simp_chinese:
    ap_synthetic_evolution: "机械飞升"
```

> **注意：**尽管你可以不用通过新建 `replace` 文件夹并在其中放置本地化的方式来覆盖单个条目，但此种覆盖方式是**不稳定**的。

## 彩色字体

在游戏中时常能见到带有颜色的本地化文本，这些文本是用过**颜色代码**来修改颜色的，具体而言，颜色代码的格式为 `§<颜色代码>本地化文本§!`。

> `§` 可在 Windows 上使用键盘快捷键 <kbd>Alt</kbd> + 小键盘 `0167` 打出来。

| 代码 |                       颜色                     |                                  原版用法                                   |
| :--: | :----------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
|  M   |   <font style="color:#A335EE;background-color:#000000">品红</font>   |                              用于表示稀有科技                               |
|  L   |   <font style="color:#C3B091;background-color:#000000">褐色</font>   |                                背景/描述文本                                |
|  G   |   <font style="color:#29E126;background-color:#000000">绿色</font>   |                             用于正面修正的数字                              |
|  R   |   <font style="color:#FC5646;background-color:#000000">红色</font>   |                          用于负面修正的数字或警告                           |
|  B   |   <font style="color:#33A7FF;background-color:#000000">蓝色</font>   |                              用于部分特殊文本                               |
|  Y   |   <font style="color:#F7FC34;background-color:#000000">黄色</font>   |                         文本高亮或是次优/中性的文本                         |
|  H   |   <font style="color:#FBAA29;background-color:#000000">橘色</font>   |                                  文本高亮                                   |
|  C   |   <font style="color:#1FE0CA;background-color:#000000">青色</font>   |                          用于概念文本（Concepts）                           |
|  K   |   <font style="color:#FBAA29;background-color:#000000">橘色</font>   |                    概念（Concepts）的标题，目前与`H`相同                    |
|  I   |   <font style="color:#F7FC34;background-color:#000000">黄色</font>   |                  概念（Concepts）文本的高亮，目前与`Y`相同                  |
|  T   |   <font style="color:#FFFFFF;background-color:#000000">白色</font>   |                               文本的默认颜色                                |
|  E   | <font style="color:#87FFCF;background-color:#000000">标准绿色</font> | 用于大片的文本，例如事件或协助者 **（别问为什么是标准绿色，蠢驴这么写的）** |
|  S   |   <font style="color:#E49C2A;background-color:#000000">橙色</font>   |                     副标题高亮（比上面的橘色稍微深点）                      |
|  W   |   <font style="color:#FFFFFF;background-color:#000000">白色</font>   |                     **（别问为什么是空的，蠢驴没写）**                      |
|  P   |   <font style="color:#E16E6E;background-color:#000000">粉色</font>   |                      在副标题警告中使用此代码，而非`R`                      |
|  V   |   <font style="color:#4C8A71;background-color:#000000">暗绿</font>   |                                用于事件文本                                 |
|  g   |   <font style="color:#808080;background-color:#000000">灰色</font>   |                     **（别问为什么是空的，蠢驴没写）**                      |
|  \_  |   <font style="color:#FF00FF;background-color:#000000">紫色</font>   |                                   占位符                                    |
|  c   |   <font style="color:#3CD092;background-color:#000000">颜色</font>   |                            领袖特质稀有度：普通                             |
|  v   |   <font style="color:#8BAEA2;background-color:#000000">颜色</font>   |                            领袖特质稀有度：老练                             |
|  d   |   <font style="color:#FFDD7A;background-color:#000000">颜色</font>   |                            领袖特质稀有度：命定                             |
|  r   |   <font style="color:#A382FF;background-color:#000000">颜色</font>   |                                  著名英杰                                   |
|  l   |   <font style="color:#B2EC68;background-color:#000000">颜色</font>   |                                  传奇英杰                                   |
|  !   |                                                                          |           返回上一次颜色改变前的颜色，一般作为颜色代码的结束标记            |

> **注意：**
>
> - 文档中所展示颜色的背景色是为了显示清楚颜色，颜色代码并不会改变文本的背景色。
>
> - 由于文档与游戏对文字的渲染方式不同，颜色的显示可能略有偏差，具体颜色均以游戏内显示效果为准
> - 由于本文档并非实时更新，展示的颜色代码可能过时，具体的颜色代码可参阅`interface/fonts.gfx`

另外，颜色代码是**可嵌套**的，这意味着你可以写出类似这样的文本：`§RR§Sa§Hi§Yn§Gb§Bo§Mw§!`，在游戏内将会被显示为：<font style="background-color:#000"><font style="color:#FC5646">R</font><font style="color:#E49C2A">a</font><font style="color:#FBAA29">i</font><font style="color:#F7FC34">n</font><font style="color:#29E126">b</font><font style="color:#33A7FF">o</font><font style="color:#A335EE">w</font></font>。

## 本地化的高级用法

### 引用其他本地化条目

使用 `$本地化键$` 可以引用其他的本地化条目，此方法可以增强复用性，减少多处使用同个文本导致的重复和修改时可能出现的遗漏等。

以泰坦的光环部件为例：

```yaml
AURA_NANOBOT_CLOUD: "纳米机器云"
SHIP_AURA_NANOBOT_CLOUD: "$AURA_NANOBOT_CLOUD$"
```

在游戏中，本地化键为 `SHIP_AURA_NANOBOT_CLOUD` 的地方均会显示为 `纳米机器云`。

除此之外，`$` 还可引用定义于 `scripted_variables` 中的常量值。假设我们在 `common/scripted_variables` 中定义了常量 `@my_variable = 100`，则可在本地化中使用 `$@my_variable$` 来显示这个常量的值。

### 数字格式化

当我们在本地化中引用数字时，有时我们希望对数字进行格式化处理，例如控制显示的小数位。

> 以下示例中，`VALUE`的值为`100`。

|        语法         |                            说明                             |      样例      |                                效果                                |
| :-----------------: | :---------------------------------------------------------: | :------------: | :----------------------------------------------------------------: |
|   `$VALUE\|*n$`    |                 将 `VALUE` 显示 `n` 位小数                  | `$VALUE\|*1$` |                               100.0                                |
|    `$VALUE\|%n$`    |          将 `VALUE` 显示为百分数，保留 `n` 位小数           | `$VALUE\|%1$`  |                              10000.0%                              |
|    `$VALUE\|=$`     |       显示 `VALUE` 的符号，即正数显示`+`，负数显示`-`       |  `$VALUE\|=$`  |                              +100.00                               |
|    `$VALUE\|+$`     | 当 `VALUE` 的值为正数时将字体颜色改为绿色，为负数时改为红色 |  `$VALUE\|+$`  | <font style="color:#29E126;background-color:#000000">100.00</font> |
|    `$VALUE\|-$`     | 当 `VALUE` 的值为正数时将字体颜色改为红色，为负数时改为绿色 |  `$VALUE\|-$`  | <font style="color:#FC5646;background-color:#000000">100.00</font> |
| `$VALUE\|颜色代码$` |            将 `VALUE` 的字体颜色修改为指定的颜色            |  `$VALUE\|Y$`  | <font style="color:#F7FC34;background-color:#000000">100.00</font> |

以上的几种格式化方法可以混合使用，且顺序是无关紧要的，例如：`$VALUE|0=-%$`，当 `VALUE` 为 `1` 时，显示为<font style="color:#29E126;background-color:#000000">+100%</font>，当 `VALUE` 为 `-1` 时，显示为<font style="color:#FC5646;background-color:#000000">-100%</font>，当不指定小数位数时，默认显示 2 位小数。

数字格式化方法仅对引用的 `scripted_variable` 和 `custom_tooltip_with_params` 的参数有效，此外，数字格式化有时会莫名抽风，即使格式完全正确也无法在游戏内显示，目前没有好的解决方法。

### 显示图标

在本地化中允许显示图标，其语法格式为 `£图标ID£`。

> `£` 可在 Windows 上使用键盘快捷键 <kbd>Alt</kbd> + 小键盘 `0163` 打出来。

可引用的 `图标ID` 一般分为两种，一种是需要在 `interface` 中进行注册的，另一种是无需注册可直接使用的，例如职业图标、修正图标和资源图标。

对于可直接使用的图标，一般 `图标ID` 即为对应内容的名字，例如 `£job_researcher£` 为研究员职业的图标，`£alloy£` 为合金的图标。

对于需要注册的图标，原版游戏中已经注册了许多可用的图标，可在 `interface` 文件夹中搜索 `GFX_text_` 来查找所有可用图标，注意，这类图标的具体用法请查看下方内容。

#### 注册图标

> 强烈建议在学习了**GUI 与视觉效果**后再来阅读本节内容。

注册图标的格式如下：

```pdx
spriteTypes = {
    spriteType = {
        name = "GFX_text_my_icon"
        texturefile = "你的图标路径"
    }
}
```

在本地化中使用 `£my_icon£` 来引用这个图标，注意，注册图标时 `name` 中的 `GFX_text_` 是必要的，而引用时则无需添加。

### 支架命令/方括号命令

支架命令/方括号命令（下文均称为支架命令）是一种高级用法，它允许文本动态地从游戏中读取某些对象的名字，例如国家名称、领袖名称、星球名称，或是某些对象的复数形式、形容词形式，或是物种的各类器官名称、羞辱词等，或用于提取人称代词，例如男性领袖和女性领袖的他/她。

> **注意：**这部分内容包含进阶知识与技巧，强烈建议在学习完**Event Modding 进阶**中的内容后再来阅读本节内容。

支架命令可分为硬代码规定的命令和可自定义的 `scripted_loc`。

支架命令的一般格式为 `[域.命令]`，其中`域`可省略，省略时默认为 `this`（即这条文本被使用时所在的域，如在事件的描述中使用，那么支架命令的 `this` 就与该事件的 `this` 相同）。

支架命令中可使用域就意味着它可以像在 `event` 中一样，通过**转域**来实现一些较为复杂的功能，例如，在 `this` 为 `Country` 的地方使用 `[Capital.GetName]` 即可获取该国家首都星球的名称。

如果需要在文本中书写方括号 `[`，则需要使用 `[[` 来替代，例如：`[[example]` 将会显示为 `[example]`。

需要注意的是并非所有的文本都可以使用支架命令来动态显示文本，在不支持的地方使用支架命令时，即便不使用 `[[` 转义，文本中也会直接将方括号原原本本地显示出来。

#### 硬编码命令

由于原版硬代码规定的命令数量庞大，以下仅列出了少部分非常常用的命令：

|    命令    |                 可用域                  |              说明               |        样例         |
| :--------: | :-------------------------------------: | :-----------------------------: | :-----------------: |
| `GetName`  |                  任意                   |         获取对象的名称          |  `[Root.GetName]`   |
|  `GetAdj`  | `Species`、`Planet`、`Country`、`Fleet` |      获取对象的形容词形式       |   `[Root.GetAdj]`   |
|  `GetAge`  |                `Leader`                 |         获取对象的年龄          |  `[Leader.GetAge]`  |
| `GetHeShe` |                `Leader`                 | 获取对象的第三人称代词（他/她） | `[Leader.GetHeShe]` |
|    ...     |                   ...                   |               ...               |         ...         |

更多可用的命令可参阅 `文档/Paradox Interactive/Stellaris/logs/script_documentation/localizations.log`，其中 `Promotion` 指在该域下可转到的域，`Properties` 指在该域下所有可用的硬编码支架命令。

#### 脚本本地化（scripted_loc）

参阅 [Script Loc](../dynamic_modding/scripted_localization) 章节。

## 实用命令

以下列出了一些实用的控制台命令，以帮助各位 Modder 在开发中更方便地调试自己的本地化。

- `reload text`：重新加载所有本地化文件（本地化文件较多时会卡顿）
- `switchlanguage <语言>`：切换为对应语言，如`switchlanguage l_english`
- `toggle_string_id`：显示本地化键而不是本地化
