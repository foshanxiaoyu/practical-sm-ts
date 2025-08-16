const express = require('express');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// 模拟一个数据库来存储订单信息
const orders = {};

// 模拟支付API的端点和回调URL
const PAYMENT_API_URL = `http://localhost:${port}/mock_payment`;
const CALLBACK_URL = `http://localhost:${port}/payment_callback`;

app.use(bodyParser.json());

// 首页，展示支付按钮
app.get('/', (req, res) => {
    res.send(`
        <h1>动态二维码支付 </h1>
        <a href="/create_order">点击创建订单并支付</a>
    `);
});

// 创建订单并生成二维码
app.get('/create_order', async (req, res) => {
    // 生成唯一的订单号和预支付ID
    const orderId = uuidv4();
    const orderAmount = 100;

    // 将订单信息存入“数据库”
    const prepayId = uuidv4();
    orders[orderId] = {
        amount: orderAmount,
        status: 'pending', // 初始状态为待支付
        prepay_id: prepayId
    };

    // 构造支付URL，包含预支付ID
    const paymentUrl = `${PAYMENT_API_URL}?prepay_id=${prepayId}`;

    try {
        // 使用 qrcode 库生成二维码的 Data URL
        const qrCodeDataUrl = await qrcode.toDataURL(paymentUrl);

        res.send(`
            <h1>订单详情</h1>
            <p>订单号: ${orderId}</p>
            <p>金额: ${orderAmount} 元</p>
            <p>订单状态: 待支付</p>
            <p>请使用手机扫码支付:</p>
            <img src="${qrCodeDataUrl}" alt="QR Code">
            <br>
            <a href="${paymentUrl}" target="_blank">模拟扫码支付</a>
        `);
    } catch (err) {
        console.error(err);
        res.status(500).send('生成二维码失败');
    }
});

// 模拟支付平台的支付页面
app.get('/mock_payment', (req, res) => {
    const { prepay_id } = req.query;
    if (!prepay_id) {
        return res.status(400).send('预支付ID缺失');
    }

    // 模拟支付成功并向商户后端发送回调
    res.send(`
        <h1>模拟支付页面</h1>
        <p>预支付ID: ${prepay_id}</p>
        <p>金额: 100 元</p>
        <button onclick="confirmPayment('${prepay_id}')">点击确认支付</button>
        <script>
            function confirmPayment(prepayId) {
                fetch('${CALLBACK_URL}', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prepay_id: prepayId, status: 'success' })
                })
                .then(response => response.json())
                .then(data => {
                    alert('支付成功！回调已发送给商户后端。');
                    window.location.href = '/';
                })
                .catch(error => {
                    alert('回调失败: ' + error);
                });
            }
        </script>
    `);
});

// 后端接收支付平台的回调通知
app.post('/payment_callback', (req, res) => {
    const { prepay_id, status } = req.body;

    // 查找并更新订单状态
    const orderIdToUpdate = Object.keys(orders).find(orderId => orders[orderId].prepay_id === prepay_id);

    if (orderIdToUpdate) {
        if (status === 'success') {
            orders[orderIdToUpdate].status = 'paid';
            console.log(`订单 ${orderIdToUpdate} 支付成功！`);
            return res.json({ message: '订单状态已更新' });
        }
    }

    res.status(404).json({ message: '找不到对应的订单' });
});

app.listen(port, () => {
    console.log(`Node.js demo app listening at http://localhost:${port}`);
});