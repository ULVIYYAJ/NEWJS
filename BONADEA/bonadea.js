$(document).ready(function () {
    $.ajax({
        url: "http://ulviyyaj-001-site1.itempurl.com/api/BonaDea",
        type: "get",
        dataType: "json",
        success: function (response) {
            var users = $('#users');

            for (var i = 0; i < response.length; i++) {
                var tr = $('<tr/>');
                // var deleteIcon = $('<button/>');
                // var analysisIcon = $('<button/>');

                var td_id = $('<td/>');
                var td_name = $('<td/>');
                var td_surname = $('<td/>');
                var td_phone = $('<td/>');
                var td_email = $('<td/>');
                var td_pincode = $('<td/>');
                var td_address = $('<td/>');
                var td_city = $('<td/>');
                var td_datebirth = $('<td/>');
                var td_status = $('<td/>');
                var td_gender = $('<td/>');
                var td_delete = $('<td/>');
                var td_analysis = $('<td/>');

                var deleteIcon = $('<button/>');
                var analysisIcon = $('<button/>');

                var id = response[i].id;
                var name = response[i].name;
                var surname = response[i].surname;
                var phone = response[i].phone;
                var email = response[i].email;
                var pincode = response[i].pinCode;
                var address = response[i].address;
                var city = response[i].city;
                var datebirth = response[i].dateBirth;
                var status = response[i].martialStatus;
                if (status == "0") {
                    $(td_status).text("male")
                } else {
                    $(td_status).text("female")
                }
                var gender = response[i].gender;
                if (gender == "0") {
                    $(td_gender).text("single");
                } else {
                    $(td_gender).text("married");
                }

                $(td_id).append(id);
                $(td_name).append(name);
                $(td_surname).append(surname);
                $(td_phone).append(phone);
                $(td_email).append(email);
                $(td_pincode).append(pincode);
                $(td_address).append(address);
                $(td_city).append(city);
                $(td_datebirth).append(datebirth);
                $(td_delete).append(deleteIcon);
                $(td_analysis).append(analysisIcon);

                $(tr).append(td_id);
                $(tr).append(td_name);
                $(tr).append(td_surname);
                $(tr).append(td_phone);
                $(tr).append(td_email);
                $(tr).append(td_pincode);
                $(tr).append(td_address);
                $(tr).append(td_city);
                $(tr).append(td_datebirth);
                $(tr).append(td_status);
                $(tr).append(td_gender);
                $(tr).append(td_delete);
                $(tr).append(td_analysis);

                $(deleteIcon).addClass("btn btn-danger delete");
                $(deleteIcon).append($("<i class='fas fa-trash-alt'></i>"));
                $(deleteIcon).css('margin-left', '10px');

                $(analysisIcon).addClass("btn btn-outline-success analysis");
                $(analysisIcon).append($("<i class='fas fa-flask'></i>"));
                $(analysisIcon).css('margin-left', '20px');

                $(users).append(tr);
                $(deleteIcon).attr("data-id", id);
                $(analysisIcon).attr("data-id", id);
                $(tr).attr("data-id", id);
            }
        },
        error: function (error) {
            console.log(error);
        },
        always: function () { }
    })
    $(document).on("click", '.delete', function () {
        var id = $(this).attr("data-id");

        // e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Əminsiniz?',
            text: "Məlumat geri qayıtmayacaq!",
            icon: 'Xəbərdarlıq',
            showCancelButton: true,
            confirmButtonText: 'Sil!',
            cancelButtonText: 'Saxla!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Silindi!',
                    'Məlumat silindi.',
                    'Uğurlu'
                )
                $.ajax({

                    url: "http://ulviyyaj-001-site1.itempurl.com/api/BonaDea?" + "patientId=" + id,
                    type: "delete",
                    success: function (response) {
                        window.location.reload();
                    },
                    error: function (error) {
                        console.log(error);

                    },
                    always: function () { }
                })

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Təxirə salındı',
                    'Məlumat saxlanıldı :)',
                    'xəta'
                )

            }
        })
    });

    $(document).on("click", "#plus", function () {
        var plus = $('#plus');

        $(plus).attr("data-toggle", "modal");
        $(plus).attr("data-target", "#exampleModal");

    })
    $(document).on("click", ".save", function () {
        var defaultDate = "31-01-2022";
        var splitedValues = defaultDate.split("-");
        var newDateFormat = splitedValues[0] + "/" + splitedValues[1] + "/" + splitedValues[2];

        var database = {
            name: $("#name").val(),
            surname: $("#surname").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            pincode: $("#pincode").val(),
            address: $("#address").val(),
            city: $("#city").val(),
            date: newDateFormat,
            status: $("#status").val(),
            gender: $("#gender").val()
        }

        database.name = $("#name").val();
        database.surname = $("#surname").val();
        database.phone = $("#phone").val();
        database.email = $("#email").val();
        database.pincode = $("#pincode").val();
        database.address = $("#address").val();
        database.city = $("#city").val();
        database.date = newDateFormat;
        database.status = $("#status").val();
        database.gender = $("#gender").val();

        var json = JSON.stringify(database);


        $.ajax({
            type: "POST",
            url: "http://ulviyyaj-001-site1.itempurl.com/api/BonaDea",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (response) {

                window.location.reload();
            },
            error: function (error) {
                if (error.status == 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.responseJSON[0],
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
            }
        });
    })
    $(document).on("click", '.analysis', function () {
        // var id = $(this).attr("data-id");

        $(".analysis").attr("data-toggle", "modal");
        $(".analysis").attr("data-target", "#newModal");


    });

    $.ajax({
        url: "http://ulviyyaj-001-site1.itempurl.com/api/Analyze/GetDepartments",
        type: "get",
        dataType: "json",
        success: function (response) {
            var option1 = $('<option/>');
            var option2 = $('<option/>');
            var option3 = $('<option/>');
            var option4 = $('<option/>');
            var option5 = $('<option/>');
            var department = $('#department');

            option1.val("1");
            option2.val("2");
            option3.val("3");
            option4.val("4");
            option5.val("5");

            option1.text("Radiology");
            option2.text("Cardiology");
            option3.text("Oncology");
            option4.text("Urology");
            option5.text("Neurology");


            department.append(option1);
            department.append(option2);
            department.append(option3);
            department.append(option4);
            department.append(option5);

        }
    })


    $("#department").change(function () {
        var id = $(this).val();
        $.ajax({
            url: "http://ulviyyaj-001-site1.itempurl.com/api/Analyze/GetAnalysis?" + "depId=" +id,
            type: "post",
            dataType: "json",
            success: function (response) {

            },
            error: function () {

            }
        });
    });


    // $(document).on("click", '.show', function () {
    //     var id = $(this).attr("data-id");

    //     $.ajax({
    //         url: "http://ulviyyaj-001-site1.itempurl.com/api/Analyze/GetAnalysis?" + "depId=" + id,
    //         type: "get",
    //         dataType: "json",
    //         success: function (response) {
    //             var users = $('#sectors');

    //             for (var i = 0; i < response.length; i++) {
    //                 var li = $('<li/>');

    //                 var id = response[i].id;
    //                 var name = response[i].name;
    //                 var price = response[i].price;
    //                 var time = response[i].readyTime;

    //                 $(li).append(id);
    //                 $(li).append(name);
    //                 $(li).append(price);
    //                 $(li).append(time);

    //                 $(users).append(li);
    //             }
    //         },
    //         error: function (error) {
    //             console.log(error);
    //         },
    //         always: function () { }
    //     })
    // });
})