onload = loadCommonLibrary;
var m_arrLibrary = ['cjsManager', 'createjs-2015.11.26.min', 'externalManager', 'pageBase', 'stepBase', 'util'];

function loadCommonLibrary() {

    var nLibrary = 0;
    var path = window.HybridApp == undefined ? '../../../../003_common/' : '../common/';
    loadScript(path, m_arrLibrary[nLibrary], onLoadComplete);

    function onLoadComplete() {
        nLibrary++;

        if (nLibrary == m_arrLibrary.length)
            initContent();
        else
            loadScript(path, m_arrLibrary[nLibrary], onLoadComplete);
    }

}

function loadScript(strPath, strJS, funcload) {

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = strPath + strJS + '.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = funcload;

}


function initContent() {

    initStyle();
    
    var fileName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length).split('.')[0];
    document.title = fileName;
    
    loadScript('scripts/', fileName, function() {
        initPage();
    });

}

function initStyle() {

    document.getElementsByTagName("body")[0].style.margin = 0;

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '*{-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}';
    document.getElementsByTagName('head')[0].appendChild(style);

}