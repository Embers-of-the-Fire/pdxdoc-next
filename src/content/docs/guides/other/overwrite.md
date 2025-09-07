---
title: 代码覆盖规则
---

注意，本篇所讨论的内容都会对游戏本体及其他 mod 造成严重影响，请确保你已经能够完成基础的 common 和 event 文件编写，再尝试对代码进行覆盖。

Mod 是必须建立在游戏本体的基础上才能运行的，我们编写的代码如何生效，为什么会生效，这些都由游戏本体进行了规定和解释。但是，当你不断尝试完成新的内容时，你会发现，原版是有极限的。为此，你必须超越原版，必须修改原版的文件。所以，了解并掌握代码的覆盖规则，将会帮助你更好的建立新的秩序，并且与大多数 mod 兼容。

## 基础知识

在正式学习覆盖规则之前，我们首先需要了解群星是如何载入 mod 文件的。

mod 文件的载入顺序与文件名的 Unicode 编码排列顺序有关，你可以形象地理解为，在载入 mod 时，群星会将所有的 mod 文件与游戏本体的文件排成一个队列，Unicode 编码靠前的文件会优先读取（此时，mod 文件甚至会优先于原版文件读取），如` 00_buildings.txt` 将优先于` 09_buildings.txt` 读取， `ABCD_jobs.txt` 将优先于 `ZBCD_jobs.txt` 读取。Unicode 编码的顺序你可以通过百度查询的方式获得，当然你也可以记住一个简单的规则，数字优先于字母，大写字母优先于小写字母。如果存在两个 Unicode 编码完全相同的文件，那么 mod 的排列顺序将变得至关重要。启动器中，排序在下方，即优先度低的 mod 的同名文件，将覆盖排序在上方的同名文件。

## 排序规则

类似于图片扩展、加载背景扩展、文本扩展、音乐扩展等 mod，通常情况下不需要考虑排序问题，只有那些存在依赖关系，或者修改了原版文件的 mod 之间才必须进行排序。

一般，Modder 们会告诉你他们的 mod 依赖的前置以及排序的位置（虽然大多数 modder 都会说，排在后面），如果某个 mod 存在前置 mod 依赖，那么请务必把前置 mod 放在上面，否则可能会导致游戏内 bug，甚至会导致游戏崩溃。对于大型种族 mod 来说，通常情况下并没有十全十美的排序方式，除非这些大型种族 mod 之间存在兼容，否则必然会失去一部分 mod 的内容（经典案例：看不到某个 mod 的资源）。因此，你现在最想要玩哪个种族 mod，就把该 mod 排序在下方。

在遵从上述规则的情况下，我们给出一个简单的 mod 排序规则（从上到下）：

1. UI 类、原版支持和扩展类（UI 大修、伞的优化等）
2. 美化类（萌化星河、更多舰船模型、物种图片扩展、更多星球等）
3. 修改内容单一、独立性较好的 mod（如 more events mod、整活传统、远古故事集等）
4. 大型物种 mod（战舰少女 R、少女前线、碧蓝航线等）

PS：这部分 mod 会互相覆盖一部分内容，如 mod 资源，想玩谁就把谁放下面

5. 大型物种 mod 之间的兼容补丁
6. 大型功能扩展类、原版重构类（产业革命等）
7. 第六类与其他 mod 的兼容补丁
8. 汉化类、文本类、加载背景扩展类、音乐类

其实 2、3、8 并没有严格的排序要求，但是为了整洁和美观，请使用这种格式来排序。

## 覆盖规则

不同文件夹下的内容遵从不同的覆盖规则，其主要有以下几点：

1. key 覆盖（关键词覆盖） \
   顾名思义，就是命名覆盖。拥有相同命名的代码，后读入的会覆盖先读入的，与 mod 排列顺序无关，仅与 mod 文件名称的 Unicode 编码排列顺序有关（如果存在同名文件，排序靠后的 mod 会覆盖掉排序靠前的 mod），大多数代码也都是这种覆盖规则。通常情况下，这部分覆盖规则会导致较为严重的兼容问题。
2. 文件名覆盖 \
   部分代码（如 `pop_jobs` ）无法通过 key 进行覆盖，因此，想要修改这部分代码，必须通过同名文件的方式进行覆盖。此时，mod 的排序方式至关重要，后读入的文件会彻底覆盖掉先读入的文件，使先读入的文件完全失效。如果排序出现问题，极有可能出现游戏 bug。
