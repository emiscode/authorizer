import { createAccount } from './account/createAccount.js'
import { authorizeTransaction } from './transaction/authorizeTransaction.js'

export default {
  forAccount: [{ createAccount: createAccount }],
  forTransaction: [{ authorizeTransaction: authorizeTransaction }],
}
