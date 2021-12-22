// 表单验证 `Promise` 化
export const createValidateAsync = validate => props =>
  new Promise((resolve, reject) => {
    const callback = error => (error ? reject(error) : resolve());
    validate(props, callback);
  });
