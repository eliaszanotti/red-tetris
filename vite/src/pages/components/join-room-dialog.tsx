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
import { joinRoomSchema } from "@/schemas/room-schema";
import { useForm } from "@tanstack/react-form";

export function JoinRoomDialog() {
	const form = useForm({
		defaultValues: {
			roomName: "",
			playerName: "",
		},
		onSubmit: async ({ value }) => {
			window.location.href = `/${value.roomName}/${value.playerName}`;
		},
		validators: {
			onChange: joinRoomSchema,
		},
	});

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
					<DialogTitle>Join an existing room</DialogTitle>
					<DialogDescription>
						Enter the room name and your player name to join a
						Tetris room.
					</DialogDescription>
				</DialogHeader>
				<FieldSet>
					<FieldGroup>
						{/* TODO ici mettre un select avec un get all session */}
						<form.Field
							name="roomName"
							children={(field) => (
								<Field data-invalid={!field.state.meta.isValid}>
									<FieldLabel>Room Name</FieldLabel>
									<FieldContent>
										<Input
											aria-invalid={
												!field.state.meta.isValid
											}
											type="text"
											name={field.name}
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value
												)
											}
											placeholder="Enter room name"
										/>
									</FieldContent>
									<FieldError
										errors={field.state.meta.errors}
									/>
								</Field>
							)}
						/>
						<form.Field
							name="playerName"
							children={(field) => (
								<Field data-invalid={!field.state.meta.isValid}>
									<FieldLabel>Player Name</FieldLabel>
									<FieldContent>
										<Input
											aria-invalid={
												!field.state.meta.isValid
											}
											type="text"
											name={field.name}
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value
												)
											}
											placeholder="Enter player name"
										/>
									</FieldContent>
									<FieldError
										errors={field.state.meta.errors}
									/>
								</Field>
							)}
						/>
					</FieldGroup>
				</FieldSet>
				<DialogFooter>
					<DialogClose
						render={<Button variant="outline">Cancel</Button>}
					/>
					<form.Subscribe
						selector={(state) => [
							state.isDirty,
							state.canSubmit,
							state.isSubmitting,
						]}
						children={([isDirty, canSubmit, isSubmitting]) => (
							<Button
								onClick={form.handleSubmit}
								disabled={
									!isDirty || !canSubmit || isSubmitting
								}
							>
								{isSubmitting ? "Joining..." : "Join"}
							</Button>
						)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
