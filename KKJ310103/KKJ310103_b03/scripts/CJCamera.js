var m_mcCam;

function CJCamera(mcThis) {
    m_mcCam = mcThis;

    init();
}

function init() {

    addVedioElement();
}

function addVedioElement() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.getUserMedia) {
        externalManager.toast("camera 미지원");
        return;
    }

    cjsManager.makeCanvasElements('cam', 1280, 800);

    var video = document.createElement('video');
    video.setAttribute("id", "video");
    video.setAttribute("autoplay", "true");
    video.setAttribute("style", "display:none;");
    document.body.appendChild(video);

    settingCamera();
}

function settingCamera() {

    var video = document.getElementById('video');
    var canvas = document.getElementById('cam');
    var context = canvas.getContext('2d');

    initCanvas();

    var errBack = function (e) {
        console.log('An error has occurred!', e)
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }
    var mediaConfig = { video: true };
    //
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }
    /* Legacy code below! */
    else if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(mediaConfig, function (stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(mediaConfig, function (stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia(mediaConfig, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }


    function initCanvas() {
        context.save();
        context.beginPath();
        // context.fillRect(0, 0, 1280, 800);

        // var bitmap = new createjs.Bitmap(m_mcCam);
        // console.log(bitmap);
        // var arrData = m_mcCam.shape.graphics.instructions;
        // for (var i = 0; i < arrData.length; i++) {
        //     console.log(arrData[i]);
        // }

        // Create a shape, of some sort
        context.moveTo(10, 10);
        context.lineTo(100, 30);
        context.lineTo(180, 10);
        context.lineTo(200, 60);
        context.arcTo(180, 70, 120, 0, 10);
        context.lineTo(200, 180);
        context.lineTo(100, 150);
        context.lineTo(70, 180);
        context.lineTo(20, 130);
        context.lineTo(50, 70);
        context.closePath();
        // Clip to the current path
        context.clip();
    }


}