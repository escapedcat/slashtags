import { RPC } from '@synonymdev/slashtags-rpc';
import { DHT } from '@synonymdev/slashtags-rpc/dht';

/**
 * Create a new instance of Slashtags node.
 * @param {object} [opts]
 * @param {string[]} [opts.relays]
 * @returns {Promise<SlashtagsAPI>}
 */
export const Core = async (opts) => {
  return RPC(await DHT(), { relays: opts?.relays });
};

/** @typedef {import ('./interfaces').SlashtagsAPI} SlashtagsAPI */
