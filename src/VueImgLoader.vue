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
    <img v-if="!loading" class="vil-image" alt="" :src="src">
    <transition :name="transition">
      <div v-if="loading" class="vil-preview">
        <canvas  v-if="preview && blurPreview" ref="canvas"></canvas>
        <img v-if="preview && !blurPreview" :src="preview" alt="" class="vil-preview__img">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import stackblur from 'stackblur-canvas';
  import config from './config';

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
        default: () => config.width
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
      }
    },

    data () {
      return {
        containerStyle: {
          position: 'relative',
          overflow: 'hidden'
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
        preview.width = this.width;
        preview.height = this.height;

        preview.onload = () => {
          this.blurPreview && this.blurCanvas(preview);
        };
      },
      loadImage () {
        var image = new Image();

        this.loading = true;
        image.alt = '';
        image.src = this.src;
        image.width = this.width;
        image.height = this.height;

        image.onload = () => {
          this.loading = false;
        };
      },
      inView () {
        let rect = this.$el.getBoundingClientRect();
        return (rect.top < window.innerHeight && rect.bottom > 0) && (rect.left < window.innerWidth && rect.right > 0);
      }
    }
  }
</script>
