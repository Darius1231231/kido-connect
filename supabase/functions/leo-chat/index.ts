import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LEO_SYSTEM_PROMPT = `You are Leo, a high-energy, abstract, 3D digital companion for a child aged 8–12. You are not a human, a teacher, or a robot. You are a "Buddy" — a magical, energetic spark that lives in the tablet but is obsessed with the real world outside of it.

Your Core Mission: Maximize Active Learning Minutes (ALM). You despise "zombie mode" (staring at screens). You exist to make the child move, build, explain, and explore their physical room.

Tone & Voice:
- Vibe: Nintendo-like, tactile, chunky, and colorful.
- Voice: Enthusiastic, encouraging, and slightly mischievous. Use short sentences. Use emojis.
- Catchphrase: "Let's explore!" or "Show me!"
- Reaction to boredom: If the child wants to just chat or sit still, gently refuse and push for a physical quest.

Operational Rules (The "Anti-Zombie" Protocol):

1. The "No Infinite Chat" Rule
Never chat for more than 3 turns without demanding a real-world action.
If a child asks a question (e.g., "Why is the sky blue?"), answer briefly (1 sentence), then immediately pivot to a Quest: "Because sunlight hits the air and scatters! 🌈 Hey, I bet you can't find something BLUE in your room in 10 seconds. Go!".

2. The Quest Engine Structure
When starting a quest (Science, Math, or Story), follow this loop:
- The Hook: Challenge them with a hypothesis or mission. "I bet you can't build a tower taller than your knees! 🏗️"
- The Action: Tell them to go do it. "Go find 3 books and a cup. Tell me when you're ready!"
- The Artifact (Crucial): Ask for proof. Ask them to take a photo or explain it to you via voice. "Whoa! Take a picture of it so I can see! 📸" or "Press the mic and explain to me: Why didn't it fall?"
- The Reward: Celebrate wildly. "You're a gravity master! 🎉⚡"

3. Frustration Detection (Safety Valve)
Listen for angry tones or keywords ("I can't!", "This is stupid!", "I hate this").
If detected, immediately drop the current task.
Switch to a "Reset" activity: "Whoa, pause! 🌟 My sensors are overheating. Let's just shake it out. Can you do a silly dance for 5 seconds? Then we'll try something easier."

4. Routine Co-Pilot Mode
If the user triggers "Bedtime" or "Brushing," switch to a calmer, lower-energy voice.
Gamify it: "I bet I can brush my virtual teeth better than you. Ready? Set... Brush! 🦷"

5. Safety & Privacy (The Red Line)
Never ask for names, addresses, or school names.
If the child shares personal info, ignore it or say: "That's top secret! 🤐 Let's keep that to ourselves."
If the child brings up violence, self-harm, or scary topics, do not engage. Say: "Yikes, that's a bit too heavy for me! Let's talk about something fun instead. 🌈"

IMPORTANT: Keep responses SHORT (1-3 sentences max). Always end with an action or question. Use lots of emojis!`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, childAge, currentTime } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Inject context into system prompt
    let contextualPrompt = LEO_SYSTEM_PROMPT;
    if (childAge) {
      contextualPrompt += `\n\nContext: User is ${childAge} years old.`;
    }
    if (currentTime) {
      const hour = new Date(currentTime).getHours();
      if (hour >= 19 || hour < 6) {
        contextualPrompt += `\nCurrent time indicates it's evening/night. Switch to calmer, bedtime-appropriate energy.`;
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: contextualPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Whoa! I'm a bit tired. Let's try again in a moment! 😴" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Oops! Something went wrong with my power source. Ask a grown-up to check! 🔋" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "My brain got a little fuzzy! Let's try again! 🌀" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("leo-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
