import React from 'react';

function VideoInstagramFeed({ globalVideos, setGlobalVideos }) {
  
  // Custom function to handle liking a post
  const handleLike = (id) => {
    setGlobalVideos(globalVideos.map(video => {
      if (video.id === id) {
        return { ...video, likes: video.likes + 1 };
      }
      return video;
    }));
  };

  return (
    <div className="max-w-md mx-auto space-y-8 py-4">
      
      {/* 📱 INSTAGRAM STYLED FEED HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-slate-950 z-10 px-2">
        <h1 className="text-xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent tracking-tight">
          Lunara Reels ⚽
        </h1>
        <span className="text-xs font-bold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
          🎥 Explore Talent
        </span>
      </div>

      {/* FEED TIMELINE POST CARDS */}
      {globalVideos.map((post) => (
        <article key={post.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Post Top Profile Bar */}
          <div className="p-4 flex items-center gap-3 border-b border-slate-800/40">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                {post.playerName.substring(0,2).toUpperCase()}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">{post.playerName}</h4>
              <p className="text-[10px] text-slate-400">🏟️ {post.club}</p>
            </div>
          </div>

          {/* Post Media Video Content */}
          <div className="relative aspect-[4/5] bg-black flex items-center justify-center">
            <video 
              src={post.url} 
              controls 
              className="w-full h-full object-contain"
              loop
              muted
            />
          </div>

          {/* Post Bottom Action Panel */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleLike(post.id)}
                className="text-xl hover:scale-125 transition-transform active:scale-95 duration-100"
              >
                ❤️
              </button>
              <button className="text-xl hover:scale-125 transition-transform">💬</button>
              <button className="text-xl hover:scale-125 transition-transform ml-auto">🔖</button>
            </div>

            {/* Likes Count */}
            <div className="text-xs font-black text-slate-200 tracking-wide">
              {post.likes.toLocaleString()} likes
            </div>

            {/* Title / Description Caption */}
            <p className="text-sm text-slate-300 leading-snug">
              <span className="font-extrabold text-white mr-2">{post.playerName}</span>
              {post.title}
            </p>
          </div>
        </article>
      ))}

      {globalVideos.length === 0 && (
        <p className="text-center text-sm text-slate-500 py-10">No clips uploaded yet. Be the first!</p>
      )}
    </div>
  );
}

export default VideoInstagramFeed;
