const d = document;

const getTemplateContent = (id) => {
  const t = d.querySelector(id);
  return d.importNode(t.content, true);
};

const onReset = () => {
  console.log('onReset');
  const areas = ['#root1', '#root2', '#root3'];
  areas.forEach((id) => {
    const area = d.querySelector(id);
    const t = getTemplateContent('#template');
    const countBtn = t.querySelector('.btn');
    countBtn.addEventListener('click', (e) => {
      const wrapper = e.currentTarget.parentNode.parentNode.parentNode;
      const counter = wrapper.querySelector('.count');
      counter.textContent = Number(counter.textContent) + 1;
    });
    area.innerHTML = '';
    area.append(t);
  });
};

const getAreaListElement = (areaID) => {
  const area = d.querySelector(areaID);
  return area.querySelector('.list');
}

const onInsertContentByInnerHTML = (areaID, count) => {
  const list = getAreaListElement(areaID);
  list.innerHTML += `<li class="addItem">Add Item ${count}</li>`;
};

const onInsertContentByInsertAdjacentHTML = (areaID, count) => {
  const list = getAreaListElement(areaID);
  const checkedRadio = d.querySelector(areaID).parentNode.querySelector('input[type="radio"]:checked');
  const position = checkedRadio.value;
  const tag = position === 'beforebegin' || position === 'afterend' ? 'div' : 'li';
  list.insertAdjacentHTML(position, `<${tag} class="addItem">Add item - ${position} ${count}</${tag}>`);
};

const onInsertContentByNode = (areaID, count) => {
  const list = getAreaListElement(areaID);
  const checkedRadio = d.querySelector(areaID).parentNode.querySelector('input[type="radio"]:checked');
  const addContent = `Add item - ${checkedRadio.value} ${count}`;
  const addElement = d.createElement('li');
  addElement.className = 'addItem';
  addElement.textContent = addContent;

  switch(checkedRadio.value) {
    case 'appendChild': {
      return list.appendChild(addElement);
    }
    case 'insertBefore': {
      const firstChild = list.firstChild
      return list.insertBefore(addElement, firstChild);
    }
    case 'append': {
      list.append(addElement);
      return list.lastChild.append('<b>append by String</b>');
    }
    case 'prepend': {
      list.prepend(addElement);
      return list.firstChild.prepend('<b>prepend by String</b>');
    }
  }
}

!function() {
  console.log('----');
  d.querySelector('#reset').addEventListener('click', onReset);
  d.querySelector('#innerHTML').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const count = btn.dataset.count - 0;
    btn.dataset.count = count + 1;
    onInsertContentByInnerHTML('#root1', count);
  });
  d.querySelector('#insertAdjacentHML').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const count = btn.dataset.count - 0;
    btn.dataset.count = count + 1;
    onInsertContentByInsertAdjacentHTML('#root2', count);
  });
  d.querySelector('#addNode').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const count = btn.dataset.count - 0;
    btn.dataset.count = count + 1;
    onInsertContentByNode('#root3', count);
  });
  onReset();
}();
