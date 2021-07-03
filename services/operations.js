import accountModel from '../models/account.js'
import rules from '../rules/rules.js'

let account = accountModel

export default {
  account: request => {
    rules.forAccount.forEach(rule => {
      account = rule[Object.getOwnPropertyNames(rule)](request, account)
    })

    const { transactions, ...response } = account
    return response
  },
  transaction: request => {
    rules.forTransaction.forEach(rule => {
      rule[Object.getOwnPropertyNames(rule)](request, account)
    })
  },
}
