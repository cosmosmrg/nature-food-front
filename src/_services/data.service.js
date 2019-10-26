function getPackages() {
    function createData(orderNo, transDate, buyer, transportWeek, status) {
        return { orderNo, transDate, buyer, transportWeek, status };
    }

    return [
        createData('AA123', '10 June 2019', 'คุณ สวดีดัด ทดสอบ', 1, 'Pending'),
        createData('AA122', '10 June 2019', 'คุณ ชาวโลก ทดสอบ', 2, 'Complete'),
        createData('AA123', '10 June 2019', 'คุณ ทดสอบ3 ทดสอบ', 1, 'Ongoing'),
    ];
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

function getStatusData(){
    return [
        { value: '1', label: 'Processing' },
        { value: '2', label: 'Arrived in Local Warehouse' },
        { value: '3', label: 'Delivered' },
        { value: '4', label: 'Shipped' },
        { value: '5', label: 'Dispathing from Local Warehouse' },
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
    getProducts
};
