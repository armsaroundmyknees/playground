//----------------- reset config
function resetConfig() {
  localStorage.clear();

  // account
  localStorage.setItem("accountName", "@fishmans");
  localStorage.setItem(
    "accountBio",
    "フィッシュマンズ is a Japanese dub band that was founded in 1987 in Tokyo."
  );
  localStorage.setItem("avatarImg", "contents/defaults/avatar.jpeg");

  // site settings
  localStorage.setItem("uiTheme", "light"); // light, dark
  localStorage.setItem("uiGap", 0); // 0 = small, 1 = medium, 2 = large
  localStorage.setItem("uiFit", "cover"); // cover, contain

  // contents placeholder
  const posts = [
    { id: createStamp(), img: "contents/defaults/lorem_01.jpg" },
    { id: createStamp(), img: "contents/defaults/lorem_02.webp" },
    { id: createStamp(), img: "contents/defaults/lorem_03.webp" },
    { id: createStamp(), img: null },
    { id: createStamp(), img: null },
    { id: createStamp(), img: null },
  ];

  localStorage.setItem("posts", JSON.stringify(posts));
}

//----------------- save posts
function savePosts() {
  localStorage.setItem("posts", JSON.stringify(allPosts));
  fetchToggleButton();
}

//----------------- create id stamp
let createStamp = function () {
  return ULID.ulid();
};

// initializing new broswer
if (localStorage.length < 6) {
  resetConfig();
}

//----------------- fetch post from localstorage
allPosts = JSON.parse(localStorage.getItem("posts"));

//----------------- ui layout value
const contentsContainer = document.querySelector(".contents");
const container = document.querySelector(".container");

let accountAvatar = localStorage.getItem("avatarImg");
let accountBio = localStorage.getItem("accountBio");
let accountName = localStorage.getItem("accountName");

document.querySelector(".avatar-img img").src = accountAvatar;
document.querySelector("span.account-name").innerText = accountName;
document.querySelector("span.account-bio").innerText = accountBio;

//----------------- show post to DOM from localstorage
allPosts.forEach((posts) => {
  let postStamp = posts["id"];
  let postImgSrc = posts["img"];

  let boxTemplateWithImage = `
  <div class="image" data-stamp="${postStamp}">
  <div class="postInputWrapper">
      <input accept="image/png, image/jpeg, image/webp" name="postImage" id="${postStamp}" type="file">
  </div>
  <img class="post" src="${postImgSrc}" alt="image of ${postStamp}">
  <div class="edit-post notVisible">
      <ul>
          <li class="edit"></li>
          <li class="delete"></li>
      </ul>
  </div>
  </div>
  `;

  let boxTemplateWithoutImage = `
  <div class="image" data-stamp="${postStamp}">
  <div class="postInputWrapper">
      <input accept="image/png, image/jpeg, image/webp" name="postImage" id="${postStamp}" type="file">
  </div>
  <img class="post" src="contents/defaults/ui_image.png" alt="image of ${postStamp}">
  <div class="edit-post notVisible">
      <ul>
          <li class="edit"></li>
          <li class="delete"></li>
      </ul>
  </div>
  </div>
  `;

  if (postImgSrc == null) {
    contentsContainer.insertAdjacentHTML("beforeend", boxTemplateWithoutImage);
  } else {
    contentsContainer.insertAdjacentHTML("beforeend", boxTemplateWithImage);
  }
});

//----------------- switch Theme
const settingsButtons_uiTheme = document.querySelector(".upperToggleButton");

// initializing theme
let uiTheme = localStorage.getItem("uiTheme");

if (uiTheme == "light") {
  container.classList.remove("gelap");
  document.querySelector("body").classList.remove("gelap");
  settingsButtons_uiTheme.classList.remove("upperToggleButtonDark");
} else if (uiTheme == "dark") {
  container.classList.add("gelap");
  document.querySelector("body").classList.add("gelap");
  settingsButtons_uiTheme.classList.add("upperToggleButtonDark");
}

function switchTheme() {
  switch (uiTheme) {
    case "light":
      uiTheme = "dark";
      container.classList.add("gelap");
      document.querySelector("body").classList.add("gelap");
      settingsButtons_uiTheme.classList.add("upperToggleButtonDark");
      break;
    case "dark":
      uiTheme = "light";
      container.classList.remove("gelap");
      document.querySelector("body").classList.remove("gelap");
      settingsButtons_uiTheme.classList.remove("upperToggleButtonDark");
      break;
  }

  localStorage.setItem("uiTheme", uiTheme);
  return uiTheme;
}

// button trigger switch theme
settingsButtons_uiTheme.addEventListener("click", switchTheme);

