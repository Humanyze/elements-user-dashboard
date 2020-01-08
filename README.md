This directory contains (wait for it...) container commands.  These are things that will execute something inside the container instead of on your laptop.  This means that anything building code, storybook etc. will happen in the container and dropped back into the local folder.

If you want a shell prompt in the container

    cscripts/shell

will give it to you.

If you want to change the way the container starts, modify

    cscripts/go

You don't have to rebuild the container after changing this because it lives outside the container

## container-name

This file contains the container name for docker.  If it changes for any reason, this is where you fix that.  It is different in each micro.

## Storybook
Your VM must have around 3GB of RAM for the storybook commands to work.  It will fail with a message of `killed` _(real descriptive, I know)_ if you don't have enought RAM.  _How hard could it have been to give out the message "Memory allocation failed"_?

If you want to run storybook, just type the following on your host machine.

    yarn run storybook

This will transfer the command to the container and run it there.  The port your storybook is running on will be indicated once the storybook is ready, connect to that and you should be golden.

Build-Storybook has not been setup, you will need to run `yarn run build-storybook` in a container shell prompt. This might get fixed (it isn't hard) but didn't seem worth it at the time.

