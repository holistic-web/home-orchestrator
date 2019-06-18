# Database
The Firestore database for this project.

## Access Rules
These are defined in firestore.rules

## Indexes
These are defined in firestore.indexes.json

## Deploying Changes
To deploy the rules, ensure that firebase-tools is installed globally on your machine and run:
```
firebase deploy
```

## Collections

### Lights
The lights collection stores each light. The name property is tightly coupled to values in the IFTTT triggers.

### Themes
The themes collection storing themes saved by a user.