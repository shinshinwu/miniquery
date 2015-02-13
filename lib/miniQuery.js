var SweetSelector = {
// need to consider if selector doesn't return selection
  select: function(cssSelector) {
    // if first charactor #, parse through DOM for id, if first charactor ., look for class, else look for tag
    var firstChar = cssSelector.charAt(0);
    var selectorName = cssSelector.slice(1);

    if ( firstChar === '#') {
      return document.getElementById(selectorName);
    } else if(firstChar === '.') {
      return document.getElementsByClassName(selectorName);
    } else {
      return document.getElementsByTagName(cssSelector);
    };
  }
};

var DOM = {

  hide: function(cssSelector) {
    var selection = SweetSelector.select(cssSelector);
    if ( selection.length === undefined ) {
      selection.style.visibility = 'hidden'
    } else {
      for (i = 0; i < selection.length; i++){
        selection[i].style.visibility = 'hidden'
      };
    }
  },

  show: function(cssSelector) {
    var selection = SweetSelector.select(cssSelector);
    if ( selection.length === undefined ) {
      selection.style.visibility = 'visible'
    } else {
      for (i = 0; i < selection.length; i++){
        selection[i].style.visibility = 'visible'
      };
    }
  },

  addClass: function(cssSelector, newClass) {
    var selection = SweetSelector.select(cssSelector)
    if (selection.length === undefined) {
      selection.className += selection.className ? ' ' + newClass : newClass
    }
    else {
      for (i = 0; i < selection.length; i++){
        selection[i].className += selection[i].className ? ' ' + newClass : newClass
      };
    }
  },

  removeClass: function(cssSelector, removeClass) {
    var selection = SweetSelector.select(cssSelector)
    if (selection.length === undefined) {
      selection.className = selection.className.replace(removeClass, "")
    } else {
      var k = selection.length
      for (i = 0; i < k; i++){
        selection[0].className = selection[0].className.replace(removeClass, "")
      };
    }
  }
}

var EventDispatcher = {

  events:  {},

  on: function(cssSelector, eventName, action) {
      this.events[eventName] = new Event(eventName);
      var selection = SweetSelector.select(cssSelector);
      if (selection.length === undefined) {
        selection.addEventListener(eventName, action);
      } else {
        for (i = 0; i < selection.length; i++){
          selection[i].addEventListener(eventName, action);
        };
      }
    },

  trigger: function(cssSelector, eventName){
    var selection = SweetSelector.select(cssSelector);
    if (selection.length === undefined) {
      selection.dispatchEvent(this.events[eventName]);
    } else {
      for (i = 0; i < selection.length; i++){
        selection[i].dispatchEvent(this.events[eventName]);
      };
    };
  }
}

var AjaxWrapper = {

  request: function(object){
    httpRequest = new XMLHttpRequest();
    httpRequest.open(object.type, object.url);
    httpRequest.send();
    if (httpRequest.status === 200) {
      object.success();
    } else {
      object.fail();
    }
  }

}



