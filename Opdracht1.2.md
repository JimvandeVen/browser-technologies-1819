# Browser Technologies
## Opdracht 1.2 - Fork je OBA
Hoe zit het eigenlijk met Progressive Enhancement van je OBA Web App? Waarschijnlijk kan daar wel het één en ander aan verbeterd worden, dat ding is immers in een week in elkaar gehackt!

### Doel van deze opdracht
Het doel van de deze opdracht is leren hoe je een website kan testen op een Device lab en hoe een screenreader werkt.

### Uitleg
Pas Progressive enhancement toe op je OBA Web App. Test de 8 features uit opdracht 1.1 en verbeter de code waar mogelijk. Test je OBA Web App in het Device Lab en laat je website voorlezen door een screenreader.

Gebruik onderstaande artikelen om je code te optimaliseren en om je voor te bereiden op de opevering van aanstaande vrijdag:
- [Understanding Progressive Enhancement by Aaron Gustafson](https://alistapart.com/article/understandingprogressiveenhancement)
- [I Turned Off JavaScript and it was Glorious](https://www.wired.com/2015/11/i-turned-off-javascript-for-a-whole-week-and-it-was-glorious/)
- [The accessibility mindset](https://24ways.org/2015/the-accessibility-mindset/) 

### Afbeeldingen/Screenreader
De afbeeldingen die ik heb gebruikt in de applicatie zijn niet perse nodig. Daarom heb ik een lege alt toegevoegd. Ze laten namelijk enkel een kleine, vrij generieke, afbeelding zien van de activiteit. Ik ben er wel achter gekomen dat een aantal van de teksten niet geheel worden voorgelezen door de screenreader. Ik ben er niet achter gekomen waarom precies.

### Custom Fonts
Ik gebruik geen custom fonts. Mijn font is een google font en in de 'font-stack' is mijn laatste fallback sans-serif.

### Kleuren
Ik heb met de extension colorblindly van chrome, gekeken naar mijn website om te zien of hij toegankelijk is voor mensen die kleurenblind zijn. Ik kwam er achter dat de contrasten tussen geselecteerde en niet geselecteerde filters niet genoeg verschilden. Dit heb ik aangepast en nu is met elke vorm van kleurenblindheid duidelijk te zien welke filter er is geselecteerd.

### Breedband
Ik heb getest op een langzame 3G verbinding. De loading state die ik al had toegevoegd werkt vrij snel. Binnen een halve seconde komt de loading state. De images die geladen worden duren iets langer dan normaal. Maar omdat de images vrij klein zijn, minder dan 70kb, valt dit ook nog mee. Ik zou eventueel nog een placeholder kunnen toevoegen. 

### Geen Muis/Trackpad
Ik gebruik voor deze app een form met daarin een aantal radio buttons waarvan de labels zichtbaar zijn en veranderen wanneer ze geselcteerd zijn. Ik kwam erachter dat door `display: none;` te gebruiken op de radio buttons, je er niet doorheen kan tabben. Ik heb dit probleem verholpen door de radio buttons `position: fixed; left: -100vw; `  mee te geven. Misschien niet de mooiste oplossing maar wel effectief.

### Geen Javascript
Omdat deze applicatie volledig frontend is, is het onmogelijk om hem zonder javascript te gebruiken. Tenzij ik hem helemaal zou herschrijven tot een node applicatie. Maar dan komt het volgende probleem. De OBA API wrapper is momenteel niet bruikbaar als node package. Dus dat zal dan ook niet werken.

### Geen Cookies
Zowel de OBA API Wrapper als de code die ik zelf heb geschreven maken gebruik van de cache en de local storage. Zonder beide zal de applicatie niet werken.

### Geen Local Storage
Zowel de OBA API Wrapper als de code die ik zelf heb geschreven maken gebruik van de cache en de local storage. Zonder beide zal de applicatie niet werken.

### Criteria
- Zet je code op Github
- Schrijf een Readme met:
  - een beschrijving van alle features die je hebt getest
  - een beschrijving van de Device lab test en screenreader test.
  - beschrijf hoe je de problemen hebt opgelost, of hoe je dit zou oplossen (met todo’s) als je genoeg tijd en budget zou hebben
