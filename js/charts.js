
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














// استخدام Fetch API لجلب البيانات من الخادم
fetch('get_all_students.php')
.then(response => response.json())
.then(allStudentsData => {
    //   console.log(allStudentsData);
    fetch('get_cities.php')
    .then(response => response.json())
    .then(allCities => {
        // استخدام البيانات المسترجعة هنا
        console.log(allStudentsData);
        
        var DATA = createAllInformation(allStudentsData, allCities) || [];
        // console.log(DATA);
        showData(DATA);

        generateClassChart(allStudentsData, DATA);
        generateMerkezlerChart(DATA);
        generateBursChart(allStudentsData, DATA);
        generateAkademikChart(allStudentsData, DATA);
                
        document.getElementById('all-students').addEventListener('click', function() {
            let redyStudents = [];

            DATA.forEach(city => {
                city.value.forEach((student) => {
                    let il = "";

                    if(city.subeVarmi === "var") {
                        il = `${city.cityName}(Şube Var)`;
                    } else if(city.temsilcilikVarmi === "var") {
                        il = `${city.cityName}(Temsilcilik Var)`;
                    } else if(city.grubVarmi === "var") {
                        il = `${city.cityName}(Çalışma Grubu Var)`;
                    } else {
                        il = `${city.cityName}`;
                    }

                    redyStudents.push({adsoyad: `${student.adsoyad}`, universite: `${student.universite}`, bolum: `${student.bolum}`, il: `${il}`, tel: `${student.tel}`, memleket: `${student.memleket}`});
                })
            })

            showStudentTable(redyStudents, "Tüm Öğrenciler Listesi");
        });
    })
    .catch(error => console.error('yanlis olustu : ', error));
})
.catch(error => console.error('yanlis olustu : ', error));




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
    modalTitle = document.getElementById("modal-title");
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






function showData(data) {
    let informations = document.getElementById("informations-info");
    let studentsCount = 0;
    let mezunStudentsCount = 0;

    data.forEach(city => {
        city.value.forEach(student => {
            ++studentsCount;
            if(student.sinif === "Mezun") {
                ++mezunStudentsCount;
            }
        })
    })

    informations.innerHTML = `Toplam ${data.length} İlde ${studentsCount} Öğrenci Vardır<br>-${studentsCount - mezunStudentsCount} Okuyan Öğrenci<br>-${mezunStudentsCount} Mezun Öğrenci<br>Not: Aşağıdaki İstatistiklerde Mezun Öğrenciler Dahil Değildir.`;
}

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





// ------Charts------

function generateClassChart(students, DATA) {
    const classFirst = [];
    const classOne = [];
    const classTwo = [];
    const classThree = [];
    const classFour = [];
    const classFive = [];
    const classSix = [];
    const classGraduate = [];

    students.forEach((student) => {
        switch(student.sinif) {
            case "Hazırlık":
                classFirst.push(student);
                break;
            case "1":
                classOne.push(student);
                break;
            case "2":
                classTwo.push(student);
                break;
            case "3":
                classThree.push(student);
                break;
            case "4":
                classFour.push(student);
                break;
            case "5":
                classFive.push(student);
                break;
            case "6":
                classSix.push(student);
                break;
            case "Mezun":
                classGraduate.push(student);
                break;
            default:
                break;
        }
    });


    const chart = new Chart( 
        document.getElementById('classCanvas'),
        {
        type: 'bar',
        data: {
            labels: ["Hazırlık", "1", "2", "3", "4", "5", "6", "Mezun"],
            datasets: [
            {
                label: 'Sınıfta Bulunan Öğrenci Sayısı',
                data: [classFirst.length, classOne.length, classTwo.length, classThree.length, classFour.length, classFive.length, classSix.length, classGraduate.length],
                backgroundColor: [
                    '#970800aa'
                ],
                borderColor: [
                    '#970800'
                ],
                borderWidth: 1,
            }
            ]
        }
        }
    );

    document.getElementById('classCanvas').onclick = function(evt) {
        const activePoints = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        const firstPoint = activePoints[0];
        
        if (firstPoint) {
            const label = chart.data.labels[firstPoint.index];
            const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            console.log(`Basılan Sınıf: ${label}, Bulunan Öğrenci Sayısı: ${value}`);
            
            let redyStudents = [];

            DATA.forEach(city => {
                city.value.forEach((student) => {
                    if(student.sinif === label) {
                        let il = "";

                        if(city.subeVarmi === "var") {
                            il = `${city.cityName}(Şube var)`;
                        } else if(city.temsilcilikVarmi === "var") {
                            il = `${city.cityName}(Temsilcilik var)`;
                        } else if(city.grubVarmi === "var") {
                            il = `${city.cityName}(Çalışma Grubu Var)`;
                        } else {
                            il = `${city.cityName}`;
                        }

                        redyStudents.push({adsoyad: `${student.adsoyad}`, universite: `${student.universite}`, bolum: `${student.bolum}`, il: `${il}`, tel: `${student.tel}`, memleket: `${student.memleket}`});
                    }
                })
            })

            if(label === "Hazırlık") {
                showStudentTable(redyStudents, "Hazırlık Sınıfı Öğrenci Listesi");
            } else if(label === "Mezun") {
                showStudentTable(redyStudents, "Mezun Öğrenci Listesi");
            } else {
                showStudentTable(redyStudents, `${label}. Sınıf Öğrenci Listesi`);
            }
        }
    };
};



