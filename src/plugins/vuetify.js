import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi' //|| 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg', 'mdiSvg', //
    },
    theme: {
        themes: {
            light: {
                primary: colors.red.darken1, // #E53935
                secondary: colors.red.lighten4, // #FFCDD2
                accent: colors.indigo.base,
                error: '#b71c1c',// #3F51B5
                megalogPrimary: '#96BF0D',
                megalogSecondary: '#036C2B'
            },
        },
    },
});

