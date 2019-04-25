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
