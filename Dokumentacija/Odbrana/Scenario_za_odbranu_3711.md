# Scenario za odbranu rada Wheeler Dealers

Prezentacija je na srpskoj latinici. Osnovno izlaganje ima 14 slajdova i planirano traje oko 11 minuta i 40 sekundi. Sa kratkim pauzama cilj je približno 12 minuta. Slajd 15 sadrži fizički model baze i skriven je u standardnom prikazu. Vreme za pitanja komisije nije uračunato.

Govorni tekst je i u beleškama svakog slajda. Koristi ga za vežbu, a tokom odbrane govori svojim rečima. Prezentacija koristi postojeće snimke ekrana iz završnog rada i može da se izloži bez uključivanja aplikacije.

## Plan vremena

| Slajd | Tema | Trajanje | Ukupno |
| --- | --- | --- | --- |
| 1 | Wheeler Dealers | 0:25 | 0:25 |
| 2 | Cilj projekta | 0:45 | 1:10 |
| 3 | Korisnici i njihove mogućnosti | 0:50 | 2:00 |
| 4 | Arhitektura i tehnologije | 1:00 | 3:00 |
| 5 | Model podataka | 0:55 | 3:55 |
| 6 | Prijava i upravljanje sesijom | 1:00 | 4:55 |
| 7 | Pretraga oglasa | 1:15 | 6:10 |
| 8 | Detalji oglasa | 0:45 | 6:55 |
| 9 | Postavljanje oglasa | 1:00 | 7:55 |
| 10 | Kontrolna tabla i inventar firme | 1:00 | 8:55 |
| 11 | Administracija sadržaja | 0:50 | 9:45 |
| 12 | Testiranje i nedostaci | 0:55 | 10:40 |
| 13 | Rezultat rada i dalji razvoj | 0:50 | 11:30 |
| 14 | Pitanja | 0:10 | 11:40 |

## Govorni tekst

### 1 Wheeler Dealers

Dobar dan. Ja sam Andrija Cajić i predstaviću završni rad Wheeler Dealers, veb aplikaciju za prodaju i preprodaju automobila. Prikazaću cilj projekta, arhitekturu i model podataka, a zatim glavne funkcionalnosti kroz konkretne ekrane aplikacije. Na kraju ću se osvrnuti na testiranje i moguća unapređenja.

### 2 Cilj projekta

Motivacija za projekat potiče iz interesovanja za automobile i načina na koji funkcioniše tržište novih i polovnih vozila. Pojedinac obično želi jednostavno da oglasi svoj automobil, dok preprodavac ili auto-kuća imaju potrebu da se predstave kao profesionalni prodavci i pregledaju više oglasa. Cilj je bio da te potrebe obuhvatim u jednoj aplikaciji. Korisnik može da pronađe automobil prema tehničkim karakteristikama, pregleda oglas i kontaktira prodavca. Važno je precizno odrediti obim: aplikacija je oglasnik i ne realizuje kupoprodajni ugovor ili plaćanje. Prikazana početna stranica uvodi korisnika u te osnovne mogućnosti.

### 3 Korisnici i njihove mogućnosti

Sistem razlikuje nekoliko kategorija korisnika. Gost može da pregleda i pretražuje oglase. Registrovani korisnik dobija profil i mogućnost postavljanja oglasa. Preprodavac koristi isti osnovni nalog, ali ima poseban status i oznaku na oglasima. Firma se razlikuje po vezi sa podacima kompanije, kontrolnoj tabli i inventaru. Administrator održava šifarnike, pregleda korisnike i moderira oglase. U implementaciji ove kategorije ne predstavljaju pet zasebnih tabela ili pet vrednosti jednog polja. Izvode se iz administratorskog statusa, veze sa firmom i oznake preprodavca. Takav pristup je bio dovoljan za predviđeni obim projekta i omogućio je različitu navigaciju za različite korisnike.

### 4 Arhitektura i tehnologije

Aplikacija koristi troslojnu arhitekturu. Angular aplikacija se izvršava u pregledaču i sadrži komponente za stranice, servise za HTTP komunikaciju i forme za unos podataka. Angular Material obezbeđuje kontrole kao što su tabele, dijalozi i padajuće liste. Na serverskoj strani Django sa Django REST Framework bibliotekom izlaže API i pristupa bazi kroz ORM. Klijent i server razmenjuju JSON podatke, a za fotografije koriste multipart zahteve. Treći sloj je relaciona baza iz MySQL odnosno MariaDB porodice. Jasna granica između klijenta i API-ja omogućava da se svaki deo razume i razvija nezavisno. Fotografije se čuvaju kao fajlovi, dok baza sadrži njihove putanje.

