//                                  Baza vlakana

let vlakna = [
    {
        "naziv_vlakna": "Carbon AS4",
        "Ef1_GPa": 225,
        "Ef2_GPa": 15,
        "Gf12_GPa": 15,
        "Gf23_GPa": 7,
        "nif12": 0.2,
        "FfT_MPa": 3350,
        "FfC_MPa": 2500,
        "epsf1T": 1.488,
        "epsf1C": 1.111,
        "rho_f": 1.81
    },
    {
        "naziv_vlakna": "Carbon T300",
        "Ef1_GPa": 230,
        "Ef2_GPa": 15,
        "Gf12_GPa": 15,
        "Gf23_GPa": 7,
        "nif12": 0.2,
        "FfT_MPa": 2500,
        "FfC_MPa": 2000,
        "epsf1T": 1.086,
        "epsf1C": 0.869,
        "rho_f": 1.76
    },
    {
        "naziv_vlakna": "E-glass 21xK43 Gevetex",
        "Ef1_GPa": 80,
        "Ef2_GPa": 80,
        "Gf12_GPa": 33.33,
        "Gf23_GPa": 33.33,
        "nif12": 0.2,
        "FfT_MPa": 2150,
        "FfC_MPa": 1450,
        "epsf1T": 2.687,
        "epsf1C": 1.813,
        "rho_f": 2.54
    },
    {
        "naziv_vlakna": "Silenka E-Glass 1200tcx",
        "Ef1_GPa": 74,
        "Ef2_GPa": 74,
        "Gf12_GPa": 30.8,
        "Gf23_GPa": 30.8,
        "nif12": 0.2,
        "FfT_MPa": 2150,
        "FfC_MPa": 1450,
        "epsf1T": 2.905,
        "epsf1C": 1.959,
        "rho_f": 2.54
    }
]


//                                  Baza matrica

let matrice = [
    {
        "naziv_matrice": "3501-6 Epoxy",
        "Em": 4.2,
        "Gm": 1.567,
        "ni_m": 0.34,
        "FmT": 69,
        "FmC": 250,
        "FmS": 50,
        "eps_mu": 1.7,
        "rho_m": 1.27
    },
    {
        "naziv_matrice": "BSL914C Epoxy",
        "Em": 4,
        "Gm": 1.481,
        "ni_m": 0.35,
        "FmT": 75,
        "FmC": 150,
        "FmS": 70,
        "eps_mu": 4,
        "rho_m": 1.28
    },
    {
        "naziv_matrice": "LY556/HT907/DY063 Epoxy",
        "Em": 3.35,
        "Gm": 1.24,
        "ni_m": 0.35,
        "FmT": 80,
        "FmC": 120,
        "FmS": false,
        "eps_mu": 5,
        "rho_m": 1.17
    },
    {
        "naziv_matrice": "MY750/HY917/DY063 Epoxy",
        "Em": 3.35,
        "Gm": 1.24,
        "ni_m": 0.35,
        "FmT": 80,
        "FmC": 120,
        "FmS": false,
        "eps_mu": 5,
        "rho_m": 1.17
    },
]


//  globalne promenljive za sakupljanje obrisanih matrica i vlakana
obrisane_matrice = []
obrisana_vlakna = []

// Dohvatanje vlakana i matrica iz local storage-a
dohvatanje_vlakana_i_matrica_iz_local_storage()
formiranje_dropdown_sva_vlakna()
formiranje_dropdown_sve_matrice()

// Logika za flipovanje - definsanje materijala
document.getElementById("direktno_definisanje_button").onclick = () => {

    document.getElementById("priprema_flip").classList.add("rotate_klasa_Y_osa")
    document.getElementById("izracunaj_span").classList.remove("white_to_black_text")
    document.getElementById("izracunaj_span").classList.remove("black_to_white_text")
    document.getElementById("izracunaj_dugme").classList.add("black_to_white")
    document.getElementById("izracunaj_span").classList.add("white_to_black_text")

    setTimeout(() => {
        document.getElementById("izracunaj_dugme").style.backgroundColor = "white"
        document.getElementById("izracunaj_span").style.color = "black"
        document.getElementsByClassName("flip-card-front")[0].classList.add("hidden")
    }, "300")
    document.getElementById("priprema_flip").classList.remove("gray_to_white_change")

}

// Logika za flipovanje - standardno definisanje
document.getElementById("standardno_definisanje_button").onclick = () => {
    document.getElementsByClassName("flip-card-front")[0].classList.remove("hidden")
    document.getElementById("priprema_flip").classList.remove("rotate_klasa_Y_osa")
    document.getElementById("izracunaj_dugme").classList.remove("black_to_white")
    document.getElementById("izracunaj_dugme").classList.add("white_to_black")
    document.getElementById("izracunaj_span").classList.add("white_to_black_text")
    document.getElementById("izracunaj_span").classList.add("black_to_white_text")

    setTimeout(() => {
        document.getElementById("izracunaj_dugme").style.backgroundColor = "black"
        document.getElementById("izracunaj_span").style.color = "white"
    }, "300")

    document.getElementById("rezultati").classList.remove("gray_to_dark_change")

}

// Logika za upitnici
upitnici = document.getElementsByClassName("fa-circle-question")
for (let i = 0; i < upitnici.length; i++) {
    upitnici[i].onmouseenter = function () { upitnici[i].classList.add("transform_rotate_360_inf"); }
    upitnici[i].onmouseleave = function () { upitnici[i].classList.remove("transform_rotate_360_inf"); }
}


//                    DROPDOWN VLAKNA

// dohvatanje svih vlakana
var sva_vlakna = document.getElementsByClassName("tip_vlakno")

prikaz_selektovanog_vlakna()


// slucaj kada se selektuje neko vlakno da se promeni ime 
function selektovanje_vlakna_menjanje_imena() {
    sva_vlakna = document.getElementsByClassName("tip_vlakno")
    for (let i = 0; i < sva_vlakna.length; i++) {
        sva_vlakna[i].onclick = function (e) {
            e.preventDefault()
            document.getElementsByClassName("selected_vlakno")[0].classList.remove("selected_vlakno")

            console.log(sva_vlakna[i].innerHTML)

            for (let k = 0; k < vlakna.length; k++) {
                if (vlakna[k].naziv_vlakna == sva_vlakna[i].innerHTML) {
                    console.log(vlakna[k]);
                }
            }

            sva_vlakna[i].classList.add("selected_vlakno")
            for (let j = 0; j < sva_vlakna.length; j++) {
                if (sva_vlakna[j].classList.contains("selected_vlakno")) {
                    document.getElementById("selektovano_vlakno").innerHTML = sva_vlakna[j].innerHTML
                }
            }
        }
    }

}
selektovanje_vlakna_menjanje_imena()


// zatvaranje doropdown-a kada user klikne negde drugde na stranici
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        document.getElementById("strelica_matrica").style.display = "block"
    }
}


//                     DROPDOWN MATRICA

// dohvatanje svih matrica
var sve_matrice = document.getElementsByClassName("tip_matrice")

// prikaz selektovane matrice

function prikaz_selektovane_matrice() {
    for (let i = 0; i < sve_matrice.length; i++) {
        if (sve_matrice[i].classList.contains("selected_matrica")) {
            document.getElementById("selektovana_matrica").innerHTML = sve_matrice[i].innerHTML
        }
    }
}
prikaz_selektovane_matrice()



// slucaj kada se selektuje neka matrica da se promeni ime

function selektovanje_matrice_menjanje_imena() {
    for (let i = 0; i < sve_matrice.length; i++) {
        sve_matrice[i].onclick = function (e) {
            e.preventDefault()
            document.getElementsByClassName("selected_matrica")[0].classList.remove("selected_matrica")

            for (let k = 0; k < matrice.length; k++) {
                if (matrice[k].naziv_matrice == sve_matrice[i].innerHTML) {
                    console.log(matrice[k]);
                }
            }

            sve_matrice[i].classList.add("selected_matrica")
            for (let j = 0; j < sve_matrice.length; j++) {
                if (sve_matrice[j].classList.contains("selected_matrica")) {
                    document.getElementById("selektovana_matrica").innerHTML = sve_matrice[j].innerHTML
                }
            }
        }
    }
}
selektovanje_matrice_menjanje_imena()



// dorpdown kad se klikne dugme
function dropdown_function_matrica() {
    document.getElementById("myDropdown_matrica").classList.toggle("show");
    document.getElementById("myDropdown_vlakno").classList.remove("show");
}


//                       DODATI VLAKNO EVENT

