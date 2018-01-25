
function IntroNextStep( mcThis ) {
	var thisModule = this;
	thisModule.m_mcThis = mcThis;
	pageBase.setVisibleGNB( false );

// 모듈 초기화
	thisModule.initModule = function () {
    	externalManager.playSound( "bgm_intro", true, 1.0, "" );
		setEvent();
	}

// 이벤트 설정
	function setEvent() {
		thisModule.m_mcThis.btnNext.addEventListener( "added", onAddedbtnNext );
	}

// added 이벤트 핸들러
	function onAddedbtnNext( e ) {
		var btnNext = e.currentTarget;
		btnNext.removeEventListener( "added", onAddedbtnNext );
		btnNext.addEventListener( "click", onClickbtnNext );
	}

	function onClickbtnNext( e ) {
		var btnNext = e.currentTarget;
		btnNext.removeEventListener( "click", onClickbtnNext );
		pageBase.completeStep();
        pageBase.changeStep(true);
	}
}