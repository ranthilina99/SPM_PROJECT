import React, { useState } from 'react';
import {Link} from "react-router-dom";

import './question.css';

export default function Questionnaire() {
	const questions = [
		{
			questionText: 'What is your gender?',
			answerOptions: [
				{ answerText: 'Male', points: 1 },
				{ answerText: 'Female', points: 2 },
			],
		},
		{
			questionText: 'What is your age?',
			answerOptions: [
				{ answerText: '12-18', points: 1 },
				{ answerText: '18-30', points: 2 },
				{ answerText: '30-50', points: 3 },
				{ answerText: '60+', points: 4 },
			],
		},
		{
			questionText: 'What is your experience?',
			answerOptions: [
				{ answerText: 'Beginner', points: 4 },
				{ answerText: 'Intermediate', points: 3 },
				{ answerText: 'Advanced', points: 2 },
				{ answerText: 'Elite', points: 1 },
			],
		},
		{
			questionText: 'How many push-ups can you do in a single set?',
			answerOptions: [
				{ answerText: '10-', points: 4 },
				{ answerText: '10-20', points: 3 },
				{ answerText: '20-50', points: 2 },
				{ answerText: '50+', points: 1 },
			],
		},
		{
			questionText: 'How many pull-ups can you do in a single set?',
			answerOptions: [
				{ answerText: '10-', points: 4 },
				{ answerText: '10-20', points: 3 },
				{ answerText: '20-50', points: 2 },
				{ answerText: '50+', points: 1 },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	// function handleClick() {
	// 	return <Link to = {{
	// 		pathname:'/show',
	// 		questionProps:{
	// 			Score: score
	// 		}
	// 	}}>Proceed</Link>

		
	//   }
	

	const handleAnswerOptionClick = (points) => {

		setScore(score + points);
		
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			 setShowScore(true);

			//  handleClick();
		}
	};
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					<button>{/* You scored {score} out of {questions.length} */}
					<Link to = {{
                    pathname:'/show',
                    questionProps:{
                        thisScore: score
                    }
                }}>Choose</Link>
				</button>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.points)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
