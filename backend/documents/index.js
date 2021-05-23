module.exports = ({employees, purposes, estimates, results}) => {
    const today = new Date();
    const employeeNames = employees.split(',');
    let count = 0;
    let countEst = 0;
    employeeNames.forEach(elem => {count++});
    const purposeNames = purposes.split(',');
    const estimateTmpArr = estimates.split(',');
    const estimateArr  = [];
    for (let i = 0; i < estimateTmpArr.length; i+=count) {
       const tmpArr = [];
       for (let j = 0; j < count; j++) {
          tmpArr.push(estimateTmpArr[i+j]);
       }
       estimateArr.push(tmpArr);
    }
    const resultEstimateArr = results.split(',').filter((elem, index) => index %2 != 0);
    const resultPurposeName = results.split(',').filter((elem, index) => index %2 == 0);
    let resultStr = '';
    for (let i = 0; i < resultEstimateArr.length; i++) {
      resultStr += `${resultPurposeName[i]}: ${resultEstimateArr[i]};\n`;
    }
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="${count+1}">
                      <table>
                         <tr>
                            <td class="title">РЕЗУЛЬТАТЫ ПРОВЕДЕНИЯ ЭКСПЕРТИЗЫ</td>
                            <td>
                               Дата: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="${count}">
                      <table>
                         <tr>
                            <td>
                               Эксперты: ${employees}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                  <td></td>
                   ${employeeNames.map(employeeName => `<td>${employeeName}</td>`).join('\n')}
                </tr>
                ${purposeNames.map(purposeName => `
                                <tr class = "item">
                                    <td>${purposeName}</td>
                                    ${estimateArr[countEst++].map(estimate => `
                                       <td>${estimate}</td>
                                    `).join('\n')}
                                </tr>
                                `).join('\n')}
             </table>
             <br />
             <h2>Результаты:</h2>
             <p>${resultStr}</p>
             <h1 class="justify-center">Лучшая альтернатива:</h1>
             <h2 class = "justify-center">${resultPurposeName[0]}</h2>
          </div>
       </body>
    </html>
    `;
};