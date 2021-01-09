<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 课程管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="ID" width="55" align="center"><template slot-scope="scope">{{scope.$index+1}}</template></el-table-column>
                <el-table-column prop="title" label="课程名称"></el-table-column>
                <el-table-column prop="category" label="课程分类"></el-table-column>
                <el-table-column prop="introduction" label="课程介绍"></el-table-column>
                <el-table-column prop="hard.text" label="课程级别"></el-table-column>
                <el-table-column label="教授讲师">
                    <template slot-scope="scope">{{scope.row.teacher.name}}</template>
                </el-table-column>
                <el-table-column label="技术栈">
                    <template slot-scope="scope">{{scope.row.labels[0]}}</template>
                </el-table-column>
                <el-table-column label="课程价格">
                    <template slot-scope="scope">￥{{scope.row.price}}</template>
                </el-table-column>
                <el-table-column label="课程图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.img"
                            :preview-src-list="[scope.row.img]"
                        ></el-image>
                    </template>
                </el-table-column>


                <el-table-column prop="date" label="开课时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="章节树" :visible.sync="editVisible" width="60%">

            <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            @node-click="this.handlerNode"
            default-expand-all
            ref="tree"> 
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
                <el-dialog title="编辑章节" :visible.sync="editVisible2" width="30%">
                <el-form ref="form1" :model="form1" label-width="80px">
                    <el-form-item label="课程ID">
                        <el-input v-model="form1.id"></el-input>
                    </el-form-item>  
                    <el-form-item label="章节名称">
                        <el-input v-model="form1.chapter"></el-input>
                    </el-form-item>  
                    <el-form-item label="视频链接">
                        <el-input v-model="form1.src"></el-input>
                    </el-form-item>  
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit2">立即修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    </el-form>

        </el-dialog>
    </div>
</template>

<script>
import chapter from '../../../api/chapter';
import { fetchData } from '../../../api/lesson';
import { getCatalog } from '../../../api/lesson';
import axios from 'axios'
export default {
    name: 'lessontable',
    data() {
        return {
            query: {
                id:0,
                category:"",
                title:"",
                introduction:"",
                img:"",
                banner:"",
                type:"",
                hard:"",
                price:"",
                teacher:"",
                persons:"",
                comments:""
            },
            lesson:{

            },
            form1:{
                id:"",
                chapter:"",
                src:""
            },
            data: [] ,
            filterText:"",
            filterNode:[],
            defaultProps: {
            children: 'children',
            label: 'label'
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            editVisible2: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {

                this.tableData = res.data;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handlerNode(obj,node,array){
            this.form1.id=this.form.id
            this.form1.chapter=obj.label
            this.editVisible2=true
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
            getCatalog(this.data).then(res=>{
                console.log(res)
                this.data=res.data
                this.handlerdata()
            })
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handlerdata(){
            //data.catalog.chapter
            var _data = []
            var chapters=this.data.catalog.chapter
            for(var chapter in chapters){
                var _children = []
                for(var term in chapters[chapter].term){
                    _children.push({id:chapters[chapter].term[term]._id,label:chapters[chapter].term[term].title})
                }
                _data.push({id:chapters[chapter]._id,label:chapters[chapter].title,children:_children})
            }
            this.data=_data


        },
        onSubmit2(){
            console.log(this.form1)
            // this.$axois.get()
            axios.post("http://wp.rycbar.club:4300/lesson/chapter",this.form1).then(data=>{console.log(data)})
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
