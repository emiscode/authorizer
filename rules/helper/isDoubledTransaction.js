export function isDoubledTransaction(request, account) {
  let isDouble = false

  if (account.transactions.length) {
    for (let i = 0; i < account.transactions.length; i++) {
      if (
        account.transactions[i].merchant === request.transaction.merchant &&
        account.transactions[i].amount === request.transaction.amount
      ) {
        isDouble = true
        break
      }
    }
  }

  return isDouble
}
