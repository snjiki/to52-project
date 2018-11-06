var mongoose = require('mongoose');

// Schéma Profiles pour l'application
var profileSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    joined_date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'profiles' }
);

// Exportation de l'objet pour l'acces en dehors du fichier
var Profile = module.exports = mongoose.model('Profile', profileSchema);

// Get Profiles
module.exports.getProfiles = function (callback, limit) {
    Profile.find(callback).limit(limit);
}