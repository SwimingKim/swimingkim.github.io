---
title: Javascript Basic
date: 2017-10-06 03:20:51
categories: 
    - Programming Language
    - JavaScript
tags: [Programming, Study, JavaScript]
---

### 기본 자료형

```
기본자료형
  수치형(number), 문자형(string), 부울형(boolean),
  객체형(object), undefined
```

### 입출력

```javascript
alert("알러트다");
confirm("컴펌이다");
prompt("프롬프다", "여기 뭐게?");
```

### 조건문

```javascript
if (true) {} else {}

switch (x) {
    case 0:
        break;
    default:
}
```

### 반복문

```javascript
for (var i = 0; i < 10; i++) {
    document.write(i + "<br>");
}
for (var x in myCar) {
  var txt = myCar[x];
  document.write(txt + "<br>");
}

while (true) {
}

do {
} while (true);
```

### 함수

```javascript
function clac() {
    var x = document.getElementById("x").value;
    var sum = parseInt(x);
    document.getElementById("sum").value = sum;
}

func 함수이름(인자1, 인자2) {
  // 실행할 코드
  return 결과값;
}

func  msg(name, position) {
    alert(name + "과" + position);
}
var msg = function() {
    alert("안녕");
}
```

### 객체 생성

```javascript
var newCar = {
    model: "benz",
    color: "black",
    speed: 60,
    brake: function() {
        this.speed -= 100;
    },
    accel: function() {
        this.speed += 100;
    }
}

function bag(color, price, qulity) {
    this.color = color;
    this.price = price;
    this.quality = qulity;
    this.up = function() {
        this.price += 100;
    }
    this.down = function() {
        this.price -= 100;
    }
}
var miniBag = new bag("blue", 1000, 5);
document.write(miniBag.price + "<br>");
miniBag.down();
document.write(miniBag.price + "<br>");
// 기존 생성자에 추가
miniBag.spot = "서울";
miniBag.change = function() {
    miniBag.color = "black";
};

function Point(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
}
Point.prototype.getDistance = function(p) {
    return Math.sqrt(this.x * this.y + this.y * this.x);
}
```

### 클로져

```javascript
function makeCounterFunction(initVal) {
    var count = initVal;

    function Increase() {
        count++;
        console.log(count);
    }
    return Increase;
}
var counter1 = makeCounterFunction(0);
var counter2 = makeCounterFunction(10);
counter1();
counter2();
```

### 배열

```javascript
var haha = ["apple", 3, true];
var array1 = new Array();
var array2 = new Array("1", "2", "3");
```


### document 연관 메소드

```javascript
document.write("쓰기");
document.getElementById("id").value; // 해당 아이디 객체의 값
document.FormName["name"+0].value; // 이름이 FormName인 요소의 이름이 name0인 객체의 값
```