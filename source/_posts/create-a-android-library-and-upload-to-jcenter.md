---
title: 创建Android库 并且上传到jcenter
date: 2016-01-17 15:59:06
tags:
---

## 需求

* 自定义一个Math库
* 上传到jcenter
* 在自己的App中引用

## 准备工作

* 注册[Bintray](https://bintray.com/)，我们会上传到这里，并且送入jcenter。
* 添加一个`Package`叫做`Math`在`maven`库中。

|Key|Value|
|---|---|
|Name|Math|
|Licenses|MIT|
|Version control|https://github.com/itrufeng/Math|

## 步骤

* 创建项目`MathAppWithJcenter`
* 创建Android Library`Math`
* 添加类`Math`在`Math`库中
* 添加上传插件
* 上传

```
gradle bintrayUpload
```

* 发布，进入`Bintray`网站`Math`库。点击`Publish`

> Notice: You have 2 unpublished item(s) for this repo (expiring in 6 days and 22 hours) Discard | Publish

* 在App中引用

## Demo

[Github](https://github.com/itrufeng/MathAppWithJencter)

## 参考文章

* [Gradle bintray plugin](https://bintray.com/jfrog/jfrog-jars/gradle-bintray-plugin#read)
