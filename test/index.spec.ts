import { run } from '../src'
import { init } from '../src/commands/init'
import { react } from '../src/commands/react'
import { reason } from '../src/commands/reason'
import { add } from '../src/commands/add'
import { snippets } from '../src/commands/snippets'

jest.mock('chalk', () => ({
  blue: (param: string) => param,
  green: (param: string) => param,
  yellow: (param: string) => param,
  red: (param: string) => param,
  italic: {
    bgRed: (param: string) => param,
  },
}))
jest.mock('../src/commands/init')
jest.mock('../src/commands/react')
jest.mock('../src/commands/reason')
jest.mock('../src/commands/add')
jest.mock('../src/commands/snippets')

jest.spyOn(global.console, 'log').mockImplementation(() => {})

test('handles init command', () => {
  run({ input: ['init'], flags: {} })

  expect(init).toHaveBeenCalled()
})

test('handles react command', () => {
  run({ input: ['react', 'test'], flags: { typescript: true } })

  expect(react).toHaveBeenCalledWith({
    name: 'test',
    flags: { typescript: true },
  })
})

test('handles reason command', () => {
  run({ input: ['reason', 'test'], flags: {} })

  expect(reason).toHaveBeenCalledWith({ name: 'test', flags: {} })
})

test('handles add command', () => {
  run({ input: ['add', 'test'], flags: {} })

  expect(add).toHaveBeenCalledWith('test')
})

test('handles snippet command', () => {
  run({ input: ['snippets'], flags: { language: 'typescript', ide: 'vim' } })

  expect(snippets).toHaveBeenCalledWith({ language: 'typescript', ide: 'vim' })
})

test('handles unknown command by displaying help', () => {
  run({ input: ['__not_valid__'], flags: {}, help: 'help' })

  expect(global.console.log).toHaveBeenCalledWith('help')
})