dodati_vlakno = document.getElementById("dodati_vlakno")
dodati_vlakno.onclick = () => {

    vlakna_osobine_brisanje = document.getElementsByName('vlakno_popup')

    for (let i = 0; i < vlakna_osobine_brisanje.length; i++) {
        vlakna_osobine_brisanje[i].value = ""
    }

    document.getElementById("gray_background").classList.remove("hidden")

    document.getElementById("definisanje_novog_vlakna").classList.remove("hidden")

    document.getElementById("definisanje_novog_vlakna").classList.add("dodati_vlakno_matrica_animacija")

}


//                     DODATI MATRICU EVENT

dodati_vlakno = document.getElementById("dodati_matricu")
dodati_vlakno.onclick = () => {

    document.getElementById("gray_background").classList.remove("hidden")

    document.getElementById("definisanje_nove_matrice").classList.remove("hidden")

    document.getElementById("definisanje_nove_matrice").classList.add("dodati_vlakno_matrica_animacija")

}


//                 ZATVORITI DEFINISANJE EVENTOVI

zatvoriti_definisanje_vlakna = document.getElementById("zatvoriti_definisanje_vlakna")
zatvoriti_definisanje_vlakna.onclick = () => {
    document.getElementById("definisanje_novog_vlakna").classList.add("hidden")
    document.getElementById("gray_background").classList.add("hidden")

}


zatvoriti_definisanje_matrice = document.getElementById("zatvoriti_definisanje_matrice")

zatvoriti_definisanje_matrice.onclick = () => {
    document.getElementById("definisanje_nove_matrice").classList.add("hidden")
    document.getElementById("gray_background").classList.add("hidden")

}


//                        E1 METODE IZBOR

// dohvatanje svih metoda E1
var E1_metode = document.getElementsByClassName("metode_E1")

// prikaz selektovanog vlakna
for (let i = 0; i < E1_metode.length; i++) {
    if (E1_metode[i].classList.contains("selected_E1")) {
        document.getElementById("selektovana_metoda_E1").innerHTML = E1_metode[i].innerHTML
    }
}
// slucaj kada se selektuje neka matrica da se promeni ime
for (let i = 0; i < E1_metode.length; i++) {
    E1_metode[i].onclick = function (e) {
        e.preventDefault()
        document.getElementsByClassName("selected_E1")[0].classList.remove("selected_E1")
        E1_metode[i].classList.add("selected_E1")
        for (let j = 0; j < E1_metode.length; j++) {
            if (E1_metode[j].classList.contains("selected_E1")) {
                document.getElementById("selektovana_metoda_E1").innerHTML = E1_metode[j].innerHTML
            }
        }
    }
}

// dorpdown kad se klikne dugme
function dropdown_function_E1() {
    document.getElementById("myDropdown_E1").classList.toggle("show");
    document.getElementById("myDropdown_E2").classList.remove("show");
    document.getElementById("myDropdown_G12").classList.remove("show");
}


//                          E2 METODE IZBOR

// dohvatanje svih metoda E2
var E2_metode = document.getElementsByClassName("metode_E2")

// prikaz selektovanog vlakna
for (let i = 0; i < E2_metode.length; i++) {
    if (E2_metode[i].classList.contains("selected_E2")) {
        document.getElementById("selektovana_metoda_E2").innerHTML = E2_metode[i].innerHTML
    }
}

// slucaj kada se selektuje neka matrica da se promeni ime
for (let i = 0; i < E2_metode.length; i++) {
    E2_metode[i].onclick = function (e) {
        e.preventDefault()
        document.getElementsByClassName("selected_E2")[0].classList.remove("selected_E2")
        E2_metode[i].classList.add("selected_E2")
        for (let j = 0; j < E2_metode.length; j++) {
            if (E2_metode[j].classList.contains("selected_E2")) {
                document.getElementById("selektovana_metoda_E2").innerHTML = E2_metode[j].innerHTML
            }
        }
    }
}

// dorpdown kad se klikne dugme
function dropdown_function_E2() {
    document.getElementById("myDropdown_E2").classList.toggle("show");
    document.getElementById("myDropdown_E1").classList.remove("show");
    document.getElementById("myDropdown_G12").classList.remove("show");
}

//                      G12 METODE IZBOR

// dohvatanje svih metoda E2
var G12_metode = document.getElementsByClassName("metode_G12")


// prikaz selektovanog vlakna
for (let i = 0; i < G12_metode.length; i++) {
    if (G12_metode[i].classList.contains("selected_G12")) {
        document.getElementById("selektovana_metoda_G12").innerHTML = G12_metode[i].innerHTML
    }
}

// slucaj kada se selektuje neka matrica da se promeni ime
for (let i = 0; i < G12_metode.length; i++) {
    G12_metode[i].onclick = function (e) {
        e.preventDefault()
        document.getElementsByClassName("selected_G12")[0].classList.remove("selected_G12")
        G12_metode[i].classList.add("selected_G12")
        for (let j = 0; j < G12_metode.length; j++) {
            if (G12_metode[j].classList.contains("selected_G12")) {
                document.getElementById("selektovana_metoda_G12").innerHTML = G12_metode[j].innerHTML
            }
        }
    }
}

// dorpdown kad se klikne dugme
function dropdown_function_G12() {
    document.getElementById("myDropdown_G12").classList.toggle("show");
    document.getElementById("myDropdown_E1").classList.remove("show");
    document.getElementById("myDropdown_E2").classList.remove("show");
}


//                     F2T METODE IZBOR

// dohvatanje svih metoda E2
var F2T_metode = document.getElementsByClassName("metode_F2T")


for (let i = 0; i < F2T_metode.length; i++) {
    if (F2T_metode[i].classList.contains("selected_F2T")) {
        document.getElementById("selektovana_metoda_F2T").innerHTML = F2T_metode[i].innerHTML
    }
}

for (let i = 0; i < F2T_metode.length; i++) {
    F2T_metode[i].onclick = function (e) {
        e.preventDefault()
        document.getElementsByClassName("selected_F2T")[0].classList.remove("selected_F2T")
        F2T_metode[i].classList.add("selected_F2T")
        for (let j = 0; j < F2T_metode.length; j++) {
            if (F2T_metode[j].classList.contains("selected_F2T")) {
                document.getElementById("selektovana_metoda_F2T").innerHTML = F2T_metode[j].innerHTML
            }
        }
    }
}

// dorpdown kad se klikne dugme
function dropdown_function_F2T() {
    document.getElementById("myDropdown_F2T").classList.toggle("show");
    document.getElementById("myDropdown_E1").classList.remove("show");
    document.getElementById("myDropdown_E2").classList.remove("show");
}



//                       DODAVANJE VLAKNA EVENT


document.getElementById("dugme_novo_vlakno").onclick = () => {

    sva_vlakna_ = document.getElementsByClassName("vlakna_imena_i")

    naziv = document.getElementById("input_text_vlakno_novo").value
    Ef1 = document.getElementById("Ef1_novo_input").value
    Ef2 = document.getElementById("Ef2_novo_input").value
    Gf12 = document.getElementById("Gf12_novo_input").value
    Gf23 = document.getElementById("Gf23_novo_input").value
    nif12 = document.getElementById("nif12_novo_input").value
    FfT = document.getElementById("FfT_novo_input").value
    FfC = document.getElementById("FfC_novo_input").value
    epsf1T_ = document.getElementById("epsf1T_novo_input").value
    epsf1C_ = document.getElementById("epsf1C_novo_input").value
    rho_f = document.getElementById("rho_f_novo_input").value

    velicine = [naziv, Ef1, Ef2, Gf12, Gf23, nif12, FfT, FfC, epsf1T_, epsf1C_, rho_f]

    COUNTER = 0

    for (let i = 0; i < velicine.length; i++) {
        if (velicine[i] == undefined || velicine[i] == '') {
            COUNTER++
        }
    }

    if (sva_vlakna_.length >= 13) {
        console.log("Ima previse vlakana u bazi da bi se jos dodavalo");
        document.getElementById("definisanje_novog_vlakna").classList.add("hidden")
        document.getElementById("gray_background").classList.add("hidden")

    } else if (COUNTER != 0) {
        console.log("nepoznatih velicina ima: " + COUNTER);
        alert("Morate uneti sve velicine!")
    }
    else {

        if (document.getElementById("input_text_vlakno_novo").value == "") {
            console.log("nije definisano ime vlakna");
            document.getElementById("definisanje_novog_vlakna").classList.add("hidden")
            document.getElementById("gray_background").classList.add("hidden")
        }
        else {

            localStorage.setItem(`vlakno_${document.getElementById("input_text_vlakno_novo").value}`, JSON.stringify({
                "naziv_vlakna": document.getElementById("input_text_vlakno_novo").value,
                "Ef1_GPa": Number(document.getElementById("Ef1_novo_input").value),
                "Ef2_GPa": Number(document.getElementById("Ef2_novo_input").value),
                "Gf12_GPa": Number(document.getElementById("Gf12_novo_input").value),
                "Gf23_GPa": Number(document.getElementById("Gf23_novo_input").value),
                "nif12": Number(document.getElementById("nif12_novo_input").value),
                "FfT_MPa": Number(document.getElementById("FfT_novo_input").value),
                "FfC_MPa": Number(document.getElementById("FfC_novo_input").value),
                "epsf1T": Number(document.getElementById("epsf1T_novo_input").value),
                "epsf1C": Number(document.getElementById("epsf1C_novo_input").value),
                "rho_f": Number(document.getElementById("rho_f_novo_input").value)
            }))

            novo_vlakno = JSON.parse(localStorage.getItem(`vlakno_${document.getElementById("input_text_vlakno_novo").value}`))

            vlakna.push(novo_vlakno)

            document.getElementById("myDropdown_vlakno").innerHTML = ""

            for (let i = 0; i < vlakna.length; i++) {
                if (i == vlakna.length - 1) {
                    document.getElementById("myDropdown_vlakno").innerHTML +=
                        `<a href="#" data-vlakna_imena='${vlakna[i].naziv_vlakna}' class="selected_vlakno tip_vlakno">${vlakna[i].naziv_vlakna}</a>`
                } else {
                    document.getElementById("myDropdown_vlakno").innerHTML +=
                        `<a href="#" data-vlakna_imena='${vlakna[i].naziv_vlakna}' class=" tip_vlakno">${vlakna[i].naziv_vlakna}</a>`
                }
            }

            document.getElementById("definisanje_novog_vlakna").classList.add("hidden")
            document.getElementById("gray_background").classList.add("hidden")
            selektovanje_vlakna_menjanje_imena()
            prikaz_selektovanog_vlakna()
            stavljanje_vlakana_u_prikaz_baze()
            vlakna_u_bazi_onclick_event()
        }
    }
}


