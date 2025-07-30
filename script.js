//localStorage.clear()
document.querySelectorAll("section").forEach(section => {
  section.addEventListener("click", function (e) { //mousedown
    const wave = document.createElement("div");
    wave.classList.add("wave");

    const rect = section.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
   
    wave.style.width = wave.style.height = `${size}px`;

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    section.appendChild(wave);

    wave.addEventListener("animationend", () => {
      wave.remove();
    });
  });
});



function createArticle(date, position, company, ...descriptions){

  const article = document.createElement('article');
  article.className = 'miniExperienceBox';
  article.innerHTML = `
            <textarea rows="1" class="editText-regular" style="width: 100%;">${date}</textarea>
            <div class="Experience-big" style="width: 100%;">
                <div class="Experience-main">
                    <textarea rows="1" class="editText-medium">${position}</textarea>
                    <textarea rows="1" class="editText-regular">${company}</textarea>
                </div>
                <ul style="width: 100%;">
                     ${descriptions.map(desc => `
                        <li style="width: 100%;">
                            <textarea rows="1" class="editText-regular" style="width:100%;">${desc}</textarea>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        return article;
    
}

function createEduArticle(date, name, description, company){
  const article = document.createElement('article');
  article.className = 'miniEduBox';
  article.innerHTML = `<textarea rows="1" class="editText-medium">${date}</textarea>
                <div class="center-miniEdu">
                  <textarea rows="1" class="editText-medium">${name}</textarea>
                  <textarea rows="1" class="editText-regular">${description}</textarea>
                </div>
                <textarea rows="1" class="editText-regular"">${company}</textarea>`
  return article;
}

function createInterestInput(name){
   const input = document.createElement('input');
    input.type = "text"; // Устанавливаем тип input
    input.className = "editText-regular"; // Устанавливаем класс
    input.value = name; // Устанавливаем значение

    return input;
}

function addArticle(htmlClass, fun){
  const container = document.querySelector(htmlClass);
  //const newArt1=createArticle('2017 - Present', 'Graphic / Web designer', 'Freelance', 'Development of internal projects from scratch, product design of brands ', 'Coordinating with outside agencies, art services, web designer, marketing, printers, and colleagues as necessary.','Landing page, webapps and hybrid apps')
  const newArt=fun;

  container.append(newArt);
}

addArticle('.articles-container', createArticle('2017 - Present', 'Graphic / Web designer', 'Freelance', 'Development of internal projects from scratch, product design of brands ', 'Coordinating with outside agencies, art services, web designer, marketing, printers, and colleagues as necessary.','Landing page, webapps and hybrid apps'));
addArticle('.articles-container', createArticle('Sep. 2021 - Jun. 2023','Legal Assistant','Law Firm | Intern','Provide administrative support to lawyer and enhance office effectiveness', 'repare case briefs and summarize depositions, interrogatories and testimony','Handle communication with clients, witnesses etc.'));


addArticle('.articles-container-edu', createEduArticle('2017 - 2022', 'Law', '#law #legalStudies #contracts #internationalLaws', 'University of Kerala'));
addArticle('.articles-container-edu', createEduArticle('2017','Graphic design','#branding #web #illustration #adobe','Coursrea'));


addArticle('.articles-container-interest',createInterestInput('branding'))
addArticle('.articles-container-interest',createInterestInput('design'))
addArticle('.articles-container-interest',createInterestInput('photography'))
addArticle('.articles-container-interest',createInterestInput('artificial intelligence'))
addArticle('.articles-container-interest',createInterestInput('illustration'))
addArticle('.articles-container-interest',createInterestInput('typography'))
addArticle('.articles-container-interest',createInterestInput('social networks'))
addArticle('.articles-container-interest',createInterestInput('research'))
addArticle('.articles-container-interest',createInterestInput('dron pilot'))
addArticle('.articles-container-interest',createInterestInput('games'))



const textareas = document.querySelectorAll('textarea');
const inputs=document.querySelectorAll('input');

