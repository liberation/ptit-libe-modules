const fs = require('fs'),
      path = require('path'),
      mkdirp = require('mkdirp'),
      copy = require('copy'),
      async = require('async'),
      gsjson = require('google-spreadsheet-to-json'),
      del = require('del'),
      handlebars = require('handlebars'),
      inquirer = require('inquirer'),
      less = require('less'),
      _ = require('lodash')

var questions = require('./meta'),
    data, src, dest

var slugify = function (str) {
  var slug = _.chain(str).deburr().trim().kebabCase().value()
  return slug
}

console.log('\n* Start Process *\n')

inquirer.prompt(questions).then(function (answers) {
  answers.slug = slugify(answers.name)
  answers.path = answers.numero + '/' + answers.module + '-' + answers.slug + '/'
  data = answers
  buildFiles()
})

function buildFiles () {
  src = './build/template/ptitlibe-' + data.module + '/',
  dist = './dist/' + data.path

  del.sync(dist)
  mkdirp.sync(dist)

  // HTML
  var source = fs.readFileSync(src + 'index.html').toString(),
      template = handlebars.compile(source),
      html = template(data)

  fs.writeFileSync(dist + 'index.html', html)
  
  // ASSETS
  copy(src + 'assets/**', dist + 'assets/', function(err, files) {
    if (err) throw err
    // console.log('   => build html')
    // console.log('   => build js')
    buildCss(function() {
      if (data.module !== 'carte') buildJson()
      else printResult()
    })
  })
}

function buildCss (next) {
  // CSS
  var mainLess = fs.readFileSync('./build/less/main.less').toString()
  less.render(mainLess, {
    paths: ['./build/less'],
    filename: 'main.less',
    modifyVars: {
      'module': data.module,
      'mainColor': data.mainColor,
      'sideColor': data.sideColor,
      'ligthColor': data.ligthColor
    }
  })
  .then(function(output) {
    fs.writeFileSync(dist + 'assets/styles.css', output.css)
    // console.log('   => build css')
    next()
  })

}

function buildJson () {

  var sheet = {
    "spreadsheetId": data.sheet,
    "worksheet": data.isLeaf ? data.leaf : 0
  }

  gsjson(sheet)
  .then(function(result) {

    if (data.module === 'quiz') {
      var quiz = []
      result.forEach(function (v, i) {
        quiz.push(
          {
            id: i,
            question: v['titre'],
            ok: v['bonneRéponse'],
            reponses: [v['reponse1'], v['reponse2'], v['reponse3']],
            answered: false,
            good: v['texteVrai'] || false,
            bad: v['texteFaux'] || false,
            photo: v['urlPhoto'] || false
          }
        )
      })
      result = {
        quiz: quiz,
        mores: false
      }
    }

    fs.writeFile(dist + 'assets/' + data.module+'.json', JSON.stringify(result), function (err) {
      if (err) console.log(err)
      // console.log('   => build json')
      printResult()
    })
  })
  .catch(function(err) {
      console.log(err.message)
      console.log(err.stack)
  })

}

function printResult () {

  console.log('                                    ▒▒▒▒▒▒▒                                     ')
  console.log('                   ▄▄▄######▄▄▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                              ')
  console.log('                ▄▓▀            ▀█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                         ')
  console.log('              ╔▓                 ╙█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                     ')
  console.log('              █                    █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                 ')
  console.log('             ╟▓       ▓█  ▓█       ╟▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒             ')
  console.log('        ▒▒▒▒▒▒█╕                  ╔█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒         ')
  console.log('     ▒▒▒▒▒▒▒▒▒▒█▄               ▄▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒      ')
  console.log('  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ')
  console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████          ███▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒')
  console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█████          █████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒')
  console.log(' ▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒██          ██▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ')
  console.log('    ▒▒▒▒▒▒▒████▒▒▒██          ██▒▒▒████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒    ')
  console.log('       ▒▒▒▒▒▒▒▒▒▒▒██          ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒       ')
  console.log('           ▒▒▒▒▒▒▒██          ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒           ')
  console.log('               ▒▒▒▒████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒              ')
  console.log('                   ▒▒██▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                  ')
  console.log('                     ▓▓    ▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                      ')
  console.log('                   ▓▓▓▓    ▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                          ')
  console.log('                                 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                               ')
  console.log('                                      ▒▒▒▒▒▒                                    ')

  console.log('\n* Bravo, le module " ' + data.name + ' " à bien été crée *\n')

  console.log('=> son numéro et dossier :')
  console.log('   ' + data.path + '\n')
  
  if (data.module === 'carte') {
    console.log('=> Placer le fichier ' + data.imageSvg + ' dans le dossier :')
    console.log('   ' + dist + '/assets/\n')
  }

  console.log('=> Pour tester le module :')
  console.log('   browser-sync start -s "'+dist+'"\n')

  console.log('=> Placer le module sur le ftp :')
  console.log('   ptit-libe/modules/' + data.path + '\n')

  console.log('=> Voici l\'url :')
  console.log('   http://www.liberation.fr/apps/ptit-libe/modules/' + data.path + '\n')

  console.log('=> Et l\'iframe pour l\'article :')
  console.log('   <iframe src="http://www.liberation.fr/apps/ptit-libe/modules/' + data.path + '" class="fit-content" width="100%"></iframe> \n')

  console.log('\n* End Process *\n')
}
