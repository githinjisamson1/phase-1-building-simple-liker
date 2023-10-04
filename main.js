// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!

function handleSuccess(e) {
  if (!e.target.classList.contains("activated-heart")) {
    e.target.innerHTML = FULL_HEART;
    e.target.classList.add("activated-heart");
  } else {
    e.target.innerHTML = EMPTY_HEART;
    e.target.classList.remove("activated-heart");
  }
}

function hideModal() {
  document.querySelector("#modal").classList.add("hidden");
}

function handleFailure(err) {
  document.querySelector("#modal").classList.remove("hidden");
  document.querySelector("#modal-message").innerHTML = err;

  // hide modal after 3 sec
  setTimeout(hideModal, 3000);
}

function handleDOMContentLoaded(e) {
  // convert NodeList to array then iterate
  Array.from(document.querySelectorAll(".like-glyph")).forEach((likeGlyph) => {
    likeGlyph.addEventListener("click", function (e) {
      mimicServerCall()
        .then((response) => {
          handleSuccess(e);
        })
        .catch((err) => {
          handleFailure(err);
        });
    });
  });
}

// markup loads first
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
