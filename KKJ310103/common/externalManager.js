/**
created by NOD
externalManager
외부 자원 접근을 위한 External 처리
*/
(function (ext) {

    var m_funcResumeContent;
    var m_funcPauseContents;

    var m_funcOK, m_funcYes, m_funcNo;
    var m_strData;
    var m_mapSounds = {};

    /**
     * 스트리밍 비디오 객체를 생성한다.
     */
    ext.playMovie = function (path, mode, nextPath) {
        if (!ext.isPlayer()) {
            console.log(path, "영상 재생");
            setTimeout(function() {
                location.href='../'+nextPath;
            }, 1000);
            return;
        }
        window.HybridApp.playMovie(path, mode, nextPath);
    };

    /**
     * 사운드 등록 관련 Extenal
     */
    ext.createSound = function (strId, strPath) {
        if (!ext.isPlayer()) {
            var media = createjs.Sound.registerSound(strPath, strId);
            cjsManager.setSoundObject(strId, media);
            return;
        }
        window.HybridApp.createSound(strId, strPath);
    };
    
    /**
     * 사운드 플레이 관련 Extenal
     */
    ext.playSound = function (strId, bLoop, nVolumn, strFuncComplete) {
        if (strFuncComplete == "")
            strFuncComplete = "onCompleteAnimationSound";

        cjsManager.addPlayingId(strId);
        if (!ext.isPlayer()) {
            var media = createjs.Sound.play(strId, {loop : bLoop ? -1 : 0});
            media.on("complete", function(){
                eval(strFuncComplete, strId);
            });
            media.setVolume(nVolumn);
            m_mapSounds[strId] = media;
            return;
        }
        window.HybridApp.playSound(strId, bLoop, nVolumn, strFuncComplete);
    };

    /**
     * 사운드 pause 관련 Extenal
     */
    ext.pauseSound = function (strId) {
        cjsManager.deletePlayingId(strId);
        if (!ext.isPlayer()) {
            var instance = m_mapSounds[strId];
            if (instance != undefined)
                instance.paused = true;
            return;
        }

        window.HybridApp.pauseSound(strId);
    };

    /**
     * 사운드 resume 관련 Extenal
     */
    ext.resumeSound = function (strId) {
        cjsManager.addPlayingId(strId);
        if (!ext.isPlayer()) {
            var instance = m_mapSounds[strId];
            if (instance != undefined)
                instance.paused = false;
            return;
        }

        window.HybridApp.resumeSound(strId);
    };

    /**
     * 사운드 seek 관련 Extenal
     */
    ext.seekSound = function (strId, nMilliSec) {
        if (!ext.isPlayer()) {
            var instance = m_mapSounds[strId];
            if (instance != undefined)
                instance.startTime = nMilliSec;
            return;
        }

        window.HybridApp.seekSound(strId, nMilliSec);
    }

    /**
     * 사운드 전체 시간 반환
     */
    ext.getSoundDuration = function (strId) {
        if (!ext.isPlayer()) {
            var instance = m_mapSounds[strId];
            if (instance != undefined)
                return instance.duration;
            else
                return 0;
        }

        return window.HybridApp.getSoundDuration(strId);
    }

    /**
     * 사운드 현재 시간 반환
     */
    ext.getSoundCurrent = function (strId) {
        if (!ext.isPlayer()) {
            var instance = m_mapSounds[strId];
            if (instance != undefined)
                return instance.position;
            else
                return 0;
        }

        return window.HybridApp.getSoundCurrent(strId);
    }

    /**
     * 사운드 현재 소리 조정
     */
    ext.setVolume = function (strId, nVolumn) {
        if (!ext.isPlayer()) {
            var instance = m_mapSounds[strId];
            if (instance != undefined)
                instance.setVolume(nVolumn);
            return;
        }

        window.HybridApp.setVolume( strId, nVolumn );
    }

    /**
     * 이미지 저장 관련 External
     */
    ext.saveImage = function () {

    }

    /**
     * 현재 메뉴 완강처리를 한다.
     * 차시 완강 처리는 플레이어에서 처리한다.
     */
    ext.completeContents = function () {
        if (!ext.isPlayer()) {
            Util.log("현재 메뉴 완료( 완강 ) 정보 호출");
            return;
        }

        window.HybridApp.completeContents();
    }

    /**
     * 다음 메뉴로 이동한다.
     */
    ext.nextMenu = function () {
        if (!ext.isPlayer()) {
            Util.log("다음 메뉴로 이동 요청");
            return;
        }

        window.HybridApp.nextMenu();
    }

    /**
     * 이전 메뉴로 이동한다.
     */
    ext.prevMenu = function () {
        if (!ext.isPlayer()) {
            Util.log("이전 메뉴로 이동 요청");
            return;
        }

        window.HybridApp.setMenu(ext.getMenuIndex() - 1);
    }

    /**
     * 지정된 메뉴로 이동한다.
     */
    ext.setMenu = function (nMenu) {
        if (!ext.isPlayer()) {
            Util.log(nMenu + "번 메뉴로 이동 요청");
            return;
        }

        window.HybridApp.setMenu(nMenu);
    }

    /**
     * 현재 메뉴 인덱스를 가지고 온다.
     */
    ext.getMenuIndex = function () {
        if (!ext.isPlayer()) return 0;

        return window.HybridApp.getMenuIndex();
    }

    /**
     * 전체 메뉴 개수를 리턴한다.
     */
    ext.getMenuCount = function () {
        if (!ext.isPlayer()) return 1;

        return window.HybridApp.getMenuCount();
    }

    /**
     * 플레이어 공용 메시지 팝업을 띄운다.
     * @param strMess   팝업 메시지
     * @param funcOK    확인 버튼 콜백
     */
    ext.message = function (strMess, funcOK) {
        if (!ext.isPlayer()) {
            Util.log("플레이어 공용 메시지 팝업 : " + strMess);
            return;
        }

        if (m_funcOK != null) {
            Util.error("1001", "message 팝업은 복수 사용이 불가 합니다.");
            return;
        }

        m_funcOK = funcOK;

        window.HybridApp.message(strMess, "externalManager.onClickOK");
    }

    /**
     * 플레이어 공용 메시지 팝업 콜백
     */
    ext.onClickOK = function () {
        if (m_funcOK != null) m_funcOK();
        m_funcOK = null;
    }

    /**
     * 플레이어 공용 선택 팝업을 띄운다.
     * @param strMess   팝업 메시지
     * @param funcYes   YES 선택
     * @param funcNo    NO 선택
     */
    ext.yesno = function (strMess, funcYes, funcNo) {
        if (!ext.isPlayer()) {
            Util.log("플레이어 공용 선택 팝업 : " + strMess);
            return;
        }

        if (m_funcYes != null || m_funcNo != null) {
            Util.error("1002", "yesno 팝업은 복수 사용이 불가 합니다.");
            return;
        }

        m_funcYes = funcYes;
        m_funcNo = funcNo;

        window.HybridApp.message(strMess, "externalManager.onClickYes", "externalManager.onClickNo");
    }

    /**
     * 플레이어 공용 선택 팝업 YES 콜백
     */
    ext.onClickYes = function () {
        if (m_funcYes != null) m_funcYes();
        m_funcYes = null;
        m_funcNo = null;
    }

    /**
     * 플레이어 공용 선택 팝업 NO 콜백
     */
    ext.onClickNo = function () {
        if (m_funcNo != null) m_funcNo();
        m_funcYes = null;
        m_funcNo = null;
    }

    /**
     * 플레이어에게 현재 메뉴 데이터에 지정된 String을 서버 저장 요청을 한다.
     * @param strData   지정 String 데이터
     */
    ext.setData = function (strData) {
        if (!ext.isPlayer()) {
            Util.log("서버 저장 요청 : index [ " + ext.getMenuIndex() + " ] " + strData);
            return;
        }

        window.HybridApp.setData(strData);
    }

    /**
     * setData를 통해 서버에 저장한 사용자 데이터를 받는다.
     */
    ext.getData = function () {
        if (!ext.isPlayer()) {
            Util.log("서버 저장 데이터 요청");
            return;
        }

        return window.HybridApp.getData();
    }

    /**
     * 현재 차시의 압축이 풀려있는 경로를 알려준다.
     * 로컬파일 로드 시 사용
     */
    ext.getLocalPath = function () {
        if (!ext.isPlayer()) return "";

        return window.HybridApp.getLocalPath();
    }

    /**
     * 임시로 사용할 String 데이터를 플레이어에 저장한다.
     * Step 별로 사용 될 임시 데이터 용도
     */
    ext.setInstantData = function (strData) {
        if (!ext.isPlayer()) {
            Util.log("플레이어에 임시 데이터 저장 : " + strData);
            return;
        }

        window.HybridApp.setInstantData(strData);
    }

    /**
     * setInstantData를 통해 임시로 저장한 데이터를 가지고 온다.
     */
    ext.getInstantData = function () {
        if (!ext.isPlayer()) return "";

        return window.HybridApp.getInstantData();
    }

    /**
     * 서버에 현재 Menu의 Step 진행 사항을 저장한다.
     * 이전에 저장된 Step이 이후 Step 보다 높을 경우 높은 Step으로 유지됨
     */
    ext.setLastStep = function (nStep) {
        if (!ext.isPlayer()) {
            Util.log(ext.getMenuIndex() + " 번 메뉴의 Step 진행 정보 저장 요청 : " + nStep);
            return;
        }

        window.HybridApp.setLastStep(nStep);
    }

    /**
     * 서버에 저장된 현재 Menu의 Step 진행 사항을 가지고 온다.
     */
    ext.getLastStep = function () {
        if (!ext.isPlayer()) return 0;

        return window.HybridApp.getLastStep();
    }

    /**
     * 서버에 저장 된 현재 메뉴의 학습 진행 이력을 가지고 온다.
     * 0 : 미진행 / 1 : 진행중 / 2 : 진행완료
     */
    ext.getNowStatus = function () {
        if (!ext.isPlayer()) return 2;

        return window.HybridApp.getNowStatus();
    }

    /**
     * 최초 로드 메뉴를 확인한다.
     */
    ext.isFirstLoadedMenu = function () {
        if (!ext.isPlayer()) return false;

        return window.HybridApp.isFirstLoadedMenu();
    }

    /**
     * 플레이어의 학습 이어하기를 선택한 진입인지 확인한다.
     해당
     */
    ext.isContinueStudy = function () {
        if (!ext.isPlayer()) return false;

        return window.HybridApp.isContinueStudy();
    }

    /**
     * 플레이어 사진첩 리플래쉬 요청
     */
    ext.refresh = function () {
        if (!ext.isPlayer()) {
            Util.log("플레이어 사진첩 리플래쉬 요청.");
            return;
        }

        window.HybridApp.refresh();
    }

    ext.setOnPausedContent = function (func) {
        m_funcPauseContents = func;
    }

    ext.setOnResumeContent = function (func) {
        m_funcResumeContent = func;
    }

    ext.getOnPausedContent = function (func) {
        return m_funcPauseContents;
    }

    ext.getOnResumeContent = function (func) {
        return m_funcResumeContent;
    }

    /**
     * 플레이어를 통해 TOAST 메시지를 띄운다.
     */
    ext.toast = function (strMess) {
        if (!ext.isPlayer()) {
            Util.log("TOAST : " + strMess);
            return;
        }

        window.HybridApp.toast(strMess);
    }
    /**
     * 현재 페이지가 플레이어 상에 있는지 확인한다.
     */
    ext.isPlayer = function () {
        return window.HybridApp != undefined;
    }

})(externalManager = externalManager || {});
var externalManager;
/**
 * 지정된 사운드를 플레이 한다.
 * animateCC 를 통해 생성된 javascript 파일에서 접근
 * ★이후 플레이어나 현재 컨텐트의 상황에 맞추어 변경 예정!!
 */
playSound = function (id, loop) {
    return externalManager.playSound(id, loop, 1, "onCompleteAnimationSound");
}

function onCompleteAnimationSound(id) {
    cjsManager.deletePlayingId(id);
}

/**
 * 플레이어가 deactive 상태로 들어갔을 때 호출
 */
onPauseContents = function () {
    createjs.Ticker.paused = true;
    var onPause = externalManager.getOnPausedContent();
    if (onPause != null) onPause();
}

/**
 * 플레이어가 active 상태로 들어갔을 때 호출
 */
onResumeContents = function () {
    createjs.Ticker.paused = false;
    var onResume = externalManager.getOnResumeContent();
    if (onResume != null) onResume();
}

