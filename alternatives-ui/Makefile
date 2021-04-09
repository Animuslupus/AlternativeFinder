clean:
	rm -rf ../alternatives-api/static
	rm -rf ../../alternatives-api/templates

build_web: clean
	yarn build
	mv build/static ../alternatives-api
	mv build/* ../alternatives-api/templates
