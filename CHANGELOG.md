# Changelog

## 2026-08-31 · Nachtrag 2: Weiter-Pfeil & Cloudflare
- Der breite „Weiter"-Balken unter der Figur ist ersetzt durch einen runden Weiter-Pfeil (→) rechts neben dem Antwortfeld, innen im Kartenrahmen (Patron-Wunsch); pulsiert leicht, erscheint nach Lösen/Aufdecken.
- Neues Hosting: https://mathefix.pages.dev (Cloudflare Pages, Auto-Deploy bei jedem Push auf main).

## 2026-08-31 · Nachtrag: Master-Zugang & Pause 30 s

- **Master-Zugang (PIN 2017):** 🗝-Button im Kopf der Levelkarte. Richtige PIN → ALLE Blöcke und Blätter zum Anschauen freigeschaltet (Banner sichtbar, Zustand wird gespeichert). Erneut drücken → wieder aus. Umsetzung: Kurzschluss in der Freischalt-Prüfung `q()` über Flag `masterModus`.
- **Pflichtpause:** von Minuten auf Sekunden umgestellt, Standard **30 Sekunden**; Elternbereich-Einstellung jetzt „Pausenlänge (Sekunden, Standard 30)" (10–600). Alte Stände werden migriert (`be()`).
- tests.html: +5 Tests (29/29 grün).

## 2026-08-31 · Sitzung „Baukasten & Rechenblatt-Ordnung" (Claude Code, Branch `entwicklung`)

**Umstrukturierung**
- Repo geklont, App-Code aus Commit `d419e71` wiederhergestellt (funktional identisch mit der Live-Version auf start.mathefix.here.now — per Datei- und UI-Text-Abgleich verifiziert).
- Minifiziertes Ein-Datei-Bundle aufgetrennt: `index.html` (Gerüst) + `css/app.css` + `js/app.js` (lesbar formatiert). Eingebettete Fallback-Daten (257 KB Duplikat) entfernt — einzige Datenquelle ist `data/*.json`.
- Service-Worker-Cache auf `mathefix-v2` erhöht.

**A) Rechenblatt leicht → schwer**
- Schwere-Modell kalibriert: Zehnerübergang/-unterschreitung wiegt am meisten (+60), Zahlengröße nur halb; Mal +12, Geteilt +16; Kettenaufgaben Basis 130.
- Generator sortiert das Blatt streng aufsteigend; Ketten landen automatisch am Ende. Verifiziert über 12 Gruppen × 5 Seeds.

**B) Zahlen-Baukasten unter jeder Textaufgabe**
- Neu: `rechenwegParsen` / `rechenwegSchritte` (Klammern, Punkt-vor-Strich), `schritteSindKette`, `bausteinZahlen`, `baukastenBauen`, `illustrationBauen`.
- Treppenform (Patron-Skizze): Zahlen aus der Geschichte als Zieh-Bausteine, Kästchen untereinander; Zwischenergebnisse TIPPT das Kind (Ziffernblock-Weiterleitung); nächste Zahl rückt unter den Ergebnisblock ein; Endergebnis im großen Antwortfeld.
- Punkt-vor-Strich-Aufgaben: nummerierte Schritt-Zeilen, frühere Ergebnisse als Spiegel-Kästchen (füllen sich beim Tippen).
- Soft-Validierung: richtig platzierte/getippte Zahlen grün, daneben orange; bei Plus/Mal gilt beide Reihenfolgen.
- Neue Versuchslogik: 1. Fehler → Rechentipp, 3. Fehler → Aufdeckung mit illustrativer Schritt-für-Schritt-Erklärung (inkl. Symbol-Bildern bei kleinen ±-Schritten). Sterne: 3/2/1 nach Versuch, 0 bei Aufdeckung.

**Tests**
- `tests.html`: 24 Logiktests, alle grün — u. a. „alle 360 Rechenwege parsebar und ergeben die hinterlegte Antwort".

## 2026-08-28 · `d419e71` (Cowork)
- 360 Aufgaben in 2 Modulen (A–F + Profi G–L), Rechenblatt 15 Fragen nach jedem Block, Pause 1 Minute, Zahlenraum bis 100, Zehnerunterschreitung.

## 2026-08-27 · `d3d2fb5`
- Mathefix 1.0 – Erstversion.
