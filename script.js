/**
 * STATISTICAL DASHBOARD ENGINE - v1.1
 * Developed by OMMM
 * Full multi-language support (ES/EN)
 */

// ==========================================
// 1. GLOBAL STATE & CONFIGURATION
// ==========================================
let miHistograma = null, miPoligono = null, miOjiva = null, miPareto = null;
let treeData = null, selectedNode = null;
let listaConjuntos = [], contadorLetras = 0, pasosOperacion = [];
let datosFijos = [];

const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const EMOJIS = ["🍎", "🚀", "💎", "🎯", "⚡", "🍀", "🔥", "🎨", "🌈", "🍕", "🎈", "🔑"];

const SUN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const MOON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const TRADUCCIONES = {
    es: {
        header_dashboard: '🌐 | Dashboard Estadístico',
        sidebar_title: '📊 | Analítica',
        nav_table: 'Tabla de Frecuencias',
        nav_tendency: 'Medidas de Tendencia',
        nav_charts: 'Gráficas Estadísticas',
        nav_sets: 'Operaciones en Conjunto',
        nav_prob: 'Probabilidades',
        nav_multi: 'Regla Multiplicativa',
        nav_counting: 'Permutaciones / Combinaciones',
        nav_general: 'Vista General (Todo)',
        nav_separator: 'Gestión',
        nav_mgmt: 'Panel de Gestión',
        card_data_input: '📥 | Entrada de Datos',
        label_random_sample: 'Muestra Aleatoria (Sistema)',
        hint_generate: 'Haz clic en el botón de refresco para generar datos...',
        label_manual_data: 'Datos Manuales',
        input_manual_placeholder: 'Ej: 10, 25, 30...',
        btn_update: 'Actualizar y Calcular',
        card_tendency: '📈 | Medidas de Tendencia',
        stat_mean: 'Media (x̄)',
        stat_median: 'Mediana (Me)',
        stat_mode: 'Moda (Mo)',
        card_visualization: '📊 | Visualización Avanzada',
        chart_histogram: 'Histograma de Frecuencias',
        chart_polygon: 'Polígono de Frecuencias',
        chart_trend: 'Tendencia',
        chart_ogive: 'Ojiva (Frecuencia Acumulada)',
        chart_pareto: 'Diagrama de Pareto',
        chart_pareto_line: '% Acumulado',
        card_table: '📋 | Tabla de Frecuencias',
        table_total: 'TOTAL',
        table_no_data: 'Sin datos registrados',
        table_col_class: 'Clase (Intervalo)',
        table_col_mark: 'Marca (xᵢ)',
        table_col_f: 'Frec. Absoluta (fᵢ)',
        table_col_F: 'Frec. Acumulada (Fᵢ)',
        table_col_fr: 'Frec. Relativa (frᵢ%)',
        table_col_Fr: 'Frec. Rel. Acum. (Frᵢ%)',
        card_sets: '🔗 | Operaciones en Conjunto',
        hint_no_sets: 'No hay conjuntos creados',
        hint_add_sets: 'Pulsa el botón superior para empezar a operar.',
        btn_add_set: '+ Añadir Conjunto',
        config_op: 'Configurar Operación',
        mode_advanced: 'MODO AVANZADO',
        btn_execute: 'Ejecutar Operación',
        formula_hint: 'Solo letras de conjuntos, paréntesis y símbolos (∪, ∩, -, Δ).',
        btn_calc_formula: 'Calcular Fórmula Compleja',
        card_prob_classical: '🎲 | Probabilidad Clásica',
        label_fav_cases: 'Casos Favorables (n)',
        label_total_cases: 'Casos Totales (N)',
        hint_fav: 'Resultados que cumplen la condición.',
        hint_total: 'Total de resultados posibles.',
        btn_calc_prob: 'Calcular Probabilidad P(A)',
        card_multiplicative: '🌿 | Regla Multiplicativa & Árbol',
        btn_random_exercise: 'Ejercicio Aleatorio',
        label_diagram_design: 'Diseño del Diagrama',
        selected_point: '📍 Punto Seleccionado:',
        change_point_name: 'Cambiar nombre:',
        add_option: 'Añadir nueva opción (hijo)',
        label_prob_option: 'Probabilidad (0-1)',
        btn_add_option: '+ Añadir Opción',
        label_context: 'Contexto del Problema',
        path_result: 'Resultado del Camino',
        path_hint: 'Clic en una opción final para calcular.',
        canvas_nav_hint: 'Scroll/Drag para navegar',
        card_conteo: '🔢 | Permutaciones y Combinaciones',
        perm_title: 'P(n, r) - Permutaciones',
        perm_hint: 'El orden SÍ importa.',
        total_elements: 'Total (n)',
        select_elements: 'Elegir (r)',
        btn_calc_perm: 'Calcular P(n, r)',
        comb_title: 'C(n, r) - Combinaciones',
        comb_hint: 'El orden NO importa.',
        btn_calc_comb: 'Calcular C(n, r)',
        card_gestion: '⚙️ | Gestión de Proyecto',
        export_title: 'Exportar Reporte y Proyecto',
        export_desc: 'Genera un Excel y un respaldo JSON.',
        btn_prepare_dl: 'Preparar Descargas',
        import_title: 'Cargar Proyecto',
        import_desc: 'Selecciona un archivo .json para restaurar.',
        btn_select_file: 'Seleccionar Archivo',
        alert_system: 'Aviso del Sistema',
        btn_close: 'Cerrar',
        btn_confirm: 'Confirmar',
        footer_dev: 'Desarrollado por OMMM',
        vistas: {
            general: "🌐 | Vista General",
            tabla: "📋 | Tabla de Frecuencias",
            tendencia: "📈 | Medidas de Tendencia",
            graficas: "📊 | Gráficas Estadísticas",
            conjuntos: "🔗 | Operaciones en Conjunto",
            probabilidades: "🎲 | Sección de Probabilidades",
            multiplicativa: "🌿 | Regla Multiplicativa",
            conteo: "🔢 | Permutaciones y Combinaciones",
            gestion: "⚙️ | Panel de Gestión"
        }
    },
    en: {
        header_dashboard: '🌐 | Statistical Dashboard',
        sidebar_title: '📊 | Analytics',
        nav_table: 'Frequency Table',
        nav_tendency: 'Tendency Measures',
        nav_charts: 'Statistical Charts',
        nav_sets: 'Set Operations',
        nav_prob: 'Probabilities',
        nav_multi: 'Multiplicative Rule',
        nav_counting: 'Permutations / Combinations',
        nav_general: 'General View (All)',
        nav_separator: 'Management',
        nav_mgmt: 'Management Panel',
        card_data_input: '📥 | Data Entry',
        label_random_sample: 'Random Sample (System)',
        hint_generate: 'Click the refresh button to generate data...',
        label_manual_data: 'Manual Data',
        input_manual_placeholder: 'Ex: 10, 25, 30...',
        btn_update: 'Update and Calculate',
        card_tendency: '📈 | Tendency Measures',
        stat_mean: 'Mean (x̄)',
        stat_median: 'Median (Me)',
        stat_mode: 'Mode (Mo)',
        card_visualization: '📊 | Advanced Visualization',
        chart_histogram: 'Frequency Histogram',
        chart_polygon: 'Frequency Polygon',
        chart_trend: 'Trend',
        chart_ogive: 'Ogive (Cumulative Frequency)',
        chart_pareto: 'Pareto Chart',
        chart_pareto_line: '% Cumulative',
        card_table: '📋 | Frequency Table',
        table_total: 'TOTAL',
        table_no_data: 'No data recorded',
        table_col_class: 'Class (Interval)',
        table_col_mark: 'Mark (xᵢ)',
        table_col_f: 'Abs. Freq. (fᵢ)',
        table_col_F: 'Cum. Freq. (Fᵢ)',
        table_col_fr: 'Rel. Freq. (frᵢ%)',
        table_col_Fr: 'Cum. Rel. Freq. (Frᵢ%)',
        card_sets: '🔗 | Set Operations',
        hint_no_sets: 'No sets created yet',
        hint_add_sets: 'Click the button above to start operating.',
        btn_add_set: '+ Add Set',
        config_op: 'Configure Operation',
        mode_advanced: 'ADVANCED MODE',
        btn_execute: 'Execute Operation',
        formula_hint: 'Only set letters, parentheses and symbols allowed (∪, ∩, -, Δ).',
        btn_calc_formula: 'Calculate Complex Formula',
        card_prob_classical: '🎲 | Classical Probability',
        label_fav_cases: 'Favorable Cases (n)',
        label_total_cases: 'Total Cases (N)',
        hint_fav: 'Outcomes meeting the condition.',
        hint_total: 'Total number of possible outcomes.',
        btn_calc_prob: 'Calculate Probability P(A)',
        card_multiplicative: '🌿 | Multiplicative Rule & Tree',
        btn_random_exercise: 'Random Exercise',
        label_diagram_design: 'Diagram Design',
        selected_point: '📍 Selected Point:',
        change_point_name: 'Change name:',
        add_option: 'Add new option (child)',
        label_prob_option: 'Probability (0-1)',
        btn_add_option: '+ Add Option',
        label_context: 'Problem Context',
        path_result: 'Path Result',
        path_hint: 'Click on a final option to calculate.',
        canvas_nav_hint: 'Use Scroll/Drag to navigate',
        card_conteo: '🔢 | Permutations and Combinations',
        perm_title: 'P(n, r) - Permutations',
        perm_hint: 'Order DOES matter.',
        total_elements: 'Total (n)',
        select_elements: 'Choose (r)',
        btn_calc_perm: 'Calculate P(n, r)',
        comb_title: 'C(n, r) - Combinations',
        comb_hint: 'Order DOES NOT matter.',
        btn_calc_comb: 'Calculate C(n, r)',
        card_gestion: '⚙️ | Project Management',
        export_title: 'Export Report and Project',
        export_desc: 'Generate Excel and JSON backup.',
        btn_prepare_dl: 'Prepare Downloads',
        import_title: 'Load Saved Project',
        import_desc: 'Select a .json file to restore progress.',
        btn_select_file: 'Select File',
        alert_system: 'System Alert',
        btn_close: 'Close',
        btn_confirm: 'Confirm',
        footer_dev: 'Developed by OMMM',
        vistas: {
            general: "🌐 | General View",
            tabla: "📋 | Frequency Table",
            tendencia: "📈 | Tendency Measures",
            graficas: "📊 | Statistical Charts",
            conjuntos: "🔗 | Set Operations",
            probabilidades: "🎲 | Probability Section",
            multiplicativa: "🌿 | Multiplicative Rule",
            conteo: "🔢 | Permutations and Combinations",
            gestion: "⚙️ | Management Panel"
        }
    }
};

