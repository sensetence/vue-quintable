.PHONY: format lint build pack start dev publish help

# Default target
help:
	@echo "Available targets:"
	@echo "  make format  - Format code with prettier"
	@echo "  make lint    - Format and run eslint"
	@echo "  make build   - Format, lint, and build the project"
	@echo "  make pack    - Format, lint, and create production package"
	@echo "  make start   - Format, lint, and start dev server"
	@echo "  make dev     - Alias for start"
	@echo "  make publish V=2|3 - Test, bump, build, commit, tag, push, log in and publish"

# Format code with prettier
format:
	yarn prettier --write "src/**/*.{js,vue,css,scss}"

# Format and lint (equivalent to run-eslint.sh)
lint: format
	npx eslint

# Format, lint, and build (equivalent to run-build.sh)
build: format
	npx eslint
	yarn build

# Format, lint, and create production package (equivalent to run-pack.sh)
pack: format
	npx eslint
	yarn prod

# Format, lint, and start dev server (equivalent to run-start.sh)
start: format
	npx eslint
	yarn dev

# Alias for start
dev: start

# npm refuses to open a browser in WSL while BROWSER is unset; wslview (WSL only) opens the Windows one
ifneq ($(shell which wslview 2>/dev/null),)
BROWSER ?= wslview
export BROWSER
endif

# Full release: test, bump the patch version if package.json's is already on npm, build dist/, commit "release: x.y.z", tag, push, log in, publish.
# V=3 publishes as latest, V=2 as v2-lts. V has to match package.json, so v2 can't become latest.
publish:
	@grep -q '"version": "$(V)\.' package.json || { echo "Usage: make publish V=2|3 (the major version in package.json)"; exit 1; }
	npm whoami 2>/dev/null || npm login
	yarn test
	@set -e; \
	name=$$(node -p "require('./package.json').name"); \
	if [ -n "$$(npm view "$$name@$$(node -p "require('./package.json').version")" version 2>/dev/null)" ]; then \
	  node -e "const f='package.json',fs=require('fs'),p=JSON.parse(fs.readFileSync(f));const v=p.version.split('.');v[2]=+v[2]+1;p.version=v.join('.');fs.writeFileSync(f,JSON.stringify(p,null,2)+'\\n')"; \
	fi; \
	ver=$$(node -p "require('./package.json').version"); \
	echo "Releasing $$ver"; \
	echo | yarn prod; \
	git add package.json dist; \
	git diff --cached --quiet || git commit -m "release: $$ver"; \
	git rev-parse -q --verify "refs/tags/$$ver" >/dev/null || git tag "$$ver"; \
	git push && git push origin "$$ver"
	npm publish $(if $(filter 2,$(V)),--tag v2-lts)
