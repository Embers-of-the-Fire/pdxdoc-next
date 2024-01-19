---
title: Custom GUI 入门
---

注意，本篇所讨论的皆为 Event 使用的 Custom GUI，并不涉及对原版 GUI 文件的修改，不过在学习了本篇之后你可以更加轻松的修改原版 GUI 文件以达到你所需要的功能。

首先我们需要认识何为 Custom GUI 以及其到底能做什么。GUI 为 Graphical User Interface 的简写，意思就是“图形用户界面”，Custom GUI 则就是“自定义图形用户界面”。

在制作 mod 过程中可能你会对蠢驴给予的事件面板感到失望，比如你想新写一个面板，面板上有各种自己定义的按钮以实现各种不同的功能，显然原版事件窗口也就一个选项界面可以给予你不同的功能实现，但一串的选项显然并不满足某些富有野心的 modder，我们需要一个更加自由的面板来实现我们的目的，于是蠢驴给予了我们部分自定义 GUI 的可能，至于为什么是部分，在下文你将能体验到蠢驴为何蠢以及学习如何创建自己的第一个自定义 GUI 窗口。

## GUI 文件的构成

首先我们需要稍微认识下 GUI 文件，由于我们所看到的虽然是图形界面，但一切都需要通过底层代码完成架构，因此我们需要认识 GUI 文件是如何构成的。

首先我们随便打开一个原版的 GUI 文件，这里列举了香草的 `achievements_view.gui` 文件，其文件位置位于 `interface/achievements_view.gui` 。在此我们并不对其游戏表现进行解析，而是单纯从代码角度进行分析，以下是该文件内容展示：

```pdx
guiTypes = {
    containerWindowType = {
        name = "achievement_window"
        position = { x=-550 y=-155 }
        size = { width=512 height=128 }
        orientation = LOWER_RIGHT

        background = {
            name = "background"
            quadTextureSprite = "GFX_tile_outliner_bg"
        }

        instantTextBoxType = {
            name = "achievement_title"
            font = "malgun_goth_24"
            text = "Achievement unlocked!"
            position = { x = 10 y = 0 }
            maxWidth = 450
            maxHeight = 20
            fixedSize = yes
            orientation = "UPPER_LEFT"
            format = left
        }

        buttonType = {
            name = "achievement_closebutton"
            quadTextureSprite = "GFX_close"
            position = { x = -41 y = 13 }
            Orientation = "UPPER_RIGHT"
            shortCut = "ESCAPE"
            pdx_tooltip = "CLOSE_TITLE"
            clicksound = "back_click"
        }

        iconType = {
            name = "achievement_icon"
            position = { x = 18 y = 34 }
            spriteType = "GFX_planet_background_frame_blocker"
        }

        instantTextBoxType = {
            name = "achievement_header"
            font = "cg_16b"
            position = { x = 128 y = 36 }
            text = "The Industrial Re-Revolution"
            format = left
        }

        instantTextBoxType = {
            name = "achievement_text"
            font = "cg_16b"
            position = { x = 128 y = 58 }
            text = "Earn a mineral income each month above 1000"
            format = left
        }

        # Invisible button over the main area of the view so that we can click on anything to activate more info
        containerWindowType = {
            name = "mainwindow_overlay"
            position = { x=0 y=0 }
            size = { width=460 height=128 }

            background = {
                name = "mainwindow_overlay_bg"
                quadTextureSprite = "gfx_transparency_button"
                #alwaysTransparent = yes
            }
        }
    }

    containerWindowType = {
        name = "achievements_view"
        position = { x=0 y=0 }
        size = { width=100% height=100% }
    }
}
```

首先在创立任何一个 GUI 文件之后，都需要声明一个 guiTypes，该条目下所有子元素（即 guiTypes 下方第一层所有并列的元素）皆是一个独立 UI，其中包括类型控件以及窗口，下方先列举几个接下来将会使用到的概念：

控件是指能够依附于一个窗口以实现某些目的的修饰性容器

