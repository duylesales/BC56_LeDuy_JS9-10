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
  nhanVienNew.chucVu = document.querySelector("#chucvu").value;
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

  //kiểm tra không được để trống
  var valid =
    validation.kiemTraRong(nhanVienNew.tkNhanVien, "taiKhoan") &
    validation.kiemTraRong(nhanVienNew.tenNhanVien, "hoVaTen") &
    validation.kiemTraRong(nhanVienNew.email, "email") &
    validation.kiemTraRong(nhanVienNew.matKhau, "matKhau") &
    validation.kiemTraRong(nhanVienNew.ngayLam, "ngayThang") &
    validation.kiemTraRong(nhanVienNew.luongCoBan, "luongCoBan") &
    validation.kiemTraRong(nhanVienNew.chucVu, "chucVu") &
    validation.kiemTraRong(nhanVienNew.gioLam, "gioLam");
  //kiểm tra độ dài
  valid =
    valid &
    validation.kiemTraDoDai(nhanVienNew.tkNhanVien, "taiKhoan", 4, 6) &
    validation.kiemTraDoDai(nhanVienNew.matKhau, "matKhau", 6, 10);
  //kiểm tra ký tự
  valid =
    valid & validation.kiemTraTatCaKyTu(nhanVienNew.tenNhanVien, "hoVaTen");
  //kiểm tra email
  valid = valid & validation.kiemTraEmail(nhanVienNew.email, "email");
  //kiểm tra giá trị
  valid =
    valid &
    validation.kiemTraGiaTri(
      nhanVienNew.luongCoBan,
      "luongCoBan",
      1000000,
      20000000
    ) &
    validation.kiemTraGiaTri(nhanVienNew.gioLam, "gioLam", 80, 200);
  //kiểm tra chức vụ
  valid = valid & validation.kiemTraChucVu(nhanVienNew.chucVu, "chucVu");
  //kiểm tra mật khẩu
  valid = valid & validation.kiemTraPassword(nhanVienNew.matKhau, "matKhau");

  if (!valid) {
    return;
  }

  arrNhanVien.push(nhanVienNew);
  renderTableNhanVien(arrNhanVien);
  // Lưu local
  localStoreArr();
  // Reset form
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "Chọn chức vụ";
  document.querySelector("#gioLam").value = "";
};

document.querySelector("#btnThem").onclick = function () {
  document.querySelector("#btnCapNhat").hidden = true;
  document.querySelector("#btnThemNV").hidden = false;
  document.querySelector("#btnThemNV").disabled = false;
  document.querySelector("#btnDong").hidden = false;
  document.querySelector("#btnDong").disabled = false;
};

document.querySelector("#btnDong").onclick = function () {
  document.querySelector("#btnCapNhat").disabled = false;
  document.querySelector("#btnCapNhat").hidden = false;
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
              <td>${nhanVien.chucVu}</td>
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
  localStoreArr();
}

function suaNhanVien(indexEdit) {
  document.querySelector("#btnCapNhat").hidden = false;
  document.querySelector("#btnThemNV").hidden = true;
  document.querySelector("#btnDong").hidden = true;
  var nvEdit = arrNhanVien[indexEdit];
  console.log(indexEdit);
  console.log(nvEdit);
  document.querySelector("#tknv").value = nvEdit.tkNhanVien;
  document.querySelector("#name").value = nvEdit.tenNhanVien;
  document.querySelector("#email").value = nvEdit.email;
  document.querySelector("#password").value = nvEdit.matKhau;
  document.querySelector("#datepicker").value = nvEdit.ngayLam;
  document.querySelector("#luongCB").value = nvEdit.luongCoBan;
  document.querySelector("#chucvu").value = nvEdit.chucVu;
  document.querySelector("#gioLam").value = nvEdit.gioLam;

  // Pop up lại giao diện input
  var showInput = document.querySelector("#myModal");
  showInput.setAttribute("style", "display: block; padding-right: 17px;");
  showInput.classList.add("show");

  var showInputb = document.querySelector("body");
  showInputb.setAttribute("style", "padding-right: 17px;");
  showInputb.classList.add("modal-open");

  // var btnDong = document.querySelector("#btnDong");
  // btnDong.setAttribute("style", "padding: 10px;border:none;");
  // btnDong.classList.add("close");
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
    var str = localStorage.getItem(name);
    var jsonValue = JSON.parse(str);

    console.log("jsonValue", jsonValue);
    return jsonValue;
  }
  return null;
}

