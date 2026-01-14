import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";

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

function CreateRoomDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create Room</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new room</DialogTitle>
					<DialogDescription>
						Enter a room name to create your own Tetris room.
					</DialogDescription>
				</DialogHeader>
				<FieldSet>
					<FieldGroup>
						<Field>
							<FieldLabel>Room Name</FieldLabel>
							<FieldContent>
								<Input
									type="text"
									name="roomName"
									placeholder="Enter room name"
									className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								/>
							</FieldContent>
							<FieldError />
						</Field>
					</FieldGroup>
				</FieldSet>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit">Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function JoinRoomDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">Join Room</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Join a room</DialogTitle>
					<DialogDescription>
						Enter a room code or name to join an existing Tetris
						room.
					</DialogDescription>
				</DialogHeader>
				<FieldSet>
					<FieldGroup>
						<Field>
							<FieldLabel>Room Code</FieldLabel>
							<FieldContent>
								<Input
									type="text"
									name="roomCode"
									placeholder="Enter room code"
									className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								/>
							</FieldContent>
							<FieldError />
						</Field>
					</FieldGroup>
				</FieldSet>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit">Join</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
