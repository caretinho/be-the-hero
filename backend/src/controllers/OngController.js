const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {//esse metodo é para retornar uma listagem das ongs do bd, retornando um array.
        const ongs = await connection('ongs').select('*');
        
        return response.json(ongs);
    },

    async create(request, response){
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })
    
return response.json({ id });
    }
};