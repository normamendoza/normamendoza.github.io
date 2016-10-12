/**
 * Clase que implementa el Formulario de alta de personas.
 * @class
 */
var FormularioContactoView = Backbone.View.extend({
    /**
     * Url del template que corresponde al view
     * @field
     */
    templateURL: "templates/formulario-contacto.html",

    /**
     * Atributo que define el mapeo de eventos a handlers
     * @field
     */
    events: {
        "click #guardar": "guardar",
        "click #borrar": "borrar",
        "click #nuevo": "nuevo",
    },
    cleanup: function() {
        this.undelegateEvents();
        $(this.el).empty();
    },
    /**
     * @Constructor
     */
    initialize: function (options) {
        this.data = options.data;
        this.collection.on("remove", this.modelRemove, this);
        var thiz = this;
        this.loadTemplate(function () {
            thiz.render();
        });
    },
    modelRemove: function(model){
        this.data = new ContactoModel();
        this.notification = "Eliminado con éxito";
        this.style = "alert alert-success alert-dismissable";
        this.render();
    },
    /**
     * Se encarga de renderizar el html de la página.
     * @function
     */
    render: function () {
        var tmpl = _.template(this.template);
        //se añade el html resultante al contenedor del view.
        this.data.attributes.notification = this.notification;
        this.data.attributes.style = this.style;
        this.$el.html(tmpl(this.data.attributes));
        return this;
    },

    /**
     * Se encarga de añade el nuevo dato al collection que se encuentra en memoria.
     * @function
     */
    guardar: function (ev) {
        var data = {};
        //por cada input del view
        this.$el.find("[name]").each(function () {
            data[this.name] = this.value;
        });
        var id = this.$el.find("#id").val();
		var newRecord = id == null;
		var model = newRecord ? new ContactoModel():this.collection.get(id);
        model.set(data);
        var that = this;
		if (!model.isValid()) {
			that.notification = model.validationError;
        	that.style = "alert alert-danger alert-dismissable";
        	that.render();
        	return;
        }else {
			if (newRecord){
				this.collection.create(model, {
    				wait : true,
    				success : function(context, m, resp, callbackOpts){
    					that.data = model;
        				that.notification = "Creado con éxito";
        				that.style = "alert alert-success alert-dismissable";
        				that.collection.trigger("change");	
        				that.render();
    				},
    				error : function(err) {
        				that.data = model;
        				that.notification = "Ocurrio un error al crear registro";
        				that.style = "alert alert-danger alert-dismissable";
        				that.render();
    				}}
    			);				
			}else{
				model.save(null, {
    				wait : true,
    				success : function(context, m, resp, callbackOpts){
    					that.data = model;
        				that.notification = "Actualizado con éxito";
        				that.style = "alert alert-success alert-dismissable";
        				that.collection.trigger("change");	
        				that.render();
    				},
    				error : function(err) {
        				that.data = model;
        				that.notification = "Ocurrio un error al actualizar registro";
        				that.style = "alert alert-danger alert-dismissable";
        				that.render();
    				}});
			}		
		}

    },
    borrar: function () {
        var id = this.$el.find("#id").val();
        model = this.collection.get(id);
        var that = this;
        model.destroy({dataType : 'text',
    				wait : true,
    				error : function(err, error) {
    					console.log(err);
        				that.notification = "Ocurrio un error al eliminar registro";
        				that.style = "alert alert-danger alert-dismissable";
        				that.render();
    				}});
    },
    nuevo : function(){
        this.data = new ContactoModel();
        this.notification = null;
        this.render();
    }
});
