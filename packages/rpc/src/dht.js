import _DHT from '@hyperswarm/dht'

/**
 * Returns a Hyperswarm DHT
 *
 * @param {DHTOpts} [opts]
 * @returns {Promise<DHT>}
 */
// @ts-ignore
export const DHT = async (opts) => new _DHT(opts)

/**
 * @typedef {import('./interfaces').DHT} DHT
 * @typedef {import('./interfaces').DHTOpts} DHTOpts
 */
