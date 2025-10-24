import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockLessons } from '../mock';

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const index = mockLessons.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      setCurrentLessonIndex(index);
      setLesson(mockLessons[index]);
    } else {
      setLesson(mockLessons[0]);
      setCurrentLessonIndex(0);
    }
  }, [lessonId]);

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = mockLessons[currentLessonIndex - 1];
      navigate(`/leccion/${prevLesson.id}`);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < mockLessons.length - 1) {
      const nextLesson = mockLessons[currentLessonIndex + 1];
      navigate(`/leccion/${nextLesson.id}`);
    } else {
      navigate('/recursos');
    }
  };

  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {/* Lesson Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-8">{lesson.title}</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="md:col-span-2">
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={lesson.videoUrl}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Ejemplos:</h3>
                <ul className="space-y-3">
                  {lesson.examples.map((example, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      <span className="text-orange-500 font-semibold mr-2">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <Button
              onClick={handlePrevious}
              disabled={currentLessonIndex === 0}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-6 text-lg"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Anterior
            </Button>
            
            <Button
              onClick={handleNext}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
            >
              {currentLessonIndex === mockLessons.length - 1 ? 'Finalizar' : 'Siguiente'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;