---
title: 使用Realm在Kotlin中(Android)
date: 2016-01-30 16:02:19
tags:
---
## 配置

build.gradle

```
// Realm
compile 'io.realm:realm-android-library:0.87.4@aar'
compile 'io.realm:realm-annotations:0.87.4'
kapt 'io.realm:realm-annotations:0.87.4'
kapt 'io.realm:realm-annotations-processor:0.87.4'
```

proguard-rules.pro

```
# Realm
-keep class io.realm.annotations.RealmModule
-keep @io.realm.annotations.RealmModule class *
-keep class io.realm.internal.Keep
-keep @io.realm.internal.Keep class * { *; }
-dontwarn javax.**
-dontwarn io.realm.**
```

## 代码

RealmLink.kt

```kotlin
open class RealmLink: RealmObject() {
    open var url: String? = null
    open var title: String? = null
    open var createDate: Date? = null
    open var tags: RealmList<RealmTag>? = null
}
```

RealmTag.kt

```kotlin
open class RealmTag: RealmObject() {
    open var name: String? = null
}
```

MainActivity.kt

```kotlin
val tags = arrayListOf("Web", "Search")
// 得到配置(暂无数据迁移)
val config = RealmConfiguration.Builder(context).build()
// 获得数据库对象
val realm = Realm.getInstance(config)
// 执行事务
realm.executeTransaction {
    // 创建RealmLink对象
    val realmLink = realm.createObject(RealmLink::class.java)
    realmLink.title = "Google"
    realmLink.url = "https://google.com"
    realmLink.createDate = Date()
    tags.forEach { it ->
        val realmTag = realm.createObject(RealmTag::class.java)
        realmTag.name = it
        realmLink.tags?.add(realmTag)
    }
    // 存储
    realm.copyFromRealm(realmLink)
}
```

## 问题

> XXX is not part of the schema for this Realm

原因：重复引用Realm库。

解决方法：去掉下面第一条就可以了。

```
compile 'io.realm:realm-android:0.87.4'
compile 'io.realm:realm-android-library:0.87.4@aar'
```

[当时问题解决链接](https://github.com/realm/realm-java/issues/2162)

## Demo

[点这里](https://github.com/RxKotlin/Pocket/tree/use-realm)
