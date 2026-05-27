import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import Layout from './Layout.vue'
import ImagePopup from './components/ImagePopup.vue'
import Steps from './components/Steps.vue'
import FeatureGrid from './components/FeatureGrid.vue'
import FeatureCard from './components/FeatureCard.vue'
import VideoEmbed from './components/VideoEmbed.vue'
import GoogleTranslate from './components/GoogleTranslate.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('ImagePopup', ImagePopup)
    app.component('Steps', Steps)
    app.component('FeatureGrid', FeatureGrid)
    app.component('FeatureCard', FeatureCard)
    app.component('VideoEmbed', VideoEmbed)
    app.component('GoogleTranslate', GoogleTranslate)
  },
}
