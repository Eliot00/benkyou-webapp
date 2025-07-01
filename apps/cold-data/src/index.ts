import { WorkerEntryPoint } from 'cloudflare:workers'

export default class WorkerB extends WorkerEntrypoint {
  // Currently, entrypoints without a named handler are not supported
  async fetch() { return new Response(null, {status: 404}); }

  async add(a: number, b: number) { return a + b; }
}
