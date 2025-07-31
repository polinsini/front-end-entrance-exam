
document.querySelectorAll('section').forEach((section) => {
  section.addEventListener('click', function (e) {
    //mousedown
    const wave = document.createElement('div');
    wave.classList.add('wave');

    const rect = section.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    wave.style.width = wave.style.height = `${size}px`;

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    section.appendChild(wave);

    wave.addEventListener('animationend', () => {
      wave.remove();
    });
  });
});

function createArticle(date, position, company, ...descriptions) {
  const article = document.createElement('article');
  article.className = 'miniExperienceBox';
  article.innerHTML = `
            <textarea rows="1" class="editText-regular" style="width: 100%;">${date}</textarea>
            <div class="Experience-big" style="width: 100%;">
                <div class="Experience-main">
                    <textarea rows="1" class="editText-medium">${position}</textarea>
                    <textarea rows="1" class="editText-regular">${company}</textarea>
                </div>
                <ul style="width: 100%;" class="ul-edit">
                     ${descriptions
                       .map(
                         (desc) => `
                        <li style="width: 100%; margin-left: auto;" contenteditable="true" class="editText-regular">
                            ${desc}
                        </li>
                    `,
                       )
                       .join('')}
                </ul>
            </div>
        `;
  return article;
}

function createEduArticle(date, name, description, company) {
  const article = document.createElement('article');
  article.className = 'miniEduBox';
  article.innerHTML = `<textarea rows="1" class="editText-medium">${date}</textarea>
                <div class="center-miniEdu">
                  <textarea rows="1" class="editText-medium">${name}</textarea>
                  <textarea rows="1" class="editText-regular">${description}</textarea>
                </div>
                <textarea rows="1" class="editText-regular"">${company}</textarea>`;
  return article;
}

function createInterestInput(name) {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'editText-regular';
  input.value = name;

  return input;
}

function addArticle(htmlClass, fun) {
  const container = document.querySelector(htmlClass);
  //const newArt1=createArticle('2017 - Present', 'Graphic / Web designer', 'Freelance', 'Development of internal projects from scratch, product design of brands ', 'Coordinating with outside agencies, art services, web designer, marketing, printers, and colleagues as necessary.','Landing page, webapps and hybrid apps')
  const newArt = fun;

  container.append(newArt);
}

addArticle(
  '.experienceBox',
  createArticle(
    '2017 - Present',
    'Graphic / Web designer',
    'Freelance',
    'Development of internal projects from scratch, product design of brands ',
    'Coordinating with outside agencies, art services, web designer, marketing, printers, and colleagues as necessary.',
    'Landing page, webapps and hybrid apps',
  ),
);
addArticle(
  '.experienceBox',
  createArticle(
    'Sep. 2021 - Jun. 2023',
    'Legal Assistant',
    'Law Firm | Intern',
    'Provide administrative support to lawyer and enhance office effectiveness',
    'repare case briefs and summarize depositions, interrogatories and testimony',
    'Handle communication with clients, witnesses etc.',
  ),
);

addArticle(
  '.articles-container-edu',
  createEduArticle(
    '2017 - 2022',
    'Law',
    '#law #legalStudies #contracts #internationalLaws',
    'University of Kerala',
  ),
);
addArticle(
  '.articles-container-edu',
  createEduArticle('2017', 'Graphic design', '#branding #web #illustration #adobe', 'Coursrea'),
);

addArticle('.articles-container-interest', createInterestInput('branding'));
addArticle('.articles-container-interest', createInterestInput('design'));
addArticle('.articles-container-interest', createInterestInput('photography'));
addArticle('.articles-container-interest', createInterestInput('artificial intelligence'));
addArticle('.articles-container-interest', createInterestInput('illustration'));
addArticle('.articles-container-interest', createInterestInput('typography'));
addArticle('.articles-container-interest', createInterestInput('social networks'));
addArticle('.articles-container-interest', createInterestInput('research'));
addArticle('.articles-container-interest', createInterestInput('dron pilot'));
addArticle('.articles-container-interest', createInterestInput('games'));

const textareas = document.querySelectorAll('textarea');
const inputs = document.querySelectorAll('input');

