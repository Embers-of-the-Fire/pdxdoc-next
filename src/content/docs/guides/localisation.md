---
title: 本地化(localisation)
---

## 认识本地化文件的组成

以原版的 `simp_chinese` 文件夹之中的 `l_simp_chinese.yml` 为例，一个标准的本地化文件的名称应该是：` [项目名称]_l_[语言代码].yml` ，同样的，相同名字的本地化文件会在 mod 加载后被 mod 覆盖。任何的本地化文件编码格式都应该是 `UTF-8-BOM` ，任何不是这样编码的文件都无法被保证能否正常被游戏读取。当打开 `l_simp_chinese.yml` 之后，你应该会看见如下的内容：

```yaml
l_simp_chinese: # 这是相应本地化文件的必要开头，如果是英文版就是“l_english:”其他语言也都差不多
    ...
    # 大多数的本地化项目的格式应该为 [需要本地化的项目]:0 "[相对应的内容]"
    # 注意，能被正确引用的都是英文状态下的双引号
    # `§[色彩代码]` 是指从这里开始转化颜色
    # `§!` 是上一个颜色转换的结束符号。一般而言，一个` §[色彩代码]` 要搭配一个` §!`
    RELATIVE_POWER:0 "相对实力"
    RELATIVE_POWER_1:0 "§G不值一提§!"
    RELATIVE_POWER_1_DESC:0 "他们远比我们弱得多。我们随时都可以干掉他们。"
    RELATIVE_POWER_2:0 "§G略逊一筹§!"
    RELATIVE_POWER_2_DESC:0 "他们比我们弱，不需要太过在意。"
    RELATIVE_POWER_3:0 "§Y难分伯仲§!"
    RELATIVE_POWER_3_DESC:0 "他们的实力与我们不分伯仲。"
    RELATIVE_POWER_4:0 "§H更胜一筹§!"
    RELATIVE_POWER_4_DESC:0 "他们比我们厉害。我们可能需要寻找盟友才能抵消双方之间的差距。"
    RELATIVE_POWER_5:0 "§R无与伦比§!"
    RELATIVE_POWER_5_DESC:0 "他们远比我们强大。除非我方有强力的盟友，否则请避免与对方发生冲突。"
```

> \[色彩代码\] <font style="background-color:#FFFFFF"><font style="color:#0000FF">B 蓝</font>&emsp;<font style="color:#33CCCC">E 青</font>&emsp;<font style="color:#008000">G 绿</font>&emsp;<font style="color:#FF9900">H 橙</font>&emsp;<font style="color:#333300">L 棕</font>&emsp;<font style="color:#800080">M 紫</font>&emsp;<font style="color:#FF00FF">P 亮红</font>&emsp;<font style="color:#FF0000">R 红</font>&emsp;<font style="color:#9E3F00">S 深橙</font>&emsp;<font style="color:#808080">T 灰</font></font>&emsp;<font style="background-color:#606060"><font style="color:#FFFFFF">W 白</font>&emsp;<font style="color:#FFFF00">Y 黄</font></font>（底色是为了看清楚显示色，底色非实际显示效果）

上面是大家都很熟悉的实力对比，相信这样应该能对色彩代码有一个初步的了解。

下面我们打开 `megacorp_l_simp_chinese.yml` ：

```yaml
l_simp_chinese:
    ...
    # `$` 中间的代码是引用已经本地化的内容，像这里的` $job_researcher_plural$` 就是会显示“研究人员”
    # 注意:一定要确认引用内容的准确性，每一个字母都不能错，不然就会显示空格
    # `£` 中间的代码是引用图表，例如` £consumer_goods£` 就会显示消耗品图标
    job_researcher_effect_desc:1 "£job_researcher£ $job_researcher_plural$将£consumer_goods£ §Y$consumer_goods$§!转化为£physics£·£society£·£engineering£ §Y研究点数§!"
    mod_job_researcher_add:0 "$job_researcher$岗位"
    mod_job_researcher_per_pop:0 "每$VALUE$个人口提供§G+1§!个$job_researcher$岗位"
    mod_job_researcher_per_pop_short:0 "\n每$VALUE$ £pop£ §G+1§! £mod_job_researcher_add£ "
    ...
    # `\n` 就是换行符，相当于按下回车
    d_neutronium_deposit:0 "发现零素矿\n £minerals£ +5\n"
```