3. 只读一次 \
   部分代码的 key（如 events）在游戏加载时只会读取一次，后序无论遇到多少同名 key 值，都会直接丢弃。因此，这部分代码通常需要放在一个文件名的 Unicode 编码靠前的文件中，保证优先读取。
4. 特殊覆盖规则 \
   本地化（localisation）具有特殊的覆盖规则，通常情况下，想要覆盖具有相同 key 的本地化时，需要在 localisation 文件夹下创建一个名为 `replace` 的文件夹，此文件夹下的本地化文件将在所有本地化文件加载完成后读取，并且覆盖掉所有具有相同 key 的本地化。当然，也可以在不创建 replace 文件夹的情况下覆盖本地化，但是其覆盖规则并不明确，既不是 key 覆盖，也不是只读一次，很可能导致意外的效果。因此，想要覆盖本地化，**请务必创建 replace 文件夹**。
5. 合并规则 \
   触发器（ `on_actions` ）并不会互相覆盖，具有相同 key 值的 `on_actions` 会将其下的所有事件代码合并。

## 各文件的覆盖规则列表

以下列表翻译自群星英文百科关于文件覆盖的列表，并不一定准确，仅供参考。

覆盖规则大多按照 ASCII / UNICODE 编码顺序排列，详见上一章，若覆盖规则为**后读覆盖**，则编码顺序最后的文件内容会生效，若**只读一次**，则编码顺序靠前的文件内容会生效，并省略编码顺序靠后的文件的所有内容。其他按情况可能会生成重复内容或必须整个文件覆盖（或只能同名文件直接覆盖，该情况下按照 mod 载入顺序覆盖）

### Common

