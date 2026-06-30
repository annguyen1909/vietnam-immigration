'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiX, FiSend, FiPaperclip, FiSettings } from 'react-icons/fi';
import Pusher from 'pusher-js';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SITE_ID = 'vietnam-local-site-2';

interface ChatAttachment {
  id: string;
  filename: string;
  type?: string;
  size?: number;
}

interface Message {
  id: string;
  sessionId: string;
  senderType: 'visitor' | 'agent' | 'system';
  senderId: string | null;
  content: string;
  type: 'user' | 'system';
  sentAt: string;
  attachments: string | ChatAttachment[] | null;
  senderName?: string;
  deliveredAt?: string;
  readAt?: string;
}

interface TypingUser {
  senderId: string;
  senderName: string;
  senderType: 'visitor' | 'agent';
  timestamp: Date;
}

// Get BudPal API base URL from env
const BASE_BUDPAL_API = process.env.NEXT_PUBLIC_BASE_BUDPAL_API || '';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [typingUsers, setTypingUsers] = useState<{ [key: string]: TypingUser }>({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    analytics: true,
    marketing: false,
  });
  const [showAgentImage, setShowAgentImage] = useState(true);
  const pathname = usePathname();

  // Check if user has already made cookie choice
  useEffect(() => {
    const hasCookieChoice = localStorage.getItem('cookieChoice');
    if (!hasCookieChoice) {
      setShowCookieBanner(true);
    }
  }, []);

  // Check if we should show agent image or 24/7 support bubble based on current page
  useEffect(() => {
    const hideAgentPages = ['/apply', '/contact', '/applications', '/embassy'];
    const hideAgentPatterns = ['/faq/', '/check-requirement/', '/profile/'];

    const shouldHideAgent =
      hideAgentPages.includes(pathname) ||
      hideAgentPatterns.some((pattern) => pathname.startsWith(pattern));

    setShowAgentImage(!shouldHideAgent);
  }, [pathname]);

  const handleCookieAccept = (acceptAll: boolean = false) => {
    if (acceptAll) {
      setCookiePreferences({ analytics: true, marketing: true });
    }
    localStorage.setItem(
      'cookieChoice',
      JSON.stringify({
        analytics: cookiePreferences.analytics,
        marketing: cookiePreferences.marketing,
        timestamp: new Date().toISOString(),
      })
    );
    setShowCookieBanner(false);
  };

  const handleCookieReject = () => {
    localStorage.setItem(
      'cookieChoice',
      JSON.stringify({
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setShowCookieBanner(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  // Send typing event to server
  const sendTypingEvent = async (isTyping: boolean) => {
    if (!sessionId) return;

    try {
      await fetch(`${BASE_BUDPAL_API}/api/chat/typing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          sessionId,
          senderType: 'visitor',
          senderId: email.trim(),
          senderName: name.trim(),
          isTyping,
        }),
      });
    } catch (error) {
      console.error('Failed to send typing event:', error);
    }
  };

  // Handle typing with debounce
  const handleTyping = () => {
    if (!isTyping && newMessage.trim()) {
      setIsTyping(true);
      sendTypingEvent(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        sendTypingEvent(false);
      }
    }, 2000); // Stop typing indicator after 2 seconds
  };

  // Initialize Pusher
  useEffect(() => {
    if (sessionId) {
      // Initialize Pusher with actual credentials from environment
      const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      });

      // Subscribe to the session channel
      const sessionChannel = pusherInstance.subscribe(`chat-session-${sessionId}`);

      // Listen for new messages
      sessionChannel.bind('message', (data: Message) => {
        console.log('Received real-time message:', data);
        setMessages((prev) => {
          // Check if this is a message we sent (optimistic message)
          const optimisticMessage = prev.find(
            (msg) =>
              msg.id.startsWith('temp-') &&
              msg.content === data.content &&
              msg.senderType === data.senderType &&
              msg.senderId === data.senderId
          );

          if (optimisticMessage) {
            console.log('Replacing optimistic message with real message:', data.id);
            // Replace the optimistic message with the real one
            return prev.map((msg) => (msg.id === optimisticMessage.id ? data : msg));
          }

          // Check if message already exists to prevent duplicates
          const messageExists = prev.some((msg) => msg.id === data.id);
          if (messageExists) {
            console.log('Message already exists, skipping duplicate:', data.id);
            return prev;
          }

          // Add new message
          return [...prev, data];
        });
      });

      // Listen for typing events
      sessionChannel.bind('typing', (data: TypingUser) => {
        console.log('Typing event received:', data);
        // Don't show for our own typing
        if (data.senderId === email.trim()) return;

        setTypingUsers((prev) => ({
          ...prev,
          [data.senderId]: {
            ...data,
            timestamp: new Date(),
          },
        }));
      });

      // Listen for stop typing events
      sessionChannel.bind('stop-typing', (data: TypingUser) => {
        console.log('Stop typing event received:', data);
        // Don't handle our own stop typing
        if (data.senderId === email.trim()) return;

        setTypingUsers((prev) => {
          const newTypingUsers = { ...prev };
          delete newTypingUsers[data.senderId];
          return newTypingUsers;
        });
      });

      // Listen for message delivery status
      sessionChannel.bind('delivered', (data: { messageId: string }) => {
        console.log('Message delivered:', data);
        // You can update message delivery status here
      });

      // Listen for message read status
      sessionChannel.bind('read', (data: { messageId: string }) => {
        console.log('Message read:', data);
        // You can update message read status here
      });

      // Cleanup function
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        sessionChannel.unbind_all();
        pusherInstance.unsubscribe(`chat-session-${sessionId}`);
        pusherInstance.disconnect();
      };
    }
  }, [sessionId, email]);

  // Fetch messages for a session
  const fetchMessages = async (sessionId: string) => {
    try {
      console.log('Fetching messages for session:', sessionId);
      const res = await fetch(`${BASE_BUDPAL_API}/api/chat/session/${sessionId}/messages`, {
        headers: {
          'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
        },
      });
      console.log('Fetch messages response status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Fetch messages error response:', errorText);
        throw new Error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await res.text();
        console.error('Non-JSON response:', responseText);
        throw new Error('Server returned non-JSON response');
      }

      const data = await res.json();
      console.log('Fetched messages:', data);
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again.');
    }
  };

  // Start chat session
  const handleStartChat = async () => {
    // Validate required fields
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required to start a chat.');
      return;
    }

    setLoading(true);
    setError('');
    const visitorName = name.trim();
    const visitorEmail = email.trim();
    const visitorId = visitorEmail;

    console.log('Starting chat session with:', { siteId: SITE_ID, visitorId, visitorName });

    try {
      const res = await fetch(`${BASE_BUDPAL_API}/api/chat/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
        },
        body: JSON.stringify({
          siteId: SITE_ID,
          visitorId,
          visitorName,
        }),
      });

      console.log('Start session response status:', res.status);
      console.log('Start session headers:', Object.fromEntries(res.headers.entries()));

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Start session error response:', errorText);
        throw new Error(`Failed to start chat session: ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get('content-type');
      console.log('Response content-type:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await res.text();
        console.error('Non-JSON response:', responseText);
        throw new Error('Server returned non-JSON response');
      }

      const data = await res.json();
      console.log('Session created:', data);
      setSessionId(data.id);
      // Fetch initial messages
      await fetchMessages(data.id);
    } catch (err) {
      console.error('Error starting chat session:', err);
      setError('Could not start chat. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection and upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${BASE_BUDPAL_API}/api/chat/attachment/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload file');
      const data = await res.json();
      setAttachments((prev) => [...prev, data]);
    } catch (err) {
      setError('Failed to upload file.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Helper: get file icon by type
  const getFileIcon = (type: string, color: string = 'var(--brand-primary-light)') => {
    if (type.includes('pdf'))
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
            stroke={color}
            strokeWidth="2"
          />
          <path d="M13 2v6h6" stroke={color} strokeWidth="2" />
        </svg>
      );
    if (type.includes('image'))
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
          <circle cx="8.5" cy="8.5" r="1.5" fill={color} />
          <path d="M21 15l-5-5-4 4-7 7" stroke={color} strokeWidth="2" />
        </svg>
      );
    if (type.includes('word'))
      return (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
          <text x="7" y="16" fontSize="8" fill={color}>
            DOC
          </text>
        </svg>
      );
    return (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
        <path d="M7 7h10v10H7z" fill={color} />
      </svg>
    );
  };

  // Helper: parse attachments from various formats
  const isChatAttachment = (value: unknown): value is ChatAttachment => {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Partial<ChatAttachment>;
    return typeof candidate.id === 'string' && typeof candidate.filename === 'string';
  };

  const parseAttachments = (attachments: unknown): ChatAttachment[] => {
    if (!attachments) return [];

    console.log('DEBUG attachments raw:', attachments);

    // If it's already an array of objects, return as is
    if (
      Array.isArray(attachments) &&
      attachments.length > 0 &&
      typeof attachments[0] === 'object'
    ) {
      console.log('DEBUG attachments: array of objects');
      return attachments.filter(isChatAttachment);
    }

    // If it's a string, try to parse it
    if (typeof attachments === 'string') {
      try {
        const parsed = JSON.parse(attachments);
        console.log('DEBUG attachments: parsed from string:', parsed);
        return Array.isArray(parsed) ? parsed.filter(isChatAttachment) : [];
      } catch (err) {
        console.error('DEBUG attachments: failed to parse string:', err);
        return [];
      }
    }

    // If it's an array of strings, try to parse each
    if (Array.isArray(attachments)) {
      console.log('DEBUG attachments: array of strings');
      return attachments
        .map((item) => {
          if (typeof item === 'string') {
            try {
              return JSON.parse(item);
            } catch (err) {
              console.error('DEBUG attachments: failed to parse array item:', item, err);
              return null;
            }
          }
          return item;
        })
        .filter(isChatAttachment);
    }

    console.log('DEBUG attachments: unknown format, returning empty array');
    return [];
  };

  // Update handleSendMessage to allow sending if there is text OR attachments
  const handleSendMessage = async () => {
    if (!sessionId || (!newMessage.trim() && attachments.length === 0)) return;
    setIsTyping(false);
    sendTypingEvent(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    setSending(true);
    const visitorEmail = email.trim() || 'Visitor@Email.com';
    const messageContent = newMessage.trim();
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}-${Math.random()}`,
      sessionId,
      senderType: 'visitor',
      senderId: visitorEmail,
      content: messageContent || '',
      type: 'user',
      sentAt: new Date().toISOString(),
      attachments: attachments.length > 0 ? attachments : null,
    };
    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage('');
    setAttachments([]);
    try {
      const res = await fetch(`${BASE_BUDPAL_API}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({
          sessionId,
          senderType: 'visitor',
          senderId: visitorEmail,
          content: messageContent || '',
          type: 'user',
          attachments: attachments.length > 0 ? attachments : undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      const messageData = await res.json();
      setMessages((prev) =>
        prev.map((msg) => (msg.id === optimisticMessage.id ? messageData : msg))
      );
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));
      setNewMessage(messageContent);
    } finally {
      setSending(false);
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get typing indicator text
  const getTypingIndicatorText = () => {
    const typingUserNames = Object.values(typingUsers).map(
      (user) => user.senderName || user.senderId || 'Someone'
    );

    if (typingUserNames.length === 0) return null;
    if (typingUserNames.length === 1) return `${typingUserNames[0]} is typing`;
    if (typingUserNames.length === 2)
      return `${typingUserNames[0]} and ${typingUserNames[1]} are typing`;
    return 'Multiple people are typing';
  };

  const handleAgentClick = () => {
    setShowAgentImage(false);
    setOpen(true);
  };

  const handleCloseChat = () => {
    setOpen(false);
    setSessionId(null);
    setMessages([]);
    setNewMessage('');
    // Don't show agent image again, keep showing 24/7 support bubble
  };

  // Add this useEffect to listen for the open-live-chat event
  useEffect(() => {
    const openChatHandler = () => setOpen(true);
    window.addEventListener('open-live-chat', openChatHandler);
    return () => window.removeEventListener('open-live-chat', openChatHandler);
  }, []);

  return (
    <>
      {/* Cookie Banner - Appears once when user first visits */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 w-full sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-sm bg-white sm:rounded-lg shadow-lg border-t sm:border border-gray-200 z-[60] p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FiSettings className="w-4 h-4 text-brand-primary" />
                <h3 className="font-medium text-brand-ink text-sm">We use cookies</h3>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                We use cookies to improve your experience. By continuing, you agree to our use of
                cookies.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCookieAccept(true)}
                  className="px-3 py-2 min-h-[48px] flex items-center justify-center bg-brand-primary text-white rounded text-xs font-medium hover:bg-brand-primary-dark transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={() => handleCookieAccept()}
                  className="px-3 py-2 min-h-[48px] flex items-center justify-center bg-gray-100 text-brand-ink rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={handleCookieReject}
                  className="px-3 py-2 min-h-[48px] flex items-center justify-center border border-gray-300 text-gray-600 rounded text-xs font-medium hover:bg-gray-50 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>

            <button
              onClick={handleCookieReject}
              className="text-gray-400 hover:text-gray-700 min-h-[48px] min-w-[48px] p-2 flex items-center justify-center"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Contact Widget - Fixed on the left */}
      <div className="fixed right-2 bottom-2 z-50 sm:right-4 sm:bottom-4 md:left-2 md:bottom-2 md:right-auto">
        {/* Desktop: Show agent image or 24/7 support bubble based on page and state */}
        {!open && showAgentImage && (
          <div
            className="hidden md:block fixed left-2 bottom-7 z-[40] select-none"
            style={{ width: 320, height: 380 }}
          >
            {/* ExpertAgent PNG, directly behind button, but moved down */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 cursor-pointer"
              style={{ width: 240, height: 320 }}
              onClick={handleAgentClick}
            >
              <Image
                src="/img/ExpertAgent.png"
                alt="Agent"
                width={240}
                height={320}
                priority
                draggable={false}
                className="drop-shadow-2xl agent-blur"
              />
            </div>
          </div>
        )}

        {/* Desktop: Show 24/7 support bubble when agent is hidden or on specific pages */}
        {!open && !showAgentImage && (
          <div className="hidden md:block mb-2 ml-2 sm:ml-4 animate-fade-in">
            <div className="bg-brand-surface-alt text-brand-ink px-4 py-2 rounded-xl shadow-lg border border-brand-border text-xs sm:text-sm font-semibold flex items-center gap-2">
              <span role="img" aria-label="chat">
                💬
              </span>{' '}
              Real human support 24/7!
            </div>
          </div>
        )}

        {/* Mobile: show original bubble, hide agent image */}
        {!open && (
          <div className="block md:hidden mb-2 flex justify-end animate-fade-in">
            <div className="bg-brand-surface-alt text-brand-ink px-4 py-2 rounded-xl shadow-lg border border-brand-border text-xs sm:text-sm font-semibold flex items-center gap-2 mr-2">
              <span role="img" aria-label="chat">
                💬
              </span>{' '}
              Real human support 24/7!
            </div>
          </div>
        )}

        {/* Floating Button */}
        {!open && (
          <div className="block md:hidden flex justify-end w-full">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-gradient-to-r from-brand-primary-dark via-brand-primary to-brand-primary-light text-white font-semibold hover:scale-105 transition-all focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent animate-shake mr-2 border border-brand-accent/30"
              aria-label="Open live chat"
              style={{ minWidth: 56 }}
            >
              <FiMessageCircle className="w-6 h-6" />
              <span className="hidden xs:inline-block sm:inline-block">
                Live Chat • 24/7 Human Help
              </span>
            </button>
          </div>
        )}

        {/* Desktop Floating Button */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-gradient-to-r from-brand-primary-dark via-brand-primary to-brand-primary-light text-white font-semibold hover:scale-105 transition-all focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent animate-shake border border-brand-accent/30"
            aria-label="Open live chat"
            style={{ minWidth: 56 }}
          >
            <FiMessageCircle className="w-6 h-6" />
            <span className="hidden xs:inline-block sm:inline-block">
              Live Chat • 24/7 Human Help
            </span>
          </button>
        )}

        {/* Chat Box */}
        {open && !sessionId && (
          <div className="w-[90vw] max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl border border-brand-border p-4 sm:p-6 animate-fade-in flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-brand-primary">
                Start a Live Chat
              </h3>
              <button onClick={handleCloseChat} className="text-gray-400 hover:text-gray-700">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-brand-ink mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-2 border-brand-border px-3 py-2 text-base text-brand-ink placeholder-brand-muted focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-brand-ink mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-2 border-brand-border px-3 py-2 text-base text-brand-ink placeholder-brand-muted focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200"
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <button
              className="w-full py-3 rounded-lg font-bold text-white bg-brand-primary hover:bg-brand-primary-dark transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleStartChat}
              disabled={loading || !name.trim() || !email.trim()}
            >
              {loading ? 'Starting...' : 'Start Chat'}
            </button>
          </div>
        )}

        {/* Full Chat Interface */}
        {open && sessionId && (
          <div className="w-[90vw] max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl border border-brand-border animate-fade-in flex flex-col h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-brand-border bg-brand-surface-alt rounded-t-2xl">
              <h3 className="text-base sm:text-lg font-bold text-brand-primary">Live Chat</h3>
              <button onClick={handleCloseChat} className="text-gray-400 hover:text-gray-700">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Chat started! An agent will join shortly...</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id}>
                    {message.type === 'system' ? (
                      // System message - centered, gray
                      <div className="flex justify-center my-2">
                        <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          <span className="font-medium">{message.content}</span>
                          <span className="ml-2 text-gray-500">{formatTime(message.sentAt)}</span>
                        </div>
                      </div>
                    ) : message.senderType === 'visitor' ? (
                      // Visitor message - right side, blue
                      <div className="flex justify-end">
                        <div className="max-w-[80%]">
                          <div className="bg-brand-primary text-white px-3 py-2 rounded-lg rounded-br-md">
                            <p className="text-sm">{message.content}</p>
                            {(() => {
                              const parsedAttachments = parseAttachments(message.attachments);
                              if (parsedAttachments.length > 0) {
                                return (
                                  <div className="mt-2 space-y-1">
                                    {parsedAttachments.map((att, index) => {
                                      if (!att || !att.id || !att.filename) return null;
                                      return (
                                        <div
                                          key={att.id || index}
                                          className="flex items-center gap-2 text-xs"
                                        >
                                          {getFileIcon(att.type || 'unknown', 'white')}
                                          <a
                                            href={`${BASE_BUDPAL_API}/api/chat/attachment/${att.id}`}
                                            download={att.filename}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:underline font-medium truncate max-w-[120px]"
                                          >
                                            {att.filename}
                                          </a>
                                          <span className="text-gray-200">
                                            ({Math.round((att.size || 0) / 1024)} KB)
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </div>
                          <div className="text-xs text-gray-500 text-right mt-1">
                            {formatTime(message.sentAt)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Agent message - left side, gray
                      <div className="flex justify-start">
                        <div className="max-w-[80%]">
                          <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg rounded-bl-md">
                            <p className="text-sm">{message.content}</p>
                            {(() => {
                              const parsedAttachments = parseAttachments(message.attachments);
                              if (parsedAttachments.length > 0) {
                                return (
                                  <div className="mt-2 space-y-1">
                                    {parsedAttachments.map((att, index) => {
                                      if (!att || !att.id || !att.filename) return null;
                                      return (
                                        <div
                                          key={att.id || index}
                                          className="flex items-center gap-2 text-xs"
                                        >
                                          {getFileIcon(att.type || 'unknown', '#1e293b')}
                                          <a
                                            href={`${BASE_BUDPAL_API}/api/chat/attachment/${att.id}`}
                                            download={att.filename}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-800 hover:underline font-medium truncate max-w-[120px]"
                                          >
                                            {att.filename}
                                          </a>
                                          <span className="text-gray-500">
                                            ({Math.round((att.size || 0) / 1024)} KB)
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </div>
                          <div className="text-xs text-gray-500 text-left mt-1 flex items-center gap-1">
                            <span>{formatTime(message.sentAt)}</span>
                            {message.senderName && (
                              <span className="text-brand-primary font-medium">
                                • {message.senderName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Typing Indicator */}
              {getTypingIndicatorText() && (
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg rounded-bl-md">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{getTypingIndicatorText()}</span>
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0ms' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '150ms' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '300ms' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-brand-border bg-brand-surface">
              {/* Show selected attachments */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {attachments.map((att, index) => (
                    <div
                      key={att.id || index}
                      className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs"
                    >
                      {getFileIcon(att.type || 'unknown')}
                      <span className="truncate max-w-[80px] text-gray-800">{att.filename}</span>
                      <span className="text-gray-400">
                        ({Math.round((att.size || 0) / 1024)} KB)
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-brand-muted hover:text-brand-primary transition-colors"
                  title="Attach file"
                >
                  <FiPaperclip className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                />
                <textarea
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping(); // Trigger typing event
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border-2 border-brand-border px-3 py-2 text-sm text-brand-ink placeholder-brand-muted focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200 resize-none"
                  rows={3}
                  disabled={sending}
                  style={{ minHeight: '72px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={(!newMessage.trim() && attachments.length === 0) || sending}
                  className="bg-brand-primary text-white p-2 rounded-lg hover:bg-brand-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
              {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
            </div>
          </div>
        )}
      </div>

      {/* Shake animation keyframes */}
      <style jsx global>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-4px);
          }
          40% {
            transform: translateX(4px);
          }
          60% {
            transform: translateX(-4px);
          }
          80% {
            transform: translateX(4px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
          animation-delay: 2s;
        }
        @media (max-width: 640px) {
          .max-w-xs {
            max-width: 95vw !important;
          }
        }
      `}</style>

      {/* For mobile, keep the current simple layout (no changes needed) */}

      {/* Add keyframes for custom bounce animations */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-18px);
          }
        }
        @keyframes bounce-slower {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-fast {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-28px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
        .animate-bounce-slower {
          animation: bounce-slower 3.2s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
        .animate-bounce-fast {
          animation: bounce-fast 1.7s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
        .agent-blur {
          filter: drop-shadow(0 0 18px rgba(10, 40, 75, 0.13))
            drop-shadow(0 0 8px rgba(10, 40, 75, 0.09));
        }
      `}</style>
    </>
  );
}
