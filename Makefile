install:
	npm install

build:
	npm run build

develop:
	npm start

start: develop

lint:
	npx editorconfig-checker
	npx eslint './src/**/*{.js,.jsx}'
	npx stylelint ./src/**/*.css

test:
	npx react-scripts test --watchAll=false --passWithNoTests

deploy: test lint
	npm run deploy

.PHONY: build
