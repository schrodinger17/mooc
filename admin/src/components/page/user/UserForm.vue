<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 用户管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="生日">
                        <el-col :span="11">
                            <div class="block">
                                <el-date-picker
                                v-model="form.birthday"
                                type="date"
                                placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="teacher" label="讲师" value="bbk"></el-option>
                            <el-option key="student" label="学生" value="xtc"></el-option>
                            <el-option key="admin" label="管理员" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="用户余额">
                        <el-input v-model="form.money"></el-input>
                    </el-form-item>
                    <el-form-item label="启用状态">
                        <el-switch v-model="form.state"></el-switch>
                    </el-form-item>

                    <el-form-item label="备注">
                        <el-input type="textarea" rows="2" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
    <style>
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    </style>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            imageUrl:"",
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
            "id": 0,
            "name": "",
            "money": 0,
            "address": "",
            "state": "",
            "date": "",
            "avatar": ""
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        },
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
      }
    }
};
</script>