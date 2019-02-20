import axios from 'axios';

const calendar = 'https://api.bgm.tv/calendar';
const hitokoto = 'https://v1.hitokoto.cn';

function getCalendar() {
  return new Promise((resolve, reject) => {
    axios.get(calendar).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      resolve([]);
    });
  });
}


function getHitokoto(type?:string) {
  return new Promise((resolve, reject) => {
    axios.get(type ? `${hitokoto}/?c=${type}` : hitokoto).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      resolve({});
    });
  });
}



export { getCalendar, getHitokoto };