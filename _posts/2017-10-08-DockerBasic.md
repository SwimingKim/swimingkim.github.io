---
layout: post
title: Docker 명령어
date: 2017-10-08 02:44:08
categories: Config
---

## Docker Images
```bash
docker search ubuntu:16.04
docker pull ubuntu:16.04

docker images
docker rmi [Image]
```

## Docker Containers
```bash
docker run -it 
--v \host\data\path\:\docker\data\path\
-p host_port:guest_port --name mdocker
ubuntu:16.04 /bin/bash

docker ps
docker ps -a

docker start [Container]
docker attach [Container]
docker exec -it [Container]

docker stop [Container]
docker rm [Container]
```