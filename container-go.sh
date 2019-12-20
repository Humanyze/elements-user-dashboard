#! /bin/bash

######################################################################
# SUPER IMPORTANTE!!!!!
# This file is included in the docker image.  If you make any changes here, you will have to rebuild the docker
#   image before they will have any effect (ask me now I know this :-D)

set -x
export IS_DOCKER=true

# Make sure that node-modules is up to date with package.json
yarn

# Make sure that if yarn has been run outside the container, that node is fixed so that it will run inside the container
#  Sass has a binary component that cannot be shared between Mac and Linux
npm rebuild node-sass

# Start the dev server after compiling the code.  When this exits, the container will end
yarn run start