/**
created by NOD - 2017-12-12
Util
JS 에서 자주 사용되는 기능을 처리
*/
var Util = {};

/**
 * 로그를 표시한다. 브라우져가 지원하지 않을 경우 예외처리
 * @param strMess   로그 메시지
 */
Util.log = function( strMess ) {
	try {
		console.log( strMess );
	} catch ( exception ) {
		return;
	}
}

/**
 * 지정된 js 스크립트 파일을 로드하여 사용한다.
 * @param strPath           javascript 파일 경로
 * @param funcCompleteLoad  로드 완료 콜백
 */
Util.loadScript = function( strPath, funcCompleteLoad ) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = strPath;
    document.head.appendChild(script);

    if ( script.readyState ) {  //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                funcCompleteLoad();
            }
        };
    } else {  //Others
        script.onload = function(){
            funcCompleteLoad();
        };
    }
}

/**
 * 지정된 Array를 랜덤하게 섞는다.
 * @param arr   대상 Array
 */
Util.shuffle = function( arr ) {
  var currentIndex = arr.length, temporaryValue, randomIndex;

  while ( 0 !== currentIndex ) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

/**
 *지정된 무비클립이 종료되는 시점에 지정된 콜백을 호출한다.
 * @param
 * @param
 */
Util.setClipCompleteCallback = function( mcTarget, funcComplete ) {
    mcTarget.addEventListener( "tick", onTickClip );

    function onTickClip( e ) {
        if( mcTarget.currentFrame == mcTarget.totalFrames - 1 ) {
             mcTarget.removeEventListener( "tick", onTickClip );
             funcComplete();
        }
    }
}

/**
 * Error 를 찍는다.
 * @param
 * @param
 */
Util.error = function ( strErrorID, strMess ) {
    console.error( "ERROR : " + strErrorID + " : " + strMess );
}

/**
 * 일정한 시간 후에 콜백을 호출한다
 * @param {*완료콜백} onTimeout 
 * @param {*시간} nSec 
 */
Util.setTimeout = function(onTimeout, nSec) {
    createjs.Tween.get(null).wait(nSec).call(onTimeout);
}

/**
 * 일정한 시간 간격으로 콜백을 호출한다
 * @param {*반복콜백} onTimeout 
 * @param {*시간 간격} nSec 
 */
Util.setInterval = function(onTimeout, nSec) {
    createjs.Tween.get(null, {loop:true}).wait(nSec).call(onTimeout);
}

/**
 * 인터렉션이 있는 오브젝트들에게 애니메이션을 부여한다.
 * @param {*} arrObjects    애니메이션을 수행할 오브젝트 배열
 * @param {*} strAnimType   애니메이션 타입
 * @param {*} nDelay        재생 주기 (다음 오브젝트간의 사이) 
 * @param {*} funcCallback  재생 완료 후 콜백
 */
Util.objectAppearAnimation = function( arrObjects, strAnimType, nDelay, funcCallback ) {
    var endcheck = 0;

    switch( strAnimType ) {
        case "ENLARGE":
        {
            for( var i = 0; i < arrObjects.length; i++ ) {
                createjs.Tween.get( arrObjects[i] )
                    .wait( nDelay * i )
                    .to( { scaleX:1.1, scaleY:1.1 }, 450, createjs.Ease.getPowOut(2), {override:true} )
                    .call( end, [arrObjects[i]] );
            }
        
            function end( e ) {
                endcheck++;
                createjs.Tween.get( e ).to( { scaleX:1, scaleY:1 }, 700, createjs.Ease.getPowOut(4), {override:true} )
                .call( endcheck == arrObjects.length ? funcCallback : function(){} );
            }
            break;
        }
        case "ROTATE":
        {
            for( var i = 0; i < arrObjects.length; i++ ) {
                arrObjects[i].skewY = -180;
                createjs.Tween.get( arrObjects[i] )
                    .wait( nDelay * i )
                    .to( { skewY:0 }, 500, createjs.Ease.none, {override:true} )
                    .call( end, [arrObjects[i]] );
            }

            function end( e ) {
                endcheck++;
                if( endcheck == arrObjects.length ) funcCallback();
            }
            break;
        }
        case "APPEAR":
        {
            for( var i = 0; i < arrObjects.length; i++ ) {
                arrObjects[i].scaleX = arrObjects[i].scaleY = 0;
            }
            for( var i = 0; i < arrObjects.length; i++ ) {
                createjs.Tween.get( arrObjects[i] )
                    .wait( nDelay )
                    .to( { scaleX:1, scaleY:1 }, 500, createjs.Ease.getPowOut(2), {override:true} )
                    .call( end, [arrObjects[i]] );
            }
        
            function end( e ) {
                endcheck++;
                if( endcheck == arrObjects.length ) funcCallback();
            }
            break;
        }
    }
}