---
title: weak-and-unowned
date: 2016-04-12 16:03:05
tags:
---
### 简单解释

首先她们都是弱引用，不会让retainCount数增加。区别是，unowned常用在自己写程序时候，明确知道这里的值不为空，所以引用的对象不是Optional类型，而weak是不确定此时值是否存在，是Optional类型。

请看例子

#### weak

```swift
xxx.callback { [weak self] in
  self?.property
}
```

#### unowned

```swift
xxx.callback { [unowned self] in
  self.property
}
```

### 出处

[Apple Doc](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html)

请看一下两部分

* Weak References
* Unowned References
