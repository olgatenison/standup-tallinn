const fetch = require("node-fetch");

exports.handler = async function (event) {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbxOMqcEb5fCOoyGm6JSeE5xwabohbkfOMcRpnFOGiElnAnkBTtXAIny5TsKF03JF_Bf/exec";

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    if (event.httpMethod === "POST") {
      const payload = JSON.parse(event.body);

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }

    if (event.httpMethod === "GET") {
      const response = await fetch(scriptUrl);
      const data = await response.json();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Server Error",
        error: error.message,
      }),
    };
  }
};
