'use client';

import { useState, useEffect, useRef } from "react"
// Replaced external UI imports with standard HTML/Tailwind
import { X, MessageCircle, Mic, Loader2, Send, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
// Assuming these imports work in your actual project:
// import { useTranslation } from "@/hooks/use-translation" 

interface User {
  name?: string
  [key: string]: any
}

interface AstronautMascotProps {
  user: User
}

interface ChatMessage {
    from: 'user' | 'bot';
    text: string;
}

// --- GEMINI API CONFIGURATION (NOW USING THE PROVIDED KEY) ---
const realGeminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';
const apiKey = "AIzaSyDZYTpAJpl7KAPj47AwK5oaBxYhrV8M0ss"; 
// IMPORTANT: The key is now included here to ensure the API call works!

// --- GEMINI API HANDLER (Now handles conversation context and real API structure) ---
const callRealGeminiApi = async (
    // Pass the full conversation history for context
    history: ChatMessage[], 
    query: string,
    userName: string,
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    // 1. Add current user query to history state immediately
    setMessages(prev => [...prev, { from: 'user', text: query }]);
    setIsLoading(true);

    // 2. Format history for Gemini API payload
    // Filter out the initial greeting to keep the context clean if needed, 
    // but typically we pass all messages except the one just added.
    const contents = history.map(msg => ({
        role: msg.from === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));
    // Add the current query to the contents array as the final user input
    contents.push({ role: 'user', parts: [{ text: query }] }); 

    const systemPrompt = `You are Astro, the AI Space Guide for the Tatva learning platform. Address the user as 'Captain ${userName}'. Keep answers concise (max 4-5 sentences), encouraging, and strictly related to Math, Science, or space knowledge. Translate technical terms into simple Hindi when appropriate for rural students.`;

    const payload = {
        contents: contents, // Sending the entire conversation history
        tools: [{ "google_search": {} }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    // 3. API Call with Exponential Backoff
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            // The API key is now appended to the URL
            const response = await fetch(realGeminiApiUrl + `?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // If response is not 200, throw error to trigger retry
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, Captain. I could not generate an answer right now.';

            // Add model response
            setMessages(prev => [...prev, { from: 'bot', text: responseText }]);
            setIsLoading(false);
            return; // Success
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed (Real API):`, error);
            if (attempt === 2) {
                // Final failure message if all retries fail
                setMessages(prev => [...prev, { from: 'bot', text: 'I apologize, Captain. I am currently experiencing an atmospheric disturbance and cannot connect. Please try again later.' }]);
                setIsLoading(false);
            }
            // Wait before retrying (Exponential Backoff)
            await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2, attempt)));
        }
    }
};

