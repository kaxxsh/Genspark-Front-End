function decodeToken() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("railways-token"))
    .split("=")[1];

  const decode = (token) =>
    decodeURIComponent(
      atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

  return JSON.parse(decode(token));
}

const userid =
  decodeToken()[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];
function checkbalance() {
  axios.get(`${URLS.base}/api/User/${userid}`).then((res) => {
    alert(`Your wallet balance is RS : ${res.data.walletBalance}`);
    
  });
}
