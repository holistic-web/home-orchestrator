## Known Issues

- linting doesn't seem consistent across projects, and still need the .vue extension?

- occasionally nanoleaf brightness doesn't fire when changing colour, seems to be a race condition worth looking into

- themes contain more information than they need to, they only need light ID and state

- themes section in UI is not mobile friendly at all

- user can create a theme without selecting a scene, adding a theme with a blank light (probably also affects updating lights)