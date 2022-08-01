<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginFormRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <img src="~@/assets/img/logo.595745bd.png" class="login-logo" />

      <el-form-item prop="loginName">
        <span class="iconfont icon-zhanghao" />
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="请输入账号"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="iconfont icon-mima" />
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <span
            :class="
              passwordType === 'password'
                ? 'iconfont icon-yanjing1'
                : 'iconfont icon-yanjing'
            "
          />
        </span>
      </el-form-item>

      <el-form-item prop="code">
        <span class="iconfont icon-yanzheng" />
        <el-input
          ref="code"
          v-model="loginForm.code"
          placeholder="请输入验证码"
          name="code"
          type="text"
          tabindex="3"
          auto-complete="on"
        />
        <span @click="createCode">
          <img :src="this.imgUrl" class="code-image" />
        </span>
      </el-form-item>

      <el-button
        class="loginBtn"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getVerificationCode } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        loginType: 0,
        clientToken: ''
      },
      // 表单校验规则，需和数据名称一致
      loginFormRules: {
        loginName: [
          { required: true, message: '请输入账号' },
          {
            pattern: /^[a-zA-Z]\w{4,15}$/,
            message: '账号名或密码错误'
          },
        ],
        password: [
          { required: true, message: '请输入密码' },
          {
            pattern: /^[a-zA-Z]\w{4,15}$/,
            message: '账号名或密码错误',
          },
        ],
        code: [
          { required: true, message: '请输入验证码' },
          {
            pattern: /^[0-9A-Za-z]{4}$/,
            message: '验证码错误',
          },
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      imgUrl: '',
    }
  },
  mounted() {
    this.createCode()
  },
  watch: {},
  methods: {
    async createCode() {
      let clientToken = ''
      const codeLength = 4
      const random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ]
      for (let i = 0; i < codeLength; i++) {
        //循环遍历codeLength，值是几，就循环几次
        let index = Math.floor(Math.random() * 36) //Math.floor方法用于返回小于或等于一个给定数字的最大整数；Math.random方法返回 0（含）和 1（不含）之间的随机数
        clientToken += random[index] //根据索引取得随机数加到code上
      }
      // this.checkCode = code;
      console.log(clientToken)
      this.loginForm.clientToken = clientToken
      const res = await getVerificationCode(clientToken)
      console.log(res)
      const imgUrl = res.request.responseURL
      this.imgUrl = imgUrl
      console.log(imgUrl)
    },
    async login() {
      try {
        console.log(this.loginForm);
        await this.$refs.loginForm.validate()
        this.$store.dispatch('user/getToken', this.loginForm)
        this.$router.push("/");
      } catch (err) {
        // this.$message.error('账号名或密码错误');
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
  },
}
</script>
<style lang="scss">
.login-container {
  .loginBtn {
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg, #2e50e1, #6878f0);
    opacity: 0.91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: #999;
      caret-color: #999;
      -webkit-appearance: none;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
    .el-form-item__error {
      color: #f56c6c;
    }
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('~@/assets/img/background.be4fae7d.png');
  background-repeat: no-repeat;
  background-size: cover;
  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .login-logo {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }
    .el-form-item {
      width: 100%;
      height: 52px;
      margin-bottom: 24px;
      background: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      line-height: 40px;
      position: relative;
      font-size: 14px;
      .code-image {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 30%;
      }
      .iconfont {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        font-size: 18px;
        // display: inline-block;
      }
      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        height: 51px;
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
