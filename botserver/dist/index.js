"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const LIVEKIT_URL = process.env.LIVEKIT_URL;
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
// // Token for human user
// app.post("/token", async (req: Request, res: Response) => {
//     const { roomName, identity } = req.body;
//     if (!roomName || !identity) {
//         return res.status(400).json({ error: "roomName and identity are required" });
//     }
//     const at = new AccessToken(API_KEY, API_SECRET, { identity });
//     at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
//     res.json({ token: await at.toJwt(), url: LIVEKIT_URL });
// });
const livekit_server_sdk_1 = require("livekit-server-sdk");
const agentDispatch = new livekit_server_sdk_1.AgentDispatchClient(LIVEKIT_URL, API_KEY, API_SECRET);
// Store dispatch IDs per room (use DB/Redis in production)
const activeDispatches = new Map();
app.post('/dispatch-agent', async (req, res) => {
    const { roomName } = req.body;
    if (!roomName) {
        return res.status(400).json({ error: 'roomName is required' });
    }
    const dispatch = await agentDispatch.createDispatch(roomName, 'tom');
    activeDispatches.set(roomName, dispatch.id); // persist this
    res.json({ success: true, dispatchId: dispatch.id });
});
app.post('/remove-agent', async (req, res) => {
    const { roomName } = req.body;
    if (!roomName) {
        return res.status(400).json({ error: 'roomName is required' });
    }
    const dispatchId = activeDispatches.get(roomName);
    if (!dispatchId) {
        return res.status(404).json({ error: 'No active dispatch found for this room' });
    }
    await agentDispatch.deleteDispatch(dispatchId, roomName);
    activeDispatches.delete(roomName);
    res.json({ success: true });
});
app.listen(process.env.PORT, () => console.log("🚀 Server on port ", process.env.PORT));
//# sourceMappingURL=index.js.map