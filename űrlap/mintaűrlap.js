// kezdésnél a Vezetéknév mező legyen fókuszba helyezve
// objektum.focus()

let veznev = document.getElementById("vnev");
veznev.focus();

// elem elveszti a fókuszt, elhagyjuk a mezőt = blur
// eseménykezelője: onblur
// változott-e a mező tartalma: change - onchange
// történt-e adatbevitel: input - oninput

// veznev.onblur = () => {}
veznev.addEventListener("blur",
 () => {
    if (veznev.value == "") {
        alert("Nincs érdemi adat a vezetéknévnél!");
        veznev.focus();
        veznev.value="Ide írj be egy vezetéknevet...";
        veznev.select();
    }
  });

  // input esemény figyelése a textarea mezőnél
  // számolni fogjuk a beírt karaktereket
  // megjelenítjük a még beírható karakterek számát

  let terulet = document.getElementById("k2");

  // objektum.getAttribute("tulajdonságnév") = lekérdezzük a megadott tulajdonság értékét
  // objektum.setAttribute("tulajdonságnév") = "érték" - ezzel beállítható egy HTML-tag egyik tulajdonságának értéke
  let maxhossz = terulet.getAttribute("maxlength");

  document.getElementById("akt").innerHTML = "0";
  document.getElementById("meg").innerHTML = maxhossz;


  terulet.addEventListener("input",
    () => {
      let akthossz = terulet.value.length;
      document.getElementById("akt").innerHTML = akthossz;
      document.getElementById("meg").innerHTML = maxhossz-akthossz;
    }
  )

  // megkeressük a html oldalon a k3 azonosítójú elemben lévő select option-jeit: querySelectorAll("szelektor")

  document.getElementById("k3").addEventListener("change",
    () => {
            let k3opciok = document.querySelectorAll("#k3>option");
            // console.log(k3opciok);
            for (i in k3opciok) {
              if (k3opciok[i].selected && k3opciok[i].value == "3") {
                  document.getElementById("k3e").innerHTML = "Helyes a válasz!";
                }
                else document.getElementById("k3e").innerHTML = "Helytelen a válasz!";
              }
          }
  )
