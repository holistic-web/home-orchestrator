## Known Issues

- themes contain more information about lights than they need to, they only need light ID and state

- nanoleaf scene loads as unselected for a light when entering scene mode. Should have a default value

- user can add their own email as a member of a network they already own and confuse everything! (fix by removing yourself from the network's users collection)

- members have the ability to see settings, this shouldn't be the case, this information should be admin only, and the API should censor it.