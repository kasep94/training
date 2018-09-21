// 步骤1按钮
const btns1 = {
  selected: '',
  data: [{
      label: '学龄前',
      name: 'preschool'
    },
    {
      label: '一年级~三年级',
      name: 'thirdGrade'
    },
    {
      label: '四年级~五年级',
      name: 'fifthGrade'
    },
    {
      label: '初 中',
      name: 'junior'
    },
  ]
}

const btns2 = {
  selected: '',
  data: [{
      label: '学习习惯',
      name: 'study'
    },
    {
      label: '生活习惯',
      name: 'lefe'
    },
    {
      label: '交友习惯',
      name: 'friends'
    },
    {
      label: '健康习惯',
      name: 'health'
    },
    {
      label: '行为习惯',
      name: 'behavior'
    },
  ]
}

const btns3 = {
  isMore: true,
  data: [{
      label: '英语',
      name: 'english',
      selected: false
    },
    {
      label: '奥数',
      name: 'olympus',
      selected: false
    },
    {
      label: '音乐',
      name: 'music',
      selected: false
    },
    {
      label: '游泳',
      name: 'swim',
      selected: false
    },
    {
      label: '语文',
      name: 'language',
      selected: false
    },
    {
      label: '篮球',
      name: 'basketball',
      selected: false
    },
    {
      label: '网球',
      name: 'tennis',
      selected: false
    },
    {
      label: '美术',
      name: 'art',
      selected: false
    },
    {
      label: '足球',
      name: 'football',
      selected: false
    },
    {
      label: '羽毛球',
      name: 'badminton',
      selected: false
    },
  ]
}

const btns4 = {
  isMore: true,
  data: [{
      label: '学而思',
      name: 's',
      selected: false
    },
    {
      label: '新东方',
      name: 'x',
      selected: false
    },
    {
      label: '昂立教育',
      name: 'o',
      selected: false
    },
  ]
}

module.exports = {
  btns1,
  btns2,
  btns3,
  btns4,
}
