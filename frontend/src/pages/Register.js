import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(formData.nombre, formData.email, formData.password);
    
    setLoading(false);

    if (result.success) {
      toast({
        title: '¡Cuenta creada!',
        description: 'Tu cuenta ha sido creada exitosamente.',
      });
      navigate('/recursos');
    } else {
      toast({
        title: 'Error',
        description: result.error || 'No se pudo crear la cuenta',
        variant: 'destructive'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Logo and Back Link */}
        <div className="mb-8">
          <img src="/logoblanco.png" alt="Compensar Logo" className="h-12 mb-4" />
          <Link 
            to="/" 
            className="flex items-center text-white hover:text-orange-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          {/* Left - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Crea tu cuenta</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nombre" className="text-gray-700">Nombre Completo</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Olivia Jiménez"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hello@ucompensar.edu.co"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-6 text-lg font-semibold rounded-lg"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-2 border-blue-900 text-blue-900 hover:bg-blue-50 py-6 text-lg font-semibold rounded-lg"
              >
                Continua con email
              </Button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* Right - Image */}
          <div className="hidden md:block relative">
            <img 
              src="/chicaCrearCuenta.png" 
              alt="Create Account" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;