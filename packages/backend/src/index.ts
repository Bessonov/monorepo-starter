import http from 'http'
import { backend } from 'shared'
import micro, { sendError } from 'micro'
import {
	Router,
	EndpointMatcher, ExactUrlPathnameMatcher,
} from '@bessonovs/node-http-router'

const router = new Router((req, res) => sendError(req, res, { statusCode: 404 }))

const [address, port] = ['0.0.0.0', 3000]

const server = http.createServer(micro(router.serve)).listen(port, address)
server.once('listening', () => {
	// eslint-disable-next-line no-console
	console.log(`started at http://${address}:${port}`)
})

router.addRoute({
	matcher: new EndpointMatcher<{groups: {name: string}}>('GET', /^\/hello\/(?<name>[^/]+)$/),
	handler: (req, res, match) => {
		return `Hello ${match.match.groups.name} ${backend()}!`
	},
})

router.addRoute({
	matcher: new ExactUrlPathnameMatcher(['/shutdown']),
	handler: () => {
		server.close()
		return 'Shutdown the server'
	},
})