document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // chặn sự kiện submid làm reset trang
  let name = document.querySelector("#name").value; //lấy giá trị của input#name
  //tạo ra một đối tượng:
  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
  };
  //   console.log(item);
  //hiển thị item lên giao diện: addItemToUI(item)
  addItemToUI(item);
  //lưu item vào localStorage: addItemToLS(item)
  addItemToLS(item);
});
// getList(): khi tạo hàm này sẽ nhận vào danh sách item
const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};
//hàm nhận vào item và hiển thị lên ui:
const addItemToUI = (item) => {
  let newCard = document.createElement("div");
  newCard.className =
    "card d-flex flex-row justify-content-between align-items-center p-2 mb-3";
  newCard.innerHTML = `
    <span>${item.name}</span>
    <button data-id="${item.id}" class="btn btn-danger btn-sm btn-remove">Remove</button>
  `;
  document.querySelector(".list").appendChild(newCard);
};

//hàm nhận item và lưu nó vào localStorage:
const addItemToLS = (item) => {
  //lấy từ localStorage về:
  let list = getList();
  //nhét item vào list:
  list.push(item);
  // lưu lên lại localStorage:
  localStorage.setItem("list", JSON.stringify(list));
};

// init: render ra các item của list:
const init = (item) => {
  //lấy ds từ list:
  let list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
};
init();
// remove:
document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    let nameItem = event.target.previousElementSibling.innerHTML;
    let isConfirmed = confirm(`ban co chac muon xoa item: ${nameItem} khong? `);
    if (isConfirmed) {
      //remove:
      let card = event.target.parentElement;
      card.remove();
      //ham xoa item trong list tu id cua item: removeItemFromLS(idRemove)
      let idRemove = event.target.dataset.id; //lay data-id cua btn-remove
      removeItemFromLS(idRemove);
    }
  }
});
const removeItemFromLS = (idRemove) => {
  //lay ds:
  let list = getList();
  //xoa item co id == remove:
  list = list.filter((item) => item.id != idRemove);
  //update new list -> localStorage:
  localStorage.setItem("list", JSON.stringify(list));
};
//remove all:
document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
  let isConfirmed = confirm("Ban co chac muon xoa tat ca khong?");
  if (isConfirmed) {
    //xoa het ui:
    document.querySelector(".list").innerHTML = "";
    //xoa het ls:
    localStorage.removeItem("list");
  }
});
//filter function:
document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = event.target.value; // lay gia tri cua o nhap
  let list = getList(); //lay ds cac item
  let filteredList = list.filter((item) => item.name.includes(inputValue));
  //loc ra item nao co name chua:
  document.querySelector(".list").innerHTML = "";
  filteredList.forEach((item) => {
    addItemToUI(item);
  });
});