// ==========================================
// 2. UI & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Theme
    const isLight = localStorage.getItem('theme') === 'light';
    if (isLight) document.body.classList.add('light-mode');
    updateThemeIcon(isLight);

    // 2. Init Language
    const savedLang = localStorage.getItem('pref_lang') || 'es';
    cambiarIdioma(savedLang);

    // 3. Init Data
    cambiarVista('tabla');
    actualizarTodo();

    // 4. Bind Global Events
    const btnTheme = document.getElementById('theme-toggle');
    if (btnTheme) {
        btnTheme.onclick = () => {
            document.body.classList.toggle('light-mode');
            const isNowLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
            updateThemeIcon(isNowLight);
            actualizarColoresGrafica();
        };
    }

    const inputManual = document.getElementById('input-manual');
    if (inputManual) {
        inputManual.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); actualizarTodo(); }
        });
    }

    // Handle Canvas Resize
    window.addEventListener('resize', () => {
        if (document.getElementById('modulo-multiplicativa')?.style.display !== 'none') resizeTreeCanvas();
    });
});

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('collapsed'); }

function updateThemeIcon(isLight) {
    const container = document.getElementById('theme-icon-container');
    if (container) {
        container.innerHTML = isLight ? SUN_SVG : MOON_SVG;
    }
}

// ==========================================
// 3. MULTI-LANGUAGE ENGINE
// ==========================================
function cambiarIdioma(lang) {
    localStorage.setItem('pref_lang', lang);
    
    // 1. Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRADUCCIONES[lang][key]) el.innerText = TRADUCCIONES[lang][key];
    });

    // 2. Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (TRADUCCIONES[lang][key]) el.placeholder = TRADUCCIONES[lang][key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === lang);
    });

    // 3. Refresh dynamic components
    const activeBtn = document.querySelector('.nav-item.active');
    if (activeBtn) {
        const onclick = activeBtn.getAttribute('onclick');
        const tipo = onclick.match(/'([^']+)'/)[1];
        const titulo = document.getElementById('view-title');
        if (titulo && TRADUCCIONES[lang].vistas[tipo]) titulo.innerText = TRADUCCIONES[lang].vistas[tipo];
    }

    actualizarTodo();
    if (listaConjuntos.length > 0) renderizarConjuntosUI();
    if (treeData && treeData.children.length === 0) {
        treeData.name = lang === 'en' ? 'Start' : 'Inicio';
        if (selectedNode && selectedNode.id === 'root') {
            document.getElementById('selected-node-name').innerText = treeData.name;
        }
        drawTreeCanvas();
    }
}

