## description

## demo

## requirement

Vue 2.*

## install

by npm

```
npm i vue-img-loader --save
```

or, directly include dist/vue-img-loader.min.js in your page, VueImgLoader exposed as global variable

```
<script src="path/to/vue-img-loader.min.js"><script>
```

then, use it as any Vue component

```
new Vue({
    ...
    components: {
        'vue-img-loader': VueImgLoader
    }
    ...
})
```

## usage

```
<vue-img-loader src=""></vue-img-loader>
```

## config

you can change VueImgLoader's default props value by change the config object. Blow are the default config

```
VueImgLoader.config.blurPreview = true;
VueImgLoader.config.blurRadius = 20;
VueImgLoader.config.blurAlphaChannel = false;
VueImgLoader.config.width = 0;
VueImgLoader.config.height = 0;
VueImgLoader.config.backgroundColor = '';
VueImgLoader.config.transition = '';
```
