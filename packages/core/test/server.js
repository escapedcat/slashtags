import { Core } from '../src/index.js';
import WebSocket from 'isomorphic-ws';

const main = async () => {
  const node = await Core();

  node.use((req, res, next, end) => {
    console.log(req);
    if (req.method !== 'foo') next();

    res.result = 42;
    end();
  });

  const wss = await node.listen({ port: 9999 });

  setTimeout(async () => {
    await wss.close();
    setTimeout(() => {
      process.exit(0);
    }, 100);
  }, 100000);
};

main();
