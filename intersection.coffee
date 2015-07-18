_i = (iframe, master) ->
  if !(this instanceof _i)
    return new _i iframe, master
  @iframe = if iframe then document.querySelector(iframe).contentWindow else null;
  @isMaster = master || false;
  @_events = {};
  @frame = () ->
    if not @isMaster
      window.intersection = new _i()
      window.intersection
    else
      false
  @master = () ->
    if @isMaster
      maester = new _i()
      @iframe.master = maester
      maester
    else
      false
  @_on = (_when, action) ->
    if @_events[_when]
      @_events[_when].push action
    else
      @_events[_when] = [action];
    return
  @_off = (_when, action) ->
    newArray = @_events[_when].filter((obj) ->
      obj == action
    )
    @_events[_when] = newArray;
    return
  @_emit = (where, what) ->
    if @_events[where]
      i = 0
      while i < @_events[where].length
          if (typeof this._events[where][i]) == 'function'
            this._events[where][i] what
          i++
    return
  @on = (_when, action) ->
    if @isMaster
      @iframe.intersection.on _when, action
    else
      @_on _when, action
    return
  @off = (_when, action) ->
    if @isMaster
      @iframe.intersection.off _when, action
    else
      @_off _when, action
    return
  @emit = (where, what) ->
    if @isMaster
      @iframe.intersection.emit where, what
    else
      @_emit where, what
  return
window.Intersection = _i;
