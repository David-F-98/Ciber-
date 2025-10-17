// Mock data for the cybersecurity training platform

export const mockUser = {
  id: '1',
  nombre: 'Olivia Jiménez',
  email: 'hello@ucompensar.edu.co',
  token: 'mock-jwt-token-123456'
};

export const mockResources = [
  {
    id: '1',
    title: 'Introducción general',
    icon: 'Shield',
    topics: [
      '¿Qué es la ciberseguridad?',
      '¿Por qué es importante la ciberseguridad en tu empresa?',
      'Principales riesgos digitales que enfrentan las pequeñas empresas',
      'Conceptos básicos de seguridad digital'
    ]
  },
  {
    id: '2',
    title: 'Amenazas comunes',
    icon: 'AlertTriangle',
    topics: [
      '¿Qué es el phishing y cómo identificarlo?',
      'Malware y ransomware: qué son y cómo protegerte',
      'Ataques de ingeniería social',
      'Vulnerabilidades en contraseñas débiles'
    ]
  },
  {
    id: '3',
    title: 'Buenas prácticas básicas',
    icon: 'Lock',
    topics: [
      'Cómo crear contraseñas seguras',
      'Uso de autenticación de dos factores (2FA)',
      'Actualizaciones de software: por qué son importantes',
      'Respaldo de información crítica'
    ]
  }
];

export const mockLessons = [
  {
    id: '1',
    resourceId: '1',
    title: 'Lección 1: ¿Qué es la ciberseguridad?',
    videoUrl: 'https://www.youtube.com/embed/SZlnyFujkGE',
    description: 'La ciberseguridad es el conjunto de prácticas, tecnologías y procesos diseñados para proteger sistemas, redes, programas y datos de ataques digitales.',
    examples: [
      'Imagina que tu negocio es como una casa: cerrar las puertas con llave es seguridad física. La ciberseguridad es como poner alarmas, cerraduras digitales y protección en todo lo que haces en línea.',
      'Ejemplo 1: Un correo sospechoso que te pide tus datos bancarios. La ciberseguridad te enseña a identificarlo.',
      'Ejemplo 2: Una contraseña débil (como "12345") permite que alguien entre a tu sistema fácilmente. Con ciberseguridad, aprendes a crear contraseñas fuertes.'
    ]
  },
  {
    id: '2',
    resourceId: '1',
    title: 'Lección 2: ¿Por qué es importante la ciberseguridad en tu empresa?',
    videoUrl: 'https://www.youtube.com/embed/SZlnyFujkGE',
    description: 'Las pequeñas empresas son objetivos comunes de ciberataques porque suelen tener menos medidas de seguridad que las grandes corporaciones.',
    examples: [
      'Proteger la información de tus clientes (nombres, direcciones, datos de pago).',
      'Evitar pérdidas económicas por fraudes o robos de información.',
      'Mantener la confianza de tus clientes y la reputación de tu negocio.'
    ]
  }
];

export const mockQuestions = [
  {
    id: '1',
    question: '¿Qué es el "phishing" en el contexto de la ciberseguridad?',
    options: [
      'Una técnica para pescar información personal mediante engaños',
      'Un tipo de software malicioso que cifra archivos',
      'Un método para crear contraseñas seguras',
      'Una herramienta de protección antivirus'
    ],
    correctAnswer: 0
  },
  {
    id: '2',
    question: '¿Cuál es la principal característica de una contraseña segura?',
    options: [
      'Ser fácil de recordar como "123456"',
      'Tener al menos 8 caracteres con mayúsculas, minúsculas, números y símbolos',
      'Usar solo letras minúsculas',
      'Ser la misma para todas tus cuentas'
    ],
    correctAnswer: 1
  },
  {
    id: '3',
    question: '¿Qué es el ransomware?',
    options: [
      'Un programa de protección de datos',
      'Un tipo de correo electrónico',
      'Un malware que cifra tus archivos y pide un rescate para desbloquearlos',
      'Una técnica de respaldo de información'
    ],
    correctAnswer: 2
  },
  {
    id: '4',
    question: '¿Por qué es importante mantener el software actualizado?',
    options: [
      'Para tener nuevas funciones solamente',
      'Para corregir vulnerabilidades de seguridad que pueden ser explotadas',
      'No es necesario actualizarlo',
      'Solo para mejorar el rendimiento'
    ],
    correctAnswer: 1
  },
  {
    id: '5',
    question: '¿Qué es la autenticación de dos factores (2FA)?',
    options: [
      'Usar dos contraseñas diferentes',
      'Una capa adicional de seguridad que requiere dos formas de verificación',
      'Iniciar sesión dos veces',
      'Tener dos cuentas de correo'
    ],
    correctAnswer: 1
  }
];