//----------------- contents container
const allImages = document.querySelectorAll(".image img");
// checkConteinerContents();

function isPostsEmpty() {
  if (
    contentsContainer.children[
      contentsContainer.children.length - 1
    ].classList.contains("image") == false
  ) {
    return true;
  } else if (
    contentsContainer.children[
      contentsContainer.children.length - 1
    ].classList.contains("image") == true
  ) {
    return false;
  }
}

if (contentsContainer.children.length == 0 && isPostsEmpty) {
  createNoDataInfo();
}

function deleteDataInfo() {
  if (contentsContainer.children.length < 2) {
    if (document.querySelector(".no-data-toshow") === null) {
      // do nothing
    } else {
      document.querySelector(".no-data-toshow").remove();
    }
  }
}

function createNoDataInfo() {
  contentsContainer.insertAdjacentHTML(
    "beforeend",
    `<span class="no-data-toshow">No data to show.....</span>`
  );
}

//----------------- switch Gap
const settingsButtons_uiGap = document.querySelector(
  "li.setting-buttons.ui-gap"
);
let currentGap = JSON.parse(localStorage.getItem("uiGap"));
const gapList = ["gap-small", "gap-medium", "gap-large"];
const contentsContainerGapCLass = contentsContainer.classList;

// initialing gap
contentsContainerGapCLass.add(gapList[currentGap]);

function switchGap() {
  switch (currentGap) {
    case 0:
      currentGap = currentGap + 1;
      localStorage.setItem("uiGap", currentGap);
      contentsContainerGapCLass.add(gapList[currentGap]);
      contentsContainerGapCLass.remove(gapList[currentGap - 1]);
      contentsContainerGapCLass.remove(gapList[currentGap + 1]);
      break;
    case 1:
      currentGap = currentGap + 1;
      localStorage.setItem("uiGap", currentGap);
      contentsContainerGapCLass.add(gapList[currentGap]);
      contentsContainerGapCLass.remove(gapList[currentGap - 1]);
      contentsContainerGapCLass.remove(gapList[currentGap - 2]);
      break;
    case 2:
      currentGap = 0;
      localStorage.setItem("uiGap", currentGap);
      contentsContainerGapCLass.add(gapList[currentGap]);
      contentsContainerGapCLass.remove(gapList[currentGap + 1]);
      contentsContainerGapCLass.remove(gapList[currentGap + 2]);
      break;
  }

  localStorage.setItem("uiGap", currentGap);
  return currentGap;
}

// button trigger switch gap
settingsButtons_uiGap.addEventListener("click", switchGap);

//----------------- switch fit
const settingsButtons_uiFit = document.querySelector(
  "li.setting-buttons.ui-fit"
);

// initializing fit
let uiFit = localStorage.getItem("uiFit");

if (uiFit === "contain") {
  document.querySelectorAll(".image img").forEach((index) => {
    index.classList.add("contain");
  });
} else if (uiFit === "cover") {
  document.querySelectorAll(".image img").forEach((index) => {
    index.classList.remove("contain");
  });
}

function switchFit() {
  if (uiFit === "cover") {
    uiFit = "contain";
    document.querySelectorAll(".image img").forEach((index) => {
      index.classList.add("contain");
    });
  } else if (uiFit === "contain") {
    uiFit = "cover";
    document.querySelectorAll(".image img").forEach((index) => {
      index.classList.remove("contain");
    });
  }

  localStorage.setItem("uiFit", uiFit);
}

// button trigger switch fit image
settingsButtons_uiFit.addEventListener("click", switchFit);

//----------------- moveable / sortableJS

allImages.forEach((index) => {
  index.addEventListener("touchstart", (e) => {
    e.preventDefault();
    // console.log("aa");
  });
});

const moveableContents = document.getElementById("moveable-contents");

Sortable.create(moveableContents, {
  animation: 150,
  filter: ".edit-post",
  group: "posts-position",
  dataIdAttr: "data-stamp",
  store: {
    /**
     * Get the order of elements. Called once during initialization.
     * @param   {Sortable}  sortable
     * @returns {Array}
     */
    get: function (sortable) {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split("|") : [];
    },

    /**
     * Save the order of elements. Called onEnd (when the item is dropped).
     * @param {Sortable}  sortable
     */
    set: function (sortable) {
      var order = sortable.toArray();
      // console.log(order);
      localStorage.setItem(sortable.options.group.name, order.join("|"));
    },
  },
  onEnd: function (/**Event*/ evt) {
    // console.log(evt);
    // console.log(sortable);
    // evt.oldIndex; // element index within parent
  },
});