窗口是指能够独立显示出来并通过承接各类控件将其显示于界面之上给予控件各类交互机会的主要容器类型。

锚地指的是位置标定点，即物理上常用的概念参考系，蠢驴的 UI 定位锚点默认为容器的左上角。

GUI 无非就是一层层的容器相互嵌套而形成的，而每个容器又有其各自的属性，通过调整容器嵌套以及其属性，便能见到各种各样的 UI，而这也是我们编写 Custom GUI 的关键所在。

## GUI 模板

上文提到过，Custom GUI 并非十分自由，蠢驴限定了其模板文件只能为外交窗口，并且我们只能够新增元素，不能够删除已有的元素，否则将会崩溃！不过好在我们可以通过其他一些手段来达成我们的目的，在此我先给出在 Wiki 上的一段已经基本被清空的 GUI 模板（各位可以到[Interface modding - Stellaris Wiki (paradoxwikis.com)](https://stellaris.paradoxwikis.com/Interface_modding#Sample_GUI_File) 最下方拿到该模板）：

```pdx
guiTypes = {

    ### FACTION OVERVIEW GUI ###

    containerWindowType = {
        name = "irm_faction_overview"
        orientation = center
        origo = center
        moveable = yes
        size = { width = 660 height = 300 }

        background = { name = "background" quadTextureSprite ="GFX_tile_outliner_bg" }

        iconType = { name = "hex_bg" spriteType = "GFX_hex_bg" position = { x = -10 y = -14 } alwaysTransparent = yes }
        iconType = { name = "empire_header_line" quadTextureSprite = "GFX_line_long" position = { x = 6 y = 22 } alwaysTransparent = yes }

        buttonType = {
            name = "close"
            quadTextureSprite = "GFX_close"
            position = { x= -42 y = 12 }
            Orientation = "UPPER_RIGHT"
            shortcut = "ESCAPE"
            clicksound = "back_click"
        }

        # Custom header
        instantTextBoxType = {
            name = "irm_some_header"
            font = "malgun_goth_24"
            text = "ui_faction_header"  # header text
            position = { x = 20 y = 5 }
            maxWidth = 543
            maxHeight = 22
            fixedSize = yes
            alwaysTransparent = yes
        }

        ### ALL OF THIS IS HIDDEN OR DISPLACED ! ###

        buttonType = { name = "focus_button" position = { x = -1180 y = -1112 } spriteType = "GFX_fleetview_focus" } # hidden
        instantTextBoxType = { name = "heading" font = "malgun_goth_24" position = { x = -1120 y = -115 } } # hidden
        buttonType = { name = "alien_message_background" size = { x = 0 y = 0 } position = { x = -1110 y = -11430 } spriteType = "GFX_tiles_dark_area_cut_8" } # hidden
        buttonType = { name = "confirm_button" quadTextureSprite = "GFX_standard_button_142_34_button" } # hidden
        containerWindowType = {
            name = "portrait_background"
            position = { x = -1117 y = -1145 }
            size = { width = 0 height = 0 }     # hide portrait window
            iconType = { name = "event_picture" spriteType = "GFX_diplomacy_portrait_frame" } # hidden
            iconType = { name = "portrait" spriteType = "GFX_portrait_character" } # hidden
        }
        containerWindowType = {
            name = "portrait"
            position = { x = -1117 y = -1145 }
            size = { width = 0 height = 0 } # hide portrait window
            iconType = { name = "portrait" spriteType = "GFX_portrait_gamesetup_mask" } # hidden
            iconType = { name = "black_frame" spriteType = "GFX_diplomacy_portrait_shadow_frame" } # hidden
            iconType = { name = "stripes_1" spriteType = "GFX_diplomacy_stripes_2" } # hidden
            iconType = { name = "city_frame" spriteType = "GFX_diplomacy_portrait_frame" } # hidden
        }
        iconType = { name = "empire_info_bg" spriteType = "GFX_diplomacy_dark_fade_bg" } # hidden
        instantTextBoxType={ name = "empire_name" font = "malgun_goth_24" } # hidden
        instantTextBoxType={ name = "empire_government_type" font = "cg_16b" } # hidden
        instantTextBoxType={ name = "empire_personality_type" font = "cg_16b" } # hidden
        OverlappingElementsBoxType = { name = "empire_ethics_icons" position = { x = -1145 y = -11138 } } # hidden
        iconType = { name = "empire_flag" spriteType = "GFX_empire_flag_128" position = { x = -1125 y = -11235 } } # hidden
        containerWindowType = {
            name = "leader_details"
            position = { x = -1125 y = -1175 }
            containerWindowType = { name = "empire_traits_box" } # hidden
            instantTextBoxType = { name = "empire_traits_label" font = "cg_16b" } # hidden
            overlappingElementsBoxType = { name = "leader_traits" } # hidden
            instantTextBoxType = { name = "leader_name" font = "cg_16b" } # hidden
            instantTextBoxType = { name = "leader_species" font = "cg_16b" } # hidden
        }
        containerWindowType = {
            name = "opinion_window"
            position = { x = -1127 y = -11110 }
            size = { width = 94 height = 30 }
            iconType = { name = "their_opinion_icon" spriteType = "GFX_diplomacy_opinion" } # hidden
            instantTextBoxType = { name = "their_opinion" font = "cg_16b" }
        }

        ### EVENT DIPLO ###

        containerWindowType = {
            name = "EVENT_DIPLO"
            position = { x = 2 y = 50 }
            #size = { width=563 height=220 }
            moveable = no

            instantTextBoxType={
             name = "action_title"
             font = "malgun_goth_24"
             position = { x = 20 y = 0 }
             maxWidth = 200
             alwaysTransparent = yes
            }
            instantTextBoxType={
             name = "action_desc"
             font = "malgun_goth_24"
             position = { x = 490 y = 0 }
             maxWidth = 500
             maxHeight = 180
             Orientation = "UPPER_LEFT"
             format = center
             alwaysTransparent = yes
             text_color_code = "H"
            }
            listboxType = { name = "option_list" position = { x = -11500 y = -1130 } } # hidden option list
        }
        # Description Section
        instantTextBoxType = {
            name = "alien_message"
            font = "cg_16b"
            position = { x = 20 y = 100 }
            maxWidth = 465
            maxHeight = 220
            format = left
            scrollbartype = "standardtext_slider"
        }
    }
}
```

我们来一步步解析该模板（某些我认为不重要的容器将不会被解释）：

- `containerWindowType` 为声明该容器的类型，这是Custom GUI限定使用的容器类型，也是我们将会用到最多的容器类型。

- `name` 是表示其唯一性，类似于事件的id，在需要调用该容器之时代表该容器的值。

- `orientation` 定义了该容器的锚点位置，此位置为相对父元素锚点。

- `origin` 定义了当使用 `orientation` 属性之时锚点的参考点。

- `background` 定义了该容器的背景图片， `quadTextureSprite` 则是调用在` .gfx` 文件下注册的图片。

- `iconType` 其作用为显示图片，图片调用定义与 `background` 相同，需要注意的是，由于整个容器皆为蠢驴的外交事件框改变而来，因此某些元素将会调用事件传递过来的参数，如旗帜，肖像，背景等等，尽管我们有时候并不需要他们，但是我们仍然不能够直接删除这些接口或者修改器name，擅自修改原容器控件的name或者删除原有控件将会大概率导致崩溃！我们可以从这些name当中猜测该控件所链接的事件参数并加以利用（假如用得到的话）。

- `buttonType` ，一个可点击的按钮控件，不过此类控件所链接的是硬代码，不能够更改其name，不过我们可以调整期调用的图片以及位置大小——将某个不可删除的控件 `size` 调整为0亦或是将 `position` 调整为一个极其离谱的值都是一个假装删除控件的方法，在此模板内例子比比皆是。

- `instanTextType` 一个可以显示文本的控件，其文本本地化定义在 `text` 属性当中， `font` 属性规定了其使用的字号，不过由于并不能采用支架命令，其存在除了蠢驴用来链接内部文本之外毫无作用（一般情况下直接把文字做成图丢 `iconType` 还能给文件加点艺术效果，这个文本框实在不懂在不能用支架命令还有啥调用的价值，也就是蠢驴内部链接在用了）

- `position` 表示相对于父元素锚点的位置，如若没有父元素则相对于屏幕锚点进行位置调整。锚地指的是位置标定点，即物理上常用的概念参考系，蠢驴的UI定位锚点默认为容器的左上角。

- `size` 定义了该容器的大小，其属性有 `width` ， `height` ，分别标定宽与高，还有另一种直角坐标系写法，将 `height` 用 `y` 代替， `width` 用 `x` 代替，两者作用相同。

差不多关键元素都讲完了，剩下的控件内容看看下表以及wiki界面就差不多了，常用的属性基本就上方内几个，常用的容器类型也就只有 `iconType` 、 `containerWindowType` 以及我们接下来要讲的最重要的东西， `effectButtonType` ，由于 `buttonType` 这个控件仅仅是蠢驴内部链接使用，因此对我们来说是无效控件，蠢驴还是给予了我们一线希望，那就是这个 `effectButtonType` 控件，该控件是唯一一个能够链接Custom GUI与事件的控件，因此我们接下来先详细介绍下该控件：

```pdx
effectButtonType = {
       name = star_pledge_main_window_fation_1
       quadTextureSprite = "GFX_star_pledge_main_window_faction_1"
       size = { x = 200 y = 200 }
       position = {x = 50 y = 50 }
       effect = test_effect
}
```

该控件的声明也是十分简单，图片，位置，大小皆与iconType保持一致，最主要的是其effect属性，这是链接该控件被点击之时所产生的效果，其定义文件为 `common/button_effects` 下：

```pdx
test_effect = {
    allow = {
        
    }
    potential = {
        
    }
    effect = {
        
    }
}
```

- `allow` 定义该按钮不满足条件之时变灰
- `potential` 定义该按钮不满足条件之时直接消失（不显示）
- `effect` 定义该按钮点击之后所执行的effect

好了，现在我们已经了解了GUI模板，接下来就是该处理如何调用Custom GUI了，我们只能够通过事件来调出Custom GUI，因此我们需要一个事件作为载体，这里给出了一个例子：

```pdx
country_event = {
    id = test.1
    is_triggered_only = yes
    diplomatic = yes
    custom_gui = star_pledge_select_window
}
```

该事件需要采用调用 `custom_gui` 调用我们定义的Custom GUI，值为我们定义的首个 `containerWindowType` 的name，并且由于是外交界面更改而来，因此必须声明 `diplomatic = yes` ，这样既可，然后示我们隐藏了什么元素以及我们需要什么元素来决定该事件是否需要添加 `title` 及其他属性。

至此，所有GUI理论方面的讲解便结束了，下一篇将会以一个实例来讲解如何制作自己的第一个Custom GUI，当然，仅仅有前两章的内容也可以尝试自己实现一下，以下是wiki的控件参考表，你也可以通过查阅[Interface modding](https://stellaris.paradoxwikis.com/Interface_modding) 获取更多帮助。

| **Element**                  | **Type**                       | **Modability**         | **Description**                                              | **Attributes**                                               |
| ---------------------------- | ------------------------------ | ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `containerWindowType`        | Container Element              | Attributes and Content | The main container element  when structuring the GUI.        | `name,  position, size, moveable, clipping, orientation, origo, background,  alwaysTransparent` |
| `buttonType`                 | Action Element                 | Attributes Only        | This element is in most cases  tied to a specific hardcoded action, but can also be used to display a  graphical element, like a fake background. | `name,  position, orientation, buttonFont, buttonText, appendText, oversound,  clicksound, shortcut, format, vertical_alignment, pdx_tooltip,  alwaysTransparent, web_link, rotation` |
| `effectButtonType`           | Action Element                 | Attributes and Effect  | Similar to `buttonType` , just that it's manipulable with the effect attribute, which  are events called from `/common/button_effects/` and can run [ `custom_gui` ](https://stellaris.paradoxwikis.com/Interface_modding#Custom_Windows). `pdx_tooltip` doesn't work for `effectButtonType` , so use `custom_tooltip` when coding [button effect](https://stellaris.paradoxwikis.com/Effects) instead. | `name,  position, orientation, buttonFont, text, appendText, oversound, clicksound,  shortcut, format, vertical_alignment, effect, alwaysTransparent` |
| `iconType`                   | Graphical Element              | Attributes and Content | This element whose sole  purpose is to display graphics; images, icons etc. | `name,  position, orientation, spriteType, quadTextureSprite, frame, scale,  pdx_tooltip, alwaysTransparent, rotation, centerPosition` |
| `instantTextBoxType`         | Text Element                   | Attributes and Content | This element is for displaying  text, which can either be directly inserted or using localisation references. | `name,  position, orientation, font, text, appendText, maxWidth, maxHeight,  fixedSize, format, vertical_alignment, text_color_code, pdx_tooltip,  alwaysTransparent` |
| `scrollbarType`              | Srollbar Element               | Attributes and Content | This element is used to define  the behavior of scrollbars for `listboxType` and `smoothListboxType` , but also for sliders as seen in the settings window. Can be  used both horizontally and vertically. |                                                              |
| `extendedScrollbarType`      | Srollbar Element               | Attributes and Content | This element is used to define  the behavior of scrollbars for `containerWindowType` . Can be used both horizontally and vertically. |                                                              |
| `spinnerType`                | Carousel Element               | Attributes and Content | This element is used to define  the behavior of a clickable carousel, like seen in the settings window. |                                                              |
| `guiButtonType`              | Action Element                 | Attributes Only        | Same as `buttonType` , but specifically for scrollbars and `spinnerType` elements. |                                                              |
| `positionType`               | Position Element               | Attributes Only        | Used to define positions for  certain elements. These links are hardcoded. |                                                              |
| `listboxType`                | List Element                   | Attributes Only        | A scrollable list element that  jumps between sub elements when scrolling. |                                                              |
| `smoothListboxType`          | List Element                   | Attributes Only        | A scrollable list element that  smoothly scrolls.            | `name,  position, size, orientation, alwaysTransparent, borderSize, spacing,  scrollbartype, offset, defaultSelection, priority, autohide_scrollbar` |
| `OverlappingElementsBoxType` | Horizontal List Element        | Attributes Only        | This element displays its  content horizontally and will start overlapping them if width limit has been  reached. |                                                              |
| `gridBoxType`                | Grid Element                   | Attributes Only        | This element displays its  content in a grid layout, depending on horizontal and vertical limits. | `name,  position, size, orientation, alwaysTransparent, slotsize, format,  add_horizontal, max_slots_horizontal, max_slots_vertical` |
| `checkboxType`               | Action Element                 | Attributes Only        | This element is a yes/no  graphical action box.              |                                                              |
| `editBoxType`                | Action Text Element            | Attributes Only        | This element is an editable  text box, as seen when modifying names of objects in the game. |                                                              |
| `dropDownBoxType`            | Dropdown Element               | Attributes Only        | Container element for `expandButton` and `expandedWindow` elements. |                                                              |
| `expandButton`               | Action Element                 | Attributes Only        | Similar to buttonType, just that  it's linked to a toggleable `expandedWindow` element. |                                                              |
| `expandedWindow`             | Toggleable Container Element   | Attributes and Content | Element that is toggleable  with `expandButton` .             |                                                              |
| `windowType`                 | Floating Container Element (?) | Attributes Only        |                                                              |                                                              |
