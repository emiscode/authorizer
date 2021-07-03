export function hasLimit(request, account) {
  return account.account['available-limit'] >= request.transaction.amount
}
