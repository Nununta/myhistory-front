class Util {
  static sampleMethod() {}
}

export default (context, inject) => {
  inject("util", Util);
};

export const OK = 200;
export const CREATED = 201;
export const INTERNAL_SERVER_ERROR = 500;
export const UNPROCESSABLE_ENTITY = 422;
export const NOT_FOUND = 404;
