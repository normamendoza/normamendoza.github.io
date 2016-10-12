/**
 * Clase que implementa el listado de personas.
 * @class
 */
var ListaContactoView = Backbone.View.extend({
    /**
     * Url del template que corresponde al view
     * @field
     */
    templateURL: "templates/lista-contacto.html",

    /**
     * @Constructor
     */
    initialize: function () {
        var thiz = this;
        //cuando el collection cambia, se carga la lista.
        this.collection.on("add", this.render, this);
        this.collection.on("remove", this.render, this);
        this.collection.on("change", this.render, this);
        this.loadTemplate(function () {
            //una vez descargado el template se invoca al fetch para obtener los datos
            //del collection
            thiz.collection.fetch();
        });
    },
    cleanup: function() {
        this.undelegateEvents();
        $(this.el).empty();
    },
    events: {
        "click .delete-btn": "delete"
    },
    delete : function(ev){
        var modelId = $(ev.currentTarget).data('id');
        var model = this.collection.get(modelId);
        var that = this;
        model.destroy({dataType : 'text',
                    wait : true,
                    error : function(err) {
                        that.notification = "Ocurrio un error al eliminar registro";
                        that.style = "alert alert-danger alert-dismissable";
                        that.render();
                    }});
    },
    /**
     * Se encarga de renderizar el html de la página.
     * @function
     */
    render: function () {
        console.log("rendering")
        var tmpl = _.template(this.template);
        //se procesa el collection a un json
        var coll = this.collection.toJSON();
        //se añade el html resultante al contenedor del view.
        this.$el.html(tmpl({
            collection: coll
        }));
        return this;
    }
});