//                          DODAVANJE MATRICE EVENT


document.getElementById("dugme_nova_matrica").onclick = () => {

    sve_matrice_ = document.getElementsByClassName("matrice_imena_i")

    naziv_matrice = document.getElementById("input_text_matrica_novo").value
    Em = document.getElementById("Em_novo_input").value
    Gm = document.getElementById("Gm_novo_input").value
    ni_m = document.getElementById("ni_m_novo_input").value
    FmT = document.getElementById("FmT_novo_input").value
    FmC = document.getElementById("FmC_novo_input").value
    FmS = document.getElementById("FmS_novo_input").value
    eps_mu = document.getElementById("eps_mu_novo_input").value
    rho_m = document.getElementById("rho_m_novo_input").value

    velicine = [naziv_matrice, Em, Gm, ni_m, FmT, FmC, FmS, eps_mu, rho_m]

    COUNTER = 0

    for (let i = 0; i < velicine.length; i++) {
        if (velicine[i] == undefined || velicine[i] == '') {
            COUNTER++
        }
    }


    if (sve_matrice_.length >= 13) {
        console.log("Ima previse matrica u bazi da bi se jos dodavalo");
        document.getElementById("definisanje_nove_matrice").classList.add("hidden")
        document.getElementById("gray_background").classList.add("hidden")

    } else if (COUNTER != 0) {
        console.log("nepoznatih velicina ima: " + COUNTER);
        alert("Morate uneti sve velicine!")
    }
    else {
        if (document.getElementById("input_text_matrica_novo").value == "") {
            console.log("nije definisano ime matrice");
            document.getElementById("definisanje_nove_matrice").classList.add("hidden")
            document.getElementById("gray_background").classList.add("hidden")
        }
        else {
            localStorage.setItem(`matrica_${document.getElementById("input_text_matrica_novo").value}`, JSON.stringify({
                "naziv_matrice": document.getElementById("input_text_matrica_novo").value,
                "Em": document.getElementById("Em_novo_input").value,
                "Gm": document.getElementById("Gm_novo_input").value,
                "ni_m": document.getElementById("ni_m_novo_input").value,
                "FmT": document.getElementById("FmT_novo_input").value,
                "FmC": document.getElementById("FmC_novo_input").value,
                "FmS": document.getElementById("FmS_novo_input").value,
                "eps_mu": document.getElementById("eps_mu_novo_input").value,
                "rho_m": document.getElementById("rho_m_novo_input").value
            }))

            nova_matrica = JSON.parse(localStorage.getItem(`matrica_${document.getElementById("input_text_matrica_novo").value}`))

            matrice.push(nova_matrica)

            document.getElementById("myDropdown_matrica").innerHTML = ""

            for (let i = 0; i < matrice.length; i++) {
                if (i == matrice.length - 1) {
                    document.getElementById("myDropdown_matrica").innerHTML +=
                        `<a href="#" data-matrice_imena='${matrice[i].naziv_matrice}' class="selected_matrica tip_matrice">${matrice[i].naziv_matrice}</a>`
                } else {
                    document.getElementById("myDropdown_matrica").innerHTML +=
                        `<a href="#" data-matrice_imena='${matrice[i].naziv_matrice}'  class=" tip_matrice">${matrice[i].naziv_matrice}</a>`
                }
            }
            document.getElementById("definisanje_nove_matrice").classList.add("hidden")
            document.getElementById("gray_background").classList.add("hidden")
            selektovanje_matrice_menjanje_imena()
            prikaz_selektovane_matrice()
            stavljanje_matrica_u_prikaz_baze()
            onclick_matrice_u_bazi_svojstva()
        }
    }
}


//                    Stavljanje vlakna u prikaz baze

function stavljanje_vlakana_u_prikaz_baze() {
    document.getElementById("vlakna_imena").innerHTML = ""
    for (let i = 0; i < vlakna.length; i++) {
        if (i == 1) {
            document.getElementById("vlakna_imena").innerHTML +=
                `<div class="merge_div" name="vlakno_${1}"><div id="vlakno_1_" class="vlakna_imena_i vlakna_imena_i_selected">${vlakna[1].naziv_vlakna}</div> <div id="vlakno_${1}" class="close_vlakno"><i class="fa-solid fa-xmark"></i></div></div>`
        } else if (i < 13) {
            document.getElementById("vlakna_imena").innerHTML +=
                `<div class="merge_div" name="vlakno_${i}"><div id="vlakno_${i}_" class="vlakna_imena_i">${vlakna[i].naziv_vlakna}</div> <div id="vlakno_${i}" class="close_vlakno"><i class="fa-solid fa-xmark"></i></div></div>`
        }
    }

    closediv_vlakna = document.getElementsByClassName("close_vlakno")
    id_closediv_vlakna = []


    if (closediv_vlakna.length > 9) {
        for (let i = 10; i < closediv_vlakna.length; i++) {
            closediv_vlakna[i].style.display = "none"
        }
    }

    for (let i = 0; i < closediv_vlakna.length; i++) {
        id_closediv_vlakna[i] = closediv_vlakna[i].id
    }

    for (let i = 0; i < id_closediv_vlakna.length; i++) {

        closediv_vlakna[i].onclick = function () {
            obrisana_vlakna.push(document.getElementById(id_closediv_vlakna[i] + "_").innerHTML.trim())
            localStorage.removeItem(`vlakno_${document.getElementById(id_closediv_vlakna[i] + "_").innerHTML.trim()}`)
            document.getElementsByName(id_closediv_vlakna[i])[0].remove()
        }
    }

}
stavljanje_vlakana_u_prikaz_baze()



//                        Stavljanje matrica u prikaz baze

function stavljanje_matrica_u_prikaz_baze() {

    document.getElementById("matrice_imena").innerHTML = ""
    for (let i = 0; i < matrice.length; i++) {
        if (i == 1) {
            document.getElementById("matrice_imena").innerHTML +=
                `<div class="merge_div" name="matrica_${1}"><div id="matrica_1_" class="matrice_imena_i matrice_imena_i_selected">${matrice[1].naziv_matrice}</div> <div id="matrica_${1}" class="close_matrica"><i class="fa-solid fa-xmark"></i></div></div>`
        } else if (i < 13) {
            document.getElementById("matrice_imena").innerHTML +=
                `<div class="merge_div" name="matrica_${i}"><div id="matrica_${i}_"  class="matrice_imena_i">${matrice[i].naziv_matrice}</div> <div id="matrica_${i}" class="close_matrica"><i class="fa-solid fa-xmark"></i></div></div>`
        }
    }


    closediv_matrice = document.getElementsByClassName("close_matrica")
    id_closediv_matrice = []



    for (let i = 0; i < closediv_matrice.length; i++) {
        id_closediv_matrice[i] = closediv_matrice[i].id
    }

    for (let i = 0; i < id_closediv_matrice.length; i++) {
        closediv_matrice[i].onclick = function () {
            obrisane_matrice.push(document.getElementById(id_closediv_matrice[i] + "_").innerHTML.trim())
            localStorage.removeItem(`matrica_${document.getElementById(id_closediv_matrice[i] + "_").innerHTML.trim()}`)
            document.getElementsByName(id_closediv_matrice[i])[0].remove()
        }
    }
}
stavljanje_matrica_u_prikaz_baze()



