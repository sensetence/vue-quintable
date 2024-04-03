# All commands in the is Makefile can be executed OUTSIDE of any docker container.
# Commands for INSIDE of docker containers are in Makefile in api/web directory.
# Get a shell for the respective container with `make docker-exec-web` or `make docker-exec-php`
# Next goal: Bitbucket pipeline should call make commands instead of having the commands encoded in pipeline so that it's easy to run the locally.
####> Hacks ####

.PHONY: hack
hack: hack-chown hack-chmod

.PHONY: hack-chmod
hack-chmod:
	sudo chmod 0777 ./.[^.]* -R
	sudo chmod 0777 * -R

.PHONY: hack-chown
hack-chown:
	sudo chown $(USER):$(USER) ./.[^.]* -R
	sudo chown $(USER):$(USER) * -R

####< Hacks ####

# https://stackoverflow.com/questions/10032461/git-keeps-asking-me-for-my-ssh-key-passphrase
.PHONY: ssh-login
ssh-login:
	@echo "Please run: eval \`ssh-agent\` && ssh-add"