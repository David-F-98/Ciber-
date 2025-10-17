import React from 'react';
import Navigation from '../components/Navigation';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <h1 className="text-5xl font-bold mb-8">SOBRE NOSOTROS</h1>
            
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Este proyecto nació de una realidad que vemos todos los días: muchos dueños de 
                pequeños negocios no saben cómo protegerse en línea. No porque no les importe, 
                sino porque el tema de la ciberseguridad puede parecer complicado, técnico o 
                lejano a su día a día.
              </p>
              
              <p>
                Por eso creamos esta plataforma: para enseñar lo básico de forma clara, práctica 
                y útil. Sin tecnicismos innecesarios, sin complicaciones. Solo lo que realmente 
                necesitas saber para proteger tu negocio, tus datos y tu futuro.
              </p>
              
              <p>
                Nuestro equipo está formado por expertos en ciberseguridad, diseñadores y educadores 
                que creen que el conocimiento debe ser accesible para todos. Trabajamos desde la 
                Fundación Universitaria Compensar, una institución comprometida con la educación 
                y el desarrollo de las comunidades.
              </p>
              
              <p className="font-semibold">
                Porque cuando proteges tu negocio en línea, no solo cuidas tu información: 
                también cuidas tu esfuerzo, tu reputación y la confianza de tus clientes.
              </p>
            </div>
          </div>

          {/* Right - Images */}
          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop" 
                alt="Universidad Compensar" 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=300&fit=crop" 
                  alt="Estudiantes" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=300&fit=crop" 
                  alt="Campus" 
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;