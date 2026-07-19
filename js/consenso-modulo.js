/* ============================================================================
 MODULO CONSENSO GENITORIALE — funzione Classe
 
 Libreria stand-alone che genera al volo un modulo di consenso stampabile
 nella lingua corrente della pagina, senza server né file caricati.
 Il modulo si apre in una nuova scheda; l'utente lo salva come PDF via
 Cmd/Ctrl+P → «Salva come PDF» (o «Print to PDF»).
 
 USO:
 <button onclick="ConsensoModulo.apri()">Scarica modulo consenso</button>
 
 Legge la lingua da `document.documentElement.lang`. Se lang non è nella
 mappa, cade su italiano. Le lingue BN/TL/TI hanno un avviso in cima che
 segnala la traduzione automatica — coerente con `mt_notice` nel resto
 del sito.
 ============================================================================ */

window.ConsensoModulo = (function () {
 'use strict';

 const RTL_LANGS = ['ar'];

 // ─── TEMPLATE PER LINGUA ─────────────────────────────────────────────────
 const T = {
 it: {
 title: 'Modulo di consenso genitoriale',
 subtitle: 'Per la funzione «Classe» dell\'app ti',
 printHint: 'Per salvare come PDF: premi Ctrl+P (Windows) o ⌘P (Mac) e scegli «Salva come PDF».',
 printBtn: '🖨️ Stampa / Salva come PDF',
 introP: 'Compila questo modulo e consegnalo firmato all\'insegnante di italiano prima che tuo figlio/tua figlia si iscriva alla classe.',
 hSection1: 'Dati',
 fParent: 'Io sottoscritto/a (nome e cognome del genitore o tutore)',
 fStudent: 'Genitore/tutore di (nome e cognome dello studente)',
 fBirth: 'Data di nascita dello studente',
 hSection2: 'Dichiarazione',
 consentP: 'Autorizzo la raccolta e il trattamento dei seguenti dati di mio figlio/mia figlia tramite la funzione Classe dell\'app ti, per la finalità di seguimento didattico da parte del suo insegnante di italiano:',
 dataItems: [
 'lo username scelto (non necessariamente il nome reale);',
 'il livello di italiano raggiunto (A1–C2);',
 'il numero e il tipo di esercizi svolti nell\'app;',
 'la striscia di giorni consecutivi di studio (streak);',
 'una lista fino a 5 parole con cui ha avuto difficoltà di recente;',
 'la tappa corrente del percorso di apprendimento;',
 'la data e l\'orario dell\'ultimo aggiornamento.'
 ],
 infraP: 'I dati sono conservati sul database CloudKit pubblico di iCloud (gestito da Apple Inc.) e sono visibili solo all\'insegnante titolare della classe e agli altri studenti della stessa classe (limitatamente alla classifica di esercizi, e solo se l\'insegnante l\'ha attivata). I dati NON sono usati per pubblicità, NON sono ceduti a terzi, NON sono usati per addestrare modelli di intelligenza artificiale.',
 controllerP: 'Titolare del trattamento: l\'insegnante/scuola. Responsabile del trattamento ai sensi dell\'art. 28 GDPR: Thuis Italiaans (Ede, Paesi Bassi), contattabile a thuisitaliaans@gmail.com.',
 legalBasisP: 'Il presente consenso è prestato ai sensi dell\'art. 8 GDPR e dell\'art. 2-quinquies del Codice Privacy italiano (D.Lgs. 196/2003, come modificato dal D.Lgs. 101/2018).',
 rightsP: 'Il consenso può essere revocato in qualsiasi momento scrivendo all\'insegnante e/o a thuisitaliaans@gmail.com. Alla revoca segue la cancellazione dei dati residui entro 30 giorni.',
 hSection3: 'Insegnante e classe',
 fTeacher: 'Nome e cognome dell\'insegnante',
 fClassCode: 'Codice della classe (formato TI-XXXX)',
 fSchool: 'Scuola o istituto',
 hSection4: 'Firma',
 fDate: 'Data',
 fSignature: 'Firma del genitore/tutore',
 footer: 'Modulo generato dal sito thuisitaliaans.com — versione 1.0.'
 },

 en: {
 title: 'Parental Consent Form',
 subtitle: 'For the "Classe" feature of the ti app',
 printHint: 'To save as PDF: press Ctrl+P (Windows) or ⌘P (Mac) and choose "Save as PDF".',
 printBtn: '🖨️ Print / Save as PDF',
 introP: 'Fill out this form and give it, signed, to the Italian teacher before your child joins the class.',
 hSection1: 'Details',
 fParent: 'I, the undersigned (parent or guardian, full name)',
 fStudent: 'Parent/guardian of (student, full name)',
 fBirth: 'Student\'s date of birth',
 hSection2: 'Declaration',
 consentP: 'I authorise the collection and processing of the following data about my child through the Classe feature of the ti app, for the purpose of educational monitoring by their Italian teacher:',
 dataItems: [
 'the chosen username (not necessarily the real name);',
 'the Italian level reached (A1–C2);',
 'the number and type of exercises completed in the app;',
 'the streak of consecutive study days;',
 'a list of up to 5 words the student has recently had difficulty with;',
 'the current stage of the learning path;',
 'the date and time of the last update.'
 ],
 infraP: 'The data is stored in the iCloud public CloudKit database (operated by Apple Inc.) and is visible only to the teacher who manages the class and to other students in the same class (only for the exercise leaderboard, and only if the teacher has enabled it). The data is NOT used for advertising, NOT shared with third parties, NOT used to train AI models.',
 controllerP: 'Data controller: the teacher/school. Data processor under Art. 28 GDPR: Thuis Italiaans (Ede, Netherlands), contactable at thuisitaliaans@gmail.com.',
 legalBasisP: 'This consent is given under Art. 8 GDPR and Art. 2-quinquies of the Italian Privacy Code (Legislative Decree 196/2003 as amended by Legislative Decree 101/2018).',
 rightsP: 'Consent can be withdrawn at any time by writing to the teacher and/or to thuisitaliaans@gmail.com. Upon withdrawal, residual data is deleted within 30 days.',
 hSection3: 'Teacher and class',
 fTeacher: 'Teacher\'s full name',
 fClassCode: 'Class code (format TI-XXXX)',
 fSchool: 'School or institution',
 hSection4: 'Signature',
 fDate: 'Date',
 fSignature: 'Parent/guardian signature',
 footer: 'Form generated from thuisitaliaans.com — version 1.0.'
 },

 nl: {
 title: 'Toestemmingsformulier ouders',
 subtitle: 'Voor de functie "Classe" van de app ti',
 printHint: 'Om op te slaan als PDF: druk op Ctrl+P (Windows) of ⌘P (Mac) en kies "Opslaan als PDF".',
 printBtn: '🖨️ Afdrukken / Opslaan als PDF',
 introP: 'Vul dit formulier in en geef het ondertekend aan de docent Italiaans voordat je kind zich bij de klas aansluit.',
 hSection1: 'Gegevens',
 fParent: 'Ondergetekende (voor- en achternaam ouder of voogd)',
 fStudent: 'Ouder/voogd van (voor- en achternaam leerling)',
 fBirth: 'Geboortedatum van de leerling',
 hSection2: 'Verklaring',
 consentP: 'Ik geef toestemming voor het verzamelen en verwerken van de volgende gegevens over mijn kind via de functie Classe van de app ti, met als doel didactische opvolging door de docent Italiaans:',
 dataItems: [
 'de gekozen gebruikersnaam (niet per se de echte naam);',
 'het bereikte Italiaanse niveau (A1–C2);',
 'het aantal en het type oefeningen in de app;',
 'de reeks aaneengesloten studiedagen (streak);',
 'een lijst van maximaal 5 woorden waarmee de leerling recent moeite had;',
 'de huidige etappe van het leertraject;',
 'de datum en tijd van de laatste update.'
 ],
 infraP: 'De gegevens worden bewaard in de openbare CloudKit-database van iCloud (beheerd door Apple Inc.) en zijn alleen zichtbaar voor de docent die de klas beheert en voor de andere leerlingen in dezelfde klas (alleen voor de oefeningen-ranglijst, en alleen als de docent deze heeft ingeschakeld). De gegevens worden NIET gebruikt voor reclame, NIET gedeeld met derden, NIET gebruikt om AI-modellen te trainen.',
 controllerP: 'Verwerkingsverantwoordelijke: de docent/school. Verwerker in de zin van art. 28 AVG: Thuis Italiaans (Ede, Nederland), bereikbaar op thuisitaliaans@gmail.com.',
 legalBasisP: 'Deze toestemming wordt gegeven op grond van art. 8 AVG en art. 2-quinquies van de Italiaanse Privacywet (Wetsdecreet 196/2003 zoals gewijzigd bij Wetsdecreet 101/2018).',
 rightsP: 'De toestemming kan te allen tijde worden ingetrokken door te schrijven naar de docent en/of naar thuisitaliaans@gmail.com. Na intrekking worden resterende gegevens binnen 30 dagen verwijderd.',
 hSection3: 'Docent en klas',
 fTeacher: 'Voor- en achternaam docent',
 fClassCode: 'Klascode (formaat TI-XXXX)',
 fSchool: 'School of instelling',
 hSection4: 'Handtekening',
 fDate: 'Datum',
 fSignature: 'Handtekening ouder/voogd',
 footer: 'Formulier gegenereerd op thuisitaliaans.com — versie 1.0.'
 },

 de: {
 title: 'Elterliche Einwilligungserklärung',
 subtitle: 'Für die Funktion „Classe" der App ti',
 printHint: 'Zum Speichern als PDF: Strg+P (Windows) oder ⌘P (Mac) drücken und „Als PDF speichern" wählen.',
 printBtn: '🖨️ Drucken / Als PDF speichern',
 introP: 'Fülle dieses Formular aus und übergib es unterschrieben der Italienischlehrperson, bevor dein Kind der Klasse beitritt.',
 hSection1: 'Angaben',
 fParent: 'Ich, der/die Unterzeichnende (Vor- und Nachname des Elternteils/Erziehungsberechtigten)',
 fStudent: 'Elternteil/Erziehungsberechtigte(r) von (Vor- und Nachname der Schülerin/des Schülers)',
 fBirth: 'Geburtsdatum der Schülerin/des Schülers',
 hSection2: 'Erklärung',
 consentP: 'Ich erlaube die Erhebung und Verarbeitung folgender Daten meines Kindes durch die Funktion Classe der App ti, zum Zwecke der didaktischen Begleitung durch die Italienischlehrperson:',
 dataItems: [
 'den gewählten Benutzernamen (nicht zwingend der echte Name);',
 'das erreichte Italienisch-Niveau (A1–C2);',
 'die Anzahl und Art der in der App absolvierten Übungen;',
 'die Serie aufeinanderfolgender Lerntage (Streak);',
 'eine Liste von bis zu 5 Wörtern, mit denen die Schülerin/der Schüler kürzlich Schwierigkeiten hatte;',
 'die aktuelle Etappe des Lernpfads;',
 'Datum und Uhrzeit der letzten Aktualisierung.'
 ],
 infraP: 'Die Daten werden in der öffentlichen CloudKit-Datenbank von iCloud (betrieben von Apple Inc.) gespeichert und sind nur für die Lehrperson, die die Klasse verwaltet, und für die anderen Schüler:innen derselben Klasse sichtbar (nur die Übungs-Rangliste, und nur wenn die Lehrperson sie aktiviert hat). Die Daten werden NICHT für Werbung verwendet, NICHT an Dritte weitergegeben, NICHT zum Training von KI-Modellen verwendet.',
 controllerP: 'Verantwortlicher: die Lehrperson/Schule. Auftragsverarbeiter gemäß Art. 28 DSGVO: Thuis Italiaans (Ede, Niederlande), erreichbar unter thuisitaliaans@gmail.com.',
 legalBasisP: 'Die Einwilligung wird gemäß Art. 8 DSGVO und Art. 2-quinquies des italienischen Datenschutzgesetzes (Gesetzesdekret 196/2003 in der Fassung des Gesetzesdekrets 101/2018) erteilt.',
 rightsP: 'Die Einwilligung kann jederzeit widerrufen werden, indem an die Lehrperson und/oder an thuisitaliaans@gmail.com geschrieben wird. Nach Widerruf werden Restdaten innerhalb von 30 Tagen gelöscht.',
 hSection3: 'Lehrperson und Klasse',
 fTeacher: 'Vor- und Nachname der Lehrperson',
 fClassCode: 'Klassencode (Format TI-XXXX)',
 fSchool: 'Schule oder Institut',
 hSection4: 'Unterschrift',
 fDate: 'Datum',
 fSignature: 'Unterschrift Elternteil/Erziehungsberechtigte(r)',
 footer: 'Formular generiert auf thuisitaliaans.com — Version 1.0.'
 },

 fr: {
 title: 'Formulaire de consentement parental',
 subtitle: 'Pour la fonction « Classe » de l\'application ti',
 printHint: 'Pour enregistrer en PDF : appuyez sur Ctrl+P (Windows) ou ⌘P (Mac) et choisissez « Enregistrer en PDF ».',
 printBtn: '🖨️ Imprimer / Enregistrer en PDF',
 introP: 'Remplis ce formulaire et remets-le signé à l\'enseignant d\'italien avant que ton enfant ne rejoigne la classe.',
 hSection1: 'Coordonnées',
 fParent: 'Je soussigné·e (nom et prénom du parent ou tuteur)',
 fStudent: 'Parent/tuteur de (nom et prénom de l\'élève)',
 fBirth: 'Date de naissance de l\'élève',
 hSection2: 'Déclaration',
 consentP: 'J\'autorise la collecte et le traitement des données suivantes concernant mon enfant via la fonction Classe de l\'application ti, pour le suivi pédagogique par son enseignant d\'italien :',
 dataItems: [
 'le nom d\'utilisateur choisi (pas nécessairement le vrai nom) ;',
 'le niveau d\'italien atteint (A1–C2) ;',
 'le nombre et le type d\'exercices effectués dans l\'app ;',
 'la série de jours consécutifs d\'étude (streak) ;',
 'une liste jusqu\'à 5 mots avec lesquels l\'élève a eu des difficultés récemment ;',
 'l\'étape actuelle du parcours d\'apprentissage ;',
 'la date et l\'heure de la dernière mise à jour.'
 ],
 infraP: 'Les données sont conservées sur la base CloudKit publique d\'iCloud (opérée par Apple Inc.) et ne sont visibles que par l\'enseignant qui gère la classe et par les autres élèves de la même classe (uniquement pour le classement d\'exercices, et seulement si l\'enseignant l\'a activé). Les données NE SONT PAS utilisées à des fins publicitaires, NE SONT PAS partagées avec des tiers, NE SONT PAS utilisées pour entraîner des modèles d\'IA.',
 controllerP: 'Responsable du traitement : l\'enseignant/école. Sous-traitant au sens de l\'art. 28 RGPD : Thuis Italiaans (Ede, Pays-Bas), contactable à thuisitaliaans@gmail.com.',
 legalBasisP: 'Le présent consentement est donné au titre de l\'art. 8 RGPD et de l\'art. 2-quinquies du Code italien de la vie privée (décret-loi 196/2003 tel que modifié par le décret-loi 101/2018).',
 rightsP: 'Le consentement peut être retiré à tout moment en écrivant à l\'enseignant et/ou à thuisitaliaans@gmail.com. Après retrait, les données résiduelles sont supprimées sous 30 jours.',
 hSection3: 'Enseignant et classe',
 fTeacher: 'Nom et prénom de l\'enseignant',
 fClassCode: 'Code de la classe (format TI-XXXX)',
 fSchool: 'École ou établissement',
 hSection4: 'Signature',
 fDate: 'Date',
 fSignature: 'Signature du parent/tuteur',
 footer: 'Formulaire généré depuis thuisitaliaans.com — version 1.0.'
 },

 es: {
 title: 'Formulario de consentimiento parental',
 subtitle: 'Para la función «Classe» de la app ti',
 printHint: 'Para guardar como PDF: pulsa Ctrl+P (Windows) o ⌘P (Mac) y elige «Guardar como PDF».',
 printBtn: '🖨️ Imprimir / Guardar como PDF',
 introP: 'Rellena este formulario y entrégalo firmado al docente de italiano antes de que tu hijo/a se inscriba en la clase.',
 hSection1: 'Datos',
 fParent: 'Yo, abajo firmante (nombre y apellidos del padre/madre o tutor)',
 fStudent: 'Padre/madre/tutor de (nombre y apellidos del estudiante)',
 fBirth: 'Fecha de nacimiento del estudiante',
 hSection2: 'Declaración',
 consentP: 'Autorizo la recogida y el tratamiento de los siguientes datos de mi hijo/a a través de la función Classe de la app ti, con la finalidad de seguimiento didáctico por parte de su docente de italiano:',
 dataItems: [
 'el nombre de usuario elegido (no necesariamente el nombre real);',
 'el nivel de italiano alcanzado (A1–C2);',
 'el número y el tipo de ejercicios realizados en la app;',
 'la racha de días consecutivos de estudio (streak);',
 'una lista de hasta 5 palabras con las que ha tenido dificultades recientemente;',
 'la etapa actual del recorrido de aprendizaje;',
 'la fecha y hora de la última actualización.'
 ],
 infraP: 'Los datos se conservan en la base CloudKit pública de iCloud (operada por Apple Inc.) y son visibles únicamente para el docente que gestiona la clase y para los demás estudiantes de la misma clase (solo la clasificación de ejercicios, y solo si el docente la ha activado). Los datos NO se usan con fines publicitarios, NO se ceden a terceros, NO se usan para entrenar modelos de IA.',
 controllerP: 'Responsable del tratamiento: el docente/escuela. Encargado del tratamiento en el sentido del art. 28 RGPD: Thuis Italiaans (Ede, Países Bajos), contactable en thuisitaliaans@gmail.com.',
 legalBasisP: 'El presente consentimiento se otorga conforme al art. 8 RGPD y al art. 2-quinquies del Código de Privacidad italiano (Decreto Legislativo 196/2003, modificado por el Decreto Legislativo 101/2018).',
 rightsP: 'El consentimiento puede revocarse en cualquier momento escribiendo al docente y/o a thuisitaliaans@gmail.com. Tras la revocación, los datos residuales se eliminan en un plazo de 30 días.',
 hSection3: 'Docente y clase',
 fTeacher: 'Nombre y apellidos del docente',
 fClassCode: 'Código de la clase (formato TI-XXXX)',
 fSchool: 'Escuela o institución',
 hSection4: 'Firma',
 fDate: 'Fecha',
 fSignature: 'Firma del padre/madre/tutor',
 footer: 'Formulario generado desde thuisitaliaans.com — versión 1.0.'
 },

 pt: {
 title: 'Formulário de consentimento parental',
 subtitle: 'Para a funcionalidade «Classe» da app ti',
 printHint: 'Para guardar como PDF: prima Ctrl+P (Windows) ou ⌘P (Mac) e escolha «Guardar como PDF».',
 printBtn: '🖨️ Imprimir / Guardar como PDF',
 introP: 'Preenche este formulário e entrega-o assinado ao professor de italiano antes de o teu filho ou filha se inscrever na turma.',
 hSection1: 'Dados',
 fParent: 'Eu, abaixo assinado (nome completo do pai/mãe ou tutor)',
 fStudent: 'Pai/mãe/tutor de (nome completo do aluno)',
 fBirth: 'Data de nascimento do aluno',
 hSection2: 'Declaração',
 consentP: 'Autorizo a recolha e o tratamento dos seguintes dados sobre o meu filho/a minha filha através da funcionalidade Classe da app ti, para efeito de acompanhamento didático pelo seu professor de italiano:',
 dataItems: [
 'o nome de utilizador escolhido (não necessariamente o nome real);',
 'o nível de italiano atingido (A1–C2);',
 'o número e o tipo de exercícios feitos na app;',
 'a sequência de dias consecutivos de estudo (streak);',
 'uma lista até 5 palavras com que teve dificuldade recentemente;',
 'a etapa atual do percurso de aprendizagem;',
 'a data e a hora da última atualização.'
 ],
 infraP: 'Os dados são conservados na base CloudKit pública do iCloud (operada pela Apple Inc.) e são visíveis apenas pelo professor que gere a turma e pelos outros alunos da mesma turma (apenas a classificação de exercícios, e apenas se o professor a tiver ativado). Os dados NÃO são utilizados para publicidade, NÃO são partilhados com terceiros, NÃO são utilizados para treinar modelos de IA.',
 controllerP: 'Responsável pelo tratamento: o professor/escola. Subcontratante nos termos do art. 28 RGPD: Thuis Italiaans (Ede, Países Baixos), contactável em thuisitaliaans@gmail.com.',
 legalBasisP: 'O presente consentimento é prestado nos termos do art. 8 RGPD e do art. 2-quinquies do Código de Privacidade italiano (Decreto Legislativo 196/2003, alterado pelo Decreto Legislativo 101/2018).',
 rightsP: 'O consentimento pode ser revogado a qualquer momento escrevendo ao professor e/ou a thuisitaliaans@gmail.com. Após a revogação, os dados residuais são eliminados no prazo de 30 dias.',
 hSection3: 'Professor e turma',
 fTeacher: 'Nome completo do professor',
 fClassCode: 'Código da turma (formato TI-XXXX)',
 fSchool: 'Escola ou instituição',
 hSection4: 'Assinatura',
 fDate: 'Data',
 fSignature: 'Assinatura do pai/mãe/tutor',
 footer: 'Formulário gerado a partir de thuisitaliaans.com — versão 1.0.'
 },

 ro: {
 title: 'Formular de consimțământ parental',
 subtitle: 'Pentru funcția «Classe» a aplicației ti',
 printHint: 'Pentru a salva ca PDF: apasă Ctrl+P (Windows) sau ⌘P (Mac) și alege «Salvează ca PDF».',
 printBtn: '🖨️ Printează / Salvează ca PDF',
 introP: 'Completează acest formular și dă-l semnat profesorului de italiană înainte ca fiul/fiica ta să se înscrie la clasă.',
 hSection1: 'Date',
 fParent: 'Subsemnatul/a (nume și prenume părinte sau tutore)',
 fStudent: 'Părinte/tutore al lui (nume și prenume elev)',
 fBirth: 'Data nașterii elevului',
 hSection2: 'Declarație',
 consentP: 'Autorizez colectarea și prelucrarea următoarelor date despre copilul meu prin funcția Classe a aplicației ti, în scopul monitorizării didactice de către profesorul său de italiană:',
 dataItems: [
 'numele de utilizator ales (nu neapărat numele real);',
 'nivelul de italiană atins (A1–C2);',
 'numărul și tipul exercițiilor efectuate în aplicație;',
 'seria de zile consecutive de studiu (streak);',
 'o listă de până la 5 cuvinte cu care a avut dificultăți recent;',
 'etapa actuală a parcursului de învățare;',
 'data și ora ultimei actualizări.'
 ],
 infraP: 'Datele sunt păstrate în baza publică CloudKit din iCloud (operată de Apple Inc.) și sunt vizibile doar pentru profesorul care gestionează clasa și pentru ceilalți elevi din aceeași clasă (doar clasamentul exercițiilor, și doar dacă profesorul l-a activat). Datele NU sunt folosite pentru publicitate, NU sunt partajate cu terți, NU sunt folosite pentru antrenarea modelelor AI.',
 controllerP: 'Operator: profesorul/școala. Persoană împuternicită conform art. 28 GDPR: Thuis Italiaans (Ede, Țările de Jos), contactabil la thuisitaliaans@gmail.com.',
 legalBasisP: 'Prezentul consimțământ este acordat conform art. 8 GDPR și art. 2-quinquies din Codul italian al confidențialității (Decretul legislativ 196/2003 modificat prin Decretul legislativ 101/2018).',
 rightsP: 'Consimțământul poate fi retras oricând scriind profesorului și/sau la thuisitaliaans@gmail.com. După retragere, datele reziduale sunt șterse în 30 de zile.',
 hSection3: 'Profesor și clasă',
 fTeacher: 'Nume și prenume profesor',
 fClassCode: 'Codul clasei (format TI-XXXX)',
 fSchool: 'Școală sau instituție',
 hSection4: 'Semnătură',
 fDate: 'Data',
 fSignature: 'Semnătura părintelui/tutorelui',
 footer: 'Formular generat de pe thuisitaliaans.com — versiunea 1.0.'
 },

 sq: {
 title: 'Formulari i pëlqimit prindëror',
 subtitle: 'Për funksionin «Classe» të aplikacionit ti',
 printHint: 'Për ta ruajtur si PDF: shtyp Ctrl+P (Windows) ose ⌘P (Mac) dhe zgjidh «Ruaj si PDF».',
 printBtn: '🖨️ Printo / Ruaj si PDF',
 introP: 'Plotëso këtë formular dhe dorëzoje të nënshkruar te mësuesi i italishtes para se fëmija yt të regjistrohet në klasë.',
 hSection1: 'Të dhëna',
 fParent: 'Unë, i/e nënshkruari/a (emër dhe mbiemër i prindit ose kujdestarit)',
 fStudent: 'Prind/kujdestar i (emër dhe mbiemër i nxënësit)',
 fBirth: 'Data e lindjes së nxënësit',
 hSection2: 'Deklaratë',
 consentP: 'Autorizoj mbledhjen dhe përpunimin e të dhënave të mëposhtme për fëmijën tim përmes funksionit Classe të aplikacionit ti, për qëllime të ndjekjes didaktike nga mësuesi/mësuesja e italishtes:',
 dataItems: [
 'emrin e përdoruesit të zgjedhur (jo domosdoshmërisht emrin e vërtetë);',
 'nivelin e italishtes të arritur (A1–C2);',
 'numrin dhe llojin e ushtrimeve të bëra në aplikacion;',
 'serinë e ditëve të njëpasnjëshme të studimit (streak);',
 'një listë deri në 5 fjalë me të cilat ka pasur vështirësi kohët e fundit;',
 'etapën aktuale të rrugës mësimore;',
 'datën dhe orën e përditësimit të fundit.'
 ],
 infraP: 'Të dhënat ruhen në bazën publike CloudKit të iCloud (menaxhuar nga Apple Inc.) dhe janë të dukshme vetëm për mësuesin që administron klasën dhe për nxënësit e tjerë të së njëjtës klasë (vetëm renditja e ushtrimeve, dhe vetëm nëse mësuesi e ka aktivizuar). Të dhënat NUK përdoren për reklama, NUK ndahen me palë të treta, NUK përdoren për të stërvitur modele AI.',
 controllerP: 'Kontrollues i të dhënave: mësuesi/shkolla. Përpunues i të dhënave sipas nenit 28 të GDPR: Thuis Italiaans (Ede, Vendet e Ulëta), i kontaktueshëm në thuisitaliaans@gmail.com.',
 legalBasisP: 'Ky pëlqim jepet sipas nenit 8 të GDPR dhe nenit 2-quinquies të Kodit italian të Privatësisë (Dekreti Legjislativ 196/2003 i ndryshuar me Dekretin Legjislativ 101/2018).',
 rightsP: 'Pëlqimi mund të tërhiqet në çdo kohë duke i shkruar mësuesit dhe/ose në thuisitaliaans@gmail.com. Pas tërheqjes, të dhënat e mbetura fshihen brenda 30 ditësh.',
 hSection3: 'Mësuesi dhe klasa',
 fTeacher: 'Emër dhe mbiemër i mësuesit',
 fClassCode: 'Kodi i klasës (formati TI-XXXX)',
 fSchool: 'Shkolla ose institucioni',
 hSection4: 'Nënshkrimi',
 fDate: 'Data',
 fSignature: 'Nënshkrimi i prindit/kujdestarit',
 footer: 'Formular i gjeneruar nga thuisitaliaans.com — versioni 1.0.'
 },

 uk: {
 title: 'Форма батьківської згоди',
 subtitle: 'Для функції «Classe» додатка ti',
 printHint: 'Щоб зберегти як PDF: натисни Ctrl+P (Windows) або ⌘P (Mac) і обери «Зберегти як PDF».',
 printBtn: '🖨️ Друкувати / Зберегти як PDF',
 introP: 'Заповни цю форму та передай її підписаною вчителю італійської мови перед тим, як твоя дитина приєднається до класу.',
 hSection1: 'Дані',
 fParent: 'Я, що нижче підписався (ім\'я та прізвище одного з батьків або опікуна)',
 fStudent: 'Один із батьків/опікун (ім\'я та прізвище учня)',
 fBirth: 'Дата народження учня',
 hSection2: 'Заява',
 consentP: 'Дозволяю збір і обробку таких даних про мою дитину через функцію Classe додатка ti з метою дидактичного супроводу її вчителем італійської мови:',
 dataItems: [
 'обране ім\'я користувача (не обов\'язково справжнє);',
 'досягнутий рівень італійської (A1–C2);',
 'кількість і тип виконаних вправ у додатку;',
 'серію послідовних днів навчання (streak);',
 'список до 5 слів, з якими нещодавно виникали труднощі;',
 'поточний етап навчального шляху;',
 'дату й час останнього оновлення.'
 ],
 infraP: 'Дані зберігаються в публічній базі CloudKit від iCloud (керується Apple Inc.) і видимі лише вчителю, який керує класом, і іншим учням того ж класу (лише рейтинг вправ, і лише якщо вчитель його ввімкнув). Дані НЕ використовуються для реклами, НЕ передаються третім сторонам, НЕ використовуються для тренування AI-моделей.',
 controllerP: 'Контролер даних: вчитель/школа. Обробник за ст. 28 GDPR: Thuis Italiaans (Ede, Нідерланди), контакт: thuisitaliaans@gmail.com.',
 legalBasisP: 'Ця згода надається відповідно до ст. 8 GDPR та ст. 2-quinquies італійського Кодексу приватності (Законодавчий декрет 196/2003, зі змінами Законодавчого декрету 101/2018).',
 rightsP: 'Згода може бути відкликана в будь-який час письмово вчителю та/або на thuisitaliaans@gmail.com. Після відкликання залишкові дані видаляються протягом 30 днів.',
 hSection3: 'Вчитель і клас',
 fTeacher: 'Ім\'я та прізвище вчителя',
 fClassCode: 'Код класу (формат TI-XXXX)',
 fSchool: 'Школа або заклад',
 hSection4: 'Підпис',
 fDate: 'Дата',
 fSignature: 'Підпис одного з батьків/опікуна',
 footer: 'Форму згенеровано на thuisitaliaans.com — версія 1.0.'
 },

 zh: {
 title: '家长同意书',
 subtitle: '适用于 ti 应用的"Classe"功能',
 printHint: '保存为 PDF：按 Ctrl+P（Windows）或 ⌘P（Mac），然后选择"另存为 PDF"。',
 printBtn: '🖨️ 打印 / 保存为 PDF',
 introP: '在孩子加入班级之前，请填写此表格并签字后交给意大利语老师。',
 hSection1: '信息',
 fParent: '本人（家长或监护人的姓名）',
 fStudent: '学生的家长/监护人（学生姓名）',
 fBirth: '学生的出生日期',
 hSection2: '声明',
 consentP: '我授权通过 ti 应用的 Classe 功能收集和处理关于我孩子的以下数据，用于其意大利语老师的教学跟踪：',
 dataItems: [
 '所选用户名（不一定是真实姓名）；',
 '所达到的意大利语等级（A1–C2）；',
 '在应用中完成的练习数量和类型；',
 '连续学习天数（streak）；',
 '最多 5 个近期遇到困难的单词；',
 '学习路径的当前阶段；',
 '最后更新的日期和时间。'
 ],
 infraP: '数据存储在 iCloud 的公共 CloudKit 数据库中（由 Apple Inc. 运营），仅对管理班级的老师和同班其他学生可见（仅练习排行榜，且仅在老师启用时）。数据不用于广告，不与第三方共享，不用于训练 AI 模型。',
 controllerP: '数据控制者：老师/学校。GDPR 第 28 条意义上的数据处理者：Thuis Italiaans（荷兰埃德市），联系方式：thuisitaliaans@gmail.com。',
 legalBasisP: '本同意书依据 GDPR 第 8 条和意大利《隐私法典》第 2-quinquies 条（第 196/2003 号立法令，经第 101/2018 号立法令修订）作出。',
 rightsP: '同意可随时撤回，方式为写信给老师和/或 thuisitaliaans@gmail.com。撤回后，剩余数据将在 30 天内删除。',
 hSection3: '老师和班级',
 fTeacher: '老师姓名',
 fClassCode: '班级代码（格式 TI-XXXX）',
 fSchool: '学校或机构',
 hSection4: '签名',
 fDate: '日期',
 fSignature: '家长/监护人签名',
 footer: '表格由 thuisitaliaans.com 生成 — 版本 1.0。'
 },

 ar: {
 title: 'استمارة موافقة الوالدين',
 subtitle: 'لميزة «Classe» في تطبيق ti',
 printHint: 'للحفظ بصيغة PDF: اضغط على Ctrl+P (ويندوز) أو ⌘P (ماك) واختر «حفظ كملف PDF».',
 printBtn: '🖨️ طباعة / حفظ كملف PDF',
 introP: 'املأ هذه الاستمارة وسلّمها موقّعة إلى معلّم اللغة الإيطالية قبل انضمام ابنك/ابنتك إلى الصف.',
 hSection1: 'البيانات',
 fParent: 'أنا الموقّع أدناه (الاسم واللقب لأحد الوالدين أو الوليّ)',
 fStudent: 'وليّ أمر الطالب (الاسم واللقب للطالب)',
 fBirth: 'تاريخ ميلاد الطالب',
 hSection2: 'إقرار',
 consentP: 'أُصرّح بجمع ومعالجة البيانات التالية المتعلقة بطفلي عبر ميزة Classe في تطبيق ti، لغرض المتابعة التربوية من قِبل معلّم اللغة الإيطالية:',
 dataItems: [
 'اسم المستخدم المختار (ليس بالضرورة الاسم الحقيقي)؛',
 'المستوى الذي وصل إليه في الإيطالية (A1–C2)؛',
 'عدد ونوع التمارين التي أنجزها في التطبيق؛',
 'سلسلة الأيام المتتالية من الدراسة (streak)؛',
 'قائمة تصل إلى 5 كلمات صعبة عليه مؤخّرًا؛',
 'المرحلة الحالية من مسار التعلّم؛',
 'تاريخ ووقت آخر تحديث.'
 ],
 infraP: 'تُخزَّن البيانات في قاعدة بيانات CloudKit العامة الخاصة بـ iCloud (تديرها Apple Inc.) وتكون مرئية فقط للمعلّم الذي يدير الصف وللطلاب الآخرين في الصف نفسه (لوحة ترتيب التمارين فقط، وفقط إذا فعّلها المعلّم). لا تُستخدم البيانات للإعلانات، ولا تُشارَك مع أطراف ثالثة، ولا تُستخدم لتدريب نماذج الذكاء الاصطناعي.',
 controllerP: 'المسؤول عن المعالجة: المعلّم/المدرسة. المُعالِج بمعنى المادة 28 من GDPR: Thuis Italiaans (Ede، هولندا)، البريد: thuisitaliaans@gmail.com.',
 legalBasisP: 'تُقدَّم هذه الموافقة بموجب المادة 8 من GDPR والمادة 2-quinquies من قانون الخصوصية الإيطالي (المرسوم التشريعي 196/2003 المعدَّل بالمرسوم التشريعي 101/2018).',
 rightsP: 'يمكن سحب الموافقة في أي وقت بمراسلة المعلّم و/أو thuisitaliaans@gmail.com. بعد السحب، تُحذف البيانات المتبقية خلال 30 يومًا.',
 hSection3: 'المعلّم والصف',
 fTeacher: 'الاسم واللقب للمعلّم',
 fClassCode: 'رمز الصف (بتنسيق TI-XXXX)',
 fSchool: 'المدرسة أو المؤسسة',
 hSection4: 'التوقيع',
 fDate: 'التاريخ',
 fSignature: 'توقيع الوالد/الوليّ',
 footer: 'استمارة مُنشأة من thuisitaliaans.com — الإصدار 1.0.'
 },

 bn: {
 title: 'অভিভাবকের সম্মতি ফর্ম',
 subtitle: 'ti অ্যাপের "Classe" ফিচারের জন্য',
 printHint: 'PDF হিসেবে সংরক্ষণ করতে: Ctrl+P (Windows) বা ⌘P (Mac) চাপুন এবং "Save as PDF" নির্বাচন করুন।',
 printBtn: '🖨️ প্রিন্ট / PDF হিসেবে সংরক্ষণ',
 introP: 'এই ফর্মটি পূরণ করুন এবং আপনার সন্তান ক্লাসে যোগ দেওয়ার আগে ইতালীয় শিক্ষকের কাছে স্বাক্ষরিত অবস্থায় জমা দিন।',
 hSection1: 'তথ্য',
 fParent: 'আমি নিম্নস্বাক্ষরকারী (অভিভাবক বা রক্ষকের পুরো নাম)',
 fStudent: 'শিক্ষার্থীর অভিভাবক/রক্ষক (শিক্ষার্থীর পুরো নাম)',
 fBirth: 'শিক্ষার্থীর জন্ম তারিখ',
 hSection2: 'ঘোষণা',
 consentP: 'আমি আমার সন্তানের নিম্নলিখিত তথ্য ti অ্যাপের Classe ফিচারের মাধ্যমে সংগ্রহ ও প্রক্রিয়াকরণের অনুমতি দিচ্ছি, যাতে তার ইতালীয় শিক্ষক শিক্ষামূলক পর্যবেক্ষণ করতে পারেন:',
 dataItems: [
 'নির্বাচিত ইউজারনেম (অগত্যা প্রকৃত নাম নয়);',
 'অর্জিত ইতালীয় স্তর (A1–C2);',
 'অ্যাপে সম্পন্ন অনুশীলনের সংখ্যা ও ধরন;',
 'ধারাবাহিক অধ্যয়ন দিনের সিরিজ (streak);',
 'সম্প্রতি সমস্যা হয়েছে এমন সর্বোচ্চ 5টি শব্দের তালিকা;',
 'শিক্ষা পথের বর্তমান ধাপ;',
 'সর্বশেষ আপডেটের তারিখ ও সময়।'
 ],
 infraP: 'তথ্য iCloud-এর পাবলিক CloudKit ডাটাবেসে সংরক্ষিত হয় (Apple Inc. দ্বারা পরিচালিত) এবং শুধুমাত্র ক্লাস পরিচালনাকারী শিক্ষক এবং একই ক্লাসের অন্যান্য শিক্ষার্থীদের কাছে দৃশ্যমান (শুধু অনুশীলনের লিডারবোর্ড, এবং শুধু যদি শিক্ষক তা চালু করেন)। তথ্য বিজ্ঞাপনের জন্য ব্যবহৃত হয় না, তৃতীয় পক্ষের সাথে শেয়ার করা হয় না, AI মডেল প্রশিক্ষণের জন্য ব্যবহৃত হয় না।',
 controllerP: 'ডাটা কন্ট্রোলার: শিক্ষক/স্কুল। GDPR-এর ২৮ অনুচ্ছেদ অনুযায়ী ডাটা প্রসেসর: Thuis Italiaans (Ede, নেদারল্যান্ডস), যোগাযোগ: thuisitaliaans@gmail.com।',
 legalBasisP: 'এই সম্মতি GDPR-এর ৮ অনুচ্ছেদ এবং ইতালীয় গোপনীয়তা কোডের (Legislative Decree 196/2003, Legislative Decree 101/2018 দ্বারা সংশোধিত) ২-quinquies অনুচ্ছেদ অনুসারে দেওয়া হয়েছে।',
 rightsP: 'শিক্ষক এবং/অথবা thuisitaliaans@gmail.com-এ লিখে যেকোনো সময় সম্মতি প্রত্যাহার করা যেতে পারে। প্রত্যাহারের পর, অবশিষ্ট তথ্য 30 দিনের মধ্যে মুছে ফেলা হবে।',
 hSection3: 'শিক্ষক ও ক্লাস',
 fTeacher: 'শিক্ষকের পুরো নাম',
 fClassCode: 'ক্লাসের কোড (ফরম্যাট TI-XXXX)',
 fSchool: 'স্কুল বা প্রতিষ্ঠান',
 hSection4: 'স্বাক্ষর',
 fDate: 'তারিখ',
 fSignature: 'অভিভাবক/রক্ষকের স্বাক্ষর',
 footer: 'ফর্মটি thuisitaliaans.com থেকে তৈরি — সংস্করণ 1.0।',
 mtNotice: 'এই ফর্মটি স্বয়ংক্রিয়ভাবে অনুবাদ করা হয়েছে এবং কিছু ভাষার সঠিকতা সীমাবদ্ধ হতে পারে। কোনো ভুল দেখলে thuisitaliaans@gmail.com-এ লিখুন।'
 },

 tl: {
 title: 'Form ng Pahintulot ng Magulang',
 subtitle: 'Para sa tampok na "Classe" ng app na ti',
 printHint: 'Para i-save bilang PDF: pindutin ang Ctrl+P (Windows) o ⌘P (Mac) at piliin ang "Save as PDF".',
 printBtn: '🖨️ I-print / I-save bilang PDF',
 introP: 'Punan ang form na ito at ibigay itong nakalagda sa guro ng Italyano bago sumali ang iyong anak sa klase.',
 hSection1: 'Mga detalye',
 fParent: 'Ako, ang lumagda sa ibaba (buong pangalan ng magulang o tagapag-alaga)',
 fStudent: 'Magulang/tagapag-alaga ng (buong pangalan ng estudyante)',
 fBirth: 'Petsa ng kapanganakan ng estudyante',
 hSection2: 'Deklarasyon',
 consentP: 'Pinapahintulutan ko ang pagkolekta at pagpoproseso ng sumusunod na datos tungkol sa aking anak sa pamamagitan ng tampok na Classe ng app na ti, para sa layunin ng edukasyonal na pagsubaybay ng kanyang guro ng Italyano:',
 dataItems: [
 'ang piniling username (hindi kinakailangang totoong pangalan);',
 'ang naabot na antas ng Italyano (A1–C2);',
 'ang bilang at uri ng mga natapos na ehersisyo sa app;',
 'ang serye ng magkakasunod na araw ng pag-aaral (streak);',
 'listahan ng hanggang 5 salitang nahirapan siya kamakailan;',
 'ang kasalukuyang yugto ng landas ng pag-aaral;',
 'ang petsa at oras ng huling update.'
 ],
 infraP: 'Ang datos ay nakaimbak sa pampublikong CloudKit database ng iCloud (pinapatakbo ng Apple Inc.) at nakikita lamang ng guro na namamahala sa klase at ng ibang mga estudyante sa parehong klase (leaderboard lamang ng ehersisyo, at kung ito ay pinagana ng guro). Ang datos ay HINDI ginagamit para sa advertising, HINDI ibinabahagi sa mga third party, HINDI ginagamit para sanayin ang mga AI model.',
 controllerP: 'Data controller: ang guro/paaralan. Data processor sa ilalim ng Art. 28 GDPR: Thuis Italiaans (Ede, Netherlands), makokontak sa thuisitaliaans@gmail.com.',
 legalBasisP: 'Ang pahintulot na ito ay ibinibigay sa ilalim ng Art. 8 GDPR at Art. 2-quinquies ng Italian Privacy Code (Legislative Decree 196/2003 na binago ng Legislative Decree 101/2018).',
 rightsP: 'Maaaring bawiin ang pahintulot anumang oras sa pamamagitan ng pagsulat sa guro at/o sa thuisitaliaans@gmail.com. Pagkatapos ng pag-atras, ang natitirang datos ay tatanggalin sa loob ng 30 araw.',
 hSection3: 'Guro at klase',
 fTeacher: 'Buong pangalan ng guro',
 fClassCode: 'Code ng klase (format TI-XXXX)',
 fSchool: 'Paaralan o institusyon',
 hSection4: 'Lagda',
 fDate: 'Petsa',
 fSignature: 'Lagda ng magulang/tagapag-alaga',
 footer: 'Form na ginawa mula sa thuisitaliaans.com — bersyon 1.0.',
 mtNotice: 'Ang form na ito ay awtomatikong isinalin at maaaring may mga pormulasyon na hindi ganap na tumpak. Kung makakita ka ng mali, sumulat sa thuisitaliaans@gmail.com.'
 },

 ti: {
 title: 'ናይ ወለዲ ፍቓድ ቅጥዒ',
 subtitle: 'ናይ ti ኣፕ ናይ «Classe» ተግባር',
 printHint: 'ከም PDF ንምዕቃብ፦ Ctrl+P (Windows) ወይ ⌘P (Mac) ጠውቕ ከምኡ\'ውን «Save as PDF» ምረጽ።',
 printBtn: '🖨️ ሓትም / ከም PDF ዓቅብ',
 introP: 'ነዚ ቅጥዒ ምላእ ከምኡ\'ውን ወደኻ/ጓልካ ናብ ክፍሊ ቅድሚ ምእታዉ ተፈሪሙ ናብ መምህር ጣልያንኛ ኣሕልፍ።',
 hSection1: 'ሓበሬታ',
 fParent: 'ኣነ ኣብ ታሕቲ ዝፈረምኩ (ናይ ወላዲ ወይ ተኸናኸኒ ሙሉእ ስም)',
 fStudent: 'ወላዲ/ተኸናኸኒ ናይ (ሙሉእ ስም ተማሃራይ)',
 fBirth: 'ዕለት ልደት ተማሃራይ',
 hSection2: 'መግለጺ',
 consentP: 'ብመንገዲ ናይ ti ኣፕ Classe ተግባር፣ ንመምህር ጣልያንኛ ናይ ትምህርታዊ ክትትል ንምግባር፣ ናይ ወደይ/ጓለይ ዝስዕቡ ሓበሬታታት ንምእካብ ከምኡ\'ውን ንምሕዛእ ይፈቅድ ኣለኹ፦',
 dataItems: [
 'ዝተመረጸ ስም ተጠቃሚ (ግድን ናይ ሓቂ ስም ኣይኮነን);',
 'ዝበጽሖ ደረጃ ጣልያንኛ (A1–C2);',
 'ኣብ ኣፕ ዝፈጸሞ ልምምዳት ብዝሒን ዓይነትን;',
 'ተኸታታሊ ኣብ መዓልቲ ናይ ትምህርቲ ሰርሒት (streak);',
 'ኣብ ቀረባ ግዜ ዘጸግምዎ ክሳብ 5 ቃላት ዝርዝር;',
 'ሕጂ ናይ ዘሎ ናይ ትምህርቲ መንገዲ ደረጃ;',
 'ናይ መወዳእታ ምዕባለ ዕለትን ሰዓትን።'
 ],
 infraP: 'ሓበሬታታት ኣብ ናይ iCloud ህዝባዊ CloudKit ዳታቤዝ (ብ Apple Inc. ዝማሓደር) ይቕመጡ፣ ንዘመሓድር መምህር ናይ\'ቲ ክፍሊ ከምኡ\'ውን ንኻልኦት ናይ ተመሳሳሊ ክፍሊ ተማሃሮ ጥራይ ይረኣዩ (ናይ ልምምድ ደረጃ ብቕዓት ጥራይ፣ ብመምህር ዝተኸፈተ እንተኾይኑ)። ሓበሬታታት ንመወዓውዒ ኣይግልገሉን፣ ንሳልሳይ ወገን ኣይማላኡን፣ ንኣይ-ኤ ሞዴላት ንምስልጣን ኣይግልገሉን።',
 controllerP: 'ናይ ኣቓልቦታት ተቖጻጻሪ፦ መምህር/ቤት ትምህርቲ። ብዓንቀጽ 28 ናይ GDPR ናይ ኣቓልቦታት ኣገልጋሊ፦ Thuis Italiaans (Ede, ኔዘርላንድ)፣ ብ thuisitaliaans@gmail.com ክረኸብ ይኽእል።',
 legalBasisP: 'እዚ ፍቓድ ብዓንቀጽ 8 ናይ GDPR ከምኡ\'ውን ብዓንቀጽ 2-quinquies ናይ ጣልያናዊ ናይ ስም ስቕታ ኮድ (Legislative Decree 196/2003 ብ Legislative Decree 101/2018 ዝተመሓየሸ) ይዋሃብ።',
 rightsP: 'ፍቓድ ኣብ ዝኾነ ግዜ ንመምህር ወይ ናብ thuisitaliaans@gmail.com ብምጽሓፍ ክግድፍ ይኽእል። ድሕሪ ምግዳፍ፣ ዝተረፉ ኣቓልቦታት ኣብ ውሽጢ 30 መዓልቲ ይስረዙ።',
 hSection3: 'መምህርን ክፍልን',
 fTeacher: 'ሙሉእ ስም መምህር',
 fClassCode: 'ኮድ ክፍሊ (ቅርጺ TI-XXXX)',
 fSchool: 'ቤት ትምህርቲ ወይ ትካል',
 hSection4: 'ፊርማ',
 fDate: 'ዕለት',
 fSignature: 'ፊርማ ወላዲ/ተኸናኸኒ',
 footer: 'ቅጥዒ ካብ thuisitaliaans.com ዝተፈጠረ — ስሪት 1.0።',
 mtNotice: 'እዚ ቅጥዒ ብኣውቶማቲክ ዝተተርጎመ እዩ፣ ገሊኡ ኣገላልጻ ምሉእ ብምሉእ ትኽክለኛ ኣይኮነን ክኸውን ይኽእል። ዝኾነ ጌጋ እንተ ርኢኻ፣ ናብ thuisitaliaans@gmail.com ጽሓፍ።'
 }
 };

 // ─── UTIL ────────────────────────────────────────────────────────────────
 function currentLang() {
 const l = (document.documentElement.lang || 'it').toLowerCase();
 return T[l] ? l : 'it';
 }

 function esc(s) {
 return String(s)
 .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
 }

 // ─── GENERATORE HTML ─────────────────────────────────────────────────────
 function html(lang) {
 const t = T[lang] || T.it;
 const isRTL = RTL_LANGS.includes(lang);
 const dir = isRTL ? 'rtl' : 'ltr';
 const mtBanner = t.mtNotice
 ? `<div class="mt-notice">⚠️ ${esc(t.mtNotice)}</div>` : '';

 const items = t.dataItems.map(x => `<li>${esc(x)}</li>`).join('');

 return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<title>${esc(t.title)}</title>
<style>
 :root { color-scheme: light; }
 * { box-sizing: border-box; }
 body {
 font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
 color: #1a1a1a; background: #f4f4f2;
 margin: 0; padding: 24px;
 line-height: 1.5;
 }
 .page {
 max-width: 780px; margin: 0 auto; background: white;
 padding: 40px 48px; border-radius: 6px;
 box-shadow: 0 1px 3px rgba(0,0,0,0.08);
 }
 .banner {
 background: #fff8e1; border: 1px solid #f9d67a;
 padding: 14px 18px; border-radius: 6px; margin-bottom: 24px;
 display: flex; align-items: center; justify-content: space-between;
 gap: 16px; flex-wrap: wrap;
 }
 .banner p { margin: 0; font-size: 14px; color: #705000; }
 .banner button {
 background: #333; color: white; border: 0; padding: 10px 18px;
 border-radius: 5px; font-size: 14px; cursor: pointer;
 font-family: inherit;
 }
 .banner button:hover { background: #000; }
 .mt-notice {
 background: #fde7e7; border: 1px solid #eea; color: #7a3030;
 padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; font-size: 13px;
 }
 h1 { font-size: 24px; margin: 0 0 4px; font-weight: 800; color: #111; }
 .subtitle { margin: 0 0 28px; color: #666; font-size: 14px; font-style: italic; }
 h2 {
 font-size: 15px; text-transform: uppercase; letter-spacing: .06em;
 color: #444; margin: 32px 0 12px; border-bottom: 1px solid #ddd; padding-bottom: 6px;
 }
 p { margin: 10px 0; font-size: 14px; }
 ul { margin: 8px 0 12px; padding-${isRTL ? 'right' : 'left'}: 22px; font-size: 14px; }
 li { margin: 4px 0; }
 .field { margin: 14px 0; }
 .field label {
 display: block; font-size: 12px; color: #555; margin-bottom: 4px;
 text-transform: uppercase; letter-spacing: .04em;
 }
 .field .line {
 border-bottom: 1px solid #333; height: 24px; width: 100%;
 }
 .row { display: flex; gap: 20px; margin: 14px 0; }
 .row .field { flex: 1; margin: 0; }
 .sign-row { display: flex; gap: 32px; margin-top: 22px; }
 .sign-row .field { flex: 1; margin: 0; }
 .sign-row .field.date { flex: 0 0 160px; }
 .footer {
 margin-top: 36px; padding-top: 14px; border-top: 1px solid #eee;
 font-size: 11px; color: #999; text-align: center;
 }

 /* Print styles: hide banner, tighten margins for A4 */
 @media print {
 body { background: white; padding: 0; }
 .page { box-shadow: none; padding: 20mm; max-width: none; border-radius: 0; }
 .banner { display: none; }
 @page { size: A4; margin: 0; }
 }

 /* Language-specific font size adjustments */
 html[lang="ar"] body, html[lang="bn"] body, html[lang="zh"] body, html[lang="ti"] body {
 font-size: 15px;
 }
</style>
</head>
<body>
<div class="page">
 <div class="banner">
 <p>${esc(t.printHint)}</p>
 <button onclick="window.print()">${esc(t.printBtn)}</button>
 </div>
 ${mtBanner}
 <h1>${esc(t.title)}</h1>
 <p class="subtitle">${esc(t.subtitle)}</p>
 <p>${esc(t.introP)}</p>

 <h2>${esc(t.hSection1)}</h2>
 <div class="field"><label>${esc(t.fParent)}</label><div class="line"></div></div>
 <div class="row">
 <div class="field"><label>${esc(t.fStudent)}</label><div class="line"></div></div>
 <div class="field" style="flex:0 0 160px;"><label>${esc(t.fBirth)}</label><div class="line"></div></div>
 </div>

 <h2>${esc(t.hSection2)}</h2>
 <p>${esc(t.consentP)}</p>
 <ul>${items}</ul>
 <p>${esc(t.infraP)}</p>
 <p>${esc(t.controllerP)}</p>
 <p>${esc(t.legalBasisP)}</p>
 <p>${esc(t.rightsP)}</p>

 <h2>${esc(t.hSection3)}</h2>
 <div class="field"><label>${esc(t.fTeacher)}</label><div class="line"></div></div>
 <div class="row">
 <div class="field"><label>${esc(t.fClassCode)}</label><div class="line"></div></div>
 <div class="field"><label>${esc(t.fSchool)}</label><div class="line"></div></div>
 </div>

 <h2>${esc(t.hSection4)}</h2>
 <div class="sign-row">
 <div class="field date"><label>${esc(t.fDate)}</label><div class="line"></div></div>
 <div class="field"><label>${esc(t.fSignature)}</label><div class="line"></div></div>
 </div>

 <div class="footer">${esc(t.footer)}</div>
</div>
</body>
</html>`;
 }

 // ─── API PUBBLICA ────────────────────────────────────────────────────────
 function apri(lang) {
 const l = lang || currentLang();
 const doc = html(l);
 const blob = new Blob([doc], { type: 'text/html;charset=utf-8' });
 const url = URL.createObjectURL(blob);
 // Prova a aprire in nuova tab; se il popup è bloccato, forza download.
 const win = window.open(url, '_blank', 'noopener');
 if (!win) {
 const a = document.createElement('a');
 a.href = url;
 a.download = 'Modulo_Consenso_Classe_' + l.toUpperCase() + '.html';
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 }
 // Rilascia la ObjectURL dopo un ritardo per non troncare la nuova tab.
 setTimeout(() => URL.revokeObjectURL(url), 30_000);
 }

 return { apri: apri, lingueDisponibili: Object.keys(T) };
})();
