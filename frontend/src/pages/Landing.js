import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Navigation from '../components/Navigation';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Aprende Ciberseguridad y protege tu empresa
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              No sabes por dónde empezar con la ciberseguridad en tu pequeño negocio? 
              No te preocupes, no estás solo. Aquí te enseñamos lo básico de forma clara, 
              rápida y útil. Porque protegerte en línea también es cuidar tu trabajo, 
              tus datos y tu futuro.
            </p>
            <div className="flex space-x-4 pt-4">
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Regístrate
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-float">
            <img 
              src="/chicohome.png" 
              alt="Cybersecurity Learning" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;