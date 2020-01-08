This directory contains (wait for it...) container commands.  These are things that will execute something inside the container instead of on your laptop.  This means that anything building code, storybook etc. will happen in the container and dropped back into the local folder.

If you want a shell prompt in the container

    cscripts/shell

will give it to you.

##container-name

This file contains the container name for docker.  If it changes for any reason, this is where you fix that.  It is different in each micro.