//   Postavljanje svojstava selektovanog vlakana u bazu podataka na pocetku 

vlakna_u_bazi = document.getElementsByClassName("vlakna_imena_i")

for (let i = 0; i < vlakna_u_bazi.length; i++) {

    if (vlakna_u_bazi[i].classList.contains("vlakna_imena_i_selected")) {

        for (let k = 0; k < vlakna.length; k++) {

            if (vlakna[k].naziv_vlakna == vlakna_u_bazi[i].innerHTML.trim()) {
                document.getElementById("naziv_vlakna_bazaa").value = vlakna[k].naziv_vlakna
                document.getElementById("baza_input_Ef1").value = vlakna[k].Ef1_GPa
                document.getElementById("baza_input_Ef2").value = vlakna[k].Ef2_GPa
                document.getElementById("baza_input_Gf12").value = vlakna[k].Gf12_GPa
                document.getElementById("baza_input_Gf23").value = vlakna[k].Gf23_GPa
                document.getElementById("baza_input_FfT_MPa").value = vlakna[k].FfT_MPa
                document.getElementById("baza_input_FfC_MPa").value = vlakna[k].FfC_MPa
                document.getElementById("baza_input_epsf1T").value = vlakna[k].epsf1T
                document.getElementById("baza_input_epsf1C").value = vlakna[k].epsf1C
                document.getElementById("baza_input_nif12").value = vlakna[k].nif12
                document.getElementById("baza_input_rho_f").value = vlakna[k].rho_f
            }
        }
    }
}



//   Postavljanje svojstava selektovane matrice u bazu podataka na pocetku 

matrice_u_bazi = document.getElementsByClassName("matrice_imena_i")

for (let i = 0; i < matrice_u_bazi.length; i++) {

    if (matrice_u_bazi[i].classList.contains("matrice_imena_i_selected")) {

        for (let k = 0; k < matrice.length; k++) {

            if (matrice[k].naziv_matrice == matrice_u_bazi[i].innerHTML.trim()) {
                document.getElementById("naziv_matrice_bazaa").value = matrice[k].naziv_matrice
                document.getElementById("baza_input_Em").value = matrice[k].Em
                document.getElementById("baza_input_Gm").value = matrice[k].Gm
                document.getElementById("baza_input_FmT").value = matrice[k].FmT
                document.getElementById("baza_input_FmC").value = matrice[k].FmC
                document.getElementById("baza_input_FmS").value = matrice[k].FmS
                document.getElementById("baza_input_ni_m").value = matrice[k].ni_m
                document.getElementById("baza_input_eps_mu").value = matrice[k].eps_mu
                document.getElementById("baza_input_rho_m").value = matrice[k].rho_m
            }
        }
    }
}


//                      Slucaj onclick vlakna u bazi

function vlakna_u_bazi_onclick_event() {

    vlakna_u_bazi = document.getElementsByClassName("vlakna_imena_i")
    vlakna_u_bazi_ = []

    for (let i = 0; i < vlakna_u_bazi.length; i++) {
        vlakna_u_bazi_[i] = vlakna_u_bazi[i]
    }

    for (let i = 0; i < vlakna_u_bazi_.length; i++) {

        vlakna_u_bazi_[i].onclick = () => {
            for (let j = 0; j < vlakna_u_bazi_.length; j++) {
                if (vlakna_u_bazi_[j].classList.contains("vlakna_imena_i_selected")) {
                    vlakna_u_bazi_[j].classList.remove("vlakna_imena_i_selected")
                }
                vlakna_u_bazi_[i].classList.add("vlakna_imena_i_selected")
            }

            for (let k = 0; k < vlakna.length; k++) {

                if (vlakna[k].naziv_vlakna == vlakna_u_bazi_[i].innerHTML.trim()) {

                    document.getElementById("naziv_vlakna_bazaa").value = vlakna[k].naziv_vlakna
                    document.getElementById("baza_input_Ef1").value = vlakna[k].Ef1_GPa
                    document.getElementById("baza_input_Ef2").value = vlakna[k].Ef2_GPa
                    document.getElementById("baza_input_Gf12").value = vlakna[k].Gf12_GPa
                    document.getElementById("baza_input_Gf23").value = vlakna[k].Gf23_GPa
                    document.getElementById("baza_input_FfT_MPa").value = vlakna[k].FfT_MPa
                    document.getElementById("baza_input_FfC_MPa").value = vlakna[k].FfC_MPa
                    document.getElementById("baza_input_epsf1T").value = vlakna[k].epsf1T
                    document.getElementById("baza_input_epsf1C").value = vlakna[k].epsf1C
                    document.getElementById("baza_input_nif12").value = vlakna[k].nif12
                    document.getElementById("baza_input_rho_f").value = vlakna[k].rho_f

                }

            }

        }
    }

}
vlakna_u_bazi_onclick_event()



//                         Slucaj onclick matrice u bazi

function onclick_matrice_u_bazi_svojstva() {
    matrice_u_bazi = document.getElementsByClassName("matrice_imena_i")
    matrice_u_bazi_ = []
    for (let i = 0; i < matrice_u_bazi.length; i++) {
        matrice_u_bazi_[i] = matrice_u_bazi[i]
    }
    for (let i = 0; i < matrice_u_bazi_.length; i++) {
        matrice_u_bazi_[i].onclick = () => {
            for (let j = 0; j < matrice_u_bazi_.length; j++) {
                if (matrice_u_bazi_[j].classList.contains("matrice_imena_i_selected")) {
                    matrice_u_bazi_[j].classList.remove("matrice_imena_i_selected")
                }
                matrice_u_bazi_[i].classList.add("matrice_imena_i_selected")
            }

            for (let i = 0; i < matrice_u_bazi_.length; i++) {

                if (matrice_u_bazi_[i].classList.contains("matrice_imena_i_selected")) {
                    for (let k = 0; k < matrice.length; k++) {

                        if (matrice[k].naziv_matrice == matrice_u_bazi_[i].innerHTML.trim()) {
                            document.getElementById("naziv_matrice_bazaa").value = matrice[k].naziv_matrice
                            document.getElementById("baza_input_Em").value = matrice[k].Em
                            document.getElementById("baza_input_Gm").value = matrice[k].Gm
                            document.getElementById("baza_input_FmT").value = matrice[k].FmT
                            document.getElementById("baza_input_FmC").value = matrice[k].FmC
                            document.getElementById("baza_input_FmS").value = matrice[k].FmS
                            document.getElementById("baza_input_ni_m").value = matrice[k].ni_m
                            document.getElementById("baza_input_eps_mu").value = matrice[k].eps_mu
                            document.getElementById("baza_input_rho_m").value = matrice[k].rho_m

                        }
                    }
                }
            }

        }

    }
}
onclick_matrice_u_bazi_svojstva()




//                       Obrisi bazu vlakana onclick event

document.getElementById("dugme_obrisi_bazu_vlakana").onclick = () => {

    remove_vlakna = document.getElementsByClassName("close_vlakno")

    if (document.getElementById("vlakna_imena").classList.contains("gray_to_red")) {
        for (let i = 4; i < remove_vlakna.length; i++) {
            remove_vlakna[i].classList.remove("_0_to_100")
            remove_vlakna[i].classList.add("_100_to_0")

            setTimeout(() => {
                remove_vlakna[i].style.display = "none"
            }, "800")
        }
        document.getElementById("vlakna_imena").classList.remove("gray_to_red")
        document.getElementById("vlakna_imena").classList.add("red_to_gray")
        setTimeout(() => {
            document.getElementById("vlakna_imena").style.backgroundColor = "#dedede"
        }, "800")

    } else {

        for (let i = 4; i < remove_vlakna.length; i++) {
            remove_vlakna[i].style.display = "block"
            remove_vlakna[i].classList.remove("_100_to_0")
            remove_vlakna[i].classList.add("_0_to_100")
        }

        document.getElementById("vlakna_imena").classList.remove("red_to_gray")
        document.getElementById("vlakna_imena").classList.add("gray_to_red")
        setTimeout(() => {

            document.getElementById("vlakna_imena").style.backgroundColor = "#b647344d"
        }, "800")

    }

}



//                       Obrisi bazu matrica onclick event

