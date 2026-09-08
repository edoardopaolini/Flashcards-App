# Schede

Un'app per studiare da PDF. Carichi le dispense, ne escono domande a quattro risposte (o coppie termine ↔ traduzione), e l'app decide ogni giorno cosa ti conviene rivedere. Funziona nel browser, anche offline, e i dati restano sul tuo dispositivo: nessun account, nessun server.

---

## Come si usa

### 1. Organizzare il materiale
La **Libreria** contiene i progetti — "Neuroanatomia", "Inglese accademico". Ogni progetto porta uno o più **argomenti** (etichette libere tipo "Laurea in Biologia", "Esami · gennaio"), quindi lo stesso progetto compare sotto tutti gli argomenti che gli hai dato. In cima trovi **Da rivedere oggi**: un tocco e parte una sessione con le schede in scadenza, prese da tutti i progetti.

### 2. Creare le schede
Due strade, si possono usare entrambe.

**Dai PDF, dentro l'app** (serve la chiave API in *Impostazioni*)
Scheda *Importa* → *Scegli un PDF*. Puoi caricare **più file insieme** — comodo quando un esame sta su tre dispense: la fonte scritta su ogni scheda ricorda da quale file e da quale pagina viene. Poi scegli:

- **Tipo di scheda**: quattro risposte, oppure termine ↔ traduzione per le lingue.
- **Di cosa parlano le domande**: *Tutto il materiale* copre i documenti in modo uniforme; *Un argomento preciso* ti fa scrivere il tema (es. "sistema limbico") e cerca solo quello, ignorando il resto. Se nei PDF quell'argomento non c'è, l'app te lo dice invece di inventare domande.
- **Quante**: 10, 20 o 40.
- **A quale progetto** aggiungerle, creandone uno nuovo se serve.

Alla fine vedi le **bozze**: le tieni, le scarti o le correggi una per una. Quelle ricavate da punti poco leggibili (scansioni sbiadite) arrivano **segnate in rosso**, così controlli prima di salvarle. Nulla entra in libreria senza il tuo assenso.

**Incollando un JSON** (gratis, nessuna chiave)
*Importa* → *Ho già un JSON — incollalo*. Il pulsante *Copia il prompt* mette negli appunti il testo da usare in una chat con il PDF allegato: incolli la risposta nel campo e le schede entrano nel progetto scelto. Funziona bene anche da iPhone. Formati riconosciuti:

```json
[{"q":"domanda","options":["a","b","c","d"],"answer":0,"why":"spiegazione","src":"p. 4"}]
[{"front":"termine","back":"traduzione","example":"frase d'esempio"}]
```

Le voci incomplete vengono scartate con un avviso: mai schede salvate a metà.

### 3. Studiare
Dentro un progetto scegli la modalità:

- **Quiz** — la domanda, quattro risposte, esito immediato: verde la giusta, rossa quella che hai toccato, e una riga che spiega perché. Poi si passa avanti.
- **Impara** — una scheda per volta: la tocchi per girarla, poi la spingi a destra ("Lo so") o a sinistra ("Ancora"). Si trascina col dito, come un mazzo.

Ogni sessione prende al massimo 12 schede, dando priorità a quelle in scadenza. Alla fine vedi il punteggio e l'elenco degli errori, che tornano subito nel mazzo.

### 4. La ripetizione spaziata
Sei livelli: **1 → 3 → 7 → 16 → 35 → 90 giorni**. Risposta giusta, la scheda sale di un livello e torna più avanti nel tempo; risposta sbagliata, torna al livello zero e ricompare dopo dieci minuti. È il meccanismo che fa la differenza tra ripassare e ricordare: non serve decidere cosa studiare, basta aprire l'app.

**Progressi** mostra i giorni di fila, le schede riviste nella settimana (da lunedì a domenica) e la percentuale consolidata per progetto.

---

## Dove finiscono i dati

- **I PDF non vengono caricati da nessuna parte.** Il testo è estratto nel browser con pdf.js; al modello va solo il testo, mai il file.
- **Le schede stanno nella memoria locale del browser.** Restano tra le sessioni e funzionano offline, ma spariscono se cancelli i dati del sito o disinstalli l'icona.
- **Fai backup.** *Impostazioni → Esporta backup* salva un file JSON (tienilo su iCloud Drive); *Importa backup* lo rimette a posto, anche su un altro dispositivo.
- **Nessuna sincronizzazione.** iPhone e Mac hanno librerie separate: si spostano con l'export. Anche browser diversi sullo stesso computer hanno dati separati.
- **La chiave API** resta solo sul dispositivo, non entra mai nei backup e non passa da alcun server.

