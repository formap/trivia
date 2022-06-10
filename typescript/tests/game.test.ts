import { GameRunner } from '../src/game-runner'
import { mockRandom } from 'jest-mock-random'
import { testData } from './testData'

describe('The test environment', () => {
  const originalLog = console.log

  beforeEach(() => {
    console.log = jest.fn()
  })

  afterAll(() => {
    console.log = originalLog
  })

  it.each(testData)('golden master 1', ({ mathRandomSequence, logs }) => {
    mockRandom(mathRandomSequence)

    GameRunner.main()

    expect(getLogs()).toEqual(logs)
  })
})

function getLogs() {
  return (console.log as jest.Mock).mock.calls
    .flat(2)
    .reduce((acc, curr) => acc + '\n' + curr, '')
}
