$(document).ready(function () {

    $.post("/Home/getvisits")

        .done(function (res) {




            for (var item in res) {
                $("#tbl_visits").append(

                    "<tr id='tr_" + res[item].pkID + "'>" +
                    "<td>" + res[item].pkID + "</td>" +
                    "<td>" + res[item].Name + "  " + res[item].Family + "</td>" +
                    "<td>" + res[item].PDate + "</td>" +
                    "<td>" + res[item].PTime + "</td>" +
                    "<td>" + res[item].pName + "  " + res[item].pFamily + "</td>" +
                    "<td>" + res[item].pMobile + "</td>" +
                    "<td>" + res[item].PNC + "</td>" +
                    "<td>" + res[item].Type + "</td>" +
                    "<td class='status' id=status_" + res[item].hashid + ">" + res[item].VisitStatus + "</td>" +
                    "<td><button class='btn btn-danger rv' id='remove_" + res[item].hashid + "'>" + "حذف" + "</button></td>"
                    /*"</tr>"*/
                );

            }


        })

        .fail(function () {


        })
        .always(function () {


        });


    $(document).on("dblclick", ".status", function () {
        $("#chg").html($(this).attr("id"));

        $.post("/Home/getstatus")

            .done(function (res) {



                $("#chg-body").empty();
                for (var item in res) {


                    $("#chg-body").append(

                        "<button class='btn btn-primary chgstatus'>" + res[item].pkID + " - " + res[item].VisitStatus + "</button>"
                        + "<br>" + "<br>"

                    );

                }


            })

            .fail(function () {


            })
            .always(function () {


            });


        $("#changestatus").modal("show");

    });







    //$("table").on("click", ".rv", function () {
    //    var trid = "#" + $(this).closest('tr').attr("id");





    //    swal({

    //        title: "هشدار",
    //        text: "آیا برای پاک کردن این نوبت اطمینان دارید؟",
    //        icon: "warning",
    //        buttons: true,
    //        dangerMode: true,

    //    })
    //        .then((willDelete) => {
    //            if (willDelete) {

    //                var vid = this.id.split("_");

    //               var token = $('input[name=__RequestVerificationToken]').val();


    //                $.post("/Home/removevisit", { vid: vid[1], __RequestVerificationToken: token })

    //                    .done(function (res) {

    //                        if (res) {

    //                            swal("نوبت حذف شد", {
    //                                icon: "success",
    //                            });

    //                            $(trid).remove();
    //                        }


    //                    })

    //                    .fail(function () {
    //                        swal("عملیات ناموفق", {
    //                            icon: "error",
    //                        });

    //                    })
    //                    .always(function () {


    //                    });


    //            }
    //        });


    //});





    $(document).on("click", ".chgstatus", function () {
        var state = $(this).html().split(" - ");

        var nid = $("#chg").html();

        var pstatus = document.getElementById(nid).innerHTML;

        document.getElementById(nid).innerHTML = "...تغییر...";

        var id = $("#chg").html().split("_");

        var token = $('input[name=__RequestVerificationToken]').val();
        $.post("/Home/setstatus", { state: state[0], sid: id[1], __RequestVerificationToken: token })

            .done(function (res) {

                if (res.status == 1) {

                    document.getElementById(nid).innerHTML = res.sname;
                }

            })

            .fail(function () {
                document.getElementById(nid).innerHTML = pstatus;

            })
            .always(function () {
                $("#changestatus").modal('hide');

            });

    });



    $('#dep_add').on('change', function (e) {               //get dep

        var dep = $('#dep_add').val();



        var dep2 = dep.split("-");


        var token = $('input[name="__RequestVerificationToken"]').val();

        $.post("/Home/getdocs", { dep: dep2[0], __RequestVerificationToken: token })

            .done(function (res) {



                $("#doctors_add").empty();

                $("#doctors_add").append("<option>" + "دکتر" + "</option>");
                for (var item in res) {

                    $("#doctors_add").append(
                        "<option>" + res[item].pkID + " - " + res[item].Name + " " + res[item].Family + "</option>"


                    );

                }



            })

            .fail(function () {



            })

            .always(function () {


            });





    });


    $('#doctors_add').on('change', function (e) {               //get dep

        var dep = $('#doctors_add').val();



        var dep2 = dep.split("-");

        var token = $('input[name="__RequestVerificationToken"]').val();

        $.post("/Home/getvisittype", { dep: dep2[0], __RequestVerificationToken: token })

            .done(function (res) {



                $("#visittype_add").empty();

                $("#visittype_add").append("<option>" + "انتخاب کنید" + "</option>");
                for (var item in res) {

                    $("#visittype_add").append(
                        "<option>" + res[item].fkVisitID + " - " + res[item].Type + "</option>"


                    );

                }



            })

            .fail(function () {



            })

            .always(function () {


            });





    });







    

        $("table").on('click', '.rv', function () {
            var trid = "#" + $(this).closest('tr').attr("id");


            swal({
                title: "هشدار",
                text: "آیا برای پاک کردن این نوبت اطمینان دارید؟",
                icon: "warning",
                buttons: true,
                dangerMode: true,

            })
                .then((willDelete) => {
                    if (willDelete) {

                        var vid = this.id.split("_");

                        var token = $('input[name=__RequestVerificationToken]').val();



                        $.post("/Home/removevisit", { vid: vid[1], __RequestVerificationToken: token })

                            .done(function (res) {

                                if (res) {


                                    swal("نوبت حذف شد", {
                                        icon: "success",
                                    });

                                    $(trid).remove();
                                }


                            })

                            .fail(function () {
                                swal("عملیات ناموفق", {
                                    icon: "error",
                                });

                            })
                            .always(function () {


                            });


                    }
       


                });

        });

    });

