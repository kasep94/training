const url = '../../../static/images/all/'

const data = [{
    // 节点名
    label: '学习习惯',
    // 唯一标识
    id: 'learning',
    // 图标
    icon: url + 'study-habit.png',
    // 二级节点
    children: [],
  },
  {
    label: '生活习惯',
    id: 'living',
    icon: url + 'life-habit.png',
    children: [],
  },
  {
    label: '交友习惯',
    id: 'friend',
    icon: url + 'friends-habit.png',
    children: [],
  },
  {
    label: '健康习惯',
    id: 'health',
    icon: url + 'health-habit.png',
    children: [],
  },
  {
    label: '行为习惯',
    id: 'behave',
    icon: url + 'behavior-habit.png',
    children: [],
  }
];

const children = [{
  // 节点名
  label: '每天阅读绘本30分钟',
  // 唯一标识
  id: 'behavior',
  // 图标
  icon: url + 'every.png',
  // 判断是否已添加
  attached: false,
}]

export default {
  data,
  children
}
