---
title: 战争借口(Casus Belli)
---

原版文件在 `Stellaris\common\casus_belli` 里面，下面举一个例子：

```pdx
my_casus_belli = {          # 借口的ID，一般不限定特殊格式
    # 是否可见，满足下列条件时可见，范围默认为“国家（country）”
    # 该国家为拥有这个借口的进攻者，不填写默认为不需要条件即可满足
    # 常用语句：
    #   1.is_country_type = <country_type.name>这语句决定什么国家类型下可见
    #   2.has_valid_civic=<civic.name>这语句决定拥有什么样可用的国策下可见
    #   3.has_technology = <technology.name>这语句决定拥有什么科技下可见
    potential = { ... }

    # 是否可用，在可见的基础上，再次判定是否可用（游戏里面表现为是否是灰色）
    # 默认的范围是“国家（country）”，为拥有这个借口所有者“from”的范围为防方。
    # 常用语句：
    #   1.has_total_war_cb = no/yes，这个语句决定他是不是全面战争借口
    #   2.has_policy_flag=<policy_flag.name>，这个语句决定在什么政策下可用
    # 不填写默认为不需要条件即可满足
    is_valid = { ... }

    # 满足下列条件则摧毁它，原版貌似没见过，其用途待补充，范围与“is_valid”相同
    destroy_if = { ... }

    show_in_diplomacy = no/yes  # 是否在外交界面显示？满足的话可用看见“xxx对yyy有zzz的宣战借口”，默认是
    show_notification = no/yes  # 是否在这个借口可用情况发生改变（从可用变成不可，反之亦然）时，默认是
}
```

本条目需要本地化：本条目与本条目的desc。
