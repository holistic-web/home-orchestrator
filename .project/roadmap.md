# Roadmap

## General

- terminology for 'Themes' (being the state of things) and 'Scenes' (a mode for an individual nanoleaf light) should be swapped

- We should look at adding automatic deployment on merge to master, maybe using something like https://gist.github.com/naesheim/18d0c0a58ee61f4674353a2f4cf71475

## Multiple Users

- the sign up screen should allow a user to create a personal network if they haven't already.

- inviting a user to a 'network' (home) should send them an email, and work even if they have not already signed up to home-orchestrator

- owner's of a network should be able to designate a new owner

- only admin's and owners should be able to edit a network's settings

## Orchestration UI

- favicon

- Loading... and Submitting... messages should be replaced with icons


## Light Control

- relevant IFTTT triggers be created as part of a 'create light process' allowing users to set up their own lights

- lights should be able to be grouped to be treated as one device

- Create a toggle switch to enable switching automatic or manual modes for live updates (i.e. update whenever the value in the ui changes). It would hide the Action Bar when it is set on automatic.

## Security
- can lock down who has access to which route better now we always have access to the user object