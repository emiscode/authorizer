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
  let log = ''
  let successCount = 0
  let failCount = 0
  let totalTests = 0

  for (let i = 0; i < inputFiles.length; i++) {
    const input = inputOperations[i]
    const inputLines = input.split('\r')
    const expectedRes = expectedResults[i]
    const expectedResLines = expectedRes.split('\r')

    for (let line = 0; line < expectedResLines.length; line++) {
      if (inputLines[line].startsWith('#')) {
        log += `
        Test ${i + 1}/${inputFiles.length} - ${inputLines[line]}
        `
        console.log(log)
      }

      const request = JSON.parse(inputLines[line + 1])
      const operation = Object.keys(request)[0]
      const response = operations[operation](request)
      const expectedResponse = JSON.parse(expectedResLines[line])
      totalTests++

      log += `
        input data:
        ${JSON.stringify(request)}
        expected result:
        ${JSON.stringify(expectedResponse)}
        received result:
        ${JSON.stringify(response)}\n`

      if (util.isDeepStrictEqual(response, expectedResponse)) {
        log += `
        ---------- <SUCCESS> ----------
        `
        successCount++
      } else {
        log += `
        ########## <FAIL> ##########
        `
        failCount++
      }
    }

    console.log(log)
    operations.tests.clean()
  }

  const summary = `
    ========== <SUMMARY> ==========
    <SUCCESS> ${successCount}/${totalTests}
    <FAIL> ${failCount}/${totalTests}
  `
  log += summary
  console.log(summary)

  const logFile = `tests/${new Date().toISOString().replace(/:/g, '-')}.txt`

  fs.writeFileSync(logFile, log)

  console.log(`<LOG> salvo em ${logFile}`)
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
