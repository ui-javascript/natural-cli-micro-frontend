import React, { Component } from 'react'
import { Link, BrowserRouter } from 'react-router-dom'
import { Checkbox, Alert, Icon } from 'antd'
import Login from 'Components/Login'
import styles from './Login.less'

console.log(BrowserRouter)
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login

export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type })
  };

  handleSubmit = (err, values) => {
    const { type } = this.state
    if (!err) {
      // BrowserRouter.push('/')
      this.props.history.push('/')
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    })
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type='error' showIcon />
  };

  render() {
    const { submitting } = this.props
    const { type } = this.state
    let login = {}
    return (
      <div className='main'>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key='account' tab='账户密码登录'>
            {login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            <UserName name='userName' placeholder='admin/user' />
            <Password name='password' placeholder='888888/123456' />
          </Tab>
          <Tab key='mobile' tab='手机号登录'>
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !login.submitting &&
              this.renderMessage('验证码错误')}
            <Mobile name='mobile' />
            <Captcha name='captcha' />
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href=''>
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>登录</Submit>
          <div className='other'>
            其他登录方式
            <Icon className='icon' type='alipay-circle' />
            <Icon className='icon' type='taobao-circle' />
            <Icon className='icon' type='weibo-circle' />
            <Link className='register' to='/user/register'>
              注册账户
            </Link>
          </div>
        </Login>
      </div>
    )
  }
}
