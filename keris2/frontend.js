

// fungsi go to chapter navigasi
function gotoChapter(berapa) {
  document.getElementById(berapa).scrollIntoView(true); 
  // window.location.hash = berapa; (bisa pake ini tp nanti url gak clean)
}

document.querySelectorAll(".nav-desktop-ch")[0].addEventListener('click', function () {
  gotoChapter("chapter-1")
})

document.querySelectorAll(".nav-desktop-ch")[1].addEventListener('click', function () {
  gotoChapter("chapter-2")
})

document.querySelectorAll(".nav-desktop-ch")[2].addEventListener('click', function () {
  gotoChapter("chapter-3")
})

document.querySelectorAll(".nav-mobile-ch")[0].addEventListener('click', function () {
  gotoChapter("chapter-1")
})

document.querySelectorAll(".nav-mobile-ch")[1].addEventListener('click', function () {
  gotoChapter("chapter-2")
})

document.querySelectorAll(".nav-mobile-ch")[2].addEventListener('click', function () {
  gotoChapter("chapter-3")
})

// fungsi popup more info


const popupContents = document.querySelector("div.popup-contents");

function togglePopup() {
  const popupContainer = document.querySelector("div.popup-container");
   if (popupContainer.classList.toggle("closed") == true) {
    console.log("popup is closed");
    document.body.style.overflow = 'scroll';
   } else { console.log("popup is open");
            document.body.style.overflow = 'hidden';
  }
  // popupContainer.classList.toggle("closed")
} 

popupContents.addEventListener("click", togglePopup);

// document.addEventListener("keydown", function(event) {
//     if (event.which === 80) {
//       console.log("p pressed");
//       togglePopup();
//     }
// });

// fungsi hitung ada di berapa persen scoll sekarang

function currentScrollPercentage()
{
    return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
}


document.body.onscroll = function() {
  document.querySelector(".nav-desktop-left-mg").style.height=currentScrollPercentage() + "%";
  document.querySelector(".nav-mobile-top-mg").style.width=currentScrollPercentage() + "%";
};


// document.querySelector(".nav-desktop-left-mg").style.height=currentScrollPercentage;