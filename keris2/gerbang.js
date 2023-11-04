function gotoMain() {
  // alert("ok");
  setTimeout(() => {
    window.location.href = "main";
    console.log("redirected.....");
  }, 3500);

  setTimeout(() => {
    document.body.classList.toggle("byebye");
  }, 2000);

  // window.location.href = "main.html";
}

const pembukaGerbang = document.getElementsByClassName("pembuka-gerbang")[1];
const pembungkusKeris = document.getElementsByClassName("pembungkus-keris")[0];

//
//
//
//

// variables
let tinggiContainerKeris = pembukaGerbang.offsetHeight;
let captionBuka = document.getElementsByClassName("caption-buka")[0];

// fungsi nyari persen dari sebagian nilai dan total nilai
function percentage(partialValue, totalValue) {
  return 100 * (partialValue / totalValue);
}

// fungsi nyari sebagian nilai dari total nilai dan persen
function reversePercentage(totalValue, percentage) {
  return totalValue * (percentage / 100);
}

// inisialisasi objek yang pengen didragable
let draggie = new Draggabilly(pembukaGerbang, {
  axis: "y",
});

function balikinPosisiY() {
  // karena slide ke atas posisinya naik maka posisinya
  // naik - (minus) sekian-sekian dari jarak semula
  // nah value itu dikaliin sama  -1 (minus satu) jadinya positif
  // abis itu cari nilai tinggi kontainer imagenya
  // abis itu cari posisi drag Y itu berapa persen dari tinggi kontainer imagenya
  //

  const persenUnlocked = 70;
  let persenJarak = percentage(this.position.y * -1, tinggiContainerKeris);

  // sekarang kalo posisi image yg di drag kurang dari
  // minimal persen dia bakalan balik lagi ke posisi semula
  if (persenJarak <= persenUnlocked) {
    console.log(
      "dragEnd1 \ngerbang belum terbuka - kembali ke posisi semula \nkarena posisi objek >",
      persenUnlocked,
      "%"
    );
    this.setPosition(this.position.x, 0);
    textAnimated();
    captionBuka.innerText = "Coba lagi..  Buka keris untuk mulai mengakses..";
  } else {
    console.log(
      "dragEnd1 \ngerbang terbuka karena posisi objek >=",
      persenUnlocked,
      "%"
    );
    textAnimated();
    captionBuka.innerText = "Berhasil.. tunggu sebentar";

    gotoMain();
    // pembungkusKeris.removeChild(pembungkusKeris.children[1]);
    pembungkusKeris.classList.add(
      "animate__animated",
      "animate__bounceOut",
      "animate__slower",
      "animate__delay-1s"
    );
    pembukaGerbang.classList.add(
      "animate__animated",
      "animate__backOutUp",
      "animate__slower"
    );
    // sekarang kalo posisi image yg di drag lebih dari
    // minimal dia bakalan stay di posisi yang sesuai sama persen
    // nyarinya pake reverse persen nilai di atas dan dikali -1
    this.setPosition(
      this.position.x,
      -1 * reversePercentage(tinggiContainerKeris, persenUnlocked)
    );
  }
}

// fungsi kalo didrag ke bawah yang posisinya
// kurang dari 0 dari posisi semula
// kalo begitu dia bakalan stop drag dan
// kembaliin ke posisi semula
function gaBolehkeBawah() {
  let persenJarak = percentage(this.position.y * -1, tinggiContainerKeris);

  if (persenJarak < 0) {
    // console.log("more than zero");
    this.setPosition(this.position.x, 0);
    this.dragEnd();
  } else if (persenJarak > 0) {
    console.log(
      "dragMove \n objek pindah",
      persenJarak,
      "% dari posisi semula secara vertikal\n",
      this.position.x,
      this.position.y
    );
    // console.log("okoklh");
    textAnimated();
    captionBuka.innerText = "Terus geser hingga sarung hilang";
    if (persenJarak > 55) {
      textAnimated();
      captionBuka.innerText = "Sedikit lagi..";
    }
    if (persenJarak > 70) {
      textAnimated();
      captionBuka.innerText = "Lepas jari mu";
    }
  }
}

function cekPosisiTerakhir() {
  let persenJarak = percentage(this.position.y * -1, tinggiContainerKeris);
  console.log(
    "dragEnd2",
    persenJarak,
    "% \n",
    this.position.x,
    this.position.y
  );
}

// bind event listener
draggie.on("dragEnd", balikinPosisiY);
draggie.on("dragMove", gaBolehkeBawah);
draggie.on("dragEnd", cekPosisiTerakhir);
draggie.once("pointerDown", function () {
  pembukaGerbang.classList.remove("pembuka-gerbang-hint");

  pembukaGerbang.classList.add(".pembuka-gerbang-hint-removed");

  setTimeout(function () {
    pembukaGerbang.classList.remove(".pembuka-gerbang-hint-removed");
  }, 3000);

  textAnimated();
  captionBuka.innerText = "Geser ke atas...";
  console.log("eventName happened just once");
});

textAnimated();

function textAnimated() {
  const preset = [
    "animate__animated",
    "animate__bounceIn",
    "animate__fast",
    "animate__repeat-1",
  ];

  captionBuka.classList.add(...preset);

  setTimeout(function () {
    captionBuka.classList.remove(...preset);
  }, 4000);
  //return preset;
}
