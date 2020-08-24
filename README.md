# Official website of the Visionautik Akademie

This repository contains the official website of the Visionautik Akademie.

## Built With

- [Nuxt.js](https://nuxtjs.org/) - The web framework used
- [Node.js](https://nodejs.org/) - JavaScript runtime for the server
- [Firebase](https://firebase.google.com/) - Cloud hosting

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have node and git installed on your computer.
You can check if you have them installed by typing `node --version` or `git --version` in your terminal.

If you haven't alrady, you can download installers for both from these links:

- [node.js](https://nodejs.org/en/download/)
- [git](https://git-scm.com/downloads)

### Installing

In your terminal navigate into your project directory and clone this repository.

```
cd < your project directory >
git clone https://github.com/Visionautik-Akademie/Visionautik-de
```

The **src** folder contains the nuxt.js project that is responsible for rendering the websites frontend.
Navigate into that directory and install all node dependencies.

```
cd Visionautik-de/src
npm install
```

To start the dev server on localhost run `npm run dev`.
The server should now serve the page on `localhost:3000`.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deployment

### Pre deployment steps

**functions.predeploy**

- npm run build
- clean functions/nuxt
- copy .nuxt to functions/nuxt
- copy nuxt.config.js to functions
- convert nuxt.config.js from ES6 to ES5 standard
- merge nuxt dependencies with functions dependencies
- npm install

**hosting.predeploy**

- clean public directory
- copy .nuxt/dist/client to public/\_nuxt
- copy static directory to public directory

### Deployment

```bash
# deploy functions
firebase deploy --only functions

# deploy hosting
firebase deploy --only hosting

# deploy everything
firebase deploy
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Visionautik-Akademie/Visionautik-de/tags).

## Authors

- **[Julius Niedermeier](https://github.com/JuliusNiedermeier)** - _Initial work_

See also the list of [contributors](https://github.com/Visionautik-Akademie/Visionautik-de/contributors) who participated in this project.

## Acknowledgments