document.getElementById("dugme_obrisi_bazu_matrica").onclick = () => {


    remove_matrice = document.getElementsByClassName("close_matrica")

    if (document.getElementById("matrice_imena").classList.contains("gray_to_red")) {

        for (let i = 4; i < remove_matrice.length; i++) {

            remove_matrice[i].classList.remove("_0_to_100")
            remove_matrice[i].classList.add("_100_to_0")

            setTimeout(() => {
                remove_matrice[i].style.display = "none"
            }, "800")

        }

        document.getElementById("matrice_imena").classList.remove("gray_to_red")
        document.getElementById("matrice_imena").classList.add("red_to_gray")
        setTimeout(() => {
            document.getElementById("matrice_imena").style.backgroundColor = "#dedede"
        }, "800")

    } else {

        for (let i = 4; i < remove_matrice.length; i++) {
            remove_matrice[i].style.display = "block"
            remove_matrice[i].classList.remove("_100_to_0")
            remove_matrice[i].classList.add("_0_to_100")
        }

        document.getElementById("matrice_imena").classList.remove("red_to_gray")
        document.getElementById("matrice_imena").classList.add("gray_to_red")
        setTimeout(() => {
            document.getElementById("matrice_imena").style.backgroundColor = "#b647344d"
        }, "800")
    }
}



//                     DODAVANJE VLAKNA DIREKTNO EVENT   1/2

document.getElementById("dugme_dodavanje_vlakna_direktno").onclick = () => {

    sva_vlakna_ = document.getElementsByClassName("vlakna_imena_i")


    Ef1 = document.getElementById("Ef1_direktno_input").value
    Ef2 = document.getElementById("Ef2_direktno_input").value
    Gf12 = document.getElementById("Gf12_direktno_input").value
    Gf23 = document.getElementById("Gf23_direktno_input").value
    nif12 = document.getElementById("nif12_direktno_input").value
    FfT = document.getElementById("FfT_direktno_input").value
    FfC = document.getElementById("FfC_direktno_input").value
    epsf1T = document.getElementById("epsf1T_direktno_input").value
    epsf1C = document.getElementById("epsf1C_direktno_input").value
    rho_f = document.getElementById("rho_f_direktno_input").value

    velicine = [Ef1, Ef2, Gf12, Gf23, nif12, FfT, FfC, epsf1T, epsf1C, rho_f]

    COUNTER = 0

    for (let i = 0; i < velicine.length; i++) {
        if (velicine[i] == undefined || velicine[i] == '') {
            COUNTER++
        }
    }

    if (sva_vlakna_.length >= 13) {
        console.log("Ima previse vlakana u bazi da bi se jos dodavalo");
    } else {

        Ef1 = Number(document.getElementById("Ef1_direktno_input").value)
        Ef2 = Number(document.getElementById("Ef2_direktno_input").value)
        Gf12 = Number(document.getElementById("Gf12_direktno_input").value)
        Gf23 = Number(document.getElementById("Gf23_direktno_input").value)
        nif12 = Number(document.getElementById("nif12_direktno_input").value)
        FfT = Number(document.getElementById("FfT_direktno_input").value)
        FfC = Number(document.getElementById("FfC_direktno_input").value)
        epsf1T = Number(document.getElementById("epsf1T_direktno_input").value)
        epsf1C = Number(document.getElementById("epsf1C_direktno_input").value)
        rho_f = Number(document.getElementById("rho_f_direktno_input").value)

        lista_svih_velicina = [Ef1, Ef2, Gf12, Gf23, nif12, FfT, FfC, epsf1T, epsf1C, rho_f]

        for (let i = 0; i < lista_svih_velicina.length; i++) {
            counter = 0
            if (lista_svih_velicina[i] == "") {
                counter += 1
            }
        }

        if (counter > 0) {
            window.alert("Sve velicine moraju biti definisane da bi vlakno bilo dobro definisano!")
        }

        if (document.getElementById("dodavanje_vlakna_direktno_input").value == "") {
            console.log("morate navesti ime vlakna!");
        } else if (COUNTER != 0) {
            console.log("nepoznatih velicina ima: " + COUNTER);
            alert("Morate uneti sve velicine!")
        } else {

            localStorage.setItem(`vlakno_${document.getElementById("dodavanje_vlakna_direktno_input").value}`, JSON.stringify({
                "naziv_vlakna": document.getElementById("dodavanje_vlakna_direktno_input").value,
                "Ef1_GPa": Number(document.getElementById("Ef1_direktno_input").value),
                "Ef2_GPa": Number(document.getElementById("Ef2_direktno_input").value),
                "Gf12_GPa": Number(document.getElementById("Gf12_direktno_input").value),
                "Gf23_GPa": Number(document.getElementById("Gf23_direktno_input").value),
                "nif12": Number(document.getElementById("nif12_direktno_input").value),
                "FfT_MPa": Number(document.getElementById("FfT_direktno_input").value),
                "FfC_MPa": Number(document.getElementById("FfC_direktno_input").value),
                "epsf1T": Number(document.getElementById("epsf1T_direktno_input").value),
                "epsf1C": Number(document.getElementById("epsf1C_direktno_input").value),
                "rho_f": Number(document.getElementById("rho_f_direktno_input").value)
            }))

            novo_vlakno = JSON.parse(localStorage.getItem(`vlakno_${document.getElementById("dodavanje_vlakna_direktno_input").value}`))

            vlakna.push(novo_vlakno)
            document.getElementById("myDropdown_vlakno").innerHTML = ""

            for (let i = 0; i < vlakna.length; i++) {
                if (i == vlakna.length - 1) {
                    document.getElementById("myDropdown_vlakno").innerHTML +=
                        `<a href="#" data-vlakna_imena='${vlakna[i].naziv_vlakna}' class="selected_vlakno tip_vlakno">${vlakna[i].naziv_vlakna}</a>`
                } else {
                    document.getElementById("myDropdown_vlakno").innerHTML +=
                        `<a href="#" data-vlakna_imena='${vlakna[i].naziv_vlakna}' class=" tip_vlakno">${vlakna[i].naziv_vlakna}</a>`
                }
            }
            selektovanje_vlakna_menjanje_imena()
            prikaz_selektovanog_vlakna()
            stavljanje_vlakana_u_prikaz_baze()
            vlakna_u_bazi_onclick_event()
        }
    }
}


//                     DODAVANJE VLAKNA DIREKTNO EVENT   2/2

document.getElementById("dugme_dodavanje_vlakna_direktno2").onclick = () => {

    sva_vlakna_ = document.getElementsByClassName("vlakna_imena_i")

    Ef1 = document.getElementById("Ef1_direktno_input2").value
    Ef2 = document.getElementById("Ef2_direktno_input2").value
    Gf12 = document.getElementById("Gf12_direktno_input2").value
    Gf23 = document.getElementById("Gf23_direktno_input2").value
    nif12 = document.getElementById("nif12_direktno_input2").value
    FfT = document.getElementById("FfT_direktno_input2").value
    FfC = document.getElementById("FfC_direktno_input2").value
    epsf1T = document.getElementById("epsf1T_direktno_input2").value
    epsf1C = document.getElementById("epsf1C_direktno_input2").value
    rho_f = document.getElementById("rho_f_direktno_input2").value

    velicine = [Ef1, Ef2, Gf12, Gf23, nif12, FfT, FfC, epsf1T, epsf1C, rho_f]

    COUNTER = 0

    for (let i = 0; i < velicine.length; i++) {
        if (velicine[i] == undefined || velicine[i] == '') {
            COUNTER++
        }
    }

    if (sva_vlakna_.length >= 13) {
        console.log("Ima previse vlakana u bazi da bi se jos dodavalo");
    } else if (COUNTER != 0) {
        console.log("nepoznatih velicina ima: " + COUNTER);
        alert("Morate uneti sve velicine!")
    } else {

        Ef1 = Number(document.getElementById("Ef1_direktno_input2").value)
        Ef2 = Number(document.getElementById("Ef2_direktno_input2").value)
        Gf12 = Number(document.getElementById("Gf12_direktno_input2").value)
        Gf23 = Number(document.getElementById("Gf23_direktno_input2").value)
        nif12 = Number(document.getElementById("nif12_direktno_input2").value)
        FfT = Number(document.getElementById("FfT_direktno_input2").value)
        FfC = Number(document.getElementById("FfC_direktno_input").value)
        epsf1T = Number(document.getElementById("epsf1T_direktno_input2").value)
        epsf1C = Number(document.getElementById("epsf1C_direktno_input2").value)
        rho_f = Number(document.getElementById("rho_f_direktno_input2").value)

        lista_svih_velicina = [Ef1, Ef2, Gf12, Gf23, nif12, FfT, FfC, epsf1T, epsf1C, rho_f]

        for (let i = 0; i < lista_svih_velicina.length; i++) {
            counter = 0
            if (lista_svih_velicina[i] == "") {
                counter += 1
            }
        }
        if (counter > 0) {
            window.alert("Sve velicine moraju biti definisane da bi vlakno bilo dobro definisano!")
        }
        if (document.getElementById("dodavanje_vlakna_direktno_input2").value == "") {
            console.log("morate navesti ime vlakna!");
        } else {
            localStorage.setItem(`vlakno_${document.getElementById("dodavanje_vlakna_direktno_input2").value}`, JSON.stringify({
                "naziv_vlakna": document.getElementById("dodavanje_vlakna_direktno_input2").value,
                "Ef1_GPa": Number(document.getElementById("Ef1_direktno_input2").value),
                "Ef2_GPa": Number(document.getElementById("Ef2_direktno_input2").value),
                "Gf12_GPa": Number(document.getElementById("Gf12_direktno_input2").value),
                "Gf23_GPa": Number(document.getElementById("Gf23_direktno_input2").value),
                "nif12": Number(document.getElementById("nif12_direktno_input2").value),
                "FfT_MPa": Number(document.getElementById("FfT_direktno_input2").value),
                "FfC_MPa": Number(document.getElementById("FfC_direktno_input2").value),
                "epsf1T": Number(document.getElementById("epsf1T_direktno_input2").value),
                "epsf1C": Number(document.getElementById("epsf1C_direktno_input2").value),
                "rho_f": Number(document.getElementById("rho_f_direktno_input2").value)
            }))

            novo_vlakno = JSON.parse(localStorage.getItem(`vlakno_${document.getElementById("dodavanje_vlakna_direktno_input2").value}`))

            vlakna.push(novo_vlakno)
            document.getElementById("myDropdown_vlakno").innerHTML = ""

            for (let i = 0; i < vlakna.length; i++) {
                if (i == vlakna.length - 1) {
                    document.getElementById("myDropdown_vlakno").innerHTML +=
                        `<a href="#" data-vlakna_imena='${vlakna[i].naziv_vlakna}' class="selected_vlakno tip_vlakno">${vlakna[i].naziv_vlakna}</a>`
                } else {
                    document.getElementById("myDropdown_vlakno").innerHTML +=
                        `<a href="#" data-vlakna_imena='${vlakna[i].naziv_vlakna}' class=" tip_vlakno">${vlakna[i].naziv_vlakna}</a>`
                }
            }
            selektovanje_vlakna_menjanje_imena()
            prikaz_selektovanog_vlakna()
            stavljanje_vlakana_u_prikaz_baze()
            vlakna_u_bazi_onclick_event()
        }
    }
}


