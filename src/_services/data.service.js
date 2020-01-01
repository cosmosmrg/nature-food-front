import { userService } from './user.service'
function getPackages() {
  return get(process.env.REACT_APP_GET_PACKAGES_DOMAIN)
}

function getOrders(limit, page){
  return getLimitPage(process.env.REACT_APP_GET_ORDERS_DOMAIN, limit, page)
}

function getUsers(limit, page) {
  return getLimitPage(process.env.REACT_APP_GET_ADMIN_USER_DOMAIN, limit, page)
}

function getBankSlip() {
  return get(process.env.REACT_APP_GET_ADMIN_SLIP_DOMAIN)
}

function getUser(userId) {
  return { balance: 100, name: 'คุณเจียม'}
}


function getPackage(orderNo) {
    function createData(orderNo, productName, amount, total) {
        return { orderNo, productName, amount, total };
    }

    const data = [
        createData('AA123', 'ข้าว', 1, 300),
        createData('AA123', 'ปลากระป๋อง', 2, 500),
        createData('AA123', 'น้ำส้มกระป๋อง', 1, 600),
        createData('AA122', 'ยาดม', 1, 500),
        createData('AA121', 'ยาหม่อง', 1, 200),
    ];


    return { products: data.filter(x=> x.orderNo === orderNo), time: 10 ,transportWeek : 1 ,startDate: '10 June 2019' ,endDate: '10 June 2019', status: '4' };
}

function getMockUserDetail(orderNo) {
    function createData(orderNo, name, place, email, phoneNumber) {
        return { orderNo, name, place, email, phoneNumber };
    }

    const data = [
        createData('AA123', 'คุณ สวดีดัด ทดสอบ', '123 เมือง ปทุมวัน กรุงเทพ กาญจนาภิเษก 10000', 'test@test.com', '081-111-1111'),
        createData('AA122', 'คุณ ชาวโลก ทดสอบ', '122 เมือง ปทุมวัน กรุงเทพ กาญจนาภิเษก 10000', 'test2@test.com', '081-111-2222'),
        createData('AA121', 'คุณ ทดสอบ3 ทดสอบ', '121 เมือง ปทุมวัน กรุงเทพ กาญจนาภิเษก 10000', 'test3@test.com', '081-111-333')

    ];
    return data.find(x=> x.orderNo === orderNo);
}

function getUserDetail(userId) {
  return getById(process.env.REACT_APP_GET_USER_DOMAIN, userId)
}

function getById(url, id) {
  if(!id) return console.log('ID is not valid')

  return get(url + `/${id}`)
}


function getReport(startDate, endDate) {
  // if (!(startDate && endDate)) return

  // const url = process.env.REACT_APP_GET_ADMIN_REPORT_DOMAIN + '?start=2019-11-01T07:43:56.985Z&stop=2019-12-01T07:43:56.985Z'

  // return get(url)
  function createData(rank, product, quantity, value, date) {
    return { rank, product, quantity, value, date };
  }

  return [
    createData('1', 'ข้าวหอม 1 กิโลกรัม', 50, 1500, new Date(2019, 5, 12)),
    createData('2', 'กล้วย 5 กิโลกรัม', 250, 150, new Date(2019, 2, 12)),
    createData('3', 'ควย 5 กิโลกรัม', 250, 5000, new Date(2019, 2, 12)),
    createData('4', 'อิอิ 250 ml', 25, 800, new Date(2019, 3, 12)),
    createData('5', 'งิงิ 1 กิโลกรัม', 50, 1500, new Date(2019, 4, 12)),
    createData('6', 'หุหุ 5 กิโลกรัม', 250, 300, new Date(2019, 5, 12)),
    createData('7', '5 กิโลกรัม', 250, 5000, new Date(2019, 5, 12)),
    createData('8', '250 ml', 25, 800, new Date(2019, 10, 12)),
    createData('9', '1 กิโลกรัม', 50, 1500, new Date(2019, 11, 12)),
    createData('10', '5 กิโลกรัม', 250, 300, new Date(2019, 5, 12)),
    createData('11', '5 กิโลกรัม', 250, 5000, new Date(2019, 5, 12)),
    createData('12', '250 ml', 25, 800, new Date(2020, 3, 2)),
  ];
}

