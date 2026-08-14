# Guión Estratégico de Prospección en Frío & Hook de Alta Conversión (para Cloudflare Pages)

Esta guía contiene la estrategia exacta y las plantillas de mensaje para prospectar negocios locales en Mar del Plata. El método se basa en **demostración previa (Show, Don't Tell)**: les envías su sitio web ya subido y funcionando en **Cloudflare Pages**, generando curiosidad inmediata y la necesidad de compra.

---

## 🎯 La Estrategia de Venta: "Demostración de Impacto en 1 Clic"

### Por qué funciona este enfoque:
1. **Rompe la barrera del spam**: No vendes una promesa futura; les estás entregando algo tangible que ya existe con **su propio nombre, dirección y WhatsApp**.
2. **Genera FOMO y Orgullo**: Al verse reflejados en un diseño profesional en su teléfono, sienten el contraste con su presencia actual (o la falta de ella) y no quieren perderlo.
3. **Elimina el riesgo percibido**: No hay incertidumbre. Ven el producto terminado antes de poner un solo peso.

---

## 💬 Guión Maestro de Contacto por WhatsApp / Instagram DM

### 🔹 Estructura en 3 Pasos de Alta Conversión

#### PASO 1: El Hook (El Gancho Inicial)
> *"¡Hola [Nombre del Negocio / Dueño]! ¿Cómo estás? Te hablo rápido porque estaba buscando [Rubro del negocio, ej: consultorios / hamburguesería / repuestos] por la zona de [Dirección / Calle de Mar del Plata] y vi que en Google Maps y redes tienen muy buenas referencias."*

#### PASO 2: La Generación de la Necesidad & Muestra de la Web (La Carnada)
> *"Noté que cuando la gente los busca desde el celular antes de ir o pedir, no tienen una web rápida donde ver [los servicios / el menú / los turnos / el catálogo] ordenado con botón directo a su WhatsApp.*
> 
> *Como me gusta el local y trabajo armando webs para comercios de Mar del Plata, **les diseñé una versión web moderna y súper rápida adaptada para celular**.*
> 
> *Podés ver cómo quedó directamente acá desde tu cel:*  
> 🔗 **https://[nombre-del-local].pages.dev**"

#### PASO 3: Cierre de Cero Riesgo & Llamado a la Acción (CTA)
> *"Hacé clic en el link y mirala un segundo. Si te gusta cómo quedó, te la dejo activa hoy mismo con tu propio dominio a un precio súper accesible para que empiecen a recibir clientes directo al WhatsApp.*
> 
> *Si querés sumarle algún producto, cambiar fotos o ajustar algo, me decís y lo hacemos en 5 minutos. ¿Qué te parece?"*

---

## 🎨 Variaciones del Hook por Rubro Especializado

### 🍕 1. Gastronomía & Delivery (Pizzerías, Hamburgueserías, Cafés)
> **Hook de dolor**: *"La mayoría de los clientes abandonan la compra si tienen que pedir un PDF pesado por WhatsApp o esperar que les pasen la carta por mensaje."*
> 
> **Frase de impacto**: *"Con esta web el cliente entra desde Google, elige el combo con las fotos que dan ganas de comer, y te llega el pedido armadito directo a tu WhatsApp sin hacerlos esperar."*

### 🩺 2. Salud, Clínicas & Estética (Consultorios, Médicos, Masajes, Peluquerías)
> **Hook de dolor**: *"Muchos pacientes se van a otro centro si no encuentran rápido la lista de especialidades o si tienen que llamar por teléfono en horario comercial para pedir turno."*
> 
> **Frase de impacto**: *"Con esta landing el paciente ve los tratamientos, la ubicación exacta en Mar del Plata y hace clic en 'Reservar Turno por WhatsApp' a cualquier hora del día."*

### 👗 3. Showrooms, Indumentaria & Calzado
> **Hook de dolor**: *"En Instagram las historias se borran a las 24 hs y responder 'precio por privado' hace que el 70% de las interesadas no vuelva a contestar."*
> 
> **Frase de impacto**: *"Con este showroom web tenés la nueva colección exhibida 24/7 con fotos, talles y botón directo de compra por WhatsApp."*

### 🔑 4. Inmobiliarias & Tasaciones
> **Hook de dolor**: *"Los inversores y compradores que buscan propiedades en Mar del Plata exigen fichas limpias con fotos de calidad y mapa de ubicación."*
> 
> **Frase de impacto**: *"Armé este portal con buscador de propiedades y botón de tasación exprés para que te contacten directo desde el celular."*

### 🔧 5. Automotriz, Talleres & Servicios
> **Hook de dolor**: *"Cuando a alguien se le rompe el auto o busca un repuesto en Mar del Plata, busca en Google y llama al primero que le dé confianza visual."*
> 
> **Frase de impacto**: *"Esta landing le transmite al cliente autoridad inmediata, listado de repuestos/servicios y un botón gigante para pedir presupuesto al instante."*

---

## 🚀 Flujo Operativo: De la Generación al Despliegue en Cloudflare Pages

1. **Generar la Landing**:
   - Usas el prompt listo de la hoja Excel `PROSPECCION_100_PROMPTS_OPEN_DESIGN.xlsx` en Open Design.
   - El artefacto se guarda en `webs/[nombre-slug]/index.html`.

2. **Subir a Cloudflare Pages**:
   - Creas un proyecto en Cloudflare Pages conectado a tu carpeta o vía Wrangler CLI:
     ```bash
     npx wrangler pages deploy webs/[nombre-slug] --project-name=[nombre-slug]-mdp
     ```
   - Te devuelve la URL pública: `https://[nombre-slug]-mdp.pages.dev`.

3. **Enviar el Mensaje de Prospección**:
   - Tomas el número de la columna `Número` del Excel.
   - Envías el guión por WhatsApp sustituyendo el link `https://[nombre-slug]-mdp.pages.dev`.

4. **Manejo de Objeciones Frecuentes**:
   - **"¿Cuánto sale?"**: *"Es súper económico porque la web ya la tengo maquetada. Sale solo [Monto fijo accesible, ej: $25.000 / $35.000 ARS pago único] e incluye la carga en tu propio dominio."*
   - **"Ya tengo Instagram"**: *"¡Buenísimo! La web no reemplaza tu Instagram, lo potencia. La pones en el link de tu bio para que la gente vea el catálogo ordenado sin perderse en el feed."*
