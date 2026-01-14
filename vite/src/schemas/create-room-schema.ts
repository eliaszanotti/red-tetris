import { z } from "zod";

export const createRoomSchema = z.object({
	roomName: z.string().min(1, "Room name is required"),
	playerName: z
		.string()
		.min(2, "Player name must be at least 2 characters")
		.max(20, "Player name must be at most 20 characters")
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			"Only letters, numbers, underscore and hyphen are allowed",
		),
});

export type CreateRoomSchema = z.infer<typeof createRoomSchema>;
