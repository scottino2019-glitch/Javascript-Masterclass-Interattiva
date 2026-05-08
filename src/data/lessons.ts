import { Module } from "../types";

export const APP_MODULES: Module[] = [
  {
    id: "fondamentali",
    title: "1. Fondamentali & Logica",
    icon: "Layout",
    lessons: [
      {
        id: "variabili-interattive",
        id_mod: "fondamentali",
        title: "Variabili e Tipi",
        description: "Gestire i dati e mostrarli nell'interfaccia.",
        content: `
# Variabili: I mattoni del codice

In JavaScript, le variabili memorizzano informazioni.
- \`const\`: Per dati che non cambiano (riferimenti a elementi HTML, impostazioni).
- \`let\`: Per dati dinamici (contatori, input utente).

### Tipi principali
1. **String**: Testo tra virgolette.
2. **Number**: Numeri interi o decimali.
3. **Boolean**: Vero (\`true\`) o Falso (\`false\`).

*Guarda come usiamo queste variabili per personalizzare la Preview qui a fianco.*
        `,
        initialCode: `const titoloApp = "Dashboard Utente";
let messaggiNonLetti = 4;
const utenteAttivo = true;

preview.innerHTML = \`
  <div style="font-family: sans-serif; padding: 20px; border-radius: 15px; background: white; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <h3 style="margin: 0; color: #1e293b">\${titoloApp}</h3>
      <div style="width: 10px; height: 10px; border-radius: 50%; background: \${utenteAttivo ? '#22c55e' : '#cbd5e1'}"></div>
    </div>
    <p style="color: #64748b; font-size: 14px;">Hai <strong>\${messaggiNonLetti}</strong> nuove notifiche da leggere.</p>
    <button onclick="alert('Centro Notifiche Aperto')" style="width: 100%; padding: 10px; border-radius: 8px; border: none; background: #0f172a; color: white; cursor: pointer; font-weight: 600;">
      Apri Centro Notifiche
    </button>
  </div>
\`;

console.log("Stato utente:", utenteAttivo ? "Online" : "Offline");`,
      },
      {
        id: "logica-cicli",
        id_mod: "fondamentali",
        title: "Logica e Cicli",
        description: "Prendere decisioni e ripetere azioni (If, For, Map).",
        content: `
# Il controllo del flusso

Codice intelligente significa codice che sa cosa fare in diverse situazioni.

### If / Else
Controlla se una condizione è vera. Se lo è, esegue un blocco, altrimenti un altro.

### Cicli (Loop)
Il ciclo \`for\` o il metodo \`.forEach()\` permettono di generare elementi ripetitivi senza scrivere codice duplicato.

*Esegui il codice per vedere come generiamo una lista di task automaticamente da un Array.*
        `,
        initialCode: `const tasks = ["Studiare JS", "Fare esercizio DOM", "Progetto Finale", "Revisione Codice"];

preview.innerHTML = \`
  <div style="font-family: sans-serif;">
    <h4 style="margin-bottom: 10px;">Le mie Task</h4>
    <div id="task-list"></div>
  </div>
\`;

const container = preview.querySelector('#task-list');

// Usiamo un ciclo per creare l'interfaccia
tasks.forEach((task, index) => {
  const item = document.createElement('div');
  item.style = "padding: 8px; margin-bottom: 5px; border-radius: 6px; background: #f8fafc; border-left: 4px solid #3b82f6; font-size: 13px;";
  
  // Logica condizionale: evidenziamo le task prioritarie
  if (index === 0) {
    item.style.background = "#fffbeb";
    item.style.borderLeftColor = "#f59e0b";
    item.innerHTML = \`<strong>📌 \${task}</strong> (Priorità Alta)\`;
  } else {
    item.innerText = task;
  }
  
  container.appendChild(item);
});`,
      }
    ]
  },
  {
    id: "funzioni-modulo",
    title: "2. Potenza delle Funzioni",
    icon: "Code2",
    lessons: [
      {
        id: "funzioni-standard",
        id_mod: "funzioni-modulo",
        title: "Le Funzioni come Fabbriche",
        description: "Impacchettare la logica per riutilizzarla ovunque.",
        content: `
# Perché usare le Funzioni?

Le funzioni ti permettono di definire un'operazione una volta e usarla mille volte.

### Return: Restituire valori
Il \`return\` è fondamentale. Permette a una funzione di "sfornare" un risultato (che sia un calcolo o un pezzo di HTML) e passarlo a chi l'ha chiamata.

### Parametri
Sono i "componenti" che passi alla fabbrica (la funzione) per personalizzare il risultato.
        `,
        initialCode: `// Questa funzione crea una "card" HTML personalizzata
function creaComponenteMessaggio(testo, tipo) {
  const colori = {
    info: { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' },
    success: { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
    error: { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' }
  };
  
  const stile = colori[tipo] || colori.info;
  
  return \`
    <div style="padding: 12px; border-radius: 8px; background: \${stile.bg}; color: \${stile.text}; border: 1px solid \${stile.border}; margin-bottom: 10px; font-family: sans-serif; font-size: 13px;">
      \${testo}
    </div>
  \`;
}

// Usiamo la funzione 3 volte con parametri diversi
preview.innerHTML = \`
  <div>
    \${creaComponenteMessaggio("Operazione completata con successo!", "success")}
    \${creaComponenteMessaggio("Attenzione: campo richiesto non compilato", "error")}
    \${creaComponenteMessaggio("Nuovo aggiornamento di sistema disponibile", "info")}
  </div>
\`;`,
      },
      {
        id: "arrow-callbacks",
        id_mod: "funzioni-modulo",
        title: "Arrow Functions & Callback",
        description: "Sintassi moderna e funzioni passate come argomenti.",
        content: `
# Arrow Functions (\`=>\`)

È la sintassi moderna di ES6. È più concisa e pulita.
\`\`\`javascript
const raddoppia = (x) => x * 2;
\`\`\`

### Callback: Funzioni che chiamano altre Funzioni
Una callback è una funzione passata come parametro a un'altra funzione. È essenziale per gestire gli eventi (es. cosa succede quando clicco?).
        `,
        initialCode: `// Arrow function per formattare i prezzi
const formattaEuro = (prezzo) => "€" + prezzo.toFixed(2);

// Array di prezzi
const prezzi = [12.5, 45, 9.99, 120];

// Trasformiamo i dati usando .map (che accetta una callback)
const prezziFormattati = prezzi.map(p => formattaEuro(p));

preview.innerHTML = \`
  <div style="font-family: sans-serif; padding: 15px;">
    <h4 style="margin: 0 0 10px 0;">Pannello Vendite</h4>
    <p style="font-size: 11px; color: #666; margin-bottom: 10px;">Prezzi processati via Arrow Function:</p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      \${prezziFormattati.map(p => \`
        <span style="padding: 5px 12px; background: #f1f5f9; border-radius: 20px; font-weight: bold; font-size: 12px; border: 1px solid #e2e8f0;">\${p}</span>
      \`).join('')}
    </div>
  </div>
\`;

console.log("Prezzi processati:", prezziFormattati);`,
      }
    ]
  },
  {
    id: "dom-mastery",
    title: "3. Manipolazione del DOM",
    icon: "Layers",
    lessons: [
      {
        id: "selezione-manipolazione",
        id_mod: "dom-mastery",
        title: "Selezionare e Modificare",
        description: "Cambiare testi, colori e stili in tempo reale.",
        content: `
# Il ponte tra JS e HTML

Il DOM permette di manipolare l'aspetto della pagina senza ricaricarla.

### Metodi di Selezione
- \`querySelector('#id')\`: Seleziona il primo elemento che corrisponde.
- \`querySelectorAll('.classe')\`: Crea una lista di tutti gli elementi corrispondenti.

### Cambiare lo Stato
Puoi modificare \`.innerText\`, \`.innerHTML\`, o accedere all'oggetto \`.style\` per cambiamenti rapidi.
        `,
        initialCode: `preview.innerHTML = \`
  <div style="font-family: sans-serif; text-align: center; padding: 20px;">
    <h2 id="main-title">Titolo Originale</h2>
    <p class="description">Questo testo cambierà tramite JavaScript.</p>
    <button id="magic-btn" style="padding: 10px 20px; cursor: pointer; border-radius: 8px; border: 1px solid #ccc; background: white; font-weight: 600;">Lancia Incantesimo</button>
  </div>
\`;

const btn = preview.querySelector('#magic-btn');
const title = preview.querySelector('#main-title');
const desc = preview.querySelector('.description');

btn.addEventListener('click', () => {
  // Cambiamo testo
  title.innerText = "✨ Magia Avvenuta!";
  desc.innerText = "Il DOM è stato aggiornato dinamicamente in tempo reale.";
  
  // Cambiamo stile visivo
  title.style.color = "#8b5cf6";
  btn.style.backgroundColor = "#8b5cf6";
  btn.style.color = "white";
  btn.innerText = "Operazione Riuscita";
  
  console.log("Il DOM è stato aggiornato dall'evento click.");
});`,
      },
      {
        id: "classi-dinamiche",
        id_mod: "dom-mastery",
        title: "Gestire le Classi (Toggle)",
        description: "Il modo professionale per cambiare stili: classList.",
        content: `
# classList: Pulizia e Potenza

Invece di modificare \`style\` per ogni singola proprietà, è meglio definire le classi nel CSS (o in un tag style) e scambiarle.

### Comandi principali:
- \`.add('classe')\`: Aggiunge la classe.
- \`.remove('classe')\`: La rimuove.
- \`.toggle('classe')\`: La aggiunge se manca, la rimuove se presente.
        `,
        initialCode: `preview.innerHTML = \`
  <style>
    .card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px; cursor: pointer; overflow: hidden; height: 60px; background: white; }
    .card.expanded { height: 160px; border-color: #3b82f6; background: #eff6ff; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1); }
    .chevron { transition: transform 0.4s; display: inline-block; color: #94a3b8; }
    .expanded .chevron { transform: rotate(90deg); color: #3b82f6; }
    .content { opacity: 0; transition: opacity 0.3s; margin-top: 20px; }
    .expanded .content { opacity: 1; }
  </style>

  <div id="expand-card" class="card" style="font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; font-weight: bold;">
      <span style="color: #1e293b;">Dettagli Modulo Avanzato</span>
      <span class="chevron">▶</span>
    </div>
    <div class="content">
      <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6;">
        Scopri come ottimizzare le performance del DOM evitando i "reflow" eccessivi. 
        In questa lezione impareremo a gestire stati complessi con semplicità.
      </p>
    </div>
  </div>
\`;

const card = preview.querySelector('#expand-card');

card.onclick = () => {
  card.classList.toggle('expanded');
};`,
      }
    ]
  },
  {
    id: "asincronia-modulo",
    title: "4. Asincronia & API",
    icon: "Clock",
    lessons: [
      {
        id: "promises-async",
        id_mod: "asincronia-modulo",
        title: "Async / Await Reale",
        description: "Gestire il tempo e i dati esterni senza bloccare l'app.",
        content: `
# Non bloccare il browser!

L'asincronia permette di fare "richieste in background".

### \`await\`: Aspetta i dati
La parola chiave \`await\` dice a JS di attendere il risultato di una promessa (Promise) prima di continuare, ma senza congelare l'intera pagina.

*Esegui per vedere un caricamento asincrono con feedback visivo.*
        `,
        initialCode: `preview.innerHTML = \`
  <div style="font-family: sans-serif; padding: 25px; text-align: center; background: white; border-radius: 20px; border: 1px solid #f1f5f9;">
    <div id="loader" style="display: none; margin-bottom: 20px;">
       <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #8b5cf6; border-radius: 50%; margin: auto; animation: spin 0.8s linear infinite;"></div>
       <p style="font-size: 13px; color: #94a3b8; font-weight: 500; margin-top: 10px;">Interrogando il server...</p>
    </div>
    <div id="result" style="font-weight: 800; font-size: 20px; color: #1e293b;">Richiesta non avviata</div>
    <button id="fetch-btn" style="margin-top: 25px; padding: 12px 24px; background: #8b5cf6; color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: bold; transition: all 0.2s;">Avvia Chiamata API</button>
  </div>
  <style> @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } </style>
\`;

const btn = preview.querySelector('#fetch-btn');
const loader = preview.querySelector('#loader');
const result = preview.querySelector('#result');

async function simulaRichiesta() {
  btn.style.opacity = '0';
  btn.style.pointerEvents = 'none';
  loader.style.display = 'block';
  result.innerText = "";
  
  console.log("Avvio richiesta JSON...");

  // Simuliamo un ritardo di rete reale
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  loader.style.display = 'none';
  result.innerText = "🚀 Dati Ricevuti!";
  result.style.color = "#10b981";
  
  console.log("Dati caricati e pronti.");
}

btn.onclick = simulaRichiesta;`,
      }
    ]
  },
  {
    id: "storage-modulo",
    title: "5. Storage & Persistenza",
    icon: "Database",
    lessons: [
      {
        id: "localstorage-deep",
        id_mod: "storage-modulo",
        title: "LocalStorage & Stato",
        description: "Salvare dati che sopravvivono al riavvio del browser.",
        content: `
# La memoria del Browser

\`localStorage\` salva dati che rimangono finché non vengono cancellati manualmente.

### JSON: Il linguaggio dello scambio
Visto che LocalStorage salva solo testo, usiamo \`JSON.stringify()\` per salvare oggetti e \`JSON.parse()\` per rileggerli.

*Prova a salvare delle note e poi a ricaricare il playground: le vedrai ancora lì!*
        `,
        initialCode: `// Recuperiamo i dati persistenti
let appState = JSON.parse(localStorage.getItem('masterclass_data')) || { notes: [] };

function updateUI() {
  preview.innerHTML = \`
    <div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 20px; border: 1px solid #e2e8f0;">
      <h4 style="margin: 0 0 15px 0; color: #334155;">Il mio Database Locale</h4>
      <div style="display: flex; gap: 8px; margin-bottom: 20px;">
        <input type="text" id="note-in" placeholder="Nuova nota..." style="flex: 1; padding: 10px; border: 1px solid #e2e8f0; border-radius: 10px; outline: none;">
        <button id="add-btn" style="padding: 10px 15px; background: #0f172a; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold;">+</button>
      </div>
      <div id="list-box">
        \${appState.notes.map((n, i) => \`
          <div style="padding: 12px; background: #f8fafc; margin-bottom: 8px; border-radius: 10px; display: flex; justify-content: space-between; font-size: 14px;">
            <span>\${n}</span>
            <button onclick="window.del(\${i})" style="color: #ef4444; border: none; background: none; cursor: pointer;">Cancella</button>
          </div>
        \`).join('')}
      </div>
      \${appState.notes.length === 0 ? '<p style="text-align: center; color: #94a3b8; font-size: 12px;">Nessun dato salvato.</p>' : ''}
    </div>
  \`;
  
  preview.querySelector('#add-btn').onclick = () => {
    const val = preview.querySelector('#note-in').value;
    if(!val) return;
    appState.notes.push(val);
    localStorage.setItem('masterclass_data', JSON.stringify(appState));
    updateUI();
  };
}

window.del = (idx) => {
  appState.notes.splice(idx, 1);
  localStorage.setItem('masterclass_data', JSON.stringify(appState));
  updateUI();
};

updateUI();`,
      }
    ]
  }
];