//                   DODAVANJE MATRICE DIREKTNO EVENT   1/2 


document.getElementById("dugme_dodavanje_matrice_direktno").onclick = () => {
    sve_matrice_ = document.getElementsByClassName("matrice_imena_i")


    naziv_matrice = document.getElementById("dodavanje_matrice_direktno_input").value
    Em = document.getElementById("Em_direktno_input").value
    Gm = document.getElementById("Gm_direktno_input").value
    ni_m = document.getElementById("ni_m_direktno_input").value
    FmT = document.getElementById("FmT_direktno_input").value
    FmC = document.getElementById("FmC_direktno_input").value
    FmS = document.getElementById("FmS_direktno_input").value
    eps_mu = document.getElementById("eps_mu_direktno_input").value

    velicine = [naziv_matrice, Em, Gm, ni_m, FmT, FmC, FmS, eps_mu]

    COUNTER = 0

    for (let i = 0; i < velicine.length; i++) {
        if (velicine[i] == undefined || velicine[i] == '') {
            COUNTER++
        }
    }

    if (sve_matrice_.length >= 13) {
        console.log("Ima previse matrica u bazi da bi se jos dodavalo");
    } else if (COUNTER != 0) {
        console.log("nepoznatih velicina ima: " + COUNTER);
        alert("Morate uneti sve velicine!")
    }
    else {

        Em = Number(document.getElementById("Em_direktno_input").value)
        Gm = Number(document.getElementById("Gm_direktno_input").value)
        ni_m = Number(document.getElementById("ni_m_direktno_input").value)
        FmT = Number(document.getElementById("FmT_direktno_input").value)
        FmC = Number(document.getElementById("FmC_direktno_input").value)
        FmS = Number(document.getElementById("FmS_direktno_input").value)
        eps_mu = Number(document.getElementById("eps_mu_direktno_input").value)
        rho_m = Number(document.getElementById("rho_m_direktno_input").value)

        lista_svih_velicina = [Em, Gm, ni_m, FmT, FmC, FmS, eps_mu, rho_m]

        for (let i = 0; i < lista_svih_velicina.length; i++) {
            counter = 0
            if (lista_svih_velicina[i] == "") {
                counter += 1
            }
        }
        if (counter > 0) {
            window.alert("Sve velicine moraju biti definisane da bi matrica bila dobro definisana!")
        }

        if (document.getElementById("dodavanje_matrice_direktno_input").value == "") {
            console.log("Morate navesti ime matrice!");
        } else {
            localStorage.setItem(`matrica_${document.getElementById("dodavanje_matrice_direktno_input").value}`, JSON.stringify({
                "naziv_matrice": document.getElementById("dodavanje_matrice_direktno_input").value,
                "Em": Number(document.getElementById("Em_direktno_input").value),
                "Gm": Number(document.getElementById("Gm_direktno_input").value),
                "ni_m": Number(document.getElementById("ni_m_direktno_input").value),
                "FmT": Number(document.getElementById("FmT_direktno_input").value),
                "FmC": Number(document.getElementById("FmC_direktno_input").value),
                "FmS": Number(document.getElementById("FmS_direktno_input").value),
                "eps_mu": Number(document.getElementById("eps_mu_direktno_input").value),
                "rho_m": Number(document.getElementById("rho_m_direktno_input").value)
            }))

            nova_matrica = JSON.parse(localStorage.getItem(`matrica_${document.getElementById("dodavanje_matrice_direktno_input").value}`))
            matrice.push(nova_matrica)

            document.getElementById("myDropdown_matrica").innerHTML = ""

            for (let i = 0; i < matrice.length; i++) {
                if (i == matrice.length - 1) {
                    document.getElementById("myDropdown_matrica").innerHTML +=
                        `<a href="#" data-matrice_imena='${matrice[i].naziv_matrice}' class="selected_matrica tip_matrice">${matrice[i].naziv_matrice}</a>`
                } else {
                    document.getElementById("myDropdown_matrica").innerHTML +=
                        `<a href="#" data-matrice_imena='${matrice[i].naziv_matrice}'  class=" tip_matrice">${matrice[i].naziv_matrice}</a>`
                }
            }
            selektovanje_matrice_menjanje_imena()
            prikaz_selektovane_matrice()
            stavljanje_matrica_u_prikaz_baze()
            onclick_matrice_u_bazi_svojstva()
        }
    }
}



//                   DODAVANJE MATRICE DIREKTNO EVENT  2/2 

document.getElementById("dugme_dodavanje_matrice_direktno2").onclick = () => {

    sve_matrice_ = document.getElementsByClassName("matrice_imena_i")

    naziv_matrice = document.getElementById("dodavanje_matrice_direktno_input2").value
    Em = document.getElementById("Em_direktno_input2").value
    Gm = document.getElementById("Gm_direktno_input2").value
    ni_m = document.getElementById("ni_m_direktno_input2").value
    FmT = document.getElementById("FmT_direktno_input2").value
    FmC = document.getElementById("FmC_direktno_input2").value
    FmS = document.getElementById("FmS_direktno_input2").value
    eps_mu = document.getElementById("eps_mu_direktno_input2").value
    rho_m = document.getElementById("rho_m_direktno_input2").value

    velicine = [naziv_matrice, Em, Gm, ni_m, FmT, FmC, FmS, eps_mu, rho_m]

    COUNTER = 0

    for (let i = 0; i < velicine.length; i++) {
        if (velicine[i] == undefined || velicine[i] == '') {
            COUNTER++
        }
    }

    if (sve_matrice_.length >= 13) {
        console.log("Ima previse matrica u bazi da bi se jos dodavalo");
    } else if (COUNTER != 0) {
        console.log("nepoznatih velicina ima: " + COUNTER);
        alert("Morate uneti sve velicine!")
    } else {
        Em = Number(document.getElementById("Em_direktno_input2").value)
        Gm = Number(document.getElementById("Gm_direktno_input2").value)
        ni_m = Number(document.getElementById("ni_m_direktno_input2").value)
        FmT = Number(document.getElementById("FmT_direktno_input2").value)
        FmC = Number(document.getElementById("FmC_direktno_input2").value)
        FmS = Number(document.getElementById("FmS_direktno_input2").value)
        eps_mu = Number(document.getElementById("eps_mu_direktno_input2").value)
        rho_m = Number(document.getElementById("rho_m_direktno_input2").value)

        lista_svih_velicina = [Em, Gm, ni_m, FmT, FmC, FmS, eps_mu, rho_m]

        for (let i = 0; i < lista_svih_velicina.length; i++) {
            counter = 0
            if (lista_svih_velicina[i] == "") {
                counter += 1
            }
        }
        if (counter > 0) {
            window.alert("Sve velicine moraju biti definisane da bi matrica bila dobro definisana!")
        }


        if (document.getElementById("dodavanje_matrice_direktno_input2").value == "") {
            console.log("Morate navesti ime matrice!");

        } else {

            localStorage.setItem(`matrica_${document.getElementById("dodavanje_matrice_direktno_input2").value}`, JSON.stringify({
                "naziv_matrice": document.getElementById("dodavanje_matrice_direktno_input2").value,
                "Em": Number(document.getElementById("Em_direktno_input2").value),
                "Gm": Number(document.getElementById("Gm_direktno_input2").value),
                "ni_m": Number(document.getElementById("ni_m_direktno_input2").value),
                "FmT": Number(document.getElementById("FmT_direktno_input2").value),
                "FmC": Number(document.getElementById("FmC_direktno_input2").value),
                "FmS": Number(document.getElementById("FmS_direktno_input2").value),
                "eps_mu": Number(document.getElementById("eps_mu_direktno_input2").value),
                "rho_m": Number(document.getElementById("rho_m_direktno_input2").value)
            }))


            nova_matrica = JSON.parse(localStorage.getItem(`matrica_${document.getElementById("dodavanje_matrice_direktno_input2").value}`))
            matrice.push(nova_matrica)

            document.getElementById("myDropdown_matrica").innerHTML = ""

            for (let i = 0; i < matrice.length; i++) {
                if (i == matrice.length - 1) {
                    document.getElementById("myDropdown_matrica").innerHTML +=
                        `<a href="#" data-matrice_imena='${matrice[i].naziv_matrice}' class="selected_matrica tip_matrice">${matrice[i].naziv_matrice}</a>`
                } else {
                    document.getElementById("myDropdown_matrica").innerHTML +=
                        `<a href="#" data-matrice_imena='${matrice[i].naziv_matrice}'  class=" tip_matrice">${matrice[i].naziv_matrice}</a>`
                }
            }
            selektovanje_matrice_menjanje_imena()
            prikaz_selektovane_matrice()
            stavljanje_matrica_u_prikaz_baze()
            onclick_matrice_u_bazi_svojstva()
        }
    }
}


