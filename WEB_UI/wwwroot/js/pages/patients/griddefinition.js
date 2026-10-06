const columnDefinitions = [

    { field: "socialSecurityId", headerName: "Social Sec. Id" },
    { field: "name", headerName: "Nombre" },
    { field: "lastName", headerName: "Apelido" },
];

const gridOptions = {
    columnDefs: columnDefinitions,
    rowData: [],
    rowSelection: 'single',
    defaultColDef: { sortable: true, filter: true },

    //Events
    onRowDoubleClicked: params => {
        ProccessDoubliClick(params);
    },
    onGridReady: (params) => {
        gridOptions.api = params.api;
    }
};

function ProccessDoubliClick(params)
{
    let view = new PatientList();
    view.GetPatientDetails(params.data);
}

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    agGrid.createGrid(gridDiv, gridOptions);
});