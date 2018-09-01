const selectedData1 = [{
  label: '4-6岁',
  name: 'one'
}, {
  label: '小学1-3年级',
  name: 'two'
}, {
  label: '小学4-5年级',
  name: 'three'
}]

const selectedData2 = [{
  label: '英语',
  name: 'english'
}, {
  label: '奥数',
  name: 'Olympus'
}, {
  label: '音乐',
  name: 'music'
}, {
  label: '美术',
  name: 'art'
}]

const sortData = [{
    label: '机构环境',
    name: 'surroundings',
    isShow: true,
    /* data: [{
      label: '测试1',
      name: 'test1',
    }, {
      label: '测试1',
      name: 'test1',
    }] */
  },
  {
    label: '老师好评度',
    name: 'praise',
    isShow: false
  },
  {
    label: '智能排序',
    name: 'sorting',
    isShow: false
  },
  {
    label: '筛选',
    name: 'filter',
    isShow: false
  }
]

export default {
  selectedData1,
  selectedData2,
  sortData,
}
