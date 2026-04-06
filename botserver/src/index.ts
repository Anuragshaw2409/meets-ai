import express, { Request, Response } from "express";
import cors from "cors";
import { AccessToken } from "livekit-server-sdk";
import { config } from "dotenv";
config();

const app = express();
app.use(cors());
app.use(express.json());

const LIVEKIT_URL = process.env.LIVEKIT_URL!;
const API_KEY = process.env.LIVEKIT_API_KEY!;
const API_SECRET = process.env.LIVEKIT_API_SECRET!;

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


import { AgentDispatchClient } from 'livekit-server-sdk';

const agentDispatch = new AgentDispatchClient(LIVEKIT_URL, API_KEY, API_SECRET);

// Store dispatch IDs per room (use DB/Redis in production)
const activeDispatches = new Map<string, string>();

app.post('/dispatch-agent', async (req: Request, res: Response) => {
    const { roomName } = req.body;

    if (!roomName) {
        return res.status(400).json({ error: 'roomName is required' });
    }

    const dispatch = await agentDispatch.createDispatch(roomName, 'tom');
    activeDispatches.set(roomName, dispatch.id); // persist this

    res.json({ success: true, dispatchId: dispatch.id });
});

app.post('/remove-agent', async (req: Request, res: Response) => {
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