function generateMerkezlerChart(DATA) {
    const sube = [];
    const temsilcilik = [];
    const hicBiri = [];

    var subeStudentCount = 0;
    var temsilcilikStudentCount = 0;
    var hicBiriStudentCount = 0;

    DATA.forEach(city =>{
        if(city.subeVarmi === "var") {
            sube.push(city);

            city.value.forEach(student => {
                if(student.sinif !== "Mezun") {
                    subeStudentCount++;
                }
            })
        } else if(city.temsilcilikVarmi === "var") {
            temsilcilik.push(city);
            city.value.forEach(student => {
                if(student.sinif !== "Mezun") {
                    temsilcilikStudentCount++;
                }
            })

        } else {
            hicBiri.push(city);

            city.value.forEach(student => {
                if(student.sinif !== "Mezun") {
                    hicBiriStudentCount++;
                }
            })
        }
    })


    const chart = new Chart( 
        document.getElementById('merkezlerCanvas'),
        {
        type: 'bar',
        data: {
            labels: ["Şube", "Temsilcilik", "Hiç Biri"],
            datasets: [
            {
                label: 'Öğrenci Sayısı',
                data: [subeStudentCount, temsilcilikStudentCount, hicBiriStudentCount],
                backgroundColor: [
                    '#7c560faa'
                ],
                borderColor: [
                    '#7c560f'
                ],
                borderWidth: 1,
            }
            ]
        }
        }
    );

    document.getElementById('merkezlerCanvas').onclick = function(evt) {
        const activePoints = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        const firstPoint = activePoints[0];
        
        if (firstPoint) {
            const label = chart.data.labels[firstPoint.index];
            const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            console.log(`Basılan tip: ${label}, Bulunan Öğrenci Sayısı: ${value}`);
            
            const studentsToDisplay = label === 'Şube' ? sube : label === 'Temsilcilik' ? temsilcilik : hicBiri;

            let redyStudents = [];

            studentsToDisplay.forEach(city => {
                city.value.forEach(student => {
                    if(student.sinif !== "Mezun"){
                        redyStudents.push({adsoyad: `${student.adsoyad}`, universite: `${student.universite}`, bolum: `${student.bolum}`, il: `${city.cityName}`, tel: `${student.tel}`, memleket: `${student.memleket}`});
                    }
                })
            });

            if(label === "Şube") {
                showStudentTable(redyStudents, "Şube İlleri Öğrenci Listesi");
            } else if(label === "Temsilcilik") {
                showStudentTable(redyStudents, "Temsilcilik İlleri Öğrenci Listesi");
            } else if(label === "Hiç Biri") {
                showStudentTable(redyStudents, `Merkezin Olmadığı İllerin Öğrenci Listesi`);
            }
        }
    };
};



