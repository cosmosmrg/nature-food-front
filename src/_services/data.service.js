function getPackages() {
    function createData(orderNo, transDate, buyer, transportWeek, status) {
        return { orderNo, transDate, buyer, transportWeek, status };
    }

    return [
        createData('AA123', '10 June 2019', 'คุณ สวดีดัด ทดสอบ', 1, 'Pending'),
        createData('AA122', '10 June 2019', 'คุณ ชาวโลก ทดสอบ', 2, 'Complete'),
        createData('AA121', '10 June 2019', 'คุณ ทดสอบ3 ทดสอบ', 1, 'Ongoing'),
    ];
}

function getOrders(){
  function createData(orderCode, orderDate, buyer, price, status) {
    return { orderCode, orderDate, buyer, price, status };
  }

  return [
    createData('AA123', '10 June 2019', 'User A', 50, 'Pending'),
    createData('AA122', '10 June 2019', 'User A', 250, 'Complete'),
    createData('AA121', '10 June 2019', 'User A', 250, 'Pending'),
    createData('AA124', '10 June 2019', 'User A', 25, 'Complete'),
    createData('AA125', '10 June 2019', 'User A', 50, 'Pending'),
    createData('AA126', '10 June 2019', 'User A', 250, 'Complete'),
    createData('AA127', '10 June 2019', 'User A', 250, 'Pending'),
    createData('AA128', '10 June 2019', 'User A', 25, 'Complete'),
    createData('AA129', '10 June 2019', 'User A', 50, 'Pending'),
    createData('AA130', '10 June 2019', 'User A', 250, 'Complete'),
    createData('AA131', '10 June 2019', 'User A', 250, 'Pending'),
    createData('AA132', '10 June 2019', 'User A', 25, 'Complete'),
  ];
}

function getUsers() {
  function createData(userId, email, name, balance, amount) {
    return { userId, email, name, balance, amount};
  }

  return [
    createData('00001', 'user1@hotmail.com', 'User A', '50 บาท', 1),
    createData('00002', 'user2@hotmail.com', 'User B', '150 บาท', 1),
    createData('00003', 'user3@hotmail.com', 'User B', '20 บาท', 1),
    createData('00004', 'user4@hotmail.com', 'User B', '50 บาท', 1),
    createData('00005', 'user5@hotmail.com', 'User C', '50 บาท', 1),
    createData('00006', 'user6@hotmail.com', 'User C', '50 บาท', 1),
    createData('00007', 'user7@hotmail.com', 'User A', '50 บาท', 1),
    createData('00008', 'user8@hotmail.com', 'User A', '50 บาท', 1),
    createData('00009', 'user9@hotmail.com', 'User C', '50 บาท', 1),
    createData('00010', 'user10@hotmail.com', 'User A', '50 บาท', 1),
    createData('00011', 'user11@hotmail.com', 'User A', '50 บาท', 1),
  ];
}

function getBankSlip() {
  function createData(transactionId, transactionDate, UserId, statusId) {
    return { transactionId, transactionDate, UserId, statusId};
  }

  return [
    createData('00001', 'User A', '50 บาท', 'Pending'),
    createData('00002', 'User B', '150 บาท', 'Reject'),
    createData('00003', 'User B', '20 บาท', 'Complete'),
    createData('00004', 'User B', '50 บาท', 'Pending'),
    createData('00005', 'User C', '50 บาท', 'Complete'),
    createData('00006', 'User C', '50 บาท', 'Reject'),
    createData('00007', 'User A', '50 บาท', 'Pending'),
    createData('00008', 'User A', '50 บาท', 'Complete'),
    createData('00009', 'User C', '50 บาท', 'Pending'),
    createData('00010', 'User A', '50 บาท', 'Reject'),
    createData('00011', 'User A', '50 บาท', 'Pending'),
  ];
}

function getUser(userId) {
  return this.getUsers().find(user => user.userId === userId);
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

function getUserDetail(orderNo) {
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


function getReport(startDate, endDate) {
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
        { value: '1', label: 'Processing' },
        { value: '2', label: 'Arrived in Local Warehouse' },
        { value: '3', label: 'Delivered' },
        { value: '4', label: 'Shipped' },
        { value: '5', label: 'Dispathing from Local Warehouse' },
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

function getProducts(){
  function createData(productID, name, size, price, seller,status,picture) {
    return { productID, name, size, price, seller,status,picture };
  }

  const data = [
    createData('00001','ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', 'Non-Subscribe'),
    createData('00002','ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
    createData('00003','ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', 'Non-Subscribe'),
    createData('00004','นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
    createData('00005','ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', 'Non-Subscribe'),
    createData('00006','ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
    createData('00007','ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', 'Non-Subscribe'),
    createData('00008','นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
    createData('00009','ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', 'Non-Subscribe'),
    createData('00010','ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
    createData('00011','ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', 'Non-Subscribe'),
    createData('00012','นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
  ];
  return data;
}


function getProduct(productID){
  function createData(productID, name, size, price, seller,status,picture) {
    return { productID, name, size, price, seller,status,picture };
  }

  const data = [
    createData('00001','ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', 'Non-Subscribe'),
    createData('00002','ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
    createData('00003','ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', 'Non-Subscribe'),
    createData('00004','นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
    createData('00005','ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', 'Non-Subscribe'),
    createData('00006','ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
    createData('00007','ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', 'Non-Subscribe'),
    createData('00008','นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
    createData('00009','ข้าวหอมมะลิ', '1 กิโลกรัม', 50, 'Nature Food', 'Non-Subscribe'),
    createData('00010','ข้าวหอมมะลิ', '5 กิโลกรัม', 250, 'Nature Food', 'Subscribe'),
    createData('00011','ข้าวโพดหวาน', '5 กิโลกรัม', 250, 'Corn Mill Farm', 'Non-Subscribe'),
    createData('00012','นมข้าวโพดหวาน', '250 ml', 25, 'Corn Mill Farm', 'Subscribe'),
  ];
  return data.find(x=> x.productID === productID);
}


export const dataService = {
    getPackages,
    getPackage,
    getUserDetail,
    getStatusData,
    getProduct,
    getProducts,
    getOrders,
    getUsers,
    getUser,
    getHistory,
    getListItems,
    getReport,
    getReportChart,
    getBankSlip
};
