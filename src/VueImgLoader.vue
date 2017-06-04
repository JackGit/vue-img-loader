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
    overflow: hidden;
  }
</style>

<template>
  <div :style="containerStyle">
    <img v-show="imageReady" class="vil-image" alt="" src="" ref="image">
    <transition :name="transition">
      <div v-if="!imageReady" class="vil-preview" ref="preview">
        <canvas v-show="preview && previewReady && blurPreview" ref="canvas"></canvas>
        <img v-show="preview && previewReady && !blurPreview" src="" alt="" ref="previewImage">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import CenterIt from 'center-it'
  import stackblur from 'stackblur-canvas'
  import config from './config'

  function _loadImage (url, crossOrigin, callback) {
    let image = new Image()
    crossOrigin && (image.crossOrigin = "Anonymous")
    image.onload = function () {
      callback && callback(image)
    }
    image.src = url
  }

  function _center (element, containerWidth, containerHeight, elementWidth, elementHeight, type) {
    let centerIt = new CenterIt({
      containerWidth: containerWidth,
      containerHeight: containerHeight,
      originWidth: elementWidth,
      originHeight: elementHeight,
      centerType: type
    })
    element.style.position = 'absolute'
    centerIt.setPosition(element)
  }

  export default {
    isDestroyed: false,

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
      centerType: {
        type: String,
        default: () => config.centerType
      }
    },

    data () {
      return {
        containerStyle: {
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-block'
        },
        imageReady: false,
        previewReady: false,
        containerWidth: this.width,
        containerHeight: this.height
      };
    },

    mounted () {
      this.setContainerStyle()
      this.load()
    },

    beforeDestroy () {
      this.$options.isDestroyed = true
    },

    watch: {
        src () {
          this.load()
        }
    },

    methods: {
      load () {
        this.imageReady = false
        this.previewReady = false
        this.loadPreview()
        this.loadImage()
      },
      makeCenter (element, width, height) {
        _center(element, this.containerWidth, this.containerHeight, width, height, this.centerType)
      },
      setContainerStyle () {
        let parent = this.$el.parentElement
        this.containerWidth = this.width || parent.clientWidth
        this.containerHeight = this.height || parent.clientHeight
        this.containerStyle = {
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-block',
          width: this.containerWidth + 'px',
          height: this.containerHeight + 'px',
          backgroundColor: this.backgroundColor || 'initial'
        };
      },
      loadPreview () {
        if (!this.preview) {
          return
        }

        (function (key) {
          _loadImage(this.preview, true, image => {
            let previewImage = this.$refs.previewImage

            // component destroyed, or src changed, or image ready (cached image)
            if (this.$options.isDestroyed || key !== this.src || !previewImage) {
              return
            }

            if (this.blurPreview) {
              this.blurCanvas(image)
            } else {
              this.makeCenter(previewImage, image.naturalWidth, image.naturalHeight)
              previewImage.src = this.preview
            }
            this.previewReady = true
          })
        }).bind(this)(this.src)
      },
      loadImage () {
        _loadImage(this.src, false, img => {
          (function (key) {
            if (this.$options.isDestroyed || key !== this.src) {
              return
            }

            let image = this.$refs.image
            this.makeCenter(image, img.naturalWidth, img.naturalHeight)
            image.src = this.src
            this.imageReady = true
          }).bind(this)(this.src)
        })
      },
      blurCanvas (previewImage) {
        let canvas = this.$refs.canvas;
        canvas.style.width = previewImage.naturalWidth + 'px'
        canvas.style.height = previewImage.naturalHeight + 'px'
        stackblur.image(previewImage, canvas, this.blurRadius, this.blurAlphaChannel)
        this.makeCenter(canvas, previewImage.naturalWidth, previewImage.naturalHeight)
      }
    }
  }
</script>
