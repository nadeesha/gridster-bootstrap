/**/

'use strict';

var bsgridster = function(gridsterBoxes) {

	var boxGroups = (function makeBoxGroups(boxes) {
		boxes = _.sortBy(boxes, function(box) {
			return box.col;
		});

		// divide all the boxes according to the rows
		var boxGroups = _.groupBy(boxes, function(box) {
			return box.row;
		});

		// get all the row numbers to an array
		var boxGroupRows = _.map(boxGroups, function(boxes, row) {
			return row;
		});

		// are there any boxes in a row that conflicts with a succeeding row?
		// if so, mark them
		_.each(boxGroupRows, function(row) {
			// for each box of the current row
			_.each(boxGroups[row], function(box) {
				box.conflicted = false; // innocent until proven guilty

				if (box.size_y > 1) {
					var hasConflicts = _.find(boxGroupRows, function(rowNumber) {
						// find a row such that the row is below the current box, and above
						// the point where the current box ends.
						return rowNumber > box.row && rowNumber < box.row + box.size_y;
					});

					if (hasConflicts) {
						box.conflicted = true; // guilty!
					}
				}
			});
		});

		return boxGroups;

	})(gridsterBoxes, boxGroups);

	function makeRow(boxes) {
		var boxGroupElem = document.createElement('div');

		var firstBox = boxes[0];
		var lastBox = boxes[boxes.length - 1];

		// var offset = ((firstBox.col-1) * 100/grid.width).toString() + '%';
		// var width = ((lastBox.col + lastBox.size_x - firstBox.col)*100/grid.width).toString() + '%';

		var offset = 'col-md-push-' + (firstBox.col - 1).toString();
		var widthInCols = lastBox.col + lastBox.size_x - firstBox.col;
		var width = 'col-md-' + widthInCols.toString();

		boxGroupElem.className = 'row' + ' ' + offset + ' ' + width;

		if (firstBox.conflicted) {
			// this is a conflicted loner. Need to set it's height
			var height = (firstBox.size_y * 50).toString() + 'px';
			boxGroupElem.style.height = height;
		}

		return boxGroupElem;
	}

	function getHtml() {
		var containerElem = document.createElement('div');
		containerElem.className = 'row';

		_.each(boxGroups, function(boxes) {
			var boxGroupElem = makeRow(boxes);

			var firstBox = boxes[0];
			var lastBox = boxes[boxes.length - 1];
			var widthInCols = lastBox.col + lastBox.size_x - firstBox.col;

			_.each(boxes, function(box) {
				if (box.conflicted) {
					var rowWithSingleBox = [box];
					containerElem.appendChild(makeRow(rowWithSingleBox));
				} else {
					var boxElem = document.createElement('div');
					var width = (box.size_x * 100 / widthInCols).toString() + '%'; // yes, i know, this is not fully responsive. but it works.
					var height = (box.size_y * 50).toString() + 'px';

					boxElem.style.width = width;
					boxElem.style.height = height;
					boxElem.style.float = 'left';

					boxGroupElem.appendChild(boxElem);
				}
			});

			containerElem.appendChild(boxGroupElem);
		});

		return containerElem;
	}


	return {
		getHtml: getHtml
	};
};