'use strict';

function init(datas) {

  var app = new Vue({
    el: '#app',
    data: {
      slides: [],
      index: 0,
      current: 0,
      direction: 'right'
    },
    created () {
      this.$http.get('assets/diaporama.json').then(function(res) {
        this.slides = res.body
      }, function() {
        console.log('error');
      });
    },
    watch: {
      slides (slides) {
        if (this.index >= this.slidesCount) this.index = this.slidesCount - 1
      }
    },
    computed: {
      slidesCount () {
        return this.slides.length
      },
      transition () {
        if (this.direction) {
          return 'slide-' + this.direction
        }
      }
    },
    methods: {
      next () {
        this.index++
        this.direction = 'right'
        if (this.index >= this.slidesCount) this.index = 0
      },
      prev () {
        this.index--
        this.direction = 'left'
        if (this.index < 0) this.index = this.slidesCount - 1
      },
      goTo (index) {
        this.direction = index > this.index ? 'right' : 'left'
        this.index = index
      },
      visible (i) {
        return i === this.index
      }
    }
  });

}
init()
