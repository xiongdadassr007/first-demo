<template>
    <div class="showNeed-container">
        <a-button type="primary" v-if="isShow" @click="showInput"> 显示输入框 </a-button>
        <a-input placeholder="请输入内容" 
        size="large" 
        v-else 
        style="width: 50%" 
        ref="inputRef"
        @blur="showButton"/>
    </div>
</template>

<script>
export default {
    name: "showNeed",
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        showInput() {
            this.isShow = false
            this.$nextTick(() => this.$refs.inputRef.focus())
        },
        showButton() {
            this.isShow = true
        }
    }
};
</script>


<style lang="less" scoped>
.showNeed-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>