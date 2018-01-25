/**
 * 초기화
 */
function initPage() {
    pageBase.init("KKJ310103_b02_contents.js", onCompleteLoadContents);
    
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
            var menu = externalManager.getMenuIndex();
            var strData = menu+"/"+nStep;
            externalManager.setInstantData(strData);
            location.replace("./KKJ310103_b02_01.html");
            break;
        case 2:
            pageBase.completeStep();
            externalManager.nextMenu();
            break;
    }
}

function checkAnimation() {
    var mcClip = pageBase.getStepClip();
    pageBase.setGNBNextenable( true );
    Util.setClipCompleteCallback(mcClip, function() {
        pageBase.completeStep();
        pageBase.changeStep(true);
    });
}