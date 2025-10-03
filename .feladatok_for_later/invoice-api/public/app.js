// API alapcím
const API_BASE = '/api';

// Oldal betöltésekor
document.addEventListener('DOMContentLoaded', function () {
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

            // Stornózott számla jelölése
            if (szamla.stornozott) {
                sor.classList.add('table-danger');
                sor.style.opacity = '0.6';
            }

            sor.innerHTML = `
                <td>
                    <strong>${szamla.szamla_szama}</strong>
                    ${szamla.stornozott ? '<br><small class="text-danger"><i class="fas fa-ban"></i> STORNÓZVA</small>' : ''}
                </td>
                <td>
                    <div class="fw-bold">${szamla.vevo_nev}</div>
                    <small class="text-muted">${szamla.vevo_adoszam}</small>
                </td>
                <td>${formatDatum(szamla.szamla_kelte)}</td>
                <td class="${new Date(szamla.fizetesi_hatarido) < new Date() ? 'text-danger fw-bold' : ''}">${formatDatum(szamla.fizetesi_hatarido)}</td>
                <td><strong>${formatPenz(szamla.vegosszeg)} Ft</strong></td>
                <td><span class="badge bg-info">${szamla.afa_merteke}%</span></td>
                <td>
                    ${szamla.stornozott ?
                    '<span class="text-muted"><i class="fas fa-lock"></i> Lezárva</span>' :
                    `<button class="btn btn-warning btn-sm" onclick="szamlaStorno(${szamla.id})" title="Számla stornózása">
                            <i class="fas fa-ban"></i>
                        </button>`
                }                    <button class="btn btn-info btn-sm ms-1" onclick="szamlaReszletek(${szamla.id})" title="Részletek">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-success btn-sm ms-1" onclick="szamlaNyomtatas(${szamla.id})" title="Számla nyomtatás">
                        <i class="fas fa-print"></i>
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

    // Fizetési határidő validáció - jogszabály szerinti 30 nap
    const kelte = new Date(formData.szamla_kelte);
    const hatarido = new Date(formData.fizetesi_hatarido);
    const napokKulonbseg = (hatarido - kelte) / (1000 * 60 * 60 * 24);

    if (napokKulonbseg > 30) {
        alert('A fizetési határidő nem lehet több mint 30 nap a kiállítás dátumától! (Jogszabályi előírás)');
        return;
    }

    if (napokKulonbseg < 0) {
        alert('A fizetési határidő nem lehet a kiállítás dátuma előtt!');
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

// Számla stornózása (törlés helyett - jogszabályi megfelelés)
async function szamlaStorno(id) {
    const storno_ok = prompt('Kérjük, adja meg a stornózás okát:', '');

    if (!storno_ok) {
        alert('A stornózás oka kötelező!');
        return;
    }

    if (!confirm('Biztosan stornózni szeretné ezt a számlát? Ez a művelet nem vonható vissza!')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/szamlak/${id}/storno`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ storno_ok })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Számla sikeresen stornózva!');
            betoltSzamlak();
            betoltStatisztikak();
        } else {
            alert('Hiba: ' + result.error);
        }
    } catch (error) {
        console.error('Hiba a számla stornózásakor:', error);
        alert('Hiba történt a számla stornózásakor!');
    }
}

// Számla törlése - JOGSZABÁLY SZERINT TILOS
async function szamlaTorles(id) {
    alert('A számlákat jogszabály szerint nem lehet törölni! Használja a stornózási funkciót!');
    return;
}