export function AstronautMascot({ user }: AstronautMascotProps) {
  // Mock translation hooks since actual hook is missing
  const t = (key: string) => {
      const texts: { [key: string]: string } = {
          astronautKing: "Astro, The AI Guide",
          yourSpaceGuide: "Your Space Guide",
          "Say 'Hi' to Astraunaut King": "Type your question or tap the mic...",
          send: "Send",
          micError: "Mic Error: Voice input is not supported in this browser.",
          micPerms: "Microphone error. Please check permissions.",
          micListening: "Listening... Speak now!"
      };
      return texts[key] || key;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Scroll to the latest message whenever messages update
  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initial Greeting & Event Listener remains the same (modified to use new state structure)
  useEffect(() => {
    const userName = user?.name || "Explorer";

    // Initial greeting - run only if messages are empty
    if (messages.length === 0 && isOpen) {
        const greetingList = [
          `Hey Captain ${userName}! Ready for a galaxy adventure? 🚀`,
          `Welcome back, Space Explorer ${userName}! 🌌`,
          `Let's conquer some planets today, ${userName}! 🪐`,
          `Time for an adventure, Captain ${userName}! ✨`
        ];
        const randomGreeting = greetingList[Math.floor(Math.random() * greetingList.length)];
        setMessages([{ from: "bot", text: randomGreeting }]);
    }

    // Listen for "openMascot" event
    const handleOpen = () => {
      setIsOpen(true)
      // Log for debugging: console.log('Mascot opened via event');
    }
    window.addEventListener("openMascot", handleOpen)
    return () => window.removeEventListener("openMascot", handleOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name, isOpen]);


  // --- VOICE INPUT (Web Speech API) ---

  const startListening = () => {
    if (isLoading) return;

    if (!('webkitSpeechRecognition' in window)) {
        setMicError(t("micError"));
        return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-IN'; 

    recognitionRef.current.onstart = () => {
        setIsListening(true);
        setMicError(null);
    };

    recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript); 
        stopListening();
        if (transcript.trim()) {
            handleSend(null, transcript.trim()); // Send the transcribed text
        }
    };

    recognitionRef.current.onerror = (event: any) => {
        setMicError(t("micPerms"));
        setIsListening(false);
    };

    recognitionRef.current.onend = () => {
        setIsListening(false);
    };

    try {
        recognitionRef.current.start();
    } catch (e) {
        console.error("Speech recognition start failed:", e);
        setMicError(t("micPerms"));
        setIsListening(false);
    }
  };

  const stopListening = () => {
      if (recognitionRef.current) {
          recognitionRef.current.stop();
      }
      setIsListening(false);
  };


  // HANDLE SEND (Updated to use the Gemini API handler)
  const handleSend = (e: React.FormEvent<HTMLFormElement> | null, voiceInput?: string) => {
    if (e) e.preventDefault(); 
    
    const query = voiceInput || inputText.trim();
    if (!query || isLoading || isListening) return;

    // Call the real Gemini API function, passing the history
    callRealGeminiApi(messages, query, user?.name || "Explorer", setMessages, setIsLoading);

    // Clear input after sending
    setInputText("");
  }


  return (
    <>
      {/* Floating Mascot Button (Positioned higher to avoid bottom nav bar) */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          // Key change: bottom-24 lifts it above the mobile navigation bar
          "fixed bottom-24 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-500",
          "hover:from-indigo-500 hover:to-purple-400 shadow-xl animate-float z-40",
          "border-2 border-white/50"
        )}
        aria-label="Open Astronaut Chatbot"
      >
        <div className="text-3xl text-white" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
          👨‍🚀
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-4 z-50 sm:items-center sm:justify-center">
          {/* Chat Card (Replaced Card) */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border-2 border-indigo-200/50">
            {/* Card Content (Replaced CardContent) */}
            <div className="p-4"> 
              <div className="flex items-start justify-between mb-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-400 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xl">👨‍🚀</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{t("astronautKing")}</h3>
                    <p className="text-xs text-gray-500">{t("yourSpaceGuide")}</p>
                  </div>
                </div>
                {/* Close Button (Replaced Button) */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition duration-150"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages Area */}
              <div className="space-y-4 h-64 overflow-y-auto mb-4 p-1 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
                        <Zap className="h-8 w-8 text-indigo-400 mb-2" />
                        <p className="text-sm">Ask me about your missions or school subjects!</p>
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.from === "user" ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] p-3 rounded-xl shadow-sm border ${
                            msg.from === "user" 
                                ? 'bg-indigo-500 text-white rounded-br-none' 
                                : 'bg-gray-100 text-gray-800 rounded-tl-none border-gray-200'
                        }`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {(isLoading) && (
                    <div className="flex justify-start">
                        <div className="max-w-[90%] p-3 rounded-xl bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200 flex items-center gap-2">
                             <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                             <p className="text-sm italic">Astro is navigating the galaxy for an answer...</p>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="flex gap-2 items-center">
                
                {/* Voice Input Button */}
                <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isLoading}
                    className={`p-3 rounded-full shadow-md transition duration-150 flex-shrink-0 ${
                        isListening
                            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    } disabled:opacity-50`}
                    aria-label={isListening ? "Stop listening" : "Start voice input"}
                >
                    {isListening ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Mic className="h-5 w-5" />
                    )}
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? t("micListening") : t("Say 'Hi' to Astraunaut King")}
                  className={`flex-1 border rounded-xl px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition ${isListening || isLoading ? 'bg-gray-100' : 'bg-white'}`}
                  disabled={isListening || isLoading}
                />
                
                {/* Text Send Button (Replaced Button) */}
                <button
                  type="submit"
                  disabled={isLoading || isListening || !inputText.trim()}
                  className="bg-green-500 hover:bg-green-600 text-white shadow-md transition disabled:opacity-50 flex-shrink-0 px-4 py-2.5 rounded-xl"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              
              {/* Error Message */}
              {micError && (
                  <p className="text-sm text-red-500 mt-2 font-medium flex items-center gap-1">
                      <Zap className="h-4 w-4" /> {micError}
                  </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
