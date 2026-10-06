import React from 'react';

function VideoInstagramFeed({ globalVideos, setGlobalVideos }) {
  
  const handleLikeToggle = (id) => {
    setGlobalVideos(globalVideos.map(post => {
      if (post.id === id) {
        return { 
          ...post, 
          isLiked: !post.isLiked, 
          likes: post.isLiked ? post.likes - 1 : post.likes + 1 
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-md mx-auto md:py-4 space-y-4 md:space-y-6">
      
      {globalVideos.map((post) => (
        <article 
          key={post.id} 
          className="bg-black md:bg-slate-900 md:border md:border-slate-800 md:rounded-3xl overflow-hidden shadow-2xl relative w-full aspect-[9/16] max-h-[85vh] md:max-h-[750px] flex flex-col justify-between"
        >
          {/* TOP CONTROLS: AUTHOR METADATA OVERLAY */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">
                  {post.playerName.substring(0,2).toUpperCase()}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-100 flex items-center gap-1">
                  {post.playerName} 
                  <span className="text-[9px] text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-400/20">PROSPECT</span>
                </h4>
                <p className="text-[9px] text-slate-300 font-medium">🏟️ {post.club}</p>
              </div>
            </div>
            
            <button className="text-[10px] font-bold border border-slate-500 text-slate-200 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all">
              Follow
            </button>
          </div>

          {/* BACKGROUND MEDIA RAW COMPONENT */}
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center absolute inset-0">
            <video 
              src={post.url} 
              controls 
              className="w-full h-full object-contain" 
              loop 
              muted 
              playsInline
            />
          </div>

          {/* RIGHT ACTION FLOAT ROW (Instagram Overlay Standard Alignment) */}
          <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5 bg-black/20 p-2 rounded-2xl backdrop-blur-xs">
            {/* Heart Like Trigger */}
            <div className="text-center group">
              <button 
                onClick={() => handleLikeToggle(post.id)}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-xl transition-transform active:scale-75 duration-100 bg-slate-900/60 border border-slate-800 text-white
                  ${post.isLiked ? 'text-rose-500 bg-rose-500/10 border-rose-500/30' : ''}`}
              >
                {post.isLiked ? '❤️' : '🤍'}
              </button>
              <span className="text-[10px] font-bold text-slate-200 block mt-1 drop-shadow-md">{post.likes}</span>
            </div>

            {/* Comments Counter Icon */}
            <div className="text-center">
              <button className="w-11 h-11 rounded-full flex items-center justify-center text-xl bg-slate-900/60 border border-slate-800 text-white hover:bg-slate-800">
                💬
              </button>
              <span className="text-[10px] font-bold text-slate-200 block mt-1 drop-shadow-md">{post.commentsCount}</span>
            </div>

            {/* Share Trigger */}
            <button className="w-11 h-11 rounded-full flex items-center justify-center text-lg bg-slate-900/60 border border-slate-800 text-white hover:bg-slate-800">
              ✈️
            </button>

            {/* Bookmark Trigger */}
            <button className="w-11 h-11 rounded-full flex items-center justify-center text-md bg-slate-900/60 border border-slate-800 text-white hover:bg-slate-800">
              🔖
            </button>
          </div>

          {/* BOTTOM CAPTION METADATA ROW */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pt-12 pr-16">
            <p className="text-xs text-slate-100 font-semibold leading-relaxed line-clamp-3">
              <span className="font-black text-white mr-2 tracking-tight">{post.playerName.toLowerCase()}</span>
              {post.title}
            </p>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-sky-400 font-mono bg-sky-950/40 w-fit px-2 py-0.5 rounded border border-sky-800/30">
              <span>🎵 Original Drill Audio</span>
            </div>
          </div>

        </article>
      ))}

    </div>
  );
}

export default VideoInstagramFeed;
