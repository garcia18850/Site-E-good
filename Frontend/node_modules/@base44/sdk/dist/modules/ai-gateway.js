import { getAccessToken } from "../utils/auth-utils.js";
export function createAiGatewayModule({ serverUrl, token, appId, }) {
    const connection = () => {
        var _a;
        return ({
            baseURL: `${serverUrl}/api/apps/${appId}/ai/openai/v1`,
            token: (_a = token !== null && token !== void 0 ? token : getAccessToken()) !== null && _a !== void 0 ? _a : "",
        });
    };
    return {
        connection,
    };
}
