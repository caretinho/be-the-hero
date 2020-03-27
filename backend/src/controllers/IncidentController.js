const connection = require('../database/connection');

module.exports = {
async index(request, response){
    const { page = 1 } = request.query; //esse query é aquela função q usa ?, & etc. no insomnia coloca na busca http://localhost:3333/incidents?page=2 p mudar de pagina e ver outros resultados da busca
    
    const[count] = await connection('incidents').count(); //esse codigo retorna o total de casos registrado no DB
    //tem-se esse [count] p retornar array na primeira posição.
    

    const incidents  = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5) //aqui é p puxar limite de 5 incidentes por pagina 
        .offset((page - 1) * 5) //aq é um calculo para puxar de 5 em 5 por cada pagina
        .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);
    
    response.header('X-Total-Count', count['count(*)']); //joga o total de casos no Header(cabeçalho), assim a page saberá qndo nao tem mais casos e nao passará p proxima pagina
    
    return response.json(incidents);
},

    async create(request, response){
        const{ title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};