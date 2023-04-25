let myMemo = JSON.parse(localStorage.getItem('myMemo'));
myMemo = myMemo ?? [];
render();

// 저장 버튼 클릭했을때
// 새로운 메모 추가, -> 로컬스토리지에 저장 -> render()호출
function saveMemo() {
  const title = document.getElementById('title').value;
  const subText = document.getElementById('subText').value;
  const content = document.getElementById('content').value;

  // 유효성 검사
  if (title.length < 1 || subText.length < 1 || content.length < 1) {
    alert('다시 확인해주세요');
  } else {
    myMemo.push({ title, subText, content, len: myMemo.length });

    // 배열을 문자열로 변환한 뒤 저장
    localStorage.setItem('myMemo', JSON.stringify(myMemo));
    render();
  }
}

// 메모를 화면에 렌더링 하는 과정
function render() {
  const display = document.getElementById('display');
  display.innerHTML = '';

  for (let i = myMemo.length - 1; i >= 0; i--) {
    const item = myMemo[i];

    const saveArticle = document.createElement('article');
    const saveTitle = document.createElement('h2');
    const saveSubText = document.createElement('span');
    const saveContent = document.createElement('p');

    saveContent.classList.add('contentText');
    saveTitle.textContent = item.title;
    saveSubText.textContent = item.subText;
    saveContent.textContent = item.content;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✅';
    removeBtn.setAttribute('id', item.len);
    removeBtn.setAttribute('onclick', 'remove(event)');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '✏️';
    editBtn.setAttribute('id', item.len);

    display.appendChild(saveArticle);
    saveArticle.appendChild(saveTitle);
    saveArticle.appendChild(saveSubText);
    saveArticle.appendChild(saveContent);
    saveArticle.appendChild(removeBtn);
    saveArticle.appendChild(editBtn);

    editBtn.addEventListener('click', () => {
      const idx = myMemo.find((item) => item.len == event.srcElement.id);
      if (editBtn.innerText.toLowerCase() == '✏️') {
        const editTitle = document.createElement('input');
        const editSubTitle = document.createElement('input');
        const editTextArea = document.createElement('textarea');

        editTitle.value = idx.title;
        editSubTitle.value = idx.subText;
        editTextArea.value = idx.content;

        editTitle.setAttribute('id', `input1-${item.len}`);
        editSubTitle.setAttribute('id', `input2-${item.len}`);
        editTextArea.setAttribute('id', `textarea-${item.len}`);

        saveTitle.replaceWith(editTitle);
        saveSubText.replaceWith(editSubTitle);
        saveContent.replaceWith(editTextArea);

        editBtn.innerText = '💾';

        //
        const saveHandler = () => {
          const editedTitleContent = document.getElementById(
            `input1-${item.len}`
          ).value;
          const editedSubTitleContent = document.getElementById(
            `input2-${item.len}`
          ).value;
          const editedContent = document.getElementById(
            `textarea-${item.len}`
          ).value;

          idx.title = editedTitleContent;
          idx.subText = editedSubTitleContent;
          idx.content = editedContent;

          editTitle.replaceWith(saveTitle);
          editSubTitle.replaceWith(saveSubText);
          editTextArea.replaceWith(saveContent);

          saveTitle.innerText = editedTitleContent;
          saveSubText.innerText = editedSubTitleContent;
          saveContent.innerText = editedContent;
          editBtn.innerText = '✏️';

          // Save 이벤트 핸들러 삭제
          editBtn.removeEventListener('click', saveHandler);
        };

        editBtn.addEventListener('click', saveHandler);
      }
    });
  }
}

// 메모 삭제
function remove(e) {
  const target = e.target;
  const idx = myMemo.findIndex((item) => item.len == target.id);
  myMemo.splice(idx, 1);
  localStorage.setItem('myMemo', JSON.stringify(myMemo)); // 로컬 스토리지에서도 삭제
  render();
}

// color picker
const link = document.querySelector('.userPicker');
const root = document.querySelector(':root');

// 페이지 로드시 로컬 스토리지에서 색상값을 가져옴
Object.keys(localStorage).forEach((key) => {
  root.style.setProperty(key, localStorage.getItem(key));
});

link.addEventListener('input', () => {
  const name = `--point-${link.dataset.id}`;
  root.style.setProperty(name, link.value);
  // 사용자가 선택한 색상값을 로컬 스토리지에 저장함
  localStorage.setItem(name, link.value);
});

// toggle
var container = document.querySelector('#container');

container.addEventListener('mouseenter', function () {
  this.classList.remove('showTodoList');
  this.classList.add('hideTodoList');
});
container.addEventListener('mouseleave', function () {
  this.classList.add('showTodoList');
  this.classList.remove('hideTodoList');
});
