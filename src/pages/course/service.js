class Service {
  constructor() {
    // 单击页面跳转的节点值
    this.data = null
  }
  setData(value) {
    this.data = value
  }
  getData() {
    return this.data
  }
}

export default new Service()