import React from 'react'

export default function MusicPlayer({ src }) {
  return (
    <iframe
      src={src}
      height="175px"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      allow="autoplay *; encrypted-media *; clipboard-write"
      className='w-full overflow-hidden rounded-2xl'
    ></iframe>
  );
}
