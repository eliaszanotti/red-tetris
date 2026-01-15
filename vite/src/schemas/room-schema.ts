import { z } from "zod";

const roomNameSchema = z
	.string()
	.min(1, "Room name is required")
	.max(20, "Room name must be at most 20 characters")
	.regex(
		/^[a-zA-Z0-9_-]+$/,
		"Only letters, numbers, underscore and hyphen are allowed"
	);

const playerNameSchema = z
	.string()
	.min(2, "Player name must be at least 2 characters")
	.max(20, "Player name must be at most 20 characters")
	.regex(
		/^[a-zA-Z0-9_-]+$/,
		"Only letters, numbers, underscore and hyphen are allowed"
	);

const baseRoomSchema = z.object({
	roomName: roomNameSchema,
	playerName: playerNameSchema,
});

export const createRoomSchema = baseRoomSchema.pick({
	roomName: true,
	playerName: true,
});

export type CreateRoomSchema = z.infer<typeof createRoomSchema>;

export const joinRoomSchema = baseRoomSchema.pick({
	roomName: true,
	playerName: true,
});

export type JoinRoomSchema = z.infer<typeof joinRoomSchema>;
