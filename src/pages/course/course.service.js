import {
  Subject
} from 'rxjs';

const courseServer = {
  // 课程保存触发事件
  courseSub: new Subject(),
  // 习惯保存触发
  habitSub: new Subject,
}

export default courseServer