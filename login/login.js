function gologin() {

    var pn = $('#pn').val();
    var pass = $('#pass').val();


   // var token = $(' name=__requestverificationtoken ').val();

    $.post("/Home/login_check", { pn: pn, pass: pass/*, __RequestVerificationToken: token*/ })

        .done(function (res) {
           
            switch (res) {
                case 1: window.location.href = "recept";
                    break;

                case 2: swal("عملیات ناموفق", "کلمه عبور اشتباه است", "error");
                    break;

                case 3: swal("عملیات ناموفق", "چنین کاربری یافت نشد", "error");
                    break;

            }


        })

        .fail(function () {

            alert("خطا در برقراری ارتباط با سرور");
        })
        .always(function () {


        });
}