function addparam() {
    $.post("/Home/getdep")

        .done(function (res) {

            $("#dep_add").empty();
            $("#dep_add").append("<option>دپارتمان</option>");

            for (var item in res) {
                $("#dep_add").append(
                    "<option>" + res[item].pkID + "-" + res[item].Skill + "</option>"
                );
            }
        })
    $("#addsession").modal('show');

}



           

function add_visit() {

    $("#serverstatus").html("در حال ارتباط با سرور...");
    $("#serverstatus").css("color", "blue");
    $("#btn_add_visit").html(" <i class='fa fa-spinner fa-spin'></i>");
    $("#btn_add_visit").prop("disabled", true);

    var docid = $("#doctors_add").val().split('-');
    var visitid = $("#visittype_add").val().split('-');


    var token = $('input[name="__RequestVerificationToken"]').val();

    $.post("/Home/addvisit", { docid: docid[0], visitid: visitid[0], visitdatetime: $("#visitdatetime_add").val(), pid: $("#pid_add").val(), __RequestVerificationToken: token })
        .done(function (res) {

            switch (res.status) {
                case 1:
                    $("#serverstatus").html("نوبت ایجاد شد");
                    $("#serverstatus").css("color", "green");
                    $("#tbl_visits").append(
                        "<tr id='tr_" + res.nv.pkID + "'>" +
                        "<td>" + res.nv.pkID + "</td>" +
                        "<td>" + res.nv.Name + " " + res.nv.Family + "</td>" +
                        "<td>" + res.nv.PDate + "</td>" +
                        "<td>" + res.nv.PTime + "</td>" +
                        "<td>" + res.nv.pName + " " + res.nv.pFamily + "</td>" +
                        "<td>" + res.nv.pMobile + "</td>" +
                        "<td>" + res.nv.PNC + "</td>" +
                        "<td>" + res.nv.Type + "</td>" +
                        "<td class='status' id=status_" + res.nv.hashid + ">" + res.nv.VisitStatus + "</td>" +
                        "<td><button class='btn btn-danger rv' id='remove_" + res.nv.hashid + "'>" + "حذف" + "</button></td>"




                    );
                    break;

                case 2:
                    $("#serverstatus").html("کد ملی یافت نشد");
                    $("#serverstatus").css("color", "red");
                    break;
                case 3:
                    $("#serverstatus").html("وقت دکتر آزاد نیست");
                    $("#serverstatus").css("color", "red");
                    break;
                case 4:
                    $("#serverstatus").html("وقت بیمار آزاد نیست");
                    $("#serverstatus").css("color", "red");
                    break;
            }



        })

        .fail(function () {
            $("#serverstatus").html("خطا در برقراری ارتباط با سرور");
            $("#serverstatus").css("color", "red");
        })

        .always(function () {
            $("#btn_add_visit").html("ثبت نوبت");
            $("#btn_add_visit").prop("disabled", false);
        });
}


function removevisit(e) {

    swal({
        title: "هشدار",
        text: "آیا برای پاک کردن این نوبت اطمینان دارید",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var vid = e.split("_");
                var token = $('input[name="__RequestVerificationToken"]').val();
                $.post("/Home/removevisit", { vid: vid[1], __RequestVerificationToken: token })

                    .done(function (res) {

                        if (res) {
                            $("td:has(button)")
                            swal("نوبت حذف شد", {
                                icon: "success",
                            });
                        }
                    })

                    .fail(function () {

                        swal("عملیات ناموفق", {
                            icon: "error",
                        });
                    })

                    .always(function () {

                    });


            }


        });
}