document.querySelector("#btnCapNhat").onclick = function () {
  var nhanVienUpdate = new NhanVien();
  nhanVienUpdate.tkNhanVien = document.querySelector("#tknv").value;
  nhanVienUpdate.tenNhanVien = document.querySelector("#name").value;
  nhanVienUpdate.email = document.querySelector("#email").value;
  nhanVienUpdate.matKhau = document.querySelector("#password").value;
  nhanVienUpdate.ngayLam = document.querySelector("#datepicker").value;
  nhanVienUpdate.luongCoBan = document.querySelector("#luongCB").value;
  nhanVienUpdate.chucVu = document.querySelector("#chucvu").value;
  nhanVienUpdate.gioLam = document.querySelector("#gioLam").value;

  // Validation sau khi nhận được các giá trị cập nhật
  var valid =
    validation.kiemTraRong(nhanVienUpdate.tkNhanVien, "taiKhoan") &
    validation.kiemTraRong(nhanVienUpdate.tenNhanVien, "hoVaTen") &
    validation.kiemTraRong(nhanVienUpdate.email, "email") &
    validation.kiemTraRong(nhanVienUpdate.matKhau, "matKhau") &
    validation.kiemTraRong(nhanVienUpdate.ngayLam, "ngayThang") &
    validation.kiemTraRong(nhanVienUpdate.luongCoBan, "luongCoBan") &
    validation.kiemTraRong(nhanVienUpdate.chucVu, "chucVu") &
    validation.kiemTraRong(nhanVienUpdate.gioLam, "gioLam");
  //kiểm tra độ dài
  valid =
    valid &
    validation.kiemTraDoDai(nhanVienUpdate.tkNhanVien, "taiKhoan", 4, 6) &
    validation.kiemTraDoDai(nhanVienUpdate.matKhau, "matKhau", 6, 10);
  //kiểm tra ký tự
  valid =
    valid & validation.kiemTraTatCaKyTu(nhanVienUpdate.tenNhanVien, "hoVaTen");
  //kiểm tra email
  valid = valid & validation.kiemTraEmail(nhanVienUpdate.email, "email");
  //kiểm tra giá trị
  valid =
    valid &
    validation.kiemTraGiaTri(
      nhanVienUpdate.luongCoBan,
      "luongCoBan",
      1000000,
      20000000
    ) &
    validation.kiemTraGiaTri(nhanVienUpdate.gioLam, "gioLam", 80, 200);
  //kiểm tra chức vụ
  valid = valid & validation.kiemTraChucVu(nhanVienUpdate.chucVu, "chucVu");
  //kiểm tra mật khẩu
  valid = valid & validation.kiemTraPassword(nhanVienUpdate.matKhau, "matKhau");

  if (!valid) {
    return;
  }

  var tongLuong = "";
  if (nhanVienUpdate.chucVu === "Sếp") {
    tongLuong = nhanVienUpdate.luongCoBan * 3;
  } else if (nhanVienUpdate.chucVu === "Trưởng phòng") {
    tongLuong = nhanVienUpdate.luongCoBan * 2;
  } else {
    tongLuong = nhanVienUpdate.luongCoBan * 1;
  }
  nhanVienUpdate.tongLuong = tongLuong.toLocaleString();

  //kiểm tra xếp loại của nhân viên
  var xepLoai = "";
  if (nhanVienUpdate.gioLam >= 192) {
    xepLoai = "Xuất sắc";
  } else if (nhanVienUpdate.gioLam >= 176) {
    xepLoai = "Giỏi";
  } else if (nhanVienUpdate.gioLam >= 160) {
    xepLoai = "Khá";
  } else {
    xepLoai = "Trung Bình";
  }
  nhanVienUpdate.xepLoai = xepLoai;

  for (index = 0; index < arrNhanVien.length; index++) {
    if (arrNhanVien[index].tkNhanVien === nhanVienUpdate.tkNhanVien) {
      arrNhanVien[index].tenNhanVien = nhanVienUpdate.tenNhanVien;
      arrNhanVien[index].email = nhanVienUpdate.email;
      arrNhanVien[index].matKhau = nhanVienUpdate.matKhau;
      arrNhanVien[index].ngayLam = nhanVienUpdate.ngayLam;
      arrNhanVien[index].luongCoBan = nhanVienUpdate.luongCoBan;
      arrNhanVien[index].chucVu = nhanVienUpdate.chucVu;
      arrNhanVien[index].gioLam = nhanVienUpdate.gioLam;
      arrNhanVien[index].tongLuong = nhanVienUpdate.tongLuong;
      arrNhanVien[index].xepLoai = nhanVienUpdate.xepLoai;
      break;
    }
  }
  document.querySelector("#btnThemNV").hidden = true;
  // document.querySelector("#btnDong").hidden = true;
  document.querySelector("#btnThemNV").disabled = false;
  document.querySelector("#tknv").disabled = false;

  renderTableNhanVien(arrNhanVien);
  localStoreArr();

  document.querySelector("#myModal").setAttribute("style", "display: none;");
  document.querySelector("#myModal").setAttribute("aria-hidden", "true");
  document.querySelector("body").classList.remove("modal-open");

  // Reset form
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "Chọn chức vụ";
  document.querySelector("#gioLam").value = "";
};

//tìm kiếm
document.querySelector("#searchName").oninput = function () {
  var tuKhoa = document.querySelector("#searchName").value;

  var arrSearch = [];
  for (index = 0; index < arrNhanVien.length; index++) {
    var xepLoaiNV = arrNhanVien[index].xepLoai;

    tuKhoa = stringToSlug(tuKhoa); //đổi từ chữ HOA --> thường
    xepLoaiNV = stringToSlug(xepLoaiNV); //đổi từ chữ HOA --> thường

    if (xepLoaiNV.search(tuKhoa) !== -1) {
      arrSearch.push(arrNhanVien[index]);
    }
  }

  renderTableNhanVien(arrSearch);
};

window.onload = function () {
  if (getStore("arrNhanVien")) {
    arrNhanVien = getStore("arrNhanVien");

    renderTableNhanVien(arrNhanVien);
  }
};
