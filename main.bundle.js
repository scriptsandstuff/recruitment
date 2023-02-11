/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../PreisachPlaneJXG/src/JXG_PP_Extensions.js":
/*!****************************************************!*\
  !*** ../PreisachPlaneJXG/src/JXG_PP_Extensions.js ***!
  \****************************************************/
/***/ (() => {

/**
 * @file JXG_PP_Extensions.js
 * @author m
 * @date 2002
 * @version 0.0.1
 */

/**
 *
 */
(function() {
/**
 *
 */
/**
 *
 */
JXG.extend(JXG.SVGRenderer.prototype, /** @lends JXG.SVGRenderer.prototype */ {
	// documented in JXG.AbstractRenderer
	setGradient: function (el) {
		// let Type = require('../../../node_modules/jsxgraph/src/utils/type.js');
		let Type = {
			"evaluate": JXG.evaluate,
			"exists": JXG.exists,
			"isFunction": JXG.isFunction
		}

		// console.log(JXG);
		var fillNode = el.rendNode,
			node, node2, node3,
			ev_g = Type.evaluate(el.visProp.gradient);

		//
		// if (ev_g === 'normal') {
		let setGradientNormal = (el) => {
			let stops = [];
			// createPrim( 'radial ...not normal
			node = this.createPrim('radial' + 'Gradient', el.id + '_gradient');
			for ( let i = 0; i < 6; i++ ) {
				node2 = this.createPrim('stop', el.id + '_stop_' + i);
				stops.push( node2 );
				node.appendChild( node2 );
			}
			this.defs.appendChild(node);
			fillNode.setAttributeNS(null, 'style', 'fill:url(#' + this.container.id + '_' + el.id + '_gradient)');
			// el.gradNode1 = node2;
			// el.gradNode2 = node3;
			el.stopNodes = stops;

			el.gradNode = node;

			return el;
		} 

		if (ev_g === 'linear' || ev_g === 'radial') {

			if ( Type.exists(el.visProp.gradientdist) ) {
				el = setGradientNormal(el);
				return;
			}

			node = this.createPrim(ev_g + 'Gradient', el.id + '_gradient');
			node2 = this.createPrim('stop', el.id + '_gradient1');
			node3 = this.createPrim('stop', el.id + '_gradient2');
			node.appendChild(node2);
			node.appendChild(node3);
			this.defs.appendChild(node);
			fillNode.setAttributeNS(null, 'style', 'fill:url(#' + this.container.id + '_' + el.id + '_gradient)');
			el.gradNode1 = node2;
			el.gradNode2 = node3;
			el.gradNode = node;
		} else {
			fillNode.removeAttributeNS(null, 'style');
		}
	},

	updateGradientNormal: function(el) {
		let Type = {
			"evaluate": JXG.evaluate,
			"exists": JXG.exists,
			"isFunction": JXG.isFunction
		}
		// console.log(el.vertices);
		
		if (!Type.exists(el.stopNodes)) {
			return;
		}

		var OFFSETS = [0.0, 0.038, 0.08, 0.14, 0.185, 0.27];
		var COLOURS = ['red', 'orange', 'yellow', 'turquoise', 'blue', 'indigo'];

		// el.	

		/**
		 *
		 */
		var col, op,
			stops = el.stopNodes;
		// var ev_g = Type.evaluate(el.visProp.gradient);

		op = Type.evaluate(el.visProp.fillopacity);
		op = (op > 0) ? op : 0;

		let sd = Type.evaluate(el.visProp.std);
		let offs = OFFSETS.map( o => o*20*sd );

		stops.forEach( (s, i) => {
			s.setAttributeNS(null, 'style', 'stop-color:' + COLOURS[i] + ';stop-opacity:' + op);			
			s.setAttributeNS(null, 'offset', offs[i] * 100 + '%');
		});
		
		this.updateGradientCircle(el.gradNode,
				Type.evaluate(el.visProp.meanx),
				Type.evaluate(el.visProp.meany),
				1,
				Type.evaluate(el.visProp.meanx),
				Type.evaluate(el.visProp.meany),
				0
			);
	},

	// documented in JXG.AbstractRenderer
	updateGradient: function (el) {
		let Type = {
			"evaluate": JXG.evaluate,
			"exists": JXG.exists,
			"isFunction": JXG.isFunction
		}

		if ( Type.exists(el.visProp.gradientdist) ) {
			this.updateGradientNormal(el);
			return;
		}

		var col, op,
			node2 = el.gradNode1,
			node3 = el.gradNode2,
			ev_g = Type.evaluate(el.visProp.gradient);

		if (!Type.exists(node2) || !Type.exists(node3)) {
			return;
		}

		op = Type.evaluate(el.visProp.fillopacity);
		op = (op > 0) ? op : 0;
		col = Type.evaluate(el.visProp.fillcolor);

		node2.setAttributeNS(null, 'style', 'stop-color:' + col + ';stop-opacity:' + op);
		node3.setAttributeNS(null, 'style',
				'stop-color:'    + Type.evaluate(el.visProp.gradientsecondcolor) +
				';stop-opacity:' + Type.evaluate(el.visProp.gradientsecondopacity)
			);
		node2.setAttributeNS(null, 'offset', Type.evaluate(el.visProp.gradientstartoffset) * 100 + '%');
		node3.setAttributeNS(null, 'offset', Type.evaluate(el.visProp.gradientendoffset) * 100 + '%');
		if (ev_g === 'linear') {
			this.updateGradientAngle(el.gradNode, Type.evaluate(el.visProp.gradientangle));
		} else if (ev_g === 'radial') {
			this.updateGradientCircle(el.gradNode,
				Type.evaluate(el.visProp.gradientcx),
				Type.evaluate(el.visProp.gradientcy),
				Type.evaluate(el.visProp.gradientr),
				Type.evaluate(el.visProp.gradientfx),
				Type.evaluate(el.visProp.gradientfy),
				Type.evaluate(el.visProp.gradientfr)
			);
		}
	}
});
/**
 *
 */
/**
 *
 */

/**
 *
 */
JXG.PPDiagonal = function(board, parents, attributes) {
	if(!JXG.exists(attributes))
		attributes = {};

	attributes = { 
		...attributes,
		"fixed": 		true, 
		"strokecolor": 			"#999", 
		"highlightstrokecolor": "#999", 
		"strokeWidth": 			1.5,
		"highlightstrokeWidth": 1.5
	}

	return board.create('line',  [ [0, 0], [1, 1] ], attributes);
};

/**
 *
 */
JXG.PPOrthos = function(board, pts, props) {
	// // https://jsxgraph.uni-bayreuth.de/wiki/index.php/Extension
	// JXG.JSXGraph.registerElement('triangle', createTriangle);

	if(!JXG.exists(props))
		props = {};

	props = { ...props,
		"fixed": 		true, 
		"strokeWidth": 	0.75,
		"highlightstrokeWidth": 	0.75,
		"strokecolor": 	"lightblue", 
		"highlightstrokecolor": 	"lightblue", 
		"dash": 		2,
		"straightLast": false
	};
	let elements = {
		// A: p1, B: p2, C: p3, 
		'connector': board.create('line', pts.c, props),
		'painter': 	 board.create('line', pts.p, props),
		'wiper': 	 board.create('line', pts.w, props)
	}

	return new JXG.Composition( elements );	
};

// JXG.Line = function (board, p1, p2, attributes) {
	// 	this.constructor(board, attributes, Const.OBJECT_TYPE_LINE, Const.OBJECT_CLASS_LINE);
	// 	this.methodMap = JXG.deepCopy(this.methodMap, {

	// 	});
	// };
	// JXG.Line.prototype = new GeometryElement();

	// JXG.extend(JXG.Line.prototype, /** @lends JXG.Line.prototype */ {
	// });

	// JXG.createLine = function (board, parents, attributes) {
	// };
	// JXG.registerElement('line', JXG.createLine);


// JXG.PPVerticesHH = function (board, parents, attributes) {
// 	this.constructor(parents);
// 	// this.methodMap = JXG.deepCopy(this.methodMap, {});
// };
// JXG.PPVerticesHH.prototype = new JXG.Composition();

// JXG.extend(JXG.PPVerticesHH.prototype, /** @lends JXG.PPVerticesHH.prototype */ {});

JXG.createPPVerticesHH = function (board, parents, attributes) {
	if(!JXG.exists(attributes))
		attributes = {};

	attributes = { 
		...attributes,
		"visible": false, 
		"fixed": true 
	};
	// console.log(parents);
	// let els = {}
	// return el = new JXG.PPVerticesHH(board, els, {});
	return new JXG.Composition( {
		"bot": board.create('point', [ () => parents.low + parents.diag, () => parents.low 				], attributes),
		"top": board.create('point', [ () => parents.high,            () => parents.low 				], attributes),
		"sq":  board.create('point', [ () => parents.high,            () => parents.high - parents.diag 	], attributes)	
	} );
};
JXG.registerElement('verticesHH', JXG.createPPVerticesHH);

/**
 *
 */
// JXG.PPVerticesHH = function(board, parents, attributes) {
	// 	// // updateVertices() {

	// 	// function support2xyHH(sup) {
	// 	// 	return {
	// 	// 		'bot': [ () => sup.low + sup.diag, () => sup.low ],
	// 	// 		'top': [ () => sup.high,           () => sup.low ],
	// 	// 		'sq':  [ () => sup.high,           () => sup.high - sup.diag ] 
	// 	// 	};
	// 	// }

	// 	if(!JXG.exists(attributes))
	// 		attributes = {};

	// 	attributes = { 
	// 		...attributes,
	// 		"visible": false, 
	// 		"fixed": true 
	// 	};
	// 	return new JXG.Composition( {
	// 		"bot": board.create('point', [ () => parents.low + parents.diag, () => parents.low 				], attributes),
	// 		"top": board.create('point', [ () => parents.high,            () => parents.low 				], attributes),
	// 		"sq":  board.create('point', [ () => parents.high,            () => parents.high - parents.diag 	], attributes)	
	// 	} );
	// };

/**
 *
 */
JXG.PPVerticesHL = function(board, parents, attributes) {
	// // updateVertices() {

	// function support2xyHH(sup) {
	// 	return {
	// 		'bot': [ () => sup.low + sup.diag, () => sup.low ],
	// 		'top': [ () => sup.high,           () => sup.low ],
	// 		'sq':  [ () => sup.high,           () => sup.high - sup.diag ] 
	// 	};
	// }

	if(!JXG.exists(attributes))
		attributes = {};

	attributes = { 
		...attributes,
		"visible": false, 
		"fixed": true 
	};
	return new JXG.Composition( {
		"bot": board.create('point', [ () => parents.low, 				  () => parents.low + parents.diag 	], attributes),
		"top": board.create('point', [ () => parents.low, 				  () => parents.high 				], attributes),
		"sq":  board.create('point', [ () => parents.high - parents.diag, () => parents.high 				], attributes)	
	} );
};

/**
 *
 */
JXG.PPSupportLines = function(board, parents, attributes) {
	if(!JXG.exists(attributes))
		attributes = {};

	attributes = {  ...attributes,
		"visible": 		true, 
		"fixed": 		true, 
		"dash": 		4,
		"strokeWidth": 	2,
		"highlightstrokeWidth": 	2,
		"strokecolor": 	"#49A88F",
		"highlightstrokecolor": 	"#49A88F",
		"strokeopacity":0.8
	};

	// console.log(parents);

	return new JXG.Composition( {
		'min': board.create('line', [ parents.bot, parents.sq ], attributes), 
		'max': board.create('line', [ parents.sq, parents.top ], attributes), 
		'diag': board.create('line', [ parents.bot, parents.top ], attributes)
	});
};

/**
 *
 */
JXG.PPNormalHH = function(board, parents, attributes) {
	if(!JXG.exists(attributes))
		attributes = {};

	attributes = { 
		...attributes,
		"id": 			"normGrad_" + attributes.id,
		"gradient": 	"radial",
		"gradientDist": true, 
		"meanY": 		() => 1 - ( parents.dist.mean.low  - (parents.sup.low) ) / parents.sup.width,
		"meanX": 		() => ( parents.dist.mean.high - parents.sup.low - parents.sup.diag /*HERE*/) / parents.sup.width, 
		"std": 			() => parents.dist.std.high,
		"visible": 		false,
		"opacity": 		0.6,
		"fillOpacity": 	0.6,
		"fillColor": 	"red",
		"color": 		"red",
		"strokeWidth": 	0,
		"withLines": 	false,
		"fixed": 		true
	};
		// console.log(parents);
		// console.log(parents.dist);
		// console.table(parents.dist);
		// console.log("meanY = ", attributes.meanY());
		// console.log("meanX = ", attributes.meanX());
		// console.log('std = ', attributes.std());

	return board.create('polygon', parents.vertices.objectsList, attributes);
};

/**
 *
 */
JXG.PPLinearHH = function(board, parents, attributes) {
	if(!JXG.exists(attributes))
		attributes = {};

	attributes = { 
		...attributes,
		"id": 			"LinGrad_" + attributes.id,
		
		"gradient": "linear",
		"gradientAngle": Math.PI/4,
		"gradientStartOffset": 0.5,
		// "gradientEndOffset": 0.5 + 1.0/Math.sqrt(2),
		"gradientSecondColor": '#21908D',

		// "opacity": 		0.6,		
		// "color": 		"red",
		"fillOpacity": 0.8,
		"fillColor": '#F9E721',

		"visible": 		false,		
		"strokeWidth": 	0,
		"withLines": 	false,
		"fixed": 		true,	
	};

	return board.create('polygon', parents, attributes);
};

/**
 *
 */
JXG.PPNormalHL = function(board, parents, attributes) {
	if(!JXG.exists(attributes))
		attributes = {};

	attributes = { 
		...attributes,
		"id": 			"normGrad_" + attributes.id,
		"gradient": 	"radial",
		"gradientDist": true, 

		"meanY": 		() => 1-( parents.dist.mean.high - parents.sup.low - parents.sup.diag /*HERE*/) / parents.sup.width, 
		"meanX": 		() => ( parents.dist.mean.low  - (parents.sup.low) ) / parents.sup.width,
		"std": 			() => parents.dist.std.high,

		"visible": 		false,
		"opacity": 		0.6,
		"fillOpacity": 	0.6,
		"fillColor": 	"red",
		"color": 		"red",
		"strokeWidth": 	0,
		"withLines": 	false,
		"fixed": 		true
	};

	return board.create('polygon', parents.vertices.objectsList, attributes);
};

/**
 *
 */
JXG.PPLinearHL = function(board, parents, attributes) {
	if(!JXG.exists(attributes))
		attributes = {};

	attributes = { 
		...attributes,
		"id": 			"LinGrad_" + attributes.id,		
		"gradient": "linear",
		"gradientAngle": 5*Math.PI/4,
		"gradientStartOffset": 0.5,
		// "gradientEndOffset": 0.5 + 1.0/Math.sqrt(2),
		"gradientSecondColor": '#21908D',

		// "opacity": 		0.6,		
		// "color": 		"red",
		"fillOpacity": 0.8,
		"fillColor": '#F9E721',

		"visible": 		false,		
		"strokeWidth": 	0,
		"withLines": 	false,
		"fixed": 		true,	
	};

	return board.create('polygon', parents, attributes);
};

JXG.registerElement('pp', JXG.PPpp);
JXG.registerElement('diagonal', JXG.PPDiagonal);
JXG.registerElement('orthos', JXG.PPOrthos);

// JXG.registerElement('verticesHH', JXG.PPVerticesHH);
JXG.registerElement('verticesHL', JXG.PPVerticesHL);

JXG.registerElement('supportLines', JXG.PPSupportLines);
// JXG.registerElement('supportLinesHL', JXG.PPSupportLinesHL);

JXG.registerElement('fillNormalHH', JXG.PPNormalHH);
JXG.registerElement('fillLinearHH', JXG.PPLinearHH);

JXG.registerElement('fillNormalHL', JXG.PPNormalHL);
JXG.registerElement('fillLinearHL', JXG.PPLinearHL);

})();

/***/ }),

/***/ "../PreisachPlaneJXG/src/Memgon.js":
/*!*****************************************!*\
  !*** ../PreisachPlaneJXG/src/Memgon.js ***!
  \*****************************************/
/***/ (() => {

/**
 * @file Memgon.js
 * @author m
 * @date 2002
 * @version 0.0.1
 */

/**
 *
 */
(function() {
/**
 *
 */
JXG.createMemgonHH = function (board, parents, attributes) {
	if(!JXG.exists(attributes)) {
		attributes = {};
	}

	attributes = { 
		...attributes,
		"fixed":        true,
		"withLines": false,
		"vertices": {
			"visible": false,
			"fixed": true
		},
		"fillcolor": '#49A88F',
		"highlightfillcolor": '#49A88F',
	};

	let el = board.create('polygon', // polygon / polygonalchain
		[
			[ parents.low + parents.diag,   parents.low ],
			[ parents.high,                 parents.high - parents.diag ],
			[ parents.high,                 parents.low ]
		],
		attributes
	);

	el.rbound = parents.high;
	el.lbound = parents.low;
	el.diag = parents.diag
	// console.log(el.vertices);
	// el.updateMemgon = (val) => {
	el.updateMemgon = function(val) {
		console.log('Updating Memgon');
		let len = this.vertices.length;
		let xvals = this.vertices.map(v=>v.X());
		let yvals = this.vertices.map(v=>v.Y());

		if(val > this.rbound) {
			while (this.vertices.length > 4) {
				this.removePoints(1);
			}
			this.vertices[0].moveTo( [ this.lbound + this.diag, this.lbound ] );
			this.vertices[1].moveTo( [ this.rbound,             this.rbound - this.diag ] );
			this.vertices[2].moveTo( [ this.rbound,             this.lbound ] );
			this.vertices[3].moveTo( [ this.lbound + this.diag, this.lbound ] );
			
			return;
		}

		if(val < this.lbound) {
			while (this.vertices.length > 4) {
				this.removePoints(1);
			}
			this.vertices[0].moveTo( [ this.lbound + this.diag, this.lbound ] );
			this.vertices[1].moveTo( [ this.lbound + this.diag, this.lbound ] );
			this.vertices[2].moveTo( [ this.lbound + this.diag, this.lbound ] );
			this.vertices[3].moveTo( [ this.lbound + this.diag, this.lbound ] );
			return;
		}
	
		if(len == 4) {
			console.log('Memgon, len == 4');
			// console.log(this.vertices.map(v=>v.X()));
			if ( val < xvals[1] ) {
				if ( val > this.rbound - this.diag) {
					return;
				}

				this.removePoints(1);
				this.insertPoints( 
					0, 
					[ val + this.diag, 		val ], 
					[ this.vertices[1].X(), val ] 
				);
				// console.log(this.vertices.map(v=>v.X()));
				// console.log(this.vertices.map(v=>v.Y()));

				return
			}

			this.removePoints(1);
			this.insertPoints( 
				0, 
				[ val, val - this.diag ],
				[ val, this.lbound ]
			);
			this.removePoints(3);
			return;
		} 

		/**
		 * if increaseing
		 */
		if ( len > 4 && val > xvals[1] ) {
			// console.log('increasing');
			// console.log(this.vertices.map(v=>v.X()));

			/**
			 * if previous input was an increase
			 */
			if( (len % 2) == 0 ) { 
				this.removePoints( 1 );
				len--;
			}
			this.removePoints( 1 );
			len--;

			while(len > 4) {
				/**
				 * if wiping previous corner
				 */
				if( val > this.vertices[1].X() ) {
					// arrl = arrl-2; 
					this.removePoints( 1 );
					this.removePoints( 1 );
					len = len-2;
				}
				else break;
			}
			
			this.insertPoints( 
				0,
				[val, val - this.diag],
				[val, this.vertices[1].Y()]
			);
			return;
		}

		/**
		 * if decreaseing
		 */
		if ( len > 4 && val + this.diag < xvals[1] ) {
			// console.log('decreasing');
			// console.log(this.vertices.map(v=>v.X()));

			/**
			 * if previous input was a decrease
			 */
			if( (len % 2) == 1 ) { 
				this.removePoints( 1 );
				len--;
			}
			this.removePoints( 1 );
			len--;

			while(len > 4) {
				/**
				 * if wiping previous corner
				 */
				if( val < this.vertices[1].Y() ) {
					this.removePoints(1);
					this.removePoints(1);
					len = len-2;
				}
				else break;
			}
			this.insertPoints( 
				0
				, [ val+this.diag, 			val/*-this.diag*/ ]
				, [ this.vertices[1].X(), 	val/*-this.diag*/ ]
			);
		}
	}
	return el;
};

/**
 *
 */
JXG.createMemgonHL = function (board, parents, attributes) {
	if(!JXG.exists(attributes)) {
		attributes = {};
	}
	attributes = { 
		...attributes,
		"fixed":        true,
		"withLines": false,
		"vertices": {
			"visible": false,
			"fixed": true
		},
		"fillcolor": '#49A88F',
		"highlightfillcolor": '#49A88F',
	};

	let el = board.create('polygon', // polygon / polygonalchain
		[
			[ parents.low,   				parents.low  + parents.diag],
			[ parents.high - parents.diag, 	parents.high ],
			[ parents.low,                 parents.high ]
		],
		attributes
	);

	el.rbound = parents.high;
	el.lbound = parents.low;
	el.diag = parents.diag
	// console.log(el.vertices);
	// el.updateMemgon = (val) => {
	el.updateMemgon = function(val) {
		console.log('Updating Memgon');
		/*
			BOGUS
			I get a NaN because Y goes off the chart!!!
			I do want to draw attention to that fact
			However
				I have already chosen to draw attention to being able to close the last one

			It will be different when a connector is applied ...irrespective of the actual connector

			Try sending a 0 when last one is closed
		*/
		if ( !JXG.exists(val) ) { return; }

		let len = this.vertices.length;
		let xvals = this.vertices.map(v=>v.X());
		let yvals = this.vertices.map(v=>v.Y());

		if ( val > this.rbound ) {
			// console.log(this.rbound);
			if (this.vertices.length == 4) {
				// console.log('>>');
				return;
			}

			while (this.vertices.length > 4) {
				this.removePoints(1);
			}

			this.vertices[0].moveTo( [ this.lbound, 			this.lbound  + this.diag] );
			this.vertices[1].moveTo( [ this.rbound - this.diag, this.rbound ] );
			this.vertices[2].moveTo( [ this.lbound,  			this.rbound ] );
			this.vertices[3].moveTo( [ this.lbound, 			this.lbound  + this.diag] );		
			// console.log(this.vertices.map(v=>v.X()));
			return;
		}

		if(val < this.lbound) {
			// console.log('<<');
			while (this.vertices.length > 4) {
				this.removePoints(1);
			}
			this.vertices[0].moveTo( [ this.lbound, this.lbound + this.diag ] );
			this.vertices[1].moveTo( [ this.lbound, this.lbound + this.diag ] );
			this.vertices[2].moveTo( [ this.lbound, this.lbound + this.diag ] );
			this.vertices[3].moveTo( [ this.lbound, this.lbound + this.diag ] );

			return;
		}
	
		if(len == 4) {
			console.log('len == 4');
			console.log('val == ', val);
			// console.log(this.vertices.map(v=>v.X()));

			if ( val > this.rbound - this.diag) {
				return;
			}
			if ( val < this.lbound + this.diag) {
				return;
			}


			if ( val < xvals[1] ) {

				// console.log(this.vertices.map(v=>v.X()));
				// console.log(this.rbound);
				// console.log(val);

				if ( val > this.rbound - this.diag) {
					return;
				}


				// console.log('hi');
				this.removePoints(1);
				
				this.insertPoints( 
					0, 
					[ val, val + this.diag ], 
					[ val, this.vertices[1].Y() ] 
				);
				// console.log(this.vertices.map(v=>v.X()));
				return;
			}

		
			// console.log(this.vertices.map(v=>v.X()));
			// console.log(this.diag);
			// console.log(val);
			// console.log('this.lbound = ', this.lbound);

			this.removePoints(1);
			this.insertPoints( 
					0, 
					[ val - this.diag, 		val ], 
					[ this.lbound, val ] 
			);
			// this.removePoints(3);
			// console.log(this.vertices.map(v=>v.X()));
			// console.log(this.vertices.map(v=>v.Y()));

			return;
		} 

		/**
		 * if decreaseing
		 */
		if ( len > 4 && val < xvals[1] ) {
			// console.log('decreasing');
			// console.log(this.vertices.map(v=>v.X()));

			/**
			 * if previous input was a decrease
			 */
			if( (len % 2) == 1 ) { 
				this.removePoints( 1 );
				len--;
			}
			this.removePoints( 1 );
			len--;

			while(len > 4) {
				/**
				 * if wiping previous corner
				 */
				if( val < this.vertices[1].X() ) {
					this.removePoints(1);
					this.removePoints(1);
					len = len-2;
				}
				else break;
			}
			// console.log(this.vertices.map(v=>v.X()));
			this.insertPoints( 
				0
				, [ val, val+this.diag ]
				, [ val, this.vertices[1].Y() ]
			);
			// this.removePoints( 3 );
			// len--;
			// console.log('hl');
			// console.log(this.vertices.map(v=>v.X()));
			// console.log(this.vertices.map(v=>v.Y()));
			return;
		}

		/**
		 * if increaseing
		 */
		if ( len > 4 && val > xvals[1] + this.diag ) {
			console.log('increasing');
			// console.log(this.vertices.map(v=>v.X()));

			/**
			 * if previous input was an increase
			 */
			if( (len % 2) == 0 ) { 
				this.removePoints( 1 );
				len--;
			}
			this.removePoints( 1 );
			len--;

			while(len > 4) {
				/**
				 * if wiping previous corner
				 */
				// if( val > this.vertices[1].X() + this.diag ) {
				if( val > this.vertices[1].Y() ) {

					// console.log(this.vertices.map(v=>v.X()));

					// arrl = arrl-2; 
					this.removePoints( 1 );
					this.removePoints( 1 );
					len = len-2;
				}
				else break;
			}

			// console.log( this.vertices.map(v=>v.X()) );
			
			this.insertPoints( 
				0,
				[val - this.diag, 		val],
				[this.vertices[1].X(), 	val]
			);
			return;
		}

	}
	return el;
};

/**
 *
 */
JXG.registerElement('memgonHH', JXG.createMemgonHH);
JXG.registerElement('memgonHL', JXG.createMemgonHL);
})();

/***/ }),

/***/ "../PreisachPlaneJXG/src/PPDist.js":
/*!*****************************************!*\
  !*** ../PreisachPlaneJXG/src/PPDist.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * @file PPDist.js
 * @author m 
 * @version 0.1
 * @date 2022
 */

/**
 *
 */
// require("./JXG_PP_Extensions.js");

/**
 *
 */
const PROPS_DIST_UNIFORM = {
		"strokeWidth": 			0.0,
		"highlightstrokewidth": 0.0,

		"strokecolor": 			"#49A88F",
		"highlightstrokeColor": "#49A88F",
		"strokeopacity": 		0.2,
		"highlightstrokeopacity": 0.2,

		"fillcolor": 			"#49A88F",
		"highlightfillColor": 	"#49A88F",
		"fillopacity": 			0.2,
		"highlightfillOpacity":	0.2
	};
/**
 *
 */
class PPDist {
	/**
	 * 	this.currentThresholds;
	 * 	this.currentWeights;
	 *
	 */

	/**
	 * 
	 * We need to initialize the value of distribution style for each of weights & thresholds
	 * Clicking checkboxes - does not pass this value
	 * 
	 */
	constructor(board, parents, attributes) {
		if(!JXG.exists(attributes))
			attributes = {};
		// attributes = {  ...attributes };
		// console.log(parents.thresholds);
	
		this.currentThresholds;
		this.currentWeights;


		this.distT = parents.thresholds;
		this.distW = parents.weights;

		this.support = parents.thresholds.support;
		this.support['width'] = this.support.high - this.support.low - this.support.diag;

		this.board = board;

		this.vertices = null;
		this.lines = null;

		this.thresholdsNormal = null;
		this.thresholdsLinear = null;
		this.thresholdsUniform = null;

		this.weightsNormal = null;
		this.weightsLinear = null;
		this.weightsEqual = null;
		this.weightsRandom = null;
		
	}

	setCurrentDistributions(parents) {

		// this.isPairsContinuous 	= parents.thresholds.pairs == 'continuous' 
		// 						? true
		// 						: false;

		// this.pairsContinuousString = parents.thresholds.continuous.distribution;

		// if ( this.isPairsContinuous ) {
		console.log(parents.thresholds);
		if ( parents.thresholds.pairs == 'continuous' ) {
			switch (parents.thresholds.continuous.distribution) {
				case 'linear':
					this.currentThresholds = this.thresholdsLinear;
					break;
				case 'normal': 
					this.currentThresholds = this.thresholdsNormal;
					break;
				case 'uniform': 
					this.currentThresholds = this.thresholdsUniform;
					break;
				default:
					throw new Error('need a parents.thresholds.continuous.distribution: \t' + parents.thresholds.continuous.distribution);
			}
		} else {
			// this.distT = parents.thresholds
			// this.currentThresholdsString = parents.thresholds.pairs; // 'lattice'
			// 
			// we don't have an object to show
			// this.currentThresholds = null;
			this.currentThresholds = this.thresholdsUniform;
		}

		// console.log(parents.weights);
		if ( parents.weights.style == 'func' ) {			
			// this.currentWeightsString = parents.weights.func.style;
			switch (parents.weights.func.style) {
				case 'linear':
					this.currentWeights = this.weightsLinear;
					break;
				case 'normal': 
					this.currentWeights = this.weightsNormal;
					break;
				// case 'equal': 
				// 	this.currentWeights = this.weightsEqual;
				// 	break;
				default:
					throw new Error('need a parents.weights.func.style:\t' + parents.weights.func.style);
			}
		} else {
			switch (parents.weights.style) {
				case 'equal':
					this.currentWeights = this.weightsEqual;
					break;
				case 'random': 
					this.currentWeights = this.weightsRandom;
					break;
				default:
					throw new Error('need a parents.weights.style:\t' + parents.weights.style);
			}
			// we don't have an object to show
			// this.currentWeights = null;
			this.currentWeights = this.weightsEqual;
		}
	}
	
	showLines() {
		this.lines.setAttribute({'visible': true});
	}
	
	hideLines() {
		this.lines.setAttribute({'visible': false});
	}

	showThresholds() {
		if (JXG.exists(this.currentThresholds)) {
			this.currentThresholds.show();
		}
	}
	
	hideThresholds() {
		if (JXG.exists(this.currentThresholds)) {
			this.currentThresholds.hide();
		}
	}
	
	showWeights() {
		if (JXG.exists(this.currentWeights)) {
			this.currentWeights.show();
		}
	}
	
	hideWeights() {
		if (JXG.exists(this.currentWeights)) {
			this.currentWeights.hide();
		}
	}

	/**
	 * 
	 * there can be NO distribution or any of 4 distributions showing 
	 * (2 threshold distributions + 2 weights distributions)
	 * 
	 * We need the 
	 * 
	 */
	update(show) {
		console.log(show);
		// if (show.showLines) {
		// 	this.lines.setAttribute({'visible': true});
		// } else {
		// 	this.lines.setAttribute({'visible': false});
		// }

		// switch(show.distStr) {
		switch(show) {
			case 'none':
				// console.log('WTF');
				this.thresholdsNormal.hide();
				this.thresholdsLinear.hide();
				this.thresholdsUniform.hide();
				this.weightsNormal.hide();
				this.weightsLinear.hide();
				this.weightsEqual.hide();
				break;
			case 'thresholds':
				this.thresholdsNormal.hide();
				this.thresholdsLinear.hide();
				this.thresholdsUniform.hide();
				this.weightsNormal.hide();
				this.weightsLinear.hide();
				this.weightsEqual.hide();
				this.currentThresholds.show();
				break;				
			case 'weights':
				this.thresholdsNormal.hide();
				this.thresholdsLinear.hide();
				this.thresholdsUniform.hide();
				this.weightsNormal.hide();
				this.weightsLinear.hide();
				this.weightsEqual.hide();
				this.currentWeights.show();
				break;
			// case 'TNor':
			// 	this.thresholdsNormal.show();
			// 	this.thresholdsLinear.hide();
			// 	this.weightsNormal.hide();
			// 	this.weightsLinear.hide();
			// 	break;
			// case 'TLin':
			// 	this.thresholdsNormal.hide();
			// 	this.thresholdsLinear.show();
			// 	this.weightsNormal.hide();
			// 	this.weightsLinear.hide();
			// 	break;
			// case 'WNor':
			// 	this.thresholdsNormal.hide();
			// 	this.thresholdsLinear.hide();
			// 	this.weightsNormal.show();
			// 	this.weightsLinear.hide();
			// 	break;
			// case 'WLin':
			// 	this.thresholdsNormal.hide();
			// 	this.thresholdsLinear.hide();
			// 	this.weightsNormal.hide();
			// 	this.weightsLinear.show();
			// 	break;
			default:
				throw new Error('need a display string for PPDist');
		}
		// this.board.update();
	}

	destroy() {		
		// console.log(o);
		this.vertices.objectsList.forEach(o => {
			this.board.removeObject(o);
		});

		this.lines.objectsList.forEach(o => {
			this.board.removeObject(o);
		});

		[
			this.thresholdsNormal,
			this.thresholdsLinear,
			this.weightsNormal,
			this.weightsLinear
		].forEach( o => {
			this.board.removeObject(o);
		});
	}
}

/**
 *
 */
class PPDistHL extends PPDist {
	constructor(board, parents, attributes) {
		super(board, parents, attributes);

		// console.log(parents.weights);
		// attributes = {  ...attributes };
		this.vertices 			= board.create('verticesHL', 	this.support, {});
		this.lines 	  			= board.create('supportLines', this.vertices, {});
		
		// this.thresholdsNormal 	= board.create('fillNormalHL', {vertices: this.vertices, sup: this.support, dist: this.distT}, {"id": "T"});
		// this.thresholdsNormal 	= board.create('fillNormalHL', {vertices: this.vertices, sup: this.support, dist: parents.thresholds.continuous.normal}, {"id": "T"});
		// this.thresholdsLinear 	= board.create('fillLinearHL', this.vertices.objectsList, {"id": "T"});
		// this.thresholdsUniform 	= board.create('polygon', this.vertices.objectsList, {...PROPS_DIST_UNIFORM, "id": "T"});

		// this.weightsNormal 		= board.create('fillNormalHL', {vertices: this.vertices, sup: this.support, dist: parents.weights.func.normal}, {"id": "W"});
		// this.weightsLinear 		= board.create('fillLinearHL', this.vertices.objectsList, {"id": "W"});
		// this.weightsEqual 		= board.create('polygon', this.vertices.objectsList, {...PROPS_DIST_UNIFORM, "id": "W"});

		// super.setCurrentDistributions(parents);
	}
}

/**
 *
 */
class PPDistHH extends PPDist {
	constructor(board, parents, attributes) {
		super(board, parents, attributes);
		console.log(parents.weights);

		// attributes = {  ...attributes };
		this.vertices 			= board.create('verticesHH', 	this.support, {});
		this.lines 	  			= board.create('supportLines', this.vertices, {});

		// this.thresholdsNormal 	= board.create('fillNormalHH', {vertices: this.vertices, sup: this.support, dist: parents.thresholds.continuous.normal}, {"id": "T"});
		// this.thresholdsLinear 	= board.create('fillLinearHH', this.vertices.objectsList, {"id": "T"});
		// this.thresholdsUniform 	= board.create('polygon', this.vertices.objectsList, {...PROPS_DIST_UNIFORM, "id": "T"});

		// this.weightsNormal 		= board.create('fillNormalHH', {vertices: this.vertices, sup: this.support, dist: parents.weights.func.normal}, {"id": "W"});
		// this.weightsLinear 		= board.create('fillLinearHH', this.vertices.objectsList, {"id": "W"});
		// this.weightsEqual 		= board.create('polygon', this.vertices.objectsList, {...PROPS_DIST_UNIFORM, "id": "W"});

		
		// super.setCurrentDistributions(parents);
	}
}

module.exports = {
	PPDist: PPDist,
	PPDistHL: PPDistHL,
	PPDistHH: PPDistHH
};

/***/ }),

/***/ "../PreisachPlaneJXG/src/PreisachPlane.js":
/*!************************************************!*\
  !*** ../PreisachPlaneJXG/src/PreisachPlane.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PreisachPlaneHozHighJXG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreisachPlaneHozHighJXG.js */ "../PreisachPlaneJXG/src/PreisachPlaneHozHighJXG.js");
/* harmony import */ var _PreisachPlaneHozLowJXG_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PreisachPlaneHozLowJXG.js */ "../PreisachPlaneJXG/src/PreisachPlaneHozLowJXG.js");
/**
 * @author m 
 * @date 2022
 * @version 0.1
 */

/**
 * PreisachPlane
 */

// import JXG from 'jsxgraph';
__webpack_require__(/*! ./Memgon.js */ "../PreisachPlaneJXG/src/Memgon.js");
__webpack_require__(/*! ./ptIMG_jxg.js */ "../PreisachPlaneJXG/src/ptIMG_jxg.js");
// require("./JXG_Extensions.js");
__webpack_require__(/*! ./JXG_PP_Extensions.js */ "../PreisachPlaneJXG/src/JXG_PP_Extensions.js");



// require("../css/boards-style.css");

function PreisachPlane(id, atts, dispatcher) {
	// console.log('dispatcher = ', dispatcher);
	// default: horizontal='low'
	// switch() {
	// 	case '':
	// 		break;
	// 	case '':
	// 		break;
	// 	default: ;
	// }
	switch(atts.horizontal) {
		case 'low':
			return new _PreisachPlaneHozLowJXG_js__WEBPACK_IMPORTED_MODULE_1__["default"](id, atts, dispatcher);
		case 'high':
			return new _PreisachPlaneHozHighJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"](id, atts, dispatcher);
		default: 
			throw new Error("Must have a horizontal value");
	}
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreisachPlane);

/***/ }),

/***/ "../PreisachPlaneJXG/src/PreisachPlaneHozHighJXG.js":
/*!**********************************************************!*\
  !*** ../PreisachPlaneJXG/src/PreisachPlaneHozHighJXG.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreisachPlaneJXG.js */ "../PreisachPlaneJXG/src/PreisachPlaneJXG.js");
/* harmony import */ var _PPDist_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PPDist.js */ "../PreisachPlaneJXG/src/PPDist.js");
/* harmony import */ var _PPDist_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_PPDist_js__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @file PreisachPlaneHozLowJXG.js
 * @author m
 * @version 0.1
 * @date 2021
 */




/**
 * @class PreisachPlaneHozHighJXG
 */
class PreisachPlaneHozHighJXG extends _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"]  {
	/**
	 * @constructor
	 * @extends PreisachPlaneJXG
	 */
	constructor(id, props, dispatcher) {
		super(id, dispatcher);

		let orthos = this.getOrthoPoints(this.point);
		this.orthos = this.board.create('orthos', orthos, {});

		if ( props['dist-board'] ) {
			this.initCheckBoxes(); 
		}
	}

	initCheckBoxes() {
		this.cbHysterons 	= this.board.create('checkbox', [ 0.0, 	0.95, 'Hysterons' 		], _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"].CB_PROPS);
		this.cbHystegon 	= this.board.create('checkbox', [ 0.0, 	0.88, 'Hystegon' 		], _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"].CB_PROPS);
		this.cbSupport 		= this.board.create('checkbox', [ 0.0, 	0.81, 'Support' 		], _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"].CB_PROPS);
		this.cbDistT 		= this.board.create('checkbox', [ 0.0, 	0.74, 'X ~ Thresholds' 	], _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"].CB_PROPS);
		this.cbDistW 		= this.board.create('checkbox', [ 0.0, 	0.67, 'X ~ Weights' 	], _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"].CB_PROPS);
		// the thing about making distribution a pair of radio buttons is that they are usually both off
		// this.cbDistW.rendNodeCheckbox.type = 'radio';


		this.cbDistT.rendNodeCheckbox.disabled = true;
		this.cbDistW.rendNodeCheckbox.disabled = true;

		super.addListeners();
	}

	init(props_board, props_draw, thresholds, weights) {
		/**
		 * init distribution
		 */
		if ( props_board['dist-board'] ) {
			if ( JXG.exists(this.dist) ) {
				this.dist.destroy();
				this.dist = null;
				// set visible distribution
			}
			this.dist = new _PPDist_js__WEBPACK_IMPORTED_MODULE_1__.PPDistHH( this.board, {thresholds: thresholds, weights: weights}, {});
			super.checked = props_draw;
			
			if ( this.memgon != null ) {
				this.board.removeObject(this.memgon);
			}
			this.memgon = this.board.create('memgonHH', this.dist.support, {});

			// if ( props_board['input-board'] ) {
			// 	this.memgon = this.board.create('memgon', this.dist.support, {});
			// } else {
			// 	this.memgon = this.board.create('memgonHL', this.dist.support, {});
			// }
		}
		
		/**
		 * init point
		 */
		let ptFilename;

		if ( props_board['input-board'] ) {
			ptFilename = 'NES_red.svg';
		} else {
			ptFilename = 'NES_blue.svg';
		}
		super.initPoint(props_board, ptFilename);

		/**
		 * init axes
		 */
		super.initAxes(props_board);
	}

	lowHigh2xy(p) { 
		return { 
			"x": p.high, 
			"y": 1 - p.low
		};
	}

	support2xy(sup) {
		return {
			'bot': [ () => sup.low + sup.diag, () => sup.low            ],
			'top': [ () => sup.high,           () => sup.low             ],
			'sq':  [ () => sup.high,           () => sup.high - sup.diag ] 
		};
	}
	// support2xy(sup) {
		// return [
		// 	[ sup.low + sup.diag,	sup.low 				],
		// 	[ sup.high, 			sup.low 				],
		// 	[ sup.high, 			sup.high - sup.diag 	] 
		// ];
		// }

	/**
	 * @override
	 * @param 
	 * @return
	 */
	getOrthoPoints(x) {
		return {    
			'c': [ [ ()=>x.X(), 1         ], [ ()=>x.X(), ()=>x.X() ] ],
			'w': [ [ 1,         ()=>x.X() ], [ ()=>x.X(), ()=>x.X() ] ],
			'p': [ [ ()=>x.X(), 0         ], [ ()=>x.X(), ()=>x.X() ] ]
		};
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreisachPlaneHozHighJXG);

/***/ }),

/***/ "../PreisachPlaneJXG/src/PreisachPlaneHozLowJXG.js":
/*!*********************************************************!*\
  !*** ../PreisachPlaneJXG/src/PreisachPlaneHozLowJXG.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreisachPlaneJXG.js */ "../PreisachPlaneJXG/src/PreisachPlaneJXG.js");
/* harmony import */ var _PPDist_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PPDist.js */ "../PreisachPlaneJXG/src/PPDist.js");
/* harmony import */ var _PPDist_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_PPDist_js__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @file PreisachPlaneHozHighJXG.js
 * @author m
 * @version 0.1
 * @date 2021
 */




/**
 * @class PreisachPlaneHozHighJXG
 */
class PreisachPlaneHozLowJXG extends _PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"]  {
	/**
	 * @constructor
	 * @extends PreisachPlaneJXG
	 */
	constructor(id, props, dispatcher) {
		super(id, dispatcher);

		let orthos = this.getOrthoPoints(this.point);
		this.orthos = this.board.create('orthos', orthos, {});

		if ( props['dist-board'] ) {
			this.initCheckBoxes(); 
		}
	}

	initCheckBoxes() {
		let CB_PROPS = { ..._PreisachPlaneJXG_js__WEBPACK_IMPORTED_MODULE_0__["default"].CB_PROPS, "cssStyle": 'direction: rtl'};
		this.cbHysterons 	= this.board.create('checkbox', [ 0.82, 	0.15, 'Hysterons' 		], CB_PROPS);
		this.cbHystegon 	= this.board.create('checkbox', [ 0.82, 	0.22, 'Hystegon' 		], CB_PROPS);
		this.cbSupport 		= this.board.create('checkbox', [ 0.82, 	0.29, 'Support' 		], CB_PROPS);
		this.cbDistT 		= this.board.create('checkbox', [ 0.82, 	0.36, 'X ~ Thresholds' 	], { ...CB_PROPS, "id": "XT", "class": "XT" } );
		this.cbDistW 		= this.board.create('checkbox', [ 0.82, 	0.43, 'X ~ Weights' 	], CB_PROPS);
	
		// console.log(this.cbDistT);
		let maxw = this.cbDistT.rendNode.clientWidth;

		let d = maxw - this.cbHysterons.rendNode.clientWidth;
		this.cbHysterons.rendNode.style['margin-left'] = d+'px';

		d = maxw - this.cbHystegon.rendNode.clientWidth;
		this.cbHystegon.rendNode.style['margin-left'] = d+'px';

		d = maxw - this.cbSupport.rendNode.clientWidth;
		this.cbSupport.rendNode.style['margin-left'] = d+'px';

		d = maxw - this.cbDistW.rendNode.clientWidth;
		this.cbDistW.rendNode.style['margin-left'] = d+'px';

		this.cbDistT.rendNodeCheckbox.disabled = true;
		this.cbDistW.rendNodeCheckbox.disabled = true;


		super.addListeners();
	}

	init(props_board, props_draw, thresholds, weights) {
		/**
		 * init distribution
		 */
		if ( props_board['dist-board'] ) {
			if ( JXG.exists(this.dist) ) {
				this.dist.destroy();
				this.dist = null;
				// set visible distribution
			}
			this.dist = new _PPDist_js__WEBPACK_IMPORTED_MODULE_1__.PPDistHL( this.board, {thresholds: thresholds, weights: weights}, {});
			
			super.checked = props_draw;
			
			if ( this.memgon != null ) {
				this.board.removeObject(this.memgon);
			}
			this.memgon = this.board.create('memgonHL', this.dist.support, {});			
		}
		
		/**
		 * init point
		 */
		let ptFilename;

		console.log('props_board[input-board]', props_board['input-board']);

		if ( props_board['input-board'] ) {
			ptFilename = 'NEW_red.svg';
		} else {
			ptFilename = 'NEW_blue.svg';
		}
		super.initPoint(props_board, ptFilename);
		
		/**
		 * init axes
		 */
		// let axisLabels = props.labels;
		super.initAxes(props_board);
	}
	
	lowHigh2xy(p) { 
		return { // "x": p.high, "y": 1 - p.low } 
			"x": p.low,  
			"y": 1 - p.high
		};
	}

	support2xy(sup) {
		return {
			'bot': [ () => sup.low, 			() => sup.low + sup.diag ],
			'top': [ () => sup.low, 			() => sup.high 			],
			'sq': [ () => sup.high - sup.diag, 	() => sup.high 			] 
		};
	}
	// support2xy(sup) {
		// return [
		// 	[ sup.low, 				sup.low + sup.diag 	],
		// 	[ sup.low, 			 	sup.high 			],
		// 	[ sup.high - sup.diag, 	sup.high 			] 
		// ];
		// }
	
	/**
	 * @override
	 * @param 
	 * @return
	 */
	getOrthoPoints(x) {
		return {
					'c': [ [ 1, 		()=>x.X() ], [ ()=>x.X(), ()=>x.X() ] ],
					'w': [ [ ()=>x.X(), 1		  ], [ ()=>x.X(), ()=>x.X() ] ],
					'p': [ [ 0, 		()=>x.X() ], [ ()=>x.X(), ()=>x.X() ] ]	
				};
	}

	// drawHysterons = (h) => {
		// 	// console.log(h[0].props);
		// 	return h.forEach( hi => {
		// 		// super.drawHysteron(hi.pp, hi.props);
		// 		this.hysterons.addPoint( this.board.create( 'point', hi.pp, hi.props ) );
		// 	});
		// }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreisachPlaneHozLowJXG);


/***/ }),

/***/ "../PreisachPlaneJXG/src/PreisachPlaneJXG.js":
/*!***************************************************!*\
  !*** ../PreisachPlaneJXG/src/PreisachPlaneJXG.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @author m 
 * @version 0.1
 * @date 2021
 */

/**
 *
 */
const BOARD_PROPS = {
	"boundingbox": [-0.15, 1.15, 1.15, -0.15],
	"axis": false,	
	"showInfobox": false,
	"grid": false,
	"showNavigation": false,
	"showCopyright": false,
	"zoom": { "wheel": true, 	"needshift": true, "factorX": 1.5, "factorY": 1.5 },
	"pan":  { "enabled": true, 	"needshift": true },
	"axesAlways": true
};

// const CB_PROPS = {
	// "strokecolor": "#aaa", 
	// "highlightstrokecolor":"#fff",
	// "fixed": true
	// };

/**
 * @classdesc containing the jxg.board and all jxg.geomElements drawn on the Preisach plane
 * @class PreisachPlane
 */
class PreisachPlaneJXG {
	static CB_PROPS = {
		"strokecolor": "#aaa", 
		"highlightstrokecolor":"#fff",
		"fixed": true
	};

	/**
	 * create a PreisachPlane
	 * @constructor PreisachPlane
	 * @param {string} id - the id of the dom element to hold the board
	 */
	constructor(id, dispatcher) {
		if (this.constructor == PreisachPlaneJXG) {
			throw new Error("Abstract class PreisachPlaneJXG can't be instantiated.");
		}

		this.dispatcher = dispatcher;

		this.board 	= JXG.JSXGraph.initBoard( id, BOARD_PROPS );

		// Kind of want to not give attributes here
		// console.log(attributes);
		// console.log(attributes.labels);

		// this.axes = this.board.create('doubleAxes', [], {labels: attributes.labels});
		this.axes = this.board.create('doubleAxes', [], {});

		let guide = this.board.create('diagonal', [], {});

		this.point = this.board.create('gliderIMG', [1, 1, guide], {});
		// this.point = this.board.create('glider', [1, 1, guide], {});
		// this.point = JXG.pointPattern(this.board.container, this.point, '', {});

		this.orthos = null; 
		this.dist 	= null;

		// this.hysterons 	= null;
		// 'group' ...for points, 
		// not for a group of curves
		// no good reason to use a group here cause an array would group them as much as we need
		this.hysterons 	= this.board.create('group');

		// if ( attributes['dist-board'] ) {
		// 	// this.createButtons();
		// 	this.memgon = this.board.create('memgon', this.dist.support, {});
		// }

		// if ( attributes['input-board'] ) {
		// 	let that = this;
		// 	this.point.on('drag', function() { 
		// 		// this.memgon.updateMemgon(x);
		// 		that.dispatcher.dispatchEvent( 'inputChanged', this.X() );
		// 	});
		// }


		this.point.on('drag', function() { dispatcher.dispatchEvent('inputChanged', this.X()); });

		// let that = this;
		// this.point.on('drag', function() { that.inputChanged(this.X()); } );
	}

	// initPieces(x) {
		// console.log('input changed');
		// console.log('PreisachPlaneJXG --> initPieces STARTING');
		// this.point.moveTo( [x, x] );
		// JUST Don'T need the memgon here
		// if (JXG.exists(this.dist)) {
		// 	// console.log(this.memgon);
		// 	// throw new Error();
		// 	this.memgon.updateMemgon(x);
		// }
		// console.log('PreisachPlaneJXG --> initPieces FINISHED');
	// }


	updateDistribution(dist) {
		// if (dist.thresholds) {
		// 	this.dist.update('thresholds');
		// } else if (dist.weights) {
		// 	this.dist.update('weights');
		// } else {
		// 	this.dist.update('none');
		// }

		// this.setCurrentDistributions(dist);
	}

	inputUpdated(x) {
		// console.log('input changed');
		console.log('PreisachPlaneJXG --> inputUpdated STARTING');
		this.point.moveTo( [x, x] );
		if (JXG.exists(this.dist)) {
			// console.log(this.memgon);
			// throw new Error();
			this.memgon.updateMemgon(x);
		}
		console.log('PreisachPlaneJXG --> inputUpdated FINISHED');
	}

	/**
	 * @param 
	 * @return
	 */
	// init(props_board, props_draw, ptFilename) {
		// // let initDistribution = (props_draw) => {
		// 	// if ( JXG.exists(this.dist) ) {
		// 	// 	this.dist.destroy();
		// 	// 	this.dist = null;
		// 	// 	// set visible distribution
		// 	// }
		// 	// // new distribution created in child class
		// 	// this.dist = this.initDistribution(props_draw);
		// 	// this.initCheckBoxes(props_draw);
		// 	// this.initCheckBoxValues(props_draw);
		// 	// }

		// this.initAxes(props_board);

		// this.initPoint(ptFilename);
		// // this.initHysterons();

		// // if ( props_board['dist-board'] ) {
		// 	// initDistribution();
		// 	// this.initCheckBoxes(props_draw);
		// 	// this.initCheckBoxValues(props_draw);
		// 	// }		

		// // init visible
		// }	
	initPoint(props_board, ptFilename) {
		let ptProps = ( props_board['input-board'] ) 
					? {"size": 30, "fixed": false}
					: {"size": 20, "fixed": true};
		this.point.updatePointImage(ptFilename, ptProps);
	}
	initAxes(props_board){
		// init axes
		if ( JXG.exists(props_board.labels) ) {
			this.axes.updateLabels(props_board.labels);
		}
	}
	initHysterons(){
		// if ( this.hysterons != null ) {
		// 	Object.values(this.hysterons.objects).forEach( h => this.board.removeObject(h) );
		// }
	}
	initDistribution(){ throw new Error("Method 'initDistribution()' \tmust be implemented."); }
	initCheckBoxes(){ 	throw new Error("Method 'initCheckBoxes()'   \tmust be implemented."); }

	set checked(draw) {
		// draw can maybe just be a const for now
		// 
		// HOWEVER 
		// 	we still need to know which is the current selection from 
		// 		settings.config 
		// 	...even if it is not visible on the board
		// const draw1 = {
			// "hysterons": true,
			// "support": false,
			// "distribution": {
			// 	"thresholds": false,
			// 	"weights": false
			// },
			// "dist": {
			// 	"thresholds": {
			// 		"uniform": false,
			// 		"normal": false,
			// 		"linear": false
			// 	},
			// 	"weights": {
			// 		"uniform": false,
			// 		"normal": false,
			// 		"linear": false
			// 	}
			// }
			// }
		// console.log(draw);

		this.cbHysterons.rendNodeCheckbox.checked 	= draw.hysterons;
		this.cbHystegon.rendNodeCheckbox.checked 	= draw.hystegon;
		this.cbSupport.rendNodeCheckbox.checked		= draw.support;
		// this.cbDistT.rendNodeCheckbox.checked 		= draw.distribution.thresholds;
		// this.cbDistW.rendNodeCheckbox.checked 		= draw.distribution.weights;
	}

	set visible(draw) {	
		// if (draw.hysterons) {
		// 	// this.dist.
		// }
		if (draw.support) {
			this.dist.showLines();
		} else {
			this.dist.hideLines();
		}

		// if (draw.distribution.thresholds) {
		// 	this.dist.showThresholds();
		// } else {
		// 	this.dist.hideThresholds();
		// }

		// if (draw.distribution.weights) {
		// 	this.dist.showWeights();
		// } else {
		// 	this.dist.hideWeights();
		// }


		// this.dist.update(draw);
		// if(!draw.hysterons) { this.healthy.hide(); }
		// if(!draw.support) { this.cycle.hide(); }
		// if(!draw.distribution.thresholds) { this.solSet.hide(); }
		// if(!draw.distribution.weights) { this.dist.hide(); }
		// // Object.entries( cfg.draw.io ).forEach( ([k, v]) => { this.[k]
	}

	get checked() {
		return {
			'hysterons': 	this.cbHysterons.rendNodeCheckbox.checked,
			'hystegon': 	this.cbHystegon.rendNodeCheckbox.checked,
			'support': 		this.cbSupport.rendNodeCheckbox.checked,
			// 'distribution': {
				// 'thresholds': 	this.cbDistT.rendNodeCheckbox.checked,
				// 'weights': 		this.cbDistW.rendNodeCheckbox.checked
			// }
		};
	}

	addListeners() {
		// function cbHysteronsChanged(e) {
		// 	e.target.checked ? this.hysterons.forEach( h => h.setAttribute({'visible': true}) ) 	
		// 					: this.hysterons.forEach( h => h.setAttribute({'visible': false}) );

		// }

		let cbHysteronsChanged = (e) => {
			// e.target.checked 	? this.showHysterons() 	
			// 					: this.hideHysterons();
			if ( e.target.checked ) {
				// this.dispatcher.dispatchEvent('showHysteronsClicked');
				this.showHysterons();
			} else {
				// this.dispatcher.dispatchEvent('hideHysteronsClicked');
				this.hideHysterons();
			}
		}
		let cbHystegonChanged = (e) => {
			// e.target.checked 	? this.showHysterons() 	
			// 					: this.hideHysterons();
			if ( e.target.checked ) {
				// this.dispatcher.dispatchEvent('showHysteronsClicked');
				this.showHystegon();
			} else {
				// this.dispatcher.dispatchEvent('hideHysteronsClicked');
				this.hideHystegon();
			}
		}


		let cbSupportChanged = (e) => {
			// e.target.checked 	? this.showSupport()
			// 					: this.hideSupport();
			if ( e.target.checked ) {
				// this.dispatcher.dispatchEvent('showSupportClicked');
				this.showSupport();
			} else {
				// this.dispatcher.dispatchEvent('hideSupportClicked');
				this.hideSupport();
			}
		}

		// let cbDistTChanged = (e) => {
			// if ( e.target.checked ) {
			// 	// this.cbDistW.rendNodeCheckbox.checked = false;
			// 	// this.dispatcher.dispatchEvent('showDistTClicked');
			// 	this.dispatcher.dispatchEvent('getThresholdsType');
			// 	// this.showThresholdsDist();
			// } else {
			// 	// this.dispatcher.dispatchEvent('hideDistTClicked');
			// 	this.hideThresholdsDist();
			// }
			// }
		
		// let cbDistWChanged = (e) => {
			// if ( e.target.checked ) {
			// 	// this.cbDistT.rendNodeCheckbox.checked = false;
			// 	// this.dispatcher.dispatchEvent('showDistWClicked');
			// 	this.dispatcher.dispatchEvent('getWeightsType');
			// 	// this.showWeightsDist();
			// } else {
			// 	// this.dispatcher.dispatchEvent('hideDistWClicked');
			// 	this.hideWeightsDist();
			// }
			// }

		JXG.addEvent( this.cbHysterons.rendNodeCheckbox, 'change', e => cbHysteronsChanged(e), 	this.cbHysterons );
		JXG.addEvent( this.cbHystegon.rendNodeCheckbox,  'change', e => cbHystegonChanged(e), 	this.cbHystegon );
		JXG.addEvent( this.cbSupport.rendNodeCheckbox, 	 'change', e => cbSupportChanged(e), 	this.cbSupport );
		// JXG.addEvent( this.cbDistT.rendNodeCheckbox, 	 'change', e => cbDistTChanged(e), 		this.cbDistT );
		// JXG.addEvent( this.cbDistW.rendNodeCheckbox, 	 'change', e => cbDistWChanged(e), 		this.cbDistW );

		// JXG.addEvent( this.cbHysterons.rendNodeCheckbox, 'change', e => e.target.checked ? this.showHysterons() 	: this.hideHysterons(), this.cbHysterons );
		// JXG.addEvent( this.cbSupport.rendNodeCheckbox, 	 'change', e => e.target.checked ? this.showSupport() 		: this.hideSupport(), this.cbSupport );
		// JXG.addEvent( this.cbDistT.rendNodeCheckbox, 	 'change', e => e.target.checked ? this.showThresholdsDist(): this.hideThresholdsDist(), this.cbDistT );
		// JXG.addEvent( this.cbDistW.rendNodeCheckbox, 	 'change', e => e.target.checked ? this.showWeightsDist() 	: this.hideWeightsDist(), this.cbDistW );
	}
	
	update(show) {
		// console.log('hi');
		// 
		// here we must get signal to show/hide a distribution or none
		// 
		if (JXG.exists(this.dist)) {
			this.dist.update(show);
		}
		this.board.update();
	}

	/**
	 * @abstract
	 * @param 
	 * @return
	 */
	// drawHysterons(h){ throw new Error("Method 'drawHysterons()' \tmust be implemented."); }	
	drawHysteron = (loc, props) => {
		this.hysterons.addPoint( this.board.create( 'point', loc, props ) );
		// // // props = {...PROPS.hysteron, ...props};
		// // console.log(coords);
		// this.hysterons.push(
		// 	this.board.create( 'point', coords, props )
	}

	/**
	 * 
	 */
	removeHysterons() {
		// if (typeof(this.hysterons) !== undefined && this.hysterons.length > 0)
		if (this.hysterons != null) {
			Object.values(this.hysterons.objects).forEach( h => this.board.removeObject(h.point) );
		}
		return this.board.create('group');
	}

	/**
	 * @param 
	 * @return
	 */
	reset(cfg) {
		// this.support.destroy();
		// this.distribution.destroy();
		this.hysterons = this.removeHysterons(this.hysterons);
		// this.point.reset();
		// this.point.moveTo([1, 1]);
	}

	focusSupport() { this.cbSupport.rendNodeCheckbox.checked = true; this.dist.showLines(); }
	blurSupport() { this.cbSupport.rendNodeCheckbox.checked = false; this.dist.hideLines(); }

	// focusDistT() { this.cbDistT.rendNodeCheckbox.checked = true; this.dist.showThresholds(); }
	// blurDistT() { this.cbDistT.rendNodeCheckbox.checked = false; this.dist.hideThresholds(); }

	// focusDistW() { this.cbDistW.rendNodeCheckbox.checked = true; this.dist.showWeights(); }
	// blurDistW() { this.cbDistW.rendNodeCheckbox.checked = false; this.dist.hideWeights(); }

	showSupport() { this.dist.showLines(); }
	hideSupport() { this.dist.hideLines(); }
	
	// showThresholdsDist() { this.dist.update('thresholds'); }
	// hideThresholdsDist() { this.dist.update('none'); }

	// showWeightsDist() { this.dist.update('weights'); }
	// hideWeightsDist() { this.dist.update('none'); }

	// showHysterons() { this.hysterons.forEach( h => h.setAttribute({'visible': true}) );}
	// hideHysterons() { this.hysterons.forEach( h => h.setAttribute({'visible': false}) ); }
	showHysterons() { this.hysterons.setAttribute({'visible': true}); }
	hideHysterons() { this.hysterons.setAttribute({'visible': false});}

	showHystegon() { this.memgon.setAttribute({'visible': true}); }
	hideHystegon() { this.memgon.setAttribute({'visible': false});}

	// focus(str) { 
		// this.cbSupport.rendNodeCheckbox.checked = true; this.dist.showLines(); 
		// }
	// blur(str) { 
		// this.cbSupport.rendNodeCheckbox.checked = false; this.dist.hideLines(); 
		// }

	/**
	 * @param {} bb
	 */
	set boundingBox(bb) { this.board.attr.boundingbox = bb; }
	
	/**
	 * @abstract
	 * @param x jxg point 
	 * @return {c, w, p} arrays of functions to points for 'connector', 'painter', 'wiper'
	 */
	getOrthoPoints(x) 	{ throw new Error("Method 'getOrthoPoints()' \tmust be implemented."); }
	lowHigh2xy(p) 		{ throw new Error("Method 'lowHigh2xy()' \tmust be implemented."); }
	support2xy(sup) 	{ throw new Error("Method 'support2xy()' \tmust be implemented."); }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreisachPlaneJXG);

/***/ }),

/***/ "../PreisachPlaneJXG/src/ptIMG_jxg.js":
/*!********************************************!*\
  !*** ../PreisachPlaneJXG/src/ptIMG_jxg.js ***!
  \********************************************/
/***/ (() => {

/**
 * @file JXG_Extensions.js
 * @author m
 * @date 2002
 * @version 0.0.1
 */

/**
 *
 */
(function() {
/**
 *
 */
JXG.extend(JXG, /** @lends JXG */ {
	point2image: function(board, parents, attributes) {
	// pointPattern: function(boardID, pt, fileName, attributes) {
		function createPattern(attributes) {
			let pat = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
			pat.setAttribute('id', attributes.patternID );
			pat.setAttribute('x', 0);
			pat.setAttribute('y', 0);
			pat.setAttribute('width', "100%");
			pat.setAttribute('height', "100%");

			// pat.setAttribute('patternUnits', "userSpaceOnUse");
			pat.setAttribute('patternUnits', "objectBoundingBox");
			return pat;
		}

		function createImage(attributes) {
			let img = document.createElement("image");
			img.setAttribute('id', attributes.imgID );
			img.setAttribute('x', 0);
			img.setAttribute('y', 0);
			img.setAttribute('height', attributes.rnHeight);

			return img;
		}
		
		function refreshDefs(defs) {
			// BOGUS
				// https://stackoverflow.com/questions/39986537/how-can-i-dynamically-add-a-pattern-image-to-a-svg
			let str = defs.innerHTML;
			defs.innerHTML = '';
			defs.innerHTML = str;
		}

		function injectDef(point, attributes) { 
			let img = createImage(attributes);
			let pat = createPattern(attributes);
			pat.appendChild(img);
			let defs = document.querySelector('#' + attributes.boardID + '>svg>defs');
			defs.appendChild(pat);

			if (JXG.exists(attributes.filename)) {
				// img.setAttribute('href', attributes.filename);
				point.updatePointImage(attributes.filename, attributes);
			}
			return defs;
		}

		let boardID = board.container;
		let pointID = parents.id;
		// let pointID = boardID + '_xx';
		let patternID = boardID + '_' + pointID + '_pattern';
		let imgID = boardID + '_' + pointID + '_pattern_image';

		if(!JXG.exists(attributes))
			attributes = {};

		attributes = {  ...attributes,
			"boardID": 		boardID,
			"id": 			pointID,
			"patternID": 	patternID,
			"imgID": 		imgID,
			"face": 		'[]',
			"name": 		"",
			"strokewidth":	0,
			"highlightstrokewidth": 0,
			"fillOpacity": 			1.0,
			"highlightfillOpacity":	1.0,
			"fillColor": 			"red",
			"highlightfillColor": 	"red"
		};

		let point = parents; // there is only 1 parent
		point.setAttribute(attributes);
		
		// let height = pt.rendNode.height.baseVal.value;
		attributes['rnHeight'] = point.rendNode.height.baseVal.value;
		
		let defs = injectDef(point, attributes);
		refreshDefs(defs);

		point.rendNode.setAttribute("fill", "url(#" + patternID + ")");

		// this.pt = pt;
		return point;
	}
});

/**
 *
 */
// JXG.extend(JXG.CoordsElement.prototype, /** @lends JXG.CoordsElement.prototype */ {
	// 	/**
	// 	 * Convert the point to glider and update the construction.
	// 	 * To move the point visual onto the glider, a call of board update is necessary.
	// 	 * @param {String|Object} slide The object the point will be bound to.
	// 	 */
	// 	makePointIMG: function (slide) {
	// 		var slideobj = this.board.select(slide),
	// 			onPolygon = false,
	// 			min,
	// 			i,
	// 			dist;

	// 		if (slideobj.type === Const.OBJECT_TYPE_POLYGON){
	// 			// Search for the closest edge of the polygon.
	// 			min = Number.MAX_VALUE;
	// 			for (i = 0; i < slideobj.borders.length; i++){
	// 				dist = JXG.Math.Geometry.distPointLine(this.coords.usrCoords, slideobj.borders[i].stdform);
	// 				if (dist < min){
	// 					min = dist;
	// 					slide = slideobj.borders[i];
	// 				}
	// 			}
	// 			slideobj = this.board.select(slide);
	// 			onPolygon = true;
	// 		}

	// 		/* Gliders on Ticks are forbidden */
	// 		if (!Type.exists(slideobj)) {
	// 			throw new Error("JSXGraph: slide object undefined.");
	// 		} else if (slideobj.type === Const.OBJECT_TYPE_TICKS) {
	// 			throw new Error("JSXGraph: gliders on ticks are not possible.");
	// 		}

	// 		this.slideObject = this.board.select(slide);
	// 		this.slideObjects.push(this.slideObject);
	// 		this.addParents(slide);

	// 		this.type = Const.OBJECT_TYPE_GLIDER;
	// 		this.elType = 'glider';
	// 		this.visProp.snapwidth = -1;          // By default, deactivate snapWidth
	// 		this.slideObject.addChild(this);
	// 		this.isDraggable = true;
	// 		this.onPolygon = onPolygon;

	// 		this.generatePolynomial = function () {
	// 			return this.slideObject.generatePolynomial(this);
	// 		};
	// 	}
	// }

JXG.extend(JXG.Point.prototype, /** @lends JXG.Point.prototype */ {
	updatePointImage: function(fileName, attributes) {	
		if(!JXG.exists(attributes))
			attributes = {};

		// update point props
		this.setAttribute({size: attributes.size});
		this.setAttribute({fixed: attributes.fixed});

		let height = this.rendNode.height.baseVal.value;

		// update image
		let imgID = this.board.container + '_' + this.id + '_pattern_image';
		// console.log(imgID);
		document.getElementById(imgID).setAttribute('href', fileName);
		document.getElementById(imgID).setAttribute('height', height);
	}
	
});
/**
 * @class This element is used to provide a constructor for a glider point.
 * @pseudo
 * @description A glider is a point which lives on another geometric element like a line, circle, curve, turtle.
 * @name Glider
 * @augments JXG.Point
 * @constructor
 * @type JXG.Point
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Number_Number_Number_JXG.GeometryElement} z_,x_,y_,GlideObject Parent elements can be two or three elements of type number and the object the glider lives on.
 * The coordinates are completely optional. If not given the origin is used. If you provide two numbers for coordinates they will be interpreted as affine Euclidean
 * coordinates, otherwise they will be interpreted as homogeneous coordinates. In any case the point will be projected on the glide object.
 * @example
 * // Create a glider with user defined coordinates. If the coordinates are not on
 * // the circle (like in this case) the point will be projected onto the circle.
 * var p1 = board.create('point', [2.0, 2.0]);
 * var c1 = board.create('circle', [p1, 2.0]);
 * var p2 = board.create('glider', [2.0, 1.5, c1]);
 * </pre><div class="jxgbox" id="JXG4f65f32f-e50a-4b50-9b7c-f6ec41652930" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *   var gpex1_board = JXG.JSXGraph.initBoard('JXG4f65f32f-e50a-4b50-9b7c-f6ec41652930', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var gpex1_p1 = gpex1_board.create('point', [2.0, 2.0]);
 *   var gpex1_c1 = gpex1_board.create('circle', [gpex1_p1, 2.0]);
 *   var gpex1_p2 = gpex1_board.create('glider', [2.0, 1.5, gpex1_c1]);
 * </script><pre>
 * @example
 * // Create a glider with default coordinates (1,0,0). Same premises as above.
 * var p1 = board.create('point', [2.0, 2.0]);
 * var c1 = board.create('circle', [p1, 2.0]);
 * var p2 = board.create('glider', [c1]);
 * </pre><div class="jxgbox" id="JXG4de7f181-631a-44b1-a12f-bc4d995609e8" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   var gpex2_board = JXG.JSXGraph.initBoard('JXG4de7f181-631a-44b1-a12f-bc4d995609e8', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var gpex2_p1 = gpex2_board.create('point', [2.0, 2.0]);
 *   var gpex2_c1 = gpex2_board.create('circle', [gpex2_p1, 2.0]);
 *   var gpex2_p2 = gpex2_board.create('glider', [gpex2_c1]);
 * </script><pre>
 *@example
 * //animate example 2
 * var p1 = board.create('point', [2.0, 2.0]);
 * var c1 = board.create('circle', [p1, 2.0]);
 * var p2 = board.create('glider', [c1]);
 * var button1 = board.create('button', [1, 7, 'start animation',function(){p2.startAnimation(1,4)}]);
 * var button2 = board.create('button', [1, 5, 'stop animation',function(){p2.stopAnimation()}]);
 * </pre><div class="jxgbox" id="JXG4de7f181-631a-44b1-a12f-bc4d133709e8" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   var gpex3_board = JXG.JSXGraph.initBoard('JXG4de7f181-631a-44b1-a12f-bc4d133709e8', {boundingbox: [-1, 10, 10, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var gpex3_p1 = gpex3_board.create('point', [2.0, 2.0]);
 *   var gpex3_c1 = gpex3_board.create('circle', [gpex3_p1, 2.0]);
 *   var gpex3_p2 = gpex3_board.create('glider', [gpex3_c1]);
 *   gpex3_board.create('button', [1, 7, 'start animation',function(){gpex3_p2.startAnimation(1,4)}]);
 *   gpex3_board.create('button', [1, 5, 'stop animation',function(){gpex3_p2.stopAnimation()}]);
 * </script><pre>
 */
JXG.createPointIMG = function (board, parents, attributes) {
	el = board.create('point', parents, attributes);
	el = JXG.point2image(board, el, attributes);

	// if (JXG.exists(attributes.filename)) {
	// 	el.updatePointImage(attributes.filename, attributes);
	// }
	return el;
};

JXG.createGliderIMG = function (board, parents, attributes) {
	el = board.create('glider', parents, attributes);
	el = JXG.point2image(board, el, attributes);

	// console.table(attributes);
	// if (JXG.exists(attributes.filename)) {
	// 	// console.log('hi everybodyeverybodyeverybodyeverybodyeverybodyeverybodyeverybodyeverybody');
	// 	el.updatePointImage(attributes.filename, attributes);
	// }

	return el;
};

JXG.DoubleAxes = function (board, parents, attributes) {
	// constructor(board, attributes, Const.OBJECT_TYPE_LINE, Const.OBJECT_CLASS_LINE);	
	this.constructor(parents);		

	this.rotateStr = (str) => '<div style="transform: rotate(-90deg);">' + str + '</div>';
	// this.updateLabels = function (labels) {
		// 	axRight.setAttribute( { 'name': labels.right.x } );
		// 	ayRight.setAttribute( { 'name': rotateStr(labels.right.y) } );
		// 	axCentre.setAttribute( { 'name': labels.centre.x } );
		// 	ayCentre.setAttribute( { 'name': rotateStr(labels.centre.y) } );
		// }}

	this.methodMap = JXG.deepCopy(this.methodMap, {
		updateLabels: 'updateLabels'
	});
};

JXG.DoubleAxes.prototype = new JXG.Composition();

JXG.extend(JXG.DoubleAxes.prototype, /** @lends JXG.DoubleAxes.prototype */ {
	updateLabels: function (labels) {
		this.axRight.setAttribute( { 'name': labels.right.x } );
		this.ayRight.setAttribute( { 'name': this.rotateStr(labels.right.y) } );
		this.axCentre.setAttribute( { 'name': labels.centre.x } );
		this.ayCentre.setAttribute( { 'name': this.rotateStr(labels.centre.y) } );
	}
});

JXG.createDoubleAxes = function (board, parents, attributes) {
	let xRight = {
		"withLabel": true,
		"label": {
			"position": 'urt',
			"fontSize": 16,
			"strokeColor": '#d2d2d2',
			"highlightStrokeColor": '#d2d2d2',
			"strokeOpacity": 1,
			"highlightStrokeOpacity": 1,
			"offset": [-37, 20]
		},
		"ticks": {
			"position": 'lft',
			"strokeColor": "#d2d2d2",
			"label": {
				"strokeColor": "#d2d2d2",
				"highlightStrokeColor": '#d2d2d2',
				"strokeOpacity": 1,
				"highlightStrokeOpacity": 1,
				"anchorX": 'middle',
				"anchorY": 'top'
			},
		}
	};

	let xCentre = {
		"withLabel": true,
		"label": {
			"fontSize": 20,
			"position": 'bot',
			// "visible": true,
			"strokeColor": '#d2d2d2',
			"highlightStrokeColor": '#d2d2d2',
			"strokeOpacity": 1,
			"highlightStrokeOpacity": 1,
			"offset": [-30, -40] // these should surely be percentages
		},
		"ticks": {
			"visible": false
		}
	};

	let yRight = JXG.deepCopy(xRight);
		yRight.ticks.label = { ...yRight.ticks.label,
			"anchorX": 'right',
			"anchorY": 'middle',
			"offset": [-6, 0]
		};
		yRight.ticks.tickEndings = [1, 0];
		yRight.label.offset = [0, -20];

	let yCentre = JXG.deepCopy(xCentre);
		yCentre.label.offset = [-80, 0];

	// if (parents.length === 2  && Type.isArray(parents[0]) && parents[0].length > 1) {
		// 	attr = Type.copyAttributes(attributes, board.options, 'line');

		// 	el = new JXG.Line(board, p1, p2, attr);
		// 	el.setParents([p1.id, p2.id]);
		// } else {
		// 	throw new Error("JSXGraph: Can't create line with parent types '" +
		// 					(typeof parents[0]) + "' and '" + (typeof parents[1]) + "'." +
		// 					"\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]");
		// }

	this.axRight = board.create('axis', [[0.0, 0.0], [1.0, 0.0]], xRight);
	this.ayRight = board.create('axis', [[0.0, 0.0], [0.0, 1.0]], yRight);
	this.axCentre = board.create('axis', [[0.0, 0.0], [1.0, 0.0]], xCentre);
	this.ayCentre = board.create('axis', [[0.0, 0.0], [0.0, 1.0]], yCentre);

	let els = {axRight: this.axRight, ayRight: this.ayRight, axCentre: this.axCentre, ayCentre: this.ayCentre};

	let el = new JXG.DoubleAxes(board, els, {});

	// console.log(attributes);
	// console.log(attributes.labels);

	if ( JXG.exists(attributes.labels) ) {
		el.updateLabels(attributes.labels);
	}

	return el;
};


JXG.registerElement('doubleAxes', JXG.createDoubleAxes);

JXG.registerElement('pointIMG', JXG.createPointIMG);
JXG.registerElement('gliderIMG', JXG.createGliderIMG);

})();

/***/ }),

/***/ "../RecruitmentBoards/src/BoardI.js":
/*!******************************************!*\
  !*** ../RecruitmentBoards/src/BoardI.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * @author marcd 2020
 */

(function(exports) {
const props = {
	board: { 
		axis: false,  			
		grid: false,
		showNavigation: false,
		showCopyright: false,
		boundingbox: [-0.15, 1, 1.15, -1],
		zoom: { wheel: false, factorX: 1.5, factorY: 1 }, 
		pan: { enabled: false}
	},
	guide: {
		strokewidth: 0.5,
		highlightstrokewidth: 0.5,
		fixed: true, 
		// highlightstrokecolor: 'black'
		strokecolor: '#ccc', 
		highlightstrokeColor: '#ccc'
	},
	tick: {	
		majorHeight: -1,
		minorHeight: 10,
		strokewidth: 0.5,
		highlightstrokewidth: 0.5,
		drawLabels: false,
		drawZero: true,
		strokeColor: '#ccc',
		highlightstrokeColor: '#ccc'
		// label: {
		// 	offset: [-4, 15],
		// 	strokeColor: '#ccc'
		// }
	},
	point: {
		id: "bip", 
		name: "",
		fixed: false,
		size: 30,
		// fill: 'red',
		// "fill": 	"url(../../../assets/svg/thumb.svg)"
		"filename": "thumb.svg"
	}
}
class BoardI {
	constructor(id, dispatcher) {
		this.board 	= JXG.JSXGraph.initBoard( id, props.board );

		let guide 	= this.board.create('line', 	[[0, 0], [1, 0]], 	props.guide);

		this.point 	= this.board.create('gliderIMG', 	[ 1, 0, guide], 	props.point);
		// this.point.updatePattern('thumb.svg', props.point);
		let img = document.getElementById(this.board.container + '_' + this.point.id + '_pattern_image');
		
		let h = document.getElementById(this.board.container + '_' + this.point.id).clientHeight;
		// console.log(h);
		// should be able to put these into ...attributes anyway

		// BOGUS
		// 	img.setAttribute('x', "1px"); // 	who knows why???
		// 	centre vertical line is 1 px ... should change it to 2!!!
		img.setAttribute('x', "1px"); 

		// height = 2/3 * width => offset = 1/6 h
		img.setAttribute('y', h/6 + "px");
		img.setAttribute('height', "100%");

		this.board.create('ticks', 	[guide, 0.1], props.tick);

		this.point.on('drag', function() { 
			dispatcher.dispatchEvent('inputChanged', this.X()); 
		});
		// this.views.boards.bi.point.on( 'drag', function() { t.update(this.X()); });		
		// this.dispatcher.addEventListener('inputChanged', v => this.update(v) );
	}

	// init(domain) {
		// this.domain = domain;
		// this.board.attr.boundingbox = [domain[0], 0.18, domain[1], -0.12];
		// this.point.moveTo([domain[1], 0]);
		// }

	/**
	 * @param 
	 */
	reset(cfg) {
		this.clear(cfg);
	}

	/**
	 * @param 
	 */
	clear(cfg) {
		// console.log(cfg);
		// console.log(cfg.input.high);
		// this.point.moveTo([0, 0]);
		// this.point.moveTo([0.98, 0]);
		this.point.moveTo([cfg.input.high, 0]);
	}

	/**
	 * @param 
	 */
	updateBB(bounds) {
		this.board.attr.boundingbox = [bounds[0], 0.18, bounds[1], -0.12];
	}
}
exports.BoardI = BoardI;
})(  false ? 0: exports );


/***/ }),

/***/ "../RecruitmentBoards/src/BoardIO.js":
/*!*******************************************!*\
  !*** ../RecruitmentBoards/src/BoardIO.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file BoardIO.js
 * @author m 
 * @date 2021
 * @version 0.0.2
 */

/**
 *
 */
// import JXG from 'jsxgraph';
// require("./JXG_IOCurves.js");

// import {default as IOCurves} from './IOCurves.js';
__webpack_require__(/*! ./curveGroup_jxg.js */ "../RecruitmentBoards/src/curveGroup_jxg.js");
const PROPS	= __webpack_require__(/*! ./props_IO.json */ "../RecruitmentBoards/src/props_IO.json");

/**
 * @classdesc containing the jxg.board and all jxg.geomElements drawn on the Input/Output plane
 * @class BoardIO
 */
class BoardIO {
	/**
	 * create an Input/Output plane
	 * @constructor BoardIO
	 * @param {string} id - the id of the dom element to hold the board
	 * @param {dispatcher}
	 */
	constructor(id, attributes, dispatcher) {
		let oy = () => [ 0, 					()=>this.point.Y() ];
		let xy = () => [ ()=>this.point.X(), 	()=>this.point.Y() ];
		let xo = () => [ ()=>this.point.X(), 	0 ];

		this.board = JXG.JSXGraph.initBoard( id, PROPS.board );
		
		this.axes = this.board.create('doubleAxes', [], {labels: attributes.labels});

		this.point = this.board.create( 'pointIMG', [1.0, 1.0], PROPS.point );

					 this.board.create( 'line', [oy(), xy()], PROPS.ortho); // hoz
					 this.board.create( 'line', [xo(), xy()], PROPS.ortho); // vert
		
		this.solSet 	= this.board.create('curveGroup', [], PROPS.curves.solSet);
		this.cycle  	= this.board.create('curveGroup', [], PROPS.curves.cycle);
		this.healthy 	= this.board.create('curveGroup', [], PROPS.curves.healthy);

		this.dispatcher = dispatcher;
		this.initCheckBoxes();
	}

	/**
	 *
	 */
	initCheckBoxes() {
		// let cbClicked = (e, c, str) => {
			// if (e.target.checked) {
			// 	console.log(this[str]);
			// 	if (this[str].curves.length > 0) {
			// 		this[str].show();
			// 	} else {
			// 		this.dispatcher.dispatchEvent( 'draw', str ); 
			// 	}
			// } else {
			// 	this[str].hide();
			// }
			// }

		let cbHealthyChanged = e => {
			e.target.checked ? this.healthy.setAttribute({'visible': true}) 
							 : this.healthy.setAttribute({'visible': false});
		}

		let cbCycleChanged = e => {
			e.target.checked ? this.cycle.setAttribute({'visible': true}) 
							 : this.cycle.setAttribute({'visible': false});
		}

		let cbSolSetChanged = e => {
			if ( JXG.exists( this.solSet ) ) {
				e.target.checked ? this.solSet.setAttribute({'visible': true}) 
								 : this.solSet.setAttribute({'visible': false});
			} else {
				// this.board.create
				console.log("NO SOL SET");
			}
		}



		this.cbHealthy 	= this.board.create('checkbox', [ 0.0, 	0.95, 'Healthy Curve' 	], 	PROPS.cb);
		this.cbCycle 	= this.board.create('checkbox', [ 0.0, 	0.88, 'Saturation Cycle'], 	PROPS.cb);
		this.cbSolSet 	= this.board.create('checkbox', [ 0.0, 	0.81, 'Solution Set' 	], 	PROPS.cb);
						  // this.board.create('button', 	[ 0.02, 0.74, 'Clear Trace', ()=>this.point.clearTrace()], PROPS.cb);
							this.board.create('button', 	[ 0.12, 1.02, 'Clear Trace', ()=>this.point.clearTrace()], PROPS.cb);

		JXG.addEvent( this.cbHealthy.rendNodeCheckbox, 	'change', e => cbHealthyChanged( e ), this.cbHealthy);
		JXG.addEvent( this.cbCycle.rendNodeCheckbox, 	'change', e => cbCycleChanged( 	 e ), this.cbCycle);
		JXG.addEvent( this.cbSolSet.rendNodeCheckbox, 	'change', e => cbSolSetChanged(  e ), this.cbSolSet);

		// JXG.addEvent( this.cbHealthy.rendNodeCheckbox, 	'change', e => cbClicked( e, this.healthy,	'healthy' ), this.cbHealthy);
		// JXG.addEvent( this.cbCycle.rendNodeCheckbox, 	'change', e => cbClicked( e, this.cycle,	'cycle'	  ), this.cbCycle);
		// JXG.addEvent( this.cbSolSet.rendNodeCheckbox, 	'change', e => cbClicked( e, this.solSet,	'solSet'  ), this.cbSolSet);

		// this.dispatcher.addEventListener('drawHealthy', (piece) 	=> this.healthy.add(piece) );
		// this.dispatcher.addEventListener('drawCycle', 	(pieces) 	=> this.cycle.addAll(pieces) );
		// this.dispatcher.addEventListener('drawSolSet', 	(piece) 	=> this.solSet.add(piece) );
		this.dispatcher.addEventListener('enableSolSet', () => {
			console.log('BIO: enableSolSet should be called');
			this.cbSolSet.rendNodeCheckbox.disabled = false;

			console.log('should be checked... BUT ...CB not checked');
			this.cbSolSet.rendNodeCheckbox.checked = true;
		});
		this.dispatcher.addEventListener('disableSolSet', () => {
			console.log('BIO: disableSolSet should be called');
			this.cbSolSet.rendNodeCheckbox.disabled = true;
			this.cbSolSet.rendNodeCheckbox.checked = false;
			this.cbSolSet.rendNodeCheckbox.value = false;
		});
	}
	
	// drawHealthy(pts) { this.healthy.add(pts); }
	// drawCycle(pieces) { this.cycle.addAll(pieces); }
	// drawSolSet(pts) { this.solSet.addAll(pts); }

	/**
	 *
	 */
	initBoard(boardProps, drawProps) {
		this.reset({...drawProps});

		// init axes
		if ( JXG.exists(boardProps.labels) ) {
			this.axes.updateLabels(boardProps.labels);
		}
		this.checked = drawProps;
		this.visible = drawProps;
	}

	/**
	 *
	 */
	init(cfg, healthy, cycle, solSet) {
		// console.log(cfg);
		this.reset(cfg);

		this.healthy.addCurve(healthy);
		this.cycle.addCurves(cycle);

		if ( solSet != null ) {
			this.solSet.addPromise(solSet);
		}

		this.visible = this.checked;
		this.point.clearTrace();

		console.log('BIO.init() -> this.cycle = ', this.cycle);
		// console.log('cbSolSet = ', this.cbSolSet.rendNodeCheckbox);
	}

	/**
	 * @param 
	 * @return
	 */
	reset(cfg) {
		this.board.suspendUpdate();

		this.point.clearTrace();
		this.healthy.removeAll();
		this.cycle.removeAll();
		this.solSet.removeAll();

		// this.checked = cfg; //.draw;
		// this.visible = cfg; //.draw;//.io;
		// this.cbSolSet.rendNodeCheckbox.disabled = cfg.solSetDisabled;
		// this.boundingbox = bb;
		// this.axes.updateLabels(labels);

		this.board.unsuspendUpdate();
	}

	set visible(draw) {
		if( !draw.Healthy ) { this.healthy.setAttribute( {visible: false} ); }
		if( !draw.Cycle ) 	{ this.cycle.setAttribute(	 {visible: false} ); }
		if( !draw.SolSet ) 	{ this.solSet.setAttribute(	 {visible: false} ); }
	}
	
	/**
	 * @param 
	 * @return
	 */
	set checked(draw) {
		// console.log(draw);
		this.cbHealthy.rendNodeCheckbox.checked = draw['Healthy'];
		this.cbCycle.rendNodeCheckbox.checked 	= draw['Cycle'];
		this.cbSolSet.rendNodeCheckbox.checked 	= draw['SolSet'];

		// Object.entries( cfg.draw ).forEach( ([k, v]) =>  {
		// 	this['cb'+k]['rendNodeCheckbox']['checked'] = v;
		// });
		// this.cbSolSet.rendNodeCheckbox.disabled = cfg.solSetDisabled;
	}

	set cbSolSet_value(val) {
		this.cbSolSet.rendNodeCheckbox.checked 	= val;
	}
	
	set cbSolSet_disabled(val) {
		// console.log('cbSolSet = ', this.cbSolSet.rendNodeCheckbox);
		this.cbSolSet.rendNodeCheckbox.disabled = val;
	}
	/**
	 * @param 
	 * @return
	 */
	get checked() {
		return {
			'Healthy': 	this.cbHealthy.rendNodeCheckbox.checked,
			'Cycle': 	this.cbCycle.rendNodeCheckbox.checked,
			'SolSet': 	this.cbSolSet.rendNodeCheckbox.checked
		};
	}

	/**
	 * @param 
	 * @return
	 */
	set boundingBox(bb) { this.board.attr.boundingbox = bb; }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoardIO);

/***/ }),

/***/ "../RecruitmentBoards/src/Boards.js":
/*!******************************************!*\
  !*** ../RecruitmentBoards/src/Boards.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/**
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 * let's imagine for now that when we init the boards we do not maintain a 'draw' state
 */ 
// let props_draw 	= require('./props_draw.json');

/**
 * @classdesc Abstract: containing the jxg.boards
 * @class Boards
 */
class Boards {
	// static propsDraw = require('./props_draw.json');

	/**
	 * create a Boards
	 * @constructor Boards
	 * @param {string} id - the id of the dom element to hold the board
	 */
	constructor(boards) {
		/**
		 *
		 */
		if (this.constructor == Boards) { throw new Error("Boards: Abstract classes can't be instantiated."); }

		this.bi  = boards.bi;
		this.bio = boards.bio;

		this.bpi = boards.bpi;
		this.bpo = boards.bpo;
		this.bvi = boards.bvi;
		
		this.boo = boards.bpo;
		// this.bi.init({disabled: false, hasDist: false}, cfg.thresholds, cfg.weights);

		this.dom_oo	= document.getElementById('div-out');
		this.dom_pi = document.getElementById('jxg-pressure-in');

		// defined in child class
		this.distBoard = null;
	}

	/**
	 * @override
	 * @param {array} pieces - array of array or pieces
	 */
	update = pieces => {
		console.log('Boards.update() --> pieces', pieces);
		// throw new Error();
		// console.log(typeof this);
		// qualityDown([this.jxbIO, this.jxbInput, this.jxbII]);		
		let piece, x, y;
		for ([x, y] of pieces) {
			for (let i = 0; i < x.length; i++) {
				this.moveTo(x[i], y[i]);
			}
		}
	}
	
	/**
	 * @override
	 * @param {array} pieces - array of array or pieces
	 */
	initPieces = pieces => {
		console.log('Boards.initPieces() --> pieces', pieces);
		// throw new Error();
		// console.log(typeof this);
		// qualityDown([this.jxbIO, this.jxbInput, this.jxbII]);		
		let piece, x, y;
		for ([x, y] of pieces) {
			for (let i = 0; i < x.length; i++) {
				this.initPoint(x[i], y[i]);
			}
		}
	}
	
	set visible(draw) {
		// console.log(draw);
		this.bio.visible 		= draw.io;
		this.distBoard.visible 	= draw.pp;
	}

	set checked(draw) {
		// console.log(draw);
		this.bio.checked = draw.io;
		this.distBoard.checked = draw.pp;
	}

	get checked() {
		// this.bio.solSetChecked = false;
		return 	{
					'io': this.bio.checked,
					'pp': this.distBoard.checked
				};
	}

	updateDistribution(dist) {
		console.log('Boards.dist = ', dist);
		this.distBoard.updateDistribution(dist);
	}

	showSupport() { this.distBoard.dist.showLines(); }
	hideSupport() { this.distBoard.dist.hideLines(); }

	pairsChanged() {
		let draw = {
			"hysterons": true,
			"support": true,
			"distribution": {
				"thresholds": false,
				"weights": false
			}
		};
		this.distBoard.checked = draw;
		this.distBoard.visible = draw;
	}

	paramChanged(cycle, solSet) {
		this.clearCycle();
		this.drawCycle(cycle);
		this.drawSolSet(solSet);
	}

	initCurves(cfg, healthy, cycle, solSet) { this.bio.init(cfg, healthy, cycle, solSet); }
	
	/**
	 * @abstract
	 * @param {}
	 * @return {}
	 */
	// showHysterons() 		{ throw new Error("Method 'showHysterons()' 	\tmust be implemented."); }
	// hideHysterons() 		{ throw new Error("Method 'hideHysterons()' 	\tmust be implemented."); }
	// drawHysterons(h) 	{ throw new Error("Method 'drawHysterons()' 	\tmust be implemented."); }
	// removeHysterons() 	{ throw new Error("Method 'removeHysterons()' 	\tmust be implemented."); }
	initHysterons () 		{ throw new Error("Abstract Method 'initHysterons()' 		\tmust be implemented."); }
	clearBoards(cfg) 		{ throw new Error("Abstract Method 'clearBoards()' 			\tmust be implemented."); }
	reset(cfg) 				{ throw new Error("Abstract Method 'reset()' 				\tmust be implemented."); }
	moveTo(x, y) 			{ throw new Error("Abstract Method 'moveTo()' 				\tmust be implemented."); }
	thresholdsChanged(cfg) 	{ throw new Error("Abstract Method 'thresholdsChanged()' 	\tmust be implemented."); }
	// updateBB(cfg) 		{ throw new Error("Method 'updateBB()' 			\tmust be implemented."); }

	// updateBB(cfg){
		// function getBB(cfg) {	
		// 	let domain  = cfg.input.interval;
		// 	let range   = cfg.output.interval;
		// 	let buffer 	= {
		// 		x: 0.1*( domain[1] - domain[0] ),
		// 		y: 0.1*( range[ 1] - range[ 0] )
		// 	}
		// 	// let x = [ (domain[0] - buffer.x), (domain[1] + buffer.x) ];
		// 	// let y = [ (range[ 0] - buffer.y), (range[ 1] + buffer.y) ];
		// 	let x0 = domain[0] - buffer.x,
		// 		x1 = domain[1] + buffer.x,
		// 		y0 = range[ 0] - buffer.y,
		// 		y1 = range[ 1] + buffer.y;
		// 	 return {
		// 		io: [x0, y0, x1, y1],
		// 		i:  [x0, x1],
		// 		ii: [x0, x0, x1, x1],
		// 		oo: [y0, y0, y1, y1]
		// 	}
		// }
		// let bounds = this.getBB(cfg);
		// this.bi.boundingBox 	=  bounds.i;
		// this.bii.boundingBox 	= bounds.ii;
		// this.bio.boundingBox 	= bounds.io;
		// this.boo.boundingBox 	= bounds.oo;
		// }

	// drawHealthy = pts 	=> this.bio.drawHealthy(pts);
	// drawCycle 	= pcs 	=> this.bio.drawCycle(pcs);
	// drawSolSet 	= pts 	=> this.bio.drawSolSet(pts);
	
	// clearHealthy = () 	=> { this.bio.clearHealthy(); }
	// clearCycle 	= () 	=> { return this.bio.clearCycle(); }
	// clearSolSet = () 	=> { return this.bio.clearSolSet(); }
	// clearIO 	= () 	=> { return this.bio.clear(); }	
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Boards);


/***/ }),

/***/ "../RecruitmentBoards/src/BoardsManager.js":
/*!*************************************************!*\
  !*** ../RecruitmentBoards/src/BoardsManager.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BoardsVP__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BoardsVP */ "../RecruitmentBoards/src/BoardsVP.js");
/* harmony import */ var _BoardsPV__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoardsPV */ "../RecruitmentBoards/src/BoardsPV.js");
/* harmony import */ var _BoardIO_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BoardIO.js */ "../RecruitmentBoards/src/BoardIO.js");
/* harmony import */ var _PreisachPlaneJXG_src_PreisachPlane_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PreisachPlaneJXG/src/PreisachPlane.js */ "../PreisachPlaneJXG/src/PreisachPlane.js");
/**
* @author m
* @date 2021
* @version 0.1
*/





const  BoardI  = (__webpack_require__(/*! ./BoardI */ "../RecruitmentBoards/src/BoardI.js").BoardI);



__webpack_require__(/*! ./boards-style.css */ "../RecruitmentBoards/src/boards-style.css");
__webpack_require__(/*! ../node_modules/jsxgraph/distrib/jsxgraph.css */ "../RecruitmentBoards/node_modules/jsxgraph/distrib/jsxgraph.css");

const PROPS	= __webpack_require__(/*! ./props_preisach.json */ "../RecruitmentBoards/src/props_preisach.json");

/**
 * let's imagine for now that when we init the boards we do not maintain a 'draw' state
 */ 
// let props_draw 	= require('./props_draw.json');

let propsIO = {
	"labels": {
		"centre": {
			"x": "Pressure",
			"y": "Volume"
		},
		"right": {
			"x": "input",
			"y": "output"
		}
	}
}
/**
 *
 */
class BoardsManager {
	/**
	 * create a BoardsManager
	 * @constructor BoardsManager
	 * @param {dispatcher} dispatcher - the dispatcher
	 */
	constructor(dispatcher) {
		// let atts = {}
		this.dispatcher = dispatcher;
		this.allBoards = {		
			bpi: new _PreisachPlaneJXG_src_PreisachPlane_js__WEBPACK_IMPORTED_MODULE_3__["default"]('jxg-pressure-in', 	PROPS.PROPS_PI, dispatcher),
			bpo: new _PreisachPlaneJXG_src_PreisachPlane_js__WEBPACK_IMPORTED_MODULE_3__["default"]('jxg-pressure-out', 	PROPS.PROPS_PO, dispatcher),
			bvi: new _PreisachPlaneJXG_src_PreisachPlane_js__WEBPACK_IMPORTED_MODULE_3__["default"]('jxg-volume-in', 	PROPS.PROPS_VI, dispatcher),

			bio: new _BoardIO_js__WEBPACK_IMPORTED_MODULE_2__["default"]("jxg-InOut", propsIO, dispatcher),
			bi:  new BoardI("jxg-In", dispatcher)
		}
		this.getJC = () => this.allBoards.bio.board.jc;

		this.boards = null;
	}

	/**
	 * @param 
	 * @return
	 */
	init(cfg) {
		if (this.boards != null) {
			this.boards.reset(cfg);
			// this.boards.distBoard.dist.destroy();
		}

		switch(cfg['control-variable']) {
			case 'P':
				console.log(cfg.thresholds);
				this.boards = new _BoardsPV__WEBPACK_IMPORTED_MODULE_1__["default"](this.allBoards, cfg, PROPS);
				break;
			case 'V':
				this.boards = new _BoardsVP__WEBPACK_IMPORTED_MODULE_0__["default"](this.allBoards, cfg, PROPS);
				break;
			default:
				throw new Error('BoardManager - need a control variable');
		}		

		return this.boards;
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoardsManager);

/***/ }),

/***/ "../RecruitmentBoards/src/BoardsPV.js":
/*!********************************************!*\
  !*** ../RecruitmentBoards/src/BoardsPV.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Boards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boards */ "../RecruitmentBoards/src/Boards.js");
/**
 * @file BoardsPV.js
 * @author m
 * @date 2022
 * @version 0.0.2
 */

/**
 * 
 */


const propsIO = {
	"labels": {
		"centre": {
			"x": "Pressure",
			"y": "Volume"
		},
		"right": {
			"x": "input",
			"y": "output"
		}
	}
}

/**
 * 
 */
class BoardsPV extends _Boards__WEBPACK_IMPORTED_MODULE_0__["default"] {
	/**
	 * 
	 */
	constructor(boards, cfg, props) {
		// console.log(cfg.draw.io);
		// console.log(Boards.propsDraw);

		super(boards);

		this.dom_oo.style.display = 'none';
		this.dom_pi.style.display = 'block';

		boards.bio.initBoard(propsIO, cfg.draw.io);

		// boards.bpi.init(props.PROPS_PI, Boards.propsDraw.draw.pp, cfg.thresholds, cfg.weights);
		boards.bpi.init(props.PROPS_PI, cfg.draw.pp, cfg.thresholds, cfg.weights);
		
		this.bii 		= boards.bpi;		
		this.distBoard 	= boards.bpi;
	}

	/**
	 * @override
	 * @param h
	 */
	initHysterons(locs, props) {
		this.bii.removeHysterons();
		locs = locs.map(l=>l.pp);
		// console.log(locs);
		locs.forEach( (loc, i) => {
			this.bii.drawHysteron(loc, props[i]);
		});
	}

	/**
	 * @override
	 * 
	 */
	thresholdsChanged = cfg => {
		// console.log(cfg);
		this.bii.removeHysterons();
		// let sup = this.bii.getSupportPoints(cfg.support);
		// this.bii.updateDistribution(cfg);
		// this.bii.updateSupport( sup );
	}

	/**
	 * @override
	 * @param {object} cfg - 
	 */
	reset = cfg => {
		[	
			this.bi, 
			this.bio,
			// this.bii
			this.bpi
		].forEach( b => b.reset(cfg) );	
	}

	/**
	 * @override
	 * @param {object} cfg - configration
	 */
	clearBoards(cfg) {	
		this.bi.clear(cfg);
		this.bio.clear(cfg);
		this.bii.clear(cfg);
	}

	/**
	 * @override
	 * @param {double} x
	 * @param {doulbe} y
	 */
	initMax(x, y) {
		console.log('BoardsVP.moveTo()');
		console.log(x, y);
		console.table({x:x, y:y});
		// throw new Error();
		this.bio.point.moveTo( [x, y] );
		this.bi.point.moveTo(  [x, 0] ); 
		this.bii.point.moveTo( [x, x] );
		// this.boo.point.moveTo( [y, y] );
		this.boo.inputUpdated( y );
	}
	
	/**
	 * @override
	 * @param {double} x - input value
	 * @param {double} y - output value
	 */
	moveTo(x, y) {
		this.bio.point.moveTo( [x, y] );
		this.bi.point.moveTo(  [x, 0] ); 
		// this.bii.point.moveTo( [x, x] );
		this.bii.inputUpdated(x);
	}

	// removeHysterons = () => this.bii.removeHysterons();
	// showHysterons 	= () => this.bii.showHysterons();
	// hideHysterons 	= () => this.bii.hideHysterons();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoardsPV);

/***/ }),

/***/ "../RecruitmentBoards/src/BoardsVP.js":
/*!********************************************!*\
  !*** ../RecruitmentBoards/src/BoardsVP.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Boards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boards */ "../RecruitmentBoards/src/Boards.js");
/**
 * @file BoardsVP.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 * 
 */


const propsIO = {
	"labels": {
		"centre": {
			"x": "Volume",
			"y": "Pressure"
		},
		"right": {
			"x": "input",
			"y": "output"
		}
	}
}

/**
 * 
 * @class BoardsVP
 *
 */
class BoardsVP extends _Boards__WEBPACK_IMPORTED_MODULE_0__["default"]{
	constructor(boards, cfg, props) {
		super(boards);

		this.dom_oo.style.display = 'block';
		this.dom_pi.style.display = 'none';

		// document.getElementById('')

		boards.bio.initBoard(propsIO, cfg.draw.io);
		// boards.bio.cbSolSet.rendNodeCheckbox.value = false;
		// boards.bio.cbSolSet.rendNodeCheckbox.checked = false;
		boards.bio.cbSolSet.rendNodeCheckbox.disabled = true;

		boards.bpo.init(props.PROPS_PO, cfg.draw.pp, cfg.thresholds, cfg.weights);
		boards.bvi.init(props.PROPS_VI, cfg.draw.pp, cfg.thresholds, cfg.weights);

		// this.boo 	= boards.bpo; // boo is always bpo
		this.bii 		= boards.bvi;
		this.distBoard 	= boards.bpo;

		// this.distBoard.init({disabled: true, hasDist: true}, cfg.thresholds, cfg.weights);
		// this.distBoard.init(cfg.thresholds, cfg.weights);
	}

	/**
	 * @override
	 * @param {} h
	 * @return
	 */
	initHysterons = (locs, props) => {
		this.bii.removeHysterons();
		this.boo.removeHysterons();
		// this.bii.drawHysterons(locs, props);
		locs.forEach( (loc, i) => {
			// console.log(loc.pp);
			this.bii.drawHysteron(loc.vv, props[i]);
			this.boo.drawHysteron(loc.pp, props[i]);
		});
	}

	/**
	 * @override
	 * @param {} cfg
	 */
	thresholdsChanged = cfg => {
		// console.log(cfg);
		this.boo.removeHysterons();
		this.bii.removeHysterons();
		this.boo.updateDistribution(cfg);
	}

	/**
	 * @override
	 * @param {} cfg
	 * @return
	 */
	reset(cfg){
		[ 	
			this.bi, 
			this.bio,
			// this.bii,
			// this.boo
			this.bvi,
			this.bpo
		].forEach( b => b.reset(cfg) );
		// this.bio.cbSolSet.rendNodeCheckbox.value = false;
		// this.bio.cbSolSet.rendNodeCheckbox.checked = false;
		this.bio.cbSolSet.rendNodeCheckbox.disabled = true;		
	}
	/**
	 * @override
	 * @param {} pieces
	 */
	// update(pieces) {		
		// let piece, x, y;
		// for ([x, y] of pieces) {
		// 	for (let i = 0; i < x.length; i++) {
		// 		this.moveTo(x[i], y[i]);
		// 	}
		// }
		// console.log('BoardsVP.update() --> COMPLETED');
		// }
	
	/**
	 * @override
	 * @param {} cfg
	 */
	clearBoards(cfg) {	
		this.bi.clear(cfg);
		this.bio.clear(cfg);
		this.bii.clear(cfg);
		this.boo.clear(cfg);
		// return this.bio.clear(cfg);
	}

	/**
	 * @override
	 * @param {double} x
	 * @param {doulbe} y
	 */
	initMax(x, y) {
		console.log('BoardsVP.moveTo()');
		console.log(x, y);
		console.table({x:x, y:y});
		// throw new Error();
		this.bio.point.moveTo( [x, y] );
		this.bi.point.moveTo(  [x, 0] ); 
		this.bii.point.moveTo( [x, x] );
		// this.boo.point.moveTo( [y, y] );
		this.boo.inputUpdated( y );
	}

	moveTo(x, y) {
		console.log('BoardsVP.moveTo()');
		console.table({x:x, y:y});
		// throw new Error();
		this.bio.point.moveTo( [x, y] );
		this.bi.point.moveTo(  [x, 0] ); 
		this.bii.point.moveTo( [x, x] );
		// this.boo.point.moveTo( [y, y] );
		this.boo.inputUpdated( y );
	}
	// removeHysterons = () => { this.boo.removeHysterons(); this.bii.removeHysterons(); }
	// showHysterons 	= () => { this.bii.showHysterons(); this.boo.showHysterons(); }
	// hideHysterons 	= () => { this.bii.hideHysterons();	this.boo.hideHysterons(); }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoardsVP);

/***/ }),

/***/ "../RecruitmentBoards/src/curveGroup_jxg.js":
/*!**************************************************!*\
  !*** ../RecruitmentBoards/src/curveGroup_jxg.js ***!
  \**************************************************/
/***/ (() => {

/**
 * @file curveGroup_jxg.js
 * @author m
 * @date 2002
 * @version 0.0.1
 */

/**
 *
 */
(function() {
/**
 *
 */
JXG.createCurveGroup = function (board, parents, attributes) {
	if(!JXG.exists(attributes)) {
		attributes = {};
	}
	// if (parents)
	let elements = {};
	let comp = new JXG.Composition( elements );	
	comp.solSetAvailable = false;
	comp.board = board;	
	comp.attributes = { 
		...attributes
	};
	// console.log(comp);

	/**
	 * add a curve to the collection(array)
	 * @param {piece}
	 * @param {props}
	 * @return {}
	 */
	comp.addCurve = function(piece) { 
		// this.curves.push( 
		// 	this.board.create('curve', piece, this.props) 
		// );
		// console.log(this);
		// console.log(this.objectsList);
		// console.log('createCurveGroup ', this.attributes.name);
		// console.log('curveGroup_jxg -> createCurveGroup.comp.addCurve -> piece = ');
		// console.table(piece);
		let name = this.attributes.name + this.objectsList.length;
		let atts = {...this.attributes, 'name': name, id: name};		
		this.add( name, this.board.create('curve', piece, atts) );
	}

	/**
	 * @param {props}
	 * @return {}
	 */
	comp.addCurves = function(pieces){ 
		if ( !pieces.length > 0 ) {
			throw new Error('need IO pieces');
		}
		// console.log(pieces.length);
		// console.table(pieces);
		pieces.forEach( 
			piece => {
				// console.log(piece);
				comp.addCurve(piece);
			}
		);
	}

	/**
	 * @param {props}
	 * @return {}
	 */
	comp.addPromise = async function(p){ 
		// console.log(p);
		// console.log(p.statios);
		// console.log(typeof p);
		// console.log(typeof p.statios());
		p.statios().then( pieces => {
			// console.log(pieces.map(p=>p.path));
			// console.log('curveGroup_jxg.addPromise -> pieces.length = ', pieces.length);
			// if ( !JXG.exists(pieces.paths) ) {
			if ( !JXG.exists(p.model) ) {
				this.addCurves(pieces.map(piece => piece.path));
			} else {
				// console.log(pieces);
				// console.log(pieces.paths);
				// this.addCurves(pieces.paths);
				this.addCurves( pieces.map( s => s.getPath( p.model ) ) );
			}
		})
		.then( () => this.solSetAvailable = true );
	}

	/**
	 * @param {}
	 * @return {}
	 */
	comp.removeAll = function(){ 
		// BOGUS
		// could probably use a try 
		// console.log(this);
		// console.log(this.elements);
		// console.log( this.elementsByName );
		// console.log( Object.keys(this.elementsByName) );
		if ( this.objectsList.length > 0 ) {
			// throw new Error();
			this.board.suspendUpdate();
			Object.keys(this.elementsByName).forEach( (c, i) => {
				// console.log(c);
				let s = this.remove(c);
				// console.log(s);
				this.board.removeObject(c)
			});

			this.elements = {};
			this.objects = this.elements;

			this.elementsByName = {};
			this.objectsList = [];
			this.board.unsuspendUpdate();
		}
	}

	return comp;
};

JXG.registerElement('curveGroup', JXG.createCurveGroup);
})();

/***/ }),

/***/ "../RecruitmentForm/src/js/Settings.js":
/*!*********************************************!*\
  !*** ../RecruitmentForm/src/js/Settings.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _fields_Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields/Field */ "../RecruitmentForm/src/js/fields/Field.js");
/* harmony import */ var _fields_PlotArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fields/PlotArea */ "../RecruitmentForm/src/js/fields/PlotArea.js");
/* harmony import */ var _fields_Branches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fields/Branches */ "../RecruitmentForm/src/js/fields/Branches.js");
/* harmony import */ var _fields_Pairs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fields/Pairs */ "../RecruitmentForm/src/js/fields/Pairs.js");
/* harmony import */ var _fields_Continuous__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fields/Continuous */ "../RecruitmentForm/src/js/fields/Continuous.js");
/* harmony import */ var _fields_PairsNormal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fields/PairsNormal */ "../RecruitmentForm/src/js/fields/PairsNormal.js");
/* harmony import */ var _fields_Support__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fields/Support */ "../RecruitmentForm/src/js/fields/Support.js");
/* harmony import */ var _fields_Weights__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fields/Weights */ "../RecruitmentForm/src/js/fields/Weights.js");
/* harmony import */ var _fields_Recruitability__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fields/Recruitability */ "../RecruitmentForm/src/js/fields/Recruitability.js");
/* harmony import */ var _html_settings_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../html/settings.html */ "../RecruitmentForm/src/html/settings.html");
/**
 * @file Settings.js
 * @author m
 * @date 2020
 * @version 0.0.1
 */

/**
 *
 */














__webpack_require__(/*! ../css/settings-style.css */ "../RecruitmentForm/src/css/settings-style.css");

/**
 *
 */
class Settings {
	/**
	 *
	 */
	constructor(dispatcher, equations) {	
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('settings-panel').innerHTML = _html_settings_html__WEBPACK_IMPORTED_MODULE_10__["default"];
		
		this.dispatcher = dispatcher;
		_fields_Field__WEBPACK_IMPORTED_MODULE_1__["default"].dispatcher = dispatcher;	

		this.area 			= new _fields_PlotArea__WEBPACK_IMPORTED_MODULE_2__["default"]();
		this.branches 		= new _fields_Branches__WEBPACK_IMPORTED_MODULE_3__["default"]();
		this.pairs 			= new _fields_Pairs__WEBPACK_IMPORTED_MODULE_4__["default"]();
		this.support 		= new _fields_Support__WEBPACK_IMPORTED_MODULE_7__["default"]();
		this.continuous 	= new _fields_Continuous__WEBPACK_IMPORTED_MODULE_5__["default"]();
		this.pairsNormal 	= new _fields_PairsNormal__WEBPACK_IMPORTED_MODULE_6__["default"]();
		this.weights 		= new _fields_Weights__WEBPACK_IMPORTED_MODULE_8__["default"]();
		this.recruitability = new _fields_Recruitability__WEBPACK_IMPORTED_MODULE_9__["default"]();

		// this.config = config;
		this.addListeners();
	}

	/**
	 * write settings to dom
	 */
	load(cfg) {
		console.log('Settings: ', cfg);
		this.control = cfg['control-variable'];

		this.area.input 	= cfg.input;
		this.area.output 	= cfg.output;
		
		this.branches.vals 	= cfg.branches["equation-style"];

		// this.thresholds.vals = cfg.thresholds;
		this.support.vals 		= cfg.thresholds.support;
		this.pairs.vals 		= cfg.thresholds;
		this.continuous.vals 	= cfg.thresholds.continuous;
		this.pairsNormal.vals 	= cfg.thresholds.continuous.normal;

		this.weights.vals 		= cfg.weights;
				
		this.recruitability.vals = cfg.recruitability;

		// console.log(cfg.weights);
		// console.log(this.control);
		// console.log(cfg['control-variable']);
		// throw new Error('');
	}

	/**
	 * @method get vals
	 * @description - gets values from the UI
	 */
	get vals() {
	// getValues() {
		let getSize = cfg => {
			let size = 0;
			if ( cfg.pairs == 'lattice' ) {
				size = cfg.lattice.size*(cfg.lattice.size+1)/2;
			} else {
				size = cfg.continuous.size;
			}
			return size;
		}


		let t = this.pairs.vals;
		t['support'] = this.support.vals;
		t['continuous'] = this.continuous.vals;
		t['continuous']['normal'] = this.pairsNormal.vals;

		let size = getSize(t);
			
		return {
			'control-variable': this.control,
			'input': 			this.area.input,
			'output': 			this.area.output,
			'branches': 		this.branches.vals,
			
			// 'thresholds': 		this.thresholds.vals,
			'size': 			size,
			'thresholds': 		t,

			'recruitability': 	this.recruitability.vals,
			'weights': 			this.weights.vals
		};
	}

	set control(ctrl) {
		// document.querySelector('input[name="control"]:checked').value = ctrl;
		// console.log(document.querySelector('input[name="control"]:checked').value);
		// console.log(document.querySelector('input[name="control"]:checked').id);
		// console.log($id('radio-pv').checked);
		switch (ctrl) {
			case 'P':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('radio-pv').checked = true;
				// $id('radio-vp').checked = false;
				break;
			case 'V':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('radio-vp').checked = true;
				// $id('radio-pv').checked = false;
				break;
			default:
				throw new Error('Need \'control-variable\' (P/V),\n\tgot: ' + ctrl);
		}
	}

	get control() {
		// return $id('radio-pv').checked ? 'P' : 'V';
		// console.log(document.querySelector('input[name="control"]:checked').value);
		// throw new Error('');
		return document.querySelector('input[name="control"]:checked').value;
	}

	/**
	 *
	 */
	addListeners() { 
		/*
		 * 	BOGUS
		 *		Want to show highlight around update when vars changed
		 *		want to show highlight around variables that have been changed
		 */
		
		// if (ctrl !== undefined && ctrl !== null) this.views.settings.config['control-variable'] = ctrl;
		// if (e !== undefined && e !== null) e.preventDefault();

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('radio-pv'  ).addEventListener('change', (e) => { /*this.control = 'P';*/ this.dispatcher.dispatchEvent('controlChanged'); });
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('radio-vp'  ).addEventListener('change', (e) => { /*this.control = 'V';*/ this.dispatcher.dispatchEvent('controlChanged'); });
		// $id('btn-update').addEventListener('click', (e) => e.target.dispatchEvent( new CustomEvent('updateCalled', { bubbles: true })) );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('btn-update').addEventListener('click',   e => {e.preventDefault(); this.dispatcher.dispatchEvent('updateCalled');} );		
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('settings-form').addEventListener('submit',   e => {e.preventDefault(); this.dispatcher.dispatchEvent('updateCalled');} );
		
		/*
		 * if enter key pressed then submit form
		 */
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('settings-form').addEventListener('keypress', e => { 			
			var keyPressed = e.keyCode || e.which; 			
			if (keyPressed === 13) { 
				// e.preventDefault();
				this.dispatcher.dispatchEvent('updateCalled');
				return false; 
			} 
		});
	}

	// getSupport() { return this.thresholds.support(); }
	// getDistribution() { return this.thresholds.vals(); } //getDistribution
	// getSupport() { return this.thresholds.read.support(); }
	// getDistribution() { return this.thresholds.read.vals(); } //getDistribution
	

		// let branches 					= this.branches.getVals();
		// // console.log(branches);
		// // console.log(branches.vars);
		// this.config["equation-style"] 	= branches["equation-style"];
		// this.config.eqs.vars 			= branches.vars;
		
		// // this.config.pairs.style 		= this.config.thresholds.style;
		// // this.config['weights'] 			= this.curryWeights(this.weights.vals);
		// this.config['weights'] 			= this.weights.vals;
		// }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/Branches.js":
/*!****************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/Branches.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _html_branches_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/branches.html */ "../RecruitmentForm/src/html/branches.html");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _Field_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Field.js */ "../RecruitmentForm/src/js/fields/Field.js");
/**
 * @file Branches.js
 * @author m
 * @date 2021-01
 * @version 0.0.2
 */

// NICE!!! http://www.ibldynamics.com/index.html
// let key = Object.keys(p)[0];
// $id(key).value = p[key];
/**
 *
 */

__webpack_require__(/*! ../../css/branches-style.css */ "../RecruitmentForm/src/css/branches-style.css");

const EQUATIONS = __webpack_require__(/*! ../../json/equations.json */ "../RecruitmentForm/src/json/equations.json");



/**
 *
 */
class Branches extends _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	/**
	 *
	 */
	constructor() {
		super({ id: 'branches', html: _html_branches_html__WEBPACK_IMPORTED_MODULE_0__["default"] });
		
		/**
		 * @property equations
		 */
		this.equations = {};
	
		Object.entries(EQUATIONS).forEach( ([k, v], i) => {
			this.createOption(k, v, i);
			this.createEquations(k, v, i);
			// this.createParams(k, v, i);
		});

		// $id('equations').innerHTML = eqs[title]['chtml'];
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('eq-select').selectedIndex = 1;

		this.addListeners();
	}

	createOption(k, v, i) {
		let option = document.createElement("option");
		option.text = k;
		option.id = 'opt-'+k;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("eq-select").add(option);
	}

	createEquations(k, v, i) {
		let label = document.createElement("label");
		label.htmlFor = 'opt-'+k;
		label.id = 'eqs-'+k;

		if ( typeof v.chtml === 'undefined' ) {
			document.getElementById('opt-'+k).setAttribute('disabled', '');
		} else {
			label.innerHTML = v.chtml;
		}		
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('equations').appendChild(label);
		label.style.display = 'none';
	}

	/**
	 *
	 */
	addListeners() {		
		let updateParam = (evt, key, val) => {
			this[key] = val;

			_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('paramChanged', [key, val]);
		}

			// Field.dispatcher.dispatchEvent('equationsChanged', {'equations': eqsJC, 'labels': labels});
		;(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("eq-select").addEventListener('change', evt => { this.selected = evt.target.value; _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('equationsChanged'); } );

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("vmax-slider").addEventListener('input',  evt => { updateParam( evt, 'vmax', evt.target.value ); });
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("pmid-slider").addEventListener('input',  evt => { updateParam( evt, 'pmid', evt.target.value ); });
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("k-slider"   ).addEventListener('input',  evt => { updateParam( evt, 'k',    evt.target.value ); });
		
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("vmax"       ).addEventListener('change', evt => { updateParam( evt, 'vmax', evt.target.value ); });
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("pmid"       ).addEventListener('change', evt => { updateParam( evt, 'pmid', evt.target.value ); });
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("k"          ).addEventListener('change', evt => { updateParam( evt, 'k',    evt.target.value ); });
	}
	
	set selected(str) {
		// hide old equations
		let el = document.querySelector("#equations>[style='display: block;']");
		if ( el != 'undefined' && el != null ) {
			el.style.display = 'none';
		}

		// show new equations
		// $id("eq-select").value = str;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("eq-select").selected = str;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('eqs-'+str).style.display = 'block';

		if (Object.keys(EQUATIONS).indexOf(str) !== -1) {
			this.equationStrings = {
				'popen': 	EQUATIONS[str]['popen']['jc'],
				'pclosed': 	EQUATIONS[str]['pclosed']['jc'],
				'vopen': 	EQUATIONS[str]['vopen']['jc'],
				'vclosed': 	EQUATIONS[str]['vclosed']['jc']
			};
			
			// update variables
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('row-pmid').style.display 	= (str == 'exponential-relaxation') 
											? 'none'
											: 'table-row';

			console.log(EQUATIONS[str]['vars']);
			this.params = EQUATIONS[str]['vars'];
			// let labels = Object.keys(EQUATIONS[str]['vars']);
		} else {
			throw new Error('getUserText not implemented');
		}
	}
	// set selected(str) {}
	get selected() {
		// $id('eq-select').selectedIndex;
		// let str = $id("eq-select").value;
		// console.log(str);
		return (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)("eq-select").value;
	}

	set equationStrings(strs) {
		this.equations['popen'] 	= strs['popen'	];
		this.equations['pclosed'] 	= strs['pclosed'];
		this.equations['vopen'] 	= strs['vopen'	];
		this.equations['vclosed'] 	= strs['vclosed'];
	}
	
	get equationStrings() {
		return {
			'popen': 	this.equations['popen'],
			'pclosed': 	this.equations['pclosed'],
			'vopen': 	this.equations['vopen'],
			'vclosed': 	this.equations['vclosed']
		}		
	}
	
	set vmax(val) { 
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('vmax').value			= val;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('vmax-slider').value 	= val; 
	}
	set pmid(val) { 
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pmid').value			= val;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pmid-slider').value 	= val; 
	}
	set k(val) { 
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('k'	).value				= val;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('k-slider'	).value 	= val; 
	}

	/**
	 * all that hassle with the select and we still don't have the params updating to the other equations
	 */
	set params(params) {
		Object.entries(params).forEach( ([k, v]) => {
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)(k+'').value	= v.value;
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)(k+'').max	= v.max;
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)(k+'').min	= v.min;
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)(k+'').step	= v.step;

			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)(k+'-slider').value	= v.value;
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)(k+'-slider').max	= v.max;
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)(k+'-slider').min	= v.min;
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)(k+'-slider').step	= v.step;
		});
		// $id('vmax').value	= params.vmax;
		// $id('pmid').value	= params.pmid;
		// $id('k').value		= params.k;
	}
	
	get params() {
		return {
			'vmax': (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('vmax'),
			'pmid': (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('pmid'),
			'k':	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('k'   )
		}
	}

	/**
	 * @param {} args
	 */
	set vals(style) {
		this.selected = style;
		// this.selected = style;
		// this.params = EQUATIONS[style].vars;
	}

	get vals() {
		return { 
			"equation-style": 	this.selected,
			"equation-strings": this.equationStrings,
			"params-labels": 	this.paramsLabels,
			"params": 			this.params
		};
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Branches);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/Continuous.js":
/*!******************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/Continuous.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _Field_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field.js */ "../RecruitmentForm/src/js/fields/Field.js");
/**
 * @file Continuous.js
 * @author m 
 * @date 2022
 * @version 0.0.1
 */
/**
 *
 */



/**
 *
 */
class Continuous /*extends Field*/ {
	/**
	 *
	 */
	constructor() {
		// super();
		this.addListeners();
	}

	/**
	 *
	 */
	set vals(cfg){
		this.size 			= cfg.size;
		this.distribution 	= cfg.distribution;
	}

	set size(n) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('pairs-continuous-num').value 	 = n;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('pairs-continuous-slider').value = n;
	}

	/**
	 *
	 */
	set distribution(str) {
		switch(str) {
			case 'uniform':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('btn-thresholds-dist-uniform').checked 	= true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-dist-normal'	 ).hidden 	= true; 
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-dist-width' 	 ).hidden 	= true; 
				break;
			case 'normal':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('btn-thresholds-dist-normal').checked 	= true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-dist-normal'	).hidden 	= false; 
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-dist-width' 	).hidden 	= true; 
				break;
			case 'linear':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('btn-thresholds-dist-width' ).checked 	= true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-dist-normal'	).hidden 	= true; 
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-dist-width'		).hidden 	= false; 
				break;
			default:
				throw new Error('we should have a distribution');
		}
	}

	/**
	 *
	 */
	get vals() {
		return {
			'size': this.size,
			'distribution': this.distribution
		}
	}

	get size() {
		return (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$num)('pairs-continuous-num');
	}

	/**
	 *
	 */
	get distribution() { 
		return document.querySelector('input[name="btn-grp-thresholds-dist"]:checked').value;
	}

	/**
	 *
	 */
	addListeners() {
		let dispatch = e => _Field_js__WEBPACK_IMPORTED_MODULE_1__["default"].dispatcher.dispatchEvent(e);

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('pairs-continuous-num'	 ).addEventListener('input',  e => { this.size = e.target.value; dispatch('thresholdsChanged'); });
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('pairs-continuous-slider').addEventListener('change', e => { this.size = e.target.value; dispatch('thresholdsChanged'); });

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('btn-thresholds-dist-uniform').addEventListener( 'change', e => { this.distribution = 'uniform'; dispatch('thresholdsChanged'); } );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('btn-thresholds-dist-normal' ).addEventListener( 'change', e => { this.distribution = 'normal';  dispatch('thresholdsChanged'); } );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('btn-thresholds-dist-width').addEventListener( 'change', e => { this.distribution = 'linear'; dispatch('thresholdsChanged'); } );
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Continuous);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/Field.js":
/*!*************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/Field.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/**
 * @file Field.js
 * @author m
 * @date 2022-03
 */


/**
 *
 */
class Field {
	/**
	 *
	 */
	static dispatcher;

	/**
	 *
	 */
	constructor(args) {
		// dispatcher = dispatch;
		document.getElementById(args.id).innerHTML = args.html;
		// require('../../css/branches-style.css');
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Field);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/Pairs.js":
/*!*************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/Pairs.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _html_pairs_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/pairs.html */ "../RecruitmentForm/src/html/pairs.html");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _Field_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Field.js */ "../RecruitmentForm/src/js/fields/Field.js");
/**
 * @file Pairs.js
 * @author m 
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */





/**
 *
 */
class Pairs extends _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	/**
	 *
	 */
	constructor() {
		super({ id: 'pairs', html: _html_pairs_html__WEBPACK_IMPORTED_MODULE_0__["default"] });

		this.addListeners();
	}

	/**
	 *
	 */
	get vals() {
		return { 
			'pairs': 		this.pairs,
			'lattice': 		this.lattice
		}
	}

	/**
	 *
	 */
	set vals(cfg){
		// console.log(cfg);
		// console.log(cfg.pairs);
		this.pairs 			= cfg.pairs;
		this.lattice 		= cfg.lattice.size;
	}

	/**
	 *
	 */
	get lattice() {
		return {'size': (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('pairs-lattice-num')};
	}

	/**
	 *
	 */
	set lattice(n) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pairs-lattice-num').value = n;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pairs-lattice-slider').value = n;
	}

	/**
	 *
	 */
	get pairs() { 
		return document.querySelector('input[name="btn-pairs"]:checked').value;
		// return $id('btn-pairs-lattice').checked ? 'lattice' : 'continuous'; 
	}

	/**
	 *
	 */
	set pairs(str) {
		switch (str) {
			case 'lattice':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-pairs-lattice').checked = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pairs-lattice'   ).hidden 	 = false;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pairs-continuous').hidden 	 = true; 
				break;
			case 'continuous':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-pairs-continuous').checked = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pairs-lattice'   ).hidden 	 = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pairs-continuous').hidden 	 = false;
				break;
			default:
				throw new Error('Need threshold pairs string (lattice/continuous),\n\tgot: ' + str);
		}
	}

	/**
	 *
	 */
	addListeners() {
		let dispatch = e => _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent(e);

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-pairs-lattice'		).addEventListener( 'change', e => { this.pairs = 'lattice'; 	dispatch('pairsChanged'); } );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-pairs-continuous' 	).addEventListener( 'change', e => { this.pairs = 'continuous'; dispatch('pairsChanged'); } );

		// BOGUS
		// BOGUS
			// model should maybe only update when size change is finished
			// update only on change but it will update on all intermediate values too
				// if (cfg.supportSize != this.Value()) { cfg.supportSize = this.Value(); }
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pairs-lattice-num'	  ).addEventListener('input',  e => { this.lattice = e.target.value; dispatch('pairsChanged'); });
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('pairs-lattice-slider').addEventListener('change', e => { this.lattice = e.target.value; dispatch('pairsChanged'); });

		_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.addEventListener('getThresholdsType', () => {
			dispatch('thresholdsChanged');
			// dispatch('pairsChanged');
		});
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pairs);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/PairsNormal.js":
/*!*******************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/PairsNormal.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _Field_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field.js */ "../RecruitmentForm/src/js/fields/Field.js");
/**
 * @file PairsNormal.js
 * @author m 
 * @date 2022
 * @version 0.0.1
 */
/**
 *
 */



/**
 *
 */
class PairsNormal /*extends Field*/ {
	/**
	 *
	 */
	constructor() {
		this.addListeners();
	}

	/**
	 *
	 */
	set vals(dist){
		this.mean 	= dist.mean;
		this.std 	= dist.std;
	}

	/**
	 *
	 */
	get vals() {
		return {
			'mean': this.mean,
			'std': 	this.std
		}
	}

	/**
	 *
	 */
	set mean(mu) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-low').value  = mu.low; 
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-high').value = mu.high;
	}

	/**
	 *
	 */
	get mean() { 
		return { 
			low: 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$num)('thresholds-peak-low'),
			high: 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$num)('thresholds-peak-high')
		}; 
	}

	/**
	 *
	 */
	set std(sig) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-spread-low').value 	= sig.low;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-spread-high').value = sig.high;
	}

	/**
	 *
	 */
	get std() {
		return {
			low: 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$num)('thresholds-spread-low' ),
			high: 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$num)('thresholds-spread-high')
		};
	}

	/**
	 *
	 */
	limitDist(kv) {
		// let sup = {
			// low: 	$num('support-min'), 
			// high: 	$num('support-max'), 
			// diag: 	$num('support-diag')
			// };
			// $id('thresholds-peak-low' ).min = $num('support-min');
			// $id('thresholds-peak-high').min = $num('support-min');
			// $id('thresholds-peak-low' ).max = $num('support-max');
			// $id('thresholds-peak-high').max = $num('support-max');	
			// $id('thresholds-spread-low' ).max = maxWidth;
			// $id('thresholds-spread-high').max = maxWidth;

			// let dist 	= this.vals;
			// let mean 	= dist.mean;
			// let std 	= dist.std;

			// let l = mean.low;
			// let h = mean.high;
			// if ( mean.low 	< sup.low  ) { l = sup.low; }
			// if ( mean.high 	> sup.high ) { h = sup.high; }

			// mean = {"low": l, "high": h};

			// let ll = std.low;
			// let hh = std.high;
			// // if ( std.low > maxWidth ) { ll = maxWidth; }
			// if ( std.high 	> maxWidth ) { hh = maxWidth; }
			// std = {"low": ll, "high": hh};


			// let l 	 = mean.low;
			// let h 	 = mean.high;
			// if ( mean.low 	< sup.low  ) { l = sup.low; }
			// if ( mean.high 	> sup.high ) { h = sup.high; }

			// if ( changed == 'low' && l >= h - sup.diag) {
			// 	l = 
			// }

		let changed  = kv.changed;
		let sup 	 = kv.values;
		// let maxWidth = sup.high - (sup.low + sup.diag);

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-low' ).min = sup.low;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-high').min = sup.low;

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-low' ).max = sup.high;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-high').max = sup.high;

		let dist = this.vals;
		let mean = dist.mean;
		let std  = dist.std;
		
		let l = Math.max(mean.low, sup.low);
		let h = Math.min(mean.high, sup.high);

		if ( l >= h - sup.diag ) {
			switch(changed){
			case 'min':
				h = l + sup.diag;
				break;
			case 'max':
				l = h - sup.diag;
				break;
			case 'diag':
				let distMeanwidth = h - l;

				let rootMeanWidth = (1.0/Math.sqrt(2)) * distMeanwidth;
				// (1.0/Math.sqrt(2)) * sup.diag;

				// (1.0/Math.sqrt(2)) * distMeanwidth / (1.0/Math.sqrt(2)) * sup.diag;

				let newRootWidth = (1.0/Math.sqrt(2)) * sup.diag;

				let frac = newRootWidth - rootMeanWidth;
				let fracWidth = Math.sqrt(2) * frac;

				h += fracWidth;
				l -= fracWidth;
				console.table({sup:sup, dist:{low:l, high:h}});
				// diag = sup.high - sup.diag
				// throw new Error('Are we sure this can happen????');
				break;
			default: throw new Error('must have a support changed value\nchanged = ' + changed);
			}
		}
		mean = {"low": l, "high": h};
		// console.log(this.mean);

		this.mean = mean;
		this.std = std;
	}

	/**
	 *
	 */
	addListeners() {
		// Field.dispatcher.dispatchEvent('limitDist', {"changed": key, "values": vals});
		_Field_js__WEBPACK_IMPORTED_MODULE_1__["default"].dispatcher.addEventListener('limitDist', kv => this.limitDist(kv));

		[	
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-low'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-high'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-spread-low'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-spread-high')
		].forEach (el => {
			// el.addEventListener('focus', e => Field.dispatcher.dispatchEvent('showDist', {"showLines": true, "distStr": "TNor"}) );
			// el.addEventListener('blur',  e => Field.dispatcher.dispatchEvent('showDist', {"showLines": false, "distStr": "none"}) );
			el.addEventListener('focus', e => _Field_js__WEBPACK_IMPORTED_MODULE_1__["default"].dispatcher.dispatchEvent('distTFocused') );
			el.addEventListener('blur',  e => _Field_js__WEBPACK_IMPORTED_MODULE_1__["default"].dispatcher.dispatchEvent('distTBlurred') );
		});
		
		[	
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-low'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-peak-high'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-spread-low'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_0__.$id)('thresholds-spread-high')
		].forEach( el => el.addEventListener('change', e => _Field_js__WEBPACK_IMPORTED_MODULE_1__["default"].dispatcher.dispatchEvent('thresholdsChanged')) );
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PairsNormal);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/PlotArea.js":
/*!****************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/PlotArea.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _html_plot_area_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/plot-area.html */ "../RecruitmentForm/src/html/plot-area.html");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _Field_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Field.js */ "../RecruitmentForm/src/js/fields/Field.js");
/**
 * @file PlotArea.js
 * @author m 
 * @date 2021
 */

/**
 *
 */





/**
 *
 */
class PlotArea extends _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	/**
	 * create a PlotArea
	 * @constructor PlotArea
	 * @param {}
	 */
	constructor() {	
		super({ id: 'plot-area', html: _html_plot_area_html__WEBPACK_IMPORTED_MODULE_0__["default"] });
		
		// $id('input-precision').disabled = true;	
	}	

	set input(i) {
		// write settings to dom
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('input-min').value 		= i.min; 
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('input-max').value 		= i.max;
		// $id('input-precision').value= input["precision"];
	}

	set output(o) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('output-min').value 	= o.min;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('output-max').value 	= o.max;
	}
	
	get input() {
		return {
			"min": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('input-min'),
			"max": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('input-max'),
			// "step": $num('input-precision')
			// "history"
		};
	}

	get output() {
		return {
			"min": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('output-min'),
			"max": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('output-max')
		}
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlotArea);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/Recruitability.js":
/*!**********************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/Recruitability.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _html_recruitability_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/recruitability.html */ "../RecruitmentForm/src/html/recruitability.html");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _Field_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Field.js */ "../RecruitmentForm/src/js/fields/Field.js");
/* harmony import */ var nouislider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nouislider */ "../RecruitmentForm/node_modules/nouislider/dist/nouislider.js");
/* harmony import */ var nouislider__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nouislider__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Recruitability.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */







const nouiClasses = {
	target: "target",
	base: "base",
	origin: "origin",
	handle: false,
	handleLower: false,
	handleUpper: false,
	touchArea: "touch-area",
	horizontal: "horizontal",
	vertical: false,
	background: "background",
	connect: false,
	connects: false,
	ltr: "ltr",
	rtl: "rtl",
	textDirectionLtr: "txt-dir-ltr",
	textDirectionRtl: "txt-dir-rtl",
	draggable: "draggable",
	drag: "state-drag",
	tap: "state-tap",
	active: "active",
	tooltip: "tooltip",
	pips: "pips",
	pipsHorizontal: "pips-horizontal",
	pipsVertical: "pips-vertical",
	marker: "marker",
	markerHorizontal: "marker-horizontal",
	markerVertical: "marker-vertical",
	markerNormal: "marker-normal",
	markerLarge: "marker-large",
	markerSub: "marker-sub",
	value: "value",
	valueHorizontal: "value-horizontal",
	valueVertical: "value-vertical",
	valueNormal: "value-normal",
	valueLarge: "value-large",
	valueSub: "value-sub"
};

const nouiCfg = {
	orientation: 	"vertical",
	connect: 		true,
	behaviour: 		'drag',
	range: 		{ 
					'min': 0, 
					'max': 1 
				},
	// pips: 	{
				// 	mode: 'count', 
				// 	values: 2
				// },
	// cssPrefix: 'noUi-', // defaults to 'noUi-',
	CssClasses: nouiClasses
}

/**
 *
 */
class Recruitability extends _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	/**
	 *
	 */
	constructor() {
		super({ id: 'recruitability', html: _html_recruitability_html__WEBPACK_IMPORTED_MODULE_0__["default"] });

		// this.initSlider();
		
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('open').disabled = true;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('recruitable').disabled = true;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('closed').disabled = true;

		// this.addListeners();
	}

	/**
	 *
	 */
	addListeners() {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('open' 		 ).addEventListener('change', e => this.openChanged( 		e.target.value));
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('recruitable').addEventListener('change', e => this.recruitableChanged( e.target.value));
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('closed'	 ).addEventListener('change', e => this.closedChanged( 		e.target.value));
		
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('recruitable-slider').noUiSlider.on('update', (values, handle) => this.sliderChanged(values, handle));
	}

	/**
	 *
	 */
	initSlider() {
		// https://refreshless.com/nouislider/examples/#section-html5
		__webpack_require__(/*! nouislider/dist/nouislider.css */ "../RecruitmentForm/node_modules/nouislider/dist/nouislider.css");
		// let noUiSlider = require('nouislider');

		(nouislider__WEBPACK_IMPORTED_MODULE_3___default().cssClasses.target) += ' nou';

		nouislider__WEBPACK_IMPORTED_MODULE_3___default().create( 
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('recruitable-slider'), 
			{
				...nouiCfg,
				// start: [ 
				// 	cfg.open, 
				// 	cfg.open + cfg.recruitable 
				// ] 
				start: [0.0, 1.0]        	 
			}
		);

		// this.slider.
		let origins = document.querySelectorAll('.noUi-origin');
		origins[1].setAttribute('disabled', true);

	}

	/*
	 INSTEAD of background
		https://refreshless.com/nouislider/examples/#section-colored-connect
		var connect = slider.querySelectorAll('.noUi-connect');
		var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

		for (var i = 0; i < connect.length; i++) {
		    connect[i].classList.add(classes[i]);
		}

		.c-1-color { background: red; }
		.c-2-color { background: yellow; }
		.c-3-color { background: green; }
		.c-4-color { background: blue; }
		.c-5-color { background: purple; }
	*/
	/**
	 * 	BOGUS
	 * 	Must update the stops on ...
	 *		.nou .noUi-connects {
	 *		background: linear-gradient(red 50%, blue 50%);
	 */

	sliderChanged(values, handle) {
		// console.log('handle = ', handle);
		// console.log('values = ', values);
		let value = values[handle];
		if ( handle ) { // high handle
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('closed').value  = Math.floor(100 - 100*values[1])/100;			
			// this.handles = [values[0], 1]; // recursion error ...disable instead

		} else {
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('open').value 	 = Math.floor(100*values[0])/100;
		}
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('recruitable').value = Math.floor(100*values[1] - 100*values[0])/100;

		_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('recruitablilityChanged', this.vals);
	}


	// openChanged(e) {
		// 	let low, high, val;
		// 	[low, high] = getHVals();

		// 	if (this.valueAsNumber < high) {
		// 		val = this.valueAsNumber;
		// 	} else {
		// 		val = 1 + this.valueAsNumber;
		// 		$id('recruitable-slider').noUiSlider.set([val, null]);
		// 	}
		// 	this.setHandle(0, val);
		// }

	// recruitableChanged(e) {
		// 	let low, high, val;
		// 	[low, high] = getHVals();

		// 	if (high < 1) {
		// 		val = low + this.valueAsNumber;
		// 		this.setHandle(1, val);
		// 	} else {
		// 		val = 1 + this.valueAsNumber;
		// 		$id('recruitable-slider').noUiSlider.set([val, null]);
		// 	}
		// }

	// closedChanged(e) {
		// 	// let val = s.recruitable-slider.noUiSlider.get()[1] - s.value;
		// 	$id('recruitable-slider').noUiSlider.set([null, this.valueAsNumber]);		
		// }
	
	/**
	 *
	 */
	openChanged(val) {
		console.log('open = ', val);
		let low, high;
		[low, high] = this.handles;

		if (val < high) {
			this.handles = [val, null];
		} else {
			this.handles = [val, val];
		}
		_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('recruitablilityChanged', this.vals);
	}

	/**
	 *
	 */
	recruitableChanged(val) {
		let low, high;
		[low, high] = this.handles;

		if (high < 1) {
			this.handles = [null, val];
		} else {
			this.handles = [val, null];
		}
		_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('recruitablilityChanged', this.vals);
	}

	/**
	 *
	 */
	closedChanged(val) {
		// let val = s.recruitable-slider.noUiSlider.get()[1] - s.value;
		this.handles = [null, val];
		_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('recruitablilityChanged', this.vals);
	}

	/**
	 *
	 */
	set handles(h) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('recruitable-slider').noUiSlider.set(h);
		// $id('recruitable-slider').noUiSlider.setHandle(v0, v1, false);
	}

	/**
	 *
	 */
	get handles() {
		return (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('recruitable-slider').noUiSlider.get();
		// let vals = $id('recruitable-slider').noUiSlider.get();
		// return [
		// 	Number(vals[0]),
		// 	Number(vals[1])
		// ];
	}

	/**
	 *
	 */
	set vals(cfg) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('recruitable').value 	= cfg['recruitable'];
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('open').value 			= cfg['open'];
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('closed').value 		= cfg['closed'];
	}
	
	/**
	 *
	 */
	get vals(){
		return {
			"open": 		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('open'),
			"recruitable": 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('recruitable'),
			"closed": 		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('closed')
		};
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recruitability);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/Support.js":
/*!***************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/Support.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _html_support_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/support.html */ "../RecruitmentForm/src/html/support.html");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _Field_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Field.js */ "../RecruitmentForm/src/js/fields/Field.js");
/**
 * @file Support.js
 * @author m 
 * @date 2022
 * @version 0.0.1
 */

/**
 * More or less this is here because there are too many events
 * these are the times when not using a framework is very painful
 */





/**
 *
 */
class Support extends _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	/**
	 *
	 */
	constructor() {
		super({ id: 'support', html: _html_support_html__WEBPACK_IMPORTED_MODULE_0__["default"] });

		this.addListeners();
	}

	/**
	 *
	 */
	set limits(sup){
		console.log(sup);
		// BOGUS
			// we'll get it from io in the end but it's canonical for now
			// $id('support-min').min
			// $id('support-max').max = input.max;
			// $id('support-diag').min = 0 ...always

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min').max 			= sup.high - sup.diag;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min-slider').max 	= sup.high - sup.diag;
		
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max').min 			= sup.low + sup.diag;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max-slider').min 	= sup.low + sup.diag;

		// Not the way to do it
		// leave the max and min alone...for diag at least
		// just set the max on the listener
		// $id('support-diag').max 		= sup.high - sup.low;
		// $id('support-diag-slider').max 	= sup.high - sup.low;
	}

	/**
	 *
	 */
	set vals(sup){
		this.min = sup.low;
		this.max = sup.high;
		this.diag = sup.diag;
	}

	/**
	 *
	 */
	get vals() { 
		return { 
			low: 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-min'), 
			high: 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-max'), 
			diag: 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-diag')
			}
		// return { 
		// 	low: this.min,
		// 	high: this.max,
		// 	diag: this.diag
		// }
	}

	get min() {
		return {
			"value": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-min'),
			"min": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min').min,
			"max": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min').max
		};
	}

	get max() {
		return {
			"value": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-max'),
			"min": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max').min,
			"max": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max').max
		};
	}

	get diag() {
		return {
			"value": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-diag'),
			"min": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-diag').min,
			"max": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-diag').max
		};
	}

	set min(v) {
		// if ( v > $id('support-min').max ) { v = $id('support-min').max; }
		let max = (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-max') - (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-diag');
		v = Math.min(v, max);
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min').value		= v;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min-slider').value = v; 
	}

	/**
	 *
	 */
	set max(v) {
		// if ( v < $id('support-max').min ) { v = $id('support-max').min; }
		// if ( v <= $num('support-min') ) { v = $num('support-min'); }
		let min = (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-min') + (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-diag');
		v = Math.max(v, min);
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max').value		= v;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max-slider').value = v; 
	}

	/**
	 *
	 */
	set diag(v) {
		// if ( v > $id('support-diag').max ) { v = $id('support-diag').max; }
		let max = (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-max') - (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('support-min');
		v = Math.min(v, max);
		
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-diag').value		= v;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-diag-slider').value= v;
	}

	/**
	 *
	 */
	addListeners() {
		// let update = (evt, key, val) => {
		let update = (e) => {
			// console.log(e.target.value);
			let key = e.target.id.split('-')[1];
			let orig = (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)(e.target.id);

			this[key] = e.target.value;

			let vals = this.vals;

			// let sup = {
			// 	"low": vals.low.value,
			// 	"high": vals.high.value,
			// 	"diag":vals.diag.value
			// }
			// this.limits = sup;

			// let vals = Object.entries(this.vals).map( ([k, v]) => { return {k: v.value}; } );
			// console.log(this.vals);
			// console.log(orig, +e.target.value); // ...always same??

			// this.limits = Object.entries(this.vals).map( ([k, v]) => {k: v.value} );
			if ( orig == e.target.value ) { // == => change ok
				// catch in weights & pairs (...&continuous &normal)
				_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('limitDist', {"changed": key, "values": vals});
			}

			_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('supportChanged', vals);
		}

		[ 
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min' ),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max' ),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-diag'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min-slider' ),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max-slider' ),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-diag-slider') 
		].forEach(el => {
			el.addEventListener('focus', e => {
				// Field.dispatcher.dispatchEvent('showDist', {"showLines": true, "distStr": "none"});
				_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('supportFocused');
			});
			el.addEventListener('blur',  e => {
				_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('supportBlurred');
			});
		});
		[ 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min' ),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max' ),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-diag') 
		].forEach(el => el.addEventListener('change', evt => update( evt )));
		
		[ 	(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-min-slider' ),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-max-slider' ),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('support-diag-slider')  
		].forEach(el => el.addEventListener('input', evt => update( evt )));

		// $id('support-min' ).addEventListener('change', evt => { update( evt, 'min',  evt.target.value ); });
			// $id('support-max' ).addEventListener('change', evt => { update( evt, 'max',  evt.target.value ); });
			// $id('support-diag').addEventListener('change', evt => { update( evt, 'diag', evt.target.value ); });		
			// $id('support-min-slider' ).addEventListener('input', evt => { update( evt, 'min',  evt.target.value ); });
			// $id('support-max-slider' ).addEventListener('input', evt => { update( evt, 'max',  evt.target.value ); });
			// $id('support-diag-slider').addEventListener('input', evt => { update( evt, 'diag', evt.target.value ); });
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Support);

/***/ }),

/***/ "../RecruitmentForm/src/js/fields/Weights.js":
/*!***************************************************!*\
  !*** ../RecruitmentForm/src/js/fields/Weights.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _html_weights_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/weights.html */ "../RecruitmentForm/src/html/weights.html");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom_utils */ "../RecruitmentForm/src/js/utils/dom_utils.js");
/* harmony import */ var _Field_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Field.js */ "../RecruitmentForm/src/js/fields/Field.js");
/**
 * @file Weights.js
 * @author m 
 * @date 2021
 * @version 0.0.1
 */






/**
 *
 */
class Weights extends _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
	/**
	 *
	 */
	constructor() {
		super({ id: 'weights', html: _html_weights_html__WEBPACK_IMPORTED_MODULE_0__["default"] });
		// 
		// "random": { "style": "DISABLED" ...infact: not a thing... it's ever so slightly weird, 
		// utlimately we have no data about the distribution of weights
			
		this.addListeners();
	}

	/**
	 *
	 */
	set vals(cfg) {
		console.log('Weights: ', cfg);
		this.style 			= cfg.style;
		this.funcStyle 		= cfg.func.style;

		this.normal = cfg.func.normal;
		this.linear = cfg.func.linear;
	}

	/**
	 *
	 */
	set style(str) {
		switch(str) {
			case 'equal': 
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-equal').checked = true; 
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-random').hidden = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-func').hidden 	 = true;
				break;
			case 'random':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-random').checked = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-random').hidden = false;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-func').hidden 	 = true; 
				break;
			case 'func':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-func').checked = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-random').hidden = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-func').hidden 	 = false; 
				break;
			default:
				throw new Error('need a weight style: ' + str );
		}
	}
	
	/**
	 *
	 */
	set funcStyle(str) {
		switch(str) {
			case 'linear': 
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-func-linear').checked = true;
				// $id('weights-dist-normal').hidden = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-linear').hidden = false;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-normal').hidden = true;
				break;
			case 'normal':
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-func-normal').checked = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-linear').hidden = true;
				(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-normal').hidden = false;
				break;
			default:
				throw new Error('need a weight - random - style');
		}
	}

	set normal(n) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-spread-low').value = n.std.low;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-spread-high').value = n.std.high;

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-peak-low').value = n.mean.low;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-peak-high').value = n.mean.high;
	}

	set linear(l) {
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-slope').value = l.slope;
	}

	/**
	 *
	 */
	get vals() {
		return {
			"style": this.style, //"uniform",
			"func": {
				"style": this.funcStyle,
				"linear": this.linear,
				"normal": this.normal
			}
		};
	}

	get normal() {
		return {
			"mean": {
				"low": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('weights-dist-thresholds-peak-low'),
				"high": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('weights-dist-thresholds-peak-high')
			},
			"std": {
				"low": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('weights-dist-thresholds-spread-low'),
				"high": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('weights-dist-thresholds-spread-high'),
				"same": true
			}
		};
	}

	get linear() {
		return {"slope": (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$num)('weights-slope')};
	}

	/**
	 *
	 */
	get style() { 
		// return $id('btn-weights-uniform').checked ? 'uniform' : 'random'; 
		return document.querySelector('input[name="btn-grp-weights"]:checked').value;
	}

	/**
	 *
	 */
	get randomStyle() { 
		return document.querySelector('input[name="btn-grp-weights-random"]:checked').value;
	}
	
	/**
	 *
	 */
	get funcStyle() { 
		return document.querySelector('input[name="btn-grp-weights-func"]:checked').value;
	}
	
	/**
	 *
	 */
	addListeners() {
		_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.addEventListener('limitDist', kv => this.limitDist(kv));
		[
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-peak-low'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-peak-high'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-spread-low'),
			(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-spread-high')
		].forEach (el => {
			// el.addEventListener('focus', e => Field.dispatcher.dispatchEvent('showDist', {"showLines": true, "distStr": "WNor"}) );
			// el.addEventListener('blur',  e => Field.dispatcher.dispatchEvent('showDist', {"showLines": false, "distStr": "none"}) );
			el.addEventListener('focus', e => _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('distWFocused') );
			el.addEventListener('blur',  e => _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('distWBlurred') );

			el.addEventListener('change', e => _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('weightsChanged'));
		});
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-slope').addEventListener('focus', e => _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('showDist', {"showLines": true, "distStr": "WNLin"}) );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-slope').addEventListener('blur',  e => _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('showDist', {"showLines": false, "distStr": "none"}) );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-slope').addEventListener('change', e => _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('weightsChanged'));

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-equal' ).addEventListener( 'change', e => { this.style = 'equal'; _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('weightsChanged', this.vals); } );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-random').addEventListener( 'change', e => { this.style = 'random'; _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('weightsChanged', this.vals); } );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-func'  ).addEventListener( 'change', e => { this.style = 'func'; _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('weightsChanged', this.vals); } );		

		
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-func-linear' ).addEventListener( 'change', e => { this.funcStyle = 'linear'; _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('weightsChanged', this.vals); } );
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('btn-weights-func-normal').addEventListener( 'change', e => { this.funcStyle = 'normal'; _Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('weightsChanged', this.vals); } );

		// $id('btn-weights-uniform').addEventListener( 'change', e => { /*this.style = 'uniform'; */Field.dispatcher.dispatchEvent('weightsChanged', this.vals); } );
		// $id('btn-weights-dist-uniform').addEventListener( 'change', e => { this.distStyle = 'uniform'; dispatcher.dispatchEvent('updateCalled'); } );
		// $id('btn-weights-dist-normal' ).addEventListener( 'change', e => { this.distStyle = 'normal';  dispatcher.dispatchEvent('updateCalled'); } );

		_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.addEventListener('getWeightsType', () => { 
			_Field_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatcher.dispatchEvent('weightsChanged', this.vals);
		});
	}

	limitNormal(kv){
		// 
		// we need to know which is changing...
		// 
		let changed = kv.changed;
		let sup = kv.values;

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-peak-low' ).min = sup.low;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-peak-high').min = sup.low;

		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-peak-low' ).max = sup.high;
		(0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__.$id)('weights-dist-thresholds-peak-high').max = sup.high;

		let dist = this.normal;
		let std = dist.std;

		console.log('dist = ', dist);
		
		// let dist = this.vals.func.normal;

		// let maxWidth = sup.high - (sup.low + sup.diag);
		// $id('thresholds-spread-low' ).max = maxWidth;
		// $id('thresholds-spread-high').max = maxWidth;

		// let ll = std.low;
		// let hh = std.high;
		// // if ( std.low > maxWidth ) { ll = maxWidth; }
		// if ( std.high 	> maxWidth ) { hh = maxWidth; }
		// std = {"low": ll, "high": hh};

		let mean = dist.mean;
		let l = mean.low;
		let h = mean.high;

		l = Math.max(mean.low, sup.low);
		h = Math.min(mean.high, sup.high);
		// if ( mean.low 	< sup.low  ) { l = sup.low; }
		// if ( mean.high 	> sup.high ) { h = sup.high; }


		if ( l >= h - sup.diag) {
			switch(changed){
			case 'min':
				h = l + sup.diag;
				// l = h;
				break;
			case 'max':
				l = h - sup.diag;
				break;
			case 'diag':
				// diag = sup.high
				// if (mean.low)
				// 	l--;
				// else {
				// 	h++
				// }
				let distMeanwidth = h - l;

				let rootMeanWidth = (1.0/Math.sqrt(2)) * distMeanwidth;
				// (1.0/Math.sqrt(2)) * sup.diag;

				// (1.0/Math.sqrt(2)) * distMeanwidth / (1.0/Math.sqrt(2)) * sup.diag;

				let newRootWidth = (1.0/Math.sqrt(2)) * sup.diag;

				let frac = newRootWidth - rootMeanWidth;
				let fracWidth = Math.sqrt(2) * frac;

				h += fracWidth;
				l -= fracWidth;

				// console.table({sup:sup, dist:{low:l, high:h}});
				// throw new Error('Are we sure this can happen????');
				break;
			default: throw new Error('must have a support changed value');
			}
		}

		mean = {"low": l, "high": h};

		this.normal = {
			"mean": mean,
			"std": std
		}

	}

	/**
	 *
	 */
	limitDist(kv) {
			// Field.dispatcher.dispatchEvent('limitDist', {"changed": key, "values": vals});
		this.limitNormal(kv);
		// let sup = {
			// low: 	$num('support-min'), 
			// high: 	$num('support-max'), 
			// diag: 	$num('support-diag')
			// };
			// $id('thresholds-peak-low' ).min = $num('support-min');
			// $id('thresholds-peak-high').min = $num('support-min');
			// $id('thresholds-peak-low' ).max = $num('support-max');
			// $id('thresholds-peak-high').max = $num('support-max');

		
	}

	// set distStyle(str) {
		// if (cfg.distribution.style == 'uniform') {
			// 	$id('btn-weights-dist-uniform').checked = true;
			// } else {
			// 	$id('btn-weights-dist-normal').checked = true;
			// 
		// // console.log();
		// if (str === 'uniform') {
		// 	$id('weights-norm').hidden 	 = true; 
		// 	$id('box-weights-dist-uniform' ).classList.add(	'box-half-checked');
		// 	$id('box-weights-dist-uniform' ).classList.remove( 'box-half');
		// 	$id('box-weights-dist-normal'  ).classList.remove( 'box-half-checked');
		// 	$id('box-weights-dist-normal'  ).classList.add(	'box-half');
		// } else {
		// 	$id('weights-norm').hidden 	 = false; 
		// 	$id('box-weights-dist-uniform' ).classList.remove( 'box-half-checked');
		// 	$id('box-weights-dist-uniform' ).classList.add( 	'box-half');
		// 	$id('box-weights-dist-normal'  ).classList.add( 	'box-half-checked');
		// 	$id('box-weights-dist-normal'  ).classList.remove( 'box-half');
		// }
		// }
	// set distribution(d) {
		// $id('weights-peak-low').value 	= d["mean"][0];
		// $id('weights-peak-high').value 	= d["mean"][1];
		// $id('weights-spread').value 	= d["std"];
		// }
	// set randomStyle(str) {
		// // there is no option here
		// switch(str) {
		// 	case 'uniform': 
		// 		$id('btn-weights-random-uniform').checked = true; break;
		// 		$id('weights-dist-normal').hidden = true;
		// 	case 'normal':
		// 		$id('btn-weights-random-normal').checked = true; break;
		// 		$id('weights-dist-normal').hidden 	 = false; 
		// 	default:
		// 		throw new Error('need a weight - random - style');
		// }
		// }
	// set style(str) {
		// switch(str) {
		// 	case 'uniform': 
		// 		$id('btn-weights-uniform').checked = true; break;
		// 	case 'random':
		// 		$id('btn-weights-random').checked = true; break;
		// 	case 'width':
		// 		$id('btn-weights-width').checked = true; break;
		// 	default:
		// 		$id('btn-weights-normal').checked = true;
		// }
		
		// // if (str === 'uniform') { // classList.add('fa-check-square'):('fa-square');
		// // 	// $id('weights-dist').hidden 	 = true; 
		// // 	// $id('box-weights-uniform' ).classList.add(	 'box-half-checked');
		// // 	// $id('box-weights-uniform' ).classList.remove('box-half');
		// // 	// $id('box-weights-random'  ).classList.remove('box-half-checked');
		// // 	// $id('box-weights-random'  ).classList.add(	 'box-half');
		// // } else { // random
		// // 	// $id('btn-weights-random' ).checked = true;
		// // 	// $id('btn-weights-random' ).setAttribute("checked", "checked");
		// // 	// $id('weights-dist').hidden 	 = false; 
		// // 	// $id('box-weights-random'  ).classList.add( 	 'box-half-checked');
		// // 	// $id('box-weights-random'  ).classList.remove('box-half');
		// // 	// $id('box-weights-uniform' ).classList.remove('box-half-checked');
		// // 	// $id('box-weights-uniform' ).classList.add( 	 'box-half');
		// // }
		// }
	
	// get distribution() { 
		// return 	{
		// 	style: 	$id('btn-weights-dist-uniform').checked ? 'uniform' : 'normal',
		// 	// mean: 	{ low: $num('weights-peak-low'),  high: $num('weights-peak-high') },
		// 	mean: 	[ $num('weights-peak-low'),  $num('weights-peak-high') ],
		// 	std: 	$num('weights-spread')
		// };
		// }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weights);

/***/ }),

/***/ "../RecruitmentForm/src/js/utils/dom_utils.js":
/*!****************************************************!*\
  !*** ../RecruitmentForm/src/js/utils/dom_utils.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$id": () => (/* binding */ $id),
/* harmony export */   "$num": () => (/* binding */ $num),
/* harmony export */   "$val": () => (/* binding */ $val)
/* harmony export */ });
// /**
//  * @author md 21-02-2021
//  */

// (function(exports) {
// // function $id(s) { return document.getElementById(s); }
// // function $val(s){ return document.getElementById(s).value; }
// // function $num(s){ return Number(document.getElementById(s).value); }
// // function setVal(s, val){ document.getElementById(s).value = val; }

// exports.$id  = (s) => document.getElementById(s);
// exports.$val = (s) => document.getElementById(s).value;
// exports.$num = (s) => Number(document.getElementById(s).value);


// })( typeof exports === 'undefined' ? this['dom_utils'] = {}: exports );
// // })( exports );

/**
 * @author md 01-04-2021
 */

const $id  = (s) => document.getElementById(s);
const $val = (s) => document.getElementById(s).value;
const $num = (s) => Number(document.getElementById(s).value);





/***/ }),

/***/ "../preisachjs/src/BiFunc.js":
/*!***********************************!*\
  !*** ../preisachjs/src/BiFunc.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BiStatio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BiStatio.js */ "../preisachjs/src/BiStatio.js");
/**
 * @file BiFunc.js 
 * @version 0.1
 * @author m 
 * @date 2022
 */
/*
 *
 */

/*
 *
 */
class BiFunc extends _BiStatio_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	/*
	 *
	 */
	// constructor(fOn = ()=>1, fOff = ()=>0) {
	constructor(args) {
		super(args);

		this.fOn  = args.fOn;
		this.fOff = args.fOff;

		// this.fOn  = (x) => this.curry(args.fOn,  x);
		// this.fOff = (x) => this.curry(args.fOff, x);
	}

	/*
	 *
	 */
	curry(f, x) {
		return f(x, this.thresholds.low, this.thresholds.high);
	}

	/**
	 * @param {float} x - new input
	 * @returns {float} - new output
	 */
	update(x) { 
		super.update(x);
		// console.log(this.fOn, x, this.thresholds.low, this.thresholds.high);
		return this.weight * ( 
					this.state 	? this.fOn( x, this.thresholds.low, this.thresholds.high) 
								: this.fOff(x, this.thresholds.low, this.thresholds.high)
							);
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BiFunc);

/***/ }),

/***/ "../preisachjs/src/BiStatio.js":
/*!*************************************!*\
  !*** ../preisachjs/src/BiStatio.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Thresholds_BiStat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Thresholds_BiStat.js */ "../preisachjs/src/Thresholds_BiStat.js");
/**
 * @file BiStatio.js 
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 * @param {dict} a - arguments
 * @returns {dict} a - verivied args
 */
function validateArgs(a) {
	return a;
}


/*
 * 
 * @abstract
 */
class BiStatio {
	/**
	 * create a 
	 * @constructor 
	 * @param {}
	 */
	constructor(args) {
		/**
		 *
		 */
		if (this.constructor == BiStatio) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		args = validateArgs(args);

		/**
		 * thresholds - thresholds threshold
		 * @abstract
		 * @property thresholds
		 * @type Thresholds
		 */
		this.thresholds; // = new Thresholds(args.thresholds);

		/**
		 * input - input 
		 * @property input
		 * @type number
		 */
		this.input 	= args.input ? args.input  : 0;

		/**
		 * state - state 
		 * @property state
		 * @type number // should maybe be boolean
		 */
		this.state 	= args.state ? args.state  : 0;

		/**
		 * weight - weight
		 * @property weight
		 * @type number
		 */
		this.weight = args.weight ? args.weight : 1;

		// console.log('BiStatio() weight = ', this.weight);

		// output : 0;
	}

	/**
	 * 
	 * @return {Thresholds} - thresholds
	 */
	// get thresholds()  { return this.thresholds; }
	// get thresholds()  { return { 'low': this.thresholds.low, 'high': this.thresholds.high }; }
	// set thresholds(t) { this.thresholds.thresholds = t; }

	/**
	 * @returns {int} - state
	 */
	// get state()  { return this.state; }
	// set state(t) { this.state = t; }
	// get output() {}


	/**
	 * @param {float} x - new input
	 * @returns {float} - new output
	 */
	update(x) { 	
		if(x <= this.thresholds.low) {
			this.state = 0; 
		} else if (x >= this.thresholds.high) {
			this.state = 1;
		} 
		this.input = x;

		return this.state * this.weight;
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BiStatio);

/***/ }),

/***/ "../preisachjs/src/Bistats2JXG/Bistats2JXG.js":
/*!****************************************************!*\
  !*** ../preisachjs/src/Bistats2JXG/Bistats2JXG.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HysteronJXG_PV_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HysteronJXG_PV.js */ "../preisachjs/src/Bistats2JXG/HysteronJXG_PV.js");
/* harmony import */ var _HysteronJXG_VP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HysteronJXG_VP.js */ "../preisachjs/src/Bistats2JXG/HysteronJXG_VP.js");
/**
 * @file Bistats2JXG
 * @author m
 * @date 2022
 * @version 0.1
 */

/**
 * 
 */


// import HysteronJXG from 'HysteronJXG.js';
// const PROPS0 = require('HysteronPropsJXG.js');

/**
 * 
 */
const PROPS = { 
	"fixed": 		true,
	"face": 		"[]",
	"strokeWidth": 	0,
	"sizeUnit": 	"user",
	"name": 		""
};

/**
 * Class to convert model properties into visual properties
 */
class Bistats2JXG {
	/**
	 * 
	 */
	constructor(cfg, bistats) {
		// this.weightMax 	= Math.max.apply(null, m.bistats.map(b=>b.weight()));
		// let sizeMax 	= this.getSizeMax(cfg.thresholds);

		/**
		 *
		 */
		this.locs = [];

		/**
		 *
		 */
		this.props= [];

		/**
		 * 
		 */
		let Hysteron;

		switch ( cfg['control-variable'] ) {
			case "P": Hysteron = _HysteronJXG_PV_js__WEBPACK_IMPORTED_MODULE_0__["default"]; break;
			case "V": Hysteron = _HysteronJXG_VP_js__WEBPACK_IMPORTED_MODULE_1__["default"]; break;
			default: throw new Error('Bistats2JXG: MUST HAVE A CONTROL VARIABLE (P/V), got: ', cfg['control-variable']);
			// console.log('MUST HAVE A CONTROL VARIABLE');
		}

		/**
		 * @static
		 * @property
		 */
		Hysteron.SIZE_MAX = this.getSizeMax(cfg) / this.getWeightMax(bistats);

		let h, p;
		bistats.forEach( 
			(b, i) => {
				h = new Hysteron(b);
				p = {
					...PROPS,
					fillColor: 				( ()=>h.colour 	)(b),
					strokeColor: 			( ()=>h.colour 	)(b),
					fillOpacity: 			( ()=>h.opacity )(b),
					highlightfillColor: 	( ()=>h.colour 	)(b),
					highlightstrokeColor: 	( ()=>h.colour 	)(b),
					highlightfillOpacity: 	( ()=>h.opacity )(b),
					size: 					( ()=>h.size 	)(b)
				};
				this.props.push(p);
				this.locs.push( h.locs );
			}
		);
	}

	getWeightMax(bistats) {
		return Math.max.apply(null, bistats.map(b=>b.weight));
	}

	/**
	 * 
	 */
	getSizeMax(cfg) {
		let t = cfg.thresholds;
		let s   = t.support;
		let sup = (s.high - s.low - s.diag);
		// let w = 
		return ( t.pairs == 'lattice' )
						  ? 0.9*(sup / (2*(t.lattice.size + 2))) 
						  : 0.9*(sup / (2*( Math.ceil(Math.sqrt(t.continuous.size)) + 1 )) );
	}

	/**
	 *
	 */
	// get props() { return this.props; }
	// get locs() { return this.locs; }
}

/**
 * getColors - Not used - still kinda nice if a little hacky
 * weight goes with size not with color
 * however we also have a distribution of thresholds -- useful to think of the difference
 */
function getColors(weights) {
	function getColor(t) 		{ // TURBO cmap from wiki? at a guess
		t = Math.max(0, Math.min(1, t));
		return "rgb("
				+ Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", "
				+ Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", "
				+ Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66)))))))
			+ ")";
	}

	let min = Math.min.apply(null, weights);
	let max = Math.max.apply(null, weights);
	let diff = max - min;

	return weights.map(w => getColor( (w-min)/(diff) ) );
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bistats2JXG);

/***/ }),

/***/ "../preisachjs/src/Bistats2JXG/HysteronJXG_PV.js":
/*!*******************************************************!*\
  !*** ../preisachjs/src/Bistats2JXG/HysteronJXG_PV.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * HysteronJXG_PV.js
 * @author m 
 * @date 2022
 * @version 0.0.2
 */

/**
 * 
 */
// import HysteronJXG from './HysteronJXG.js';

/**
 * 
 */
// class HysteronJXG_PV extends HysteronJXG {
class HysteronJXG_PV {
	/**
	 *
	 */
	static SIZE_MAX;

	/**
	 *
	 */
	constructor(bistat) { 
		// super(bistat);
		this.b = bistat;
	}
	
	/**
	 *
	 */
	get colour() {
		// console.log(b.state);
		return () => this.b.state ? '#49A88F' : '#888888';
	}
	
	/**
	 *
	 */
	get opacity() {
		return () => this.stateOpacity;
	}

	get stateOpacity() {
		// console.log(this.b.weight);
		if ( this.b.state ) {
			return this.openOpacity;
		} else {
			return this.closedOpacity;
		}
	}
	
	get closedOpacity() {
		return 0.1 + 0.7 * ( this.b.thresholds.low );
	}

	get openOpacity() {
		return (() => 0.1 + 0.7 * ( this.b.input ))();	
	}

	get openSize()	{
		// console.log(this.b.output);
		// return (() => { console.log(this.b.output); return ( 0.3 + 0.7*( this.b.output/this.b.weight ) ) * HysteronJXG_PV.SIZE_MAX; } )();
		return (() => { return ( 0.3 + 0.7*( this.b.output/this.b.weight ) ) * ( HysteronJXG_PV.SIZE_MAX * this.b.weight ); } )();
	}

	get closedSize() {
		// return ( 0.3 + 0.7*( b.fOn(b.thresholds.low) ) ) * HysteronJXG_PV.SIZE_MAX;
		return ( 0.3 + 0.7*( this.b.fOff(0)/*/this.b.weight*/ ) ) * HysteronJXG_PV.SIZE_MAX* this.b.weight ;
	}

	get stateSize() {
		// console.log(this.b.weight);
		if ( this.b.state ) {
			return this.openSize;
		} else {
			return this.closedSize;
		}
	}
	
	/**
	 *
	 */
	get size() {
		// console.log(HysteronJXG_PV.sizeMax);
		// console.log(this.b.state);
		// console.log(this.b.output);
		// console.log(this.b.weight);
		// console.log(this.b.thresholds.low);
		// console.log(this.b.fOn(this.b.thresholds.low));
		// console.log(HysteronJXG_PV.sizeMax * (0.3 + 0.7 * ( this.b.state ? (this.b.output / this.b.weight) : this.b.fOn(this.b.thresholds.low) )));
		// return () => HysteronJXG_PV.SIZE_MAX * (0.3 + 0.7 * ( this.b.state ? (this.b.output / this.b.weight) : this.b.fOff(0) ));


		return () => this.stateSize;
	}
	
	/**
	 *
	 */
	get locs() {
		return { pp: [this.b.thresholds.high, this.b.thresholds.low] };
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HysteronJXG_PV);

/***/ }),

/***/ "../preisachjs/src/Bistats2JXG/HysteronJXG_VP.js":
/*!*******************************************************!*\
  !*** ../preisachjs/src/Bistats2JXG/HysteronJXG_VP.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * HysteronJXG_VP.js
 * @author m 
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */
// import JXG from 'JSXGraph';
// import HysteronJXG from './HysteronJXG.js';

/**
 *
 */
class HysteronJXG_VP {
// class HysteronJXG_VP extends HysteronJXG {
	/**
	 *
	 */
	static SIZE_MAX;

	/**
	 *
	 */
	constructor(b) { 
		// super(b);
		this.b = b;
	}

	/**
	 *
	 */
	get colour() {
		return () => this.b.state ? '#49A88F' : '#888888';
	}

	/**
	 *
	 */
	get opacity() {
		return () => this.stateOpacity;
	}

	get stateOpacity() {
		// console.log(this.b.weight);
		if ( this.b.state ) {
			return this.openOpacity;
		} else {
			return this.closedOpacity;
		}
	}
	
	get closedOpacity() {
		return 0.1 + 0.7 * ( this.b.thresholds.plow );
	}

	get openOpacity() {
		return (() => 0.1 + 0.7 * ( (this.b.output / this.b.weight) ))();	
	}


	/**
	 *
	 */
	// get opacity() {
	// 	return () => 0.2 + 0.6 * ( this.b.state ? (this.b.output / this.b.weight) : this.b.thresholds.plow );
	// }

	get openSize()	{
		// console.log(this.b.output);
		// return (() => { console.log(this.b.output); return ( 0.3 + 0.7*( this.b.output/this.b.weight ) ) * HysteronJXG_PV.SIZE_MAX; } )();
		return (() => { return ( 0.3 + 0.7*( this.b.input ) ) * ( HysteronJXG_VP.SIZE_MAX * this.b.weight ); } )();
		// return (() => { return ( 0.3 + 0.7*( this.b.input ) ) * ( HysteronJXG_VP.SIZE_MAX ); } )();
	}

	get closedSize() {
		// return (() => { return ( 0.3 + 0.7*( this.b.closedVolume/this.b.weight ) ) * ( HysteronJXG_VP.SIZE_MAX * this.b.weight ); } )();
		return ( 0.3 + 0.7*( this.b.closedVolume/this.b.weight ) ) * ( HysteronJXG_VP.SIZE_MAX * this.b.weight );
	}

	get stateSize() {
		// console.log(this.b.weight);
		if ( this.b.state ) {
			return this.openSize;
		} else {
			return this.closedSize;
		}
	}
	
	/**
	 *
	 */
	get size() {
		return () => this.stateSize;
	}

	// /**
	//  *
	//  */
	// get size() {
	// 	return HysteronJXG_VP.SIZE_MAX * this.b.weight * (0.3 + 0.7 * ( this.b.state ? this.b.input : this.b.closedVolume ) ); //fInv(this.b.thresholds.low) ));
	// }

	/**
	 *
	 */
	get locs() {
		return {
			pp: [this.b.thresholds.plow, this.b.thresholds.phigh],
			vv: [()=>this.b.thresholds.high, ()=>this.b.thresholds.low]
		};
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HysteronJXG_VP);

/***/ }),

/***/ "../preisachjs/src/Distribution/Linear.js":
/*!************************************************!*\
  !*** ../preisachjs/src/Distribution/Linear.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random.js */ "../preisachjs/src/Distribution/Random.js");
/* harmony import */ var _Triangular_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Triangular.js */ "../preisachjs/src/Distribution/Triangular.js");
/**
 * @file Linear.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */




/**
 * 
 * 
 */
function randomChoice_Linear(min=0, max=1, trueMin=0, trueMax=1, slope=1, mode=1) {
	// let r = getRandomArbitrary(min, max);
	let r = (0,_Random_js__WEBPACK_IMPORTED_MODULE_0__["default"])(trueMin, trueMax);
	throw new Error('trueMin, trueMax');

	// let t = trueMax;
	// while ( t >= trueMax || t <= trueMin ) {
	// // while ( t >= trueMax ) {
	// 	t = triangular(min, max, mode);
	// }
	let t = (0,_Triangular_js__WEBPACK_IMPORTED_MODULE_1__["default"])(min, max, mode);

	return slope*t + (1-slope)*r;
	// randl.m ...matlab
	
	// ran=randb.*rand(SIZE) + (1-randb).*randtri(SIZE);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (randomChoice_Linear);

/***/ }),

/***/ "../preisachjs/src/Distribution/Linear_Preisach.js":
/*!*********************************************************!*\
  !*** ../preisachjs/src/Distribution/Linear_Preisach.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random.js */ "../preisachjs/src/Distribution/Random.js");
/* harmony import */ var _Linear_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Linear.js */ "../preisachjs/src/Distribution/Linear.js");
/* harmony import */ var _Triangular_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Triangular.js */ "../preisachjs/src/Distribution/Triangular.js");
/* harmony import */ var _Uniform_Preisach_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Uniform_Preisach.js */ "../preisachjs/src/Distribution/Uniform_Preisach.js");
/**
 * @file Linear_Preisach.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */





function randBin() {
  return Math.floor(Math.random() * 2);
}

function randomPlusMinus() {
  // return Math.floor( (Math.random() * 2) - 1 );
  return Math.random() < 0.5 ? -1 : 1;
}

function norm(x, y) {
	return Math.sqrt(x*x + y*y);
}

/**
 * distribution based on width of relay
 * 1. uniform random of high (x)
 * 3. get bounds of low
 * 2. linear random of low
 */
// https://stats.stackexchange.com/questions/171592/generate-random-numbers-with-linear-distribution
// function getLinearWidthPairs(support = {min:0, max:1, diag:0.25}, size = 2) {
function linearPairs(sup = [0, 1, 0.25], size = 2) {
	let minHigh = sup[0] + sup[2] + 0.0;
	let maxHigh = sup[1];

	let minLow = sup[0];
	let maxLow = sup[1] - sup[2]; 
	
	let min = sup[2];
	// let max = sup[2] + (sup[1] - (sup[0] + sup[2])) / Math.sqrt(2);
	let max = sup[2] + Math.sqrt( (sup[1] - (sup[0] + sup[2])) / 2 );

	let z = 0;
	let xx;
	let d;
	let i = 0;
	let pairs = [];

	while ( i < size ) {
		xx = (0,_Random_js__WEBPACK_IMPORTED_MODULE_0__["default"])( minLow, maxHigh );
		// d = triangular( sup[2], (sup[2]) + 1/root, sup[2] ) / root;
		d = (0,_Triangular_js__WEBPACK_IMPORTED_MODULE_2__["default"])( min, max, min );

		if ( (xx-d) > minLow && (xx+d) < maxHigh ) {
			pairs.push([xx-d, xx+d]);
			i++;
		}

	}
	return pairs;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (linearPairs);

/***/ }),

/***/ "../preisachjs/src/Distribution/Normal_Preisach.js":
/*!*********************************************************!*\
  !*** ../preisachjs/src/Distribution/Normal_Preisach.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _boxMuller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boxMuller.js */ "../preisachjs/src/Distribution/boxMuller.js");
/**
 * @file Normal_Preisach.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */


/**
 * @param {<!array number>} loc - location of mean x & y values
 * @param {<!array number>} scale - scale / std x & y directions
 * @param {<!array number>} sup - support [min, max, diag]
 * @param {number} size - number of random selections
 * 
 * @return {<!array <!array number>, <!array number> >}
 */
function randomNormal(loc, scale, sup, size){
	/*
	 * BOGUS
	 * This is a symmetric distribution
	 * The GUI allows for separate spread for low and high
	 */

	let low, high, i = 0;
	// console.log(loc, scale);

	let pairs = [];
	while (i < size) {
		low 	= (0,_boxMuller_js__WEBPACK_IMPORTED_MODULE_0__["default"])(sup, loc[0], scale);
		high 	= (0,_boxMuller_js__WEBPACK_IMPORTED_MODULE_0__["default"])(sup, loc[1], scale);
		
		// console.log(low, high);
		if (low >= high - sup[2] || low < sup[0] || high > sup[1]) {
			continue;
		}
		pairs.push([low, high]);
		i += 1;
	}
	
	return pairs;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (randomNormal);

/***/ }),

/***/ "../preisachjs/src/Distribution/Random.js":
/*!************************************************!*\
  !*** ../preisachjs/src/Distribution/Random.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file Random.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */
// import boxMuller from './boxMuller.js';

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

// function scaledRandoms(n) {
    // /**
    //  * BOGUS must ensure these are within the support
    //  *       ...it's not used here at all
    //  */
    // let a = [...Array(n)].map(() => Math.random() );
    // // console.log(a);
    // let s = a.reduce((a, v) => a+v, 0);
    // return a.map(b => b/s);
    // // return a.map(b => b/n);
    // }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRandomArbitrary);

/***/ }),

/***/ "../preisachjs/src/Distribution/Triangular.js":
/*!****************************************************!*\
  !*** ../preisachjs/src/Distribution/Triangular.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file Triangular.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */

/**
 * https://github.com/stdlib-js/random-base-triangular/blob/main/lib/triangular.js
 * Returns a pseudorandom number drawn from a triangular distribution with minimum support `a`, maximum support `b` and mode `c`.
 *
 * @private
 * // @param {PRNG} rand - PRNG for generating uniformly distributed numbers
 * @param {number} a - minimum support
 * @param {number} b - maximum support
 * @param {number} c - mode
 * @returns {number} pseudorandom number
 */
function triangular( a, b, c ) {
	var fc;
	var x;
	var u;
	fc = (c - a) / (b - a);

	u = Math.random();

	if ( u < fc ) {
		x = (b - a) * (c - a);
		return a + Math.sqrt( x * u );
	}
	x = (b - a) * (b - c);
	return b - Math.sqrt( x * (1.0 - u) );
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (triangular);


/***/ }),

/***/ "../preisachjs/src/Distribution/Uniform_Preisach.js":
/*!**********************************************************!*\
  !*** ../preisachjs/src/Distribution/Uniform_Preisach.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file Uniform_Preisach.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */

/**
 * @function randomUniform
 * @param {<!array>number} sup - support
 * @param {number} size
 * @return {<!array <!array number> >} pairs
 */
function randomUniform(sup, size){

	// let l = sup[0];
	let minLow = sup[0];
	let maxHigh = sup[1];

	let minWidth = sup[2];
	let maxWidth = sup[1] - sup[0] - sup[2];

	console.table( {minLow, maxHigh: maxHigh, minWidth: minWidth, maxWidth: maxWidth} );
	
	// let width = sup[1] - sup[0] - sup[2];
	// let h = sup[1] - sup[2] + 0.0;
	// let w = h - l;
	// console.log('random uniform');
	// console.table({h: h, l:l, w: w});

	/*
	let l = sup[0] + sup[2] + 0.0;
	let w = sup[1] - l;
	*/


	// let low, high;
	let low 	= [...Array(size)].map(() => minLow + ( maxWidth * Math.random() ) );
	let high = [];
	low.forEach(l => {
		high.push( l + minWidth + ( maxWidth - l ) * Math.random() );
		// high.push( maxHigh - ( maxWidth * Math.random() ) );
	});
	// let high 	= [...Array(size)].map(() => l + w * Math.random() );
	// let high 	= [...Array(size)].map(() => maxHigh - ( width ) * Math.random() );
	let i = -1; //, i = 0
	let pairs = [];
	while ( i++ < size-1 ) {
		/*
		 *
		 */
		while (low[i] == high[i]) {
			// low[i] = sup[0] + w * Math.random();
			low[i] = minLow + width * Math.random();
		}

		// while ( high[i] > sup[1] ) {
		// 	high[i] = maxHigh - ( width ) * Math.random() * Math.random();
		// }
		
		// console.log(low[i] - ( high[i] - sup[2] ) );
		// pairs.push([low[i], high[i]]);

		// as far as I remember there is an artifact at line low=high ...the distribution looks weird
		// if (low[i] > high[i]) {
		// 	pairs.push([high[i], low[i]]);
		// } else {
		// 	pairs.push([low[i], high[i]]);
		// }

		pairs.push([low[i], high[i]]);
	}
	console.table(pairs);
	return pairs;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (randomUniform);

/***/ }),

/***/ "../preisachjs/src/Distribution/boxMuller.js":
/*!***************************************************!*\
  !*** ../preisachjs/src/Distribution/boxMuller.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file boxMuller.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */

/**
 * @param {}
 */
function boxMuller(sup, mu, sigma) { 
	let u = 0, v = 0;
	while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	while(v === 0) v = Math.random();
	let num = sigma * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ) + mu;
	// num = num / 10.0 + 0.5; // Translate to 0 -> 1
	// if (num > 1 || num < 0) return boxMuller(); // resample between 0 and 1
	// console.log(u, v, num);
	// if (num > sup[1] || num < ) return boxMuller(sup, mu, sigma); // resample between 0 and 1
	return num;
}

// function boxMuller_old(mu, sigma) { 
	// let u = 0, v = 0;
	// while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	// while(v === 0) v = Math.random();
	// let num = sigma * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ) + mu;
	// // num = num / 10.0 + 0.5; // Translate to 0 -> 1
	// // if (num > 1 || num < 0) return boxMuller(); // resample between 0 and 1
	// // console.log(u, v, num);
	// if (num > mu + 3*sigma || num < mu - 3*sigma) return boxMuller(mu, sigma); // resample between 0 and 1
	// return num;
	// }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boxMuller);

/***/ }),

/***/ "../preisachjs/src/MultiPressure/BiPressure.js":
/*!*****************************************************!*\
  !*** ../preisachjs/src/MultiPressure/BiPressure.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Thresholds_BiStat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Thresholds_BiStat.js */ "../preisachjs/src/Thresholds_BiStat.js");
/* harmony import */ var _BiFunc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BiFunc.js */ "../preisachjs/src/BiFunc.js");
/**
 * @file BiPressure.js 
 * @version 0.1
 * @author m
 * @date 2022
 */
/*
 *
 */
// import {Thresholds_BiStat as Thresholds} from '../Thresholds_BiStat.js';


/**
 *
 */
class BiPressure extends _BiFunc_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	/**
	 *
	 */
	constructor(args) {
		super(args);
		// console.log(args);

		/**
		 * @property output
		 * @type number
		 * need this for the size of the hysterons on the Preisach plane
		 */
		this.output;

		this.thresholds = new _Thresholds_BiStat_js__WEBPACK_IMPORTED_MODULE_0__["default"](args.thresholds);

		let closedVol = this.fOn(this.thresholds.low);

		this.fOff = x => closedVol;
	}
	
	update(x) {
		this.output = super.update(x);
		// this.input = x;
		return this.output;
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BiPressure);


/***/ }),

/***/ "../preisachjs/src/MultiPressure/BiPressures.js":
/*!******************************************************!*\
  !*** ../preisachjs/src/MultiPressure/BiPressures.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BiPressure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BiPressure */ "../preisachjs/src/MultiPressure/BiPressure.js");
/**
 *	@file BiPressures.js
 *	@author m
 *	@date 2022
 *	@version 0.0.1 
 */
/**
 *
 */

/**
 *
 */
class BiPressures {
	/**
	 *
	 */
	 constructor(thresholds, weights, fOn, fOff) {	
		this.all = new Array( thresholds.length );
		let k = 0;
		thresholds.forEach( p => {
			this.all[k] = new _BiPressure__WEBPACK_IMPORTED_MODULE_0__["default"]({'thresholds': p, 'weight': weights[k++], 'fOn': fOn, 'fOff': fOff});
			// this.all[k] = new BiPressure(fOn, fOff)
			// 						.thresholds(p)
			// 						.weight( this.weights()[k++] )
			// 						.state(1);
			}
		);

		this.ons 	= this.all.filter( () => true );
		this.offs 	= [];
	}

	get high() { return Math.min.apply(null, this.offs.map(b => b.thresholds.high)); }
 	get low()  { return Math.max.apply(null, this.ons.map( b => b.thresholds.low )); }

 	get lowestLow()  { return Math.min.apply(null, this.offs.map( b => b.thresholds.low )); }
 	// let p = 				Math.min.apply( null, m.offs.map(o => o.thresholds()[1]) );	
	// let s = m.offs.filter( o => o.thresholds()[1] == p );
	// get bLowestLow() { return this.offs.filter( b => b.thresholds.high == p ); }
	
	get bOffsLowestHigh() {
		return this.offs.filter( b => b.thresholds.low == this.lowestLow );
	}

	get bLowestLow() { return this.offs.filter( b => b.thresholds.low == this.lowestLow ); }
 	// get bLowestLow() { return this.offs.filter( (e, i, arr) => {
		// 	if( el.thresholds.low == this.lowestLow ) {
		// 		return true;
		// 	} else { return false; }
		// }); 
 	// }
 	
 	// get bLowestLow() { return this.offs.filter( (e, i, arr) => {
		// 	if( el.thresholds.low == this.lowestLow ) {
		// 		return true;
		// 	} else { return false; }
		// }); 
 	// }


 	// getSubs(l, h) {
 	// 	let subs = this.all.filter( b => {
 	// 		if ( b.thresholds.low > l && b.thresholds.high < h ) {
 	// 			return true;
 	// 		} else {
 	// 			return false;
 	// 		}
 	// 	})
 	// 	return subs;
 	// }
	
	updateMax(){console.log('not inplemented');}
	
 	/**
 	 * technically we should probably update all elements but we only update the ones that change
 	 */
 	open(t) {
		this.offs = this.offs.filter( (el, i, arr) => {
			if( el.thresholds.high != this.high ) {
				return true;
			}
			this.ons.push(arr[i]);
			el.update(t);
			return false;
		});
 	}

 	close(t) {
		this.ons = this.ons.filter( (el, i, arr) => {
			if( el.thresholds.low != this.low ) {
				return true;
			}
			this.offs.push(el); //arr[i]);
			el.update(t);
			return false;
		});
 	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BiPressures);


/***/ }),

/***/ "../preisachjs/src/MultiPressure/MultiPressure.js":
/*!********************************************************!*\
  !*** ../preisachjs/src/MultiPressure/MultiPressure.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MultiStat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MultiStat.js */ "../preisachjs/src/MultiStat.js");
/* harmony import */ var _BiPressures_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BiPressures.js */ "../preisachjs/src/MultiPressure/BiPressures.js");
/* harmony import */ var _SolSet_SolSet_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SolSet/SolSet.js */ "../preisachjs/src/SolSet/SolSet.js");
/**
 * @file MultiPressure.js
 * @author m
 * @date 2022
 * @version 2 million
 */

/**
 *
 */




// import SolSet_Constant_Lattice from '../SolSet/SolSet_Constant_Lattice.js';
// import SolSet_Constant_Continuous from '../SolSet/SolSet_Constant_Continuous.js';

/**
 * @class MultiPressure
 */	 
class MultiPressure extends _MultiStat_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	/**
	 *
	 */
	constructor(cfg, thresholds=null, weights=null) {
		/**
		 *
		 */
		super(cfg, thresholds, weights);

		/**
		 * bistats - 
		 * @property bistats
		 * @type BiPressures
		 */
		this.bistats = new _BiPressures_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.thresholds.pairs, this.weights.weights, this.fOn, this.fOff);

		/**
		 * high - 
		 * @property high
		 * @type number
		 */
		// this.high 	= Number.POSITIVE_INFINITY;

		/**
		 * low - 
		 * @property low
		 * @type number
		 */
		// this.low  	= this.bistats.low;

		/**
		 * hardMax - 
		 * @property hardMax
		 * @type 
		 */
		this.hardMax	= cfg.input.max;

		this.globalMax	= cfg.input.max;
		this.globalMin	= cfg.input.min;

		/**
		 * hardMin - 
		 * @property hardMin
		 * @type 
		 */
		this.hardMin	= Math.min.apply(null, this.bistats.all.map( b => b.thresholds.low ));

		/**
		 * @property input
		 * @type number
		 */
		this.input 		= this.hardMax;
		// this.input 	= {
			// 'min': 0,
			// 'max': 1,
			// 'val': 1,
			// 'dx': 0.01
			// }
			// this.input 	= this.xHistory()[0];
			// this.output;
			// for (let x of this.xHistory()) {
			// 	this.update(x); 
			// }

		this.setPrecision();
		/**
		 * cycle - 
		 * @property cycle
		 * @type 
		 */
		this.cycle = super.getCycle();
		
		/**
		 * solSet - 
		 * @property solSet
		 * @type 
		 *
		 * THIS WORKS
		 */
		// if ( cfg.thresholds.pairs == 'lattice') {
		// 	console.log('lattice');
		// 	this.solSet = new SolSet_Constant_Lattice(this);
		// } else {
		// 	this.solSet = new SolSet_Constant_Continuous(this);
		// }

		// was working... changed cause too slow
		// console.log('MultiPressure() -> pairs = ', cfg.thresholds.pairs);
		// this.solSet = SolSet( {'input': 'pressure', 'pairsStyle': cfg.thresholds.pairs, 'model': this});

		if ( (cfg.thresholds.pairs == 'lattice' && cfg.thresholds.lattice.size < 7) ||
				(cfg.thresholds.pairs == 'continuous' && cfg.thresholds.continuous.size < 10)
			) {
			// cfg.draw.io.SolSet = false;
			console.log('MultiPressure() -> pairs = ', cfg.thresholds.pairs);
			this.solSet = (0,_SolSet_SolSet_js__WEBPACK_IMPORTED_MODULE_2__["default"])( {'input': 'pressure', 'pairsStyle': cfg.thresholds.pairs, 'model': this});
		} else {
			this.solSet = null;
		}

		// this.paths = this.solSet.statios.map( s => s.getPath(this) );
		// this.path = this.getSolSet();

		this.bistats.updateMax(cfg.input.max);
		this.input = cfg.input.max;
		this.setPrecision();
	}

	/**
	 * @method update
	 * 
	 * Intermediate steps are only necessary for display purposes
	 * To show the end point of a statio we must update immediately before the threshold
	 * 
	 * @param {double} x - new input
	 * 
	 * @return {array of pieces}
	 * 	[pieces] = [ [ [ins], [outs] ], [ [ins], [outs] ], ... ]
	 * 	pieces = [piece]
	 * 	piece = [ins, outs]
	 * 	ins = [] input coords of piece
	 * 	outs = [] output coords of piece
	 */
	update(x) {
		/**
		 *
		 */
		let gamma = (x) => {
			return this.bistats.all.map(b => b.update(x)).reduce((a, b) => a+b, 0);
		}
		
		/**
		 *
		 */
		let piece = (start, stop, step) => {
			let ins 	= [start], 
				outs 	= [gamma(start)],
				x 		= start + step;
			// let anotherStep = step > 0 ? x => x < stop : x => x > stop;
			while ( anotherStep(x, stop) ) {
				ins.push( x);
				outs.push(gamma(x));
				x += step;
			}
			ins.push( stop);
			outs.push(gamma(stop));
			return [ins, outs];
		}

		let t,
			i = 0,
			path = [],
			start = this.input;

		let [ 
			direction,
			eps,
			step,
			threshold,
			anotherPiece,
			anotherStep,
			crossThreshold ] = Object.values(this.getDirection(x));

		// console.log('step = ', step);
		// while( anotherPiece(x) && i++ < 10){
		while( anotherPiece(x) ){
			t = threshold();
			// console.log('t = ', t, 'x = ', x, 'direction = ', direction);
			path.push( piece(start, t - eps, step()) );
			crossThreshold(t);
			this.setPrecision();
			start 	= 	t + eps;
		}

		path.push(piece(start, x, step()));
		this.input = x;
		this.output = gamma(x);
		// console.log('finished update');
		return path;
	}
	
	getDirection(x) {
		if ( x > this.input ) {
			return {
				direction		: 1,
				eps 			: this.eps,
				// step 			: this.precision,
				step 			: () 		=> this.getPrecision(),
				threshold 		: () 		=> this.bistats.high,
				anotherPiece 	: (x) 		=> x >= this.bistats.high,
				anotherStep 	: (x, stop) => x < stop,
				// crossThreshold 	: t 		=> {this.bistats.open(t); this.precision;}
				// crossThreshold 	: t 		=> {this.bistats.open(t); this.setPrecision();}
				crossThreshold 	: t 		=> this.bistats.open(t)
			}
		}
		return {
				direction		: -1,
				eps 			: -this.eps,
				// step 			: -this.precision,
				step 			: () 		=> -this.getPrecision(),
				threshold 		: () 		=> this.bistats.low,
				anotherPiece 	: (x) 		=> x <= this.bistats.low,
				anotherStep 	: (x, stop) => x > stop,
				// crossThreshold 	: t 		=> {this.bistats.close(t); this.precision;}
				// crossThreshold 	: t 		=> {this.bistats.close(t); this.setPrecision();}
				crossThreshold 	: t 		=> this.bistats.close(t)
		}
	}

	// getSolSet() {
		// return this.solSet.paths;
		// }
	// getCycle() {
		// // console.log('here');
		// let pieces = [],
		// 	min = this.hardMin,
		// 	max = this.hardMax; // - 6E-3;	
		// 	// min = cfg.input.min,
		// 	// max = cfg.input.max; // - 6E-3;			
		// // this.model.update(max - 1E-8); 
		// // pieces[0] = this.model.update(min);
		// // pieces[1] = this.model.
		// this.update(max);
		// pieces = this.update(min);
		// pieces = pieces.concat( this.update(max) );
		// return pieces;
		// }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultiPressure);

/***/ }),

/***/ "../preisachjs/src/MultiStat.js":
/*!**************************************!*\
  !*** ../preisachjs/src/MultiStat.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Weights_MultiStat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Weights_MultiStat.js */ "../preisachjs/src/Weights_MultiStat.js");
/* harmony import */ var _ThresholdPairs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThresholdPairs.js */ "../preisachjs/src/ThresholdPairs.js");
/* harmony import */ var _SolSet_SolSet_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SolSet/SolSet.js */ "../preisachjs/src/SolSet/SolSet.js");
/**
 * @file MultiStat.js 
 * @author m 
 * @date 2022
 * @version 0.0.1
 */
 
/*
 *
 */
// import getWeights 	from './weights.js';





/*
 *
 */
class MultiStat {
	/*
	 *
	 */
	constructor(cfg, thresholds=null, weights=null) {
		/**
		 * bistats - 
		 * @property bistats
		 * @type defined by child class
		 */
		this.bistats;

		/**
		 * input - 
		 * @property input
		 * @type number
		 */
		this.input;

		/**
		 * cfg {...
		 * fOff
		 * fOn
		 * input.min,
		 * input.max;
		 * output.min,
		 * output.max;
		 * thresholds
		 * weights
		 * ...}
		 */
		this.fOff 	= cfg.fOff;
		
		/**
		 *
		 */
		this.fOn  	= cfg.fOn;

		/**
		 * eps - 
		 * @property eps
		 * @type 
		 */
		this.eps 	= 1E-10;

		/**
		 * @property 
		 * @type number
		 */
		// this.permanentlyOpen = cfg.permanentlyOpen;

		/**
		 * thresholds - 
		 * @property thresholds
		 * @type list of threshold pairs
		 */
		this.thresholds = (thresholds != null) 
						? thresholds
						: new _ThresholdPairs_js__WEBPACK_IMPORTED_MODULE_1__["default"](cfg.thresholds);


		// BOGUS
		// Must get this from views.form
		cfg.weights['max'] = 1;
		
		/**
		 * weights - 
		 * @property weights
		 * @type array of numbers
		 */
		// console.log('MultiStat() weights = ', weights);
		// console.log('MultiStat() weights cfg = ', cfg);
		// console.log('MultiStat() weights cfg = ', cfg.max);
		this.weights 	= (weights != null) 
						? weights
						: new _Weights_MultiStat_js__WEBPACK_IMPORTED_MODULE_0__["default"](cfg.weights, this.thresholds.pairs);
		// console.log('MultiStat() weights = ', this.weights.weights);

		/**
		 * healthy - 
		 * @property healthy
		 * @type {<!Array of x values>, <!Array of y values}
		 */
		this.healthy = this.getHealthyCurve(cfg);

		/**
		 * cycle - 
		 * @property cycle
		 * @type {<!Array <!Array of x values>, <!Array of y values>>}
		 */
		this.cycle;
		// not initialising here because we need to initialise hardMin, hardMax
		// this.cycle = this.getCycle(); 

		/**
		 * solSet - 
		 * @property solSet
		 * @type {<!Array <!Array of x values>, <!Array of y values>>}
		 */
		this.solSet;
		// this.solSet = new SolSet().init( {'thresholds': 'constant/variable' , 'pairsStyle': 'lattice/continuous'} );
	}

	/**
	 *
	 */
	getCycle() {
		// console.log("get cycle");
		// console.log(this.hardMin, this.hardMax);
		/*
		 * start at max
		 */
		this.update( this.hardMax );
		
		/*
		 * decrease to min
		 */
		// console.log('getCycle() --> update(hardMin)', this.hardMin);
		let pieces = this.update( this.hardMin );		
		// console.log('finished decrease');
		// console.log('getCycle() --> update(hardMax)', this.hardMax);
		pieces = pieces.concat( this.update(this.hardMax) );

		// console.log("getCycle finished");
		return pieces;
	}

	/**
	 * @param 
	 * @return
	 */
	getHealthyCurve(cfg) {
		let p 	= cfg.input.min,
			max = cfg.input.max;
		let s 	= (max - p)/100;
		let x 	= [],
			y 	= [];
		while (p < max) {
			x.push(p);
			y.push(cfg.fOn(p));
			p = p+s;
		}
		x.push(max);
		y.push(cfg.fOn(max));
		return [x, y];
	}
	
	/*
	 *
	 */
	getPrecision() {
		return this.precision;
	}
	// get precision() {
	// 	// this.inputPrecision = 0.01;
	// 	let h = Math.min(this.bistats.high, this.hardMax);
	// 	let l = Math.max(this.bistats.low,  this.hardMin);
	// 	let s = ( h - l ) / 10.0; 
	// 	// console.log('precision = ', s);

	// 	// return s > 0 ? s : this.inputPrecision();
	// 	// console.log(s);
	// 	if ( s < 1E-5 ) s = 1E-5;
	// 	return s > 1E-2 ? 1E-2 : s;
	// }
	// get precision() {
	// 	return this.precision
	// }

	setPrecision() {		
		// this.inputPrecision = 0.01;
		let h = Math.min(this.bistats.high, this.hardMax);
		let l = Math.max(this.bistats.low,  this.hardMin);
		let s = ( h - l ) / 10.0; 

		// return s > 0 ? s : this.inputPrecision();
		// console.log(s);
		if ( s < 1E-4 ) s = 1E-4;
		// return s > 1E-2 ? 1E-2 : s;
		this.precision = s > 1E-2 ? 1E-2 : s;
		// console.log('precision = ', this.precision);
	}

	/**
	 * @abstract
	 * @param {number} x -
	 * @return {list of pairs of lists} 
	 */
	update(x) { throw new Error("Method \t'update()'\tmust be implemented."); }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultiStat = MultiStat);

/***/ }),

/***/ "../preisachjs/src/MultiVolume/BiVols.js":
/*!***********************************************!*\
  !*** ../preisachjs/src/MultiVolume/BiVols.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BiVolume_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BiVolume.js */ "../preisachjs/src/MultiVolume/BiVolume.js");
/**
 * @file BiVols.js 
 * @author m
 * @date 2022
 * @version 0.0.1
 */
/*
 *
 */

/**
 *
 */
function WARN_1(str) {
	console.log(`%c ${str} `, `background-color: #CCCC44; color: #444444; font-weight: bold; font-size: 1.2rem;`);
}

function WARN_2(str) {
	console.log(`%c ${str} `, `background-color: #CC2222; color: #111111; font-weight: bold; font-size: 1.2rem;`);
}

/**
 *
 */
class BiVols {
	/*
	 *
	 */
	constructor(thresholds, weights, fOn, fOff, fInv) {
		/**
		 * @property weightOpen
		 * @type number
		 */
 		this.weightOpen = 1;

		/**
		 * @property volTrapped
		 * @type number
		 */
 		this.volTrapped = 0;

		/**
		 * all
		 * @type array
		 */
		this.all = new Array( thresholds.length );
		thresholds.forEach( (p, i) => {
			this.all[i] = new _BiVolume_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
				'thresholds': p, 
				'weight': weights[i], 
				'fOn': fOn, 
				'fOff': fOff, 
				'fInv': fInv});
		});

		/**
		 * ons
		 * @type array
		 */
		this.ons 	= this.all.filter( () => true );

		/**
		 * offs
		 * @type array
		 */
		this.offs 	= [];

		// this.openers0 = this.opener0();
		// this.high 	= Number.POSITIVE_INFINITY;
		// this.low  	= Math.max.apply(null, this.ons.map( b => b.lv ));

		/**
		 * @property minVol
		 * @type number
		 */
 		this.minVol = this.all.map( b => b.closedVolume ).reduce( (a, v) => a+v, 0);

		/**
		 * @property minOpenningPressure
		 * @type number
		 */
		this.minOpenningPressure = Math.min.apply( null, this.all.map( b => b.thresholds.phigh ) );
		
		let minOpeners = this.all.filter( b=>b.thresholds.phigh == this.minOpenningPressure );
		if (minOpeners.length > 1) {
			throw new Error('more than 1 minimum opening pressure \n...should probably deal with this')
		}
		this.firstOpener = minOpeners[0];

		this.minClosingPressure = Math.min.apply( null, this.all.map( b => b.thresholds.plow ) );
		let minClosers = this.all.filter( b=>b.thresholds.plow == this.minClosingPressure );

		// console.log(minClosers);
		// console.log(minClosers.length);
		// if (minClosers.length > 1) {
		// 	throw new Error('more than 1 minimum closing pressure \n...naturally this will happen for lattice')
		// }
		// this.firstOpener = minOpeners[0];
		// this.lastCloser  = switchers;
	}

	get high() { 
		if (this.offs.length > 0) {
			return Math.min.apply(null, this.offs.map(b => b.thresholds.high)); 
		}
		return Number.POSITIVE_INFINITY; 
	}
 	get low() { 
 		if (this.ons.length > 0) {
 			return Math.max.apply(null, this.ons.map( b => b.thresholds.low )); 
 		}
 		return Number.NEGATIVE_INFINITY;
 	}

 	get thresholds() {
 		let lows = this.all.map(b=>b.thresholds.low);
 		let highs = this.all.map(b=>b.thresholds.high);
 		console.log(lows);
 		console.log(highs);
 		return 0;
 	}

 	update(x) {
 		this.ons.forEach( b => b.update(x, this.weightOpen, this.volTrapped) );	
 	}

	switchWeight(switchers) {
		return switchers.map( b => b.weight ).reduce( (a, w) => a+w, 0);
	}

	switchVol(switchers) {
		return switchers.map( b => b.closedVolume).reduce( (a, v) => a+v, 0);
	}

	updateMax(hardMax) {
		this.all.map(b=>b.update(hardMax));
		this.weightOpen = 1;
		this.volTrapped = 0;
		this.all.map(b=>b.updateThresholds(1, 0));
		this.ons 	= this.all.filter( () => true );
		this.offs = [];
		// this.model.bistats.all.map(b=>b.update(this.hardMax));
		// this.model.bistats.all.map(b=>b.updateThresholds(1, 0));
	}

	/**
	 *
	 */
	open0() {
		// console.log('BiVols.open0');
 		let t = Math.min.apply( null, this.all.map( b => b.thresholds.high ) );

 		let switchers = [];
		// console.log("min Opening pressure = ", this.minOpenningPressure);

		this.offs = this.offs.filter( (el, i, arr) => {
			// if( el.thresholds()[1] > this.minOpenningPressure ) {
			if( el.thresholds.phigh != this.minOpenningPressure ) {
				return true;
			}
			// console.log("el = ", el);

			el.update(t, this.weightOpen, this.volTrapped);
			// el.state(true);

			switchers.push(el);
			this.ons.push(arr[i]);

			return false;		
		});
		if (this.ons.length != 1 ) {
			console.log('#ons after open first = ', this.ons.length);
		}

		if (switchers.length != 1 ) {
			console.log(switchers.length, "opened");
		}


		this.weightOpen += this.switchWeight(switchers);
		this.volTrapped -= this.switchVol(switchers);

		this.updateThresholds(this.weightOpen, this.volTrapped);
		// this.thresholds;

		// return switchers;
	}
	
	/**
	 *
	 */
	reclose0(t, switchers) {
		if (this.ons.length  != 1 ) { console.log('#ons after open first = ', this.ons.length); }
		if (switchers.length != 1 ) { console.log('#switchers at open firsrt = ', switchers.length); }

		for (let i = 0; i < switchers.length; i++) {
			// if ( x < switchers[i].thresholds.low ) {
			// 	console.log("x < switched.lv");
			// }
			if ( t < switchers[i].thresholds.low ) {
				console.log("t < switched.lv");
				// path = [...path, ...this.update(switchers[0].hv)];
				// this.update(switchers[0].hv);
			}
		}
	}

	/**
	 *
	 * @returns {} - NOTHING
	 */
	open(t) {
		// console.log('BiVols.open(t)');
		if (t != this.high ) {
			console.log('WTF!!!, t != this.high');
			console.table({'t': t, 'high': this.high, 't-high': t-this.high, 'len(ons)': this.ons.length});
			console.table( this.offs.map( b => b.thresholds.high ) );
		}
 		let switchers = [];

		this.offs = this.offs.filter((el, i, arr) => {
			if( el.thresholds.high > this.high ) {
				return true;
			}
			el.update(t, this.weightOpen, this.volTrapped);
			switchers.push(el);
			this.ons.push(arr[i]);
			return false;
		});
		
		this.weightOpen += this.switchWeight(switchers);
		this.volTrapped -= this.switchVol(switchers);

 		this.updateThresholds(this.weightOpen, this.volTrapped);

		// this.all.forEach( b => b.update(t+1E-10, this.weightOpen, this.volTrapped) );
		// switchers.forEach( b => b.state(true) );

		if ( t < this.low ) {
			this.reclose(t);
		}
 	}

	/**
	 *
	 */
	reclose(t) {
		// WARN_1(`= RELAXATION or DISTRESS =`);
		console.log(`%c = RELAXATION or DISTRESS =`, 
					`background-color: #CCCC44; color: #444444; font-weight: bold; font-size: 1.2rem;`);		
		this.close(this.low);

		// throw new Error('gdfg');

		let i = 1;
		while ( t < this.low ) {
			// WARN_2(`= Volume increased but OPEN part now CLOSED =\ncount = ${i++}`);
			console.log(`%c = Volume increased but OPEN part now CLOSED =\ncount = ${i++}`,
						`background-color: #CC2222; color: #111111; font-weight: bold; font-size: 1.2rem;`);
			// this.close(t);
			this.close(this.low);
		}
	}

	// crossLowestClosing() {	this.low  	= Math.max.apply(null, this.ons.map( b => b.lv ));	}

	/**
	 * @param {double} t - threshold
	 */
 	close(t) { 
		// console.table( this.ons.map( b => b.thresholds ) );
		if (t != this.low ) { 
			console.table( {'t':t, 'low':this.low, 't-low': t-this.low} );
			throw new Error(
				'BiVols.close(t)\n' +
				'=== t != this.low!!! ===\n' +
				'weight open = ' + this.weightOpen + '\nvol trapped = ' + this.volTrapped
			);
		}
		if( this.low == Number.NEGATIVE_INFINITY) {
			throw new Error('low');
		}
		if( t == Number.NEGATIVE_INFINITY) {
			throw new Error('t');
		}

 		let switchers = [];

		this.ons = this.ons.filter( (el, i, arr) => {
			// if( Math.abs(el.lv - this.low) > 1E-10 ) {
			if( el.thresholds.low != this.low ) {
				return true;
			}
			switchers.push(el);
			return false;
		});

		this.weightOpen -= this.switchWeight(switchers);
		this.volTrapped += this.switchVol(switchers);

		switchers.forEach( s => {
			s.update(t, this.weightOpen, this.volTrapped);
			this.offs.push(s);
		});

		// console.table(this.ons.map(b=>b.thresholds.low));
		// console.table({'lows': this.ons.map(b=>b.thresholds.low), 'highs': this.ons.map(b=>b.thresholds.high) });
		this.updateThresholds(this.weightOpen, this.volTrapped);
		// console.table({'lows': this.ons.map(b=>b.thresholds.low), 'highs': this.ons.map(b=>b.thresholds.high) });
		// console.table( this.ons.map(b=>b.thresholds.low) );

		// console.log(this.weightOpen, this.volTrapped);
		// let hvs = new Set( switchers.map( b => b.hv ) );

		// this.all.map( b => b.update(t, this.weightOpen, this.volTrapped) );
	}

	/**
	 * @param {double} weightOpen - proportion open
	 * @param {double} volTrapped - volume trapped
	 * @returns {} - bistats: list of bistats
	 */
	// IMPORTANT
		// to raise issue of what happens when a load of air is forced in at high pressure
		// the issue is that all elements have the same opening volume threshold - in the case where everything is closed
	updateThresholds(weightOpen, volTrapped) {
		// console.log(volTrapped);
		// this.all.forEach( b => b.updateThresholds(weightOpen, volTrapped) );
		this.all.forEach( b => b.updateThresholds(weightOpen, volTrapped) );

 		// this.high = Math.min.apply(null, this.offs.map(b => b.hv)); 		
 		// this.low  = Math.max.apply(null , this.ons.map( b => b.lv ));	 	

		// this.inputPrecision( this.getPrecision() );
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BiVols);

/***/ }),

/***/ "../preisachjs/src/MultiVolume/BiVolume.js":
/*!*************************************************!*\
  !*** ../preisachjs/src/MultiVolume/BiVolume.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BiFunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BiFunc.js */ "../preisachjs/src/BiFunc.js");
/* harmony import */ var _Thresholds_BiVol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Thresholds_BiVol.js */ "../preisachjs/src/MultiVolume/Thresholds_BiVol.js");
/**
 * @file BiVolume.js 
 * @author m
 * @date 2022
 * @version 0.0.1
 */
/*
 *
 */


/*
 *
 */
class BiVolume extends _BiFunc_js__WEBPACK_IMPORTED_MODULE_0__["default"] /*BiStatio*/ {
	/*
	 *
	 */
	constructor(args) {
		super(args);

		/**
		 * @property output
		 * @type number
		 * need this for the size of the hysterons on the Preisach plane
		 */
		this.output;

		// this.fInv = (x) => this.curry(args.fInv, x);
		// console.log(args);
		// console.log(args.fInv);

		this.thresholds = new _Thresholds_BiVol_js__WEBPACK_IMPORTED_MODULE_1__["default"](args.thresholds, args.fInv);

		this.closedPressure = this.thresholds.plow;
		this.closedVolume   = this.weight * args.fInv( this.thresholds.plow );
		// this.closedVolume   = args.fInv( this.thresholds.plow );

		// console.log('BiVolume(): weight = ', this.weight);
		// console.log('BiVolume(): fInv = ', args.fInv( this.thresholds.plow ));
		// console.log('BiVolume(): closedVolume = ', this.closedVolume);
	}

	update(x) {
		this.output = super.update(x);
		// this.input = x;
		return this.output;
	}
	
	/*
	 *
	 */
	// updateThresholds(transform) {
	updateThresholds(scale, offset) {
		this.thresholds.update(scale, offset);
		// this.thresholds.update(transform, this.outputThresholds);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BiVolume);

/***/ }),

/***/ "../preisachjs/src/MultiVolume/MultiVolume.js":
/*!****************************************************!*\
  !*** ../preisachjs/src/MultiVolume/MultiVolume.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MultiStat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MultiStat.js */ "../preisachjs/src/MultiStat.js");
/* harmony import */ var _BiVols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BiVols.js */ "../preisachjs/src/MultiVolume/BiVols.js");
/**
 * @file 
 * @name MultiVolume.js
 * @author m
 * @date 2022
 * @version 0.0.1 million ...do you only increment versions if you release them?
 */
 
 /**
  * 
  */
 
 
 // import getPairs 	from '../Thresholds_MultiStat.js';
 // import getWeights 	from '../weights.js';
 // import {default as SolSet} from '../SolSet/SolSet.js';
 
 /**
  * 
 */
class MultiVolume extends _MultiStat_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	/**
	 *
	 */
	constructor(cfg, thresholds=null, weights=null) {
		/**
		 *
		 */
		super(cfg, thresholds, weights);

		/**
		 * @property weightOpen
		 * @type number
		 */
		this.weightOpen = 1; //cfg.weightOpen;
		
		/**
		 * @property volTrapped
		 * @type number
		 */
		this.volTrapped = 0; //cfg.volTrapped;

		/**
		 * @property bistats - collection of BiVols
		 * @type BiVols
		 */		
		this.bistats = new _BiVols_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.thresholds.pairs, this.weights.weights, cfg.fOn, cfg.fOff, cfg.fInv);

		/**
		 * @property hardMax
		 * @type number
		 */
		this.hardMax = cfg.fInv( cfg.output.max );

		/**
		 * @property input
		 * @type number
		 */
		this.input = this.hardMax;
		// BOGUS
		// this.input 	= this.xHistory()[0];

		/**
		 * @property hardMin
		 * @type number
		 */
		this.hardMin = this.initHardMin();

		this.setPrecision();

		/**
		 * @property cycle
		 * @type [[pieces]]
		 */
		this.cycle = super.getCycle();


		/**
		 * @property solSet
		 * @type am... same as it is for MultiPressure
		 */
		// this.solSet = SolSet( {'input': 'volume', 'pairsStyle': cfg.thresholds.pairs, 'model': this} );
		this.solSet = null;


		this.bistats.updateMax(this.hardMax);
		this.input = this.hardMax;
		this.setPrecision();
	}

	/**
	 * @param {float} x - new input
	 * 
	 * @returns {array of array of vectors} 
	 * 	path = [pieces]
	 * 	piece = [[ins], [outs]]
	 */
	update(x) {
		/**
		 *
		 */
		let gamma = (x) => {
			// NOTICE
			// we could take a shortcut
				// technnically we should add all the contributions from the bivols
				// ...as done in ../arch/mvol.js in the function moveTo_Bizzare_and_unnecessary
				// weightOpen and volTrapped don't change (between switches)
			// We don't take shortcut
				// we do update bivols because we need the output value for the opacity on the charts
				// the graphics are not updating the intermediate values if the hysterons on the II or OO charts
				// everything else works fine afaik,
			
			this.bistats.update(x);	
			
			return this.fOn( ( x - this.bistats.volTrapped ) / this.bistats.weightOpen );
		}

		/**
		 *
		 */
		let piece = (start, stop, step) => {
			// console.log('start', start);
			// console.log('stop', stop);
			// console.log('step', step);

			let ins 	= [start],
				outs 	= [gamma(start)],

				x 		= start + step;

			while ( anotherStep(x, stop) ) {
				ins.push(x);
				outs.push(gamma(x));
				x += step;
			}

			ins.push(stop);
			outs.push(gamma(stop));

			return [ins, outs];
		}

		/**
		 *
		 */
		let open0 = () => {	
			console.log('MV.open0');
	 		let t 	 = Math.min.apply( null, this.bistats.all.map( b => b.thresholds.high ) );

			if ( x < t ) {
				console.table({x:x, t:t, hardMin:this.hardMin});
				console.table(this.bistats.all.map( b => b.thresholds.high ));
				throw new Error('MV.open0, x < t');
			}

 			this.bistats.open0();
			this.setPrecision();			

			if ( x < this.low  ) {
				throw new Error('x < this.low');
			}

			// you'd think this would happen every instance, but it doesn't
			if ( t < this.low ) {				
				if ( this.high < this.low ) {
					throw new Error('this.high < this.low');
				}
				if ( t > this.high ) {
					throw new Error('t > this.high');
				}
				t = this.low;
			}

			this.input 	= t;
			// t = threshold();

			path = [ [ [t, t], [0, this.bistats.minOpenningPressure] ] ];
			start = this.input;
			t = this.high; // = threshold();

			return [path, start, t];
		}

		/**
		 *
		 */
		let close0 = () => {
			// let anotherPiece = (x) => x <= this.low;
			// let a = (x, stop) => x < stop;

			let p = (start, stop, step) => {
				let ins 	= [start],
					outs 	= [gamma(start)],
					x 		= start + step;

				// console.log('close0() --> p --> while');
				while ( x > stop ) {
					// console.table({'x': x, 'stop': stop, 'step': step});

					ins.push(x);
					outs.push(gamma(x));
					x += step;
				}

				ins.push(stop);
				outs.push(gamma(stop));

				return [ins, outs];
			}

			// ...moveTo(this.hardMin);
			let start 	= this.input,
				t 		= this.low,			
				path 	= [];

			// console.log('close0() --> threshold_low = ', t);
			// throw new Error();

			// while(true)
			while( start > this.hardMin ){
				// this.setPrecision();
				// console.log('close0() --> while');
				path.push( p( start, t + this.eps, -this.precision ) );
				
				// crossThreshold(t);
				this.bistats.close(t); 
				this.setPrecision();
				// this.precision;

				start = t;
				if ( this.low == Number.NEGATIVE_INFINITY ) 
					break;
				t = this.low;
			}
			console.log('MultiVolume.close0: --> while finished');

			// if ( start != x ) {
			// 	path.push( piece(start, x, step()) );
			// }

			this.input = this.hardMin;
			// piece = [ [this.hardMin, 0], [this.hardMin, 0] ];
			// path.push(piece);
			// path.push([ [this.hardMin, 0], [this.hardMin, 0] ]);
			path.push([ [this.hardMin, this.hardMin], [0, 0] ]);
			console.log('MultiVolume.close0: finished');
			return path;
		}

		if ( this.input >= this.hardMax && x >= this.hardMax ) {
			this.input = this.hardMax;
			return;
		}

		if ( this.input <= this.hardMin && x <= this.hardMin ) {
			this.input = this.hardMin;
			return;
		}
		
		if ( x <= this.hardMin ) {
			console.log('hard Min = ', this.hardMin);
			return close0();
		}

		let [ 	direction,
				eps,
				step,
				threshold,
				anotherPiece,
				anotherStep,
				crossThreshold ] = Object.values( (x < this.input) ? this.decreasing : this.increasing );
				// Object.values(this.getDirection(x));

		let path 	= [],
			start 	= this.input,
			t 		= threshold();
			// x 	= this.x(x);

		if ( this.bistats.ons.length == 0 && x >= this.hardMin && direction == 1 ) {
			[path, start, t] = open0();
 		}

		while( anotherPiece( x ) ){
			path.push( piece(start, t - eps, step() ) );
			crossThreshold(t);
			this.setPrecision();
			start = t;
			t = threshold();
		}
		if ( start != x ) {
			path.push( piece(start, x, step()) );
		}

		this.input = x;
		// this.output = this.gamma( this.input );
		console.log('MultiVolume.update: finished');
		return path;
	}

	/**
	 *
	 */
	initHardMin() {
		// BOGUS 
			// check again if these are different
			// this.hardMin	= this.bistats.minVol;
		
		// console.log('init HMIN');
		// console.table(this.bistats.all.map(b=>b.thresholds.low));

		// this.update(this.hardMax);
		this.bistats.all.map(b=>b.update(this.hardMax));
		

		this.bistats.weightOpen = 1;
		this.bistats.volTrapped = 0;
		this.bistats.updateThresholds(this.weightOpen, this.volTrapped);


		let t;
		while( this.bistats.ons.length > 0) { 

	 		// t = Math.max.apply( null, this.bistats.ons.map( b => b.thresholds.low ) );
			t = this.low; // threshold - low vol

			// console.log('t = ', t);
			// console.log('t = ', this.low);

			this.bistats.close(t);
			// console.log('closed: ', t);
			// console.log(this.bistats.ons);
			// console.table(this.bistats.ons.map(b=>b.thresholds.low));
		}
		// throw new Error('MV.initHardMin 1');

		// this.input = this.hardMax-1E-8;
		
		this.bistats.updateMax(this.hardMax);
		this.update(this.hardMax);


		// console.table( this.bistats.ons.map( b => b.state ) );
		console.log('HMIN = ', t);
		// throw new Error('MV.initHardMin');
		return t;
	}

	get low()  { return this.bistats.low; }
	get high() { return this.bistats.high;}

		
	get increasing() {
		return {
			direction		: 1,
			eps 			: this.eps,
			// step 			: () 		=> { return this.precision; },
			step 			: () 		=> this.getPrecision(),
			threshold 		: ()		=> this.high,
			anotherPiece 	: (x) 		=> x >= this.high,
			anotherStep 	: (x, stop) => x < stop,
			// crossThreshold 	: t 		=> { this.bistats.open(t); this.precision; }
			// crossThreshold 	: t 		=> { this.bistats.open(t); this.setPrecision(); }
			crossThreshold 	: t 		=> this.bistats.open(t)
		};
	}
	get decreasing() {
		return {
			// x 			=> Math.min(x, this.hardMax),
			direction		: -1,
			eps 			: -this.eps,
			// step 			: () 		=> { return -this.precision; },
			step 			: () 		=> -this.getPrecision(),
			threshold 		: ()		=> this.low,
			anotherPiece 	: (x) 		=> x <= this.low,
			anotherStep 	: (x, stop) => x > stop,
			// 	anotherPiece 	= 	(x) 		=> (x <= this.low && this.low > Number.NEGATIVE_INFINITY),
			// crossThreshold 	: t 		=> { this.bistats.close(t); this.precision; }
			// crossThreshold 	: t 		=> { this.bistats.close(t); this.setPrecision(); }
			crossThreshold 	: t 		=> this.bistats.close(t)
		};
	}

	/**
	 *
	 */
	// get cycle() {
		// // console.log("get cycle");
		// // console.log(this.hardMin, this.hardMax);
		// this.update(this.hardMax);
		// let pieces = this.update(this.hardMin);
		// pieces = pieces.concat( this.update(this.hardMax) );
		// return pieces;
		// }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultiVolume);


/***/ }),

/***/ "../preisachjs/src/MultiVolume/Thresholds_BiVol.js":
/*!*********************************************************!*\
  !*** ../preisachjs/src/MultiVolume/Thresholds_BiVol.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Thresholds_BiStat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Thresholds_BiStat.js */ "../preisachjs/src/Thresholds_BiStat.js");
/**
 * @file Thresholds_BiVol.js 
 * @version 0.0.1
 * @author m
 * @date 2022
 */

/**
 * 
 * @class 
 * @classdesc
 *
 */
class Thresholds_BiVol extends _Thresholds_BiStat_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	/**
	 * create a 
	 * @constructor 
	 * @param {}
	 */
	constructor(vals, fInv) {
		super(vals);

		/**
		 * plow - plow threshold
		 * @property plow
		 * @type number
		 */
		this.plow  = this.low; // vals[0];

		/**
		 * phigh - phigh threshold
		 * @property phigh
		 * @type number
		 */
		this.phigh = this.high; // vals[1]

		/**
		 * plow - plow threshold
		 * @property plow
		 * @type number
		 */
		this.fInv = fInv;

		this.update(1, 0);
	}
	
	/**
	 * low and high are the thresholds in terms of system input volume - they have to be updated
	 * @method update
	 * @param {double} systemScale -
	 * @param {double} systemOffset -
	 */
	update(systemScale, systemOffset) {
		this.low  = systemOffset + systemScale * this.fInv( this.plow );
		this.high = systemOffset + systemScale * this.fInv( this.phigh );
		// console.table({plow: this.plow, phigh: this.phigh, scale: systemScale, offset: systemOffset});
		// console.log(this.plow, this.phigh);
		// console.log(this.low, this.high);
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Thresholds_BiVol);


/***/ }),

/***/ "../preisachjs/src/SolSet/SolSet.js":
/*!******************************************!*\
  !*** ../preisachjs/src/SolSet/SolSet.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SolSet_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SolSet_Constant_Lattice.js */ "../preisachjs/src/SolSet/SolSet_Constant_Lattice.js");
/* harmony import */ var _SolSet_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SolSet_Constant_Continuous.js */ "../preisachjs/src/SolSet/SolSet_Constant_Continuous.js");
/* harmony import */ var _SolSet_Volume_Continuous_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SolSet_Volume_Continuous.js */ "../preisachjs/src/SolSet/SolSet_Volume_Continuous.js");
/**
 * @file SolSet.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */


// import {default as SolSet_Volume_Lattice} from './SolSet_Volume_Lattice.js';


// class SolSet {
	// constructor(args) {}
	// get statio() { return 0; }
	// }

/**
 * @params args
 * @param {MultiStat} model - 
 * @param {str} thresholds - constant/variable
 * @param {str} pairsStyle - thresholds.cfg.pairs, // lattice/continuous
 */
function SolSet(args) {
	// console.log(args);

	// this.model = args.model;
	let solSet;

	console.log('SolSet() -> args = ', args);

	if (args.input == 'pressure') {
		console.log('SolSet() -> pressure');
		console.log('SolSet() -> pressure -> args.pairsStyle = ', args.pairsStyle);
		if ( args.pairsStyle === 'lattice') {
			console.log('SolSet() -> pressure -> lattice');
			solSet = new _SolSet_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"](args.model);
		} else {
			console.log('SolSet() -> pressure -> CONTINUOUS');
			solSet = new _SolSet_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_1__["default"](args.model);
		}
	} else {
		console.log('SolSet() -> VOLUME');
		solSet = new _SolSet_Volume_Continuous_js__WEBPACK_IMPORTED_MODULE_2__["default"](args.model);
		// if ( args.pairsStyle == 'lattice') {
		// 	solSet = new SolSet_Volume_Lattice(args.model);
		// } else {
		// 	throw new Error();
		// 	// solSet = new SolSet_Volume_Continuous(args.model);
		// }
	}
	return solSet;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SolSet);

/***/ }),

/***/ "../preisachjs/src/SolSet/SolSet_Constant_Continuous.js":
/*!**************************************************************!*\
  !*** ../preisachjs/src/SolSet/SolSet_Constant_Continuous.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Statio/Statio_Constant_Continuous.js */ "../preisachjs/src/Statio/Statio_Constant_Continuous.js");
/**
 * @file SolSet_Constant_Continuous.js
 * @author m
 * @date 2022-05
 * @version 0.0.1
 */

/**
 *
 */


/**
 *
 */
class SolSet_Constant_Continuous {
	/**
	 * 
	 */
	constructor(m) {
		this.creationCancelled = false;
		// let min 	= Math.min.apply(null, m.thresholds.pairs.map( p => p[0]) );
		// let max 	= Math.max.apply(null, m.thresholds.pairs.map( p => p[0]) );

		/**
		 * start at global min
		 */
		m.update( m.globalMin ); 

		// get the path from global min to min high threshold
		// let allOff = m.update( m.high - 1E-10 );


		// this.statios = this.getStatios( [], m, m.bistats.all, m.globalMin, m.globalMax );
		// this.statios = 					 new Promise( this.getStatios( [], m, m.bistats.all, m.globalMin, m.globalMax ) );
		// this.statios = async () => await new Promise( this.getStatios( [], m, m.bistats.all, m.globalMin, m.globalMax ) );

		// maybe it is just the very first one that is missing
		// if I put this in 1 of the statios is created twice
		// put the all closed in prior to call to get Statios
		// statios.push( new Statio(m) );
		
		/**
		 * @property statios
		 * @type {!Array<Statio>}
		 */
		this.statios = async () => await this.getStatios( [new _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__["default"](m)], m, m.bistats.all, m.globalMin, m.globalMax );

		// this.isResolved = false;
			// p = new Promise();
			// p.then(function() {
			// 	isResolved = true;
			// });
			
			// this.paths = null;
	}

	get paths() {
		return this.statios.map( s => s.path );
	}

	/**
	 * 
	 */
	getStatios( statios, m, subBistats, min, max ) { 
		// console.table( {'min': min, 'max': max, 'high': m.high} );
		/*
		 * BOGUS
		 * 	want to make it cancelable here
		 */
		if ( this.creationCancelled != false ) {
			this.statios = null;
			return;
		}

		let b, l, h,
			subSubs,
			i = 1;
		let len = () => subBistats.length;

		/*
		 * start at low threshold
		 */	
		m.update( min + 1E-10 );

		/*
		 * b.thresholds.low -> lowest high threshold
		 */
		while ( len() > 0 ) {
			/*
			 * get the 'off' element with the lowest low threshold
			 */
			b = this.getLowestSub(subBistats);

			if ( b.length > 1 ) {
				throw new Error( 
					'getLowestSub(subs).length > 1 ) ' +
					+ 'this will happen with lattice ' +
					+ '...could also happen with continuous'
				);
			} else { 
				b = b[0]; 
			}

			l = b.thresholds.low;
			h = b.thresholds.high;
			// console.table({'l': l, 'h': h});

			subSubs = this.getSubs(subBistats, l, h);

			if ( subSubs.length > 0 ) {
				statios = this.getStatios( statios, m, subSubs, l, h );
			}

			/*
			 * turn on blowestLow
			 */
			m.update(h);
			// console.log('updated high: ', h);

			/*
			 * start at low threshold of blowestLow
			 */
			m.update(l + 1E-10);
			// console.log('updated low: ', l);
			
			/*
			 * 
			 */
			statios.push( new _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__["default"](m) );

			/*
			 * remove bLowestLow from subBistats
			 */
			subBistats = subBistats.filter( b => ( b.thresholds.low > l ) );
			// console.log('subBistats: ', subBistats);
		}
			// b = this.getLowestSub(subBistats)[0];

			// l = b.thresholds.low;
			// m.update(l + 1E-10);
		// console.table(statios.map(st=>[st.min, st.max]));

		return statios;
	}
	
 	// getLowestHigh(bistats) { return Math.min.apply(null, bistats.map( b => b.thresholds.High )); }
 	getLowestLow( bistats ) { 
 		return Math.min.apply(null, bistats.map( b => b.thresholds.low )); 
 	}

	getLowestSub( bistats ) { 
		let ll = this.getLowestLow(bistats); 
		return bistats.filter( b => b.thresholds.low == ll ); 
	}

 	getSubs(bistats, l, h) { 
 		return bistats.filter( b => ( b.thresholds.low > l && b.thresholds.high < h ) ); 
 	}

	/**
	 * 
	 */
	// doSubs(m, statios, subs) {
		/**
		 * 	
		 */
		// let b, l, h,
		// 	subSubs,
		// 	min = 0,
		// 	max = 0,
		// 	bis = m.bistats,
		// 	i = 1;

		// // b = bis.getLowestSub(subs);
		// while (subs.length > 0) {
		// 	console.log('doSubs: ', i++);

		// 	/**
		// 	 * get the 'off' element with the lowest low threshold
		// 	 */
		// 	b = bis.getLowestSub(subs);


		// 	if (b.length > 1 ) {
		// 		throw new Error('doSubs -- bis.getLowestSub(subs).length > 1 ) '+
		// 			+ 'this will happen with lattice ...could also happen with continuous');
		// 	} else { b = b[0]; }

		// 	l = b.thresholds.low;
		// 	h = b.thresholds.high;

		// 	subSubs = bis.getSubs(l, h);

		// 	if (subSubs.length > 0)	{
		// 		statios = this.doSubs(m, statios, subSubs);
		// 	}

		// 	/**
		// 	 * turn on blowestLow
		// 	 */
		// 	m.update(h);

		// 	/**
		// 	 * start at low threshold of blowestLow
		// 	 */
		// 	m.update(l + 1E-10);
			
		// 	max = bis.getLowestHigh(subSubs);

		// 	/**
		// 	 * b.thresholds.low -> lowest high threshold
		// 	 */
		// 	// let s = m.update( m.high - 1E-10 )[0];
		// 	// statios.push(s);

		// 	statios.push( new Statio(m) );

		// 	subs = subs.filter(b=>(b.thresholds.low > min));
		// }

		// return statios;
		// }

	/**
	 * biPressures - not biVolumes
	 */
	// getStatios_old(m) {	
		// let bis = m.bistats;
		// let b, l, h, s, subs, min, max;

		// let statios = [];

		// /**
		//  * turn off all 
		//  */
		// m.update( m.globalMin );

		// /**
		//  * input min -> lowest high threshold
		//  */
		// s = m.update(m.high - 1E-10)[0]; // there is only one element anyway
		// statios.push(s);

		// let i = 1;
		// while ( bis.offs.length > 0) {
		// 	console.log('getStatios: ', i++);

		// 	/**
		// 	 * get the 'off' element with the lowest low threshold
		// 	 */
		// 	b = bis.bLowestLow; // bOffsLowestHigh;

		// 	if ( b.length > 1 ) {
		// 		throw new Error('getStatios: bis.bLowestLow > 1 ' +
		// 			'-- this WILL happen with lattice ...COULD also happen with continuous');
		// 	} else { b = b[0]; }

		// 	l = b.thresholds.low;
		// 	h = b.thresholds.high;

		// 	/**
		// 	 * do subs first ... once the blowestLow is turned on it is never turned off again
		// 	 * get array of hysterons higher low threshold & lower high threshold
		// 	 */
		// 	subs = bis.getSubs(l, h);
		// 	if (subs.length > 0) {
		// 		statios = this.doSubs(m, statios, subs);
		// 	}

		// 	/*
		// 	 * turn on blowestLow
		// 	 */
		// 	m.update(h);

		// 	/**
		// 	 * start at low threshold of blowestLow
		// 	 */
		// 	m.update(l + 1E-10);

		// 	/**
		// 	 * b.thresholds.low -> lowest high threshold
		// 	 */
		// 	s = m.update( m.high - 1E-10 )[0];
		// 	statios.push(s);

		// 	/**
		// 	 * do subs again 
		// 	 */
		// 	// if ( h == m.high ) {}

		// }
		// return statios;
		// // this.statios = statios;
		// }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SolSet_Constant_Continuous);


/***/ }),

/***/ "../preisachjs/src/SolSet/SolSet_Constant_Lattice.js":
/*!***********************************************************!*\
  !*** ../preisachjs/src/SolSet/SolSet_Constant_Lattice.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Statio/Statio_Constant_Lattice.js */ "../preisachjs/src/Statio/Statio_Constant_Lattice.js");
/**
 * @file SolSet_Constant_Lattice.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */


/**
 *  
 */
class SolSet_Constant_Lattice {
	/**
	 * 
	 */
	constructor(m) {
		// console.log(m.thresholds.cfg.lattice.size);
		this.model = m;

		m.update(m.hardMax); 

		let t 		= m.thresholds;
		let min 	= Math.min.apply(null, t.pairs.map( p => p[0]) );
		// let max 	= Math.max.apply(null, t.pairs.map( p => p[1]) );
		let max 	= Math.max.apply(null, t.pairs.map( p => p[0]) );
		
		let size 	= t.cfg.lattice.size;

		_Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"].min 			= min;
		_Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"].max 			= max;
		_Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"].diag 		= m.thresholds.cfg.support.diag;	
		_Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"].grainSize 	= (max-min)/(size-1);
		_Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"].hardMin 		= m.hardMin;
		_Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"].hardMax 		= m.hardMax;

		this.corners = [];

		this.statios = [];
		// this.statios = this.recurser(size, this.corners, size, this.statios);
		this.statios = async () => await this.recurser(size, this.corners, size, []);

		// this.paths = this.solSet.statios.map( s => s.getPath(this) );
	}

	get paths() {
		return this.statios.map( s => s.getPath(this.model) );	
	}

	/**
	 * @method recurser
	 * 
	 * @param sizeMax - 
	 * @param corners - 
	 * @param size - 
	 * @param statios - 
	 * 
	 * @return statios - a list of statios 
	 *
	 */
	recurser(sizeMax, corners, size, statios) {
		/**
		 * recurser:
		 * 		required to create every internal state (combination of elementary states)
		 * 		maybe easiest to explain if I upload the animated gif and python script
		 */
		let mi, ma;
		if(size > 1) { 
			this.recurser(sizeMax, corners, size-1, statios);
			
			let tmp = corners.slice();
			tmp.push(size);
			this.recurser(sizeMax, tmp, size-1, statios);
		} else {
			statios.push( new _Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"](sizeMax, corners) ); //, this.min, this.max, this.diag, this.grainSize, this.step) );
			
			let tmp = corners.slice();
			tmp.push(size);
			statios.push( new _Statio_Statio_Constant_Lattice_js__WEBPACK_IMPORTED_MODULE_0__["default"](sizeMax, tmp) ); //, this.min, this.max, this.diag, this.grainSize, this.step) );
		}
		// console.log(statios);
		return statios;
	}

	/**
	 *
	 */
	// initStatios(cfg, m) {
		// // m.update(cfg.input.interval[1]); 
		// let size = m.thresholds().size;
		// return this.recurser(size, corners, size, []);
		// }

	/**
	 * 
	 */
	// getStatio(m, s) {
		// let mi, ma;
		// [mi, ma] = getInterval(s.size, s.corners, s.min, s.max, s.grainSize);

		// let input = mi + 1E-10;
		// forceState(m, input, s.states2D);
		// m.update(mi + 1E-10);
		// return m.update(ma)[0];
		// }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SolSet_Constant_Lattice);

/***/ }),

/***/ "../preisachjs/src/SolSet/SolSet_Volume_Continuous.js":
/*!************************************************************!*\
  !*** ../preisachjs/src/SolSet/SolSet_Volume_Continuous.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Statio/Statio_Constant_Continuous.js */ "../preisachjs/src/Statio/Statio_Constant_Continuous.js");
/**
 * @file SolSet_Volume_Continuous.js
 * @author m
 * @date 2022-05
 * @version 0.0.1
 */

/**
 *
 */


/**
 *
 */
class SolSet_Volume_Continuous {
	/**
	 * 
	 */

	/**
 	 * @param {MultiVolume} m - model - 
	 */
	constructor(m) {
		this.creationCancelled = false;
		// let min = Math.min.apply(null, m.thresholds.pairs.map( p => p[0]) );
		// let max = Math.max.apply(null, m.thresholds.pairs.map( p => p[0]) );

		/**
		 * might easily happen that 'LowestOff' is also 'HighestOn'
		 * ...meaning that all statio's are done here
		 * ...meaning this might take a long time
		 * ...so we should make this a Promise
		 * ...and put the following Promise inside this Promise
		 * ...also ensure that m is not mutated by anything else
		 */
		let statiosLL = this.getStatios_subLowestOff(m);

		let tl_low = Math.max.apply( null, statiosLL.map(s => s.min) );
		
		// *************************************************
		let bistats_sup = m.bistats.all.filter( b => {
			if (b.thresholds.high > tl_low  ) {
				return true;
			} else {
				return false;
			}
		});


		// let myMin = Math.max.apply( null, statiosLL.map(s => s.min) );

		/**
		 * @property statios
		 * @type {!Array<Statio>}
		 */
		// this.statios = async () => await this.getStatios( [], m, m.bistats.all, m.globalMin, m.globalMax );
		// this.statios = async () => await this.getStatios( [], m, m.bistats.all, m.hardMin, m.hardMax );
		// this.statios = async () => await this.getStatios( [...statiosLL], m, m.bistats.all, m.hardMin, m.hardMax );
		this.statios = async () => await this.getSubStatios( [...statiosLL], m, bistats_sup, tl_low, m.hardMax );
				// statios = this.getSubStatios( statios, m, bistats_sub_bistat_LL_LH, l, h );

		// this.isResolved = false;
			// p = new Promise();
			// p.then(function() {
			// 	isResolved = true;
			// });
			
			// this.paths = null;
	}

	/**
	 * @param {MultiVolume} m
	 * 
	 * @returns {<!Array >} 
	 */
	/*
	 * Because we chose to 'always open' = 0 ...
	 * We have to treat every occurance of 1 and only 1 open as a special case
	 */
	getStatios_subLowestOff(m) {
		/*
		 * start at global min
		 */
		m.update( m.hardMin ); 
		
		/*
		 * get the statio from global min to min high threshold
		 */
		// let statio0 = new Statio(m);
		let statios = [ new _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__["default"](m) ];

		/*
		 * {bistat} - bistat_LL_LH
		 */
		let bistat_LL_LH = this.get_bistat_LL_LH(m.bistats.all);

		/*
		 * First identify every occurance of 1 and only 1 open
		 */
		let all_possible_single_ons = [bistat_LL_LH];

		/*
		 * {!Array<bistats>} - bistats_sub_B
		 */
		let bistats_sub_bistat_LL_LH = this.get_bistats_sub_bistat_LL_LH(m.bistats.all, bistat_LL_LH);
		
		let bb;
		let b1;
		// while( () => {return bistats_sub_bistat_LL_LH.length > 0; } ) {
		while( bistats_sub_bistat_LL_LH.length > 0 ) {
 			console.log(bistats_sub_bistat_LL_LH.length);
			bb = this.get_bistat_LL_LH( bistats_sub_bistat_LL_LH );
			all_possible_single_ons.push(bb);

			bistats_sub_bistat_LL_LH = this.get_bistats_sub_bistat_LL_LH(bistats_sub_bistat_LL_LH, bb);
		}

		console.log('all_possible_single_ons.length = ', all_possible_single_ons.length);
		// throw new Error('all_possible_single_ons = ', all_possible_single_ons);

		for ( b1 of all_possible_single_ons ) {			
			/*
			 * close all
			 */
			m.update(m.hardMin);

			/*
			 * should check that all are closed
			 */
			
			// /*
			//  *turn on b1
			//  */
			// b1.state = 1;

			// /*
			//  * set model.input to min of piece
			//  */
			// // m.input = b1.thresholds.low + 1E-5;

			// /*
			//  * update thresholds
			//  */
			// m.weightOpen = b1.weight;
			// m.volTrapped = b1.closedVolume;
			// m.bistats.updateThresholds(m.weightOpen, m.volTrapped);
			
			// /*
			//  * ensure model is at correct starting point
			//  */
			// m.input = b1.thresholds.low + 1E-5;
			// m.update( m.input );

			m.update(b1.thresholds.high);
			m.update(b1.thresholds.low + 1E-5);

			/*
			 * should be only b1 open
			 * should check
			 */
			console.log('getStatios_subLowestOff() -> b1.weight = ', b1.weight);
			console.log('getStatios_subLowestOff() -> this.weightOpen = ', m.weightOpen);

			console.log('getStatios_subLowestOff() -> b1.closedVolume = ', b1.closedVolume);
			console.log('getStatios_subLowestOff() -> this.volTrapped = ', m.volTrapped);

			console.log('getStatios_subLowestOff() -> b1.thresholds.low = ', b1.thresholds.low);
			console.log('getStatios_subLowestOff() -> b1.thresholds.high = ', b1.thresholds.high);

			console.log('getStatios_subLowestOff() -> m.bistats.low = ', m.bistats.low);
			console.log('getStatios_subLowestOff() -> m.bistats.high = ', m.bistats.high);

			// let tmp = m.update(b1.thresholds.high - 1E-5);
				// /*
				//  * statio0 should definitely be just one piece
				//  */			
				// if ( tmp.length != 1 ) {
				// 	console.log(tmp.length);
				// 	console.table(tmp[0]);
				// 	console.table(tmp[1]);
				// 	throw new Error('getStatios_subLowestOff() -> tmp.length > 1');
				// 	process.exit();
				// } else {
				// 	// statio0 = tmp[0];
					
				// 	console.log(tmp[0]);
				// 	throw new Error('this should be statio[1]')				

				// 	// statios.push( tmp[0] );
				// }
			
			statios.push( new _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__["default"](m) );
			console.log('getStatios_subLowestOff() -> this.weightOpen = ', m.weightOpen);

			/*
			 * get sub statios, ...if any
			 */
			bistats_sub_bistat_LL_LH = this.get_bistats_sub_bistat_LL_LH(bistats_sub_bistat_LL_LH, b1);			
			// subSubs = this.getSubs(subBistats, l, h);

			let l = b1.low;
			let h = b1.high;

			if ( bistats_sub_bistat_LL_LH.length > 0 ) {
				statios = this.getSubStatios( statios, m, bistats_sub_bistat_LL_LH, l, h );
			}
			/**/

			// turn off again
			// // update thresholds
			// go to prior bb
			/*
			 *turn off b1
			 */
			// b1.state = 0;
			// probably shouldn't need to update here, 
			// m.update(m.hardMin); is called inside the loop
		}
		return statios;
	}
	// first b1 should simply be bistat_lowest_on
		// 	...so do a check
		// if ( bb != m.bistats.all ) {
		// 	throw new Error('SolSet_Volume_Continuous\nshould get the single bistat with the lowest on threshold')
		// }

	/**
	 * 
	 */
	getSubStatios( statios, m, subBistats, min, max ) { 
		// console.table( {'min': min, 'max': max, 'high': m.high} );
		/*
		 * BOGUS
		 * 	want to make it cancelable here
		 */
		if ( this.creationCancelled != false ) {
			this.statios = null;
			return;
		}

		let b, l, h,
			subSubs,
			i = 1;
		let len = () => subBistats.length;

		/*
		 * start at low threshold
		 */	
		m.update( min + 1E-10 );
		// m.update( min );

		/*
		 * b.thresholds.low -> lowest high threshold
		 */
		// while ( len() > 0 ) {
		while ( subBistats.length > 0 ) {
			// throw new Error('HEY');
				/*
				 * get the 'off' element with the lowest low threshold
				 */
				
				// console.log(subBistats);
				// // b = this.getLowestSub(subBistats);

				// let threshold_lowest_low = this.get_threshold_lowest_low(subBistats);
				// b = this.get_bistats_lowest_low(subBistats, threshold_lowest_low);

				// console.log(b);
				// console.log(b.length);

				// if ( b.length > 1 ) {
				// 	throw new Error( 
				// 		'getSubStatios() get_bistats_lowest_low(subs).length > 1 ) ' +
				// 		+ 'this will happen with lattice ' +
				// 		+ '...could also happen with continuous'
				// 	);
				// } else { 
				// 	b = b[0]; 
				// }

			b = this.get_bistat_LL_LH(subBistats);
			// console.log('b = ', b);
			
			l = b.thresholds.low;
			h = b.thresholds.high;
			// console.table({'l': l, 'h': h});

			subSubs = this.getSubs(subBistats, l, h);

			if ( subSubs.length > 0 ) {
				statios = this.getStatios( statios, m, subSubs, l, h );
			}

			/*
			 * turn on blowestLow
			 */
			m.update(h);
			// console.log('updated high: ', h);

			/*
			 * start at low threshold of blowestLow
			 * thresholds will be updated in m.update
			 */
			m.update(l + 1E-10);
			// console.log('updated low: ', l);
			
			/*
			 * 
			 */
			statios.push( new _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__["default"](m) );

			/*
			 * remove bLowestLow from subBistats
			 */
			subBistats = subBistats.filter( b => ( b.thresholds.low > l ) );
			// console.log('subBistats: ', subBistats);
		}
			// b = this.getLowestSub(subBistats)[0];

			// l = b.thresholds.low;
			// m.update(l + 1E-10);
		// console.table(statios.map(st=>[st.min, st.max]));

		return statios;
	}
	

	/**
	 * 
	 */
	getStatios( statios, m, subBistats, min, max ) { 
		// console.table( {'min': min, 'max': max, 'high': m.high} );
		/*
		 * BOGUS
		 * 	want to make it cancelable here
		 */
		if ( this.creationCancelled != false ) {
			this.statios = null;
			return;
		}

		let b, l, h,
			subSubs,
			i = 1;
		let len = () => subBistats.length;

		/*
		 * start at low threshold
		 */	
		m.update( min + 1E-10 );

		/*
		 * b.thresholds.low -> lowest high threshold
		 */
		while ( len() > 0 ) {
			/*
			 * get the 'off' element with the lowest low threshold
			 */
			b = this.getLowestSub(subBistats);

			if ( b.length > 1 ) {
				throw new Error( 
					'getLowestSub(subs).length > 1 ) ' +
					+ 'this will happen with lattice ' +
					+ '...could also happen with continuous'
				);
			} else { 
				b = b[0]; 
			}

			l = b.thresholds.low;
			h = b.thresholds.high;
			// console.table({'l': l, 'h': h});

			subSubs = this.getSubs(subBistats, l, h);

			if ( subSubs.length > 0 ) {
				statios = this.getStatios( statios, m, subSubs, l, h );
			}

			/*
			 * turn on blowestLow
			 */
			m.update(h);
			// console.log('updated high: ', h);

			/*
			 * start at low threshold of blowestLow
			 */
			m.update(l + 1E-10);
			// console.log('updated low: ', l);
			
			/*
			 * 
			 */
			statios.push( new _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__["default"](m) );

			/*
			 * remove bLowestLow from subBistats
			 */
			subBistats = subBistats.filter( b => ( b.thresholds.low > l ) );
			// console.log('subBistats: ', subBistats);
		}
			// b = this.getLowestSub(subBistats)[0];

			// l = b.thresholds.low;
			// m.update(l + 1E-10);
		// console.table(statios.map(st=>[st.min, st.max]));

		return statios;
	}
	

	/**
	 * 
	 */
	getStatios_V( statios, m, subBistats, min, max ) { 
		// this.getStatios_subLowestOff();

		// b0 = all_possible_single_ons[0];
		// m.update(m.hardMin);
		// b0.state = 1;
		// m.input = b0.thresholds.low + 1E-5;

		// // this should definitely be just one piece
		// // check though I guess
		// statio0 = m.update(b0.thresholds.high-1E-5)[0];


		// turn on bb
		// update thresholds
		// push statio

		// turn off again
		// // update thresholds
		// go to prior bb
		// }

		/*
			let b = this.getEl_lowestLow_lowestHigh(m.bistats.all);

			let sub_LL_LH = this.getSubs(m.bistats.all, b.thresholds);

			let myStatios = this.getStatios_sub_lowestLow_lowestHigh(m, b); // m is mutated here


			// turn on el lowest off
			// then into getStatios()

			// m.update( m.bistats.minOpenningPressure );
			
			// BOGUS
			return this.getStatiosRemaining( myStatios, m, m.bistats.all, m.hardMin, m.hardMax );
		*/
		return 0;
	}

	/**
	 * @param {bistat} - b
	 * @return {!Array<bistats>} - bistats_sub_bistat_LL_LH - array of bistats with low threshold higher & and high threshold lower than bistat b
	 */
	get_bistats_sub_bistat_LL_LH(bistats, blllh) {
		return bistats.filter( b => ( b.thresholds.plow > blllh.thresholds.plow && b.thresholds.phigh < blllh.thresholds.phigh ) ); 
	}
	/**
	 * @param {!Array<bistat>} bistats - array of bistats to be checked
	 * 
	 * @returns {bistat} - b = bistat  with lowest off threshold & lowest on threshold
	 */
	get_bistat_LL_LH(bistats) {
 		// console.log(bistats.length);
		let threshold_lowest_low = this.get_threshold_lowest_low(bistats);
		let bistats_lowest_low = this.get_bistats_lowest_low(bistats, threshold_lowest_low);

		let b;

		if ( bistats_lowest_low.length > 1 ) {
			let threshold_lowest_high = this.get_threshold_lowest_high(bistats_lowest_low);
			let bistats_lowest_low_lowest_high = this.get_bistats_lowest_high(bistats_lowest_low, threshold_lowest_high);

			if (bistats_lowest_low_lowest_high.length > 1) {
				throw new Error('There are bistats with identical thresholds\nPLEASE,\nrefresh the page');
				process.exit();
			}
			b = bistats_lowest_low_lowest_high[0];
		} else {
			b = bistats_lowest_low[0];
		}
		return b;
	}

	get_threshold_lowest_low(bistats) { 
 		// return Math.min.apply(null, bistats.map( b => b.thresholds.low )); 
 		// console.log(bistats.length);
 		if ( bistats.length == 0 ) {
 			throw new Error('balls');
 		}
 		return Math.min.apply(null, bistats.map( b => b.thresholds.plow )); 
 	}

 	get_bistats_lowest_low(bistats, threshold_lowest_low) {
 		return bistats.filter( b => b.thresholds.plow == threshold_lowest_low );
 	}

 	get_threshold_lowest_high(bistats) {
 		return Math.min.apply(null, bistats.map( b => b.thresholds.phigh ));
 	}

 	get_bistats_lowest_high(bistats, threshold_lowest_high) {
 		return bistats.filter( b => b.thresholds.phigh == threshold_lowest_high );
 	}






	/**
	 * Due to difficulties introduced by 'all closed'
	 * we have to be extra careful with every possibly '1 open'
	 */
	getStatios_sub_lowestLow_lowestHigh(m, b) {
		/**/
		console.log('getStatios_sub_lowestLow_lowestHigh, m = ', m);
		/**/
		// let statios = [ new Statio(m) ];
		/**/

		// let b = this.getEl_lowestLow_lowestHigh(m.bistats.all);
		let bSubs = this.getSubs(m.bistats.all, b.thresholds);

		while (true) {
			// we are already passed b
			// let b = this.getEl_lowestLow_lowestHigh(m.bistats.all);
			let myStatios = this.getStatios_sub_lowestLow_lowestHigh(m, b); // m is mutated here

			// What we probably want is the lowest high within subs
			// 
			// but we need the lowest High... to know where to stop, to turn that on and the others off
			// then do the subs again
			// then get next lowest high
			// then subs again

		}

		return statios;
	}

	getStatiosRemaining( statios, m, subBistats, min, max ) { 
		// console.table( {'min': min, 'max': max, 'high': m.high} );
		/*
		 * BOGUS
		 * 	want to make it cancelable here
		 */
		if ( this.creationCancelled != false ) {
			// this.statios = null;
			return [];
		}

		let b, l, h,
			subSubs,
			i = 1;
		let len = () => subBistats.length;

		// console.log(m);
		// console.log(m.update);
		
		/*
		 * start at low threshold
		 */	
		// if they are all closed 
		// this will turn on the lowest opening pressure element
		// really me might have to do all of the statios for when el lowest closeing pressure is open outside the main loop
		// m.update( min + 1E-10 );

		// console.log(m);
		// console.log(m.update);

		/*
		 * b.thresholds.low -> lowest high threshold
		 */
		// statios.push( new Statio(m) );
		// console.log(statios[0].path);

		while ( len() > 0 ) {
			/*
			 * get the 'off' element with the lowest low threshold
			 */
			b = this.getEls_lowestLow(subBistats);

			if ( b.length > 1 ) {
				// console.table(b.map(bb=>bb.thresholds.low));
				// console.table(b.map(bb=>bb.thresholds.high));
				throw new Error( 
					'***********************************************\n' +
					'SolSet.getStatios.getEls_lowestLow(subs).length > 1\n' +
					'***********************************************\n' +
					'When they are all closed; they all have the same thresholds\n' +
					'this is guaranteed with lattice thresholds\n' +
					'...but could also happen with continuous\n'+ 
					'Obviously: filter to get the right one'
				);
			} else { 
				b = b[0]; 
			}

			/**/
			// l = ()=>b.thresholds.low;
			// h = ()=>b.thresholds.high;

			subSubs = this.getSubs(subBistats, b.thresholds);

			if ( subSubs.length > 0 ) {
				statios = this.getStatios( statios, m, subSubs, b.thresholds.low, b.thresholds.high );
			}

			/*
			 * turn on blowestLow
			 */
			while ( (()=>b.state)() == false ) {
				m.update( b.thresholds.high );
			}
			// console.log('updated high: ', h);
			
			/*
			 * start at low threshold of blowestLow
			 */
			// while ( subSubs.filter( ssb => ssb.state == true ).length > 0 ) {
			// 	// m.update( (()=>b.thresholds.low)() + 1E-10 );
			// 	m.update( b.thresholds.low + 1E-10 );
			// }
			m.update(b.thresholds.low + 1E-10);
			// console.log('updated low: ', l);
			/**/
			
			/*
			 * 
			 */
			statios.push( new _Statio_Statio_Constant_Continuous_js__WEBPACK_IMPORTED_MODULE_0__["default"](m) );

			/*
			 * remove bLowestLow from subBistats
			 */
			subBistats = subBistats.filter( sb => ( sb.thresholds.low > b.thresholds.low ) );
			// console.log('subBistats: ', subBistats);
		}

		// console.table(statios.map(st=>st.states));
		// console.table(statios.map(st=>[st.min, st.max]));
		console.table(statios.map(st => st.path[0]));

		return statios;
	}

	getSubs(bistats, thresholds) { 
		return bistats.filter( b => ( b.thresholds.plow > thresholds.plow && b.thresholds.phigh < thresholds.phigh ) ); 
	}

	getEl_lowestLow_lowestHigh(bistats) {
		/*
		 *
		 */
		console.log('getEl_lowestLow_lowestHigh -> bistats = ', bistats);
		let el;
		// let els = this.getEls_lowestLow( m.bistats.all );
		let els = this.getEls_lowestLow( bistats );
		// let els = this.getEls_lowestHigh( bistats );

		if ( els.length > 1 ) {
			// let ells = this.getEls_highestHigh(els);
			let ells = this.getEls_lowestHigh(els);
			if ( ells.length > 1 ) {
				throw new Error( 
					'***********************************************\n' +
					'SolSet....(subs).length > 1\n' +
					'***********************************************\n' +
					'THIS IS A DUPLICATE HYSTERON'
				);
			} else {
				el = ells[0];
			}
		} else {
			el = els[0];
		}
		return el;
	}

	getEl_lowestLow_highestHigh(bistats) {
		/*
		 *
		 */
		let el;
		let els = this.getEls_lowestLow( m.bistats.all );
		if ( els.length > 1 ) {
			let ells = this.getEls_highestHigh(els);
			if ( ells.length > 1 ) {
				throw new Error( 
					'***********************************************\n' +
					'SolSet....(subs).length > 1\n' +
					'***********************************************\n' +
					'THIS IS A DUPLICATE HYSTERON'
				);
			} else {
				el = ells[0];
			}
		} else {
			el = els[0];
		}
		return el;
	}

	/**
	 * 
	 */
	getEls_lowestHigh(bistats) { 
		let lowestHigh = this.get_lowestHigh(bistats); 
		return bistats.filter( b => b.thresholds.phigh == lowestHigh ); 
	}

	getEls_lowestLow(bistats) { 
		let ll = this.get_lowestLow(bistats); 
		return bistats.filter( b => b.thresholds.plow == ll ); 
	}

	getEls_highestHigh(bistats) { 
		let hh = this.get_highestHigh(bistats); 
		return bistats.filter( b => b.thresholds.phigh == hh ); 
	}


	get_lowestHigh(bistats) { 
		return Math.min.apply(null, bistats.map( b => b.thresholds.phigh )); 
	}

	get_highestHigh(bistats) { 
		return Math.max.apply(null, bistats.map( b => b.thresholds.phigh )); 
	}

	get paths() {
		return this.statios.map( s => s.path );
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SolSet_Volume_Continuous);

/***/ }),

/***/ "../preisachjs/src/Statio/Statio_Constant_Continuous.js":
/*!**************************************************************!*\
  !*** ../preisachjs/src/Statio/Statio_Constant_Continuous.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file Statio_Constant_Continuous.js
 * @author m 
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */
class Statio_Constant_Continuous {
	/**
	 * 
	 */
	constructor( m ){
		// console.log(m);
		// console.log(m.update);
		/**
		 * @property min
		 * @type {number}
		 */
		this.min = m.input;

		/**
		 * @property max
		 * @type {number}
		 */
		this.max = undefined;

		/**
		 * @property path
		 * @type {!Array< !Array<number>, !Array<number> >}
		 */
		this.path;
		

		/**
		 * set max
		 */
		if ( m.bistats.offs.length == 0 ) {
			this.max = m.hardMax;
		} else {
			this.max = m.bistats.high - 1E-10;
		}

		// console.log('Statio_Constant_Continuous m = ', m);
		// console.log('Statio_Constant_Continuous m.update = ', m.update);
		// console.log(typeof m.bistats.minOpenningPressure);
		
		/**
		 * 
		 */
		if ( m.bistats.offs.length == m.bistats.all.length && typeof m.bistats.minOpenningPressure != 'undefined' ) {
			this.path = [ 
				[this.min, this.min], 
				[0, m.bistats.minOpenningPressure] 
			];
			// m.update( m.bistats.minOpenningPressure );
		} else {
			// console.log('Statio_Constant_Continuous m = ', m);
			// console.log('Statio_Constant_Continuous m.update = ', m.update);
			this.path = m.update( this.max )[0];
		}

		/**
		 * @property memory
		 * @type {!Array< !Array<number, number, number> >}
		 */
		// this.memory = m.bistats.all.map( b => [b.thresholds.low, b.thresholds.high, b.state] );

		/**
		 * @property states
		 * @type {!Array<number>}
		 */
		this.states = m.bistats.all.map( b => b.state );
		// this.states = this.memory.map( b => b[2] );
		// console.table(this.states);
	}

	setStates() {
		this.states.forEach( (state, i) => { m.bistats.all[i].state = state; } );
	}

	getPath(m) {
		m.update( this.min );
		this.setStates();
		this.path = m.update( this.max )[0];
		return this.path;
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Statio_Constant_Continuous);

/***/ }),

/***/ "../preisachjs/src/Statio/Statio_Constant_Lattice.js":
/*!***********************************************************!*\
  !*** ../preisachjs/src/Statio/Statio_Constant_Lattice.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file Statio_Constant_Lattice.js
 * @author m 
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */
class Statio_Constant_Lattice {
	static min;
	static max;
	static diag;
	static grainSize;
	static hardMin;
	static hardMax;
	/**
	 *	structure containing:
	 *		states2D	truthy[][]
	 * 		interval 	float[]
	 * 		float 			output / level (actually a function) ...eh?
	 */
	constructor(size, corners) { //, min, max, diag, grainSize, step) {
		/**
		 * @property states2D
		 * @type {!Array<!Array<number>>}
		 */
		this.states2D = this.corners2array(size, corners);

		/**
		 * @property min
		 * @type {number}
		 */
		this.min;

		/**
		 * @property max
		 * @type {number}
		 */
		this.max;

		[this.min, this.max] = this.setInterval(size, corners); // , min, max, grainSize);

		// console.log(this.min, this.max);

		// setTimeout(() => this.setInterval(min, max, granularity), 0);
		// setTimeout(() => this.setIO(step), 0);
		// this.setIO(step);
	}
	
	/**
	 *
	 */
	setInterval(size, corners) {
		// console.log(min, max);
		let min 		= Statio_Constant_Lattice.min;
		let max 		= Statio_Constant_Lattice.max;
		let diag 		= Statio_Constant_Lattice.diag;
		let grainSize 	= Statio_Constant_Lattice.grainSize;
		let hardMin 	= Statio_Constant_Lattice.hardMin;
		let hardMax 	= Statio_Constant_Lattice.hardMax;
		// console.log(min, max, diag, grainSize, hardMin, hardMax);

		if (corners.length == 0) {
			return [min - grainSize, min + grainSize + diag];
		}
		if (corners.length == size) {
			// return [max - m.thresholds().sup[2] - grainSize, max + grainSize];
			return [min + (size-1)* grainSize, hardMax];
		}
		return [min + ((corners.length - 1) * grainSize), min + diag + ((corners.length + 1) * grainSize)];
	}

	/**
	 *
	 */
	corners2array(size, corners) {
		// BOGUS
		// don't actually need to fill it at all
		// let arr = Array(size);
		let arr = Array(size).fill().map(() => Array(size).fill(0));
		let len = corners.length;
		let z = 0;
		let l = size - 1 - len;

		// for ( let i = 0; i < size; i-- ) {
			// corners
				// arr.push(true);
		// }

		for (let i = size - 1; i > l; i--, z++) {
			for (let j = z; j < corners[z] + z; j++) {	// col
				arr[i][j] = 1;
			}
		}
		// console.log(arr);
		return arr;
	}
	
	/**
	 * 
	 */
	getPath(m) {
		// let mi, ma;
		// [mi, ma] = getInterval(this.size, this.corners, this.min, this.max, this.grainSize);
		// let input = mi + 1E-10;

		this.forceState(m, this.min + 1E-10, this.states2D);
		m.update(this.min + 1E-10);

		return m.update(this.max)[0];
	}

	/**
	 *
	 */	
		// console.log(m.bistats.all);
	forceState(m, input, states2D) {
		let k = 0;
		let size = states2D.length;
		m.input = input;
		for (let i = size-1; i >= 0; i--) {
			let i0 = size-1-i;
			for(let j = i0; j < size; j++) {	
				m.bistats.all[k++].state = states2D[i][j];
			}
		}
		m.update(input);
	}	

	/**
	 *
	 */
	// setIO(m) {
		// /*
		//  * BOGUS
		//  * 	there has to be a better way of having a common multistat
		//  *
		//  */
		// let mi, ma;
		// [mi, ma] = this.getInterval(this.size, this.corners, this.min, this.max, this.grainSize);
		// // let m = Statio.multistat;
		// // let input = this.min - this.grainSize + 1E-10;
		// let input = mi + 1E-10;
		// // console.log(mi,  ma);

		// m.forceState(input, this.states2D);
		// m.update(mi + 1E-10);
		// [this.input, this.output] = m.update(ma)[0];

		// // this.input = [];
		// // this.output = [];
		// // // let max = this.max - this.step
		// // while (input <= ma) {
		// // 	this.input.push(input);
		// // 	this.output.push(this.getOutput(m, input));
		// // 	input += this.step;
		// // }
		// // // console.log('statio, min = (', this.min, ', ', this.getOutput(m, this.min), ') \nstatio, max = (', this.max, ', ', this.getOutput(m, this.max), ')')

		// // this.input.push(this.max - 1E-10);
		// // this.output.push(this.getOutput(m, this.max - 1E-10));
		// }

	/**
	 *
	 */
	// getInterval(size, corners, min, max, grainSize) {
		// if (corners.length == 0) {
		// 	return [min - grainSize, min + grainSize];
		// }
		// if (corners.length == size) {
		// 	return [max - grainSize, max + grainSize];
		// }
		// return [min + ((corners.length - 1) * grainSize), min + ((corners.length + 1) * grainSize)];
		// }

	/**
	 *
	 */
	// getOutput(m, input) {
		// let size = this.states2D.length;
		// let output = 0;
		// let k = 0;

		// m.bistats.forEach(b => {
		// 	b.state() 	? b.output(b.fOn( input, b.thresholds()[0], b.thresholds()[1]))
		// 				: b.output(b.fOff(input, b.thresholds()[0], b.thresholds()[1]));
		// 	output += b.output() * b.weight();
		// });
		// // BOGUS
		// // for (let i = 0; i < size; i++) {
		// // 	let i0 = size-1-i;
		// // 	for(let j = i0; j < size; j++) {
		// // 		let bk = m.bistats[k];
		// // 		let l = bk.thresholds()[0];
		// // 		let h = bk.thresholds()[1];
		// // 		if ( bk.state() ) {
		// // 			bk.output(bk.fOn(input, l, h));
		// // 		} else {
		// // 			bk.output(bk.fOff(input, l, h));
		// // 		}
		// // 		output += bk.output()*bk.weight();	
		// // 		k++;
		// // 	}
		// // }
		// output += m.bistats[0].fOn(input) * m.permanentlyOpen();
		// return output;
		// }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Statio_Constant_Lattice);


/***/ }),

/***/ "../preisachjs/src/ThresholdPairs.js":
/*!*******************************************!*\
  !*** ../preisachjs/src/ThresholdPairs.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Distribution_Uniform_Preisach_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Distribution/Uniform_Preisach.js */ "../preisachjs/src/Distribution/Uniform_Preisach.js");
/* harmony import */ var _Distribution_Linear_Preisach_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Distribution/Linear_Preisach.js */ "../preisachjs/src/Distribution/Linear_Preisach.js");
/* harmony import */ var _Distribution_Normal_Preisach_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Distribution/Normal_Preisach.js */ "../preisachjs/src/Distribution/Normal_Preisach.js");
/**
 * @file ThresholdPairs.js
 * @author m
 * @date 2022
 * @version 0.0.3
 */

/**
 *
 */




/**
 *
 */
class ThresholdPairs{
	/**
	 * @constructor
	 * @param {cfg.thresholds}
	 */
	constructor(thresholds) {
		/**
		 * @property cfg
		 * we use/need this when creating the SolSet
		 */
		// console.log(thresholds);
		this.cfg = {...thresholds}; 
		this.pairs = this.getPairs(thresholds);
		// this.pairs = getLinearWidthPairs([0, 1, 0], 10000);
	}

	getPairs(thresholds) {
		// console.log(thresholds);
		let sup = Object.values(thresholds.support);
		if ( thresholds.pairs == "lattice" ) {
			return getLatticePairs(sup, thresholds.lattice.size);
			// this.style = 'lattice';
		} else { 
			return getContinuousPairs(sup, thresholds.continuous);
		}
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThresholdPairs);
// module.exports.default = Thresholds_MultiStat;

/**
 * @param {}
 */
function getContinuousPairs(sup = [0, 1, 0.25], c) {
	// this.style = 'uniform';
	// console.log('continuous = ', thresholds.continuous);			
	// let c = thresholds.continuous;
	switch(c.distribution) {
		case 'uniform':
			return (0,_Distribution_Uniform_Preisach_js__WEBPACK_IMPORTED_MODULE_0__["default"])(sup, c.size);
		case 'linear':
			return (0,_Distribution_Linear_Preisach_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sup, c.size);
		case 'normal':
			let n = c.normal;
			return (0,_Distribution_Normal_Preisach_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object.values(n.mean), n.std.low, sup, c.size);
			// this.style = 'rn';
		default:
			throw new Error('Need a thresholds.continuous.distribution: ' + c.distribution);
	}
}

// lattice(support = {min:0, max:1, diag:0.25}, size = 2) {
	// 	let minX = support.min + support.diag;
	// 	// console.log('minX = ', minX);
	// 	let precision = (support.max - minX)/(size+2.0);
	// 	let k = 0;
	// 	for (let i = 1; i <= size; i++) {
	// 		for (let j = i; j <= size; j++) {
	// 			// [low, high]...[vert, hoz]
	// 			pairs[k++] = [ support.min + i*precision, minX + (j+1)*precision ];
	// 			// pairs[k++] = [ minX + (j+1)*precision , i*precision];
	// 		}
	// 	}
	// 	return pairs;
	// }

/**
 *
 */
function getLatticePairs(support = [0, 1, 0.25], size = 2) {		
	/**
	 *
	 */
	let minX = support[0] + support[2];
	let grainSize = (support[1] - minX)/(size+2.0);

	let pairs = [];
	let k = 0;
	for (let i = 1; i <= size; i++) {
		for (let j = i; j <= size; j++) {
			pairs[k++] = [ support[0] + i*grainSize, minX + (j+1)*grainSize ];
			// ... ALT ... [low, high]...[vert, hoz]
			// pairs[k++] = [ minX + (j+1)*grainSize , i*grainSize];
		}
	}
	return pairs;
}

/**
 *
 */
function wrappedSet(arr) {
	arr = [...new Set(arr)];
	arr.sort((a, b) => a - b);
	arr.push(Infinity);
	arr.unshift(Number.NEGATIVE_INFINITY);
	return arr;
}


/***/ }),

/***/ "../preisachjs/src/Thresholds_BiStat.js":
/*!**********************************************!*\
  !*** ../preisachjs/src/Thresholds_BiStat.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file Thresholds_BiStat.js
 * @author md 
 * @date 2022 
 * @version 0.1
 */

/**
 * @class Thresholds_BiStat
 * @classdesc for managing thresholds of a BiStatio object 
 */
class Thresholds_BiStat {
	/**
	 * @constructor
	 * @param {[float, float]} vals - values of the thresholds
	 */
	constructor(vals) {
		vals = this.validate(vals);

		/**
		 * low - low threshold
		 * @property low
		 * @type number
		 */
		this.low = vals[0];

		/**
		 * high - high threshold
		 * @property high
		 * @type number
		 */
		this.high = vals[1];
	}

	/**
	 * validate - validates the thresholds
	 * @param {[float, float]}  vals - values of the thresholds
	 * @return {[float, float]}  vals - values of the thresholds in order of [low, high]
	 */
	validate(vals) {
		// if ...
		if (vals[0] == vals[1]) {
			throw new Error('thresholds are equal');
		}
		if (vals[0] > vals[1]) {
			vals.reverse();
		}
		return vals;
	}

	// get low()  { return this.low; }
	// set low(t) { this.low = t; }

	// get high()  { return this.high; }
	// set high(t) {this.high = t; }

	get thresholds() { return {'low': this.low, 'high': this.high}; }
	// set thresholds(t) { this.low = t.low; this.high = t.high;}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Thresholds_BiStat);


/***/ }),

/***/ "../preisachjs/src/Weights/weightsNormal.js":
/*!**************************************************!*\
  !*** ../preisachjs/src/Weights/weightsNormal.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file weightsNormal.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */
function weightsNormal(cfg, pairs) { 
	console.log(cfg);
	// console.log(pairs);

	let weights = pairs.map( p => getWeight(cfg.func.normal, p) );
	// console.log(weights);
	let ww = weights.reduce((a,v)=>a+v, 0);
	return weights.map(w => w/ww);
}

let getWeight = (cfg, thresholdPair) => {	
	let r = getRadius( Object.values(cfg.mean), thresholdPair); 
	r =  gaussian(r, 0, cfg.std);
	return r;
	// return gaussian(r);
}
// let getRadius 	= (c, t) => Math.sqrt(Math.pow((t[0]-c.low), 2) + Math.pow((t[1]-c.high), 2) );	
function getRadius(m, t){
	return Math.sqrt(
			Math.pow( (t[0]-m[0]), 2 ) + 
			Math.pow( (t[1]-m[1]), 2 ) 
		);
}

// let gaussian 	= (u) 	 => 1 / Math.sqrt(2 * Math.PI) * Math.exp(-.5 * u * u); 

// let gaussian = (x, alpha, r) => {
let gaussian = (x, mu, sig) => {
	// return 1./(Math.sqrt(alpha**Math.pi))*Math.exp(-alpha*Math.pow( (x - mu), 2. ))

	sig = sig.low;
	console.log(x, mu, sig);
	let g = ( 1. / ( Math.sqrt( 2*Math.PI*sig*sig ) ) ) * 
			Math.exp(  - ( Math.pow( (x - mu), 2. ) /  (2*sig*sig)  ) );
	console.log(g);
	return g;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weightsNormal);


/***/ }),

/***/ "../preisachjs/src/Weights/weightsWidth.js":
/*!*************************************************!*\
  !*** ../preisachjs/src/Weights/weightsWidth.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @file weightsWidth.js
 * @author m
 * @date 2022
 * @version 0.0.1
 */

/**
 *
 */

/**
 *
 */
function weightsWidth(cfg, pairs) { 
	let weights = pairs.map( p => p[1] - p[0] );
	let ww = weights.reduce((a, v) => a + v, 0);
	return weights.map(w => w/ww);
}

function scaledRandoms(size, max) {
    let random = [...Array(size)].map(() => Math.random() );
    let total = random.reduce((a, v) => a+v, 0);
    // console.table(s);
    return random.map(rand => (max*rand)/total);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weightsWidth);

/***/ }),

/***/ "../preisachjs/src/Weights_MultiStat.js":
/*!**********************************************!*\
  !*** ../preisachjs/src/Weights_MultiStat.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Weights_weightsWidth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Weights/weightsWidth.js */ "../preisachjs/src/Weights/weightsWidth.js");
/* harmony import */ var _Weights_weightsNormal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Weights/weightsNormal.js */ "../preisachjs/src/Weights/weightsNormal.js");
/**
 *
 * @file Weights.js
 * @author m
 * @date 2022-02
 * @version 0.0.2
 */

/**
 *
 */


// import Linear_Preisach from './Distribution/Linear_Preisach.js';


/**
 *
 */
function uniform(n, max) { return new Array(n).fill(max/n); }

/*
 *
 */
function scaledRandoms(size, max) {
	let random = [...Array(size)].map(() => Math.random() );

	let total = random.reduce((a, v) => a+v, 0);
	console.table(random);
	console.table( {'size': size, 'max': max, 'total': total});
	return random.map(rand => (max*rand)/total);
}

/**
 *
 */
class Weights_MultiStat {
	/**
	 *
	 */
	constructor(cfg, pairs) {
		this.weights = this.getWeights(cfg, pairs);
	}

	/**
	 *
	 */
	getWeights(cfg, pairs=null) {
		console.log('Weights_MultiStat -> cfg = ', cfg);
		console.log('Weights_MultiStat -> pairs = ', pairs);

		// console.log('weights = ', pairs.length);

		// console.log('weights = ', cfg);
		// console.log('weights.size = ', cfg.size);
		// console.log('weights.max = ', cfg.max);

		switch(cfg.style) {
			case 'equal': 
			// 	return uniform(cfg.size, cfg.max);
				return uniform(pairs.length, cfg.max);
			case 'random':
				// return scaledRandoms(cfg.size, cfg.max);
				return scaledRandoms(pairs.length, cfg.max);
			case 'func':
				return this.func(cfg, pairs);
			default:
				// return normal(cfg, pairs);
				throw new Error('Need a distribution for element weights: ' + cfg.style);
		}
	}

	func(cfg, pairs) {
		switch (cfg.func.style) {
			case 'linear':
				return (0,_Weights_weightsWidth_js__WEBPACK_IMPORTED_MODULE_0__["default"])(cfg, pairs);
			case 'normal':
				return (0,_Weights_weightsNormal_js__WEBPACK_IMPORTED_MODULE_1__["default"])(cfg, pairs);
				// We like to have this one for Lattice Threshold Pairs
				throw new Error('BOGUS\n\timplement weights.func.normal');
			default:
				throw new Error('Need a weights.func.style: ' + cfg.func.style);
		}
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weights_MultiStat);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentBoards/src/boards-style.css":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentBoards/src/boards-style.css ***!
  \*******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n * boards-style.css \n * @author md 2021\n */\n\n.jxgbox {\n\tbox-sizing: border-box;\n\twidth: 48vh;\n\theight: 48vh;\n\tbackground-color: #212128 !important;\n\t/*background-color: #121220 !important;*/\n\t/*background-color: #121220;*/\n\t/*border: 3px #222 double;*/\n\tborder-radius: 0px !important;\n\tborder-color: #443322 !important;\n\t/*color: #1818181;*/\n}\n\n/*.JXGtext {\n\tcolor: #181818!important;\n}\n*/\n.JXGinfobox {\n\tborder-style: none;\n\t/*hide point coords*/\n\tvisibility: hidden !important;    \n}\n/*#jxg-OutOut {}*/\n/*#jxg-InOut {}*/\n/*#jxg-Out {}*/\n#jxg-In {\n\theight: 4vh;\n\tborder-radius: 0;\n\t/*border: none !important;*/\n\tborder-top-width: 0;\n\tborder-bottom-width: 0;\n\t/*height: calc(4vh -4pt);*/\n\t/*border: 3px #222 double;*/\n\t/*border-radius: 0px !important;*/\n}\n", "",{"version":3,"sources":["webpack://./../RecruitmentBoards/src/boards-style.css"],"names":[],"mappings":"AAAA;;;EAGE;;AAEF;CACC,sBAAsB;CACtB,WAAW;CACX,YAAY;CACZ,oCAAoC;CACpC,wCAAwC;CACxC,6BAA6B;CAC7B,2BAA2B;CAC3B,6BAA6B;CAC7B,gCAAgC;CAChC,mBAAmB;AACpB;;AAEA;;;CAGC;AACD;CACC,kBAAkB;CAClB,oBAAoB;CACpB,6BAA6B;AAC9B;AACA,iBAAiB;AACjB,gBAAgB;AAChB,cAAc;AACd;CACC,WAAW;CACX,gBAAgB;CAChB,2BAA2B;CAC3B,mBAAmB;CACnB,sBAAsB;CACtB,0BAA0B;CAC1B,2BAA2B;CAC3B,iCAAiC;AAClC","sourcesContent":["/*\n * boards-style.css \n * @author md 2021\n */\n\n.jxgbox {\n\tbox-sizing: border-box;\n\twidth: 48vh;\n\theight: 48vh;\n\tbackground-color: #212128 !important;\n\t/*background-color: #121220 !important;*/\n\t/*background-color: #121220;*/\n\t/*border: 3px #222 double;*/\n\tborder-radius: 0px !important;\n\tborder-color: #443322 !important;\n\t/*color: #1818181;*/\n}\n\n/*.JXGtext {\n\tcolor: #181818!important;\n}\n*/\n.JXGinfobox {\n\tborder-style: none;\n\t/*hide point coords*/\n\tvisibility: hidden !important;    \n}\n/*#jxg-OutOut {}*/\n/*#jxg-InOut {}*/\n/*#jxg-Out {}*/\n#jxg-In {\n\theight: 4vh;\n\tborder-radius: 0;\n\t/*border: none !important;*/\n\tborder-top-width: 0;\n\tborder-bottom-width: 0;\n\t/*height: calc(4vh -4pt);*/\n\t/*border: 3px #222 double;*/\n\t/*border-radius: 0px !important;*/\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/branches-style.css":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/branches-style.css ***!
  \***********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n * @file branches-style.css \n * @author m\n * @date 2021\n */\n\n/**\n * don't know where I copied this from\n */\n#eq-select{\n\tbackground-color: #333;\n\tcolor: #ccc;\n\tborder: none;\n\theight: 2em;\n\twidth: 100%;\n\tpadding: 5px 10px;\n\tfont-size: 1.2em;\n\t-webkit-appearance: none;\n\t-moz-appearance: none;\n\tappearance: none;\n}\n\n#eq-select option {\n\tcolor: #ccc;\n\tpadding: 0 10px;\n}\n\n#div-sel:after {\n\tcontent: '\\25BC';\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tfont-size: 1.4em;\n\tborder: 1px solid #565656;\n\tbackground: #888;\n\tcolor: #ccc;\n\tpadding: 4px 11px;\n\tpointer-events: none;\n}\n\n#div-sel {\n\tposition: relative;\n\tmargin: auto;\n\t/*width: 75%;*/\n}\n\n#equations {\n\t/*why not 100% ...cause am ...doesn't work*/\n\t/*width: 100%;*/\n\twidth: max-content;\n\tmargin: auto;\n\tmargin-top: -0.5em;\n\tmargin-bottom: 0.5em;\n}\n\n.equation {\n\twidth: inherit;\n\tmargin-bottom: 0.25em;\n}", "",{"version":3,"sources":["webpack://./../RecruitmentForm/src/css/branches-style.css"],"names":[],"mappings":"AAAA;;;;EAIE;;AAEF;;EAEE;AACF;CACC,sBAAsB;CACtB,WAAW;CACX,YAAY;CACZ,WAAW;CACX,WAAW;CACX,iBAAiB;CACjB,gBAAgB;CAChB,wBAAwB;CACxB,qBAAqB;CACrB,gBAAgB;AACjB;;AAEA;CACC,WAAW;CACX,eAAe;AAChB;;AAEA;CACC,gBAAgB;CAChB,kBAAkB;CAClB,MAAM;CACN,QAAQ;CACR,SAAS;CACT,gBAAgB;CAChB,yBAAyB;CACzB,gBAAgB;CAChB,WAAW;CACX,iBAAiB;CACjB,oBAAoB;AACrB;;AAEA;CACC,kBAAkB;CAClB,YAAY;CACZ,cAAc;AACf;;AAEA;CACC,2CAA2C;CAC3C,eAAe;CACf,kBAAkB;CAClB,YAAY;CACZ,kBAAkB;CAClB,oBAAoB;AACrB;;AAEA;CACC,cAAc;CACd,qBAAqB;AACtB","sourcesContent":["/*\n * @file branches-style.css \n * @author m\n * @date 2021\n */\n\n/**\n * don't know where I copied this from\n */\n#eq-select{\n\tbackground-color: #333;\n\tcolor: #ccc;\n\tborder: none;\n\theight: 2em;\n\twidth: 100%;\n\tpadding: 5px 10px;\n\tfont-size: 1.2em;\n\t-webkit-appearance: none;\n\t-moz-appearance: none;\n\tappearance: none;\n}\n\n#eq-select option {\n\tcolor: #ccc;\n\tpadding: 0 10px;\n}\n\n#div-sel:after {\n\tcontent: '\\25BC';\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tfont-size: 1.4em;\n\tborder: 1px solid #565656;\n\tbackground: #888;\n\tcolor: #ccc;\n\tpadding: 4px 11px;\n\tpointer-events: none;\n}\n\n#div-sel {\n\tposition: relative;\n\tmargin: auto;\n\t/*width: 75%;*/\n}\n\n#equations {\n\t/*why not 100% ...cause am ...doesn't work*/\n\t/*width: 100%;*/\n\twidth: max-content;\n\tmargin: auto;\n\tmargin-top: -0.5em;\n\tmargin-bottom: 0.5em;\n}\n\n.equation {\n\twidth: inherit;\n\tmargin-bottom: 0.25em;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/btns.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/btns.css ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\r\n * btns.css \r\n * @author md 2022\r\n */\r\n\r\n#div-ctrl-btns {\r\n\ttop: 0px;\r\n\twidth: 100%;\r\n\t/*height: 8em;*/\r\n\tz-index: 99999;\r\n}\r\n\r\n#btn-pv, #btn-vp, .btn-half {\r\n\tpadding: 0.25em 0em;\r\n\tborder-radius: 0.5em;\r\n\tborder: none;\r\n}\r\n#btn-pv, #btn-vp {\r\n\twidth: 100%;\r\n\tfont-size: 1.5em;\r\n}\r\n\r\n\r\n/*.div-update { z-index: 99999; }*/\r\n#btn-update {\r\n\twidth: 100%;\r\n\theight: 3em;\r\n\t/*font-size: xx-large;*/\r\n\tfont-size: 2em;\r\n\tpadding: 0.75em 0em;\r\n\tborder-radius: 0.5em;\r\n\tborder: none;\r\n\tcolor: #ccc;\r\n\tbackground-color: #333;\r\n}\r\n\r\n/**\r\n * lbl-pv, .lbl-pv1, .lbl-pv3\r\n * labels for the Pressure -V- Volume buttons\r\n */\r\n.lbl-pv{\r\n\t\t/*color: red;*/\r\n\t\t/*color: #f00;*/\r\n\t\twidth: 100%;\r\n\t\tpadding: 0;\r\n\t\ttext-align: center;\r\n\t\tdisplay: block;\r\n\t}\t\r\n\t.lbl-pv1, .lbl-pv2, .lbl-pv3 {\r\n\t\tpadding-top: 0.2em;\r\n\t}\r\n\t.lbl-pv1, .lbl-pv3{\r\n\t\twidth: 30%;\t\r\n\t\tdisplay: inline-block;\r\n\t}\r\n\t.lbl-pv1{\r\n\t\ttext-align: right;\r\n\t}\r\n\t.lbl-pv3{\r\n\t\ttext-align: left;\r\n\t}\r\n\r\n\r\n#div-pv,\r\n#pairs-btns, \t\r\n#threshold-dist-btns,\r\n#weights-dist-btns \r\n\t/*#weights-btns,*/\r\n\t{\r\n\t\tmargin-bottom: 0.5em;\r\n}", "",{"version":3,"sources":["webpack://./../RecruitmentForm/src/css/btns.css"],"names":[],"mappings":"AAAA;;;EAGE;;AAEF;CACC,QAAQ;CACR,WAAW;CACX,eAAe;CACf,cAAc;AACf;;AAEA;CACC,mBAAmB;CACnB,oBAAoB;CACpB,YAAY;AACb;AACA;CACC,WAAW;CACX,gBAAgB;AACjB;;;AAGA,kCAAkC;AAClC;CACC,WAAW;CACX,WAAW;CACX,uBAAuB;CACvB,cAAc;CACd,mBAAmB;CACnB,oBAAoB;CACpB,YAAY;CACZ,WAAW;CACX,sBAAsB;AACvB;;AAEA;;;EAGE;AACF;EACE,cAAc;EACd,eAAe;EACf,WAAW;EACX,UAAU;EACV,kBAAkB;EAClB,cAAc;CACf;CACA;EACC,kBAAkB;CACnB;CACA;EACC,UAAU;EACV,qBAAqB;CACtB;CACA;EACC,iBAAiB;CAClB;CACA;EACC,gBAAgB;CACjB;;;AAGD;;;;;;EAME,oBAAoB;AACtB","sourcesContent":["/*\r\n * btns.css \r\n * @author md 2022\r\n */\r\n\r\n#div-ctrl-btns {\r\n\ttop: 0px;\r\n\twidth: 100%;\r\n\t/*height: 8em;*/\r\n\tz-index: 99999;\r\n}\r\n\r\n#btn-pv, #btn-vp, .btn-half {\r\n\tpadding: 0.25em 0em;\r\n\tborder-radius: 0.5em;\r\n\tborder: none;\r\n}\r\n#btn-pv, #btn-vp {\r\n\twidth: 100%;\r\n\tfont-size: 1.5em;\r\n}\r\n\r\n\r\n/*.div-update { z-index: 99999; }*/\r\n#btn-update {\r\n\twidth: 100%;\r\n\theight: 3em;\r\n\t/*font-size: xx-large;*/\r\n\tfont-size: 2em;\r\n\tpadding: 0.75em 0em;\r\n\tborder-radius: 0.5em;\r\n\tborder: none;\r\n\tcolor: #ccc;\r\n\tbackground-color: #333;\r\n}\r\n\r\n/**\r\n * lbl-pv, .lbl-pv1, .lbl-pv3\r\n * labels for the Pressure -V- Volume buttons\r\n */\r\n.lbl-pv{\r\n\t\t/*color: red;*/\r\n\t\t/*color: #f00;*/\r\n\t\twidth: 100%;\r\n\t\tpadding: 0;\r\n\t\ttext-align: center;\r\n\t\tdisplay: block;\r\n\t}\t\r\n\t.lbl-pv1, .lbl-pv2, .lbl-pv3 {\r\n\t\tpadding-top: 0.2em;\r\n\t}\r\n\t.lbl-pv1, .lbl-pv3{\r\n\t\twidth: 30%;\t\r\n\t\tdisplay: inline-block;\r\n\t}\r\n\t.lbl-pv1{\r\n\t\ttext-align: right;\r\n\t}\r\n\t.lbl-pv3{\r\n\t\ttext-align: left;\r\n\t}\r\n\r\n\r\n#div-pv,\r\n#pairs-btns, \t\r\n#threshold-dist-btns,\r\n#weights-dist-btns \r\n\t/*#weights-btns,*/\r\n\t{\r\n\t\tmargin-bottom: 0.5em;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/my-buttons.css":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/my-buttons.css ***!
  \*******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;utf8,<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="%23ccc" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"/></svg> */ "data:image/svg+xml;utf8,<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"%23ccc\" d=\"M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z\"/></svg>"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _preisachjxg_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n\n/*\nI like this style of radio button\nHowever it is a  bit of a pain in the ass\nthe button is hidden so it does not have dimensions\n...must use parent container \n...and adjacent label\n*/\n\n.radiobtn-container {\n\tbackground-color: #444;\n\tcolor:\t\t \t#aaa;\n\tcursor: \t\tpointer;\n\tborder: \t\tnone;\n\twidth: \t\t\t100%;\n\tborder-radius: \t0.5em;\n\t/*height: \t\t2.0em;*/\n}\n\n.radiobtn-half-container {\n\t/*width: 50%;*/\n\t/*display: inline-block;*/\n\tmargin-bottom: 0.5em;\n}\n\n.radiobtn {\n\tvisibility: hidden;\n\tposition: \tabsolute;\n\t/*height: 2em;*/\n}\n\n.radiobtn-container > label {\n\tfont-size: \t\t1.5em;\n\tpadding-top: \t0.5em;\n\theight: \t\t2.0em;\n\tborder-radius: \t0.5em;\n}\n\n.radiobtn-half-container > label {\n\tdisplay: \t\tblock;\n\t/*border: \t\tnone;*/\n\t/*cursor: \t\tpointer;*/\n\t/*filter: brightness(130%);*/\n\tborder-radius: \t0.5em;\n\tfont-size: \t\t1.4em;\n\tpadding: \t\t0.25em 0.4em;\n\theight: 1.4em;\n}\n\n.box,  .box-half {\n\tbackground-color: \t#888;\n}\n\n.box {\n\twidth: \t\t1.5em;\n\theight: \t1.5em;\n\tfloat: \t\tright;\n\tmargin-right: \t1em;\n\tborder-radius: \t0.4em;\n}\n\n.box-half {\n\twidth: 1.2em;\n\theight: 1.2em;\n\tfloat: right;\n\t/*margin-right: 0.5em;*/\n\tborder-radius: \t0.3em;\n}\n\n\ninput[type=\"radio\"]:checked + label\n{\n\tbackground-color: #555;\n\tfilter: brightness(130%);\n}\n\ninput[type=\"radio\"]:checked +label>b.box,\ninput[type=\"radio\"]:checked +label>b.box-half\n\t{\n\t\tbackground-color: \t#999;\n\t\tcolor: \t\t\t\t#aaa;\n\t\tbackground-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n\n}", "",{"version":3,"sources":["webpack://./../RecruitmentForm/src/css/my-buttons.css"],"names":[],"mappings":";;AAEA;;;;;;CAMC;;AAED;CACC,sBAAsB;CACtB,cAAc;CACd,iBAAiB;CACjB,cAAc;CACd,cAAc;CACd,qBAAqB;CACrB,mBAAmB;AACpB;;AAEA;CACC,cAAc;CACd,yBAAyB;CACzB,oBAAoB;AACrB;;AAEA;CACC,kBAAkB;CAClB,mBAAmB;CACnB,eAAe;AAChB;;AAEA;CACC,kBAAkB;CAClB,mBAAmB;CACnB,eAAe;CACf,qBAAqB;AACtB;;AAEA;CACC,gBAAgB;CAChB,kBAAkB;CAClB,qBAAqB;CACrB,4BAA4B;CAC5B,qBAAqB;CACrB,kBAAkB;CAClB,uBAAuB;CACvB,aAAa;AACd;;AAEA;CACC,uBAAuB;AACxB;;AAEA;CACC,cAAc;CACd,cAAc;CACd,cAAc;CACd,kBAAkB;CAClB,qBAAqB;AACtB;;AAEA;CACC,YAAY;CACZ,aAAa;CACb,YAAY;CACZ,uBAAuB;CACvB,qBAAqB;AACtB;;;AAGA;;CAEC,sBAAsB;CACtB,wBAAwB;AACzB;;AAEA;;;EAGE,uBAAuB;EACvB,eAAe;EACf,yDAAmT;;AAErT","sourcesContent":["\n\n/*\nI like this style of radio button\nHowever it is a  bit of a pain in the ass\nthe button is hidden so it does not have dimensions\n...must use parent container \n...and adjacent label\n*/\n\n.radiobtn-container {\n\tbackground-color: #444;\n\tcolor:\t\t \t#aaa;\n\tcursor: \t\tpointer;\n\tborder: \t\tnone;\n\twidth: \t\t\t100%;\n\tborder-radius: \t0.5em;\n\t/*height: \t\t2.0em;*/\n}\n\n.radiobtn-half-container {\n\t/*width: 50%;*/\n\t/*display: inline-block;*/\n\tmargin-bottom: 0.5em;\n}\n\n.radiobtn {\n\tvisibility: hidden;\n\tposition: \tabsolute;\n\t/*height: 2em;*/\n}\n\n.radiobtn-container > label {\n\tfont-size: \t\t1.5em;\n\tpadding-top: \t0.5em;\n\theight: \t\t2.0em;\n\tborder-radius: \t0.5em;\n}\n\n.radiobtn-half-container > label {\n\tdisplay: \t\tblock;\n\t/*border: \t\tnone;*/\n\t/*cursor: \t\tpointer;*/\n\t/*filter: brightness(130%);*/\n\tborder-radius: \t0.5em;\n\tfont-size: \t\t1.4em;\n\tpadding: \t\t0.25em 0.4em;\n\theight: 1.4em;\n}\n\n.box,  .box-half {\n\tbackground-color: \t#888;\n}\n\n.box {\n\twidth: \t\t1.5em;\n\theight: \t1.5em;\n\tfloat: \t\tright;\n\tmargin-right: \t1em;\n\tborder-radius: \t0.4em;\n}\n\n.box-half {\n\twidth: 1.2em;\n\theight: 1.2em;\n\tfloat: right;\n\t/*margin-right: 0.5em;*/\n\tborder-radius: \t0.3em;\n}\n\n\ninput[type=\"radio\"]:checked + label\n{\n\tbackground-color: #555;\n\tfilter: brightness(130%);\n}\n\ninput[type=\"radio\"]:checked +label>b.box,\ninput[type=\"radio\"]:checked +label>b.box-half\n\t{\n\t\tbackground-color: \t#999;\n\t\tcolor: \t\t\t\t#aaa;\n\t\tbackground-image: url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"%23ccc\" d=\"M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z\"/></svg>');\n\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/mySlider.css":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/mySlider.css ***!
  \*****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\r\nhttps://refreshless.com/nouislider/more/\r\n.noUi-target \tThis class is added to the element noUiSlider.create() is called on. Has border, background and other styling properties to establish the slider design and background.\r\n.noUi-base \tThe slider bar. Serves as the calculating point for the slider handles, and has no visible styling.\r\n.noUi-origin \tThe elements connected to the base, defining the handle locations.\r\n.noUi-handle \tThe actual, visible handles.\r\n.noUi-touch-area \tAn empty div within .noUi-handle. Can be styled larger if desired.\r\n.noUi-connect \tStyling class for setting properties related to the slider connect segment.\r\n.noUi-state-tap \tThis class is added when the slider bar is tapped or clicked. A slider with this call will reject any user input. noUiSlider will remove this class after 300ms, leaving that timespan to perform visual animations.\r\n[disabled] \tApply this to your slider to disable it, and make sure the slider visuals reflect the disabled state.\r\n*/\r\n/*.noUi-target {}\r\n.noUi-base {}\r\n.noUi-origin {}\r\n.noUi-handle {}\r\n.noUi-touch-area {}\r\n.noUi-connect {}\r\n.noUi-state-tap {}*/\r\n/*[disabled]*/\r\n\r\n/* Handle stripes;\r\n */\r\n.noUi-handle:before,\r\n.noUi-handle:after {\r\n\tcontent: \"\";\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\theight: 0px !important;\r\n\twidth: 0px !important;\r\n\tbackground: #E8E7E6;\r\n\tleft: 14px;\r\n\ttop: 6px;\r\n}\r\n.noUi-handle:after {\r\n\tleft: 17px;\r\n}\r\n.noUi-vertical .noUi-handle:before,\r\n.noUi-vertical .noUi-handle:after {\r\n\twidth: 0px !important;\r\n\theight: 0px !important;\r\n\tleft: 6px;\r\n\ttop: 14px;\r\n}\r\n.noUi-vertical .noUi-handle:after {\r\n\ttop: 17px;\r\n}\r\n\r\n\r\n.noUi-vertical .noUi-handle,\r\n.noUi-vertical .noUi-handle,\r\n.nou .noUi-handle {\r\n\twidth: 1.5rem !important;\r\n\theight: 1.5rem !important;\r\n\tborder: none;\r\n\tborder-radius: 50% 50% 0;\r\n\t/*box-shadow: $thumb-sh;*/\r\n}\r\n\r\n\r\n.nou .noUi-handle-lower {\r\n\t/*transform: translateY(2rem) rotate(45deg) scale(1);*/\r\n\ttransform: translateX(-2rem) rotate(-45deg) scale(1);\r\n\t/*transform: translateX(-2rem);*/\r\n}\r\n\r\n.nou .noUi-handle-upper {\r\n\t/*transform: translateY(2rem) rotate(45deg) scale(1);*/\r\n\ttransform: translateX(2rem) rotate(135deg) scale(1);\r\n\t/*transform: translateX(-2rem);*/\r\n}\r\n\r\n.nou .noUi-connects {\r\n\tbackground: linear-gradient(green 50%, gray 50%);\r\n}\r\n\r\n.nou .noUi-connect {\r\n\t/*transform: rotate(-45deg);*/\r\n\tbackground: repeating-linear-gradient(\r\n\t\t\t\t\t-45deg, \r\n\t\t\t\t\tgreen,\r\n\t\t\t\t\tgreen 1em,\r\n\t\t\t\t\tgray 1em,\r\n\t\t\t\t\tgray 2em\r\n\t\t\t\t);\r\n}\r\n\r\n", "",{"version":3,"sources":["webpack://./../RecruitmentForm/src/css/mySlider.css"],"names":[],"mappings":"AAAA;;;;;;;;;;CAUC;AACD;;;;;;mBAMmB;AACnB,aAAa;;AAEb;EACE;AACF;;CAEC,WAAW;CACX,cAAc;CACd,kBAAkB;CAClB,sBAAsB;CACtB,qBAAqB;CACrB,mBAAmB;CACnB,UAAU;CACV,QAAQ;AACT;AACA;CACC,UAAU;AACX;AACA;;CAEC,qBAAqB;CACrB,sBAAsB;CACtB,SAAS;CACT,SAAS;AACV;AACA;CACC,SAAS;AACV;;;AAGA;;;CAGC,wBAAwB;CACxB,yBAAyB;CACzB,YAAY;CACZ,wBAAwB;CACxB,yBAAyB;AAC1B;;;AAGA;CACC,sDAAsD;CACtD,oDAAoD;CACpD,gCAAgC;AACjC;;AAEA;CACC,sDAAsD;CACtD,mDAAmD;CACnD,gCAAgC;AACjC;;AAEA;CACC,gDAAgD;AACjD;;AAEA;CACC,6BAA6B;CAC7B;;;;;;KAMI;AACL","sourcesContent":["/*\r\nhttps://refreshless.com/nouislider/more/\r\n.noUi-target \tThis class is added to the element noUiSlider.create() is called on. Has border, background and other styling properties to establish the slider design and background.\r\n.noUi-base \tThe slider bar. Serves as the calculating point for the slider handles, and has no visible styling.\r\n.noUi-origin \tThe elements connected to the base, defining the handle locations.\r\n.noUi-handle \tThe actual, visible handles.\r\n.noUi-touch-area \tAn empty div within .noUi-handle. Can be styled larger if desired.\r\n.noUi-connect \tStyling class for setting properties related to the slider connect segment.\r\n.noUi-state-tap \tThis class is added when the slider bar is tapped or clicked. A slider with this call will reject any user input. noUiSlider will remove this class after 300ms, leaving that timespan to perform visual animations.\r\n[disabled] \tApply this to your slider to disable it, and make sure the slider visuals reflect the disabled state.\r\n*/\r\n/*.noUi-target {}\r\n.noUi-base {}\r\n.noUi-origin {}\r\n.noUi-handle {}\r\n.noUi-touch-area {}\r\n.noUi-connect {}\r\n.noUi-state-tap {}*/\r\n/*[disabled]*/\r\n\r\n/* Handle stripes;\r\n */\r\n.noUi-handle:before,\r\n.noUi-handle:after {\r\n\tcontent: \"\";\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\theight: 0px !important;\r\n\twidth: 0px !important;\r\n\tbackground: #E8E7E6;\r\n\tleft: 14px;\r\n\ttop: 6px;\r\n}\r\n.noUi-handle:after {\r\n\tleft: 17px;\r\n}\r\n.noUi-vertical .noUi-handle:before,\r\n.noUi-vertical .noUi-handle:after {\r\n\twidth: 0px !important;\r\n\theight: 0px !important;\r\n\tleft: 6px;\r\n\ttop: 14px;\r\n}\r\n.noUi-vertical .noUi-handle:after {\r\n\ttop: 17px;\r\n}\r\n\r\n\r\n.noUi-vertical .noUi-handle,\r\n.noUi-vertical .noUi-handle,\r\n.nou .noUi-handle {\r\n\twidth: 1.5rem !important;\r\n\theight: 1.5rem !important;\r\n\tborder: none;\r\n\tborder-radius: 50% 50% 0;\r\n\t/*box-shadow: $thumb-sh;*/\r\n}\r\n\r\n\r\n.nou .noUi-handle-lower {\r\n\t/*transform: translateY(2rem) rotate(45deg) scale(1);*/\r\n\ttransform: translateX(-2rem) rotate(-45deg) scale(1);\r\n\t/*transform: translateX(-2rem);*/\r\n}\r\n\r\n.nou .noUi-handle-upper {\r\n\t/*transform: translateY(2rem) rotate(45deg) scale(1);*/\r\n\ttransform: translateX(2rem) rotate(135deg) scale(1);\r\n\t/*transform: translateX(-2rem);*/\r\n}\r\n\r\n.nou .noUi-connects {\r\n\tbackground: linear-gradient(green 50%, gray 50%);\r\n}\r\n\r\n.nou .noUi-connect {\r\n\t/*transform: rotate(-45deg);*/\r\n\tbackground: repeating-linear-gradient(\r\n\t\t\t\t\t-45deg, \r\n\t\t\t\t\tgreen,\r\n\t\t\t\t\tgreen 1em,\r\n\t\t\t\t\tgray 1em,\r\n\t\t\t\t\tgray 2em\r\n\t\t\t\t);\r\n}\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/pairs.css":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/pairs.css ***!
  \**************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n#btn-container-pairs-lattice,\n#btn-container-pairs-continuous {\n\t/*width: 48%;*/\n}\n\n#threshold-dist-btns {\n\t/*float: left;*/\n\t/*width: 48%;*/\n}\n\n#threshold-dist-details {\n\t/*width: 48%;*/\n\t/*float: right;*/\n}\n\n#thresholds-dist-normal,\n#thresholds-dist-width {\n\t/*width: 48%;*/\n\t/*float: left;*/\n}\n\n#btn-container-pairs-lattice{\n\tfloat:  left;\n}\n\n#btn-container-pairs-continuous {\n\tfloat: right;\n}\n\n/*btn-container-thresholds-dist-uniform*/\n/*btn-container-thresholds-dist-normal*/\n/*btn-container-thresholds-dist-width*/", "",{"version":3,"sources":["webpack://./../RecruitmentForm/src/css/pairs.css"],"names":[],"mappings":";AACA;;CAEC,cAAc;AACf;;AAEA;CACC,eAAe;CACf,cAAc;AACf;;AAEA;CACC,cAAc;CACd,gBAAgB;AACjB;;AAEA;;CAEC,cAAc;CACd,eAAe;AAChB;;AAEA;CACC,YAAY;AACb;;AAEA;CACC,YAAY;AACb;;AAEA,wCAAwC;AACxC,uCAAuC;AACvC,sCAAsC","sourcesContent":["\n#btn-container-pairs-lattice,\n#btn-container-pairs-continuous {\n\t/*width: 48%;*/\n}\n\n#threshold-dist-btns {\n\t/*float: left;*/\n\t/*width: 48%;*/\n}\n\n#threshold-dist-details {\n\t/*width: 48%;*/\n\t/*float: right;*/\n}\n\n#thresholds-dist-normal,\n#thresholds-dist-width {\n\t/*width: 48%;*/\n\t/*float: left;*/\n}\n\n#btn-container-pairs-lattice{\n\tfloat:  left;\n}\n\n#btn-container-pairs-continuous {\n\tfloat: right;\n}\n\n/*btn-container-thresholds-dist-uniform*/\n/*btn-container-thresholds-dist-normal*/\n/*btn-container-thresholds-dist-width*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/settings-style.css":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/settings-style.css ***!
  \***********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_tags_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./tags.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/tags.css");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_my_buttons_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./my-buttons.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/my-buttons.css");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_btns_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./btns.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/btns.css");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_pairs_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./pairs.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/pairs.css");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_weights_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./weights.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/weights.css");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_mySlider_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! -!../../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./mySlider.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/mySlider.css");
// Imports








var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_tags_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_my_buttons_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_btns_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_pairs_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_weights_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
___CSS_LOADER_EXPORT___.i(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_mySlider_css__WEBPACK_IMPORTED_MODULE_7__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n * settings-style.css \n * @author md 2021\n */\n\nform {\n\twidth: 48vh;\n\tmargin: auto; \n\t/*padding: 12px; */\n\tpadding: 0.75em;\n\tbox-sizing: border-box;\n}\n\n#settings-form {\n\theight: 100%;\n\twidth: 100%;\n\tpadding-top: 0px;\n\tpadding-bottom: 0px;\n}\n\n#settings-fields {\n\twidth: 100%;\n\theight: calc(100vh - 16.75em); \t/*trial and error*/\n\toverflow-x: auto;\n\toverflow-y: scroll;\n\tdisplay: inline-block;\n\tscrollbar-color: #ccc #333 ;\n  \t/*scrollbar-width: thin;*/\n}\n\n.support-label,\n.variable-label,\n.pairs-label,\n.dist-label,\n.recruitable-label,\n.io-label,\n.recruitable-label,\n.eq-label\n{\n\tmin-width: 7.7rem;\n\tfont-size: 1.1em;\n\t/*display: inline-block;*/\n}\n\n#fields-thresholds { padding: 0; }\n#fields-thresholds > legend { padding: 0 1em; }\n\n#settings-table-header {\n\ttext-align: center;\n\tfont-size: 0.75em;\n\tfont-family: Sans-Serif;\n}\n.support-div { \n\theight: 2em;\n}\n\n.engraved-line {\n\twidth:100%;\n\theight:1px;\n\tbackground:#fff;\n\tborder-top:solid 1px #000;\n\topacity:0.8;\n\tmargin-bottom: 0.5em;\n}\n\n.floating-slider {\n\tposition:relative;\n\t/*position: absolute;*/\n\ttop: -1.8em;\n\t/*float: right;*/\n\twidth: 10.25em;\n\tleft: 10em;\n\t/*height: 13px;*/\n\tborder: 0;\n\t-webkit-transform: rotate(270deg);\n\t-moz-transform: rotate(270deg);\n\ttransform: rotate(270deg);\n\tbackground-color: black;\n}\n\n\n#tbl-recruitability {\n\t/*float: left;*/\n\tdisplay: inline-block;\n\t/*width: 100%;*/\n\t/*width: 10rem;*/\n\theight: 12rem;\n\t/*margin: 1rem 0 0 0;*/\n  \tposition: relative;\n}\n\n.tr-recruitability {\n\theight: 4rem;\n}\n\n#tr-open {\n\tvertical-align: top;\n}\n\n#tr-recruitable {\n\tvertical-align: middle;\n}\n\n#tr-closed {\n\tvertical-align: bottom;\n}\n\n\n#ul-recruitability {\n\tpadding: 0px;\n\tmargin-top: 0;\n\t/*margin-bottom: 1em;*/\n}\n#ul-recruitable{\n\tlist-style: none;\n\t/*height: auto;*/\n\t/*display: block;*/\n\t/*margin-bottom: 1em;*/\n\tpadding: 0px;\n}\n\n.li-recruitable {\n\t/*float: left;*/\n\t/*width: calc(100%/3);*/\n\theight: 4rem;\n\twidth: max-content;\n\t/*text-align: center;*/\n\tdisplay: inline-block;\n\t/*display: block;*/\n\t/*margin-bottom: 1.0em;*/\n\tvertical-align: bottom;\n\tbackground-color: rgba(100, 100, 100, .5);\n\tbox-sizing: border-box;\n}\n\n/*\n#recruitability::first-child {\n\tvertical-align: top;\n}\n#recruitability::last-child {\n\tvertical-align: bottom;\n}\n*/\n\n.lir {\n\t/*margin: auto;*/\n\tbackground-color: rgba(200, 200, 200, .5);\n\tdisplay: inline-block;\n\tvertical-align: bottom;\n\tposition: relative;\n}\n\n.li-recruitable > label {\n\tpadding-bottom: 1.0em;\n}\n\n\n/*.noUi-horizontal */\n#recruitable-slider { \n\t/*height: 100%;*/\n\theight: 11.4rem;\n\t/*width: 100%;*/\n\tbottom: 0.1rem;\n\tmargin: 0 3rem; \n\tfloat: left;\n}\n\n#recruit-slider-container {\n\t/*height: 100%;*/\n\t/*width: 100%;*/\n\t/*padding-left: 2rem;\n\tpadding-top: 2rem;\n\tpadding-right: 2rem;\n\tpadding-bottom: 2rem;*/\n\tdisplay: inline-block;\n}\n\n.noUi-vertical .noUi-handle {\n\tbottom: -10px !important;\n}\n\n\n#ul-instructions{list-style: none;}\n.li-instructions{}\n\n\n\n#elements-size {\n\tmargin-bottom: 0.5em;\n}\n\n/*#jxg-In_bip {\t\n\tborder: none;\t\n\tborder-radius: .5em;\n\tbox-shadow: -.125em 0 .25em #928886,  inset -1px 0 1px #fff;\n\tbackground: radial-gradient(#ebe1e0 10%, rgba(235, 225, 224, 0.2) 10%, rgba(235, 225, 224, 0) 72%) no-repeat 50% 50%,\n\t\t\t\tradial-gradient(at 100% 50%, #e9dfde, #eae1de 71%, transparent 71%) no-repeat 2.5em 50%, \n\t\t\t\tlinear-gradient(90deg, #e9dfde, #d0c8c6) no-repeat 100% 50%, \n\t\t\t\tradial-gradient(at 0 50%, #d0c6c5, #c6baba 71%, transparent 71%) no-repeat 0.75em 50%, \n\t\t\t\tlinear-gradient(90deg, #e3d9d8, #d0c6c5) no-repeat 0 50%, \n\t\t\t\tlinear-gradient(#cdc0c0, #fcf5ef, #fcf5ef, #cdc0c0);\n\tbackground-size: 0.825em 100%; \n}*/\n\n .dist-label {\n \tposition: relative;\n \tleft: 1.5em;\n }", "",{"version":3,"sources":["webpack://./../RecruitmentForm/src/css/settings-style.css"],"names":[],"mappings":"AAAA;;;EAGE;;AASF;CACC,WAAW;CACX,YAAY;CACZ,kBAAkB;CAClB,eAAe;CACf,sBAAsB;AACvB;;AAEA;CACC,YAAY;CACZ,WAAW;CACX,gBAAgB;CAChB,mBAAmB;AACpB;;AAEA;CACC,WAAW;CACX,6BAA6B,GAAG,kBAAkB;CAClD,gBAAgB;CAChB,kBAAkB;CAClB,qBAAqB;CACrB,2BAA2B;GACzB,yBAAyB;AAC5B;;AAEA;;;;;;;;;CASC,iBAAiB;CACjB,gBAAgB;CAChB,yBAAyB;AAC1B;;AAEA,qBAAqB,UAAU,EAAE;AACjC,8BAA8B,cAAc,EAAE;;AAE9C;CACC,kBAAkB;CAClB,iBAAiB;CACjB,uBAAuB;AACxB;AACA;CACC,WAAW;AACZ;;AAEA;CACC,UAAU;CACV,UAAU;CACV,eAAe;CACf,yBAAyB;CACzB,WAAW;CACX,oBAAoB;AACrB;;AAEA;CACC,iBAAiB;CACjB,sBAAsB;CACtB,WAAW;CACX,gBAAgB;CAChB,cAAc;CACd,UAAU;CACV,gBAAgB;CAChB,SAAS;CACT,iCAAiC;CACjC,8BAA8B;CAC9B,yBAAyB;CACzB,uBAAuB;AACxB;;;AAGA;CACC,eAAe;CACf,qBAAqB;CACrB,eAAe;CACf,gBAAgB;CAChB,aAAa;CACb,sBAAsB;GACpB,kBAAkB;AACrB;;AAEA;CACC,YAAY;AACb;;AAEA;CACC,mBAAmB;AACpB;;AAEA;CACC,sBAAsB;AACvB;;AAEA;CACC,sBAAsB;AACvB;;;AAGA;CACC,YAAY;CACZ,aAAa;CACb,sBAAsB;AACvB;AACA;CACC,gBAAgB;CAChB,gBAAgB;CAChB,kBAAkB;CAClB,sBAAsB;CACtB,YAAY;AACb;;AAEA;CACC,eAAe;CACf,uBAAuB;CACvB,YAAY;CACZ,kBAAkB;CAClB,sBAAsB;CACtB,qBAAqB;CACrB,kBAAkB;CAClB,wBAAwB;CACxB,sBAAsB;CACtB,yCAAyC;CACzC,sBAAsB;AACvB;;AAEA;;;;;;;CAOC;;AAED;CACC,gBAAgB;CAChB,yCAAyC;CACzC,qBAAqB;CACrB,sBAAsB;CACtB,kBAAkB;AACnB;;AAEA;CACC,qBAAqB;AACtB;;;AAGA,oBAAoB;AACpB;CACC,gBAAgB;CAChB,eAAe;CACf,eAAe;CACf,cAAc;CACd,cAAc;CACd,WAAW;AACZ;;AAEA;CACC,gBAAgB;CAChB,eAAe;CACf;;;uBAGsB;CACtB,qBAAqB;AACtB;;AAEA;CACC,wBAAwB;AACzB;;;AAGA,iBAAiB,gBAAgB,CAAC;AAClC,iBAAiB;;;;AAIjB;CACC,oBAAoB;AACrB;;AAEA;;;;;;;;;;;EAWE;;CAED;EACC,kBAAkB;EAClB,WAAW;CACZ","sourcesContent":["/*\n * settings-style.css \n * @author md 2021\n */\n\n@import './tags.css';\n@import './my-buttons.css';\n@import './btns.css';\n@import './pairs.css';\n@import './weights.css';\n@import './mySlider.css';\n\nform {\n\twidth: 48vh;\n\tmargin: auto; \n\t/*padding: 12px; */\n\tpadding: 0.75em;\n\tbox-sizing: border-box;\n}\n\n#settings-form {\n\theight: 100%;\n\twidth: 100%;\n\tpadding-top: 0px;\n\tpadding-bottom: 0px;\n}\n\n#settings-fields {\n\twidth: 100%;\n\theight: calc(100vh - 16.75em); \t/*trial and error*/\n\toverflow-x: auto;\n\toverflow-y: scroll;\n\tdisplay: inline-block;\n\tscrollbar-color: #ccc #333 ;\n  \t/*scrollbar-width: thin;*/\n}\n\n.support-label,\n.variable-label,\n.pairs-label,\n.dist-label,\n.recruitable-label,\n.io-label,\n.recruitable-label,\n.eq-label\n{\n\tmin-width: 7.7rem;\n\tfont-size: 1.1em;\n\t/*display: inline-block;*/\n}\n\n#fields-thresholds { padding: 0; }\n#fields-thresholds > legend { padding: 0 1em; }\n\n#settings-table-header {\n\ttext-align: center;\n\tfont-size: 0.75em;\n\tfont-family: Sans-Serif;\n}\n.support-div { \n\theight: 2em;\n}\n\n.engraved-line {\n\twidth:100%;\n\theight:1px;\n\tbackground:#fff;\n\tborder-top:solid 1px #000;\n\topacity:0.8;\n\tmargin-bottom: 0.5em;\n}\n\n.floating-slider {\n\tposition:relative;\n\t/*position: absolute;*/\n\ttop: -1.8em;\n\t/*float: right;*/\n\twidth: 10.25em;\n\tleft: 10em;\n\t/*height: 13px;*/\n\tborder: 0;\n\t-webkit-transform: rotate(270deg);\n\t-moz-transform: rotate(270deg);\n\ttransform: rotate(270deg);\n\tbackground-color: black;\n}\n\n\n#tbl-recruitability {\n\t/*float: left;*/\n\tdisplay: inline-block;\n\t/*width: 100%;*/\n\t/*width: 10rem;*/\n\theight: 12rem;\n\t/*margin: 1rem 0 0 0;*/\n  \tposition: relative;\n}\n\n.tr-recruitability {\n\theight: 4rem;\n}\n\n#tr-open {\n\tvertical-align: top;\n}\n\n#tr-recruitable {\n\tvertical-align: middle;\n}\n\n#tr-closed {\n\tvertical-align: bottom;\n}\n\n\n#ul-recruitability {\n\tpadding: 0px;\n\tmargin-top: 0;\n\t/*margin-bottom: 1em;*/\n}\n#ul-recruitable{\n\tlist-style: none;\n\t/*height: auto;*/\n\t/*display: block;*/\n\t/*margin-bottom: 1em;*/\n\tpadding: 0px;\n}\n\n.li-recruitable {\n\t/*float: left;*/\n\t/*width: calc(100%/3);*/\n\theight: 4rem;\n\twidth: max-content;\n\t/*text-align: center;*/\n\tdisplay: inline-block;\n\t/*display: block;*/\n\t/*margin-bottom: 1.0em;*/\n\tvertical-align: bottom;\n\tbackground-color: rgba(100, 100, 100, .5);\n\tbox-sizing: border-box;\n}\n\n/*\n#recruitability::first-child {\n\tvertical-align: top;\n}\n#recruitability::last-child {\n\tvertical-align: bottom;\n}\n*/\n\n.lir {\n\t/*margin: auto;*/\n\tbackground-color: rgba(200, 200, 200, .5);\n\tdisplay: inline-block;\n\tvertical-align: bottom;\n\tposition: relative;\n}\n\n.li-recruitable > label {\n\tpadding-bottom: 1.0em;\n}\n\n\n/*.noUi-horizontal */\n#recruitable-slider { \n\t/*height: 100%;*/\n\theight: 11.4rem;\n\t/*width: 100%;*/\n\tbottom: 0.1rem;\n\tmargin: 0 3rem; \n\tfloat: left;\n}\n\n#recruit-slider-container {\n\t/*height: 100%;*/\n\t/*width: 100%;*/\n\t/*padding-left: 2rem;\n\tpadding-top: 2rem;\n\tpadding-right: 2rem;\n\tpadding-bottom: 2rem;*/\n\tdisplay: inline-block;\n}\n\n.noUi-vertical .noUi-handle {\n\tbottom: -10px !important;\n}\n\n\n#ul-instructions{list-style: none;}\n.li-instructions{}\n\n\n\n#elements-size {\n\tmargin-bottom: 0.5em;\n}\n\n/*#jxg-In_bip {\t\n\tborder: none;\t\n\tborder-radius: .5em;\n\tbox-shadow: -.125em 0 .25em #928886,  inset -1px 0 1px #fff;\n\tbackground: radial-gradient(#ebe1e0 10%, rgba(235, 225, 224, 0.2) 10%, rgba(235, 225, 224, 0) 72%) no-repeat 50% 50%,\n\t\t\t\tradial-gradient(at 100% 50%, #e9dfde, #eae1de 71%, transparent 71%) no-repeat 2.5em 50%, \n\t\t\t\tlinear-gradient(90deg, #e9dfde, #d0c8c6) no-repeat 100% 50%, \n\t\t\t\tradial-gradient(at 0 50%, #d0c6c5, #c6baba 71%, transparent 71%) no-repeat 0.75em 50%, \n\t\t\t\tlinear-gradient(90deg, #e3d9d8, #d0c6c5) no-repeat 0 50%, \n\t\t\t\tlinear-gradient(#cdc0c0, #fcf5ef, #fcf5ef, #cdc0c0);\n\tbackground-size: 0.825em 100%; \n}*/\n\n .dist-label {\n \tposition: relative;\n \tleft: 1.5em;\n }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/tags.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/tags.css ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\nfieldset {\n\t/*width: 100%;*/\n\tbox-sizing: border-box;\n}\n\n\ninput {\n\tbackground-color: #333;\n\t/*color: #181818;*/\n\tfont-size: 1.0em;\n\tcolor: #ccc;\n\tborder:\tnone;\n\theight: 1.75em;\n\tpadding-left: 5px;\n\tvertical-align: middle;\n\tbox-sizing: border-box;\n}\n\ninput[type='number'] {\n\twidth: 4em;\n}\n\ninput[type='text'] {\n\t/*height: 1.5em;*/\n\twidth: 20;\n}\n\nlabel {\n\tvertical-align: middle;\t\n}\n\nlabel.left {\n\tfloat: left;\n\twidth: 5em;\n\t/*margin-bottom: 0.1em;*/\n}\n\n\nbutton {\n\tbackground-color: #333;\n\tborder-radius: 5px;\t\n\tcolor: #ccc;\n}\n\ninput[type='radio'] {\n\tpadding: 0;\n\tcursor: pointer;\n}\n\ninput[type='range'] {\n\twidth: 10em;\n}\n\ninput[type='checkbox'] {\n\theight: 1em;\n\tcolor: #ccc;\n\tborder: none;\n}\n\ninput[type='checkbox'][disabled] {\n\topacity: 0.5 !important;\n}\n\n", "",{"version":3,"sources":["webpack://./../RecruitmentForm/src/css/tags.css"],"names":[],"mappings":";AACA;CACC,eAAe;CACf,sBAAsB;AACvB;;;AAGA;CACC,sBAAsB;CACtB,kBAAkB;CAClB,gBAAgB;CAChB,WAAW;CACX,YAAY;CACZ,cAAc;CACd,iBAAiB;CACjB,sBAAsB;CACtB,sBAAsB;AACvB;;AAEA;CACC,UAAU;AACX;;AAEA;CACC,iBAAiB;CACjB,SAAS;AACV;;AAEA;CACC,sBAAsB;AACvB;;AAEA;CACC,WAAW;CACX,UAAU;CACV,wBAAwB;AACzB;;;AAGA;CACC,sBAAsB;CACtB,kBAAkB;CAClB,WAAW;AACZ;;AAEA;CACC,UAAU;CACV,eAAe;AAChB;;AAEA;CACC,WAAW;AACZ;;AAEA;CACC,WAAW;CACX,WAAW;CACX,YAAY;AACb;;AAEA;CACC,uBAAuB;AACxB","sourcesContent":["\nfieldset {\n\t/*width: 100%;*/\n\tbox-sizing: border-box;\n}\n\n\ninput {\n\tbackground-color: #333;\n\t/*color: #181818;*/\n\tfont-size: 1.0em;\n\tcolor: #ccc;\n\tborder:\tnone;\n\theight: 1.75em;\n\tpadding-left: 5px;\n\tvertical-align: middle;\n\tbox-sizing: border-box;\n}\n\ninput[type='number'] {\n\twidth: 4em;\n}\n\ninput[type='text'] {\n\t/*height: 1.5em;*/\n\twidth: 20;\n}\n\nlabel {\n\tvertical-align: middle;\t\n}\n\nlabel.left {\n\tfloat: left;\n\twidth: 5em;\n\t/*margin-bottom: 0.1em;*/\n}\n\n\nbutton {\n\tbackground-color: #333;\n\tborder-radius: 5px;\t\n\tcolor: #ccc;\n}\n\ninput[type='radio'] {\n\tpadding: 0;\n\tcursor: pointer;\n}\n\ninput[type='range'] {\n\twidth: 10em;\n}\n\ninput[type='checkbox'] {\n\theight: 1em;\n\tcolor: #ccc;\n\tborder: none;\n}\n\ninput[type='checkbox'][disabled] {\n\topacity: 0.5 !important;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/weights.css":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/weights.css ***!
  \****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjxg/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _preisachjxg_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_preisachjxg_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n#weights-btns {\n\t/*float: left;*/\n\t/*width: 48%;*/\n}\n\n#weights-details {\n\t/*width: 48%;*/\n\t/*float: right;*/\n}\n\n#thresholds-dist-normal,\n#thresholds-dist-width {\n\t/*width: 48%;*/\n\t/*float: left;*/\n}", "",{"version":3,"sources":["webpack://./../RecruitmentForm/src/css/weights.css"],"names":[],"mappings":";AACA;CACC,eAAe;CACf,cAAc;AACf;;AAEA;CACC,cAAc;CACd,gBAAgB;AACjB;;AAEA;;CAEC,cAAc;CACd,eAAe;AAChB","sourcesContent":["\n#weights-btns {\n\t/*float: left;*/\n\t/*width: 48%;*/\n}\n\n#weights-details {\n\t/*width: 48%;*/\n\t/*float: right;*/\n}\n\n#thresholds-dist-normal,\n#thresholds-dist-width {\n\t/*width: 48%;*/\n\t/*float: left;*/\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./src/css/style.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./src/css/style.css ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n * style.css \n * @author md 2020\n */\nbody, h1 {\n\tbox-sizing: border-box;\n\t/*background-color: black;*/\t\n\tbackground-color: #181818;\n    color: #CCC;\n    /*BOGUS - media query and 4:3*/\n    width: calc(3*48vh);\n\tmargin: auto; \n\toverflow: hidden;\n}\nspan { display: inline-block; }\n\n/*dialog + .backdrop, dialog::backdrop{ background: rgba(0,0,0,0.7) !important; }*/\n/*dialog h2, dialog h3 { margin-bottom: 0.2em; }*/\n/*.menu {\n\tposition:absolute;\n\tmargin: 0;\n\tz-index: 1;\n}*/\n\n#out-out-panel {\n\tfloat:left;\n\theight: 100vh;\n\t/*width:100vh;*/\n\twidth: 48vh;\t\n}\n\n#main-panel {\n\twidth: 48vh; /*calc(60% -4vh);*/\n\theight: 100vh;\n\tfloat: left;\n\t/*margin:0px 20px;*/\n}\n\n#settings-panel {\n\t/*float:right;\t*/\n\tfloat: left;\n\twidth: 48vh;\n\theight: 100vh;\n\t/*overflow-y: scroll;\n\toverflow-x: auto;*/\n\t/*direction: rtl;*/\n}\n\n.prelim-div {\n\t/*width: 75%;*/\n\twidth: 14rem;\n\t/*margin: auto;*/\n\tpadding-left: 2.5rem;\n}\n\n.Preisach-button {\n\twidth: 100%;\n\tfont-size: larger;\n\theight: 3rem;\n\tbackground-color: #555;\n\tborder-radius: 0.5rem;\n\tborder: none;\n\t/*margin: auto;*/\n\tmargin-bottom: 1rem;\t\n}\n\n.jxgbox {\n\tbox-sizing: border-box;\n\twidth: 48vh;\n\theight: 48vh;\n\tbackground-color: #212128 !important;\n\t/*background-color: #121220 !important;*/\n\t/*background-color: #121220;*/\n\t/*border: 3px #222 double;*/\n\tborder-radius: 0px !important;\n\tborder-color: #443322 !important;\n\t/*color: #1818181;*/\n}\n\n/*.JXGtext {\n\tcolor: #181818!important;\n}\n*/\n.JXGinfobox {\n\tborder-style: none;\n\t/*hide point coords*/\n\tvisibility: hidden !important;    \n}\n/*#jxg-OutOut {}*/\n/*#jxg-InOut {}*/\n/*#jxg-Out {}*/\n#jxg-In {\n\theight: 4vh;\n\tborder-radius: 0;\n\t/*border: none !important;*/\n\tborder-top-width: 0;\n\tborder-bottom-width: 0;\n\t/*height: calc(4vh -4pt);*/\n\t/*border: 3px #222 double;*/\n\t/*border-radius: 0px !important;*/\n}", "",{"version":3,"sources":["webpack://./src/css/style.css"],"names":[],"mappings":"AAAA;;;EAGE;AACF;CACC,sBAAsB;CACtB,2BAA2B;CAC3B,yBAAyB;IACtB,WAAW;IACX,8BAA8B;IAC9B,mBAAmB;CACtB,YAAY;CACZ,gBAAgB;AACjB;AACA,OAAO,qBAAqB,EAAE;;AAE9B,kFAAkF;AAClF,iDAAiD;AACjD;;;;EAIE;;AAEF;CACC,UAAU;CACV,aAAa;CACb,eAAe;CACf,WAAW;AACZ;;AAEA;CACC,WAAW,EAAE,kBAAkB;CAC/B,aAAa;CACb,WAAW;CACX,mBAAmB;AACpB;;AAEA;CACC,gBAAgB;CAChB,WAAW;CACX,WAAW;CACX,aAAa;CACb;mBACkB;CAClB,kBAAkB;AACnB;;AAEA;CACC,cAAc;CACd,YAAY;CACZ,gBAAgB;CAChB,oBAAoB;AACrB;;AAEA;CACC,WAAW;CACX,iBAAiB;CACjB,YAAY;CACZ,sBAAsB;CACtB,qBAAqB;CACrB,YAAY;CACZ,gBAAgB;CAChB,mBAAmB;AACpB;;AAEA;CACC,sBAAsB;CACtB,WAAW;CACX,YAAY;CACZ,oCAAoC;CACpC,wCAAwC;CACxC,6BAA6B;CAC7B,2BAA2B;CAC3B,6BAA6B;CAC7B,gCAAgC;CAChC,mBAAmB;AACpB;;AAEA;;;CAGC;AACD;CACC,kBAAkB;CAClB,oBAAoB;CACpB,6BAA6B;AAC9B;AACA,iBAAiB;AACjB,gBAAgB;AAChB,cAAc;AACd;CACC,WAAW;CACX,gBAAgB;CAChB,2BAA2B;CAC3B,mBAAmB;CACnB,sBAAsB;CACtB,0BAA0B;CAC1B,2BAA2B;CAC3B,iCAAiC;AAClC","sourcesContent":["/*\n * style.css \n * @author md 2020\n */\nbody, h1 {\n\tbox-sizing: border-box;\n\t/*background-color: black;*/\t\n\tbackground-color: #181818;\n    color: #CCC;\n    /*BOGUS - media query and 4:3*/\n    width: calc(3*48vh);\n\tmargin: auto; \n\toverflow: hidden;\n}\nspan { display: inline-block; }\n\n/*dialog + .backdrop, dialog::backdrop{ background: rgba(0,0,0,0.7) !important; }*/\n/*dialog h2, dialog h3 { margin-bottom: 0.2em; }*/\n/*.menu {\n\tposition:absolute;\n\tmargin: 0;\n\tz-index: 1;\n}*/\n\n#out-out-panel {\n\tfloat:left;\n\theight: 100vh;\n\t/*width:100vh;*/\n\twidth: 48vh;\t\n}\n\n#main-panel {\n\twidth: 48vh; /*calc(60% -4vh);*/\n\theight: 100vh;\n\tfloat: left;\n\t/*margin:0px 20px;*/\n}\n\n#settings-panel {\n\t/*float:right;\t*/\n\tfloat: left;\n\twidth: 48vh;\n\theight: 100vh;\n\t/*overflow-y: scroll;\n\toverflow-x: auto;*/\n\t/*direction: rtl;*/\n}\n\n.prelim-div {\n\t/*width: 75%;*/\n\twidth: 14rem;\n\t/*margin: auto;*/\n\tpadding-left: 2.5rem;\n}\n\n.Preisach-button {\n\twidth: 100%;\n\tfont-size: larger;\n\theight: 3rem;\n\tbackground-color: #555;\n\tborder-radius: 0.5rem;\n\tborder: none;\n\t/*margin: auto;*/\n\tmargin-bottom: 1rem;\t\n}\n\n.jxgbox {\n\tbox-sizing: border-box;\n\twidth: 48vh;\n\theight: 48vh;\n\tbackground-color: #212128 !important;\n\t/*background-color: #121220 !important;*/\n\t/*background-color: #121220;*/\n\t/*border: 3px #222 double;*/\n\tborder-radius: 0px !important;\n\tborder-color: #443322 !important;\n\t/*color: #1818181;*/\n}\n\n/*.JXGtext {\n\tcolor: #181818!important;\n}\n*/\n.JXGinfobox {\n\tborder-style: none;\n\t/*hide point coords*/\n\tvisibility: hidden !important;    \n}\n/*#jxg-OutOut {}*/\n/*#jxg-InOut {}*/\n/*#jxg-Out {}*/\n#jxg-In {\n\theight: 4vh;\n\tborder-radius: 0;\n\t/*border: none !important;*/\n\tborder-top-width: 0;\n\tborder-bottom-width: 0;\n\t/*height: calc(4vh -4pt);*/\n\t/*border: 3px #222 double;*/\n\t/*border-radius: 0px !important;*/\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../RecruitmentForm/src/html/branches.html":
/*!*************************************************!*\
  !*** ../RecruitmentForm/src/html/branches.html ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!--  -->\n<!--  -->\n<legend>Element Branches</legend>\n<!--  -->\n\n<div id=\"div-eq-style\">\n\t<!-- table obviously a weird looking choice here ... it's for styling consistancy with the variables -->\n\t<table id=\"tbl-eq-style\">\n\t\t<tr>\n\t\t\t<td class=\"eq-label\">Euqation style</td>\n\t\t\t<!-- <label for=\"eq-select\">Sigmoids</label> -->\n\t\t\t<td>\n\t\t\t\t<div id=\"div-sel\">\n\t\t\t\t\t<select name=\"eq-select\" id=\"eq-select\" class=\"select\">\n\t\t\t\t\t\t<!-- <option value=-1>Please select</option> -->\n\t\t\t\t\t\t<!-- <option value=1>Logistic</option> -->\n\t\t\t\t\t\t<option value=-1 disabled>User defined...</option>\n\t\t\t\t\t</select> \n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</table>\n</div>\n\n<div id=\"equations\"></div>\n\n<div id=\"variables\">\n\t<table id=\"vars-table\">\n\t<tr class=\"branch-var\" id=\"row-vmax\">\n\t\t<td class=\"variable-label\">V<sub>max</sub></td>\n\t\t<td ><input type=\"number\" \tname=\"vmax\" \t\tid=\"vmax\" \t\t size=\"3\" \t\t\tstep=\"0.01\" value=\"1\"></td>\n\t\t<td ><input type=\"range\" \tname=\"vmax-slider\" \tid=\"vmax-slider\" min=\"0\" max=\"1\"\tstep=\"0.01\" value=\"1\"></td>\n\t\t<!-- <div>\n\t\t\t\t<div style=\"float: left;\">0</div>\n\t\t\t\t<button name=\"button\" style=\"float: right; height: 1.5em; width: 1.5em; box-sizing: border-box; border-radius: 0.1em;\">1</button>\t\t\t\t\n\t\t\t</div> -->\n\t\t\t<!-- <div style=\"float: right; background-color: rgba(200, 200, 200, 0.6); height: 1.5em; width: 1.5em; padding: 2px 6px; box-sizing: border-box; border: 1px dashed black; border-radius: 0.1em;\">1</div> -->\n\t</tr>\n\t<tr class=\"branch-var\" id=\"row-pmid\">\n\t\t<td class=\"variable-label\">P<sub>mid</sub></td>\n\t\t<td><input type=\"number\" \tname=\"pmid\" \t\tid=\"pmid\" \t\t size=\"3\" \t\t\tstep=\"0.01\" value=\"0.5\"></td>\n\t\t<td><input type=\"range\" \tname=\"pmid-slider\" \tid=\"pmid-slider\" min=\"0\" max=\"1.5\" \tstep=\"0.01\" value=\"0.5\"></td>\n\t</tr>\n\t<tr class=\"branch-var\" id=\"row-k\">\n\t\t<td class=\"variable-label\">k</td>\n\t\t<td><input type=\"number\" \tname=\"k\" \t\t\tid=\"k\"  \t\tsize=\"3\" \t\t\tstep=\"0.01\" value=\"10\"></td>\n\t\t<td><input type=\"range\" \tname=\"k-slider\" \tid=\"k-slider\" \tmin=\"0\" max=\"15\" \tstep=\"0.01\" value=\"10\"></td>\n\t</tr>\n\t<tr class=\"branch-var\">\n\t\t<td class=\"variable-label\">P<sub>low</sub></td>\n\t\t<td >&#x03C4<sub>l</sub></td>\n\t\t<td >Low threshold</td>\t\t\n\t</tr>\n\t</table>\n</div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "../RecruitmentForm/src/html/pairs.html":
/*!**********************************************!*\
  !*** ../RecruitmentForm/src/html/pairs.html ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!--  -->\n<!--  -->\n<legend>Threshold Pairs</legend>\n\t<!-- https://codepen.io/codesuey/pen/EdEmoj -->\n\t<!-- \n\t\t<input type=\"radio\" name=\"btn-distrib-lattice\"\tclass=\"btn-half\" id=\"btn-distrib-lattice\">\n\t\t<label for=\"btn-distrib-lattice\"><span class=\"fas fa-fw\">&nbsp</span>Square Lattice</label>\n\t\t<input type=\"radio\" name=\"btn-distrib-random\" class=\"btn-half\" id=\"btn-distrib-random\" ><span class=\"fas fa-fw\">&nbsp</span>Random Normal</button>\n\t -->\n\n\t<!-- \n\t\t<button name=\"btn-distrib-lattice\"\tclass=\"btn-half\" id=\"btn-distrib-lattice\"><span class=\"fas fa-fw\">&nbsp</span>Square Lattice</button>\t\n\t\t<button name=\"btn-distrib-random\" \tclass=\"btn-half\" id=\"btn-distrib-random\" ><span class=\"fas fa-fw\"\t  >&nbsp</span>Random Normal</button>\n\t -->\n<div id=\"pairs-btns\">\n\t<div style=\"width:49%; float: left;\">\n\t\t<div id=\"btn-container-pairs-lattice\" class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t<input type=\"radio\" name=\"btn-pairs\"  class=\"radiobtn radiobtn-half radio-pairs\" id=\"btn-pairs-lattice\" value=\"lattice\" checked>\n\t\t\t<label for=\"btn-pairs-lattice\">Lattice<b class=\"box-half\">&nbsp</b></label>\n\t\t</div>\n\t</div>\n\t<div style=\"width:49%; float: right;\">\n\t\t<div id=\"btn-container-pairs-continuous\" class=\"radiobtn-container radiobtn-half-container\">\t\t\n\t\t\t<input type=\"radio\" name=\"btn-pairs\" class=\"radiobtn radiobtn-half radio-pairs\" id=\"btn-pairs-continuous\" value=\"continuous\">\n\t\t\t<label for=\"btn-pairs-continuous\">Continuous<b class=\"box-half\">&nbsp</b></label>\n\t\t</div>\n\t</div>\n</div>\n\n<div id=\"pairs-lattice\">\n\t<table>\n\t\t<td class=\"pairs-label\" for=\"pairs-lattice-num\">Granularity: </td>\n\t\t<td><input type='number' name=\"pairs-lattice-num\" class=\"pairs-num\" id=\"pairs-lattice-num\" value=5 step='1' size=\"3\" min=\"1\" max=\"15\" /></td>\n\t\t<td><input type=\"range\" name=\"pairs-lattice-slider\" class=\"pairs-slide\" id=\"pairs-lattice-slider\" value=\"5\" step=\"1\" min=\"1\" max=\"15\"></td>\n\t\t<!-- <td><output id=\"granularity-output\" for=\"granularity-output\">JS show()</output></td> -->\n\t</table>\n</div>\n\n<div id=\"pairs-continuous\">\n\t<table>\n\t\t<td class=\"pairs-label\" for=\"pairs-continuous-num\">Quantity: </td>\n\t\t<td><input type='number' name=\"pairs-continuous-num\" class=\"pairs-num\" id=\"pairs-continuous-num\" value=5 step='1' size=\"3\" min=\"1\" max=\"50\" /></td>\n\t\t<td><input type=\"range\" name=\"pairs-continuous-slider\" class=\"pairs-slide\" id=\"pairs-continuous-slider\" value=\"5\" step=\"1\" min=\"1\" max=\"50\"></td>\n\t</table>\n\n\t<h3>Random Choice:</h3>\n\n\tDistribution (finite support/truncated)\n\t<div class=\"engraved-line\"></div>\n\t<div id=\"threshold-dist-btns\">\n\n\t\t<div style=\"width:49%\">\n\t\t\t<div id=\"btn-container-thresholds-dist-uniform\" class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t\t<input type=\"radio\" name=\"btn-grp-thresholds-dist\" class=\"radiobtn radiobtn-half\" id=\"btn-thresholds-dist-uniform\" value=\"uniform\">\n\t\t\t\t<label for=\"btn-thresholds-dist-uniform\">Uniform<b class=\"box-half\">&nbsp</b></label>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div style=\"width:49%; float: left;\">\n\t\t\t<div id=\"btn-container-thresholds-dist-normal\" class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t\t<input type=\"radio\" name=\"btn-grp-thresholds-dist\" class=\"radiobtn radiobtn-half\" id=\"btn-thresholds-dist-normal\" value=\"normal\">\n\t\t\t\t<label for=\"btn-thresholds-dist-normal\">Normal<b class=\"box-half\">&nbsp</b></label>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div style=\"width:49%; float: right;\">\n\t\t\t<div id=\"btn-container-thresholds-dist-width\" class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t\t<input type=\"radio\" name=\"btn-grp-thresholds-dist\" class=\"radiobtn radiobtn-half\" id=\"btn-thresholds-dist-width\" value=\"linear\" checked>\n\t\t\t\t<label for=\"btn-thresholds-dist-width\">Linear<b class=\"box-half\">&nbsp</b></label>\n\t\t\t\t<!-- <label for=\"btn-thresholds-dist-width\">&#x221D&nbsp(&nbsp&#x03C4<sub>h</sub>&nbsp-&nbsp&#x03C4<sub>l</sub>&nbsp)<b class=\"box-half\">&nbsp</b></label> -->\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\n\t<div id=\"threshold-dist-details\">\n\t\t<div id=\"thresholds-dist-normal\">\n\t\t\t<table >\n\t\t\t\t<tr>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tmean (&#x03BC)\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"dist-label\">&#x03BC (&nbsp&#x03C4<sub>l</sub>&nbsp)</td> <!-- mu -->\n\t\t\t\t\t<td><input type=\"number\" id=\"thresholds-peak-low\" value=\"0\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"dist-label\">&#x03BC (&nbsp&#x03C4<sub>h</sub>&nbsp)</td> <!-- mu -->\n\t\t\t\t\t<td><input type=\"number\" id=\"thresholds-peak-high\" value=\"1\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>SD (&#x03C3)</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"dist-label\">&#x03C3 (&nbsp&#x03C4<sub>l</sub>&nbsp)</td> <!-- sigma -->\n\t\t\t\t\t<td><input type=\"number\" id=\"thresholds-spread-low\" value=\"0.15\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"dist-label\">&#x03C3 (&nbsp&#x03C4<sub>h</sub>&nbsp)</td> <!-- sigma -->\n\t\t\t\t\t<td><input type=\"number\" id=\"thresholds-spread-high\" value=\"0.15\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div id=\"thresholds-dist-width\">\n\t\t\t<h3>&#x221D&nbsp(&nbsp&#x03C4<sub>h</sub>&nbsp-&nbsp&#x03C4<sub>l</sub>&nbsp)</h3>\t\n\t\t\t<table >\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"variable-label\">Slope</td>\n\t\t\t\t\t<td><input type=\"number\" id=\"thresholds-linear-slope\" value=\"1\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n\n\n</div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "../RecruitmentForm/src/html/plot-area.html":
/*!**************************************************!*\
  !*** ../RecruitmentForm/src/html/plot-area.html ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!--  -->\n<!--  -->\n<legend>Input/Output</legend>\n\n<!-- <fieldset title=\"domain\"> -->\n<!-- <legend>Input - Pressure (Domain)</legend> -->\nInput (Domain) - Pressure\n<div class=\"engraved-line\"></div>\n<!-- <div id=\"domain-label\"></div> -->\n<table>\n\t<tr>\n\t\t<td class=\"io-label\">min</td>\n\t\t<td><input id=\"input-min\"  type=\"number\" value=\"0\" \tsize=\"3\" min=\"0\" max=\"100\" \tstep=\"0.01\"/></td>\n\t\t<!-- <input id=\"input-min-slider\" type=\"range\" value=\"0\" \tsize=\"3\" min=\"0\" \tmax=\"100\" \tstep=\"0.01\"/> -->\n\n\t</tr>\n\t<tr>\n\t\t<td class=\"io-label\">max</td>\n\t\t<td><input id=\"input-max\" type=\"number\" value=\"1\" \tsize=\"3\" min=\"0\" max=\"100\" \tstep=\"0.01\"/></td>\n\t</tr>\n\t<tr>\n\t\t<td class=\"io-label\">precision</td>\n\t\t<td class=\"io-label\">arbitrary</td>\n\t\t<!-- <input id=\"input-precision\" type=\"number\" value=\"0.01\" \tsize=\"3\" min=\"0.01\" max=\"1\" \tstep=\"0.01\"/> -->\n\t</tr>\n</table>\n<!-- </fieldset> -->\n\n<br>\n<!-- <fieldset title=\"Range\"> -->\n<!-- <legend>Output - Volume (Range)</legend> -->\nOutput (Range) - Volume\n<div class=\"engraved-line\"></div>\n<!-- <div id=\"domain-label\"></div> -->\n<table>\n\t<tr>\n\t\t<td class=\"io-label\">min</td>\n\t\t<td><input id=\"output-min\" type=\"number\" value=\"0\" \tsize=\"3\" min=\"0\" max=\"100\" \tstep=\"0.01\"/></td>\n\n\t</tr>\n\t<tr>\n\t\t<td class=\"io-label\">max</td>\n\t\t<td><input id=\"output-max\" type=\"number\" value=\"1\" \tsize=\"3\" min=\"0\" max=\"100\" \tstep=\"0.01\"/></td>\n\t</tr>\n</table>\n</fieldset>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "../RecruitmentForm/src/html/recruitability.html":
/*!*******************************************************!*\
  !*** ../RecruitmentForm/src/html/recruitability.html ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!--  -->\n<!--  -->\n<legend>Recruitability</legend>\n<!-- <div id=\"recruitabilitySettings\">\n<h3>Recruitability Settings<div class=\"div-go\"><button class=\"btn-go\">Go!</button></div></h3><hr> -->\n\n<table id=\"tbl-recruitability\">\n\t<tr id=\"tr-open\" class=\"tr-recruitability\">\n\t\t<td class=\"recruitable-label\" for=\"open\">open</td>\n\t\t<td><input id='open' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\"></td>\n\t</tr>\n\t<tr id=\"tr-recruitable\" class=\"tr-recruitability\">\n\t\t<td class=\"recruitable-label\" for=\"recruitable\">recruitable</td>\n\t\t<td><input id='recruitable' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\"></td>\n\t</tr>\n\t<tr id=\"tr-closed\" class=\"tr-recruitability\">\n\t\t<td class=\"recruitable-label\" for=\"closed\">closed</td>\n\t\t<td><input id='closed' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0\"></td>\n\t</tr>\n</table>\n\n<div id=\"recruit-slider-container\">\n\t<div id=\"recruitable-slider\"></div>\n</div>\n\n<!-- \n<label class=\"recruitable-label\" for=\"open\">open</label>\n<input id='open' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\">\n\n<label class=\"recruitable-label\" for=\"recruitable\">recruitable</label>\n<input id='recruitable' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\">\n\n<label class=\"recruitable-label\" for=\"closed\">closed</label>\n<input id='closed' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0\">\n -->\n<!-- \n\t<div id=\"recruitability\">\n\t\t\t<div class=\"li-recruitable\">\n\t\t\t\t<div class=\"recruitable-label\" for=\"open\">open</div>\n\t\t\t\t<input id='open' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\">\n\t\t\t</div>\n\t\t\t<div class=\"li-recruitable\">\n\t\t\t\t<div class=\"recruitable-label\" for=\"recruitable\">recruitable</div>\n\t\t\t\t<input id='recruitable' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\">\n\t\t\t</div>\n\t\t\t<div class=\"li-recruitable\">\n\t\t\t\t<div class=\"lir\">\n\t\t\t\t\t<div class=\"recruitable-label\" for=\"closed\">closed</div>\n\t\t\t\t\t<input id='closed' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t</div>\n -->\n\t<!-- <div id=\"recruitability\">\n\t\t<ul id=\"ul-recruitability\">\n\t\t\t<li class=\"li-recruitable\">\n\t\t\t\t<label for=\"open\">open</label><br>\n\t\t\t\t<input id='open'        type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\">\n\t\t\t</li>\n\t\t\t<li class=\"li-recruitable\">\n\t\t\t\t<label for=\"recruitable\">recruitable</label><br>\n\t\t\t\t<input id='recruitable' type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0.5\">\n\t\t\t</li>\n\t\t\t<li class=\"li-recruitable\">\n\t\t\t\t<label for=\"closed\">closed</label><br>\n\t\t\t\t<input id='closed'      type=\"number\" name=\"\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0\">\n\t\t\t</li>\n\t\t</ul>\n\t\t<br>\n\t</div> -->\n\t<!-- \n\t\t\tcan think about a 2 value slider...of just use a couple of gliders from jsxgraph \n\t\t\tor ...https://refreshless.com/nouislider/\n\t\t\tor... https://www.simple.gy/blog/range-slider-two-handles/...but I don't iknow why the fiddle doesn't work\t\t\t\n\t-->";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "../RecruitmentForm/src/html/settings.html":
/*!*************************************************!*\
  !*** ../RecruitmentForm/src/html/settings.html ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!-- \n\tsettings.html\n\t@author md 2021\n -->\n<form onsubmit=\"return false;\" id=\"settings-form\">\n<fieldset title=\"Control\">\n<legend>Control</legend>\n\t<div id=\"div-ctrl-btns\">\n\t\t<!-- <button name=\"btn-pv\" \tid=\"btn-pv\"><span class=\"fas fa-fw\">&nbsp</span>Pressure -v- Volume</button> -->\n\t\t<!-- <button name=\"btn-vp\"\tid=\"btn-vp\"><span class=\"fas fa-fw\">&nbsp</span>Volume -v- Pressure</button> -->\n\n\t\t<div class=\"radiobtn-container\" id=\"div-pv\">\n\t\t\t<input type=\"radio\" id=\"radio-pv\" class=\"radiobtn radio-control\" name=\"control\" value=\"P\" checked>\n\t\t\t<label for=\"radio-pv\" class=\"lbl-pv\">\n\t\t\t\t<b class=\"lbl-pv1\">Pressure</b> \n\t\t\t\t<b class=\"lbl-pv2\">-v-</b> \n\t\t\t\t<b class=\"lbl-pv3\">Volume</b>\n\t\t\t\t<b id=\"lbl-pv-box\" class=\"box\">&nbsp</b>\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"radiobtn-container\">\n\t\t\t<input type=\"radio\" id=\"radio-vp\" class=\"radiobtn radio-control\" name=\"control\" value=\"V\">\n\t\t\t<label for=\"radio-vp\" class=\"lbl-pv\">\n\t\t\t\t<b class=\"lbl-pv1\">Volume</b>\n\t\t\t\t<b class=\"lbl-pv2\">-v-</b>\n\t\t\t\t<b class=\"lbl-pv3\">Pressure</b>\n\t\t\t\t<b id=\"lbl-vp-box\" class=\"box\">&nbsp</b>\n\t\t\t</label>\n\t\t</div>\n\t</div>\n</fieldset>\t\n\n<div id=\"settings-fields\">\n\t<fieldset title=\"plot-area\" \t id=\"plot-area\" \t></fieldset><!-- <h3>Input &amp Support</h3><hr> -->\n\t<fieldset title=\"Branches\" \t\t id=\"branches\" \t\t></fieldset>\n\t<fieldset title=\"Support\" \t\t id=\"support\" \t\t></fieldset>\n\t<fieldset title=\"Pairs\" \t\t id=\"pairs\" \t\t></fieldset>\n\t<fieldset title=\"Weights\" \t\t id=\"weights\" \t\t></fieldset>\t\n\t<fieldset title=\"Recruitability\" id=\"recruitability\"></fieldset>\n</div>\n<div class=\"div-update\">\n\t<button id=\"btn-update\" type=\"submit\">update</button>\n</div>\n</form>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "../RecruitmentForm/src/html/support.html":
/*!************************************************!*\
  !*** ../RecruitmentForm/src/html/support.html ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!--  -->\n<!--  -->\n<legend>Threshold Support</legend>\n<table id=\"suport-vars\">\n\t<tr class=\"support-label-vars\">\n\t\t<td class=\"support-label\">min( &#x03C4<sub>l</sub> )</td>\n\t\t<td><input type='number' \tclass=\"support-number\" name=\"support-min\" \t\t\tid=\"support-min\" size=\"3\" \tmin=\"0\" max=\"1\" step='0.01' value='1'></td>\n\t\t<td><input type=\"range\" \tclass=\"support-slider\" name=\"support-min-slider\" \tid=\"support-min-slider\" \tmin=\"0\" max=\"1\" step=\"0.01\" value=\"1\"></td>\n\t\t<td >\n\t\t\t<!-- <div style=\"width: 10%;\"></div> -->\n\t\t</td>\n\t</tr>\n\t<tr class=\"support-label-vars\">\n\t\t<td class=\"support-label\">max( &#x03C4<sub>h</sub> )</td>\n\t\t<td ><input type='number' \tclass=\"support-number\" name=\"support-max\"  \t\t\tid=\"support-max\" size=\"3\" \tmin=\"0\" max=\"1\" step='0.01' value=\"1\"></td>\n\t\t<td ><input type=\"range\" \tclass=\"support-slider\" name=\"support-max-slider\" \tid=\"support-max-slider\" \tmin=\"0\" max=\"1\" step=\"0.01\" value=\"0\"></td>\n\t</tr>\n\t<tr class=\"support-label-vars\">\n\t\t<td class=\"support-label\">min(&nbsp&#x03C4<sub>h</sub>&nbsp-&nbsp&#x03C4<sub>l</sub>&nbsp)</td>\n\t\t<td ><input type='number' \tclass=\"support-number\" name=\"support-diag\" \t\t\tid=\"support-diag\" size=\"3\" \tmin=\"0\" max=\"1\"\tstep='0.01' value=\"0.1\"></td>\n\t\t<td ><input type=\"range\" \tclass=\"support-slider\" name=\"support-diag-slider\" \tid=\"support-diag-slider\" \tmin=\"0\" max=\"1\" step=\"0.01\" value=\"0.1\"></td>\n\t</tr>\n</table>\n\n<!-- \n\t<div class=\"support-div\">\n\t\t<label for=\"support-min\" class=\"support-label\">min lower</label>\n\t\t<input id=\"support-min\" class=\"support-input\" type='number' value=1 step='0.01' size=\"3\" />\n\t\t<div class=\"floating-slider\">\n\t\t\t<input type=\"range\" \n\t\t\t\tid=\"support-min-slider\" min=\"0\" max=\"1\" step=\"0.01\" name=\"support-min-slider\" value=\"\">\n\t\t</div>\n\t</div>\n\t<div class=\"support-div\">\n\t\t<label for=\"support-max\" class=\"support-label\">max higher</label>\n\t\t<input id=\"support-max\" class=\"support-input\" type='number' value=1 step='0.01' size=\"3\" />\n\t</div>\n\t<div class=\"support-div\">\n\t\t<label for=\"support-diag\" class=\"support-label\">min(high - low)</label>\n\t\t<input id=\"support-diag\" class=\"support-input\" type='number' value=1 step='0.01' size=\"3\" min=\"0\" />\n\t</div>\n -->";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "../RecruitmentForm/src/html/weights.html":
/*!************************************************!*\
  !*** ../RecruitmentForm/src/html/weights.html ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!--  -->\n<!--  -->\n<!--  -->\n<legend>Element Weights</legend>\n<div id=\"weights-btns\">\n\t<div style=\"width:49%\">\n\t\t<div class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t<input type=\"radio\" name=\"btn-grp-weights\" class=\"radiobtn radiobtn-half radio-weights\" id=\"btn-weights-equal\" value=\"equal\">\n\t\t\t<label for=\"btn-weights-equal\">Equal<b class=\"box-half\">&nbsp</b></label>\n\t\t</div>\n\t</div>\n\n\t<div style=\"width:49%; float: left;\">\n\t\t<div class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t<input type=\"radio\" name=\"btn-grp-weights\" class=\"radiobtn radiobtn-half radio-weights\" id=\"btn-weights-random\" value=\"random\">\n\t\t\t<label for=\"btn-weights-random\">Random<b class=\"box-half\">&nbsp</b></label>\n\t\t</div>\n\t</div>\n\n\t<div style=\"width:49%; float: right;\">\n\t\t<div class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t<input type=\"radio\" name=\"btn-grp-weights\" class=\"radiobtn radiobtn-half radio-weights\" id=\"btn-weights-func\" value=\"func\">\n\t\t\t<label for=\"btn-weights-func\">~&nbspf(&#x03C4<sub>l</sub>,&nbsp&#x03C4<sub>h</sub>&nbsp)<b class=\"box-half\">&nbsp</b></label>\n\t\t</div>\n\t</div>\n</div>\n\n<div id=\"weights-random\">\t\n\t<h3>Random Choice:</h3>\n\n\tDistribution (finite support/truncated)\n\t<div class=\"engraved-line\"></div>\n\t<div style=\"width:100%\">\n\t\t<div style=\"width:49%; float: left;\">\n\t\t\t<div class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t\t<input type=\"radio\" class=\"radiobtn radiobtn-half radio-weights\" checked>\n\t\t\t\t<label for=\"btn-weights-func\">Uniform<b class=\"box-half\">&nbsp</b></label>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- <div id=\"weights-details\"> -->\n\t<!-- We draw the line here - what does it mean to have normally distributed weights -->\n\t<!-- There's simple, there's silly, there's sublime there's ridiculuous \\amp there's distasetful[1].  -->\n\n\tWe have no data for any distribution\n\t<br>\n\tDo a question mark icon and overlay saying ...\n</div>\n\n<div id=\"weights-func\">\n\t<br>\n\t<br>\n\t<br>\n\t<div class=\"engraved-line\"></div>\n\t<!-- <h3 class=\"engraved-line\"></h3> -->\n\n\t<div id=\"weights-func-btns\">\n\t\t<div style=\"width:49%; float: left;\">\n\t\t\t<div class=\"radiobtn-container radiobtn-half-container\">\t\t\t\n\t\t\t\t<input type=\"radio\" name=\"btn-grp-weights-func\" class=\"radiobtn radiobtn-half\" id=\"btn-weights-func-linear\" value=\"linear\">\n\t\t\t\t<label for=\"btn-weights-func-linear\">Linear<b class=\"box-half\">&nbsp</b></label>\n\t\t\t</div>\t\n\t\t</div>\n\n\t\t<div style=\"width:49%; float: right;\">\n\t\t\t<div class=\"radiobtn-container radiobtn-half-container\">\n\t\t\t\t<input type=\"radio\" name=\"btn-grp-weights-func\" class=\"radiobtn radiobtn-half\" id=\"btn-weights-func-normal\" value=\"normal\">\n\t\t\t\t<label for=\"btn-weights-func-normal\">Normal<b class=\"box-half\">&nbsp</b></label>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div id=\"weights-func-details\">\n\t\t<div id=\"weights-dist-thresholds-linear\">\n\t\t\t<h3>=&nbsp m(&#x03C4<sub>h</sub>&nbsp-&nbsp&#x03C4<sub>l</sub>&nbsp)</h3>\n\t\t\t<table >\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"variable-label\">Slope (m)</td>\n\t\t\t\t\t<td><input type=\"number\" name=\"m\" id=\"weights-slope\" value=\"1\" size=\"3\" step=\"0.01\"></td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<div id=\"weights-dist-thresholds-normal\">\n\t\t\t<h5>We like to have this one for Lattice Threshold Pairs</h5>\n\t\t\t<table >\n\t\t\t\t<tr>\n\t\t\t\t\t<td>mean (&#x03BC)</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"dist-label\">&#x03BC (&nbsp&#x03C4<sub>l</sub>&nbsp)</td> <!-- mu -->\n\t\t\t\t\t<td><input type=\"number\" id=\"weights-dist-thresholds-peak-low\" value=\"0\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"dist-label\">&#x03BC (&nbsp&#x03C4<sub>h</sub>&nbsp)</td> <!-- mu -->\n\t\t\t\t\t<td><input type=\"number\" id=\"weights-dist-thresholds-peak-high\" value=\"1\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>SD (&#x03C3)</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"dist-label\">&#x03C3 (&nbsp&#x03C4<sub>l</sub>&nbsp)</td> <!-- sigma -->\n\t\t\t\t\t<td><input type=\"number\" id=\"weights-dist-thresholds-spread-low\" value=\"0.15\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"dist-label\">&#x03C3 (&nbsp&#x03C4<sub>h</sub>&nbsp)</td> <!-- sigma -->\n\t\t\t\t\t<td><input type=\"number\" id=\"weights-dist-thresholds-spread-high\" value=\"0.15\" size=\"3\" min=\"0\" max=\"1\" step=\"0.01\"/></td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n\n</div>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/html/instructions.html":
/*!************************************!*\
  !*** ./src/html/instructions.html ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "\n<div>\n\t<h3>Instructions</h3>\t\n\t<ul id=\"ul-instructions\">\n\t\t<li class=\"li-instructions\">click and drag red dots</li>\n\t\t<li class=\"li-instructions\">press shift + mouse wheel to zoom</li>\n\t\t<li class=\"li-instructions\">press shift + drag to pan</li>\n\t</ul>\t\n</div>\n\n<div>\n\t<h3>Preliminaries</h3>\t\n\t\t<div class=\"prelim-div\">\n\t\t\t<a href=\"https://preisach.github.io/bistatjxg/\" target=\"_blank\"><button name=\"Preisach-plane\" id=\"Preisach-plane\" class=\"Preisach-button\">Preisach Plane</button></a>\n\t\t</div>\n\t\t<div class=\"prelim-div\">\n\t\t\t<a href=\"https://preisach.github.io/preisachjxg/\" target=\"_blank\"><button name=\"Preisach-operator\" id=\"Preisach-operator\" class=\"Preisach-button\">Preisach Operator</button><a/>\n\t\t</div>\n\t<!-- <input type=\"button\" name=\"btn-settings\">\t -->\n</div>\n\n\t<!-- <p>Choose a preset and adjust subsequent settings manually as required</p> -->\n\n\t<!-- <>Model Type</label> -->\n\t<!-- \n\t<input type='button' name=\"PreisachPlane\" id=\"PreisachPlane\"><label for=\"PreisachPlane\">Preisach plane</label><br>\n\t<input type='button' name=\"classicalDP\" id=\"classicalDP\"><label for=\"classicalDP\">Classical discrete Preisach</label><br>\n\t<input type='button' name=\"generalisedDP\" id=\"generalisedDP\"><label for=\"generalisedDP\">Generalised discrete Preisach</label><br>\n\t<input type='button' name=\"volInflation\" id=\"volInflation\"><label for=\"volInflation\">Volume controlled recruitment</label>\n\t -->\n\t\t<!-- <label for=\"classicalDP\">Classical discrete Preisach</label><br> -->\n\n\t<!-- <button name=\"generalisedDP\" \tid=\"generalisedDP\">Presure -v- Volume</button>\t -->\n\t<!-- <label for=\"generalisedDP\">Generalised discrete Preisach</label><br> -->\n\t<!-- <button name=\"volInflation\" \tid=\"volInflation\">Volume -v- Pressure</button>\t -->\n\t<!-- <label for=\"volInflation\">Volume controlled recruitment</label> -->\n\t\t\n\n\t<!-- <label for=\"preset\">Sigmoids</label>\n\t<select name=\"preset\" id=\"preset\">\n\t\t<option value=-1>Please select</option>\n\t\t<option value=1>Recruitment (Volume/Pressure)</option>\n\t\t<option value=2>Recruitment (Pressure/Volume)</option>\n\t\t<option value=3>Classical discrete Preisach</option>\n\t</select>  -->";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "../RecruitmentBoards/src/boards-style.css":
/*!*************************************************!*\
  !*** ../RecruitmentBoards/src/boards-style.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../preisachjxg/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../preisachjxg/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../preisachjxg/node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../preisachjxg/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../preisachjxg/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../preisachjxg/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_boards_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./boards-style.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentBoards/src/boards-style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_boards_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_boards_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_boards_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_boards_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../RecruitmentForm/src/css/branches-style.css":
/*!*****************************************************!*\
  !*** ../RecruitmentForm/src/css/branches-style.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_branches_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./branches-style.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/branches-style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_branches_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_branches_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_branches_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_branches_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../RecruitmentForm/src/css/settings-style.css":
/*!*****************************************************!*\
  !*** ../RecruitmentForm/src/css/settings-style.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../preisachjxg/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_settings_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../preisachjxg/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./settings-style.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../RecruitmentForm/src/css/settings-style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_preisachjxg_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_preisachjxg_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _preisachjxg_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_preisachjxg_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_preisachjxg_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _preisachjxg_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_settings_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_settings_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_settings_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _preisachjxg_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_settings_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./style.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./src/css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/js/Control.js":
/*!***************************!*\
  !*** ./src/js/Control.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjs_src_Bistats2JXG_Bistats2JXG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjs/src/Bistats2JXG/Bistats2JXG.js */ "../preisachjs/src/Bistats2JXG/Bistats2JXG.js");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/dom_utils */ "./src/js/utils/dom_utils.js");
/**
 * @file Control.js
 * @author m
 * @date 2021
 * @version 0.0.3
 */

/**
 * 
 */



/**
 *
 */
class Control {
	/**
	 * create a Control
	 * @constructor Control
	 * @param {} dispatcher: dispatcher, 
	 * @param {} configManager: configManager, 
	 * @param {} Model: Model - passing the class cause we didn't need to instantiate a model earlier but we call new Model here through-out the prog, 
	 * @param {} views: views
	 */	 
	constructor(args) {
		/**
		 *
		 */
		this.dispatcher = args.dispatcher;

		/**
		 * 
		 */
		// this.configManager = args.configManager;

		/**
		 * 
		 */
		this.Model = args.Model;

		/**
		 * 
		 */
		this.views = args.views;

		/** BOGUS
		 * 		we don't have history implemented
		 * 		this.update( cfg.input.history[0] );
		 */
		/**
		 *	BOGUS
		 *		probably better to have intervals specifically for P and V 
		 * 		rather than going with domain and range
		 */
		// let i = cfg.input.interval;
		// cfg['output']['interval'] = [ Math.floor(cfg.fOn(i[0])), Math.ceil(cfg.fOn(i[1])) ];

		this.addListeners();
		// this.init(null);

		// let cfg = args.config;
		// cfg = ( cfg != null ) ? cfg : this.views.config;
		/**
		 * must get vals from views because 
		 * ...equation strings turned into functions inside views
		 */
		let cfg = this.views.formVals;
		// let cfg = this.views.config

		// BOGUS
		// the 'checked' value is not written, and hence not retrieved, from dom
		// cfg['control-variable'] = args.config['control-variable'];

		this.model 	= new this.Model(cfg);
					// : (new this.Model(cfg, thresholds, weights)).model;

		this.model.bistats.updateMax(this.model.hardMax);


		// console.log(this.model);
		// console.log(args);
		// console.log(args.config);
		// console.table(args.config.draw);

		let b2h = new _preisachjs_src_Bistats2JXG_Bistats2JXG_js__WEBPACK_IMPORTED_MODULE_0__["default"](cfg, this.model.bistats.all);

		cfg['draw'] = args.config.draw

		args = {
			'cfg': 		cfg,
			'b2h': 		b2h,
			'healthy': 	this.model.healthy,
			'cycle': 	this.model.cycle,
			'solSet': 	this.model.solSet//.paths
		};
		
		// console.log('ctrl(), cfg = ', cfg);
		// console.log('ctrl(), solSet = ', args.solSet);
		// console.log(this.model.solSet);
		
		// console.log(cfg.thresholds);
		this.views.init(args);
		// console.log('Control.views --> INITIALISED');

		// this.model.bistats.updateMax(this.model.hardMax);
		// console.log('Control() --> bistats.updatede Max');
		// console.table({'Control() --> max': this.model.hardMax});
		// console.table({'input': this.input, 'max': this.model.hardMax});

		// this.initMax(this.model.hardMax);
		// this.update(this.model.hardMax);
		this.model.update(this.model.hardMax);
		this.views.initMax([this.model.hardMax, 1]);

		// console.log('Control() --> CONSTRUCTED');
	}

	// get config() {
	// 	return this.configManager.update(this.views.config);
	// }
	
	init(cfg, model=null, thresholds=null, weights=null) {
		cfg = ( cfg != null ) ? cfg : this.views.config;
		console.log('Control -> thresholds', thresholds);
		console.log('Control -> cfg', cfg);
		console.log('Control -> cfg.thresholds = ', cfg.thresholds);
		console.log('Control -> cfg.thresholds.pairs = ', cfg.thresholds.pairs);

		if ( 
			( cfg.thresholds.pairs == 'lattice' 	&& 	cfg.thresholds.lattice.size < 7) ||
			( cfg.thresholds.pairs == 'continuous' 	&& 	cfg.thresholds.continuous.size < 10 ) 
		) {
			cfg.draw.io.SolSet = true;
			this.dispatcher.dispatchEvent('enableSolSet');

		} else {
			cfg.draw.io.SolSet = false;
			this.dispatcher.dispatchEvent('disableSolSet');
		}


		this.model 	= ( model != null ) 
					? model 
					: new this.Model(cfg, thresholds, weights);
		// this.update(this.model.hardMax);

		// console.log(this.model);
		// this.model.bistats.updateMax(this.model.hardMax);

		let b2h = new _preisachjs_src_Bistats2JXG_Bistats2JXG_js__WEBPACK_IMPORTED_MODULE_0__["default"](cfg, this.model.bistats.all);

		let args = {
			'cfg': 		cfg,
			'b2h': 		b2h,
			'healthy': 	this.model.healthy,
			'cycle': 	this.model.cycle,
			'solSet': 	this.model.solSet //.paths
		};
		console.log('ctrl.init(), solSet = ', args.solSet);

		cfg.input.high = this.model.hardMax;
		this.views.init(args);

		// this.update(this.model.hardMax);
		// this.initPieces(this.model.hardMax);
		this.model.update(this.model.hardMax);

		// this.update(this.model.hardMax);
		this.views.initMax([this.model.hardMax, 1]);

		// console.log(this.model.hardMax);
		// console.log(this.model.bistats.all.map(b=>b.state));
	}

	/**
	 * @param 
	 * @return
	 */
	addListeners(){
		let paramChanged = kv => {
			// this.paramChanged( this.settings.vals, this.model, this.model.thresholds, this.model.weights );
			// let cfg = this.config;

			// this.configManager.solSet = false;
			// this.configManager.solSetDisabled = false;

			this.model.bistats.all.forEach( b => { b.fOff = (x) => this.model.fOn(b.thresholds.low); } );

			// console.log(cfg.draw.io);
			// let io = cfg.draw.io;

			// let args = {
			// 	'cfg': 		cfg,
			// 	'b2h': 		b2h,
			// 	'healthy': 	this.model.healthy,
			// 	'cycle': 	this.model.cycle,
			// 	// 'solSet': 	this.model.solSet.paths
			// };

			// console.log(cfg);
			// this.views.init(args);

			/********************************************************************************/
			/********************************************************************************/
			/********************************************************************************/
			// thinking don't need to send data ...it is already in b2h
			// let cfg = {};
			// this.views.paramChanged(this.views.config, this.model.healthy, this.model.cycle/*, this.model.getSolSet*/);
			this.views.paramChanged(this.views.config, this.model.healthy, this.model.cycle/*, this.model.getSolSet*/);
		}

		// BOGUS
		// this.removeListeners();
		// document.addEventListener( 'keydown',  e => this.keyDown(e));

		// let t = this;
		// this.views.boards.bii.point.on('drag', function() { t.update(this.X()); });
		// this.views.boards.bi.point.on( 'drag', function() { t.update(this.X()); });		
		this.dispatcher.addEventListener('inputChanged', v => this.update(v) );

		this.dispatcher.addEventListener('paramChanged', 	kv => paramChanged(kv) );

		this.dispatcher.addEventListener('controlChanged', 	e => this.init( null, null, this.model.thresholds, this.model.weights ) );

		this.dispatcher.addEventListener('thresholdsChanged',e => this.init( null ) ); 
		this.dispatcher.addEventListener('supportChanged', 	e => this.init( null ) ); 
		this.dispatcher.addEventListener('weightsChanged',	e => this.init( null ) ); 
		this.dispatcher.addEventListener('updateCalled', 	e => this.init( null ) );
		
		// this.dispatcher.addEventListener('showDist', show => this.views.boards.distBoard.dist.update(show) );		
		
		// let myListeners = {
			// 	'controlChanged': 	e => controlChanged(),
			// 	// 'ioChanged': 		e => ioChanged(),
			// 	'equationsChanged': e => init(),
			// 	'paramChanged': 	kv => paramChanged(kv),
			// 	'supportChanged': 	b => updateSupport(b),
			// 	'distChanged': 		b => updateDist(b),
			// 	'weightsChanged': 	() => weightsChanged(),
			// 	'recruitablilityChanged':	e => init(), 	
			// 	'updateCalled': 	e => update()
			// }
			// d.addListeners(myListeners);

			// this.init( this.settings.vals, this.boards.settings )

			// d.addEventListener('supportChanged', bounds => supportChanged() );
			// d.addEventListener('showSupport', () => this.boards.showSupport() );
			// d.addEventListener('hideSupport', () => this.boards.hideSupport() );
			// d.addEventListener('supportChanged', (bounds) => { console.log('hi', bounds); this.boards.updateSupport(bounds); } );
			// this.dispatcher.addEventListener('supportChanged', ({str: value}) => this.boards.updateSupport({str: value}) );
			// d.addEventListener('supportChanged', (bounds) => this.boards.updateSupport(bounds) );

			// d.addEventListener('showDistribution', () => this.boards.showDistribution() );
			// d.addEventListener('hideDistribution', () => this.boards.hideDistribution() );
			// d.addEventListener('distChanged', (bounds) => { console.log('hi', bounds); this.boards.updateDistribution(bounds); } );

			// d.addEventListener('weightsChanged', (bounds) => { this.boards.updateDistribution(bounds); } );

			// d.addEventListener('recruitablilityChanged', (bounds) => { console.log('hi', bounds); this.boards.updateDistribution(bounds); } );

			// let draw = (str) => {
			// 	// this.io.draw(this.model, this.cfg, str);		
			// 	// console.log('hi', str);
			// 	// console.log(this.model.ss);			
			// }
			// let supportChanged 	= () => {
			// 	// this.boards.updateSupport(bounds);
			// }

			// let thresholdsChanged = () => {

			// }

			// d.addEventListener('draw', str => draw(str) );
			// d.addEventListener('draw', str => this.draw(cfg, str) );
	}
	
	initMax(max) { 
		// console.log('Control.update');
		// console.log(this.model);
		// console.table({input: this.model.input, x: x});
		let pieces = 
		this.model.update(max);

		// BOGUS 
		// must get correct max
		this.views.initMax([this.model.hardMax, 1]);

		// console.log('pieces = ', pieces);
		
		// if (pieces){
		// 	// this.boards.update(pieces);
		// 	this.views.initMax(pieces);
		// }
		// throw new Error('ctrl.update finished');
	}

	/**
	 * @param 
	 * @return
	 */
	update(x) { 
		console.log('Control.update');
		console.log(this.model);
		console.table({input: this.model.input, x: x});
		let pieces = this.model.update(x);

		console.log('pieces = ', pieces);
		if ( typeof pieces == 'undefined' ) {
			// throw new Error('CTRL.update --> pieces undefined');
			return;
		}

		
		if (pieces){
			// this.boards.update(pieces);
			this.views.update(pieces);
		}
		// throw new Error('ctrl.update finished');
	}

	/**
	 * @param 
	 * @return
	 */
	keyDown(e) {
		// log.textContent += ` ${e.code}`;
		let move;
		switch (e.key) {
		case "Left": // IE/Edge specific value
		case "ArrowLeft":
			move = -0.05;
			break;
		case "Right": // IE/Edge specific value
		case "ArrowRight":
			move = 0.05;
			break;
		default:
			return; // Quit when this doesn't handle the key event.
		}
		this.update(this.model.input + move);
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Control);

/***/ }),

/***/ "./src/js/Model.js":
/*!*************************!*\
  !*** ./src/js/Model.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _preisachjs_src_MultiPressure_MultiPressure_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../preisachjs/src/MultiPressure/MultiPressure.js */ "../preisachjs/src/MultiPressure/MultiPressure.js");
/* harmony import */ var _preisachjs_src_MultiVolume_MultiVolume_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../preisachjs/src/MultiVolume/MultiVolume.js */ "../preisachjs/src/MultiVolume/MultiVolume.js");
/**
 * @file Model
 * @author m
 * @date 2022
 * @version 0.0.2
 */




function Model(cfg, thresholds=null, weights=null) {

	// let setStepSize = (cfg) => {
		// let min = cfg.input.interval[0],
		// 	max = cfg.input.interval[1],
		// 	sup = max-min,
		// 	d = cfg.thresholds;
		// if ( d.style == 'lattice' ) {
		// 	this.stepAnimate    = sup / (  4 * (d.size.lattice + 2) );
		// 	this.stepCurve      = sup / ( 10 * (d.size.lattice + 2) );
		// } else {
		// 	this.stepAnimate    = sup / ( 4 * ( Math.ceil( Math.sqrt(d.size.random) ) + 1 ));
		// 	this.stepCurve      = sup / (10 * ( Math.ceil( Math.sqrt(d.size.random) ) + 1 ));
		// }		
		// // this.model.inputPrecision(this.stepCurve);
		// // this.model.inputPrecision(this.stepAnimate);
		// }

	switch(cfg['control-variable']) {
		case 'V':
			return new _preisachjs_src_MultiVolume_MultiVolume_js__WEBPACK_IMPORTED_MODULE_1__["default"](cfg, thresholds, weights);
		case 'P':
			return new _preisachjs_src_MultiPressure_MultiPressure_js__WEBPACK_IMPORTED_MODULE_0__["default"](cfg, thresholds, weights);
		// 	case 'Classical discrete Preisach': 
		default: 
			throw new Error("must have a cfg['control-variable'] (P/V)");
	}
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Model);

/***/ }),

/***/ "./src/js/Views.js":
/*!*************************!*\
  !*** ./src/js/Views.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _html_instructions_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/instructions.html */ "./src/html/instructions.html");
/* harmony import */ var _RecruitmentForm_src_js_Settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../RecruitmentForm/src/js/Settings.js */ "../RecruitmentForm/src/js/Settings.js");
/* harmony import */ var _RecruitmentBoards_src_BoardsManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../RecruitmentBoards/src/BoardsManager.js */ "../RecruitmentBoards/src/BoardsManager.js");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/dom_utils */ "./src/js/utils/dom_utils.js");
/**
 * @file Views.js
 * @author m
 * @date 2020
 * @version 0.0.1
 */

/**
 * 
 */


// import BoardsManager 		from './BoardsManager';



/**
 * 
 */
class Views {
	/**
	 * create a Views
	 * @constructor Views
	 * @param {}
	 * @param {}
	 * @param {}
	 */
	static jc;
	constructor(dispatcher, config) {
		/**
		 *
		 */
		this.dispatcher 	= dispatcher;

		/**
		 *
		 */
		// this.instructions 	= new Instructions();
		document.getElementById('instructions-panel').innerHTML = _html_instructions_html__WEBPACK_IMPORTED_MODULE_0__["default"];

		/**
		 *
		 */
		this.bm = new _RecruitmentBoards_src_BoardsManager_js__WEBPACK_IMPORTED_MODULE_2__["default"](dispatcher);
		
		/**
		 *
		 */
		Views.jc = this.bm.getJC();

		/**
		 *
		 */
		this.boards = null;

		/**
		 *
		 */
		this.settings = new _RecruitmentForm_src_js_Settings_js__WEBPACK_IMPORTED_MODULE_1__["default"](dispatcher); //, config, eq_labels, equations);
		
		this.addListeners();

		this.settings.load(config);

		/**
		 * BOGUS - why is this not in config??
		 */
		this.settings.branches.selected = 'logistic';
	}

	funcify(equations) {
		// it's no big deal if there are redundant variables I guess
		// let x=0, l=0, h=0;
		// let vars = 'P, V, pl, ph, ' + e.vars.join(', ');
		let vars = 'P, V, pl, ph, vmax, pmid, k'; 
			// console.log(equations);

		let functions = {};
		Object.entries(equations).forEach( ([k, v]) => { 
			// console.log(v);
			let f = Views.jc.snippet(v, true, vars);
			functions[k] = (x, l, h) => f(x, x, l, h, (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_3__.$num)('vmax'), (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_3__.$num)('pmid'), (0,_utils_dom_utils__WEBPACK_IMPORTED_MODULE_3__.$num)('k'));
		});
		return functions;
	}

	/**
	 *
	 */
	init(args) {
		/**
		 *
		 */
		let config = args.cfg;

		console.log('control-variable = ', config['control-variable']);

		this.boards = this.bm.init(config, config['control-variable']);
		
		this.boards.checked = config.draw;
		this.boards.visible = config.draw;

		if ( config['control-variable'] == 'V' ) {
			this.boards.bio.cbSolSet.rendNodeCheckbox.checked = false;
			this.boards.bio.cbSolSet_disabled = true;
		
		}

		// console.table(config.draw);
		// console.log(this.boards.checked);

		// this.initBoards(config);
		// this.initPreisachObjects(args.b2h, config);
		// this.initCurves(config, args.healthy, args.cycle, args.solSet);

		this.boards.initHysterons(args.b2h.locs, args.b2h.props);


		console.log(args);
		console.log(config);
		console.log(config.distribution);
		this.boards.updateDistribution(config.draw.pp.distribution);

		console.log('Views.init() -> solSet = ', args.solSet);
		
		this.boards.initCurves(config, args.healthy, args.cycle, args.solSet);
	}
	
	initHysterons(locs, props) { this.boards.drawHysterons(locs, props); }

	get formVals() {
		// need the variables
		// config["equations"] = Config.ALL_EQUATIONS[ label ];
		
		let cfg 	= this.settings.vals;
		// console.log(cfg);
		cfg = {
			...cfg, 
			...this.funcify(cfg.branches["equation-strings"])
		};

		if ( cfg['control-variable'] == 'P' ) {
			cfg['fOn']  = cfg.vopen;
			cfg['fOff'] = cfg.vclosed;
		} else {
			cfg['fOn']  = cfg.popen;
			cfg['fOff'] = cfg.pclosed;
			cfg['fInv'] = cfg.vopen;
		}
		return cfg;
	}

	// get boardVals() {
		// let showIO = {
			// 	"healthy": true,
			// 	"cycle": true,
			// 	"solSet": true,
			// };
		// let showPP = {
			// 	"showLines": true,
			// 	"distStr": "WNor",
			// 	"distStrAlt": "none, TLin, TNor, WLin, WNor"
			// };

		// return this.boards.checked;
		// }
	
	/**
	 * @param 
	 * @return
	 */
	get config() { 
		let cfg = this.formVals;
		
		cfg['draw'] = this.boards.checked;
		// console.log(cfg);
		return cfg;
	}

	/**
	 * @param 
	 * @return
	 */
	// showDist(show) { this.boards.showDist(show); }

	/**
	 * @param 
	 * @return
	 */	
	addListeners() {
		/**
		 * these do not need to go back to the control
		 * ...they do not affect the model, they come from settings and go to boards
		 */
		// this.dispatcher.addEventListener('showDistribution', () => this.boards.showDistribution() );
		// this.dispatcher.addEventListener('hideDistribution', () => this.boards.hideDistribution() );
		// this.dispatcher.addEventListener('showSupport', 	 () => this.boards.showSupport() );
		// this.dispatcher.addEventListener('hideSupport', 	 () => this.boards.hideSupport() );		

		// this.dispatcher.addEventListener('paramChanged', () => this.boards.unCheckSolSet() );
		let pairsChanged = () => {
			this.boards.pairsChanged();
			this.dispatcher.dispatchEvent('thresholdsChanged');
		}

		this.dispatcher.addEventListener('pairsChanged', e => pairsChanged() ); 
		this.dispatcher.addEventListener('paramChanged', () => this.paramChanged() );

		// this.dispatcher.addEventListener('focus', 	str => this.boards.distBoard.focus(str) );
		// this.dispatcher.addEventListener('blur', 	str => this.boards.distBoard.blur(str) );

		this.dispatcher.addEventListener('supportFocused', 	() => this.boards.distBoard.focusSupport() );
		this.dispatcher.addEventListener('supportBlurred', 	() => this.boards.distBoard.blurSupport() );		

		// this.dispatcher.addEventListener('distTFocused', 	() => this.boards.distBoard.focusDistT() );
		// this.dispatcher.addEventListener('distTBlurred', 	() => this.boards.distBoard.blurDistT() );

		// this.dispatcher.addEventListener('distWFocused', 	() => this.boards.distBoard.focusDistW() );
		// this.dispatcher.addEventListener('distWBlurred', 	() => this.boards.distBoard.blurDistW() );
	}

	// paramChanged() { 
		// 	this.boards.unCheckSolSet();
		// 	this.dispatcher.dispatchEvent('');
		// }

	paramChanged(cfg, cycle, solSet) { 
		this.boards.initHysterons(args.b2h.locs, args.b2h.props);

		// this.boards.updateDistribution(show);
		
		this.boards.initCurves(config, args.healthy, args.cycle, args.solSet);

		/********************************************************************************/
		/********************************************************************************/
		/********************************************************************************/
		// healthy
		this.boards.init(cfg, healthy, cycle, solSet);
	}

	/**
	 *
	 */
	updateSettings(cfg) {
		// this.settings.init(cfg);
		// // if ( cfg.dr.hysterons ) this.drawHysterons(cfg, h);

		/**
		 *
		 */
		// this.settings.config = config;
		this.settings.update(cfg);		
	}

	/**
	 * @param 
	 * @return
	 */
	update(pieces) { console.log('Views.update'); this.boards.update(pieces); console.log('Views.update - COMPLETE')}

	initMax(point) { console.log('Views.initMax'); 
		console.log(point[0]);
		// console.table({x:x, y:y});
		// this.boards.initMax(point[0], point[1]); 
		this.boards.moveTo(point[0], point[1]); 
		console.log('Views.initMax - COMPLETE');
	}

	/**
	 *
	 */
	// initBoards(cfg) {
		// this.boards = this.bm.init(cfg, cfg['control-variable']);
		// 	// // let cleared = this.clearBoards(cfg);
		// 	// this.clearBoards(cfg);
		// 	// this.boards.initControl(cfg, cfg['control-variable']);
		// 	// // console.log(...this.boards.bii.point.coords.usrCoords);
		// 	// // this.boards.reset(cfg);
		// }

	// initCurves(cfg, healthy, cycle, solSet) {
		// 	this.boards.initCurves(cfg, healthy, cycle, solSet);
		// }

	// reset(cfg, h) { 
		// this.boards.reset(cfg); 
		// if ( cfg.drawPP.hysterons ) this.drawHysterons(cfg, h);	
		// // this.boards.hideDistribution();
		// console.log(cfg.drawPP);
		// // if ( !cfg.drawPP.distribution ) this.boards.hideDistribution();
		// }
		
	// getDistribution() { return this.settings.getDistribution(); }		
	// clearBoards(cfg) { return this.boards.clearBoards(cfg); }
	// clearIO() 		{ return this.boards.clearIO(); }
	// clearCycle() 	{ return this.boards.clearCycle(); }
	// clearSolSet() 	{ this.boards.clearSolSet(); }

	// drawHealthy(pts) 	{ this.boards.drawHealthy(pts); }
	// drawCycle(pieces) 	{ this.boards.drawCycle(pieces); }
	// drawSolSet(pts) 	{ this.boards.drawSolSet(pts); }
	// drawHysterons(cfg, h) { this.boards.drawHysterons(h); }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Views);

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jsxgraph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsxgraph */ "./node_modules/jsxgraph/distrib/jsxgraphcore.js");
/* harmony import */ var jsxgraph__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsxgraph__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Control */ "./src/js/Control.js");
/* harmony import */ var _Views__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Views */ "./src/js/Views.js");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Model */ "./src/js/Model.js");
/* harmony import */ var _utils_dom_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dom_utils */ "./src/js/utils/dom_utils.js");
/* harmony import */ var _utils_TinyDispatcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/TinyDispatcher */ "./src/js/utils/TinyDispatcher.js");
/**
 * @file app.js
 * @author m
 * @date 2020-04-06
 * @version 0.0.3 ...do the init views here
 *
 */

/**
 *
 */


// let config 		= require('../config/config.json');
	// let equations 	= require('../config/equations.json');
	// import ConfigManager 	from './config/Config.js';
	// import getEquations 	from './config/getEquations.js';
	// let equations 	= require('./equations.json');

let cfg = __webpack_require__(/*! ./config/config.json */ "./src/js/config/config.json");







__webpack_require__(/*! ../css/style.css */ "./src/css/style.css");
__webpack_require__(/*! ../../node_modules/jsxgraph/distrib/jsxgraph.css */ "./node_modules/jsxgraph/distrib/jsxgraph.css");
// require("../css/fonts-style.css");
console.clear();

let dispatcher = new _utils_TinyDispatcher__WEBPACK_IMPORTED_MODULE_5__["default"]();

let views 	= new _Views__WEBPACK_IMPORTED_MODULE_2__["default"](dispatcher, cfg);
// views.load(cfg);
// console.log(cfg.thresholds);
// console.log(cfg['control-variable']);
// throw new Error('');

let args = {
	'dispatcher': dispatcher, 
	'config': cfg,
	// 'configManager': configManager, 
	'Model': _Model__WEBPACK_IMPORTED_MODULE_3__["default"], 
	'views': views
};
let control = new _Control__WEBPACK_IMPORTED_MODULE_1__["default"](args);

// let jc = views.getJC();

// let params = {
// 		'vmax': $num('vmax'), 
// 		'pmid': $num('pmid'), 
// 		'k': 	$num('k')
// 	}

// const ALL_EQUATIONS = getEquations(jc, params);

// let configManager = new ConfigManager(ALL_EQUATIONS, params);
// 	cfg = configManager.update(cfg);

// views.initEquations(cfg, ALL_EQUATIONS);
// views.updateSettings(cfg);

// let model = new Model(config);
	// let control = new Control(dispatcher, configManager, Model, views);

	// let labels 	= Object.keys(equations);
	// let eqTitle = config['equation-style'];
	// config['eqs'] 	= equations[config['equation-style']];

	// window.onload = () => {
	// 	let model = new ModelManager();
	// 	let views 	= new Views(dispatcher);

	// 	let jc 	= views.getJC();
	// 	let cfg = new Config(jc);
	// 	let control = new Control(dispatcher, cfg, bm);

	// 	// let [bm, eqs, settings] = initPage(equations);
	// 	// let control 	= new Control(dispatcher, config, eqs, bm);
	// 	// control.init(config);
	// }

	// window.onload = () => {
	// 	let bm 	= new BoardsManager(dispatcher);
	// 	let jc 	= bm.getJC();
	// 	let cfg = new Config(jc);
	// 	let control = new Control(dispatcher, cfg, bm);

	// 	// let [bm, eqs, settings] = initPage(equations);
	// 	// let control 	= new Control(dispatcher, config, eqs, bm);
	// 	// control.init(config);
	// }


// window.onload = () => {
	// // console.clear();
	// let labels 		= Object.keys(equations);

	// let eqTitle = config['equation-style'];

	// // config['eqs'] 	= equations[config['equation-style']];

	// 	this.settings 		= new Settings(dispatcher, equations); //, config, eq_labels, equations);

	// let views 		= new Views(dispatcher, equations); //, config, labels);

	// let jc 			= views.getJC(); // views.boards.bio.board.jc
	// let allEquations 		= parseDefaultEqsJC(equations, jc);
	// let control 	= new Control(Model, views, config, allEquations, dispatcher);
	// // config['eqs'] 	= equations[config['equation-style']];

	// // views.loadEquations(config, equations);

	// // let control 	= new Control(Model, views, config, equations, dispatcher);
	// };

	// 	document.getElementById('jxg-InIn_bSettings_button').addEventListener('click', function(e) { 
		// let settings = require('./views/settings');
		// settings.openSettings(cfg);
		// // BOGUS
		// // there is an error with the polyfill...but ...everything works inspite of error
		// document.getElementById("ok").addEventListener('click', function() {
		// 	cfg = settings.closeSettings(bii);
		// 	document.getElementById('dlgSettings').close();
			
		// 	bii.point.off('drag');
		// 	bi.point.off('drag');

		// 	reset(cfg);
		// });	
		// });

/***/ }),

/***/ "./src/js/utils/TinyDispatcher.js":
/*!****************************************!*\
  !*** ./src/js/utils/TinyDispatcher.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TinyDispatcher)
/* harmony export */ });
/**
 * copied from https://github.com/khirayama/TinyDispatcher
 */
class TinyDispatcher {
  addEventListener(event, callback) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
  }
  addListeners(dict) {
    Object.entries(dict).forEach( (e, c) => {
      this.addEventListener(e, c);
    });
  }
  removeEventListener(event, callback) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    this._events[event].splice(this._events[event].indexOf(callback), 1);
  }
  dispatchEvent(event, data) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    for (let i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, [data]);
    }
  }
}

/***/ }),

/***/ "./src/js/utils/dom_utils.js":
/*!***********************************!*\
  !*** ./src/js/utils/dom_utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$id": () => (/* binding */ $id),
/* harmony export */   "$num": () => (/* binding */ $num),
/* harmony export */   "$val": () => (/* binding */ $val)
/* harmony export */ });
// /**
//  * @author 2021
//  */

// (function(exports) {
// // function $id(s) { return document.getElementById(s); }
// // function $val(s){ return document.getElementById(s).value; }
// // function $num(s){ return Number(document.getElementById(s).value); }
// // function setVal(s, val){ document.getElementById(s).value = val; }

// exports.$id  = (s) => document.getElementById(s);
// exports.$val = (s) => document.getElementById(s).value;
// exports.$num = (s) => Number(document.getElementById(s).value);


// })( typeof exports === 'undefined' ? this['dom_utils'] = {}: exports );
// // })( exports );

/**
 * @author m
 * @date 2021
 */

const $id  = (s) => document.getElementById(s);
const $val = (s) => document.getElementById(s).value;
const $num = (s) => Number(document.getElementById(s).value);





/***/ }),

/***/ "data:image/svg+xml;utf8,<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"%23ccc\" d=\"M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z\"/></svg>":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;utf8,<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="%23ccc" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"/></svg> ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;utf8,<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"%23ccc\" d=\"M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z\"/></svg>";

/***/ }),

/***/ "../RecruitmentBoards/src/props_IO.json":
/*!**********************************************!*\
  !*** ../RecruitmentBoards/src/props_IO.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"board":{"axis":false,"showInfobox":false,"grid":false,"showNavigation":false,"showCopyright":false,"boundingbox":[-0.15,1.15,1.15,-0.15],"zoom":{"wheel":true,"needshift":true,"factorX":1.5,"factorY":1.5},"pan":{"enabled":true,"needshift":true},"showReload":true,"axesAlways":true},"point":{"name":"","face":"o","size":20,"strokeWidth":0,"fillColor":"blue","fixed":true,"trace":true,"traceAttributes":{"size":2,"strokeWidth":0,"fillOpacity":0.2,"fillColor":"#8cd2f0"},"filename":"thumb2.svg"},"ortho":{"fixed":true,"strokeWidth":0.75,"highlightstrokeWidth":0.75,"strokecolor":"lightblue","highlightstrokecolor":"lightblue","dash":2,"straightLast":false},"curves":{"healthy":{"name":"healthy","strokecolor":"#997","highlightstrokecolor":"#997","strokeWidth":1.5},"cycle":{"name":"cycle","strokecolor":"#9ce2f0","highlightstrokecolor":"#9ce2f0","z-index":1000,"strokeWidth":2.5},"solSet":{"name":"solSet","strokecolor":"#41f","highlightstrokecolor":"#41f","strokeWidth":1}},"cb":{"strokecolor":"#aaa","highlightstrokecolor":"#fff","fixed":true}}');

/***/ }),

/***/ "../RecruitmentBoards/src/props_preisach.json":
/*!****************************************************!*\
  !*** ../RecruitmentBoards/src/props_preisach.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"PROPS_PI":{"horizontal":"high","input-board":true,"dist-board":true,"labels":{"centre":{"x":"Pressure","y":"Pressure"},"right":{"x":"input","y":"input"}}},"PROPS_PO":{"horizontal":"low","input-board":false,"dist-board":true,"labels":{"centre":{"x":"Pressure","y":"Pressure"},"right":{"x":"output","y":"output"}}},"PROPS_VI":{"horizontal":"high","input-board":true,"dist-board":false,"labels":{"centre":{"x":"Volume","y":"Volume"},"right":{"x":"input","y":"input"}}}}');

/***/ }),

/***/ "../RecruitmentForm/src/json/equations.json":
/*!**************************************************!*\
  !*** ../RecruitmentForm/src/json/equations.json ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"logistic":{"vars":{"vmax":{"min":0,"max":1,"step":0.01,"value":1},"pmid":{"min":0,"max":1,"step":0.01,"value":0.5},"k":{"min":1,"max":15,"step":0.1,"value":10}},"popen":{"latex":"P_{open} &= P_{mid}+\\\\frac{1}{k}\\\\ln\\\\left(\\\\frac{V(t)}{V_{max}-V(t)}\\\\right)","jc":"pmid + (1/k)*log(V/(vmax-V))"},"pclosed":{"latex":"P_{closed} &= P_{low}","jc":"pl"},"vopen":{"latex":"V_{open} &= \\\\frac{V_{max}}{1+\\\\mathrm{e}^{-k\\\\left(P(t)-P_{mid}\\\\right)}}","jc":"vmax/(1 + exp(-k * (P - pmid)))"},"vclosed":{"latex":"V_{closed} &= \\\\frac{V_{max}}{1+\\\\mathrm{e}^{-k\\\\left(P_{low}-P_{mid}\\\\right)}}","jc":"vmax/(1 + exp(-k * (pl - pmid)))"},"chtml":"<mjx-container class=\\"MathJax\\" jax=\\"CHTML\\" style=\\"position: relative;\\"><mjx-math class=\\" MJX-TEX\\" aria-hidden=\\"true\\"><mjx-mtable style=\\"min-width: 16.197em;\\"><mjx-table><mjx-itable><mjx-mtr><mjx-mtd style=\\"text-align: right; padding-right: 0; padding-bottom: 0.15em;\\"><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45D TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D452 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45B TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd><mjx-mtd style=\\"text-align: left; padding-left: 0; padding-bottom: 0.15em;\\"><mjx-mi class=\\"mjx-n\\"></mjx-mi><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c3D\\"></mjx-c></mjx-mo><mjx-mfrac space=\\"4\\"><mjx-frac type=\\"d\\"><mjx-num><mjx-nstrut type=\\"d\\"></mjx-nstrut><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D44E TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D465 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub></mjx-num><mjx-dbox><mjx-dtable><mjx-line type=\\"d\\"></mjx-line><mjx-row><mjx-den><mjx-dstrut type=\\"d\\"></mjx-dstrut><mjx-mrow><mjx-mn class=\\"mjx-n\\"><mjx-c class=\\"mjx-c31\\"></mjx-c></mjx-mn><mjx-mo class=\\"mjx-n\\" space=\\"3\\"><mjx-c class=\\"mjx-c2B\\"></mjx-c></mjx-mo><mjx-msup space=\\"3\\"><mjx-TeXAtom texclass=\\"ORD\\"><mjx-mi class=\\"mjx-n\\"><mjx-c class=\\"mjx-c65\\"></mjx-c></mjx-mi></mjx-TeXAtom><mjx-script style=\\"vertical-align: 0.289em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D458 TEX-I\\"></mjx-c></mjx-mi><mjx-mrow><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D461 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D456 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D451 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo></mjx-mrow></mjx-TeXAtom></mjx-script></mjx-msup></mjx-mrow></mjx-den></mjx-row></mjx-dtable></mjx-dbox></mjx-frac></mjx-mfrac><mjx-tstrut></mjx-tstrut></mjx-mtd></mjx-mtr><mjx-mtr><mjx-mtd style=\\"text-align: right; padding-right: 0; padding-top: 0.15em; padding-bottom: 0.15em;\\"><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D450 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D459 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D460 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D452 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D451 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd><mjx-mtd style=\\"text-align: left; padding-left: 0; padding-top: 0.15em; padding-bottom: 0.15em;\\"><mjx-mi class=\\"mjx-n\\"></mjx-mi><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c3D\\"></mjx-c></mjx-mo><mjx-mfrac space=\\"4\\"><mjx-frac type=\\"d\\"><mjx-num><mjx-nstrut type=\\"d\\"></mjx-nstrut><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D44E TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D465 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub></mjx-num><mjx-dbox><mjx-dtable><mjx-line type=\\"d\\"></mjx-line><mjx-row><mjx-den><mjx-dstrut type=\\"d\\"></mjx-dstrut><mjx-mrow><mjx-mn class=\\"mjx-n\\"><mjx-c class=\\"mjx-c31\\"></mjx-c></mjx-mn><mjx-mo class=\\"mjx-n\\" space=\\"3\\"><mjx-c class=\\"mjx-c2B\\"></mjx-c></mjx-mo><mjx-msup space=\\"3\\"><mjx-TeXAtom texclass=\\"ORD\\"><mjx-mi class=\\"mjx-n\\"><mjx-c class=\\"mjx-c65\\"></mjx-c></mjx-mi></mjx-TeXAtom><mjx-script style=\\"vertical-align: 0.289em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D458 TEX-I\\"></mjx-c></mjx-mi><mjx-mrow><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D459 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D464 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D456 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D451 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo></mjx-mrow></mjx-TeXAtom></mjx-script></mjx-msup></mjx-mrow></mjx-den></mjx-row></mjx-dtable></mjx-dbox></mjx-frac></mjx-mfrac><mjx-tstrut></mjx-tstrut></mjx-mtd></mjx-mtr><mjx-mtr><mjx-mtd style=\\"text-align: right; padding-right: 0; padding-top: 0.15em; padding-bottom: 0.15em;\\"><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45D TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D452 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45B TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd><mjx-mtd style=\\"text-align: left; padding-left: 0; padding-top: 0.15em; padding-bottom: 0.15em;\\"><mjx-mi class=\\"mjx-n\\"></mjx-mi><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c3D\\"></mjx-c></mjx-mo><mjx-msub space=\\"4\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D456 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D451 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-mo class=\\"mjx-n\\" space=\\"3\\"><mjx-c class=\\"mjx-c2B\\"></mjx-c></mjx-mo><mjx-mfrac space=\\"3\\"><mjx-frac type=\\"d\\"><mjx-num><mjx-nstrut type=\\"d\\"></mjx-nstrut><mjx-mn class=\\"mjx-n\\"><mjx-c class=\\"mjx-c31\\"></mjx-c></mjx-mn></mjx-num><mjx-dbox><mjx-dtable><mjx-line type=\\"d\\"></mjx-line><mjx-row><mjx-den><mjx-dstrut type=\\"d\\"></mjx-dstrut><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D458 TEX-I\\"></mjx-c></mjx-mi></mjx-den></mjx-row></mjx-dtable></mjx-dbox></mjx-frac></mjx-mfrac><mjx-mi class=\\"mjx-n\\"><mjx-c class=\\"mjx-c6C\\"></mjx-c><mjx-c class=\\"mjx-c6E\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c2061\\"></mjx-c></mjx-mo><mjx-mrow space=\\"2\\"><mjx-mo class=\\"mjx-s3\\"><mjx-c class=\\"mjx-c28 TEX-S3\\"></mjx-c></mjx-mo><mjx-mfrac><mjx-frac type=\\"d\\"><mjx-num><mjx-nstrut type=\\"d\\"></mjx-nstrut><mjx-mrow><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D461 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo></mjx-mrow></mjx-num><mjx-dbox><mjx-dtable><mjx-line type=\\"d\\"></mjx-line><mjx-row><mjx-den><mjx-dstrut type=\\"d\\"></mjx-dstrut><mjx-mrow><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D44E TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D465 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-mo class=\\"mjx-n\\" space=\\"3\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\" space=\\"3\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D461 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo></mjx-mrow></mjx-den></mjx-row></mjx-dtable></mjx-dbox></mjx-frac></mjx-mfrac><mjx-mo class=\\"mjx-s3\\"><mjx-c class=\\"mjx-c29 TEX-S3\\"></mjx-c></mjx-mo></mjx-mrow><mjx-tstrut></mjx-tstrut></mjx-mtd></mjx-mtr><mjx-mtr><mjx-mtd style=\\"text-align: right; padding-right: 0; padding-top: 0.15em;\\"><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D450 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D459 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D460 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D452 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D451 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd><mjx-mtd style=\\"text-align: left; padding-left: 0; padding-top: 0.15em;\\"><mjx-mi class=\\"mjx-n\\"></mjx-mi><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c3D\\"></mjx-c></mjx-mo><mjx-msub space=\\"4\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D459 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D464 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd></mjx-mtr></mjx-itable></mjx-table></mjx-mtable></mjx-math><mjx-assistive-mml unselectable=\\"on\\" display=\\"inline\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><mtable displaystyle=\\"true\\" columnalign=\\"right left\\" columnspacing=\\"0em\\" rowspacing=\\"3pt\\"><mtr><mtd><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>o</mi><mi>p</mi><mi>e</mi><mi>n</mi></mrow></msub></mtd><mtd><mi></mi><mo>=</mo><mfrac><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>a</mi><mi>x</mi></mrow></msub><mrow><mn>1</mn><mo>+</mo><msup><mrow data-mjx-texclass=\\"ORD\\"><mi mathvariant=\\"normal\\">e</mi></mrow><mrow data-mjx-texclass=\\"ORD\\"><mo>−</mo><mi>k</mi><mrow data-mjx-texclass=\\"INNER\\"><mo data-mjx-texclass=\\"OPEN\\">(</mo><mi>P</mi><mo stretchy=\\"false\\">(</mo><mi>t</mi><mo stretchy=\\"false\\">)</mo><mo>−</mo><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>i</mi><mi>d</mi></mrow></msub><mo data-mjx-texclass=\\"CLOSE\\">)</mo></mrow></mrow></msup></mrow></mfrac></mtd></mtr><mtr><mtd><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>c</mi><mi>l</mi><mi>o</mi><mi>s</mi><mi>e</mi><mi>d</mi></mrow></msub></mtd><mtd><mi></mi><mo>=</mo><mfrac><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>a</mi><mi>x</mi></mrow></msub><mrow><mn>1</mn><mo>+</mo><msup><mrow data-mjx-texclass=\\"ORD\\"><mi mathvariant=\\"normal\\">e</mi></mrow><mrow data-mjx-texclass=\\"ORD\\"><mo>−</mo><mi>k</mi><mrow data-mjx-texclass=\\"INNER\\"><mo data-mjx-texclass=\\"OPEN\\">(</mo><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>l</mi><mi>o</mi><mi>w</mi></mrow></msub><mo>−</mo><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>i</mi><mi>d</mi></mrow></msub><mo data-mjx-texclass=\\"CLOSE\\">)</mo></mrow></mrow></msup></mrow></mfrac></mtd></mtr><mtr><mtd><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>o</mi><mi>p</mi><mi>e</mi><mi>n</mi></mrow></msub></mtd><mtd><mi></mi><mo>=</mo><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>i</mi><mi>d</mi></mrow></msub><mo>+</mo><mfrac><mn>1</mn><mi>k</mi></mfrac><mi>ln</mi><mo data-mjx-texclass=\\"NONE\\">⁡</mo><mrow data-mjx-texclass=\\"INNER\\"><mo data-mjx-texclass=\\"OPEN\\">(</mo><mfrac><mrow><mi>V</mi><mo stretchy=\\"false\\">(</mo><mi>t</mi><mo stretchy=\\"false\\">)</mo></mrow><mrow><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>a</mi><mi>x</mi></mrow></msub><mo>−</mo><mi>V</mi><mo stretchy=\\"false\\">(</mo><mi>t</mi><mo stretchy=\\"false\\">)</mo></mrow></mfrac><mo data-mjx-texclass=\\"CLOSE\\">)</mo></mrow></mtd></mtr><mtr><mtd><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>c</mi><mi>l</mi><mi>o</mi><mi>s</mi><mi>e</mi><mi>d</mi></mrow></msub></mtd><mtd><mi></mi><mo>=</mo><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>l</mi><mi>o</mi><mi>w</mi></mrow></msub></mtd></mtr></mtable></math></mjx-assistive-mml></mjx-container>"},"generalised-logistic":{"vars":{"vmax":1,"pmid":0.5,"k":10},"popen":{"latex":"P_{open} &= P_{mid}+\\\\frac{1}{k}\\\\ln\\\\left(\\\\frac{V(t)}{1-V(t)}\\\\right)","jc":"-(log((((a - k)/(a - V))^u - c)/q) - b*m)/b"},"pclosed":{"latex":"P_{closed} &= P_{low}","jc":"pl"},"vopen":{"latex":"V_{open} &= \\\\frac{V_{max}}{1+\\\\mathrm{e}^{-k\\\\left(P(t)-P_{mid}\\\\right)}}","jc":"a+(k-a)/(c+q*e^((-b*(P-m))))^(1/u)"},"vclosed":{"latex":"V_{closed} &= \\\\frac{V_{max}}{1+\\\\mathrm{e}^{-k\\\\left(P_{low}-P_{mid}\\\\right)}}","jc":"vmax/(1 + exp(-k * (pl - pmid)))"}},"exponential-relaxation":{"vars":{"vmax":{"min":0,"max":1,"step":0.01,"value":1},"k":{"min":0,"max":15,"step":0.1,"value":5}},"popen":{"latex":"P_{open} &=-\\\\frac{1}{k}\\\\ln\\\\left(V_{max} - V(t)\\\\right)","jc":"-log(-(P - vmax))/k"},"pclosed":{"latex":"P_{closed} &= P_{low}","jc":"pl"},"vopen":{"latex":"V_{open} &= V_{max}\\\\left(1 - \\\\mathrm{e}^{-kP(t)}\\\\right)","jc":"vmax*(1 - exp(-k*P))"},"vclosed":{"latex":"V_{closed} &=V_{max}(1 - \\\\mathrm{e}^{-kP_{low}})","jc":"vmax*(1 - exp(-k*pl))"},"chtml":"<mjx-container class=\\"MathJax\\" jax=\\"CHTML\\" style=\\"position: relative;\\"><mjx-math class=\\" MJX-TEX\\" aria-hidden=\\"true\\"><mjx-mtable style=\\"min-width: 12.661em;\\"><mjx-table><mjx-itable><mjx-mtr><mjx-mtd style=\\"text-align: right; padding-right: 0; padding-bottom: 0.15em;\\"><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45D TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D452 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45B TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd><mjx-mtd style=\\"text-align: left; padding-left: 0; padding-bottom: 0.15em;\\"><mjx-mi class=\\"mjx-n\\"></mjx-mi><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c3D\\"></mjx-c></mjx-mo><mjx-msub space=\\"4\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D44E TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D465 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-mrow space=\\"2\\"><mjx-mo class=\\"mjx-lop\\"><mjx-c class=\\"mjx-c28 TEX-S2\\"></mjx-c></mjx-mo><mjx-mn class=\\"mjx-n\\"><mjx-c class=\\"mjx-c31\\"></mjx-c></mjx-mn><mjx-mo class=\\"mjx-n\\" space=\\"3\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-msup space=\\"3\\"><mjx-TeXAtom texclass=\\"ORD\\"><mjx-mi class=\\"mjx-n\\"><mjx-c class=\\"mjx-c65\\"></mjx-c></mjx-mi></mjx-TeXAtom><mjx-script style=\\"vertical-align: 0.413em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D458 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D461 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo></mjx-TeXAtom></mjx-script></mjx-msup><mjx-mo class=\\"mjx-lop\\"><mjx-c class=\\"mjx-c29 TEX-S2\\"></mjx-c></mjx-mo></mjx-mrow><mjx-tstrut></mjx-tstrut></mjx-mtd></mjx-mtr><mjx-mtr><mjx-mtd style=\\"text-align: right; padding-right: 0; padding-top: 0.15em; padding-bottom: 0.15em;\\"><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D450 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D459 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D460 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D452 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D451 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd><mjx-mtd style=\\"text-align: left; padding-left: 0; padding-top: 0.15em; padding-bottom: 0.15em;\\"><mjx-mi class=\\"mjx-n\\"></mjx-mi><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c3D\\"></mjx-c></mjx-mo><mjx-msub space=\\"4\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D44E TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D465 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-mn class=\\"mjx-n\\"><mjx-c class=\\"mjx-c31\\"></mjx-c></mjx-mn><mjx-mo class=\\"mjx-n\\" space=\\"3\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-msup space=\\"3\\"><mjx-TeXAtom texclass=\\"ORD\\"><mjx-mi class=\\"mjx-n\\"><mjx-c class=\\"mjx-c65\\"></mjx-c></mjx-mi></mjx-TeXAtom><mjx-script style=\\"vertical-align: 0.413em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D458 TEX-I\\"></mjx-c></mjx-mi><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D459 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D464 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub></mjx-TeXAtom></mjx-script></mjx-msup><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo><mjx-tstrut></mjx-tstrut></mjx-mtd></mjx-mtr><mjx-mtr><mjx-mtd style=\\"text-align: right; padding-right: 0; padding-top: 0.15em; padding-bottom: 0.15em;\\"><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45D TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D452 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45B TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd><mjx-mtd style=\\"text-align: left; padding-left: 0; padding-top: 0.15em; padding-bottom: 0.15em;\\"><mjx-mi class=\\"mjx-n\\"></mjx-mi><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c3D\\"></mjx-c></mjx-mo><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-mfrac><mjx-frac type=\\"d\\"><mjx-num><mjx-nstrut type=\\"d\\"></mjx-nstrut><mjx-mn class=\\"mjx-n\\"><mjx-c class=\\"mjx-c31\\"></mjx-c></mjx-mn></mjx-num><mjx-dbox><mjx-dtable><mjx-line type=\\"d\\"></mjx-line><mjx-row><mjx-den><mjx-dstrut type=\\"d\\"></mjx-dstrut><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D458 TEX-I\\"></mjx-c></mjx-mi></mjx-den></mjx-row></mjx-dtable></mjx-dbox></mjx-frac></mjx-mfrac><mjx-mi class=\\"mjx-n\\"><mjx-c class=\\"mjx-c6C\\"></mjx-c><mjx-c class=\\"mjx-c6E\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c2061\\"></mjx-c></mjx-mo><mjx-mrow space=\\"2\\"><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.186em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45A TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D44E TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D465 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-mo class=\\"mjx-n\\" space=\\"3\\"><mjx-c class=\\"mjx-c2212\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\" space=\\"3\\"><mjx-c class=\\"mjx-c1D449 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c28\\"></mjx-c></mjx-mo><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D461 TEX-I\\"></mjx-c></mjx-mi><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo><mjx-mo class=\\"mjx-n\\"><mjx-c class=\\"mjx-c29\\"></mjx-c></mjx-mo></mjx-mrow><mjx-tstrut></mjx-tstrut></mjx-mtd></mjx-mtr><mjx-mtr><mjx-mtd style=\\"text-align: right; padding-right: 0; padding-top: 0.15em;\\"><mjx-msub><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D450 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D459 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D460 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D452 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D451 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd><mjx-mtd style=\\"text-align: left; padding-left: 0; padding-top: 0.15em;\\"><mjx-mi class=\\"mjx-n\\"></mjx-mi><mjx-mo class=\\"mjx-n\\" space=\\"4\\"><mjx-c class=\\"mjx-c3D\\"></mjx-c></mjx-mo><mjx-msub space=\\"4\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D443 TEX-I\\"></mjx-c></mjx-mi><mjx-script style=\\"vertical-align: -0.15em; margin-left: -0.109em;\\"><mjx-TeXAtom size=\\"s\\" texclass=\\"ORD\\"><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D459 TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D45C TEX-I\\"></mjx-c></mjx-mi><mjx-mi class=\\"mjx-i\\"><mjx-c class=\\"mjx-c1D464 TEX-I\\"></mjx-c></mjx-mi></mjx-TeXAtom></mjx-script></mjx-msub><mjx-tstrut></mjx-tstrut></mjx-mtd></mjx-mtr></mjx-itable></mjx-table></mjx-mtable></mjx-math><mjx-assistive-mml unselectable=\\"on\\" display=\\"inline\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><mtable displaystyle=\\"true\\" columnalign=\\"right left\\" columnspacing=\\"0em\\" rowspacing=\\"3pt\\"><mtr><mtd><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>o</mi><mi>p</mi><mi>e</mi><mi>n</mi></mrow></msub></mtd><mtd><mi></mi><mo>=</mo><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>a</mi><mi>x</mi></mrow></msub><mrow data-mjx-texclass=\\"INNER\\"><mo data-mjx-texclass=\\"OPEN\\">(</mo><mn>1</mn><mo>−</mo><msup><mrow data-mjx-texclass=\\"ORD\\"><mi mathvariant=\\"normal\\">e</mi></mrow><mrow data-mjx-texclass=\\"ORD\\"><mo>−</mo><mi>k</mi><mi>P</mi><mo stretchy=\\"false\\">(</mo><mi>t</mi><mo stretchy=\\"false\\">)</mo></mrow></msup><mo data-mjx-texclass=\\"CLOSE\\">)</mo></mrow></mtd></mtr><mtr><mtd><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>c</mi><mi>l</mi><mi>o</mi><mi>s</mi><mi>e</mi><mi>d</mi></mrow></msub></mtd><mtd><mi></mi><mo>=</mo><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>a</mi><mi>x</mi></mrow></msub><mo stretchy=\\"false\\">(</mo><mn>1</mn><mo>−</mo><msup><mrow data-mjx-texclass=\\"ORD\\"><mi mathvariant=\\"normal\\">e</mi></mrow><mrow data-mjx-texclass=\\"ORD\\"><mo>−</mo><mi>k</mi><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>l</mi><mi>o</mi><mi>w</mi></mrow></msub></mrow></msup><mo stretchy=\\"false\\">)</mo></mtd></mtr><mtr><mtd><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>o</mi><mi>p</mi><mi>e</mi><mi>n</mi></mrow></msub></mtd><mtd><mi></mi><mo>=</mo><mo>−</mo><mfrac><mn>1</mn><mi>k</mi></mfrac><mi>ln</mi><mo data-mjx-texclass=\\"NONE\\">⁡</mo><mrow data-mjx-texclass=\\"INNER\\"><mo data-mjx-texclass=\\"OPEN\\">(</mo><msub><mi>V</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>m</mi><mi>a</mi><mi>x</mi></mrow></msub><mo>−</mo><mi>V</mi><mo stretchy=\\"false\\">(</mo><mi>t</mi><mo stretchy=\\"false\\">)</mo><mo data-mjx-texclass=\\"CLOSE\\">)</mo></mrow></mtd></mtr><mtr><mtd><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>c</mi><mi>l</mi><mi>o</mi><mi>s</mi><mi>e</mi><mi>d</mi></mrow></msub></mtd><mtd><mi></mi><mo>=</mo><msub><mi>P</mi><mrow data-mjx-texclass=\\"ORD\\"><mi>l</mi><mi>o</mi><mi>w</mi></mrow></msub></mtd></mtr></mtable></math></mjx-assistive-mml></mjx-container>"},"smooth-step":{"vars":{"a":3,"b":2},"popen":{"latex":"P_{open} &=x^2(a - b V(t));","jc":"V * V * (a - b * V)"},"pclosed":{"latex":"P_{closed} &=P_{low}","jc":"pl"},"vopen":{"latex":"V_{open} &=0.5 - \\\\sin(\\\\asin(1.0 - b P(t)) / a);","jc":"0.5 - sin(asin(1.0 - b * P) / a)"},"vclosed":{"latex":"V_{closed} &=0.5 - \\\\sin(\\\\asin(1.0 - b P_{low}) / a);","jc":"0.5 - sin(asin(1.0 - b * pl) / a)"}},"hard-sigmoid":{"vars":{"P":"P","a":"a","b":"b"},"popen":{"latex":"P_{open}=","jc":"0"},"pclosed":{"latex":"P_{closed}=0","jc":"0"},"vopen":{"latex":"V_{open}=","jc":"0"},"vclosed":{"latex":"V_{closed}=","jc":"0"}},"inverse-tan":{"vars":{"P":"P","a":"a","b":"b"},"popen":{"latex":"P_{open}=","jc":"0"},"pclosed":{"latex":"P_{closed}=0","jc":"0"},"vopen":{"latex":"V_{open}=","jc":"0"},"vclosed":{"latex":"V_{closed}=","jc":"0"}},"inverse-hyperbolic-tan":{"vars":{"P":"P","a":"a","b":"b"},"popen":{"latex":"P_{open}=","jc":"0"},"pclosed":{"latex":"P_{closed}=0","jc":"0"},"vopen":{"latex":"V_{open}=","jc":"0"},"vclosed":{"latex":"V_{closed}=","jc":"0"}},"error-function":{"vars":{"P":"P","a":"a","b":"b"},"popen":{"latex":"P_{open}=","jc":"0"},"pclosed":{"latex":"P_{closed}=0","jc":"0"},"vopen":{"latex":"V_{open}=","jc":"0"},"vclosed":{"latex":"V_{closed}=","jc":"0"}}}');

/***/ }),

/***/ "./src/js/config/config.json":
/*!***********************************!*\
  !*** ./src/js/config/config.json ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"control-variable":"V","response-variable":"P/V","input":{"value":1,"min":0,"max":1,"step":0.1,"history":[]},"output":{"value":1,"min":0,"max":1},"branches":{"equation-style":"logistic"},"draw":{"io":{"Healthy":true,"Cycle":true,"SolSet":true,"solSetDisabled":false},"pp":{"hysterons":true,"hystegon":true,"support":false,"distribution":{"thresholds":false,"weights":false}}},"thresholds":{"pairs":"continuous","pairsOther":"lattice/continuous","support":{"low":0,"high":1,"diag":0.2},"lattice":{"size":3},"continuous":{"size":10,"distribution":"uniform","distOther":"uniform/linear/normal","normal":{"mean":{"low":0,"high":1},"std":{"low":0.2,"high":0.2,"same":true}},"linear":{"slope":1}}},"weights":{"style":"equal","styleOther":"equal/random/func","random":{"style":"uniform","styleOther":"uniform/normal - actually not allowing \'normal\'","normal":{"mean":0.5,"std":0.1}},"func":{"style":"linear","styleOther":"linear/normal","linear":{"slope":1},"normal":{"mean":{"low":0,"high":0},"std":{"low":0.2,"high":0.2,"same":true}}}},"recruitability":{"open":0,"recruitable":1,"closed":0}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkRecruitment_Demo"] = self["webpackChunkRecruitment_Demo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map