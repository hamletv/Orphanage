//START SCRIPT

(function() {  //function takes current doc as parameter. IIFE will run script as soon as page loads.

  var roleattr = document.body.querySelectorAll("[role]");  //check document for all elements with role attribute, store in var; roleattr is loopable nodelist, not array.
  var elemArray = Array.from(document.body.getElementsByTagName("*"));  //collect all document elements, convert into array, store in var. If not array it would be HTMLCollection.

  //noRoleElements is array with elements that have no role assigned, need to remove these from elemArray, no need to highlight.
  var noRoleElements = ["abbr, address, audio, b, base, bdi, bdo, blockquote, br, canvas, caption, cite, code, \
  col, colgroup, data, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, head, html, \
  i, iframe, ins, kbd, label, legend, link, map, mark, meta, meter, noscript, object, p, param, picture, \
  pre, q, rp, rt, ruby, s, samp, script, small, source, span, strong, style, sub, summary, sup, svg, \
  template, time, title, track, u, var, video, wbr"];

  //function takes arrays and removes noRoleElements from elemArray.
  function cleanElemArray(elemArray, noRoleElements) {

    noRoleElements = Array.from(document.body.querySelectorAll(noRoleElements));

    for(var i = 0; i < noRoleElements.length; i++) {
      var thisNoRoleElem = noRoleElements[i];
      for(var x = 0; x < elemArray.length; x++) {
        var thisDOMElem = elemArray[x];
      if(thisDOMElem == thisNoRoleElem) {
        var itemPos = elemArray.indexOf(thisDOMElem);
        var cutElem = elemArray.splice(itemPos, 1);
     }
    }
   }
   return elemArray;
  }

  //called function returns cleaned elemArray, stored into variable.
  var cleanDOMArray = cleanElemArray(elemArray, noRoleElements);

  //function that will loop through cleanDOMArray var.
  function hiliteElems(cleanDOMArray) {

  if (roleattr.length == 0) { //some sites will not have any role attributes, alert msg will inform user of lack of roles.
      alert("This site does not currently contain ARIA role attributes to aid in navigation and accessibility.\
      Elements without role attribute will be highlighted, role attributes will be added automatically.");
    for(var i = 0; i < cleanDOMArray.length; i++) {
      var currDOMElement = cleanDOMArray[i];
      currDOMElement.style.cssText = "background-color: rgba(255,191,202,0.4)"; //loop through cleanDOMArray, highlight all elements.
    }
  }
  else if (roleattr.length > 0) { //some sites will have some role attributes, alert msg will infom user of better accessibility.
     alert("This site contains some ARIA role attributes to aid in navigation and accessibility.\
     Elements without role attribute will be highlighted, role attributes will be added automatically.");
    for (var i = 0; i < cleanDOMArray.length; i++) {
      var thisElement = cleanDOMArray[i];
      if(thisElement.hasAttribute("role")) {  //loop through cleanDOMArray, if role present in current element do not highlight,
        thisElement.style.cssText = "";
      }
      else {
      thisElement.style.cssText = "background-color: rgba(255,191,202,0.4)"; //highlight elements that do not have role attribute.
      }
    }
  }
  else {

      alert("This page contains ARIA-ROLE attributes for easy navigation.");  //alert msg that confirms all necessary elements have role attributes
    }
    return cleanDOMArray;
  }

  //call hiliteElems function, returned array stored in var.
  var litElems = hiliteElems(cleanDOMArray);

  //function that loops through highlighted (litElems), removes highlight, adds role attribute and value.
  function setRole(litElems) {

      for (var x = 0; x < litElems.length; x++) {
        var elemName = litElems[x];
        elemName.style.cssText = null;
        var checkTagName = litElems[x].tagName;  //must assign role and respective value based on element tagName.

        switch (checkTagName) {

          case "A":
            if(elemName.parentElement.tagName == "menu") {
              elemName.setAttribute("role", "menuitem");
            }
            else {
              elemName.setAttribute("role", "link");
            }
          break;

          case "AREA":
          elemName.setAttribute("role", "link");
          break;

          case "ARTICLE":
          elemName.setAttribute("role", "article");
          break;

          case "ASIDE":
          elemName.setAttribute("role", "complimentary");
          break;

          case "BODY":
          elemName.setAttribute("role", "document");
          break;

          case "BUTTON":
          elemName.setAttribute("role", "button");
          break;

          case "DATALIST":
          elemName.setAttribute("role", "listbox");
          break;

          case "DD":
          elemName.setAttribute("role", "definition");
          break;

          case "DIALOG":
          elemName.setAttribute("role", "dialog");
          break;

          case "FOOTER":
          elemName.setAttribute("role", "contentinfo");
          break;

          case "FORM":
          elemName.setAttribute("role", "form");
          break;

          case "H1":
          case "H2":
          case "H3":
          case "H4":
          case "H5":
          case "H6":
          elemName.setAttribute("role", "heading");
          break;

          case "HEADER":
          elemName.setAttribute("role", "banner");
          break;

          case "HR":
          elemName.setAttribute("role", "separator");
          break;

          case "IMG":
            if(elemName.alt == "" || elemName.alt == null) {
              elemName.setAttribute("role", "presentation");
            }
            else {
              elemName.setAttribute("role", "img");
            }
          break;

          case "INPUT":  //<input> element with most applicable roles. nested switch case not ideal but better than multiple if/else if statements.
            switch(true) {  //some roles require checking <input> parent element tagName

              case elemName.type == "button" || elemName.type == "image" || elemName.type == "reset" || elemName.type == "submit":
              elemName.setAttribute("role", "button");

              case elemName.type == "button" || elemName.type == "image" && elemName.parentElement.tagName == "menu":
              elemName.setAttribute("role", "menuitem");

              case elemName.type == "checkbox":
              elemName.setAttribute("role", "checkbox");

              case elemName.type == "email" && elemName.parentElement.tagName == "menu":
              elemName.setAttribute("role", "menuitemcheckbox");

              case elemName.type == "button" || elemName.type == "email" || elemName.type == "telephone" || elemName.type == "text" || elemName.type == "url":
              elemName.setAttribute("role", "textbox");

              case elemName.type == "number":
              elemName.setAttribute("role", "spinbutton");

              case elemName.type == "radio":
              elemName.setAttribute("role", "radio");

              case elemName.type == "radio" && elemName.parentElement.tagName == "menu":
              elemName.setAttribute("role", "menuitemradio");

              case elemName.type == "range":
              elemName.setAttribute("role", "slider");

              case elemName.type == "search":
              elemName.setAttribute("role", "searchbox");
            }
          break;

          case "KEYGEN":
          elemName.setAttribute("role", "listbox");
          break;

          case "LI":
          elemName.setAttribute("role", "listitem");
          break;

          case "MAIN":
          elemName.setAttribute("role", "main");
          break;

          case "MATH":
          elemName.setAttribute("role", "math");
          break;

          case "MENU":
          elemName.setAttribute("role", "menu");
          break;

          case "MENUITEM":
            if(elemName.type == "command") {
              elemName.setAttribute("role", "menuitem");
            }
            else if (elemName.type == "checkbox") {
              elemName.setAttribute("role", "menuitemcheckbox");
            }
            else if (elemName.type == "radio") {
              elemName.setAttribute("role", "menuitemradio");
            }
            else {
              elemName.setAttribute("role", "menuitem");
            }
          break;

          case "NAV":
          elemName.setAttribute("role", "navigation");
          break;

          case "OL":
          case "UL":
          elemName.setAttribute("role", "list");
          break;

          case "OPTGROUP":
          elemName.setAttribute("role", "group");
          break;

          case "OPTION":
          elemName.setAttribute("role", "option");
          break;

          case "OUTPUT":
          elemName.setAttribute("role", "status");
          break;

          case "PROGRESS":
          elemName.setAttribute("role", "progressbar");
          break;

          case "SECTION":
          elemName.setAttribute("role", "region");
          break;

          case "SELECT":
            if(elemName.size > 1) {
              elemName.setAttribute("role", "listbox");
            }
            else {
              elemName.setAttribute("role", "combobox");
            }
          break;

          case "TABLE":
          elemName.setAttribute("role", "table");
          break;

          case "TBODY":
          case "TFOOT":
          elemName.setAttribute("role", "rowgroup");
          break;

          case "TD":
            if(elemName.parentElement.hasAttribute("role") == "table") {  //checks <td> element parent role attribute.
              elemName.setAttribute("role", "cell");
            }
            else {
              elemName.setAttribute("role", "gridcell");
            }
          break;

          case "TEXTAREA":
          elemName.setAttribute("role", "textbox");
          break;

          case "TH":
            if(elemName.hasAttribute("role") != "columnheader" || elemName.hasAttribute("role") != "rowheader" && elemName.parentElement.hasAttribute("role") == "table") {
              elemName.setAttribute("role", "cell");
            }
            else {
              elemName.setAttribute("role", "columnheader");
            }
          break;

          case "TR":
          elemName.setAttribute("role", "row");
          break;

          default: "All elements checked."

        }
      }
      return litElems;  //highlight off, return elements with role attributes
    }
    //setRole function called by setTimeout function to control length of time highlight appears.
    return setTimeout(function() {setRole(litElems);}, 3000);
})(); //IIFE runs script after page loads.
