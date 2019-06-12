# Database

N.B. There is a firebase realtime database currently acting as a legacy database that will be removed shortly.

The database is a Firestore database.

## Structure

### Lights
The lights collection stores each light. The names are tightly coupled to values in the IFTTT triggers.
## Access Rules
These are defined in firestore.rules

## Indexes
These are defined in firestore.indexes.json

## Deploying Changes
To deploy the rules, ensure that firebase-tools is installed globally on your machine and run:
```
firebase deploy
```