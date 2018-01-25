var m_mcScroll, m_mcMask, m_mcWarning;
var m_mcThumb;
var m_mcThumbMask;
var m_nStartContentY, m_nMinContentY, m_nMaxContentY;
var m_nStartThumbY, m_nMinThumbY, m_nMaxBarY;
var m_nTension = 400;
var m_nThumbTweenTime = 200;
var m_thumbInfo = {};
var m_scrollInfo = {};

/**
 * javascript VScroll
 * 
 * @param {*스크롤 컨텐츠 영역} mcThis 
 * @param {*스크롤 마스크 영역} mcMask 
 */
function CJPopupScroll(mcThis, mcMask, mcWarning) {
    m_mcScroll = mcThis;
    m_mcMask = mcMask;
    m_mcWarning = mcWarning;

    init();
}

/**
 * 특정 좌표로 스크롤한다
 * @param {y좌표 위치} posY 
 */
CJPopupScroll.prototype.scrollToPos = function (posY) {

    var dist = Math.abs(m_mcScroll.y - posY);
    createjs.Tween.get(m_mcScroll, { override: true }).to({ y: posY }, dist, createjs.Ease.sineOut).addEventListener("change", onChangeBar);

}

/**
 * 특정 좌표로 스크롤한다
 * @param {y좌표 위치} posY 
 */
CJPopupScroll.prototype.scrollToInitPos = function () {

    m_mcScroll.y = m_nMinContentY;
    m_mcThumb.y = m_nMinThumbY;

}


/**
 * 특정 인덱스로 스크롤한다
 * @param {인덱스 번호} index 
 */
CJPopupScroll.prototype.scrollAtIndex = function (index, bImmediately) {
    var posY = m_nMinContentY - index * m_mcScroll.nominalBounds.height;
    if (posY < m_nMaxContentY)
        posY = m_nMaxContentY;

    var dist = Math.abs(m_mcScroll.y - posY);
    createjs.Tween.get(m_mcScroll, { override: true }).to({ y: posY }, bImmediately ? 200 : dist, createjs.Ease.sineOut).addEventListener("change", onChangeBar);
}

/**
 * 스크롤 사용성 설정
 */
CJPopupScroll.prototype.setEnabled = function(b) {
    m_mcMask.mouseEnabled = b;
}


/**
 * 스크롤 메세지를 숨긴다
 */
CJPopupScroll.prototype.hideWarning = function() {
    if (m_mcWarning.visible) {
        m_mcWarning.gotoAndStop(0);
        m_mcWarning.visible = false;
    }
}

/**
 * 스크롤 초기화
 */
CJPopupScroll.prototype.setVisible = function(b) {
    m_mcThumb.alpha = b ? 1 : 0;
}

/**
 * 초기 설정
 */
function init() {
    m_stage = cjsManager.getStage( "contents" );
    m_stage.addEventListener("changeStep", function(e) {
        m_stage.removeChild(m_mcThumbMask);
        m_stage.removeChild(m_mcThumb);
    });

    m_nMinContentY = m_mcScroll.y;
    m_nMaxContentY = m_mcScroll.y - m_contentInfo.getHeight + m_maskInfo.getHeight - 50;

    // 마스크 영역 설정
    var mask = new createjs.Shape();
    var x = parent.x - m_mcScroll.x;
    var y = parent.y - m_mcScroll.y;
    mask.graphics.rect(10, 120, m_maskInfo.getWidth, m_maskInfo.getHeight);
    m_mcScroll.mask = mask;
    m_stage.addChild(mask);

    // 스크롤바 영역 설정
    m_thumbInfo.x = 1140;
    m_thumbInfo.y = 120;
    m_thumbInfo.width = 8;
    m_thumbInfo.height = 1 / m_mcScroll.nominalBounds.height * 100000;
    if ( m_thumbInfo.height < 100 )
        m_thumbInfo.height = 100;

    m_mcThumb = new createjs.Shape();
    m_mcThumb.graphics.beginFill("#7f7f7d").rect(m_thumbInfo.x, m_thumbInfo.y, m_thumbInfo.width, m_thumbInfo.height);
    m_mcThumb.alpha = 0;

    m_mcThumbMask = new createjs.Shape();
    m_mcThumbMask.graphics.rect(m_thumbInfo.x, m_thumbInfo.y, m_thumbInfo.width, m_maskInfo.getHeight);
    m_mcThumb.mask = m_mcThumbMask;

    m_stage.addChild(m_mcThumbMask);
    m_stage.addChild(m_mcThumb);

    m_nMinThumbY = m_mcThumb.y;
    m_nMaxBarY = m_mcThumb.y + m_maskInfo.getHeight - m_thumbInfo.height;

    setEvent();
};

/**
 * 이벤트 추가
 */
function setEvent() {
    m_mcMask.addEventListener("mousedown", startScroll);
    m_mcThumb.addEventListener("mousedown", onBarDown);
}

/**
 * 스크롤을 시작한다
 */
function startScroll(event) {

    this.CJPopupScroll.prototype.hideWarning();

    scrollSign = null;
    createjs.Tween.get(m_mcThumb, { override: true }).to({ alpha: 1 }, m_nThumbTweenTime);

    m_nStartContentY = m_stage.mouseY - m_mcScroll.y;
    event.currentTarget.addEventListener("pressmove", doScroll);
    event.currentTarget.addEventListener("pressup", stopScroll);
}

