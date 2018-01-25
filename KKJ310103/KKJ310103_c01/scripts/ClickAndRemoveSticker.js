// 생성자
// m_mcThis - 애니메이트cc로 출력된 결과물의 전체
// m_arrSticker - 모듈 내 드래그가 가능한 버튼들.
// completeCount - 정답을 맞춘 카운트.

function ClickAndRemoveSticker( mcThis, funcModuleComplete ) {
	var thisModule 				= this;
	var m_mcThis 				= mcThis;
	var m_funcModuleComplete 	= funcModuleComplete;
	var m_arrSticker 			= new Array();
	var completeCount 			= 0;

	var m_btnReplay;

// 모듈 초기화
	thisModule.initModule = function () {
		m_mcThis.gotoAndStop( 0 );
		if( m_mcThis[ "btnReplay" ] ) {
			m_btnReplay = m_mcThis[ "btnReplay" ];
			m_btnReplay.visible = false;
		}

		if( m_mcThis[ "mcMotionGuide" ] ) {
			m_mcThis[ "mcMotionGuide" ].mouseEnabled = false;
			m_mcThis[ "mcMotionGuide" ].visible = false;
			m_mcThis[ "mcMotionGuide" ].stop();
		}
		
		if( m_mcThis[ "btnReplay" ] ) {
			m_btnReplay = m_mcThis[ "btnReplay" ];
			m_btnReplay.visible = false;
		}

		if( pageBase.isCompleteStep() ) {
			gotoLast();
		} else {
			setEvent();
			setEnabled( true );
		}
	}

// 이벤트 설정
	function setEvent() {
		var mcSticker;
		for( var i = 0; i < m_mcThis.numChildren; i++ ) {
			mcSticker = m_mcThis[ "mcSticker" + i ];
			if( mcSticker == null ) {
				break;
			}
			mcSticker.gotoAndStop( 0 );
			mcSticker.addEventListener( "click", onClickSticker );
			m_arrSticker.push( mcSticker );
		}
		if( m_mcThis[ "mcMotionGuide" ] ) {
			m_mcThis[ "mcMotionGuide" ].visible = true;
			m_mcThis[ "mcMotionGuide" ].play();
		}
	}

// 버튼 가이드 활성화
	function setGuide( bEnabled ) {
		var mcDrag;
		for( var i = 0; i < m_mcThis.numChildren; i++ ) {
			mcDrag = m_mcContent[ "mcButton" + i ];
			mcDrag.mcInduce.visible = bEnabled;
		}
	}

// 사용성 설정
	function setEnabled( bEnabled ) {
		for( var i = 0; i < m_arrSticker.length ; i++ ) {
			m_arrSticker[i].mouseEnabled = bEnabled;
		}
	}

// 마우스클릭 이벤트 핸들러
	function onClickSticker( e ) {
		if( m_mcThis[ "mcMotionGuide" ] ) {
			m_mcThis[ "mcMotionGuide" ].visible = false;
		}
		
		var mcSticker = e.currentTarget;
		mcSticker.removeEventListener( "click", onClickSticker );
        setEnabled( false );
		pageBase.playEffect( "effRemovePostit", 1.0, "" );
		mcSticker.play();
        Util.setClipCompleteCallback( mcSticker, onCompleteAnim );

        function onCompleteAnim() {
			completeCount++;
			mcSticker.stop();
			setEnabled( true );
			moduleEndCheck();
		}
        //스토리보드의 특성으로 모듈의 확장이 필요할때 콜백을 생성자에서 새로 받아 쓰기.
	}

// 모듈 기능 완료체크.
// 생성시 받아둔 콜백을 실행하도록 한다.
	function moduleEndCheck() {
		if( completeCount == m_arrSticker.length ) {
			//if( this.m_fucDroped === 'function' ) {
				m_funcModuleComplete();
			//}

			if( m_btnReplay != null ){
				m_btnReplay.visible = true;
				m_btnReplay.addEventListener( "click", replay );
			}
		}
	}

// 학습 완료 이력이 존재할 경우 해당 모듈기능을 끝내도록 함.
	function gotoLast() {
		var mcSticker;
		for( var i = 0; i < m_mcThis.numChildren; i++ ) {
			mcSticker = m_mcThis[ "mcSticker" + i ];
			if( mcSticker == null ) {
				break;
			}
			mcSticker.gotoAndStop( mcSticker.totalFrames - 1 );
		}
	}

// 다시하기 버튼.
	function replayModule( e ) {
		m_btnReplay.removeEventListener( "click", replayModule );
		m_btnReplay.visible = false;

		var mcSticker;
		for( var i = 0; i < m_arrSticker.length; i++ ) {
			mcSticker.gotoAndStop( 0 );
		}
	}
}