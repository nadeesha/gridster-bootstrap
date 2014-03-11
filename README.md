gridster-bootstrap
==================
An attempt to generate boostrap-based responsive layouts using [gridster.js](https://github.com/ducksboard/gridster.js). Check out the [demo](https://rawgithub.com/ncthis/gridster-bootstrap/master/demo/index.html).

#Set up
1. For the moment, we need underscore.js as a dependency. So you'll need to add that to your project.
    ```sh
    	bower install underscore
    ```

2. Then simply include the `gridster-bootstrap.js` to your **bootrap enabled** project, and you're good to go.

#Usage
1. Initialise your gridster layout, do your magic, and serialise it like this:
    ```
    var serialized = gridster.serialize();
    ```

2. Pass your serialized gridster layout to a new `bsgridster` object:
    ```
    var bootstrapLayout = new bsgridster(serialized, unitHeight, boxClass);
    ```
	As you can see, `bsgridster` constructor takes 3 arguments.
	* `serialized` - your gridster serialzation from step 1.
	* `unitHeight` (optional - defaults to `50`) - a `Number` value depicting how tall a single box should be, in pixels.
	* `boxClass` (optional) - a string for the name of a custom css that would be appended to all boxes.
3. Render the HTML for the layout

	```js
	bootstrapLayout.getHtml();
	```
	
4. Profit!

#Example
```js
var b = new bsgridster(s, 50, 'graybox');
var v = b.getHtml();
document.getElementById('myContainer').innerHTML = v;
```

#Demo
Feel free to `git clone` and play around in the demo directory.

#Contributions
Please!

#TODOs
* Remove underscore as a dependency.
* Support all the screen sizes. (Currently only `col-md` is supported)
* Better row utilization with nested gridster layouts
	* Currently, the responsive layout collapsed will collapse row by row. In some cases, this might not be favorable.
	* There might be limitations on gridster in achieving this.
