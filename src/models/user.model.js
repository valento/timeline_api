export default (joi) => joi.object({
  email: joi.string().email().required(),
  name: joi.string().regex(/^[A-Za-z ]{3,}$/),
  role: joi.number(),
  lastName: joi.string().regex(/^[A-Za-z ]{4,}}$/),
  phone: joi.string().regex(/^[0-9]{10,15}/),
  password: joi.string().regex(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%=*#?&-])[A-Za-z\d@$!%=*#?&-]{8,15}/),
})
