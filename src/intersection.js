(function() {
  var _i;

  _i = function(iframe, master) {
    if (!(this instanceof _i)) {
      return new _i(iframe, master);
    }
    this.iframe = iframe ? document.querySelector(iframe).contentWindow : null;
    this.isMaster = master || false;
    this._events = {};
    this.frame = function() {
      if (!this.isMaster) {
        window.intersection = new _i();
        return window.intersection;
      } else {
        return false;
      }
    };
    this.master = function() {
      var maester;
      if (this.isMaster) {
        maester = new _i();
        this.iframe.master = maester;
        return maester;
      } else {
        return false;
      }
    };
    this._on = function(_when, action) {
      if (this._events[_when]) {
        this._events[_when].push(action);
      } else {
        this._events[_when] = [action];
      }
    };
    this._off = function(_when, action) {
      var newArray;
      newArray = this._events[_when].filter(function(obj) {
        return obj === action;
      });
      this._events[_when] = newArray;
    };
    this._emit = function(where, what) {
      var i;
      if (this._events[where]) {
        i = 0;
        while (i < this._events[where].length) {
          if ((typeof this._events[where][i]) === 'function') {
            this._events[where][i](what);
          }
          i++;
        }
      }
    };
    this.on = function(_when, action) {
      if (this.isMaster) {
        this.iframe.intersection.on(_when, action);
      } else {
        this._on(_when, action);
      }
    };
    this.off = function(_when, action) {
      if (this.isMaster) {
        this.iframe.intersection.off(_when, action);
      } else {
        this._off(_when, action);
      }
    };
    this.emit = function(where, what) {
      if (this.isMaster) {
        return this.iframe.intersection.emit(where, what);
      } else {
        return this._emit(where, what);
      }
    };
  };

  window.Intersection = _i;

}).call(this);
