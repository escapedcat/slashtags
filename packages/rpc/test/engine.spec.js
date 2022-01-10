import { expect } from 'aegir/utils/chai.js'
import { Engine } from '../src/engine.js'
import b4a from 'b4a'

describe('Engine', () => {
  it('Responds correctly to a valid call', async () => {
    const engine = new Engine()

    engine.addMethods({
      ping: async (request) => {
        return 'pong:' + request.noiseSocket.handshakeHash
      }
    })

    const response = await engine.handle({
      jsonrpc: '2.0',
      id: 3423,
      method: 'ping',
      params: {},
      noiseSocket: {
        handshakeHash: 'test-handshakehash'
      }
    })

    expect(response).to.equal(
      '{"jsonrpc":"2.0","id":3423,"result":"pong:test-handshakehash"}'
    )
  })

  it('Throws parsing error', async () => {
    const engine = new Engine()

    engine.addMethods({
      ping: async (request) => {
        return 'pong:' + request.noiseSocket.handshakeHash
      }
    })

    const response = await engine.handle({ foo: 'bar' })

    expect(response).to.equal(
      '{"message":"Invalid request","code":-32600,"data":{"foo":"bar"}}'
    )
  })

  it('Throws error on Method not found', async () => {
    const engine = new Engine()

    const response = await engine.handle({
      jsonrpc: '2.0',
      id: 3423,
      method: 'ping',
      params: { foo: 'bar' },
      noiseSocket: null
    })

    expect(response).to.equal(
      '{"jsonrpc":"2.0","id":3423,"error":{"message":"Method not found: ping","code":-32601}}'
    )
  })

  it('Passes thrown errors from methods', async () => {
    const engine = new Engine()

    engine.addMethods({
      ping: async () => {
        throw new Error('test error from method')
      }
    })

    const response = await engine.handle({
      jsonrpc: '2.0',
      id: 3423,
      method: 'ping',
      params: { foo: 'bar' },
      noiseSocket: null
    })

    expect(response).to.equal(
      '{"jsonrpc":"2.0","id":3423,"error":{"message":"test error from method","code":-32000}}'
    )
  })

  it('Engine: pass thrown errors from methods, with no message', async () => {
    const engine = new Engine()

    engine.addMethods({
      ping: async () => {
        throw new Error()
      }
    })

    const response = await engine.handle({
      jsonrpc: '2.0',
      id: 3423,
      method: 'ping',
      params: { foo: 'bar' },
      noiseSocket: null
    })

    expect(response).to.equal(
      '{"jsonrpc":"2.0","id":3423,"error":{"message":"Error","code":-32000}}'
    )
  })

  it('Engine: handle raw Uint8Array data', async () => {
    const engine = new Engine()
    engine.addMethods({ 'ping:': () => 'pong' })

    const request = JSON.stringify({
      method: 'ping:',
      params: {},
      id: 1,
      jsonrpc: '2.0'
    })

    const uintRequest = b4a.from(request)

    const response = '{"jsonrpc":"2.0","id":1,"result":"pong"}'

    engine.handleRaw(uintRequest, {
      write: (data) => expect(data).to.equal(response)
    })

    engine.handleRaw(request, {
      write: (data) => expect(data).to.equal(response)
    })
  })
})
