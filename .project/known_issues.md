## Known Issues

- linting doesn't seem consistent across projects, and still need the .vue extension?

- occasionally nanoleaf brightness doesn't fire when changing colour, seems to be a race condition worth looking into

- themes contain more information about lights than they need to, they only need light ID and state

- scene loads as unselected for a light when entering scene mode. Should have a default value

- anyone can update the lights for any networkId, the cloud function should verify the user has access to this network

- legacy lights, themes, and users collections need to be cleanedup. Remember to backup what we need to!
