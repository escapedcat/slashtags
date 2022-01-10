import { expect } from 'aegir/utils/chai.js'
import b4a from 'b4a'

const VALID_RELAY_SERVER = 'wss://dht-relay.synonym.to/'
const INVALID_RELAY_SERVER = 'ws://invalid.something.net'

const DHT_KEY = b4a.from(
  '3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29',
  'hex'
)

/** @typedef {import ('../src/interfaces').DHT} DHT */
/** @typedef {import ('../src/interfaces').DHTOpts} DHTOpts */
/** @type {(opts?: DHTOpts)=> Promise<DHT>} */
let DHT

describe('DHT', () => {
  before(async () => {
    if (process.title === 'node') {
      DHT = (await import('../src/dht.js')).DHT
    } else {
      DHT = (await import('../src/dht.browser.js')).DHT
    }
  })

  it('Connect to a running node', async () => {
    const node = await DHT()
    const noiseSocket = node.connect(DHT_KEY)

    expect(noiseSocket.remotePublicKey).to.equal(DHT_KEY)
    node.destroy()
  })

  it('Create DHT node and accept a connection from another', async () => {
    const node1 = await DHT()
    const node2 = await DHT()
    const noiseSocket = node2.connect(node1.defaultKeyPair.publicKey)

    expect(noiseSocket.remotePublicKey).to.equal(
      node1.defaultKeyPair.publicKey
    )
    expect(node1.defaultKeyPair.publicKey).to.not.equal(
      node2.defaultKeyPair.publicKey
    )

    node1.destroy()
    node2.destroy()
  })

  it('Try relay servers until one is working', async () => {
    const node = await DHT({
      relays: [INVALID_RELAY_SERVER, VALID_RELAY_SERVER]
    })
    const noiseSocket = node.connect(DHT_KEY)

    expect(noiseSocket.remotePublicKey).to.equal(DHT_KEY)
    node.destroy()
  })

  it('Throws an error if no relays worked', async () => {
    try {
      await DHT({ relays: [INVALID_RELAY_SERVER] })
    } catch (error) {
      expect(error.message).to.equal(
        'Could not connect to any of the DHT relays'
      )
    }
  })
})
