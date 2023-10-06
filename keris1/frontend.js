/* cek layar */

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
    containerKonten.innerHTML = "konten utama / tampilan desktop";
  }
}

cekLayar(); // cek layar tiap refresh
phone.addEventListener("change", cekLayar); // cek layar tiap media phone ganti
tablet.addEventListener("change", cekLayar); // cek layar tiap media tablet ganti

/* open chapter menu */

// cari class  .nav-mobile-chapter-list"
const navigasiMobileList = document.querySelector(".nav-mobile-chapter-list");
const navigasiMobileButton = document.querySelector(".nav-mobile-chapter");

// bikin fungsi kalo navigaisnya kebuka toggle class .buka
function bukaNavigasiMobile() {
  if (navigasiMobileList.classList.toggle("buka") == true) {
    console.log("navigasi full ke buka");
    document.querySelector(".nav-mobile-chapter").innerText = "close";
  } else {
    document.querySelector(".nav-mobile-chapter").innerText =
      "select chapter list";
  }
}

// trigger klik div navigasiMobileButton
navigasiMobileButton.addEventListener("click", bukaNavigasiMobile);
