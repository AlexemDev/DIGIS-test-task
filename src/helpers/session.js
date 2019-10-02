export function checkCredentials(params) {

  if (
    params.userName !== 'admin' ||
    params.password !== '12345'
  ) {

    return false
  }

  return true
}
