---
title: use-docker-by-vagrant-not-docker-machine
date: 2016-04-02 16:02:52
tags:
---
## Vagrant VS docker-machine

* Vagrant
  有更多的虚拟机基础包可以选择，而docker-machine只有一个基础包。
* Vagrant可以使用brew安装和卸载，docker-machine不可以。
* Vagrant提供文件同步等插件，还有网络ip等方便的配置文件，docker-machine需要命令can
参数，不直观。

## 安装Vagrant

`brew cask install vagrant`

## 使用Vagrant创建一个带有docker的虚拟机

`vagrant init williamyeh/ubuntu-trusty64-docker`

## 给虚拟机一个ip，方便以后访问

释放这条配置

`config.vm.network "private_network", ip: "192.168.33.10"`

## 同步本目录到虚拟机中

释放这条配置，并修改。主要需要`rsync`。

`config.vm.synced_folder "./", "/vagrant_data", type: "rsync"`

## 启动虚拟机

`vagrant up`

## 进入虚拟机

`vagrant ssh`

接下来，就可以使用docker啦。

## 同步文件目录，当文件被修改的时候。

`vagrant rsync-auto`

## 参考文章

* [RSYNC](https://www.vagrantup.com/docs/synced-folders/rsync.html)
* [RSYNC-AUTO](https://www.vagrantup.com/docs/cli/rsync-auto.html)
