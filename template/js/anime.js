class Page {
  constructor(props) {
    this.listContainerDom = document.getElementById('anime-list');
    this.dateDom = document.getElementById('date');
    this.hitokotoDom = document.getElementById('hitokoto');

    let today = new Date().getDay();
    if (today === 0) {
      today = 7;
    };

    this.state = {
      bangumi: props.bangumi || [],
      hitokoto: props.hitokoto || {},
      today,
      isChinese: props.isChinese
    }

    this.init();
  }

  formatTime() {
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const date = new Date();

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const week = weekday[date.getDay()];

    return {
      month,
      year,
      day,
      week
    };
  }

  init() {
    this.render();
  }

  render() {
    this.dateDom.innerHTML = this.rednerDate();
    this.listContainerDom.innerHTML = this.renderList();
    this.hitokotoDom.innerHTML = this.renderHitokoto();
  }

  renderHitokoto() {
    const { hitokoto = '都是世界的错', from = '伊藤诚' } = this.state.hitokoto;
    return `${hitokoto} ---<span class="from">${from}<span>`;
  }

  rednerDate() {
    if (!this.state.isChinese) {
      return `/ ${new Date().toDateString()}`;
    }
    const { year, month, week, day } = this.formatTime();
    return `/ ${year}年${month >= 10 ? month : '0' + month}月${day}日 ${week}`;
  }

  renderList() {
    const result = this.state.bangumi.map((day) => {
      return this.renderDayAnime(day);
    }).join('');

    return result;
  }

  renderDayAnime(data) {
    const items = data.items || [];
    const itemsTemplate = items.map((item) => {
      let animeName = item.name_cn || item.name;
      if (!this.state.isChinese) {
        animeName = item.name || item.name_cn
      }
      return `
      <li class="anime-content">
        <a href="${item.url}">
          <div class="poster"
            style="background:url('${item.images.medium}'); background-size: cover">
            <p class="anime-name">${animeName}</p>
          </div>
          <div class="mask"></div>
        </a>
      </li>
      `
    }).join('');

    const classMap = {
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
      7: 'sun'
    };

    let todayTempalte = '';

    if (data.weekday.id === this.state.today) {
      todayTempalte = `<span class="today">${this.state.isChinese ? '当天': 'Today'}</span>`;
    }

    const animeTemplate = `
      <li class="anime-item">
        <p class="day ${classMap[data.weekday.id]}">${todayTempalte}</p>
        <ul>
        ${itemsTemplate}
        </ul>
      </li>
    `;

    return animeTemplate;
  }
}

new Page(window.GLOBAL_DATA || {});