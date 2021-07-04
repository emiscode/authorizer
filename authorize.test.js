import fs from 'fs'
import util from 'util'
import operations from './services/operations.js'

const inputDir = 'tests/inputs/'
const outputDir = 'tests/outputs/'
const inputFiles = readFilesFromDir(inputDir)
const outputFiles = readFilesFromDir(outputDir)
const inputOperations = readFileContent(inputDir, inputFiles)
const expectedResults = readFileContent(outputDir, outputFiles)

startTest()

function startTest() {
  for (let i = 0; i < inputFiles.length; i++) {
    const input = inputOperations[i]
    const inputLines = input.split('\r')
    const expectedRes = expectedResults[i]
    const expectedResLines = expectedRes.split('\r')

    for (let line = 0; line < expectedResLines.length; line++) {
      if (inputLines[line].startsWith('#'))
        console.log(`Test ${i + 1}/${inputFiles.length} - ${inputLines[line]}`)

      const request = JSON.parse(inputLines[line + 1])
      const operation = Object.keys(request)[0]
      const response = operations[operation](request)
      const expectedResponse = JSON.parse(expectedResLines[line])

      if (util.isDeepStrictEqual(response, expectedResponse))
        console.log('<SUCCESS>')
      else {
        console.log(`########## <FAIL> ##########`)
        console.log('expected: ')
        console.log(expectedResponse)
        console.log('received: ')
        console.log(response)
      }
    }

    operations.tests.clean()
  }
}

function readFilesFromDir(dirname) {
  return fs.readdirSync(dirname, (err, files) => {
    if (err) {
      console.error(err)
      return
    }
    return files
  })
}

function readFileContent(dirname, files) {
  const data = []

  files.forEach(file => {
    data.push(fs.readFileSync(dirname + file, 'utf8'))
  })

  return data
}
