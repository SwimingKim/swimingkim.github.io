/**
 * 초기화
 */
function initPage() {
    loadScript('scripts/', 'CJSocialMovieQuiz', onCompleteLoadContentsJS);
    function onCompleteLoadContentsJS() {
        pageBase.init( "movie_contents.js", onCompleteLoadContents );
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
            loadScript('scripts/', 'CJSocialMovieQuiz', function () {
                var m_quiz = new CJSocialMovieQuiz( pageBase.getStepClip() );
            });
            break;
        case 1:
            var menu = externalManager.getMenuIndex();
            var strData = menu+"/"+nStep;
            externalManager.setInstantData(strData);
            location.replace("./movie_01.html");
            break;
        case 2:
            loadScript('scripts/', 'CJSocialMovieQuiz', function () {
                var m_quiz = new CJSocialMovieQuiz( pageBase.getStepClip() );
            });
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