# DESIGN.md — Sistema de Diseño Canónico: Distribuidora Mayorista & Logística B2B

## 1. Visual Theme & Atmosphere
- **Concepto**: Portal Mayorista Empresarial B2B, Logística de Abastecimiento & Central de Promociones por Volumen.
- **Atmósfera**: Centro de distribución y racks industriales de gran porte, camiones de reparto, pallets flejados, códigos de barras, precisión en stock, facturación corporativa (A y B) y volumen masivo con estética ejecutiva robusta.
- **Hero Archetype (Logistics Hub & Wholesale Deal Center)**:
  - Portada de alto impacto con nave logística y camiones de distribución.
  - Tipografía técnica pesada `Space Grotesk` y `Plus Jakarta Sans`.
  - Cinta superior de anuncios en tiempo real con días de reparto por zona y mínimo de compra.
  - Acceso directo a descarga de lista de precios y apertura de cuenta comercial.

## 2. Color Palette & Roles (Industrial Slate, Safety Amber & Precision White)
- **Fondo Base (Blanco Técnico / Gris Suave)**: `#f8fafc` / `#ffffff`
- **Fondo Secundario (Asfalto Slate Suave)**: `#f1f5f9` / `#e2e8f0`
- **Superficie Oscura (Navy Logístico)**: `#0b0f19` / `#1e293b`
- **Acento Primario (Ámbar Industrial / Amarillo Logístico)**: `#f59e0b` / `#fbbf24` (Energía comercial, ofertas, tracción)
- **Acento Secundario (Azul Logístico B2B)**: `#2563eb`
- **Acento de Éxito / Descuento (Verde Ahorro)**: `#16a34a`
- **Bordes & Grillas**: `#e2e8f0` / `#cbd5e1`
- **Texto Principal (Negro Carbón Industrial)**: `#0b0f19` (Contraste AAA)
- **Texto Secundario**: `#334155`
- **Texto Muted**: `#64748b`

## 3. Typography Rules
- **Display / Títulos**: `Space Grotesk`, tipografía geométrica industrial y de catálogo (Weights: 700, 800)
- **Cuerpo, Fichas de Bultos, SKU & Precios**: `Plus Jakarta Sans` e `Inter` (Weights: 500, 600, 700, 800)
- **Escala Anti-Gigantismo H1**: `font-size: clamp(2.2rem, 4.4vw, 3.8rem); line-height: 1.1; letter-spacing: -0.02em;`

## 4. Component Stylings & Interaction Model (B2B Wholesale Portal Engine)
- **Sección de Súper Promos & Combos Mayoristas**:
  - *Combo Kiosco Starter*: 12 packs de snacks, 24 cajas de chocolates y 48 bebidas con 20% de ahorro directo.
  - *Pack Almacén & Supermercado*: Aceites, harinas, pastas y conservas por pallet o medio pallet.
  - *Combo Gastronómico XXL*: Aceites x 10L, aderezos x 3kg y descartables para restaurantes.
- **Catálogo Multi-Categoría con Desglose por Bulto y Unidad**:
  - Selector de cantidad de bultos/cajas con indicador de unidades por bulto (x6, x12, x24).
  - Cálculo instantáneo del precio unitario de reventa para margen del comerciante.
  - Indicador de stock en tiempo real (En Stock / Últimos Pallets).
- **Bolsa / Carrito Mayorista con Barra de Mínimo de Compra ($180.000 ARS)**:
  - Selector de tipo de Facturación (*Factura A c/ CUIT* o *Factura B / Final*).
  - Selector de zona de entrega (*Mar del Plata, Batán, Miramar, Costa Atlántica, Tandil*).
  - Despacho estructurado de la comanda mayorista directamente al equipo de ventas por WhatsApp.
- **Descarga de Lista de Precios Oficial (Excel / PDF)**:
  - Botón de descarga directa con fecha de actualización quincenal.

## 5. Scroll & Motion Architecture
- Scroll ultra suave de 60fps con **Lenis + GSAP ScrollTrigger**.
