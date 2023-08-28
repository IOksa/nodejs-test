const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const contactSchema = new Schema({
    
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
      
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': '"name" should be a type of "string"',
      'string.empty': '"name" cannot be an empty field',
      'any.required': 'missing required name field'
    }),
    email: Joi.string().required().messages({
      'string.base': '"email" should be a type of "string"',
      'string.empty': '"email" cannot be an empty field',
      'any.required': 'missing required email field'
    }),
    phone: Joi.string().required().messages({
      'string.base': '"phone" should be a type of "string"',
      'string.empty': '"phone" cannot be an empty field',
      'any.required': 'missing required phone field'
    }),
    
    favorite: Joi.boolean().required().messages({
       'string.base': '"favorite" should be a type of "boolean"',
       'string.empty': '"favorite" cannot be an empty field',
       'any.required': 'missing field favorite'
      }),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
}