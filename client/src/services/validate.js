export default function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.nombre = "Se necesita un nombre.";
    }
    if (!input.description) {
        errors.descripción = "Se necesita una descripción del producto.";
    }
    if (!input.price) {
        errors.precio = "Se necesita asignarle un precio al producto.";
    }
    if (input.price < 0) {
        errors.precio = "No está permitido un número negativo.";
    }
    if (!input.model) {
        errors.modelo = "Se necesita definir el modelo.";
    }
    if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/.test(input.image)) {
        errors.imagen = "La URL es inválida.";
    }
    if (input.brand === "empty") {
        errors.marca = "Se requiere la marca del producto.";
    }
    if (!input.category[0]) {
        errors.categorías = "Una categoría es requerida.";
    }
    return errors;
};
