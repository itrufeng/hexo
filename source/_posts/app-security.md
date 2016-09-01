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
