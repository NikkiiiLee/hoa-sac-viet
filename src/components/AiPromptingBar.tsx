import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, Send, Loader2 } from 'lucide-react';
import { QUICK_PROMPTS, PLACEHOLDER_PROMPTS } from '../services/aiStylistBrain';

interface AiPromptingBarProps {
  onConsultGemini: (promptText: string) => void;
  isLoading: boolean;
  loadingStepText: string;
}

// Type declaration for browser Web Speech API
interface IWindowSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

export const AiPromptingBar: React.FC<AiPromptingBarProps> = ({
  onConsultGemini,
  isLoading,
  loadingStepText,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Hook tạo hiệu ứng Typewriter tự động gõ và xóa chữ luân phiên
  const [placeholderText, setPlaceholderText] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const recognitionRef = useRef<IWindowSpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter Effect
  useEffect(() => {
    // Nếu người dùng đã nhập văn bản thì không cần gõ placeholder
    if (inputText.length > 0) return;

    const currentFullText = PLACEHOLDER_PROMPTS[promptIndex];
    const typingSpeed = isDeleting ? 30 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholderText(currentFullText.substring(0, placeholderText.length + 1));
        if (placeholderText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2200); // Dừng lại 2.2s để người dùng kịp đọc
        }
      } else {
        setPlaceholderText(currentFullText.substring(0, placeholderText.length - 1));
        if (placeholderText === '') {
          setIsDeleting(false);
          setPromptIndex((prev) => (prev + 1) % PLACEHOLDER_PROMPTS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, promptIndex, inputText]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition: IWindowSpeechRecognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'vi-VN';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInputText(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Vui lòng cho phép quyền Microphone trên trình duyệt.');
        } else if (event.error === 'no-speech') {
          setSpeechError('Không nhận được giọng nói. Vui lòng thử lại.');
        } else {
          setSpeechError(`Lỗi mic (${event.error}). Vui lòng nhập văn bản.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!speechSupported) {
      alert('Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Bạn có thể gõ trực tiếp câu lệnh vào ô tìm kiếm!');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current?.start();
      } catch {
        recognitionRef.current?.stop();
        setTimeout(() => recognitionRef.current?.start(), 150);
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const promptToSend = inputText.trim() || PLACEHOLDER_PROMPTS[promptIndex];
    if (!promptToSend || isLoading) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    if (!inputText.trim()) {
      setInputText(promptToSend);
    }

    onConsultGemini(promptToSend);
  };

  const handleChipClick = (fullPrompt: string) => {
    setInputText(fullPrompt);
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    // Tự động kích hoạt ngay tiến trình tham vấn Gemini
    onConsultGemini(fullPrompt);
  };

  return (
    <div className="w-full relative z-20 space-y-2.5">
      {/* GLOWING GRADIENT BORDER CONTAINER */}
      <div className="p-0.5 rounded-3xl bg-gradient-to-r from-amber-500/40 via-[#7C3AED]/40 to-amber-500/40 shadow-lg shadow-amber-900/5 ring-1 ring-amber-400/30 transition-all duration-300 hover:ring-amber-400/60">
        <div className="bg-white/95 backdrop-blur-md rounded-[22px] p-2 sm:p-2.5 flex flex-col gap-2">
          {/* Main Input Strip */}
          <form onSubmit={handleSubmit} className="flex items-center gap-1.5 sm:gap-2">
            {/* AI Avatar Sparkle Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#1B3B6F] via-[#7C3AED] to-[#D4AF37] text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
            </div>

            {/* Input Field with Typewriter Placeholder */}
            <div className="flex-1 relative flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={placeholderText || PLACEHOLDER_PROMPTS[promptIndex]}
                disabled={isLoading}
                className="w-full px-3 py-2 text-xs sm:text-sm font-medium text-[#2C241D] bg-transparent focus:outline-hidden placeholder:text-[#8C8274] placeholder:font-normal"
              />
              {inputText && (
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="p-1 text-[#8C8274] hover:text-[#2C241D] text-xs cursor-pointer mr-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Microphone Voice Assistant Button */}
            <button
              type="button"
              onClick={toggleListening}
              disabled={isLoading}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-500/60 shadow-md animate-pulse'
                  : 'bg-[#FAF7F2] text-[#5C5346] hover:bg-[#EDE7DC] hover:text-[#2C241D] border border-black/5'
              }`}
              title={
                speechSupported
                  ? isListening
                    ? 'Đang nghe tiếng Việt... Bấm để dừng'
                    : 'Bấm để nói bằng giọng nói tiếng Việt'
                  : 'Trình duyệt không hỗ trợ Web Speech'
              }
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 text-rose-600 animate-bounce" />
                  <span className="hidden md:inline font-bold text-rose-700">Đang nghe...</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-[#B83227]" />
                  <span className="hidden md:inline">Giọng nói</span>
                </>
              )}
            </button>

            {/* Submit Consultation Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#B83227] via-[#8A1C14] to-[#1B3B6F] hover:brightness-110 active:scale-95 shadow-md shadow-red-950/20 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                  <span className="hidden sm:inline">Đang Phân Tích...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">Tham Vấn Gemini</span>
                  <Send className="w-3.5 h-3.5 sm:hidden" />
                </>
              )}
            </button>
          </form>

          {/* Voice status error banner if mic failed */}
          {speechError && (
            <div className="px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-800 flex items-center justify-between">
              <span>⚠️ {speechError}</span>
              <button
                onClick={() => setSpeechError(null)}
                className="text-rose-500 hover:text-rose-800 font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* MULTI-STAGE LOADING RADAR SCANNER */}
          {isLoading && (
            <div className="pt-1.5 pb-1 border-t border-[#EDE7DC] space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs text-[#7C3AED] font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-ping" />
                  {loadingStepText || 'Gemini đang phân tích bối cảnh...'}
                </span>
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
                  AI Di Sản 4.0
                </span>
              </div>
              <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-amber-400 via-[#7C3AED] to-emerald-500 rounded-full w-2/3 animate-pulse transition-all duration-300" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QUICK PROMPT CHIPS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-[#7A6E5F] uppercase tracking-wider flex items-center gap-1 pl-1 shrink-0">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Gợi ý:</span>
        </span>

        {QUICK_PROMPTS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => handleChipClick(chip.fullPrompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-white/95 hover:bg-amber-50/80 text-[#4A4036] hover:text-[#B83227] border border-[#D6CEBE]/90 hover:border-amber-400 shadow-2xs transition-all shrink-0 flex items-center gap-1.5 cursor-pointer group active:scale-95 disabled:opacity-50"
            title={`Bấm 1-chạm để tự động phối: "${chip.fullPrompt}"`}
          >
            <span>{chip.icon}</span>
            <span className="whitespace-nowrap font-medium text-[11.5px] group-hover:text-[#B83227] transition-colors">
              {chip.label}
            </span>
            <Sparkles className="w-3 h-3 text-[#B83227] group-hover:text-amber-500 transition-transform group-hover:scale-110 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
