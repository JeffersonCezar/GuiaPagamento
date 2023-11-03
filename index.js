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
      //console.log('Resposta da criação do pagamento:', response);
      return res.redirect(response.init_point);
    })
    .catch((error) => {
      console.error('Erro ao criar pagamento:', error);
      // Trate o erro adequadamente
    });


});

app.post("/not", (req, res) => {
    var id = req.query;

    setTimeout(() => {
        var filtro = {
            "order.id": id
        }

        MercadoPago.payment.search({
            qs: filtro
        }).then(data => {
            var pagamento = data.body.results[0];

            if(pagamento != undefined){
                //console.log(pagamento);
                //console.log(pagamento.external_refence);
                //console.log(pagamento.status); // approved

            }else{
                console.log("Pagamento não existe!");
            }

        }).catch(err => {
            console.log(err);
        });

    }, 20000);

    res.send("OK");
})

app.listen(3000, (req, res) => {
    console.log("Servidor rodando!")
});