// ==========================================
// 4. NAVIGATION ENGINE
// ==========================================
function cambiarVista(tipo) {
    const grid = document.getElementById('content-area');
    const titulo = document.getElementById('view-title');
    const lang = localStorage.getItem('pref_lang') || 'es';

    if (titulo && TRADUCCIONES[lang].vistas[tipo]) titulo.innerText = TRADUCCIONES[lang].vistas[tipo];

    // Hide all
    const modules = ['.input-panel', '#modulo-tendencia', '#modulo-tabla', '#modulo-graficas', 
                     '#modulo-conjuntos', '#modulo-probabilidades', '#modulo-multiplicativa', 
                     '#modulo-conteo', '#modulo-gestion'];
    modules.forEach(s => { const el = document.querySelector(s); if (el) el.style.display = "none"; });

    // Mark active nav
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick')?.includes(`'${tipo}'`)) btn.classList.add('active');
    });

    if (tipo === 'general') {
        grid.className = "dashboard-grid full-view";
        ['.input-panel', '#modulo-tendencia', '#modulo-tabla', '#modulo-graficas'].forEach(s => {
            const el = document.querySelector(s); if(el) el.style.display = (s === '#modulo-tendencia' ? "grid" : "block");
        });
    } else {
        // Para la tabla, mantenemos el diseño de 2 columnas para facilidad de entrada
        grid.className = (tipo === 'tabla') ? "dashboard-grid" : "dashboard-grid single-module";
        if (tipo === 'tabla' || tipo === 'tendencia') document.querySelector('.input-panel').style.display = "block";
        const target = document.getElementById(tipo === 'tabla' ? 'modulo-tabla' : `modulo-${tipo}`);
        if (target) target.style.display = (tipo === 'tendencia' ? "grid" : "block");
    }

    if (tipo === 'graficas' || tipo === 'general') {
        actualizarTodo();
        setTimeout(() => {
            [miHistograma, miPoligono, miOjiva, miPareto].forEach(chart => {
                if (chart) {
                    chart.stop(); // Detener animaciones en curso
                    chart.resize();
                    chart.update('none'); // Actualización rápida sin animaciones de entrada
                }
            });
        }, 150);
    }
    if (tipo === 'conjuntos') {
        renderizarConjuntosUI();
        actualizarSelectoresOperacion();
    }
    if (tipo === 'multiplicativa') { if (!treeData) reiniciarArbol(); setTimeout(resizeTreeCanvas, 50); }
}

// ==========================================
// 5. STATISTICS & DATA
// ==========================================
function regenerarDatosFijos() {
    datosFijos = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    const container = document.getElementById('display-aleatorios');
    if (container) {
        container.innerHTML = datosFijos.map(d => `<span class="chip">${d}</span>`).join('');
    }
    actualizarTodo();
}

function actualizarTodo() {
    const input = document.getElementById('input-manual');
    const inputK = document.getElementById('input-k');
    if (!input) return;
    const valManual = input.value.split(/[,\s\n]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
    const todos = [...datosFijos, ...valManual].sort((a, b) => a - b);
    
    document.getElementById('contador-header').innerText = `(${valManual.length}/20)`;
    
    let clases = [];
    if (todos.length > 0) {
        // --- Cálculo de Clases (Datos Agrupados) ---
        const n = todos.length;
        const min = todos[0];
        const max = todos[n - 1];
        const R = max - min;
        
        // Número de clases (k): Prioridad al input manual, luego Sturges
        let k = parseInt(inputK?.value);
        if (isNaN(k) || k <= 0) {
            k = Math.ceil(1 + 3.322 * Math.log10(n));
        }
        
        const A = R === 0 ? 1 : R / k; // Amplitud
        
        for (let i = 0; i < k; i++) {
            const li = min + (i * A);
            const ls = li + A;
            const marca = (li + ls) / 2;
            
            // Contar frecuencia (el último intervalo incluye el límite superior)
            const f = todos.filter(d => (i === k - 1) ? (d >= li && d <= ls) : (d >= li && d < ls)).length;
            
            clases.push({
                intervalo: `[${li.toFixed(1)}, ${ls.toFixed(1)}${i === k - 1 ? ']' : ')'}`,
                li, ls, marca, f
            });
        }

        // --- Medidas de Tendencia para Datos Agrupados ---
        const media = (clases.reduce((acc, c) => acc + (c.marca * c.f), 0) / n).toFixed(2);
        
        // Mediana (aproximación por clase mediana)
        let fAcum = 0, claseMediana = clases[0];
        for (let c of clases) {
            fAcum += c.f;
            if (fAcum >= n / 2) { claseMediana = c; break; }
        }
        const Fi_1 = (clases.indexOf(claseMediana) > 0) ? clases.slice(0, clases.indexOf(claseMediana)).reduce((a, b) => a + b.f, 0) : 0;
        const mediana = (claseMediana.li + (((n/2) - Fi_1) / claseMediana.f) * A).toFixed(2);
        
        // Moda (aproximación por clase modal)
        const claseModal = [...clases].sort((a, b) => b.f - a.f)[0];
        const idxModal = clases.indexOf(claseModal);
        const d1 = claseModal.f - (idxModal > 0 ? clases[idxModal - 1].f : 0);
        const d2 = claseModal.f - (idxModal < clases.length - 1 ? clases[idxModal + 1].f : 0);
        const moda = (claseModal.li + (d1 / (d1 + d2)) * A).toFixed(2);

        document.getElementById('stat-media').innerText = media;
        document.getElementById('stat-mediana').innerText = isNaN(mediana) ? "-" : mediana;
        document.getElementById('stat-moda').innerText = isNaN(moda) ? "-" : moda;
    } else {
        ['media', 'mediana', 'moda'].forEach(id => document.getElementById(`stat-${id}`).innerText = "-");
    }

    // Renderizado
    renderizarTabla(clases, todos.length);
    if (document.getElementById('modulo-graficas')?.style.display !== "none") generarGraficas(clases);
}

function renderizarTabla(clases, total) {
    const area = document.getElementById('tabla-area');
    if (!area) return;
    const lang = localStorage.getItem('pref_lang') || 'es';
    const T = TRADUCCIONES[lang];
    
    if (clases.length === 0) { 
        area.innerHTML = `<p style='text-align:center; opacity:0.5; padding:20px;'>${T.table_no_data}</p>`; 
        return; 
    }
    
    let html = `<table><thead><tr>
        <th title="Clase">${T.table_col_class}</th>
        <th title="Marca de Clase">${T.table_col_mark}</th>
        <th title="Frecuencia Absoluta">${T.table_col_f}</th>
        <th title="Frecuencia Acumulada">${T.table_col_F}</th>
        <th title="Frecuencia Relativa">${T.table_col_fr}</th>
        <th title="Frecuencia Relativa Acumulada">${T.table_col_Fr}</th>
    </tr></thead><tbody>`;
    
    let ac = 0;
    clases.forEach(c => {
        ac += c.f;
        const fr = (c.f / total * 100).toFixed(1);
        const Fr = (ac / total * 100).toFixed(1);
        html += `<tr>
            <td><b>${c.intervalo}</b></td>
            <td>${c.marca.toFixed(1)}</td>
            <td>${c.f}</td>
            <td>${ac}</td>
            <td>${fr}%</td>
            <td>${Fr}%</td>
        </tr>`;
    });

    html += `<tr class="total-row">
        <td><b>${T.table_total}</b></td>
        <td>-</td>
        <td><b>${total}</b></td>
        <td>-</td>
        <td><b>100.0%</b></td>
        <td>-</td>
    </tr></tbody></table>`;
    
    area.innerHTML = html;
}

function generarGraficas(clases) {
    if (clases.length === 0) return;
    const style = getComputedStyle(document.body);
    const color = style.getPropertyValue('--primary').trim();
    const lang = localStorage.getItem('pref_lang') || 'es';
    
    const labels = clases.map(c => c.intervalo);
    const marcas = clases.map(c => c.marca.toFixed(1));
    const values = clases.map(c => c.f);

    if (miHistograma) [miHistograma, miPoligono, miOjiva, miPareto].forEach(c => c?.destroy());

    const opt = { 
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true }
        }
    };

    // Histograma: Las barras deben estar juntas para representar clases continuas
    miHistograma = new Chart(document.getElementById('canvas-histograma').getContext('2d'), { 
        type: 'bar', 
        data: { 
            labels, 
            datasets: [{ 
                label: 'fᵢ', 
                data: values, 
                backgroundColor: color+'88', 
                borderColor: color, 
                borderWidth: 1,
                barPercentage: 1, // Barras juntas
                categoryPercentage: 1
            }] 
        }, 
        options: opt 
    });

    // Polígono: Usa marcas de clase
    miPoligono = new Chart(document.getElementById('canvas-poligono').getContext('2d'), { 
        type: 'line', 
        data: { 
            labels: marcas, 
            datasets: [{ 
                label: TRADUCCIONES[lang].chart_trend || 'Trend', 
                data: values, 
                borderColor: color, 
                backgroundColor: color+'22',
                fill: true,
                tension: 0.4 
            }] 
        }, 
        options: opt 
    });
    
    let sum = 0; const acum = values.map(v => sum += v);
    miOjiva = new Chart(document.getElementById('canvas-ojiva').getContext('2d'), { 
        type: 'line', 
        data: { 
            labels, 
            datasets: [{ 
                label: 'Fᵢ', 
                data: acum, 
                borderColor: style.getPropertyValue('--accent'),
                tension: 0.1,
                fill: false
            }] 
        }, 
        options: opt 
    });

    const pData = clases.map(c => ({ l: c.intervalo, v: c.f })).sort((a,b) => b.v - a.v);
    const totalFreq = pData.reduce((acc, d) => acc + d.v, 0);
    let pAcumSum = 0;
    const pAcumData = pData.map(d => {
        pAcumSum += d.v;
        return (pAcumSum / totalFreq * 100).toFixed(1);
    });

    miPareto = new Chart(document.getElementById('canvas-pareto').getContext('2d'), { 
        data: { 
            labels: pData.map(d => d.l), 
            datasets: [
                { 
                    type: 'line',
                    label: TRADUCCIONES[lang].chart_pareto_line || '% Acum',
                    data: pAcumData,
                    borderColor: style.getPropertyValue('--accent'),
                    backgroundColor: style.getPropertyValue('--accent'),
                    borderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    fill: false,
                    yAxisID: 'y1',
                    tension: 0.2,
                    order: 1 // Capa superior
                },
                { 
                    type: 'bar',
                    label: 'fᵢ', 
                    data: pData.map(d => d.v), 
                    backgroundColor: color + 'CC', // Un poco de transparencia para ver mejor
                    borderColor: color,
                    borderWidth: 1,
                    yAxisID: 'y',
                    order: 2 // Capa inferior
                }
            ] 
        }, 
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                x: { grid: { display: false } },
                y: { 
                    beginAtZero: true, 
                    position: 'left',
                    title: { display: true, text: 'fᵢ', color: color },
                    grid: { color: style.getPropertyValue('--border') + '44' }
                },
                y1: { 
                    beginAtZero: true, 
                    max: 100, 
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: '%', color: style.getPropertyValue('--accent') },
                    ticks: { callback: value => value + "%" }
                }
            }
        } 
    });
}

