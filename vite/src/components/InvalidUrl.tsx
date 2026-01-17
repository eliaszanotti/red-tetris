type InvalidUrlProps = {
	room: string;
	playerName: string;
};

export const InvalidUrl = ({ room, playerName }: InvalidUrlProps) => {
	if (room && playerName) return null;

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
			<p className="text-red-400">Invalid URL. Use: /:room/:playerName</p>
		</div>
	);
};