function getReportChart(date, data) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  data = getReport();

  function getMonths(){
    const months = [];

    if(date.from.year !== date.to.year) {
        for(let i = date.from.month; i <= 12; ++i){
        months.push({name: monthNames[i - 1] + '/' + date.from.year, value: i, year: date.from.year});
      }
      for(let i = 1; i <= date.to.month; ++i){
        months.push({name: monthNames[i - 1] + '/' + date.to.year, value: i, year: date.to.year});
      }
    }else{
      for(let i = date.from.month; i <= date.to.month; ++i){
        months.push({name: monthNames[i - 1], value: i, year: date.to.year});
      }
    }
    return months;
  }
  const months = getMonths();
  function sum(month, year){
    let total = 0;
    data.filter(x=> x.date.getMonth() === month && x.date.getFullYear() === year).forEach(x=> total += x.value);
    return total;
  }

  return {
    labels: getMonths().map(x => x.name),
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    },
    datasets: [
      {
        label: 'สรุปยอดขาย',
        backgroundColor: [
          '#59dce4',
          '#4cd2e4',
          '#42c8e3',
          '#40bfe5',
          '#40b5e2',
          '#4aaadd',
          '#56a1da',
          '#489cdb',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0',
          '#3a99e0'
          ],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 0,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: getMonths().map(x => sum(x.value, x.year))
      }
    ]
  };
}

function getStatusData(){
    return [
        { value: 'processing', label: 'processing' },
        { value: 'delivered', label: 'delivered' },
      ]
}

function getHistory(userID) {
  return [
    { historyId: '00001', value: '150 บาท', date: '10 June 2019' },
    { historyId: '00002', value: '658 บาท', date: '10 June 2019' },
    { historyId: '00003', value: '150 บาท', date: '10 June 2019' },
    { historyId: '00004', value: '4150 บาท', date: '10 June 2019' },
    { historyId: '00005', value: '5150 บาท', date: '10 June 2019' },
  ]
}

function getListItems(historyId) {
  return [
    { listItemId: '00001', value: 'โออิชิ 5 ขวด' },
    { listItemId: '00002', value: 'แป๊ปซี่ 2 ลัง' }
  ]
}

function getProducts(limit, page) {
  return getLimitPage(process.env.REACT_APP_GET_PRODUCTS_DOMAIN, limit, page)
}

function getWaitingApproveProducts(limit, page) {
  return getLimitPage(process.env.REACT_APP_GET_WAITING_APPROVE_PRODUCTS_DOMAIN, limit, page)
}

function getLimitPage(url, limit, page) {
  const query = queryLimitPage(limit, page)

  return get(url + query)
}

function queryLimitPage (limit, page) {
  limit = limit || 10
  page = page || 1

  return `?limit=${limit}&page=${page}`
}

function getProduct(productID){
  return get(process.env.REACT_APP_GET_PRODUCT_ID_DOMAIN + `/${productID}`)
}

export const dataService = {
    getPackages,
    getPackage,
    getUserDetail,
    getStatusData,
    getProduct,
    getProducts,
    getWaitingApproveProducts,
    getOrders,
    getUsers,
    getUser,
    getHistory,
    getListItems,
    getReport,
    getReportChart,
    getBankSlip,
    getMockUserDetail
};

function get(url){
  const oauth2 = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
  const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': oauth2
      }
  };

  return fetch(url, requestOptions)
        .then(handleResponse)
        .then(data=>{
          return JSON.parse(data)
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
            }

            return Promise.reject(response.status);
        }

        return data;
    });
}
