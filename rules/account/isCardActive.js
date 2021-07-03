export function isCardActive(request, account) {
  if (account.account['active-card']) {
    account.violations.push('account-already-initialize')

    return account
  }

  return Object.assign(account, request)
}