| **档案类型（上级文件夹名）** | **覆盖规则**           | **备注**                                                     |
| ---------------------------- | ---------------------- | ------------------------------------------------------------ |
| Agendas                      | 后读覆盖               |                                                              |
| AI Budget                    |                        |                                                              |
| Ambient Objects              |                        |                                                              |
| Anomalies                    | 后读覆盖               |                                                              |
| Armies                       | 后读覆盖               |                                                              |
| Artifact Actions             | 后读覆盖               |                                                              |
| Ascension Perks              | 后读覆盖               |                                                              |
| Asteroid Belts               |                        |                                                              |
| Attitudes                    | 后读覆盖               |                                                              |
| Bombardment Stances          | 后读覆盖               |                                                              |
| Buildings                    | 后读覆盖               | 局部覆盖该文件会导致自动生成的相关修正失效                   |
| Button Effects               |                        |                                                              |
| Bypass                       | 后读覆盖               |                                                              |
| Casus Belli                  | 后读覆盖               |                                                              |
| Colony Types                 | 后读覆盖               |                                                              |
| Colors                       |                        |                                                              |
| Component Sets               | 只读一次               |                                                              |
| Component Tags               |                        |                                                              |
| Component Templates          | 只读一次               |                                                              |
| Country Customization        |                        |                                                              |
| Country Types                | 后读覆盖               |                                                              |
| Crisis Levels                | 后读覆盖               |                                                              |
| Crisis Objectives            | 后读覆盖               |                                                              |
| Decisions                    | 后读覆盖               |                                                              |
| Defines                      | 后读覆盖               | 必须写入上一级的代码块，例如: `NGameplay = { POLICY_YEARS = 10 }` |
| Deposit Categories           |                        |                                                              |
| Deposits                     | 后读覆盖               |                                                              |
| Diplomatic Phrases           |                        |                                                              |
| Diplomatic Economy           | 后读覆盖               |                                                              |
| Diplomatic Actions           | 后读覆盖               | **不能只覆盖局部的文件内容，必须复制整个文件覆盖**           |
| Districts                    | 后读覆盖               | 局部覆盖该文件会导致自动生成的相关修正失效                   |
| Economic Categories          |                        |                                                              |
| Edicts                       | 后读覆盖               |                                                              |
| Ethics                       | 后读覆盖               | 可能会导致选择思潮的图像损毁 警告：如果存在多个思潮文档，可能会导致一些关联思潮的自动生成的代码或文件随机被损毁，建议整文件全部覆盖 |
| Event Chains                 | 只读一次               |                                                              |
| Fallen Empires               |                        |                                                              |
| Game Rules                   | 后读覆盖               |                                                              |
| Global Ship Designs          | 只读一次               |                                                              |
| Governments                  | 后读覆盖               |                                                              |
| ├─── Authorities             | 后读覆盖               | **不能只覆盖局部的文件内容，必须复制整个文件覆盖**           |
| └─── Civics                  | 后读覆盖               |                                                              |
| Graphical Culture            |                        |                                                              |
| Leader Classes               | 后读覆盖               |                                                              |
| Mandates                     | 后读覆盖               |                                                              |
| Map Modes                    | 后读覆盖               |                                                              |
| Megastructures               | 后读覆盖               |                                                              |
| Name Lists                   |                        |                                                              |
| Notification Modifiers       |                        |                                                              |
| Observation Station Missions |                        |                                                              |
| On Actions                   | 自动整合，不可局部覆盖 | 读取顺序是从先到后                                           |
| Opinion Modifiers            | 内容重复/后读覆盖      | `add_opinion_modifier` 遵循后读覆盖原则                       |
| Personalities                | 后读覆盖               |                                                              |
| Planet Classes               | 后读覆盖               | 内容可能会重复出现；如果不整文件覆盖会损毁自动生成的宜居度修正 |
| Planet Modifiers             | 后读覆盖               |                                                              |
| Policies                     | 后读覆盖               | 3.X 后可使用 `NAME = {}` 局部覆盖                              |
| Pop Categories               | 后读覆盖               |                                                              |
| Pop Faction Types            | 后读覆盖               |                                                              |
| Pop Jobs                     | 不可局部覆盖           | **不能只覆盖局部的文件内容，必须复制整个覆盖（最好同名覆盖），局部覆盖该文件会自动生成的相关修正失效（如“职业+xxx”，“每 xxx 个人口增加 xxx 个职业”）** |
| Precursor Civilizations      |                        |                                                              |
| Random Names                 |                        |                                                              |
| Relics                       | 不可覆盖               |                                                              |
| Resolutions                  | 后读覆盖               |                                                              |
| Scripted Effects             | 后读覆盖               |                                                              |
| Scripted Localisation        |                        |                                                              |
| Scripted Triggers            | 后读覆盖               |                                                              |
| Scripted Variables           | 只读一次               |                                                              |
| Section Templates            | 只读一次               | **警告**：不能只覆盖局部的文件内容，必须复制整个文件**同名覆盖**，**已使用该文件撰写的舰船部件的舰船/恒星基地覆盖后会自动被移除**。 |
| Sector Focuses               | 后读覆盖               |                                                              |
| Sector Types                 |                        |                                                              |
| Ship Behaviors               | 只读一次               |                                                              |
| Ship Sizes                   | 后读覆盖               | **不能只覆盖局部的文件内容，必须复制整个文件覆盖**           |
| Solar System Initializers    | 只读一次               |                                                              |
| Special Projects             | 只读一次               |                                                              |
| Species Archetypes           | 后读覆盖               | 局部覆盖该文件会导致自动生成的相关修正失效                   |
| Species Classes              | 后读覆盖               |                                                              |
| Species Names                |                        |                                                              |
| Species Rights               | 后读覆盖               | 效果提示文案(effect tooltip)独立于内容效果                   |
| Star Classes                 | 只读一次               |                                                              |
| Starbase Buildings           | 后读覆盖               |                                                              |
| Starbase Levels              | 后读覆盖               |                                                              |
| Starbase Modules             | 后读覆盖               | **不能只覆盖局部的文件内容，必须复制整个文件覆盖**           |
| Starbase Types               | 后读覆盖               |                                                              |
| Start Screen Messages        | 只读一次               | 每个位置(?)的第一个有效词条将会生效，此后无视其他词条        |
| Static Modifiers             | 只读一次               |                                                              |
| Strategic Resources          | 只读一次               |                                                              |
| Subjects                     | 后读覆盖               | 其功能受限于 `diplomatic_actions` 及 `game_rules`               |
| System Types                 | 后读覆盖               |                                                              |
| Technology                   | 内容重复 /后读覆盖     | **不能只覆盖局部的文件内容，必须复制整个文件覆盖**           |
| └─── Tiers                   | 后读覆盖               |                                                              |
| Terraform (Links)            | 内容重复               |                                                              |
| Trade Conversions            | 后读覆盖               | Trade Policy（?）                                            |
| Tradition Categories         | 后读覆盖               |                                                              |
| Traditions                   | 后读覆盖               | 效果提示文案(effect tooltip)独立于内容效果                   |
| Traits                       | 内容重复/不可局部覆盖  | **不能只覆盖局部的文件内容，必须复制整个文件覆盖**           |
| War Goals                    | 后读覆盖               |                                                              |

### Localisation

见上文。

### Events

文件内容只读一次，因此编码顺序靠前的文件里的事件将会生效，并省略编码顺序靠后的文件的所有事件。

### Interface

覆盖规则应该为后读覆盖。
