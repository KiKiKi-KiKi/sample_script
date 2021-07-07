'use strict';

const User = function (name, age) {
  this.name = name;
  this.age = age;
};

User.prototype.shool = 'Starlight';

const ichigo = Object.create(User.prototype, {
  name: 'Ichigo',
  type: 'cute',
});

const Idols = {
  'cute': ['Ichigo', 'Sakura', 'Akari', 'Madoka', 'Maria'],
  'cool': ['Aoi', 'Yurika', 'Shion', 'Sumire', 'Seira'],
  'sexy': ['Ran', 'Mitsuki', 'Hikari', 'Juri', 'Sora'],
  'pop': ['Otome', 'Kaede', 'Mikuru', 'Hinaki', 'KoKone']
};

const sortByKey = (list) => (key) => {
  return list.sort((a, b) => a[key] - b[key]);
};

const listFormat = (list) => {
  return list.map((item) => ({
    id: item[0],
    ...item[1]
  }))
};

const Idols = {
  'hash1': { no: 1, name: 'Ichigo' },
  'hash7': { no: 7, name: 'Yurika' },
  'hash6': { no: 6, name: 'Hinaki' },
  'hash4': { no: 4, name: 'Akari' },
  'hash5': { no: 5, name: 'Sumire' },
  'hash9': { no: 9, name: 'Mikuru' },
  'hash8': { no: 8, name: 'Mituki' },
  'hash2': { no: 2, name: 'Aoi' },
  'hash3': { no: 3, name: 'Ran' },
};

const Idols = [
  { id: 1, name: 'Ichigo' },
  { id: 7, name: 'Yurika' },
  { id: 6, name: 'Hinaki' },
  { id: 4, name: 'Akari' },
  { id: 5, name: 'Sumire' },
  { id: 9, name: 'Mikuru' },
  { id: 8, name: 'Mituki' },
  { id: 2, name: 'Aoi' },
  { id: 3, name: 'Ran' },
];