### 5 Model podataka

Centralni entitet je Car. Isti zapis predstavlja automobil koji se oglašava i sadrži podatke kao što su godište, cena, snaga i broj sedišta. Veza sa User modelom označava prodavca. Model vozila je vezan za proizvođača, a proizvođač za državu. Vrste goriva, menjača i pogona izdvojene su u šifarnike, čime se smanjuje ponavljanje istih tekstualnih vrednosti. Jedan oglas može imati više slika, pa Image sadrži strani ključ ka automobilu. U modelu postoje pravila brisanja: većina šifarnika koristi RESTRICT, dok se zapisi slika brišu zajedno sa oglasom. Django migracije prate promene strukture baze. Detaljan fizički dijagram ostavljen je kao rezervni slajd za pitanja o relacijama.

### 6 Prijava i upravljanje sesijom

Prijava počinje unosom korisničkog imena i lozinke. Backend proverava kredencijale i vraća par JWT tokena. Access token traje jedan sat i šalje se u Authorization zaglavlju narednih zahteva. Refresh token traje tri dana i služi za pribavljanje novog pristupnog tokena. Angular interceptor dodaje token i pokreće osvežavanje kada prepozna istek. Podaci o sesiji čuvaju se u sessionStorage skladištu. Posle prijave aplikacija dodatno učitava korisnički profil, iz kojeg dobija podatke za navigaciju prema ulozi. Potrebno je razlikovati dve odgovornosti: guard-ovi upravljaju dostupnošću stranica u interfejsu, dok dozvole na serveru odlučuju da li API zahtev sme da se izvrši. Ovi mehanizmi povezuju korisničku sesiju sa pristupom pojedinim funkcionalnostima.

### 7 Pretraga oglasa

Pretraga je jedna od glavnih funkcionalnosti aplikacije. API podržava devetnaest parametara, uključujući proizvođača, model, gorivo, menjač, pogon, emisionu klasu, cenu, godište, snagu i zapreminu motora. Korisnik može da kombinuje više kriterijuma. Na primer, može da traži vozilo određenog proizvođača sa zadatom maksimalnom cenom i rasponom godišta. Angular preuzima vrednosti forme i pretvara ih u parametre GET zahteva. Backend zatim postepeno sastavlja uslove korišćenjem Django Q objekata. Za proizvođača se koristi veza preko modela vozila, a rasponi cene i godišta prevode se u donju i gornju granicu upita. Rezultati se vraćaju kao podaci za kartice oglasa. Ako nema podudaranja, interfejs prikazuje obaveštenje.

Na slici pokazati nekoliko grupa filtera. Nema potrebe čitati svako polje.

### 8 Detalji oglasa

Iz rezultata pretrage korisnik otvara stranicu pojedinačnog oglasa. Na slajdu su prikazana tri isečka iste stranice. Levo se vide naziv i cena automobila, kao i galerija kroz koju korisnik može menjati fotografije. Desno su tehničke karakteristike, grupisane po motoru, prenosu i pogonu, enterijeru i opštim informacijama. U donjem desnom uglu prikazani su podaci o prodavcu i dugme za prikaz telefona. Interfejs zahteva prijavu za prikaz broja; samu kupoprodaju aplikacija ne obrađuje. Ovaj prikaz povezuje podatke o automobilu, slikama i prodavcu.

### 9 Postavljanje oglasa

Pri postavljanju oglasa korisnik unosi podatke kroz formular. Najpre bira proizvođača, a zatim aplikacija učitava odgovarajuće modele. Ostali podaci obuhvataju motor, gorivo, menjač, godište, cenu i karakteristike enterijera. Forma koristi validatore, a unos konjskih snaga automatski popunjava vrednost u kilovatima. Izabrane fotografije dobijaju lokalni pregled pre slanja. Čuvanje se odvija u dve faze: prvi zahtev kreira zapis automobila, a drugi otprema fotografije koristeći dobijeni identifikator oglasa. Takav redosled znači da neuspešno otpremanje slike ne mora da izgubi prethodno sačuvane podatke o automobilu. Korisnik dobija odgovarajuće obaveštenje. Isti dijalog koristi se i za izmenu u inventaru firme, što smanjuje ponavljanje forme i logike.