function actualizarColoresGrafica() { if (miHistograma) actualizarTodo(); }

// ==========================================
// 6. MODALS & ALERTS
// ==========================================
function mostrarAlerta(titulo, mensaje, icono = "⚠️", callbackConfirmar = null) {
    const alertOverlay = document.getElementById('custom-alert');
    const lang = localStorage.getItem('pref_lang') || 'es';
    
    const iconEl = document.getElementById('alert-icon');
    iconEl.innerText = icono;

    document.getElementById('alert-title').innerText = titulo;
    document.getElementById('alert-message').innerText = mensaje;
    
    const btnConfirm = document.getElementById('btn-alert-confirm');
    const btnCancel = document.getElementById('btn-alert-cancel');

    if (callbackConfirmar) {
        btnConfirm.style.display = 'block';
        btnConfirm.onclick = () => { callbackConfirmar(); cerrarAlerta(); };
        btnCancel.innerText = lang === 'en' ? "Cancel" : "Cancelar";
    } else {
        btnConfirm.style.display = 'none';
        btnCancel.innerText = lang === 'en' ? "Understood" : "Entendido";
    }
    alertOverlay.classList.add('active');
}

function cerrarAlerta() { document.getElementById('custom-alert').classList.remove('active'); }

// ==========================================
// 7. SET OPERATIONS
// ==========================================
function toggleModoAvanzado() {
    const isAdvanced = document.getElementById('toggle-advanced-mode').checked;
    document.getElementById('modo-basico-ops').style.display = isAdvanced ? 'none' : 'block';
    document.getElementById('modo-avanzado-ops').style.display = isAdvanced ? 'block' : 'none';
}

function insertarSimbolo(s) {
    const input = document.getElementById('input-formula-conjuntos');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.value = input.value.substring(0, start) + s + input.value.substring(end);
    input.focus();
}

function validarCaracteresFormula(input) {
    const val = input.value;
    const permitido = /^[A-Z∪∩\-Δ\(\)\s]*$/;
    if (!permitido.test(val)) {
        input.value = val.replace(/[^A-Z∪∩\-Δ\(\)\s]/g, '');
    }
}

function parsearValores(str) {
    return new Set(str.split(/[,\s]+/).map(s => s.trim()).filter(s => s !== ''));
}

function ejecutarOperacionSets(A, B, op) {
    const res = new Set();
    if (op === '∪') { A.forEach(x => res.add(x)); B.forEach(x => res.add(x)); }
    else if (op === '∩') { A.forEach(x => { if (B.has(x)) res.add(x); }); }
    else if (op === '-') { A.forEach(x => { if (!B.has(x)) res.add(x); }); }
    else if (op === 'Δ') {
        A.forEach(x => { if (!B.has(x)) res.add(x); });
        B.forEach(x => { if (!A.has(x)) res.add(x); });
    }
    return res;
}

