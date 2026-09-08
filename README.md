# Schede — flashcard da PDF

Web app statica: carichi un PDF, ne esce un mazzo di domande a quattro risposte (o coppie termine ↔ traduzione), poi le studi con quiz e ripetizione spaziata. Nessun server, nessun account, nessun build step.

## Come funziona

- **Il PDF non viene caricato da nessuna parte.** Il testo è estratto nel browser con pdf.js. Al modello viene inviato solo il testo estratto.
- **Le schede vivono in `localStorage`** del browser. Restano tra le sessioni e funzionano offline. Spariscono se cancelli i dati del sito → usa *Impostazioni → Esporta backup* (file JSON, tienilo su iCloud Drive).
- **La generazione usa la tua chiave API Anthropic**, inserita in *Impostazioni* e salvata solo sul dispositivo. Nessuna chiave nel repository.
- **PWA installabile**: Safari → Condividi → *Aggiungi a Home*. Si apre a schermo intero; il service worker mantiene l'app usabile offline (lo studio funziona offline, la generazione no — serve la rete).

## Deploy su GitHub Pages

1. Copia il **contenuto** di questa cartella nella radice del repository (`index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`, `.nojekyll`).
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Apri `https://<utente>.github.io/<repo>/` dall'iPhone e aggiungi alla Home.

Tutti i percorsi sono relativi, quindi funziona anche in una sottocartella.

## Avvertenze onesti

- **Scansioni e scrittura a mano**: pdf.js estrae solo testo vero. Se il PDF è un'immagine scansionata l'app lo dice e si ferma — servirebbe OCR.
- **La chiave nel browser**: va bene per uso personale sul tuo telefono. Se un giorno condividi il link, sposta la chiave dietro una funzione serverless (Cloudflare Worker, ~20 righe) e fai puntare `API` in `app.js` a quella.
- **Costo**: qualche centesimo per PDF, dipende dalle pagine.
- **Modello**: impostabile in *Impostazioni* (default `claude-sonnet-5`); se il nome non è più valido l'app mostra l'errore restituito dall'API.

## File

| File | Cosa fa |
|---|---|
| `index.html` | shell, font, manifest |
| `styles.css` | sistema visivo (carta calda, Newsreader + IBM Plex) |
| `app.js` | stato, viste, SRS, estrazione PDF, chiamata al modello |
| `sw.js` | cache offline |
| `manifest.json` | icona, nome, avvio standalone |

## Su Mac

Stessa app, stesso link. Safari (Sonoma o più recente): *File → Aggiungi al Dock*. Chrome/Edge: icona *Installa* nella barra degli indirizzi.

Da 900 px in su (e solo con mouse/trackpad) il layout si allarga: libreria a due colonne, risposte del quiz in griglia 2×2, scheda di studio più grande, stati hover. Scorciatoie: **1–4** rispondono, **Invio** avanza, **spazio** gira la scheda, **←/→** valutano.

I dati restano per browser e per dispositivo: Mac e iPhone hanno librerie separate, si spostano con *Esporta / Importa backup*.

## Sicurezza — cosa è stato fatto e cosa resta

Fatto:
- **Content-Security-Policy** in `index.html`: script solo dal sito e da jsDelivr (pdf.js), connessioni solo verso l'API Anthropic, jsDelivr e Google Fonts. Niente `eval`, niente script inline, niente `object`.
- **Tutto ciò che si mostra è escapato** (`esc()`): testo generato dal modello, nomi di progetto, tag, contenuto dei backup.
- **Tutto ciò che entra è normalizzato** (`normalize()`): localStorage e file di backup vengono ricostruiti campo per campo con tipi forzati e limiti di lunghezza; campi sconosciuti scartati, schede orfane rimosse, colori validati.
- **Il testo del PDF è trattato come dato, non come istruzione**: va al modello dentro tag `<documento>` con l'ordine esplicito di ignorare istruzioni contenute; l'output viene validato strutturalmente prima di diventare una scheda.
- **pdf.js** con `isEvalSupported:false`, versione successiva alla CVE-2024-4367; al massimo 400 pagine per file.
- **Costi limitati**: al massimo 12 chiamate per PDF; la generazione si può annullare (la richiesta viene abortita).
- **La chiave API** non finisce mai nell'export di backup e non viene mai loggata. `referrer: no-referrer`.
- Azioni distruttive (elimina progetto, ripristina backup, cancella tutto) chiedono conferma; il salvataggio viene forzato quando iOS sospende la pagina.

Resta per natura del progetto:
- La chiave vive in `localStorage` in chiaro. Chiunque abbia il telefono sbloccato può leggerla dagli strumenti sviluppatore. Per uso personale è accettabile; se il link diventa pubblico, spostala in una funzione serverless.
- Non c'è autenticazione né cifratura dei dati locali: sono protetti quanto lo è il telefono.
- Le CDN (jsDelivr, Google Fonts) sono terze parti fidate ma esterne. Per eliminarle basta copiare `pdf.min.mjs`, `pdf.worker.min.mjs` e i font nel repo e aggiornare i percorsi in `app.js`/`index.html`/CSP.

## Ripetizione spaziata

Sei livelli: 1 → 3 → 7 → 16 → 35 → 90 giorni. Risposta giusta = un livello su; sbagliata = torna al livello 0 e ricompare dopo dieci minuti.
