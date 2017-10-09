<template>
   <div id="resumeEditor">
     <nav>
       <ol>
         <li v-for="(item,index) in resume.config" :class="{active: item.field === selected}" @click="selected = item.field">
           <svg class="icon">
             <use :xlink:href="`#icon-${item.icon}`"></use>
           </svg>
         </li>
       </ol>
     </nav>
     <ol class="panels">
       <li v-for="item in resume.config" v-show="item.field === selected">
         <div v-if="resume[item.field] instanceof Array">
           <div class="subitem" v-for="(subitem,i) in resume[item.field]">
              <i class="el-icon-circle-close close-item" v-show="resume[item.field].length > 1" @click="removeItem(`${item.field}`, i)"></i>

             <div class="resumeField" v-for="(value,key) in subitem">
               <label> {{key}} </label>

                  <input class="input text" type="text" placeholder="input" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)"></input>

             </div>
             <hr>

           </div>
           <el-button type="primary" v-on:click="addItem(`${item.field}`)">添加一项</el-button>
          </div>
          <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
            <label> {{key}} </label>

               <input class="input text" type="text" placeholder="input" :value="value"  @input="changeResumeField(`${item.field}.${key}`, $event.target.value)"></input>

        </div>
      </li>

    </ol>
  </div>
</template>

<script>
  export default {
    name: 'ResumeEditor',

    computed: {

        selected:{
         get(){
           return this.$store.state.selected
         },
         set(value){
           return this.$store.commit('switchTab', value)
         }
      },
      resume (){
        return this.$store.state.resume
      }
    },
    methods: {
       changeResumeField(path,value){
          this.$store.commit('updateResume',{
            path,
            value
          })
       },
       addItem(path) {
         this.$store.commit('addFieldItem', {path});
       },
       removeItem(path, index) {
         this.$store.commit('removeFieldItem', {path, index});
       }
    }
  }
</script>

<style lang="scss">

#resumeEditor{
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
  display:flex;
  flex-direction:row;
  overflow:auto;
  >nav {
    width:80px;
    background-color: #000;
    color:white;
    >ol{
        >li{
          height:48px;
          display:flex;
          justify-content:center;
          align-items:center;
          margin-top:16px;
          margin-bottom:16px;
          &.active {
              background:white;
              color:black;
          }
      }
    }
  }
  >.panels{
  flex-grow:1;
  overflow: auto;
  >li{
    padding:24px;
  }
  .subitem {
       position: relative;
     }
}
  svg.icon{
      width:24px;
      height:24px;
    }
}
ol{
list-style:none;
}
.resumeField{
  >label {
    display:block;
  }
  input[type=text]{
    margin:16px 0;
    border:1px solid #ddd;
    box-shodow: 0 1px 3px 0 rgba(0,0,0,.5);
    width:100%;
    height:40px;
    padding:0 8px;
    border-radius: 4px;
    outline-color: #4D9D8C;
  }
}
hr{
border: none;
border-top:1px solid #ddd;
margin:24px 0;
}
.close-item {
    position: absolute;
    right: 0px;
    top: 0px;
    &:hover {
      cursor: pointer;
    }
  }
</style>
