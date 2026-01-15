import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRoomName } from "@/lib/generate-room-name";
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
import { createRoomSchema } from "@/schemas/room-schema";
import { useForm } from "@tanstack/react-form";
import { Dice3 } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

export function CreateRoomDialog() {
	const generatedRoomName = generateRoomName();

	const form = useForm({
		defaultValues: {
			roomName: generatedRoomName,
			playerName: "",
		},
		onSubmit: async ({ value }) => {
			window.location.href = `/${value.roomName}/${value.playerName}`;
		},
		validators: {
			onChange: createRoomSchema,
		},
	});

	return (
		<Dialog>
			<DialogTrigger
				render={<Button className="w-full h-24">Create Room</Button>}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new room</DialogTitle>
					<DialogDescription>
						Enter your player name to create your own Tetris room.
					</DialogDescription>
				</DialogHeader>
				<FieldSet>
					<FieldGroup>
						<form.Field
							name="roomName"
							children={(field) => (
								<Field data-invalid={!field.state.meta.isValid}>
									<FieldLabel>Room Name</FieldLabel>
									<FieldContent>
										<ButtonGroup className="w-full">
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
											/>
											<Button
												variant="outline"
												onClick={() => {
													const newName =
														generateRoomName();
													field.handleChange(newName);
												}}
											>
												<Dice3 />
											</Button>
										</ButtonGroup>
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
								{isSubmitting ? "Creating..." : "Create"}
							</Button>
						)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
