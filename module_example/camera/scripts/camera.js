/**
 * 초기화
 */
function initPage() {
    loadScript('scripts/', 'CJCamera', onCompleteLoadContentsJS);
    function onCompleteLoadContentsJS() {
        pageBase.init( "camera_contents.js", onCompleteLoadContents );
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
        settingModule();
            break;
    }
}

/**
 * 모듈 설정
 */
function settingModule() {
    var mcConetnts = pageBase.getStepClip();

    externalManager.playSound( "bgm_1", true, 0.5, "");

    var cam = new CJCamera( mcConetnts.mcCamZone, mcConetnts.mcCamArea );
}