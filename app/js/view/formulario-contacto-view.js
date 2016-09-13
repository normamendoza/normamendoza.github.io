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
    },

    /**
     * @Constructor
     */
    initialize: function (options) {
        this.data = options.data;
        var thiz = this;
        this.loadTemplate(function () {
            thiz.render();
        });
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
    guardar: function () {
        var data = {};
        //por cada input del view
        this.$el.find("[name]").each(function () {
            data[this.name] = this.value;
        });
        var id = this.$el.find("#id").val();
        if (id == null){
            data["fechaCreacion"] = new Date();
            var model = new ContactoModel(data);
            model.set({id:model.constructor.sequence});
            model.constructor.sequence++;
            this.collection.add(model);
        }else {
            model = this.collection.get(id);
            model.set(data);
            this.collection.trigger("change");
        }

    },
    borrar: function () {
        var id = this.$el.find("#id").val();
        model = this.collection.get(id);
        this.collection.remove(model);
        this.data = new ContactoModel();
        this.render();
    }
});
