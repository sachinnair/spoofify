
# Spoofify

A registered user of Spoofify account will be able to connect and see a list of Latest-releases and also a list of Featured Playlists.

## Local setup:

Clone the project into your local

```
git clone https://github.com/sachinnair/spoofify.git
cd spoofify
```

### Need of secrets file:

You will need an .env.production.local file to access web apis of spotify. This will be shared on request. Once received paste it in root folder of project.
```
PWD // <Project Checkout path>/
```
It should be the same level as `Dockerfile`

### Using Docker

```
docker build -t spoofify:v0 .
docker run -p 3000:3000 spoofify:v1
```
Please make sure **port** is not changed because it is tied with Spotify's application setup.

### Using Local Development Setup

For building client code:
```
cd client
npm ci --only=production 
npm run build
```

You may add following line inside *client/package.json*
```
"scripts": {
    ...
    "build": "BUILD_PATH=../server/build react-scripts build",
    ...
}
```

OR 

Manually copy the **build** folder generated inside **client** folder and paste it inside **server** folder

For running the server locally:
```
pwd // <Project Checkout path>/client/
cd ../server
npm run build
```
## Desgin Process:

I tried to think of an implementation surrounding my own user behaviour.

Charachteristics include:
1. Occassional listener of music.
2. Enjoys music.
3. Skim reader.
4. Dislikes cluttered Amazon Music application.

Taking this into consideration I worked on a half baked design to get me started with the implementation.

The implementation focuses on:
1. Having a "Set my mood" button - Music creates a frame of mind for people. So a button to filter the genre.
2. Using a dark color scheme as most of the music applications prefer similar theme. (Also personal preference).
3. Mobile first design.
4. Being able to see the latest releases, artists and keeping space to showcase as much additional information as possible. for eg. Number of listeners vs likes, total tracks, etc.

## Technical design decisions:

### Why Docker?

I have been recently switching a lot among various OSes and to maintain consistency among all my development environments, I decided to make use of Docker.

### Assignment specifications:
Complying to the requirements of the assignment, create-react-app with typescript template was used to create this project. To manage Redux store, `@reduxjs/toolkit` was used. 

### Folder structure 

Initially decided to build an SPA using PKCE Auth flow. Later, decided to showcase my understanding of Auth flows on server and thus chose a client-server architecture.

The server code is a modified version of Spotify's demonstration code for Auth flow.

#### For client:

```
src
 - common
    - app
    - components
    - helper
    - hooks
 - features
 - pages
 - store

```
A folder structure combining of `pages + features` are recommended for better management when the size of codebase increases. Rest of them are an addition which I felt should make application code shareable across projects.

As per the above mentioned intent you would be able to witness that everything in `common` folder except contents inside `app` folder are easily shareable across projects.
For eg:
- Toggler (Component)
- useFetch (hook)

Contents inside `app` are intended to be specific to the project. Any visible text for the application would be coming from an external source, i.e. now provided by `cms.json` inside `common/app`

### Redux 

Toolkit has introduced many methods to remove boilerplate code. It also offers much more functionality as opposed to features offered in redux.
Each feature would have its own `<feature>Slice.ts` file bundled along with other files required by the component.

#### Preventing Overuse
It is commonly noted in applications with react and redux the tendency of developers to store everything in redux. This is not necessary, the same is demonstrated in this application at two instances:
1. Using React portals
2. Using Custom hooks

##### Using React portals:
For showing modal like components it is recommended to make use of React Portals. I have made use of `Loader` component to be rendered in `div` with `#modalArea` which sits outside the React root `div`
This avoids the need to have a variable track the status of API call through use of context or the need to persist the state on a Redux store.

##### Using custom hooks
Putting every piece of data in the Redux store bloats the application. To avoid this only reusable data is stored the store. Component specific data was confined to the component by implementation of `useFetch` custom hook over createAsyncThunk.

