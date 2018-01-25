/**
 * 초기화
 */
function initPage() {
    loadScript('scripts/', 'IntroNextStep', function() {
        pageBase.init( "KKJ310103_a01_contents.js", onCompleteLoadContents );
        pageBase.onChangeStep( onChangeStep );
    });
    function onCompleteLoadContents() { }
}

/**
 * 페이지 변경 콜백
 */
function onChangeStep( nStep ) {
    switch( nStep ) {
        case 0:
            introAnimationCheck();
            break;
    }
}

function introAnimationCheck() {
    var mcConetnts = pageBase.getStepClip();
    m_nowModule = new IntroNextStep( mcConetnts );
    m_nowModule.initModule();
}