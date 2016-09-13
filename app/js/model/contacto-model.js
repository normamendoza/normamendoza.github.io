/**
 * Model que corresponde al recurso persona.
 */
var ContactoModel = Backbone.Model.extend({
    /**
     * Atributos por defecto del model 
     * @field
     */
    defaults: {
    	"id" : null,
        "nombre": "",
        "apellido": "",
        "alias"   : "",
        "telefono" : null,
        "email"    : "",
        "direccion" : "",
        "fechaCreacion" : ""
    },
    validate: function(attrs, options) {
        console.log("validating");
        if (attrs.nombre.trim().length==0) {
            return "El nombre es obligatorio";
        }
        if (attrs.nombre.trim().length==0) {
            return "El apellido es obligatorio";
        }
        if (attrs.telefono== null || attrs.telefono == "" || isNaN(attrs.telefono)) {
            return "El telefono es obligatorio y debe ser un numero";
        }
        if (attrs.nombre.trim().length==0) {
            return "El email es obligatorio";
        }
    } 
},{"sequence" : 1});
