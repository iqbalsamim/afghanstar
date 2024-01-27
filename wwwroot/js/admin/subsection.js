const subInputs = document.querySelectorAll('.sub-form input')
const subTeaxtareas = document.querySelectorAll('.sub-form textarea')
const Url = "/Admin/Section/CreateSubSection/"
const getUrl = "/Admin/Section/GetAllSubSection/"
const sectionId = document.getElementById('Section_Id').value

const tbody = document.getElementById('tlistbody')
const trs = document.querySelectorAll('#tlistbody tr td')
const subCounts = document.getElementById('subCounts')

const newForm = document.getElementById('newSubSection')
const createForm = document.getElementById('createSubSection')
const subForm = document.querySelector('.sub-form')


newForm.addEventListener('click', () => {
    showSubForm()
    subInputs.forEach((input) => {
        input.value = ""
    })
    subTeaxtareas.forEach((tarea) => {
        tarea.value = ""
    })

    subInputs[0].focus()

})


createForm.addEventListener('click', (e) => {
    e.preventDefault()
    subInputs[1].classList.remove('error')


    if (subInputs[1].value !== "") {
        createModel()

    }
    else {
        console.log('wrong')
        subInputs[1].classList.add('error')
        subInputs[1].setAttribute('placeholder',"title is required")
    }

    


})

function createModel() {
    let model = {}
    model.Id = subInputs[0].value
    model.SectionId = sectionId
    model.Title = subInputs[1].value
    model.PashtoTitle = subInputs[2].value
    model.PersianTitle = subInputs[3].value

    model.Description = subTeaxtareas[0].value
    model.PashtoDescription = subTeaxtareas[1].value
    model.PersianDescription = subTeaxtareas[2].value

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
        url: Url,
        data: model,
        type: "POST",
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                //console.log(data)
                bindData(data.data.sectionId)
                bindDataToForm(data.data.id)
            }
            else {
                toastr.error(data.message);
            }
        },
        error: function (data) {
            console.log(data.message)
            alert()
        }
    })
}



function bindData(id) {
    subCounts.style.visibility = "hidden"
    //console.log('in bind data')
    tbody.innerHTML=""
    $.ajax({
        url: "/Admin/Section/GetAllSubSection/",
        data: {id : id},
        type: "POST",
        dataType: 'json',
        success: function (data) {
            const models = data.data
            models.forEach((section, ind) => {
                let tr = document.createElement('tr')
                tr.setAttribute('itemId', section.id)
                tr.innerHTML = `
                            <td>${(ind + 1)}</td>
                            <td>${section.title}</td>
                            <td>${section.description}</td>
                            <td class="settings">
                                <a class="btn edit" itemid="${section.id}"><i class="fas fa-pen"></i></a>
                                <a class="btn del" itemid="${section.id}"><i class="fas fa-trash"></i></a>
                            </td>

                        `
                tbody.appendChild(tr)

                if (models.length > 0) {
                    subCounts.style.visibility = "visible"
                    subCounts.innerText = models.length + ""

                }
                //console.log(models)
                //console.log(models.length)
                
            })

            deleteSubSection()
            editSubSection()

        },
        error: function () {

        }
    })
}


function deleteSubSection() {
    document.querySelectorAll("#tlistbody .del").forEach((elm) => {
        elm.addEventListener('click', (e) => {
            const itemId = elm.getAttribute('itemid')
            //console.log(elm)
            deleteData(itemId)

        })
    })
}


function editSubSection() {
    document.querySelectorAll("#tlistbody .edit").forEach((elm) => {
        elm.addEventListener('click', (e) => {
            const itemId = elm.getAttribute('itemid')
            //console.log(elm)
            bindDataToForm(itemId)

        })
    })
}

deleteSubSection()
editSubSection()


function bindDataToForm(id) {
    //console.log(id)
    $.ajax({
        url: "/Admin/Section/GetSubSection/",
        data: { id: id },
        type: "GET",
        dataType: 'json',
        success: function (data) {

            const model = data.data

            showSubForm()

            document.getElementById('SubSection_Id').value = model.id
            document.getElementById('SubSection_Title').value = model.title
            document.getElementById('SubSection_Description').value = model.description
            document.getElementById('SubSection_PashtoTitle').value = model.pashtoTitle
            document.getElementById('SubSection_PashtoDescription').value = model.pashtoDescription
            document.getElementById('SubSection_PersianTitle').value = model.persianTitle
            document.getElementById('SubSection_PersianDescription').value = model.persianDescription
        },
        error: function (err) {
            alert(err.message)
        }
    })
}

function deleteData(id) {
    //console.log(id)
    $.ajax({
        url: "/Admin/Section/DeleteSubSection/",
        data: { id: id },
        type: "DELETE",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                /*console.log(data)*/
                bindData(data.data)
            }
            else {
                toastr.error(data.message);
            }
        },
        error: function (err) {
            alert(err.message)
        }
    })
}


function showSubForm() {
    subForm.style.display = "block"
}






