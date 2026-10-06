function PatientList() {

    this.InitView = () => {
        this.ListPatients();

        $('#btnVerCitas').click(() => {
            var view = new PatientList();
            view.ShowAppointments();
        });
    };

    this.ListPatients = () => {
        $.ajax({
            url: API_URL_BASE + "/api/Patients/GetAllPatients",
            method: "GET",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
        }).done((response) => {
            if (response.result == "ok") {
                console.log("Estos fueron los datos que recibimos del API: ", response.data);
                gridOptions.api.setGridOption('rowData', response.data);
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al cargar los pacientes',
                    text: "Hubo un problema al cargar los pacientes, intente de nuevo."
                });
            }
        })
            .fail((error) => {
                console.error("Error del ajax", error);

                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al cargar paciente',
                    text: "Hubo un problema " + error
                });
            });

    };

    this.ShowAppointments = () => {
        window.location.href = '/Appointment/AppointmentList';
    }

    this.GetPatientDetails = (patientDto) => {
        $('#txtSocialSecId').val(patientDto.socialSecurityId);
        $('#txtName').val(patientDto.name);
        $('#txtLastName').val(patientDto.lastName);

        sessionStorage["patientId"] = patientDto.id;
        sessionStorage["PatientData"] = patientDto.socialSecurityId + " " + patientDto.name + " " + patientDto.lastName;
    };
}

document.addEventListener('DOMContentLoaded', () => {
    var view = new PatientList();
    view.InitView();
});