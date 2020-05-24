import React, { useState } from 'react'
import { Form, Icon, Input, Checkbox, Button, notification } from 'antd'
import { AlertTriangle } from 'react-feather'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import client from '@graphql'
import './index.scss'

const LOGIN_USER = gql`
  query($loginInput: LoginInput!) {
    loginRoot(loginInput: $loginInput)
  }
`
function LoginForm(props) {
  const [checked, setChecked] = useState(true)
  const [visible, setVisible] = useState(false)
  const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  const handleCancel = () => {
    setVisible(false)
  }
  const handleSubmit = e => {
    e.preventDefault()
    const { form } = props
    form.validateFields(async (err, values) => {
      if (checked) {
        sessionStorage.setItem('username', values.username)
        sessionStorage.setItem('password', values.password)
      } else {
        sessionStorage.setItem('username', '')
        sessionStorage.setItem('password', '')
      }
      if (!err) {
        const { username, password } = values
        await client
          .query({
            query: LOGIN_USER,
            variables: {
              loginInput: {
                username,
                password
              }
            }
          })
          .then(res => {
            console.log(res)
            const token = res.data.loginRoot
            props.stores.globalState.onAuth(token)
            props.history.push('/home')
            notification.bar({
              title: 'Đăng nhập thành công',
              type: 'success',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          })
          .catch(() => {
            notification.bar({
              title: 'Tên đăng nhập hoặc mật khẩu không chính xác',
              type: 'error',
              placement: 'bottomRight'
            })
          })
      }
    })
  }
  const handleEnter = e => {
    const { form } = props
    if (e.keyCode === 13) {
      e.preventDefault()
      handleSubmit(e)
      form.validateFields()
    }
  }
  const {
    form: { getFieldDecorator, getFieldsError }
  } = props
  const usname = sessionStorage.getItem('username')
  const pw = sessionStorage.getItem('password')
  return (
    <div className='wrapper'>
      <div className='logo' />
      <div className='title'>
        <h1>Đăng nhập</h1>
      </div>
      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: usname,
            rules: [{ required: true, message: 'Vui lòng không để trống tên đăng nhập' }]
          })(<Input size='large' placeholder='Tên đăng nhập' spellCheck={false} onKeyDown={handleEnter} />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: pw,
            rules: [{ required: true, message: 'Vui lòng không để trống mật khẩu' }]
          })(
            <Input.Password
              type='password'
              size='large'
              placeholder='Mật khẩu'
              spellCheck={false}
              onKeyDown={handleEnter}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('staySignedIn')(
            <Checkbox checked={checked} onClick={() => {}}>
              Nhớ mật khẩu
            </Checkbox>
          )}
          <div className='forgot-btn' onClick={() => {}}>
            Quên mật khẩu
          </div>
        </Form.Item>
        <Form.Item className='btn-login'>
          <Button
            type='primary'
            size='large'
            block
            disabled={hasErrors(getFieldsError())}
            className='submitLogin'
            style={{ height: 46, width: '100%' }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div className='error-wrapper' style={{ opacity: hasErrors(getFieldsError()) ? '1' : '0' }}>
        <Icon component={AlertTriangle} />
        <span className='text'>Tên đăng nhập hoặc mật khẩu không chính xác</span>
      </div>
    </div>
  )
}

const Login = Form.create({ name: 'normal_login' })(LoginForm)

export default inject('stores')(observer(withRouter(Login)))
