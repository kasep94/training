import {
  Subject
} from 'rxjs';

const mineServer = {
  // 更新界面
  updatePage: new Subject(),
  // 切换用户刷新界面
  changeUser: new Subject(),
  habitData: null,
  // 徽章页面数据
  badgeData: null,
  setHabitData(value) {
    this.habitData = value;
  },
  getHabitData() {
    return this.habitData
  },
  setBadgeData(value) {
    this.badgeData = value
  },
  getBadgeData() {
    return this.badgeData
  }
}

export default mineServer
