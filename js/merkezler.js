
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




function createAllInformation(students, cities) {
    var allInformation = [];

    students.forEach(student => {
        const cityIndex = allInformation.findIndex(item => item.key === student.il);
        if (cityIndex !== -1) {
            allInformation[cityIndex].value.push(student); 
        } else {
            const city = cities.find(city => city.il_id === student.il);
            if (city) {
                allInformation.push({
                    key: city.il_id,
                    cityName: city.ad,
                    subeVarmi: city.sube_varmi,
                    temsilcilikVarmi: city.temsilcilik_varmi,
                    grubVarmi: city.grub_varmi,
                    value: [student] 
                });
            }
        }
    });

    return allInformation;
}







const modal = document.getElementById("studentModal");
const modalClose = modal.getElementsByClassName("modal-close")[0];

modalClose.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function showStudentTable(data, title) {
  const modal = document.getElementById("studentModal");
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerHTML = title;

  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = '';
  let studentCount = 1;

  data.forEach(student => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${studentCount}</td>
          <td>${student.adsoyad}</td>
          <td>${student.universite}</td>
          <td>${student.bolum}</td>
          <td>${student.il}</td>
          <td>${student.tel}</td>
          <td>${student.memleket}</td>
      `;

      ++studentCount;
      tbody.appendChild(row);
  });

  modal.style.display = "block";
}



function exportTableToExcel(tableID, filename = 'excel_data.xlsx') {
  let table = document.getElementById(tableID);
  let worksheet = XLSX.utils.table_to_sheet(table);

  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, filename);
}


// "Dosya Oluştur" düğmesi tıklama olayını bağlamak
document.querySelector('.download').addEventListener('click', function() {
  const title = document.getElementById('modal-title').innerText;
  exportTableToExcel('studentTable', `${title}.xlsx`);
});




// استخدام Fetch API لجلب البيانات من الخادم
fetch('get_all_students.php')
.then(response => response.json())
.then(allStudentsData => {
    //   console.log(allStudentsData);
    fetch('get_cities.php')
    .then(response => response.json())
    .then(allCities => {
        // استخدام البيانات المسترجعة هنا
        
        var DATA = createAllInformation(allStudentsData, allCities) || [];
        
        showSubeler(DATA, allCities);
        showTemsilcilikler(DATA, allCities);
        return allCities;
    })
    .then(allCities => {
        fetch('get_grublar.php')
        .then(response => response.json())
        .then(grublarInformation => {
            // استخدام البيانات المسترجعة هنا

            showGrublar(grublarInformation, allCities);
        })
        .catch(error => console.error('yanlis olustu : ', error));
    })
    .catch(error => console.error('yanlis olustu : ', error));
})
.catch(error => console.error('yanlis olustu : ', error));








function showSubeler(DATA, allCities) {
    let subeler = document.getElementById("subeler");
    let info = subeler.querySelector(".info");

    
    
    allCities.forEach(city => {
        if(city.sube_varmi === "var") {
            let il = document.createElement("div");
            il.classList = `il ${city.il_id}`;
            il.innerHTML = `
            <div class="head">
                <h2>${city.ad}</h2>
            </div>
            `;

            info.appendChild(il);

            let head = il.querySelector(".head");

            head.onclick = function() {
              let redyStudents = [];

              DATA.forEach(element => {
                  if(element.key === city.il_id) {
                      element.value.forEach((student) => {
                          redyStudents.push({
                              adsoyad: student.adsoyad,
                              universite: student.universite,
                              bolum: student.bolum,
                              il: city.ad,
                              tel: student.tel,
                              memleket: student.memleket
                          });
                      });
                  }
              });

              showStudentTable(redyStudents, `${city.ad} Şehrindeki Öğrenciler`);
            }
    
        }
    })


    let setBtn = subeler.querySelector(".setBtn");
    
    setBtn.addEventListener("click", function() {
        let promptBackground = document.createElement("div");
        promptBackground.classList.add("promptBackground");
        document.body.prepend(promptBackground);
      
        let myPromptMainDiv = document.createElement("div");
        myPromptMainDiv.classList.add("myPromptMainDiv");
      
        let promptSpan = document.createElement("span");
        promptSpan.classList.add("promptSpan");
        promptSpan.innerHTML = "Şubenin Bulunduğu Şehirleri Seçiniz";
        myPromptMainDiv.appendChild(promptSpan);
      
        let cityForm = document.createElement("form");
        cityForm.classList.add("cityForm");
        myPromptMainDiv.appendChild(cityForm);

        let rows = document.createElement("div");
        rows.className = "rows";



        let selectedCities = [];


        allCities.forEach((city) => {
            let row = document.createElement("div");
            row.className = "row";
        
            let rowLabel = document.createElement("label");
            rowLabel.setAttribute("for", `${city.il_id}`);
            rowLabel.innerHTML = `${city.ad}`;
        
            let rowInput = document.createElement("input");
            rowInput.id = `${city.il_id}`;
            rowInput.type = "checkbox";
        
            if (city.sube_varmi === "var") {
                rowInput.checked = true; 
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                selectedCities.push(row); 
            } else {
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                rows.appendChild(row);
            }
        });

        
        
        // عرض المدن المختارة أولاً
        selectedCities.forEach((selectedCity) => {
            rows.prepend(selectedCity);
        });
        
        cityForm.appendChild(rows);


        let buttons = document.createElement("div");
        buttons.classList.add("buttons");


        let citySubmit = document.createElement("input");
        citySubmit.classList.add("studentSubmit");
        citySubmit.type = "submit";
        citySubmit.value = "Kaydet";
        
        citySubmit.addEventListener("mouseover" , () => {
          citySubmit.style.backgroundColor = "green";
        })
        citySubmit.addEventListener("mouseout", () => {
          citySubmit.style.backgroundColor = "#1ea500";
        })
      
        cityForm.onsubmit = function(event) {
            event.preventDefault(); 

            let finallySelectedCities = [];

            allCities.forEach((city) => {
                let cityCheckbox = document.getElementById(city.il_id);
                if (cityCheckbox.checked) {
                    finallySelectedCities.push(city.il_id);
                }
            });

            fetch('update_cities.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({citiesToUpdate: finallySelectedCities, type: 'sube_varmi'})
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bagalntida yanlislik oldu: ' + response.status);
                }
                return response.text();
            })
            .then(result => {
                console.log(result); 
            })
            .catch(error => {
                console.error('yanlislik oldu: ', error);
            });
            

            myPromptMainDiv.style.animation = "disappperance 0.5s forwards";
            setTimeout(function() {
              promptBackground.remove();
              myPromptMainDiv.remove();
            }, 400)
            window.location.reload();
        };

        buttons.appendChild(citySubmit);


        let formCancle = document.createElement("span");
        formCancle.classList.add("formCancle");
        formCancle.innerHTML = "Vazgeç";
        formCancle.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        formCancle.addEventListener("mouseover" , () => {
          formCancle.style.backgroundColor = "#0b1d59";
        })
        formCancle.addEventListener("mouseout", () => {
          formCancle.style.backgroundColor = "#334da0";
        })
      
        buttons.appendChild(formCancle);
        cityForm.appendChild(buttons);
      


        let promptClose = document.createElement("span");
        promptClose.classList.add("promptClose");
        promptClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
        promptClose.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        promptClose.addEventListener("mouseover" , () => {
          promptClose.style.backgroundColor = "red";
        })
        promptClose.addEventListener("mouseout", () => {
          promptClose.style.backgroundColor = "#11053d";
        })
        myPromptMainDiv.appendChild(promptClose);



        document.body.prepend(myPromptMainDiv);
    });
};



function showTemsilcilikler(DATA, allCities) {
    let temsilcilikler = document.getElementById("temsilcilikler");
    let info = temsilcilikler.querySelector(".info");

    allCities.forEach(city => {
        if(city.temsilcilik_varmi === "var") {
            let il = document.createElement("div");
            il.classList = `il ${city.il_id}`;
            il.innerHTML = `
            <div class="head">
                <h2>${city.ad}</h2>
            </div>
            `;

            info.appendChild(il);

            let head = il.querySelector(".head");

            head.onclick = function() {
              let redyStudents = [];

              DATA.forEach(element => {
                  if(element.key === city.il_id) {
                      element.value.forEach((student) => {
                          redyStudents.push({
                              adsoyad: student.adsoyad,
                              universite: student.universite,
                              bolum: student.bolum,
                              il: city.ad,
                              tel: student.tel,
                              memleket: student.memleket
                          });
                      });
                  }
              });

              showStudentTable(redyStudents, `${city.ad} Şehrindeki Öğrenciler`);
            }
    
        }
    })

    let setBtn = temsilcilikler.querySelector(".setBtn");
    
    setBtn.addEventListener("click", function() {
        let promptBackground = document.createElement("div");
        promptBackground.classList.add("promptBackground");
        document.body.prepend(promptBackground);
      
        let myPromptMainDiv = document.createElement("div");
        myPromptMainDiv.classList.add("myPromptMainDiv");
      
        let promptSpan = document.createElement("span");
        promptSpan.classList.add("promptSpan");
        promptSpan.innerHTML = "Temsilciliğin Bulunduğu Şehirleri Seçiniz";
        myPromptMainDiv.appendChild(promptSpan);
      
        let cityForm = document.createElement("form");
        cityForm.classList.add("cityForm");
        myPromptMainDiv.appendChild(cityForm);

        let rows = document.createElement("div");
        rows.className = "rows";

        let selectedCities = [];

        allCities.forEach((city) => {
            let row = document.createElement("div");
            row.className = "row";
        
            let rowLabel = document.createElement("label");
            rowLabel.setAttribute("for", `${city.il_id}`);
            rowLabel.innerHTML = `${city.ad}`;
        
            let rowInput = document.createElement("input");
            rowInput.id = `${city.il_id}`;
            rowInput.type = "checkbox";
        
            if (city.temsilcilik_varmi === "var") {
                rowInput.checked = true; 
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                selectedCities.push(row); 
                console.log(row)
            } else {
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                rows.appendChild(row);
            }
        });
        
        
        // عرض المدن المختارة أولاً
        selectedCities.forEach((selectedCity) => {
            rows.prepend(selectedCity);
        });
        
        cityForm.appendChild(rows);


        let buttons = document.createElement("div");
        buttons.classList.add("buttons");


        let citySubmit = document.createElement("input");
        citySubmit.classList.add("studentSubmit");
        citySubmit.type = "submit";
        citySubmit.value = "Kaydet";
        
        citySubmit.addEventListener("mouseover" , () => {
          citySubmit.style.backgroundColor = "green";
        })
        citySubmit.addEventListener("mouseout", () => {
          citySubmit.style.backgroundColor = "#1ea500";
        })
      
        cityForm.onsubmit = function(event) {
            event.preventDefault(); 
        
            let finallySelectedCities = [];

            allCities.forEach((city) => {
                let cityCheckbox = document.getElementById(city.il_id);
                if (cityCheckbox.checked) {
                    finallySelectedCities.push(city.il_id);
                }
            });
        
            // قم بمعالجة الاختيارات المحددة هنا، مثلاً إرسالها إلى الخادم أو عرضها للمستخدم

            
            fetch('update_cities.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({citiesToUpdate: finallySelectedCities, type: 'temsilcilik_varmi'})
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bagalntida yanlislik oldu: ' + response.status);
                }
                return response.text();
            })
            .then(result => {
                console.log(result); // رسالة نجاح التحديث
            })
            .catch(error => {
                console.error('yanlislik oldu: ', error);
            });

            myPromptMainDiv.style.animation = "disappperance 0.5s forwards";
            setTimeout(function() {
              promptBackground.remove();
              myPromptMainDiv.remove();
            }, 400)
            window.location.reload();
        };

        buttons.appendChild(citySubmit);
  
  

        let formCancle = document.createElement("span");
        formCancle.classList.add("formCancle");
        formCancle.innerHTML = "Vazgeç";
        formCancle.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        formCancle.addEventListener("mouseover" , () => {
          formCancle.style.backgroundColor = "#0b1d59";
        })
        formCancle.addEventListener("mouseout", () => {
          formCancle.style.backgroundColor = "#334da0";
        })
      
        buttons.appendChild(formCancle);
        cityForm.appendChild(buttons);
      


        let promptClose = document.createElement("span");
        promptClose.classList.add("promptClose");
        promptClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
        promptClose.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        promptClose.addEventListener("mouseover" , () => {
          promptClose.style.backgroundColor = "red";
        })
        promptClose.addEventListener("mouseout", () => {
          promptClose.style.backgroundColor = "#11053d";
        })
        myPromptMainDiv.appendChild(promptClose);



        document.body.prepend(myPromptMainDiv);
    });
};



function showGrublar(grublarInformation, allCities) {
    let grublar = document.getElementById("grublar");
    let info = grublar.querySelector(".info");

    allCities.forEach(city => {
        if(city.grub_varmi === "var") {
            let il = document.createElement("div");
            il.classList = `il ${city.il_id}`;
            il.innerHTML = `
            <div class="head">
                <h2>${city.ad}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="showButton"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>
            </div>
            <div class="tableDiv">
                <table>
                    <thead>
                        <tr>
                            <td>Grup İsmi</td>
                            <td>Grup Başkanı</td>
                            <td>Grup Başkanı Numarası</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div class="grubButtonsDiv">
                    <button class="deleteGrubButton">Grubu  Sil</button>
                    <button class="grubButton">Bilgileri Ekle</button>
                </div>
            </div>
            `;

            info.appendChild(il);

            tbody = il.querySelector("table tbody");

            let DBtevarmi = false;
            let grubIsmi = "";
            let grubBaskani = "";
            let grubBaskaniNumarasi = "";

            grublarInformation.forEach(element => {
                if(element.il_id === city.il_id) {
                    DBtevarmi = true;
                    grubIsmi = element.grub_ismi;
                    grubBaskani = element.grub_baskani;
                    grubBaskaniNumarasi = element.baskan_tel;

                    tbody.innerHTML = `
                    <tr>
                        <td>${element.grub_ismi}</td>
                        <td>${element.grub_baskani}</td>
                        <td>${element.baskan_tel}</td>
                    </tr>
                    `;
                }
            })





            //Start grubButtons
            grubButton = il.querySelector(".grubButtonsDiv .grubButton");
            if(DBtevarmi) {
                grubButton.innerHTML = "Bilgileri Güncelle";
            }

            grubButton.addEventListener("click", function() {
                let promptBackground = document.createElement("div");
                promptBackground.classList.add("promptBackground");
                document.body.prepend(promptBackground);
              
                let myPromptMainDiv = document.createElement("div");
                myPromptMainDiv.classList.add("myPromptMainDiv");

                if(DBtevarmi) {
                    let promptSpan = document.createElement("span");
                    promptSpan.classList.add("grubIsmi");
                    promptSpan.innerHTML = `${grubIsmi}` || "";
                    myPromptMainDiv.appendChild(promptSpan);
                }
              
              
                let promptSpan1 = document.createElement("span");
                promptSpan1.classList.add("promptSpan");
                promptSpan1.innerHTML = "Grup Bilgilerini Doldurunuz";
                myPromptMainDiv.appendChild(promptSpan1);
              
                let grubForm = document.createElement("form");
                grubForm.classList.add("grubForm");
                grubForm.style.height = "auto";
                grubForm.style.maxHeight = "auto";
                myPromptMainDiv.appendChild(grubForm);

                //Name
                let grubNameDiv = document.createElement("div");
                grubNameDiv.classList = "grubInputDiv";

                let grubNameLabel =document.createElement("label");
                grubNameLabel.setAttribute("for", "grubName");
                grubNameLabel.innerHTML = "Grup İsmi&nbsp;&nbsp;&nbsp;:";
                grubNameDiv.appendChild(grubNameLabel);

                let grubName = document.createElement("input");
                grubName.classList = "grubInput";
                grubName.id = "grubName";
                grubName.name = "grubName";
                grubName.type = "text";
                grubName.placeholder = "Grup İsmi";
                grubName.required = true;
                grubName.value = `${grubIsmi}` || "";

                grubName.onkeyup = function() {
                    if(!this.value.endsWith(" ")) {
                        this.value = capitalizeFirstLetters(this.value);
                    }
                }
                grubNameDiv.appendChild(grubName);
                grubForm.appendChild(grubNameDiv);
                //Name



                //grub Baskani
                let grubBaskanDiv = document.createElement("div");
                grubBaskanDiv.classList = "grubInputDiv";

                let grubBaskanLabel =document.createElement("label");
                grubBaskanLabel.setAttribute("for", "grubBaskan");
                grubBaskanLabel.innerHTML = "Grup Başkanı İsmi:";
                grubBaskanDiv.appendChild(grubBaskanLabel);

                let grubBaskan = document.createElement("input");
                grubBaskan.classList = "grubInput";
                grubBaskan.id = "grubBaskan";
                grubBaskan.name = "grubBaskan";
                grubBaskan.type = "text";
                grubBaskan.placeholder = "Grup Başkanı İsmi";
                grubBaskan.value = `${grubBaskani}` || "";

                grubBaskan.onkeyup = function() {
                    if(!this.value.endsWith(" ")) {
                        this.value = capitalizeFirstLetters(this.value);
                    }
                }
                grubBaskanDiv.appendChild(grubBaskan);
                grubForm.appendChild(grubBaskanDiv);
                //grub Baskani



                //grub Baskani Tel
                let grubBaskanTelDiv = document.createElement("div");
                grubBaskanTelDiv.classList = "grubInputDiv";

                let grubBaskanTelLabel =document.createElement("label");
                grubBaskanTelLabel.setAttribute("for", "grubBaskan");
                grubBaskanTelLabel.innerHTML = "Grup Baş. Telefonu:";
                grubBaskanTelDiv.appendChild(grubBaskanTelLabel);

                let grubBaskanTel = document.createElement("input");
                grubBaskanTel.classList = "grubInput";
                grubBaskanTel.id = "grubBaskanTel";
                grubBaskanTel.name = "grubBaskanTel";
                grubBaskanTel.type = "text";
                grubBaskanTel.placeholder = "Grup Başkanı Telefonu";
                grubBaskanTel.value = `${grubBaskaniNumarasi}` || "";

                grubBaskanTel.onkeyup = function() {
                    if(!this.value.endsWith(" ")) {
                        this.value = capitalizeFirstLetters(this.value);
                    }
                }
                grubBaskanTelDiv.appendChild(grubBaskanTel);
                grubForm.appendChild(grubBaskanTelDiv);
                //grub Baskani Tel


                let ilIdToPHP = document.createElement("input");
                ilIdToPHP.type = "hidden";
                ilIdToPHP.name = "ilIdToPHP";
                ilIdToPHP.value = city.il_id;
                grubForm.appendChild(ilIdToPHP);

                let ilAdToPHP = document.createElement("input");
                ilAdToPHP.type = "hidden";
                ilAdToPHP.name = "ilAdToPHP";
                ilAdToPHP.value = city.ad;
                grubForm.appendChild(ilAdToPHP);

                let DBtevarmiInput = document.createElement("input");
                DBtevarmiInput.type = "hidden";
                DBtevarmiInput.name = "DBtevarmiInput";
                DBtevarmiInput.value = DBtevarmi;
                grubForm.appendChild(DBtevarmiInput);


                let grublarButtons = document.createElement("div");
                grublarButtons.className = "grublarButtons";



                let grubSubmit = document.createElement("input");
                grubSubmit.classList.add("studentSubmit");
                grubSubmit.type = "submit";
                grubSubmit.value = "Kaydet";
                
                grubSubmit.addEventListener("mouseover" , () => {
                    grubSubmit.style.backgroundColor = "green";
                })
                grubSubmit.addEventListener("mouseout", () => {
                    grubSubmit.style.backgroundColor = "#1ea500";
                })

                grublarButtons.appendChild(grubSubmit);
                grubForm.appendChild(grublarButtons);
              
                grubForm.onsubmit = function(event) {
                    event.preventDefault(); 

                    let formData1 = new FormData(grubForm);
                    console.log(DBtevarmi)

                    // Send form data to PHP script using fetch
                    fetch('add_grub.php', {
                        method: 'POST',
                        body: formData1
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(data => {
                        // Handle response from PHP script
                        myPromptMainDiv.style.animation = "goAway 0.4s forwards";
                        setTimeout(function() {
                            promptBackground.remove();
                            myPromptMainDiv.remove();
                        }, 400)
                        location.reload();
                    })

                    .catch(error => {
                        console.error('There was a problem with your fetch operation:', error);
                    });
                }
        
                let formCancle = document.createElement("span");
                formCancle.classList.add("formCancle");
                formCancle.innerHTML = "Vazgeç";
                formCancle.addEventListener("click", () => {
                  myPromptMainDiv.style.animation = "goAway 0.4s forwards";
                  setTimeout(function() {
                    promptBackground.remove();
                    myPromptMainDiv.remove();
                  }, 400)
                })
                formCancle.addEventListener("mouseover" , () => {
                  formCancle.style.backgroundColor = "#0b1d59";
                })
                formCancle.addEventListener("mouseout", () => {
                  formCancle.style.backgroundColor = "#334da0";
                })
              
                grublarButtons.appendChild(formCancle);
                grubForm.appendChild(grublarButtons);
              
        
        
                let promptClose = document.createElement("span");
                promptClose.classList.add("promptClose");
                promptClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
                promptClose.addEventListener("click", () => {
                  myPromptMainDiv.style.animation = "goAway 0.4s forwards";
                  setTimeout(function() {
                    promptBackground.remove();
                    myPromptMainDiv.remove();
                  }, 400)
                })
                promptClose.addEventListener("mouseover" , () => {
                  promptClose.style.backgroundColor = "red";
                })
                promptClose.addEventListener("mouseout", () => {
                  promptClose.style.backgroundColor = "#11053d";
                })
                myPromptMainDiv.appendChild(promptClose);
        
                document.body.prepend(myPromptMainDiv);
            });


            deleteGrubButton = il.querySelector(".grubButtonsDiv .deleteGrubButton");
            if(DBtevarmi) {
                deleteGrubButton.style.visibility = "visible";
            }


            // افتراضاً أنه عند النقر على زر الحذف، يتم استدعاء الدالة التالية
            deleteGrubButton.addEventListener("click", function() {
                // عرض رسالة تأكيد
                myCustomConfirm("Grubu Silmek İstediğinizden Eminmisiniz?").then(confirmed => {
                    if (confirmed) {
                        // إذا تم التأكيد، يتم إرسال طلب HTTP POST إلى السيرفر لحذف الفريق
                        fetch('delete_grub.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({il_id: city.il_id, grub_ismi: grubIsmi})
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.text();
                        })
                        .then(data => {
                            // معالجة استجابة السيرفر إذا كانت هناك
                            console.log(data);
                            location.reload(); 
                        })
                        .catch(error => {
                            console.error('There was a problem with your fetch operation:', error);
                        });
                    }
                });
            });




            //grubButtons







            let head = il.querySelector(".head");

            head.onclick = function() {
                if(window.getComputedStyle(this.parentElement.lastElementChild).getPropertyValue('height') === "0px") {
                    this.parentElement.lastElementChild.style.height = "auto";
                    this.lastElementChild.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                } else {
                    this.parentElement.lastElementChild.style.height = "0";
                    this.lastElementChild.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                }
            }
        }
    });

    let setBtn = grublar.querySelector(".setBtn");
    
    setBtn.addEventListener("click", function() {
        let promptBackground = document.createElement("div");
        promptBackground.classList.add("promptBackground");
        document.body.prepend(promptBackground);
      
        let myPromptMainDiv = document.createElement("div");
        myPromptMainDiv.classList.add("myPromptMainDiv");
      
        let promptSpan = document.createElement("span");
        promptSpan.classList.add("promptSpan");
        promptSpan.innerHTML = "Grubların Bulunduğu Şehirleri Seçiniz";
        myPromptMainDiv.appendChild(promptSpan);
      
        let cityForm = document.createElement("form");
        cityForm.classList.add("cityForm");
        myPromptMainDiv.appendChild(cityForm);

        let rows = document.createElement("div");
        rows.className = "rows";

        let selectedCities = [];

        allCities.forEach((city) => {
            let row = document.createElement("div");
            row.className = "row";
        
            let rowLabel = document.createElement("label");
            rowLabel.setAttribute("for", `${city.il_id}`);
            rowLabel.innerHTML = `${city.ad}`;
        
            let rowInput = document.createElement("input");
            rowInput.id = `${city.il_id}`;
            rowInput.type = "checkbox";
        
            if (city.grub_varmi === "var") {
                rowInput.checked = true; 
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                selectedCities.push(row); 
                console.log(row)
            } else {
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                rows.appendChild(row);
            }
        });
        
        
        // عرض المدن المختارة أولاً
        selectedCities.forEach((selectedCity) => {
            rows.prepend(selectedCity);
        });
        
        cityForm.appendChild(rows);


        let buttons = document.createElement("div");
        buttons.classList.add("buttons");


        let citySubmit = document.createElement("input");
        citySubmit.classList.add("studentSubmit");
        citySubmit.type = "submit";
        citySubmit.value = "Kaydet";
        
        citySubmit.addEventListener("mouseover" , () => {
          citySubmit.style.backgroundColor = "green";
        })
        citySubmit.addEventListener("mouseout", () => {
          citySubmit.style.backgroundColor = "#1ea500";
        })
      
        cityForm.onsubmit = function(event) {
            event.preventDefault(); 

            let finallySelectedCities = [];

            allCities.forEach((city) => {
                let cityCheckbox = document.getElementById(city.il_id);
                if (cityCheckbox.checked) {
                    finallySelectedCities.push(city.il_id);
                }
            });
        
            // قم بمعالجة الاختيارات المحددة هنا، مثلاً إرسالها إلى الخادم أو عرضها للمستخدم
            console.log("المدن التي اختارها المستخدم:", finallySelectedCities);

            fetch('update_cities.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({citiesToUpdate: finallySelectedCities, type: 'grub_varmi'})
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bagalntida yanlislik oldu: ' + response.status);
                }
                return response.text();
            })
            .then(result => {
                console.log(result); // رسالة نجاح التحديث
            })
            .catch(error => {
                console.error('yanlislik oldu: ', error);
            });

            myPromptMainDiv.style.animation = "disappperance 0.5s forwards";
            setTimeout(function() {
              promptBackground.remove();
              myPromptMainDiv.remove();
            }, 400)
            window.location.reload();
        };

        buttons.appendChild(citySubmit);
  
  

        let formCancle = document.createElement("span");
        formCancle.classList.add("formCancle");
        formCancle.innerHTML = "Vazgeç";
        formCancle.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        formCancle.addEventListener("mouseover" , () => {
          formCancle.style.backgroundColor = "#0b1d59";
        })
        formCancle.addEventListener("mouseout", () => {
          formCancle.style.backgroundColor = "#334da0";
        })
      
        buttons.appendChild(formCancle);
        cityForm.appendChild(buttons);
      


        let promptClose = document.createElement("span");
        promptClose.classList.add("promptClose");
        promptClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
        promptClose.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        promptClose.addEventListener("mouseover" , () => {
          promptClose.style.backgroundColor = "red";
        })
        promptClose.addEventListener("mouseout", () => {
          promptClose.style.backgroundColor = "#11053d";
        })
        myPromptMainDiv.appendChild(promptClose);



        document.body.prepend(myPromptMainDiv);
    });
};




function capitalizeFirstLetters(sentence) {
    return sentence.trim().split(' ').map(function(word) {
        return word.charAt(0) === "i" ? "İ" + word.slice(1).toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}



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
