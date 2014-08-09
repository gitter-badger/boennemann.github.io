domready(function() {
  document.querySelector('html').className = '';
  setTimeout(function() {
    document.querySelector('#fade').className = 'fade';
  }, 150);
});
