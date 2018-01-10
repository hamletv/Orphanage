//START SCRIPT
"use strict"

//check current tab is active. activeTab var set to default true, may work better.
var activeTab = true;

window.onfocus = function(){
  activeTab;
};

window.onblur = function(){
  activeTab = false;
};

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
 };

//called function returns cleaned elemArray, stored into variable.
var cleanDOMArray = cleanElemArray(elemArray, noRoleElements);

  //highlight elements without role attribute. function called on button click.
  //remove function effect/call on button click.
  function hilitePink(cleanDOMArray){
    for(var i = 0; i < cleanDOMArray.length; i++){
    cleanDOMArray[i].hasAttribute("role") ? cleanDOMArray[i].style.cssText = "" : cleanDOMArray[i].style.cssText = "background-color: rgba(250,10,50,0.4)";
    }
  }


  //highlight elements with role attribute. function called on button click.
  //remove function effect/call on button click.
  function hiliteGreen(cleanDOMArray){
    for(var i = 0; i < cleanDOMArray.length; i++){
      //cleanDOMArray[i].style.display = cleanDOMArray[i].getAttribute("role"); -- display role attr. value
      cleanDOMArray[i].hasAttribute("role") ? cleanDOMArray[i].style.cssText = "background-color: rgba(18,246,18,1)" : cleanDOMArray[i].style.cssText = "";
    }
  }


  //highlight both elements with and without role attribute.function called on button click.
  //remove function effect/call on button click.
  function hiliteBoth(cleanDOMArray) {
    for(var i = 0; i < cleanDOMArray.length; i++){
    //cleanDOMArray[i].style.display = cleanDOMArray[i].getAttribute("role"); -- display role attr. value
    cleanDOMArray[i].hasAttribute("role") ? cleanDOMArray[i].style.cssText = "background-color: rgba(18,246,18,1)" : cleanDOMArray[i].style.cssText = "background-color: rgba(250,10,50,0.4)";
    }
  }
