import axios from 'axios';

const calendar = 'https://api.bgm.tv/calendar';
const hitokoto = 'https://v1.hitokoto.cn/?c=a';

function getCalendar() {
  return new Promise((resolve, reject) => {
    axios.get(calendar).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      resolve([]);
    });
  });
}


function getHitokoto() {
  return new Promise((resolve, reject) => {
    axios.get(hitokoto).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      resolve({});
    });
  });
}



export { getCalendar, getHitokoto }