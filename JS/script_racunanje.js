document.getElementById("izracunaj_dugme").onclick = () => {


    console.clear();


    //            DOHVATANJE SELEKTOVANIH MATRICA I VLAKANA

    sva_dostupna_vlakna = document.getElementsByClassName("tip_vlakno")
    for (let i = 0; i < sva_dostupna_vlakna.length; i++) {
        if (sva_dostupna_vlakna[i].classList.contains("selected_vlakno")) {
            selektovano_vlakno_name = sva_dostupna_vlakna[i].getAttribute("data-vlakna_imena")
        }
    }

    sve_dostupne_matrice = document.getElementsByClassName("tip_matrice")
    for (let i = 0; i < sve_dostupne_matrice.length; i++) {
        if (sve_dostupne_matrice[i].classList.contains("selected_matrica")) {
            selektovana_matrica_name = sve_dostupne_matrice[i].getAttribute("data-matrice_imena")
        }
    }



    //                 DOHVATANJE SELEKTOVANIH METODA

    metode_E1 = document.getElementsByName("metode_E1_name")
    for (let i = 0; i < metode_E1.length; i++) {
        if (metode_E1[i].classList.contains("selected_E1")) {
            metoda_E1_name = metode_E1[i].getAttribute("data-metode_E1_name")
        }
    }

    metode_E2 = document.getElementsByName("metode_E2_name")
    for (let i = 0; i < metode_E2.length; i++) {
        if (metode_E2[i].classList.contains("selected_E2")) {
            metoda_E2_name = metode_E2[i].getAttribute("data-metode_E2_name")
        }
    }

    metode_G12 = document.getElementsByName("metode_G12_name")
    for (let i = 0; i < metode_G12.length; i++) {
        if (metode_G12[i].classList.contains("selected_G12")) {
            metoda_G12_name = metode_G12[i].getAttribute("data-metode_G12_name")
        }
    }

    metode_F2T = document.getElementsByName("metode_F2T_name")
    for (let i = 0; i < metode_F2T.length; i++) {
        if (metode_F2T[i].classList.contains("selected_F2T")) {
            metoda_F2T_name = metode_F2T[i].getAttribute("data-metode_F2T_name")
        }
    }



    //                          PRORACUN


    if (document.getElementById("priprema_flip").classList.contains("rotate_klasa")) {

        console.log("Direktno definisanje mod -> ACTIVE");

        Ef1 = Number(document.getElementById("Ef1_direktno_input").value)
        Ef2 = Number(document.getElementById("Ef2_direktno_input").value)
        Gf12 = Number(document.getElementById("Gf12_direktno_input").value)
        Gf23 = Number(document.getElementById("Gf23_direktno_input").value)
        nif12 = Number(document.getElementById("nif12_direktno_input").value)
        FfT = Number(document.getElementById("FfT_direktno_input").value)
        FfC = Number(document.getElementById("FfC_direktno_input").value)
        epsf1T = Number(document.getElementById("epsf1T_direktno_input").value)
        epsf1C = Number(document.getElementById("epsf1C_direktno_input").value)
        // rho_f = Number(document.getElementById("rho_f_direktno_input").value)

        Em = Number(document.getElementById("Em_direktno_input").value)
        Gm = Number(document.getElementById("Gm_direktno_input").value)
        ni_m = Number(document.getElementById("ni_m_direktno_input").value)
        FmT = Number(document.getElementById("FmT_direktno_input").value)
        FmC = Number(document.getElementById("FmC_direktno_input").value)
        FmS = Number(document.getElementById("FmS_direktno_input").value)
        eps_mu = Number(document.getElementById("eps_mu_direktno_input").value)
        // rho_m = Number(document.getElementById("rho_n_direktno_input").value)

        Vf = Number(document.getElementById("Vf_direktno_input").value)
        Vvoid = 0
        Vvoid = Number(document.getElementById("Vvoid_direktno_input").value)


        console.log(typeof (document.getElementById("Ef1_direktno_input").value));

        lista_svih_velicina = [Ef1, Ef2, Gf12, Gf23, nif12, FfT, FfC, epsf1T, epsf1C, Em, Gm, ni_m, FmT, FmC, FmS, eps_mu, Vf]

        for (let i = 0; i < lista_svih_velicina.length; i++) {
            counter = 0
            if (lista_svih_velicina[i] == "") {
                counter += 1
            }
        }
        if (counter > 0) {
            window.alert("Sve velicine moraju biti definisane da bi vlakno bilo dobro definisano!")
        }

    } else {

        console.log("Standardno definisanje mod -> ACTIVE");

        for (let i = 0; i < vlakna.length; i++) {
            if (vlakna[i].naziv_vlakna == selektovano_vlakno_name) {
                Ef1 = vlakna[i].Ef1_GPa
                Ef2 = vlakna[i].Ef2_GPa
                Gf12 = vlakna[i].Gf12_GPa
                Gf23 = vlakna[i].Gf23_GPa
                nif12 = vlakna[i].nif12
                FfT = vlakna[i].FfT_MPa
                FfC = vlakna[i].FfC_MPa
                epsf1T = vlakna[i].epsf1T
                epsf1C = vlakna[i].epsf1C
                rho_f = vlakna[i].rho_f
            }
        }


        for (let i = 0; i < matrice.length; i++) {
            if (matrice[i].naziv_matrice == selektovana_matrica_name) {
                Em = matrice[i].Em
                Gm = matrice[i].Gm
                ni_m = matrice[i].ni_m
                FmT = matrice[i].FmT
                FmC = matrice[i].FmC
                FmS = matrice[i].FmS
                eps_mu = matrice[i].eps_mu
                rho_m = matrice[i].rho_m
            }
        }

        Vf = Number(document.getElementById("zapreminski_udeo_vlakna_id").value)
        Vvoid = 0
        Vvoid = Number(document.getElementById("zapreminski_udeo_praznina_id").value)

    }

    Vm = (1 - Vf)

    //   RACUNANJE   E1

    switch (metoda_E1_name) {

        case "Pravilo mešanja ROM":
            RESENJE_E1 = Ef1 * Vf + Em * (1 - Vf)
            console.log("E1 = " + RESENJE_E1.toFixed(3) + " GPa");
            document.getElementById("resenje_E1").value = RESENJE_E1.toFixed(3)
            break;

        case "Model Hashin-Rozen":
            Kf = Ef1 / (2 * (1 - 2 * nif12) * (1 + 2 * nif12))
            Km = Em / (2 * (1 - 2 * ni_m) * (1 + 2 * ni_m))
            RESENJE_E1 = Ef1 * Vf + Em * (1 - Vf) + 4 * Vf * (1 - Vf) * ((nif12 - ni_m) ** 2) / (Vf / Km + 1 / Gm + (1 - Vf) / Kf)
            console.log("E1 = " + RESENJE_E1.toFixed(3) + " GPa");
            document.getElementById("resenje_E1").value = RESENJE_E1.toFixed(3)
            break;

        default:
            break;
    }


    //   RACUNANJE   E2

    switch (metoda_E2_name) {

        case "Inverzno pravilo mesanja":
            RESENJE_E2 = Ef2 * Em / (Vf * Em + (1 - Vf) * Ef2)
            console.log("E2 = " + RESENJE_E2.toFixed(4) + " GPa");
            document.getElementById("resenje_E2").value = RESENJE_E2.toFixed(4)
            break;

        case "Model Chamis-a":
            RESENJE_E2 = Em / (1 - Math.sqrt(Vf) * (1 - Em / Ef2))
            console.log("E2 = " + RESENJE_E2.toFixed(4) + " GPa");
            document.getElementById("resenje_E2").value = RESENJE_E2.toFixed(4)
            break;

        case "Model Halpin-Tsai":
            RESENJE_E2 = Em * ((1 + Vf) * Ef2 + (1 - Vf) * Em) / ((1 - Vf) * Ef2 + (1 + Vf) * Em)
            console.log("E2 = " + RESENJE_E2.toFixed(4) + " GPa");
            document.getElementById("resenje_E2").value = RESENJE_E2.toFixed(4)
            break;

        case "Modifikovana teorija IROM":
            nif21 = Ef2 / Ef1 * nif12
            etaf = (Ef1 * Vf + ((1 - nif12 * nif21) * Em + ni_m * nif21 * Ef1) * (1 - Vf)) / (Ef1 * Vf + Em * (1 - Vf));
            etam = ((1 - ni_m ** 2) * Ef1 - (1 - ni_m * nif12 * Em) * Vf + Em * (1 - Vf)) / (Ef1 * Vf + Em * (1 - Vf));
            RESENJE_E2 = 1 / (etaf * Vf / Ef2 + etam * (1 - Vf) / Em)
            console.log("E2 = " + RESENJE_E2.toFixed(4) + " GPa");
            document.getElementById("resenje_E2").value = RESENJE_E2.toFixed(4)
            break;

        default:
            break;
    }



    //   RACUNANJE   G12

    switch (metoda_G12_name) {

        case "Pravilo mešanja ROM":
            RESENJE_G12 = Gf12 * Gm / (Vf * Gm + Vm * Gf12)
            console.log("G12 = " + RESENJE_G12.toFixed(4) + " GPa");
            document.getElementById("resenje_G12").value = RESENJE_G12.toFixed(4)
            break;

        case "Model Hashin-Rozen":
            RESENJE_G12 = Gm * (Gf12 * (1 + Vf) + Gm * Vm) / (Gf12 * Vm + Gm * (1 + Vf));
            console.log("G12 = " + RESENJE_G12.toFixed(4) + " GPa");
            document.getElementById("resenje_G12").value = RESENJE_G12.toFixed(4)
            break;

        case "Model Chamis-a":
            RESENJE_G12 = Gm / (1 - Math.sqrt(Vf) * (1 - Gm / Gf12))
            console.log("G12 = " + RESENJE_G12.toFixed(4) + " GPa");
            document.getElementById("resenje_G12").value = RESENJE_G12.toFixed(4)
            break;

        case "Model Halpin-Tsai":
            ksi = (Gf12 / Gm - 1) / (Gf12 / Gm + 2);
            RESENJE_G12 = Gm * ((1 + 2 * ksi * Vf) / (1 - ksi * Vf))
            console.log("G12 = " + RESENJE_G12.toFixed(4) + " GPa");
            document.getElementById("resenje_G12").value = RESENJE_G12.toFixed(4)
            break;


        default:
            break;
    }

    // RACUNANJE GUSTINE

    RESENJE_rho = rho_f * Vf + rho_m * Vm
    console.log("rho = " + RESENJE_rho.toFixed(5) + " kg/mm^3");
    document.getElementById("resenje_rho").value = RESENJE_rho.toFixed(5)


    //   RACUNANJE   ni12 i ni21

    RESENJE_ni12 = nif12 * Vf + ni_m * Vm
    console.log("ni12 = " + RESENJE_ni12.toFixed(5));
    document.getElementById("resenje_ni12").value = RESENJE_ni12.toFixed(5)
    RESENJE_ni21 = RESENJE_E2 / RESENJE_E1 * RESENJE_ni12
    console.log("ni21 = " + RESENJE_ni21.toFixed(5));
    document.getElementById("resenje_ni21").value = RESENJE_ni21.toFixed(5)

    //                                 RACUNANJE   F1T
    if (epsf1T <= eps_mu) {
        RESENJE_F1T = FfT * (Vf + Vm * Em / Ef1);
    } else {
        RESENJE_F1T = FmT * (Vf * Ef1 / Em + Vm);
    }

    console.log("F1T = " + RESENJE_F1T.toFixed(3) + " MPa");
    document.getElementById("resenje_F1T").value = RESENJE_F1T.toFixed(3)



    //                                 RACUNANJE   F1C
    if (Vf < 0.2) {
        // Model Timosenka i Gira (Timoshenko and Gere)
        RESENJE_F1C = 2 * Vf * Math.sqrt(Vf * Ef1 * Em / (3 * (1 - Vf)));
    } else {
        // Model Agarval i Broutman (Agrawal and Broutman)
        RESENJE_F1C = ((Ef1 * Vf + Em * Vm) * (1 - Vf ** (1 / 3)) * eps_mu / 100) / (nif12 * Vf + ni_m * Vm) * 1000;
    }
    console.log("F1C = " + RESENJE_F1C.toFixed(3) + " MPa");
    document.getElementById("resenje_F1C").value = RESENJE_F1C.toFixed(3)



    //                                 RACUNANJE   F2T


    switch (metoda_F2T_name) {

        case "Model Neilsen-a":
            // Model Nilsen-a (Nielsen)
            RESENJE_F2T = RESENJE_E2 * FmT / Em * (1 - Vf ** (1 / 3));
            console.log("F2T = " + RESENJE_F2T.toFixed(5) + " MPa");
            document.getElementById("resenje_F2T").value = RESENJE_F2T.toFixed(5)
            break;

        case "Model Barbera":

            // Model Barber-a (Barbero)
            // Cv - [-] korektivni faktor za prisustvo praznina
            Cv = 1 - Math.sqrt((4 * Vvoid / 100) / (Math.PI * Vm));
            RESENJE_F2T = FmT * Cv * (1 + (Vf - Math.sqrt(Vf)) * (1 - Em / Ef2));
            console.log("F2T = " + RESENJE_F2T.toFixed(5) + " MPa");
            document.getElementById("resenje_F2T").value = RESENJE_F2T.toFixed(5)
            break;

        default:
            break;
    }

    //                                 RACUNANJE   F2C
    Cv = 1 - Math.sqrt((4 * Vvoid / 100) / (Math.PI * Vm));
    RESENJE_F2C = FmC * Cv * (1 + (Vf - Math.sqrt(Vf)) * (1 - Em / Ef2));
    console.log("F2C = " + RESENJE_F2C.toFixed(4) + " MPa");
    document.getElementById("resenje_F2C").value = RESENJE_F2C.toFixed(4)


    //                                 RACUNANJE   F6
    Cv = 1 - Math.sqrt((4 * Vvoid / 100) / (Math.PI * Vm));
    RESENJE_F6 = FmS * Cv * (1 + (Vf - Math.sqrt(Vf)) * (1 - Gm / Gf12));
    console.log("F6 = " + RESENJE_F6.toFixed(5) + " MPa");
    document.getElementById("resenje_F6").value = RESENJE_F6.toFixed(5)



    //                 ISPIS U KONZOLU
    console.log("Metoda za proracun E1:  " + metoda_E1_name)
    console.log("Metoda za proracun E2:  " + metoda_E2_name)
    console.log("Metoda za proracun G12: " + metoda_G12_name)
    console.log("Metoda za proracun F2T: " + metoda_F2T_name)
    console.log("selektovano vlakno: " + selektovano_vlakno_name);
    console.log("selektovana matrica: " + selektovana_matrica_name);
    console.log("Zapreminski udeo vlakana: " + Vf);

}

