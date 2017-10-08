---
layout: post
title: Swift 문법 정리
date: 2017-10-06 13:45:07
categories: Study
tags: [programming, swift, iOS]
---

### 자료형

```swift
Int, Double&Float
Bool
String, Character
```

### 조건문

```swift
if true {

} else if false {

} else {

}

guard true else {

}

var val = 1
switch val {
    case 0:

    case 1:

    default:

}

```

### 반복문

```swift
for row in 1...2 {
    print("\(i)입니다")
}

while true {

}

repeat {

}
while true
```

### 집단 자료형

```swift
배열 = Array<String>, [String]
세트 = Set<String>(), Set
튜플 = (String, Int)
딕션너리 = Dictionary<String, Int>, [String : Int]
```

### 옵셔널

```swift
var temp : Int? = Int("123")
print(temp!)

var temp : Int! = Int("123")
print(temp)
```

### 함수

```swift
func printHello(name : String, _ msg : String, newline : Bool = true) {
    var name = name
    name = name + "님"
    print("\(name), \(msg)", newline)
}

var count = 30
print(foo(paramCount: &count))
print(count)
```

### 클로저 (자바의 람다)

```swift
{ () -> () in
    print("클로저가 실행됩니다")
}
```

### 구조체(값복사), 클래스(참조복사)

```swift
struct Resolution {

}

class VideoMode {
    var name : String?

    init(name : String) {
        self.name = name
    }
}
```

### 프로퍼티

```swift
1. 저장 프로퍼티
class User {
    var name : String = ""
    lazy var value : String {
        print("value excute")
        return value
    }()
}

2. 연산 프로퍼티
struct UserInfo {

    var thisYear : Int! {
        get {
            let df = DateFormatter()
            df.dateFormat = "yyyy"
            return Int(df.string(from : Date()))
        }
        set {

        }
    }

}

3. 타입 프로퍼티
struct Foo {
    static var sFoo = "구조체 타입 프로퍼티값"
}
Foo.sFoo = "새로운 값"

```

### 상속

```swift
class Car : Vehicle {

    var engineLevel = 0
    override var currentSpeed : Double {
        get {
            return Double(self.engineLevel * 50)
        }
        set {

        }
    }

}
```
