import { TDocumentDefinitions } from 'pdfmake/interfaces';
// import { APP_LOCAL_DATE_FORMAT, R_APPROVED, SUBMIT_METHOD } from 'app/config/constants';
import moment from 'moment';
const genData: any = (data: any) => {
  // const getSubmitMethod = () => {
  //   let stringValue = '';
  //   if (data.submitMethod === SUBMIT_METHOD.ONLINE) {
  //     stringValue = SUBMIT_METHOD.ONLINE_V;
  //   } else {
  //     stringValue = SUBMIT_METHOD.DIRECT_V;
  //   }
  //   return stringValue;
  // };

  // const getContent = () => {
  //   if (data.status === R_APPROVED) {
  //     return '';
  //   } else {
  //     return data.content ? data.content : '';
  //   }
  // };
  const getNameAutomaker = (idAutomaker:any) => {
    const name = data.ListComboboxSupplier.filter((value:any) => value.id === idAutomaker).map((item:any) => {return item.name})
    return name;
  }
  const getNameAccessory = (idAccessory:any) => {
    const name = data.listComboboxAccessory.filter((value:any) => value.id === idAccessory).map((item:any) => {return item.name})
    return name;
  }
  const tableRows2 = [
    [
      {
        text: ``,
        border: [true, true, true, true],
        style: [`textCenter`],
      },
      {
        text: ``,
        border: [true, true, true, true],
        style: [`textCenter`],
      },
      {
        text: ``,
        border: [true, true, true, true],
        style: [`textCenter`],
      },
      {
        text: ``,
        border: [true, true, true, true],
        style: [`textCenter`],
      },
      {
        text: `Tổng tiền`,
        border: [true, true, true, true],
        style: [`textCenter`],
      },
      {
        text: data.totalMoney,
        border: [true, true, true, true],
        style: [`textCenter`],
      },
    
    ]
  ];
  const tableRows = data.repairCarDetail.map((item: any) => [
    {
      text: getNameAccessory(item.idAccessory),
      border: [true, true, true, false],
      style: [`textCenter`],
    },
    {
      text: item.content,
      border: [true, true, true, false],
      style: [`textCenter`],
    },
    {
      text: item.cost,
      border: [true, true, true, false],
      style: [`textCenter`],
    },
    {
      text: item.number,
      border: [true, true, true, false],
      style: [`textCenter`],
    },
    {
      text: item.guarantee,
      border: [true, true, true, false],
      style: [`textCenter`],
    },
    {
      text: (item.cost * item.number).toString(),
      border: [true, true, true, false],
      style: [`textCenter`],
    },
  ]);
  
  const tableBody = [
    [
      {
        text: `Tên phụ tùng`,
        border: [true, true, true, false],
        style: [`textCenter`],
      },
      {
        text: `Nội dung sửa`,
        border: [true, true, true, false],
        style: [`textCenter`],
      },
      {
        text: `Đơn giá`,
        border: [true, true, true, false],
        style: [`textCenter`],
      },
      {
        text: `Số lượng`,
        border: [true, true, true, false],
        style: [`textCenter`],
      },
      {
        text: `Thời gian bảo hành`,
        border: [true, true, true, false],
        style: [`textCenter`],
      },
      {
        text: `Thành tiền`,
        border: [true, true, true, false],
        style: [`textCenter`],
      },
    
    ]
  ];
  
  return [
    {
      // title
      stack: [
        {
          table: {
            widths: [`40%`, `60%`],
            body: [
              [
                {
                  text: [
                    {
                      text: `GARA SỬA CHỮA PHƯƠNG TIỆN GIAO THÔNG\n`,
                      style: [`textCenter`],
                    },
                    // {
                    //   text: `TRUNG TÂM LƯU TRỮ QUỐC GIA TÀI LIỆU ĐIỆN TỬ\n`,
                    //   bold: true,
                    //   style: [`textCenter`],
                    // },
                    {
                      text: `—————\n`,
                      style: [`textCenter`],
                    },
                    // {
                    //   text: `Số:       /BCTĐ-QLTL\n`,
                    //   style: [`textCenter`],
                    // },
                  ],
                  border: [false, false, false, false],
                  style: [`textCenter`],
                },
                {
                  text: [
                    {
                      text: `CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM\n`,
                      style: [`textCenter`],
                      bold: true,
                    },
                    {
                      text: `Độc lập - Tự do - Hạnh phúc\n`,
                      bold: true,
                      style: [`textCenter`],
                    },
                    {
                      text: `————————————\n`,
                      style: [`textCenter`],
                    },
                    {
                      text: `\nNgày ${moment(data.lastModifiedDate).format('DD')} tháng ${moment(data.lastModifiedDate).format(
                        'MM'
                      )} năm ${moment(data.lastModifiedDate).format('YYYY')}\n`,
                      italics: true,
                      style: [`textRight`, `day`],
                    },
                  ],
                  border: [false, false, false, false],
                  style: [`textCenter`],
                },
              ],
            ],
          },
          border: [false, false, false, false],
          preserveLeadingSpaces: true,
          margin: [0, 0, 0, 0],
        },
        {
          text: `HÓA ĐƠN THANH TOÁN\n`,
          bold: true,
          style: [`textCenter`],
        },
        {
          text: [
            {
              text: `(Bảo hành 6 tháng) `,
              bold: true,
              style: [`textCenter`],
            },
            // {
            //   text: `${data.reqPartyName || ''}`,
            //   color: `blue`,
            //   bold: true,
            //   style: [`textCenter`],
            // },
          ],
          margin: [0, 0, 0, 10],
        },
        {
          text: [
            { text: `\tTên khách hàng: ` },
            {
              text: `${data.name || ''}`,
              // color: `blue`,
            },
          ],
        },
        {
          text: [
            { text: `\tĐịa chỉ: ` },
            {
              text: `${data.address || ''}\n`,
              // color: `blue`,
            },
          ],
        },
        {
          text: [
            { text: `\tSố điện thoại: ` },
            {
              text: `${data.phoneNumber}\n`,
              // color: `blue`,
            },
          ],
        },
        {
          text: [
            { text: `\tBiển số xe: ` },
            {
              text: `${data.licensePlates}\n`,
              // text: `1`,
              // color: `blue`,
            },
          ],
        },
        // {
        //   text: [
        //     { text: `\tCách thức ký gửi: ` },
        //     {
        //       // text: `${getSubmitMethod()}\n`,
        //       text: `abc`,
        //       color: `blue`,
        //     },
        //   ],
        // },
        {
          text: [
            { text: `\tHãng xe: ` },
            {
              text: getNameAutomaker(data.idAutomaker),
              // color: `blue`,
            },
          ],
        },
        {
          text: [
            { text: `\tNgày sửa: ` },
            {
              text: `${data.dateRepair}`,
              // color: `blue`,
            },
          ],
        },
        {
          table: {
            widths: [`16%`, `16%`,`16%`, `16%`, `16%`,`16%`],
            body: 
            tableBody
            
          },
          border: [true, true, false, false],
          preserveLeadingSpaces: true,
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: [`16%`, `16%`,`16%`, `16%`, `16%`,`16%`],
            body: 
            tableRows
            
          },
          border: [true, true, true, true],
          preserveLeadingSpaces: true,
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: [`16%`, `16%`,`16%`, `16%`, `16%`,`16%`],
            body: 
            tableRows2
            
          },
          border: [true, true, true, true],
          preserveLeadingSpaces: true,
          margin: [0, 0, 0, 30],
        },
        // {
        //   table: {
        //     widths: [`50%`, `50%`],
        //     body: [
        //       [
        //         {
        //           text: ``,
        //           border: [false, false, false, false],
        //           style: [`textCenter`],
        //         },
        //         {
        //           text: [
        //             {
        //               text: `TRUNG TÂM LƯU TRỮ QUỐC GIA TÀI LIỆU ĐIỆN TỬ\n`,
        //               style: [`textCenter`],
        //               bold: true,
        //             },
        //             {
        //               text: `\n(Trích xuất từ Hệ thống)\n`,
        //               bold: true,
        //               style: [`textCenter`],
        //             },
        //           ],
        //           border: [false, false, false, false],
        //           style: [`textCenter`],
        //         },
        //       ],
        //     ],
        //   },
        //   border: [false, false, false, false],
        //   preserveLeadingSpaces: true,
        //   margin: [0, 0, 0, 30],
        // },
      ],
    },
  ];
};
export const genDocDefinition = (data: any) => {
  const docDefinition: TDocumentDefinitions = {
    info: {
      title: ``,
    },
    content: genData(data),
    styles: {
      header: {
        fontSize: 10, //18
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 10, //16
        bold: true,
        margin: [0, 10, 0, 10],
      },
      ml30: {
        margin: [30, 0, 0, 0],
      },
      day: {
        margin: [0, 0, 100, 0],
      },
      p: {
        margin: [0, 0, 0, 6],
      },
      tableHeader: {
        fillColor: `#F5F5F5`,
        alignment: `center`,
        bold: true,
      },
      cardTitle: {
        fillColor: `#F5F5F5`,
        bold: true,
      },
      textRight: {
        alignment: `right`,
      },
      textCenter: {
        alignment: `center`,
      },
    },
    pageSize: `A4`,
    pageOrientation: `portrait`,
    defaultStyle: {
      font: `TimesNewRoman`,
      fontSize: 13,
      lineHeight: 1.5,
      preserveLeadingSpaces: true,
    },
  };
  return docDefinition;
};