function calcularFormulaAvanzada() {
    const formula = document.getElementById('input-formula-conjuntos').value.trim();
    const lang = localStorage.getItem('pref_lang') || 'es';
    
    if (listaConjuntos.length === 0) {
        mostrarAlerta(lang === 'en' ? "No Sets" : "Sin Conjuntos", lang === 'en' ? "Please create at least one set first." : "Por favor, crea al menos un conjunto primero.", "⚠️");
        return;
    }
    if (!formula) {
        mostrarAlerta(lang === 'en' ? "Empty Formula" : "Fórmula Vacía", lang === 'en' ? "Please enter a formula to calculate." : "Por favor, ingresa una fórmula para calcular.", "⌨️");
        return;
    }

    try {
        const conjuntosObj = {};
        listaConjuntos.forEach(c => conjuntosObj[c.id] = parsearValores(c.valores));

        // Tokenización simple
        let tokens = formula.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
                          .replace(/∪/g, ' ∪ ').replace(/∩/g, ' ∩ ')
                          .replace(/-/g, ' - ').replace(/Δ/g, ' Δ ')
                          .split(/\s+/).filter(t => t !== '');

        const evaluar = (toks) => {
            let stack = [];
            for (let i = 0; i < toks.length; i++) {
                let t = toks[i];
                if (t === '(') {
                    let count = 1, j = i + 1, sub = [];
                    while (j < toks.length && count > 0) {
                        if (toks[j] === '(') count++;
                        if (toks[j] === ')') count--;
                        if (count > 0) sub.push(toks[j]);
                        j++;
                    }
                    stack.push(evaluar(sub));
                    i = j - 1;
                } else if (conjuntosObj[t]) {
                    stack.push(conjuntosObj[t]);
                } else {
                    stack.push(t);
                }
            }

            // Procesar operaciones (Intersección > Otros)
            const procesar = (s, ops) => {
                let nStack = [s[0]];
                for (let i = 1; i < s.length; i += 2) {
                    let op = s[i], next = s[i+1];
                    if (ops.includes(op)) nStack[nStack.length - 1] = ejecutarOperacionSets(nStack[nStack.length - 1], next, op);
                    else nStack.push(op, next);
                }
                return nStack;
            };

            let s = procesar(stack, ['∩']);
            s = procesar(s, ['∪', '-', 'Δ']);
            return s[0];
        };

        const resultado = evaluar(tokens);
        mostrarResultadoSet(formula, Array.from(resultado).sort());
    } catch (e) {
        mostrarAlerta("Error", "Fórmula inválida o conjuntos no definidos.", "❌");
    }
}

function mostrarResultadoSet(titulo, valores) {
    const container = document.getElementById('set-results');
    const div = document.createElement('div');
    div.className = 'result-card';
    div.innerHTML = `
        <div class="card-header">
            <div class="result-title">${titulo}</div>
            <button class="btn-refresh" style="color:#ef4444" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
        <div class="result-values">{ ${valores.join(', ') || '∅'} }</div>
        <div style="font-size: 0.7rem; opacity: 0.5; margin-top: 5px;">n = ${valores.length}</div>
    `;
    container.prepend(div);
}

function agregarPasoOperacion() {
    const lang = localStorage.getItem('pref_lang') || 'es';
    if (listaConjuntos.length === 0) {
        mostrarAlerta(lang === 'en' ? "Action Required" : "Acción Requerida", lang === 'en' ? "You need to create sets first." : "Necesitas crear conjuntos primero.", "📦");
        return;
    }

    const container = document.getElementById('cadena-operaciones');
    const ops = ['∪', '∩', '-', 'Δ'];
    const div = document.createElement('div');
    div.className = 'op-step-row';
    
    const options = listaConjuntos.map(c => `<option value="${c.id}">📦 | Conjunto ${c.id}</option>`).join('');

    div.innerHTML = `
        <select class="set-select op-symbol-select">
            ${ops.map(o => `<option value="${o}">${o}</option>`).join('')}
        </select>
        <select class="set-select">
            ${options}
        </select>
        <button class="btn-refresh" style="color:#ef4444; border:none; background:transparent;" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

function reiniciarOperacion() {
    actualizarSelectoresOperacion();
    const results = document.getElementById('set-results');
    if (results) results.innerHTML = '';
}

function calcularOperacionEncadenada() {
    const lang = localStorage.getItem('pref_lang') || 'es';
    if (listaConjuntos.length === 0) {
        mostrarAlerta(lang === 'en' ? "No Sets" : "Sin Conjuntos", lang === 'en' ? "Create sets before calculating." : "Crea conjuntos antes de calcular.", "⚠️");
        return;
    }

    const container = document.getElementById('cadena-operaciones');
    const firstSelect = container.querySelector('select');
    if (!firstSelect || firstSelect.disabled) return;

    const conjuntosObj = {};
    listaConjuntos.forEach(c => conjuntosObj[c.id] = parsearValores(c.valores));

    let res = conjuntosObj[firstSelect.value] || new Set();
    let formula = firstSelect.value;

    container.querySelectorAll('.op-step-row').forEach(row => {
        const selects = row.querySelectorAll('select');
        const op = selects[0].value;
        const setId = selects[1].value;
        if (conjuntosObj[setId]) {
            res = ejecutarOperacionSets(res, conjuntosObj[setId], op);
            formula += ` ${op} ${setId}`;
        }
    });

    mostrarResultadoSet(formula, Array.from(res).sort());
}

function agregarNuevoConjunto() {
    const id = ABC[contadorLetras % 26];
    listaConjuntos.push({ id, valores: "" });
    contadorLetras++;
    renderizarConjuntosUI();
    actualizarSelectoresOperacion();
}

function eliminarConjunto(id) {
    listaConjuntos = listaConjuntos.filter(c => c.id !== id);
    renderizarConjuntosUI();
    actualizarSelectoresOperacion();
}

function renderizarConjuntosUI() {
    const container = document.getElementById('contenedor-conjuntos');
    if (!container) return;
    const lang = localStorage.getItem('pref_lang') || 'es';

    if (listaConjuntos.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; border: 2px dashed var(--border); border-radius: 20px; opacity: 0.5;">
                <div style="font-size: 3rem; margin-bottom: 15px;">🔗</div>
                <h4>${lang === 'en' ? "No sets created yet" : "No hay conjuntos creados"}</h4>
                <p style="font-size: 0.9rem;">${lang === 'en' ? "Click the button above to start." : "Pulsa el botón superior para empezar a operar."}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = listaConjuntos.map(c => `
        <div class="card" style="background: var(--input-bg); padding: 15px; border-radius:12px;">
            <div class="card-header">
                <h4 style="color:var(--primary)">📦 | Conjunto ${c.id}</h4>
                <div style="display:flex; gap:8px;">
                    <button class="btn-refresh" title="Generar aleatorios" onclick="generarAleatoriosParaConjunto('${c.id}')">🎲</button>
                    <button class="btn-refresh" style="color:#ef4444" onclick="eliminarConjunto('${c.id}')">✕</button>
                </div>
            </div>
            <textarea id="textarea-${c.id}" placeholder="Ej: 1, 2, 3" oninput="actualizarValoresConjunto('${c.id}', this.value)">${c.valores}</textarea>
        </div>
    `).join('');
}

function generarAleatoriosParaConjunto(id) {
    const vals = Array.from({ length: 10 }, () => Math.floor(Math.random() * 20)).join(', ');
    const c = listaConjuntos.find(x => x.id === id);
    if (c) {
        c.valores = vals;
        const tx = document.getElementById(`textarea-${id}`);
        if (tx) tx.value = vals;
    }
}

function actualizarValoresConjunto(id, val) { const c = listaConjuntos.find(x => x.id === id); if(c) c.valores = val; }

function actualizarSelectoresOperacion() {
    const container = document.getElementById('cadena-operaciones');
    if (!container) return;
    const lang = localStorage.getItem('pref_lang') || 'es';
    
    if (listaConjuntos.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; width: 100%; padding: 20px; opacity: 0.6; animation: fadeIn 0.5s ease;">
                <div style="font-size: 2.5rem; margin-bottom: 10px; animation: bounce 2s infinite;">✨</div>
                <p style="font-size: 0.85rem; font-style: italic; font-weight: 600; color: var(--primary);">
                    ${lang === 'en' ? "Add your first set above to start!" : "¡Añade tu primer conjunto arriba para empezar!"}
                </p>
            </div>
        `;
        return;
    }
    
    const options = listaConjuntos.map(c => `<option value="${c.id}">📦 | Conjunto ${c.id}</option>`).join('');

    container.innerHTML = `
        <select class="set-select" style="width: auto; min-width: 180px;">
            ${options}
        </select>
    `;
}

