import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Mic, MicOff, Volume2, MessageSquareText, AudioLines, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isPlaying?: boolean;
}

const AzaBotChat = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"text" | "voice">("text");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const quickActions = [
    { key: "azabot.q1", label: t("azabot.q1") },
    { key: "azabot.q2", label: t("azabot.q2") },
    { key: "azabot.q3", label: t("azabot.q3") },
    { key: "azabot.q4", label: t("azabot.q4") },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const chatMessages = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke("azabot-chat", {
        body: { messages: chatMessages },
      });

      if (error) throw error;

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || t("azabot.error"),
      };
      setMessages((prev) => [...prev, botMsg]);

      // Auto-play voice in voice tab
      if (activeTab === "voice") {
        playTTS(botMsg.content, botMsg.id);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: t("azabot.error") },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, activeTab, t]);

  const playTTS = async (text: string, msgId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setPlayingId(msgId);
    setIsSpeaking(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text, voiceId: "EXAVITQu4vr4xnSDxMaL" }),
        }
      );

      if (!response.ok) throw new Error("TTS failed");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPlayingId(null);
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err) {
      console.error("TTS error:", err);
      setPlayingId(null);
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t("azabot.noSpeech"));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "ar" ? "ar-SA" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      sendMessage(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/30">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "text"
              ? "text-amber-600 border-b-2 border-amber-500 bg-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquareText className="w-4 h-4" />
          {t("azabot.textTab")}
        </button>
        <button
          onClick={() => setActiveTab("voice")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "voice"
              ? "text-amber-600 border-b-2 border-amber-500 bg-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AudioLines className="w-4 h-4" />
          {t("azabot.voiceTab")}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center pt-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-3xl">
              💬
            </div>
            <h4 className="font-bold text-foreground mb-1">{t("azabot.welcome")} 👋</h4>
            <p className="text-sm text-muted-foreground mb-4">{t("azabot.welcomeSub")}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickActions.map((action) => (
                <button
                  key={action.key}
                  onClick={() => sendMessage(action.label)}
                  className="text-xs px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-amber-500 text-white rounded-ee-md"
                    : "bg-muted text-foreground rounded-es-md"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="flex items-start gap-2">
                    <div className="flex-1 prose prose-sm dark:prose-invert max-w-none [&>p]:m-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    <button
                      onClick={() => playTTS(msg.content, msg.id)}
                      className="shrink-0 mt-0.5 text-muted-foreground hover:text-amber-500 transition-colors"
                      title={t("azabot.listen")}
                    >
                      {playingId === msg.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-es-md px-4 py-3 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Mode Mic */}
      {activeTab === "voice" && (
        <div className="flex flex-col items-center gap-3 py-4 border-t border-border">
          <button
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-red-500 text-white animate-pulse-ring shadow-lg shadow-red-500/30"
                : "bg-amber-500 text-white hover:bg-amber-600 shadow-lg"
            }`}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>
          <p className="text-xs text-muted-foreground">
            {isListening ? t("azabot.listening") : isSpeaking ? t("azabot.speaking") : t("azabot.tapToSpeak")}
          </p>
        </div>
      )}

      {/* Text Input */}
      {activeTab === "text" && (
        <form onSubmit={handleSubmit} className="p-3 border-t border-border flex items-center gap-2">
          <button
            type="button"
            onClick={toggleListening}
            className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isListening ? "bg-red-500 text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("azabot.placeholder")}
            className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="shrink-0 w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Footer */}
      <div className="text-center py-1.5 text-[10px] text-muted-foreground border-t border-border">
        {t("azabot.powered")}
      </div>
    </div>
  );
};

export default AzaBotChat;