// Számla részletek megjelenítése
async function szamlaReszletek(id) {
    try {
        const response = await fetch(`${API_BASE}/szamlak/${id}`);
        const szamla = await response.json();

        if (response.ok) {
            const tartalom = document.getElementById('szamlaReszletekTartalom');
            tartalom.innerHTML = `
                ${szamla.stornozott ? `
                <div class="alert alert-danger" role="alert">
                    <h6><i class="fas fa-ban me-2"></i>Stornózott számla</h6>
                    <p><strong>Stornózás dátuma:</strong> ${formatDatum(szamla.storno_datum)}</p>
                    <p><strong>Stornózás oka:</strong> ${szamla.storno_ok}</p>
                </div>
                ` : ''}
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-file-invoice me-2"></i>Számla adatok</h6>
                        <table class="table table-borderless">
                            <tr>
                                <td><strong>Számla száma:</strong></td>
                                <td>${szamla.szamla_szama}</td>
                            </tr>
                            <tr>
                                <td><strong>Számla kelte:</strong></td>
                                <td>${formatDatum(szamla.szamla_kelte)}</td>
                            </tr>
                            <tr>
                                <td><strong>Teljesítés dátuma:</strong></td>
                                <td>${formatDatum(szamla.teljesites_datuma)}</td>
                            </tr>
                            <tr>
                                <td><strong>Fizetési határidő:</strong></td>
                                <td class="${new Date(szamla.fizetesi_hatarido) < new Date() ? 'text-danger fw-bold' : ''}">${formatDatum(szamla.fizetesi_hatarido)}</td>
                            </tr>
                            <tr>
                                <td><strong>Létrehozva:</strong></td>
                                <td><small class="text-muted">${formatDatum(szamla.letrehozva)}</small></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <h6><i class="fas fa-calculator me-2"></i>Pénzügyi adatok</h6>
                        <table class="table table-borderless">
                            <tr>
                                <td><strong>Nettó összeg:</strong></td>
                                <td>${formatPenz(Math.round(szamla.vegosszeg / (1 + szamla.afa_merteke / 100)))} Ft</td>
                            </tr>
                            <tr>
                                <td><strong>ÁFA (${szamla.afa_merteke}%):</strong></td>
                                <td>${formatPenz(szamla.vegosszeg - Math.round(szamla.vegosszeg / (1 + szamla.afa_merteke / 100)))} Ft</td>
                            </tr>
                            <tr class="table-success">
                                <td><strong>Végösszeg:</strong></td>
                                <td><strong>${formatPenz(szamla.vegosszeg)} Ft</strong></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-building me-2"></i>Kiállító adatok</h6>
                        <div class="card bg-light">
                            <div class="card-body">
                                <h6 class="card-title">${szamla.kiallito_nev}</h6>
                                <p class="card-text">
                                    <small class="text-muted">Cím:</small> ${szamla.kiallito_cim}<br>
                                    <small class="text-muted">Adószám:</small> ${szamla.kiallito_adoszam}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6><i class="fas fa-user me-2"></i>Vevő adatok</h6>
                        <div class="card bg-light">
                            <div class="card-body">
                                <h6 class="card-title">${szamla.vevo_nev}</h6>
                                <p class="card-text">
                                    <small class="text-muted">Cím:</small> ${szamla.vevo_cim}<br>
                                    <small class="text-muted">Adószám:</small> ${szamla.vevo_adoszam}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Modal megnyitása a tartalom betöltése után
            const modal = new bootstrap.Modal(document.getElementById('szamlaReszletekModal'));
            modal.show();
        } else {
            alert('Hiba: ' + szamla.error);
        }
    } catch (error) {
        console.error('Hiba a számla részletek betöltésekor:', error);
        alert('Hiba történt a számla részletek betöltésekor!');
    }
}

// Számla nyomtatási előnézet
async function szamlaNyomtatas(id) {
    try {
        const response = await fetch(`${API_BASE}/szamlak/${id}`);
        const szamla = await response.json();

        if (response.ok) {
            const tartalom = document.getElementById('szamlaNyomtatasTartalom');
            const nettoOsszeg = Math.round(szamla.vegosszeg / (1 + szamla.afa_merteke / 100));
            const afaOsszeg = szamla.vegosszeg - nettoOsszeg;

            tartalom.innerHTML = `
                <div class="invoice-print" style="font-family: Arial, sans-serif; max-width: 210mm; margin: 0 auto;">
                    <!-- Számla fejléc -->
                    <div class="text-center mb-4">
                        <h2 class="fw-bold">SZÁMLA</h2>
                        <h4 class="text-primary">${szamla.szamla_szama}</h4>
                        ${szamla.stornozott ? '<div class="alert alert-danger"><strong>STORNÓZOTT SZÁMLA</strong></div>' : ''}
                    </div>

                    <!-- Kiállító és vevő adatok -->
                    <div class="row mb-4">
                        <div class="col-6">
                            <div class="border p-3">
                                <h6 class="fw-bold text-uppercase">Kiállító (Eladó)</h6>
                                <div class="mt-2">
                                    <strong>${szamla.kiallito_nev}</strong><br>
                                    ${szamla.kiallito_cim}<br>
                                    <strong>Adószám:</strong> ${szamla.kiallito_adoszam}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="border p-3">
                                <h6 class="fw-bold text-uppercase">Vevő (Vásárló)</h6>
                                <div class="mt-2">
                                    <strong>${szamla.vevo_nev}</strong><br>
                                    ${szamla.vevo_cim}<br>
                                    <strong>Adószám:</strong> ${szamla.vevo_adoszam}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dátumok -->
                    <div class="row mb-4">
                        <div class="col-4">
                            <strong>Számla kelte:</strong><br>
                            ${formatDatum(szamla.szamla_kelte)}
                        </div>
                        <div class="col-4">
                            <strong>Teljesítés dátuma:</strong><br>
                            ${formatDatum(szamla.teljesites_datuma)}
                        </div>
                        <div class="col-4">
                            <strong>Fizetési határidő:</strong><br>
                            <span class="${new Date(szamla.fizetesi_hatarido) < new Date() ? 'text-danger fw-bold' : ''}">${formatDatum(szamla.fizetesi_hatarido)}</span>
                        </div>
                    </div>

                    <!-- Tételek táblázat -->
                    <div class="mb-4">
                        <h6 class="fw-bold">Számla tételei</h6>
                        <table class="table table-bordered">
                            <thead class="table-dark">
                                <tr>
                                    <th>Megnevezés</th>
                                    <th>Mennyiség</th>
                                    <th>Mértékegység</th>
                                    <th>Egységár (Ft)</th>
                                    <th>Nettó érték (Ft)</th>
                                    <th>ÁFA kulcs</th>
                                    <th>ÁFA érték (Ft)</th>
                                    <th>Bruttó érték (Ft)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Szolgáltatás</td>
                                    <td>1</td>
                                    <td>db</td>
                                    <td class="text-end">${formatPenz(nettoOsszeg)}</td>
                                    <td class="text-end">${formatPenz(nettoOsszeg)}</td>
                                    <td class="text-center">${szamla.afa_merteke}%</td>
                                    <td class="text-end">${formatPenz(afaOsszeg)}</td>
                                    <td class="text-end fw-bold">${formatPenz(szamla.vegosszeg)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Összesítő -->
                    <div class="row">
                        <div class="col-6 offset-6">
                            <table class="table table-borderless">
                                <tr>
                                    <td><strong>Nettó összeg:</strong></td>
                                    <td class="text-end">${formatPenz(nettoOsszeg)} Ft</td>
                                </tr>
                                <tr>
                                    <td><strong>ÁFA (${szamla.afa_merteke}%):</strong></td>
                                    <td class="text-end">${formatPenz(afaOsszeg)} Ft</td>
                                </tr>
                                <tr class="table-success">
                                    <td><strong>Fizetendő végösszeg:</strong></td>
                                    <td class="text-end fw-bold fs-5">${formatPenz(szamla.vegosszeg)} Ft</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <!-- Megjegyzések -->
                    <div class="mt-4 p-3 bg-light">
                        <small>
                            <strong>Fontos információk:</strong><br>
                            • A számla átvételével az ÁFA fizetési kötelezettség keletkezik<br>
                            • Fizetés esetén kérjük a számla számát feltüntetni<br>
                            ${szamla.stornozott ? `• <strong class="text-danger">STORNÓZVA: ${formatDatum(szamla.storno_datum)} - ${szamla.storno_ok}</strong>` : ''}
                        </small>
                    </div>
                </div>
            `;

            // Modal megnyitása
            const modal = new bootstrap.Modal(document.getElementById('szamlaNyomtatasModal'));
            modal.show();
        } else {
            alert('Hiba: ' + szamla.error);
        }
    } catch (error) {
        console.error('Hiba a számla nyomtatási előnézet betöltésekor:', error);
        alert('Hiba történt a számla nyomtatási előnézet betöltésekor!');
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
document.getElementById('ujSzamlaModal').addEventListener('show.bs.modal', function () {
    generaltSzamlaSzam();
});

// Fizetési határidő validáció valós időben
document.getElementById('fizetesi_hatarido').addEventListener('change', function () {
    validateFizetesiHatarido();
});

document.getElementById('szamla_kelte').addEventListener('change', function () {
    validateFizetesiHatarido();
});

function validateFizetesiHatarido() {
    const kelte = document.getElementById('szamla_kelte').value;
    const hatarido = document.getElementById('fizetesi_hatarido').value;

    if (kelte && hatarido) {
        const kelteDate = new Date(kelte);
        const hataridoDate = new Date(hatarido);
        const napokKulonbseg = (hataridoDate - kelteDate) / (1000 * 60 * 60 * 24);

        const hataridoInput = document.getElementById('fizetesi_hatarido');
        const warningDiv = document.getElementById('hatarido-warning') || createWarningDiv();

        if (napokKulonbseg > 30) {
            hataridoInput.classList.add('is-invalid');
            warningDiv.className = 'alert alert-danger mt-2';
            warningDiv.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>A fizetési határidő nem lehet több mint 30 nap! (Jogszabályi előírás)';
            warningDiv.style.display = 'block';
        } else if (napokKulonbseg < 0) {
            hataridoInput.classList.add('is-invalid');
            warningDiv.className = 'alert alert-danger mt-2';
            warningDiv.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>A fizetési határidő nem lehet a kiállítás dátuma előtt!';
            warningDiv.style.display = 'block';
        } else {
            hataridoInput.classList.remove('is-invalid');
            hataridoInput.classList.add('is-valid');
            warningDiv.className = 'alert alert-success mt-2';
            warningDiv.innerHTML = `<i class="fas fa-check me-2"></i>Fizetési határidő: ${napokKulonbseg} nap (Megfelelő)`;
            warningDiv.style.display = 'block';
        }
    }
}

function createWarningDiv() {
    const warningDiv = document.createElement('div');
    warningDiv.id = 'hatarido-warning';
    warningDiv.style.display = 'none';

    const hataridoInput = document.getElementById('fizetesi_hatarido');
    hataridoInput.parentNode.appendChild(warningDiv);

    return warningDiv;
}
