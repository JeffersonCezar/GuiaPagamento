let express = require("express");
let MercadoPago = require("./services/PaymentService");
const uuid = require('uuid');

let app = express();
const paymentService = new MercadoPago();

app.get("/", (req, res) => {
    //console.log(uuid.v4());
    res.send("Olá mundo");
})

app.get("/pay", async (req, res) => {

    var _id = "" + uuid.v4();
    var emailPay = "eu@mailinator.com";

    var dados = {
        items: [
            item = {
                id: _id,
                title: "Pão",
                description: "Pão de Forma",
                picture_url: "https://courseit.com.ar/static/logo.png", 
                category_id: "1234",  
                quantity: parseInt(3),
                currency_id: 'BRL',
                unit_price: parseFloat(10.1)
            }
        ],
        payer: {
            email: emailPay
        },
        external_reference: _id,
    } 

    
    await paymentService.createPaymentMercadoPago(dados.items[0].id, dados.items[0].description, dados.items[0].unit_price, dados.items[0].quantity, null)
    .then((response) => {
      console.log('Resposta da criação do pagamento:', response);
      return res.redirect(response.init_point);
    })
    .catch((error) => {
      console.error('Erro ao criar pagamento:', error);
      // Trate o erro adequadamente
    });


});



app.listen(3000, (req, res) => {
    console.log("Servidor rodando!")
});
