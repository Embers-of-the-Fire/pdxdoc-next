---
title: 游戏的MOD读取机制
---

## 游戏mod的读取

&emsp;&emsp;群星一般情况下由游戏根目录下 stellaris.exe 读取群星文档文件夹目录下的 dlc_load.json 。
dlc_load.json 的内容包含 dlc 与 mod 的启用/禁用， dlc 为黑名单机制， mod 为白名单机制，以**远程mod概述文件**的相对路径作为白名单的判定，例如以下的某次启动游戏时 dlc_load.json 里的内容:

```json
{"enabled_mods":["mod/example.mod","mod/ugc_1481972266.mod"],"disabled_dlcs":[]}
```

例子中 ugc_1481972266.mod 为 steam 创意工坊下载的 mod 自动命名的格式， example.mod 则是本地mod，文件名同启动器创建新mod时所输入的文本。

## 几个重要文件路径

1.群星游戏根目录，即 steam库\steamapps\common\Stellaris
&emsp;&emsp;这个目录从 steam 游戏库内右键 stellaris 的选项-管理-浏览本地文件可直接跳转。
&emsp;&emsp;存放游戏本体程序，不包括存档。

2.群星文档文件夹目录，即 文档\Paradox Interactive\Stellaris
&emsp;&emsp;这个目录从侧边栏的文档一路打开文件夹可跳转。
&emsp;&emsp;存放存档，本地mod，**远程mod概述文件**(一般是文档\Paradox Interactive\Stellaris\mod目录下所有后缀为.mod的文件)，启动器播放集数据库。

3.群星创意工坊文件夹目录，即 steam库\steamapps\workshop\content\281990
&emsp;&emsp;这个目录从游戏根目录往上两级，然后一路打开文件夹可跳转。
&emsp;&emsp;存放从steam创意工坊订阅的mod。

## mod概述文件的概念

&emsp;&emsp;分为**远程mod概述文件**与**mod内概述文件**。**mod内概述文件**为特定mod的目录下(本地\创意工坊)固定命名为descriptor.mod的文件。**远程mod概述文件**上文已表述。
&emsp;&emsp;**远程mod概述文件**内必定包含一行指向对应 mod 的**mod内概述文件**的所在目录，或以压缩包方式保存的mod路径（群星版本<2.4）的语句。