### 10 Kontrolna tabla i inventar firme

Za firmu je najvažnije upravljanje većim brojem oglasa. Posle prijave firma dobija kontrolnu tablu sa brojem oglasa, prosečnom cenom i podacima o najnovijem i najstarijem oglasu. Te vrednosti se u postojećoj verziji računaju u pregledaču na osnovu učitanog inventara. Inventar prikazuje vozila u tabeli, zajedno sa godinom, gorivom, menjačem, cenom i datumom objave. Akcije omogućavaju dodavanje, izmenu i brisanje, kao i otvaranje prikaza oglasa. Na ekranu su vidljivi konkretni primeri vozila i dugmad za te operacije. Ova funkcionalnost je posebno namenjena firmama.

### 11 Administracija sadržaja

Administrator ima drugačiji skup stranica. Održava vrednosti koje ostali korisnici biraju pri unosu i pretrazi, kao što su države, tipovi motora, goriva, menjači, proizvođači i modeli. Za ove resurse korišćeni su DRF ViewSet-ovi. Oni objedinjuju standardne operacije pregleda, dodavanja, izmene i brisanja, pa nije potrebno za svaku tabelu pisati potpuno odvojenu implementaciju. Na frontend strani ove operacije koriste tabele i dijaloge. Administrator takođe može da pregleda korisnike, deaktivira nalog i obriše oglas. Potvrda pre destruktivne akcije smanjuje mogućnost slučajnog klika. Pri brisanju korišćenih šifarnika važna su ograničenja relacija između podataka.

### 12 Testiranje i nedostaci

Testiranje opisano u radu zasniva se pre svega na Bruno API zahtevima i ručnom prolasku kroz funkcionalnosti za različite korisnike. Takva provera obuhvata prijavu, registraciju, pretragu, rad sa oglasima i administratorske operacije. Bruno kolekcija ostaje uz projekat i pomaže da se zahtevi ponove. Ipak, važno je razdvojiti proveru uspešnog scenarija od potpune potvrde kvaliteta. U kodu postoje osnovni testovi, ali nisu razvijeni dovoljno da pokriju poslovne i granične slučajeve. Takođe nemam sistematsko merenje odziva sa većim skupom podataka ili istovremenim korisnicima. Neki korisnički tokovi nisu zaokruženi, na primer izmena i brisanje oglasa za običnog korisnika kroz interfejs. Zato razlikujem funkcionalnosti koje sam demonstrirao od oblasti koje zahtevaju dodatni razvoj i proveru.

### 13 Rezultat rada i dalji razvoj

Glavni rezultat rada je povezivanje klijentske aplikacije, API-ja i relacione baze u jednu funkcionalnu celinu. Kroz projekat sam prošao od projektovanja podataka i definisanja uloga do implementacije pretrage, formulara, inventara i administracije. Posebno iskustvo bilo je povezivanje reaktivnih Angular formi sa Django serijalizacijom i radom sa datotekama. Postojeća verzija ima jasno ograničen obim i poznate nedostatke. Dalji razvoj obuhvatio bi upravljanje oglasima za obične korisnike i uvođenje paginacije. Kod ORM upita optimizacija bi podrazumevala smanjenje dodatnih upita za povezane podatke, na primer korišćenjem select_related i prefetch_related. Takođe bih unapredio serversku validaciju i zaštitu kontakt podataka, koji sada nisu u potpunosti zaštićeni samim skrivanjem telefona u interfejsu. Ovim unapređenjima postojeća osnova bi postala pouzdanija za dalji razvoj.

### 14 Pitanja

Hvala na pažnji. Spreman sam da odgovorim na vaša pitanja.

### 15 Rezervni slajd za pitanja o bazi

Ovaj slajd je rezerva za razgovor o relacijama. Centralni entitet je Car. Pokazati vezu sa prodavcem, modelom vozila, šifarnicima i slikama. Veza korisnika sa firmom je opcioni strani ključ i može povezati više korisnika sa istom firmom. Pri tumačenju pravila brisanja osloniti se na Django modele. Dijagram je pregled strukture i ne treba čitati sve kolone tokom osnovnog izlaganja.

