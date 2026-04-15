$(document).ready(function () {

    $.post("/Home/getdep")

        .done(function (res) {

            $("#dep").empty();
            $("#dep").append("<option>دپارتمان</option>");

            for (var item in res) {

                $("#dep").append(

                    "<option>" + res[item].pkID + "-" + res[item].Skills + "</option>"



                );
            }


        })

        .fail(function () {



        })

        .always(function () {


        });




    $('#dep').on('change', function (e) {               //get dep

        var dep = $('#dep').val();



        var dep2 = dep.split("-");

        //var token = $('input[name="__RequestVerificationToken"]').val();

        $.post("/Home/getdocs", { dep: dep2[0] })
            .done(function (res) {



                $("#docs").empty();

                $("#docs").append("<option>" + "دکتر" + "</option>");
                for (var item in res) {

                    $("#docs").append(
                        "<option>" + res[item].pkID + " - " + res[item].Name + " " + res[item].Family + "</option>"


                    );

                }



            })

            .fail(function () {



            })

            .always(function () {


            });





    });


    $('#docs').on('change', function (e) {               //get dep

        var dep = $('#docs').val();



        var dep2 = dep.split("-");



        $.post("/Home/get_VPD", { doc: dep2[0] })

            .done(function (res) {



                $("#tbl_type").empty();

                console.log(res);

                for (var item in res.vt) {

                    $("#tbl_type").append(
                        "<tr>" +
                        "<td><input class='chbox' type='checkbox' id='chb_" + res.vt[item].pkID + "'></td>" +
                        "<td>" + res.vt[item].Type + "</td>" +
                        "<td><input type='number' id='min_" + res.vt[item].pkID + "'></td>"


                    );

                }

                for (var item in res.vpd) {

                    $("#chb_" + res.vpd[item].fkVisitID).prop('checked', true);
                    $("#min_" + res.vpd[item].fkVisitID).attr('value', res.vpd[item].Duration);
                }



            })

            .fail(function () {



            })

            .always(function () {


            });





    });


    $('table').on('change', '.chbox', function (e) {               //get dep



        $(this).css("display", "none");


        var vpid = $(this).attr("id");
        var vpid2 = vpid.split("_");

        var doc = $("#docs").val();
        var doc2 = doc.split("-");

        var state = $(this).is(':checked');


        $.post("/Home/chg_vpd", { vpdid: vpid2[1], state: state, doc: doc2[0] })

            .done(function (res) {

                if (res != "null") {
                    $("#" + vpid).prop("checked", true);
                    $("#min_" + vpid2[1]).attr("value", res.Duration);

                }
                else {
                    $("#" + vpid).prop("checked", false);
                    $("#min_" + vpid2[1]).attr("value", "");
                }


            })

            .fail(function () {

                $("#" + vpid).prop("checked", !state);

            })

            .always(function () {

                $("#" + vpid).css("display", "block");
            });





    });



});


function addparam() {
    swal("نوع نوبتی که قصد ایجادش را دارید وارد کنید", {
        content: {
            element: "input",
            attributes: {
                placeholder: "نوع نوبت",
                type: "text",
            },
        },
    })
        .then((value) => {
            if (value != null) {
                if (value != "") {
                    var token = $('input[name="__RequestVerificationToken"]').val();
                    $.post("/Home/addVisitType", { vt: value, __RequestVerificationToken: token })

                        .done(function (res) {

                            if (res.state) {
                                swal("عملیات موفق", "نوع نوبت " + res.vt + " ایجاد شد", "success");
                            }
                            else {
                                swal("عملیات ناموفق", res.vt, "error");
                            }

                        })
                        .fail(function () {
                            swal("عملیات ناموفق", "خطا در برقراری ارتباط با سرور", "error");
                        });

                }
                else {
                    swal("توجه", "نوع نوبت را وارد کنید", "info");
                }
            }
        });
}




function deleteparam() {
    swal("نوع نوبتی که مایل به حذف آن هستید را وارد کنید", {
        content: {
            element: "input",
            attributes: {
                placeholder: "نوع نوبت",
                type: "text",
            },
        },
    })
        .then((value) => {
            if (value != null) {

                if (value != "") {
                    var token = $('input[name="__RequestVerificationToken"]').val();
                    $.post("/Home/deleteVisitType", { vt: value, __RequestVerificationToken: token })

                        .done(function (res) {

                            if (res.state) {
                                swal("عملیات موفق", "نوع نوبت " + res.vt + " حذف شد", "success");
                            }
                            else {

                                switch (res.vt) {
                                    case -2146233079: swal("عملیات ناموفق", "چنین نوع نوبتی یافت نشد", "error");
                                        break;
                                    case -2146233087: swal("عملیات ناموفق", "این نوبت را به خاطر تعلق قادر به حذف نیستید", "error");
                                }


                            }

                        })
                        .fail(function () {
                            swal("عملیات ناموفق", "خطا در برقراری ارتباط با سرور", "error");
                        });

                }
                else {
                    swal("توجه", "نوع نوبت را وارد کنید", "info");
                }

            }
        });
}