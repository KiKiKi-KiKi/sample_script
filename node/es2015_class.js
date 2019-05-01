'use strict';

// super()
const school = {
  school: 'スターライト学園',
};

const idol_type = {
  __proto__: school,
  type: 'cute',
};

const idol = {
  __proto__: idol_type,
  name: '星宮いちご',
  to_s() {
    return `${this.name} Type: ${super.type} 所属: ${super.school}`;
  }
};

console.log( idol.to_s() );

// class
class Student {
  constructor() {
    this.school = 'スターライト学園';
  }
  static say_school() {
    return this.school;
  }
};

class Idol extends Student {
  constructor(_name) {
    super();
    this.name = _name;
  }
  say() {
    return `${this.name} 所属: ${this.school}`;
  }
  static my_school() {
    return super.say_school();
  }
};

const hoshiiya = new Idol('星宮いちご');
console.log( hoshiiya.say() );
console.log( Idol.my_school() );
