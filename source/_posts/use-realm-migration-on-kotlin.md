---
title: 使用Realm的迁移在Kotlin中
date: 2016-02-04 16:02:34
tags:
---
## 序章

[使用Realm在Kotlin中(Android)](/use-realm-on-kotlin/)

## 代码

### App第一个版本

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

### App第二个版本

RealmLink.kt

```kotlin
open class RealmLink: RealmObject() {
    open var url: String? = null
    open var title: String? = null
    open var createDate: Date? = null
    open var modifiedDate: Date? = null
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
// 得到配置(数据迁移到版本1)
val config = RealmConfiguration.Builder(this)
            .schemaVersion(1) // 新版本1
            .migration { realm, oldVersion, newVersion ->
                var version = oldVersion
                val schema = realm.schema

                if (version == 0L) { // 旧版本0
                    schema.get(RealmLink::class.java.simpleName)
                            .addField("modifiedDate", Date::class.java)
                    version++
                }
            }
            .build()
// 获得数据库对象
val realm = Realm.getInstance(config)
// 执行事务
realm.executeTransaction {
    // 创建RealmLink对象
    val realmLink = realm.createObject(RealmLink::class.java)
    realmLink.title = "Google"
    realmLink.url = "https://google.com"
    realmLink.createDate = Date()
    realmLink.modifiedDate = Date()
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

> 如果首次安装App，它会执行迁移吗？

回答：不会，首次安装App，会按照你所有的Model类，自动创建结构。只有更新App(数据字段有更新)后，才会执行迁移，哪怕配置了迁移，第一次也不会执行。
