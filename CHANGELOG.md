### v2.0.0-alpha.2 [26/01/2021]
- Refactoring del dom-listener con MutationObserver e debouncing
- Affiancamento del modulo core per la gestione delle componenti configurabili
  + gestione di fallback per il critical.css
- css smooth scroll
- tablist
- responsive utilities (experimental)
- Pulizia dei file .less del vecchio tema
  + traduzione di eventuali mixin riutilizzabili.
- Spostamento delle delle regole scss specifiche per Bootstrap nel modulo `dnafactory/module-bootstrap`
- Pulizia dei layouts
- Pulizia dei template:
  + rimozione dei template non general-purpose
  + template di header e footer
  + refactoring delle traduzioni
- implementazione del carosello di bootstrap per dnaCarousel
- mixin di supporto per i caroselli

#### Bug risolti:
- il dom-listener non aggiorna correttamente i components
- il debounce dello scrollbar-fix non funziona correttamente

#### Bug noti:

---


### v2.0.0-alpha.1 [8/01/2021]
- Refactoring di theme.js
- aggiunte icone eye ed eye-off all'icon set
- aggiunta la componente password-utils (LESS+JS) per mostrare/nascondere la password
- aggiunta la componente custom-select (JS) per la gestione degli stili e degli eventi associati agli input di tipo `select`
- aggiunto il mixin (JS) per la gestione delle custom label

#### Bug risolti:
- il placeholder originale della custom select è visibile sotto la label placeholder effettiva
- la label placeholder degli input con icona si sovrappone all'icona

#### Bug noti:

---

### v2.0.0-alpha
- theme.js (mini-framework in js) con configurazione in json
- integrazione con bootstrap (less+scss/variabili)
- set di icone base
- utility per icone + icone multicolore
- fonts
- favicon
- mixin less di utilità generale
- sistema di generazione del critical.css
- controlli dei form customizzati:
    + password (con switch on/off della visibilità)
    + input focusabili
    + riconoscimento autocomplete
    + switch
    + radio e checkbox custom bootstrap
    + select custom
    + controlli con icona (con reverse + rtl)
- mixin less e classi css per elementi full-width
- plugin JS per l'autogenerazione di icone multipath
- label placeholder personalizzate (con switch on/off)

#### Bug noti:
- il placeholder originale della custom select è visibile sotto la label placeholder effettiva
- la label placeholder degli input con icona si sovrappone all'icona