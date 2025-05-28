---
title: 游戏的MOD读取机制
---

几个重要文件路径：
1.游戏根目录，即 steam库\steamapps\common\Stellaris
    这个目录从steam右键stellaris的选项-管理-浏览本地文件可跳转。
    存放游戏本体程序，不包括存档。

2.群星文档文件夹目录，即 文档\Paradox Interactive\Stellaris
    这个目录从侧边栏的文档一路打开文件夹可跳转。
    存放存档，本地mod，远程mod概述文件(一般是文档\Paradox Interactive\Stellaris\mod目录下所有后缀为.mod的文件)，启动器播放集数据库。

3.群星创意工坊文件夹目录，即 steam\steamapps\workshop\content\281990
    这个目录从游戏根目录往上两级，然后一路打开文件夹可跳转。
    存放从steam创意工坊订阅的mod。

关于mod概述文件：
    分为远程mod概述文件与mod内概述文件。mod内概述文件为特定mod的目录下(本地\创意工坊)固定命名为descriptor.mod的文件。远程mod概述文件上文已表述。
    远程mod概述文件内必定包含一行指向对应mod的mod内概述文件的所在目录，或以压缩包方式保存的mod路径的语句。

游戏对mod的读取：
由游戏根目录下stellaris.exe读取群星文档文件夹目录下的dlc_load.json。
dlc_load.json的内容包含dlc与mod的启用/禁用，dlc为黑名单机制，mod为白名单机制，以远程mod概述文件的相对路径作为白名单的判定，例如:
{"enabled_mods":["mod/example.mod","mod/ugc_1481972266.mod"],"disabled_dlcs":[]}
例子中ugc_1481972266.mod为工坊mod自动命名的格式，example.mod则是本地mod。