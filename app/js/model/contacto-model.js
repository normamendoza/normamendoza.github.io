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
        "fechacreacion" : ""
    },
    validate: function(attrs, options) {
        console.log("validating");
        if (attrs.nombre.trim().length==0) {
            return "El nombre es obligatorio";
        }
        if (attrs.apellido.trim().length==0) {
            return "El apellido es obligatorio";
        }
        if (attrs.telefono== null || attrs.telefono == "" || isNaN(attrs.telefono)) {
            return "El telefono es obligatorio y debe ser un numero";
        }
        if (attrs.email.trim().length==0) {
            return "El email es obligatorio";
        }
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if (!re.test(attrs.email)){
    		return "Debe ingresar un email correcto";
    	}	
		
    } 
});
