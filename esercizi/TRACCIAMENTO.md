# Tracciamento esercizi — Thuis Italiaans

Questo file tiene traccia di quali **tipologie** e **argomenti** sono già stati coperti,
per evitare duplicati quando ne aggiungiamo di nuovi.

## ✅ Tutte le 30 tipologie sono complete (1 esempio ciascuna)

| # | Tipo | File | Livello | Argomento | Grammatica/Lessico |
|---|------|------|---------|-----------|---------------------|
| 1 | Riempi gli spazi | riempi-spazi-mercato.html | A1–A2 | Al mercato | Presente indicativo |
| 2 | Abbina le coppie | abbina-mestieri.html | A1 | Mestieri | Lessico professioni |
| 3 | Scelta multipla | passato-prossimo-imperfetto.html | B1 | — | Passato prossimo vs imperfetto |
| 4 | Crucipuzzle | crucipuzzle-cibo.html | A1–A2 | Cibo italiano | Lessico cibo |
| 5 | Ricostruisci la frase | ricostruisci-frase-bar.html | A1 | Al bar | Ordine delle parole |
| 6 | Cruciverba (classico) | cruciverba-base.html | A1 | Parole semplici | Lessico base |
| 7 | Vero o Falso | vero-falso-pausa-pranzo.html | A2 | Pausa pranzo in Italia | Comprensione del testo |
| 8 | Anagramma | anagramma-meteo.html | A1–A2 | Il meteo | Lessico meteo |
| 9 | Categorizza | categorizza-genere.html | A1 | — | Genere dei nomi (m/f) |
| 10 | Ruota delle domande | ruota-domande.html | Tutti | Conversazione libera | Produzione orale |
| 11 | Abbina parola-emoji | abbina-emoji-animali.html | A1 | Animali | Lessico animali |
| 12 | Unisci le frasi | unisci-frasi-periodo-ipotetico.html | A2–B1 | — | Periodo ipotetico realtà |
| 13 | Mappa lessicale | mappa-lessicale-casa.html | A1 | La casa | Stanze della casa |
| 14 | Trova l'intruso | trova-intruso.html | A1–A2 | Vario | Categorie semantiche |
| 15 | Riordina il dialogo | riordina-dialogo-ristorante.html | A2 | Al ristorante | Competenza testuale |
| 16 | Riordina i paragrafi | riordina-paragrafi.html | B1 | Un viaggio (narrazione) | Competenza testuale |
| 17 | Metti in ordine | metti-in-ordine-giornata.html | A1 | Routine quotidiana | Verbi riflessivi |
| 18 | Cloze con banca di parole | cloze-banca-preposizioni.html | A2 | — | Preposizioni di luogo |
| 19 | Dettato | dettato-ascolta-scrivi.html | A2–B1 | Vario | Ortografia (TTS browser) |
| 20 | Coppie minime | coppie-minime-doppie.html | A2–B1 | — | Consonanti doppie (TTS browser) |
| 21 | Tris linguistico | tris-verbi-irregolari.html | A2 | — | Verbi irregolari presente |
| 22 | Battaglia navale | battaglia-navale-modi-di-dire.html | B1 | — | Modi di dire italiani |
| 23 | Il gioco dei dadi | gioco-dadi-articoli.html | A2 | — | Articoli determinativi |
| 24 | Gara contro il tempo | gara-tempo-verbi.html | B1 | — | Verbi regolari/irregolari |
| 25 | Trova le differenze | trova-differenze-testo.html | B1 | Routine quotidiana | Lettura attenta |
| 26 | Cruciverba a tema | cruciverba-colori.html | A1 | I colori | Lessico colori |
| 27 | Cruciverba cloze | cruciverba-cloze-montagna.html | A2 | Montagna/escursione | Lessico montagna |
| 28 | Cruciverba a sillabe | cruciverba-sillabe.html | A1 | Parole semplici | Sillabazione |
| 29 | Cruciverba con banca di parole | cruciverba-banca-parole.html | A1–A2 | Parole semplici | Logica/lunghezza parole |
| 30 | Cruciverba progressivo | cruciverba-progressivo.html | A1–B1 | Parole semplici | Livelli misti A1/B1 |

## Argomenti/livelli già usati (evitare ripetizioni nel bulk)

- **A1**: mercato (presente), mestieri, cibo, bar, parole semplici, genere dei nomi, animali, casa/stanze, routine quotidiana, colori, sillabazione
- **A2**: meteo, pausa pranzo, ristorante, preposizioni, articoli, periodo ipotetico, montagna
- **B1**: passato prossimo/imperfetto, narrazione/viaggio, modi di dire, verbi regolari/irregolari, lettura attenta, connettivi (così)
- **Tutti i livelli**: conversazione libera

## Note tecniche riutilizzabili

