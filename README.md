# Gulp Boilerplate Workflow
> a fun workflow for simple front-end web development projects

Making it fun to development on the front-end!

Sass? ES6 syntax? Go for it!

## Getting Started

<!-- These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. -->

### Prerequisites

<!-- What things you need to install the software and how to install them -->

In order to get up and running with this project, you will need to have `git`, `node`, and `gulp-cli` (npm) installed. To make use of the livereloading, you will need the chrome plugin [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

### Installing

There are two versions of this project: 1) uses CSS only and 2) that uses SASS.

First clone this repo && checkout the remote version that you'd like to use

```
// For CSS version:
$ git clone git@github.com:thechutrain/gulp-boilerplate-workflow.git
$ git checkout git checkout origin/CSS
$ rm -rf .git

// For SASS verion:
$ git clone git@github.com:thechutrain/gulp-boilerplate-workflow.git
$ git checkout git checkout origin/SASS
$ rm -rf .git
```


<!-- A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo -->

## Deployment

Before deploying your production build, make sure to `$ gulp build` to get your latest build.

### Deploy to GitHub pages

3 commands to deploy on github
```
$ gulp build
$ git add build && git commit -m "init commit of subtree"
$ git subtree push --prefix build origin gh-pages
```

## Contributing

<!-- Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

## Authors

* **Alan Chu** - [github](https://github.com/thechutrain)

## License

<!-- This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->
