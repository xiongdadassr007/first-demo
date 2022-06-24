// 手动实现表格的增删功能
// 另外熟悉 antDesign a-table的搭配穿插slot使用，和修改内容功能
<template>
    <div class="addDelDemo">
        <div class="addDelDemo-input">
            <a-input-search
                placeholder="请输入品牌名"
                size="large"
                v-model.trim="inputText"
                style="width: 50%"
            >
                <!-- 通过slot addonBefore/addonAfter 可将按钮放置输入框前后 -->
                <span slot="addonBefore"> 品牌名 </span>
                <a-button slot="addonAfter" @click="handleAdd"> 增加 </a-button>
            </a-input-search>
            <!-- <a-button class="editable-add-btn" @click="handleAdd"> Add </a-button> -->
        </div>
        <a-table bordered :data-source="dataSource" :columns="columns">
            <template slot="name" slot-scope="text, record">
                <!-- slot-scope 中第一个参数表示该单元格的值，第二个参数为这一行的全部内容（对象形式），第三个参数表示该行的索引值 -->
                <editable-cell
                    :text="text"
                    @change="onCellChange(record.key, 'name', $event)"
                />
            </template>
            <template slot="status" slot-scope="text">
                <a-switch :defaultChecked="text" />
            </template>
            <template slot="operation" slot-scope="text, record">
                <!-- confirm 为弹出提示框 -->
                <a-popconfirm
                    v-if="dataSource.length"
                    title="Sure to delete?"
                    @confirm="() => onDelete(record.key)"
                >
                    <a href="javascript:;">Delete</a>
                </a-popconfirm>
            </template>
        </a-table>
    </div>
</template>
<script>
import EditableCell from "@/components/editableCell.vue";
var dayjs = require("dayjs");
export default {
    name: "addDelDemo",
    components: {
        EditableCell,
    },
    data() {
        return {
            // 新增input输入的双向绑定
            inputText: "",
            dataSource: [
                {
                    key: "0",
                    name: "宝马",
                    status: true,
                    date: dayjs().format("YYYY-MM-DD"),
                },
                {
                    key: "1",
                    name: "奥迪",
                    status: false,
                    date: dayjs().format("YYYY-MM-DD"),
                },
                {
                    key: "2",
                    name: "奔驰",
                    status: true,
                    date: dayjs().format("YYYY-MM-DD"),
                },
            ],
            count: 3,
            columns: [
                {
                    title: "品牌",
                    dataIndex: "name",
                    width: "30%",
                    scopedSlots: { customRender: "name" },
                },
                {
                    title: "状态",
                    dataIndex: "status",
                    scopedSlots: { customRender: "status" },
                    //必须添加第三项，不然template slot 不生效
                },
                {
                    title: "日期",
                    dataIndex: "date",
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    scopedSlots: { customRender: "operation" },
                },
            ],
        };
    },
    methods: {
        onCellChange(key, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find((item) => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
        onDelete(key) {
            // 组件原有的删除功能
            // const dataSource = [...this.dataSource];
            // this.dataSource = dataSource.filter((item) => item.key !== key);

            // 自定义删除功能
            // 传递的 record.key 的 key 是上面 dataSource 成员中定义的 key 属性
            // 筛选保留 行索引值与所拿到索引值不同的成员
            this.dataSource = this.dataSource.filter(
                (item) => item.key !== key
            );
        },
        handleAdd() {
            // 组件原有的增加功能
            // const { count, dataSource } = this;
            // const newData = {
            //     key: count,
            //     name: `Edward King ${count}`,
            //     status: 32,
            //     date: `London, Park Lane no. ${count}`,
            // };
            // this.dataSource = [...dataSource, newData];
            // this.count = count + 1;

            // 自定义增加功能
            const { count, dataSource, inputText } = this;
            const newData = {
                key: count,
                name: inputText,
                status: true,
                date: dayjs().format("YYYY-MM-DD"),
            };
            // 注意重新赋值时要加上 this , 不能直接使用解构出来的值
            this.dataSource = [...dataSource, newData];
            this.count = count + 1;
        },
    },
};
</script>
<style>
.editable-cell {
    position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
    padding-right: 24px;
}

.editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
}

.editable-cell-icon {
    line-height: 18px;
    display: none;
}

.editable-cell-icon-check {
    line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
    display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
    color: #108ee9;
}

/* .editable-add-btn {
    margin-bottom: 8px;
} */

/* 修改输入框样式 */
.addDelDemo-input {
    width: 100%;

    margin-bottom: 20px;
    text-align: center;
}

/* 修改整体的样式 */
.addDelDemo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}
</style>