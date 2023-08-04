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
  nhanVienNew.loaiNhanVien = document.querySelector("#chucvu").value;
  nhanVienNew.gioLam = document.querySelector("#gioLam").value;
  // nhanVienNew.tongLuong = document.querySelector("#tongLuong").value;
  console.log(nhanVienNew);
  arrNhanVien.push(nhanVienNew);
  console.log(arrNhanVien);
  renderTableNhanVien(arrNhanVien);
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
                  <button class="btn btn-primary mx-2" onclick="suaNhanVien('${index}')">Sửa</button>
              </td>
          </tr>
      `;
  }
  document.querySelector("#tableDanhSach").innerHTML = outputHTML;
}
