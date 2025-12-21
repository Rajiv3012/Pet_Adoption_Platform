import { useEffect, useState } from 'react';

export default function LoadingScreen({ isVisible, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onComplete(), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Animated Cat */}
      <div className="relative">
        {/* Cat Body */}
        <div className="relative">
          {/* Main Cat Body */}
          <div className="w-48 h-32 bg-orange-400 rounded-full relative animate-bounce-gentle">
            {/* Cat Stripes */}
            <div className="absolute top-4 left-8 w-32 h-2 bg-orange-500 rounded-full opacity-60"></div>
            <div className="absolute top-8 left-6 w-36 h-2 bg-orange-500 rounded-full opacity-60"></div>
            <div className="absolute top-12 left-10 w-28 h-2 bg-orange-500 rounded-full opacity-60"></div>
            <div className="absolute top-16 left-8 w-32 h-2 bg-orange-500 rounded-full opacity-60"></div>
            <div className="absolute top-20 left-12 w-24 h-2 bg-orange-500 rounded-full opacity-60"></div>
            
            {/* Cat Ears */}
            <div className="absolute -top-6 left-12 w-8 h-8 bg-orange-400 rounded-full transform rotate-45"></div>
            <div className="absolute -top-6 left-28 w-8 h-8 bg-orange-400 rounded-full transform rotate-45"></div>
            <div className="absolute -top-4 left-14 w-4 h-4 bg-pink-300 rounded-full transform rotate-45"></div>
            <div className="absolute -top-4 left-30 w-4 h-4 bg-pink-300 rounded-full transform rotate-45"></div>
            
            {/* Cat Face */}
            <div className="absolute top-6 left-16 w-16 h-12 bg-orange-300 rounded-full">
              {/* Eyes */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full animate-blink">
                <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full animate-blink">
                <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
              </div>
              
              {/* Nose */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-2 h-1.5 bg-pink-400 rounded-full"></div>
              
              {/* Mouth */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1 h-2 border-l-2 border-gray-600 rounded-bl-full"></div>
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1 h-2 border-r-2 border-gray-600 rounded-br-full"></div>
            </div>
            
            {/* Cat Legs */}
            <div className="absolute -bottom-4 left-8 w-6 h-8 bg-orange-400 rounded-full"></div>
            <div className="absolute -bottom-4 left-16 w-6 h-8 bg-orange-400 rounded-full"></div>
            <div className="absolute -bottom-4 right-16 w-6 h-8 bg-orange-400 rounded-full"></div>
            <div className="absolute -bottom-4 right-8 w-6 h-8 bg-orange-400 rounded-full"></div>
            
            {/* Cat Tail */}
            <div className="absolute -right-8 top-8 w-16 h-6 bg-orange-400 rounded-full transform rotate-12 animate-tail-wag origin-left"></div>
          </div>
          
          {/* Yarn Ball */}
          <div className="absolute -left-16 top-12 w-12 h-12 bg-pink-600 rounded-full animate-roll">
            {/* Yarn texture */}
            <div className="absolute top-1 left-2 w-8 h-1 bg-pink-700 rounded-full opacity-60"></div>
            <div className="absolute top-3 left-1 w-10 h-1 bg-pink-700 rounded-full opacity-60"></div>
            <div className="absolute top-5 left-3 w-6 h-1 bg-pink-700 rounded-full opacity-60"></div>
            <div className="absolute top-7 left-2 w-8 h-1 bg-pink-700 rounded-full opacity-60"></div>
            <div className="absolute top-9 left-4 w-4 h-1 bg-pink-700 rounded-full opacity-60"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-12 text-center">
          <h2 className="text-white text-2xl font-bold mb-4 animate-pulse">Loading Pet Haven...</h2>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-orange-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Progress Text */}
          <p className="text-gray-300 text-sm mt-2">{progress}%</p>
        </div>
        
        {/* Floating Hearts and Elements */}
        <div className="absolute -top-8 -left-4 text-pink-400 text-xl animate-float-up animation-delay-100">💕</div>
        <div className="absolute -top-12 right-8 text-yellow-400 text-lg animate-float-up animation-delay-300">⭐</div>
        <div className="absolute -top-6 right-16 text-pink-400 text-sm animate-float-up animation-delay-500">💖</div>
        <div className="absolute -top-10 left-12 text-orange-400 text-lg animate-float-up animation-delay-700">🐾</div>
        <div className="absolute -top-14 left-32 text-purple-400 text-lg animate-float-up animation-delay-200">🎀</div>
        <div className="absolute -top-8 right-4 text-green-400 text-sm animate-float-up animation-delay-600">🌟</div>
        
        {/* Paw Print Trail */}
        <div className="absolute -right-20 top-20 text-orange-300 text-lg paw-trail animation-delay-100">🐾</div>
        <div className="absolute -right-16 top-28 text-orange-300 text-sm paw-trail animation-delay-200">🐾</div>
        <div className="absolute -right-12 top-36 text-orange-300 text-xs paw-trail animation-delay-300">🐾</div>
        
        {/* Cute Loading Messages */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="text-white text-sm opacity-75 animate-pulse text-center">
            {progress < 30 && "🐱 Waking up the kitties..."}
            {progress >= 30 && progress < 60 && "🏠 Preparing cozy homes..."}
            {progress >= 60 && progress < 90 && "💕 Spreading love and joy..."}
            {progress >= 90 && "🎉 Almost ready to meet your furry friends!"}
          </div>
        </div>
      </div>
    </div>
  );
}