import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Award, RotateCcw, ChevronRight, ChevronLeft, Home, Trophy, Target, BookOpen } from 'lucide-react';

export function Quiz({S_id,user}){
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [isLoading,setIsLoading] = useState(true)
  const [allAns,setallAns] = useState([])
  // Sample questions data - replace with your data
  const [questions,setQuestion] = useState([
    {
      id: 1,
      question: "What is the capital of India?",
      options: [
        { id: 'A', text: 'Mumbai', isCorrect: false },
        { id: 'B', text: 'New Delhi', isCorrect: true },
        { id: 'C', text: 'Kolkata', isCorrect: false },
        { id: 'D', text: 'Chennai', isCorrect: false }
      ],
      explanation: "New Delhi is the capital city of India and serves as the seat of the Government of India."
    },

  ])
  const sid_map = function(){
    switch (S_id){
      case "science":
              return "S_Q"
        case "english":
              return "E_Q";
      case "math":
              return "M_Q"
      default:
        return S_id

    }
  }
  useEffect(() => {
  // Code here runs only once after the component mounts
  let f = async()=>{
    console.log("phone",user.phone_no)
    let sid = sid_map()
    console.log("sid",sid)
    console.log("user",user)
  const response = await fetch("http://localhost:5000/getQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_no: user?.phoneNumber || user?.phone_no,
        subjectId:sid ,
      }),
      
    });
    let data = await response.json()
    if(isLoading){
      console.log(data)
      setCurrentQuestionIndex(data.size)
      setallAns(data.ans)
  setQuestion(data.question);
  console.log("ans",data);
  setIsLoading(false)
    }
  }
  f()
  console.log("Call Ended")
  
}, []);


  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isAnswered = selectedAnswer !== undefined;

  // Timer effect
  useEffect(() => {
    if (!quizCompleted && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered && !quizCompleted) {
      handleTimeUp();
    }
  }, [timeLeft, quizCompleted, showResult, isAnswered]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
    setShowResult(false);
  }, [currentQuestionIndex]);

  // Calculate score whenever answers change
  useEffect(() => {
    let correctCount = 0;
    Object.entries(selectedAnswers).forEach(([questionIndex, answerId]) => {
      const question = questions[parseInt(questionIndex)];
      const selectedOption = question.options.find(opt => opt.id === answerId);
      if (selectedOption && selectedOption.isCorrect) {
        correctCount++;
      }
    });
    setScore(correctCount);
  }, [selectedAnswers]);

  const handleAnswerSelect = (optionId) => {
  if (showResult) return; // Only block selection if result is shown

  setSelectedAnswers(prev => ({
    ...prev,
    [currentQuestionIndex]: optionId
  }));
};

  const handleSubmitAnswer = () => {
    // 
    console.log(allAns,"ams" ,selectedAnswer)
    const new_ans = [{...allAns}]
    console.log(selectedAnswer , new_ans)
    new_ans.push(selectedAnswer)
    setallAns(new_ans[0])
    user.exp += 5;
    user.coins += 20;
    user.stars += 10;
    localStorage.setItem(`user_${user.phone_no}`,JSON.stringify(user))
    // user = newUser()
    let phone_no = user.phone_no || user.phoneNumber
    
    fetch("http://localhost:5000/updateuser",{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_no: phone_no,
        subjectId:sid_map() ,
      }),
    });
    console.log(user)
    console.log(phone_no,sid_map())
    setShowResult(true);
  };

  const handleTimeUp = () => {
    if (!isAnswered) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: null // Mark as timeout
      }));
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowResult(false);

    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowResult(!!selectedAnswers[currentQuestionIndex - 1]);
    }
  };

  const handleRetryQuestion = () => {
    setSelectedAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestionIndex];
      return newAnswers;
    });
    setShowResult(false);
    setTimeLeft(30);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setQuizCompleted(false);
    setTimeLeft(30);
    setScore(0);
  };

  const getOptionStyle = (option) => {
    if (!showResult) {
      return selectedAnswer === option.id 
        ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105' 
        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50';
    }
    
    if (option.isCorrect) {
      return 'border-green-500 bg-green-50 shadow-md';
    }
    
    if (selectedAnswer === option.id && !option.isCorrect) {
      return 'border-red-500 bg-red-50 shadow-md';
    }
    
    return 'border-gray-200 bg-gray-50';
  };

  const getOptionIcon = (option) => {
    if (!showResult) return null;
    
    if (option.isCorrect) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    if (selectedAnswer === option.id && !option.isCorrect) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    
    return null;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return 'Excellent! Outstanding performance! 🌟';
    if (percentage >= 80) return 'Great job! You did really well! 🎉';
    if (percentage >= 70) return 'Good work! Keep it up! 👍';
    if (percentage >= 60) return 'Not bad! Room for improvement. 📚';
    if (percentage >= 40) return 'You can do better! Keep practicing. 💪';
    return 'Don\'t give up! Practice makes perfect. 🎯';
  };

  // Quiz Results Screen
  if (quizCompleted) {
    // 
    fetch("http://localhost:5000/completed",{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_no: user?.phone_no || user?.phoneNumber,
        subjectId:sid_map() 
      }),
    });
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center">
          {/* Results Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
            <p className="text-gray-600">Here are your results</p>
          </div>

          {/* Score Card */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
            <div className="text-6xl font-bold mb-4">
              <span className={getScoreColor(percentage)}>{score}</span>
              <span className="text-gray-400">/{totalQuestions}</span>
            </div>
            <div className="text-2xl font-bold mb-2">
              <span className={getScoreColor(percentage)}>{percentage}%</span>
            </div>
            <p className={`text-lg font-medium ${getScoreColor(percentage)}`}>
              {getScoreMessage(percentage)}
            </p>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">{score}</div>
              <div className="text-sm text-green-700">Correct</div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600 mb-1">{totalQuestions - score}</div>
              <div className="text-sm text-red-700">Incorrect</div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">{percentage}%</div>
              <div className="text-sm text-blue-700">Accuracy</div>
            </div>
          </div>

          {/* Question Review */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Question Review
            </h3>
            <div className="space-y-3">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const correctOption = question.options.find(opt => opt.isCorrect);
                const userOption = question.options.find(opt => opt.id === userAnswer);
                const isCorrect = userOption && userOption.isCorrect;
                
                return (
                  <div key={question.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-600">Q{index + 1}</span>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm text-gray-700 truncate max-w-xs">
                        {question.question}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {userAnswer ? `Your: ${userAnswer}` : 'Timeout'} | Correct: {correctOption.id}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleRestartQuiz}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retake Quiz</span>
            </button>
            
            <button
              onClick={() => console.log('Go to home')}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Quiz Interface
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        {/* Progress and Timer */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span className={`font-mono ${timeLeft <= 10 ? 'text-red-600 font-bold animate-pulse' : ''}`}>
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
              {String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>

        {/* Score Display */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-gray-700">Score: {score}/{Object.keys(selectedAnswers).length}</span>
          </div>
          <div className="text-sm text-gray-600">
            Answered: {Object.keys(selectedAnswers).length}/{totalQuestions}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="flex justify-center mb-4">
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {questions.map((_, index) => {
              const isAnswered = selectedAnswers[index] !== undefined;
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-blue-500 text-white shadow-lg scale-110'
                      : isAnswered
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-2">Question {currentQuestionIndex + 1}</h2>
          <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
        </div>
      </div>

      {/* Options Section */}
      <div className="space-y-4 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(option.id)}
            disabled={showResult}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              getOptionStyle(option)
            } ${showResult ? 'cursor-default' : 'cursor-pointer hover:shadow-md'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-700">
                  {option.id}
                </span>
                <span className="text-gray-800 font-medium">{option.text}</span>
              </div>
              {getOptionIcon(option)}
            </div>
          </button>
        ))}
      </div>

      {/* Result Section */}
      {showResult && (
        <div className="bg-gray-50 border rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            {selectedAnswer && currentQuestion.options.find(opt => opt.id === selectedAnswer)?.isCorrect ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-600 font-bold text-lg">Correct! 🎉</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600 mr-2" />
                <span className="text-red-600 font-bold text-lg">
                  {selectedAnswer ? 'Incorrect' : 'Time\'s up!'} 😔
                </span>
              </>
            )}
          </div>
          
          {currentQuestion.explanation && (
            <div className="bg-white p-4 rounded border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-800 mb-2">Explanation:</h4>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            currentQuestionIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-600 text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Submit/Next Button */}
        {!showResult ? (
          <button
            disabled={!selectedAnswer}
            onClick={handleSubmitAnswer}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              selectedAnswer
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <div className="flex-1 flex space-x-2">
            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trophy className="w-4 h-4" />
                <span>Finish Quiz</span>
              </button>
            )}
            
            <button
              onClick={handleRetryQuestion}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          {!selectedAnswer 
            ? 'Select an option to continue' 
            : !showResult 
            ? 'Click Submit to see the result' 
            : currentQuestionIndex < totalQuestions - 1 
            ? 'Click Next to continue' 
            : 'Click Finish to see your final score'
          }
        </p>
      </div>
    </div>
  );
};

export default Quiz;