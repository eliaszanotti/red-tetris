export const Connecting = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900">
			<div className="flex flex-col items-center gap-4">
				<div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
				<p className="text-white text-lg">Connecting to server...</p>
			</div>
		</div>
	);
};
