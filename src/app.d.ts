declare global {
	interface Window {
		Twitch?: {
			ext: {
				onContext: (callback: (context: Record<string, unknown>) => void) => void;
				onAuthorized: (callback: (auth: { token: string }) => void) => void;
				onError: (callback: (error: unknown) => void) => void;
				viewer: {
					role: string;
				};
				configuration: {
					set: (segment: string, version: string, content: string) => void;
				};
			};
		};
	}
}

export {};
