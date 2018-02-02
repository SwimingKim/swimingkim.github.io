/**
Util
JS 에서 자주 사용되는 기능을 처리
*/
var Util = {};

// 로그를 표시한다. 브라우져가 지원하지 않을 경우 예외처리
Util.log = function( strMess ) {
	try {
		console.log( strMess );
	} catch ( exception ) {
		return;
	}
}

// 지정된 js 스크립트 파일을 로드하여 사용한다.
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

// 지정된 Array를 랜덤하게 섞는다.
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

// 무비클립이 종료되는 시점에 콜백하는 이벤트 설정
Util.setClipCompleteCallback = function( mcTarget, funcComplete ) {
    mcTarget.addEventListener( "tick", onTickClip );

    function onTickClip( e ) {
        if( mcTarget.currentFrame == mcTarget.totalFrames - 1 ) {
             mcTarget.removeEventListener( "tick", onTickClip );
             funcComplete();
        }
    }
}