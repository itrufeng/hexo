---
title: app-security
date: 2016-08-31 16:03:13
tags:
---
# App code signing

当iOS系统启动后，App code
signing控制着哪些用户的进程/App可以被运行，并且确保所有的Apps来源安全，iOS要求所有的可执行代码被苹果证书签名，例如苹果自己的App，Mail，Safari呀这些。我们开发的第三方Apps同样必须被苹果证书签名，iOS强制使用信任链的概念来签名Apps，并且阻止加载未签名的App和虽然签名但是被修改了代码的App。

iOS允许开发者内嵌其他的Frameworks在自己的Apps中，它可以被自己的其他内置的extensions调用。为了保护其他App加载第三方的代码，系统会在link的时候对第三方的代码或者动态库同样签名，签名是通过证书的Team identifier来做的，简称TeamID，它是由10位的字母和数字组成。同样TeamID签名的任何Library，都可以被主程序调用。

商用Apps，可以用in-house方式分发给员工。并且需要应用Apple Developer Enterprise Program (ADEP)，ADEP需要生成一个Provisioning Profile来许可自己的App被安装。只有设备安装了这个Provisioning Profile，才可以安装和允许商用App，这间接的确保了信任关系。

iOS不像其他手机平台，iOS不允许运行从网站下载的未签名的程序，不允许运行不信任的代码。并且会在运行时候检查内存中可执行程序，确保App没有被在安装后或者升级后被串改。

# Runtime process security

在iOS
App被签名验证之后，iOS会强行使用安全机制来保护，不让其他App影响自己或者影响别的App。

所有的第三方App都在Sandbox中运行，它不可以访问或着修改别的App或者系统设备。每个App都有一个唯一的Home目录，当App被安装的时候。他们只能使用系统提供的服务来访问没有权限的部分。每个App都有一个key value pair，这就像unix user ID的权限一样。

App只能通过系统提供的API在后台运行自己的程序，这样可以保证可以后台执行，并且保护电池寿命。

地址空间布局随机化(ASLR)保护，让内存溢出攻击变得不那么容易，系统内置的App都使用了这个技术，它让可执行代码，系统库的攻击都增加了复杂度。

在Xocde中，开发第三方App时候，默认开启ASLR支持，在编译的时候。

进一步的保护是，让内存页不可执行，内存也有2个标记，可写和可执行，这被严格控制着。内核只检查动态签名，即便如此，单项调用可执行和可写，它会被随机分配一个地址。Safari的javascript JIT编译器就是如此。

# Extensions

iOS允许App通过Extensions提供功能，Extensions的二进制可执行文件被特殊的签名而签名，并且打包在app中。系统会自动找到Extensions在安装的时候，并且让他们可以工作。

每个Extensions提供一些APIs可以被使用，每个Extensions都有一些固定功能，系统自动运行这些Extensions在系统需要的时候，并且会管理他们的生命周期。Entitlements用来限制Extensions的权限，例如Today view widget只能出现在Notification Center，Sharing只能出现在共享面板。这些Extensions通常有，Today，共享，自定义Actions，图片编辑，文档提供和自定义键盘。

Extensions运行在独立的空间中，两个Extensions之间只能通过系统提供的API来通信，不能互相访问内存或者文件系统，他们相互隔离，打包在一个App中。他们之间就想我们开发的第三方App的Sandbox一样，他们共享App的权限，例如App被授权访问联系人，那么这个Extension也可以访问联系人。如果在Extension中授权了访问联系人权限，系统会吧权限给App而不是这个Extension。

自定义键盘是一个特殊的Extension，它需要用户在系统设置里启用。当启用时，这个Extension将被用户用户在任何输入框中。因权限，自定义键盘默认运行在Sandbox中，它非常限制网络访问，API只能扩展用户输入数据。开发人员可以请求开放权限，系统会在用户同意后运行这个Extension。

通过自定义Extension，开发人员可以用第三方的键盘给自己的App。

# App Group

Apps和Extensions都是同一个开发账号下的话，他们可以共享他们的数据，当配置了App Group后。配置一次App Group, Apps就拥有一下访问权限。

* 分享磁盘中的存储数据
* 这些数据会被保存直到该Group下最后一个应用被删除。
* 共享Preferences
* 共享Keychain数据

每一个App Group IDs都是唯一的。

# Data Protection in apps

iOS有丰富的API让苹果内部开发人员和第三方开发者选择数据保护来确保他们的app安全。数据保护可以用在文件和数据库，包括`NSFileManager`, `CoreData`, `NSData`, `SQLite`.

系统的`Mail` app(包括附件)，被管理的书，Safari的书签，App运行图片，位置数据，被存储在安全的密码，用户的密码和指纹，日历(包括附件)，联系人，提醒事项，记事本，短信，照片都实现了`Protected Until First User Authentication`.

用户自己安装的Apps是没有特殊保护的，默认只有一种保护叫做`Protected Until First User Authentication`.
