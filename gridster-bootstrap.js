/* jshint camelcase: false */

var bsgridster = function(gridsterBoxes) {

	'use strict';

	gridsterBoxes = _.sortBy(gridsterBoxes, function(box) {
		return box.col;
	});

	function makeBox(width, height, isRow) {
		var boxElem = document.createElement('div');
		var widthClass = 'col-md-' + width.toString();

		boxElem.className = widthClass + ' graybox';

		if (isRow) {
			boxElem.className += '';
		}

		boxElem.style.minHeight = (height * 50).toString() + 'px';

		return boxElem;
	}

	function getChildren(parent) {
		return _.chain(gridsterBoxes)
			.filter(function(child) {
				return child.col >= parent.col &&
					(child.size_x + child.col - 1) <= (parent.size_x + parent.col - 1) &&
					child.row === (parent.row + parent.size_y); // is a child and not a grandchild
			})
			.sortBy(function(child) {
				return child.row;
			})
			.value();
	}

	function makeContainer(box, widthOverride) {
		var ratio = 12 / box.size_x; // bootstrap to gridster ratio

		var parentBoxContainer = makeBox(box.row===1 ? box.size_x : widthOverride, 0, true); // this contains the box box and it's children
		var parentBox = makeBox(box.size_x * ratio, box.size_y);

		parentBoxContainer.appendChild(parentBox);
		this.appendChild(parentBoxContainer);

		_.each(box.children, function(child) {
			if(child.children.length > 0) {
				makeContainer.call(parentBoxContainer, child, (child.size_x/this.size_x)*12);
			} else {
				var childBox = makeBox(child.size_x * ratio, child.size_y);
				parentBoxContainer.appendChild(childBox);
			}
		}, box);
	}

	function html() {
		var containerElem = document.createElement('div');

		_.each(gridsterBoxes, function(box) {
			box.children = getChildren(box);
		});

		var firstRowBoxes = _.filter(gridsterBoxes, function(box) {
			return box.row === 1;
		});

		_.each(firstRowBoxes, makeContainer, containerElem);

		console.log(firstRowBoxes);
		return containerElem;
	}

	return {
		getHtml: html
	};
};
