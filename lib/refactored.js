var miniQuery = {
  SweetSelector: {
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
  },


  DOM: {

    showHide: function(cssSelector, command) {
      var selection = miniQuery.SweetSelector.select(cssSelector);
      if ( selection.length === undefined ) {
        selection.style.visibility = command
      } else {
        for (i = 0; i < selection.length; i++){
          selection[i].style.visibility = command
        };
      }
    },

    hide: function(cssSelector) {
      this.showHide(cssSelector, 'hidden');
    },

    show: function(cssSelector){
      this.showHide(cssSelector, 'visible');
    },

    addClass: function(cssSelector, newClass) {
      var selection = miniQuery.SweetSelector.select(cssSelector)
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
      var selection = miniQuery.SweetSelector.select(cssSelector)
      if (selection.length === undefined) {
        selection.className = selection.className.replace(removeClass, "")
      } else {
        var k = selection.length
        for (i = 0; i < k; i++){
          selection[0].className = selection[0].className.replace(removeClass, "")
        };
      }
    }

  },


  EventDispatcher: {
    events:  {},

    on: function(cssSelector, eventName, action) {
        this.events[eventName] = new Event(eventName);
        var selection = miniQuery.SweetSelector.select(cssSelector);
        if (selection.length === undefined) {
          selection.addEventListener(eventName, action);
        } else {
          for (i = 0; i < selection.length; i++){
            selection[i].addEventListener(eventName, action);
          };
        }
      },

    trigger: function(cssSelector, eventName){
      var selection = miniQuery.SweetSelector.select(cssSelector);
      if (selection.length === undefined) {
        selection.dispatchEvent(this.events[eventName]);
      } else {
        for (i = 0; i < selection.length; i++){
          selection[i].dispatchEvent(this.events[eventName]);
        };
      };
    }
  }
}


// var miniQuery = function(selector) {
//   return new miniQuery.fn.init(selector);
// };

// miniQuery.fn = miniQuery.prototype = {
//   selection: {},

//   SweetSelector: {
//     select: function(cssSelector) {
//       // if first charactor #, parse through DOM for id, if first charactor ., look for class, else look for tag
//       var firstChar = cssSelector.charAt(0);
//       var selectorName = cssSelector.slice(1);

//       if ( firstChar === '#') {
//         this.selection = document.getElementById(selectorName);
//         return self.selection;
//       } else if(firstChar === '.') {
//         return document.getElementsByClassName(selectorName);
//       } else {
//         return document.getElementsByTagName(cssSelector);
//       };
//     }
//   },

//   hide: function() {
//     if ( this.selection.length === undefined ) {
//       this.selection.style.visibility = 'hidden'
//     } else {
//       for (i = 0; i < this.selection.length; i++){
//         this.selection[i].style.visibility = 'hidden'
//       };
//     }
//   },

//   show: function(cssSelector) {
//     var selection = this.SweetSelector.select(cssSelector);
//     if ( selection.length === undefined ) {
//       selection.style.visibility = 'visible'
//     } else {
//       for (i = 0; i < selection.length; i++){
//         selection[i].style.visibility = 'visible'
//       };
//     }
//   }

// };

// miniQuery.fn.init = function(selector) {
//     if (!selector) {
//         return this;
//     }
//     else {
//         console.log('selector: ', selector);
//         return miniQuery.fn.SweetSelector.select(selector)
//     }
// };

// miniQuery.ajax = function() {
//     console.log('ajax');
// };
