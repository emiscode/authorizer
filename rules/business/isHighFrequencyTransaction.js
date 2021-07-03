export function isHighFrequencyTransaction(request, account) {
  if (account.transactions.length >= 3) {
    const minute = 60000
    const requestTime = Date.parse(request.transaction.time)

    const accountTime = Date.parse(
      account.transactions[account.transactions.length - 3].time
    )
    return (requestTime - accountTime) / minute < 2
  }

  return false
}
