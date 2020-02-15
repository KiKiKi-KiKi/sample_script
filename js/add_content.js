'use strict';
const d = document;
const count = {
  counter: 0,
};

const root = d.getElementById('root');

const updateCounter = (n) => {
  return count.counter = n + 1;
};

const getTemplateContent = (id) => {
  // template: https://www.html5rocks.com/ja/tutorials/webcomponents/template/
  const tmplate = d.querySelector(id);
  // return clone ... clone しないと同じオブジェクトを参照して返してしまう
  return d.importNode(tmplate.content, true);
}

const onReset = () => {
  root.innerHTML = "";
  const t = getTemplateContent('#initElement');
  t.querySelector('.count').textContent = count.counter;
  t.querySelector('button').addEventListener('click', (e) => {
    const fragment = d.createDocumentFragment();
    fragment.textContent = '+';
    e.currentTarget.parentNode.appendChild(fragment);
  });
  root.appendChild(t);
  updateCounter(count.counter);
};

const onAppend = () => {
  const t = getTemplateContent('#appendItem');
  t.querySelector('li').textContent = 'on Append';
  root.querySelector('.list').appendChild(t);
};

const onAppendByInnerHTML = () => {
  // inner HTML で置き換えると, イベントは消える
  root.querySelector('.list').innerHTML += '<li>Add by innerHTML</li>';
};

const onInsertAdjacentHTML = () => {
  // insertAdjacentHTML はイベントを消去しない
  const list = root.querySelector('.list');
  list.insertAdjacentHTML('afterbegin', '<li>afterbegin</li>');
  list.insertAdjacentHTML('beforeend', '<li>beforeend</li>');
  list.insertAdjacentHTML('beforebegin', '<p>beforebegin ------</p>');
  list.insertAdjacentHTML('afterend', '<p>afterend ------</p>');
};

const onInsertAdjacentText = () => {
  // string として追加される
  const list = root.querySelector('.list');
  list.insertAdjacentText('afterbegin', '<li>afterbegin</li>');
  list.insertAdjacentText('beforeend', '<li>beforeend</li>');
  list.insertAdjacentText('beforebegin', '<p>beforebegin ------</p>');
  list.insertAdjacentText('afterend', '<p>afterend ------</p>');
}

// init
!function() {
  d.querySelector('#resetBtn').addEventListener('click', onReset);
  d.querySelector('#append').addEventListener('click', onAppend);
  d.querySelector('#innerHTML').addEventListener('click', onAppendByInnerHTML);
  d.querySelector('#insertAdjacentHTML').addEventListener('click', onInsertAdjacentHTML);
  d.querySelector('#insertAdjacentText').addEventListener('click', onInsertAdjacentText);
  onReset();
}();
