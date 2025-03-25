
let aElement = document.querySelectorAll("ul a");
aElement.forEach(element => {
  element.addEventListener("click", function() {
    aElement.forEach(a => {
      a.classList.remove("active");
      this.classList.add("active");
    });
  })
})


const bars = document.getElementById("bars");
const sidebar = bars.nextElementSibling;

bars.onclick = function() {
  sidebar.style.transform = "translateX(100%)"; 
}

const sidebarClose = document.getElementById("links-close");

sidebarClose.onclick = function() {
  sidebarClose.parentElement.parentElement.style.transform = "translateX(-100%)";
}

document.addEventListener("click", function(event) {
  if (!sidebar.contains(event.target) && !bars.contains(event.target)) {
    sidebar.style.transform = "translateX(-100%)";
  }
});


function myCustomConfirm(message) {
  return new Promise(resolve => {
    let confirmed = false;

    let confirmBackground = document.createElement("div");
    confirmBackground.classList.add("confirmBackground");
    document.body.prepend(confirmBackground);

    let myConfirmMainDiv = document.createElement("div");
    myConfirmMainDiv.classList.add("myConfirmMainDiv");

    let confirmSpan = document.createElement("span");
    confirmSpan.innerHTML = `${message}`;
    myConfirmMainDiv.appendChild(confirmSpan);

    let resultDiv = document.createElement("div");
    resultDiv.classList.add("resultDiv");

    let resultYes = document.createElement("span");
    resultYes.classList.add("resultYes");
    resultYes.innerHTML = "Evet";

    resultYes.addEventListener("click", function() {
      confirmed = true;
      myConfirmMainDiv.style.animation = "goAway 0.4s forwards";
      setTimeout(function() {
        confirmBackground.remove();
        myConfirmMainDiv.remove();
        resolve(confirmed);
      }, 400)
    });

    resultYes.addEventListener("mouseover", () => {
      resultYes.style.backgroundColor = "#a80000";
    });

    resultYes.addEventListener("mouseout", () => {
      resultYes.style.backgroundColor = "#ff4a4a";
    });

    resultDiv.appendChild(resultYes);

    let resultNo = document.createElement("span");
    resultNo.classList.add("resultNo");
    resultNo.innerHTML = "Hayır";

    resultNo.addEventListener("click", function() {
      confirmed = false;
      myConfirmMainDiv.style.animation = "goAway 0.4s forwards";
      setTimeout(function() {
        confirmBackground.remove();
        myConfirmMainDiv.remove();
        resolve(confirmed);
      }, 400)
    });

    resultNo.addEventListener("mouseover", () => {
      resultNo.style.backgroundColor = "#0b1d59";
    });

    resultNo.addEventListener("mouseout", () => {
      resultNo.style.backgroundColor = "#334da0";
    });

    resultDiv.appendChild(resultNo);

    let confirmClose = document.createElement("span");
    confirmClose.classList.add("confirmClose");
    confirmClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;

    confirmClose.onclick = function() {
      myConfirmMainDiv.style.animation = "goAway 0.4s forwards";
      setTimeout(function() {
        confirmBackground.remove();
        myConfirmMainDiv.remove();
        resolve(confirmed);
      }, 400)
    };

    confirmClose.addEventListener("mouseover", () => {
      confirmClose.style.backgroundColor = "red";
    });

    confirmClose.addEventListener("mouseout", () => {
      confirmClose.style.backgroundColor = "#024959";
    });

    myConfirmMainDiv.appendChild(confirmClose);
    myConfirmMainDiv.appendChild(resultDiv);
    document.body.prepend(myConfirmMainDiv);
  });
}
document.addEventListener('DOMContentLoaded', (event) => {
  const buttons = document.querySelectorAll('button.approve, button.reject, button.role, button.sil');
  buttons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      let message;
      let userAction;

      if (button.classList.contains('approve')) {
        message = 'Bu talebi onaylamak istediğinize emin misiniz?';
        userAction = 'approve';
      } else if (button.classList.contains('reject')) {
        message = 'Bu talebi reddetmek istediğinize emin misiniz?';
        userAction = 'reject';
      } else if (button.classList.contains('role')) {
        message = 'Bu kullanıcının rolünü değiştirmek istediğinize emin misiniz?';
        userAction = 'toggle_role';
      } else if (button.classList.contains('sil')) {
        message = 'Bu kullanıcıyı silmek istediğinize emin misiniz?';
        userAction = 'delete';
      }

      let confirmed = await myCustomConfirm(message);
      if (confirmed) {
        console.log("olduu");
        const form = button.closest('form');
        const formData = new FormData(form);
        
        if (userAction === 'approve' || userAction === 'reject') {
          formData.append('action', userAction);
        } else {
          formData.append('user_action', userAction);
        }


        fetch('process_request.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())  // Yanıtı ham metin olarak alıyoruz
          .then(text => {
            console.log("Ham yanıt:", text);  // Ham yanıtı konsola yazdırıyoruz
            try {
              const data = JSON.parse(text);  // JSON'u ayrıştırmaya çalışıyoruz
              if (data.debug) {
                console.log("Debug bilgisi:", data.debug);
              } else {
                console.log("İşlem başarıyla gerçekleştirildi.");
                console.log(data.message);  // Mesajı konsola yazdırıyoruz
                location.reload();  // Başarılı işlemden sonra sayfayı yeniliyoruz
              }
            } catch (error) {
              console.error("JSON yanıtı ayrıştırılamadı:", error);
            }
          })
          .catch(error => {
            console.error("Bir hata oluştu:", error);
          });
        

      }
    });
  });
});

