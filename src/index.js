import VueImgLoader from './VueImgLoader.vue';
import config from './config';

VueImgLoader.config = config;
export default VueImgLoader;

if (typeof window !== 'undefined') {
  window.VueImgLoader = VueImgLoader;
}
