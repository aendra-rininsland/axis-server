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
    document.appendChild(fileref);
  }

  if (typeof window.c3 === 'undefined') {
    fileref = document.createElement('script');
    fileref.setAttribute('type', 'text/javascript');
    fileref.setAttribute('src', c3CdnUrl);
    document.appendChild(fileref);

    fileref = document.createElement('link');
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('href', c3CssCdnUrl);
    document.appendChild(fileref);
  }

  // Instantiate charts
  for (var i = 0; i < charts.length; i++) {
    // Grab chart configuration
    xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(){
      var c3Config = JSON.parse(this.responseText);
      c3Config.bindto = charts[i];
      c3Config.width = undefined; // Override chart config's size attributes for responsive output.
      c3Config.height = undefined;
      window.c3.generate(c3Config);
    });

    xhr.open('GET', 'http://axis.timesdev.tool/chart/' + charts[i].dataset.axisId);
    xhr.send();
  }
})();
