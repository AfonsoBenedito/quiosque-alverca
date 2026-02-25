local-up:
	cd front-end && npm start

local-down:
	lsof -ti:5173 | xargs kill -9 || true
