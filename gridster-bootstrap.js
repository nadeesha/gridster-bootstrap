/* jshint camelcase: false */

'use strict';

var bsgridster = function(gridsterBoxes) {

	gridsterBoxes = _.sortBy(gridsterBoxes, function(box) {
		return box.col;
	});

	function makeBox(width, height, isRow) {
		var boxElem = document.createElement('div');
		var widthClass = 'col-md-' + width.toString();

		boxElem.className = widthClass + ' graybox';

		if (isRow) {
			boxElem.className += ' row';
		}

		boxElem.style.minHeight = (height * 50).toString() + 'px';

		return boxElem;
	}

	function makeContainer(parent) {
		var ratio = 12 / parent.size_x; // bootstrap to gridster ratio

		var parentBoxContainer = makeBox(parent.size_x, 0, true); // this contains the parent box and it's children
		var parentBox = makeBox(parent.size_x * ratio, parent.size_y);

		parentBoxContainer.appendChild(parentBox);

		parent.children = _.chain(gridsterBoxes)
			.filter(function(child) {
				return child.col >= parent.col &&
					(child.size_x + child.col - 1) <= (parent.size_x + parent.col - 1) &&
					child.row > parent.row;
			})
			.sortBy(function(child) {
				return child.row;
			})
			.value();

		_.each(parent.children, function(child) {
			var childBox = makeBox(child.size_x * ratio, child.size_y);
			// TODO: children might not be immediate to each other. col-md-push?


			parentBoxContainer.appendChild(childBox);
		});

		this.appendChild(parentBoxContainer);
	}

	function html() {
		var containerElem = document.createElement('div');

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