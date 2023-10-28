# ResourceWise
Web application for the ITFest x Adobe Hackathon

## Tematica
In a world striving to reduce waste and strengthen communities, ResourceWise emerges as the ultimate solution. 

Build an application to combat resource waste and connect those with surplus resources to those in need. For example, one use-case of this application could be connecting restaurants that have food prepared at the end of the day, with shelters or people in need. 

You can include features such as Interactive Mapping, to locate nearby donors and beneficiaries, minimizing resource transportation and environmental impact, or Gamification, to Earn rewards and points for your contributions, making your journey to reduce waste an enjoyable and fulfilling one.

## Disclaimer
Analiza de mai jos nu reflecta stadiul actual! Tot ce este prezentat este doar brainstorming

## Analiza textuala
Aplicația va avea un sistem de autentificare simplu. Pentru formularul de inregistrare, vor fi disponibile campurile: email, numar de telefon, nume complet, parola, confirmare parola. Toate campurile sunt obligatorii. Numele este unic si are o lungime intre 4 si 16 caractere. Parola are o lungime de minim 6 caractere cu majuscule si simboluri speciale. Dupa autentificare, folosind formulatorul de login, utilizatorul va putea naviga oriunde, exceptand paginile de register si login.
Vor exista doua tipuri de utilizatori: consumatori (consumer) si furnizori (provider). Consumatorii sunt cei care au nevoie de resurse, iar furnizorii sunt cei care doneaza. Implicit, toti utilizatorii sunt consumatori, dar vor avea posibilitatea de a aplica pentru statutul de furnizor oricand. Acest statut este oferit dupa o verificare a eligibilitatii, facuta de catre personalul aplicatiei, pentru a asigura un grad de incredere mai ridicat. Consumatorii pot fi atat persoane fizice, cat si juridice, pe cand furnizorii pot fi doar persoane juridice, cu exceptia persoanelor fizice care ofera imbracaminte. Furnizorii se impart in 3 subclase, putand face parte doar din una: restaurante, spitale, distribuitori de imbracaminte.
Formularul pentru solicitarea statutului de furnizor va avea urmatoarele campuri: tipul de persoana (camp necesar pentru donatorii de imbracaminte persoane fizice), tipul de furnizor (persoana fizica limitata la imbracaminte), numele companiei impreuna cu forma de organizare, numele responsabilului de tranzactii, adresa ridicarii produselor, 

Pentru a face procesul de donare unul distractiv, vor fi implementate urmatoarele ranguri; avansul intre ranguri se face cu fiecare donatie (Novice I (0 donatii) -> Novice II (1 donatii)):
- Novice I-III
- Generos I-III
- Altruist I-III
- Erou I-III
- Expert ResourceWise (peste 12 donatii)

Rangurile au, de asemenea, rolul de a inspira consumatorilor un grad suplimentar de incredere. O donatie este considerata atunci cand consumatorul si furnizorul confirma finalizarea tranzactiei.

Pagina principala (home page) va contine postari create de ambele categorii de utilizatori, in care cer, respectiv ofera, produse spre a fi donate. Postarile pot fi sterse oricand. O postare va arata astfel: 
- Consumator: nume utilizator, resursele solicitate, adresa (aplicatia va folosi pachetul @geocoder-free/google pentru a extrage coordonatele si a afisa punctul pe harta), descrierea tranzactiei;
- Furnizor: nume companie, rang, resursele de donat, adresa, descrierea tranzactiei.

La completarea resurselor din postare, se specifica pentru fiecare in parte:
- clasa: alimente, provizii medicale, imbracaminte
- subclasa: medicamente, oua, lapte, etc.
- data expirarii (pentru alimente si medicamente)
- conditie: alege una sau mai multe: sigilat (pentru carne, lapte, cascaval, paine, paste, medicamente, instrumente), neutilizat/utilizat (pentru echipamente, imbracaminte)
