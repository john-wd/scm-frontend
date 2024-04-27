
# Smash Custom Music

A spotify-like frontend for [smashcustommusic.net](https://smashcustommusic.net/) with slicker interface and better player controls written in [Angular 17](https://angular.io) and [Angular Material](https://material.angular.io/).

This is only possible thanks to the forked [revolving door BRSTM player](https://github.com/john-wd/revolving-door-brstm) which features a headless player to play streamed BRSTM music with ease.

## Features

- Single page application, you can continue listening to music while you browse the website
- Playlist controls
- Shuffle
- Global seach bar to find new games
- Save playing playlist to the browser's local storage
- Customizable looping behaviors: 
  - Default: Infinite
  - Count: Loop N times
  - Time: Loop for X minutes
  - None: Disabled 

## Planned work

I would like to also revamp the Smash Custom Music backend to be able to implement

- Unit tests everywhere
- Styling for mobile phones
- User management, login, signup and roles to use the website
- Song and Game likes
- Music submission
- Moderator management page to approve new user submissions
- Playlist management
  - Saving your playlists private to your user or publically available to all users of the website
- Adding new params to existing songs, such as franchise and console
- Better search
  - Context search bar
  - Search for playlists, games or songs
  - Search operators
- Home screen with a summary of things and recommended playlists/games

## How to contribute

### General public

I encourage you to file new issues if you want found bugs, have suggestions or enhancements.

### Developer

This project is based in Typescript and Angular, so first clone this repository, install `npm` and angular globally. Then, run

```sh
$ npm i
```

to install all the project dependencies.

You can start creating new components, services and whatnot using angular's scaffolding CLI

```sh
$ ng generate component /path/to/my/component
```

#### Contribute

After you are happy with what you developed, you need to open a PR to master so I can review it and merge it.

#### Building 

To build this application, just run

```sh
$ npm run build
```

The compiled webside will be stored in a root `./dist` folder ready to be put in your webhost. Be sure to forward all `/*` paths to the main generated index.html because Angular routes everything for you.

If you have AWS cli configured in your machine, you can run

```sh
$ npm run deploy
```

to upload this to a smash-custom-music S3 bucket with static website hosting.
