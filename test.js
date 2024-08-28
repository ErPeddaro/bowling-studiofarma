const main = () => {
	FRAMESNUMBER = 11;
	frames = Array(FRAMESNUMBER - 1)
		.fill()
		.map((_) => [0, 0, 0]);

	isStrike = false;
	isSpare = false;
	score = 0;

	for (let i = 0; i < FRAMESNUMBER; i++) {
		score += frame(i);
	}

	frames.forEach((element, index) => {
		console.log(`frame ${index}:`, element);
	});

	console.log("Score:", score);

	return;
};

const randInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const frame = (i) => {
	let pins = 10;
	let frameScore = 0;

	for (let j = 0; j < 2; j++) {
		let shotScore = shot(pins);
		shotScore = 10;

		if ((isSpare || isStrike) && i + 1 === FRAMESNUMBER) {
			shotScore = shot(10);
			frameScore += shotScore;
			frames[i - 1][2] = shotScore;

			return frameScore;
		}

		if (i + 1 === FRAMESNUMBER) {
			return frameScore;
		}

		pins -= shotScore;
		frames[i][j] = shotScore;
		frameScore += shotScore;

		switch (true) {
			case isSpare && j === 0:
				frames[i - 1][2] = frameScore;
				frameScore += frameScore;

				isSpare = false;
				break;

			case isStrike && j === 1:
				frames[i - 1][2] = frameScore;
				frameScore *= frameScore;

				isStrike = false;
				break;

			case isStrike && j === 0 && pins === 0:
				frames[i - 1][2] = frameScore;
				frameScore *= 2;

				return frameScore;

			default:
				break;
		}

		isSpare = checkSpare(pins, j);
		if (isSpare) return frameScore;

		if (j === 0 && isStrike === false) {
			isStrike = checkStrike(pins, j);
			if (isStrike) return frameScore;
		}
	}

	return frameScore;
};

const checkSpare = (pins, j) => {
	return pins === 0 && j === 1 ? true : false;
};

const checkStrike = (pins, j) => {
	return pins === 0 && j === 0 ? true : false;
};

const shot = (max) => {
	return randInt(0, max);
};

main();
