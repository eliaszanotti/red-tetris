const adjectives = [
	"Red",
	"Blue",
	"Green",
	"Golden",
	"Dark",
	"Cosmic",
	"Neon",
	"Pixel",
];

const nouns = [
	"Tetris",
	"Pelicans",
	"Blocks",
	"Racers",
	"Warriors",
	"Legends",
	"Masters",
	"Heroes",
];

export function generateRoomName(): string {
	const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	const number = Math.floor(Math.random() * 1000);
	return `${adj}${noun}${number}`;
}
