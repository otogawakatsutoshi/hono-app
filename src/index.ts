import app from './app';
import { serve } from '@hono/node-server'
import * as http2 from 'node:http2'
import { readFileSync } from 'node:fs'
import { Env } from './Env';
import { config } from 'dotenv';

/**
 * @description set environment variable this process.
 * @public
 */
function set_environment_variable() {

  // if you switch platform or environment, all write this funcitoin.
  // read .env file
  config();
}

/**
 * @description get this process having environment variable.
 * @public
 * @returns [Env] get
 */
function get_environment_variable(): Env{

  // set server environment variable.
  const port = parseInt(process.env.PORT ?? "3000");
  const hostname = process.env.HOSTNAME ?? "localhost";
  const key = process.env.KEY ?? "keys/server.key";
  const cert = process.env.CERT ?? "keys/server.cert";

  const env: Env = {
    port,
    hostname,
    key,
    cert
  }

  return env;
}

/**
 * @description launch server.
 * @param [Env]
 */
function launch_server(env: Env) {

  const { port, hostname, key, cert } = env;

  // nodejs server.
  const server = serve({
    fetch: app.fetch,
    createServer: http2.createSecureServer,
    serverOptions: {
      key: readFileSync(key),
      cert: readFileSync(cert),
    },
  })

  server.listen(
    port,
    hostname
  )

  console.log(`Server is running on port https://${hostname}:${port}`)
}

// set environment_variable for this process.
set_environment_variable();

const env: Env = get_environment_variable();

launch_server(env);
