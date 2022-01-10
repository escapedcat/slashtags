import { Node } from '@hyperswarm/dht-relay'
import ws from '@hyperswarm/dht-relay/ws'

const DEFAULT_RELAYS = ['wss://dht-relay.synonym.to/']

/**
 * @param {import ('isomorphic-ws').default} wsServer
 */
const tryWS = async (wsServer) =>
  new Promise((resolve) => {
    wsServer.onerror = (/** @type {*} */ error) => resolve(!error)
    wsServer.onopen = () => resolve(wsServer)
  })

/**
 * Returns a Hyperswarm DHT relay
 *
 * @param {DHTOpts} [opts]
 * @returns {Promise<DHT>}
 */
export const DHT = async (opts) => {
  const relays = opts?.relays || [...DEFAULT_RELAYS]

  const WebSocket = await (await import('isomorphic-ws')).default

  let /** @type {import ('isomorphic-ws').default} */ wsServer, relay
  while (!wsServer && (relay = relays.shift())) {
    wsServer = await tryWS(new WebSocket(relay))
  }

  if (!wsServer) {
    // TODO - custom error to show the list of relays tried
    throw new Error('Could not connect to any of the DHT relays')
  }

  return Node.fromTransport(ws, wsServer)
}

/**
 * @typedef {import('./interfaces').DHT} DHT
 * @typedef {import('./interfaces').DHTOpts} DHTOpts
 */
