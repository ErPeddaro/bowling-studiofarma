let frames = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];
const FRAMESNUMBER = 10;

let score = 0;
let isStrike = false;
let isSpare = false;

let test = "isStrike && j == 1"

const main = () => {
	for (let i = 0; i < FRAMESNUMBER; i++) {
		let pins = 10;
		let frameScore = 0;

		frameLoop: for (let j = 0; j < 2; j++) {
			let deliveryScore = delivery(pins);
			deliveryScore = 10;

			pins -= deliveryScore;
			frames[i][j] = deliveryScore;
			frameScore += deliveryScore;

			console.log(isStrike, j);

			switch (true) {
				case isSpare && j == 0:
					frames[i - 1][2] = frameScore;
					score += frameScore;

					isSpare = false;
					break;

				case eval(test):
					frames[i - 1][2] = frameScore;
					score += frameScore;

					isStrike = false;
					break;

				case pins === 0 && j === 1:
					isSpare = true;

					break frameLoop;

				case pins === 0 && j === 0 && isStrike === true:
					frames[i - 1][2] = frameScore;
					score += frameScore;

					break frameLoop;

				case pins === 0 && j === 0:
					isStrike = true;

					break frameLoop;

				default:
					break;
			}
		}
		score += frameScore;
	}
	console.log(frames);
	console.log(score);

	return;
};

const randInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const delivery = (max) => {
	return randInt(0, max);
};

main();
