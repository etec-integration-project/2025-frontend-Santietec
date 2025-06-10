import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, SkipBack, SkipForward,
  Subtitles, Settings, Maximize, Minimize
} from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  onClose?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, description, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const isYouTubeVideo = videoUrl.includes('youtube.com/embed/');

  useEffect(() => {
    if (isYouTubeVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Auto-play when loaded
      video.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, [isYouTubeVideo]);

  useEffect(() => {
    if (isYouTubeVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isYouTubeVideo]);

  const handlePlayPause = () => {
    if (isYouTubeVideo) return;
    
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isYouTubeVideo) return;
    
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isYouTubeVideo) return;
    
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    if (isYouTubeVideo) return;
    
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={playerRef}
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black z-[1000] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isYouTubeVideo && isPlaying && setShowControls(false)}
    >
      {isYouTubeVideo ? (
        <iframe
          src={`${videoUrl}?autoplay=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full"
          src={videoUrl}
          onClick={handlePlayPause}
          playsInline
        />
      )}

      {!isYouTubeVideo && showControls && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70">
          <div className="absolute top-4 left-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && (
              <p className="text-sm mt-2 max-w-xl">{description}</p>
            )}
          </div>

          {onClose && (
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={onClose}
            >
              <Minimize className="w-6 h-6" />
            </button>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-red-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
            <div className="flex justify-between items-center text-xs mt-2">
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={handlePlayPause}
                  className="hover:text-red-600 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <button 
                  onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)}
                  className="hover:text-red-600 transition-colors"
                >
                  <SkipBack className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => videoRef.current && (videoRef.current.currentTime += 10)}
                  className="hover:text-red-600 transition-colors"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={playbackRate}
                  onChange={(e) => {
                    const rate = parseFloat(e.target.value);
                    setPlaybackRate(rate);
                    if (videoRef.current) {
                      videoRef.current.playbackRate = rate;
                    }
                  }}
                  className="bg-transparent border border-gray-600 rounded px-2 py-1 text-sm hover:border-red-600 transition-colors cursor-pointer"
                >
                  <option value={0.5} className="bg-black">0.5x</option>
                  <option value={1} className="bg-black">1x</option>
                  <option value={1.5} className="bg-black">1.5x</option>
                  <option value={2} className="bg-black">2x</option>
                </select>
                <button className="hover:text-red-600 transition-colors">
                  <Subtitles className="w-6 h-6" />
                </button>
                <button className="hover:text-red-600 transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="hover:text-red-600 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize className="w-6 h-6" />
                  ) : (
                    <Maximize className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;