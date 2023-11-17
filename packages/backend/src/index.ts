import http from 'http'
import { backend } from 'shared'
import { send, serve } from 'micro'
import {
	EndpointMatcher,
	NodeHttpRouter,
} from '@bessonovs/node-http-router'

const router = new NodeHttpRouter(({ data: { res } }) => send(res, 404))

const [address, port] = ['0.0.0.0', 3000]

const server = http.createServer(serve(router.serve)).listen(port, address)
server.once('listening', () => {
	// eslint-disable-next-line no-console
	console.log(`started at http://${address}:${port}`)
})

router.addRoute({
	matcher: new EndpointMatcher<{ name: string }>('GET', /^\/hello\/(?<name>[^/]+)$/),
	handler({ match: { result } }) {
		return `Hello ${result.match.groups.name} ${backend()}!`
	},
})
