/**
 * 초기화
 */
function initPage() {
    loadScript('scripts/', 'CJCamera', onCompleteLoadContentsJS);
    function onCompleteLoadContentsJS() {
        pageBase.init( "KKJ310103_b03_contents.js", onCompleteLoadContents );
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
        case 1:
            checkAnimation();
            break;
        case 2:
            settingModule();
            break;
    }
}

function checkAnimation() {
    var mcConetnts = pageBase.getStepClip();
    Util.setClipCompleteCallback( mcConetnts, introComplete );

    function introComplete() {
        pageBase.completeStep();
        pageBase.changeStep(true);
    }
}

function settingModule() {
    var mcConetnts = pageBase.getStepClip();
    externalManager.playSound( "bgm_1", true, 0.5, "");

    var cam = new CJCamera( mcConetnts.mcCam );
}