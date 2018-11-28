/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */
import password from './config';

const connection = new WebSocket('ws://104.248.143.87:1337');

connection.onopen = () => {
  console.log('Uppkoppling started ... ');
};
connection.onerror = error => {
  console.log(`Èrror: ${error}`);
};
connection.onmessage = message => {
  const textEl = document.getElementById('logger');
  const obj = JSON.parse(message.data);
  if (obj.type === 'heartbeat') {
    textEl.textContent += `${obj.data}, `;
  }
};
connection.onclose = () => {
  console.log('Uppkoppling nedstängd ... ');
};

const btnEl = document.getElementById('btn');
const textEl = document.getElementById('logger');
btnEl.addEventListener("click", () => {
  const obj = {
    type: 'heartbeat',
    data: '',
    key: password
  };
  const jsonObj = JSON.stringify(obj);
  connection.send(jsonObj);
});

