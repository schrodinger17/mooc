<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 资源管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加资源</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="资源名称">
                        <el-input v-model="form.filename"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="上传">
                        <input type="file" ref="inputer">
                    </el-form-item>
                    

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'baseform',
    data() {
        return {
            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
                                    value: 'tianhe',
                                    label: '天河区'
                                },
                                {
                                    value: 'haizhu',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: 'dongguan',
                            label: '东莞市',
                            children: [
                                {
                                    value: 'changan',
                                    label: '长安镇'
                                },
                                {
                                    value: 'humen',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'hunan',
                    label: '湖南省',
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ],
            form: {
                filename:"",

                file:this.$refs.inputer
            },
            imageUrl: ''
        };
    },
    methods: {
        onSubmit() {
            console.log(this.form)

            const param = new FormData();
            param.append("filename", this.form.filename);
            param.append("file", this.$refs.inputer.files[0]);

            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            // axios.post("http://mooc.tt/1.php?filename="+this.form.filename, param, config).then(res => {
            axios.post("http://47.93.116.52:20006/1.php?filename="+this.form.filename, param, config).then(res => {
                console.log(res);
            
})
        }
    
    }
};
</script>