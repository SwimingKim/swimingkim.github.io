(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:



(lib._1228_img3 = function() {
	this.initialize(img._1228_img3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,58,54);


(lib.bg = function() {
	this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,800);


(lib.bg_titlepng복사본 = function() {
	this.initialize(img.bg_titlepng복사본);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1236,50);


(lib.비트맵27 = function() {
	this.initialize(img.비트맵27);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,674,34);


(lib.비트맵29 = function() {
	this.initialize(img.비트맵29);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,946,572);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.mccam_zone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s("#000000").ss(1,1,1).dr(-404.5,-230.95,809,461.9);
	this.shape.setTransform(404.5,230.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.mccam_zone, new cjs.Rectangle(-1,-1,811,463.9), null);


(lib.mc_rect = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.비트맵29();
	this.instance.parent = this;
	this.instance.setTransform(-1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_rect, new cjs.Rectangle(-1,-1,946,572), null);


(lib.constBG = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.bg();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.constBG, new cjs.Rectangle(0,0,1280,800), null);


(lib.constStep0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// 레이어_2
	this.mcCamArea = new lib.mc_rect();
	this.mcCamArea.name = "mcCamArea";
	this.mcCamArea.parent = this;
	this.mcCamArea.setTransform(641.9,443.1,1,1,0,0,0,472.1,285.1);

	this.timeline.addTween(cjs.Tween.get(this.mcCamArea).wait(1));

	// cam
	this.mcCamZone = new lib.mccam_zone();
	this.mcCamZone.name = "mcCamZone";
	this.mcCamZone.parent = this;
	this.mcCamZone.setTransform(637,467.6,1,1,0,0,0,404.5,230.9);

	this.timeline.addTween(cjs.Tween.get(this.mcCamZone).wait(1));

	// 레이어_5
	this.instance = new lib.비트맵27();
	this.instance.parent = this;
	this.instance.setTransform(104,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// title
	this.instance_1 = new lib._1228_img3();
	this.instance_1.parent = this;
	this.instance_1.setTransform(17,16);

	this.instance_2 = new lib.bg_titlepng복사본();
	this.instance_2.parent = this;
	this.instance_2.setTransform(30,16);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).wait(1));

	// 레이어_3
	this.mcBG = new lib.constBG();
	this.mcBG.name = "mcBG";
	this.mcBG.parent = this;
	this.mcBG.setTransform(640,400,1,1,0,0,0,640,400);

	this.timeline.addTween(cjs.Tween.get(this.mcBG).wait(1));

}).prototype = getMCSymbolPrototype(lib.constStep0, new cjs.Rectangle(0,0,1280,800), null);


// stage content:
(lib.camera_contents = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(640,400,1280,800);
// library properties:
lib.properties = {
	id: '29285FE46F5EF343AC94D2376653723B',
	width: 1280,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_1228_img3.png?1515739428701", id:"_1228_img3"},
		{src:"images/bg.png?1515739428701", id:"bg"},
		{src:"images/bg_titlepng복사본.png?1515739428701", id:"bg_titlepng복사본"},
		{src:"images/비트맵27.png?1515739428701", id:"비트맵27"},
		{src:"images/비트맵29.png?1515739428701", id:"비트맵29"},
		{src:"sounds/effRight.mp3?1515739428701", id:"effRight"},
		{src:"sounds/effWrong.mp3?1515739428701", id:"effWrong"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['29285FE46F5EF343AC94D2376653723B'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;