## Ako želiš demonstraciju uživo

Nemoj dodavati dugačku demonstraciju na već planiranih 12 minuta. Kratak obilazak aplikacije može da zameni deo objašnjavanja slajdova 7 do 11. To zavisi od već pripremljenog okruženja, bez menjanja zamrznutog projekta. Ako okruženje nije spremno, isti tok objasni pomoću slika.

1. Pretraga, oko 45 sekundi: promeni najviše dva kriterijuma i prikaži rezultat.
2. Detalji oglasa, oko 30 sekundi: otvori unapred izabran automobil i promeni fotografiju.
3. Inventar firme, oko 45 sekundi: pokaži tabelu i otvori dijalog. Nije neophodno sačuvati promenu.
4. Administracija, oko 30 sekundi: pokaži šifarnik i jedan dijalog. Nije neophodno brisati podatke.

Ukupno oko dva i po minuta, kao zamena za deo izlaganja uz slike. Ako nešto ne reaguje, nastavi sa sledećim slajdom i objasni prikazani tok.

## Precizne formulacije za odbranu

Umesto „ispunjena su sva 74 zahteva“, reci: „Realizovane su ključne funkcionalnosti oglasnika. Njih sam proveravao kroz API zahteve i ručne korisničke scenarije, uz poznata ograničenja postojeće verzije.“

Umesto „sistem je potpuno bezbedan“, objasni konkretne mehanizme: heširanje lozinki, JWT, guard-ove i serverske dozvole. Postojanje mehanizma ne znači da su provereni svi načini njegovog zaobilaženja.

Nemoj navoditi kilometražu kao implementirani filter, garantovan odziv do dve sekunde, rezultate testiranja opterećenja ili kompletnu automatizovanu pokrivenost. U projektu nema osnova za takve tvrdnje.

Običan korisnik ima dodavanje oglasa. API podržava vlasničku izmenu i brisanje, ali običnom korisniku nedostaje odgovarajuća stranica. Firma već ima te akcije u inventaru.

Za tehnologije navedi verzije korišćene u radu. Nije potrebno da ih opisuješ kao najnovije. Objasni zašto su bile prikladne za arhitekturu i ono što si naučio.

## Moguća pitanja komisije

### Zašto Angular i Django

Angular je odgovarao komponentnoj aplikaciji sa formama, servisima i navigacijom. Django i DRF su olakšali modelovanje podataka, migracije, serijalizaciju i standardne API operacije. Najvažniji deo odgovora je kako si ih konkretno povezao u projektu.

### Šta je razlika između autentifikacije i autorizacije

Autentifikacija proverava identitet, odnosno ko šalje zahtev. Autorizacija određuje koje radnje taj korisnik sme da izvrši. JWT predstavlja identitet u API komunikaciji. Guard upravlja navigacijom u pregledaču, dok serverska dozvola odlučuje o pristupu API resursu.

### Da li je broj telefona zaštićen samo interfejsom

U postojećoj verziji interfejs traži prijavu za prikaz telefona, ali serijalizovani podaci oglasa ipak sadrže kontakt podatke. To je nedostatak serverske kontrole privatnosti. Ispravno rešenje zahtevalo bi javni odgovor bez tih polja i odvojeno autentifikovano dobijanje kontakta.

### Kako se razlikuju korisnik, preprodavac i firma

Preprodavac je status korisnika, a firma ima vezu sa zapisom kompanije preko PIB stranog ključa. Administrator se prepoznaje po administratorskim poljima. Uloge nisu pet zasebnih modela.

### Zašto su automobili povezani sa šifarnicima

Šifarnici sprečavaju nepotrebno ponavljanje naziva i daju konzistentan skup vrednosti za forme i pretragu. Strani ključevi predstavljaju veze i štite integritet podataka. Model i proizvođač su različiti entiteti jer jedan proizvođač ima više modela.

### Šta se dešava pri brisanju

Za većinu korišćenih šifarnika RESTRICT sprečava brisanje povezane vrednosti. Zapisi slika imaju CASCADE vezu sa oglasom. Brisanje zapisa slike ne znači automatski i uklanjanje fizičkog fajla. Obrada i objašnjenje takvih grešaka korisniku predstavljaju prostor za unapređenje.

### Kako radi pretraga

