var m_arrTargetLibs = [];
var m_nDefFPS;

var m_canvas, m_stage, images, ss, m_containerAni, m_containerDOM, m_funcLoadComplete;

var m_loader;
var m_arrLoadedSources = [];

var m_mcLoading;

// 초기화
function initCJS() {
	document.getElementsByTagName("body")[0].style.marginLeft = 0;
	document.getElementsByTagName("body")[0].style.marginTop = 0;

	makeElements( 1280, 800 );
	m_nDefFPS = 30;

	m_canvas = document.getElementById("canvas0");
	
	m_containerAni = document.getElementById("animation_container");
	m_containerDOM = document.getElementById("dom_overlay_container");

	m_stage = new createjs.Stage( m_canvas );
	m_stage.enableMouseOver();

	createjs.MotionGuidePlugin.install();
	createjs.Touch.enable( m_stage );

	loadLoadingObj();

	images = images||{};
	ss = ss||{};
}

// 기본 엘레멘트를 생성한다.
function makeElements( nWidth, nHeight ) {
	var acon = document.createElement( 'div' );
	acon.id = "animation_container";
	acon.style = "background-color:rgba(255, 255, 255, 1.00); width:" + nWidth + "px; height:" + nHeight + "px";

	var dom = document.createElement( 'div' );
	dom.id = "dom_overlay_container";
	dom.style = "pointer-events:none; overflow:hidden; width:" + nWidth + "px; height:" + nHeight + "px; position: absolute; left: 0px; top: 0px; display: block;";
	acon.appendChild( dom );

	var can = document.createElement( 'canvas' );
    can.id     = "canvas0";
    can.width  = nWidth;
    can.height = nHeight;
    can.style = "position: absolute; display: block; background-color:rgba(255, 255, 255, 1.00)";
    acon.appendChild( can );

    document.body.appendChild( acon );
}

// 로딩 진행률을 표시해줄 객체를 로드한다.
function loadLoadingObj() {
	loadCJSObject( "lib", "loadingbar", "script/loadingbar.js", onCompleteLoad );
	function onCompleteLoad( mcLoaded ) {
		m_mcLoading = mcLoaded;
		m_mcLoading.visible = false;
	}
}

// createjs 로 생성된 js 파일을 로드한다.
// strLibName - createjs export 시 설정되는 symbol name
//  > 각 객체를 접근하는 기준
function loadCJSObject( strLibName, strModuleName, strPath, funcComplete ) {
	m_arrTargetLibs.push( { "libName":strLibName, "moduleName":strModuleName } );
	var nIdx = m_arrTargetLibs.length - 1;

	Util.loadScript( strPath, onCompleteLoadScript );
	
	function onCompleteLoadScript() {
		if( getCJSLib( nIdx ).properties.manifest.length == 0 ) {
			funcComplete( getModule( nIdx ) );
			return;
		};

		var loader = new createjs.LoadQueue( false );
		loader.index = nIdx;
		loader.completeCallBack = funcComplete;
		loader.installPlugin( createjs.Sound );

		loader.addEventListener( "fileload", onCJSFileLoad );
		loader.addEventListener( "complete", onCJSLoadComplete );
		loader.addEventListener( "progress", onCJSProgress );

		if( m_mcLoading ) {
			m_mcLoading.visible = true;
			m_stage.addChild( m_mcLoading );
		}
		
		loader.loadManifest( getCJSLib( nIdx ).properties.manifest );
	}
}

// 지정된 인덱스의 Lib을 리턴
function getCJSLib( nIdx ) {
	return this[ m_arrTargetLibs[ nIdx ].libName ];
}

// 지정된 인덱스의 모듈을 가지고 온다.
function getModule( nIdx ) {
	var strLibName = m_arrTargetLibs[ nIdx ].libName;
	var strModuleName = m_arrTargetLibs[ nIdx ].moduleName;
	
	var mcTemp = new window[ strLibName ][ strModuleName ]();

	return mcTemp;
}

// 프로그래스 이벤트 핸들러
function onCJSProgress( e ) {
	if( !m_mcLoading || !m_mcLoading.visible ) return;
	m_mcLoading.tfPerc.text = Math.floor( e.progress*100 );
}

// manifest에 있는 객체 로드 관리
function onCJSFileLoad( e ) {	
	if ( e.item.type == "image" ) { images[ e.item.id ] = e.result; }	
}

// 모든 객체가 로드 완료 되었을 때 호출
function onCJSLoadComplete( e ) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var queue = e.target;
	var nIdx = e.currentTarget.index;
	
	// 현재 로드된 객체의 Metadata에 접근하여 로드된 객체의 SpriteSheet를 작성 후 설정한다.
	var ssMetadata = getCJSLib( nIdx ).ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}

	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {		
		var lastW, lastH, lastS=1;		
		window.addEventListener('resize', resizeCanvas);		
		resizeCanvas();		
		function resizeCanvas() {			
			var w = getCJSLib( nIdx ).properties.width, h = getCJSLib( nIdx ).properties.height;			
			var iw = window.innerWidth, ih=window.innerHeight;			
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
			if(isResp) {                
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
					sRatio = lastS;                
				}				
				else if(!isScale) {					
					if(iw<w || ih<h)						
						sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==1) {					
					sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==2) {					
					sRatio = Math.max(xRatio, yRatio);				
				}			
			}			
			m_canvas.width = w*pRatio*sRatio;			
			m_canvas.height = h*pRatio*sRatio;
			m_canvas.style.width = m_containerDOM.style.width = m_containerAni.style.width =  w*sRatio+'px';				
			m_canvas.style.height = m_containerAni.style.height = m_containerDOM.style.height = h*sRatio+'px';
			m_stage.scaleX = pRatio*sRatio;			
			m_stage.scaleY = pRatio*sRatio;			
			lastW = iw; lastH = ih; lastS = sRatio;		
		}
	}
	
	makeResponsive( false,'both',false,1 );	
		
	var mcLoaded = getModule( e.currentTarget.index );
	if( e.currentTarget.completeCallBack != null ) e.currentTarget.completeCallBack( mcLoaded );

	startCJSObject();

	if( m_mcLoading ) m_mcLoading.visible = false;
}

// 정해진 FPS 에 맞추어 CJS Object를 실행한다.
function startCJSObject() {
	createjs.Ticker.setFPS( m_nDefFPS );
	createjs.Ticker.addEventListener( "tick", m_stage );
}

// 지정된 사운드를 플레이 한다.
function playSound(id, loop) {
	return createjs.Sound.play( id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop );
}