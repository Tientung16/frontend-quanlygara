import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Pdfmakefonts2} from "./pdfmake/pdfmake-fonts";
import {TDocumentDefinitions} from "pdfmake/interfaces";
// import ReviewResultHook from './Hooks/hooks';
// import { GetApproveList } from './review-result-slice';
// import Data from './hook';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = Pdfmakefonts2.vfs;
pdfMake.fonts = {
  // Times New Roman font added
  TimesNewRoman: {
    normal: 'timesNewRoman',
    bold: 'timesNewRomanBold',
    italics: 'timesNewRomanItalic',
    bolditalics: 'timesNewRomanBoldItalic'
  }
};

export const generatePdf = (docDefinition: TDocumentDefinitions, fileName: string, type: 'download' | 'generate' | 'view' | 'print') => {
  // pdfMake.createPdf(docDefinition).open();
  if (type === 'download') {
    pdfMake.createPdf(docDefinition).download(fileName);
  } else if (type === 'print') {
    pdfMake.createPdf(docDefinition).print();
  } else if (type === 'view') {
    pdfMake.createPdf(docDefinition).open();
  }
}
