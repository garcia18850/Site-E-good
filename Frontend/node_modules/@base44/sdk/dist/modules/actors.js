import PartySocket from "partysocket";
// Heartbeat / half-open detection: PartySocket only reconnects on a close/error
// event, so ping periodically and force a reconnect if nothing returns in DEAD_MS.
const PING_MS = 1000;
const DEAD_MS = 3000;
/**
 * A live connection to an actor instance. Only obtainable from
 * {@link ActorRef.connect}, so `subscribe`/`send` are always valid — the socket
 * exists for this object's whole lifetime.
 */
class Connection {
    constructor(actorName, instanceId, config, options, onClose) {
        var _a;
        this.onClose = onClose;
        this.listeners = new Set();
        this.heartbeat = null;
        this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : crypto.randomUUID();
        const ws = new PartySocket({
            host: config.host,
            party: actorName,
            room: instanceId,
            id: this.id,
            // Re-read on every (re)connect so a login/logout is picked up.
            query: () => {
                const token = config.getAuthToken();
                return {
                    app_id: config.appId,
                    handler: actorName,
                    ...(token ? { token } : {}),
                    ...(config.functionsVersion ? { fv: config.functionsVersion } : {}),
                };
            },
        });
        this.ws = ws;
        let lastMsg = Date.now();
        const bumpAlive = () => { lastMsg = Date.now(); };
        ws.addEventListener("open", bumpAlive);
        ws.addEventListener("message", (ev) => {
            bumpAlive();
            let data;
            try {
                data = JSON.parse(ev.data);
            }
            catch (_a) {
                return;
            }
            const msgType = data && typeof data === "object" ? data.type : undefined;
            if (msgType === "__pong")
                return;
            for (const listener of this.listeners)
                listener(data);
        });
        this.heartbeat = setInterval(() => {
            if (Date.now() - lastMsg > DEAD_MS) {
                bumpAlive(); // avoid a reconnect storm while the new socket comes up
                ws.reconnect();
                return;
            }
            try {
                // The deployed shim echoes __ping → __pong (base44-userapp-bundler
                // shim/actor.ts); without that, an idle room reconnects every DEAD_MS.
                ws.send(JSON.stringify({ type: "__ping" }));
            }
            catch (_a) {
                // not open; the watchdog above will reconnect
            }
        }, PING_MS);
    }
    subscribe(callback) {
        this.listeners.add(callback);
        return {
            unsubscribe: () => { this.listeners.delete(callback); },
        };
    }
    send(data) {
        this.ws.send(JSON.stringify(data));
    }
    close() {
        if (this.heartbeat) {
            clearInterval(this.heartbeat);
            this.heartbeat = null;
        }
        this.listeners.clear();
        this.ws.close();
        this.onClose();
    }
}
/** Handle for one actor instance: `connect()` opens the socket (idempotent). */
function makeActorRef(actorName, instanceId, config, connections) {
    let conn = null;
    return {
        connect(options) {
            if (conn)
                return conn;
            const c = new Connection(actorName, instanceId, config, options, () => {
                connections.delete(c);
                if (conn === c)
                    conn = null; // allow a fresh connect() after close
            });
            conn = c;
            connections.add(c);
            return c;
        },
    };
}
/**
 * Absolute host for the actor WebSocket. PartySocket needs an absolute host and
 * can't resolve a relative/empty `serverUrl` (same-origin apps use a relative
 * `/api`, so `serverUrl` is often `""`), so fall back to the page origin.
 * PartySocket handles the scheme (https→wss, ws for localhost).
 */
export function resolveActorsHost(serverUrl, browserOrigin) {
    return serverUrl && !serverUrl.startsWith("/") ? serverUrl : browserOrigin !== null && browserOrigin !== void 0 ? browserOrigin : serverUrl;
}
export function createActorsModule(config) {
    // Live connections this client opened, so client.cleanup() can reclaim any the
    // app forgot to close() (each connection removes itself here on close).
    const connections = new Set();
    const module = new Proxy({}, {
        get(_, key) {
            // Symbols and `then` resolve to undefined (so the module isn't mistaken
            // for a thenable when awaited); any string key is an actor name.
            if (typeof key !== "string" || key === "then")
                return undefined;
            return (instanceId) => makeActorRef(key, instanceId, config, connections);
        },
    });
    return {
        module,
        closeAll: () => {
            for (const c of [...connections])
                c.close();
        },
    };
}
