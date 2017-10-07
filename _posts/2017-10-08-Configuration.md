---
layout: post
title: 개발 설정
date: 2017-10-08 03:41:43
categories: Config
---

## ubuntu:16.04
```bash
apt-get updates
apt-get install git build-essential vim -y
```

## macOS
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Python
```bash
// ubuntu
sudo apt-get install ruby-full

// macOS
brew install python3
```

## nodejs : <https://nodejs.org/ko/download/package-manager/>
```bash
// ubuntu
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

// macOS
brew install node
```

## ruby : <https://www.ruby-lang.org/ko/downloads/>
```bash
// ubuntu
sudo apt-get install ruby-full ruby-build

// macOS
brew install/upgrade rbenv ruby-build
rbenv install -l
rbenv install 2.4.2
```
