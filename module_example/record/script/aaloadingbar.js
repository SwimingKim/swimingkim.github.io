(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:
// helper functions:

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


(lib.loading_ring = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(137,220,240,0.6)","rgba(137,220,240,0)"],[0.184,1],0,77,0,-76.9).s().p("AFjLuQkrgHjSjVQjcjbAAk3QAAk2DcjbQDSjUErgIIAUAAIAACWIgUABQjsAGinCoQiwCwAAD4QAAD5CwCwQCnCnDsAIIAUAAIAACWIgUAAg");
	this.shape.setTransform(-112.5,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#89DCF0","rgba(137,220,240,0.6)"],[0.373,1],0,-79,0,79).s().p("Al2JYQD5AACuivQCwiwAAj5QAAj4iwiwQiuivj5AAIAAiWQE3AADaDcQDcDbAAE2QAAE3jcDbQjaDck3AAg");
	this.shape_1.setTransform(-37.5,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.loading_ring, new cjs.Rectangle(-150,-75,150,150), null);


(lib.loading_mv = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어 2
	this.instance = new lib.loading_ring();
	this.instance.parent = this;
	this.instance.setTransform(0,0,1,1,0,0,0,-75,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:360},29).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75,-75,150,150);


// stage content:
(lib.loadingbar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.tfPerc = new cjs.Text("99", "bold 60px 'NanumGothic ExtraBold'", "#34B6E2");
	this.tfPerc.name = "tfPerc";
	this.tfPerc.textAlign = "center";
	this.tfPerc.lineHeight = 71;
	this.tfPerc.lineWidth = 118;
	this.tfPerc.parent = this;
	this.tfPerc.setTransform(640,365.5);

	this.instance = new lib.loading_mv();
	this.instance.parent = this;
	this.instance.setTransform(640,400,0.867,0.867);
	this.instance.alpha = 0.801;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.tfPerc}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1215,735,130,130);
// library properties:
lib.properties = {
	width: 1280,
	height: 800,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;