var m_mcReading;
var m_scroll;
var m_nSpeed;

function CJScrollingSpeedControlReading(mcThis) {
    m_mcReading = mcThis;

    this.init();
}

CJScrollingSpeedControlReading.prototype.init = function () {

    m_mcReading.visible = false;

    m_mcReading.mcGuide.mcExplain.visible = false;

    m_mcReading.mcPlay.gotoAndStop(0);
    m_mcReading.btnStop.gotoAndStop(0);

    var gudieHeight = m_mcReading.mcGuide.nominalBounds.height;
    var maskHeight = m_mcReading.mcScroll.nominalBounds.height;
    if (gudieHeight > maskHeight)
        loadScript('scripts/', 'CJScroll', function () {
            m_scroll = new CJScroll(m_mcReading.mcGuide, m_mcReading.mcScroll, m_mcReading.mcWarning);
        });
    else {
        m_mcReading.removeChild(m_mcReading.mcWarning);
    }

    var arrSpeed = ['_0_8', '', '_1_2'];
    var strFileName = document.URL.substring(document.URL.lastIndexOf("/") + 1).replace(".html", "");
    var strSoundName;
    for (var i = 0; i < arrSpeed.length; i++) {
        strSoundName = 'sounds/' + strFileName + '_01_02' + arrSpeed[i] + '.mp3';
        console.log(strSoundName);
        externalManager.createSound("sound" + i, strSoundName);
    }

    m_nSpeed = 1;

    var mcBtn;
    for (var i = 0; i < m_mcReading.mcSpeedCont.numChildren; i++) {
        mcBtn = m_mcReading.mcSpeedCont.getChildByName("btn" + i);
        mcBtn.gotoAndStop( i==m_nSpeed ? 1 : 0);
        mcBtn.addEventListener("click", onClickSpeedControl);
    }

    m_mcReading.mcPlay.addEventListener("click", onClickPlay);
    m_mcReading.btnStop.addEventListener("click", onClickStop);
    m_mcReading.mcHint.addEventListener("click", onShowHint);    
    
    m_mcReading.visible = true;
    
    pageBase.completeStep();
    m_mcReading.mcSpeedCont.btn1.mcCheck.visible = false;
}

function onClickPlay(event) {

    var bPlaying = event.currentTarget.currentFrame == 0;
    if (!bPlaying) {
        setPauseState();
        return;
    }

    playReadingContent();

}

function onClickStop(event) {
    
    setPauseState();
    externalManager.seekSound(getCurrentSoundId(), 0);

}

function onClickSpeedControl(event) {
    var speed = event.currentTarget.name.substr("btn".length);
    if (speed == m_nSpeed) return;

    var mcBtn;
    for (var i = 0; i < m_mcReading.mcSpeedCont.numChildren; i++) {
        mcBtn = m_mcReading.mcSpeedCont.getChildByName("btn" + i);
        mcBtn.gotoAndStop(0);
    }

    var target = event.currentTarget;
    target.gotoAndStop(1);

    externalManager.pauseSound(getCurrentSoundId());
    var percentage = getSoundPercent(getCurrentSoundId());

    m_nSpeed = speed;
    
    var nSeekTime = Math.floor(percentage * externalManager.getSoundDuration(getCurrentSoundId()));
    if (percentage == 1)
        nSeekTime = 0;

    externalManager.seekSound(getCurrentSoundId(), nSeekTime);

    if ( m_mcReading.mcPlay.currentFrame == 0 ) return;

    externalManager.playSound(getCurrentSoundId(), false, 1, "onCompleteReadingContents");
    externalManager.resumeSound(getCurrentSoundId());

}

function onShowHint() {
    var bVisible = m_mcReading.mcGuide.mcExplain.visible;
    m_mcReading.mcHint.gotoAndStop( bVisible ? 0 : 1 );

    m_mcReading.mcGuide.mcExplain.visible = !bVisible;
}

function getCurrentSoundId() {
    return "sound" + m_nSpeed;
}

function getSoundPercent(id) {
    var currentSec = externalManager.getSoundCurrent(id);
    var totalSec = externalManager.getSoundDuration(id);
    return currentSec / totalSec;
}

function setPlayingState() {
    if (m_scroll)
        m_scroll.hideWarning();

    m_mcReading.mcPlay.gotoAndStop(1);

    var mcBtn;
    for (var i = 0; i < m_mcReading.mcSpeedCont.numChildren; i++) {
        mcBtn = m_mcReading.mcSpeedCont.getChildByName("btn" + i);
        mcBtn.gotoAndStop(0);
    }

    var btnTarget = m_mcReading.mcSpeedCont.getChildByName("btn"+m_nSpeed);
    btnTarget.gotoAndStop(1);
}

function setPauseState() {
    externalManager.pauseSound(getCurrentSoundId());
    m_mcReading.mcPlay.gotoAndStop(0);
}

function playReadingContent() {
    setPlayingState();

    externalManager.playSound(getCurrentSoundId(), false, 1, "onCompleteReadingContents");
    externalManager.resumeSound(getCurrentSoundId());
}

function onCompleteReadingContents(id) {

    externalManager.seekSound(getCurrentSoundId(), 0);
    setPauseState();

}