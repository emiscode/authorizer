import { isAccountActivated } from '../helper/isAccountActivated.js'

export function createAccount(request, account) {
  if (isAccountActivated(account)) {
    account.violations.push('account-already-initialized')

    return account
  }

  return Object.assign(account, request)
}
