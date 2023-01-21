const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', (qr) => {

    // ini untuk generate QR Code string menjadi Gambar QR
    qrcode.generate(qr, {small: true});

    // ini untuk menampilkan string QR code
    // console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();


let api = async (req, res) => {

    let nohp = req.query.nohp || req.body.nohp;
    const pesan = req.query.pesan || req.body.pesan;


// Buat trycatch agar ketika proses kirim gagal maka akan di repeat kembali

    try {

       
        if (nohp.startsWith("0")) {
            nohp = "62" + nohp.slice(1) + "@c.us";
        }
        else if (nohp.startsWith("62")) {
            nohp = nohp + "@c.us";
        } else {
            nohp = "62" + nohp + "@c.us";
        }

        const user = await client.isRegisteredUser(nohp);

        if (user) {
            // Jika nomer terdaftar pesan akan dikirim
            client.sendMessage(nohp, pesan);
    
            res.json({ status: "Berhasil Terkirim", pesan});
        } else {
            // Jika nomer tidak terdaftar maka pesan gagal dikirim
            res.json({ status: "Gagal Kirim pesan", pesan : "No Wa Tidak Terdaftar"});
        }
        
        // console.log(nohp)
        // console.log(pesan)
        // res.json({nohp, pesan});

    } catch (error) {
        
            console.log(error);
            res.status(500).json({status: "error", pesan: "Error Server"});

    }
};

module.exports = api;