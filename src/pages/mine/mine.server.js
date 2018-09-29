import {
  Subject
} from 'rxjs';

const mineServer = {
  // 更新界面
  updatePage: new Subject(),
  // 切换用户刷新界面
  changeUser: new Subject(),
  habitData: null,
  setHabitData(value) {
    this.habitData = value;
  },
  getHabitData() {
    return this.habitData
  }
}

export default mineServer
