////------- variables -------////
const tombolChapter1_mobile = document.querySelectorAll(".nav-button")[0];
const tombolChapter2_mobile = document.querySelectorAll(".nav-button")[1];
const tombolChapter3_mobile = document.querySelectorAll(".nav-button")[2];
const tombolChapter1_desktop = document.querySelectorAll(".nav-button")[3];
const tombolChapter2_desktop = document.querySelectorAll(".nav-button")[4];
const tombolChapter3_desktop = document.querySelectorAll(".nav-button")[5];
const popupContainer = document.querySelector("div.popup-container");
const popupContents = document.querySelector("div.popup-contents");
const progresBarDesktop = document.querySelector(".nav-desktop-left-mg");
const progresBarMobile = document.querySelector(".nav-mobile-top-mg");
const bagianContent = document.querySelector(".contents").children;

////------- fungsi go to chapter navigasi -------////
// bikin fungsi mau ke chapter berapa
function gotoChapter(berapa) {
  // window.location.hash = "chapter-1";
  // bisa pake kode di atas tapi nanti keliatan di URL
  berapa.scrollIntoView(true);
}

// tombolChapter2_desktop.onclick = function () {
//   gotoChapter(bagianChapter2);
// };
// bisa juga pake kode di atas tapi kata user stackoverflow
// lebih lambat dibandingin addEventListener
//
// tombolChapter1_desktop.addEventListener("click", function () {
//   gotoChapter(bagianChapter1);
// });
// pake kode di atas kalo mau nulis satu2 untuk tiap
// tombol navigasi mau ke chapter mana

// bikin trigger tiap button
[tombolChapter1_desktop, tombolChapter1_mobile].forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    gotoChapter(bagianContent["chapter-1"]);
  });
});

[tombolChapter2_desktop, tombolChapter2_mobile].forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    gotoChapter(bagianContent["chapter-2"]);
  });
});

[tombolChapter3_desktop, tombolChapter3_mobile].forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    gotoChapter(bagianContent["chapter-3"]);
  });
});

////------- fungsi popup more info -------////
// bikin fungsi toggle pop up
function togglePopup() {
  if (popupContainer.classList.toggle("closed") == true) {
    console.log("popup is closed");
    document.body.style.overflow = "scroll";
  } else {
    console.log("popup is open");
    document.body.style.overflow = "hidden";
  }
}

// bikin trigger popup
popupContents.addEventListener("click", togglePopup);

// kode di bawah buat ngetes aja tadinya kalo
// mencet key P bakalan munculin popup
// document.addEventListener("keydown", function(event) {
//     if (event.which === 80) {
//       console.log("p pressed");
//       togglePopup();
//     }
// });

////------- fungsi hitung ada di berapa persen scoll sekarang -------////
// fungsi sekarang lagi discroll persen ke berapa
function currentScrollPercentage() {
  return Math.trunc(
    ((document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100
  );
}

function hitungScrollBody() {
  return document.documentElement.scrollTop;
}

////------- fungsi sekarang ada div (chapter) yg mana -------////

// cara ke scroll tertentu
// window.scrollTo(0, 9999); // (horizontal, vertical)
// cara liat sekarang scroll ke brp
// document.documentElement.scrollTop
// cara liat jarang dari atas elemet
// bagianChapter1.offsetTop
//

////------- trigger pas discroll ngapain saja -------////
// cara jadul
// ganti progres bar di navigasi sesuai scroll
 document.body.onscroll = function () {
   progresBarDesktop.style.height = currentScrollPercentage() + "%";
   progresBarMobile.style.width = currentScrollPercentage() + "%";
//   // console.log(currentScrollPercentage());
 };

// modern way
// window.addEventListener("scroll", function () {
//   // console.log(currentScrollPercentage());
//   progresBarDesktop.style.height = currentScrollPercentage() + "%";
//   progresBarMobile.style.width = currentScrollPercentage() + "%";
//   // console.log(hitungScrollBody());
// });

////------- trigger pas discroll ngapain saja -------////
var contentsObserver = new IntersectionObserver(
  function (entries) {
    // if (entries[0].target == bagianContent["chapter-1"] && entries[0].isIntersecting === true) {
    //   // console.log("Element has just become visible in screen");
    //   // console.log(entries[0].target);
    //   // console.log(entries);
    //   console.log("ch 1")
    // }
    if (entries[0].isIntersecting === true) {
    switch (entries[0].target) {
      case bagianContent["intro"] :
        [tombolChapter1_desktop, tombolChapter1_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat", "animate__animated", "animate__heartBeat");
        });
        [tombolChapter2_desktop, tombolChapter2_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        [tombolChapter3_desktop, tombolChapter3_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        break;
      case bagianContent["end"] :
        // console.log("intro/end");
        break;
      case bagianContent["chapter-1"] :
        // console.log("chapter 1");
        [tombolChapter1_desktop, tombolChapter1_mobile].forEach(function (tombol) {
          tombol.classList.add("nav-current-chapter", "animate__animated", "animate__heartBeat", "animate__animated", "animate__heartBeat");
        });
        [tombolChapter2_desktop, tombolChapter2_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        [tombolChapter3_desktop, tombolChapter3_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        break;
      case bagianContent["chapter-2"] :
        // console.log("chapter 2");
        [tombolChapter1_desktop, tombolChapter1_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        [tombolChapter2_desktop, tombolChapter2_mobile].forEach(function (tombol) {
          tombol.classList.add("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        [tombolChapter3_desktop, tombolChapter3_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        break;
      case bagianContent["chapter-3"] :
        [tombolChapter1_desktop, tombolChapter1_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        [tombolChapter2_desktop, tombolChapter2_mobile].forEach(function (tombol) {
          tombol.classList.remove("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        [tombolChapter3_desktop, tombolChapter3_mobile].forEach(function (tombol) {
          tombol.classList.add("nav-current-chapter", "animate__animated", "animate__heartBeat");
        });
        break;
      default :
        break;               
    }
    }

  },
  { threshold: 0.5 }
);


// contentsObserver.observe(bagianContent["chapter-1"]);
 Object.values(bagianContent).forEach((yangMana) => {
   contentsObserver.observe(yangMana);
 });