//                                   FUNKCIJE


//  funkcija dohvatanja vlakana i matrica localstorage-a

function dohvatanje_vlakana_i_matrica_iz_local_storage() {
    for (let i = 0; i < localStorage.length; i++) {
        if ("vlakno" == Object.keys(localStorage)[i].slice(0, 6)) {
            console.log("ucitano vlakno: " + JSON.parse(localStorage.getItem(Object.keys(localStorage)[i])).naziv_vlakna)
            vlakna.push(
                JSON.parse(localStorage.getItem(Object.keys(localStorage)[i])))
        } else if ("matrica" == Object.keys(localStorage)[i].slice(0, 7)) {
            console.log("ucitana matrica: " + JSON.parse(localStorage.getItem(Object.keys(localStorage)[i])).naziv_matrice)
            matrice.push(
                JSON.parse(localStorage.getItem(Object.keys(localStorage)[i])))
        } else (
            console.log("djubre " + localStorage.getItem(Object.keys(localStorage)[i]))
        )
    }
}



//  funkcija formiranje dropdown - vlakna

function formiranje_dropdown_sva_vlakna() {

    for (let i = 0; i < vlakna.length; i++) {
        if (i == 0) {
            document.getElementById("myDropdown_vlakno").innerHTML +=
                `<a href="#" data-vlakna_imena='${vlakna[i].naziv_vlakna}' class="selected_vlakno tip_vlakno">${vlakna[i].naziv_vlakna}</a>`
        } else {
            document.getElementById("myDropdown_vlakno").innerHTML +=
                `<a href="#" data-vlakna_imena='${vlakna[i].naziv_vlakna}' class=" tip_vlakno">${vlakna[i].naziv_vlakna}</a>`
        }
    }
}


//  funkcija formiranje dropdown - matrice

function formiranje_dropdown_sve_matrice() {

    for (let i = 0; i < matrice.length; i++) {
        if (i == 0) {
            document.getElementById("myDropdown_matrica").innerHTML +=
                `<a href="#" data-matrice_imena='${matrice[i].naziv_matrice}' class="selected_matrica tip_matrice">${matrice[i].naziv_matrice}</a>`
        } else {
            document.getElementById("myDropdown_matrica").innerHTML +=
                `<a href="#" data-matrice_imena='${matrice[i].naziv_matrice}'  class=" tip_matrice">${matrice[i].naziv_matrice}</a>`
        }
    }
}


//  funkcija za prikaz selektovanog vlakna

function prikaz_selektovanog_vlakna() {
    var sva_vlakna = document.getElementsByClassName("tip_vlakno")
    for (let i = 0; i < sva_vlakna.length; i++) {
        if (sva_vlakna[i].classList.contains("selected_vlakno")) {
            document.getElementById("selektovano_vlakno").innerHTML = sva_vlakna[i].innerHTML
        }
    }
}

// funkcija - dorpdown kad se klikne vlakno ili matrica
function dropdown_function_vlakno() {
    document.getElementById("myDropdown_vlakno").classList.toggle("show");
    document.getElementById("myDropdown_matrica").classList.remove("show");
    document.getElementById("strelica_matrica").style.display = "none"
}

// funkcija sredjivanja prikaza jednacina - display none svaki help div za jednacine
function sredjivanje_prikaza_help() {
    objasnjenja = document.getElementsByClassName("E_objasnjenja")
    for (let i = 0; i < objasnjenja.length; i++) {
        if (objasnjenja[i].classList.contains("hidden") == false) {
            objasnjenja[i].classList.add("hidden")
        }
    }
}



if (window.innerWidth > 1800) {
    if (document.getElementsByClassName("flip-card-back3").length != 0) {
        flip_back = document.getElementsByClassName("flip-card-back3")[0]
        flip_back.classList.remove("flip-card-back3")
        flip_back.classList.add("flip-card-back2")
        console.log(">>>>1800px");
    }
}
else {
    if (document.getElementsByClassName("flip-card-back2").length != 0) {
        flip_back = document.getElementsByClassName("flip-card-back2")[0]
        flip_back.classList.remove("flip-card-back2")
        flip_back.classList.add("flip-card-back3")
    }
    console.log("<<<<<< 1800px");
}


document.getElementById("prikaz_baze").onclick = () => {

    setTimeout(() => {
        document.getElementById("mehanicke_karakteristike").classList.add("hidden")
        document.getElementById("cvrstoca").classList.add("hidden")
        document.getElementById("dugmad").style.display = "none"
        document.getElementById("prikaz_baze").classList.add("hidden")
    }, "300")

    if (window.innerWidth > 1800) {
        document.getElementsByClassName("flip_baza_prednji")[0].classList.add("rotate_klasa_X_osa")
        setTimeout(() => {
            document.getElementsByClassName("flip-card-back2")[0].classList.remove("hidden")
        }, "300")

        setTimeout(() => {
            document.getElementById("rezultati_flex_div").classList.add("hidden")
        }, "300")
    } else {
        if (window.innerWidth <= 1800) {
            document.getElementsByClassName("flip_baza_prednji")[0].classList.add("rotate_klasa_Y_osa2")
            setTimeout(() => {
                document.getElementsByClassName("flip-card-back3")[0].classList.remove("hidden")
            }, "300")

            setTimeout(() => {
                document.getElementById("rezultati_flex_div").classList.add("hidden")
            }, "300")

        }
    }
}



document.getElementById("dugme_vracanje_nazad").onclick = () => {

    setTimeout(() => {
        document.getElementById("mehanicke_karakteristike").classList.remove("hidden")
        document.getElementById("cvrstoca").classList.remove("hidden")
        document.getElementById("dugmad").style.display = "flex"
        document.getElementById("prikaz_baze").classList.remove("hidden")
    }, "300")

    if (window.innerWidth > 1800) {
        document.getElementsByClassName("flip_baza_prednji")[0].classList.remove("rotate_klasa_X_osa")

        setTimeout(() => {
            document.getElementById("rezultati_flex_div").classList.remove("hidden")
        }, "300")

        setTimeout(() => {
            document.getElementsByClassName("flip-card-back2")[0].classList.add("hidden")
        }, "300")
    } else {
        document.getElementsByClassName("flip_baza_prednji")[0].classList.remove("rotate_klasa_Y_osa2")

        setTimeout(() => {
            document.getElementById("rezultati_flex_div").classList.remove("hidden")
        }, "300")

        setTimeout(() => {
            document.getElementsByClassName("flip-card-back3")[0].classList.add("hidden")
        }, "300")
    }
}