//----------------- fungsi baca dan kompres gambar
// size semua image yang diaplot
const uploadedImageWidth = 300;

function readAndCompressImage(filetoRead, callback) {
  const fr = new FileReader();

  fr.onload = function (event) {
    // simpan hasil onload ke dalam variable
    // tempVariableforImage = event.result;
    tempVariableforImage = this.result;
    // kode di atas juga bisa
    // tempVariableforImage = event.target.result;
    let newImageElement = document.createElement("img");
    newImageElement.src = tempVariableforImage;

    // simpan compressed image di callback
    // callback(tempVariableforImage);
    // callback(this);
    // callback(compressedUploadedImage);

    // compress variable newImageElement menggunakan canvas
    newImageElement.onload = function () {
      let canvas = document.createElement("canvas");
      // rumus nyari panjang gambar otomatis dengan cari rasio
      // dengan cara lebar gambar original dibagi lebar gambar yang dipengenin
      // abis itu ketemu rasionya
      let canvasRatio = uploadedImageWidth / this.width;
      canvas.width = uploadedImageWidth;
      canvas.height = this.height * canvasRatio;

      const canvasContext = canvas.getContext("2d");
      canvasContext.fillStyle = "white";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      canvasContext.drawImage(this, 0, 0, canvas.width, canvas.height);
      let compressedUploadedImage = canvasContext.canvas.toDataURL(
        "image/jpeg",
        90
      );

      // console.log(compressedUploadedImage);
      callback(compressedUploadedImage);
    };
    // end compress
  };

  fr.readAsDataURL(filetoRead);
}

//----------------- change avatar
// initializing avatar
// default avatar ada di variabel -> accountAvatar

// input avatar
const avatarInput = document.getElementById("avatarFile");
avatarInput.addEventListener("change", (avaInput) => {
  let imgUploaded = avaInput.target.files[0];
  console.log(imgUploaded);
  readAndCompressImage(imgUploaded, (e) => {
    let uploadedAvatar = e;
    document.querySelector(".avatar-img img").src = uploadedAvatar;
    localStorage.setItem("avatarImg", uploadedAvatar);
    modalNotice("avatar pic changed !! yeah");
  });
});

//----------------- create modal notice
const modalNoticeElement = document.getElementsByClassName("modal-notice");

function modalNotice(pesan) {
  function deleteModalAfter(time) {
    setTimeout(function () {
      modalNoticeElement[0].remove();
    }, time);
  }

  if (modalNoticeElement.length <= 0) {
    let htmlElement = `<div class="modal-notice notice-success"><span>${pesan}</span></div>`;
    container.insertAdjacentHTML("beforeBegin", htmlElement);
    deleteModalAfter(3000);
    // return pesan;
  } else {
    modalNoticeElement[0].children[0].innerText = pesan;
    // return `modal element is there... change the notice to ${pesan}`;
  }
}

function modalNotice2(pesan) {
  function deleteModalAfter(time) {
    setTimeout(function () {
      modalNoticeElement[0].remove();
    }, time);
  }

  if (modalNoticeElement.length <= 0) {
    let htmlElement = `<div class="modal-notice notice-danger"><span>${pesan}</span></div>`;
    container.insertAdjacentHTML("beforeBegin", htmlElement);
    deleteModalAfter(3000);
    // return pesan;
  } else {
    modalNoticeElement[0].children[0].innerText = pesan;
    // return `modal element is there... change the notice to ${pesan}`;
  }
}

//----------------- new Image
const settingsButtons_uiNewImage = document.querySelector(
  "li.setting-buttons.ui-newImage"
);

settingsButtons_uiNewImage.addEventListener("click", function () {
  let postStamp = createStamp();
  let newDataImage = { id: postStamp, img: null };
  allPosts.push(newDataImage);

  let overlayStatus = "newnewnew!!";
  let insertPosition = "afterbegin";

  if (checkPostEditOverlay() == "hidden") {
    overlayStatus = "notVisible";
  }

  deleteDataInfo();
  let boxTemplateWithoutImage = `
  <div class="image" data-stamp="${postStamp}">
  <div class="postInputWrapper">
      <input accept="image/png, image/jpeg, image/webp" name="postImage" id="${postStamp}" type="file">
  </div>
  <img class="post" src="contents/defaults/ui_image.png" alt="image of ${postStamp}">
  <div class="edit-post ${overlayStatus}">
      <ul>
          <li class="edit"></li>
          <li class="delete"></li>
      </ul>
  </div>
  </div>
  `;

  contentsContainer.insertAdjacentHTML(insertPosition, boxTemplateWithoutImage);
  Sortable.get(moveableContents).save();

  // kalau mau cari children terbawahhhhh
  // contentsContainer.children[contentsContainer.children.length - 1]

  let newImageEditButton =
    contentsContainer.children[0].children[2].children[0].children[0];

  let newImageDeleteButton =
    contentsContainer.children[0].children[2].children[0].children[1];

  let newImageUploadButton =
    contentsContainer.children[0].children[0].children[0];

  newImageDeleteButton.addEventListener("click", function () {
    deleteButtonAction(this);
  });

  newImageEditButton.addEventListener("click", function () {
    uploadImageButtonAction(this);
  });

  newImageUploadButton.addEventListener("change", function () {
    uploadPostButtonAction(this);
  });

  console.log(newImageEditButton);
  savePosts();
});

