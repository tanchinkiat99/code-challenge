var sum_to_n_a = function (n) {
  var res = 0;
  for (let i = 1; i <= n; i++) {
    res += i;
  }
  return res;
};

var sum_to_n_b = function (n) {
  if (n <= 0) {
    return 0;
  }
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  if (n <= 0) {
    return 0;
  } else {
    return n + sum_to_n_c(n - 1);
  }
};
