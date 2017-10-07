---
layout: post
title: MySQL 문법 정리
date: 2017-10-06 13:34:15
categories: Database
---

### CRUD

```sql
-- 설정
show databases;
use 테이블명;

-- 삽입
INSERT INTO user_db (`id`, `password`, `best_click_count`, `total_click_count`, `ctype`)
VALUES ('User6', '6666', 3, 10, 2);

-- 수정
UPDATE user_db SET `password`=2222 WHERE `id` = 'User2';

-- 삭제
DELETE FROM user_db WHERE `id` = 'User5';

-- 조회
SELECT*FROM user_db WHERE `id` = 'User4';
SELECT*FROM user_db WHERE `ctype` != 2;
SELECT*FROM user_db WHERE `total_click_count` BETWEEN 2 AND 6;
SELECT*FROM user_db WHERE `id` LIKE '%er%';
```
