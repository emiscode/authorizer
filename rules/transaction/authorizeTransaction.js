import { hasLimit } from '../business/hasLimit.js'
import { isAccountActivated } from '../business/isAccountActivated.js'
import { isAccountInitialized } from '../business/isAccountInitialized.js'
import { isDoubledTransaction } from '../business/isDoubledTransaction.js'
import { isHighFrequencyTransaction } from '../business/isHighFrequencyTransaction.js'

export function authorizeTransaction(request, account) {
  let isAuthorized = true

  if (!isAccountInitialized(account)) {
    account.violations.push('account-not-initialized')
    isAuthorized = false
  }

  if (!isAccountActivated(account)) {
    account.violations.push('card-not-active')
    isAuthorized = false
  }

  if (!hasLimit(request, account)) {
    account.violations.push('insufficient-limit')
    isAuthorized = false
  }

  if (isHighFrequencyTransaction(request, account)) {
    account.violations.push('high-frequency-small-interval')
    isAuthorized = false
  }

  if (isDoubledTransaction(request, account)) {
    account.violations.push('doubled-transaction')
    isAuthorized = false
  }

  if (isAuthorized) {
    account.account['available-limit'] =
      account.account['available-limit'] - request.transaction.amount

    account.transactions.push(request.transaction)
  }

  return account
}