// ==========================================
// 8. PROBABILITY & TREE
// ==========================================
function calcularProbabilidadClasica() {
    const n = parseFloat(document.getElementById('input-fav').value);
    const N = parseFloat(document.getElementById('input-total').value);
    const lang = localStorage.getItem('pref_lang') || 'es';

    if (isNaN(n) || isNaN(N)) {
        mostrarAlerta(lang === 'en' ? "Missing Values" : "Faltan Valores", lang === 'en' ? "Please enter both favorable and total cases." : "Por favor, ingresa tanto los casos favorables como los totales.", "🔢");
        return;
    }
    if (N <= 0) {
        mostrarAlerta(lang === 'en' ? "Invalid Total" : "Total Inválido", lang === 'en' ? "Total cases (N) must be greater than 0." : "Los casos totales (N) deben ser mayores a 0.", "🚫");
        return;
    }
    if (n < 0) {
        mostrarAlerta(lang === 'en' ? "Invalid Favorable" : "Favorables Inválidos", lang === 'en' ? "Favorable cases cannot be negative." : "Los casos favorables no pueden ser negativos.", "❌");
        return;
    }
    if (n > N) {
        mostrarAlerta(lang === 'en' ? "Logic Error" : "Error Lógico", lang === 'en' ? "Favorable cases (n) cannot exceed total cases (N)." : "Los casos favorables (n) no pueden superar a los totales (N).", "⚠️");
        return;
    }

    const p = (n / N * 100).toFixed(2);
    const resHTML = `
        <div class="result-card" style="border-left:5px solid var(--accent); position:relative; overflow:hidden;">
            <div style="position:absolute; right:-10px; top:-10px; font-size:4rem; opacity:0.05;">🎲</div>
            <div class="result-title">${lang === 'en' ? 'Calculation Result' : 'Resultado del Cálculo'}</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent); margin: 10px 0;">${p}%</div>
            <p style="font-size: 0.85rem; opacity:0.8;">P(A) = ${n} / ${N} = ${(n/N).toFixed(4)}</p>
        </div>
    `;
    document.getElementById('prob-results').innerHTML = resHTML;
}

function generarProblemaAleatorio() {
    const lang = localStorage.getItem('pref_lang') || 'es';
    const problemas = lang === 'en' ? ["Urn with 5 red and 3 blue. P(red)?", "Dice roll. P(even)?"] : ["Urna con 5 rojas y 3 azules. P(roja)?", "Dado de 6 caras. P(par)?"];
    document.getElementById('prob-problem-text').style.display = "block";
    document.getElementById('problem-desc').innerText = problemas[Math.floor(Math.random()*problemas.length)];
}

function soloNumerosPositivos(e) { return (e.charCode >= 48 && e.charCode <= 57) || e.charCode === 46; }

function cambiarValorInput(id, delta) {
    const el = document.getElementById(id); if(el) el.value = Math.max(0, (parseFloat(el.value) || 0) + delta).toFixed(1);
}

function reiniciarArbol() { 
    const lang = localStorage.getItem('pref_lang') || 'es';
    treeData = { id: 'root', name: lang === 'en' ? 'Start' : 'Inicio', prob: 1, children: [] }; 
    selectedNode = treeData; 
    document.getElementById('selected-node-name').innerText = treeData.name;
    const contextBox = document.getElementById('multi-problem-context');
    if (contextBox) contextBox.style.display = 'none';
    drawTreeCanvas(); 
}

function editarNombrePunto() {
    const val = document.getElementById('edit-node-name').value;
    if (selectedNode && val) { selectedNode.name = val; document.getElementById('edit-node-name').value = ''; drawTreeCanvas(); }
}

function agregarRamaArbol() {
    const name = document.getElementById('branch-name').value.trim();
    const prob = parseFloat(document.getElementById('branch-prob').value);
    const lang = localStorage.getItem('pref_lang') || 'es';

    if (!selectedNode) {
        mostrarAlerta(lang === 'en' ? "Selection Missing" : "Punto no Seleccionado", lang === 'en' ? "Please click on a node in the diagram first." : "Por favor, haz clic en un punto del diagrama primero.", "📍");
        return;
    }
    if (!name || isNaN(prob)) {
        mostrarAlerta(lang === 'en' ? "Missing Data" : "Datos Incompletos", lang === 'en' ? "Enter a name and a valid probability (0-1)." : "Ingresa un nombre y una probabilidad válida (0-1).", "✍️");
        return;
    }
    if (prob < 0 || prob > 1) {
        mostrarAlerta(lang === 'en' ? "Invalid Value" : "Valor Inválido", lang === 'en' ? "Probability must be between 0 and 1." : "La probabilidad debe estar entre 0 y 1.", "📈");
        return;
    }

    selectedNode.children.push({ id: Date.now(), name, prob, children: [] });
    document.getElementById('branch-name').value = '';
    document.getElementById('branch-prob').value = '';
    drawTreeCanvas();
}

