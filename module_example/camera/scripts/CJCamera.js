var m_mcCamZone;
var m_mcCamArea;

function CJCamera( mcZone, mcArea ) {
    m_mcCamZone = mcZone;
    m_mcCamArea = mcArea;

    init();
}

/**
 * 초기화
 */
function init() {
    var stepClip = pageBase.getStepClip();
    
    // cjsManager.makeCanvasElements("bg", 1280, 800);
    
    // var mcBG = stepClip.mcBG.clone(true);
    // cjsManager.getStage( "bg" ).addChild( mcBG );
    
    // var bg = document.getElementById("bg");
    // var canvas = document.getElementById("contents");
    // document.body.insertBefore(bg, canvas);

    stepClip.mcBG.visible = false;

    addVedioElement();
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
    
    var width = m_mcCamArea.getBounds().width;
    var height = m_mcCamArea.getBounds().height;

    var video = document.createElement('video');
    video.setAttribute("id", "video");
    video.setAttribute("muted", "true");
    video.setAttribute("autoplay", "true");
    video.setAttribute("style", "margin: 0px; -webkit-transform:rotateY(180deg); position: absolute; object-fit: fill; left: " + ptStage.x +"px; top: "+ ptStage.y + "px;");
    
    video.setAttribute("width", width);
    video.setAttribute("height", height);
    
    var canvas = document.getElementById("contents");
    document.body.insertBefore(video, canvas);

    settingCamera();
}

/**
 * 카메라를 셋팅한다
 */
function settingCamera() {

    m_mcCamZone.visible = false;

    var video = document.getElementById('video');

    var mediaConfig = { video: {facingMode: "environment"} };
    navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });

}