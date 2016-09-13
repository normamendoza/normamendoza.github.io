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
        "telefono" : "",
        "email"    : "",
        "direccion" : "",
        "fechaCreacion" : ""
    } 
},{"sequence" : 0});