- **Sintesi vocale del browser** (`speechSynthesis`) usata per dettato e coppie minime — nessun file audio da produrre/caricare, funziona su qualunque dispositivo con voce italiana disponibile.
- **Componenti CSS riutilizzabili** già pronti in `esercizi.css`: match-card, sort-word/bin, word-chip, quiz-option, cw-cell (cruciverba), tf-btn, link-item, spider-node, ttt-cell, bs-cell, dice-display, diff-word — per costruire nuovi argomenti basta riusare questi blocchi con contenuto diverso.
- **Box spiegazione post-correzione** (spiegazione + 5 feedback a livelli + 5 consigli pratici) implementato finora solo su `passato-prossimo-imperfetto.html` come prototipo approvato. Da estendere a tutti gli esercizi di grammatica quando si passa al bulk.
- Fonti grammaticali per le spiegazioni: **Treccani** (enciclopedia/magazine) o altre fonti didattiche verificate.

## Prossimo passo

Con tutte le 30 tipologie ora funzionanti, il passo successivo è decidere insieme:
1. Quanti argomenti coprire per tipo (obiettivo dichiarato: 96, da confermare/ridimensionare)
2. Se estendere subito il box "spiegazione + feedback + consigli" a tutti gli esercizi di grammatica
3. Struttura di produzione a lotti (es. 10 pagine per volta) per mantenere qualità costante

## Aggiornamento — round di correzioni + espansione

### Bug corretti
- Tris, Trova l'intruso, Battaglia navale: centratura CSS Grid corretta (`justify-content:center`)
- Cruciverba a tema: ricostruito, ora 100% tematico (solo colori, zero intrusi)
- Rimossi: Cruciverba a sillabe, Mappa lessicale
- Rimossi i link esterni (Treccani citato come testo, non linkato)

### Nuove tipologie aggiunte (33 totali ora)
- 31 | Flashcard con definizione | flashcard-carattere.html | A2 | Carattere
- 32 | Flashcard vero/falso girevole | flashcard-vero-falso-grammatica.html | B1 | Errori comuni
- 33 | Impiccato | impiccato-viaggio.html | A1–A2 | Viaggi

### Categoria "Cloze" unificata (5 modelli, come il cruciverba)
1. Con indizi (pulsante rivela lettere) — riempi-spazi-mercato.html
2. Con banca di parole — cloze-banca-preposizioni.html
3. Senza indizi — cloze-senza-indizio.html
4. Con suggerimento tra parentesi — cloze-parentesi-futuro.html
5. Con menu a tendina — cloze-menu-tendina.html

### Modalità gioco (game-mode.js)
Timer opzionale + pulsante "Mostra soluzioni" con doppia conferma, applicato a 26 esercizi su 33.
Esclusi di proposito: Ruota delle domande (nessuna risposta giusta/sbagliata), Il gioco dei dadi (una domanda alla volta, niente da "rivelare" tutto insieme).

## Prossimo passo: navigazione a livelli + filtri tassonomia

Ancora da fare: la nuova architettura di navigazione (livello → lessico/grammatica → 2 filtri laterali)
con la tassonomia completa che hai mandato (Verbi / Pronomi-Particelle-Relativi / Struttura-Sintassi-Registro
per la grammatica; Persone-Società / Casa-Città / Studio-Lavoro / Viaggi-Cultura / Cibo-Shopping / Media-Informazione
per il lessico). Questo è un cambio di struttura importante, da vedere insieme prima di implementarlo del tutto.

## ✅ BATCH 1: primi 50 esercizi con contenuti reali

Distribuzione per livello: A1 (~15), A2 (~16), B1 (~14), B2 (~5).
Distribuzione grammatica/lessico: 26 grammatica (Verbi/Pronomi/Struttura), 24 lessico (le 6 aree tematiche).

Tutti verificati per correttezza grammaticale (con controllo online sui punti più delicati:
congiuntivo, condizionale, periodo ipotetico, si impersonale).

Nessun link a siti esterni nel contenuto degli esercizi (solo licenza CC nel footer, come da richiesta).
Ogni esercizio ha: badge livello+tipo+area, spiegazione iniziale, QR code, pulsanti stampa/scarica/copia link,
modalità gioco con timer opzionale, licenza CC nel footer.

Argomenti coperti nel batch 1 (per evitare ripetizioni nei prossimi lotti):
- Verbi: avere, parlare (regolari -are), imperfetto, condizionale semplice/composto, congiuntivo presente,
  futuro semplice, verbi irregolari al presente, ausiliare essere/avere
- Pronomi: diretti/indiretti, che/cui, ci/ne
- Struttura: preposizioni articolate, si impersonale, comparativi, plurali irregolari, periodo ipotetico,
  connettivi testuali, congiunzioni + congiuntivo
