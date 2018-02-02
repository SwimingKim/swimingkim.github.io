/**
 * 초기화
 */
function initPage() {
    loadScript('scripts/', 'CJDrawing', onCompleteLoadContentsJS);
    function onCompleteLoadContentsJS() {
        pageBase.init( "testDrawing_contents.js", onCompleteLoadContents );
        pageBase.onChangeStep( onChangeStep );
        
        function onCompleteLoadContents() { }
    }
}

/**
 * 페이지 변경 콜백
 */
function onChangeStep(nStep) {
    switch (nStep) {
        case 0:
            setStep1();
            break;
    }
}

function setStep1() {
    var mcConetnts = pageBase.getStepClip();
    mcConetnts.funcComplete = function() {
        Util.log( "StepComplete 1" );
        pageBase.completeStep();
    }
    m_nowModule = new CJDrawing( mcConetnts, 10, "000000", mcConetnts.funcComplete );
    m_nowModule.initModule();
}