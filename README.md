# DNAFactory - Corona Radiata
Tema base per Magento 2, pensato per l'utilizzo in DNAFactory.
Questo tema utilizza [Bootstrap 4](https://getbootstrap.com/docs/4.5/).
___

# Note per gli sviluppatori

## css
Nell'estendere questo tema, comincia copiando il file `css/source/_theme.less` nel tema figlio.  
Questo file contiene tutte le variabili utilizzate (quelle commentate possono essere utilizzate semplicemente decommentandole), quindi è bene considerarle sempre la prima scelta in caso di customizzazioni.

Cerca di ragionare sempre in ottica mobile first, quindi evita il più possibile le direttive ~~@media ... (max-width: ...)~~, in favore di un approccio del tipo `@media ... (min-width:...)`.
Allo stesso modo, evita di utilizzare segmenti: ~~@media ... (min-width: ...) and (max-width: ...)~~.

Quando scrivi codice less assicurati che sia **SEMPRE** incluso in una [less guard (da qui in poi "guardia")](http://lesscss.org/features/#mixins-feature-mixin-guards-feature).  
***È IMPORTANTE!***: in caso contrario, il codice sarà processato ed incluso in **tutti** gli asset prodotti.

Alcuni esempi:
* codice da includere in style-m.css (non soggetto a breakpoints):  
  ```less
  &when(@media-common=true){
    ...il tuo css
  }
  ```
* codice incluso in un breakpoint da tablet in su:  
  ```less
  .media-width(@extremum, @break) when (@extremum = 'min') and (@break = @screen__m) {
    ...il tuo css
  }
  ```
Per gli stessi motivi, cerca di **non scrivere mai** media queries direttamente in css. Utilizza il mixin `.media-width(@extremum, @break)` di Magento 2 in modo da non avere mai intersezioni tra breakpoints.  
Tuttavia, se dovessi avere la necessità di utilizzare una media query specifica, ricordati di uncluderla nella **guardia** `&when(@media-common=true)`.  
Tutti i breakpoint sono configurabili tramite variabili e, qualora fosse necessario (ad esempio dopo l'aggiunta di un breakpoint), potrai aggiungere delle **guardie** specifiche per la tua configurazione nel file _css/source/lib/responsive.less_.  
A tal proposito, quando si lavora su un tema figlio e si presenta la necessità di apportare modifiche strutturali, è **consigliato** procedere con l'override completo del file, al fine di evitare inutili ridondanze ed una mole eccessiva di regole css.  
Valuta le tue scelte tenendo sempre bene in mente che:
1. Se hai la possibilità di utilizzare variabili del tema, fallo. Altrimenti...
2. Hai la possibilità di utilizzare (nei template o nei layouts) una o più classi preesistenti? Fallo (fai sempre riferimento alla [documentazione di bootstrap](https://getbootstrap.com/docs/4.5/) e ricorda le utilities per il responsive). Altrimenti...
3. Hai la necessità di aggiungere delle regole css? Aggiungile nel relativo file `_extend.less` in una specifica **guardia**. Altrimenti...
4. Hai la necessità di rimuovere e/o modificare delle regole definite in un file ereditato? Esegui un override del file e specifica le tue modifiche. Altrimenti...
5. La modifica riguarda una funzionalità di bootstrap? Riparti dal punto 1 facendo riferimento ai sorgenti scss di Bootstrap (presenti nella dipendenza `dnafactory/module-bootstrap`).

### Fogli di stile

Gli stili del tema (esclusi print ed email) sono divisi in 4 file css:
1. [critical.css](#1-critical)
2. [style-m.css](#2-style-mcss)
3. [styles-l.css](#3-styles-lcss)
4. [DNAFactory_Bootstrap/css/bootstrap.css](#4-bootstrapcss) (generato dai sorgenti scss tramite il relativo modulo)

#### 1. Critical
Contiene tutti gli stili che interessano il critical path: tutto ciò che è visibile al primo accesso alla pagina.
Sono state aggiunte delle specifiche **guardie** per la compilazione di questo file e sono:
* il type _'critical'_:  
  ```less
  &when (@media-type='critical'){
  ...il tuo css
  }
  ```
* le media queries sui vari breakpoints. Funzionano con il mixin `.media-width()` esattamente come le normali media queries, ma è necessario specificare una guardia sul parametro `@extremum='c-min'`:  
  ```less
  .media-width(@extremum, @break) when (@extremum = 'c-min') and (@break = @screen__m) {
    ...il tuo css
  }
  ```
  In ottica mobile-first, non sono previsti _c-max_.

Questi stili vengono aggiunti direttamente nel documento html, quindi fai attenzione a ciò che inserisci.
#### 2. styles-m.css
Non ci sono variazioni rispetto all'originale (contenuto in magento/theme-frontend-blank).
#### 3. styles-l.css
Non ci sono variazioni rispetto all'originale (contenuto in magento/theme-frontend-blank).
#### 4. Bootstrap.css
Il tema è basato su Bootstrap 4, quindi preferisci **sempre** l'utilizzo di classi bootstrap all'aggiunta di altro codice css.  
Utilizza/estendi questi sorgenti soltanto se hai la necessità di utilizzare mixin, functions o variabili definite in scss.  
Come per l'utilizzo delle **guardie** in less, un buon mix di direttive `@extend` e mixins, può ridurre notevolmente le righe di codice e le ridondanze negli assets prodotti.

### Modificare/aggiungere colori al tema

### Aggiungere un breakpoint
Come per qualunque altra variabile less, tutti i breakpoint sono condivisi con i sorgenti scss di Bootstrap.
In più, è presente un sistema (sperimentale) che permette di condividere i bp (definiti nel progetto less) con le componenti JS.
Farò riferimento a questa feature utilizzando il nome __CSS->JS__. Funziona in 2 step:
1. i bp vengono inseriti nello style del documento come [variabili css](https://www.w3.org/TR/css-variables-1/)
2. la componente `js/lib/dna-responsive`, richiamata all'occorrenza, restituisce il valore del bp richiesto, leggendolo direttamente dal document.


Le variabili presenti (da @screen__xxs a @screen_xl) dovrebbero essere sufficienti a coprire tutte le eventuali necessità.
Tuttavia, quando e se necessario, è possibile aggiungerne di personalizzati seguendo queste indicazioni al fine di conservare tutte le features associate:
1. Definisci il tuo bp come variabile all'interno del file `_variables.less` del tuo tema figlio;
2. Copia il file `lib/_responsive.less` all'interno del tuo tema figlio e modifica/aggiungi le guardie di cui hai bisogno;
3. __PER LA GENERAZIONE DELLE CLASSI BOOTSTRAP:__ crea (se non è presente) il file `DNAFactory_Bootstrap/web/css/source/scss/themes/_extends.scss` 
   all'interno del tuo tema figlio ed estendi le variabile come definito nella [documentazione ufficiale](https://getbootstrap.com/docs/4.5/layout/grid/#variables));
4. __SOLO PER LA FEATURE CSS->JS:__ copia il file `_responsive-vars.less` nel tuo tema figlio ed aggiungi il tuo bp (leggi la doc interna per i dettagli);

Si consiglia di evitare (o quantomeno limitare) l'utilizzo di bp custom e di utilizzare __SEMPRE__ le specifiche guardie all'interno del codice less.

### Utilizzare il layout full-width

### Aggiungere un'icona oppure un set di icone

## Templating

### Traduzioni / Localizazzione
Quando lavori a questo tema, utilizza **sempre** l'ingese come lingua base: la localizzazione deve poter essere effettuata facendo riferimento ad UNA SOLA lingua di partenza e Magento 2 utilizza il codice _en_US_ di default.



## JS
Per permettere l'implementazione e l'esecuzione di moduli AMD in JS (vanilla) è stato realizzato un mini-framework.

E' molto utile poter fare affidamento su moduli estendibili (tramite mixin o semplice override) anche per 
quanto riguarda le funzionalità non legate a specifici elementi del DOM, come ad esempio fix di compatibilità tra
browser, estensione di funzionalità degli input di base ecc...

E' stato quindi realizzato un plugin di base (in `js/lib/vanilla-plugin.js`) che permette di creare componenti JS
(da qui in poi JSComponent) le cui dipendenze sono caricate in modo asincrono.


### Markup di esempio per un carosello:
#### boxed
```html
<div data-mage-init='{ "dnaCarousel": { "middleWrapperClass":"row", "innerWrapperClass":"w-100" } }' class="slider flex-row d-flex flex-nowrap overflow-hidden">
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-success">Slide 1</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill bg-warning">Slide 2</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-primary">Slide 3</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-secondary">Slide 4</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-success">Slide 5</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill bg-warning">Slide 6</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-primary">Slide 7</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-secondary">Slide 8</div>
    </div>
</div>
```
#### full width
```html
<div data-mage-init='{ "dnaCarousel": { "middleWrapperClass":"full-width-container overflow-hidden", "innerWrapperClass":"mx-auto container px-0" } }' class="slider flex-row d-flex flex-nowrap overflow-hidden">
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-success">Slide 1</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill bg-warning">Slide 2</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-primary">Slide 3</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-secondary">Slide 4</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-success">Slide 5</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill bg-warning">Slide 6</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-primary">Slide 7</div>
    </div>
    <div class="slide col-3 d-inline-flex">
        <div class="flex-fill text-white bg-secondary">Slide 8</div>
    </div>
</div>
```