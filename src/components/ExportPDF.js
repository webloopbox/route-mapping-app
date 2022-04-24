import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPDF, setEnablePDF } from '../store/pdfSlice';
import pdfMake from "pdfmake/build/pdfmake";
import vfs from "../fonts/vfs_fonts";
pdfMake.vfs = vfs;

pdfMake.fonts = {
    NimbusSans: {
        normal: "NimbusSanL-Reg.otf",
        bold: "NimbusSanL-Bol.otf",
        italics: "NimbusSanL-RegIta.otf",
        bolditalics: "NimbusSanL-BolIta.otf"
    }
};

export const ExportPDF = () => {

    const dispatch = useDispatch()

    const { pdf, pdfEnable } = useSelector((state) => state.pdf)
    const { pointA, pointB } = useSelector((state) => state.search)

    useEffect(() => {
        setTimeout(() => {

            let routeInfo = document.querySelectorAll('tr')
            let firstStep = document.querySelector('.leaflet-routing-alt').querySelector(':nth-child(1)').innerHTML
            let time = document.querySelector('.leaflet-routing-alt').querySelector(':nth-child(2)').innerHTML

            let fromTo = `${pointA.address.label.split(',')[0]} → ${pointB.address.label.split(',')[0]}`


            const docDefinition = {
                content: [
                    {
                        text: fromTo,
                        margin: [0, 0, 0, 20],
                    },
                    {
                        text: 'Start from:',
                        style: 'start',
                        margin: [0, 5]
                    },
                    {
                        text: firstStep,
                        style: 'h2',
                    },
                    {
                        text: time,
                        style: 'h3',
                        margin: [0, 5]
                    },
                    {
                        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
                        margin: [0, 0, 0, 20]
                    },
                ],
                styles: {
                    start: {
                        fontSize: 12,
                    },
                    h2: {
                        fontSize: 22,
                        bold: true,
                        color: '#965de9'
                    },
                    h3: {
                        fontSize: 18,
                    }
                },
                defaultStyle: {
                    font: "NimbusSans",
                    marginTop: 5,
                    fontSize: 11
                },
            };

            const pdfDocGenerator = pdfMake.createPdf(docDefinition)

            for (let i = 0; i < routeInfo.length; i++) {
                let step = routeInfo[i].querySelector(':nth-child(2)').innerHTML
                let km = routeInfo[i].querySelector(':nth-child(3)').innerHTML
                let x = `${step} → ${km}`
                docDefinition.content.push({ text: x, margin: [0, 10] })
            }
            dispatch(setPDF(pdfDocGenerator))
            dispatch(setEnablePDF(true))
        }, 1000)
    }, [])



    return <button onClick={() => pdf.download('trasa.pdf')} className={pdfEnable ? 'pdf-btn enable' : 'pdf-btn'}>Eksportuj do PDF</button>
}