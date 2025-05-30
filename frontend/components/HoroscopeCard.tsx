'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Horoscope } from '@/types/horoscope';

interface HoroscopeCardProps {
  horoscope: Horoscope;
  username?: string;
}

export default function HoroscopeCard({ horoscope, username = 'Developer' }: HoroscopeCardProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'message' | 'traits'>('message');

  const traits = horoscope.traits;
  
  // Format date as Month Day, Year
  const formattedDate = new Date(horoscope.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const copyToClipboard = () => {
    const text = `✨ My Coding Horoscope for ${formattedDate} ✨\n\n${horoscope.message}\n\n🚀 Energy: ${traits.energy}/10\n✨ Charisma: ${traits.charisma}/10\n🎨 Creativity: ${traits.creativity}/10\n👥 Collaboration: ${traits.collaboration}/10\n\nGenerated by AstroGit - Get yours at astrogit.vercel.app`;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
  
  const shareOnTwitter = () => {
    const text = `✨ My Coding Horoscope for today: ${horoscope.message.substring(0, 100)}... (Energy: ${traits.energy}/10, Charisma: ${traits.charisma}/10)`;
    const url = 'https://astrogit.vercel.app';
    
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  // Ensure traits are valid numbers between 1-10
  const normalizedTraits = {
    energy: Math.max(1, Math.min(10, traits.energy || 1)),
    charisma: Math.max(1, Math.min(10, traits.charisma || 1)),
    creativity: Math.max(1, Math.min(10, traits.creativity || 1)),
    collaboration: Math.max(1, Math.min(10, traits.collaboration || 1))
  };

  // Calculate average score
  const averageScore = (
    normalizedTraits.energy + 
    normalizedTraits.charisma + 
    normalizedTraits.creativity + 
    normalizedTraits.collaboration
  ) / 4;

  // Get motivational emojis for traits
  const getEmoji = (score: number) => {
    if (score >= 8) return '🌟';
    if (score >= 6) return '✨';
    if (score >= 4) return '💫';
    return '⭐';
  };

  // Split message into paragraphs for better readability
  const messageParagraphs = horoscope.message.split(/(?<=\. )(?=[A-Z])/g);

  return (
    <div className="max-w-3xl w-full mx-auto my-6">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-8 rounded-2xl shadow-2xl border border-indigo-400 relative overflow-hidden">
        {/* Animated star particles decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.8)',
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="text-xs uppercase tracking-wider text-indigo-300 mb-1">Cosmic Coding Insights</div>
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                {username}'s Coding Destiny
              </h2>
              <div className="text-sm text-indigo-200 mt-1">
                {formattedDate}
              </div>
            </div>
            
            <div className="bg-indigo-800 bg-opacity-50 rounded-full px-4 py-2 border border-indigo-400">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{averageScore.toFixed(1)}</span>
                <div className="h-8 w-8 relative">
                  <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xl">
                    {getEmoji(averageScore)}
                  </div>
                </div>
                <span className="text-xs text-indigo-200">Cosmic<br/>Score</span>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900 bg-opacity-40 backdrop-blur-sm rounded-xl p-5 border border-indigo-700 mb-6">
            <div className="flex gap-2 mb-4">
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'message' ? 'bg-indigo-600' : 'bg-indigo-800 bg-opacity-50 hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('message')}
              >
                Your Message
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'traits' ? 'bg-indigo-600' : 'bg-indigo-800 bg-opacity-50 hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('traits')}
              >
                Your Traits
              </button>
            </div>
            
            {activeTab === 'message' ? (
              <div className="space-y-3 min-h-[200px]">
                {messageParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[200px]">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2">
                      <span className="text-yellow-400 text-xl">🚀</span> 
                      <span>Energy</span>
                    </p>
                    <p className="font-bold">{normalizedTraits.energy}/10</p>
                  </div>
                  <div className="relative h-6 bg-indigo-800 bg-opacity-50 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                      style={{ width: `${normalizedTraits.energy * 10}%` }}
                    >
                      <div className="absolute inset-0 animate-pulse bg-white opacity-30"></div>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-300">
                    {normalizedTraits.energy >= 8 ? 'Exceptional coding energy!' :
                     normalizedTraits.energy >= 6 ? 'Strong coding momentum!' :
                     normalizedTraits.energy >= 4 ? 'Growing coding energy!' : 
                     'Budding coding potential!'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2">
                      <span className="text-pink-400 text-xl">✨</span>
                      <span>Charisma</span>
                    </p>
                    <p className="font-bold">{normalizedTraits.charisma}/10</p>
                  </div>
                  <div className="relative h-6 bg-indigo-800 bg-opacity-50 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                      style={{ width: `${normalizedTraits.charisma * 10}%` }}
                    >
                      <div className="absolute inset-0 animate-pulse bg-white opacity-30"></div>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-300">
                    {normalizedTraits.charisma >= 8 ? 'Magnetic code charisma!' :
                     normalizedTraits.charisma >= 6 ? 'Impressive code appeal!' :
                     normalizedTraits.charisma >= 4 ? 'Growing code influence!' : 
                     'Emerging code presence!'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2">
                      <span className="text-purple-400 text-xl">🎨</span> 
                      <span>Creativity</span>
                    </p>
                    <p className="font-bold">{normalizedTraits.creativity}/10</p>
                  </div>
                  <div className="relative h-6 bg-indigo-800 bg-opacity-50 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                      style={{ width: `${normalizedTraits.creativity * 10}%` }}
                    >
                      <div className="absolute inset-0 animate-pulse bg-white opacity-30"></div>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-300">
                    {normalizedTraits.creativity >= 8 ? 'Brilliant creative vision!' :
                     normalizedTraits.creativity >= 6 ? 'Impressive creative approach!' :
                     normalizedTraits.creativity >= 4 ? 'Growing creative insight!' : 
                     'Budding creative talent!'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400 text-xl">👥</span> 
                      <span>Collaboration</span>
                    </p>
                    <p className="font-bold">{normalizedTraits.collaboration}/10</p>
                  </div>
                  <div className="relative h-6 bg-indigo-800 bg-opacity-50 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      style={{ width: `${normalizedTraits.collaboration * 10}%` }}
                    >
                      <div className="absolute inset-0 animate-pulse bg-white opacity-30"></div>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-300">
                    {normalizedTraits.collaboration >= 8 ? 'Exceptional community builder!' :
                     normalizedTraits.collaboration >= 6 ? 'Impressive connector!' :
                     normalizedTraits.collaboration >= 4 ? 'Growing network!' : 
                     'Promising collaborator!'}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <button
              onClick={copyToClipboard}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              {copied ? 'Copied to Clipboard!' : 'Copy Horoscope'}
            </button>
            
            <button
              onClick={shareOnTwitter}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              Share on Twitter
            </button>
          </div>
          
          <div className="text-center text-sm text-indigo-300">
            <span className="block sm:inline">The stars have aligned to reveal your coding destiny.</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline">Generated by AstroGit</span>
          </div>
        </div>
      </div>
    </div>
  );
} 