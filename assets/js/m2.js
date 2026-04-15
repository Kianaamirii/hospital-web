$(document).ready(function () {

    $.post("/Home/getdep")

        .done(function (res) {

            


            for (var item in res) {
                $("#department").append(

                    "<option>" + res[item].pkID + " - " + res[item].Skill + "</option>"
                );

            }

         
        })

        .fail(function () {


        })
        .always(function () {


        });


    $("#department").on('change', function (e) {
        var dep = $("#department").val();
       

        var dep2 = dep.split(' - ');


        
        var token = $('input[name="__RequestVerificationToken"]').val();

        $.post("/Home/getdocs", { dep: dep2[0], __RequestVerificationToken: token })

            .done(function (res) {
             
                   
                    $('#doctor').empty();
                    $('#doctor').append("<option>" + "دکتر را انتخاب کنید" + "</option>");

                    for (var item in res) {
                        $("#doctor").append(

                            "<option>" + res[item].pkID + " - " + res[item].Name  + "   " + res[item].Family + "</option>"
                        );

                    }

                })

                .fail(function () {


                })
                .always(function () {


                });

   
    });

   
    $("#doctor").on('change', function (e) {
        var doc = $("#doctor").val();

        
        var doc2 = doc.split(' - ');

     

        $.post("/Home/getvisit", { doc: doc2[0] })

            .done(function (res) {
                
                
                $('#visit').empty();
                $('#visit').append("<option>" + "نوبت را انتخاب کنید" + "</option>");

                for (var item in res) {

                   

                    $("#visit").append(

                        "<option>" + res[item].pkID + " - " + res[item].PDate + " | " + res[item].PTime + "</option>"
                    );

                }

            })

            .fail(function () {
                alert("قسمت وقت ها کار نمیکند");

            })
            .always(function () {


            });


    });

    $("#name").focus(function () {
        document.getElementById("name-v").innerHTML = "";

    });


    $("#family").focus(function () {
        document.getElementById("family-v").innerHTML = "";

    });


    $("#phone").focus(function () {
        document.getElementById("phone-v").innerHTML = "";

    });

    $("#visit").focus(function () {
        document.getElementById("visit-v").innerHTML = "";

    });


    $(".valiid").blur(function () {

        validation(this.id);

    });

   


});



function setvisit() {
    var vn = $("#visit").val();
    var vn2 = vn.split(' - ');

    var namee = $("#name").val();

    var phone = $("#phone").val();

    var family = $("#family").val();

    var valid1 = validation("name");
    var valid2 = validation("family");
    var valid3 = validation("phone");
    var valid4 = validation("visit");
   

    if (valid1 && valid2 && valid3 && valid4) {
        $.post("/Home/setvisit", { vn: vn2, namee: namee, phone: phone, family: family })

            .done(function (res) {


                switch (res) {
                    case 1: swal("عملیات ناموفق", "چنین نوبتی وجود ندارد", "error");
                        break;

                    case 2: swal("عملیات موفق", "نوبت شما با موفقیت ثبت شد", "success");
                        break;

                }


            })

            .fail(function () {

                alert("خطا در برقراری ارتباط با سرور");
            })
            .always(function () {


            });



    }
    else {
        swal("عملیات ناموفق", "لطفا خطا های ورودی را تصحیح کنید", "error");
    }
}

function validation(itemm) {

    var valid = true;

    var namee = $("#name").val();
    var family = $("#family").val();
    var phone = $("#phone").val();

    switch (itemm) {

        case "name":
            if (namee.length > 20 || namee.length <= 2) {
                valid = false;
                $("#name-v").html(" نام باید بین 3 تا 20 کارکتر باشد  ");
            }
            break;


        case "family":
            if (family.length > 20 || family.length <= 2) {
                valid = false;
                $("#family-v").html(" نام خانوادگی باید بین 3 تا 20 کارکتر باشد  ");
            }

            break;

        case "phone":
            if (phone.length != 11) {
                valid = false;
                $("#phone-v").html(" شماره همراه باید 11 رقم باشد  ");
            }
            break;

        case "visit":
            if ($("#visit").val() == "نوبت را انتخاب کنید") {
                valid = false;
                $("#visit-v").html("از منوی بالا یک نوبت را انتخاب کنید ");
            }

            break;
    }
    if (!valid) {
        $("#" + itemm).removeClass("inputcorrect");
        $("#" + itemm).addClass("inputerror");

    } else {

        $("#" + itemm).removeClass("inputerror");
        $("#" + itemm).addClass("inputcorrect");
    }





            return valid;

    }


