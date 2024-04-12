import React from 'react';

interface RecommendationsProps {
  recommendationsList: string[];
  recommendationsURL: string[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendationsList, recommendationsURL }) => {
  return (
    <ul>
      {recommendationsList.map((recommendation, index) => {
        const url = recommendationsURL[index];
        return (
          <li key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {recommendation}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Recommendations;

// How to use
// const recommendedReadings = [
//     "React Official Documentation",
//     "Thinking in React",
//     "React Patterns"
//   ];
  
//   const readingURLs = [
//     "https://reactjs.org/docs/getting-started.html",
//     "https://reactjs.org/docs/thinking-in-react.html",
//     "https://reactpatterns.com/"
//   ];

//   <Recommendations recommendationsList={recommendedReadings} recommendationsURL={readingURLs} />
