type Player = any;

type PlayerListProps = {
	players: Player[];
	currentPlayerName: string;
	hostId: string;
};

export const PlayerList = ({
	players,
	currentPlayerName,
	hostId,
}: PlayerListProps) => {
	if (players.length === 0) {
		return <p className="text-gray-500">No players yet...</p>;
	}

	return (
		<ul className="space-y-2">
			{players.map((player: any) => (
				<li
					key={player.id}
					className={`p-3 rounded-lg ${
						player.name === currentPlayerName
							? "bg-red-600"
							: "bg-gray-700"
					} flex items-center gap-3`}
				>
					<div className="w-3 h-3 rounded-full bg-green-400" />
					<span className="font-medium">{player.name}</span>
					{player.id === hostId && (
						<span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">
							HOST
						</span>
					)}
				</li>
			))}
		</ul>
	);
};
