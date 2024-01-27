---
title: 函数化本地化(Scripted Localization)
---

Scripted localization 的定义位于 `common/scripted_loc/your-scripted-localization.txt` 。

## 如何使用

我们可以这么定义一个 Scripted localization：

```pdx
defined_text = {
    name = GetAuthorityName
    text = {
        trigger = { has_authority = auth_democratic }
        localization_key = auth_democratic
    }
    text = {
        trigger = { has_authority = auth_oligarchic }
        localization_key = auth_oligarchic
    }
}
```

然后在你的本地化中为上文定义的 `localization_key` 设置本地化：

```yaml
auth_democratic:0 "Auth Democratic"
auth_oligarchic:0 "Auth Oligarchic"
```

随后，在你需要使用这个定义的时候，使用 `[<scope>.GetAuthorityName]` 来调用，例如，对于一个具有 `auth_democratic` 的国家来说：

```yaml
your_key:0 "Auth: [this.GetAuthorityName]"
```

将会变成：

```text
Auth: Auth Democratic
```

:::note[提示]

虽然此处 `scripted_loc` 使用的是 Country 域，但 `scripted_loc` 本身可以是任何域，只要调用时使用的 `<scope>` 可以让 `text` 中的 `trigger` 运行即可。

:::
