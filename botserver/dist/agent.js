"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const agents_1 = require("@livekit/agents");
const deepgram = __importStar(require("@livekit/agents-plugin-deepgram"));
const silero = __importStar(require("@livekit/agents-plugin-silero"));
const OpenAI = __importStar(require("@livekit/agents-plugin-openai"));
// import { fileURLToPath } from 'node:url';
exports.default = (0, agents_1.defineAgent)({
    // prewarm: load VAD model once per process, not per session
    prewarm: async (proc) => {
        proc.userData.vad = await silero.VAD.load();
    },
    entry: async (ctx) => {
        await ctx.connect();
        // 1. Define the agent (instructions, tools, personality)
        const agent = new agents_1.voice.Agent({
            instructions: 'You are a helpful AI assistant in a video call. Reply only when you are addressed by your name',
        });
        // 2. Create the session (STT → LLM → TTS pipeline)
        const session = new agents_1.voice.AgentSession({
            vad: ctx.proc.userData.vad,
            stt: new deepgram.STT({
                model: 'nova-2-meeting',
                apiKey: process.env.DEEPGRAM_API_KEY,
            }),
            llm: new OpenAI.LLM({
                model: 'openai/gpt-oss-120b:free',
                apiKey: process.env.OPENAI_API_KEY,
                baseURL: "https://openrouter.ai/api/v1"
            }),
            tts: new deepgram.TTS({
                model: 'aura-2-thalia-en',
                apiKey: process.env.DEEPGRAM_API_KEY,
            }),
        });
        // 3. Start — connects session to the room
        await session.start({ agent, room: ctx.room });
        // 4. Kick off with a greeting
        await session.generateReply();
    },
});
agents_1.cli.runApp(new agents_1.WorkerOptions({ agent: __filename, agentName: "tom", }));
//# sourceMappingURL=agent.js.map