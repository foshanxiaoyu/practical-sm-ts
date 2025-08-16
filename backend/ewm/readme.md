1. Node.js 支付流程概述
这个 Node.js demo 将遵循与之前 Python 版本相同的支付逻辑：

用户点击“支付”按钮。

后端（Node.js）生成唯一的订单 ID和预支付 ID。

后端根据预支付 ID 生成支付链接，并用 qrcode 库生成动态二维码。

前端（浏览器）展示二维码。

用户扫码（我们同样会模拟这个过程）。

用户在模拟的支付页面确认支付。

支付成功后，支付平台（模拟）向我们的后端发送回调通知。

后端接收回调并更新订单状态。

2. 准备工作
在开始前，请确保你已经安装了 Node.js。然后在项目目录下创建一个 package.json 文件，并安装所需的库：

Bash

npm init -y
npm install express qrcode body-parser
express：用于搭建 Web 服务器和处理路由。

qrcode：用于在后端生成二维码。

body-parser：用于解析 POST 请求的 JSON 数据。

3. 代码实现
创建一个名为 server.js 的文件，并将以下代码复制进去。

server.js
JavaScript

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
        <h1>动态二维码支付 Demo (Node.js)</h1>
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

4. 运行和测试
保存文件并运行：

Bash

node server.js
在浏览器中打开 http://localhost:3000。

点击 “点击创建订单并支付”，你将看到一个包含订单详情和动态生成的二维码的页面。

点击二维码下方的 “模拟扫码支付” 链接。这会跳转到模拟的支付页面。

在模拟支付页面点击 “点击确认支付”。这会通过 JavaScript fetch 请求模拟支付成功并向后端发送回调。

查看你的终端，你会看到类似 订单 xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 支付成功！ 的信息，这表明回调成功，订单状态已更新。

5. 代码解析与对比
这个 Node.js demo 与之前的 Python demo 逻辑非常相似，但在实现上有几个关键区别：

异步编程：Node.js 是基于事件循环的单线程模型，因此大量使用了 async/await 来处理异步操作，例如 qrcode.toDataURL 和 fetch 请求。

模块化：我们使用 require() 来导入所需的模块，例如 express 和 qrcode。

回调处理：在模拟支付页面，我们使用了前端 fetch 请求来向后端发送回调，这比 Python 版本中后端发起的 requests 请求更加贴近实际场景（支付平台一般会通过 POST 请求发送回调）。