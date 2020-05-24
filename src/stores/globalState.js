import { observable, action } from 'mobx'

export class GlobalState {
  @observable
  isAuth = !!window.localStorage.getItem('token')

  @observable
  myInfo = null

  @action
  onAuth = token => {
    window.localStorage.setItem('token', token)
    this.isAuth = true
  }

  @action
  setMyInfo = myInfo => {
    this.myInfo = myInfo
  }

  @action
  logout = () => {
    this.isAuth = false
    this.myInfo = null
    window.localStorage.clear()
  }
}
