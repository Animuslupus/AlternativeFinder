clean:
	rm -rf ../fat-api/static
	rm -rf ../../fat-api/templates

build_web: clean
	yarn build
	mv build/static ../fat-api
	mv build/* ../fat-api/templates
