var m_mcPage, m_mcRecButton, m_btnListen, m_mcRec, m_mcLilac, m_audioContext, m_recorder, m_mcRecGuide, m_sound, m_nPosition, m_mcControl;

// 초기화
function initPage() {
	loadCJSObject( "lib", "KKJ110302_b05", "script/KKJ110302_b05.js", onCompleteLoadPage );
}

// 현재 페이지 로드 콜백
function onCompleteLoadPage( mcPage ) {
	m_mcPage = mcPage;
	m_stage.addChild( m_mcPage );

	setModule();

	checkMic();
}

// 모듈 설정
function setModule() {
	m_mcRecButton = m_mcPage.mcContents.mcRecordController.mcRec;
	m_btnListen = m_mcPage.mcContents.mcRecordController.btnRecordListen;
	m_mcRec = m_mcPage.mcContents.mcMic;
	m_mcLilac = m_mcPage.mcContents.mcText;
	m_mcRecGuide = m_mcPage.mcContents.mcWebCamGuide;
	m_mcControl = m_mcPage.mcContents.mcTextController;

	m_btnListen.alpha = .5;

	setEvent();
}

// 이벤트 설정
function setEvent() {
	m_mcRecButton.addEventListener( "click", onClickRec.bind(this) );
	m_btnListen.addEventListener( "click", onClickListen.bind(this) );

	m_mcControl.btnStop.addEventListener( "click", function( e ){ onClickControl( e, "stop" ); }.bind(this) );
	m_mcControl.btnPause.addEventListener( "click", function( e ){ onClickControl( e, "pause" ); }.bind(this) );
	m_mcControl.btnPlay.addEventListener( "click", function( e ){ onClickControl( e, "play" ); }.bind(this) );
}

// 마이크 입력을 확인한다.
function checkMic() {
	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
		window.URL = window.URL || window.webkitURL;

		m_audioContext = new AudioContext;
	} catch (e) {
		alert('No web audio support in this browser!');
	}

	navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
		alert('No live audio input: ' + e);
	});
}

// 녹음 모듈 활성화
function startUserMedia( stream ) {
	var input = m_audioContext.createMediaStreamSource(stream);
	m_recorder = new Recorder( input );

	startSong( "ar" );
}

// 노래를 시작한다.
function startSong( strType, nStartTime ) {
	createjs.Sound.stop();
	m_mcLilac.stop();

	m_mcControl.alpha = strType == "ar" ? 1 : .5;

	if( strType == "mr" ) {
		setControlMode( "pause" );
		playBufferSound( onReadyToPlay );	
		m_mcRecButton.alpha = m_btnListen.alpha = .5;
	}

	if( strType == "rec" ) {
		setControlMode( "pause" );
		onReadyToPlay();
		startRecording();
		m_mcRec.gotoAndStop( 1 );
	}

	if( strType == "ar" ) {
		setControlMode( "play" );
		onReadyToPlay();
	}

	function onReadyToPlay() {
		if( !nStartTime ) nStartTime = 0;
		m_sound = createjs.Sound.play( strType == "ar" ? "ar" : "mr", { offset:nStartTime } );

		if( nStartTime ) {
			m_mcLilac.play();
		} else {
			m_mcLilac.gotoAndPlay( 1 );
		}
		
		m_mcLilac.removeAllEventListeners();
		Util.setClipCompleteCallback( m_mcLilac, onCompleteSong.bind(this) );
	}

	function onCompleteSong() {
		if( strType == "rec" ) {
			stopRecording();
			m_mcRec.gotoAndStop( 2 );
			m_mcRecButton.gotoAndStop( 1 );
		}

		if( strType == "mr" ) {
			
		}

		m_mcRecButton.alpha = m_btnListen.alpha = m_mcControl.alpha = 1;
	}
}

// 녹음하기 버튼 이벤트 핸들러
function onClickRec( e ) {
	if( e.currentTarget.alpha < 1 ) return;
	startSong( "rec" );
}

// 들어보기 버튼 이벤트 핸들러
function onClickListen( e ) {
	if( e.currentTarget.alpha < 1 ) return;
	startSong( "mr" );
}

// 녹음 시작
function startRecording() {
	m_recorder && m_recorder.record();
	m_recorder.clear();
}

// 녹음 중지
function stopRecording() {
	m_recorder && m_recorder.stop();
}

// Buffer 플레이
function playByteArray( byteArray, funcReady ) {
	var arrayBuffer = new ArrayBuffer(byteArray.length);
	var bufferView = new Uint8Array(arrayBuffer);
	for (i = 0; i < byteArray.length; i++) {
		bufferView[i] = byteArray[i];
	}

	m_audioContext.decodeAudioData( byteArray, function( buffer ) {
		var source = m_audioContext.createBufferSource();
		source.buffer = buffer;
		source.connect(m_audioContext.destination);
		source.start(0);

		funcReady();
	});
}

// 녹음 된 Buffer 사운드의 플레이
function playBufferSound( funcReady ) {
	m_recorder && m_recorder.exportWAV(function(blob) {
		var arrayBuffer;
		var fileReader = new FileReader();

		fileReader.onload = function() {
			playByteArray( this.result, funcReady );
		};

		fileReader.readAsArrayBuffer(blob);
	});
}

// 컨트롤 버튼 이벤트 핸들러
function onClickControl( e, strType ) {
	if( m_mcControl.alpha < 1 ) return;
	
	switch ( strType ) {
		case "play":
			startSong( "ar", m_nPosition );
			setControlMode( "play" );
			break;
		
		case "stop":
			createjs.Sound.stop();
			m_nPosition = 0;
			m_mcLilac.gotoAndStop( 0 );
			setControlMode( "pause" );
			break;
		
		case "pause":
			m_nPosition = m_sound.position;
			createjs.Sound.stop();
			m_mcLilac.stop();
			setControlMode( "pause" );
			break;
	}



	Util.log( m_sound + " / " + m_nPosition );
}

// 음성 제어모드
function setControlMode( strType ) {
	if( strType == "play" ) {
		m_mcControl.gotoAndStop( "_play" );
	} else {
		m_mcControl.gotoAndStop( "_pause" );
	}
}

// 학습완료
function completeStudy() {
	Util.log( "완료!!!!!" );
}