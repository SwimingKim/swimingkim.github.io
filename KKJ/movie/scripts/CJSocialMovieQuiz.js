var m_mcThis;

function CJSocialMovieQuiz(mcThis) {
    m_mcThis = mcThis;

    init();
}

function init() {

    externalManager.playSound( "bgm_1", true, 1, "");
    
    m_mcButtons = new Array();
    var mcButton;
    for (var i = 0; i < m_mcThis.numChildren; i++) {
        mcButton = m_mcThis.getChildByName("mcButton" + i);

        if (!mcButton) break;
        mcButton.gotoAndStop(i);
        mcButton.mouseChildren = true;
        mcButton.addEventListener("click", onClickButton);

        m_mcButtons.push(mcButton);
    }

    if (m_mcThis.mcReplay != undefined)
        m_mcThis.mcReplay.addEventListener("click", replay);


}

function onClickButton(event) {

    m_mcThis.mcButton0.mcBtnBG.gotoAndStop(0);
    var target = event.currentTarget;
    
    var bg = target.mcBtnBG;
    bg.gotoAndStop(1);
    enabled(false);
    
    var bRight = target.name == "mcButton1";
    var strSoundName = "eff" + (bRight ? "Right" : "Wrong");
    if (bRight) {
        pageBase.playEffect(strSoundName, 1, "");
        
        m_mcThis.mcLight.gotoAndStop(1);
        
        m_mcThis.mcO.gotoAndPlay(1);
        Util.setClipCompleteCallback(m_mcThis.mcO, onCompleteRightFeedback);
    }
    else {
        pageBase.playEffect(strSoundName,  1, "");
    
        m_mcThis.mcLight.gotoAndStop(2);
        m_mcThis.mcLight.mcAniWrong.gotoAndPlay(0);
        
        Util.setClipCompleteCallback(m_mcThis.mcLight.mcAniWrong, onCompleteWrongFeedback);
    }

    function onCompleteRightFeedback() {
        m_mcThis.mcO.stop();

        pageBase.completeStep();
        Util.setTimeout(function() {
            pageBase.changeStep(true);
        }, 3000);
    }
    
    function onCompleteWrongFeedback() {
        enabled(true);
        m_mcThis.mcLight.mcAniWrong.stop();
        
        m_mcThis.mcButton0.mcBtnBG.gotoAndStop(0);
    }

}

function onMouseUpButton(event) {
    var target = event.currentTarget;
    var bg = target.mcBtnBG;
    bg.gotoAndStop(0);
}

function replay(event) {
    for (var i = 0; i < m_mcButtons.length; i++) {
        m_mcButtons[i].mcBtnBG.gotoAndStop(0);
    }

    m_mcThis.mcLight.gotoAndStop(0);
    m_mcThis.mcO.gotoAndStop(0);

    enabled(true);
}

function enabled(b) {
    for (var i = 0; i < m_mcButtons.length; i++) {
        m_mcButtons[i].mouseEnabled = b;
    }
}

onSoundComplete = function(event) {
    m_mcThis.mcButton0.mcBtnBG.gotoAndStop(0);
}