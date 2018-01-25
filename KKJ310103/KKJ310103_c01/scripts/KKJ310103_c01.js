//Step1.prototype = stepBase;
/**
 * 초기화
 */
function initPage() {

    loadScript('scripts/', 'ClickAndRemoveSticker', onCompleteLoadContentsJS);
    function onCompleteLoadContentsJS() {
        pageBase.init( "KKJ310103_c01_contents.js", onCompleteLoadContents );
        pageBase.onChangeStep( onChangeStep );
        
        function onCompleteLoadContents() { }
    }
}

/**
 * 페이지 변경 콜백
 */
function onChangeStep( nStep ) {
    switch( nStep ) {
        case 0:
            externalManager.seekSound("bgm_1", 0);
            externalManager.pauseSound("bgm_1");
            introAnimationCheck();
            break;
        case 1:
            externalManager.playSound("bgm_1", true, 1, "");
            cjsManager.deletePlayingId("bgm_1");
        case 2:
        case 3:
        case 4:
            setContentStep();
            break;
    }
}

function introAnimationCheck() {
    var mcConetnts = pageBase.getStepClip();
    pageBase.setGNBNextenable( true );

    Util.setClipCompleteCallback( mcConetnts, introComplete );

    function introComplete() {
        pageBase.completeStep();
        pageBase.changeStep(true);
    }
}

function setContentStep() {
    var mcConetnts = pageBase.getStepClip();
    mcConetnts.funcComplete = function() {
        pageBase.completeStep();
    }
    m_nowModule = new ClickAndRemoveSticker( mcConetnts, mcConetnts.funcComplete );
    m_nowModule.initModule();
}