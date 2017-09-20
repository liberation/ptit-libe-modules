'use strict';

  function init(datas) {

    var app = new Vue({
      el: '#app',
      data: {
        current: 0,
        quiz: [],
        mores: [],
        sentences: [
            ['Aïe,', 'tu n’as peut-être pas tout compris. Et si tu relisais calmement le dossier&nbsp;?'],
            ['C’est pas mal,', 'mais as-tu bien tout lu&nbsp;?'],
            ['Bravo,', 'c\'est presque un sans-faute&nbsp;!'],
            ['Bravo,', 'tu as tout compris&nbsp;!']
        ]
      },
      created () {
        this.$http.get('assets/quiz.json').then(res => {
          this.quiz = res.body.quiz
          this.mores = res.body.mores
        }, err => {
          console.log(err)
        })
      },
      methods: {
        getCurrent () {
          if (this.current < this.quiz.length) return this.quiz[this.current]
          else return false
        },
        answerCurrent (id) {
          if (!this.getCurrent().answered) {
            this.quiz[this.current].answered = id + 1
          }
        },
        getAnswere () {
          if (this.getCurrent().ok === this.getCurrent().answered) {
            return {title: 'Bravo !', text: this.getCurrent().good || false}
          } else {
            return {title: 'Eh non !', text: this.getCurrent().bad || false}
          }
        },
        nextQuestion () {
          if (this.getCurrent().answered) {
            ++this.current
          }
        },
        getSliderWidth () {
          return {width: (this.current + 1) * 10 + '%'}
        },
        isLast () {
          return this.current === this.quiz.length - 1 ? 'Vois ton résultat' : 'Question suivante'
        },
        isEnd () {
          return this.quiz.length > 0 && this.current >= this.quiz.length
        },
        getScore () {
          let n = 0
          for (let i = 0; i < this.quiz.length; ++i) {
            if (this.quiz[i].answered === this.quiz[i].ok) {
              ++n
            }
          }
          return n
        },
        getSentence (id) {
          id = id || 0
          let score = this.getScore()
          return this.sentences[score > 6 ? 3 : score >= 6 ? 2 : score >= 4 ? 1 : 0][id]
        },
        reset () {
          for (let i = 0; i < this.quiz.length; ++i) {
            this.quiz[i].answered = false
          }
          this.current = 0
        }
      }
    });

  }

  init();
