/**
 * 초기화
 */
function initPage() {
    cjsManager.makeCanvasElements("bg", 1280, 800);

    pageBase.init("KKJ310103_b01_contents.js", onCompleteLoadContents);
    
    function onCompleteLoadContents() {
        pageBase.onChangeStep(onChangeStep);
    }
}

/**
 * 페이지 변경 콜백
 */
function onChangeStep(nStep) {
    switch (nStep) {
        case 0:
            checkAnimation();
            break;
        case 1:
            settingModule();
            break;
    }
}

function settingModule() {
    loadScript('scripts/', 'CJScrollingSpeedControlReading', function () {
        var mcConetnts = pageBase.getStepClip();

        var m_reading = new CJScrollingSpeedControlReading(mcConetnts);
    });

    externalManager.playSound("bgm_1", true, 0.4, "");
}

function checkAnimation() {
    var mcClip = pageBase.getStepClip();
    pageBase.setGNBNextenable( true );
    Util.setClipCompleteCallback(mcClip, function() {
        pageBase.completeStep();
        pageBase.changeStep(true);
    });
}