## Sul telefono e sul Mac

**iPhone**: apri il sito in Safari → Condividi → **Aggiungi a Home**. Si apre a schermo intero e resta usabile offline (lo studio sì, la generazione no: quella vuole la rete).

**Mac**: stesso link. Safari → *File → Aggiungi al Dock*, oppure l'icona *Installa* in Chrome. Da 900 px in su il layout si allarga da sé: libreria a due colonne, risposte del quiz in griglia 2×2, scheda di studio più grande. Con la tastiera: **1–4** rispondono, **Invio** avanza, **spazio** gira la scheda, **←/→** valutano.

## La chiave API, in breve

Serve solo per generare le schede dentro l'app. Si crea su console.anthropic.com (API Keys → Create Key), richiede credito prepagato — minimo 5 $ — e si incolla in *Impostazioni*, dove resta salvata su questo dispositivo. Costo indicativo: qualche centesimo per PDF. Il campo *modello* è modificabile, così se cambia il nome del modello non serve toccare il codice.

Senza chiave l'app funziona comunque: studio, backup, progressi e la strada *Incolla un JSON*.

## Limiti dichiarati

- **Scansioni e scrittura a mano**: pdf.js estrae solo testo vero. Se il PDF è un'immagine l'app lo dice e si ferma — servirebbe OCR.
- **Massimo 10 PDF per import e 12 chiamate al modello**, per non far esplodere i costi.
- Le domande generate vanno lette: un modello può sbagliare sfumature. Per questo il passaggio di revisione non è saltabile.

---

## Pubblicare su GitHub Pages

1. Copia il **contenuto** di questa cartella nella radice del repository: `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`, `.nojekyll`, `README.md`.
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Dopo un minuto l'app è su `https://<utente>.github.io/<repo>/`.

I percorsi sono tutti relativi, quindi funziona anche in una sottocartella. Per provarla in locale serve un server (i moduli non partono da `file://`): `python3 -m http.server 8000` nella cartella, poi `http://localhost:8000`.

## I file

| File | Cosa fa |
|---|---|
| `index.html` | shell, font, politica di sicurezza |
| `styles.css` | sistema visivo (carta calda, Newsreader + IBM Plex) e adattamento desktop |
| `app.js` | stato, schermate, ripetizione spaziata, lettura PDF, chiamata al modello |
| `sw.js` | cache offline |
| `manifest.json` | icona, nome, avvio a schermo intero |

## Sicurezza — cosa è stato fatto e cosa resta

Fatto:
- **Content-Security-Policy** in `index.html`: script solo dal sito e da jsDelivr (pdf.js), connessioni solo verso l'API Anthropic, jsDelivr e Google Fonts, niente script inline, niente `object`. La direttiva include `'unsafe-eval'`: serve agli strumenti di ispezione e non apre nulla in pratica, perché il codice non chiama mai `eval`/`new Function` e pdf.js gira con `isEvalSupported:false`. Chi vuole la stretta massima la rimuove: l'app funziona identica.
- **Tutto ciò che si mostra è escapato**: testo generato dal modello, nomi di progetto, argomenti, contenuto dei backup.
- **Tutto ciò che entra è normalizzato** (`normalize()`): memoria locale e file di backup vengono ricostruiti campo per campo con tipi forzati e limiti di lunghezza; campi sconosciuti scartati, schede orfane rimosse, colori validati.
- **Il testo del PDF è trattato come dato, non come istruzione**: va al modello dentro tag `<documento>` con l'ordine esplicito di ignorare istruzioni contenute; l'output è validato prima di diventare una scheda.
- **Costi limitati e generazione annullabile** (la richiesta viene abortita davvero).
- **Salvataggio forzato** quando iOS sospende la pagina, così non si perde l'ultima risposta.
- Azioni distruttive (elimina progetto, ripristina backup, cancella tutto) chiedono conferma.

Resta, per natura del progetto:
- La chiave vive nella memoria locale in chiaro: chi ha il telefono sbloccato può leggerla. Per uso personale è accettabile; se il link diventa pubblico, spostala dietro una funzione serverless (Cloudflare Worker, ~20 righe) e fai puntare `API` in `app.js` a quella.
- Nessuna autenticazione né cifratura dei dati locali: sono protetti quanto lo è il dispositivo.
- jsDelivr e Google Fonts sono terze parti. Per eliminarle basta copiare `pdf.min.mjs`, `pdf.worker.min.mjs` e i font nel repo e aggiornare i percorsi in `app.js`, `index.html` e nella CSP.
