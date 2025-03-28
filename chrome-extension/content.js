document.addEventListener('mouseup', () => {
  console.log("mouseup イベントが発火した");

  let selectedText = window.getSelection().toString();
  console.log("取得した単語:", selectedText);

  if (selectedText) {
    let count = parseInt(localStorage.getItem(selectedText), 10) || 0;
    console.log("Current count", count);

    if (count > 0) {
      console.log(`A列から${selectedText}を削除`);
      localStorage.removeItem(selectedText);
      updateColumnA();
    }

    count++;
    localStorage.setItem(selectedText, count);
    console.log(`${selectedText}の選択回数: ${count}`);
    
    let column = "";
    if (count === 1) {
      column = "A";
    } else if (count === 2) {
      column = "B";
    } else if (count === 3) {
      column = "C";
    } else if (count === 4) {
      column = "D";
    } else if (count === 5) {
      column = "E";
    } else if (count === 6) {
      column = "F";
    } else if (count === 7) {
      column = "G";
    } else if (count === 8) {
      column = "H";
    } else if (count === 9) {
      column = "I";
    } else if (count === 10) {
      column = "J";
    }

    console.log(`単語 '${selectedText}' の列: ${column}`);
    
    chrome.runtime.sendMessage({ type: "SELECTED_TEXT", text: selectedText, count: count, column: column});
  } else {
    console.log("単語が選択されていません");
  }
});

function ensureColumnAExists() {
  let columnAElement = document.getElementById("columnA");
  if (!columnAElement) {
    columnAElement = document.createElement("div");
    columnAElement.id = "columnA";
    columnAElement.style.top = "10px";
    columnAElement.style.right = "10px";
    columnAElement.style.background = "white";
    columnAElement.style.padding = "10px";
    columnAElement.style.border = "1px solid black";
    document.body.appendChild(columnAElement);
  }
}

function updateColumnA() {
  ensureColumnAExists();

  let columnAElement = document.getElementById("columnA");
  console.log("A列の現在の内容（更新前）:", columnAElement.innerHTML);
  
  columnAElement.innerHTML = "";

  console.log("localStorageの全データ:", JSON.stringify(localStorage, null, 2));

  for (let key in localStorage) {
    if (localStorage.getItem(key) === "1") {
      let item = document.createElement("div");
      item.textContent = key;
      columnAElement.appendChild(item);
    }
  }

  console.log("A列の現在の内容（更新後）:", columnAElement.innerHTML);
}