/* jshint esversion: 6 */

var Equation = algebra.Equation;

class BezierCurve {

  constructor({
    p0: {x: p0x, y: p0y} = {},
    p1: {x:p1x, y:p1y} = {},
    p2: {x:p2x, y:p2y} = {},
    p3: {x:p3x, y:p3y} = {},
    minX: {x:minX, value:minXvalue} = {},
    maxX: {x:maxX, value:maxXvalue} = {}
  } = {}){
    this.p0 = {
      x: p0x || 0,
      y: p0y || 0
    };
    this.p1 = {
      x: p1x || 0,
      y: p1y || 0
    };
    this.p2 = {
      x: (p2x === 0) ? 0 : p2x || 1,
      y: (p2y === 0) ? 0 : p2y || 1
    };
    this.p3 = {
      x: (p3x === 0) ? 0 : p3x || 1,
      y: (p3y === 0) ? 0 : p3y || 1
    };
    this.minX = {
      x: (minX === 0) ? 0 : minX || p0x,
      value: (minXvalue === 0) ? 0 : minXvalue || p0y
    };
    this.maxX = {
      x: (maxX === 0) ? 0 : maxX || p3x,
      value: (maxXvalue === 0) ? 0 : maxXvalue || p3y
    };
  }

  calcT({x: x, y: y} = {}) {
    let value = (x || x === 0) ? x : (y || y === 0) ? y : undefined;
    value = (value === 0) ? 0.001 : value;
    if(!value || value < 0 || value > 1) {
        throw `Value given = ${value}. You must use calcT with params. For example: calcT({x: value} being[value] the value of the axis specified for the calculated [t]), and its value allways between 0 and 1`;
    }
    let axis = (x || x === 0) ? 'x' : (y || y === 0) ? 'y' : undefined;
    let equation = new Equation(algebra.parse(`(1-t)^3 * ${this.p0[axis]} + 3(1-t)^2 * t * ${this.p1[axis]} + 3*(1-t)*t^2 * ${this.p2[axis]} + t^3 * ${this.p3[axis]} - ${value}`),0);
    return parseFloat(equation.solveFor("t").filter((value)=> {return value >= 0 && value <= 1}).toString());
  }

  calcValue({x:x, y:y} = {}){
    let value = (x || x === 0) ? x : (y || y === 0) ? y : undefined;
    value = (value === 0) ? 0.001 : value;
    if(!value || value < 0 || value > 1) {
        throw `Value given = ${value}. You must use calcAxis with params. For example: calcValue({x: value} being[value] the value of the axis, and its value allways between 0 and 1`;
    }
    let axis = (x || x === 0) ? 'x' : (y || y === 0) ? 'y' : undefined;
    let axisCalc = (x || x === 0) ? 'y' : (y || y === 0) ? 'x' : undefined;
    if(x && value <= this.minX.x) {
      return {
        [axis]: value,
        [axisCalc]: this.minX.value
      };
    }else if(x && value >= this.maxX.x) {
      return {
        [axis]: value,
        [axisCalc]: this.maxX.value
      };
    }
    let t = this.calcT({[axis]:value});
    return {
      [axis]: value,
      [axisCalc]: (Math.pow((1-t),3) * this.p0[axisCalc]) +
        (3 * Math.pow((1-t),2) * t * this.p1[axisCalc]) +
        (3 * (1 - t) * Math.pow(t,2) * this.p2[axisCalc]) +
        (Math.pow(t,3) * this.p3[axisCalc])
    };
  }

  changeAmplitude(amp) {
    this.p0.y = this.calcAmplitude(this.p0.y, amp);
    this.p1.y = this.calcAmplitude(this.p1.y, amp);
    this.p2.y = this.calcAmplitude(this.p2.y, amp);
    this.p3.y = this.calcAmplitude(this.p3.y, amp);
    return this;
  }

  calcAmplitude(num, amp) {
    return ((num - 0.5 ) * amp) + 0.5;
  }

  setCanvas(canvasId){
    if (document.getElementById(canvasId).getContext) {
      this.canvas = document.getElementById(canvasId).getContext('2d');
    }
  }

  drawCurve() {

    let height = this.canvas.canvas.height * 0.98;
    this.canvas.translate((height / 100), height + (height / 100));
    this.canvas.scale(1, -1);

    this.canvas.beginPath();
    this.canvas.moveTo(this.p0.x*height,this.p0.y*height);
    this.canvas.bezierCurveTo(this.p1.x*height,this.p1.y*height,this.p2.x*height,this.p2.y*height,this.p3.x*height,this.p3.y*height);
    this.canvas.lineWidth=1;
    this.canvas.stroke();
  }

  draw({x:x, y:y} = {}) {
    let height = this.canvas.canvas.height * 0.98;
    let axis = this.calcValue({x:x, y:y});
    for (var key in axis) {
      axis[key] *= height;
    }
    let size = 14;
    this.canvas.fillStyle="#FF0000";
    this.canvas.fillRect(axis.x-size/2, axis.y-size/2, size, size);
    this.canvas.beginPath();
    this.canvas.moveTo(axis.x,0);
    this.canvas.lineTo(axis.x,axis.y);
    this.canvas.lineTo(0,axis.y);
    this.canvas.lineWidth=1;
    this.canvas.stroke();
    console.log('x: '+parseInt((axis.x/height*4)+1)+' -- y: '+parseInt(axis.y/height*100));
  }

}

