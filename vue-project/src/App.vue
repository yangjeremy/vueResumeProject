<template>
 <div>
   <div class=page v-bind:class="{previewMode:previewMode}">
     <header>
       <Topbar v-on:preview="enterPreview" class="topbar"/>
     </header>
     <main>
       <ResumeEditor class="editor"/>
       <ResumePreview class="preview"/>
     </main>
     <el-button type="success" id="exit-preview" v-on:click="exitPreview">退出预览</el-button>
   </div>
  </div>
 </template>

 <script>
   import 'normalize.css/normalize.css'
   import './assets/reset.css'

   import Topbar from './components/Topbar'
   import ResumeEditor from './components/ResumeEditor'
   import ResumePreview from './components/ResumePreview'
   import icons from './assets/icons'

   import store from './store/index'

   export default {
     name: 'app',
     store,
      components: { Topbar, ResumeEditor, ResumePreview },
      methods:{
    enterPreview(){
      this.previewMode = true
    },
    exitPreview(){
      this.previewMode = false
    }
  },
  data(){
    return {
      previewMode:false
    }
  },
      created() {
        document.body.insertAdjacentHTML('afterbegin', icons) //
        let state=localStorage.getItem('state')
        if(state){
           state=JSON.parse(state)
        }
        this.$store.commit('initState',state)
      }
    }
  </script>

 <style lang="scss">
   .page{
     height: 100vh;
     display: flex;
     flex-direction: column;
     background: #EAEBEC;
     >main{
       flex-grow: 1;
     }
     >main{
       min-width: 1024px;
       max-width: 1440px;
       margin-top: 16px;
       margin-bottom: 16px;
       display: flex;
       justify-content: space-between;
       padding: 0 16px;
       width: 100%; /* 试试不加这句会怎样 */
       align-self: center;
     }
   }


   #resumeEditor{
     min-width: 35%;
     background: #444;
     
   }
   #resumePreview{
     flex-grow: 1;
     margin-left: 16px;
     background: #777;
   }
   #exit-preview{
   display: none;
 }

 .previewMode #resumeEditor{
   display: none;
 }

 .previewMode #topbar{
   display: none;
 }
 .previewMode #exit-preview{
   display: block;
   position: fixed;
   right: 20px;
   bottom: 20px;
 }
 .previewMode #resumePreview{
   max-width: 800px;
   min-width: 800px;
   margin: 10px auto;
 }
   svg.icon{
     height: 1em;
     width: 1em;
     fill: currentColor;
     vertical-align: -0.1em;
     font-size:16px;
   }
 </style>
