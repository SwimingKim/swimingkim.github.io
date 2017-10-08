---
layout: post
title: actionscript 문법 정리
date: 2017-10-06 13:47:36
categories: Study
tags: [programming, actionscript]
---

### 자료형  
```
int, uint  
Number  
Boolean  
String  
Array
Object  
```

### 출력
```actionscript
trace( ~~ );
```

### 반복문, 조건문
if, switch, while, for

### 변수선언
```actionscript
var name:String;
```

### 예외 처리
```actionscript
var strName:String; 
var maxLength:int = 5;
function setName( newName:String ) : void {

    if ( newName.indexOf(" ")==0 ) {
        throw new Error("Invalid Error");
    } else if ( newName=="" ) {
        throw new Error("Short Error");
    } else if ( newName.length > maxLength ) {
        throw new Error("Long Error");
    }

    strName = newName;
}

//////////////////

try {
    setName(" "); // "" || "ABCDEFGH"
} catch ( e:Error ) {
    trace( e.message );
} finally {
    trace( "finally" );
}
```

### 가비지 컬랙션   
: 메모리에서 객체를 자동으로 제거해 주는 것
```actionscript
class Garbage {
    var a:MovieClip;

    var b:MovieClip;
    var c:MovieClip;

    function Garbage {
        a = new MovieClip();

        b = new MovieClip();
        c = b;
        b = null;
        c = null;

        var d:String = new MovieClip();
    }
}
```

### 동적 액션 스크립트  
```actionscript
var mc : MovieClip = new MovieClip();
mc.outline = "black";
mc.innerline = "white";

for (var strName:* in mc) {
    trace( "변수명 : ", strName, "변수값 : ", mc[strName] );
}
```

### prototype  
: 객체를 참조하는 static 변수  
*prototype 체인*   
: 변수의 값을 정할 때 액션스크립트에서 검색하는 prototype 객체들의 목록

```actionscript
MovieClip.prototype.coder = "Dev";

var mc:MovieClip = new MovieClip();
trace( mc.coder );
```
```actionscript
var Employee:Function = function Employee( age:int, salary:int ) {

    this.age = age;
    this.salary = salary;
}

var worker = new Employee( 25, 27000 );
trace( worker.age );
```

### 스코프   
: 코드가 실행되는 프로그램의 물리적인 영역  
(전역스코프, 클래스스코프, static메서드 스코프, 인스턴스메서드 스코프)
```actionsactionscriptcript
package {
    // 전역 스코프

    class Scope {
        // 클래스 스코프

        function Scope() {

        }

        static function staticMethod() : void {         
            // static 메소드 스코프
        }

        function instanceMethod() : void {
            // 인스턴스 메소드 스코프

            function funcMethod() : void {
                // 함수 스코프
            }
        }
    }
}
// 전역 스코프
```

### 네임스페이스  
: 겹치지 않는 이름의 집합  
1) 이름이 충돌하는 것을 막을 수 있다
2) 프로그램의 패키지 구조와 상관없이 전체 프로그램을 통해 커스텀 레벨의 접근 가능 여부를 메서드와 변수에 대해 지정할 수 있다
3) 클래스에서 변수나 메서드에 대한 접근성을 반드시 요청하도록 하는 허용기반의 접근 제어를 구현할 수 있다
4) 프로그램에서 여러 '모드'를 구현할 수 있다.

```actionscript
package {

    namespace dev = "http://skim.kr/dev"

}
```
```actionscript
dev var nLang : int = 5;

trace( "네임스페이스 : ", dev.uri );
trace( dev::nLang );
```

### 디스플레이 API
1. DisplayObject : 스크린 표시 담당
2. InteractiveObject : 상호작용
3. DisplayObjectContainer : 그래픽 기능
4. Sprite, MovieClip, Stage, Loader : 빈 컨테이너 구조
- 디스플레이 리스트
: 플래시 런타임에서 현재 화면에 나타난 모든 그래픽 객체의 계층 리스트

```actionscript
(컨테이너).addChild( 오브젝트 );
(컨테이너).addChildAt( 오브젝트, depth );
(컨테이너).addChildAt( 오브젝트, (컨테이너).getChildIndex(다른오브젝트) );

(컨테이너).removeChild( 오브젝트 );
(컨테이너).addChildAt( depth );
```
```actionscript
while (numChildren > 0) {
    removeChildAt(numChildren-1);
}
```