let widthMatch3 = window.matchMedia("(min-width:1800px)");
widthMatch3.addEventListener('change', function (mm) {
    if (mm.matches) {

        if (document.getElementsByClassName("flip-card-back3").length != 0) {
            flip_back = document.getElementsByClassName("flip-card-back3")[0]
            flip_back.classList.remove("flip-card-back3")
            flip_back.classList.add("flip-card-back2")
        }
        console.log(">>>>1800px");

        if (document.getElementById("div_za_rotaciju_po_x2").classList.contains("rotate_klasa_Y_osa2")) {
            document.getElementById("div_za_rotaciju_po_x2").classList.remove("rotate_klasa_Y_osa2")
            document.getElementById("div_za_rotaciju_po_x2").classList.add("rotate_klasa_X_osa")
        }
    }
    else {

        if (document.getElementsByClassName("flip-card-back2").length != 0) {
            flip_back = document.getElementsByClassName("flip-card-back2")[0]
            flip_back.classList.remove("flip-card-back2")
            flip_back.classList.add("flip-card-back3")
        }

        if (document.getElementById("div_za_rotaciju_po_x2").classList.contains("rotate_klasa_X_osa")) {
            document.getElementById("div_za_rotaciju_po_x2").classList.remove("rotate_klasa_X_osa")
            document.getElementById("div_za_rotaciju_po_x2").classList.add("rotate_klasa_Y_osa2")
        }

        console.log("<<<<<< 1800px");


    }
})


//                            Eventovi za pomoc

slika = document.getElementById("objasnjenja_slike")

//  E1   upitnik  event
document.getElementById("upitnik_E1").onclick = () => {

    if (document.getElementById("objasnjenja_slike").classList.contains("hidden") && document.getElementById("E1_objasnjenje").classList.contains("hidden") == false) {
    }
    else {
        sredjivanje_prikaza_help()
    }

    if (document.getElementById("E1_objasnjenje").classList.contains("hidden")) {
        slika.classList.remove("_0_100")
        slika.classList.add("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.add("hidden")
            document.getElementById("E1_objasnjenje").classList.remove("hidden")
        }, "500")
    } else {
        document.getElementById("E1_objasnjenje").classList.add("hidden")
        slika.classList.remove("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.remove("hidden")
            slika.classList.add("_0_100")
        }, "200")
    }

}

//  E2  upitnik  event
document.getElementById("upitnik_E2").onclick = () => {

    if (document.getElementById("objasnjenja_slike").classList.contains("hidden") && document.getElementById("E2_objasnjenje").classList.contains("hidden") == false) {
    }
    else {
        sredjivanje_prikaza_help()
    }

    if (document.getElementById("E2_objasnjenje").classList.contains("hidden")) {
        slika.classList.remove("_0_100")
        slika.classList.add("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.add("hidden")
            document.getElementById("E2_objasnjenje").classList.remove("hidden")
        }, "500")
    } else {
        document.getElementById("E2_objasnjenje").classList.add("hidden")
        slika.classList.remove("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.remove("hidden")
            slika.classList.add("_0_100")
        }, "200")
    }
}

//   G12   upitnik  event
document.getElementById("upitnik_G12").onclick = () => {

    if (document.getElementById("objasnjenja_slike").classList.contains("hidden") && document.getElementById("G12_objasnjenje").classList.contains("hidden") == false) {
    }
    else {
        sredjivanje_prikaza_help()
    }

    if (document.getElementById("G12_objasnjenje").classList.contains("hidden")) {
        slika.classList.remove("_0_100")
        slika.classList.add("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.add("hidden")
            document.getElementById("G12_objasnjenje").classList.remove("hidden")
        }, "500")
    } else {
        document.getElementById("G12_objasnjenje").classList.add("hidden")
        slika.classList.remove("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.remove("hidden")
            slika.classList.add("_0_100")
        }, "200")
    }
}


//   F1T   upitnik  event
document.getElementById("upitnik_F1T").onclick = () => {


    if (document.getElementById("objasnjenja_slike").classList.contains("hidden") && document.getElementById("F1T_objasnjenje").classList.contains("hidden") == false) {
    }
    else {
        sredjivanje_prikaza_help()
    }

    if (document.getElementById("F1T_objasnjenje").classList.contains("hidden")) {
        slika.classList.remove("_0_100")
        slika.classList.add("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.add("hidden")
            document.getElementById("F1T_objasnjenje").classList.remove("hidden")
        }, "500")
    } else {
        document.getElementById("F1T_objasnjenje").classList.add("hidden")
        slika.classList.remove("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.remove("hidden")
            slika.classList.add("_0_100")
        }, "200")
    }
}


//   F1C   upitnik  event
document.getElementById("upitnik_F1C").onclick = () => {

    if (document.getElementById("objasnjenja_slike").classList.contains("hidden") && document.getElementById("F1C_objasnjenje").classList.contains("hidden") == false) {
    }
    else {
        sredjivanje_prikaza_help()
    }

    if (document.getElementById("F1C_objasnjenje").classList.contains("hidden")) {
        slika.classList.remove("_0_100")
        slika.classList.add("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.add("hidden")
            document.getElementById("F1C_objasnjenje").classList.remove("hidden")
        }, "500")
    } else {
        document.getElementById("F1C_objasnjenje").classList.add("hidden")
        slika.classList.remove("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.remove("hidden")
            slika.classList.add("_0_100")
        }, "200")
    }

}

//   F2T   upitnik  event
document.getElementById("upitnik_F2T").onclick = () => {

    if (document.getElementById("objasnjenja_slike").classList.contains("hidden") && document.getElementById("F2T_objasnjenje").classList.contains("hidden") == false) {
    }
    else {
        sredjivanje_prikaza_help()
    }

    if (document.getElementById("F2T_objasnjenje").classList.contains("hidden")) {
        slika.classList.remove("_0_100")
        slika.classList.add("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.add("hidden")
            document.getElementById("F2T_objasnjenje").classList.remove("hidden")
        }, "500")
    } else {
        document.getElementById("F2T_objasnjenje").classList.add("hidden")
        slika.classList.remove("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.remove("hidden")
            slika.classList.add("_0_100")
        }, "200")
    }

}


//   F2C    upitnik  event
document.getElementById("upitnik_F2C").onclick = () => {

    if (document.getElementById("objasnjenja_slike").classList.contains("hidden") && document.getElementById("F2C_objasnjenje").classList.contains("hidden") == false) {
    }
    else {
        sredjivanje_prikaza_help()
    }

    if (document.getElementById("F2C_objasnjenje").classList.contains("hidden")) {
        slika.classList.remove("_0_100")
        slika.classList.add("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.add("hidden")
            document.getElementById("F2C_objasnjenje").classList.remove("hidden")
        }, "500")
    } else {
        document.getElementById("F2C_objasnjenje").classList.add("hidden")
        slika.classList.remove("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.remove("hidden")
            slika.classList.add("_0_100")
        }, "200")
    }
}


//  F6   upitnik  event
document.getElementById("upitnik_F6").onclick = () => {

    if (document.getElementById("objasnjenja_slike").classList.contains("hidden") && document.getElementById("F6_objasnjenje").classList.contains("hidden") == false) {
    }
    else {
        sredjivanje_prikaza_help()
    }

    if (document.getElementById("F6_objasnjenje").classList.contains("hidden")) {
        slika.classList.remove("_0_100")
        slika.classList.add("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.add("hidden")
            document.getElementById("F6_objasnjenje").classList.remove("hidden")
        }, "500")
    } else {
        document.getElementById("F6_objasnjenje").classList.add("hidden")
        slika.classList.remove("_100_0")
        setTimeout(() => {
            document.getElementById("objasnjenja_slike").classList.remove("hidden")
            slika.classList.add("_0_100")
        }, "200")
    }

}


//    Onload animacija

window.onload = () => {

    if (window.innerWidth < 1800) {

        document.getElementById("direktno_definisanje_button").onclick()
        document.getElementById("prikaz_baze").onclick()
        setTimeout(() => {
            document.getElementById("dugme_vracanje_nazad").onclick()
        }, "1000");

        setTimeout(() => {
            document.getElementById("standardno_definisanje_button").onclick()
        }, "1000");

    } else {

        document.getElementById("direktno_definisanje_button").onclick()
        setTimeout(() => { document.getElementById("prikaz_baze").onclick() }, "300");
        setTimeout(() => {
            document.getElementById("dugme_vracanje_nazad").onclick()
        }, "1300");

        setTimeout(() => {
            document.getElementById("standardno_definisanje_button").onclick()
        }, "1000");
    }
}


//    Event kada se ugasi tab da se uklone obrisane matrice i vlakna iz baze

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();

    for (let i = 0; i < obrisana_vlakna.length; i++) {
        localStorage.removeItem(`vlakno_${obrisana_vlakna[i]}`)
    }

    for (let i = 0; i < obrisane_matrice.length; i++) {
        localStorage.removeItem(`matrica_${obrisane_matrice[i]}`)
    }

});