function generarEjercicioMultiplicativo() {
    const lang = localStorage.getItem('pref_lang') || 'es';
    const problemas = [
        { 
            name: lang === 'en' ? 'Factory Quality' : 'Calidad en Fábrica', 
            desc: lang === 'en' ? 'A factory uses 2 machines (A: 60%, B: 40%). Machine A produces 5% defects, Machine B 10% defects. What is the total probability of a defect?' : 'Una fábrica usa 2 máquinas (A: 60%, B: 40%). La máquina A produce 5% de defectuosos y la B 10%. ¿Cuál es la probabilidad total de defecto?',
            tree: {
                name: lang === 'en' ? 'Factory' : 'Fábrica',
                children: [
                    { name: 'M-A', p: 0.6, children: [
                        { name: lang === 'en' ? 'Defect' : 'Defecto', p: 0.05, children: [] },
                        { name: lang === 'en' ? 'OK' : 'Correcto', p: 0.95, children: [] }
                    ]},
                    { name: 'M-B', p: 0.4, children: [
                        { name: lang === 'en' ? 'Defect' : 'Defecto', p: 0.10, children: [] },
                        { name: lang === 'en' ? 'OK' : 'Correcto', p: 0.90, children: [] }
                    ]}
                ]
            }
        },
        { 
            name: lang === 'en' ? 'Medical Test' : 'Prueba Médica', 
            desc: lang === 'en' ? 'A disease affects 1% of the population. A test is 99% accurate for sick people and 95% for healthy people. Find the false positive probability.' : 'Una enfermedad afecta al 1% de la población. Un test es 99% preciso para enfermos y 95% para sanos. Halla la probabilidad de falso positivo.',
            tree: {
                name: lang === 'en' ? 'Population' : 'Población',
                children: [
                    { name: lang === 'en' ? 'Sick' : 'Enfermo', p: 0.01, children: [
                        { name: '+', p: 0.99, children: [] },
                        { name: '-', p: 0.01, children: [] }
                    ]},
                    { name: lang === 'en' ? 'Healthy' : 'Sano', p: 0.99, children: [
                        { name: '+', p: 0.05, children: [] },
                        { name: '-', p: 0.95, children: [] }
                    ]}
                ]
            }
        },
        { 
            name: lang === 'en' ? 'Investment' : 'Inversión', 
            desc: lang === 'en' ? 'An investment has a 50% chance of success in Year 1. If successful, Year 2 has a 70% success rate. If it fails, Year 2 only has 20%.' : 'Una inversión tiene 50% de éxito el año 1. Si tiene éxito, el año 2 tiene 70%. Si falla, el año 2 solo tiene 20%.',
            tree: {
                name: lang === 'en' ? 'Strategy' : 'Estrategia',
                children: [
                    { name: lang === 'en' ? 'Success Y1' : 'Éxito A1', p: 0.5, children: [
                        { name: lang === 'en' ? 'Success Y2' : 'Éxito A2', p: 0.7, children: [] },
                        { name: lang === 'en' ? 'Fail Y2' : 'Fallo A2', p: 0.3, children: [] }
                    ]},
                    { name: lang === 'en' ? 'Fail Y1' : 'Fallo A1', p: 0.5, children: [
                        { name: lang === 'en' ? 'Success Y2' : 'Éxito A2', p: 0.2, children: [] },
                        { name: lang === 'en' ? 'Fail Y2' : 'Fallo A2', p: 0.8, children: [] }
                    ]}
                ]
            }
        }
    ];

    const ex = problemas[Math.floor(Math.random() * problemas.length)];
    
    // UI Update
    const contextBox = document.getElementById('multi-problem-context');
    const descEl = document.getElementById('multi-problem-desc');
    if (contextBox && descEl) {
        descEl.innerText = ex.desc;
        contextBox.style.display = "block";
    }

    // Deep Build Logic
    const buildNode = (data, id) => ({
        id: id,
        name: data.name,
        prob: data.p || 1,
        children: data.children.map((c, i) => buildNode(c, `${id}-${i}`))
    });

    treeData = buildNode(ex.tree, 'root');
    selectedNode = treeData;
    document.getElementById('selected-node-name').innerText = treeData.name;
    drawTreeCanvas();
}

function resizeTreeCanvas() {
    const canvas = document.getElementById('tree-canvas');
    const container = document.getElementById('tree-canvas-container');
    if (canvas && container) {
        canvas.width = Math.max(container.clientWidth, 800);
        canvas.height = 500;
        drawTreeCanvas();
    }
}

let nodePositions = []; // Almacenar posiciones para detectar clics

function drawTreeCanvas() {
    const canvas = document.getElementById('tree-canvas');
    if (!canvas || !treeData) return;
    const ctx = canvas.getContext('2d');
    const style = getComputedStyle(document.body);
    const primary = style.getPropertyValue('--primary').trim();
    const accent = style.getPropertyValue('--accent').trim();
    const text = style.getPropertyValue('--text').trim();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodePositions = [];

    const draw = (n, x, y, step, parentProb = 1, path = "", process = "") => {
        const currentPath = path ? `${path} → ${n.name}` : n.name;
        const currentProcess = process ? `${process} × ${n.prob}` : `${n.prob}`;
        const totalProb = parentProb * n.prob;

        nodePositions.push({ id: n.id, x, y, node: n, totalProb, path: currentPath, process: currentProcess });

        // Dibujar Conexiones
        n.children.forEach((c, i) => {
            const nextX = x - step + (i * (step * 2) / (n.children.length - 1 || 1));
            const nextY = y + 120;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.strokeStyle = style.getPropertyValue('--border');
            ctx.lineWidth = 2;
            ctx.stroke();

            // Etiqueta de Probabilidad en la Rama
            const midX = (x + nextX) / 2;
            const midY = (y + nextY) / 2;
            ctx.fillStyle = primary;
            ctx.font = "bold 12px sans-serif";
            ctx.fillText(c.prob.toFixed(2), midX + 15, midY);
            
            draw(c, nextX, nextY, step / 1.8, totalProb, currentPath, currentProcess);
        });

        // Dibujar Nodo
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fillStyle = (n.id === 'root') ? accent : (selectedNode?.id === n.id ? primary : "#334155");
        ctx.fill();
        ctx.strokeStyle = (selectedNode?.id === n.id) ? "white" : "transparent";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(n.name, x, y + 5);
    };

    draw(treeData, canvas.width / 2, 60, canvas.width / 4, 1, "", "");
}

// Escuchar clics en el canvas
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tree-canvas');
    if (canvas) {
        canvas.onclick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const hit = nodePositions.find(p => Math.sqrt((p.x - x)**2 + (p.y - y)**2) < 25);
            if (hit) {
                selectedNode = hit.node;
                document.getElementById('selected-node-name').innerText = hit.node.name;
                
                // Mostrar resultado del camino con proceso de multiplicación
                const display = document.getElementById('path-probability-display');
                if (display) {
                    const lang = localStorage.getItem('pref_lang') || 'es';
                    display.innerHTML = `
                        <div style="color:var(--primary); font-weight:800; margin-bottom:5px;">${hit.path}</div>
                        <div style="font-size:0.85rem; opacity:0.8; margin-bottom:5px; font-family:monospace;">${hit.process}</div>
                        <div style="font-size:1.2rem; color:var(--accent); font-weight:800;">P = ${hit.totalProb.toFixed(4)}</div>
                        <div style="font-size:0.9rem; opacity:0.7;">(${(hit.totalProb * 100).toFixed(2)}%)</div>
                    `;
                }
                drawTreeCanvas();
            }
        };
    }
});

// ==========================================
// 9. COUNTING & MANAGEMENT
// ==========================================
function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }

function calcularPermutacion() {
    const n = parseInt(document.getElementById('perm-n').value);
    const r = parseInt(document.getElementById('perm-r').value);
    const lang = localStorage.getItem('pref_lang') || 'es';

    if (isNaN(n) || isNaN(r)) {
        mostrarAlerta(lang === 'en' ? "Input Required" : "Datos Requeridos", lang === 'en' ? "Please enter values for n and r." : "Por favor, ingresa los valores de n y r.", "🔢");
        return;
    }
    if (n < r) {
        mostrarAlerta(lang === 'en' ? "Invalid Range" : "Rango Inválido", lang === 'en' ? "Total elements (n) must be greater or equal to selected (r)." : "El total (n) debe ser mayor o igual a los elegidos (r).", "⚠️");
        return;
    }

    const res = factorial(n) / factorial(n - r);
    document.getElementById('res-perm').innerHTML = `
        <div class='result-card' style="border-left: 4px solid var(--primary);">
            <div class="result-title">P(${n}, ${r})</div>
            <div style="font-size: 1.5rem; font-weight: 800;">${res.toLocaleString()}</div>
        </div>
    `;
}

