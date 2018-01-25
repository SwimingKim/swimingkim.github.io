var m_mcCamArea;

function CJCamera( mcCamArea ) {
    m_mcCamArea = mcCamArea;

    initModule();
}

/**
 * 초기화
 */
function initModule() {
    var video = document.getElementById('video');
    var stepClip = pageBase.getStepClip();

    stepClip.addEventListener( "removed", function() {
        var video = document.getElementById('video');

        video.pause();
        window.URL.revokeObjectURL(video.src);
        video.src = "";
    } );

    if ( video == undefined ) {
        addBGCanvas();
        addVedioElement();
    }

    settingCamera();

    /**
     * BG Canvas를 추가한다
     */
    function addBGCanvas() {

        cjsManager.makeCanvasElements("bg", 1280, 800);

        var stepClip = pageBase.getStepClip();

        var mcBG = stepClip.mcBG.clone(true);
        cjsManager.getStage( "bg" ).addChild( mcBG );
        
        var bg = document.getElementById("bg");
        var canvas = document.getElementById("contents");
        document.body.insertBefore(bg, canvas);

        delete bg;
        delete canvas;
    }

    /**
     * 비디오 엘리멘트 객체를 추가한다
     */
    function addVedioElement( width, height ) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            externalManager.toast("camera 미지원");
            return;
        }

        var pt = new createjs.Point(m_mcCamArea.x, m_mcCamArea.y);
        var ptStage = m_mcCamArea.localToGlobal( m_mcCamArea.parent.x, m_mcCamArea.parent.y );
        
        var width = m_mcCamArea.nominalBounds.width;
        var height = m_mcCamArea.nominalBounds.height;
        
        var video = document.createElement('video');
        video.preload = "none";
        video.muted = false;
        video.setAttribute("id", "video");
        video.setAttribute("style", "margin: 0px; -webkit-transform:rotateY(180deg); position: absolute; object-fit: fill; left: " + Math.floor( ptStage.x ) +"px; top: "+ Math.floor( ptStage.y ) + "px; background-color: rgb(0, 0, 0);");
        
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        
        var canvas = document.getElementById("contents");
        document.body.insertBefore(video, canvas);
        
        delete pt;
        delete ptStage;
        delete width;
        delete height;
        delete video;
    }
    
}


/**
 * 카메라를 셋팅한다
 */
function settingCamera() {

    var video = document.getElementById('video');
    var constraints = { video: true, audio: false };
    navigator.getUserMedia(constraints, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.load();
        video.play();

        delete stream;
        // delete video.src;
    }, function(err) {
        console.log(err);
    });


    var stepClip = pageBase.getStepClip();
    stepClip.mcBG.visible = false;

    m_mcCamArea.visible = false;
    delete m_mcCamArea;
}