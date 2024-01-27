
const isActives = document.querySelectorAll('.isActive')
const UpdateUrl = "/Admin/Section/UpdateStatus/"

isActives.forEach((check) => {
    let status = 0
    check.addEventListener('change', () => {
        if (check.checked) {
            //console.log(check.getAttribute('itemId'))
            status = 1
        }
        else {
            status = 0
        }

        console.log(status)

        UpdateStatus(check.getAttribute('itemId'), status)

    })
})


function UpdateStatus(id, status) {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $.ajax({
        url: UpdateUrl + id,
        data: { id: id, status: status },
        type: "PUT",
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                
            }
            else {
                toastr.error(data.message);
            }
        }
    })
}