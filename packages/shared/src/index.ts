import { existsSync } from 'fs'

export function backend() {
	return existsSync('doesntmatter')
}

export function frontend() {
	return 'frontend framework'
}