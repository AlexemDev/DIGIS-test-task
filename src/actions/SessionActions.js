
import { checkCredentials } from '../helpers/session';

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export function logIn(params, cb) {
  return dispatch => {
    if (checkCredentials(params)) {
      dispatch({
        type: LOG_IN,
        payload: {
          name: params.userName,
        },
      })
      cb()
      localStorage.setItem('isAuth', JSON.stringify({key: true, name: params.userName}));
    } else {
      dispatch({
        type: LOG_IN_FAILURE,
        payload: {
          errorMsg: 'Имя пользователя или пароль введены не верно',
        },
        error: true, // https://github.com/redux-utilities/flux-standard-action
      })
    }
  }
}

export function logOut() {
  localStorage.setItem('isAuth', JSON.stringify({key: false, name: ''}));
  return {
    type: LOG_OUT,
  }
}
