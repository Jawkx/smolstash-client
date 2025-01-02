export interface Stash {
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
