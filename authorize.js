import fs from 'fs'
import readline from 'readline'

let account = new Object()
let transactions = new Array()

const createAccount = function (request) {
  if (request.account && account.hasOwnProperty('account')) {
    if (!account.hasOwnProperty('violations')) account.violations = new Array()

    account.violations.push('account-already-initialized')

    const result = JSON.parse(JSON.stringify(account))
    transactions.push({ request: request, result: result })
  } else {
    account = { ...request }
    account.violations = new Array()

    const result = JSON.parse(JSON.stringify(account))
    transactions.push({ request: request, result: result })
  }
}
const businnesRules = [createAccount]

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

    transactions.forEach(transaction => {
      console.log(transaction.result)
    })
  })
})