function changeInputWidth(input) {

  if (input.classList.contains('volume')) {
        return;
    }

        // Создаем временный span для измерения ширины текста
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden'; // Скрываем элемент
        tempSpan.style.whiteSpace = 'pre'; // Учитываем пробелы
        tempSpan.style.font = window.getComputedStyle(input).font; // Устанавливаем шрифт input
        tempSpan.innerText = input.value || input.placeholder; // Учитываем текущее значение или плейсхолдер
        document.body.appendChild(tempSpan); // Добавляем временный элемент в DOM

        // Устанавливаем ширину input в зависимости от ширины tempSpan
        input.style.width = `${tempSpan.offsetWidth + 30}px`; // Устанавливаем ширину с небольшим запасом
       
        document.body.removeChild(tempSpan); // Удаляем временный элемент
    }


 function changeHeight(textarea) {
    textarea.style.height = 'auto'; // Сбрасываем высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем новую высоту
    console.log(textarea.textContent, textarea.style.height)
}

document.addEventListener('DOMContentLoaded', function() {
    // Находим все textarea

window.addEventListener('resize', function() {
    document.querySelectorAll('textarea').forEach(textarea => {
        changeHeight(textarea);
    });
});


textareas.forEach((textarea, index) => {
    textarea.addEventListener('input', function() {
        localStorage.setItem(`textarea-${index}`, this.value);
        changeHeight(this);
    });
    // Устанавливаем начальную высоту
    changeHeight(textarea); 
});
inputs.forEach((input, index) => {
      input.addEventListener('input', function() {
          localStorage.setItem(`input-${index}`, this.value); // Сохраняем значение в localStorage
          changeInputWidth(this); // Обновляем высоту при вводе
      });
      changeInputWidth(input); // Устанавливаем начальную высоту
  });

        textareas.forEach((textarea, index) => {
      
        const savedText = localStorage.getItem(`textarea-${index}`);

        if (savedText) {
            textarea.value = savedText;
            changeHeight(textarea);
        }
    });

    inputs.forEach((input, index) => {
      
        const savedText = localStorage.getItem(`input-${index}`);
   
        if (savedText) {
            input.value = savedText;
            changeInputWidth(input); // Устанавливаем высоту после загрузки
        }
    });

});
/*
window.addEventListener('resize', function() {
    document.querySelectorAll('textarea').forEach(textarea => {
        changeHeight(textarea);
    });
});


textareas.forEach((textarea, index) => {
    textarea.addEventListener('input', function() {
        localStorage.setItem(`textarea-${index}`, this.value);
        changeHeight(this);
    });
    // Устанавливаем начальную высоту
    changeHeight(textarea); 
});
inputs.forEach((input, index) => {
      input.addEventListener('input', function() {
          localStorage.setItem(`input-${index}`, this.value); // Сохраняем значение в localStorage
          changeInputWidth(this); // Обновляем высоту при вводе
      });
      changeInputWidth(input); // Устанавливаем начальную высоту
  });




function loadData() {
    textareas.forEach((textarea, index) => {
      
        const savedText = localStorage.getItem(`textarea-${index}`);

        if (savedText) {
            textarea.value = savedText;
            changeHeight(textarea);
        }
    });

    inputs.forEach((input, index) => {
      
        const savedText = localStorage.getItem(`input-${index}`);
   
        if (savedText) {
            input.value = savedText;
            changeInputWidth(input); // Устанавливаем высоту после загрузки
        }
    });

}

loadData()


*/

/*
function resizeInput(input) {
  const mirror = input.nextElementSibling;
  mirror.textContent = input.value || input.placeholder || '';
  input.style.width = mirror.offsetWidth + 'px';
}
*/



// Подгоняем ширину при загрузке

