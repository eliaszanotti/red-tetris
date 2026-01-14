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

export function CreateRoomDialog() {
	return (
		<Dialog>
			<DialogTrigger
				render={<Button className="w-full h-24">Create Room</Button>}
			/>
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
					<DialogClose
						render={<Button variant="outline">Cancel</Button>}
					/>
					<Button type="submit">Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
