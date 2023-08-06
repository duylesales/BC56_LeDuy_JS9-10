var validation = {
  kiemTraRong: function (value, name) {
    if (value.trim() === "") {
      document.querySelector(`[data-error-required=${name}]`).innerHTML =
        name + " không được bỏ trống !";
      return false;
    }
    document.querySelector(`[data-error-required=${name}]`).innerHTML = "";
    return true;
  },
  kiemTraDoDai: function (value, name, minLength, maxLength) {
    var length = value.length;
    if (length < minLength || length > maxLength) {
      document.querySelector(
        `[data-error-min-max-length=${name}]`
      ).innerHTML = `${name} từ ${minLength} - ${maxLength} ký tự !`;
      return false;
    }
    document.querySelector(`[data-error-min-max-length=${name}]`).innerHTML =
      "";
    return true;
  },
  kiemTraTatCaKyTu: function (value, name) {
    var regexLetter = /^[A-Z a-z]+$/;
    if (regexLetter.test(value)) {
      document.querySelector(`[data-error-regexLetter=${name}]`).innerHTML = "";
      return true;
    }
    document.querySelector(`[data-error-regexLetter=${name}]`).innerHTML =
      name + " tất cả phải là chữ";
    return false;
  },
  kiemTraEmail: function (value, name) {
    var regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
      document.querySelector(`[data-error-regexEmail=${name}]`).innerHTML = "";
      return true;
    }
    document.querySelector(`[data-error-regexEmail=${name}]`).innerHTML =
      name + "email chưa hợp lệ";
    return false;
  },
  kiemTraGiaTri: function (value, name, minValue, maxValue) {
    if (Number(value) < minValue || Number(value) > maxValue) {
      document.querySelector(
        `[data-error-min-max-value=${name}]`
      ).innerHTML = `${name} giá trị từ ${minValue} - ${maxValue}  !`;
      return false;
    }
    document.querySelector(`[data-error-min-max-value=${name}]`).innerHTML = ``;
    return true;
  },
  kiemTraChucVu: function (value, name) {
    if (value === "Chọn chức vụ") {
      document.querySelector(`[data-error-chucVu=${name}]`).innerHTML =
        name + " Hãy chọn chức vụ phù hợp !";
      return false;
    }
    document.querySelector(`[data-error-chucVu=${name}]`).innerHTML = "";
    return true;
  },
  kiemTraPassword: function (value, name) {
    var regexPassword =
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,10}$/;
    if (regexPassword.test(value)) {
      document.querySelector(`[data-error-regexPassword=${name}]`).innerHTML =
        "";
      return true;
    }
    document.querySelector(`[data-error-regexPassword=${name}]`).innerHTML =
      name + " Chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    return false;
  },
};

function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();
  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
}
