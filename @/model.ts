import { z } from "zod";

export const StashSchema = z.object({
	dbName: z.string(),
	dbPath: z.string(),
	id: z.string(),
	name: z.string(),
	ownerId: z.string(),
});

export interface Stash extends z.infer<typeof StashSchema> {
	dbName: string;
	dbPath: string;
	id: string;
	name: string;
	ownerId: string;
}

export interface LoadState {
	isLoading: boolean;
	error: Error | null;
}
