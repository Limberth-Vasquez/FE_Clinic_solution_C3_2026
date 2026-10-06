function AppointmentList() {

    this.InitView = () => {
        this.GetPatientById();
    };

    this.GetPatientById = () => {
        $.ajax({
            url: API_URL_BASE + "/api/Appointments/ObtenerCitasPorPaciente?patientId=" + sessionStorage["patientId"],
            method: "GET",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
        }).done((response) => {
            if (response.result == "ok") {
                gridOptions.api.setGridOption('rowData', response.data);
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al cargar la cita del paciente',
                    text: "Hubo un problema al cargar la cita, intente de nuevo."
                });
            }
        })
            .fail((error) => {
                console.error("Error del ajax", error);

                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al cargar cita',
                    text: "Hubo un problema " + error
                });
            });

    };

}

document.addEventListener('DOMContentLoaded', () => {
    var view = new AppointmentList();
    view.InitView();
});