import ReactPlayer from "react-player";

interface MediaPlayerProps {
  url: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ url }) => {
  return (
    <div className="player-wrapper" style={{
      position: "relative",
      paddingTop: "56.25%",
      
    }}>
      <ReactPlayer
        className="react-player"
        url={url}
        controls
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default MediaPlayer;