- Persone e Società: famiglia, emozioni, carattere, presentarsi, feste italiane
- Casa e Città: mobili, cucina (oggetti), affitto, routine serale
- Studio e Lavoro: materie scolastiche, mail formale, mondo del lavoro, colloqui
- Viaggi e Cultura: vacanza, mezzi di trasporto, weekend a Firenze, viaggi (conversazione), treno in Italia
- Cibo e Shopping: frutta/verdura, colazione italiana, cucina (ricette/ingredienti), menu
- Media e Informazione: social network, espressioni di opinione, falsi amici

**Prossimo batch**: continuare a coprire gli argomenti B2 rimanenti e le aree tematiche meno coperte finora.

## ✅ BATCH 2: altri 50 esercizi (100 totali con contenuti reali)

Mirato a colmare le lacune della tabella di riferimento CEFR completa (Verbi/Pronomi-Particelle-Relativi/
Struttura-Sintassi-Registro per la grammatica; le 6 aree lessicali per ogni livello).

**Grammatica aggiunta (26)**: verbi servili, articoli determ/indeterm, partitivi, imperativo diretto/negativo,
possessivi, dimostrativi, pronomi diretti nei tempi composti, riflessivi nei tempi composti, superlativi,
pronomi combinati, indefiniti, futuro composto, congiunzioni temporali, trapassato prossimo, congiuntivo passato,
passato remoto (riconoscimento), forma passiva essere/venire, relativi complessi (il quale/la cui), infinito con
preposizioni, discorso indiretto al presente, gerundio, congiuntivo imperfetto/trapassato, periodo ipotetico
irrealtà (3° tipo), connettivi logici complessi (sebbene/affinché).

**Lessico aggiunto (24)**: saluti/cortesia, numeri/identikit, tempo libero/stagioni, indicazioni stradali,
salute/benessere, scuola/università, infanzia, descrizione fisica, moda/tessuti, clima/geografia,
proposte/inviti, prodotti tipici Made in Italy, stati d'animo, sogni futuro, cinema/musica, disguidi/burocrazia,
annunci lavoro/CV, letteratura/hobby, ecologia, architettura/città, enogastronomia/Slow Food, giornali/fake news,
famiglia oggi, neologismi/gerghi.

### Bug corretto durante questo batch
Le pagine Vero/Falso del batch 1 mostravano letteralmente "📘 None" (box di spiegazione vuoto ma visibile con
testo placeholder Python). Corretto alla radice nella funzione `explainer()`: ora se non c'è spiegazione, il box
sparisce del tutto invece di mostrare "None". Verificato anche il batch 2 e rigenerato tutto il batch 1.

### Rimangono da coprire (per il prossimo batch)
- Grammatica B2: nominalizzazione/suffissi alterativi, verbi pronominali (andarsene), passivo con andare,
  costrutti concessivi/eccettuativi, pronomi relativi misti (chi/quanto), discorso indiretto al passato,
  registro formale/informale
- Lessico B2: itinerari UNESCO/dialetti, tecnologia/IA, politica/cittadinanza, psicologia/dipendenze digitali,
  eventi storici, sport/nutrizione, arte/teatro/design, emigrazione storica, consumi/pubblicità/marketing
- Alcuni argomenti A1/A2 minori: avverbi di frequenza, pronome ci di luogo (isolato), verbi riflessivi (base)

## ✅ BATCH 3: altri 100 esercizi (234 totali) + nuovo motore cruciverba

### Fix strutturale importante: motore di generazione cruciverba
I cruciverba precedenti erano quasi sempre di sole 2 parole (costruiti a mano). Costruito un vero algoritmo
di generazione (`crossword_engine.py`, greedy con backtracking sulle intersezioni) che prende una lista di
10-15 parole con definizioni e costruisce automaticamente una griglia connessa con incroci reali, numerazione
e liste di definizioni orizzontali/verticali corrette. Verificato che ogni griglia piazzi almeno 10 parole
(controllo automatico dei bordi e dei conflitti di lettere tra parole sovrapposte).

**Rigenerati con il nuovo motore (10 cruciverba esistenti)**: cruciverba-base, cruciverba-colori (ora 100%
a tema, zero intrusi), cruciverba-banca-parole, cruciverba-progressivo, frutta, in-cucina,
tempo-libero-e-stagioni, in-vacanza, moda-e-tessuti, l-ufficio — tutti ora con 10-12 parole invece di 2.

**15 nuovi cruciverba** (batch 3): famiglia, mestieri, verbi irregolari, carattere, media, mezzi di trasporto,
elettrodomestici, cucina italiana, corpo umano, tecnologia, città, congiuntivo, ristorante, internet e social,
emozioni — tutti con 10-14 parole piazzate.

