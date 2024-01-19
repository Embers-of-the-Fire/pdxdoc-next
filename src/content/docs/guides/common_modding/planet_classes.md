---
title: 星球类型(Planet Classes)
---

目录在 `Stellairs/common/planet_classes` ，里面是原版的一些星球类型。

```pdx
pc_gaia = {                    # 星球类型的id
    entity = "gaia_planet"    # 星球使用的实体
    entity_scale = @planet_standard_scale   # 与其他星球模型相比，该星球模型的大小。通常使用@planet_standard_scale
    icon = GFX_planet_type_gaia                # 星球的图标
    atmosphere_color  = hsv { 0.58    0.3 0.7 }        # 星球大气颜色，hsv色调
    atmosphere_intensity   = 1.0            # 星球大气颜色的饱和度
    atmosphere_width  = 0.5                    # 星球大气厚度
    # 如果可居住，将应用于城市的透明度过滤器，使其更好地与背景融合
    city_color_lut = "gfx/portraits/misc/colorcorrection_tropical.dds"
    modifier = {            # 该星球的修正
        planet_jobs_produces_mult = 0.10
        biological_pop_happiness = 0.10
        lithoid_pop_happiness = 0.10
    }

    # 该星球与星系中央的最小与最大距离
    # 可使用@habitable_min_distance与@habitable_max_distance这两个变量默认值为60与100
    min_distance_from_sun = 60
    max_distance_from_sun = 95

    spawn_odds = 0.05       # 该星球类型随机生成的概率
    extra_orbit_size = 0    # 星球的轨道大小，0为默认，高于0则会增加轨道大小
    extra_planet_count = 0  # 星球被生成时会被计算成多少颗星球，0并非0颗，而是默认数量
    # 以上两项extra_orbit_size及extra_planet_count只有气态巨行星默认高于0

    chance_of_ring = 0.2    # 生成一个环的概率，这几乎只有视觉效果无实际意义

    # 若该星球是行星，使用的最小与最大尺寸，变量的默认值为12与25
    planet_size = { min = @habitable_planet_min_size max = @habitable_planet_max_size }
    #若该星球是卫星，使用的最小与最大尺寸，变量的默认值为10与15
    moon_size = { min = @habitable_moon_min_size max = @habitable_moon_max_size }

    colonizable = yes           # 此星球类型是否允许玩家或AI殖民
    district_set = standard     # 区划设置类型，standard为默认
    ideal = yes                 # 是否为理想的，是则永久对所有物种100%宜居
    starting_planet = no        # 是否能作为玩家或AI的起始行星，并不影响起源(origin)
    uses_alternative_skies_for_moons = no   # 如果为yes，当星球以卫星被生成时，将会有一个替代的星球界面背景
    carry_cap_per_free_district = @carry_cap_high
    # 以上为盖亚星球类型默认设置，以下为补充

    # can_be_moon = yes         # 默认为yes，决定该星球类型是否会作为环绕其他行星的卫星
    # climate = "dry"           # 星球的气候类型，可以为dry、wet和cold即干燥、潮湿和寒冷，也可以不指定
    # enable_tilt = yes         # 默认为yes，决定星球是否会倾斜
    # fixed_entity_scale = no   # 默认为no，如果为yes则无视星球尺寸使使用该星球类型的所有星球可见大小相同
    # fixed_city_level = <>     # 修正星球背景上可见的城市贴图，如fixed_city_level = 6，原版见于城市球
    # picture = <>              # 使用已有的星球界面背景而不是自定义背景，示例: `picture = pc_gaia` ，原版见于灵能耗子事件的特殊死寂球
    # star = no                 # 默认为no，决定这个星球是否为恒星
    # star_gfx = yes            # 当星球为恒星时，该项默认为yes，决定是否发光
}
```

实体（entity），其实就是模型，可自定义，具体可参照 `gfx/models/planet/_planetary_entities.asset`
