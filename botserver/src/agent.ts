import {
    defineAgent,
    type JobContext,
    type JobProcess,
    WorkerOptions,
    cli,
    voice,
} from '@livekit/agents';
import * as deepgram from '@livekit/agents-plugin-deepgram';
import * as silero from '@livekit/agents-plugin-silero';
import * as OpenAI from '@livekit/agents-plugin-openai';
import { config } from 'dotenv';
config();
// import { fileURLToPath } from 'node:url';

export default defineAgent({
    // prewarm: load VAD model once per process, not per session
    prewarm: async (proc: JobProcess) => {
        proc.userData.vad = await silero.VAD.load();
    },

    entry: async (ctx: JobContext) => {
        await ctx.connect();

        // 1. Define the agent (instructions, tools, personality)
        const agent = new voice.Agent({
            instructions: 'You are a helpful AI assistant in a video call. Reply only when you are addressed by your name',
        });

        // 2. Create the session (STT → LLM → TTS pipeline)
        const session = new voice.AgentSession({
            vad: (ctx.proc.userData.vad as silero.VAD),
            stt: new deepgram.STT({
                model: 'nova-2-meeting',
                apiKey: process.env.DEEPGRAM_API_KEY!,
            }),
            llm: new OpenAI.LLM({
                model: 'openai/gpt-oss-20b:free',
                apiKey: process.env.OPENAI_API_KEY!,
                baseURL: "https://openrouter.ai/api/v1"
            }),
            tts: new deepgram.TTS({
                model: 'aura-2-thalia-en',
                apiKey: process.env.DEEPGRAM_API_KEY!,
            }),
        });

        // 3. Start — connects session to the room
        await session.start({ agent, room: ctx.room, });

        // 4. Kick off with a greeting
        await session.generateReply();
    },
});

cli.runApp(new WorkerOptions({ agent: __filename, agentName: "tom", }));