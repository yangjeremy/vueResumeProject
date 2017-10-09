import Vuex from 'vuex'
 import Vue from 'vue' // 思考：在多个文件 import vue ，会怎样
 import objectPath from "object-path"

 Vue.use(Vuex) // 不写这句话浏览器控制台就会报错，于是我就写了

 export default new Vuex.Store({
  state: {

    count: 0,
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },

    icon: [
      'id', 'work', 'book', 'heart', 'cup', 'phone'
    ],

    resume: {
      config: [
        { title: '个人信息', field: 'profile', icon: 'id' },
        { title: '工作经历', field: 'workHistory', icon: 'work' },
        { title: '项目经历', field: 'projects', icon: 'heart' },
        { title: '学习经历', field: 'education', icon: 'book' },
        { title: '获奖经历', field: 'awards', icon: 'cup' },
        { title: '联系方式', field: 'contacts', icon: 'phone' },
      ],
      profile: {
        name: 'Jeremy',
           city: '广州',
           title: '前端前端',
           birthday: '1993-01-01'
      },
      workHistory: [
        {
            company: 'aaaaa', content: `公司总部设在XXXX区，先后在xxx，xxx成立分公司。
  我的主要工作如下:
  1. xxxxxxxx。
  2. 修复 bug。`
          },
          { company: '巴萨罗那俱乐部', content: `公司总部设在加泰罗尼亚区，先后在xxx，xxx取得冠军。
  我的主要工作如下:
  1. 完成既定产品需求。
  2. bbbbbbbb` },
      ],
      education: [
        { school: 'wy大学', content: '本科' },
        { school: 'xxx高中'},
      ],
      projects: [
          { name: 'project A', content: '文字' },
          { name: 'project B', content: '文字' },
        ],
        awards: [
           { name: '欧洲冠军', content: '连续十次获得欧冠奖杯' },
           { name: '三好学生'},
         ],
      contacts: [
        { contact: 'phone', content: '13812345678' },
        { contact: 'QQ', content: '12345678' },
      ]
    }
  },
  mutations: {
    initState(state, payload) {
      Object.assign(state,  payload);
    },
    switchTab(state, payload) {
      state.selected = payload;
      localStorage.setItem('state', JSON.stringify(state));
    },
    updateResume(state, {path, value}) {
      objectPath.set(state.resume, path, value);
      localStorage.setItem('state',  JSON.stringify(state));
    },
    addFieldItem(state, {path}) {
      let newItem = JSON.parse(JSON.stringify(state.resume[path][0]));
      for (let key in newItem) {
        newItem[key] = '';
      }
      objectPath.push(state.resume,  path,  newItem);
      localStorage.setItem('state',  JSON.stringify(state));
    },
    removeFieldItem(state, {path, index}) {
      state.resume[path].splice(index,  1);
      // let newItem = JSON.parse(JSON.stringify(state.resume[path][0]));
      // for (let key in newItem) {
      //   newItem[key] = '';
      // }
      // objectPath.push(state.resume,  path,  newItem);
      localStorage.setItem('state',  JSON.stringify(state));
    },
    setUser(state, payload) {
      Object.assign(state.user,  payload);
    },
    removeUser(state) {
      state.user.id = '';
    }
  }
})
