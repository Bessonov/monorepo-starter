Example/starter for webpack monorepo
====================================

[![Project is](https://img.shields.io/badge/Project%20is-fantastic-ff69b4.svg)](https://github.com/Bessonov/monorepo-starter)
[![License](http://img.shields.io/:license-MIT-blue.svg)](https://raw.githubusercontent.com/Bessonov/monorepo-starter/master/LICENSE)

A monorepo example with some interesting features:
- [code sharing](packages/shared/src/index.ts) between frontend and backend
- creates [single js file](packages/backend/package.json#L12) for node deployment
- starts everything with [one command](package.json#L7) only
- uses [tailwindcss with jit](https://tailwindcss.com/docs/just-in-time-mode)
- uses react fast refresh and restarts server on changes
- [allows](packages/frontend/webpack.config.js#L14) deploying frontend to CDN with cache forever strategy
- uses [pnpm](https://pnpm.io) for monorepo
- uses minimal set of tools and give full control to you!

To start with just copy and paste:
```bash
# install pnpm if not already installed
which pnpm > /dev/null || echo npm install --global pnpm

git clone https://github.com/Bessonov/monorepo-starter.git
cd monorepo-starter
pnpm install

# start development, then you can go to http://0.0.0.0:8080
pnpm start

# build for production, see packages/frontend/dist
# and packages/backend/dist for production artefacts
pnpm build
```

Enjoy the experience!

License
-------

The MIT License (MIT)

Copyright (c) 2021, Anton Bessonov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.