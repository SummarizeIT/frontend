import ReactPlayer from "react-player";

interface MediaPlayerProps {
  url: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ url }) => {
  return (
  <div className='player-wrapper'>
  <ReactPlayer
    className='react-player'
    url={url} controls
    width='100%'
    height='100%'
  />
</div>
  );
};

export default MediaPlayer;
