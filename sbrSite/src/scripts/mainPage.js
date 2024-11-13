const { createApp } = Vue;
import { ScriptsUtils } from './utils.js'


createApp({
    data() {
        const _description = 'Чат-боты для бизнеса'
        const sbr = 'SBR DIGITAL'
        const imgDir = './src/img/'
        const tgImgSrc = imgDir + 'tg.png'
        const tgPubUrl = 'https://t.me/+7yaJPC70S85lM2Qy'
        const dataCollectorScriptUrl = 'https://sbrdigital.github.io/dcjs_cdn/dcCollectorBundle.js'

        return {
            title: sbr,
            heading: sbr,
            description: _description,
            link: tgPubUrl,
            imageSrc: tgImgSrc,
            imageAlt: sbr + ' ' + _description,
            dataCollectorScriptUrl: dataCollectorScriptUrl
        };
    },
    mounted() {
        document.title = this.title;  // Заголовок сайта
        ScriptsUtils.createScript('dcUrlScript', false, this.dataCollectorScriptUrl)
    }
}).mount('#app');