function CreateAppointment() {

    this.InitView = () => {
        this.PopulateSpecialties();

        $('#btnCreate').click(() => {
            var view = new CreateAppointment();
            view.SubmitCreateAppointment();
        });
    };

    this.SubmitCreateAppointment = () => {

        let citaDto = {};
        citaDto.patientId = sessionStorage["patientId"],
            citaDto.appointmentDate = $('#txtDate').val(),
            citaDto.title = $('#txtTitle').val(),
            citaDto.speciality = $('#ddSpeciality').find(':selected').val()


        $.ajax({
            url: API_URL_BASE + "/api/Appointments/CrearCita",
            method: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            hasContent: true,
            data: JSON.stringify(citaDto),
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }

        }).done((response) => {
            if (response.result == "ok") {

                swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    text: response.data
                }).then(() => {
                    window.location = '/Appointment/AppointmentList'
                });
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al crear la cita del paciente',
                    text: "Hubo un problema al crear la cita, intente de nuevo."
                });
            }
        })
            .fail((error) => {
                console.error("Error del ajax", error);

                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al crear cita',
                    text: "Hubo un problema " + error
                });
            });

    };


    this.PopulateSpecialties = () => {
        $.ajax({
            url: API_URL_BASE + "/api/RH/ObtenerEspecialidades",
            method: "GET",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
        }).done((response) => {
            if (response.result == "ok") {
                let select = $('#ddSpeciality');
                select.find('option').remove();

                for (var row in response.data) {
                    select.append('<option value=' + response.data[row] + '>' + response.data[row] + '</option>');
                }

            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al cargar las especialidades',
                    text: "Hubo un problema las especialidades, intente de nuevo."
                });
            }
        })
            .fail((error) => {
                console.error("Error del ajax", error);

                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al cargar la información',
                    text: "Hubo un problema " + error
                });
            });
    };

}

document.addEventListener('DOMContentLoaded', () => {
    var view = new CreateAppointment();
    view.InitView();
});