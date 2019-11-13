import Vue from 'vue'
import App from './App.vue'
import VCalendar from "v-calendar"
import Buefy from "buefy"
import 'buefy/dist/buefy.css'

Vue.use(Buefy);

// Modal.open(props);

Vue.use(VCalendar, {
  screens:{
    desktop: "1200px",
  },
  locales:{
    "custom":{
      masks:{
        L: "YYYY年 MM月 DD日",
        title: "YYYY年 　M月",
        navMonths: "M月",
        // weekdays: ["日","月","火","水","木","金", "土"],
        // weekdays: ["日","月","火","水","木"],
        // weekdays: "W",
        // weekdays: [1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7"],
        ordinalWeekdays: {1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7"},
        // W: "日, 月, 火, 水, 木, 金, 土",
        // W:["日","月","火","水","木","金", "土"],
        // dayPopover: "（W), MM月 DD日, YYYY年",
        dayPopover: "（W）, MM月 DD日, YYYY年",

      },
    },
  },
});

new Vue({
  el: '#app',
  render: h => h(App)
})
