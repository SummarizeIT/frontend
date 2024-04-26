import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

export interface TestBankProps {
  questionList: string[];
  answerList: string[][];
  correctAnswers: string[];
}

const TestBank: React.FC<TestBankProps> = ({
  questionList,
  answerList,
  correctAnswers,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array(questionList.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const calculatedScore = correctAnswers.reduce(
      (acc, correctAnswer, index) =>
        acc + (selectedAnswers[index] === correctAnswer ? 1 : 0),
      0
    );
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedAnswers(new Array(questionList.length).fill(""));
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div>
      {questionList.map((question, qIndex) => (
        <Card key={qIndex} sx={{ mb: 2 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{question}</FormLabel>
            <RadioGroup
              value={selectedAnswers[qIndex]}
              onChange={(e) => handleSelectAnswer(qIndex, e.target.value)}
            >
              {answerList[qIndex].map((answer, aIndex) => (
                <FormControlLabel
                  key={aIndex}
                  value={answer}
                  control={<Radio />}
                  label={
                    submitted
                      ? `${answer} ${
                          answer === correctAnswers[qIndex]
                            ? "(Correct)"
                            : selectedAnswers[qIndex] === answer
                            ? ""
                            : ""
                        }`
                      : answer
                  }
                  disabled={submitted}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Card>
      ))}
      {!submitted ? (
        <Button onClick={handleSubmit}>Submit</Button>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <p>
            Your score: {score} out of {correctAnswers.length}
          </p>
          <Button onClick={handleRetry}>Retry</Button>
        </div>
      )}
    </div>
  );
};

export default TestBank;


// How to use
// const questions = [
//   "What is the capital of France?",
//   "Who wrote 'To Kill a Mockingbird'?",
//   "What is the chemical symbol for gold?"
// ];

// const answers = [
//   ["Paris", "Lyon", "Marseille", "Bordeaux"],
//   ["Harper Lee", "Ernest Hemingway", "J.K. Rowling", "Mark Twain"],
//   ["Au", "Ag", "Fe", "Cu"]
// ];

// const correctAnswers = [
//   "Paris",
//   "Harper Lee",
//   "Au"
// ];

// <TestBank questionList={questions} answerList={answers} correctAnswers={correctAnswers}/>