const success = (res, result) => {
  return res.send({
    err: false,
    result:result,
  });
};

const error = (res, msg) => {
  return res.send({
    err: true,
    msg:msg,
  });
};

const systemError = (res, sysError) => {
  return res.send({
    err: true,
    sysError:sysError,
  });
};

const responses = {
  success,
  error,
  systemError,
};

module.exports = { responses };