function changeInputWidth(input) {
  if (input.classList.contains('volume')) {
    return;
  }

  const tempSpan = document.createElement('span');
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.whiteSpace = 'pre';
  tempSpan.style.font = window.getComputedStyle(input).font;
  tempSpan.innerText = input.value || input.placeholder;
  document.body.appendChild(tempSpan);

  input.style.width = `${tempSpan.offsetWidth + 30}px`;
  document.body.removeChild(tempSpan);
}

function changeHeight(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

window.addEventListener('resize', function () {
  document.querySelectorAll('textarea').forEach((textarea) => {
    changeHeight(textarea);
  });
});

textareas.forEach((textarea, index) => {
  textarea.addEventListener('input', function () {
    localStorage.setItem(`textarea-${index}`, this.value);
    changeHeight(this);
  });

  changeHeight(textarea);
});
inputs.forEach((input, index) => {
  input.addEventListener('input', function () {
    localStorage.setItem(`input-${index}`, this.value);
    changeInputWidth(this);
  });
  changeInputWidth(input);
});

document.addEventListener('DOMContentLoaded', function () {
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
      changeInputWidth(input);
    }
  });
});

const lists = document.querySelectorAll('.ul-edit');
console.log(lists.type);
lists.forEach((list) =>
  list.addEventListener('keydown', function (e) {
    const currentItem = e.target;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentItem.textContent.trim()) {
        const newItem = document.createElement('li');
        newItem.className = 'editText-regular';
        newItem.contentEditable = true;
        currentItem.after(newItem);
        newItem.focus();
      }
    }

    if (e.key === 'Backspace' && !currentItem.textContent && list.children.length > 1) {
      e.preventDefault();
      const prevItem = currentItem.previousElementSibling;
      currentItem.remove();
      prevItem.focus();
    }
  }),
);

function changeForPDF(container) {
  container.className = 'pdf-edit';

  container.querySelectorAll('section').forEach((section) => {
    if (section.className !== 'imgBox') {
      section.style.padding = '15px';
    }
    section.style.marginBottom = '20px';
  });

  container.querySelectorAll('textarea, input').forEach((el) => {
    if (el.tagName === 'TEXTAREA') {
      changeHeight(el);
    }

    if (el.classList.contains('volume')) {
      const visualBar = document.createElement('div');
      visualBar.setAttribute('div-for-pdf', 'true');
      visualBar.style.width = '70%';
      visualBar.style.height = '6px';
      visualBar.style.background = 'gray';
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

    const div = document.createElement('div');
    div.textContent = el.value || el.textContent || el.innerText;
    div.className = el.className;
    div.style.backgroundColor = el.style.backgroundColor;
    div.style.cssText = el.style.cssText;
    div.style.overflow = 'hidden';
    div.contentEditable = 'false';

    div.setAttribute('div-for-pdf', 'true');
    /*
    if (el.tagName === 'TEXTAREA') {
      div.style.height = `${el.scrollHeight}px`;
    }
*/
    el.style.display = 'none';
    el.parentNode.insertBefore(div, el.nextSibling);
  });
}

function deleteChangePDF(container) {
  container.className = 'content';
  container.querySelectorAll('[div-for-pdf]').forEach((div) => {
    const prev = div.previousSibling;
    if (prev && (prev.tagName === 'TEXTAREA' || prev.tagName === 'INPUT')) {
      prev.style.display = '';
    }
    div.remove();

    container.querySelectorAll('.volume').forEach((range) => {
      const next = range.nextElementSibling;
      if (next && next.hasAttribute('div-for-pdf') && next.querySelector('div')) {
        next.remove();
        range.style.display = '';
      }
    });

    container.querySelectorAll('section').forEach((section) => {
      section.style.marginBottom = '';
    });
  });
}
import html2canvas from 'html2canvas';
//import { jsPDF } from 'jspdf';

document.getElementById('download').addEventListener('click', function () {
  alert('Подтвердите скачивание файла. Это займет немного времени');
  const container = document.getElementById('content');

  changeForPDF(container);

  html2canvas(container, {
    scale: 3.125,
    useCORS: true,
    logging: true,
    windowWidth: container.scrollWidth,
    windowHeight: container.scrollHeight,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    /* global jspdf */
    const pdf = new jspdf.jsPDF('p', 'pt', 'a4');

    const pageWidth = 595 * 0.9;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 30, 30, imgWidth, imgHeight);

    pdf.save('resume.pdf');

    deleteChangePDF(container);
  });
});
