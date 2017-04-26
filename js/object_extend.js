"use strict"

function Rectangle(length, width) {
  console.log('>> Rectangle Constructor');
  this.length = length;
  this.width = width;
}
Rectangle.prototype.name = "Rectangle";

Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};

Rectangle.prototype.toString = function() {
  return "[Rectangle " + this.length + "x" + this.width + "]";
};

Rectangle.prototype.getAreaToString = function() {
  return "[" + this.name + ' Area: ' + (this.length * this.width) + "]";
};

var rect = new Rectangle(5, 10);

console.log(rect.toString());
console.log('getArea', rect.getArea());
console.log('getArea', rect.getAreaToString());
console.log('constructor:', rect.constructor);
// getPrototypeOf ES5
console.log( Object.getPrototypeOf(rect) );
console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Object); // true

console.log("------------");
console.log("> Square extended Rectangle");
// Square extend: Rectangle
function Square(size) {
  // Super Class Constructor
  Rectangle.call(this, size, size);
}

Square.prototype = new Rectangle(); // call Rectangle Constructor
Square.prototype.constructor = Square;

// Override property
Square.prototype.name = "Square";

// Override toString method
Square.prototype.toString = function() {
  return "[Square " + this.length + "x" + this.width + "]";
};

Square.prototype.getAreaToString = function() {
  return "[" + this.name + ' Area: ' + (this.length * this.width) + "]";
};

var square = new Square(5);

console.log(square.toString());
console.log('getArea', square.getArea());
console.log('getArea', square.getAreaToString());
console.log('constructor:', square.constructor);
// getPrototypeOf ES5
console.log( Object.getPrototypeOf(square) );
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true
console.log(square instanceof Object); // true


console.log("------------");
// How to set prototype don't call Super Class Constructor
console.log("> Square2 extended Rectangle");
// Square2 extend: Rectangle
function Square2(size) {
  Rectangle.call(this, size, size);
}

Square2.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    value: Square2,
    configurable: true,
    enumerable: true,
    writable: true
  }
});

// Override property
Square2.prototype.name = "Square2";

Square2.prototype.toString = function() {
  // call Super Class's prototype Method
  let text = Rectangle.prototype.toString.call(this);
  return text.replace("Rectangle", "Square2");
  //return "[Square2 "+ this.length + "x" + this.width + "]";
};

Square2.prototype.getAreaToString = function() {
  return Rectangle.prototype.getAreaToString.call(this);
};

var square2 = new Square2(7);
console.log(square2.toString());
console.log('getArea', square2.getArea());
console.log('getArea', square2.getAreaToString());
console.log('constructor:', square2.constructor);
// getPrototypeOf ES5
console.log( Object.getPrototypeOf(square2) );
console.log(square2 instanceof Square2); // true
console.log(square2 instanceof Rectangle); // true
console.log(square2 instanceof Object); // true
