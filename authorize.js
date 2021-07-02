import fs from 'fs'
import readline from 'readline'

let account = new Object()
let records = new Array()

const createAccount = function (request) {
  if (request.account) {
    /* ##### account-already-initialized ##### */
    if (
      request.account &&
      account.hasOwnProperty('account') &&
      account.account['active-card']
    ) {
      if (!account.hasOwnProperty('violations'))
        account.violations = new Array()

      account.violations.push('account-already-initialized')
      populateRecords(account, request)
    } else {
      /* ##### new account ##### */
      account = { ...request }

      if (!account.hasOwnProperty('violations'))
        account.violations = new Array()

      account.violations = new Array()
      populateRecords(account, request)
    }
  }
}

const authorizeTransaction = function (request) {
  if (request.transaction) {
    /* ##### account-not-initialized  ##### */
    if (!account.account) {
      account.account = new Object()

      if (!account.hasOwnProperty('violations'))
        account.violations = new Array()

      account.violations.push('account-not-initialized')
      populateRecords(account, request)
    } else {
      checkLimit(request)
    }
  }
}

const businnesRules = [createAccount, authorizeTransaction]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

rl.on('line', function (file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    data.split('\r').forEach(line => {
      const request = JSON.parse(line)

      businnesRules.forEach(rule => {
        rule(request)
      })
    })

    records.forEach(record => {
      console.log(record.result)
    })
  })
})

function populateRecords(account, request) {
  const result = JSON.parse(JSON.stringify(account))
  records.push({ request: request, result: result })
}

function checkLimit(request) {
  if (account.account['available-limit'] >= request.transaction.amount) {
    account.account['available-limit'] =
      account.account['available-limit'] - request.transaction.amount
  } else {
    if (!account.hasOwnProperty('violations')) account.violations = new Array()

    account.violations.push('insufficient-limit')
    populateRecords(account, request)
  }
}
