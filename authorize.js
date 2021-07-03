import fs from 'fs'
import readline from 'readline'
import operations from './services/operations.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', function (file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const file = data.split('\r')

    file.forEach(line => {
      const request = JSON.parse(line)
      const operation = Object.keys(request)[0]
      const response = operations[operation](request)

      console.log(response)
    })
  })
})
