/**
created by NOD
cjsManager
createJS로 생성된 js 파일을 관리 및 HTML element 관리
*/

( function ( cm ) {

	var m_arrElements = [];
	var m_nDefFPS = 30;
	
	var m_arrSoundObjs = [];
	var m_setPlayingSoundIds;

	/**
	 * 초기화
	 */
	cm.init = function() {
		document.getElementsByTagName("body")[0].style.marginLeft = 0;
		document.getElementsByTagName("body")[0].style.marginTop = 0;

		createjs.Ticker.setFPS(m_nDefFPS);
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	}

	/**
	 * 기본 element 를 생성한 후 m_arrElements 에서 관리
	 * @param strID				고유 ID - 다른 element에서 접근을 위한 ID
	 * @param nWidth			canvas width
	 * @param nHeight			canvas height
	 */
	cm.makeCanvasElements = function( strID, nWidth, nHeight ) {
		var can 	= document.createElement( 'canvas' );
	    can.id     	= strID;
	    can.width  	= nWidth;
	    can.height 	= nHeight;
	    can.style 	= "position: absolute; display: table; background-color:rgba(255, 255, 255, 0)";

	    can.getContext('2d').miterLimit = 2;

	    document.body.appendChild( can );

	    var stage = new createjs.Stage( can );

        createjs.Touch.enable( stage );
        stage.enableMouseOver();

		startCJSObject( stage );

        m_arrElements.push( { id:strID, type:"canvas", canvas:can, stage:stage } );
	}

	/**
	 * 지정된 ID의 값을 가진 지정된 타입의 element를 리턴
	 * @param strID		고유 ID
	 * @param strType	element 유형 ( "canvas" )
	 */
	cm.getElement = function( strID, strType ) {
		var arrTarget = m_arrElements;
		for( var i=0; i<arrTarget.length; ++i ) {
			if( arrTarget[ i ].id == strID ) {
				switch( strType ) {
					case "canvas": 		return arrTarget[ i ].canvas;	break;
				}
			}
		}

		Util.error( "0001", "지정한 " + strID + " id 값의 element가 없습니다." );
	}

	/**
	 * 지정된 ID의 값을 가진 지정된 타입의 element를 찾아 해당 createJS의 stage를 리턴
	 * @param strID		고유 ID
	 * @param strType	element 유형 ( "canvas" )
	 */
	cm.getStage = function( strID ) {
		var arrTarget = m_arrElements;
		for( var i=0; i<arrTarget.length; ++i ) {
			if( arrTarget[ i ].type != "canvas" ) continue;

			if( arrTarget[ i ].id == strID ) {
				return arrTarget[ i ].stage;
			}
		}

		Util.error( "0002", "지정한 " + strID + " id 값의 canvas가 없습니다." );
	}

	/**
	 * createJS로 publish 된 javascript 객체를 로드
	 * @param strMenuNodeName	메뉴 노드 이름 ( 테스트를 위해 처리 - 운영계에서는 사용하지 않음  )
	 */
	cm.loadCJSObject = function( strPath, funcComplete, funcProgress ) {
		Util.loadScript(strPath, function () {
            var key = Object.keys(AdobeAn.compositions)[0];
            var comp = AdobeAn.getComposition(key);

            var loader = new createjs.LoadQueue( false );

            loader.addEventListener( "fileload", function ( evt ) {
                onFileLoad( evt, comp )
            })

            loader.addEventListener( "complete", function ( evt ) {
                onCJSLoadComplete( evt, comp, funcComplete, strPath )
            });

            loader.addEventListener( "progress", function( evt ) {
            	onCJSProgress( evt, funcProgress );
            });

            var lib = comp.getLibrary();

            if( lib.properties.manifest.length == 0 ) {
            	funcComplete( comp.getLibrary() );
            	AdobeAn = null;
            	return;
            }

            // var loadItem;
            // var objItem;
            // for( var i=0; i<lib.properties.manifest.length; ++i  ) {
            //     objItem = lib.properties.manifest[ i ];
            //     Util.log( objItem )
            //     // continue;
            //     new createjs.LoadItem().set({src:objItem.src, crossOrigin:"Anonymous"});
            // };

            loader.loadManifest(lib.properties.manifest);

            AdobeAn = null;
        });
	}

	cm.getSoundObject = function(id) {
		return m_arrSoundObjs[id];
	}

	cm.setSoundObject = function(id, media) {
		m_arrSoundObjs[id] = media;
	}

	cm.resetPlayingIds = function() {
		m_setPlayingSoundIds = new Set();
	}

	cm.getPlayingIds = function() {
		return m_setPlayingSoundIds;
	}

	cm.addPlayingId = function(id) {
		m_setPlayingSoundIds.add(id);
	}

	cm.deletePlayingId = function(id) {
		m_setPlayingSoundIds.delete(id);
	}
	
	/**
     * 사운드 등록
     * @param {*} lib 
     */
    function setRegisterSound(lib) {
		m_setPlayingSoundIds = new Set();

        var strFilePath, strFileId, strType;

        for (var i = 0; i < lib.properties.manifest.length; i++) {
            strType = lib.properties.manifest[i].type;

            if (strType != "sound") continue;
            strFilePath = lib.properties.manifest[i].src.split(
                "?")[0];
            strFileId = lib.properties.manifest[i].id;
            externalManager.createSound(strFileId, strFilePath);
        }

        var arrEffect = ['effComplete', 'effFindRight', 'effFindWrong', 'effOpen', 'effRight', 'effWrong', 'effClick', 'bgm_1', 'bgm_intro', 'effRemovePostit' ];
        for (var i = 0; i < arrEffect.length; i++) {
            strFilePath = '../sounds/' + arrEffect[i] + '.mp3';
            strFileId = arrEffect[i];
            externalManager.createSound(strFileId, strFilePath);
        }
    };

	/**
	 * loadCJSObject Progress 이벤트 핸들러
	 * @param e 			이벤트
	 * @param funcProgress	프로그래스 이벤트 콜백
	 */
	function onCJSProgress( e, funcProgress ) {
		if( funcProgress != null ) funcProgress( e.progress );
	}

	/**
	 * manifest에 있는 객체 로드 관리
	 */
	function onFileLoad( evt, comp ) {
        var images = comp.getImages();
        if ( evt && ( evt.item.type == "image" ) ) {
            images[ evt.item.id ] = evt.result;
        } else if( evt && ( evt.item.type == "sound" ) ) {
			// var strFileId = evt.item.id;
			// var strFilePath = evt.item.src.split("?")[0];
			// externalManager.createSound( strFileId, strFilePath );
        }
	}

	/**
	 * 모든 객체가 로드 완료 되었을 때 호출
	 */
	function onCJSLoadComplete( evt, comp, funcComplete, strPath ) {
        var lib = comp.getLibrary();
        var ss = comp.getSpriteSheet();
        var queue = evt.target;
        var ssMetadata = lib.ssMetadata;

        for (var i = 0; i < ssMetadata.length; i++) {
            ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                "images": [queue.getResult(ssMetadata[i].name)],
                "frames": ssMetadata[i].frames
            })
        }

		setRegisterSound(lib);
        if( funcComplete ) funcComplete(lib);
    }

	/**
	 * 지정된 FPS 에 맞추어 CJS Object를 실행한다.
	 */
	function startCJSObject( stage ) {
		createjs.Ticker.setFPS( m_nDefFPS );
		createjs.Ticker.addEventListener( "tick", stage );
	}


})( cjsManager = cjsManager || {} );
var cjsManager;
