.PHONY: format lint build pack start dev help

# Default target
help:
	@echo "Available targets:"
	@echo "  make format  - Format code with prettier"
	@echo "  make lint    - Format and run eslint"
	@echo "  make build   - Format, lint, and build the project"
	@echo "  make pack    - Format, lint, and create production package"
	@echo "  make start   - Format, lint, and start dev server"
	@echo "  make dev     - Alias for start"

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

