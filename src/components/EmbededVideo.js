import PropTypes from 'prop-types';
import React from 'react';

function EmbededVideo({ embedLink }) {
  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const numb = 11;
    return (match && match[2].length === numb)
      ? match[2]
      : null;
  }

  const videoId = getId(embedLink);
  const iframeMarkup = `https://www.youtube.com/embed/${videoId}`;

  console.log('Video ID:', videoId);

  return (
    <div className="video-responsive">
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ iframeMarkup }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
      autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>);
}

EmbededVideo.propTypes = {
  embedLink: PropTypes.string.isRequired,
};

export default EmbededVideo;