function calcularCombinacion() {
    const n = parseInt(document.getElementById('comb-n').value);
    const r = parseInt(document.getElementById('comb-r').value);
    const lang = localStorage.getItem('pref_lang') || 'es';

    if (isNaN(n) || isNaN(r)) {
        mostrarAlerta(lang === 'en' ? "Input Required" : "Datos Requeridos", lang === 'en' ? "Please enter values for n and r." : "Por favor, ingresa los valores de n y r.", "🔢");
        return;
    }
    if (n < r) {
        mostrarAlerta(lang === 'en' ? "Invalid Range" : "Rango Inválido", lang === 'en' ? "Total elements (n) must be greater or equal to selected (r)." : "El total (n) debe ser mayor o igual a los elegidos (r).", "⚠️");
        return;
    }

    const res = factorial(n) / (factorial(r) * factorial(n - r));
    document.getElementById('res-comb').innerHTML = `
        <div class='result-card' style="border-left: 4px solid var(--accent);">
            <div class="result-title">C(${n}, ${r})</div>
            <div style="font-size: 1.5rem; font-weight: 800;">${res.toLocaleString()}</div>
        </div>
    `;
}

function generarEjercicioConteo() {
    const lang = localStorage.getItem('pref_lang') || 'es';
    const problemas = [
        {
            desc: lang === 'en' ? 'A race has 8 runners. In how many ways can the gold, silver, and bronze medals be awarded?' : 'En una carrera hay 8 corredores. ¿De cuántas formas se pueden repartir las medallas de oro, plata y bronce?',
            n: 8, r: 3, type: 'perm'
        },
        {
            desc: lang === 'en' ? 'A club has 10 members. How many different committees of 3 people can be formed?' : 'Un club tiene 10 miembros. ¿Cuántos comités diferentes de 3 personas se pueden formar?',
            n: 10, r: 3, type: 'comb'
        },
        {
            desc: lang === 'en' ? 'A pizza shop offers 5 toppings. How many ways can you choose 2 toppings for your pizza?' : 'Una pizzería ofrece 5 ingredientes. ¿De cuántas formas puedes elegir 2 para tu pizza?',
            n: 5, r: 2, type: 'comb'
        },
        {
            desc: lang === 'en' ? 'A safe has a 4-digit code. If all digits are different, how many combinations are possible?' : 'Una caja fuerte tiene un código de 4 dígitos. Si todos son diferentes, ¿cuántas permutaciones existen?',
            n: 10, r: 4, type: 'perm'
        }
    ];

    const ex = problemas[Math.floor(Math.random() * problemas.length)];
    const textPanel = document.getElementById('conteo-problem-text');
    const descEl = document.getElementById('conteo-desc');
    
    if (textPanel && descEl) {
        descEl.innerText = ex.desc;
        textPanel.style.display = "block";
        textPanel.style.animation = "fadeIn 0.5s ease";
    }

    if (ex.type === 'perm') {
        document.getElementById('perm-n').value = ex.n;
        document.getElementById('perm-r').value = ex.r;
        document.getElementById('comb-n').value = '';
        document.getElementById('comb-r').value = '';
    } else {
        document.getElementById('comb-n').value = ex.n;
        document.getElementById('comb-r').value = ex.r;
        document.getElementById('perm-n').value = '';
        document.getElementById('perm-r').value = '';
    }
}

function confirmarAccionGestion(a) { 
    const lang = localStorage.getItem('pref_lang') || 'es';
    if(a==='exportar') {
        mostrarAlerta(
            lang === 'en' ? "Export Data" : "Exportar Datos", 
            lang === 'en' ? "Your project will be downloaded as JSON and Excel." : "Tu proyecto se descargará en formato JSON y Excel.", 
            "📤", 
            exportarProyecto
        ); 
    } else {
        mostrarAlerta(
            lang === 'en' ? "Overwrite Project?" : "¿Sobrescribir Proyecto?", 
            lang === 'en' ? "Loading a file will replace all your current progress. Continue?" : "Cargar un archivo reemplazará todo tu progreso actual. ¿Continuar?", 
            "📂", 
            () => document.getElementById('input-importar').click()
        );
    }
}

function exportarProyecto() {
    const lang = localStorage.getItem('pref_lang') || 'es';
    const inputManual = document.getElementById('input-manual').value;
    const projectID = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = new Date().toISOString().slice(0,10).replace(/-/g, '');
    
    // 1. Export JSON
    const projectData = {
        id: projectID,
        datosFijos,
        inputManual,
        listaConjuntos,
        treeData,
        theme: localStorage.getItem('theme'),
        lang: lang
    };
    const jsonBlob = new Blob([JSON.stringify(projectData, null, 2)], {type:'application/json'});
    const jsonLink = document.createElement('a');
    jsonLink.href = URL.createObjectURL(jsonBlob);
    jsonLink.download = `proyecto_${projectID}_${timestamp}.json`;
    jsonLink.click();

    // 2. Export EXCEL
    try {
        const wb = XLSX.utils.book_new();
        
        // Hoja 1: Datos Generales
        const valManual = inputManual.split(/[,\s\n]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
        const todos = [...datosFijos, ...valManual].sort((a, b) => a - b);
        const dataGeneral = [
            ["📊 REPORTE ESTADÍSTICO - ID: " + projectID],
            [],
            ["Variable (x)", "Frecuencia (f)"]
        ];
        const fMap = {}; todos.forEach(d => fMap[d] = (fMap[d] || 0) + 1);
        Object.keys(fMap).forEach(x => dataGeneral.push([x, fMap[x]]));
        
        const ws1 = XLSX.utils.aoa_to_sheet(dataGeneral);
        XLSX.utils.book_append_sheet(wb, ws1, "Frecuencias");

        // Hoja 2: Conjuntos
        if (listaConjuntos.length > 0) {
            const dataSets = [["ID Conjunto", "Valores"]];
            listaConjuntos.forEach(c => dataSets.push([c.id, c.valores]));
            const ws2 = XLSX.utils.aoa_to_sheet(dataSets);
            XLSX.utils.book_append_sheet(wb, ws2, "Conjuntos");
        }

        XLSX.writeFile(wb, `reporte_${projectID}_${timestamp}.xlsx`);
    } catch (e) {
        console.error("Error generating Excel:", e);
    }
}

function importarProyecto(input) {
    if (!input.files || !input.files[0]) return;
    const reader = new FileReader();
    const lang = localStorage.getItem('pref_lang') || 'es';

    reader.onload = (e) => {
        try {
            const d = JSON.parse(e.target.result);
            
            // Restore State
            if(d.datosFijos) datosFijos = d.datosFijos;
            if(d.inputManual !== undefined) {
                const area = document.getElementById('input-manual');
                if(area) area.value = d.inputManual;
            }
            if(d.listaConjuntos) listaConjuntos = d.listaConjuntos;
            if(d.treeData) treeData = d.treeData;
            
            // Sync UI
            actualizarTodo();
            renderizarConjuntosUI();
            if (treeData) drawTreeCanvas();
            
            mostrarAlerta(
                lang === 'en' ? "Success" : "Éxito", 
                lang === 'en' ? "Project loaded successfully." : "Proyecto cargado correctamente.", 
                "✅"
            );
        } catch (err) {
            mostrarAlerta("Error", lang === 'en' ? "Invalid JSON file." : "Archivo JSON inválido.", "❌");
        }
    };
    reader.readAsText(input.files[0]);
    input.value = ''; // Reset input
}
