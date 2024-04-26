import React from 'react';
import MediaPlayer from './mediaPlayer';
import RightTab from './rightTab';
import BottomTap from './bottomTap';
import { ObjectiveProps } from './objective';
import { RecommendationsProps } from './recommendations';
import { TestBankProps } from './testBank';

interface MediaPageProps {
  mediaUrl: string;
  objectiveProps?: ObjectiveProps;
  testBankProps?: TestBankProps;
  recommendationsProps?: RecommendationsProps;
  transcription: string;
  description: string;
}

const MediaPage: React.FC<MediaPageProps> = ({ 
  mediaUrl, 
  objectiveProps, 
  testBankProps, 
  recommendationsProps, 
  transcription, 
  description 
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={{ width: '70%' }}>
          <MediaPlayer url={mediaUrl} />
        </div>
        <div style={{ width: '30%' }}>
          <RightTab 
            objectiveProps={objectiveProps} 
            testBankProps={testBankProps} 
            recommendationsProps={recommendationsProps} 
          />
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <BottomTap 
          transcription={transcription} 
          description={description} 
        />
      </div>
    </div>
  );
};

export default MediaPage;