function generateBursChart(students, DATA) {
    const bursAlanlar = [];
    const bursAlmayanlar = [];

    students.forEach(student => {
        if(student.burs === "Evet" && student.sinif !== "Mezun") {
            bursAlanlar.push(student);
        } else if (student.burs === "Hayır" && student.sinif !== "Mezun"){
            bursAlmayanlar.push(student);
        }
    })



    const bursChart = new Chart( 
        document.getElementById('bursCanvas'),
        {
            type: 'doughnut',
            data: {
                labels: [`Burs Alanlar (${bursAlanlar.length})`, `Burs Almayanlar (${bursAlmayanlar.length})`],
                datasets: [{
                    label: 'Öğrenci Sayısı',
                    data: [bursAlanlar.length, bursAlmayanlar.length],
                    backgroundColor: [
                        '#ffa600', 
                        '#58508d'  
                    ],
                    borderWidth: 1
                }]
            },
        }
    );

    document.getElementById('bursCanvas').onclick = function(evt) {

        const activePoints = bursChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        const firstPoint = activePoints[0];
        
        if (firstPoint) {
            const label = bursChart.data.labels[firstPoint.index];
            const value = bursChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

            console.log(`Tip: ${label}, Sayı: ${value}`);

            let redyStudents = [];

            DATA.forEach(city => {
                city.value.forEach((student) => {
                    let bursAliyormu = student.burs === "Evet" ? "Burs Alanlar" : "Burs Almayanlar";
                    if(label.includes(bursAliyormu) && student.sinif !== "Mezun") {
                        let il = "";

                        if(city.subeVarmi === "var") {
                            il = `${city.cityName}(Şube var)`;
                        } else if(city.temsilcilikVarmi === "var") {
                            il = `${city.cityName}(Temsilcilik var)`;
                        } else if(city.grubVarmi === "var") {
                            il = `${city.cityName}(Çalışma Grubu Var)`;
                        } else {
                            il = `${city.cityName}`;
                        }

                        redyStudents.push({adsoyad: `${student.adsoyad}`, universite: `${student.universite}`, bolum: `${student.bolum}`, il: `${il}`, tel: `${student.tel}`, memleket: `${student.memleket}`});
                    }
                })
            })

            if(label.includes("Burs Alanlar")) {
                showStudentTable(redyStudents, "Burs Alan Öğrenci Listesi");
            } else {
                showStudentTable(redyStudents, "Burs Almayan Öğrenci Listesi");
            }
        }
    };
};



function generateAkademikChart(students, DATA) {
    const akademikEvet = [];
    const akademikHayir = [];

    students.forEach(student => {
        if(student.akademik === "Evet" && student.sinif !== "Mezun") {
            akademikEvet.push(student);
        } else if (student.akademik === "Hayır" && student.sinif !== "Mezun"){
            akademikHayir.push(student);
        }
    })

    const akademikChart = new Chart( 
        document.getElementById('akademikCanvas'),
        {
            type: 'doughnut',
            data: {
                labels: [`Danışman Olabilen Öğrenciler (${akademikEvet.length})`, `Danışman Olamayan Öğrenciler (${akademikHayir.length})`],
                datasets: [{
                    label: 'Öğrenci Sayısı',
                    data: [akademikEvet.length, akademikHayir.length],
                    backgroundColor: [
                        '#3399FF',
                        '#FF5733'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
            }
        }
    );

    document.getElementById('akademikCanvas').onclick = function(evt) {
        const activePoints = akademikChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        const firstPoint = activePoints[0];
        
        if (firstPoint) {
            const label = akademikChart.data.labels[firstPoint.index];
            const value = akademikChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
    
            console.log(`Tip: ${label}, Sayı: ${value}`);

            let redyStudents = [];

            DATA.forEach(city => {
                city.value.forEach((student) => {
                    let olabilirmi = student.akademik === "Evet" ? "Olabilen" : "Olamayan";
                    if(label.includes(olabilirmi) && student.sinif !== "Mezun") {
                        let il = "";

                        if(city.subeVarmi === "var") {
                            il = `${city.cityName}(Şube var)`;
                        } else if(city.temsilcilikVarmi === "var") {
                            il = `${city.cityName}(Temsilcilik var)`;
                        } else if(city.grubVarmi === "var") {
                            il = `${city.cityName}(Çalışma Grubu Var)`;
                        } else {
                            il = `${city.cityName}`;
                        }

                        redyStudents.push({adsoyad: `${student.adsoyad}`, universite: `${student.universite}`, bolum: `${student.bolum}`, il: `${il}`, tel: `${student.tel}`, memleket: `${student.memleket}`});                  
                    }
                })
            })

            if(label.includes("Olabilen")) {
                showStudentTable(redyStudents, "Akademik Danışman Olabilen Öğrenci Listesi");
            } else {
                showStudentTable(redyStudents, "Akademik Danışman Olamayan Öğrenci Listesi");
            }
        }
    };
    

};