//----------------- toggle edit posts

let allEditsButton;
let allEditsButton_edit;
let allEditsButton_delete;

function fetchToggleButton() {
  allEditsButton = [...document.querySelectorAll(".edit-post")];
  allEditsButton_edit = [
    ...document.querySelectorAll(".image .edit-post ul .edit"),
  ];
  allEditsButton_delete = [
    ...document.querySelectorAll(".image .edit-post ul .delete"),
  ];
}

fetchToggleButton();

function toggleEditPosts() {
  allEditsButton.forEach((index) => {
    index.classList.toggle("notVisible");
  });
}

function checkPostEditOverlay() {
  if (!isPostsEmpty() && allEditsButton[0].classList.contains("notVisible")) {
    return "hidden";
  } else {
    return "showing";
  }
}

const settingsButtons_uiEdit = document.querySelector(
  "li.setting-buttons.ui-edit"
);

settingsButtons_uiEdit.addEventListener("click", toggleEditPosts);

//----------------- edit buttons functions

//----------------- upload buttons functions

// initializing all upload button
allEditsButton_edit.forEach((index) => {
  index.addEventListener("click", function (clicked) {
    uploadImageButtonAction(this);
  });
});

function uploadImageButtonAction(element) {
  let currentEditButtonStamp =
    element.parentNode.parentNode.parentNode.dataset.stamp;
  document.getElementById(currentEditButtonStamp).click();
}

// initializing all delete button
allEditsButton_delete.forEach((index) => {
  index.addEventListener("click", function (clicked) {
    deleteButtonAction(this);
  });
});
// delete button functions
function deleteButtonAction(element) {
  let clickedChildsParent = element.parentNode.parentNode.parentNode;
  let clickedChildsParentStamp =
    element.parentNode.parentNode.parentNode.dataset.stamp;

  if (confirm("Beneran mau diapus?")) {
    // console.log(clickedChildsParentStamp);

    const clickedStampIndex = allPosts
      .map((e) => e.id)
      .indexOf(clickedChildsParentStamp);

    // edit allPosts array data
    allPosts.splice(clickedStampIndex, 1);

    // save post on localstorage
    savePosts();

    // save positions sortable
    Sortable.get(moveableContents).save();

    // show a modal
    modalNotice2(`<em>(${clickedChildsParentStamp})</em>: telah terhapus!`);

    // delete parent the parent elemet!
    clickedChildsParent.remove();

    if (contentsContainer.children.length == 0 && isPostsEmpty) {
      createNoDataInfo();
    }
  } else {
  }
}

//----------------- database
const settingsButtons_uiConfig = document.querySelector(
  "li.setting-buttons.ui-config"
);

settingsButtons_uiConfig.addEventListener("click", function () {
  if (
    confirm(
      "This is should be Backup & Restore option but currently its not available (to be updated!). But for now this button function is if you click yes it will reset the database"
    )
  ) {
    resetConfig();
    window.location.reload();
  }
  {
    // do nothing
  }
});

//----------------- input image
let allPostsImage = [...document.querySelectorAll(".postInputWrapper input")];

function uploadPostButtonAction(element) {
  let currentImgSrc = element.parentNode.parentNode.children[1];
  let currentStamp = element.id;
  let currentUploadedImage = element.files[0];
  let clickedStampIndex = allPosts.map((e) => e.id).indexOf(currentStamp);

  readAndCompressImage(currentUploadedImage, (compressedImage) => {
    currentImgSrc.src = compressedImage;
    allPosts[clickedStampIndex] = { id: currentStamp, img: compressedImage };
    savePosts();
  });

  console.log(currentUploadedImage);
  console.log(currentImgSrc);
  console.log(currentStamp);
}

allPostsImage.forEach(function (element) {
  element.addEventListener("change", function () {
    uploadPostButtonAction(this);
  });
});
