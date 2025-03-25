
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



let iller = document.querySelectorAll("#svg-turkiye-haritasi g g");

// Get Cities Informations From Server
// إنشاء طلب AJAX
var xhr = new XMLHttpRequest();
xhr.open("GET", "get_cities.php", true);
xhr.setRequestHeader("Content-Type", "application/json");

// إرسال الطلب
xhr.send();

// تعيين دالة للتعامل مع الاستجابة
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
      // تحويل البيانات المستلمة إلى كائن JavaScript
      citiesData = JSON.parse(xhr.responseText);

      console.log(citiesData);

      handleCitiesData();
  }
};


function handleCitiesData() {
  iller.forEach(il => {
    citiesData.forEach(city => {
      if(il.id === city.il_id) {
        if(city.sube_varmi === "var") {
          il.setAttribute("data-sube", "var");
        } else if(city.temsilcilik_varmi === "var") {
          il.setAttribute("data-temsilcilik", "var");
        } else if(city.grub_varmi === "var") {
          il.setAttribute("data-grub", "var");
        }
      }
    });
  });
}



window.addEventListener("load", function() {
  numbersOnCities();
})

window.addEventListener("resize", function() {
  numbersOnCities();
})



//Start Search 
let searchInput = document.querySelector(".search-div input");
let searchBtn = document.querySelector(".search-div .searchBtn");

searchBtn.onclick = function() {
  // قم بإرسال طلب للبحث عن الطالب باستخدام Fetch API
  fetch('search_student.php?name=' + encodeURI(searchInput.value), {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('حدث خطأ في الطلب: ' + response.status);
    }
    return response.json();
  })
  .then(studentData => {
    // استخدام البيانات كما تحتاج
    console.log(studentData);

    let numbersOnCities1 = document.getElementsByClassName("studentsCount") || [];
    Array.from(numbersOnCities1).forEach(number => {
        studentData.forEach(student => {
            if (student.il === number.id) {
                number.click();
            }
        });
    });
  })
  .catch(error => {
    console.error('حدث خطأ: ', error.message);
  });
}
//End Search 



// Start Map Events
const info = document.querySelector('.il-isimleri');
const turkiyeHaritasi = document.querySelector('#svg-turkiye-haritasi');


turkiyeHaritasi.addEventListener('mouseover',
  function (event) {
    if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
      info.innerHTML = [
        '<div>',
        event.target.parentNode.getAttribute('data-iladi'),
        '</div>'
      ].join('');
    }
  }
);

turkiyeHaritasi.addEventListener('mousemove',
  function (event) {
    info.style.top = event.pageY + 25 + 'px';
    info.style.left = event.pageX + 'px';
  }
);

turkiyeHaritasi.addEventListener('mouseout',
  function () {
    info.innerHTML = '';
  }
);

