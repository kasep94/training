import {
  Subject
} from 'rxjs';

const mineServer = {
  // 更新界面
  updatePage: new Subject(),
  // 切换用户刷新界面
  changeUser: new Subject(),
}

export default mineServer
