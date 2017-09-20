'use strict';

document.querySelector('#carte_cliquable').addEventListener('load', function() {
  var mapName = document.querySelector('#mapName'),
      svg = this.contentDocument;

  var colors = { off: '{{ sideColor }}', on: '{{ mainColor }}' };

  [].slice.call(svg.querySelectorAll('*[id]')).forEach(function(element) {
      if (['path', 'polygon', 'g'].indexOf(element.tagName) >= 0) {
          var name = element.getAttribute('id').replace(/_\d+_/g, '').replace(/_/g, ' ');

          element.addEventListener('click', function() {
              [].slice.call(svg.querySelectorAll('*[id]')).forEach(function(el) {
                if (['path', 'polygon'].indexOf(element.tagName) >= 0) { el.style['fill'] = colors.off; }
              });
              mapName.innerHTML = name;
              mapName.style['opacity'] = 1;
              element.style['fill'] = colors.on;
          });

          element.style['fill'] = colors.off;
      }
  });
});

function resize() {
  var appH = $('#app').height();
  $('#app').attr('data-height', appH);
}
resize();

window.addEventListener('resize', function() {
  resize();
});