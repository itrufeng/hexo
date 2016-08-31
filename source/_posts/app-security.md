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
