[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![builds][builds]][builds-url]
[![coverage][cover]][cover-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" heigth="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <br>
  <br>
	<a href="https://npmjs.com/package/webpack">
		<img src="https://img.shields.io/npm/dm/webpack.svg">
	</a>
	<a href="https://opencollective.com/webpack#backer">
		<img src="https://opencollective.com/webpack/backers/badge.svg">
	</a>
	<a href="https://opencollective.com/webpack#sponsors">
		<img src="https://opencollective.com/webpack/sponsors/badge.svg">
	</a>
	<a href="https://gitter.im/webpack/webpack">
		<img src="https://badges.gitter.im/webpack/webpack.svg">
	</a>
  <h1>webpack</h1>
  <p>
    webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
  <p>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev webpack
```

<h2 align="center">Introduction</h2>

> The README reflects webpack v2.x, webpack v1.x [documentation can be found here](https://webpack.github.io/docs/?utm_source=github&utm_medium=readme&utm_campaign=top).

webpack is a bundler for modules. The main purpose is to bundle JavaScript
files for usage in a browser, yet it is also capable of transforming, bundling,
or packaging just about any resource or asset.

**TL;DR**

* Bundles [ES Modules](http://www.2ality.com/2014/09/es6-modules-final.html), [CommonJS](http://wiki.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) modules (even combined).
* Can create a single bundle or multiple chunks that are asynchronously loaded at runtime (to reduce initial loading time).
* Dependencies are resolved during compilation, reducing the runtime size.
* Loaders can preprocess files while compiling, e.g. TypeScript to JavaScript, Handlebars strings to compiled functions, images to Base64, etc.
* Highly modular plugin system to do whatever else your application requires.

### Get Started

Check out webpack's quick [**Get Started**](https://webpack.js.org/get-started/) guide and the [other guides](https://webpack.js.org/guides/).

<h2 align="center">Concepts</h2>

### [Plugins](https://webpack.js.org/plugins/)

webpack has a [rich plugin
interface](https://webpack.js.org/plugins/). Most of the features
within webpack itself use this plugin interface. This makes webpack very
**flexible**.

|Name|Status|Description|
|:--:|:----:|:----------|
|[common-chunks-webpack-plugin][common]|![common-npm]|Generates chunks of common modules shared between entry points and splits them into separate  bundles (e.g vendor.bundle.js && app.bundle.js)|
|[extract-text-webpack-plugin][extract]|![extract-npm]|Extracts Text (CSS) from your bundles into a separate file (app.bundle.css)|
|[component-webpack-plugin][component]|![component-npm]|Use components with webpack|
|[compression-webpack-plugin][compression]|![compression-npm]|Prepare compressed versions of assets to serve them with Content-Encoding|
|[i18n-webpack-plugin][i18n]|![i18n-npm]|Adds i18n support to your bundles|
|[html-webpack-plugin][html-plugin]|![html-plugin-npm]| Simplifies creation of HTML files (`index.html`) to serve your bundles|


[common]: https://github.com/webpack/webpack/blob/master/lib/optimize/CommonsChunkPlugin.js
[common-npm]: https://img.shields.io/npm/v/webpack.svg
[extract]: https://github.com/webpack/extract-text-webpack-plugin
[extract-npm]: https://img.shields.io/npm/v/extract-text-webpack-plugin.svg
[component]: https://github.com/webpack/component-webpack-plugin
[component-npm]: https://img.shields.io/npm/v/component-webpack-plugin.svg
[compression]: https://github.com/webpack/compression-webpack-plugin
[compression-npm]: https://img.shields.io/npm/v/compression-webpack-plugin.svg
[i18n]: https://github.com/webpack/i18n-webpack-plugin
[i18n-npm]: https://img.shields.io/npm/v/i18n-webpack-plugin.svg
[html-plugin]: https://github.com/ampedandwired/html-webpack-plugin
[html-plugin-npm]: https://img.shields.io/npm/v/html-webpack-plugin.svg

### [Loaders](https://webpack.js.org/loaders/)

webpack enables use of loaders to preprocess files. This allows you to bundle
**any static resource** way beyond JavaScript. You can easily [write your own
loaders](https://webpack.js.org/api/loaders/) using Node.js.

Loaders are activated by using `loadername!` prefixes in `require()` statements,
or are automatically applied via regex from your webpack configuration.

#### Files

|Name|Status|Description|
|:--:|:----:|:----------|
|[raw-loader][raw]|![raw-npm]|Loads raw content of a file (utf-8)|
|[val-loader][val]|![val-npm]|Executes code as module and consider exports as JS code|
|[url-loader][url]|![url-npm]|Works like the file loader, but can return a Data Url if the file is smaller than a limit|
|[file-loader][file]|![file-npm]|Emits the file into the output folder and returns the (relative) url|


[raw]: https://github.com/webpack/raw-loader
[raw-npm]: https://img.shields.io/npm/v/raw-loader.svg
[val]: https://github.com/webpack/val-loader
[val-npm]: https://img.shields.io/npm/v/val-loader.svg
[url]: https://github.com/webpack/url-loader
[url-npm]: https://img.shields.io/npm/v/url-loader.svg
[file]: https://github.com/webpack/file-loader
[file-npm]: https://img.shields.io/npm/v/file-loader.svg

#### JSON

|Name|Status|Description|
|:--:|:----:|:----------|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/json.svg">|![json-npm]|Loads a JSON file (included by default)|
|<img width="48" height="48" src="https://cdn.jsdelivr.net/gh/json5/json5-logo@master/json5-logo.svg">|![json5-npm]|Loads and transpiles a JSON 5 file|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/coffeescript.svg">|![cson-npm]|Loads and transpiles a CSON file|


[json]: https://github.com/webpack/json-loader
[json-npm]: https://img.shields.io/npm/v/json-loader.svg
[json5]: https://github.com/webpack/json5-loader
[json5-npm]: https://img.shields.io/npm/v/json5-loader.svg
[cson]: https://github.com/awnist/cson-loader
[cson-npm]: https://img.shields.io/npm/v/cson-loader.svg

#### Transpiling

|Name|Status|Description|
|:--:|:----:|:----------|
|`<script>`|![script-npm]|Executes a JavaScript file once in global context (like in script tag), requires are not parsed|
|<img width="48" height="48" title="babel-loader" src="https://worldvectorlogo.com/logos/babel-10.svg">|[![babel-npm]][babel]|Loads ES2015+ code and transpiles to ES5 using <a href="https://github.com/babel/babel">Babel</a>|
|<img width="48" height="48" src="https://google.github.com/traceur-compiler/logo/tc.svg">|![traceur-npm]|Loads ES2015+ code and transpiles to ES5 using [Traceur](https://github.com/google/traceur)|
|<img width="48" height="48" src="https://cdn.jsdelivr.net/gh/Microsoft/TypeScript@master/doc/logo.svg">|![type-npm]|Loads TypeScript like JavaScript|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/coffeescript.svg">|![coffee-npm]|Loads CoffeeScript like JavaScript|


[script]: https://github.com/webpack/script-loader
[script-npm]: https://img.shields.io/npm/v/script-loader.svg
[babel]: https://github.com/babel/babel-loader
[babel-npm]: https://img.shields.io/npm/v/babel-loader.svg
[traceur]: https://github.com/jupl/traceur-loader
[traceur-npm]: https://img.shields.io/npm/v/traceur-loader.svg
[coffee]: https://github.com/webpack/coffee-loader
[coffee-npm]: https://img.shields.io/npm/v/coffee-loader.svg
[type]: https://github.com/andreypopp/typescript-loader
[type-npm]: https://img.shields.io/npm/v/typescript-loader.svg

#### Templating

|Name|Status|Description|
|:--:|:----:|:----------|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/html5.svg">|![html-npm]|Exports HTML as string, require references to static resources|
|<img width="48" height="48" src="https://cdn.jsdelivr.net/gh/pugjs/pug-logo@master/SVG/pug-final-logo-_-colour-128.svg">|![pug-npm]|Loads Pug templates and returns a function|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/jade-3.svg">|![jade-npm]|Loads Jade templates and returns a function|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/markdown.svg">|![md-npm]|Compiles Markdown to HTML|
|<img width="48" height="48" src="http://posthtml.github.io/posthtml/logo.svg">|![posthtml-npm]|Loads and transforms a HTML file using [PostHTML](https://github.com/posthtml/posthtml)|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/handlebars-1.svg">|![hbs-npm]| Compiles Handlebars to HTML|


[html]: https://github.com/webpack/html-loader
[html-npm]: https://img.shields.io/npm/v/html-loader.svg
[pug]: https://github.com/pugjs/pug-loader
[pug-npm]: https://img.shields.io/npm/v/pug-loader.svg
[jade]: https://github.com/webpack/jade-loader
[jade-npm]: https://img.shields.io/npm/v/jade-loader.svg
[md]: https://github.com/peerigon/markdown-loader
[md-npm]: https://img.shields.io/npm/v/markdown-loader.svg
[posthtml]: https://github.com/posthtml/posthtml-loader
[posthtml-npm]: https://img.shields.io/npm/v/posthtml-loader.svg
[hbs]: https://github.com/altano/handlebars-loader
[hbs-npm]: https://img.shields.io/npm/v/handlebars-loader.svg

#### Styling

|Name|Status|Description|
|:--:|:----:|:----------|
|`<style>`|![style-npm]|Add exports of a module as style to DOM|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/css-3.svg">|![css-npm]|Loads CSS file with resolved imports and returns CSS code|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/less-63.svg">|![less-npm]|Loads and compiles a LESS file|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/sass-1.svg">|![sass-npm]|Loads and compiles a SASS/SCSS file|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/stylus.svg">|![stylus-npm]|Loads and compiles a Stylus file|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/postcss.svg">|![postcss-npm]|Loads and transforms a CSS/SSS file using [PostCSS](http://postcss.org)|

[style]: https://github.com/webpack/style-loader
[style-npm]: https://img.shields.io/npm/v/style-loader.svg
[css]: https://github.com/webpack/css-loader
[css-npm]: https://img.shields.io/npm/v/css-loader.svg
[less]: https://github.com/webpack/less-loader
[less-npm]: https://img.shields.io/npm/v/less-loader.svg
[sass]: https://github.com/jtangelder/sass-loader
[sass-npm]: https://img.shields.io/npm/v/sass-loader.svg
[stylus]: https://github.com/shama/stylus-loader
[stylus-npm]: https://img.shields.io/npm/v/stylus-loader.svg
[postcss]: https://github.com/postcss/postcss-loader
[postcss-npm]: https://img.shields.io/npm/v/postcss-loader.svg

#### Linting && Testing

|Name|Status|Description|
|:--:|:----:|:----------|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/mocha.svg">|![mocha-npm]|Tests with mocha (Browser/NodeJS)|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/eslint.svg">|![eslint-npm]|PreLoader for linting code using ESLint|
|<img width="48" height="48" src="http://jshint.com/res/jshint-dark.png">|![jshint-npm]|PreLoader for linting code using JSHint|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/jscs.svg">|![jscs-npm]|PreLoader for code style checking using JSCS|


[mocha]: https://github.com/webpack/mocha-loader
[mocha-npm]: https://img.shields.io/npm/v/mocha-loader.svg
[eslint]: https://github.com/MoOx/eslint-loader
[eslint-npm]: https://img.shields.io/npm/v/eslint-loader.svg
[jshint]: https://github.com/webpack/jslint-loader
[jshint-npm]: https://img.shields.io/npm/v/jslint-loader.svg
[jscs]: https://github.com/unindented/jscs-loader
[jscs-npm]: https://img.shields.io/npm/v/jscs-loader.svg

#### Frameworks

|Name|Status|Description|
|:--:|:----:|:----------|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/vue-9.svg">|![vue-npm]|Loads and compiles Vue Components|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/polymer.svg">|![polymer-npm]|Process HTML & CSS with preprocessor of choice and `require()` Web Components like first-class modules|
|<img width="48" height="48" src="https://worldvectorlogo.com/logos/angular-icon-1.svg">|![angular-npm]| Loads and compiles Angular 2 Components|

[vue]: https://github.com/vue/vue-loader
[vue-npm]: https://img.shields.io/npm/v/vue-loader.svg
[polymer]: https://github.com/JonDum/polymer-loader
[polymer-npm]: https://img.shields.io/npm/v/polymer-loader.svg
[angular]: https://github.com/TheLarkInn/angular2-template-loader
[angular-npm]: https://img.shields.io/npm/v/angular2-template-loader.svg

### Performance

webpack uses async I/O and has multiple caching levels. This makes webpack fast
and incredibly **fast** on incremental compilations.

### Module Formats

webpack supports ES2015+, CommonJS and AMD modules **out of the box**. It performs clever static
analysis on the AST of your code. It even has an evaluation engine to evaluate
simple expressions. This allows you to **support most existing libraries** out of the box.

### [Code Splitting](https://webpack.github.io/docs/code-splitting.html)

webpack allows you to split your codebase into multiple chunks. Chunks are
loaded asynchronously at runtime. This reduces the initial loading time.

### [Optimizations](https://webpack.github.io/docs/optimization.html)

webpack can do many optimizations to **reduce the output size of your
JavaScript** by deduplicating frequently used modules, minifying, and giving
you full control of what is loaded initially and what is loaded at runtime
through code splitting. It can also make your code chunks **cache
friendly** by using hashes.

<h2 align="center">Contributing</h2>

Most of the time, if webpack is not working correctly for you it is a simple configuration issue.

If you are still having difficulty after looking over your configuration carefully, please post
a question to [StackOverflow with the webpack tag](https://stackoverflow.com/tags/webpack). Questions
that include your webpack.config.js and relevant files are more likely to receive responses.

If you have discovered a bug or have a feature suggestion, feel free to create an issue on Github.

If you create a loader or plugin, please consider open sourcing it, putting it
on npm and following the `x-loader`, `x-webpack-plugin` convention.

You are also welcome to correct any spelling mistakes or any language issues.

If you want to discuss something or just need help, [here is our Gitter room](https://gitter.im/webpack/webpack).

<h2 align="center">Core Team</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150" src="https://github.com/sokra.png?s=150">
        <br>
        <a href="https://github.com/sokra">Tobias Koppers</a>
        <p>Core</p>
        <br>
        <p>Founder of webpack</p>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://github.com/jhnns.png?s=150">
        <br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
        <p>Loaders &amp; Plugins</p>
        <br>
        <p>Early adopter of webpack</p>
      </td>
      <td align="center" width="20%">
        <img width="150" height="150" src="https://github.com/TheLarkInn.png?s=150">
        <br>
        <a href="https://github.com/TheLarkInn">Sean T. Larkin</a>
        <p>Public Relations</p>
        <br>
        <p>Founder of the core team</p>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://github.com/bebraw.png?s=150">
        <br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
        <p>Documentation<p>
        <br>
        <p>Author</p>
        <a href="https://leanpub.com/survivejs-webpack">
          <img height="15" src="https://cloud.githubusercontent.com/assets/1365881/20286923/93e325c0-aac9-11e6-964d-cabe218c584c.png">Webpack
        </a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://github.com/spacek33z.png?s=150">
        <br>
        <a href="https://github.com/spacek33z">Kees Kluskens</a>
        <p>Development</p>
        <br>
        <br>
        <p>Sponsor<p>
        <a href="https://codeyellow.nl/">
          <img height="15" src="https://cloud.githubusercontent.com/assets/1365881/20286583/ad62eb04-aac7-11e6-9c14-a0fef35b9b56.png">
        </a>
      </td>
     </tr>
  </tbody>
</table>

<h2 align="center">Sponsoring</h2>

Most of the core team members, webpack contributors and contributors in the ecosystem do this open source work in their free time. If you use webpack for a serious task, and you'd like us to invest more time on it, please donate. This project increases your income/productivity too. It makes development and applications faster and it reduces the required bandwidth.

This is how we use the donations:

* Allow the core team to work on webpack
* Thank contributors if they invested a large amount of time in contributing
* Support projects in the ecosystem that are of great value for users
* Support projects that are voted most (work in progress)
* Infrastructure cost
* Fees for money handling

### Early Backers and Sponsors

We had other sources of donations before starting to use OpenCollective. We want to acknowledge these early sponsors and backers, but donations were not public and we are not sure of donors want to stay anonymous. So if you want to be in this list, just drop @sokra a note via mail (`t____.k____@gmail.com`, insert fullname here).

<h2 align="center">Sponsors</h2>

[Become a sponsor](https://opencollective.com/webpack#sponsor) and get your logo on our README on Github with a link to your site.

<a href="https://opencollective.com/webpack/sponsor/0/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/1/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/2/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/3/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/4/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/5/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/6/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/7/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/8/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/9/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/10/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/11/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/12/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/13/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/14/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/15/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/16/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/17/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/18/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/19/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/20/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/21/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/22/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/23/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/24/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/25/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/26/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/27/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/28/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/webpack/sponsor/29/website" target="_blank"><img src="https://opencollective.com/webpack/sponsor/29/avatar.svg"></a>

<h2 align="center">Backers</h2>

[Become a backer](https://opencollective.com/webpack#backer) and get your image on our README on Github with a link to your site.

<a href="https://opencollective.com/webpack/backer/0/website" target="_blank"><img src="https://opencollective.com/webpack/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/1/website" target="_blank"><img src="https://opencollective.com/webpack/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/2/website" target="_blank"><img src="https://opencollective.com/webpack/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/3/website" target="_blank"><img src="https://opencollective.com/webpack/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/4/website" target="_blank"><img src="https://opencollective.com/webpack/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/5/website" target="_blank"><img src="https://opencollective.com/webpack/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/6/website" target="_blank"><img src="https://opencollective.com/webpack/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/7/website" target="_blank"><img src="https://opencollective.com/webpack/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/8/website" target="_blank"><img src="https://opencollective.com/webpack/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/9/website" target="_blank"><img src="https://opencollective.com/webpack/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/10/website" target="_blank"><img src="https://opencollective.com/webpack/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/11/website" target="_blank"><img src="https://opencollective.com/webpack/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/12/website" target="_blank"><img src="https://opencollective.com/webpack/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/13/website" target="_blank"><img src="https://opencollective.com/webpack/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/14/website" target="_blank"><img src="https://opencollective.com/webpack/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/15/website" target="_blank"><img src="https://opencollective.com/webpack/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/16/website" target="_blank"><img src="https://opencollective.com/webpack/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/17/website" target="_blank"><img src="https://opencollective.com/webpack/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/18/website" target="_blank"><img src="https://opencollective.com/webpack/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/19/website" target="_blank"><img src="https://opencollective.com/webpack/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/20/website" target="_blank"><img src="https://opencollective.com/webpack/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/21/website" target="_blank"><img src="https://opencollective.com/webpack/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/22/website" target="_blank"><img src="https://opencollective.com/webpack/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/23/website" target="_blank"><img src="https://opencollective.com/webpack/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/24/website" target="_blank"><img src="https://opencollective.com/webpack/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/25/website" target="_blank"><img src="https://opencollective.com/webpack/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/26/website" target="_blank"><img src="https://opencollective.com/webpack/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/27/website" target="_blank"><img src="https://opencollective.com/webpack/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/28/website" target="_blank"><img src="https://opencollective.com/webpack/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/29/website" target="_blank"><img src="https://opencollective.com/webpack/backer/29/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/30/website" target="_blank"><img src="https://opencollective.com/webpack/backer/30/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/31/website" target="_blank"><img src="https://opencollective.com/webpack/backer/31/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/32/website" target="_blank"><img src="https://opencollective.com/webpack/backer/32/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/33/website" target="_blank"><img src="https://opencollective.com/webpack/backer/33/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/34/website" target="_blank"><img src="https://opencollective.com/webpack/backer/34/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/35/website" target="_blank"><img src="https://opencollective.com/webpack/backer/35/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/36/website" target="_blank"><img src="https://opencollective.com/webpack/backer/36/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/37/website" target="_blank"><img src="https://opencollective.com/webpack/backer/37/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/38/website" target="_blank"><img src="https://opencollective.com/webpack/backer/38/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/39/website" target="_blank"><img src="https://opencollective.com/webpack/backer/39/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/40/website" target="_blank"><img src="https://opencollective.com/webpack/backer/40/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/41/website" target="_blank"><img src="https://opencollective.com/webpack/backer/41/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/42/website" target="_blank"><img src="https://opencollective.com/webpack/backer/42/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/43/website" target="_blank"><img src="https://opencollective.com/webpack/backer/43/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/44/website" target="_blank"><img src="https://opencollective.com/webpack/backer/44/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/45/website" target="_blank"><img src="https://opencollective.com/webpack/backer/45/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/46/website" target="_blank"><img src="https://opencollective.com/webpack/backer/46/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/47/website" target="_blank"><img src="https://opencollective.com/webpack/backer/47/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/48/website" target="_blank"><img src="https://opencollective.com/webpack/backer/48/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/49/website" target="_blank"><img src="https://opencollective.com/webpack/backer/49/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/50/website" target="_blank"><img src="https://opencollective.com/webpack/backer/50/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/51/website" target="_blank"><img src="https://opencollective.com/webpack/backer/51/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/52/website" target="_blank"><img src="https://opencollective.com/webpack/backer/52/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/53/website" target="_blank"><img src="https://opencollective.com/webpack/backer/53/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/54/website" target="_blank"><img src="https://opencollective.com/webpack/backer/54/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/55/website" target="_blank"><img src="https://opencollective.com/webpack/backer/55/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/56/website" target="_blank"><img src="https://opencollective.com/webpack/backer/56/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/57/website" target="_blank"><img src="https://opencollective.com/webpack/backer/57/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/58/website" target="_blank"><img src="https://opencollective.com/webpack/backer/58/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/59/website" target="_blank"><img src="https://opencollective.com/webpack/backer/59/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/60/website" target="_blank"><img src="https://opencollective.com/webpack/backer/60/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/61/website" target="_blank"><img src="https://opencollective.com/webpack/backer/61/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/62/website" target="_blank"><img src="https://opencollective.com/webpack/backer/62/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/63/website" target="_blank"><img src="https://opencollective.com/webpack/backer/63/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/64/website" target="_blank"><img src="https://opencollective.com/webpack/backer/64/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/65/website" target="_blank"><img src="https://opencollective.com/webpack/backer/65/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/66/website" target="_blank"><img src="https://opencollective.com/webpack/backer/66/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/67/website" target="_blank"><img src="https://opencollective.com/webpack/backer/67/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/68/website" target="_blank"><img src="https://opencollective.com/webpack/backer/68/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/69/website" target="_blank"><img src="https://opencollective.com/webpack/backer/69/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/70/website" target="_blank"><img src="https://opencollective.com/webpack/backer/70/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/71/website" target="_blank"><img src="https://opencollective.com/webpack/backer/71/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/72/website" target="_blank"><img src="https://opencollective.com/webpack/backer/72/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/73/website" target="_blank"><img src="https://opencollective.com/webpack/backer/73/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/74/website" target="_blank"><img src="https://opencollective.com/webpack/backer/74/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/75/website" target="_blank"><img src="https://opencollective.com/webpack/backer/75/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/76/website" target="_blank"><img src="https://opencollective.com/webpack/backer/76/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/77/website" target="_blank"><img src="https://opencollective.com/webpack/backer/77/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/78/website" target="_blank"><img src="https://opencollective.com/webpack/backer/78/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/79/website" target="_blank"><img src="https://opencollective.com/webpack/backer/79/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/80/website" target="_blank"><img src="https://opencollective.com/webpack/backer/80/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/81/website" target="_blank"><img src="https://opencollective.com/webpack/backer/81/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/82/website" target="_blank"><img src="https://opencollective.com/webpack/backer/82/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/83/website" target="_blank"><img src="https://opencollective.com/webpack/backer/83/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/84/website" target="_blank"><img src="https://opencollective.com/webpack/backer/84/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/85/website" target="_blank"><img src="https://opencollective.com/webpack/backer/85/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/86/website" target="_blank"><img src="https://opencollective.com/webpack/backer/86/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/87/website" target="_blank"><img src="https://opencollective.com/webpack/backer/87/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/88/website" target="_blank"><img src="https://opencollective.com/webpack/backer/88/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/89/website" target="_blank"><img src="https://opencollective.com/webpack/backer/89/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/90/website" target="_blank"><img src="https://opencollective.com/webpack/backer/90/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/91/website" target="_blank"><img src="https://opencollective.com/webpack/backer/91/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/92/website" target="_blank"><img src="https://opencollective.com/webpack/backer/92/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/93/website" target="_blank"><img src="https://opencollective.com/webpack/backer/93/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/94/website" target="_blank"><img src="https://opencollective.com/webpack/backer/94/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/95/website" target="_blank"><img src="https://opencollective.com/webpack/backer/95/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/96/website" target="_blank"><img src="https://opencollective.com/webpack/backer/96/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/97/website" target="_blank"><img src="https://opencollective.com/webpack/backer/97/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/98/website" target="_blank"><img src="https://opencollective.com/webpack/backer/98/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/99/website" target="_blank"><img src="https://opencollective.com/webpack/backer/99/avatar.svg"></a>
<a href="https://opencollective.com/webpack/backer/100/website" target="_blank"><img src="https://opencollective.com/webpack/backer/100/avatar.svg"></a>

<h2 align="center">Thanks to</h2>
<p align="center">(In chronological order)</p>

* @google for [Google Web Toolkit (GWT)](https://code.google.com/archive/p/google-web-toolkit), which aims to compile Java to JavaScript. It features a similar [Code Splitting](http://www.gwtproject.org/doc/latest/DevGuideCodeSplitting.html) as webpack.
* @medikoo for [modules-webmake](https://github.com/medikoo/modules-webmake), which is a similar project. webpack was born because I wanted Code Splitting for modules-webmake. Interestingly the [Code Splitting issue is still open](https://github.com/medikoo/modules-webmake/issues/7) (thanks also to @Phoscur for the discussion).
* @substack for [browserify](http://browserify.org/), which is a similar project and source for many ideas.
* @jrburke for [require.js](http://requirejs.org/), which is a similar project and source for many ideas.
* @defunctzombie for the [browser-field spec](https://gist.github.com/defunctzombie/4339901), which makes modules available for node.js, browserify and webpack.
* Every early webpack user, which contributed to webpack by writing issues or PRs. You influenced the direction...
* @shama, @jhnns and @sokra for maintaining this project
* Everyone who has written a loader for webpack. You are the ecosystem...
* Everyone I forgot to mention here, but also influenced webpack.


[npm]: https://img.shields.io/npm/v/webpack.svg
[npm-url]: https://npmjs.com/package/webpack

[node]: https://img.shields.io/node/v/webpack.svg
[node-url]: https://nodejs.org

[deps]: https://img.shields.io/david/webpack/webpack.svg
[deps-url]: https://david-dm.org/webpack/webpack

[tests]: https://img.shields.io/travis/webpack/webpack/master.svg
[tests-url]: https://travis-ci.org/webpack/webpack

[builds-url]: https://ci.appveyor.com/project/sokra/webpack/branch/master
[builds]: https://ci.appveyor.com/api/projects/status/github/webpack/webpack?svg=true

[cover]: https://img.shields.io/coveralls/webpack/webpack.svg
[cover-url]: https://coveralls.io/r/webpack/webpack/
