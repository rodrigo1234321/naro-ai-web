# DESIGN.md — Sistema de Diseño Canónico: Pet Shop, Centro Veterinario & Spa Canino

## 1. Visual Theme & Atmosphere
- **Concepto**: Cuidado Integral de Mascotas, Confianza Médica Veterinaria & Spa Canino de Alta Gama.
- **Atmósfera**: Luz natural, higiene clínica impecable, alegría animal, calidez, nutrición premium y bienestar para perros y gatos.
- **Hero Archetype (Warm Companion & Interactive Care Finder)**:
  - Portada con fotografía de perro feliz y médico veterinario.
  - Tipografía moderna, súper limpia y amigable: `Outfit` y `Plus Jakarta Sans`.
  - Badges de confianza: *"MÉDICOS MATRICULADOS · ENVÍO EN EL DÍA · URGENCIAS VETERINARIAS"*.
  - Acceso directo al Calculador de Alimento & Turnero de Peluquería.

## 2. Color Palette & Roles (Emerald Care, Warm Orange & Clinical White)
- **Fondo Base (Blanco Puro / Nieve Suave)**: `#ffffff` / `#f8fafc`
- **Fondo Secundario (Menta / Esmeralda Suave)**: `#ecfdf5` / `#d1fae5`
- **Superficie de Tarjeta**: `#ffffff` con borde delicado y sombra de elevación
- **Acento Primario (Verde Esmeralda Veterinario)**: `#059669` / `#047857` (Salud, vida, cuidado médico)
- **Acento Secundario (Naranja Cálido Pet / Vitalidad)**: `#f97316` / `#ea580c` (Energía, nutrición, premios)
- **Acento de Guardia (Rojo Urgencias)**: `#dc2626`
- **Bordes & Grillas**: `#e2e8f0` / `#a7f3d0`
- **Texto Principal (Obsidiana Carbón)**: `#0f172a` (Contraste AAA)
- **Texto Secundario**: `#334155`
- **Texto Muted**: `#64748b`

## 3. Typography Rules
- **Display / Títulos**: `Outfit`, display sans-serif moderno, redondeado, legible y de alta empatía (Weights: 700, 800, 900)
- **Cuerpo, Raciones & Formularios**: `Plus Jakarta Sans` e `Inter` (Weights: 500, 600, 700)
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.2rem, 4.4vw, 3.8rem); line-height: 1.1; letter-spacing: -0.02em;`

## 4. Component Stylings & Interaction Model (Pet Care & Vet Engine)
- **Calculador Interactivo de Ración & Alimento Ideal**:
  - Selector de Especie (*Perro / Gato*), Edad (*Cachorro / Adulto / Senior*) y Tamaño/Peso (*Mini <5kg, Mediano 5-15kg, Grande 15-30kg, Gigante >30kg*).
  - Cálculo instantáneo de la ración diaria en gramos ($g/día$), duración estimada de la bolsa de 15kg y recomendación de fórmula nutricional con botón de pedido con envío gratis.
- **Agendador de Turnos para Peluquería Canina & Spa**:
  - Selector de servicio (*Baño & Desparasitado, Corte de Raza, Corte Higiénico & Uñas, Deslanado con Turbina*).
  - Selector de tamaño del animal y horario para derivación a WhatsApp con reserva de turno.
- **Catálogo de Alimentos & Farmacia Veterinaria**:
  - Bolsas de 15kg/20kg con regalo (comedero o snacks incluidos).
  - Antiparasitarios, pipetas y accesorios.
  - Carrito lateral con envío gratis en compras mayores a $35.000 ARS.

## 5. Scroll & Motion Architecture
- Scroll ultra suave de 60fps con **Lenis + GSAP ScrollTrigger**.
