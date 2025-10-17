import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, AlertTriangle, Lock } from 'lucide-react';
import { mockResources } from '../mock';

const Resources = () => {
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'Shield':
        return <Shield className="w-12 h-12" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-12 h-12" />;
      case 'Lock':
        return <Lock className="w-12 h-12" />;
      default:
        return <Shield className="w-12 h-12" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Test Banner */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-3">Test de Conocimiento</h2>
              <p className="text-lg text-white/90">
                Pon a prueba lo que has aprendido con nuestro test de ciberseguridad. 
                15 preguntas para evaluar tu conocimiento.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/test')}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Iniciar Test
            </Button>
          </div>
        </div>

        {/* Resources Section */}
        <div className="text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">Recursos</h1>
          <p className="text-lg text-white/90">
            Explora nuestros materiales de aprendizaje organizados por categorías
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {mockResources.map((resource) => (
            <Card 
              key={resource.id}
              className="bg-blue-900/90 backdrop-blur-sm border-0 text-white hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-xl"
              onClick={() => navigate(`/leccion/${resource.id}`)}
            >
              <CardHeader>
                <div className="mb-4 text-orange-400">
                  {getIcon(resource.icon)}
                </div>
                <CardTitle className="text-2xl font-bold">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {resource.topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      <span className="text-white/90">{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;