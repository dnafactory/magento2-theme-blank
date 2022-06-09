### v2.1.7
#### Bug risolti:
- la ricerca nelle componenti dropdown non funziona

### v2.1.6
- aggiunto il supporto per php 8.1
- fix delle spaziature delle custom checkbox

### v2.1.5
- fix delle label con legend: quando in un fieldset è presente un elemento di tipo legend e multiple labels, il legend deve assumere la funzione di label

### v2.1.3
- fix della dimensione dei dropdown: precedentemente avevano un'altezza minima di 290px
- aggiunta la sanificazione delle stringhe utilizzate come querySelector

### v2.1.2
- Il mixin (less) per la scrollbar permette ora di inserire anche background-images
- Fix del selettore di label del form-control

### v2.1.1
- Aggiunto il supporto per le spaziature Bootstrap con CSS vars
- Refactoring degli stili delle icone

### v2.1.0
Importante refactoring dei caroselli
- Aggiornata la versione minima della dipendenza dnafactory/theme-frontend-blank
- Aggiornato il wrapper per il carosello di bootstrap, per venire incontro agli aggiornamenti del tema base: ora utilizza dnaCarousel come Abstract
- Aggiornato il mixin utilizzato da tiny slider (che ora è comunque deprecato)
- Rimossi gli stili specifici per tiny slider
- Aggiunti stili generici per i caroselli

#### Bug risolti:
- i dropdown non permettono lo scroll
- il qty controller cattura il touch durante lo swipe da mobile
- le icone dei custom controls (radio|checkbox|switches) non sono sempre correttamente centrate

#### Deprecati
- tiny-slider

### v2.0.5
- update degli stili dei dots
- Aggiunte utilities less per gestire correttamente il layout della pagina
- Aggiunto un controllo di sicurezza nelle utilities js
- Aggiunte le safe areas per i dispositivi apple (ios)

#### Bug risolti:
- i dropdown non permettono lo scroll
- il qty controller cattura il touch durante lo swipe da mobile
- le icone dei custom controls (radio|checkbox|switches) non sono sempre correttamente centrate

### v2.0.0-alpha.3
- Refactoring delle griglie:
  + griglie di bootstrap con Css vars
  + Layout gutter specifico, indipendente dal grid-gutter

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