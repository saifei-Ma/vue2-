<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="form" :model="loginFrom" :rules="loginRules">
          <!-- 手机号 -->
          <el-form-item prop="mobile">
            <el-input v-model="loginFrom.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginFrom.password" placeholder="请输入密码" />
          </el-form-item>
          <!-- 勾选协议 -->
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginFrom.isAgree">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button style="width: 350px;" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  // 导出默认的登录组件
  name: "Login",
  // 组件名称
  data() {
    // 组件数据
    return {
      // 登录表单
      loginFrom: {
        // 手机号
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        // 密码
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        // 是否同意协议
        isAgree: process.env.NODE_ENV === 'development'
      },
      // 登录表单验证规则
      loginRules: {
        // 手机号
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度在6到18个字符', trigger: 'blur' }
        ],
        isAgree: [{
          validator: (rule, value, callback) => {
            // rule : 规则
            // value : 表单数据 true | false
            // callback : 回调函数 (校验执行, 校验不成功也执行)
            value ? callback() : callback(new Error('请同意用户协议'))
            // 校验不成功, 调用callback, 并传入错误提示信息
            // 校验成功, 调用callback, 不传入任何参数
          }
        }]
      }
    }
 },
  methods : {
    // 登录函数
    login(){
      // console.log(this.$refs.form);
      // 校验表单
      this.$refs.form.validate((isOk) => {
        // 判断表单是否校验通过
        if(isOk){
          
          // 校验成功, 调用接口
          // console.log(this.$store);
          //因为user模块导出的时候**namespaced为true**，所以我们调用action的时候要加上模块名称如**user/login**
          this.$store.dispatch('user/login', this.loginFrom);
          console.log(this.loginFrom);
          // 跳转主页
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;

    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }

    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;

    .el-card {
      border: none;
      padding: 0;
    }

    h1 {
      padding-left: 20px;
      font-size: 24px;
    }

    .el-input {
      width: 350px;
      height: 44px;

      .el-input__inner {
        background: #f4f5fb;
      }
    }

    .el-checkbox {
      color: #606266;
    }
  }
}</style>
