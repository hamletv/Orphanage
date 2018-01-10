# Orphanage
DOM Element highlighter tool, updates role attributes of document elements.

<h3>Project scope:</h3> 

Purpose of role attribute: identifies exact function of an element and its children, allows for accessibility of screen reader users, also useful for
screen scrapers. Native semantic element; assigns purpose to element it is within. Browsers will apply first recognized role in list.
Custom roles can be used as long as they don't conflict with any defined ARIA roles but will not be functional.

WAI-ARIA roles: element types that must not be changed over time or with user actions. Assistive technologies (e.g. screen readers) are unable to detect role value change. In order to
reflect content in the DOM, user agents should map the role attribute to appropriate value.

Purpose of script is to highlight elements on any HTML document that does not contain ARIA roles but that should have an assigned role and value.
The JS script will inject CSS into the document to briefly highlight any and all elements missing a role attribute and value.
are update the DOM. Role attribute and value needs to be added.

Main function (IIFE) of script:
1. run through and read all elements in DOM.
2. check to see if each element has role attributes.
3. alert pop-up messages inform user of site's accessibility.
3. element(s) without role attributes highlighted.
4. element(s) with role attributes not highlighted.
5. element(s) without role attr later injected with role attr.
6. remove highlighting from element once role attr injected.

<hr>

<h3>Running Script in Developer Console:</h3>
Simply copy all code and paste into dev console and hit enter.
Page elements will be highlighted and role added. Orphange code in effect until page is refreshed or url changes.

<hr>

<h3>Linking Script to HTML Document:</h3>
Code currently only runs in dev console but will most likely only need to be wrapped in function like below in order to link to any HTMl file.
Currently testing wrapping function. Code will not have any libraries.

window.onload = function() { 
  //orphanage code here 
  }

