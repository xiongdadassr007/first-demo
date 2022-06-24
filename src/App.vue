<template>
  <div id="app">
        <div class="app-button">
            <buttonChange @changeComponent="changeComponent"></buttonChange>
        </div>
        <keep-alive>
            <component :is="pageChange"></component>
        </keep-alive>
        
  </div>
</template>

<script>
import showNeed from '@/components/showNeed.vue'
import addDelDemo from '@/components/addDelDemo.vue'
import buttonChange from '@/components/buttonChange.vue'
import "@/assets/less/global.less"
export default {
  name: 'App',
  components: {
    addDelDemo,
    showNeed,
    buttonChange
  },
  data() {
    return {
        pageChange: addDelDemo
    }
  },
  methods: {
    changeComponent(value) {
        this.pageChange = value
    }
  }
}
</script>

<style lang="less" scoped>
.app-button {
    text-align: center;
    position: fixed;
    left: 50%;
    top: 10%;
    transform: translate(-50%);
}

</style>
