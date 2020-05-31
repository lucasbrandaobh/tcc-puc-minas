const Chance = require('chance');
const { ObjectId } = require('../../../../lib/database');

const chance = new Chance();

module.exports = {
  create: (data = {}) => {
    const naoConformidade = {};

    naoConformidade.descricao = data.descricao || chance.word();
    naoConformidade.causaOrigem = data.causaOrigem || chance.word();
    naoConformidade.centroTrabalho = data.centroTrabalho || chance.word();
    naoConformidade.dataCadastro = data.dataCadastro || new Date();
    naoConformidade.id_usuarioCadastro = data.id_usuarioCadastro || chance.hash({ length: 24 });
    naoConformidade.id_usuarioResponsavel = data.id_usuarioResponsavel || chance.hash({ length: 24 });
    naoConformidade.tratativa = data.tratativa || {
      tipo: data.tipo || chance.word(),
      descricao: data.descricao || chance.word(),
      dataInicio: data.dataInicioTratativa || new Date(),
      dataConclusao: data.dataConclusaoTratativa || new Date()
    };
    return naoConformidade;
  }
};
