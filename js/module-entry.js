import {square, cube} from './modules/math-module.js';

function component() {
  const element = document.createElement('pre');
  element.innerHTML = [
    'Hello ES module! script type="module"',
    `5 cubed is equal to ${cube(5)}`
  ].join('\n\n');

  return element;
}

document.body.appendChild(component());
