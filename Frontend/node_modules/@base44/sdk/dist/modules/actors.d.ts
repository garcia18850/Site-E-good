import type { ActorRef } from "./actors.types.js";
interface ActorsConfig {
    appId: string;
    /** Current user access token, if authenticated. Rides the WS query so the
     * platform proxy can authenticate the connection; anonymous connects omit it. */
    getAuthToken(): string | null | undefined;
    /** Same semantics as function calls: editors with a non-prod version get the
     * draft actor script; everyone else gets the published one. */
    functionsVersion?: string;
    /** Absolute host PartySocket dials (it strips the scheme and connects wss, ws
     * for localhost). Resolved by {@link resolveActorsHost}. */
    host: string;
}
/**
 * Absolute host for the actor WebSocket. PartySocket needs an absolute host and
 * can't resolve a relative/empty `serverUrl` (same-origin apps use a relative
 * `/api`, so `serverUrl` is often `""`), so fall back to the page origin.
 * PartySocket handles the scheme (https→wss, ws for localhost).
 */
export declare function resolveActorsHost(serverUrl: string, browserOrigin?: string): string;
export declare function createActorsModule(config: ActorsConfig): {
    module: Record<string, (instanceId: string) => ActorRef>;
    closeAll: () => void;
};
export {};