### 이벤트
1. 종류  
(1) 디스플레이 계층에 있지 않는 이벤트 전달  
(2) 디스플레이 계층구조에 속해있는 이벤트 전달 - 모든 조상이 이벤트를 전달받는다  

2. 단계  
(1) 캡처 단계 : 대상 객체의 조상들이 이벤트를 전달받는다  
(2) 타깃 단계 : 이벤트 대상이 이벤트를 전달받는다  
(3) 버블링 단계 : 대상 객체가 이벤트를 성공적으로 받았다는 사실을 조상이 전달받는다(Optional)  

```actionscript
(이벤트 대상).addEventListener( Event타입, 이벤트리스너, useCapture=false, priority );

(부모객체).addEventListener( Event타입, 이벤트리스너, true ); // 캡처 단계
(부모객체).addEventListener( Event타입, 이벤트리스너, false ); // 버블링 단계
(이벤트 대상).addEventListener( Event타입, 이벤트리스너, false );
```
```actionscript
function onEvent( e:Event ) : void {

    e.CAPTURING_PHASE // 1(캡처단계)
    e.AT_TARGET // 2(타겟단계)
    e.BUBBLING_PHASE // 3(버블링단계)

    e.stopImmediatePropagation();
    // 이벤트 전달을 즉시 멈추고, 남아있는 리스너를 실행시키지 않음
    e.stopPropagation();
    // 현재 이벤트를 전달받은 객체에 등록된 나머지 이벤트 리스너가 모두 실행된 다음 이벤트를 멈춤
}
```

### 상호작용     
: InteractiveObject인스턴스를 상속받은 클래스의 인스턴스에만 전달된다
1. 마우스 이벤트
2. 포커스 이벤트
3. 키보드 이벤트
4. 텍스트 이벤트
5. 플래시 플레이어 이벤트

### 화면 갱신    
1. 정기적인 갱신  
(1) 현재 프레임의 코드를 실행시킨다( 이벤트가 발생했다면, 이벤트 리스너가 이때 실행된다 )  
(2) 화면을 갱신한다  
(3) 다음 프레임으로 이동한다  

2. 특정 이벤트 리스너 갱신  
MouseEvent.*, KeyEvent.*, Event.RENDER 

```actionscript
addEventListener( Event.RENDER, onRender );

function onRender() : void {

    // custom code

    if( stage != null ) {
        stage.invalidate();
    }
}
```

### Timer
```actionscript
addEventListener( TimerEvent.TIMER, onTimer );
function onTimer( e:TimerEvent ) : void {

    // custom code
}

// 선언1
var timer:Timer = new Timer();
timer.delay = 100;
timer.repeatCount = 5;
// 선언2
var timer:Timer = new Timer( nDelay:int, nRepeatCount:int=0 );

timer.start();
```

### addFrameScript  
% 일정한 레이블과 마지막 프레임에 스크립트 추가  

*연속적으로 이어지는 무비클립*  
```actionscript
var mc:MovieClip; // 무비클립 불러오기

for (var i:int = 0; i < mc.currentLabels.length; i++) {
    var frameLabel:FrameLabel = mc.currentLabel[i] as FrameLabel;
    if (frameLabel.name.indexOf("_problem") == 0) {
        mc.addFrameScript(frameLabel.frame-1, onProblem); // 레이블 추가
    }
}
mc.addFrameScript(mc.totalFrames-1, onFinish); // 종료 추가

function onProblem():void {
}
function onFinish():void {
}
```
*일정한 프레임을 가지는 무비클립*
```actionscript
var mc:MovieClip; // 무비클립 불러오기

var i:int;
for (i=0; i<mc.totalFrames; i++) {
    mc.addFrameScript( i, onChanged );
}

function onChanged():void {
   
    for (i=0; i<mc.currentLabels.length; i++) {
        var frameLabel:FrameLabel = mc.currentLabel[i] as FrameLabel;
        if (frameLabel.name.indexOf("_problem") == 0) {
        mc.addFrameScript(frameLabel.frame-1, onProblem); // 레이블 추가
    }
    mc.addFrameScript(mc.totalFrames-1, onFinish);
}

function onProblem():void {
}
function onFinish():void {
}
```
