(function() {
  "use strict";

  var log = console.log.bind(console);

  // add some class names to TR to be able to easily hide/show certain categories.
  for(var trs = document.getElementsByTagName('tr'), tr, i = 0; tr = trs[i]; i++){
    var numResults = tr.cells.length - 2;
    if(tr.getElementsByClassName('pass').length === numResults){
      tr.classList.add('allpass');
    }else if(tr.getElementsByClassName('fail').length === numResults){
      tr.classList.add('allfail');
    }else if (i > 0) {
      tr.classList.add('mixed');
    };
    var passes = tr.getElementsByClassName('pass').length;
  }

  var results = {
  	// webkit
    webkit: {
      total: undefined,
      notPerformed: undefined,
      pass: undefined,
      fail: undefined,
      timeout: undefined,
      notRun: undefined
    },
    // blink
    blink: {
      total: undefined,
      notPerformed: undefined,
      pass: undefined,
      fail: undefined,
      timeout: undefined,
      notRun: undefined
    },
    // gecko
    gecko: {
      total: undefined,
      notPerformed: undefined,
      pass: undefined,
      fail: undefined,
      timeout: undefined,
      notRun: undefined
    },
    // trident
    trident: {
      total: undefined,
      notPerformed: undefined,
      pass: undefined,
      fail: undefined,
      timeout: undefined,
      notRun: undefined
    },
    // presto
    presto: {
      total: undefined,
      notPerformed: undefined,
      pass: undefined,
      fail: undefined,
      timeout: undefined,
      notRun: undefined
    },
  };

  // build test results object
  ["webkit", "blink", "gecko", "trident", "presto"].forEach(function(browserEngine) {
  	results[browserEngine]["total"] = document.querySelectorAll("td" + "." + browserEngine);
  	results[browserEngine]["notPerformed"] = document.querySelectorAll("td" + "." + browserEngine + ".notperformed");
  	results[browserEngine]["pass"] = document.querySelectorAll("td" + "." + browserEngine + ".pass");
  	results[browserEngine]["fail"] = document.querySelectorAll("td" + "." + browserEngine + ".fail");
  	results[browserEngine]["timeout"] = document.querySelectorAll("td" + "." + browserEngine + ".timeout");
  	results[browserEngine]["notRun"] = document.querySelectorAll("td" + "." + browserEngine + ".notrun");
  });

  var tr = document.createElement("tr");

  var nodeValue = {};

  // calculate the pass ratio and show it!
  ["test", "webkit", "blink", "gecko", "trident", "presto", "remark"].forEach(function(column) {
  	var td = document.createElement("td");

    if (column === "test") {
      td.setAttribute("class", "stats rounded-foot-left");
      Object.defineProperty(nodeValue, column, {
        value: "Pass ratio (%)"
      });
    } else if (column ==="remark") {
      td.setAttribute("class", "stats rounded-foot-right");
      Object.defineProperty(nodeValue, column, {
        value: ""
      });
    } else {
      td.setAttribute("class", "stats");
      Object.defineProperty(nodeValue, column, {
        value: "" + Math.round((results[column]["pass"].length / (results[column]["total"].length) * 100) * 100) / 100
      });
    }

    td.appendChild(document.createTextNode(nodeValue[column]));
    tr.appendChild(td);
  });

  document.getElementsByTagName("tfoot")[0].appendChild(tr);

  var div = document.body.appendChild(elm('div'));
  var cb = elm('input', '', {type:'checkbox'}, div.appendChild(elm('label')));
  cb.onchange = function(){this.checked ? document.body.classList.add('show_only_fail') : document.body.classList.remove('show_only_fail'); }
  cb.parentNode.appendChild(document.createTextNode(' Show only tests that fail everywhere'))
  function elm(tag, text, attributes, parent){
    var elm = document.createElement(tag);
    if(attributes){
      for(var attr in attributes){
        elm.setAttribute(attr, attributes[attr]);
      }
    }
    if(text){
      elm.appendChild(document.createTextNode(text));
    }
    if(parent){
      parent.appendChild(elm);
    }
    return elm;
  }

})();