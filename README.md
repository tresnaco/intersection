#Intersection
Call iframe function with this script.
##In your PARENT window
Example
```js
var intersect = new Intersection("#iframeChange", true);
var fromIframe = intersect.master();
fromIframe.on('loaded', function() {
  intersect.emit('echo', 'working');
});
```
##In your iframe
Example
```js
  var intersect = new Intersection().frame();
  intersect.on('echo', function(data) {
    document.querySelector('body').innerHTML = data;
  });
```
##Starting master frame
```js
var intersect = new Intersection(<iframe-query-selector>, <is-master>);
```
##Starting an iframe instance
```js
  var intersect = new Intersection().frame();
```
##Create event on master
```js
  var master = intersect.master();
  master.on(<event>, callback);
```
##Calling event over iframe to master
```js
master.emit(<event>, <data>);
```
Example
```js
master.emit('loaded', true);
```
