import { PageLayout } from "@/components/page-layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CreateRoomDialog } from "./components/create-room-dialog";
import { JoinRoomDialog } from "./components/join-room-dialog";

export function HomePage() {
	return (
		<PageLayout>
			<div className="h-full flex items-center max-w-xl mx-auto">
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Play Tetris ?</CardTitle>
						<CardDescription>
							Find a room or create your own to play Tetris with
							friends!
						</CardDescription>
					</CardHeader>
					<CardContent className="grid grid-cols-2 gap-4">
						<CreateRoomDialog />
						<JoinRoomDialog />
					</CardContent>
				</Card>
			</div>
		</PageLayout>
	);
}
