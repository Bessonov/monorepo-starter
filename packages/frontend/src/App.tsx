import React from 'react'
import { frontend } from 'shared'

export function App() {
	return (
		<figure className="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
			<img className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://tailwindcss.com/favicon-32x32.png" alt="" width="384" height="512" />
			<div className="pt-6 md:p-8 text-center md:text-left space-y-4">
				<blockquote>
					<p className="text-lg font-semibold">
						“Tailwind CSS is the only {frontend()} that I've seen scale
						on large teams. It’s easy to customize, adapts to any design,
						and the build size is tiny.”
					</p>
				</blockquote>
				<figcaption className="font-medium">
					<div className="text-cyan-600">
						Sarah Dayan
					</div>
					<div className="text-gray-500">
						Staff Engineer, Algolia
					</div>
				</figcaption>
			</div>
		</figure>
	)
}
