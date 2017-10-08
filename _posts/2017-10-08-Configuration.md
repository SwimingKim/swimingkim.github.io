---
layout: post
title: 개발 설정
date: 2017-10-08 03:41:43
categories: Config
tags: [programming, server]
---

## ubuntu:16.04
```
apt-get updates
apt-get install git build-essential vim -y
```

## macOS
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Python
```
// ubuntu
sudo apt-get install ruby-full

// macOS
brew install python3
```

## nodejs : <https://nodejs.org/ko/download/package-manager/>
```
// ubuntu
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E  -
sudo apt-get install -y nodejs

// macOS
brew install node
```

## ruby : <https://www.ruby-lang.org/ko/downloads/>
```
// ubuntu
sudo apt-get install ruby-full ruby-build

// macOS
brew install/upgrade rbenv ruby-build
rbenv install -l
rbenv install 2.4.2
```
