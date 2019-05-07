import {combineReducers} from 'redux'
import userGlobal from './userGlobal'
import cartGlobal from './cartGlobal'
import notifGlobal from './notifGlobal'

export default combineReducers({
  user : userGlobal,
  cart : cartGlobal,
  notif: notifGlobal
})