function changeForPDF(container) {
  // Добавляем margin-bottom: 20px для всех <section>
  container.className='pdf-edit'

  container.querySelectorAll('section').forEach(section => {
    if (section.className!=='imgBox'){
      
       section.style.padding='15px';
    }
    section.style.marginBottom = '20px';
    
  });

  // Заменяем все <textarea> и <input> визуальными div
  container.querySelectorAll('textarea, input').forEach(el => {
    const type = el.getAttribute('type');

    // Если это <input type="range"> — заменяем на полоску
    if (type === 'range' || el.classList.contains('volume')) {
      const visualBar = document.createElement('div');
      visualBar.setAttribute('div-for-pdf', 'true');
      visualBar.style.width = '90%';
      visualBar.style.height = '6px';
      visualBar.style.background = '#ccc';
      visualBar.style.borderRadius = '3px';
      visualBar.style.marginTop = '6px';
      visualBar.style.position = 'relative';

      const filled = document.createElement('div');
      filled.style.width = `${el.value}%`;
      filled.style.height = '100%';
      filled.style.background = 'rgb(150, 150, 210)';
      filled.style.borderRadius = '3px';

      visualBar.appendChild(filled);
      el.style.display = 'none';
      el.parentNode.insertBefore(visualBar, el.nextSibling);
      return;
    }

    // Обработка обычного <input type="text"> и <textarea>
    const div = document.createElement('div');
    div.textContent = el.value || el.textContent || el.innerText;
    div.className = el.className;
    div.style.cssText = el.style.cssText;
    div.style.overflow = 'hidden';
    div.contentEditable = "false";
    div.setAttribute('div-for-pdf', 'true');

    // Если у textarea были размеры — применим их
    if (el.tagName === 'TEXTAREA') {
      div.style.height = `${el.scrollHeight}px`;
    }

    el.style.display = 'none';
    el.parentNode.insertBefore(div, el.nextSibling);
  });
}


  



function deleteChangePDF(container) {
  container.className='content'
  container.querySelectorAll('[div-for-pdf]').forEach(div => {
    const prev = div.previousSibling;
    if (prev && (prev.tagName === 'TEXTAREA' || prev.tagName === 'INPUT')) {
      prev.style.display = '';
    }
    div.remove();

      container.querySelectorAll('.volume').forEach(range => {
    const next = range.nextElementSibling;
    if (
      next &&
      next.hasAttribute('div-for-pdf') &&
      next.querySelector('div') // это внутренний filled элемент
    ) {
      next.remove();
      range.style.display = '';
    }
  });

    container.querySelectorAll('section').forEach(section => {
    section.style.marginBottom = '';
  });
  });

}

document.getElementById("download").addEventListener("click", function () {
  alert('Подтвердите скачивание файла. Это займет немного времени')
  const container = document.getElementById("content");

  changeForPDF(container);

  html2canvas(container, {
    scale: 3.125,
    useCORS: true,
    logging: true,
    windowWidth: container.scrollWidth,
    windowHeight: container.scrollHeight,
  }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF("p", "pt", "a4");

    const pageWidth = 595*0.90;
    const imgWidth = pageWidth;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    let position = 0;

    
    const x = (imgWidth ) / 2;
    const y = (imgHeight ) / 2;

    pdf.addImage(imgData, "PNG", 30, 30, imgWidth, imgHeight);

    pdf.save("resume.pdf");

    // Восстанавливаем исходные input и textarea
    deleteChangePDF(container);
  });
});


//const container = document.getElementById("content")
//changeForPDF(container); 



/*
function cloneContentForPDF(originalElement) {
  const clone = originalElement.cloneNode(true);

  // Заменим все textarea на div с их текстом
  clone.querySelectorAll('textarea').forEach(textarea => {
    const div = document.createElement('div');
    div.style.cssText = getComputedStyle(textarea).cssText;
    div.style.whiteSpace = 'pre-wrap';
    div.style.wordWrap = 'break-word';
    div.textContent = textarea.value;
    textarea.parentNode.replaceChild(div, textarea);
  });

  // Заменим все input[type="text"] на div
  clone.querySelectorAll('input[type="text"]').forEach(input => {
    const div = document.createElement('div');
    div.style.cssText = getComputedStyle(input).cssText;
    div.style.whiteSpace = 'pre-wrap';
    div.style.wordWrap = 'break-word';
    div.textContent = input.value;
    input.parentNode.replaceChild(div, input);
  });

  return clone;
}

document.getElementById('download').addEventListener('click', () => {
  const original = document.getElementById('content');
  const printContainer = document.createElement('div');
  printContainer.id = 'print-area';

  // добавим стили
  printContainer.style.width = '210mm';
  printContainer.style.minHeight = '297mm';
  printContainer.style.padding = '10mm';
  printContainer.style.boxSizing = 'border-box';
  printContainer.style.background = 'white';

  const cloned = cloneContentForPDF(original);
  printContainer.appendChild(cloned);
  document.body.appendChild(printContainer);

  document.fonts.ready.then(() => {
    html2canvas(original, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    }).then(canvas => {
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('resume.pdf');

      // удалим клон
      document.body.removeChild(printContainer);
    });
  });
});
*/ 