// Cilick On City
document.body.addEventListener("click",
  function (event) {
    if (event.target.parentElement.tagName === 'g' || event.target.className === 'studentsCount') {
      let clickedCity;
      if(event.target.parentElement.tagName === 'g') {
        clickedCity = event.target.parentElement;
      } else if(event.target.className === 'studentsCount') {
        clickedCity = document.querySelector(`#svg-turkiye-haritasi #${event.target.id}`);
      }
      
      let box = document.getElementById("box");

      let currentCities = box.querySelectorAll(".il");
      currentCities.forEach((city) => {
        if(clickedCity.getAttribute('id') === city.id) {
          city.remove();
        }
      })


      let il = document.createElement("div");
      il.classList.add("il");
      il.id = `${clickedCity.getAttribute('id')}`;

      let h1 = document.createElement("h1");
      h1.append(`${clickedCity.getAttribute('data-iladi')}`);
      il.appendChild(h1);

      let personList = document.createElement("div");
      personList.classList.add("person-list");

      il.appendChild(personList);

      box.appendChild(il);

      updateList(il.id);


      
      let addBtn = document.createElement("button");
      addBtn.classList.add("addBtn");
      addBtn.innerHTML = `
        <span class="button__text">Öğrenci Ekle</span>
        <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
      `;

      addBtn.addEventListener("click", function() {
        addStudentPrompt(il.id);
      });
      
      il.appendChild(addBtn);


      let ilCloseBtn = document.createElement("button");
      ilCloseBtn.classList.add("ilClose");
      ilCloseBtn.innerHTML = `<svg height="30" viewBox="0 0 20 20" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
      ilCloseBtn.addEventListener("mouseover" , () => {
        ilCloseBtn.style.backgroundColor = "red";
      })
      
      ilCloseBtn.addEventListener("mouseout", () => {
        ilCloseBtn.style.backgroundColor = "#151515";
      })
      ilCloseBtn.onclick = function() {
        il.remove();
      }
      il.appendChild(ilCloseBtn);

      clickedCity.firstElementChild.style.fill = '';
      info.innerHTML = '';

      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight + 30,
        behavior: 'smooth'
      });
    }
  }
)
// End Map Events


//btnsAbso.onclick
document.addEventListener('click', function(event) {
  var btnsAbsoList = document.querySelectorAll('.btnsAbso');
  
  btnsAbsoList.forEach(function(btnsAbso) {
    if (btnsAbso.contains(event.target)) {
      let subButtonsVisible = btnsAbso.firstElementChild.nextElementSibling.style.display === "flex" && btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.style.display === "flex" && btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display === "flex";
      
      if (subButtonsVisible) {
        btnsAbso.style.cssText = "transform: translateY(0); height: 100%;"; 
        btnsAbso.firstElementChild.nextElementSibling.style.display = "none";
        btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";
        btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      } else {
        btnsAbso.style.cssText = "transform: translateY(38%); height: 436%;";
        btnsAbso.firstElementChild.nextElementSibling.style.display = "flex";
        btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.style.display = "flex";
        btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "flex";
      }

    } else if (!btnsAbso.contains(event.target)) {
      btnsAbso.style.cssText = "transform: translateY(0); height: 100%;"; 
      btnsAbso.firstElementChild.nextElementSibling.style.display = "none";
      btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";
      btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
    }
  });
});


//Add Student Prompt
function addStudentPrompt(cityId, nameValue = "", universityValue = "", majorValue = "", classValue = "", phoneValue = "05", homelandValue = "", danismanValue = "", bursValue = "",  updateStudent = "ekleme", studentId = "") {
  let promptBackground = document.createElement("div");
  promptBackground.classList.add("promptBackground");
  document.body.prepend(promptBackground);

  let myPromptMainDiv = document.createElement("div");
  myPromptMainDiv.classList.add("myPromptMainDiv");

  let promptSpan = document.createElement("span");
  promptSpan.classList.add("promptSpan");
  promptSpan.innerHTML = "Eklemek İstediğiniz Öğrencinin Bilgilerini Giriniz:";
  myPromptMainDiv.appendChild(promptSpan);

  let studentForm = document.createElement("form");
  studentForm.classList.add("studentForm");
  myPromptMainDiv.appendChild(studentForm);
  


  //Name
  let studentNameDiv = document.createElement("div");
  studentNameDiv.classList = "studentInputDiv studentNameDiv";

  let studentNameLabel =document.createElement("label");
  studentNameLabel.setAttribute("for", "studentName");
  studentNameLabel.innerHTML = "Ad Soyad&nbsp;&nbsp;&nbsp;:";
  studentNameDiv.appendChild(studentNameLabel);

  let studentName = document.createElement("input");
  studentName.classList = "studentInput studentName";
  studentName.id = "studentName";
  studentName.name = "studentName";
  studentName.type = "text";
  studentName.placeholder = "Öğrencinin Adı Soaydı";
  studentName.required = true;
  studentName.value = nameValue;
  studentName.onkeyup = function() {
    if(!this.value.endsWith(" ")) {
      this.value = capitalizeFirstLetters(this.value);
    }
  }
  studentNameDiv.appendChild(studentName);
  studentForm.appendChild(studentNameDiv);
  //Name


  //University
  let studentUniversityDiv = document.createElement("div");
  studentUniversityDiv.classList = "studentInputDiv studentUniversityDiv";

  let studentUniversityLabel =document.createElement("label");
  studentUniversityLabel.setAttribute("for", "studentUniversity");
  studentUniversityLabel.innerHTML = "Üniversite&nbsp;:";
  studentUniversityDiv.appendChild(studentUniversityLabel);


  let studentUniversity = document.createElement("input");
  studentUniversity.classList = "studentInput studentUniversity";
  studentUniversity.id = "studentUniversity";
  studentUniversity.name = "studentUniversity";
  studentUniversity.setAttribute("list","studentUniversityList");
  studentUniversity.placeholder = "Öğrencinin Üniversitesi";
  studentUniversity.value = universityValue;
  studentUniversity.onkeyup = function() {
    if(!this.value.endsWith(" ")) {
      this.value = capitalizeFirstLetters(this.value);
    }
  }
  studentUniversityDiv.appendChild(studentUniversity);
  

  let studentUniversityDataList = document.createElement("datalist");
  studentUniversityDataList.id = "studentUniversityList";
  
  const allUniversities = 
  [
    "Abdullah Gül Üniversitesi",
    "Acıbadem Üniversitesi",
    "Adana Alparslan Türkeş Bilim Teknoloji Üniversitesi",
    "Adıyaman Üniversitesi",
    "Adnan Menderes Üniversitesi",
    "Ahi Evran Üniversitesi",
    "Ağrı İbrahim Çeçen Üniversitesi",
    "Akdeniz Üniversitesi",
    "Aksaray Üniversitesi",
    "Alanya Alaaddin Keykubat Üniversitesi",
    "Alanya Hamdullah Emin Paşa Üniversitesi",
    "Amasya Üniversitesi",
    "Anadolu Üniversitesi",
    "Antalya Bilim Üniversitesi",
    "Ankara Bilim Üniversitesi",
    "Ankara Medipol Üniversitesi",
    "Ankara Üniversitesi",
    "Ankara Sosyal Bilimler Üniversitesi",
    "Ankara Yıldirım Beyazit Üniversitesi",
    "Ardahan Üniversitesi",
    "Artvin Çoruh Üniversitesi",
    "Atatürk Üniversitesi",
    "Atılım Üniversitesi",
    "Avrasya Üniversitesi",
    "Bahçeşehir Üniversitesi",
    "Balıkesir Üniversitesi",
    "Bandırma Onyedi Eylül Üniversitesi",
    "Bartın Üniversitesi",
    "Başkent Üniversitesi",
    "Batman Üniversitesi",
    "Bayburt Üniversitesi",
    "Bezmialem Vakıf Üniversitesi",
    "Biruni Üniversitesi",
    "Bilecik Üniversitesi",
    "Bilkent Üniversitesi",
    "Bingol Üniversitesi",
    "Bitlis Eren Üniversitesi",
    "Beykent Üniversitesi",
    "Boğaziçi Üniversitesi",
    "Bolu Abant İzzet Baysal Üniversitesi",
    "Bursa Teknik Üniversitesi",    
    "Celal Bayar Üniversitesi",
    "Çağ Üniversitesi",
    "Çankaya Üniversitesi",
    "Çanakkale 18 Mart Üniversitesi",
    "Çukurova Üniversitesi",
    "Çankırı karatekin Üniversitesi",
    "Dokuz Eylül Üniversitesi",
    "Deniz Harp Okulu",
    "Dicle Üniversitesi",
    "Doğuş Üniversitesi",
    "Dumlupınar Üniversitesi",
    "Düzce Üniversitesi",
    "Ege Üniversitesi",
    "Erciyes Üniversitesi",
    "Erzincan Binali Yıldırım Üniversitesi",
    "Erzurum Teknik Üniversitesi",
    "Fatih Sultan Mehmet Üniversitesi",
    "Fırat Üniversitesi",
    "Fenerbahçe Üniversitesi",
    "Gaziantep Üniversitesi",
    "Gazi Üniversitesi",
    "Gaziosmanpaşa Üniversitesi",
    "Galatasaray Üniversitesi",
    "Gebze Teknik Üniversitesi",
    "Gedik Üniversitesi",
    "Gümüşhane Üniversitesi",
    "Hacettepe Üniversitesi",
    "Haliç Üniversitesi",
    "Hasan Kalyoncu Üniversitesi",
    "Hakkari Üniversitesi",
    "Harran Üniversitesi",
    "Hitit Üniversitesi",
    "İnönü Üniversitesi",
    "İskenderun Teknik Üniversitesi",
    "İstanbul Arel Üniversitesi",
    "İstanbul Aydın Üniversitesi",
    "İstanbul Bilgi Üniversitesi",
    "İstanbul Esenyurt Üniversitesi",
    "İstanbul Gelişim Üniversitesi",
    "İstanbul Kemerburgaz  Üniversitesi",
    "İstanbul Kültür Üniversitesi",
    "İstanbul Medeniyet Üniversitesi",
    "İstanbul Medipol Üniversitesi",
    "İstanbul Rumeli Üniversitesi",
    "İstanbul Sabahattin Zaim Üniversitesi",
    "İstanbul Şehir Üniversitesi",
    "İstanbul Teknik Üniversitesi",
    "İstanbul Ticaret Üniversitesi",
    "İstanbul Üniversitesi",
    "İstanbul 29 Mayıs  Üniversitesi",
    "İzmir Bakırçay Üniversitesi",
    "İzmir Ekonomi Üniversitesi",
    "İzmir Demokrasi Üniversitesi",
    "İzmir Katip Çelebi Üniversitesi",
    "İzmir Tınaztepe Üniversitesi",
    "İzmir Yüksek Teknoloji Enstitüsü",
    "Iğdır Üniversitesi",
    "Işık Üniversitesi",
    "Kadir Has Üniversitesi",
    "Kahramanmaraş Sütçü İmam Üniversitesi",
    "Kafkas Üniversitesi",
    "Karabük Üniversitesi",
    "Karadeniz Teknik Üniversitesi",
    "karamanoğlu Mehmet Bey Üniversitesi",
    "Karatay Üniversitesi",
    "Kastamonu Üniversitesi",
    "Kilis 7 Aralık Üniversitesi",
    "Kırıkkale Üniversitesi",
    "Kırklareli Üniversitesi",
    "Kocaeli Üniversitesi",
    "Koç Üniversitesi",
    "Konya Gıda Tarım Üniversitesi",
    "Konya Teknik Üniversitesi",
    "Maltepe Üniversitesi",
    "Mardin Artuklu Üniversitesi",
    "Marmara Üniversitesi",
    "MEF Üniversitesi",
    "Mehmet Akif Ersoy Üniversitesi",
    "Mersin Üniversitesi",
    "Milli Savunma Üniversitesi Hava Harp Okulu",
    "Mimar Sinan Güzel Sanatlar Üniversitesi",
    "Mustafa Kemal Üniversitesi",
    "Muş Alparslan Üniversitesi",
    "Muğla Sıtkı Koçman Üniversitesi",
    "Namık Kemal Üniversitesi",
    "Necmettin Erbakan Üniversitesi",
    "Nevşehir Hacı Bektaş Veli Üniversitesi",
    "Nisantaşi Üniversitesi",
    "Nuh Naci Yazgan Üniversitesi",
    "Okan Üniversitesi",
    "Ondokuz Mayıs Üniversitesi",
    "Orta Doğu Teknik Üniversitesi",
    "Osmangazi Üniversitesi",
    "Osmaniye Korkut Ata Üniversitesi",
    "OSTIM Teknik Üniversitesi",
    "Ordu Üniversitesi",
    "Ömer Halisdemir Üniversitesi",
    "Özyeğin Üniversitesi",
    "Pamukkale Üniversitesi",
    "Piri Reis Üniversitesi",
    "Recep Tayyip Erdoğan Üniversitesi",
    "Sabancı Üniversitesi",
    "Sağlık Bilimler Üniversitesi",
    "Sakarya Üniversitesi",
    "Sanko Üniversitesi",
    "Siirt Üniversitesi",
    "Sinop Üniversitesi",
    "Süleyman Demirel Üniversitesi",
    "Sivas Cumhuriyet Üniversitesi",
    "Selçuk Üniversitesi",
    "Şırnak Üniversitesi",
    "Tarsus Üniversitesi",
    "TED Üniversitesi",
    "Trakya Üniversitesi",
    "TOBB Ekonomi Ve Teknoloji Üniversitesi",
    "Toros Üniversitesi",
    "Tunceli Üniversitesi",
    "Türk Hava Kurumu Üniversitesi",
    "Türk-Alman Üniversitesi",
    "Ufuk Üniversitesi",
    "Uludağ Üniversitesi",
    "Uşak Üniversitesi",
    "Üsküdar Üniversitesi",
    "Van Yüzüncü Yıl Üniversitesi",
    "Yalova Üniversitesi",
    "Yaşar Üniversitesi",
    "Yeditepe Üniversitesi",
    "Yeni Yüzyıl Üniversitesi",
    "Yıldız Teknik Üniversitesi",
    "Yozgat Bozok Üniversitesi",
    "Yüksek ihtisas Üniversitesi",
    "Zonguldak Bülent Ecevit Üniversitesi"
  ]

  
  allUniversities.forEach(university => {
    const option = document.createElement("option");
    option.value = university;
    studentUniversityDataList.appendChild(option);
  });
  studentUniversityDiv.appendChild(studentUniversityDataList);
  studentForm.appendChild(studentUniversityDiv);
  //University



  //Major
  let studentmajorDiv = document.createElement("div");
  studentmajorDiv.classList = "studentInputDiv studentmajorDiv";

  let studentmajorLabel =document.createElement("label");
  studentmajorLabel.setAttribute("for", "studentmajor");
  studentmajorLabel.innerHTML = "Bölüm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:";
  studentmajorDiv.appendChild(studentmajorLabel);


  let studentmajor = document.createElement("input");
  studentmajor.classList = "studentInput studentmajor";
  studentmajor.id = "studentmajor";
  studentmajor.name = "studentMajor";
  studentmajor.setAttribute("list","majorsList");
  studentmajor.placeholder = "Öğrencinin Bölümü";
  studentmajor.value = majorValue;

  studentmajor.onkeyup = function() {
    if(!this.value.endsWith(" ")) {
      this.value = capitalizeFirstLetters(this.value);
    }
  }

  studentmajorDiv.appendChild(studentmajor);
  


  let majorDataList = document.createElement("datalist");
  majorDataList.id = "majorsList";

  const majorsArray = [
    "Adli Bilişim Mühendisliği",
    "Antropoloji",
    "Bankacılık",
    "Bankacılık ve Sigortacılık",
    "Beslenme ve Diyetetik",
    "Bilgisayar Mühendisliği",
    "Biyoloji",
    "Biyomühendislik",
    "Coğrafya",
    "Çalışma Ekonomisi",
    "Çevre Mühendisliği",
    "Diş Hekimliği",
    "Eczacılık",
    "Ekonometri",
    "Elektrik ve Elektronik Mühendisliği",
    "Endüstri Mühendisliği",
    "Endüstriyel Tasarım",
    "Endüstriyel Mühendisliği",
    "Felsefe",
    "Fizik",
    "Fizyoterapi",
    "Gemi Mühendisliği",
    "Gıda Mühendisliği",
    "Güzel Sanatlar",
    "Harita Mühendisliği",
    "Hemşirelik",
    "Hukuk",
    "İç Mimarlık",
    "İktisat",
    "İletişim",
    "İlahiyat",
    "İmaalat Mühendisliği",
    "İnşaat Mühendisliği",
    "İslami Bilimler",
    "İstatistik",
    "İşletme",
    "Jeofizik Mühendisliği",
    "Jeoloji Mühendisliği",
    "Kentsel Tasarım ve Peyzaj Mimarisi",    
    "Peyzaj Tasarımı",
    "Kimya",
    "Kimya Mühendisliği",    
    "Konservatuar",
    "Maden Mühendisliği",    
    "Makine Mühendisliği",    
    "Maliye",    
    "Malzeme Mühendisliği",    
    "Matematik",   
    "Mekatronik Mühendisliği",
    "Mimarlık",    
    "Odyoloji",   
    "Otomotiv Mühendisliği",    
    "Öğretmenlik",   
    "Petrol Mühendisliği",
    "Pilotaj",
    "Psikoloji",
    "Sağlık Hizmetleri",
    "Sağlık Yönetimi",
    "Sigortacılık",
    "Siyaset Bilimi",
    "Kamu Yönetimi Uluslararası İlişkiler",
    "Sosyal Hizmetler",
    "Spor Bilimleri",
    "Su Ürünleri",
    "Tarih",
    "Tekstil Mühendisliği",
    "Tıp",
    "Turizm",
    "Türk Dili ve Edebiyatı",
    "Uçak Mühendisliği",
    "Uluslararası Ticaret",
    "Veterinerlik ",
    "Yabancı Diller",
    "Yazılım Mühendisliği",
    "Ziraat ve Tarım",
  ];
  
  majorsArray.forEach(majorFromArray => {
    const option = document.createElement("option");
    option.value = capitalizeFirstLetters(majorFromArray);
    majorDataList.appendChild(option);
  });

  studentmajorDiv.appendChild(majorDataList);
  studentForm.appendChild(studentmajorDiv);
  //Major


  //Class
  let studentClassDiv = document.createElement("div");
  studentClassDiv.classList = "studentInputDiv studentClassDiv";

  let studentClassLabel =document.createElement("label");
  studentClassLabel.setAttribute("for", "studentClass");
  studentClassLabel.innerHTML = "Sınıf&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:";
  studentClassDiv.appendChild(studentClassLabel);

  let studentClass = document.createElement("select");
  studentClass.classList = "studentInput studentClass";
  studentClass.id = "studentClass";
  studentClass.name = "studentClass";
  studentClass.required = true;
  studentClass.innerHTML = `
    <option value="Hazırlık">Hazırlık</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="Mezun">Mezun</option>
  `

  const classInputs = studentClass.querySelectorAll('option');
  let selectedClass = false;
  for (const input of classInputs) {
    if(input.value === classValue) {
       input.selected = true;
       selectedClass = true;
     }
  }
  if(selectedClass === false) {
    studentClass.value = "";
  }

  
  studentClassDiv.appendChild(studentClass);
  studentForm.appendChild(studentClassDiv);
  //Class

  //Phone
  let studentPhoneDiv = document.createElement("div");
  studentPhoneDiv.classList = "studentInputDiv studentPhoneDiv";

  let studentPhoneLabel = document.createElement("label");
  studentPhoneLabel.setAttribute("for", "studentPhone");
  studentPhoneLabel.innerHTML = "Tel. No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:";
  studentPhoneDiv.appendChild(studentPhoneLabel);

  let studentPhone = document.createElement("input");
  studentPhone.classList = "studentInput studentPhone";
  studentPhone.id = "studentPhone";
  studentPhone.name = "studentPhone";
  studentPhone.type = "tel";
  studentPhone.placeholder = "05xx xxx xx xx";
  studentPhone.maxLength = 17;
  studentPhone.value = phoneValue;
  
  studentPhoneDiv.appendChild(studentPhone);
  studentForm.appendChild(studentPhoneDiv);
  //Phone

  //Homeland
  let studentHomelandDiv = document.createElement("div");
  studentHomelandDiv.classList = "studentInputDiv studentHomelandDiv";

  let studentHomelandLabel =document.createElement("label");
  studentHomelandLabel.setAttribute("for", "studentHomeland");
  studentHomelandLabel.innerHTML = "Memleket&nbsp;:";
  studentHomelandDiv.appendChild(studentHomelandLabel);

  let studentHomeland = document.createElement("input");
  studentHomeland.classList = "studentInput studentHomeland";
  studentHomeland.id = "studentHomeland";
  studentHomeland.name = "studentHomeland";
  studentHomeland.setAttribute("list", "homelandList");
  studentHomeland.placeholder = "Öğrencinin Memleketi";
  studentHomeland.value = homelandValue;
  studentHomelandDiv.appendChild(studentHomeland);

  let homelandDtaList = document.createElement("datalist");
  homelandDtaList.id = "homelandList";

  for(city of iller) {
    const option = document.createElement("option");
    option.value = city.getAttribute("data-iladi");
    homelandDtaList.appendChild(option);
  }


  studentHomeland.onkeyup = function() {
    if(!this.value.endsWith(" ")) {
      this.value = capitalizeFirstLetters(this.value);
    }
  }

  studentHomelandDiv.appendChild(homelandDtaList);
  studentForm.appendChild(studentHomelandDiv);
  //Homeland


  //Akademik Danisman
  let studentAkademikDiv = document.createElement("div");
  studentAkademikDiv.classList = "studentInputDiv studentAkademikDiv";

  let studentAkademikLabel =document.createElement("label");
  studentAkademikLabel.setAttribute("for", "studentAkademik");
  studentAkademikLabel.innerHTML = "Akademik Danışman Olabilirmi?";
  studentAkademikDiv.appendChild(studentAkademikLabel);

  let studentAkademik = document.createElement("select");
  studentAkademik.classList = "studentInput studentAkademik";
  studentAkademik.id = "studentAkademik";
  studentAkademik.name = "studentAkademik";
  studentAkademik.innerHTML = `
    <option value="Evet">Evet</option>
    <option value="Hayır">Hayır</option>
  `
  const AkademikInputs = studentAkademik.querySelectorAll('option');
  let selectedAkademik = false;
  for (const input of AkademikInputs) {
    if(input.value === danismanValue) {
       input.selected = true;
       selectedAkademik = true;
     }
  }
  if(selectedAkademik === false) {
    studentAkademik.value = "";
  }

  studentAkademikDiv.appendChild(studentAkademik);
  studentForm.appendChild(studentAkademikDiv);
  //Akademik Danisman


  //Burs
  let studentBursDiv = document.createElement("div");
  studentBursDiv.classList = "studentInputDiv studentBursDiv";

  let studentBursLabel =document.createElement("label");
  studentBursLabel.setAttribute("for", "studentBurs");
  studentBursLabel.innerHTML = "Burs Alıyormu?";
  studentBursDiv.appendChild(studentBursLabel);

  let studentBurs = document.createElement("select");
  studentBurs.classList = "studentInput studentBurs";
  studentBurs.id = "studentBurs";
  studentBurs.name = "studentBurs";
  studentBurs.innerHTML = `
    <option value="Evet">Evet</option>
    <option value="Hayır">Hayır</option>
  `

  const bursInputs = studentBurs.querySelectorAll('option');
  let selectedBurs = false;
  for (const input of bursInputs) {
    if(input.value === bursValue) {
       input.selected = true;
       selectedBurs = true;
     }
  }
  if(selectedBurs === false) {
    studentBurs.value = "";
  }

  studentBursDiv.appendChild(studentBurs);
  studentForm.appendChild(studentBursDiv);
  //Burs


  let ilToPHP = document.createElement("input");
  ilToPHP.type = "hidden";
  ilToPHP.name = "il";
  ilToPHP.value = cityId;
  studentForm.appendChild(ilToPHP);


  let isUpdateToPHP = document.createElement("input");
  isUpdateToPHP.type = "hidden";
  isUpdateToPHP.name = "isUpdate";
  isUpdateToPHP.value = updateStudent;
  studentForm.appendChild(isUpdateToPHP);


  let studentIdToPHP = document.createElement("input");
  studentIdToPHP.type = "hidden";
  studentIdToPHP.name = "studentId";
  studentIdToPHP.value = studentId;
  studentForm.appendChild(studentIdToPHP);


  let studentSubmit = document.createElement("input");
  studentSubmit.classList.add("studentSubmit");
  studentSubmit.type = "submit";

  if(updateStudent === "ekleme") {
    studentSubmit.value = "Ekle";
  } else {
    studentSubmit.value = "Düzenle";
  }
  
  studentSubmit.addEventListener("mouseover" , () => {
    studentSubmit.style.backgroundColor = "green";
  })
  studentSubmit.addEventListener("mouseout", () => {
    studentSubmit.style.backgroundColor = "#1ea500";
  })

  
  //On Submit
  studentForm.onsubmit = function(event) {
    event.preventDefault();

    let formData = new FormData(studentForm);
    console.log(formData);

    fetch('add_data.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();  // Yanıtı metin olarak al
    })
    .then(responseText => {
        console.log('Yanıt Metni:', responseText);  // Yanıt metnini kaydet
        let data = JSON.parse(responseText);
        console.log(data);

        if (data.success) {
            myPromptMainDiv.style.animation = "goAway 0.4s forwards";
            setTimeout(function() {
                promptBackground.remove();
                myPromptMainDiv.remove();
            }, 400);
            updateList(cityId);
        } else {
            console.error('Hata:', data.message);
        }
    })
    .catch(error => {
        console.error('Fetch işlemi sırasında bir sorun oluştu:', error);
    });
  };



  studentForm.appendChild(studentSubmit);
  
  

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

  studentForm.appendChild(formCancle);



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
    promptClose.style.backgroundColor = "#024959";
  })
  myPromptMainDiv.appendChild(promptClose);
  
  document.body.prepend(myPromptMainDiv);
}


//Add Note Prompt
function addNotePrompt(cityId, student) {
  let promptBackground = document.createElement("div");
  promptBackground.classList.add("promptBackground");
  document.body.prepend(promptBackground);

  let addNotePromptMainDiv = document.createElement("div");
  addNotePromptMainDiv.classList.add("addNotePromptMainDiv");

  let promptSpan = document.createElement("span");
  promptSpan.classList.add("promptSpan");
  promptSpan.innerHTML = "Eklemek İstediğiniz Notu Yazınız:<br>(Notu Silmek İçin Boş Bırakınız)";
  addNotePromptMainDiv.appendChild(promptSpan);

  let noteForm = document.createElement("form");
  noteForm.classList.add("noteForm");
  
  let noteText = document.createElement("textarea");
  noteText.classList = "noteText";
  noteText.placeholder = "Notu Yazınız";
  noteText.value = student.note;
  noteText.maxLength = 100;
  noteForm.appendChild(noteText);

  
  let noteSubmit = document.createElement("input");
  noteSubmit.classList.add("noteSubmit");
  noteSubmit.type = "submit";
  noteSubmit.value = "Kaydet";
  
  noteSubmit.addEventListener("mouseover" , () => {
    noteSubmit.style.backgroundColor = "green";
  })
  noteSubmit.addEventListener("mouseout", () => {
    noteSubmit.style.backgroundColor = "#1ea500";
  })

  noteSubmit.onclick = function(event) {
    event.preventDefault();
    
    fetch('update_note.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ note: noteText.value, id: student.id})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Bagalntida yanlislik oldu: ' + response.status);
      }
      return response.text();
    })
    .then(result => {
      console.log(result); 
      addNotePromptMainDiv.style.animation = "disappperance 0.5s forwards";
      setTimeout(function() {
        promptBackground.remove();
        addNotePromptMainDiv.remove();
      }, 400)
      updateList(cityId);
    })
    .catch(error => {
      console.error('yanlislik oldu: ', error);
    });
    
    
  }

  noteForm.appendChild(noteSubmit);


  let formCancle = document.createElement("span");
  formCancle.classList.add("formCancle");
  formCancle.innerHTML = "Vazgeç";
  formCancle.addEventListener("click", () => {
    addNotePromptMainDiv.style.animation = "goAway 0.4s forwards";
    setTimeout(function() {
      promptBackground.remove();
      addNotePromptMainDiv.remove();
    }, 400)
  })
  formCancle.addEventListener("mouseover" , () => {
    formCancle.style.backgroundColor = "#0b1d59";
  })
  formCancle.addEventListener("mouseout", () => {
    formCancle.style.backgroundColor = "#334da0";
  })

  noteForm.appendChild(formCancle);



  let promptClose = document.createElement("span");
  promptClose.classList.add("promptClose");
  promptClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
  promptClose.addEventListener("click", () => {
    addNotePromptMainDiv.style.animation = "goAway 0.4s forwards";
    setTimeout(function() {
      promptBackground.remove();
      addNotePromptMainDiv.remove();
    }, 400)
  })
  promptClose.addEventListener("mouseover" , () => {
    promptClose.style.backgroundColor = "red";
  })
  promptClose.addEventListener("mouseout", () => {
    promptClose.style.backgroundColor = "#024959";
  })
  addNotePromptMainDiv.appendChild(promptClose);


  addNotePromptMainDiv.appendChild(noteForm);

  document.body.appendChild(addNotePromptMainDiv);
}


//Update List 
function updateList(cityId) {
  console.log("Update List");
  let cityElement = document.querySelector(`.box #${cityId}`);
  console.log(cityElement)

  let personList = cityElement.querySelector(".person-list");

  if(cityElement !== null && personList !== null) {
    personList.innerHTML = ''; 
  } 

  

  // استخدام Fetch API لجلب البيانات من الخادم
  fetch('get_all_students.php')
  .then(response => response.json())
  .then(allStudentsData => {
    let appended = false;
    // استخدام البيانات المسترجعة هنا
    allStudentsData.forEach(student => {
      if(student.il === cityId) {
        appended = true;

        let personElement = createPersonElement(personList, student);

  
        personList.appendChild(personElement);
      }
    })
    return appended;
  })
  .then(append => {
    if(!append) {
      console.log("kimse yok")
      let noStudentSpan = document.createElement("span");
      noStudentSpan.innerHTML = "Bu Şehirde Bulunan Öğrenci Yoktur";
      personList.appendChild(noStudentSpan);
    }
  })
  .then(() => {
    numbersOnCities();
  })
  .catch(error => console.error('yanlis olustu : ', error));

};



function createPersonElement(personList, student) {
  let personElement = document.createElement("div");
  personElement.classList.add("person");

  personElement.innerHTML = `<span class="personName">${student.adsoyad}</span>`;

  let btns = document.createElement("div");
  btns.className = "btns";

  let btnsAbso = document.createElement("div");
  btnsAbso.className = "btnsAbso";
  
  let threePoint = document.createElement("div");
  threePoint.className = "threePoint";
  threePoint.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>`;
  btnsAbso.appendChild(threePoint);


  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("bin-button");

  if (window.matchMedia("(max-width: 768px)").matches) {
    deleteBtn.innerHTML = "Sil";
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    deleteBtn.innerHTML = `
      <svg
        class="bin-top"
        viewBox="0 0 39 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
        <line
          x1="12"
          y1="1.5"
          x2="26.0357"
          y2="1.5"
          stroke="white"
          stroke-width="3"
        ></line>
      </svg>
      <svg
        class="bin-bottom"
        viewBox="0 0 33 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_8_19" fill="white">
          <path
            d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
          ></path>
        </mask>
        <path
          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
          fill="white"
          mask="url(#path-1-inside-1_8_19)"
        ></path>
        <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
        <path d="M21 6V29" stroke="white" stroke-width="4"></path>
      </svg>
    `;

    deleteBtn.onmouseover = function() {
      this.innerHTML = "Sil";
    }

    deleteBtn.onmouseout = function() {
      this.innerHTML =`<svg
        class="bin-top"
        viewBox="0 0 39 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
        <line
          x1="12"
          y1="1.5"
          x2="26.0357"
          y2="1.5"
          stroke="white"
          stroke-width="3"
        ></line>
      </svg>
      <svg
        class="bin-bottom"
        viewBox="0 0 33 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_8_19" fill="white">
          <path
            d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
          ></path>
        </mask>
        <path
          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
          fill="white"
          mask="url(#path-1-inside-1_8_19)"
        ></path>
        <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
        <path d="M21 6V29" stroke="white" stroke-width="4"></path>
      </svg>
    `;
    }  
  }

  deleteBtn.onclick = async function() {
    let confirmed = await myCustomConfirm(`${student.adsoyad}'i Silmek Istediğinizden Eminmisiniz?`);
    if (confirmed) {
      // إرسال اسم الطالب إلى الخادم لحذفه من قاعدة البيانات
      fetch('delete_student.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: student.id })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('silmek icin php sayfasina dogru baglanti kurulmadi: ' + response.status);
        }
        return response.text();
      })
      .then(result => {
        console.log(result); // رسالة نجاح الحذف
      })
      .catch(error => {
        console.error('حدث خطأ: ', error);
      });



      this.parentElement.parentElement.parentElement.remove();
      numbersOnCities();

      if(personList.children.length === 0) {
        console.log("sehire span eklenmeli");
        let noStudentSpan = document.createElement("span");
        noStudentSpan.innerHTML = "Bu Şehirde Bulunan Öğrenci Yoktur";
        personList.appendChild(noStudentSpan);
      }
    } else {
      console.log("olmadi");
    } 
  };

  btnsAbso.appendChild(deleteBtn);

  
  let editBtn = document.createElement("button");
  editBtn.className = "editBtn";

  if (window.matchMedia("(max-width: 768px)").matches) {
    editBtn.innerHTML = "Bilgileri\nDüzenle";
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    editBtn.innerHTML = `
    <svg height="1em" viewBox="0 0 512 512">
      <path
        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
      ></path>
    </svg>
    `;

    editBtn.onmouseover = function() {
      this.innerHTML = "Bilgileri\nDüzenle";
    }

    editBtn.onmouseout = function() {
      this.innerHTML = `
      <svg height="1em" viewBox="0 0 512 512">
        <path
          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
        ></path>
      </svg>
      `;
    }
  }

  editBtn.onclick = function() {
    addStudentPrompt(student.il, student.adsoyad, student.universite, student.bolum, student.sinif, student.tel, student.memleket, student.akademik , student.burs, "guncelleme", student.id);
  };
  
  btnsAbso.appendChild(editBtn);

  let noteBtn = document.createElement("button");
  noteBtn.className = "noteBtn";

  if (window.matchMedia("(max-width: 768px)").matches) {
    noteBtn.innerHTML = "Not<br>Ekle/<br>Sil";
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    noteBtn.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>`;

    noteBtn.onmouseover = function() {
      this.innerHTML = "Not<br>Ekle/<br>Sil";
    }

    noteBtn.onmouseout = function() {
      this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>`;
    }
  }

  noteBtn.onclick = function() {
    addNotePrompt(student.il, student);
  }

  btnsAbso.appendChild(noteBtn);
  
  btns.appendChild(btnsAbso);
  personElement.appendChild(btns);


  let pUniversity = document.createElement("span");
  pUniversity.innerHTML = `Üniversite&nbsp;&nbsp;: ${student.universite}`;
  personElement.appendChild(pUniversity);

  let pMajor = document.createElement("span");
  pMajor.innerHTML = `Bölüm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${student.bolum}`;
  personElement.appendChild(pMajor);

  let pClass = document.createElement("span");
  pClass.innerHTML = `Sınıf&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${student.sinif}`;
  personElement.appendChild(pClass);

  let pPhone = document.createElement("span");
  pPhone.innerHTML = `Tel. No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${student.tel}`;
  personElement.appendChild(pPhone);

  let pHomeLand = document.createElement("span");
  pHomeLand.innerHTML = `Memleket&nbsp;&nbsp;: ${student.memleket}`;
  personElement.appendChild(pHomeLand);

  let pAkademik = document.createElement("span");
  pAkademik.innerHTML = `Akad. Danış. Olabilirmi: ${student.akademik}`;
  personElement.appendChild(pAkademik);

  let pBurs = document.createElement("span");
  pBurs.innerHTML = `Burs Alıyormu: ${student.burs}`;
  personElement.appendChild(pBurs);

  if(student.note !== '' && student.note !== null) {
    let noteDiv = document.createElement("div");
    noteDiv.className = "noteDiv";
    noteDiv.innerHTML = student.note;
    personElement.appendChild(noteDiv);
  }

  return personElement;
}


