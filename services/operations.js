import accountModel from '../models/account.js'
import rules from '../rules/rules.js'

let account = accountModel

const output = function () {
  const { transactions, ...response } = account
  account.violations = []
  return response
}

export default {
  account: request => {
    rules.forAccount.forEach(rule => {
      account = rule[Object.getOwnPropertyNames(rule)](request, account)
    })

    return output()
  },
  transaction: request => {
    rules.forTransaction.forEach(rule => {
      account = rule[Object.getOwnPropertyNames(rule)](request, account)
    })

    return output()
  },
}
