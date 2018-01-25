var m_scroll;

/**
 * 초기화
 */
function initPage() {

    Util.loadScript( 'scripts/CJCamera.js', onCompleteLoadContentsJS);

    function onCompleteLoadContentsJS() {
        pageBase.init( "KKJ310103_b03_contents.js", onCompleteLoadContents );
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
        case 1:
            checkAnimation();
            break;
        case 2:
            settingModule();
            break;
    }
}

function settingModule() {
    var m_arrModule = ['recorder.js', 'CJRecord.js'];

    var nModule = 0;
    Util.loadScript('scripts/'+m_arrModule[nModule], onLoadComplete);
    
    var mcConetnts = pageBase.getStepClip();
    
    function onLoadComplete() {
        nModule++;
        
        if (nModule == m_arrModule.length) {
            initContent();
        } else {
            Util.loadScript('scripts/'+m_arrModule[nModule], onLoadComplete);
        }
    }
    
    function initContent() {
        var rec = new CJRecord( mcConetnts );
        var cam = new CJCamera( mcConetnts.mcCam );
        
        setPopup();
        
    }

    function setPopup() {
        mcConetnts.mcHint.addEventListener( "click", onClickHint );
    
        loadScript('scripts/', 'CJPopupScroll', function () {
            m_scroll = new CJPopupScroll( mcConetnts.mcPop.mcGuide, mcConetnts.mcPop.mcScroll, mcConetnts.mcPop.mcWarning );
        });
    }

    function onClickHint( e ) {
        var mcHint = e.currentTarget;
        var mcPop = mcConetnts.mcPop;
        mcConetnts.addChild( mcPop );
        mcPop.gotoAndStop( 1 )
        mcPop.btnClose.addEventListener( "click", onCliclPopupClose );
        m_scroll.scrollToInitPos();
    }

    function onCliclPopupClose( e ) {
        var mcPop = e.currentTarget.parent;
        mcPop.btnClose.removeEventListener( "click", onCliclPopupClose );
        mcPop.gotoAndStop( 0 );
        m_scroll.setVisible( false );
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