import jsPDF from 'jspdf';


export const ExportPDF = ({ element }) => {

    let doc = new jsPDF();
    //let routeInfo = document.getElementsByClassName('leaflet-routing-alt')[0].innerHTML
    //console.log("infoo: ", element);
    //doc.html(routeInfo)

    return <button onClick={() => doc.save()} className='pdf-btn'>Exportuj do PDF</button>
}