## description

this is a image loader UI component for Vue 2.X. The image will be center positioned after loaded

## demo

[live demo][1]

## requirement

Vue 2.0

## install

by npm

```bash
npm i vue-img-loader --save
```

or, directly include dist/vue-img-loader.min.js in your page, VueImgLoader exposed as global variable

```html
<script src="path/to/vue-img-loader.min.js"><script>
```

then, use it as any Vue component

```js
// es6
import VueImgLoader from 'vue-img-loader';

// es5
var VueImgLoader = require('vue-img-loader');

new Vue({
    ...
    components: {
        'vue-img-loader': VueImgLoader
    }
    ...
})
```

## usage

```html
// you will see a 200*100 lightgrey box before the image loaded, and the loaded image will be displayed in the same size
<vue-img-loader src="path/to/your/image.jpg"
                width="200"
                height="100"
                center-type="contain"
                background-color="lightgrey"></vue-img-loader>

// you can also give a preview
<vue-img-loader src="path/to/your/image.jpg"
                preview="path/to/your/preview.jpg"
                :blur-preview="false"
                width="200"
                height="100"></vue-img-loader>

// and you can blur your preview like what medium.com does
<vue-img-loader src="path/to/your/image.jpg"
                preview="path/to/your/preview.jpg"
                width="200"
                height="100"></vue-img-loader>

// and you can customize more about loading status
<vue-img-loader src="path/to/your/image.jpg" width="200" height="100">
  <h4>loading...</h4>
</vue-img-loader>

// at last, transition is supported, just assign the name of a defined vue transition
<vue-img-loader src="path/to/your/image.jpg"
                preview="path/to/your/preview.jpg"
                width="200"
                height="100"
                transition="fade"></vue-img-loader>
```

## config

you can change VueImgLoader's default props value by change the config object. Blow are the default config

```js
VueImgLoader.config.blurPreview = true;
VueImgLoader.config.blurRadius = 20;
VueImgLoader.config.blurAlphaChannel = false;
VueImgLoader.config.width = 0;
VueImgLoader.config.height = 0;
VueImgLoader.config.backgroundColor = '';
VueImgLoader.config.transition = '';
VueImgLoader.config.centerType = 'cover'; // "cover", "contain"
```

## todo

will support lazy load next



[1]: http://jackgit.github.io/vue-img-loader/index.html
