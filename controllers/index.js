var arrNhanVien = [];
document.querySelector("#btnThemNV").onclick = function (e) {
  e.preventDefault();
  var nhanVienNew = new NhanVien();
  nhanVienNew.tkNhanVien = document.querySelector("#tknv").value;
  nhanVienNew.tenNhanVien = document.querySelector("#name").value;
  nhanVienNew.email = document.querySelector("#email").value;
  nhanVienNew.matKhau = document.querySelector("#password").value;
  nhanVienNew.ngayLam = document.querySelector("#datepicker").value;
  nhanVienNew.luongCoBan = document.querySelector("#luongCB").value;
  nhanVienNew.gioLam = document.querySelector("#gioLam").value;

  // Tính tổng lương
  var tongLuong = "";
  if (nhanVienNew.chucVu === "Sếp") {
    tongLuong = nhanVienNew.luongCoBan * 3;
  } else if (nhanVienNew.chucVu === "Trưởng phòng") {
    tongLuong = nhanVienNew.luongCoBan * 2;
  } else {
    tongLuong = nhanVienNew.luongCoBan * 1;
  }
  nhanVienNew.tongLuong += tongLuong.toLocaleString();

  // Xếp loại nhân viên
  var xepLoai = "";
  if (nhanVienNew.gioLam >= 192) {
    xepLoai = "Xuất sắc";
  } else if (nhanVienNew.gioLam >= 176) {
    xepLoai = "Giỏi";
  } else if (nhanVienNew.gioLam >= 160) {
    xepLoai = "Khá";
  } else {
    xepLoai = "Trung Bình";
  }
  nhanVienNew.xepLoai = xepLoai;

  console.log(nhanVienNew);
  arrNhanVien.push(nhanVienNew);
  console.log(arrNhanVien);
  renderTableNhanVien(arrNhanVien);
  localStoreArr();
};

function renderTableNhanVien(arrNhanVien) {
  var outputHTML = "";
  for (var index = 0; index < arrNhanVien.length; index++) {
    var nhanVien = arrNhanVien[index];
    outputHTML += `
          <tr>
              <td>${nhanVien.tkNhanVien}</td>
              <td>${nhanVien.tenNhanVien}</td>
              <td>${nhanVien.email}</td>
              <td>${nhanVien.ngayLam}</td>
              <td>${nhanVien.loaiNhanVien}</td>
              <td>${nhanVien.tongLuong}</td>
              <td>${nhanVien.xepLoai}</td>
              <td>
                  <button class="btn btn-danger" onclick="xoaNhanVien('${index}')">Xoá</button>
                  <button class="btn btn-primary mx-2 btn-sua" onclick="suaNhanVien('${index}')">Sửa</button>
              </td>
          </tr>
      `;
  }
  document.querySelector("#tableDanhSach").innerHTML = outputHTML;
}

function xoaNhanVien(indexDel) {
  arrNhanVien.splice(indexDel, 1);
  //Sau khi xoá thì tạo lại table
  renderTableNhanVien(arrNhanVien);
}

function suaNhanVien(indexEdit) {
  var nvEdit = arrNhanVien[indexEdit];
  console.log(indexEdit);
  console.log(nvEdit);
  document.querySelector("#tknv").value = nvEdit.tkNhanVien;
  document.querySelector("#name").value = nvEdit.tenNhanVien;
  document.querySelector("#email").value = nvEdit.email;
  document.querySelector("#datepicker").value = nvEdit.ngayLam;
  document.querySelector("#luongCB").value = nvEdit.luongCoBan;
  document.querySelector("#chucvu").value = nvEdit.loaiNhanVien;

  // Pop up lại giao diện input
  var showInput = document.querySelector("#myModal");
  showInput.setAttribute("style", "display: block; padding-right: 17px;");
  showInput.classList.add("show");

  var showInputb = document.querySelector("body");
  showInputb.setAttribute("style", "padding-right: 17px;");
  showInputb.classList.add("modal-open");
}

//Phương thức lưu vào application storage
function localStoreArr() {
  //Chuyển arr về chuỗi
  var strNhanVien = JSON.stringify(arrNhanVien); // '[{},{},{}]'
  //Lưu string vào storage
  localStorage.setItem("arrNhanVien", strNhanVien);
}

//Phương thức lấy dữ liệu từ localstorage
function getStore(name) {
  if (localStorage.getItem(name)) {
    //Nếu có storage name đó thì mới đi vào if
    var str = localStorage.getItem(name);
    var jsonValue = JSON.parse(str);

    console.log("jsonValue", jsonValue);
    return jsonValue;
  }
  return null;
}

window.onload = function () {
  //Sự kiện khi windown load xong html css js
  //Khi trang web load lên thì lấy dữ liệu từ storage arrSinhVien nếu có thì gán vào
  if (getStore("arrNhanVien")) {
    //Lấy ra
    arrNhanVien = getStore("arrNhanVien");
    //Tạo table
    renderTableNhanVien(arrNhanVien);
  }
};
