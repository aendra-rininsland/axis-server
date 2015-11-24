(function(){
  'use strict';

  var charts, fileref, xhr;
  var d3CdnUrl = '//cdnjs.cloudflare.com/ajax/libs/d3/3.5.9/d3.min.js';
  var c3CdnUrl = '//cdnjs.cloudflare.com/ajax/libs/c3/0.4.11-rc4/c3.min.js';
  var c3CssCdnUrl = '//cdnjs.cloudflare.com/ajax/libs/c3/0.4.11-rc4/c3.min.css';

  if (typeof window.jQuery !== 'undefined') { // Use jQuery if available
    charts = jQuery('.axis-chart').toArray();
  } else { // Otherwise use getElementsByClassName
    charts = document.getElementsByClassName('axis-chart');
  }

  // Grab D3 and C3 if unavailable
  if (typeof window.d3 === 'undefined') {
    fileref = document.createElement('script');
    fileref.setAttribute('type', 'text/javascript');
    fileref.setAttribute('src', d3CdnUrl);
    document.getElementsByTagName('body')[0].appendChild(fileref);
  }

  if (typeof window.c3 === 'undefined') {
    fileref = document.createElement('script');
    fileref.setAttribute('type', 'text/javascript');
    fileref.setAttribute('src', c3CdnUrl);
    document.getElementsByTagName('body')[0].appendChild(fileref);

    fileref = document.createElement('link');
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('href', c3CssCdnUrl);
    document.getElementsByTagName('head')[0].appendChild(fileref);
  }

  function spawnC3(chart, e){
    function traverse(o,func) {
      for (var i in o) {
        o[i] = func.apply(this,[i,o[i]]);
        if (o[i] !== null && typeof(o[i]) === 'object') {
          traverse(o[i],func);
        }
      }
    }

    function evalFormatters(key, value) {
      if (key === 'format' && typeof value === 'string') {
        return eval('(' + value + ')'); // jshint ignore:line
      } else {
        return value;
      }
    }

    var jsonResponse = JSON.parse(e.target.responseText);
    var config = JSON.parse(jsonResponse.axisJSON);
    config.bindto = '#' + chart.id;
    config.width = undefined; // Override chart config's size attributes for responsive output.
    config.height = undefined;
    traverse(config, evalFormatters);

    // Add a timeout to ensure C3 and D3 are loaded.
    setTimeout(function(){
      window.c3.generate(config);
    }, 1000);
  }

  // Instantiate charts
  for (var i = 0; i < charts.length; i++) {
    // Grab chart configuration
    xhr = new XMLHttpRequest();
    xhr.addEventListener('load', spawnC3.bind(null, charts[i]));

    xhr.open('GET', 'http://axis.timesdev.tools/chart/' + charts[i].dataset.axisId);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
  }
})();
