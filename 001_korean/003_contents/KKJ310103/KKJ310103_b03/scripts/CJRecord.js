var m_mcThis;
var m_recorder;
var m_source;

function CJRecord( mcThis ) {
	m_mcThis = mcThis;

	init();
}

function init() {
	checkMic();

	m_mcThis.mcRecord.addEventListener("click", onClickRec);
	m_mcThis.mcListen.addEventListener("click", onClickListen);
}

// 마이크 입력을 확인한다.
function checkMic() {
	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
		window.URL = window.URL || window.webkitURL;

		m_audioContext = new AudioContext;
	} catch (e) {
		console.log('No web audio support in this browser!');
	}

	navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
		console.log('No live audio input: ' + e);
	});
	
	externalManager.playSound("bgm_1", true, 0.4, "");

}

// 녹음 모듈 활성화
function startUserMedia( stream ) {
	var input = m_audioContext.createMediaStreamSource(stream);
	m_recorder = new Recorder( input );
}

// 녹음 버튼 클릭
function onClickRec(e) {

	var bRecord = e.currentTarget.currentFrame == 2;
	if (!bRecord)
		startRecording();
	else
		stopRecording();
}

// 듣기 버튼 클릭
function onClickListen(e) {

	var bListen = e.currentTarget.currentFrame == 2;
	if (!bListen)
	    playBufferSound( startListening, stopListening );
	else
		stopListening();

}

function startListening() {

	m_mcThis.mcListen.gotoAndStop(2);
	
	m_mcThis.mcSignal.visible = true;
	m_mcThis.mcSignal.gotoAndStop( 1 );

	externalManager.pauseSound("bgm_1");

}

function stopListening() {

	m_source.stop();

	m_mcThis.mcSignal.visible = false;
	m_mcThis.mcSignal.gotoAndStop( 0 );

	externalManager.resumeSound("bgm_1");
	m_mcThis.mcListen.gotoAndStop(0);

	m_mcThis.mcRecord.mouseEnabled = false;

}

// 녹음 된 Buffer 사운드의 플레이
function playBufferSound( funcReady, funcComplete ) {
	m_recorder && m_recorder.exportWAV(function(blob) {
		var fileReader = new FileReader();

		fileReader.onload = function() {
			playByteArray( this.result, funcReady, funcComplete );
		};

		fileReader.readAsArrayBuffer(blob);
	});
}

// Buffer 플레이
function playByteArray( byteArray, funcReady, funcComplete ) {
	var arrayBuffer = new ArrayBuffer(byteArray.length);
	var bufferView = new Uint8Array(arrayBuffer);
	for (i = 0; i < byteArray.length; i++) {
		bufferView[i] = byteArray[i];
	}

	m_audioContext.decodeAudioData( byteArray, function( buffer ) {
		m_source = m_audioContext.createBufferSource();
		m_source.buffer = buffer;
		m_source.connect(m_audioContext.destination);
		m_source.start(0);
		m_source.onended = function() {
            funcComplete();
            m_mcThis.mcCompleteFeed.gotoAndPlay(0);
        };

		funcReady();
	});

}


// 녹음 시작
function startRecording() {

	m_mcThis.mcMic.visible = true;
	m_mcThis.mcMotionGuide.gotoAndStop( m_mcThis.mcMotionGuide.totalFrames-1 );
	Util.setTimeout(() => {
        m_mcThis.mcMotionGuide.gotoAndPlay(0);
    }, 20 * 1000);

	externalManager.pauseSound("bgm_1");
	m_mcThis.mcRecord.mouseEnabled = true;

	m_mcThis.mcListen.visible = false;
	
	m_recorder && m_recorder.record();
	m_recorder.clear();

	m_mcThis.mcMic.gotoAndStop(1);
    m_mcThis.mcRecord.gotoAndStop(2);
}

// 녹음 중지
function stopRecording() {

	m_mcThis.mcMic.visible = false;
	m_mcThis.mcMotionGuide.visible = false;
    m_mcThis.mcMotionGuide.gotoAndStop( m_mcThis.mcMotionGuide.totalFrames-1 );

	externalManager.resumeSound("bgm_1");

	m_mcThis.mcListen.visible = true;

    pageBase.completeStep();

	m_recorder && m_recorder.stop();

	m_mcThis.mcMic.gotoAndStop(0);
	m_mcThis.mcRecord.gotoAndStop(0);
}