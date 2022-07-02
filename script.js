// HTML refernecs
const mainArea = document.getElementById('main-area');

// global constants
const viewportWidth = Math.max(
	document.documentElement.clientWidth || 0,
	window.innerWidth || 0
);
const viewportHeight = Math.max(
	document.documentElement.clientHeight || 0,
	window.innerHeight || 0
);

// helper functions

const generateRandomNumbers = (numberOfRandomNumberWanted, upperLimit) => {
	const arr = [];
	while (arr.length < numberOfRandomNumberWanted) {
		var r = Math.floor(Math.random() * upperLimit) + 1;
		if (arr.indexOf(r - 1) === -1) arr.push(r - 1);
	}
	return arr;
};

const tenRandomNumbers = generateRandomNumbers(10, 40);
console.log(tenRandomNumbers);
const resultArray = [];
let wrongCount = 0;

const disappearNumbers = (from) => {
	tenRandomNumbers.forEach((e, i) => {
		if (i >= from) {
			const thatTile = document.getElementById('tile-' + e);
			thatTile.classList.add('hide-data');
		}
	});
};

const reappearNumbers = () => {
	tenRandomNumbers.forEach((e) => {
		const thatTile = document.getElementById('tile-' + e);
		thatTile.classList.remove('hide-data');
	});
};

const tileClick = (event) => {
	const clickedOnTileId = Number(event.srcElement.id.split('-')[1]);
	console.log(clickedOnTileId);
	// clicked on 0, disappear numbers
	if (resultArray.length === 0 && clickedOnTileId === tenRandomNumbers[0]) {
		disappearNumbers(0);
		resultArray.push(clickedOnTileId);
		document
			.getElementById('tile-' + clickedOnTileId)
			.classList.remove('hide-data');
	} else {
		// checking for other clicks
		if (clickedOnTileId === tenRandomNumbers[resultArray.length]) {
			// clicked on correct sequence
			resultArray.push(clickedOnTileId);
			document
				.getElementById('tile-' + clickedOnTileId)
				.classList.remove('hide-data');
			if (resultArray.length === tenRandomNumbers.length) {
				alert('You Win!!!');
				window.location.reload();
			}
		} else {
			// clicked on false sequence
            wrongCount += 1;
			if (wrongCount >= 3) {
				alert(
					'You have clicked on wrong sequence 3 times. This page will be reloaded for a new game.'
				);
				window.location.reload();
			}
			reappearNumbers();
			setTimeout(() => {
				disappearNumbers(resultArray.length);
			}, 150);
		}
	}
	console.log({ resultArray });
};

const fillTileWithNumbers = () => {
	let visibleNumberCount = 0;
	tenRandomNumbers.forEach((e) => {
		const thatTile = document.getElementById('tile-' + e);
		thatTile.innerText = visibleNumberCount;
		visibleNumberCount += 1;
	});
};

const generateTiles = () => {
	for (let i = 0; i < 40; i++) {
		const newElement = document.createElement('div');
		newElement.id = 'tile-' + i;
		newElement.classList.add('tile');
		// if height is more than width,then we'll render 8 box verticle and 5 in horizontal, else vice versa
		if (viewportHeight > viewportWidth) {
			newElement.style.width = viewportWidth / 5 + 'px';
			newElement.style.height = viewportHeight / 8 + 'px';
		} else {
			newElement.style.width = viewportWidth / 8 + 'px';
			newElement.style.height = viewportHeight / 5 + 'px';
		}
		newElement.onclick = tileClick;
		mainArea.appendChild(newElement);
	}
	fillTileWithNumbers();
};

generateTiles();


if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then((e) => {});
}