Vrednosti forme postaju query parametri GET zahteva. Backend sastavlja Q uslove i izvršava ORM upit. Parametar proizvođača prolazi kroz vezu modela, a cenovni i godišnji rasponi postaju poređenja sa donjom i gornjom granicom. Trenutna verzija nema merenje koje dokazuje garantovani odziv za svaki standardni upit.

### Zašto je otpremanje slika odvojeno

Prvo se sačuva automobil i dobije njegov identifikator. Zatim se šalju slike. Ako upload ne uspe, oglas ostaje sačuvan i korisnik dobija obaveštenje. Dalje unapređenje obuhvatilo bi proveru sadržaja i veličine fajlova, jedinstvena imena i čišćenje fajlova.

### Šta bih prvo unapredio

Najpre bih ujednačio serversku validaciju i pravila vlasništva, zatim popravio korisničko upravljanje oglasima i proširio testove. Posle toga bih dodao paginaciju i optimizovao pristup povezanim podacima. Nove velike funkcionalnosti bile bi naredna faza.

### Kako je projekat testiran

Razlikuj ono što je opisano i izvedeno tokom razvoja od pregleda urađenog naknadno. U radu su navedeni Bruno API zahtevi i ručni korisnički scenariji. Automatska pokrivenost je ograničena. Nemoj predstavljati naknadne provere iz izveštaja pregleda kao testove koje si tada sam izveo.

## Poređenje postojećih prezentacija

`3711.Andrija.Cajic.pptx` sadrži 15 slajdova o Toyota modelima i nije prezentacija završnog rada Wheeler Dealers.

`WheelerDealers_Prezentacija.pptx` sadrži relevantan okvir od 15 slajdova. Kao osnova ima dobar redosled tema, ali pominje nepostojeći filter kilometraže i tvrdi da su ispunjeni svi zahtevi. Nema stvarne ekrane aplikacije u glavnom toku i nema razrađen govorni tekst za 10 do 15 minuta. Nova prezentacija predstavlja zaseban fajl. Originali i aplikacioni kod ostaju neizmenjeni.

## Šta znači da svi zahtevi nisu potvrđeni

To obuhvata tri različite stvari, a ne tvrdnju da glavne funkcionalnosti ne postoje.

| Vrsta razlike | Primer | Kako to objasniti |
| --- | --- | --- |
| Nedovršen korisnički tok | FZ-016 i FZ-017 iz zasebnih funkcionalnih zahteva: običan korisnik nema stranicu za izmenu i brisanje svojih oglasa | API postoji, ali korisnički interfejs za tu ulogu nije završen |
| Pravilo nije potpuno sprovedeno | FZ-005: telefon je skriven u interfejsu, ali prisutan u javnom API odgovoru | Prezentaciona kontrola i zaštita podataka na serveru su različite stvari |
| Pravilo nije dosledno | FZ-050: filtrirana pretraga uklanja banovane prodavce, početni spisak ih vraća | Različiti endpointi koriste različite uslove |
| Nedostaje serverska provera | FZ-014: kreiranje oglasa kroz API ne zahteva telefon | Pravilo se ne potvrđuje na svim ulaznim putevima |
| Nema dovoljnog dokaza | NF-001 i NF-002: odziv do dve sekunde i konkurentni korisnici | Potrebna su merenja na definisanom skupu podataka i opterećenju |

Brojevi iz tabele odnose se na zaseban dokument funkcionalnih zahteva sa 50 stavki. Glavni rad koristi listu od 46 stavki sa drugačijim brojevima. Stariji predlog sadrži i kalkulator registracije i pretragu po kilometraži/lokaciji, koji nisu deo isporučene implementacije. To su razlike u obimu između dokumenata i ne treba ih mešati sa brojevima iz konačne liste zahteva.

## Vežba pre odbrane

Prođi celu prezentaciju naglas sa štopericom. Ciljaj oko 12 minuta, bez žurbe i bez čitanja svakog polja na slikama. Ako prelaziš 15 minuta, skrati nabrajanje filtera i objašnjenje administratorskih tabela. Ako traje kraće od 10 minuta, detaljnije objasni jedan zahtev kroz put od Angular forme do API-ja i baze.

Otvori konačni PPTX na računaru sa kog ćeš izlagati i proveri prikaz slika, fontova i beležaka. Rezervni slajd 15 je skriven. Pitanja komisije dolaze nakon završnog slajda.
