SHELL := /bin/bash # Use bash syntax
ARG := $(word 2, $(MAKECMDGOALS) )

clean:
	@find . -name "*.pyc" -exec rm -rf {} \;
	@find . -name "__pycache__" -delete

test:
	python backend/manage.py test backend/ $(ARG) --parallel --keepdb

test_reset:
	python backend/manage.py test backend/ $(ARG) --parallel

backend_format:
	black backend

upgrade: ## update the *requirements.txt files with the latest packages satisfying *requirements.in
	pip install -U -q pip-tools
	pip-compile --upgrade -o dev-requirements.txt dev-requirements.in
	pip-compile --upgrade -o requirements.txt requirements.in
	# Make everything =>, not ==
	sed 's/==/>=/g' requirements.txt > requirements.tmp
	mv requirements.tmp requirements.txt

compile_install_requirements:
	@echo 'Installing pip-tools...'
	export PIP_REQUIRE_VIRTUALENV=true; \
	pip install pip-tools
	@echo 'Compiling requirements...'
	pip-compile requirements.in > requirements.txt
	pip-compile dev-requirements.in > dev-requirements.txt
	@echo 'Installing requirements...'
	pip install -r requirements.txt && pip install -r dev-requirements.txt

# Commands for Docker version
docker_setup:
	cp backend/dotenv_files/.env-example backend/dotenv_files/.env
	docker volume create taskhub_database
	docker compose build --no-cache
	docker compose up -d

	docker compose run --rm backend python manage.py migrate --fake-initial

docker_test:
	docker compose run --rm backend python -m pytest --exitfirst

docker_test_reset:
	docker compose run --rm backend python manage.py test $(ARG) --parallel

docker_up:
	docker compose up -d

docker_update_dependencies:
	docker compose down
	docker compose up -d --build

docker_update_production:
	docker compose down
	docker system prune -a --volumes
	docker compose -f docker-compose.prod.yml up -d --build

docker_update_cache:
	docker compose down
	docker system prune -a --volumes
	docker compose up -d --build

docker_down:
	docker compose down

docker_logs:
	docker compose logs -f $(ARG)

docker_makemigrations:
	docker compose run --rm backend python manage.py makemigrations --merge --no-input
	docker compose run --rm backend python manage.py makemigrations

docker_migrate:
	docker compose run --rm backend python manage.py migrate

docker_git_permission:
	docker exec -it siscme-frontend-1 /bin/bash -c "git config --global --add safe.directory /home/user/app && exit"
	docker exec -it siscme-backend-1 /bin/bash -c "git config --global --add safe.directory /home/user/app && exit"

be_run:
	python backend/manage.py runserver 0.0.0.0:8000

be_migrate:
	python backend/manage.py migrate

be_makemigrations:
	python backend/manage.py makemigrations --merge --noinput && python backend/manage.py makemigrations

be_shell:
	python backend/manage.py shell

be_test:
	cd ~/app/backend/ && pytest

pre-commit-config:
	cp ./pre-commit.example .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

docker_index_schema:
	docker exec -it siscme-backend-1 /bin/bash -c "python manage.py index_schema && exit"
