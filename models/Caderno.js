var mongoose = require('mongoose');

var NotaSchema = new mongoose.Schema({
  titulo: { type: String, require: true },
  conteudo: { type: String, require: true },
  data: { type: Date, default: Date.now },
  data_atualizado: { type: Date, default: Date.now }
});

var CadernoSchema = new mongoose.Schema({
  nome: { type: String, require: true },
  notas: [NotaSchema],
  data: { type: Date, default: Date.now},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Caderno', CadernoSchema);
