<style scoped>
  .vil-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .vil-preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .vil-preview__img {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <div :style="containerStyle">
    <img v-show="!loading" class="vil-image" alt="" :src="src" ref="img">
    <transition :name="transition">
      <div v-if="loading" class="vil-preview">
        <canvas  v-if="preview && blurPreview" ref="canvas"></canvas>
        <img v-show="preview && !blurPreview" :src="preview" alt="" class="vil-preview__img" ref="preview">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import stackblur from 'stackblur-canvas';
  import config from './config';
  import CenterIt from './center-it';

  export default {
    props: {
      src: {
        type: String,
        default: '',
        required: true
      },
      preview: {
        type: String,
        default: ''
      },
      blurPreview: {
        type: Boolean,
        default: () => config.blurPreview
      },
      blurRadius: {
        type: [String, Number],
        default: () => config.blurRadius
      },
      blurAlphaChannel: {
        type: Boolean,
        default: () => config.blurAlphaChannel
      },
      width: {
        type: [String, Number],
        default: () => config.width
      },
      height: {
        type: [String, Number],
        default: () => config.height
      },
      backgroundColor: {
        type: String,
        default: () => config.backgroundColor
      },
      transition: {
        type: String,
        default: () => config.transition
      },
      lazy: {
        type: Boolean,
        default: () => config.lazy
      },
      autoClip: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        containerStyle: {
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-block'
        },
        loading: true
      };
    },

    mounted () {
      this.setContainerStyle();
      this.preview && this.loadPreview();
      this.loadImage();
    },

    methods: {
      setContainerStyle () {
        let parent = this.$el.parentElement;

        this.containerStyle = {
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-block',
          width: this.width ? this.width + 'px' : parent.clientWidth + 'px',
          height: this.height ? this.height + 'px' : parent.clientHeight + 'px',
          backgroundColor: this.backgroundColor || 'initial'
        };
      },
      blurCanvas (preview) {
        let canvas = this.$refs.canvas;
        stackblur.image(preview, canvas, this.blurRadius, this.blurAlphaChannel);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
      },
      loadPreview () {
        let preview = new Image();

        preview.alt = '';
        preview.src = this.preview;

        if (!this.autoClip) {
          preview.width = this.width;
          preview.height = this.height;
        }

        preview.onload = () => {
          this.blurPreview && this.blurCanvas(preview);
          if (this.autoClip) {
            this.autoClipImage(this.$refs.preview, preview.naturalWidth, preview.naturalHeight)
          }
        };
      },
      loadImage () {
        let image = new Image();

        this.loading = true;
        image.alt = '';
        image.src = this.src;

        if (!this.autoClip) {
          image.width = this.width;
          image.height = this.height;
        }

        image.onload = () => {
          this.loading = false;
          if (this.autoClip) {
            this.autoClipImage(this.$refs.img, image.naturalWidth, image.naturalHeight)
          }
        };
      },
      autoClipImage (img, width, height) {
        let center = new CenterIt(this.width, this.height, width, height, {type: 'cover'})
        img.style.width = center.newWidth() + 'px'
        img.style.height = center.newHeight() + 'px'
        img.style.top = center.offset().top + 'px'
        img.style.left = center.offset().left + 'px'
      }
    }
  }
</script>
