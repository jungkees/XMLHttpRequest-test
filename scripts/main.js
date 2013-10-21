(function() {
  "use strict";

  var log = console.log.bind(console);

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
})();