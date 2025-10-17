import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockQuestions } from '../mock';
import { toast } from '../hooks/use-toast';

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const question = mockQuestions[currentQuestion];
  const totalQuestions = mockQuestions.length;

  const handleSelectAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      Object.keys(answers).forEach((key) => {
        if (answers[key] === mockQuestions[key].correctAnswer) {
          correctCount++;
        }
      });
      
      const score = Math.round((correctCount / totalQuestions) * 100);
      
      toast({
        title: '¡Test completado!',
        description: `Has obtenido ${correctCount} de ${totalQuestions} respuestas correctas (${score}%)`,
      });
      
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    Object.keys(answers).forEach((key) => {
      if (answers[key] === mockQuestions[key].correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          <Card className="bg-white rounded-2xl p-12 shadow-2xl text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">¡Test Completado!</h1>
            
            <div className="my-12">
              <div className="text-7xl font-bold text-orange-500 mb-4">{percentage}%</div>
              <p className="text-2xl text-gray-700">
                {score} de {totalQuestions} respuestas correctas
              </p>
            </div>

            <div className="space-y-4 text-lg text-gray-700">
              {percentage >= 80 ? (
                <p className="font-semibold text-green-600">
                  ¡Excelente trabajo! Tienes un buen conocimiento de ciberseguridad.
                </p>
              ) : percentage >= 60 ? (
                <p className="font-semibold text-yellow-600">
                  ¡Bien hecho! Considera revisar algunos temas para mejorar.
                </p>
              ) : (
                <p className="font-semibold text-red-600">
                  Te recomendamos revisar las lecciones para fortalecer tus conocimientos.
                </p>
              )}
            </div>

            <div className="flex gap-4 justify-center mt-12">
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                size="lg"
                variant="outline"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-6 text-lg"
              >
                Volver a intentar
              </Button>
              <Button
                onClick={() => navigate('/recursos')}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
              >
                Volver a Recursos
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Progress */}
        <div className="text-white mb-8">
          <p className="text-xl font-semibold">Pregunta {currentQuestion + 1} de {totalQuestions}</p>
          <div className="w-full bg-white/30 rounded-full h-3 mt-3">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white rounded-2xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">{question.question}</h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                  answers[currentQuestion] === index
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-300 hover:border-orange-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    answers[currentQuestion] === index
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-400'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700 text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="secondary"
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-6 text-lg"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed px-8 py-6 text-lg"
          >
            {currentQuestion === totalQuestions - 1 ? 'Finalizar' : 'Siguiente'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;