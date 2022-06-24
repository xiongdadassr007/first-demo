<template>
    <div>
        <a-radio-group default-value="addDelDemo"  @change="handleSizeChange">
            <a-radio-button value="addDelDemo"> 增删表格 </a-radio-button>
            <a-radio-button value="showNeed"> 按需显示 </a-radio-button>
        </a-radio-group>
    </div>
</template>

<script>
export default {
    name: "buttonChange",
    methods: {
        handleSizeChange(e) {
            this.$emit('changeComponent', e.target.value)
        }
    }
};
</script>

<style lang="less" scoped>

</style>