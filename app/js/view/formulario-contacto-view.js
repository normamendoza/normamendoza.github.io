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
        if (this.data && model.id === this.data.id){
            this.data = new ContactoModel();
            this.render();
        }
    },
    /**
     * Se encarga de renderizar el html de la página.
     * @function
     */
    render: function () {
        var tmpl = _.template(this.template);
        //se añade el html resultante al contenedor del view.
        this.$el.html(tmpl(this.data.attributes));
        return this;
    },

    /**
     * Se encarga de añade el nuevo dato al collection que se encuentra en memoria.
     * @function
     */
    guardar: function (ev) {
    	console.log(ev);
        var data = {};
        //por cada input del view
        this.$el.find("[name]").each(function () {
            data[this.name] = this.value;
        });
        var model = null;
        var id = this.$el.find("#id").val();
        if (id == null){
            var now = new Date();
            var formattedDate = moment(now).format("DD/MM/YYYY HH:mm:ss");
            data["fechaCreacion"] = formattedDate;
            model = new ContactoModel(data);
            model.set({id:model.constructor.sequence});
            model.constructor.sequence++;

            if (!model.isValid()) {
                 console.log("error");
                 alert(model.validationError);
                 return;
            }   
            this.collection.add(model);
        }else {
            model = this.collection.get(id);
            modelOld = model;
            model.set(data);
            if (!model.isValid()) {
                 model = modelOld;
                 console.log("error");
                 alert(model.validationError);
                 return;
            }   
            this.collection.trigger("change");
        }
        this.data = model;
        this.render();
    },
    borrar: function () {
        var id = this.$el.find("#id").val();
        model = this.collection.get(id);
        this.collection.remove(model);
        this.data = new ContactoModel();
        this.render();
    },
    nuevo : function(){
        this.data = new ContactoModel();
        this.render();
    }
});
