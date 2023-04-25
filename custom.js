let allMemo = JSON.parse(localStorage.getItem('allMemo'));
allMemo = allMemo ?? [];
render();

// 저장 버튼 클릭했을때
// 새로운 메모 추가, -> 로컬스토리지에 저장 -> render()호출
function saveNote() {
  const title = document.getElementById('title').value;
  const subText = document.getElementById('subText').value;
  const content = document.getElementById('content').value;

  // 유효성 검사
  if (title.length < 1 || subText.length < 1 || content.length < 1) {
    alert('다시 확인해주세요');
  } else {
    allMemo.push({ title, subText, content, len: allMemo.length });

    // 배열을 문자열로 변환한 뒤 저장
    localStorage.setItem('allMemo', JSON.stringify(allMemo));
    render();
  }
}

// 메모를 화면에 렌더링 하는 과정

function render() {
  const display = document.getElementById('display');
  display.innerHTML = '';

  for (let i = allMemo.length - 1; i >= 0; i--) {
    const item = allMemo[i];

    const saveArticle = document.createElement('article');
    const saveTitle = document.createElement('h2');
    const saveSubText = document.createElement('span');
    const saveContent = document.createElement('p');

    saveContent.classList.add('contentText');
    saveTitle.textContent = item.title;
    saveSubText.textContent = item.subText;
    saveContent.textContent = item.content;

    const deleteMemoBtn = document.createElement('button');
    deleteMemoBtn.textContent = '✅';
    deleteMemoBtn.setAttribute('id', item.len);
    deleteMemoBtn.setAttribute('onclick', 'remove(event)');

    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerHTML = '✏️';
    task_edit_el.setAttribute('id', item.len);

    display.appendChild(saveArticle);
    saveArticle.appendChild(saveTitle);
    saveArticle.appendChild(saveSubText);
    saveArticle.appendChild(saveContent);
    saveArticle.appendChild(deleteMemoBtn);
    saveArticle.appendChild(task_edit_el);

    task_edit_el.addEventListener('click', () => {
      const idx = allMemo.find((item) => item.len == event.srcElement.id);
      if (task_edit_el.innerText.toLowerCase() == '✏️') {
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

        task_edit_el.innerText = '💾';

        // Save 이벤트 핸들러
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
          task_edit_el.innerText = '✏️';

          // Save 이벤트 핸들러 삭제
          task_edit_el.removeEventListener('click', saveHandler);
        };

        task_edit_el.addEventListener('click', saveHandler);
      }
    });
  }
}

// 메모 삭제
function remove(e) {
  const target = e.target;
  const idx = allMemo.findIndex((item) => item.len == target.id);
  allMemo.splice(idx, 1);
  localStorage.setItem('allMemo', JSON.stringify(allMemo)); // 로컬 스토리지에서도 삭제
  render();
}

// color picker
const link = document.querySelector('.userPicker');
const root = document.querySelector(':root');

link.addEventListener('input', () => {
  const name = `--point-${link.dataset.id}`;
  root.style.setProperty(name, link.value);
});