### Contenuti aggiunti (100)
**Grammatica B2 rimasta (10)**: verbi pronominali, passivo con andare, concessivi/eccettuativi, relativi misti
chi/quanto, discorso indiretto al passato, registro formale/informale, nominalizzazione, suffissi alterativi,
discorso indiretto (domande dirette, B1), avverbi di frequenza (A1).

**Lessico B2 rimasto (14)**: itinerari UNESCO/dialetti, tecnologia/IA, politica/cittadinanza, psicologia/
dipendenze digitali, eventi storici, sport/nutrizione, arte/teatro/design, emigrazione storica, consumi/
marketing, neologismi (2), musei/patrimonio, dibattito di attualità, turismo sostenibile, dipendenze digitali
(cause/effetti).

**Altri esercizi di consolidamento (61)**: molti argomenti già coperti nei batch precedenti hanno ricevuto
ulteriori esercizi con tipologie diverse (es. verbi riflessivi sia in cloze che in quiz), più diversi
argomenti minori del CEFR non ancora toccati (verbi in -ere/-ire, preposizioni di tempo, ci vuole/ci vogliono,
c'è/ci sono, genere dei nomi, ne partitivo, verbo piacere, ecc.) e lessico aggiuntivo su tutte le 6 aree
tematiche (stanze, scuola, stazione/aeroporto, modi di dire, menu, meteo esteso, mestieri/luoghi, ecc.)

### Bug risolti durante questo batch
- 3 titoli non corrispondevano esattamente tra piano e contenuto (mismatch di virgolette/parentesi) — corretti.
- 1 duplicato interno ("Verbi riflessivi al presente" usato sia per un cloze che per un quiz) — rinominato.
- 2 collisioni di slug con esercizi già esistenti nel batch 1 ("Mezzi di trasporto", "La famiglia" riusati
  come titoli di nuovi esercizi, che avrebbero sovrascritto i file originali) — rinominati con prefissi distintivi.
- 4 cruciverba nuovi inizialmente sotto le 10 parole piazzate (corpo umano: solo 7/10!) — aggiunte parole
  extra a ciascuna lista per garantire tutti almeno 10 parole piazzate.

### Rimangono da coprire
- Grammatica B2: pochissimo rimasto, principalmente casi limite e consolidamento
- Lessico: buona copertura ora su tutte le 6 aree; prossimi batch possono approfondire con esercizi più lunghi
  e situazioni più complesse, specialmente ai livelli B1/B2

## ✅ Correzioni layout e stampa (post-batch 3)

1. **Stampa: caselle nere dei cruciverba invisibili** — i browser di default non stampano gli sfondi colorati.
   Aggiunto `print-color-adjust: exact` (e prefissi) su tutta la pagina in modalità stampa, così le caselle
   bloccate del cruciverba restano scure anche su carta/PDF.

2. **Layout: gioco spezzato a metà pagina in stampa** — l'ordine era: intestazione → spiegazione (ripasso) →
   gioco. Così il gioco iniziava a metà pagina e spesso veniva tagliato tra due fogli in stampa. Nuovo ordine
   per **tutte le 234 pagine + tutti i generatori futuri**: intestazione → gioco → spiegazione (ripasso) → CTA finale.
   Aggiunto anche `page-break-inside:avoid` sul box del gioco per ridurre ulteriormente le interruzioni.

3. **Bug trovato durante la correzione**: 2 generatori (`gen_anagramma`, `gen_dettato`) avevano perso la
   spiegazione del tutto durante un tentativo di correzione automatica, e 2 altri (`gen_categorizza`,
   `gen_ruota`) la mostravano due volte per errore di codice preesistente. Tutti e 4 corretti — ora ogni
   pagina ha esattamente una spiegazione, nella posizione giusta.

4. **Pulsante "Vai agli esercizi"** aggiunto alla pagina privacy.html, accanto ai pulsanti esistenti
   (Torna alla homepage / Vai al blog).

## ✅ Bug critico corretto: apostrofi/virgolette mostrati come codice HTML

Causa: nel JavaScript generato, il testo veniva codificato con l'escape HTML (`&#x27;`, `&quot;`) invece
dell'escape corretto per stringhe JavaScript. Il browser non decodifica mai le entità HTML dentro un tag
`<script>`, quindi il codice appariva letteralmente invece dell'apostrofo o della virgoletta.

Aggiunta una funzione `js_str()` dedicata all'escape sicuro per JavaScript (usata ora ovunque il testo finisce
dentro il codice, non nell'HTML diretto) e **rigenerate tutte le 234 pagine da zero** con i generatori corretti.
Verificato non solo che il bug fosse sparito, ma che tutte le pagine restassero sintatticamente valide
(alcune frasi contenevano virgolette annidate, es. "Il "TG" è l'abbreviazione di..." — un caso limite che ha
richiesto un vero escape a livello di stringa JS, non solo la rimozione delle entità).
