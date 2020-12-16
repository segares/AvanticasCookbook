if docker-compose up -d ; then
    cd server
	npm install
	npm start
	cd ..
	cd client
	npm install
	npm start
else
    echo "Error running docker script, make sure Docker is installed."
fi