var distance = new BezierCurve({
  p0: {x:0.25, y:1},
  p1: {x:1, y:1},
  p2: {x:0.6, y:0.40},
  p3: {x: 1, y: 0},
  minX: {x: 0.25, value: 1}
});
distance.setCanvas("canvas1");
distance.drawCurve();
distance.draw({x:0.0001});
distance.draw({x:0.25});
distance.draw({x:0.50});
distance.draw({x:0.75});
distance.draw({x:1});


var valoration = new BezierCurve({
  p1: {x:0.5, y:0},
  p2: {x:0.3, y:1},
});
valoration.setCanvas("canvas2");
valoration.drawCurve();
valoration.draw({x:0});
valoration.draw({x:0.25});
valoration.draw({x:0.50});
valoration.draw({x:0.625});
valoration.draw({x:0.75});
valoration.draw({x:0.85});
valoration.draw({x:1});

var uniqueVotes = new BezierCurve({
  p0: {x:0, y:0.32},
  p1: {x:0.6, y:0.32},
  p2: {x:0, y:1},
  p3: {x:1, y:1}
});
uniqueVotes.setCanvas("canvas4");
uniqueVotes.drawCurve();
uniqueVotes.draw({x:0});
uniqueVotes.draw({x:0.25});
uniqueVotes.draw({x:0.50});
uniqueVotes.draw({x:0.75});
uniqueVotes.draw({x:1});

var valoration2 = new BezierCurve({
  p1: {x:0.5, y:0},
  p2: {x:0.3, y:1},
});
valoration2.changeAmplitude(uniqueVotes.calcValue({x: 0.25}).y);
valoration2.setCanvas("canvas2");
valoration2.drawCurve();
valoration2.drawCurve();
valoration2.draw({x:0});
valoration2.draw({x:0.25});
valoration2.draw({x:0.50});
valoration2.draw({x:0.625});
valoration2.draw({x:0.75});
valoration2.draw({x:0.85});
valoration2.draw({x:1});





var connections = new BezierCurve({
  p0: {x:0, y:0.68},
  p1: {x:0, y:0.68},
  p2: {x:0.5, y:1}
});
connections.setCanvas("canvas3");
connections.drawCurve();
connections.draw({x:0});
connections.draw({x:0.333});
connections.draw({x:0.666});
connections.draw({x:1});


class Algorithm {
  constructor(d, v, c, n=1) {
    this.distance= d;
    this.valoration= v;
    this.connections= c;
    this.uniqueVotes= n;
    this.uniqueVotesValue = uniqueVotes.calcValue({x: ((n > 20) ? 20 : n) / 20}).y;
    this.distanceValue = distance.calcValue({x: ((d > 20*1000) ? 20*1000 : (d < 0) ? 0 : d) / (20*1000)}).y;
    this.valorationValue = ((valoration.calcValue({x: (((this.valoration === 0) ? 2.5 : this.valoration - 1)) / 4}).y - 0.5) * this.uniqueVotesValue) +0.5;
    this.connectionsValue = connections.calcValue({x: ((c === 0) ? 0 : 4 - c) / 3}).y;
  }

  get ranking() {
    return this.distanceValue * this.valorationValue * this.connectionsValue;
  }

  test() {
    return `
    distance: ${this.distance},
    valoration: ${this.valoration},
    connections: ${this.connections},
    value: ${this.ranking},
    unique votes: ${this.uniqueVotes},
    unique votes value: ${this.uniqueVotesValue},
    valoration value: ${this.valorationValue},

    `
    // ${JSON.stringify(valoration.changeAmplitude(this.uniqueVotesValue))}
    // return JSON.stringify(valoration.changeAmplitude(this.uniqueVotesValue).calcValue({x: (((this.valoration === 0) ? 2.5 : this.valoration - 1)) / 4}).y);
  }

};

var test1 = new Algorithm(1000, 4, 1, 2);
var test2 = new Algorithm(800, 4.8, 0, 20);
var test3 = new Algorithm(900, 3.5, 2, 5);
var test4 = new Algorithm(1000, 4, 0, 10);
var test5 = new Algorithm(1005, 3, 1, 0);
var test6 = new Algorithm(9000, 4, 0, 15);
var test7 = new Algorithm(12000, 4.6, 2, 13);
var test8 = new Algorithm(1008, 3.5, 3, 2);


var tests = [
  test1,
  test2,
  test3,
  test4,
  test5,
  test6,
  test7,
  test8
];

tests.sort((a, b)=>{
  if (a.ranking < b.ranking)
    return +1;
  if (a.ranking > b.ranking)
    return -1;
  return 0;
})

tests.forEach((e)=>{
  console.log(e.test());
})
}
