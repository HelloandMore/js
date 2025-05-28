// API alapcím
const API_BASE = '/api';

// Oldal betöltésekor
document.addEventListener('DOMContentLoaded', function() {
    betoltSzamlak();
    betoltStatisztikak();
    betoltKiallitok();
    betoltVevok();
    
    // Mai dátum beállítása
    const mai = new Date().toISOString().split('T')[0];
    document.getElementById('szamla_kelte').value = mai;
    document.getElementById('teljesites_datuma').value = mai;
    
    // Fizetési határidő: 30 nap múlva
    const hatarido = new Date();
    hatarido.setDate(hatarido.getDate() + 30);
    document.getElementById('fizetesi_hatarido').value = hatarido.toISOString().split('T')[0];
});

// Számlák betöltése
async function betoltSzamlak() {
    try {
        const response = await fetch(`${API_BASE}/szamlak`);
        const szamlak = await response.json();
        
        const tabla = document.getElementById('szamlakTabla');
        tabla.innerHTML = '';
        
        szamlak.forEach(szamla => {
            const sor = document.createElement('tr');
            sor.innerHTML = `
                <td><strong>${szamla.szamla_szama}</strong></td>
                <td>
                    <div class="fw-bold">${szamla.vevo_nev}</div>
                    <small class="text-muted">${szamla.vevo_adoszam}</small>
                </td>
                <td>${formatDatum(szamla.szamla_kelte)}</td>
                <td class="${new Date(szamla.fizetesi_hatarido) < new Date() ? 'text-danger fw-bold' : ''}">${formatDatum(szamla.fizetesi_hatarido)}</td>
                <td><strong>${formatPenz(szamla.vegosszeg)} Ft</strong></td>
                <td><span class="badge bg-info">${szamla.afa_merteke}%</span></td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="szamlaTorles(${szamla.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-info btn-sm ms-1" onclick="szamlaReszletek(${szamla.id})" data-bs-toggle="modal" data-bs-target="#szamlaReszletekModal">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            tabla.appendChild(sor);
        });
    } catch (error) {
        console.error('Hiba a számlák betöltésekor:', error);
        alert('Hiba történt a számlák betöltésekor!');
    }
}

// Statisztikák betöltése
async function betoltStatisztikak() {
    try {
        const response = await fetch(`${API_BASE}/statisztikak`);
        const stats = await response.json();
        
        document.getElementById('szamlakSzama').textContent = stats.szamlakSzama?.count || 0;
        document.getElementById('vevokSzama').textContent = stats.vevokSzama?.count || 0;
        document.getElementById('osszVegosszeg').textContent = formatPenz(stats.osszesVegosszeg?.total || 0) + ' Ft';
    } catch (error) {
        console.error('Hiba a statisztikák betöltésekor:', error);
    }
}

// Kiállítók betöltése
async function betoltKiallitok() {
    try {
        const response = await fetch(`${API_BASE}/kiallitok`);
        const kiallitok = await response.json();
        
        const select = document.getElementById('kiallito_id');
        select.innerHTML = '<option value="">Válasszon kiállítót</option>';
        
        kiallitok.forEach(kiallito => {
            const option = document.createElement('option');
            option.value = kiallito.id;
            option.textContent = `${kiallito.nev} (${kiallito.adoszam})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Hiba a kiállítók betöltésekor:', error);
    }
}

// Vevők betöltése
async function betoltVevok() {
    try {
        const response = await fetch(`${API_BASE}/vevok`);
        const vevok = await response.json();
        
        const select = document.getElementById('vevo_id');
        select.innerHTML = '<option value="">Válasszon vevőt</option>';
        
        vevok.forEach(vevo => {
            const option = document.createElement('option');
            option.value = vevo.id;
            option.textContent = `${vevo.nev} (${vevo.adoszam})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Hiba a vevők betöltésekor:', error);
    }
}

// Új számla létrehozása
async function ujSzamlaLetrehozasa() {
    const formData = {
        kiallito_id: document.getElementById('kiallito_id').value,
        vevo_id: document.getElementById('vevo_id').value,
        szamla_szama: document.getElementById('szamla_szama').value,
        szamla_kelte: document.getElementById('szamla_kelte').value,
        teljesites_datuma: document.getElementById('teljesites_datuma').value,
        fizetesi_hatarido: document.getElementById('fizetesi_hatarido').value,
        vegosszeg: parseFloat(document.getElementById('vegosszeg').value),
        afa_merteke: parseFloat(document.getElementById('afa_merteke').value)
    };
    
    // Validáció
    if (!formData.kiallito_id || !formData.vevo_id || !formData.szamla_szama || 
        !formData.szamla_kelte || !formData.teljesites_datuma || !formData.fizetesi_hatarido ||
        !formData.vegosszeg || !formData.afa_merteke) {
        alert('Kérjük, töltse ki az összes mezőt!');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/szamlak`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Számla sikeresen létrehozva!');
            
            // Modal bezárása
            const modal = bootstrap.Modal.getInstance(document.getElementById('ujSzamlaModal'));
            modal.hide();
            
            // Form tisztítása
            document.getElementById('ujSzamlaForm').reset();
            
            // Adatok frissítése
            betoltSzamlak();
            betoltStatisztikak();
            
            // Új számla szám generálása
            generaltSzamlaSzam();
        } else {
            alert('Hiba: ' + result.error);
        }
    } catch (error) {
        console.error('Hiba az számla létrehozásakor:', error);
        alert('Hiba történt a számla létrehozásakor!');
    }
}

// Új vevő létrehozása
async function ujVevoLetrehozasa() {
    const formData = {
        nev: document.getElementById('vevo_nev').value,
        cim: document.getElementById('vevo_cim').value,
        adoszam: document.getElementById('vevo_adoszam').value
    };
    
    if (!formData.nev || !formData.cim || !formData.adoszam) {
        alert('Kérjük, töltse ki az összes mezőt!');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/vevok`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Vevő sikeresen létrehozva!');
            
            // Modal bezárása
            const modal = bootstrap.Modal.getInstance(document.getElementById('ujVevoModal'));
            modal.hide();
            
            // Form tisztítása
            document.getElementById('ujVevoForm').reset();
            
            // Vevők lista frissítése
            betoltVevok();
            betoltStatisztikak();
        } else {
            alert('Hiba: ' + result.error);
        }
    } catch (error) {
        console.error('Hiba a vevő létrehozásakor:', error);
        alert('Hiba történt a vevő létrehozásakor!');
    }
}

// Számla törlése
async function szamlaTorles(id) {
    if (!confirm('Biztosan törölni szeretné ezt a számlát?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/szamlak/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Számla sikeresen törölve!');
            betoltSzamlak();
            betoltStatisztikak();
        } else {
            alert('Hiba: ' + result.error);
        }
    } catch (error) {
        console.error('Hiba a számla törlésekor:', error);
        alert('Hiba történt a számla törlésekor!');
    }
}

// Számla szám generálása
function generaltSzamlaSzam() {
    const ev = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000) + 1;
    const szam = `SZ-${ev}-${String(random).padStart(3, '0')}`;
    document.getElementById('szamla_szama').value = szam;
}

// Dátum formázása
function formatDatum(datum) {
    return new Date(datum).toLocaleDateString('hu-HU');
}

// Pénz formázása
function formatPenz(osszeg) {
    return new Intl.NumberFormat('hu-HU').format(osszeg);
}

// Modal megnyitásakor számla szám generálása
document.getElementById('ujSzamlaModal').addEventListener('show.bs.modal', function() {
    generaltSzamlaSzam();
});
