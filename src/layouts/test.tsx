
import MediaPage from '@/components/mediaPage/mediaPage';
import { BrowserRouter } from 'react-router-dom';


const url = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4";

const objectiveProps = {
  objectiveList: [
    "Understand the basics of React",
    "Learn how to create reusable components",
    "Master state management in React",
  ],
};

const recommendationsProps = {
  recommendationsList: [
    "React Official Documentation",
    "Thinking in React",
    "React Patterns",
  ],
  recommendationsURL: [
    "https://reactjs.org/docs/getting-started.html",
    "https://reactjs.org/docs/thinking-in-react.html",
    "https://reactpatterns.com/",
  ],
};

const testBankProps = {
  questionList: [
    "What is the capital of France?",
    "Who wrote 'To Kill a Mockingbird'?",
    "What is the chemical symbol for gold?",
  ],
  answerList: [
    ["Paris", "Lyon", "Marseille", "Bordeaux"],
    ["Harper Lee", "Ernest Hemingway", "J.K. Rowling", "Mark Twain"],
    ["Au", "Ag", "Fe", "Cu"],
  ],
  correctAnswers: [
    "Paris",
    "Harper Lee",
    "Au",
  ],
};

const transcription = "This is the transcription text for the media.";
const description = "This is a description or summary of the media content.";

const Test=()=> {
  return (
       <MediaPage
        mediaUrl={url}
        objectiveProps={objectiveProps}
        testBankProps={testBankProps}
        recommendationsProps={recommendationsProps}
        transcription={transcription}
        description={description}
      />
    
  );
}
export default Test;
