/* ═══════════════════════════════════════
   DUAL CODE SOLUTIONS — Universo 3D (Tech Planet)
   js/space.js
═══════════════════════════════════════ */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';

export function initSpace(canvas) {
    const scene = new THREE.Scene();

    // Cámara: (Campo de visión, Proporción, Distancia mínima, Distancia máxima)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 30; // Ajustado para el nuevo tamaño del planeta (radio 10)

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización para pantallas Retina

    // 2. CREANDO EL FONDO ESTELAR
    const particlesCount = 2000; // Cantidad de estrellas
    const posArray = new Float32Array(particlesCount * 3); // x, y, z por cada estrella

    // Llenamos el arreglo con posiciones aleatorias muy dispersas
    for(let i = 0; i < particlesCount * 3; i++) {
        // Math.random() - 0.5 centra las estrellas alrededor del punto 0,0,0
        posArray[i] = (Math.random() - 0.5) * 1000; 
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // El material de nuestras estrellas (puntos blancos pequeños)
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.8,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending // Hace que la luz se sume, dando un brillo más realista
    });

    // Combinamos geometría y material y lo añadimos a la escena
    const starMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(starMesh);

    // 1. EL NUEVO MATERIAL TECNOLÓGICO (ShaderMaterial)
    const techUniforms = {
        uTime: { value: 0 },
        uTechColor: { value: new THREE.Color(0x00ffff) }, // Cyan por defecto
        uDensity: { value: 1.0 }
    };

    const planetGeometry = new THREE.SphereGeometry(10, 128, 128); // Más segmentos para suavidad
    const techPlanetMaterial = new THREE.ShaderMaterial({
        uniforms: techUniforms,
        
        // Shader de Vértices (Maneja la forma y luz)
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        
        // Shader de Fragmentos (Maneja el color y la textura procedural)
        // Este genera una cuadrícula y puntos de luz que "parpadean"
        fragmentShader: `
            uniform float uTime;
            uniform vec3 uTechColor;
            uniform float uDensity;
            varying vec2 vUv;
            varying vec3 vNormal;

            // Función de ruido para crear "Continentes Tecnológicos"
            float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
            float noise(vec2 st) {
                vec2 i = floor(st); vec2 f = fract(st);
                float a = random(i); float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            void main() {
                // Iluminación básica
                vec3 light = normalize(vec3(-1.0, 1.0, 1.0));
                float shading = max(dot(vNormal, light), 0.1); 
                
                // Superficie base: un negro azulado muy profundo
                vec3 surfaceColor = vec3(0.01, 0.01, 0.02) * shading;

                // 1. Zonas de actividad (Continentes)
                // Usamos ruido para decidir dónde hay ciudades/circuitos y dónde hay "océanos" oscuros
                float continent = smoothstep(0.4, 0.6, noise(vUv * 8.0));

                // 2. Cuadrícula fina (Las líneas de los circuitos)
                vec2 gridUV = vUv * 150.0 * uDensity; // Escala multiplicada para líneas finas
                vec2 grid = fract(gridUV);
                
                // Usamos smoothstep para que las líneas sean delgadas y nítidas
                float lineX = smoothstep(0.95, 1.0, grid.x);
                float lineY = smoothstep(0.95, 1.0, grid.y);
                float circuits = max(lineX, lineY);

                // 3. Nodos de información (Puntos brillantes que parpadean)
                float nodeRandom = random(floor(gridUV));
                float nodes = step(0.98, nodeRandom); 
                // Hacemos que parpadeen asíncronamente
                float flicker = sin(uTime * 4.0 + nodeRandom * 20.0) * 0.5 + 0.5;

                // 4. Combinar todo
                // Los circuitos y nodos solo brillan si están dentro de un "continente"
                float techIntensity = (circuits * 0.3 + nodes * flicker * 2.0) * continent;
                
                // Aplicamos el color cyan y multiplicamos por el sombreado para que se oculte en el lado oscuro
                vec3 techGlow = uTechColor * techIntensity * shading;

                gl_FragColor = vec4(surfaceColor + techGlow, 1.0);
            }
        `
    });

    const planet = new THREE.Mesh(planetGeometry, techPlanetMaterial);
    const profundidad = -70; // Valor negativo para alejarlo más (mayor profundidad)
    const finalPlanetPos = new THREE.Vector3(35, 26, profundidad); // Movido aún más arriba y a la derecha
    planet.position.copy(finalPlanetPos); // Descentralizado
    scene.add(planet);

    // LA ATMÓSFERA (Usando el truco del Side rendering)
    // Esta es la clave para que no parezca solo una bola
    const atmosGeometry = new THREE.SphereGeometry(10.2, 128, 128);
    const atmosMaterial = new THREE.MeshBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending, // Suma luz
        side: THREE.BackSide              // Renderiza el interior de la esfera
    });
    const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    atmosphere.position.copy(finalPlanetPos); // Asegúrate de mover la atmósfera también
    scene.add(atmosphere);

    // LUZ DIRECCIONAL CINEMÁTICA
    // Debe ser fuerte y venir de un lado para definir el relieve
    const dramaticLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dramaticLight.position.set(-20, 10, 15);
    scene.add(dramaticLight);

    // Luz ambiental muy tenue para que las sombras no sean 100% negras
    const ambient = new THREE.AmbientLight(0x111111);
    scene.add(ambient);

    // EL CINTURÓN DE ASTEROIDES
    const asteroidCount = 10000;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array(asteroidCount * 3);

    for (let i = 0; i < asteroidCount; i++) {
        const i3 = i * 3;
        const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
        const radius = 15 + Math.random() * 10;   // Radio entre 15 y 25
        
        ringPos[i3] = Math.cos(angle) * radius;   // X
        ringPos[i3 + 1] = (Math.random() - 0.5) * 1.5; // Y (Grosor del anillo)
        ringPos[i3 + 2] = Math.sin(angle) * radius;   // Z
    }

    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));

    const ringMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x88ccff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const asteroidRing = new THREE.Points(ringGeo, ringMat);
    // Lo posicionamos exactamente donde está el planeta
    asteroidRing.position.copy(finalPlanetPos);
    scene.add(asteroidRing);

    // EL NÚCLEO DEL COMETA
    const cometGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const cometMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x88ccff, 
        transparent: true,
        opacity: 0.9 
    });
    const comet = new THREE.Mesh(cometGeometry, cometMaterial);
    scene.add(comet);

    // LA ESTELA (Cola del cometa)
    const tailLength = 60; // Cuántas partículas forman la cola
    const tailPositions = new Float32Array(tailLength * 3);
    const tailGeometry = new THREE.BufferGeometry();
    tailGeometry.setAttribute('position', new THREE.BufferAttribute(tailPositions, 3));

    const tailMaterial = new THREE.PointsMaterial({
        color: 0x4488ff,
        size: 0.3,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending // Para que brille como gas incandescente
    });
    const cometTail = new THREE.Points(tailGeometry, tailMaterial);
    scene.add(cometTail);

    // Variables para la trayectoria
    let cometAngle = 0;
    let isCometStriking = false;

    const onCometStrike = (e) => {
        isCometStriking = true;
        // Posicionar el cometa lejos antes del impacto
        comet.position.set(60, 40, -10);
        
        // Animar su posición hasta el centro de la pantalla
        gsap.to(comet.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: e.detail?.duration || 0.5,
            ease: 'power2.in',
            onComplete: () => {
                // Al golpear, el cometa y su estela desaparecen
                cometMaterial.opacity = 0;
                tailMaterial.opacity = 0;
            }
        });
    };
    window.addEventListener('trigger-comet', onCometStrike);

    // ── EXPLOSIÓN DEL PLANETA ─────────────────────────────────────────
    const onPlanetExplosion = () => {
        // 1. Flash de luz — el planeta se pone blanco y crece antes de reventar
        gsap.to(planet.scale, {
            x: 2.8, y: 2.8, z: 2.8,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
                // Ocultar el planeta y atmósfera
                planet.visible = false;
                atmosphere.visible = false;

                // 2. Crear nube de escombros (400 partículas)
                const debrisCount = 400;
                const debrisGeo = new THREE.BufferGeometry();
                const debrisPos = new Float32Array(debrisCount * 3);
                const debrisVel = [];

                for (let i = 0; i < debrisCount; i++) {
                    // Todos empiezan en la posición del planeta
                    debrisPos[i * 3]     = finalPlanetPos.x;
                    debrisPos[i * 3 + 1] = finalPlanetPos.y;
                    debrisPos[i * 3 + 2] = finalPlanetPos.z;
                    // Velocidad aleatoria en todas direcciones
                    debrisVel.push({
                        x: (Math.random() - 0.5) * 1.8,
                        y: (Math.random() - 0.5) * 1.8,
                        z: (Math.random() - 0.5) * 1.8,
                    });
                }

                debrisGeo.setAttribute('position', new THREE.BufferAttribute(debrisPos, 3));

                const debrisMat = new THREE.PointsMaterial({
                    size: 0.4,
                    color: 0x88ccff,
                    transparent: true,
                    opacity: 1.0,
                    blending: THREE.AdditiveBlending,
                });

                const debris = new THREE.Points(debrisGeo, debrisMat);
                scene.add(debris);

                // 3. Flash de luz cegador
                ambient.color.setHex(0x4488ff);
                ambient.intensity = 8.0;
                gsap.to(ambient, {
                    intensity: 0.1,
                    duration: 1.8,
                    ease: 'power3.out',
                    onComplete: () => ambient.color.setHex(0x111111)
                });
                bloomPass.strength = 4.0;
                gsap.to(bloomPass, { strength: 1.5, duration: 2.0, ease: 'power2.out' });

                // 4. Animar escombros expandiéndose
                let frame = 0;
                const expandDebris = () => {
                    if (!debris.parent) return;
                    frame++;
                    const pos = debrisGeo.attributes.position.array;
                    const drag = 0.97; // Fricción — los escombros frenan
                    for (let i = 0; i < debrisCount; i++) {
                        debrisVel[i].x *= drag;
                        debrisVel[i].y *= drag;
                        debrisVel[i].z *= drag;
                        pos[i * 3]     += debrisVel[i].x;
                        pos[i * 3 + 1] += debrisVel[i].y;
                        pos[i * 3 + 2] += debrisVel[i].z;
                    }
                    debrisGeo.attributes.position.needsUpdate = true;
                    if (frame < 180) requestAnimationFrame(expandDebris);
                };
                expandDebris();

                // 5. Desvanecer los escombros y cinturón
                gsap.to(debrisMat, { opacity: 0, duration: 3.0, delay: 1.2, ease: 'power2.in',
                    onComplete: () => scene.remove(debris)
                });
                gsap.to(ringMat, { opacity: 0, duration: 2.0, ease: 'power2.in' });
            }
        });

        // Flash de color blanco en el planeta mientras crece
        gsap.to(techUniforms.uTechColor.value, {
            r: 1, g: 1, b: 1,
            duration: 0.3,
            ease: 'power3.out'
        });
    };
    
    window.addEventListener('trigger-planet-explosion', onPlanetExplosion);

    function updateComet() {
        if (!isCometStriking) {
            // A. Mover el núcleo en una órbita amplia (trayectoria elíptica)
            cometAngle += 0.01;
            // Multiplicamos por valores grandes para que pase por detrás o muy lejos
            const x = Math.cos(cometAngle) * 40; 
            const y = Math.sin(cometAngle * 0.5) * 10; // Variación en altura
            const z = Math.sin(cometAngle) * 30 - 20;  // Profundidad (negativo para ir atrás)
            
            comet.position.set(x, y, z);
        }

        // B. Actualizar la estela (Desplazar las posiciones anteriores)
        const positions = cometTail.geometry.attributes.position.array;
        
        // Movemos cada punto a la posición del punto que tenía delante
        for (let i = tailLength - 1; i > 0; i--) {
            positions[i * 3] = positions[(i - 1) * 3];
            positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
            positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
        }
        
        // El primer punto de la cola toma la posición actual del núcleo
        positions[0] = comet.position.x;
        positions[1] = comet.position.y;
        positions[2] = comet.position.z;

        // Le decimos a Three.js que las posiciones cambiaron y debe re-dibujar
        cometTail.geometry.attributes.position.needsUpdate = true;
    }

    // Variables para rastrear el ratón
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Encontramos el centro de la pantalla
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // Escuchamos cada vez que el usuario mueve el ratón
    const onMouseMove = (event) => {
        // Calculamos la posición del ratón relativa al centro de la pantalla
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onMouseMove);

    // --- CONFIGURACIÓN DE POST-PROCESAMIENTO (BLOOM) ---

    // 1. Creamos el RenderPass (la imagen base de tu escena)
    const renderScene = new RenderPass(scene, camera);

    // 2. Creamos el BloomPass (el resplandor)
    // Parámetros: (Resolución, Fuerza del brillo, Radio del brillo, Umbral de luz)
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), 
        1.5,  // Fuerza (ajusta esto si brilla mucho o poco)
        0.4,  // Radio
        0.85  // Umbral: Solo brillarán las cosas muy claras (como tu color cyan)
    );

    // 3. Creamos el Composer y le añadimos los pases
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. EL BUCLE DE ANIMACIÓN
    const clock = new THREE.Clock();
    let reqId;

    function animate() {
        reqId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotación ultra lenta del fondo estelar para dar sensación de inmensidad
        starMesh.rotation.y = elapsedTime * 0.02;
        starMesh.rotation.x = elapsedTime * 0.01;

        // Actualizamos el tiempo en el shader para las animaciones tecnológicas
        techUniforms.uTime.value = elapsedTime;

        // Rotación del planeta y la atmósfera
        planet.rotation.y += 0.002;
        atmosphere.rotation.y += 0.002;

        // Rotación del cinturón de asteroides
        asteroidRing.rotation.y += 0.001; 
        asteroidRing.rotation.z += 0.0001; // Ligera inclinación

        // Actualizar la posición y estela del cometa
        updateComet();

        // LA MAGIA DEL PARALLAX
        // Reducimos drásticamente los valores del ratón para que el movimiento sea sutil
        targetX = mouseX * 0.005; 
        targetY = mouseY * 0.005;

        // Fórmula de interpolación suave: Posición Actual += (Objetivo - Posición Actual) * Velocidad
        camera.position.x += (targetX - camera.position.x) * 0.05;
        
        // Invertimos el eje Y (-targetY) para que el movimiento se sienta más natural (como mover la cabeza)
        camera.position.y += (-targetY - camera.position.y) * 0.05; 

        // MUY IMPORTANTE: Hacemos que la cámara siempre mire al centro de la escena (0,0,0)
        // Así, aunque la cámara se desplace hacia los lados, el planeta central no se escapa de la vista.
        camera.lookAt(scene.position);

        composer.render();
    }

    animate();

    // 4. RESPONSIVIDAD (Si el usuario cambia el tamaño de la ventana)
    const onResize = () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight); // Añadido para actualizar el tamaño del post-procesamiento
    };
    window.addEventListener('resize', onResize);

    return () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('trigger-comet', onCometStrike);
        window.removeEventListener('trigger-planet-explosion', onPlanetExplosion);
        renderer.dispose();
    };
}