/**
 * 스크롤을 한다
 */
function doScroll(event) {

    var deltaY = event.stageY - m_nStartContentY;

    // 스크롤 정보 갱신
    var currSignValue = deltaY - m_mcScroll.y > 0;
    if (m_scrollInfo.sign === null)
        m_scrollInfo.sign = deltaY - m_mcScroll.y > 0;
    m_scrollInfo.delta += m_scrollInfo.sign ? 1 : -1 * m_scrollInfo.force;
    m_scrollInfo.force++;

    if (m_scrollInfo.sign != currSignValue)
        resetScrollInfo();

    // 스크롤 진행
    if (deltaY <= m_nMinContentY + m_nTension && deltaY >= m_nMaxContentY - m_nTension) {
        createjs.Tween.get(m_mcScroll, { override: true }).to({ y: deltaY }).addEventListener("change", onChangeBar);
    } else {
        createjs.Tween.get(m_mcScroll, { override: true }).to({ y: deltaY > m_nMaxContentY ? m_nMinContentY : m_nMaxContentY }).addEventListener("change", onChangeBar);
    }

    createjs.Tween.get(m_mcScroll, { override: true }).to({ y: deltaY }).addEventListener("change", onChangeBar);

}

/**
 * 스크롤을 정지한다
 */
function stopScroll(event) {

    event.currentTarget.removeEventListener("pressup", stopScroll);
    event.currentTarget.removeEventListener("pressmove", doScroll);

    var endY = m_mcScroll.y + m_scrollInfo.delta * 100;
    if (endY > m_nMinContentY)
        endY = m_nMinContentY;
    else if (endY < m_nMaxContentY)
        endY = m_nMaxContentY;

    if (m_mcScroll.y > m_nMinContentY) {
        createjs.Tween.get(m_mcScroll, { override: true }).to({ y: m_nMinContentY }, 200, createjs.Ease.linear).call(onCompleteTween).addEventListener("change", onChangeBar, true);
    } else if (m_mcScroll.y < m_nMaxContentY) {
        createjs.Tween.get(m_mcScroll, { override: true }).to({ y: m_nMaxContentY }, 200, createjs.Ease.linear).call(onCompleteTween).addEventListener("change", onChangeBar);
    }

    resetScrollInfo();
}

/**
 * 스크롤바 MouseDown Handler
 */
function onBarDown(event) {
    m_nStartThumbY = m_stage.mouseY - m_mcThumb.y;

    event.currentTarget.addEventListener("pressup", onBarUp);
    event.currentTarget.addEventListener("pressmove", onBarMove);
}

/**
 * 스크롤바 MouseUp Handler
 */
function onBarUp(event) {
    onCompleteTween();

    m_mcMask.removeEventListener("pressup", onBarUp);
    m_mcMask.removeEventListener("pressmove", onBarMove);
}

/**
 * 스크롤바 MouseMove Handler
 */
function onBarMove(event) {
    var deltaY = event.stageY - m_nStartThumbY;
    if (deltaY < m_nMinThumbY)
        deltaY = m_nMinThumbY;
    else if (deltaY > m_nMaxBarY)
        deltaY = m_nMaxBarY;

    // 스크롤 진행
    var percentage = (deltaY - m_nMinThumbY) / m_nMaxBarY * 100;
    createjs.Tween.get(m_mcScroll, { override: true }).to({ y: m_nMinContentY + (m_nMaxContentY - m_nMinContentY) * percentage / 100 }).addEventListener("change", onChangeBar);
}

/**
 * 스크롤바를 조정한다.
 */
function onChangeBar(event, bool) {
    createjs.Tween.get(m_mcThumb).to({ y: m_nMinThumbY + (m_nMaxBarY - m_nMinThumbY) * getScrollPercentage() / 100 });
}

/**
 * 트윈 애니메이션 종료 이벤트 Handler
 */
function onCompleteTween(event) {
    createjs.Tween.get(m_mcThumb).to({ alpha: 0 }, m_nThumbTweenTime);
}

/**
 * 스크롤 정보를 초기화한다
 */
function resetScrollInfo() {
    m_scrollInfo.delta = 0;
    m_scrollInfo.force = 0;
    m_scrollInfo.sign = null;
}

/**
 * 스크롤된 영역 비율
 */
function getScrollPercentage() {
    return (m_nMinContentY - m_mcScroll.y) / (m_contentInfo.getHeight - m_maskInfo.getHeight) * 100;
}

/**
 * 콘텐츠 영역의 높이와 넓이를 반환한다
 */
var m_contentInfo = {
    get getWidth() {
        return m_mcScroll.nominalBounds.width;
    },
    get getHeight() {
        return m_mcScroll.nominalBounds.height;
    }
};

/**
 * 마스크 영역의 높이와 넓이를 반환한다
 */
var m_maskInfo = {
    get getWidth() {
        return m_mcMask.nominalBounds.width;
    },
    get getHeight() {
        return m_mcMask.nominalBounds.height;
    }
}