// 생성자
// m_mcThis         - 애니메이트cc로 출력된 결과물의 전체(constStep)
// thickness        - 펜의 두께 설정.
// defaulPenColor   - 시작시 기본 펜 색상.
// completeCount    - 정답을 맞춘 카운트.

// moduleType - 모듈 타입. 
//			0 : 비순차 정답 처리
//			1 : 순차 정답 처리    (문제(mcClip)순서 기준)
// 이하 미구현, 확장 가능성 또는 분리.(지저분함)
//			2 : 각 클립당 보기 재정렬 비순차
//			3 : 각 클립당 보기 재정렬 순차

//CJWriting.prototype = stepBase;

function CJDrawing( mcThis, thickness, defaulPenColor, funcModuleComplete ) {
	var thisModule = this;
    thisModule.m_mcThis = mcThis;
    thisModule.m_funcModuleComplete = funcModuleComplete;
    
	thisModule.m_nthickness			= thickness;
	thisModule.m_strDefaulPenColor	= defaulPenColor;
	thisModule.completeCount = 0;

	thisModule.m_mcPaper;
	thisModule.m_arrContext;
	thisModule.m_context = null;

	thisModule.m_btnUndo;
	thisModule.m_btnClear;
	thisModule.m_btnComplete;
	thisModule.m_mcWarning;
	
	thisModule.m_btnReplay = null;

// 모듈 초기화
	thisModule.initModule = function () {
		thisModule.m_mcPaper = thisModule.m_mcThis[ "mcPaper" ];
		thisModule.m_arrContext = new Array();

		thisModule.m_context = new createjs.Shape();
		thisModule.m_mcPaper.addChild( thisModule.m_context );

		thisModule.m_btnUndo = thisModule.m_mcThis[ "btnUndo" ];
		thisModule.m_btnClear = thisModule.m_mcThis[ "btnClear" ];
		thisModule.m_btnComplete = thisModule.m_mcThis[ "btnComplete" ];
		thisModule.m_mcWarning = thisModule.m_mcThis[ "mcWarning" ];

		thisModule.m_btnComplete.stop();

        /*
		if( thisModule.m_mcThis[ "mcMotionGuide" ] ) {
			thisModule.m_mcThis[ "mcMotionGuide" ].visible = false;
			thisModule.m_mcThis[ "mcMotionGuide" ].stop();
		}*/
		
		if( !pageBase.isCompleteStep() ) {
			gotoLast();
		} else {
			setEvent();
		}
	}

// 이벤트 설정
	function setEvent() {
        thisModule.m_mcPaper.mcDrawingArea.addEventListener( "mousedown", onMouseDown );
        /*
		function playMotionGuide() {
			if( thisModule.m_mcThis[ "mcMotionGuide" ] ) {
				setEnabled( true );
				thisModule.m_mcThis[ "mcMotionGuide" ].visible = true;
				thisModule.m_mcThis[ "mcMotionGuide" ].play();
				Util.setClipCompleteCallback( thisModule.m_mcThis[ "mcMotionGuide" ], completeInit );
			}
		}*/

		thisModule.m_btnUndo.addEventListener( "click", onClickUndo );
		thisModule.m_btnClear.addEventListener( "click", onClickClear );;
		thisModule.m_btnComplete.addEventListener( "click", onClickComplete );;

		setEnabled( true );
	}

// 사용성 설정
	function setEnabled( bEnabled ) {
		thisModule.m_mcPaper.mouseEnabled = bEnabled;
		thisModule.m_btnUndo.mouseEnabled = bEnabled;
		thisModule.m_btnClear.mouseEnabled = bEnabled;
		thisModule.m_btnComplete.mouseEnabled = bEnabled;
    }

// 그리기 시작을 위한 펜 세팅
	function onStartDraw( ptPaper ) {
		thisModule.oldPt = new createjs.Point( ptPaper.x, ptPaper.y );
		thisModule.oldMidPt = thisModule.oldPt.clone();
	}

// 마우스다운 이벤트 핸들러
	function onMouseDown( e ) {
        /*
		if( thisModule.m_mcThis[ "mcMotionGuide" ].visible ) {
			thisModule.m_mcThis[ "mcMotionGuide" ].gotoAndStop( thisModule.m_mcThis[ "mcMotionGuide" ].totalFrames - 1 );
			thisModule.m_mcThis[ "mcMotionGuide" ].visible = false;
		}*/
		var ptPaper = thisModule.m_mcPaper.globalToLocal( e.stageX, e.stageY );
        thisModule.m_mcPaper.addEventListener( "pressup", onMouseUp );
		thisModule.m_mcPaper.addEventListener( "pressmove", onMouseMove );
		
		thisModule.arrPoints = null;
		thisModule.arrPoints = new Array();
		getPoint( e.type, ptPaper );
	}

// 마우스무브 이벤트 핸들러
	function onMouseMove( e ) {
		var ptPaper = thisModule.m_mcPaper.globalToLocal( e.stageX, e.stageY );
		bMouseOut = thisModule.m_mcPaper.mcDrawingArea.hitTest( ptPaper.x, ptPaper.y );
		if(!bMouseOut) onMouseOut( ptPaper );
		getPoint( e.type, ptPaper );
	}

// 마우스 업 이벤트 핸들러
	function onMouseUp( e ) {
		thisModule.m_mcPaper.removeEventListener( "pressup", onMouseUp );
		thisModule.m_mcPaper.removeEventListener( "pressmove", onMouseMove );

		var ptPaper = thisModule.m_mcPaper.globalToLocal( e.stageX, e.stageY );
		getPoint( e.type, ptPaper );
	}

// 마우스아웃 처리 메서드
	function onMouseOut( ptPaper ) {
		thisModule.m_mcPaper.removeEventListener( "pressup", onMouseUp );
		thisModule.m_mcPaper.removeEventListener( "pressmove", onMouseMove );
		getPoint( "pressup", ptPaper )
	}


// 각 이벤트 후처리.
	function getPoint( eventType, pt ) {
		switch( eventType )
		{
			case "mousedown":
			{
				thisModule.arrPoints.push( pt );
				onStartDraw( pt );
				break;
			}
			case "pressup":
			{
				thisModule.m_arrContext.push( thisModule.arrPoints );
				onDrawScreen( thisModule.m_arrContext );
				break;
			}
			case "pressmove":
			{
				thisModule.arrPoints.push( pt );
				Drawer( pt, thisModule.oldPt, thisModule.oldMidPt );
				break;
			}
		}
	}

// 선을 화면에 그림
// 현재점을 전달받아 이전점을 갱신하며 실시간으로 그려낸다.
	function Drawer( pt ) {
		var midPt = new createjs.Point( thisModule.oldPt.x + pt.x >> 1, thisModule.oldPt.y + pt.y >> 1 );
		thisModule.m_context.graphics.setStrokeStyle( thisModule.m_nthickness, 'round', 'round' )
										.beginStroke( thisModule.m_strDefaulPenColor ).moveTo( midPt.x, midPt.y )
										.curveTo( thisModule.oldPt.x, thisModule.oldPt.y, thisModule.oldMidPt.x, thisModule.oldMidPt.y );
		thisModule.oldPt.x = pt.x;
		thisModule.oldPt.y = pt.y;
		thisModule.oldMidPt.x = midPt.x;
		thisModule.oldMidPt.y = midPt.y;
	}

// mouseup이벤트 호출시 완성된 그림을 한번에 그려낸다.
	function onDrawScreen() {
		thisModule.m_context.graphics.clear();
		var currentArray;
		for( var i = 0; i < thisModule.m_arrContext.length; i++ ) {
			currentArray = thisModule.m_arrContext[i];
			onStartDraw( currentArray[0] );

			for( var j = 1; j < currentArray.length; j++ ) {
				Drawer( currentArray[j] );
			}
		}
	}

// 현재 단계에서 마지막 획 제거
	function onClickUndo( e ) {
		if( thisModule.m_arrContext.length == 0 ) return;
		thisModule.m_arrContext.pop();
		onDrawScreen();
	}

// 화면 전체 지우기
	function onClickClear( e ) {
		if(  thisModule.m_arrContext.length == 0 ) return;
		thisModule.m_context.graphics.clear();
		thisModule.m_arrContext = null;
		thisModule.m_arrContext = new Array();
	}

// 완료버튼 클릭
	function onClickComplete( e ) {
		setEnabled( false );
		if( thisModule.m_arrContext.length == 0 ) {
			thisModule.m_mcWarning.play();
			Util.setClipCompleteCallback( thisModule.m_mcWarning, onCompleteAnim );
		} else {
			moduleEndCheck();
		}

		function onCompleteAnim() {
			setEnabled( true );
		}
	}

// 모듈 기능 완료체크.
// 생성시 받아둔 콜백을 실행하도록 한다.
	function moduleEndCheck() {
		//if( this.m_fucDroped === 'function' ) {
			thisModule.m_funcModuleComplete();
		//}

		if( thisModule.m_btnReplay != null ){
			thisModule.m_btnReplay.visible = true;
			thisModule.m_btnReplay.addEventListener( "click", thisModule.replay );
		}
	}

// 학습 완료 후 다시 모듈을 읽어오면 완료화면으로 전환함.
	function gotoLast() {
		
	}
}