function numbersOnCities() {
  console.log("numbersOnCities Happend")
  // حذف العناصر القديمة
  const numbersWillDelete = document.getElementsByClassName("studentsCount") || [];
  Array.from(numbersWillDelete).forEach((sehir) => sehir.remove());

  // استرجاع بيانات الطلاب مرة واحدة
  fetch('get_all_students.php')
    .then(response => response.json())
    .then(allStudentsData => {
      // تحديد المدن
      const turkiye = document.querySelectorAll("#svg-turkiye-haritasi > g > g");
      
      turkiye.forEach((sehir) => {
        const rect = sehir.getBoundingClientRect();
        const x = rect.left + window.scrollX + rect.width / 2;
        const y = rect.top + window.scrollY + rect.height / 2;

        // حساب عدد الطلاب
        const allStudentsCount = allStudentsData.reduce((count, student) => {
          if (student.il === sehir.id) count++;
          return count;
        }, 0);

        if (allStudentsCount > 0) {
          sehir.setAttribute("has-student", "var");

          const studentsCount = document.createElement("span");
          studentsCount.className = "studentsCount";
          studentsCount.id = `${sehir.id}`;
          studentsCount.innerHTML = `${allStudentsCount}`;
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2}px`;

          // إضافة أحداث التفاعل
          studentsCount.addEventListener('mouseover', (event) => {
            info.innerHTML = `<div>${event.target.id}</div>`;
            sehir.firstElementChild.style.fill = "#45270c";
          });

          studentsCount.addEventListener('mousemove', (event) => {
            info.style.top = event.pageY + 25 + 'px';
            info.style.left = event.pageX + 'px';
          });

          studentsCount.addEventListener('mouseout', () => {
            info.innerHTML = '';
            sehir.firstElementChild.style.fill = "";
          });

          // معالجة الوضعية بناءً على حجم الشاشة
          if (window.matchMedia("(min-width: 768px)").matches) {
            adjustPositionForLargeScreens(sehir, studentsCount, x, y);
          } else if (window.matchMedia("(max-width: 768px)").matches) {
            adjustPositionForSmallScreens(sehir, studentsCount, x, y);
          }

          document.body.appendChild(studentsCount);
        } else {
          sehir.setAttribute("has-student", "yok");
        }
      });
    })
    .catch(error => console.error('حدث خطأ أثناء استرجاع البيانات:', error));
}

// تعديل مواضع العناصر على الشاشات الكبيرة
function adjustPositionForLargeScreens(sehir, studentsCount, x, y) {
  const positions = {
    "elazig": { top: 3, left: -20 },
    "artvin": { top: -20 },
    "trabzon": { top: -10, left: -10 },
    "bartin": { top: -10, left: -7 },
    "duzce": { top: -10, left: -10 },
    "kocaeli": { top: -11, left: -2 },
    "istanbul": { top: -6, left: -16 },
    "tekirdag": { top: -10, left: -10 },
    "bayburt": { top: -8, left: -8 },
    "erzincan": { top: -20, left: -20 },
    "amasya": { top: -10, left: -5 },
    "yalova": { top: -8 },
    "izmir": { top: 15 },
    "mugla": { top: -15 },
    "denizli": { top: -15, left: -15 },
    "burdur": { top: -15, left: -10 },
    "antalya": { top: -30 },
    "karaman": { top: -20 },
    "afyonkarahisar": { top: -20 },
    "bilecik": { top: -10, left: -10 },
    "konya": { top: -20, left: -30 },
    "kilis": { top: -5 },
    "adiyaman": { top: -20 },
    "mardin": { top: -10 },
    "batman": { left: -10 },
    "sirnak": { top: -13 },
    "hakkari": { top: -15 },
    "agri": { top: -17, left: -17 },
    "bitlis": { left: -19 },
    "mus": { left: -10 },
    "bingol": { top: -10 },
    "tunceli": { top: -5, left: -10 },
    "yozgat": { top: -10, left: 5 },
    "ordu": { top: -15 },
    "kirklareli": { top: -5, left: -7 },
    "edirne": { left: -3 },
    "malatya": { top: -10, left: -16 },
    "hatay": { left: -7 },
    "usak": { top: -6, left: -9 },
    "osmaniye": { top: 0, left: -4 },
    "nigde": { top: -7, left: -7 },
    "kayseri": { top: -20, left: -20 },
    "ankara": { top: -19 },
    "ardahan": { top: -5, left: -12 },
    "kuzey-kibris": { top: 0, left: -12 }
  };
  
  const pos = positions[sehir.id] || {};
  studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + (pos.top || -5)}px`;
  studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + (pos.left || -5)}px`;
}

// تعديل مواضع العناصر على الشاشات الصغيرة
function adjustPositionForSmallScreens(sehir, studentsCount, x, y) {
  const positions = {
    "elazig": { top: 4, left: -5 },
    "adiyaman": { top: -3, left: 2 },
    "agri": { top: -3, left: -5 },
    "kars": { top: 3, left: 1 },
    "artvin": { top: -3 },
    "erzincan": { top: -3, left: -5 },
    "malatya": { top: -3, left: -3 },
    "gaziantep": { left: 5 },
    "hatay": { left: 2 },
    "samsun": { left: -3 },
    "ordu": { top: -2 },
    "kayseri": { top: -3, left: -3 },
    "nevsehir": { top: 3 },
    "karaman": { top: -3, left: 1 },
    "konya": { top: -3, left: -6 },
    "antalya": { top: -8, left: 5 },
    "burdur": { top: -3 },
    "denizli": { top: -3, left: -3 },
    "mugla": { top: -6 },
    "isparta": { top: 3, left: 3 },
    "izmir": { top: 9 },
    "canakkale": { top: 3, left: 3 },
    "kocaeli": { top: -1, left: 3 },
    "istanbul": { left: -3 },
    "bolu": { top: -1, left: 4 },
    "sanliurfa": { top: 3 },
    "edirne": { left: 3 },
    "ankara": { top: -3, left: 5 },
    "kuzey-kibris": { top: 5, left: -5 }
  };

  const pos = positions[sehir.id] || {};
  studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + (pos.top || 0)}px`;
  studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + (pos.left || 0)}px`;
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



function capitalizeFirstLetters(sentence) {
  return sentence.trim().split(' ').map(function(word) {
    return word.charAt(0) === "i" ? "İ" + word.slice(1).toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}
