const containerKonten = document.querySelector(".container-konten");

const phone = window.matchMedia("(max-width: 600px)");
const tablet = window.matchMedia("(min-width: 601px) and (max-width: 1366px)");

function cekLayar() {
  if (phone.matches == true) {
    console.log("layar hape");
    containerKonten.innerHTML = "konten utama / tampilan phone";
  } else if (tablet.matches == true) {
    console.log("layar tablet");
    containerKonten.innerHTML = "konten utama / tampilan tablet";
  } else {
    console.log("layar pc");
    containerKonten.innerHTML = "konten utama / tampilan pc";
  }
}

cekLayar(); // cek layar tiap refresh
phone.addEventListener("change", cekLayar); // cek layar tiap media phone ganti
tablet.addEventListener("change", cekLayar); // cek layar tiap media tablet ganti
