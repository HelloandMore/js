window.onload = function() {

    var g = document.getElementById("gomb");

    g.onclick = function szamol() {
        // adatok kinyerése
        var f = parseInt(document.getElementById("fiuk").value);
            // console.log(typeof(f),f);
        var l = parseInt(document.getElementById("lanyok").value);
            // console.log(typeof(l),l);
            var hiba = document.getElementById("error")
            var oh = document.getElementById("ossz");
            var ah = document.getElementById("arany");  
    
            hiba.style.color = "red";
            hiba.style.fontWeight = "bold";
            hiba.style.marginTop = "20px";
        
            
            // eredmények kiiratása
            
            if (f < 0 || l < 0) {
                if (f < 0 &&l < 0){
                    hiba.innerHTML = "A FIÚK és LÁNYOK száma nem lehet negatív!";
                }
                else if (f < 0){
                    hiba.innerHTML = "A FIÚK száma nem lehet negatív!";
                }
                else if (l < 0){
                    hiba.innerHTML = "A LÁNYOK száma nem lehet negatív!";
                }
                
                oh.innerHTML = ""
                ah.innerHTML = ""
            }        
            else {
            // összlétszám és arányok számolása
            hiba.innerHTML = "";
            var o = f+l;
            var fa = Math.round(f/o*100);
            var la = 100-fa;
        

            oh.innerHTML = "Az osztály összlétszáma: "+o+" fő.";
            oh.style.color = "green";
            oh.style.fontWeight = "bold";
            oh.style.marginTop = "20px";
        
            ah.innerHTML = "A fiúk és lányok aránya: "+fa+"% : "+la+"%.";
            ah.style.backgroundColor = "yellow";
            ah.style.fontStyle = "italic";
            ah.style.width = "50%";
        };
    }

}
