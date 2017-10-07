---
layout: post
title: python 문법 정리
date: 2017-10-06 04:27:03
categories: Study
---

### 컴퓨터의 출력과 사용자의 입력

```python
print("출력합니다.")
num = input()
```

### 조건문

```python
if True :
    print("True입니다.")
elif False :
    print("False입니다.")
else :
    print("알 수 없습니다.")
```

### 반복문

```python
for row in list :
    print("{}입니다.".format(row))
for row in range(10) :
    print("{}입니다.".format(row))

# 리스트의 for문
names = ['철수', '영희', '바둑이', '귀도']
for i in range(len(names)):
    name = names[i]
    print('{}번: {}'.format(i+1, name))
for i, name in enumerate(names):
    print('{}번: {}'.format(i+1, name))

# 딕션너리의 for문
ages = {'Tod':35, 'Jane':23, 'Paul':62}
for key in ages.keys():
    print(key);
for value in ages.values():
    print(value);
for key in ages: # for key in ages.keys():
    print('{}의 나이는 {}입니다'.format(key, ages[key]))

while condition :
    pritn("반복하는 중입니다.")
```

### 집단 자료형

```python
# 리스트
mlist = [1,2,3,4]
mlist.appen(5) # 추가1
mlist += [6,7,8] # 추가2
check = mlist in 4 # 값 존재 확인
del(mlist[3]) # 삭제1
mlist.remove(8) # 삭제2 : 해당 값
mlist.pop(0) # 삭제3 : 인덱스

# 딕션너리
mdict = {
    'one' : 1,
    'two' : 2,
    'three' : 3,
}
mdict['one'] = 11 # 수정
mdict['three'] = 3 # 추가
del(mdict['one']) # 삭제1
mdict.pop('two') # 삭제2
mdict.clear() # 전부 삭제
tmpdict = {'one':100, 'two':200}
mdict.update(tmpdict)

# 튜플
tuple1 = (1, 2, 3)
typle2 = 1,2,3
tuple3 = tuple(list1)
c = (3, 4) # packing
d, e = c # unpacking
f = d, e # packing
```

### 함수    

```python
def mfunc() :
    print("함수입니다.")
```

### 클래스

```python
class mCls(부모) :
    def __init__(self, user) :
        self.user = user;
```
