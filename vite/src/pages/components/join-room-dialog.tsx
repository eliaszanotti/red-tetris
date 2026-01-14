import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function JoinRoomDialog() {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="outline" className="w-full h-24">
						Join Room
					</Button>
				}
			/>
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
					<DialogClose
						render={<Button variant="outline">Cancel</Button>}
					/>
					<Button type="submit">Join</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
