var mongoose = require('mongoose');

var NotaSchema = new mongoose.Schema({
  titulo: String,
  conteudo: String,
  data: { type: Date, default: Date.now },
  data_atualizado: { type: Date, default: Date.now }
})

var CadernoSchema = new mongoose.Schema({
  nome: String,
  notas: [NotaSchema],
  data: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Caderno', CadernoSchema);
